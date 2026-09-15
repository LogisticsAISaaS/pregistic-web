/* ==========================================================================
   js/content.curve.js  —  PG.content.curve
   Page: #/curve — the Pregistic Curve (data product + API)

   Shape (per SPEC "Content module shape"):
     { meta: {title:{en,zh}, blurb:{en,zh}},
       sections: [ … ] }

   Section kinds used in this file, in order:
     1  hero     {eyebrow, heading, lede, note, ctas:[{label, href, primary}]}
     2  custom   slot:'curve-demo'   {eyebrow, heading, lede}   renderer draws the curve
     3  cards    {eyebrow, heading, lede, items:[{tag, title, body, foot}]}
     4  table    {eyebrow, heading, lede, cols:[{label, align}], rows:[[cell…]], note}
     5  custom   slot:'api-explorer' {eyebrow, heading, lede}   renderer owns endpoints
     6  bullets  {eyebrow, heading, lede, items:[{title, body}]}
     7  callout  {tone:'gold', title, body}
     8  bullets  {eyebrow, heading, lede, items:[{title, body}]}

   Every human-readable value is {en, zh}; zh is Traditional Chinese.
   Inline markup permitted inside strings: <strong> <em> <a href> <br> only.
   Pregistic is pre-launch. Any price shown on this page is simulated
   demonstration data and is labelled as such.
   ========================================================================== */

window.PG = window.PG || {};
window.PG.content = window.PG.content || {};

