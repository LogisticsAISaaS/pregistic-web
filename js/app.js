/* Pregistic — runtime: i18n, theme, router, ticker, shared helpers.
   Loaded LAST. Everything else attaches to window.PG and waits to be called. */
window.PG = window.PG || {};

(function () {
  'use strict';

  /* ---------------------------------------------------------------- state */

  // The site's internal "today". Fixed so date maths (days-to-expiry, chart
  // axes, settlement records) stay stable and match the seed deck's as-of date.
  PG.NOW = Date.parse('2026-09-14T00:00:00Z');

  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem('pg.' + k); return v === null ? d : v; }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('pg.' + k, v); } catch (e) { /* private mode */ }
    },
    getJSON: function (k, d) {
      try { var v = localStorage.getItem('pg.' + k); return v ? JSON.parse(v) : d; }
      catch (e) { return d; }
    },
    setJSON: function (k, v) {
      try { localStorage.setItem('pg.' + k, JSON.stringify(v)); } catch (e) { /* noop */ }
    }
  };
  PG.store = store;

  PG.lang = store.get('lang', 'en') === 'zh' ? 'zh' : 'en';

  /* ------------------------------------------------------------------ i18n */

  var DOTTED = /^[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z0-9]+)+$/;

  // Strings the app itself needs that are not part of the generated dictionary,
  // plus a floor under anything the dictionary happens to miss.
  var DEFAULTS = {
    board: {
      heading: { en: 'Sixty contracts on events that are already dated.',
                 zh: '六十份合約，全部押在早已確定日期的事件上。' },
      lede: { en: 'Every market below names its resolution source before it lists. Filter by family, sort by what is moving, and open any contract for its full specification.',
              zh: '以下每一個市場都在掛牌前公告其結算來源。可按類別篩選、按波動排序，並開啟任何合約查看完整規格。' },
      trend: { en: '30d', zh: '30 日' }
    }
  };

  function mergeDefaults(target, src) {
    for (var k in src) {
      if (!Object.prototype.hasOwnProperty.call(src, k)) continue;
      if (target[k] === undefined) { target[k] = src[k]; continue; }
      if (src[k] && typeof src[k] === 'object' && !src[k].en && typeof target[k] === 'object') {
        mergeDefaults(target[k], src[k]);
      }
    }
  }

  // "change24h" -> "Change 24h". A readable last resort, never a raw key.
  function humanise(key) {
    var s = key.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/[_-]+/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  PG.t = function (v) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'number') return String(v);
    if (typeof v === 'string') {
      if (DOTTED.test(v)) {
        var cur = PG.strings, parts = v.split('.'), i;
        for (i = 0; i < parts.length && cur; i++) cur = cur[parts[i]];
        if (cur && typeof cur === 'object') return PG.t(cur);
        if (typeof cur === 'string') return cur;
        return humanise(parts[parts.length - 1]);
      }
      return v;
    }
    if (typeof v === 'object') return v[PG.lang] || v.en || v.zh || '';
    return String(v);
  };

  /* ------------------------------------------------------------- utilities */

  PG.esc = function (s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  // Content strings may carry a tiny inline subset: strong / em / a / br.
  PG.rich = function (v) {
    var s = PG.t(v);
    if (!s) return '';
    return PG.esc(s)
      .replace(/&lt;(\/?)(strong|em|br)&gt;/g, '<$1$2>')
      .replace(/&lt;a href=&quot;([^"&]+)&quot;&gt;/g, '<a href="$1">')
      .replace(/&lt;\/a&gt;/g, '</a>');
  };

  PG.el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined && html !== null) n.innerHTML = html;
    return n;
  };

  PG.fmtUSD = function (v) {
    var a = Math.abs(v || 0);
    if (a >= 1e9) return '$' + (v / 1e9).toFixed(a >= 1e10 ? 1 : 2) + 'bn';
    if (a >= 1e6) return '$' + (v / 1e6).toFixed(a >= 1e8 ? 1 : 2) + 'm';
    if (a >= 1e3) return '$' + Math.round(v / 1e3) + 'k';
    return '$' + Math.round(v || 0);
  };

  PG.fmtNum = function (v, dp) {
    var n = Number(v) || 0;
    return n.toLocaleString('en-US', {
      minimumFractionDigits: dp || 0, maximumFractionDigits: dp === undefined ? 0 : dp
    });
  };

  // Prices are probabilities. The board shows them in cents, the way an
  // event-contract book quotes: 34c means a 34% implied probability.
  PG.cents = function (p) { return Math.round((Number(p) || 0) * 100) + '¢'; };
  PG.pct = function (p, dp) { return ((Number(p) || 0) * 100).toFixed(dp === undefined ? 1 : dp) + '%'; };

  PG.fmtDate = function (iso, style) {
    var d = typeof iso === 'number' ? new Date(iso) : new Date(iso + 'T00:00:00Z');
    if (isNaN(d.getTime())) return String(iso);
    var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()];
    var zh = PG.lang === 'zh';
    if (style === 'short') {
      return zh ? (d.getUTCMonth() + 1) + '月' + d.getUTCDate() + '日'
                : d.getUTCDate() + ' ' + mon;
    }
    return zh
      ? d.getUTCFullYear() + '年' + (d.getUTCMonth() + 1) + '月' + d.getUTCDate() + '日'
      : d.getUTCDate() + ' ' + mon + ' ' + d.getUTCFullYear();
  };

  PG.daysTo = function (iso) {
    var d = Date.parse(iso + 'T00:00:00Z');
    if (isNaN(d)) return 0;
    return Math.round((d - PG.NOW) / 86400000);
  };

  PG.familyMeta = {
    freight:    { cls: 'chip-freight',    color: 'var(--fam-freight)' },
    chokepoint: { cls: 'chip-chokepoint', color: 'var(--fam-chokepoint)' },
    policy:     { cls: 'chip-policy',     color: 'var(--fam-policy)' },
    air:        { cls: 'chip-air',        color: 'var(--fam-air)' }
  };
  PG.familyOrder = ['freight', 'chokepoint', 'policy', 'air'];

  PG.familyLabel = function (f) { return PG.t('family.' + f); };

  var toastTimer = null;
  PG.toast = function (msg) {
    var old = document.querySelector('.toast');
    if (old) old.parentNode.removeChild(old);
    var n = PG.el('div', 'toast', PG.esc(msg));
    n.setAttribute('role', 'status');
    document.body.appendChild(n);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      if (n.parentNode) n.parentNode.removeChild(n);
    }, 2600);
  };

  /* ------------------------------------------------------- contract corpus */

  function buildCorpus() {
    var byFam = PG.contractsByFamily || {};
    var all = [];
    PG.familyOrder.forEach(function (f) {
      var list = byFam[f];
      if (Object.prototype.toString.call(list) === '[object Array]') {
        list.forEach(function (c) { if (c && c.id) all.push(c); });
      }
    });

    PG.contracts = all;
    PG.byId = {};

    all.forEach(function (c, i) {
      PG.byId[c.id] = c;

      // Normalise anything a data file may have left loose.
      c.price = Math.min(0.99, Math.max(0.01, Number(c.price) || 0.5));
      c.open = Math.min(0.99, Math.max(0.01, Number(c.open) || c.price));
      c.spread = Math.min(0.12, Math.max(0.01, Number(c.spread) || 0.02));
      c.seed = Number(c.seed) || (1000 + i * 37);
      c.vol24 = Number(c.vol24) || 0;
      c.oi = Number(c.oi) || 0;
      if (PG.familyOrder.indexOf(c.family) < 0) c.family = 'freight';

      // A deterministic 24h baseline, so the session-drifting live price always
      // has something honest to be measured against.
      var r = (PG.Sim && PG.Sim.rng) ? PG.Sim.rng(c.seed ^ 0x5f3759df) : function () { return 0.5; };
      var swing = (r() - 0.5) * 0.11 * (1 + c.price * (1 - c.price) * 2);
      c.p24 = Math.min(0.97, Math.max(0.03, c.price - swing));
    });

    return all.length;
  }

  PG.change24 = function (c) { return c.price - c.p24; };
  PG.change30 = function (c) { return c.price - c.open; };

  PG.isTradable = function (c) { return c.status === 'live' || c.status === 'closing'; };

  /* ------------------------------------------------------------ live ticks */

  function tickOnce() {
    if (document.hidden || !PG.Sim || !PG.Sim.tick) return;
    var pool = PG.contracts.filter(PG.isTradable);
    if (!pool.length) return;
    var n = Math.max(1, Math.round(pool.length * 0.14));
    for (var i = 0; i < n; i++) {
      var c = pool[Math.floor(Math.random() * pool.length)];
      var next = PG.Sim.tick(c);
      if (typeof next === 'number' && isFinite(next)) {
        c.price = Math.min(0.99, Math.max(0.01, next));
      }
    }
    PG.refreshPrices();
  }

  // Any element can subscribe to price updates by carrying data-px / data-chg.
  PG.refreshPrices = function (root) {
    var scope = root || document;
    var i, n, c, nodes;

    nodes = scope.querySelectorAll('[data-px]');
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i]; c = PG.byId[n.getAttribute('data-px')];
      if (!c) continue;
      var side = n.getAttribute('data-side');
      n.textContent = PG.cents(side === 'no' ? 1 - c.price : c.price);
    }

    nodes = scope.querySelectorAll('[data-chg]');
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i]; c = PG.byId[n.getAttribute('data-chg')];
      if (!c) continue;
      var d = n.getAttribute('data-window') === '30'
        ? PG.change30(c) : PG.change24(c);
      var pts = Math.round(d * 100);
      n.textContent = (pts > 0 ? '+' : '') + pts;
      n.className = 'delta ' + (pts > 0 ? 'delta-up' : pts < 0 ? 'delta-dn' : 'quiet');
    }
  };

  /* --------------------------------------------------------------- ticker */

  function buildTicker() {
    var track = document.getElementById('tickerTrack');
    if (!track) return;
    var picks = PG.contracts.filter(PG.isTradable)
      .slice()
      .sort(function (a, b) { return b.vol24 - a.vol24; })
      .slice(0, 16);
    if (!picks.length) { document.getElementById('ticker').hidden = true; return; }

    function row(c) {
      var fam = PG.familyMeta[c.family] || PG.familyMeta.freight;
      return '<a class="tickitem" href="#/markets/' + PG.esc(c.id) + '">'
        + '<span style="width:5px;height:5px;border-radius:50%;background:' + fam.color + '"></span>'
        + '<b>' + PG.esc(c.id) + '</b>'
        + '<span class="px" data-px="' + PG.esc(c.id) + '">' + PG.cents(c.price) + '</span>'
        + '<span class="delta" data-chg="' + PG.esc(c.id) + '"></span>'
        + '</a>';
    }
    // Doubled so the -50% translate loops seamlessly.
    var html = picks.map(row).join('');
    track.innerHTML = html + html;
    PG.refreshPrices(track);
  }

  /* ---------------------------------------------------------------- router */

  // Routes served publicly. Additional pages are enabled by adding their key
  // here and loading the matching content module in index.html.
  var ROUTES = ['home', 'markets', 'how', 'curve', 'about', 'legal'];

  function parseHash() {
    var h = (location.hash || '').replace(/^#/, '');
    var query = {};

    // #/markets?family=freight — strip and parse the query before routing.
    var qi = h.indexOf('?');
    if (qi >= 0) {
      h.slice(qi + 1).split('&').forEach(function (kv) {
        if (!kv) return;
        var eq = kv.indexOf('=');
        var k = eq < 0 ? kv : kv.slice(0, eq);
        var v = eq < 0 ? '' : kv.slice(eq + 1);
        try { query[decodeURIComponent(k)] = decodeURIComponent(v); }
        catch (e) { query[k] = v; }
      });
      h = h.slice(0, qi);
    }

    if (!h || h === '/') return { route: 'home', param: null, query: query };
    var parts = h.split('/').filter(function (p) { return p.length; });
    var route = parts[0] || 'home';
    if (ROUTES.indexOf(route) < 0) return { route: '404', param: route, query: query };
    var param = null;
    if (parts[1]) {
      try { param = decodeURIComponent(parts[1]); } catch (e) { param = parts[1]; }
    }
    return { route: route, param: param, query: query };
  }

  function notFound(what) {
    var w = PG.el('div', 'wrap head');
    w.innerHTML = '<span class="eyebrow">' + PG.esc(PG.t('misc.page404')) + '</span>'
      + '<h1 style="margin-top:14px">' + PG.esc(PG.t('misc.notFound')) + '</h1>'
      + '<p class="lede" style="margin-top:16px">' + PG.esc(PG.t('misc.notFoundHint'))
      + (what ? ' <span class="mono quiet">' + PG.esc(what) + '</span>' : '') + '</p>'
      + '<p style="margin-top:26px"><a class="btn" href="#/">Pregistic</a></p>';
    return w;
  }

  function moduleMissing(name) {
    var w = PG.el('div', 'wrap head');
    w.innerHTML = '<span class="eyebrow">' + PG.esc(PG.t('misc.error')) + '</span>'
      + '<h1 style="margin-top:14px">' + PG.esc(PG.t('misc.notFound')) + '</h1>'
      + '<p class="lede" style="margin-top:16px">This section did not load. '
      + '<span class="mono quiet">' + PG.esc(name) + '</span></p>';
    return w;
  }

  var lastRoute = null;

  function render() {
    var r = parseHash();
    var main = document.getElementById('main');
    if (!main) return;

    var node;
    try {
      if (r.route === '404') {
        node = notFound(r.param);
      } else if (r.route === 'markets') {
        if (!PG.Markets) node = moduleMissing('markets');
        else node = r.param ? PG.Markets.detail(r.param) : PG.Markets.board(r.query);
      } else if (!PG.Pages || !PG.Pages.render) {
        node = moduleMissing('pages');
      } else if (!PG.content || !PG.content[r.route]) {
        node = moduleMissing('content.' + r.route);
      } else {
        node = PG.Pages.render(r.route);
      }
    } catch (err) {
      if (window.console && console.error) console.error('[pregistic] render failed', err);
      node = moduleMissing(r.route + ' — ' + (err && err.message ? err.message : 'error'));
    }

    main.innerHTML = '';
    if (node) main.appendChild(node);
    main.classList.remove('view-in');
    void main.offsetWidth;
    main.classList.add('view-in');

    // Active nav
    var links = document.querySelectorAll('.navbtn[data-route]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('data-route') === r.route) links[i].setAttribute('aria-current', 'page');
      else links[i].removeAttribute('aria-current');
    }

    var key = r.route + '/' + (r.param || '');
    if (key !== lastRoute) window.scrollTo(0, 0);
    lastRoute = key;

    closeMenu();
    PG.refreshPrices(main);
  }
  PG.render = render;

  /* ------------------------------------------------------- chrome bindings */

  function applyStatic() {
    var nodes = document.querySelectorAll('[data-t]');
    for (var i = 0; i < nodes.length; i++) {
      var v = PG.t(nodes[i].getAttribute('data-t'));
      if (v) nodes[i].textContent = v;
    }
    var lb = document.getElementById('langBtn');
    if (lb) {
      lb.textContent = PG.lang === 'en' ? '繁中' : 'EN';
      lb.setAttribute('aria-label', PG.t('nav.language'));
    }
    var tb = document.getElementById('themeBtn');
    if (tb) tb.setAttribute('aria-label', PG.t('nav.theme'));

    var fn = document.getElementById('footNote');
    if (fn) {
      fn.innerHTML = PG.esc(PG.t('demo.notice')) + ' '
        + '<a href="#/legal" style="display:inline;color:var(--gold)">'
        + PG.esc(PG.t('nav.legal')) + '</a>. &copy; 2026 Chainova Technology Limited.';
    }
    document.title = 'Pregistic';
  }

  function setLang(l) {
    PG.lang = l === 'zh' ? 'zh' : 'en';
    store.set('lang', PG.lang);
    document.documentElement.setAttribute('data-lang', PG.lang);
    document.documentElement.setAttribute('lang', PG.lang === 'zh' ? 'zh-Hant' : 'en');
    applyStatic();
    buildTicker();
    render();
  }

  function currentTheme() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t) return t;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark' : 'light';
  }

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    store.set('theme', t);
  }

  function closeMenu() {
    var nav = document.getElementById('navMain');
    var btn = document.getElementById('menuBtn');
    if (nav) nav.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function bindChrome() {
    var lb = document.getElementById('langBtn');
    if (lb) lb.addEventListener('click', function () { setLang(PG.lang === 'en' ? 'zh' : 'en'); });

    var tb = document.getElementById('themeBtn');
    if (tb) tb.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });

    var mb = document.getElementById('menuBtn');
    var nav = document.getElementById('navMain');
    if (mb && nav) {
      mb.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        mb.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('hashchange', render);
  }

  /* ------------------------------------------------------------------ boot */

  function boot() {
    var savedTheme = store.get('theme', null);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    document.documentElement.setAttribute('data-lang', PG.lang);
    document.documentElement.setAttribute('lang', PG.lang === 'zh' ? 'zh-Hant' : 'en');

    PG.strings = PG.strings || {};
    mergeDefaults(PG.strings, DEFAULTS);

    var n = buildCorpus();
    if (window.console && console.info) {
      console.info('[pregistic] ' + n + ' contracts loaded');
    }

    applyStatic();
    bindChrome();
    buildTicker();
    render();

    setInterval(tickOnce, 4500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
