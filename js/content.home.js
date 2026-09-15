/* =========================================================================
   js/content.home.js — PG.content.home
   -------------------------------------------------------------------------
   Home page content. Data only; js/pages.js renders it.

   Section shapes used on this page (all per SPEC.md):
     hero    {kind, eyebrow, heading, lede, note, ctas:[{label, href, primary}]}
     custom  {kind, slot, eyebrow, heading, lede}          slots used:
             'board-preview'  live sample of the board  (js/markets.js)
             'family-grid'    four families + live counts (js/pages.js)
             'contact'        closing call to action     (js/pages.js)
     stats   {kind, eyebrow, heading, lede, items:[{value, label, source}]}
     cards   {kind, eyebrow, heading, lede, items:[{tag, title, body, foot}]}
     table   {kind, eyebrow, heading, lede, cols:[{label, align}],
              rows:[[cell,…]], note}      cell = {en, zh}
     steps   {kind, eyebrow, heading, lede, items:[{step, title, body}]}
     split   {kind, eyebrow, heading, lede, left:{…}, right:{…}}
     bullets {kind, eyebrow, heading, lede, items:[{title, body}]}
     callout {kind, tone, title, body}

   Every human-readable value is {en, zh}. zh is Traditional Chinese.
   Figures are deck figures and keep their attribution. Pregistic is
   pre-launch: prices shown anywhere on this site are simulated.
   ========================================================================= */

window.PG = window.PG || {};
window.PG.content = window.PG.content || {};

