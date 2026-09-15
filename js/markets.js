/* Pregistic — the board, the contract detail view, the order book and the
   paper trade ticket. All prices here are simulated; nothing is a live market. */
window.PG = window.PG || {};

(function () {
  'use strict';

  var E = function (v) { return PG.esc(PG.t(v)); };

  // Product-level facts that are the same on every contract. These come from
  // the settlement design in the deck, not from per-contract data.
  var RULES = {
    settlement: { en: 'T+1 from the source print', zh: '來源公佈後 T+1' },
    tieBreak: {
      en: 'If the named source does not print on the expiry date, the next scheduled print governs. If the series is discontinued, the contract voids and collateral returns at cost.',
      zh: '若指定來源於到期日未公佈，以下一次排定公佈值為準。若該系列停止發布，合約作廢，抵押品按成本退回。'
    },
    challenge: {
      en: 'Bonded challenge, 24 hours from settlement. The bond is forfeited if the challenge fails and returned with the disputed amount if it succeeds. Every challenge is published.',
      zh: '結算後 24 小時內可提出保證金異議。異議不成立則沒收保證金；成立則連同爭議金額退回。所有異議均公開。'
    },
    minTicket: { en: 'US$1', zh: '1 美元' },
    custody: {
      en: 'Non-custodial. Collateral and settlement on-chain, verifiable by both sides.',
      zh: '非託管。抵押品與結算均在鏈上，雙方可自行驗證。'
    }
  };

  function closest(el, sel) {
    while (el && el !== document) {
      if (el.matches && el.matches(sel)) return el;
      el = el.parentNode;
    }
    return null;
  }

  /* ---------------------------------------------------------- watchlist */

  function watchList() { return PG.store.getJSON('watch', []) || []; }
  function isWatched(id) { return watchList().indexOf(id) >= 0; }
  function toggleWatch(id) {
    var l = watchList(), i = l.indexOf(id);
    if (i >= 0) l.splice(i, 1); else l.push(id);
    PG.store.setJSON('watch', l);
    return i < 0;
  }

  /* ---------------------------------------------------------- positions */

  function positions() { return PG.store.getJSON('positions', []) || []; }
  function savePositions(p) { PG.store.setJSON('positions', p); }

  /* ------------------------------------------------------- shared bits */

  function statusPill(c) {
    var k = c.status || 'live';
    var label = PG.t('status.' + k);
    if (k === 'resolved' && c.resolved) {
      label = PG.t(c.resolved === 'YES' ? 'status.settledYes' : 'status.settledNo');
    }
    return '<span class="status status-' + PG.esc(k) + '">' + PG.esc(label) + '</span>';
  }

  function countdown(c) {
    var d = PG.daysTo(c.expiry);
    if (c.status === 'resolved' || d < 0) return PG.t('status.expired');
    if (d === 0) return PG.t('status.today');
    return d + ' ' + PG.t('status.daysLeft');
  }

  function expiryCell(c) {
    return '<div class="num" style="font-size:12.5px">' + PG.esc(PG.fmtDate(c.expiry)) + '</div>'
      + '<div class="tiny" style="margin-top:3px">' + PG.esc(countdown(c)) + '</div>';
  }

  function sparkFor(c, days) {
    if (!PG.Sim || !PG.Sim.history || !PG.Chart || !PG.Chart.spark) return '';
    var series = PG.Sim.history(c, days || 30);
    var up = PG.change30(c) >= 0;
    return PG.Chart.spark(series, {
      id: 'sp-' + c.id,
      color: up ? 'var(--up)' : 'var(--down)'
    });
  }

  function chipFor(c) {
    var m = PG.familyMeta[c.family] || PG.familyMeta.freight;
    return '<span class="chip ' + m.cls + '">' + PG.esc(PG.familyLabel(c.family)) + '</span>';
  }

  function demoTag() {
    return '<span class="demo-tag">' + E('demo.badge') + '</span>';
  }

  /* ------------------------------------------------------------- board */

  var SORTS = {
    volume:    function (a, b) { return b.vol24 - a.vol24; },
    liquidity: function (a, b) { return b.oi - a.oi; },
    expiry:    function (a, b) { return Date.parse(a.expiry) - Date.parse(b.expiry); },
    move:      function (a, b) { return Math.abs(PG.change24(b)) - Math.abs(PG.change24(a)); },
    alpha:     function (a, b) { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; }
  };

  function rowHTML(c) {
    var watched = isWatched(c.id);
    return '<tr class="board-row" tabindex="0" data-id="' + PG.esc(c.id) + '">'
      + '<td>' + chipFor(c)
        + '<span class="ttl">' + PG.esc(PG.t(c.title)) + '</span>'
        + '<div class="meta mono">' + PG.esc(c.id) + ' · ' + PG.esc(c.sourceTag || '') + '</div></td>'
      + '<td style="width:96px">' + sparkFor(c, 30) + '</td>'
      + '<td class="n"><span class="px px-yes" data-px="' + PG.esc(c.id) + '" style="font-size:15px">'
        + PG.cents(c.price) + '</span></td>'
      + '<td class="n"><span class="px px-no" data-px="' + PG.esc(c.id) + '" data-side="no">'
        + PG.cents(1 - c.price) + '</span></td>'
      + '<td class="n"><span class="delta" data-chg="' + PG.esc(c.id) + '"></span></td>'
      + '<td class="n num">' + PG.esc(PG.fmtUSD(c.vol24)) + '</td>'
      + '<td class="n num">' + PG.esc(PG.fmtUSD(c.oi)) + '</td>'
      + '<td>' + expiryCell(c) + '</td>'
      + '<td>' + statusPill(c) + '</td>'
      + '<td class="n"><button class="navbtn is-icon js-watch" type="button" data-id="'
        + PG.esc(c.id) + '" aria-pressed="' + (watched ? 'true' : 'false') + '" aria-label="'
        + E(watched ? 'board.removeWatch' : 'board.addWatch') + '" style="color:'
        + (watched ? 'var(--gold)' : 'var(--faint)') + '">'
        + '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">'
        + '<path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z" '
        + 'fill="' + (watched ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.5"/>'
        + '</svg></button></td>'
      + '</tr>';
  }

  PG.Markets = {};

  PG.Markets.board = function (query) {
    query = query || {};
    var state = {
      q: '',
      family: PG.familyOrder.indexOf(query.family) >= 0 ? query.family : 'all',
      status: 'all',
      sort: 'volume',
      watchOnly: query.watch === '1'
    };

    var root = PG.el('div');
    document.title = PG.t('board.title') + ' · Pregistic';

    var head = PG.el('div', 'wrap head');
    head.innerHTML = '<span class="eyebrow">' + E('board.title') + '</span>'
      + '<h1 style="margin-top:14px;max-width:17ch">' + E('board.heading') + '</h1>'
      + '<p class="lede" style="margin-top:18px">' + E('board.lede') + '</p>'
      + '<div class="row" style="margin-top:20px">' + demoTag()
      + '<span class="tiny" style="max-width:62ch">' + E('demo.notice') + '</span></div>';
    root.appendChild(head);

    var sec = PG.el('section', 'sec sec-flush');
    var w = PG.el('div', 'wrap');

    // ---- controls
    var controls = PG.el('div');
    controls.style.cssText = 'display:grid;grid-template-columns:minmax(200px,1.6fr) repeat(3,minmax(130px,1fr)) auto;gap:12px;align-items:end;margin-bottom:24px';
    controls.innerHTML =
      '<div class="field"><label for="bSearch">' + E('board.search') + '</label>'
      + '<input class="input" id="bSearch" type="search" placeholder="' + E('board.searchPlaceholder') + '"></div>'
      + '<div class="field"><label for="bFam">' + E('board.family') + '</label>'
      + '<select class="select" id="bFam"><option value="all">' + E('board.allFamilies') + '</option>'
      + PG.familyOrder.map(function (f) {
          return '<option value="' + f + '"' + (state.family === f ? ' selected' : '') + '>'
            + PG.esc(PG.familyLabel(f)) + '</option>';
        }).join('')
      + '</select></div>'
      + '<div class="field"><label for="bStat">' + E('board.status') + '</label>'
      + '<select class="select" id="bStat"><option value="all">' + E('board.allStatuses') + '</option>'
      + ['live', 'closing', 'upcoming', 'resolved'].map(function (s) {
          return '<option value="' + s + '">' + PG.esc(PG.t('status.' + s)) + '</option>';
        }).join('')
      + '</select></div>'
      + '<div class="field"><label for="bSort">' + E('board.sort') + '</label>'
      + '<select class="select" id="bSort">'
      + '<option value="volume">' + E('board.sortVolume') + '</option>'
      + '<option value="liquidity">' + E('board.sortLiquidity') + '</option>'
      + '<option value="expiry">' + E('board.sortExpiry') + '</option>'
      + '<option value="move">' + E('board.sortMove') + '</option>'
      + '<option value="alpha">' + E('board.sortAlpha') + '</option>'
      + '</select></div>'
      + '<button class="btn btn-ghost btn-sm" id="bWatch" type="button" aria-pressed="'
      + (state.watchOnly ? 'true' : 'false') + '" style="height:42px">' + E('board.watchlist') + '</button>';
    w.appendChild(controls);

    var count = PG.el('p', 'tiny');
    count.style.marginBottom = '12px';
    w.appendChild(count);

    var tblWrap = PG.el('div', 'tbl-wrap');
    tblWrap.innerHTML = '<table class="board"><thead><tr>'
      + '<th>' + E('cols.market') + '</th>'
      + '<th>' + E('board.trend') + '</th>'
      + '<th class="n">' + E('cols.yes') + '</th>'
      + '<th class="n">' + E('cols.no') + '</th>'
      + '<th class="n">' + E('cols.change24h') + '</th>'
      + '<th class="n">' + E('cols.volume24h') + '</th>'
      + '<th class="n">' + E('cols.openInterest') + '</th>'
      + '<th>' + E('cols.expiry') + '</th>'
      + '<th>' + E('cols.status') + '</th>'
      + '<th class="n"><span class="tiny">&#9734;</span></th>'
      + '</tr></thead><tbody id="boardBody"></tbody></table>';
    w.appendChild(tblWrap);
    sec.appendChild(w);
    root.appendChild(sec);

    var body = tblWrap.querySelector('#boardBody');

    function apply() {
      var q = state.q.toLowerCase();
      var watch = watchList();
      var list = (PG.contracts || []).filter(function (c) {
        if (state.family !== 'all' && c.family !== state.family) return false;
        if (state.status !== 'all' && c.status !== state.status) return false;
        if (state.watchOnly && watch.indexOf(c.id) < 0) return false;
        if (!q) return true;
        var hay = (c.id + ' ' + PG.t(c.title) + ' ' + PG.t(c.question) + ' '
          + PG.t(c.resolves) + ' ' + (c.tags || []).join(' ')).toLowerCase();
        return hay.indexOf(q) >= 0;
      });

      list.sort(SORTS[state.sort] || SORTS.volume);

      if (!list.length) {
        body.innerHTML = '<tr><td colspan="10" style="padding:34px 0">'
          + '<p style="font-weight:500">' + E('board.noResults') + '</p>'
          + '<p class="small" style="margin-top:6px">'
          + E(state.watchOnly ? 'board.watchlistEmpty' : 'board.noResultsHint') + '</p></td></tr>';
      } else {
        body.innerHTML = list.map(rowHTML).join('');
      }
      count.textContent = PG.t('board.showing') + ' ' + list.length + ' '
        + PG.t('board.of') + ' ' + (PG.contracts || []).length + ' ' + PG.t('board.results');
      PG.refreshPrices(body);
    }

    controls.querySelector('#bSearch').addEventListener('input', function (e) {
      state.q = e.target.value; apply();
    });
    controls.querySelector('#bFam').addEventListener('change', function (e) {
      state.family = e.target.value; apply();
    });
    controls.querySelector('#bStat').addEventListener('change', function (e) {
      state.status = e.target.value; apply();
    });
    controls.querySelector('#bSort').addEventListener('change', function (e) {
      state.sort = e.target.value; apply();
    });
    var wb = controls.querySelector('#bWatch');
    wb.addEventListener('click', function () {
      state.watchOnly = !state.watchOnly;
      wb.setAttribute('aria-pressed', state.watchOnly ? 'true' : 'false');
      wb.style.color = state.watchOnly ? 'var(--gold)' : '';
      wb.style.borderColor = state.watchOnly ? 'var(--gold)' : '';
      apply();
    });

    body.addEventListener('click', function (e) {
      var star = closest(e.target, '.js-watch');
      if (star) {
        e.stopPropagation();
        toggleWatch(star.getAttribute('data-id'));
        apply();
        return;
      }
      var row = closest(e.target, '.board-row');
      if (row) location.hash = '#/markets/' + encodeURIComponent(row.getAttribute('data-id'));
    });
    body.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var row = closest(e.target, '.board-row');
      if (row) {
        e.preventDefault();
        location.hash = '#/markets/' + encodeURIComponent(row.getAttribute('data-id'));
      }
    });

    apply();
    return root;
  };

  /* ----------------------------------------------------------- preview */

  PG.Markets.preview = function (n) {
    var list = (PG.contracts || []).filter(PG.isTradable)
      .slice().sort(function (a, b) { return b.vol24 - a.vol24; }).slice(0, n || 6);

    var wrap = PG.el('div');
    var bar = PG.el('div', 'row');
    bar.style.cssText = 'justify-content:space-between;margin-bottom:14px';
    bar.innerHTML = demoTag()
      + '<a class="btn btn-ghost btn-sm" href="#/markets">' + E('cta.viewBoard') + '</a>';
    wrap.appendChild(bar);

    var t = PG.el('div', 'tbl-wrap');
    t.innerHTML = '<table class="board is-compact"><thead><tr>'
      + '<th>' + E('cols.market') + '</th><th>' + E('board.trend') + '</th>'
      + '<th class="n">' + E('cols.yes') + '</th><th class="n">' + E('cols.change24h') + '</th>'
      + '<th class="n">' + E('cols.volume24h') + '</th><th>' + E('cols.expiry') + '</th>'
      + '</tr></thead><tbody>'
      + list.map(function (c) {
          return '<tr class="board-row" tabindex="0" data-id="' + PG.esc(c.id) + '">'
            + '<td>' + chipFor(c) + '<span class="ttl">' + PG.esc(PG.t(c.title)) + '</span>'
            + '<div class="meta mono">' + PG.esc(c.id) + '</div></td>'
            + '<td style="width:96px">' + sparkFor(c, 30) + '</td>'
            + '<td class="n"><span class="px px-yes" data-px="' + PG.esc(c.id)
            + '" style="font-size:15px">' + PG.cents(c.price) + '</span></td>'
            + '<td class="n"><span class="delta" data-chg="' + PG.esc(c.id) + '"></span></td>'
            + '<td class="n num">' + PG.esc(PG.fmtUSD(c.vol24)) + '</td>'
            + '<td>' + expiryCell(c) + '</td></tr>';
        }).join('')
      + '</tbody></table>';
    wrap.appendChild(t);

    t.addEventListener('click', function (e) {
      var row = closest(e.target, '.board-row');
      if (row) location.hash = '#/markets/' + encodeURIComponent(row.getAttribute('data-id'));
    });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var row = closest(e.target, '.board-row');
      if (row) location.hash = '#/markets/' + encodeURIComponent(row.getAttribute('data-id'));
    });

    PG.refreshPrices(wrap);
    return wrap;
  };

  /* ------------------------------------------------------------ detail */

  PG.Markets.detail = function (id) {
    var c = (PG.byId || {})[id];
    var root = PG.el('div');

    if (!c) {
      root.innerHTML = '<div class="wrap head"><span class="eyebrow">' + E('misc.page404') + '</span>'
        + '<h1 style="margin-top:14px">' + E('misc.notFound') + '</h1>'
        + '<p class="lede" style="margin-top:16px">' + E('misc.notFoundHint')
        + ' <span class="mono quiet">' + PG.esc(id) + '</span></p>'
        + '<p style="margin-top:24px"><a class="btn" href="#/markets">' + E('cta.backToBoard') + '</a></p></div>';
      return root;
    }

    document.title = c.id + ' · Pregistic';

    /* ---- header */
    var head = PG.el('div', 'wrap head');
    head.style.paddingBottom = '26px';
    var watched = isWatched(c.id);
    head.innerHTML =
      '<a class="navbtn" href="#/markets" style="padding-left:0">&larr; ' + E('cta.backToBoard') + '</a>'
      + '<div class="row" style="margin-top:16px;gap:10px">' + chipFor(c) + statusPill(c)
      + '<span class="code">' + PG.esc(c.id) + '</span>' + demoTag() + '</div>'
      + '<h1 style="margin-top:16px;font-size:clamp(25px,3.6vw,38px);max-width:24ch">'
      + PG.esc(PG.t(c.title)) + '</h1>'
      + '<p class="lede" style="margin-top:16px">' + PG.esc(PG.t(c.question)) + '</p>'
      + '<div class="row" style="margin-top:22px;gap:10px">'
      + '<button class="btn btn-ghost btn-sm" id="dWatch" type="button" aria-pressed="'
      + (watched ? 'true' : 'false') + '">'
      + E(watched ? 'board.removeWatch' : 'board.addWatch') + '</button>'
      + '<button class="btn btn-ghost btn-sm" id="dCopy" type="button">' + E('cta.copyLink') + '</button>'
      + '</div>';
    root.appendChild(head);

    head.querySelector('#dWatch').addEventListener('click', function () {
      var on = toggleWatch(c.id);
      this.setAttribute('aria-pressed', on ? 'true' : 'false');
      this.textContent = PG.t(on ? 'board.removeWatch' : 'board.addWatch');
      PG.toast(PG.t(on ? 'board.addWatch' : 'board.removeWatch'));
    });
    head.querySelector('#dCopy').addEventListener('click', function () {
      var url = location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { PG.toast(PG.t('cta.copied')); },
          function () { PG.toast(url); });
      } else PG.toast(url);
    });

    /* ---- price band */
    var band = PG.el('section', 'sec sec-flush sec-tight');
    var bw = PG.el('div', 'wrap');
    bw.innerHTML = '<div class="kpigrid">'
      + '<div class="kpi"><div class="l">' + E('cols.yes') + '</div>'
      + '<div class="v" style="color:var(--up)" data-px="' + PG.esc(c.id) + '">'
      + PG.cents(c.price) + '</div><div class="s">' + E('detail.impliedProbability') + '</div></div>'
      + '<div class="kpi"><div class="l">' + E('cols.no') + '</div>'
      + '<div class="v" style="color:var(--down)" data-px="' + PG.esc(c.id) + '" data-side="no">'
      + PG.cents(1 - c.price) + '</div><div class="s">' + E('detail.impliedProbability') + '</div></div>'
      + '<div class="kpi"><div class="l">' + E('cols.change30d') + '</div>'
      + '<div class="v"><span class="delta" data-chg="' + PG.esc(c.id) + '" data-window="30"'
      + ' style="font-size:25px"></span></div><div class="s">' + E('detail.range30d') + '</div></div>'
      + '<div class="kpi"><div class="l">' + E('cols.volume24h') + '</div>'
      + '<div class="v">' + PG.esc(PG.fmtUSD(c.vol24)) + '</div>'
      + '<div class="s">' + E('cols.openInterest') + ' ' + PG.esc(PG.fmtUSD(c.oi)) + '</div></div>'
      + '<div class="kpi"><div class="l">' + E('cols.expiry') + '</div>'
      + '<div class="v" style="font-size:19px">' + PG.esc(PG.fmtDate(c.expiry)) + '</div>'
      + '<div class="s">' + PG.esc(countdown(c)) + '</div></div>'
      + '</div>';
    band.appendChild(bw);
    root.appendChild(band);

    /* ---- main split */
    var main = PG.el('section', 'sec');
    var mw = PG.el('div', 'wrap');
    mw.innerHTML = '<div class="split">'
      + '<div id="dLeft" class="stack" style="gap:34px"></div>'
      + '<div id="dRight" class="stack" style="gap:24px"></div></div>';
    main.appendChild(mw);
    root.appendChild(main);

    var left = mw.querySelector('#dLeft');
    var right = mw.querySelector('#dRight');

    /* ---- chart */
    var chartBox = PG.el('div');
    var ranges = [[7, 'chart.days7'], [30, 'chart.days30'], [90, 'chart.days90']];
    chartBox.innerHTML = '<div class="row" style="justify-content:space-between;margin-bottom:14px">'
      + '<h3>' + E('detail.priceHistory') + '</h3><div class="seg" id="dRange">'
      + ranges.map(function (r, i) {
          return '<button class="segbtn" type="button" data-d="' + r[0] + '" aria-pressed="'
            + (i === 1 ? 'true' : 'false') + '">' + E(r[1]) + '</button>';
        }).join('')
      + '</div></div><div id="dChart"></div>';
    left.appendChild(chartBox);

    function drawChart(days) {
      var el = chartBox.querySelector('#dChart');
      if (!PG.Sim || !PG.Chart || !PG.Chart.area) { el.innerHTML = ''; return; }
      var series = PG.Sim.history(c, days);
      el.innerHTML = PG.Chart.area(series, {
        id: 'det-' + c.id,
        color: (PG.familyMeta[c.family] || PG.familyMeta.freight).color,
        h: 260,
        label: PG.t(c.title) + ' — ' + PG.t('detail.impliedProbability')
      });
    }
    chartBox.querySelector('#dRange').addEventListener('click', function (e) {
      var b = closest(e.target, '.segbtn');
      if (!b) return;
      var all = this.querySelectorAll('.segbtn');
      for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-pressed', 'true');
      drawChart(Number(b.getAttribute('data-d')));
    });
    drawChart(30);

    /* ---- order book */
    var book = (PG.Sim && PG.Sim.book) ? PG.Sim.book(c) : { bids: [], asks: [], mid: c.price, spread: c.spread };
    var maxSize = 1;
    book.bids.concat(book.asks).forEach(function (l) { if (l.size > maxSize) maxSize = l.size; });

    function ladder(levels, side) {
      var cum = 0;
      return levels.map(function (l) {
        cum += l.size;
        var pct = Math.min(100, (l.size / maxSize) * 100);
        var col = side === 'bid' ? 'var(--up)' : 'var(--down)';
        return '<div class="book-row">'
          + '<span class="bar" style="background:' + col + ';width:' + pct.toFixed(1) + '%"></span>'
          + '<span style="color:' + col + '">' + PG.cents(l.p) + '</span>'
          + '<span class="sz">' + PG.esc(PG.fmtUSD(l.size)) + '</span>'
          + '<span class="tot">' + PG.esc(PG.fmtUSD(cum)) + '</span></div>';
      }).join('');
    }

    var bookBox = PG.el('div');
    bookBox.innerHTML = '<div class="row" style="justify-content:space-between;margin-bottom:14px">'
      + '<h3>' + E('detail.orderBook') + '</h3>' + demoTag() + '</div>'
      + '<div class="grid2" style="gap:24px"><div class="panel" style="padding:14px">'
      + '<div class="book"><div class="book-head"><span>' + E('cols.price') + '</span>'
      + '<span class="sz">' + E('cols.size') + '</span><span class="tot">' + E('cols.total') + '</span></div>'
      + ladder(book.asks.slice().reverse(), 'ask')
      + '<div class="book-mid"><span class="quiet">' + E('cols.spread') + '</span>'
      + '<strong>' + Math.round(book.spread * 100) + '¢</strong></div>'
      + ladder(book.bids, 'bid')
      + '</div></div>'
      + '<div><div id="dDepth"></div><p class="tiny" style="margin-top:10px">'
      + E('cols.depth') + ' · ' + E('demo.paperNotice') + '</p></div></div>';
    left.appendChild(bookBox);

    if (PG.Chart && PG.Chart.depth) {
      bookBox.querySelector('#dDepth').innerHTML = PG.Chart.depth(book, { id: 'dep-' + c.id, h: 200 });
    }

    /* ---- specification */
    var spec = PG.el('div');
    function specRow(label, value) {
      return '<tr><td class="k" style="width:34%">' + PG.esc(label) + '</td><td>' + value + '</td></tr>';
    }
    var rows = ''
      + specRow(PG.t('detail.question'), PG.esc(PG.t(c.question)))
      + specRow(PG.t('detail.resolutionSource'), '<strong>' + PG.esc(PG.t(c.resolves)) + '</strong>'
          + (c.sourceTag ? ' <span class="pill">' + PG.esc(c.sourceTag) + '</span>' : ''))
      + specRow(PG.t('cols.cadence'), PG.esc(PG.t(c.cadence)))
      + specRow(PG.t('detail.listed'), PG.esc(PG.fmtDate(c.listed)))
      + specRow(PG.t('detail.expires'), PG.esc(PG.fmtDate(c.expiry)))
      + specRow(PG.t('detail.settlement'), PG.esc(PG.t(RULES.settlement)))
      + specRow(PG.t('detail.tieBreak'), PG.esc(PG.t(RULES.tieBreak)))
      + specRow(PG.t('detail.challengeWindow'), PG.esc(PG.t(RULES.challenge)))
      + specRow(PG.t('ticket.minAmount'), PG.esc(PG.t(RULES.minTicket)))
      + specRow(PG.t('detail.settlement') + ' · ' + PG.t('cols.status'), PG.esc(PG.t(RULES.custody)));

    if (c.type === 'scalar' && c.unit) {
      rows += specRow(PG.t('cols.price') + ' · ' + PG.t('chart.probability'),
        PG.esc(PG.t(c.unit)) + (c.range ? ' · ' + c.range[0] + '–' + c.range[1] : '')
        + (c.strike !== null && c.strike !== undefined ? ' · strike ' + PG.esc(String(c.strike)) : ''));
    }
    if (c.status === 'resolved' && c.resolved) {
      rows += specRow(PG.t('status.resolved'), '<strong style="color:'
        + (c.resolved === 'YES' ? 'var(--up)' : 'var(--down)') + '">' + PG.esc(c.resolved) + '</strong>');
    }

    spec.innerHTML = '<h3 style="margin-bottom:14px">' + E('detail.specification') + '</h3>'
      + '<div class="tbl-wrap"><table class="tbl"><tbody>' + rows + '</tbody></table></div>'
      + '<p class="tiny" style="margin-top:12px">' + E('detail.rulebook') + '</p>';
    left.appendChild(spec);

    /* ---- ticket */
    right.appendChild(ticket(c, book));

    /* ---- positions */
    var posBox = PG.el('div');
    posBox.id = 'dPositions';
    right.appendChild(posBox);
    renderPositions(posBox);

    /* ---- related */
    var rel = (PG.contracts || []).filter(function (o) {
      return o.family === c.family && o.id !== c.id;
    }).slice(0, 4);
    if (rel.length) {
      var relBox = PG.el('div');
      relBox.innerHTML = '<h3 style="margin-bottom:14px">' + E('detail.relatedContracts') + '</h3>'
        + rel.map(function (o) {
            return '<a href="#/markets/' + PG.esc(o.id) + '" class="spread" style="text-decoration:none;'
              + 'padding:11px 0;border-bottom:1px solid var(--rule-soft)">'
              + '<span><span class="code">' + PG.esc(o.id) + '</span>'
              + '<span class="small" style="display:block;color:var(--ink);margin-top:3px">'
              + PG.esc(PG.t(o.title)) + '</span></span>'
              + '<span class="px px-yes" data-px="' + PG.esc(o.id) + '">' + PG.cents(o.price) + '</span></a>';
          }).join('');
      right.appendChild(relBox);
    }

    PG.refreshPrices(root);
    return root;
  };

  /* ------------------------------------------------------------ ticket */

  function ticket(c, book) {
    var box = PG.el('div', 'ticket');
    var tradable = PG.isTradable(c);

    box.innerHTML = '<div class="row" style="justify-content:space-between;margin-bottom:16px">'
      + '<h3 style="font-size:17px">' + E('detail.tradeTicket') + '</h3>'
      + '<span class="demo-tag">' + E('ticket.paperOnly') + '</span></div>'
      + '<div class="seg" id="tSide" style="width:100%">'
      + '<button class="segbtn" type="button" data-side="YES" aria-pressed="true" style="flex:1">'
      + E('ticket.buyYes') + '</button>'
      + '<button class="segbtn" type="button" data-side="NO" aria-pressed="false" style="flex:1">'
      + E('ticket.buyNo') + '</button></div>'
      + '<div class="field" style="margin-top:16px"><label for="tAmt">' + E('ticket.amount') + ' (USD)</label>'
      + '<input class="input num" id="tAmt" type="number" min="1" step="1" value="100"></div>'
      + '<div class="row" style="gap:6px;margin-top:10px">'
      + [25, 100, 500, 2500].map(function (v) {
          return '<button class="btn btn-ghost btn-sm js-amt" type="button" data-v="' + v + '">$' + v + '</button>';
        }).join('')
      + '</div>'
      + '<div style="margin-top:18px" id="tOut"></div>'
      + '<button class="btn btn-primary" id="tPlace" style="width:100%;margin-top:16px"'
      + (tradable ? '' : ' disabled') + '>' + E('ticket.place') + '</button>'
      + '<p class="tiny" style="margin-top:12px">' + E('demo.paperNotice') + '</p>';

    var side = 'YES';

    function quote() {
      var amt = Number(box.querySelector('#tAmt').value) || 0;
      var f = (PG.Sim && PG.Sim.fill) ? PG.Sim.fill(book, side, amt)
        : { shares: 0, avgPrice: 0, partial: true };
      var out = box.querySelector('#tOut');
      var payout = f.shares;               // each share settles at $1 if correct
      var profit = payout - (f.shares * f.avgPrice);
      out.innerHTML =
        '<div class="out"><span>' + E('ticket.avgPrice') + '</span><b>'
        + (f.avgPrice ? PG.cents(f.avgPrice) : '—') + '</b></div>'
        + '<div class="out"><span>' + E('ticket.shares') + '</span><b>'
        + PG.fmtNum(f.shares, 1) + '</b></div>'
        + '<div class="out"><span>' + E('ticket.costBasis') + '</span><b>'
        + PG.esc(PG.fmtUSD(f.shares * f.avgPrice)) + '</b></div>'
        + '<div class="out"><span>' + E('ticket.maxPayout') + '</span><b>'
        + PG.esc(PG.fmtUSD(payout)) + '</b></div>'
        + '<div class="out"><span>' + E('ticket.profitIfRight') + '</span><b style="color:var(--up)">+'
        + PG.esc(PG.fmtUSD(profit)) + '</b></div>'
        + (f.partial && amt > 0
            ? '<p class="tiny" style="margin-top:10px;color:var(--down)">' + E('ticket.insufficientDepth') + '</p>'
            : '');
      return f;
    }

    box.querySelector('#tSide').addEventListener('click', function (e) {
      var b = closest(e.target, '.segbtn');
      if (!b) return;
      var all = this.querySelectorAll('.segbtn');
      for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-pressed', 'true');
      side = b.getAttribute('data-side');
      quote();
    });
    box.addEventListener('click', function (e) {
      var b = closest(e.target, '.js-amt');
      if (!b) return;
      box.querySelector('#tAmt').value = b.getAttribute('data-v');
      quote();
    });
    box.querySelector('#tAmt').addEventListener('input', quote);

    box.querySelector('#tPlace').addEventListener('click', function () {
      if (!tradable) return;
      var amt = Number(box.querySelector('#tAmt').value) || 0;
      if (amt < 1) { PG.toast(PG.t('ticket.minAmount') + ' — US$1'); return; }
      var f = quote();
      if (!f.shares) { PG.toast(PG.t('ticket.insufficientDepth')); return; }
      var p = positions();
      p.push({
        id: c.id, side: side, usd: f.shares * f.avgPrice,
        shares: f.shares, avgPrice: f.avgPrice, t: PG.NOW
      });
      savePositions(p);
      PG.toast(PG.t('ticket.placed') + ' · ' + side + ' ' + PG.fmtUSD(f.shares * f.avgPrice));
      var holder = document.getElementById('dPositions');
      if (holder) renderPositions(holder);
    });

    quote();
    return box;
  }

  /* --------------------------------------------------------- positions */

  function renderPositions(box) {
    var p = positions();
    if (!p.length) {
      box.innerHTML = '<h3 style="margin-bottom:10px">' + E('ticket.positions') + '</h3>'
        + '<p class="small">' + E('ticket.noPositions') + '</p>';
      return;
    }
    var rows = p.map(function (pos, i) {
      var c = (PG.byId || {})[pos.id];
      var cur = c ? (pos.side === 'YES' ? c.price : 1 - c.price) : pos.avgPrice;
      var value = pos.shares * cur;
      var pnl = value - pos.usd;
      return '<tr><td class="k"><a href="#/markets/' + PG.esc(pos.id) + '" class="code" '
        + 'style="text-decoration:none">' + PG.esc(pos.id) + '</a>'
        + '<div class="tiny" style="margin-top:3px">' + PG.esc(pos.side) + ' · '
        + PG.fmtNum(pos.shares, 1) + ' @ ' + PG.cents(pos.avgPrice) + '</div></td>'
        + '<td class="n num">' + PG.esc(PG.fmtUSD(value)) + '</td>'
        + '<td class="n num" style="color:' + (pnl >= 0 ? 'var(--up)' : 'var(--down)') + '">'
        + (pnl >= 0 ? '+' : '') + PG.esc(PG.fmtUSD(pnl)) + '</td>'
        + '<td class="n"><button class="navbtn js-close" type="button" data-i="' + i + '" '
        + 'style="padding:4px 6px" aria-label="' + E('ticket.closePosition') + '">&times;</button></td></tr>';
    }).join('');

    box.innerHTML = '<div class="row" style="justify-content:space-between;margin-bottom:12px">'
      + '<h3 style="font-size:17px">' + E('ticket.positions') + '</h3>'
      + '<button class="navbtn js-clear" type="button" style="padding:4px 6px">'
      + E('ticket.clearAll') + '</button></div>'
      + '<div class="tbl-wrap"><table class="tbl"><thead><tr>'
      + '<th>' + E('ticket.position') + '</th><th class="n">' + E('ticket.current') + '</th>'
      + '<th class="n">' + E('ticket.pnl') + '</th><th></th></tr></thead>'
      + '<tbody>' + rows + '</tbody></table></div>'
      + '<p class="tiny" style="margin-top:10px">' + E('ticket.paperOnly') + '</p>';

    bindPositions(box);
  }

  // The box is re-rendered in place on every change, so the delegated listener
  // is attached exactly once — otherwise handlers stack up with each render.
  function bindPositions(box) {
    if (box.getAttribute('data-bound') === '1') return;
    box.setAttribute('data-bound', '1');
    box.addEventListener('click', function (e) {
      var x = closest(e.target, '.js-close');
      if (x) {
        var list = positions();
        list.splice(Number(x.getAttribute('data-i')), 1);
        savePositions(list);
        renderPositions(box);
        return;
      }
      if (closest(e.target, '.js-clear')) {
        savePositions([]);
        renderPositions(box);
        PG.toast(PG.t('ticket.clearedAll'));
      }
    });
  }
})();
