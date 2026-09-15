/* ==========================================================================
   PREGISTIC — js/sim.js
   --------------------------------------------------------------------------
   PG.Sim — the deterministic market simulation behind the demo board.

   Pregistic is PRE-LAUNCH. Nothing in this file touches a real venue, a real
   order book or a real price. Every series, ladder and fill produced here is
   SIMULATED DEMONSTRATION DATA, generated from each contract's integer seed so
   that the same contract draws the same chart and the same ladder on every
   load, in every browser, in both languages.

   Pure module. No DOM, no network, no timers, no globals beyond window.PG.Sim.
   Plain ES5-compatible browser JS: var/function, object and array literals.

   Interface (SPEC.md §"PG.Sim"):
     PG.Sim.rng(seed)               -> function() -> [0,1)   mulberry32
     PG.Sim.history(contract, days) -> [{t, p}, …] length days+1, oldest first
     PG.Sim.book(contract)          -> {bids, asks, mid, spread}, 8 levels a side
     PG.Sim.tick(contract)          -> next price, small bounded walk step
     PG.Sim.fill(book, side, usd)   -> {shares, avgPrice, levels, slippage, partial}

   Every entry point is defensive: a missing, malformed or partially-filled
   contract yields an empty or neutral result, never a thrown error.
   ========================================================================== */

window.PG = window.PG || {};