window.PG.content.home = {

  meta: {
    title: {
      en: "Pregistic — the prediction market for global trade",
      zh: "Pregistic — 全球貿易的預測市場"
    },
    blurb: {
      en: "Freight rates, chokepoints, ports and tariffs listed as dated, publicly resolvable contracts, from a US$1 ticket. Built by Chainova Technology Limited on DEXBuilder infrastructure.",
      zh: "把運價、航道咽喉、港口與關稅，掛牌成有到期日、可公開驗證結算的合約，最小交易額 1 美元。由 Chainova Technology Limited 建構，運行於 DEXBuilder 基礎設施。"
    }
  },

  sections: [

    /* ---- 01 · hero -------------------------------------------------- */
    {
      kind: "hero",
      eyebrow: {
        en: "The prediction market for global trade",
        zh: "全球貿易的預測市場"
      },
      heading: {
        en: "Trade is the world's most consequential uncertainty — and the least tradable.",
        zh: "貿易是全球最具後果的不確定性，卻也是最無法交易的一項。"
      },
      lede: {
        en: "Pregistic lists freight rates, chokepoints, ports and tariffs as dated contracts. Binary and scalar, settled against one named public source disclosed before listing, from a US$1 ticket. No ISDA, no clearing broker, no 10-FEU lot.",
        zh: "Pregistic 把運價、航道咽喉、港口與關稅，掛牌成有到期日的合約。二元與區間兩種結構，依掛牌前就公佈的單一指定公開來源結算，最小交易額 1 美元。不需要 ISDA 主協議，不需要清算經紀商，也沒有 10 個 FEU 的口數限制。"
      },
      note: {
        en: "Built by Chainova Technology Limited on DEXBuilder infrastructure · Hong Kong",
        zh: "由 Chainova Technology Limited 建構，運行於 DEXBuilder 基礎設施 · 香港"
      },
      ctas: [
        {
          label: { en: "View the board", zh: "查看合約板" },
          href: "#/markets",
          primary: true
        },
        {
          label: { en: "How it settles", zh: "如何結算" },
          href: "#/how",
          primary: false
        }
      ]
    },

    /* ---- 02 · board preview (custom slot) --------------------------- */
    {
      kind: "custom",
      slot: "board-preview",
      eyebrow: { en: "The board", zh: "合約板" },
      heading: {
        en: "Sixty contracts. Four families. One order book.",
        zh: "六十張合約。四個系列。一本訂單簿。"
      },
      lede: {
        en: "A sample of the launch board. Pregistic is pre-launch: every price, spread and volume shown on this site is simulated demonstration data and is marked <strong>DEMO BOOK</strong>. The contracts, the settlement sources and the expiry dates are real.",
        zh: "以下是掛牌合約板的樣本。Pregistic 尚未上線：本網站顯示的每一個價格、買賣價差與成交量都是模擬示範數據，並標示 <strong>DEMO BOOK</strong>。合約本身、結算來源與到期日則是真實的。"
      }
    },

    /* ---- 03 · stats ------------------------------------------------- */
    {
      kind: "stats",
      eyebrow: { en: "The one-page version", zh: "一頁版本" },
      heading: {
        en: "The case, in four numbers.",
        zh: "四個數字，就是全部理由。"
      },
      lede: {
        en: "Prediction markets became a real asset class last year. Trade was not on the list.",
        zh: "預測市場在去年成為真正的資產類別。貿易不在名單上。"
      },
      items: [
        {
          value: { en: "$63.5B", zh: "635 億美元" },
          label: {
            en: "Traded on event outcomes in 2025 — four times the $15.8B of 2024. Almost none of it on trade.",
            zh: "2025 年押在事件結果上的成交額，是 2024 年 158 億美元的四倍。其中與貿易有關的幾乎沒有。"
          },
          source: { en: "CertiK, Mar 2026", zh: "CertiK，2026 年 3 月" }
        },
        {
          value: { en: "7.3×", zh: "7.3 倍" },
          label: {
            en: "Container spot rate range in six years: a 2019 average of $1,420 per FEU against $10,377 in September 2021.",
            zh: "六年之間貨櫃現貨運價的高低區間：2019 年平均每 FEU 1,420 美元，對比 2021 年 9 月的 10,377 美元。"
          },
          source: {
            en: "Drewry WCI composite, 2019–2026",
            zh: "Drewry WCI 綜合指數，2019–2026"
          }
        },
        {
          value: { en: "0", zh: "0" },
          label: {
            en: "Freight rate, port or canal markets listed on any liquid venue today.",
            zh: "目前在任何具流動性的交易場所上，掛牌的運價、港口或運河市場數目。"
          },
          source: {
            en: "Kalshi and Polymarket listings, Aug 2026",
            zh: "Kalshi 與 Polymarket 掛牌清單，2026 年 8 月"
          }
        },
        {
          value: { en: "US$1", zh: "1 美元" },
          label: {
            en: "Minimum ticket. Not 10 FEU, not a vessel voyage, not an ISDA.",
            zh: "最小交易額。不是 10 個 FEU，不是一個船舶航次，也不是一份 ISDA 主協議。"
          },
          source: {
            en: "Pregistic contract specification",
            zh: "Pregistic 合約規格"
          }
        }
      ]
    },

    /* ---- 04 · cards: the gap / the demand / the unlock --------------- */
    {
      kind: "cards",
      eyebrow: { en: "The argument", zh: "論點" },
      heading: {
        en: "A proven asset class, a priced-out industry, and rails you can rent.",
        zh: "一個已被驗證的資產類別、一個被擋在門外的行業，以及可以租用的交易基建。"
      },
      lede: {
        en: "Three facts. Each of them is public. They only matter together.",
        zh: "三個事實。每一個都是公開資訊。要合起來看，才成立。"
      },
      items: [
        {
          tag: { en: "THE GAP", zh: "缺口" },
          title: {
            en: "$112M of economics inside a $63.5B category",
            zh: "635 億美元的類別裡，經濟類只有 1.12 億美元"
          },
          body: {
            en: "Prediction markets became a real asset class last year. Sports is about 75–80% of volume. Every economics contract Polymarket listed in 2025 totalled $112M — under 0.5% of the category. Freight, ports and shipping: <strong>zero listed markets</strong> on any liquid venue.",
            zh: "預測市場在去年成為真正的資產類別。體育約佔成交量的 75–80%。Polymarket 在 2025 年掛牌的全部經濟類合約合計 1.12 億美元，不到整個類別的 0.5%。運價、港口與航運：在任何具流動性的場所上<strong>掛牌數為零</strong>。"
          },
          foot: {
            en: "Forbes, 16 Dec 2025 · CertiK, Mar 2026",
            zh: "Forbes，2025 年 12 月 16 日 · CertiK，2026 年 3 月"
          }
        },
        {
          tag: { en: "THE DEMAND", zh: "需求" },
          title: {
            en: "7.3× in six years, and nowhere to hedge it",
            zh: "六年 7.3 倍，卻無處可對沖"
          },
          body: {
            en: "Container spot rates moved 7.3× peak to trough in six years. 81% of corporates hedge FX exposure. In container freight, no Western derivative has ever reached liquidity: FFAs need an ISDA and a broker, CME lots start at 10 FEU, and China's EC futures need QFI status and 17–18% margin.",
            zh: "六年之間，貨櫃現貨運價的高低差達 7.3 倍。81% 的企業會對沖外匯風險。但在貨櫃運價上，西方市場從來沒有一張衍生品合約達到過流動性：FFA 需要 ISDA 主協議與經紀商，CME 每口合約起跳 10 個 FEU，中國的 EC 期貨則要 QFI 資格與 17–18% 保證金。"
          },
          foot: {
            en: "Drewry WCI · MillTechFX · BANDS Financial, May 2024",
            zh: "Drewry WCI · MillTechFX · BANDS Financial，2024 年 5 月"
          }
        },
        {
          tag: { en: "THE UNLOCK", zh: "解法" },
          title: {
            en: "We don't build an exchange. We build the market.",
            zh: "我們不建交易所。我們建市場。"
          },
          body: {
            en: "DEXBuilder, the Gate Labs white-label venue platform, delivers matching, clearing, risk control, non-custodial settlement, market-maker access and a branded front end in hours, not quarters. That leaves the three things infrastructure cannot buy: <strong>event design, domain distribution, liquidity</strong>.",
            zh: "DEXBuilder 是 Gate Labs 的白標交易平台，把撮合、清算、風控、非託管結算、造市商接入與品牌前端，以小時而非以季度為單位交付。餘下的，是基建買不到的三件事：<strong>事件設計、行業分銷、流動性</strong>。"
          },
          foot: {
            en: "Event design · domain distribution · liquidity",
            zh: "事件設計 · 行業分銷 · 流動性"
          }
        }
      ]
    },

    /* ---- 05 · family grid (custom slot) ----------------------------- */
    {
      kind: "custom",
      slot: "family-grid",
      eyebrow: { en: "The product", zh: "產品" },
      heading: {
        en: "Four families, one order book, one collateral pool.",
        zh: "四個合約系列，一本訂單簿，一個保證金池。"
      },
      lede: {
        en: "Binary and scalar contracts on dated, publicly resolvable logistics outcomes, each settled against a named source disclosed before listing. Tickets start at US$1: a forwarder moving twenty boxes a month can hedge twenty boxes. Access is a wallet or an account with KYC/AML at onboarding. Custody is non-custodial throughout.",
        zh: "以二元或區間結構，掛牌有明確日期、可公開驗證的物流結果；每張合約在掛牌前就公佈指定結算來源。最小交易額 1 美元：一家每月出二十個貨櫃的貨代，就對沖二十個貨櫃。進場只需錢包或帳戶，開戶時完成 KYC／AML。全程非託管。"
      }
    },

    /* ---- 06 · the access table -------------------------------------- */
    {
      kind: "table",
      eyebrow: { en: "Problem two", zh: "問題二" },
      heading: {
        en: "The instruments exist. The access doesn't.",
        zh: "工具一直都在，門檻才是問題。"
      },
      lede: {
        en: "Freight risk transfer is not an unsolved technical problem. It is an unsolved distribution problem: every venue was built for the top 200 counterparties.",
        zh: "運價風險轉移不是尚未解決的技術問題，而是尚未解決的分銷問題：每一個交易場所，都是為最頂端的兩百家對手方而建。"
      },
      cols: [
        { label: { en: "Venue / instrument", zh: "交易場所／工具" }, align: "left" },
        { label: { en: "Status 2026", zh: "2026 年狀態" }, align: "left" },
        { label: { en: "Minimum ticket", zh: "最小交易單位" }, align: "left" },
        { label: { en: "Who can trade", zh: "誰可以交易" }, align: "left" },
        { label: { en: "Why the shipper is locked out", zh: "貨主為何被擋在門外" }, align: "left" }
      ],
      rows: [
        [
          { en: "FFAs — dry bulk & tanker (Baltic Exchange)", zh: "FFA 遠期運費協議——乾散貨與油輪（波羅的海交易所）" },
          { en: "Liquid. Over 3M lots dry bulk and over 1M tanker in FY2025", zh: "有流動性。2025 財政年度乾散貨逾 300 萬口、油輪逾 100 萬口" },
          { en: "Vessel-voyage sized", zh: "以整條船的航次為單位" },
          { en: "Owners, charterers, trading houses", zh: "船東、租家、貿易商" },
          { en: "OTC and broker-intermediated, on an ISDA plus a clearing relationship. About $200M a day dry bulk, $20M a day tanker.", zh: "場外交易、經紀商居中，需要 ISDA 主協議與清算關係。乾散貨每日約 2 億美元，油輪每日約 2,000 萬美元。" }
        ],
        [
          { en: "INE “EC” container futures (SCFIS Europe, Shanghai)", zh: "上海能源交易中心「EC」貨櫃運價期貨（SCFIS 歐線）" },
          { en: "The one success: 68.8M lots and about RMB6tn cumulative to May 2026", zh: "唯一的成功案例：截至 2026 年 5 月，累計 6,880 萬口、約人民幣 6 萬億元" },
          { en: "About RMB97,000 notional; <strong>17–18% margin</strong>", zh: "名義金額約人民幣 97,000 元；<strong>保證金 17–18%</strong>" },
          { en: "Onshore China; foreign access via QFI only, since Mar 2025", zh: "中國境內；境外參與者自 2025 年 3 月起，僅能透過 QFI 資格進入" },
          { en: "The exchange's own review concedes participation is “pronounced retail”, with insufficient industrial share.", zh: "交易所自己的檢討也承認，參與結構「散戶特徵明顯」，產業客戶佔比不足。" }
        ],
        [
          { en: "CME / Baltic FBX futures", zh: "CME／波羅的海 FBX 期貨" },
          { en: "Listed, no published volume", zh: "已掛牌，不公佈成交量" },
          { en: "<strong>10 FEU per lot</strong>", zh: "<strong>每口 10 個 FEU</strong>" },
          { en: "Institutional clearing members", zh: "機構清算會員" },
          { en: "Indivisible for a shipper moving twenty boxes a month. The predecessor contract died between 2010 and 2013 for want of volume.", zh: "對每月只出二十個貨櫃的貨主而言無法拆分。前身合約在 2010 至 2013 年間因成交量不足而消失。" }
        ],
        [
          { en: "ICE / NYSHEX and Euronext container futures", zh: "ICE／NYSHEX 與泛歐交易所貨櫃運價期貨" },
          { en: "Both launched April 2026", zh: "兩者均於 2026 年 4 月推出" },
          { en: "Institutional", zh: "機構級" },
          { en: "Clearing members", zh: "清算會員" },
          { en: "Three competing settlement indices now split the same thin liquidity pool.", zh: "三個互相競爭的結算指數，分食同一個本來就很薄的流動性池。" }
        ],
        [
          { en: "Air cargo derivatives", zh: "航空貨運衍生品" },
          { en: "<strong>Do not exist</strong>", zh: "<strong>並不存在</strong>" },
          { en: "—", zh: "—" },
          { en: "Nobody", zh: "沒有人" },
          { en: "Baltic and TAC launched air freight spot indices on 1 Jul 2025 expressly to enable derivatives. Fifteen months later there is still no contract.", zh: "波羅的海交易所與 TAC 在 2025 年 7 月 1 日推出航空貨運現貨指數，目的正是讓衍生品成為可能。十五個月過去，仍然沒有任何合約。" }
        ],
        [
          { en: "<strong>Pregistic</strong> — pre-launch", zh: "<strong>Pregistic</strong>——尚未上線" },
          { en: "60+ contracts specified; first markets about 90 days from close", zh: "已寫定 60 張以上合約；交割後約 90 天，首批市場上線" },
          { en: "<strong>US$1</strong>", zh: "<strong>1 美元</strong>" },
          { en: "Anyone KYC'd, outside restricted markets", zh: "完成 KYC 的任何人，受限市場除外" },
          { en: "Nothing to be locked out of: no ISDA, no clearing broker, no QFI, no lot size. Dollar-denominated and divisible.", zh: "沒有可以把人擋在外面的東西：不需要 ISDA、不需要清算經紀商、不需要 QFI、沒有最小口數。以美元計價，可以拆分。" }
        ]
      ],
      note: {
        en: "Sources: Baltic Exchange FY2025 volumes · Shanghai Municipal Financial Committee / SHFE, 2 Jul 2026 · BANDS Financial, May 2024 · FreightWaves · Container Mag, 27 Mar 2026 · Air Cargo News. The Pregistic row states the contract specification of a pre-launch venue, not trading that exists today.",
        zh: "資料來源：波羅的海交易所 2025 財政年度成交量 · 上海市委金融辦／上期所，2026 年 7 月 2 日 · BANDS Financial，2024 年 5 月 · FreightWaves · Container Mag，2026 年 3 月 27 日 · Air Cargo News。Pregistic 一行陳述的是尚未上線場所的合約規格，不是今天已經存在的交易。"
      }
    },

    /* ---- 07 · cold-start flywheel ----------------------------------- */
    {
      kind: "steps",
      eyebrow: { en: "The hard part", zh: "最難的部分" },
      heading: {
        en: "Speculative depth first. Hedging capacity as the consequence.",
        zh: "先有投機深度，對沖能力是它的結果。"
      },
      lede: {
        en: "Clarksons' SCFI contract died in 2013. CME's FBX futures publish no volume. Three container contracts launched in 2026 and immediately split the same thin book. A hedger-only venue never clears, because both sides are waiting for the other. Pregistic is built the other way round.",
        zh: "Clarksons 的 SCFI 合約在 2013 年結束。CME 的 FBX 期貨不公佈成交量。2026 年有三張貨櫃運價合約推出，隨即把同一本薄薄的訂單簿再切三份。只有對沖需求的場所永遠撮合不起來，因為兩邊都在等對方先出手。Pregistic 反過來建。"
      },
      items: [
        {
          step: "01",
          title: { en: "Depth", zh: "深度" },
          body: {
            en: "DEXBuilder market makers and existing prediction-market flow are there on day one. Depth shared across the platform's prediction and event products, without a subsidy programme of our own.",
            zh: "DEXBuilder 的造市商與既有的預測市場資金，第一天就在。深度由平台的預測與事件產品共用，不必靠我們自己的補貼計劃買回來。"
          }
        },
        {
          step: "02",
          title: { en: "Hedgers can transact", zh: "對沖方下得了單" },
          body: {
            en: "Forwarders, BCOs, SMEs and 3PLs take the other side in dollar-denominated, divisible size. No ISDA, no 10-FEU lot, no QFI.",
            zh: "貨代、直接貨主、中小企與三方物流，可以用美元計價、可拆分的金額接下另一邊。不需要 ISDA，沒有 10 個 FEU 的口數，也不必 QFI。"
          }
        },
        {
          step: "03",
          title: { en: "The price becomes a signal", zh: "價格變成訊號" },
          body: {
            en: "A live, market-implied disruption curve: quoted in the trade press, cited by counterparties in negotiation, licensed by subscribers who today buy only backward-looking indices.",
            zh: "一條即時的、由市場價格推導出來的中斷風險曲線：被行業媒體引用，被對手方在談判桌上援引，被今天只買得到回顧型指數的訂戶付費授權使用。"
          }
        },
        {
          step: "04",
          title: { en: "Informed flow arrives", zh: "有資訊的資金進場" },
          body: {
            en: "Chartering desks, terminal operators and analysts finally have somewhere to price a view, and their flow deepens the book. Back to 01.",
            zh: "租船部門、碼頭營運商與分析師，終於有地方把自己的看法定價出來；他們的單子又把訂單簿加深。回到 01。"
          }
        }
      ]
    },

    /* ---- 08 · two sides of the book --------------------------------- */
    {
      kind: "split",
      eyebrow: { en: "Two sides", zh: "兩邊的人" },
      heading: {
        en: "One order book, two populations.",
        zh: "一本訂單簿，兩群人。"
      },
      lede: {
        en: "A container futures contract could only ever be as liquid as the shipping industry's appetite for margin calls. Pregistic sits inside a shared prediction-market order book, where a Hong Kong forwarder hedging forty boxes is matched against flow that would exist anyway.",
        zh: "一張貨櫃運價期貨的流動性上限，就是航運業對追繳保證金的胃口。Pregistic 座落在一本共用的預測市場訂單簿裡：一家香港貨代要對沖四十個貨櫃，對手是本來就會在場的資金。"
      },
      left: {
        title: { en: "Supply of risk", zh: "風險的供給" },
        body: {
          en: "Who needs to buy protection, and has no channel through which to buy it.",
          zh: "誰需要買保護，而且買不到渠道。"
        },
        bullets: [
          { en: "SME importers and forwarders with no hedging channel at all", zh: "完全沒有對沖渠道的中小型進口商與貨代" },
          { en: "3PLs quoting fixed rates on a floating cost base", zh: "以固定價格報價、成本卻是浮動的三方物流" },
          { en: "E-commerce sellers with tariff-exposed landed cost", zh: "到岸成本直接暴露在關稅之下的電商賣家" },
          { en: "Insurers pricing chokepoint and war-risk exposure", zh: "為航道咽喉與戰爭風險定價的保險公司" }
        ]
      },
      right: {
        title: { en: "Supply of opinion", zh: "觀點的供給" },
        body: {
          en: "Who has a genuine informational edge, and nowhere to express it.",
          zh: "誰真的握有資訊優勢，卻無處表達。"
        },
        bullets: [
          { en: "Chartering and freight desks", zh: "租船與運價交易部門" },
          { en: "Port and terminal operators", zh: "港口與碼頭營運商" },
          { en: "Trade lawyers and customs brokers", zh: "貿易律師與報關行" },
          { en: "Supply-chain analysts — thousands of professionals, none of whom can currently take a position on what they know", zh: "供應鏈分析師——數以千計的專業人士，目前沒有一個能就自己知道的事建立部位" }
        ]
      }
    },

    /* ---- 09 · how it settles, short version ------------------------- */
    {
      kind: "bullets",
      eyebrow: { en: "Resolution", zh: "結算" },
      heading: {
        en: "A prediction market is only as good as its resolution rule.",
        zh: "一個預測市場的上限，就是它的結算規則。"
      },
      lede: {
        en: "Most crypto prediction markets fail on ambiguity, not on liquidity. A logistics contract can be written so that there is nothing to argue about: the number is published, by a named body, on a known day. <a href='#/how'>The full rulebook, feed by feed</a>.",
        zh: "多數加密預測市場敗在含糊，不是敗在流動性。物流合約可以寫到沒有東西好爭：數字由指定機構，在已知的日子公佈。<a href='#/how'>完整規則與逐一列明的數據來源</a>。"
      },
      items: [
        {
          title: { en: "One source, named before listing", zh: "一個來源，掛牌前就指名" },
          body: {
            en: "The contract specification carries the publisher, the series, the print date and the tie-break. T+1 settlement window, bonded challenge, no discretion. Nothing is resolved by vote.",
            zh: "合約規格寫明發佈機構、指數系列、公佈日期與平手裁決方式。T+1 結算窗口、需繳保證金的申訴機制、不設酌情權。沒有任何一張合約靠投票結算。"
          }
        },
        {
          title: { en: "Licence, don't scrape", zh: "取得授權，不要抓取" },
          body: {
            en: "WCI, XSI-C, FBX, SCFIS, TAC and Sea-Intelligence are commercial benchmarks. Redistribution licences are a real cost and a real barrier — which is exactly why they are a moat.",
            zh: "WCI、XSI-C、FBX、SCFIS、TAC 與 Sea-Intelligence 都是商業基準指數。再分發授權是一筆真實的成本，也是一道真實的門檻——正因如此，它才是護城河。"
          }
        },
        {
          title: { en: "Prefer the unarguable", zh: "優先選擇無可爭議的" },
          body: {
            en: "First-wave contracts settle on government gazettes and canal authority advisories — the Federal Register, USTR, MOFCOM, the EU Official Journal, ACP and Suez Canal Authority notices. Free, dated, and beyond dispute.",
            zh: "第一批合約以政府公報與運河管理局通告結算——美國聯邦公報、USTR、商務部、歐盟官方公報，以及巴拿馬運河與蘇伊士運河管理局的航運通告。免費、有日期、無從爭辯。"
          }
        },
        {
          title: { en: "Publish the disagreement", zh: "把爭議公開" },
          body: {
            en: "Every challenge, bond and outcome goes on the record. A venue that resolves cleanly a hundred times earns the right to list the hard ones.",
            zh: "每一次申訴、每一筆保證金、每一個結果，都留在公開紀錄上。一個乾淨結算一百次的場所，才有資格掛牌那些困難的合約。"
          }
        }
      ]
    },

    /* ---- 10 · and yet ----------------------------------------------- */
    {
      kind: "callout",
      tone: "navy",
      title: { en: "And yet.", zh: "然而。" },
      body: {
        en: "75–80% of that volume is sport. Every economics contract Polymarket listed in all of 2025 totalled $112M. Kalshi's macro suite is Fed, CPI and jobs — nothing else. Neither venue lists a single freight rate, port, canal or schedule-reliability market. The infrastructure is proven, the audience is assembled, and the second-largest real-economy risk on earth is unlisted.",
        zh: "那些成交量的 75–80% 是體育。Polymarket 在 2025 年全年掛牌的所有經濟類合約，合計 1.12 億美元。Kalshi 的宏觀產品線只有聯準會、CPI 與就業數據，此外沒有別的。兩個場所都沒有掛出任何一張運價、港口、運河或船期準班率的合約。基建已經驗證，觀眾已經到齊，而地球上第二大的實體經濟風險，仍然沒有掛牌。"
      }
    },

    /* ---- 11 · close (custom slot) ----------------------------------- */
    {
      kind: "custom",
      slot: "contact",
      eyebrow: { en: "Chainova Technology Limited · Hong Kong", zh: "Chainova Technology Limited · 香港" },
      heading: {
        en: "$63.5 billion changed hands last year on the outcome of events. None of it on the events that actually move the world's cargo.",
        zh: "去年有 635 億美元，押在各種事件的結果上。沒有一分錢，押在真正牽動全球貨物的那些事件上。"
      },
      lede: {
        en: "The infrastructure is bought, not built. The events are already dated, already published, already resolvable. The people who need to trade them have been locked out of every venue that has ever tried. <a href='#/how'>How a contract settles</a> · <a href='#/about'>Chainova Technology Limited, Hong Kong</a>.",
        zh: "基建是買來的，不是造出來的。事件的日期早已確定，價格還沒有。而真正需要交易它們的人，被過去每一個嘗試過的場所拒於門外。<a href='#/how'>一份合約如何結算</a> · <a href='#/about'>Chainova Technology Limited，香港</a>。"
      }
    }

  ]
};
