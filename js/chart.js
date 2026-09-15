/* Pregistic — PG.Chart. Pure SVG string renderers: spark, area, depth, bars.
   No DOM access, no dependencies, no state. Every function returns an SVG
   string the caller drops in with innerHTML.

   House rules held here:
   - colours only ever come from CSS custom properties, so light and dark both work
   - every drawn shape carries an explicit fill (a fill-less path renders black)
   - ids (gradients, clip paths) are derived from opts.id so two charts on one
     page never collide
   - degenerate input — empty, single-point, flat, null opts — draws frame, not NaN */
window.PG = window.PG || {};

(function () {
  'use strict';

  /* ------------------------------------------------------------- strings */
  /* Every human-readable string is bilingual. zh is Traditional Chinese. */

  var L = {
    sparkAria:  { en: 'Price trend, simulated demonstration data',
                  zh: '價格走勢，模擬示範資料' },
    areaAria:   { en: 'Implied probability over time, simulated demonstration data',
                  zh: '隨時間變化的隱含機率，模擬示範資料' },
    depthAria:  { en: 'Cumulative order book depth, simulated demonstration data',
                  zh: '累計委託簿深度，模擬示範資料' },
    barsAria:   { en: 'Horizontal bar chart', zh: '橫向長條圖' },
    noData:     { en: 'No data', zh: '無資料' },
    bids:       { en: 'Bids', zh: '買盤' },
    asks:       { en: 'Asks', zh: '賣盤' },
    mid:        { en: 'Mid', zh: '中價' },
    latest:     { en: 'latest', zh: '最新' }
  };

  var MON_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* PG.t is defined in app.js, which loads after this file. Resolve through it
     when it is there at call time; fall back to PG.lang, then to English. */
  function t(v) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    var PGx = window.PG;
    if (PGx && typeof PGx.t === 'function') {
      try { return PGx.t(v); } catch (e) { /* fall through */ }
    }
    var lang = (PGx && PGx.lang === 'zh') ? 'zh' : 'en';
    return v[lang] || v.en || v.zh || '';
  }

  /* -------------------------------------------------------------- helpers */

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Short, safe number for path data and attributes. */
  function n(v) {
    v = Number(v);
    if (!isFinite(v)) v = 0;
    v = Math.round(v * 100) / 100;
    if (v === 0) v = 0; /* kills -0 */
    return String(v);
  }

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  /* A colour is either 'var(--x)', a bare '--x' token, or a CSS colour word. */
  function col(c, fallback) {
    if (c === null || c === undefined || c === '') return fallback;
    c = String(c);
    if (c.indexOf('--') === 0) return 'var(' + c + ')';
    return c;
  }

  var seq = 0;

  /* Cheap non-cryptographic hash, so two raw ids that sanitise to the same
     string still get different element ids. */
  function hash(s) {
    var hv = 5381, i;
    for (i = 0; i < s.length; i++) hv = ((hv * 33) ^ s.charCodeAt(i)) >>> 0;
    return hv.toString(36);
  }

  /* Unique, id-safe suffix derived from opts.id. */
  function uid(opts, part) {
    var raw = (opts && opts.id) ? String(opts.id) : '';
    var base = raw.replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
    if (!base) { seq += 1; base = 'auto' + seq; raw = base; }
    if (base !== raw) base += '-' + hash(raw);
    return 'pgc-' + base + '-' + part;
  }

  function pct(p) { return Math.round(Number(p) * 100) + '%'; }
  function cents(p) { return Math.round(Number(p) * 100) + '¢'; }

  function oneDp(x) { return String(Math.round(x * 10) / 10); }

  /* Compact USD for axis labels: $1.2M, $480k, $95. */
  function usd(v) {
    v = Number(v);
    if (!isFinite(v)) v = 0;
    var a = Math.abs(v);
    if (a >= 1e9) return '$' + oneDp(v / 1e9) + 'B';
    if (a >= 1e6) return '$' + oneDp(v / 1e6) + 'M';
    if (a >= 1e3) return '$' + oneDp(v / 1e3) + 'k';
    return '$' + Math.round(v);
  }

  /* Thousands separators, up to two decimals. */
  function group(v) {
    v = Number(v);
    if (!isFinite(v)) v = 0;
    var neg = v < 0;
    v = Math.abs(v);
    var r = Math.round(v * 100) / 100;
    var whole = Math.floor(r);
    var frac = Math.round((r - whole) * 100);
    var s = String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (frac) s += '.' + (frac < 10 ? '0' + frac : String(frac));
    return (neg ? '-' : '') + s;
  }

  /* "12 Jun" / "6月12日", in UTC so the axis is stable everywhere. */
  function shortDate(ms) {
    var d = new Date(Number(ms));
    if (isNaN(d.getTime())) return '';
    var day = d.getUTCDate(), m = d.getUTCMonth();
    return t({ en: day + ' ' + MON_EN[m], zh: (m + 1) + '月' + day + '日' });
  }

  var MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

  /* Rough advance width in user units. There is no DOM here to measure with,
     so estimate: CJK is full-width, mono is a fixed 0.6em, Latin averages out.
     Used to keep labels inside the viewBox rather than to lay out precisely. */
  var THIN = " iljt.,;:!|'\u2019()[]{}/\\";
  var WIDE = 'mwMW@%';

  function textW(s, size, mono) {
    s = String(s === null || s === undefined ? '' : s);
    var total = 0, i, c, ch;
    for (i = 0; i < s.length; i++) {
      ch = s.charAt(i); c = s.charCodeAt(i);
      if (c >= 0x2e80) total += 1;               /* CJK, full-width punctuation */
      else if (c === 0x2026) total += 0.92;      /* ellipsis */
      else if (mono) total += 0.6;
      else if (THIN.indexOf(ch) >= 0) total += 0.33;
      else if (WIDE.indexOf(ch) >= 0) total += 0.88;
      else if (c >= 65 && c <= 90) total += 0.68;
      else if (c >= 48 && c <= 57) total += 0.57;
      else total += 0.545;
    }
    return total * size;
  }

  /* Trim to fit a width, with an ellipsis, so a long label never spills out.
     The estimate runs a few per cent light against real faces, hence the 0.95. */
  function fit(s, width, size, mono) {
    s = String(s === null || s === undefined ? '' : s);
    var room = width * 0.95;
    if (textW(s, size, mono) <= room) return s;
    var cut = s;
    while (cut.length > 1 && textW(cut + '…', size, mono) > room) {
      cut = cut.slice(0, -1);
    }
    return cut.replace(/[\s·,.-]+$/, '') + '…';
  }

  function svgOpen(vbW, vbH, aria, cls) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '
      + n(vbW) + ' ' + n(vbH) + '" preserveAspectRatio="xMidYMid meet"'
      + ' width="100%" height="100%" style="width:100%;height:auto;display:block"'
      + (cls ? ' class="' + esc(cls) + '"' : '')
      + ' role="img" aria-label="' + esc(aria) + '" focusable="false">';
  }

  function txt(x, y, s, fill, size, anchor, mono, weight) {
    return '<text x="' + n(x) + '" y="' + n(y) + '" fill="' + esc(fill) + '"'
      + ' font-size="' + n(size) + '"'
      + (anchor ? ' text-anchor="' + esc(anchor) + '"' : '')
      + (mono ? ' font-family="' + MONO + '"' : '')
      + (weight ? ' font-weight="' + esc(weight) + '"' : '')
      + '>' + esc(s) + '</text>';
  }

  function line(x1, y1, x2, y2, stroke, sw, dash, opacity) {
    return '<line x1="' + n(x1) + '" y1="' + n(y1) + '" x2="' + n(x2) + '" y2="' + n(y2)
      + '" fill="none" stroke="' + esc(stroke) + '" stroke-width="' + n(sw || 1) + '"'
      + (dash ? ' stroke-dasharray="' + esc(dash) + '"' : '')
      + (opacity ? ' stroke-opacity="' + esc(opacity) + '"' : '')
      + '/>';
  }

  function rect(x, y, w, h, fill, extra) {
    return '<rect x="' + n(x) + '" y="' + n(y) + '" width="' + n(Math.max(0, w))
      + '" height="' + n(Math.max(0, h)) + '" fill="' + esc(fill) + '"'
      + (extra || '') + '/>';
  }

  function dot(cx, cy, r, fill, extra) {
    return '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="' + n(r)
      + '" fill="' + esc(fill) + '"' + (extra || '') + '/>';
  }

  /* Normalise a [{t,p}] series: numeric, finite, probabilities in 0..1.
     If the caller handed percentages (any p above 1) the whole series is
     rescaled once rather than clipped. */
  function clean(series) {
    var out = [], i, p, tv, maxp = 0, scale = 1;
    if (!series || !series.length) return out;
    for (i = 0; i < series.length; i++) {
      p = Number(series[i] && series[i].p);
      if (isFinite(p) && p > maxp) maxp = p;
    }
    if (maxp > 1.0000001) scale = 0.01;
    for (i = 0; i < series.length; i++) {
      if (!series[i]) continue;
      p = Number(series[i].p) * scale;
      if (!isFinite(p)) continue;
      tv = Number(series[i].t);
      if (!isFinite(tv)) tv = i;
      out.push({ t: tv, p: clamp(p, 0, 1) });
    }
    return out;
  }

  /* --------------------------------------------------------------- spark */
  /* ~88x26, no axes, no labels. Colour is the caller's decision — rising and
     falling are not colour-coded here. */

  function spark(series, opts) {
    opts = opts || {};
    var w = Number(opts.w) || 88;
    var h = Number(opts.h) || 26;
    var color = col(opts.color, 'var(--gold)');
    var pts = clean(series);

    var padX = 3, padY = 3.5;
    var x0 = padX, x1 = w - padX, y0 = padY, y1 = h - padY;
    var base = h - 0.6;

    var aria = opts.label ? t(opts.label) : t(L.sparkAria);
    if (pts.length) aria += ' — ' + t(L.latest) + ' ' + pct(pts[pts.length - 1].p);
    var out = svgOpen(w, h, aria, 'spark');

    if (!pts.length) {
      /* Nothing to draw: a flat rule keeps the row height honest. */
      out += line(x0, (y0 + y1) / 2, x1, (y0 + y1) / 2, 'var(--rule)', 1, '3 3');
      return out + '</svg>';
    }

    var lo = pts[0].p, hi = pts[0].p, i;
    for (i = 1; i < pts.length; i++) {
      if (pts[i].p < lo) lo = pts[i].p;
      if (pts[i].p > hi) hi = pts[i].p;
    }
    var span = hi - lo;
    var flat = span < 0.004;              /* flat series: no divide by zero */
    var mid = (y0 + y1) / 2;

    function yOf(p) { return flat ? mid : y1 - ((p - lo) / span) * (y1 - y0); }
    function xOf(i2) {
      return pts.length < 2 ? x1 : x0 + (i2 / (pts.length - 1)) * (x1 - x0);
    }

    var d = '';
    if (pts.length === 1) {
      d = 'M ' + n(x0) + ' ' + n(yOf(pts[0].p)) + ' L ' + n(x1) + ' ' + n(yOf(pts[0].p));
    } else {
      for (i = 0; i < pts.length; i++) {
        d += (i ? ' L ' : 'M ') + n(xOf(i)) + ' ' + n(yOf(pts[i].p));
      }
    }

    var areaPath = d + ' L ' + n(x1) + ' ' + n(base) + ' L ' + n(x0) + ' ' + n(base) + ' Z';

    out += '<path d="' + areaPath + '" fill="' + esc(color) + '" fill-opacity="0.13" stroke="none"/>';
    out += '<path d="' + d + '" fill="none" stroke="' + esc(color)
        + '" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>';
    out += dot(x1, yOf(pts[pts.length - 1].p), 2, color);
    return out + '</svg>';
  }

  /* ---------------------------------------------------------------- area */
  /* Full price chart. Y axis is fixed 0-100% — a probability is always read
     against the whole scale, never against its own min and max. */

  function area(series, opts) {
    opts = opts || {};
    var w = Number(opts.w) || 680;
    var h = Number(opts.h) || 260;
    var color = col(opts.color, 'var(--gold)');
    var padL = 40, padR = 58, padT = 14, padB = 30;
    var W = w + padL + padR, H = h + padT + padB;
    var pts = clean(series);

    var gid = uid(opts, 'grad');
    var aria = opts.label ? t(opts.label) : t(L.areaAria);
    var out = svgOpen(W, H, aria);

    function yOf(p) { return padT + (1 - clamp(p, 0, 1)) * h; }

    /* --- y grid: 0 / 25 / 50 / 75 / 100, with 50 dashed as the reference */
    var g = [0, 0.25, 0.5, 0.75, 1], i;
    for (i = 0; i < g.length; i++) {
      var gy = yOf(g[i]);
      if (g[i] === 0.5) {
        out += line(padL, gy, padL + w, gy, 'var(--faint)', 1, '5 5', '0.75');
      } else {
        out += line(padL, gy, padL + w, gy, 'var(--rule-soft)', 1);
      }
      out += txt(padL - 9, gy + 3.6, pct(g[i]), 'var(--faint)', 10.5, 'end', true);
    }
    out += line(padL, yOf(0), padL + w, yOf(0), 'var(--rule)', 1);

    if (!pts.length) {
      out += txt(padL + w / 2, padT + h / 2, t(L.noData), 'var(--faint)', 12, 'middle');
      return out + '</svg>';
    }

    /* --- x scale: by timestamp, by index when every stamp is identical */
    var t0 = pts[0].t, t1 = pts[pts.length - 1].t;
    var tspan = t1 - t0;
    var byTime = isFinite(tspan) && tspan > 0;
    function xOf(i2) {
      if (!byTime) {
        return pts.length < 2 ? padL + w : padL + (i2 / (pts.length - 1)) * w;
      }
      return padL + ((pts[i2].t - t0) / tspan) * w;
    }

    /* --- x ticks: evenly spaced in time, so they cannot overlap */
    var days = byTime ? tspan / 86400000 : 0;
    var tc = 5;
    if (days <= 6) tc = 4;
    if (!byTime || days <= 2 || pts.length < 4) tc = 2;
    var ticks = [], seen = {}, f, lab;
    for (i = 0; i < tc; i++) {
      f = tc === 1 ? 1 : i / (tc - 1);
      lab = byTime ? shortDate(t0 + f * tspan) : shortDate(pts[Math.round(f * (pts.length - 1))].t);
      if (!lab || seen[lab]) continue;
      seen[lab] = 1;
      ticks.push({ x: padL + f * w, label: lab });
    }
    for (i = 0; i < ticks.length; i++) {
      out += line(ticks[i].x, padT, ticks[i].x, padT + h, 'var(--rule-soft)', 1, null, '0.6');
      out += line(ticks[i].x, padT + h, ticks[i].x, padT + h + 4, 'var(--rule)', 1);
      out += txt(ticks[i].x, padT + h + 17, ticks[i].label, 'var(--faint)', 10.5, 'middle', true);
    }

    /* --- line + gradient area */
    var d = '';
    if (pts.length === 1) {
      d = 'M ' + n(padL) + ' ' + n(yOf(pts[0].p)) + ' L ' + n(padL + w) + ' ' + n(yOf(pts[0].p));
    } else {
      for (i = 0; i < pts.length; i++) d += (i ? ' L ' : 'M ') + n(xOf(i)) + ' ' + n(yOf(pts[i].p));
    }
    var fillPath = d + ' L ' + n(padL + w) + ' ' + n(yOf(0)) + ' L ' + n(padL) + ' ' + n(yOf(0)) + ' Z';

    out += '<defs><linearGradient id="' + esc(gid) + '" x1="0" y1="0" x2="0" y2="1">'
        + '<stop offset="0" stop-color="' + esc(color) + '" stop-opacity="0.22"/>'
        + '<stop offset="1" stop-color="' + esc(color) + '" stop-opacity="0"/>'
        + '</linearGradient></defs>';
    out += '<path d="' + fillPath + '" fill="url(#' + esc(gid) + ')" stroke="none"/>';
    out += '<path d="' + d + '" fill="none" stroke="' + esc(color)
        + '" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>';

    /* --- emphasized endpoint + right-edge value label */
    var last = pts[pts.length - 1];
    var lx = padL + w, ly = yOf(last.p);
    out += dot(lx, ly, 6.5, color, ' fill-opacity="0.18"');
    out += dot(lx, ly, 3.4, color);

    var bw = 42, bh = 18;
    var bx = lx + 9;
    var by = clamp(ly - bh / 2, padT, padT + h - bh);
    out += line(lx, ly, bx, by + bh / 2, color, 1, null, '0.5');
    out += rect(bx, by, bw, bh, 'var(--surface)',
      ' rx="2" stroke="' + esc(color) + '" stroke-width="0.9"');
    out += txt(bx + bw / 2, by + bh / 2 + 3.8, pct(last.p), color, 11, 'middle', true, '600');

    return out + '</svg>';
  }

  /* --------------------------------------------------------------- depth */
  /* Cumulative ladder from PG.Sim.book output: bids step leftward from the mid,
     asks step rightward. x is probability in cents, y is cumulative USD. */

  function depth(book, opts) {
    opts = opts || {};
    book = book || {};
    var w = Number(opts.w) || 520;
    var h = Number(opts.h) || 200;
    var padL = 58, padR = 16, padT = 26, padB = 26;
    var W = w + padL + padR, H = h + padT + padB;
    var out = svgOpen(W, H, t(L.depthAria));

    function levels(list, dir) {
      var arr = [], i, p, s;
      if (!list || !list.length) return arr;
      for (i = 0; i < list.length; i++) {
        if (!list[i]) continue;
        p = Number(list[i].p); s = Number(list[i].size);
        if (!isFinite(p) || !isFinite(s) || s <= 0) continue;
        arr.push({ p: p, size: s });
      }
      arr.sort(function (a, b) { return dir === 'desc' ? b.p - a.p : a.p - b.p; });
      return arr;
    }

    var bids = levels(book.bids, 'desc');
    var asks = levels(book.asks, 'asc');

    var mid = Number(book.mid);
    if (!isFinite(mid)) {
      if (bids.length && asks.length) mid = (bids[0].p + asks[0].p) / 2;
      else if (bids.length) mid = bids[0].p;
      else if (asks.length) mid = asks[0].p;
      else mid = 0.5;
    }

    var totalBid = 0, totalAsk = 0, i;
    for (i = 0; i < bids.length; i++) totalBid += bids[i].size;
    for (i = 0; i < asks.length; i++) totalAsk += asks[i].size;
    var maxCum = Math.max(totalBid, totalAsk);
    if (!(maxCum > 0)) maxCum = 1;

    /* x domain across both sides, padded so the outermost step is not on the edge */
    var lo = mid, hi = mid;
    for (i = 0; i < bids.length; i++) if (bids[i].p < lo) lo = bids[i].p;
    for (i = 0; i < asks.length; i++) if (asks[i].p > hi) hi = asks[i].p;
    if (!(hi - lo > 0.0001)) { lo = mid - 0.05; hi = mid + 0.05; }
    var pad = (hi - lo) * 0.08;
    lo = clamp(lo - pad, 0, 1); hi = clamp(hi + pad, 0, 1);
    if (!(hi - lo > 0.0001)) { lo = 0; hi = 1; }

    function xOf(p) { return padL + ((clamp(p, lo, hi) - lo) / (hi - lo)) * w; }
    function yOf(v) { return padT + h - (clamp(v / maxCum, 0, 1)) * h; }

    var y0 = yOf(0), midX = xOf(mid);

    /* --- y grid + cumulative USD labels */
    var gy = [0, 0.5, 1];
    for (i = 0; i < gy.length; i++) {
      var yy = yOf(maxCum * gy[i]);
      out += line(padL, yy, padL + w, yy, i === 0 ? 'var(--rule)' : 'var(--rule-soft)', 1);
      out += txt(padL - 9, yy + 3.6, usd(maxCum * gy[i]), 'var(--faint)', 10.5, 'end', true);
    }

    /* --- x labels in cents */
    var xt = 5, seenx = {}, fx, px, lbl;
    for (i = 0; i < xt; i++) {
      fx = i / (xt - 1);
      px = lo + fx * (hi - lo);
      lbl = cents(px);
      if (seenx[lbl]) continue;
      seenx[lbl] = 1;
      out += line(padL + fx * w, padT + h, padL + fx * w, padT + h + 4, 'var(--rule)', 1);
      out += txt(padL + fx * w, padT + h + 17, lbl, 'var(--faint)', 10.5, 'middle', true);
    }

    /* --- stepped cumulative paths */
    function step(lv) {
      var d = 'M ' + n(midX) + ' ' + n(y0), cum = 0, k, x;
      for (k = 0; k < lv.length; k++) {
        x = xOf(lv[k].p);
        d += ' L ' + n(x) + ' ' + n(yOf(cum));
        cum += lv[k].size;
        d += ' L ' + n(x) + ' ' + n(yOf(cum));
      }
      var endX = lv.length ? xOf(lv[lv.length - 1].p) : midX;
      return { line: d, fill: d + ' L ' + n(endX) + ' ' + n(y0) + ' Z' };
    }

    if (!bids.length && !asks.length) {
      out += txt(padL + w / 2, padT + h / 2, t(L.noData), 'var(--faint)', 12, 'middle');
      return out + '</svg>';
    }

    if (bids.length) {
      var b = step(bids);
      out += '<path d="' + b.fill + '" fill="var(--up)" fill-opacity="0.16" stroke="none"/>';
      out += '<path d="' + b.line + '" fill="none" stroke="var(--up)" stroke-width="1.5"'
          + ' stroke-linejoin="round"/>';
      out += txt(padL + 8, padT + 12, t(L.bids), 'var(--up)', 10.5, 'start');
    }
    if (asks.length) {
      var a = step(asks);
      out += '<path d="' + a.fill + '" fill="var(--down)" fill-opacity="0.16" stroke="none"/>';
      out += '<path d="' + a.line + '" fill="none" stroke="var(--down)" stroke-width="1.5"'
          + ' stroke-linejoin="round"/>';
      out += txt(padL + w - 8, padT + 12, t(L.asks), 'var(--down)', 10.5, 'end');
    }

    /* --- mid marker */
    out += line(midX, padT + 2, midX, y0, 'var(--faint)', 1, '4 4', '0.85');
    out += txt(clamp(midX, padL + 26, padL + w - 26), padT - 9,
      t(L.mid) + ' ' + cents(mid), 'var(--muted)', 11, 'middle', true, '600');

    return out + '</svg>';
  }

  /* ---------------------------------------------------------------- bars */
  /* Horizontal bars on one shared scale. rows: [{label, value, color, display}].
     Keep the viewBox narrow so the type survives a 320px column; the caller
     widens it with opts.w and buys label room with opts.labelWidth. */

  function bars(rows, opts) {
    opts = opts || {};
    rows = rows || [];
    var w = Number(opts.w) || 380;
    var rowH = Number(opts.rowH) || 30;
    var barH = Number(opts.barH) || 13;
    var fs = Number(opts.fontSize) || 11.5;
    var gap = 10, padT = 4, padB = 4;

    var H = padT + Math.max(1, rows.length) * rowH + padB;
    var aria = opts.label ? t(opts.label) : t(L.barsAria);
    var out = svgOpen(w, H, aria);

    if (!rows.length) {
      out += txt(w / 2, H / 2, t(L.noData), 'var(--faint)', 12, 'middle');
      return out + '</svg>';
    }

    var max = 0, i, v;
    for (i = 0; i < rows.length; i++) {
      v = Number(rows[i] && rows[i].value);
      if (isFinite(v) && v > max) max = v;
    }
    if (!(max > 0)) max = 1;               /* all-zero rows: draw empty tracks */

    function valueText(row) {
      if (row.display !== undefined && row.display !== null) return t(row.display);
      if (typeof opts.fmt === 'function') return String(opts.fmt(row.value));
      if (opts.money) return usd(row.value);
      return group(row.value) + (opts.suffix ? t(opts.suffix) : '');
    }

    /* The value column reserves exactly the width the widest value needs, so
       nothing is clipped at 320px; labels are trimmed to the label column. */
    var vals = [], vw = 0, tw;
    for (i = 0; i < rows.length; i++) {
      vals.push(valueText(rows[i] || {}));
      tw = textW(vals[i], fs, true);
      if (tw > vw) vw = tw;
    }
    /* Never reserve less than the widest value needs, whatever the caller asked
       for — a short column would put the number on top of its own bar. */
    var valueW = Math.max(Number(opts.valueWidth) || 0, Math.ceil(vw) + 3);
    var maxLabel = Math.max(30, w - valueW - 2 * gap - 40);
    var labelW = clamp(Number(opts.labelWidth) || 140, 30, maxLabel);
    var trackX = labelW + gap;
    var trackW = Math.max(30, w - trackX - gap - valueW);

    for (i = 0; i < rows.length; i++) {
      var row = rows[i] || {};
      v = Number(row.value);
      if (!isFinite(v) || v < 0) v = 0;
      var c = col(row.color, 'var(--gold)');
      var by = padT + i * rowH + (rowH - barH) / 2;
      var base = by + barH - 2.2;
      var bw = (v / max) * trackW;

      out += txt(labelW, base, fit(t(row.label), labelW, fs), 'var(--ink-2)', fs, 'end');
      out += rect(trackX, by, trackW, barH, 'var(--rule-soft)');
      out += rect(trackX, by, bw, barH, c);

      var vx = Math.min(trackX + bw + 8, w - valueW + 1);
      out += txt(Math.max(trackX, vx), base, vals[i], 'var(--ink)', fs, 'start', true, '600');
    }

    return out + '</svg>';
  }

  window.PG.Chart = { spark: spark, area: area, depth: depth, bars: bars };
}());