window.PG.content.curve = {

  meta: {
    title: {
      en: 'The Pregistic Curve',
      zh: 'Pregistic 曲線'
    },
    blurb: {
      en: 'A continuously priced, market-implied probability curve on freight rates, chokepoint disruption and tariff outcomes — produced as a by-product of trading, at zero marginal cost.',
      zh: '一條持續定價、由市場隱含機率構成的曲線，涵蓋運價、咽喉水道中斷與關稅結果。它是交易的副產品，邊際成本為零。'
    }
  },

  sections: [

    /* ---------------------------------------------------------------- 1 */
    {
      kind: 'hero',
      eyebrow: {
        en: 'Revenue line 03 · Data',
        zh: '第三條收入線 · 數據'
      },
      heading: {
        en: 'The forward price of freight. Nobody sells it, because nobody has an order book.',
        zh: '運價的遠期價格。沒有人在賣，因為沒有人有一本訂單簿。'
      },
      lede: {
        en: 'Drewry, Xeneta, Freightos, TAC, Baltic and Sea-Intelligence all sell subscriptions into the same buyer, and the freight forwarding market they serve was €208.1bn in 2025. Every one of those products answers the same question: <strong>what did it cost last week</strong>. An order book answers a different one — <strong>what will it cost, and how sure is the market</strong> — and it produces that answer as a by-product of trading, at zero marginal cost.',
        zh: 'Drewry、Xeneta、Freightos、TAC、波羅的海交易所與 Sea-Intelligence 都向同一批買家出售訂閱，而他們服務的貨代市場在 2025 年規模為 2,081 億歐元。這些產品回答的是同一條問題：<strong>上星期花了多少錢</strong>。訂單簿回答的是另一條：<strong>將來要花多少錢，市場有多肯定</strong>——而這個答案是交易的副產品，邊際成本為零。'
      },
      note: {
        en: 'Pregistic is pre-launch. Every price on this page is simulated demonstration data. The Curve API is a Gate 3 deliverable — months 10 to 18 of the 24-month plan — not a product on sale today.',
        zh: 'Pregistic 尚未上線。本頁所有價格均為模擬示範數據。曲線 API 屬於第三道關卡的交付項目——24 個月計劃中的第 10 至 18 個月——並非今日可購買的產品。'
      },
      ctas: [
        {
          label: { en: 'The board the curve comes from', zh: '曲線所依據的合約板' },
          href: '#/markets',
          primary: true
        },
        {
          label: { en: 'How a contract settles', zh: '一份合約如何結算' },
          href: '#/how'
        }
      ]
    },

    /* ---------------------------------------------------------------- 2 */
    {
      kind: 'custom',
      slot: 'curve-demo',
      eyebrow: {
        en: 'Sample output · demonstration data',
        zh: '樣本輸出 · 示範數據'
      },
      heading: {
        en: 'What you are looking at',
        zh: '你正在看的是什麼'
      },
      lede: {
        en: 'Each point is the mid price of a dated contract on the same underlying, read as a probability and plotted against its expiry. The line through them is an implied probability term structure: what the book thinks the odds are at each horizon, and how that view steepens or flattens as the dates move out. Nothing here is modelled or forecast by us — the shape is whatever the last trades made it. The prices are simulated, because the venue has not opened.',
        zh: '每一個點，都是同一標的上某張有到期日的合約的中間價，以機率讀出，並按到期日排列。串起這些點的線，就是一條隱含機率的期限結構：訂單簿認為各個時間點的機率是多少，以及這個看法隨日期推遠而變陡或變平。這裡沒有任何一段是我們建模或預測出來的——形狀由最後成交的那幾筆決定。價格為模擬數據，因為場所尚未開業。'
      }
    },

    /* ---------------------------------------------------------------- 3 */
    {
      kind: 'cards',
      eyebrow: {
        en: 'Who reads it',
        zh: '誰會讀它'
      },
      heading: {
        en: 'Four desks, one number they cannot buy anywhere else',
        zh: '四類部門，一個他們在別處買不到的數字'
      },
      lede: {
        en: 'A backward index tells a buyer where the market has been. A forward price tells them what it costs to be wrong about where it is going — and that is the number every one of these decisions actually turns on.',
        zh: '回顧性的指數告訴買家市場去過哪裡。遠期價格告訴他們，看錯方向的代價是多少——而以下每一個決定，真正取決的都是後者。'
      },
      items: [
        {
          tag: { en: 'Procurement', zh: '採購' },
          title: {
            en: 'Fix the contract rate, or ride the spot market',
            zh: '簽長約鎖定運價，還是跟著現貨市場走'
          },
          body: {
            en: 'The Drewry WCI composite averaged $1,420 in 2019, printed $10,377 in September 2021, fell to $2,168 by March 2025 and stood at $4,339 on 13 August 2026. Rates fell 57% in twelve weeks in 2025 and then rose 85% year-on-year into August 2026. Every quarterly fix-or-float decision is already a bet on the forward rate; today it is placed without a forward price.',
            zh: 'Drewry WCI 綜合指數 2019 年平均為 1,420 美元，2021 年 9 月報 10,377 美元，2025 年 3 月跌至 2,168 美元，2026 年 8 月 13 日為 4,339 美元。2025 年運價曾在十二週內下跌 57%，其後至 2026 年 8 月按年上升 85%。每一季「鎖定還是浮動」的決定，本來就是對遠期運價下注；今天只是在沒有遠期價格的情況下下注。'
          },
          foot: {
            en: 'Drewry WCI composite, weekly assessments',
            zh: 'Drewry WCI 綜合指數，每週評估'
          }
        },
        {
          tag: { en: 'Treasury & risk', zh: '財資與風險' },
          title: {
            en: 'Mark the exposure against a price, not an opinion',
            zh: '用價格而非意見為風險敞口計價'
          },
          body: {
            en: '81% of corporates hedge FX exposure, at an average hedge ratio of 45–49%. No comparable figure exists for container freight — because no liquid Western contract exists to measure it against. A dated, market-implied price gives a treasurer something to mark a freight exposure to, and a number an audit committee can check against a public source.',
            zh: '81% 的企業會對沖外匯風險，平均對沖比率為 45% 至 49%。貨櫃運價沒有對應的數字——因為西方一直沒有一張具流動性的合約可供衡量。一個有到期日、由市場隱含的價格，讓財資部門有標的可為運價敞口計價，也讓審計委員會有一個能對照公開來源的數字。'
          },
          foot: {
            en: 'FX hedging: MillTechFX',
            zh: '外匯對沖數據：MillTechFX'
          }
        },
        {
          tag: { en: 'Underwriting', zh: '承保' },
          title: {
            en: 'Chokepoint and delay risk, priced continuously',
            zh: '咽喉水道與延誤風險，持續定價'
          },
          body: {
            en: 'Bab al-Mandeb crossings fell from 41 to 29 in a single day on 23 July 2026, and the war-risk premium moved from 0.3% to 0.5% of hull. Global liner schedule reliability was 62.2% in March 2026, with an average delay of 5.48 days. Underwriters reprice that exposure on review cycles measured in months. An open book reprices it on every trade.',
            zh: '2026 年 7 月 23 日，曼德海峽的通行數目一日之內由 41 艘跌至 29 艘，戰爭險保費由船殼價值的 0.3% 升至 0.5%。2026 年 3 月，全球班輪準班率為 62.2%，平均延誤 5.48 日。承保方以數月為單位的覆核週期重新定價；一本開著的訂單簿，每一筆成交就重新定價一次。'
          },
          foot: {
            en: 'Al Jazeera / S&P Global, 22–23 Jul 2026; Sea-Intelligence',
            zh: '半島電視台／標普全球，2026 年 7 月 22–23 日；Sea-Intelligence'
          }
        },
        {
          tag: { en: 'Research & press', zh: '研究與傳媒' },
          title: {
            en: 'A forward number that can be cited',
            zh: '一個可以被引用的遠期數字'
          },
          body: {
            en: 'An index print is a fact about last week, and it arrives without a disagreement attached. A market price arrives with one: the spread, the depth, and the size it took to move it are all part of the quote. Gate 3 counts one thing besides revenue — the first citation of a Pregistic price in the trade press.',
            zh: '指數的一個報價，是關於上星期的事實，不帶任何分歧。市場價格則自帶分歧：買賣價差、深度，以及推動價格所需的成交量，全都是報價的一部分。第三道關卡除收入之外只計一件事——貿易媒體首次引用 Pregistic 的價格。'
          },
          foot: {
            en: 'Gate 3 target, months 10–18',
            zh: '第三道關卡目標，第 10 至 18 個月'
          }
        }
      ]
    },

    /* ---------------------------------------------------------------- 4 */
    {
      kind: 'table',
      eyebrow: {
        en: 'Against what exists',
        zh: '與現有產品對照'
      },
      heading: {
        en: 'The industry already pays for this data. It just buys it pointing backwards.',
        zh: '業界早已為這類數據付費，只是買回來的都是向後看的。'
      },
      lede: {
        en: 'These are real products with real subscribers, and they are good at what they do. The comparison is not quality — it is direction. Five of the six rows below measure a price that has already been paid.',
        zh: '以下都是有真實訂戶的真實產品，而且做得很好。這裡比較的不是質素，而是方向：六行之中有五行量度的，是已經付過的價格。'
      },
      cols: [
        { label: { en: 'Provider', zh: '供應商' }, align: 'left' },
        { label: { en: 'What it measures', zh: '量度什麼' }, align: 'left' },
        { label: { en: 'Direction', zh: '方向' }, align: 'left' },
        { label: { en: 'Update cadence', zh: '更新頻率' }, align: 'left' },
        { label: { en: 'Price', zh: '價格' }, align: 'left' }
      ],
      rows: [
        [
          { en: 'Drewry WCI', zh: 'Drewry WCI' },
          { en: 'Container spot rates, composite and eight lanes, US$ per 40ft', zh: '貨櫃現貨運價，綜合指數及八條航線，每 40 呎櫃美元計' },
          { en: 'Backward-looking', zh: '回顧性' },
          { en: 'Weekly, Thursday print', zh: '每週四公佈' },
          { en: 'Subscription, quoted per seat', zh: '訂閱制，按席位報價' }
        ],
        [
          { en: 'Xeneta XSI-C', zh: 'Xeneta XSI-C' },
          { en: 'Contracted and spot rate averages by corridor', zh: '按航運走廊劃分的約價與現貨均價' },
          { en: 'Backward-looking', zh: '回顧性' },
          { en: 'Daily; the one feed verifiably EU BMR compliant', zh: '每日；唯一可核實符合歐盟 BMR 的數據源' },
          { en: 'Enterprise subscription', zh: '企業訂閱' }
        ],
        [
          { en: 'Freightos FBX', zh: 'Freightos FBX' },
          { en: 'Container spot rate index across twelve lanes', zh: '涵蓋十二條航線的貨櫃現貨運價指數' },
          { en: 'Backward-looking', zh: '回顧性' },
          { en: 'Daily', zh: '每日' },
          { en: 'Headline free, full series commercial', zh: '主指數免費，完整序列商業授權' }
        ],
        [
          { en: 'Sea-Intelligence', zh: 'Sea-Intelligence' },
          { en: 'Schedule reliability, average delay days, carrier performance', zh: '準班率、平均延誤日數、船公司表現' },
          { en: 'Historical', zh: '歷史數據' },
          { en: 'Monthly', zh: '每月' },
          { en: 'Subscription report and data licence', zh: '訂閱報告及數據授權' }
        ],
        [
          { en: 'Baltic Exchange / TAC', zh: '波羅的海交易所／TAC' },
          { en: 'Dry bulk, tanker and air freight spot assessments', zh: '乾散貨、油輪及空運現貨評估' },
          { en: 'Backward-looking', zh: '回顧性' },
          { en: 'BDI daily 13:00 London; air indices weekly', zh: 'BDI 每日倫敦時間 13:00；空運指數每週' },
          { en: 'Member access and subscription licence', zh: '會員權限及訂閱授權' }
        ],
        [
          { en: '<strong>Pregistic Curve</strong>', zh: '<strong>Pregistic 曲線</strong>' },
          { en: '<strong>Market-implied probability of a dated, publicly resolvable outcome</strong>', zh: '<strong>有到期日、可公開裁定結果的市場隱含機率</strong>' },
          { en: '<strong>Forward-looking</strong>', zh: '<strong>前瞻性</strong>' },
          { en: '<strong>Continuous, while the book is open; re-priced on every trade</strong>', zh: '<strong>訂單簿開啟期間持續更新，每筆成交重新定價</strong>' },
          { en: '<strong>Data seat, planned from Gate 3</strong>', zh: '<strong>數據席位，計劃由第三道關卡起提供</strong>' }
        ]
      ],
      note: {
        en: 'Sized honestly: <strong>Freightos, the only public pure-play freight-data business, does $29.5m of revenue at a sub-$70m market cap.</strong> That is the first comparable a diligent investor will find against this line, and it says what it says — a high-margin line, not a large one. The base-case model carries data revenue of $0.10m, $0.50m and $1.44m across years one to three, against 8, 42 and 120 enterprise seats. Freightos FY2025 revenue per company results, 23 Feb 2026; freight forwarding market €208.1bn 2025 per Transport Intelligence, 11 Jun 2026.',
        zh: '誠實地界定規模：<strong>Freightos 是唯一一家上市的純運價數據公司，收入 2,950 萬美元，市值低於 7,000 萬美元。</strong>認真做盡職調查的投資者，第一個找到的對標就是它，而它說明的事情很清楚——這是一條高毛利的收入線，不是一條大的。基本情境模型中，數據收入第一至第三年分別為 10 萬、50 萬及 144 萬美元，對應 8、42 及 120 個企業席位。Freightos 2025 財年收入取自公司業績公告（2026 年 2 月 23 日）；貨代市場 2,081 億歐元（2025 年）取自 Transport Intelligence，2026 年 6 月 11 日。'
      }
    },

    /* ---------------------------------------------------------------- 5 */
    {
      kind: 'custom',
      slot: 'api-explorer',
      eyebrow: {
        en: 'Interface',
        zh: '介面'
      },
      heading: {
        en: 'Browse the planned endpoints',
        zh: '瀏覽規劃中的端點'
      },
      lede: {
        en: 'Pick an endpoint to see the request and the shape of what comes back. This is a specification written against the board as it stands, not a live service: the responses below are examples, the host is not serving requests, and there are no keys to issue yet. v1 lands with Gate 3.',
        zh: '選一個端點，查看請求方式及回應的結構。這是按現有合約板寫成的規格，不是運行中的服務：以下回應為示例，主機並未接收請求，目前亦未發出任何金鑰。v1 隨第三道關卡推出。'
      }
    },

    /* ---------------------------------------------------------------- 6 */
    {
      kind: 'bullets',
      eyebrow: {
        en: 'The data seat',
        zh: '數據席位'
      },
      heading: {
        en: 'What a seat includes',
        zh: '一個席位包含什麼'
      },
      lede: {
        en: 'Specified now so the price can be quoted honestly later. Availability follows Gate 3 — months 10 to 18 on the plan, alongside the first six paying enterprise seats. This is a roadmap product. None of it can be bought today.',
        zh: '現在把規格寫清楚，日後才能誠實報價。供應時間跟隨第三道關卡——計劃中的第 10 至 18 個月，與首六個付費企業席位同步。這是路線圖上的產品，今天一項都無法購買。'
      },
      items: [
        {
          title: { en: 'Snapshot and history over REST', zh: 'REST 快照與歷史數據' },
          body: {
            en: 'Current mid, bid, ask, depth and open interest for every listed contract, plus the complete daily series for each one from its listing date forward. Query by contract, by family, or by the benchmark it settles against.',
            zh: '每張掛牌合約的即時中間價、買價、賣價、深度與未平倉合約量，另加每張合約自掛牌日起的完整每日序列。可按合約、按合約族、或按其結算所依據的基準查詢。'
          }
        },
        {
          title: { en: 'Streaming updates', zh: '串流更新' },
          body: {
            en: 'A push channel carrying price, size and trade prints as they occur, so a desk can hold a live mark without polling. Same fields as the snapshot, delivered on change rather than on request.',
            zh: '一條推送通道，即時傳送價格、成交量與成交紀錄，讓交易台無需輪詢即可維持實時估值。欄位與快照相同，按變動推送而非按請求回覆。'
          }
        },
        {
          title: { en: 'Resolution records, with source and timestamp', zh: '裁定紀錄，附來源與時間戳' },
          body: {
            en: 'Every settled contract returns its own record: the named source fixed before listing, the published value, the print date, the timestamp at which we read it, and the outcome. The audit trail itself, not a summary of one.',
            zh: '每張已結算的合約都會回傳自己的紀錄：掛牌前已指定的來源名稱、公佈的數值、公佈日期、我們讀取該數值的時間戳，以及結果。回傳的是審計軌跡本身，而不是它的摘要。'
          }
        },
        {
          title: { en: 'Challenge history', zh: '質疑紀錄' },
          body: {
            en: 'Every challenge raised against a settlement, the bond posted behind it, the outcome and the time taken to resolve it. Published whether it went our way or not — a venue that resolves cleanly a hundred times earns the right to list the hard ones.',
            zh: '每一宗針對結算提出的質疑、背後繳付的保證金、結果，以及處理所需時間。無論結果對我們有利與否一律公開——一個乾淨裁定一百次的場所，才有資格掛牌難的那些。'
          }
        },
        {
          title: { en: 'CSV and Parquet export', zh: 'CSV 與 Parquet 匯出' },
          body: {
            en: 'Bulk export of a single series, a family, or the whole board. Parquet for research pipelines, CSV for the spreadsheet where the decision actually gets made. Column names and types stay stable across versions; additions are appended, never renamed in place.',
            zh: '可整批匯出單一序列、單一合約族或整個合約板。Parquet 供研究流程使用，CSV 供真正做決定的那張試算表使用。欄位名稱與類型跨版本保持穩定；新增欄位只會追加，不會就地改名。'
          }
        },
        {
          title: { en: 'Written redistribution terms', zh: '書面再分發條款' },
          body: {
            en: 'Which fields a seat may republish, to whom, and under what attribution — written into the seat agreement rather than negotiated one request at a time. The terms are set out in plain language further down this page.',
            zh: '席位可以再發佈哪些欄位、發佈給誰、須註明什麼出處——全部寫進席位協議，而不是逐次請求逐次談判。條款以白話列於本頁下方。'
          }
        },
        {
          title: { en: 'When this exists', zh: '何時會有' },
          body: {
            en: 'Curve API v1 is a Gate 3 deliverable: months 10 to 18, after the board has 110+ live contracts across all four families and a settlement record worth licensing. The base-case model assumes 8 enterprise seats in year one and 120 by year three. If Gate 2 does not clear, this line does not get built.',
            zh: '曲線 API v1 屬於第三道關卡的交付項目：第 10 至 18 個月，前提是合約板在四個合約族上已有 110 張以上在市合約，以及一份值得授權的結算紀錄。基本情境模型假設第一年 8 個企業席位，到第三年 120 個。若第二道關卡未能通過，這條收入線不會動工。'
          }
        }
      ]
    },

    /* ---------------------------------------------------------------- 7 */
    {
      kind: 'callout',
      tone: 'gold',
      title: {
        en: 'The curve only exists where the book is liquid',
        zh: '曲線只存在於有流動性的訂單簿之上'
      },
      body: {
        en: 'A price is only information if somebody had to pay it. A contract quoted twice a week by one participant produces a line on a chart and nothing worth subscribing to. This is a real constraint on the product, and it is the reason the Month-9 gate is written the way it is: if the median bid–ask across the ten flagship contracts is wider than 6 points, the liquidity is not reaching this vertical and the plan changes. So the curve ships narrow. <strong>We would rather publish six clean series than sixty noisy ones</strong> — and every series carries its own depth, spread and trade count alongside the price, so a subscriber can judge for themselves which ones to trust.',
        zh: '一個價格要成為資訊，必須有人真金白銀付過。一張每週只有一名參與者報兩次價的合約，只會畫出一條線，沒有任何訂閱價值。這是產品上實實在在的限制，也正是第九個月那道關卡如此措辭的原因：若十張旗艦合約的買賣價差中位數闊於 6 點，代表流動性未能觸及這個垂直市場，計劃就要改。所以曲線推出時範圍會很窄。<strong>我們寧願公佈六條乾淨的序列，也不要六十條有雜訊的</strong>——而每條序列都會連同深度、價差與成交筆數一併公佈，訂戶可以自行判斷哪幾條值得信。'
      }
    },

    /* ---------------------------------------------------------------- 8 */
    {
      kind: 'bullets',
      eyebrow: {
        en: 'Licensing',
        zh: '授權'
      },
      heading: {
        en: 'What you may do with the number, in plain language',
        zh: '你可以怎樣使用這個數字，白話說明'
      },
      lede: {
        en: 'Four terms, stated up front. The fourth one is the one nobody else states, and it is the one that binds us.',
        zh: '四條條款，事先講明。第四條是別人不會講的一條，也是限制我們自己的一條。'
      },
      items: [
        {
          title: { en: 'Internal use', zh: '內部使用' },
          body: {
            en: 'A seat covers use inside the licensee and its subsidiaries: pricing, procurement, treasury marks, underwriting models, internal dashboards and board papers. No per-user headcount and no restriction on the decisions you take with it. What you build internally on top of the series is yours.',
            zh: '一個席位涵蓋被授權方及其附屬公司內部的使用：定價、採購、財資估值、承保模型、內部儀表板及董事會文件。不按人頭計算，亦不限制你據此作出的決定。你在序列之上內部建立的東西，屬於你。'
          }
        },
        {
          title: { en: 'Citation with attribution', zh: '引用並註明出處' },
          body: {
            en: 'A Pregistic price may be quoted in research notes, client communications and the press, with the contract ID, the timestamp and Pregistic named. Point citation needs no seat and costs nothing — a forward price that cannot be quoted is not a reference, and a reference is the whole point.',
            zh: 'Pregistic 的價格可在研究報告、客戶通訊及傳媒中引用，只須註明合約代號、時間戳及 Pregistic 之名。單點引用無須席位、亦不收費——一個不能被引用的遠期價格不會成為參考價，而成為參考價正是全部意義所在。'
          }
        },
        {
          title: { en: 'Redistribution', zh: '再分發' },
          body: {
            en: 'Systematic redistribution is separate and written: reselling a series, embedding it in a product a third party pays for, feeding it into a terminal, or republishing it on a schedule. It is available, it is negotiable, and it is not included in a standard seat. The line is between citing a number and becoming a distributor of it.',
            zh: '系統性再分發屬另立書面協議：轉售序列、把它嵌入第三方付費的產品、接入行情終端，或按固定時間表再發佈。這項授權是有的，也可以談，但不包含在標準席位之內。分界線在於：引用一個數字，還是成為它的分銷商。'
          }
        },
        {
          title: { en: 'What our own upstream licences do not let us pass through', zh: '我們的上游基準授權不容許我們轉授的部分' },
          body: {
            en: 'WCI, XSI-C, FBX, SCFIS, TAC and Sea-Intelligence are commercial benchmarks. We licence them, we do not scrape them — and a redistribution licence lets us <em>settle against</em> a benchmark and publish <strong>our own price</strong>. It does not let us hand you the underlying index value. For that you need your own licence from the administrator, and we will say so rather than let you find out later. This is also why the first-wave board leans on free public records — the Federal Register, USTR, CBP, MOFCOM, ACP advisories, the Suez Canal Authority and IMF PortWatch — which carry no pass-through restriction at all. Three benchmark redistribution licences are a Gate 1 deliverable; if no administrator grants one by Month 12, the board is limited to what public records can carry, and we have said in advance that the plan gets rewritten as a smaller one.',
            zh: 'WCI、XSI-C、FBX、SCFIS、TAC 與 Sea-Intelligence 都是商業基準。我們取得授權，不做抓取——而再分發授權容許我們<em>以基準作結算</em>並公佈<strong>我們自己的價格</strong>，並不容許我們把基準指數本身的數值交給你。那部分你須向該基準管理人自行取得授權；我們會事先說明，而不是讓你日後才發現。這也是首批合約板傾向採用免費公共紀錄的原因——美國聯邦公報、USTR、CBP、商務部、巴拿馬運河管理局通告、蘇伊士運河管理局及 IMF PortWatch——這些完全沒有轉授限制。三份基準再分發授權屬第一道關卡的交付項目；若到第 12 個月仍無任何管理人批出授權，合約板就只能以公共紀錄支撐，而我們已預先說明：計劃會改寫成一個小得多的版本。'
          }
        }
      ]
    }

  ]
};