(function () {
  'use strict';

  /* ------------------------------------------------------------ constants */

  var DAY = 86400000;

  // app.js sets PG.NOW. This module must still work if it is loaded or unit-
  // tested on its own, so it falls back to the site's fixed "today".
  var FALLBACK_NOW = Date.parse('2026-09-14T00:00:00Z');

  var P_MIN = 0.01;          // no contract is ever quoted at 0 or 1
  var P_MAX = 0.99;
  var WALK_MIN = 0.02;       // soft rails inside the walk, so the bridge has room
  var WALK_MAX = 0.98;

  var LEVELS = 8;            // levels a side in the demo ladder
  var TICK_SIZE = 0.01;      // quoting increment, one probability point

  // Model character, by contract type. A scalar contract references a level on
  // a published index (WCI, XSI-C, SCFIS, BDI, TAC) and re-prices as that index
  // grinds; a binary contract prices a yes/no event and re-prices on news, so it
  // gets more per-step noise, less persistence, and occasional jump days.
  var SHAPE = {
    binary: { sigma: 0.042, persist: 0.50, jumpProb: 0.055, jumpMult: 2.6 },
    scalar: { sigma: 0.026, persist: 0.72, jumpProb: 0.000, jumpMult: 1.0 }
  };

  // Math.imul is the fast 32-bit multiply mulberry32 needs. It is a built-in,
  // not syntax, so a hand-rolled fallback keeps this file ES5-safe.
  var imul = Math.imul || function (a, b) {
    var ah = (a >>> 16) & 0xffff, al = a & 0xffff;
    var bh = (b >>> 16) & 0xffff, bl = b & 0xffff;
    return ((al * bl) + ((((ah * bl) + (al * bh)) << 16) >>> 0)) | 0;
  };

  /* -------------------------------------------------------------- helpers */

  function isNum(v) { return typeof v === 'number' && isFinite(v); }

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function round(v, dp) {
    var m = Math.pow(10, dp);
    var out = Math.round(v * m) / m;
    return out === 0 ? 0 : out;   // normalise -0, which prints as "-0"
  }

  function nowMs() {
    var n = window.PG ? window.PG.NOW : null;
    return isNum(n) ? n : FALLBACK_NOW;
  }

  /* Normalise whatever the caller handed us into the numbers the model
     actually uses. Returns null for anything unusable, which every public
     function turns into a safe empty result. */
  function read(contract) {
    if (!contract || typeof contract !== 'object') return null;

    var price = Number(contract.price);
    if (!isFinite(price)) price = 0.5;
    price = clamp(price, P_MIN, P_MAX);

    var open = Number(contract.open);
    if (!isFinite(open)) open = price;
    open = clamp(open, P_MIN, P_MAX);

    var spread = Number(contract.spread);
    if (!isFinite(spread) || spread <= 0) spread = 0.02;
    spread = clamp(spread, 0.01, 0.12);

    var oi = Number(contract.oi);
    if (!isFinite(oi) || oi < 0) oi = 0;

    var seed = Number(contract.seed);
    if (!isFinite(seed)) seed = 1;

    return {
      price: price,
      open: open,
      spread: spread,
      oi: oi,
      seed: Math.floor(seed) | 0,
      shape: contract.type === 'scalar' ? SHAPE.scalar : SHAPE.binary,
      // '#' prefix so a ticker can never collide with an Object.prototype key.
      key: '#' + (typeof contract.id === 'string' && contract.id ? contract.id : ('seed:' + Math.floor(seed)))
    };
  }

  /* ------------------------------------------------------------------ rng */

  /* mulberry32: 32-bit state, one multiply-shift round, uniform in [0,1).
     Small, fast and — the only property that matters here — reproducible, so
     a contract's chart and ladder are the same artefact on every page load. */
  function rng(seed) {
    var a = isNum(seed) ? (Math.floor(seed) | 0) : 1;
    a = a >>> 0;
    if (a === 0) a = 0x9E3779B9;   // a zero state degenerates; use the golden ratio

    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = imul(t ^ (t >>> 15), t | 1);
      t = (t + imul(t ^ (t >>> 7), t | 61)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* -------------------------------------------------------------- history */

  /* A daily mark series, oldest first, ending exactly at contract.price.

     Model, in three parts:
       1. A momentum random walk. Each step is a triangular shock (two uniforms
          summed) scaled by p*(1-p), so a contract sitting at 0.06 crawls and one
          at 0.50 moves — the same shape a probability series has in practice,
          because there is simply less room to move near a settled outcome.
          A persistent component carries part of yesterday's shock into today,
          which is what gives the line runs and reversals instead of hash.
       2. A Brownian bridge. The raw walk lands wherever it lands; we subtract
          the residual linearly across the series, which removes it as a constant
          drift rather than a correction at the end — no kink, and the final
          point is contract.price exactly.
       3. A clamp to [0.01, 0.99] on every point. */
  function history(contract, days) {
    var c = read(contract);
    if (!c) return [];

    var n = Math.floor(Number(days));
    if (!isFinite(n) || n < 0) n = 30;
    if (n > 3650) n = 3650;

    var end = nowMs();

    if (n === 0) return [{ t: end, p: round(c.price, 4) }];

    var r = rng(c.seed);
    var sh = c.shape;

    // Start near the 30-day-ago open, not exactly on it: a series that begins
    // on a round published number looks constructed.
    var p = clamp(c.open + (r() - 0.5) * 0.02, WALK_MIN, WALK_MAX);

    var raw = [p];
    var mom = 0;
    var i, sigma, shock;

    for (i = 1; i <= n; i++) {
      sigma = sh.sigma * 4 * p * (1 - p);        // 4·p·(1-p) peaks at 1.0 when p = 0.5
      shock = (r() + r() - 1) * sigma;           // triangular in [-sigma, +sigma]
      if (sh.jumpProb > 0 && r() < sh.jumpProb) shock *= sh.jumpMult;   // a news day
      mom = mom * sh.persist + shock * (1 - sh.persist);
      p = clamp(p + shock * 0.72 + mom * 0.75, WALK_MIN, WALK_MAX);
      raw.push(p);
    }

    var residual = c.price - raw[n];
    var out = [];

    for (i = 0; i <= n; i++) {
      out.push({
        t: end - (n - i) * DAY,
        p: clamp(round(raw[i] + residual * (i / n), 4), P_MIN, P_MAX)
      });
    }

    // Belt and braces: the last mark is the quoted price, to the cent.
    out[n].p = round(c.price, 4);

    return out;
  }

  /* ----------------------------------------------------------------- book */

  /* A resting ladder around the quoted price: eight levels a side, bids
     descending and asks ascending, sizes in USD.

     Prices. The whole ladder is built on the integer-point grid — the venue
     quotes in whole probability points, and a float touch at 0.775 collapses
     onto its neighbour the moment a renderer prints it in cents. The touch pair
     straddles the mid and is exactly contract.spread apart, so the book
     reproduces the quoted width rather than inventing one: bid-ask width is a
     headline number here (the Month-9 gate is stated in points). Twenty-two
     contracts quote an odd number of points, where the mid cannot sit exactly
     between two grid touches; the odd point falls to the bid or the ask by the
     contract's own seed, so the board is not systematically biased to one side.
     Levels then step one point outward, distinct all the way down.

     Eight rungs a side, except at the rails. Six contracts on the board are
     quoted within eight points of 0 or 1 — a 3-point contract simply has no
     room for eight bids beneath it, because a level at 0 is not a quote, it is
     a settled outcome. The touch stays anchored on the quoted price and the
     constrained side runs short, which is what a book at 3 points actually
     looks like; shifting the ladder inward to pad the rung count would quote a
     3-point contract at 10 and make the ticket disagree with the board. Where
     the rail also narrows the quoted width, the returned `spread` reports the
     width the ladder actually shows.

     Sizes. A weight that grows with distance from the touch, multiplied by a
     seeded factor wide enough (0.45×–1.70×) to break monotonicity. Real ladders
     are lumpy — a market maker's size sits where it sits. The weights are then
     normalised so total depth tracks open interest, and rounded to $100. */
  function book(contract) {
    var c = read(contract);
    if (!c) return { bids: [], asks: [], mid: 0, spread: 0 };

    var mid = c.price;

    var midPts = clamp(Math.round(mid * 100), 1, 99);
    var spreadPts = clamp(Math.round(c.spread * 100), 1, 12);

    var lowHalf = Math.floor(spreadPts / 2);
    var highHalf = spreadPts - lowHalf;
    var swap;
    if ((spreadPts % 2) === 1 && (c.seed & 1)) {
      swap = lowHalf; lowHalf = highHalf; highHalf = swap;
    }

    // The touch pair stays on the quoted price; the rails only cap it.
    var bidPts = clamp(midPts - lowHalf, 1, 98);
    var askPts = clamp(midPts + highHalf, 2, 99);
    if (askPts <= bidPts) {
      if (askPts < 99) askPts = bidPts + 1; else bidPts = askPts - 1;
    }

    var r = rng(c.seed ^ 0x2F6B4A17);

    // Total resting depth, both sides, as a share of open interest. Floored so
    // an upcoming listing carrying no open interest yet still shows a ladder
    // rather than a blank panel.
    var depth = Math.max(35000, c.oi * 0.18);

    var bidW = [], askW = [], sum = 0, i, w;

    for (i = 0; i < LEVELS; i++) {
      w = (0.90 + i * 0.55) * (0.45 + r() * 1.25);
      bidW.push(w); sum += w;
    }
    for (i = 0; i < LEVELS; i++) {
      w = (0.90 + i * 0.55) * (0.45 + r() * 1.25);
      askW.push(w); sum += w;
    }

    var unit = sum > 0 ? depth / sum : 0;

    function sizeOf(weight) {
      // USD integers on a $100 grid — the granularity a size column can print.
      return Math.max(100, Math.round(weight * unit / 100) * 100);
    }

    var bids = [], asks = [], pts;

    for (i = 0; i < LEVELS; i++) {
      pts = bidPts - i;
      if (pts < 1) break;
      bids.push({ p: round(pts / 100, 2), size: sizeOf(bidW[i]) });
    }

    for (i = 0; i < LEVELS; i++) {
      pts = askPts + i;
      if (pts > 99) break;
      asks.push({ p: round(pts / 100, 2), size: sizeOf(askW[i]) });
    }

    return {
      bids: bids,
      asks: asks,
      mid: round(mid, 4),
      spread: round((askPts - bidPts) / 100, 2)
    };
  }

  /* ----------------------------------------------------------------- tick */

  /* The live animation step. Unlike history() this is deliberately not seeded —
     app.js drives it on an interval and the board should not loop.

     Two properties keep it honest over a long-open tab:
       · the step scales with p*(1-p), as in history(), so a 0.95 contract does
         not wander to 0.60 while nobody is watching;
       · a weak pull (5% of the gap) toward the price the contract carried when
         it was first ticked. Without an anchor a free random walk detaches from
         the deck-grounded levels the dataset was written to show. The anchor is
         module-private state, not a global. */
  var anchors = {};

  function tick(contract) {
    var c = read(contract);
    if (!c) return 0.5;

    var p = c.price;

    if (!(c.key in anchors)) anchors[c.key] = p;
    var anchor = anchors[c.key];

    var sigma = 0.018 * 4 * p * (1 - p);
    var shock = (Math.random() + Math.random() - 1) * sigma;
    var pull = (anchor - p) * 0.05;

    return round(clamp(p + shock + pull, P_MIN, P_MAX), 2);
  }

  /* ----------------------------------------------------------------- fill */

  /* Walk a ladder and report what a market order would actually get.

     YES lifts the asks: a YES share at price p costs p.
     NO hits the bids: a NO share at bid p costs (1 - p), because YES and NO
     together settle at 1. That is the whole arithmetic of a binary book, and
     it is why the demo ticket can quote a NO side without a second ladder.

     `usd` is consumed against each level's resting size, in USD, in book order.
     `levels` reports only what was actually touched. `p` in each entry is the
     book price of the level, not the cost per share — for a NO fill the cost
     per share is 1 - p. */
  function fill(bk, side, usd) {
    var empty = { shares: 0, avgPrice: 0, levels: [], slippage: 0, partial: true };

    if (!bk || typeof bk !== 'object') return empty;

    var amount = Number(usd);
    if (!isFinite(amount) || amount <= 0) return empty;

    var isNo = String(side).toUpperCase() === 'NO';
    var ladder = isNo ? bk.bids : bk.asks;
    if (Object.prototype.toString.call(ladder) !== '[object Array]') return empty;

    var remaining = amount;
    var spent = 0;
    var shares = 0;
    var levels = [];
    var touch = 0;
    var i, lvl, p, cost, capacity, take, got;

    for (i = 0; i < ladder.length && remaining > 1e-9; i++) {
      lvl = ladder[i];
      if (!lvl || typeof lvl !== 'object') continue;

      p = Number(lvl.p);
      if (!isFinite(p) || p <= 0 || p >= 1) continue;

      cost = isNo ? (1 - p) : p;            // USD per share on the side being taken
      if (!(cost > 0)) continue;

      capacity = Number(lvl.size);
      if (!isFinite(capacity) || capacity <= 0) continue;

      if (!touch) touch = cost;             // the best price actually available

      take = Math.min(remaining, capacity);
      got = take / cost;

      spent += take;
      shares += got;
      remaining -= take;

      levels.push({ p: round(p, 4), usd: round(take, 2), shares: round(got, 2) });
    }

    if (shares <= 0) return empty;

    var avg = spent / shares;

    return {
      shares: round(shares, 2),
      avgPrice: round(avg, 4),
      levels: levels,
      slippage: round(avg - touch, 4),
      partial: remaining > 1e-6
    };
  }

  /* ---------------------------------------------------------------- export */

  window.PG.Sim = {
    rng: rng,
    history: history,
    book: book,
    tick: tick,
    fill: fill
  };

}());
