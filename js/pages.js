/* Pregistic — generic content renderer.
   Turns the declarative section objects in PG.content.* into DOM.
   Section shapes are documented in SPEC.md. */
window.PG = window.PG || {};

(function () {
  'use strict';

  var T = function (v) { return PG.t(v); };
  var E = function (v) { return PG.esc(PG.t(v)); };
  var R = function (v) { return PG.rich(v); };

  /* ------------------------------------------------------------- fragments */

  function sechead(s) {
    var out = '';
    if (s.eyebrow) out += '<span class="eyebrow">' + E(s.eyebrow) + '</span>';
    if (s.heading) out += '<h2>' + R(s.heading) + '</h2>';
    if (s.lede) out += '<p class="lede">' + R(s.lede) + '</p>';
    return out ? '<div class="sechead">' + out + '</div>' : '';
  }

  function section(inner, extraCls) {
    var s = PG.el('section', 'sec' + (extraCls ? ' ' + extraCls : ''));
    var w = PG.el('div', 'wrap');
    w.innerHTML = inner;
    s.appendChild(w);
    return s;
  }

  /* -------------------------------------------------------------- one kind */

  var KINDS = {};

  KINDS.hero = function (s) {
    var out = '';
    if (s.eyebrow) out += '<span class="eyebrow">' + E(s.eyebrow) + '</span>';
    out += '<h1 style="margin-top:16px;max-width:19ch">' + R(s.heading) + '</h1>';
    if (s.lede) out += '<p class="lede" style="margin-top:22px;font-size:18px">' + R(s.lede) + '</p>';
    if (s.note) out += '<p class="small" style="margin-top:18px">' + R(s.note) + '</p>';
    if (s.ctas && s.ctas.length) {
      out += '<div class="row" style="margin-top:30px;gap:10px">';
      s.ctas.forEach(function (c) {
        out += '<a class="btn ' + (c.primary ? 'btn-primary' : 'btn-ghost') + '" href="'
          + PG.esc(c.href || '#/') + '">' + E(c.label) + '</a>';
      });
      out += '</div>';
    }
    var n = PG.el('div', 'wrap head');
    n.innerHTML = out;
    return n;
  };

  KINDS.stats = function (s) {
    var out = sechead(s) + '<div class="grid4">';
    (s.items || []).forEach(function (it) {
      out += '<div class="stat"><div class="n">' + R(it.value) + '</div>'
        + '<div class="l">' + R(it.label) + '</div>'
        + (it.source ? '<span class="srcline">' + E(it.source) + '</span>' : '')
        + '</div>';
    });
    return section(out + '</div>');
  };

  KINDS.cards = function (s) {
    var items = s.items || [];
    var cls = items.length === 4 ? 'grid4' : items.length === 2 ? 'grid2' : 'grid3';
    if (items.length > 4) cls = 'grid-auto';
    var out = sechead(s) + '<div class="' + cls + '">';
    items.forEach(function (it) {
      out += '<div class="card">'
        + (it.tag ? '<span class="eyebrow">' + E(it.tag) + '</span>' : '')
        + (it.title ? '<h3>' + R(it.title) + '</h3>' : '')
        + (it.body ? '<p class="small">' + R(it.body) + '</p>' : '');
      if (it.bullets && it.bullets.length) {
        out += '<ul class="k" style="margin-top:4px">';
        it.bullets.forEach(function (b) { out += '<li>' + R(b) + '</li>'; });
        out += '</ul>';
      }
      out += (it.foot ? '<span class="srcline">' + E(it.foot) + '</span>' : '') + '</div>';
    });
    return section(out + '</div>');
  };

  function cellHTML(cell, align) {
    var cls = align === 'right' ? 'n' : '';
    if (cell === null || cell === undefined) return '<td class="' + cls + '"></td>';
    if (typeof cell === 'object' && (cell.value !== undefined || cell.sub !== undefined || cell.flag)) {
      var inner = cell.value !== undefined ? R(cell.value) : '';
      if (cell.strong) { inner = '<strong>' + inner + '</strong>'; cls += ' k'; }
      if (cell.flag === 'con') inner += '<span class="flag flag-con">constructed</span>';
      if (cell.flag === 'src') inner += '<span class="flag flag-src">sourced</span>';
      if (cell.sub) inner += '<div class="tiny" style="margin-top:4px">' + R(cell.sub) + '</div>';
      return '<td class="' + cls.trim() + '">' + inner + '</td>';
    }
    return '<td class="' + cls + '">' + R(cell) + '</td>';
  }

  KINDS.table = function (s) {
    var cols = s.cols || [];
    var out = sechead(s) + '<div class="tbl-wrap"><table class="tbl"><thead><tr>';
    cols.forEach(function (c) {
      out += '<th class="' + (c.align === 'right' ? 'n' : '') + '"'
        + (c.width ? ' style="width:' + PG.esc(c.width) + '"' : '') + '>' + E(c.label) + '</th>';
    });
    out += '</tr></thead><tbody>';
    (s.rows || []).forEach(function (row) {
      var meta = {};
      var cells = row;
      // A row may be [cells…] or {cells:[…], hl:true, total:true}
      if (!(Object.prototype.toString.call(row) === '[object Array]')) {
        meta = row; cells = row.cells || [];
      }
      out += '<tr class="' + (meta.hl ? 'hl ' : '') + (meta.total ? 'total' : '') + '">';
      cells.forEach(function (cell, i) {
        out += cellHTML(cell, cols[i] && cols[i].align);
      });
      out += '</tr>';
    });
    out += '</tbody></table></div>';
    if (s.note) out += '<p class="tiny" style="margin-top:14px;max-width:88ch">' + R(s.note) + '</p>';
    return section(out);
  };

  KINDS.steps = function (s) {
    var items = s.items || [];
    var out = sechead(s) + '<div class="' + (items.length === 5 ? 'grid-auto' : 'grid4') + '">';
    items.forEach(function (it, i) {
      out += '<div class="card"><span class="eyebrow">'
        + PG.esc(it.step ? T(it.step) : ('0' + (i + 1)).slice(-2)) + '</span>'
        + '<h3>' + R(it.title) + '</h3>'
        + '<p class="small">' + R(it.body) + '</p></div>';
    });
    out += '</div>';
    if (s.note) out += '<p class="tiny" style="margin-top:16px;max-width:88ch">' + R(s.note) + '</p>';
    return section(out);
  };

  function sideHTML(side) {
    if (!side) return '';
    var out = '';
    if (side.tag) out += '<span class="eyebrow">' + E(side.tag) + '</span>';
    if (side.title) out += '<h3 style="margin:10px 0 10px">' + R(side.title) + '</h3>';
    if (side.body) out += '<p class="small">' + R(side.body) + '</p>';
    if (side.bullets && side.bullets.length) {
      out += '<ul class="k" style="margin-top:14px">';
      side.bullets.forEach(function (b) {
        if (b && typeof b === 'object' && b.title) {
          out += '<li><strong>' + R(b.title) + '</strong> ' + R(b.body) + '</li>';
        } else {
          out += '<li>' + R(b) + '</li>';
        }
      });
      out += '</ul>';
    }
    return out;
  }

  KINDS.split = function (s) {
    return section(sechead(s) + '<div class="grid2">'
      + '<div class="card">' + sideHTML(s.left) + '</div>'
      + '<div class="card">' + sideHTML(s.right) + '</div></div>');
  };

  KINDS.bullets = function (s) {
    var items = s.items || [];
    var out = sechead(s) + '<div class="grid2"><div><ul class="k">';
    var half = Math.ceil(items.length / 2);
    items.forEach(function (it, i) {
      if (i === half) out += '</ul></div><div><ul class="k">';
      if (it && typeof it === 'object' && it.title) {
        out += '<li><strong>' + R(it.title) + '</strong> ' + R(it.body) + '</li>';
      } else {
        out += '<li>' + R(it) + '</li>';
      }
    });
    out += '</ul></div></div>';
    if (s.note) out += '<p class="tiny" style="margin-top:16px;max-width:88ch">' + R(s.note) + '</p>';
    return section(out);
  };

  KINDS.quote = function (s) {
    return section('<blockquote style="margin:0;max-width:26ch">'
      + '<p class="display" style="font-size:clamp(24px,3.4vw,36px);line-height:1.2">'
      + R(s.text) + '</p>'
      + (s.attrib ? '<p class="srcline" style="margin-top:18px">' + E(s.attrib) + '</p>' : '')
      + '</blockquote>');
  };

  KINDS.timeline = function (s) {
    var out = sechead(s) + '<div class="timeline">';
    (s.items || []).forEach(function (it) {
      out += '<div class="tl-item">'
        + '<span class="eyebrow">' + E(it.marker) + '</span>'
        + '<h3 style="margin:9px 0 12px">' + R(it.title) + '</h3><ul class="k">';
      (it.bullets || []).forEach(function (b) { out += '<li>' + R(b) + '</li>'; });
      out += '</ul>'
        + (it.target ? '<p class="small" style="margin-top:12px;color:var(--gold)"><strong>'
            + R(it.target) + '</strong></p>' : '')
        + '</div>';
    });
    return section(out + '</div>');
  };

  KINDS.callout = function (s) {
    var cls = s.tone === 'navy' ? 'callout-navy' : s.tone === 'gold' ? 'callout-gold' : 'callout';
    var out = '<div class="' + cls + '">'
      + (s.eyebrow ? '<span class="eyebrow">' + E(s.eyebrow) + '</span>' : '')
      + (s.title ? '<h3 style="margin:8px 0 10px">' + R(s.title) + '</h3>' : '')
      + '<p class="small">' + R(s.body) + '</p></div>';
    return section(out, 'sec-tight');
  };

  KINDS.faq = function (s) {
    var out = sechead(s) + '<div style="max-width:78ch">';
    (s.items || []).forEach(function (it) {
      out += '<details class="faq-item"><summary>' + R(it.q) + '</summary>'
        + '<div class="small">' + R(it.a) + '</div></details>';
    });
    return section(out + '</div>');
  };

  KINDS.sources = function (s) {
    var out = sechead(s) + '<div class="grid3">';
    (s.groups || []).forEach(function (g) {
      out += '<div><h4 style="font-family:var(--ff-mono);font-size:9.5px;letter-spacing:.15em;'
        + 'text-transform:uppercase;color:var(--faint);margin-bottom:12px">' + E(g.title) + '</h4>';
      (g.items || []).forEach(function (it) {
        out += '<p class="tiny" style="margin-bottom:11px">' + R(it) + '</p>';
      });
      out += '</div>';
    });
    out += '</div>';
    if (s.note) out += '<p class="tiny" style="margin-top:22px;max-width:96ch">' + R(s.note) + '</p>';
    return section(out);
  };

  /* --------------------------------------------------------- custom slots */

  var SLOTS = {};

  SLOTS['board-preview'] = function (s) {
    var n = section(sechead(s) + '<div id="slotBoardPreview"></div>');
    var mount = n.querySelector('#slotBoardPreview');
    if (PG.Markets && PG.Markets.preview) mount.appendChild(PG.Markets.preview(6));
    return n;
  };

  SLOTS['family-grid'] = function (s) {
    var out = sechead(s) + '<div class="grid4">';
    PG.familyOrder.forEach(function (f) {
      var meta = PG.familyMeta[f];
      var list = (PG.contracts || []).filter(function (c) { return c.family === f; });
      var tradable = list.filter(PG.isTradable).length;
      out += '<a class="card" style="text-decoration:none;border-top:2px solid ' + meta.color + '" '
        + 'href="#/markets?family=' + f + '">'
        + '<span class="chip ' + meta.cls + '">' + PG.esc(PG.familyLabel(f)) + '</span>'
        + '<h3 style="margin-top:10px">' + PG.esc(PG.t('family.' + f)) + '</h3>'
        + '<p class="small">' + PG.esc(PG.t('family.' + f + 'Desc')) + '</p>'
        + '<p class="num" style="margin-top:auto;padding-top:12px;font-size:12px;color:var(--muted)">'
        + list.length + ' ' + PG.esc(PG.t('board.results')) + ' · ' + tradable + ' '
        + PG.esc(PG.t('status.live')) + '</p></a>';
    });
    return section(out + '</div>');
  };

  SLOTS.model = function (s) {
    // Rendered only where the calculator module is loaded; otherwise omitted.
    if (!PG.Model || !PG.Model.render) return null;
    var n = section(sechead(s) + '<div id="slotModel"></div>');
    n.querySelector('#slotModel').appendChild(PG.Model.render());
    return n;
  };

  SLOTS['curve-demo'] = function (s) {
    var n = section(sechead(s) + '<div id="slotCurve"></div>');
    n.querySelector('#slotCurve').appendChild(curveDemo());
    return n;
  };

  SLOTS['api-explorer'] = function (s) {
    var n = section(sechead(s) + '<div id="slotApi"></div>');
    n.querySelector('#slotApi').appendChild(apiExplorer());
    return n;
  };

  SLOTS.contact = function (s) {
    var n = section(sechead(s) + '<div id="slotContact"></div>');
    n.querySelector('#slotContact').appendChild(contactForm());
    return n;
  };

  /* ------------------------------------------------------- the curve demo */

  function curveDemo() {
    var wrap = PG.el('div', 'panel');
    wrap.style.padding = '20px';

    var head = PG.el('div', 'row');
    head.style.justifyContent = 'space-between';
    head.style.marginBottom = '16px';

    var seg = PG.el('div', 'seg');
    PG.familyOrder.forEach(function (f, i) {
      var b = PG.el('button', 'segbtn', PG.esc(PG.familyLabel(f)));
      b.type = 'button';
      b.setAttribute('data-fam', f);
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      seg.appendChild(b);
    });
    head.appendChild(seg);
    head.appendChild(PG.el('span', 'demo-tag', PG.esc(PG.t('demo.badge'))));
    wrap.appendChild(head);

    var chart = PG.el('div');
    var legend = PG.el('div', 'tbl-wrap');
    wrap.appendChild(chart);
    wrap.appendChild(legend);

    function draw(fam) {
      var list = (PG.contracts || [])
        .filter(function (c) { return c.family === fam && c.status !== 'resolved'; })
        .sort(function (a, b) { return Date.parse(a.expiry) - Date.parse(b.expiry); });

      var series = list.map(function (c) {
        return { t: Date.parse(c.expiry + 'T00:00:00Z'), p: c.price };
      });

      if (PG.Chart && PG.Chart.area && series.length > 1) {
        chart.innerHTML = PG.Chart.area(series, {
          id: 'curve-' + fam,
          color: PG.familyMeta[fam].color,
          h: 240,
          label: PG.t('detail.impliedProbability')
        });
      } else {
        chart.innerHTML = '<p class="small">' + PG.esc(PG.t('board.noResults')) + '</p>';
      }

      var rows = '<table class="tbl"><thead><tr><th>' + PG.esc(PG.t('cols.contract'))
        + '</th><th>' + PG.esc(PG.t('cols.expiry'))
        + '</th><th class="n">' + PG.esc(PG.t('detail.impliedProbability'))
        + '</th><th class="n">' + PG.esc(PG.t('cols.change30d')) + '</th></tr></thead><tbody>';
      list.slice(0, 8).forEach(function (c) {
        rows += '<tr><td class="k"><a href="#/markets/' + PG.esc(c.id)
          + '" class="code" style="text-decoration:none">' + PG.esc(c.id) + '</a>'
          + '<div class="tiny" style="margin-top:3px">' + PG.esc(PG.t(c.title)) + '</div></td>'
          + '<td class="num" style="font-size:12px">' + PG.esc(PG.fmtDate(c.expiry)) + '</td>'
          + '<td class="n px" data-px="' + PG.esc(c.id) + '">' + PG.cents(c.price) + '</td>'
          + '<td class="n"><span class="delta" data-chg="' + PG.esc(c.id) + '" data-window="30"></span></td></tr>';
      });
      legend.innerHTML = rows + '</tbody></table>';
      PG.refreshPrices(legend);
    }

    seg.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.segbtn') : null;
      if (!b) return;
      var btns = seg.querySelectorAll('.segbtn');
      for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-pressed', 'true');
      draw(b.getAttribute('data-fam'));
    });

    draw('freight');
    return wrap;
  }

  /* ------------------------------------------------------- api  explorer */

  function apiExplorer() {
    var sample = (PG.contracts || [])[0] || { id: 'WCI-COMP-DEC26', price: 0.42, expiry: '2026-12-31' };

    var ENDPOINTS = [
      {
        m: 'GET', path: '/v1/contracts',
        desc: { en: 'The contract library — every listed market, its specification and its named resolution source.',
                zh: '合約庫——所有掛牌市場、規格與指定結算來源。' },
        res: function () {
          return {
            as_of: '2026-09-14T00:00:00Z',
            count: (PG.contracts || []).length,
            contracts: [{
              id: sample.id,
              family: sample.family,
              type: sample.type,
              question: PG.t(sample.question),
              resolution_source: PG.t(sample.resolves),
              expiry: sample.expiry,
              listed: sample.listed
            }]
          };
        }
      },
      {
        m: 'GET', path: '/v1/curve/{family}',
        desc: { en: 'The implied probability term structure for one family, by expiry.',
                zh: '單一類別按到期日排列的隱含機率期限結構。' },
        res: function () {
          var list = (PG.contracts || []).filter(function (c) { return c.family === 'chokepoint'; }).slice(0, 3);
          return {
            family: 'chokepoint',
            as_of: '2026-09-14T00:00:00Z',
            points: list.map(function (c) {
              return { contract: c.id, expiry: c.expiry, implied_probability: Number(c.price.toFixed(2)) };
            })
          };
        }
      },
      {
        m: 'GET', path: '/v1/contracts/{id}/history',
        desc: { en: 'Daily settlement marks for one contract since listing.',
                zh: '單一合約自掛牌以來的每日結算價。' },
        res: function () {
          var h = (PG.Sim && PG.Sim.history) ? PG.Sim.history(sample, 3) : [];
          return {
            contract: sample.id,
            interval: '1d',
            marks: h.map(function (pt) {
              return { t: new Date(pt.t).toISOString().slice(0, 10), p: Number(pt.p.toFixed(3)) };
            })
          };
        }
      },
      {
        m: 'GET', path: '/v1/resolutions',
        desc: { en: 'The settlement record: outcome, the source print it settled against, and any challenge.',
                zh: '結算紀錄：結果、所依據的來源公佈值，以及任何異議。' },
        res: function () {
          var r = (PG.contracts || []).filter(function (c) { return c.status === 'resolved'; })[0];
          if (!r) return { resolutions: [] };
          return {
            resolutions: [{
              contract: r.id,
              outcome: r.resolved,
              settled_at: r.expiry + 'T23:59:59Z',
              source: PG.t(r.resolves),
              challenges: 0
            }]
          };
        }
      }
    ];

    var wrap = PG.el('div', 'panel');
    wrap.style.padding = '0';

    var tabs = PG.el('div', 'tabs');
    tabs.setAttribute('role', 'tablist');
    ENDPOINTS.forEach(function (ep, i) {
      var b = PG.el('button', 'tab', PG.esc(ep.path));
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.setAttribute('data-i', String(i));
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);

    var body = PG.el('div');
    body.style.padding = '20px';
    wrap.appendChild(body);

    function show(i) {
      var ep = ENDPOINTS[i];
      var json;
      try { json = JSON.stringify(ep.res(), null, 2); }
      catch (e) { json = '{}'; }
      body.innerHTML =
        '<div class="row" style="gap:10px;margin-bottom:10px">'
        + '<span class="pill" style="color:var(--gold);border-color:var(--gold-line)">' + ep.m + '</span>'
        + '<span class="mono" style="font-size:13px">api.pregistic.com' + PG.esc(ep.path) + '</span></div>'
        + '<p class="small" style="margin-bottom:16px">' + PG.esc(PG.t(ep.desc)) + '</p>'
        + '<div class="tbl-wrap"><pre class="mono" style="margin:0;background:var(--sunk);'
        + 'border:1px solid var(--rule);padding:16px;font-size:12px;line-height:1.55;'
        + 'color:var(--ink-2);overflow-x:auto">' + PG.esc(json) + '</pre></div>'
        + '<p class="tiny" style="margin-top:12px">' + PG.esc(PG.t('demo.paperNotice')) + '</p>';
    }

    tabs.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.tab') : null;
      if (!b) return;
      var all = tabs.querySelectorAll('.tab');
      for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-selected', 'false');
      b.setAttribute('aria-selected', 'true');
      show(Number(b.getAttribute('data-i')));
    });

    show(0);
    return wrap;
  }

  /* -------------------------------------------------------- contact form */

  function optionsFrom(groupKey) {
    var g = (PG.strings && PG.strings[groupKey]) || {};
    var out = '';
    for (var k in g) {
      if (Object.prototype.hasOwnProperty.call(g, k)) {
        out += '<option value="' + PG.esc(PG.t(g[k])) + '">' + PG.esc(PG.t(g[k])) + '</option>';
      }
    }
    return out;
  }

  function contactForm() {
    var form = PG.el('form', 'panel');
    form.style.padding = '24px';
    form.noValidate = true;

    form.innerHTML =
      '<div class="grid2" style="gap:18px">'
      + '<div class="field"><label for="cfName">' + PG.esc(PG.t('form.name')) + '</label>'
      + '<input class="input" id="cfName" name="name" autocomplete="name" required></div>'
      + '<div class="field"><label for="cfEmail">' + PG.esc(PG.t('form.email')) + '</label>'
      + '<input class="input" id="cfEmail" name="email" type="email" autocomplete="email" required></div>'
      + '<div class="field"><label for="cfCompany">' + PG.esc(PG.t('form.company')) + '</label>'
      + '<input class="input" id="cfCompany" name="company" autocomplete="organization"></div>'
      + '<div class="field"><label for="cfRole">' + PG.esc(PG.t('form.role')) + '</label>'
      + '<select class="select" id="cfRole" name="role">' + optionsFrom('roles') + '</select></div>'
      + '<div class="field"><label for="cfJur">' + PG.esc(PG.t('form.jurisdiction')) + '</label>'
      + '<select class="select" id="cfJur" name="jurisdiction">' + optionsFrom('jurisdictions') + '</select></div>'
      + '<div class="field"><label for="cfInterest">' + PG.esc(PG.t('form.interest')) + '</label>'
      + '<select class="select" id="cfInterest" name="interest">'
      + '<option>' + PG.esc(PG.t('cta.requestAccess')) + '</option>'
      + '<option>' + PG.esc(PG.t('nav.curve')) + '</option>'
      + '<option>' + PG.esc(PG.t('footer.contact')) + '</option>'
      + '</select></div>'
      + '</div>'
      + '<div class="field" style="margin-top:18px"><label for="cfMsg">'
      + PG.esc(PG.t('form.message')) + '</label>'
      + '<textarea class="input" id="cfMsg" name="message" rows="4"></textarea></div>'
      + '<div class="row" style="margin-top:20px;gap:10px">'
      + '<button class="btn btn-primary" type="submit">' + PG.esc(PG.t('form.composeEmail')) + '</button>'
      + '<button class="btn btn-ghost" type="button" id="cfCopy">' + PG.esc(PG.t('form.copyDetails')) + '</button>'
      + '</div>'
      + '<p class="tiny" style="margin-top:16px;max-width:70ch">' + PG.esc(PG.t('form.formNote')) + '</p>';

    function collect() {
      var v = function (id) {
        var n = form.querySelector('#' + id);
        return n ? String(n.value || '').trim() : '';
      };
      return {
        name: v('cfName'), email: v('cfEmail'), company: v('cfCompany'),
        role: v('cfRole'), jurisdiction: v('cfJur'),
        interest: v('cfInterest'), message: v('cfMsg')
      };
    }

    function asText(d) {
      return PG.t('form.name') + ': ' + d.name + '\n'
        + PG.t('form.email') + ': ' + d.email + '\n'
        + PG.t('form.company') + ': ' + d.company + '\n'
        + PG.t('form.role') + ': ' + d.role + '\n'
        + PG.t('form.jurisdiction') + ': ' + d.jurisdiction + '\n'
        + PG.t('form.interest') + ': ' + d.interest + '\n\n'
        + d.message + '\n';
    }

    function validate(d) {
      if (!d.name) { PG.toast(PG.t('form.name') + ' — ' + PG.t('form.required')); return false; }
      if (!d.email || d.email.indexOf('@') < 1 || d.email.indexOf('.') < 0) {
        PG.toast(PG.t('form.invalidEmail')); return false;
      }
      return true;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = collect();
      if (!validate(d)) return;
      var subject = 'Pregistic — ' + d.interest + (d.company ? ' — ' + d.company : '');
      window.location.href = 'mailto:hello@pregistic.com?subject='
        + encodeURIComponent(subject) + '&body=' + encodeURIComponent(asText(d));
    });

    form.querySelector('#cfCopy').addEventListener('click', function () {
      var d = collect();
      var text = 'To: hello@pregistic.com\n\n' + asText(d);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { PG.toast(PG.t('cta.copied')); },
          function () { PG.toast('hello@pregistic.com'); }
        );
      } else {
        PG.toast('hello@pregistic.com');
      }
    });

    return form;
  }

  /* ----------------------------------------------------------------- api */

  PG.Pages = {
    render: function (name) {
      var page = (PG.content || {})[name];
      var root = PG.el('div');
      if (!page) {
        root.innerHTML = '<div class="wrap head"><h1>' + PG.esc(PG.t('misc.notFound')) + '</h1></div>';
        return root;
      }
      if (page.meta && page.meta.title) {
        var t = PG.t(page.meta.title);
        // Several page titles already carry the brand; don't say it twice.
        document.title = t.indexOf('Pregistic') >= 0 ? t : t + ' · Pregistic';
      }
      (page.sections || []).forEach(function (s, i) {
        if (!s || !s.kind) return;
        var fn = s.kind === 'custom' ? SLOTS[s.slot] : KINDS[s.kind];
        if (!fn) return;
        var node;
        try { node = fn(s); }
        catch (err) {
          if (window.console && console.warn) console.warn('[pregistic] section failed', s.kind, s.slot, err);
          return;
        }
        if (!node) return;
        // First section on a page sits flush under the masthead.
        if (i === 0 && node.classList && node.classList.contains('sec')) {
          node.classList.add('sec-flush');
        }
        root.appendChild(node);
      });
      return root;
    },
    section: section,
    sechead: sechead
  };
})();
