/* ==========================================================================
   PREGISTIC — js/content.how.js
   Page content for #/how — "How it settles".

   Attaches: window.PG.content.how = { meta, sections }

   Section shapes used on this page (all from SPEC.md, no custom slots):
     hero    {kind, eyebrow, heading, lede, note, ctas:[{label, href, primary}]}
     steps   {kind, eyebrow, heading, lede, items:[{step, title, body}]}
     table   {kind, eyebrow, heading, lede, cols:[{label, align}],
              rows:[[cell, …]], note}
             cell = {en,zh}  or  {value:{en,zh}, sub:{en,zh}, strong:true}
     bullets {kind, eyebrow, heading, lede, items:[{title, body}]}
     callout {kind, tone:'gold', title, body}
     split   {kind, eyebrow, heading, lede,
              left:{title, body, bullets:[{en,zh}, …]}, right:{…}}
     faq     {kind, eyebrow, heading, items:[{q, a}]}

   Every human-readable value is {en, zh}. zh is Traditional Chinese.
   ========================================================================== */

window.PG = window.PG || {};
window.PG.content = window.PG.content || {};

window.PG.content.how = {

  meta: {
    title: {
      en: "How it settles",
      zh: "如何結算"
    },
    blurb: {
      en: "One named source per contract, fixed before listing. A T+1 settlement window. A bonded challenge, published either way. No discretion.",
      zh: "每份合約只有一個具名來源，掛牌前已定。T+1 結算窗口。挑戰須繳保證金，結果一律公開。不設酌情權。"
    }
  },

  sections: [

    /* ---------------------------------------------------------------- 1 */
    {
      kind: "hero",
      eyebrow: {
        en: "Resolution",
        zh: "結算機制"
      },
      heading: {
        en: "A prediction market is only as good as its resolution rule.",
        zh: "一個預測市場的價值，不會超過它的結算規則。"
      },
      lede: {
        en: "Most crypto prediction markets fail on ambiguity, not on liquidity. The entire moat here is that a logistics contract can be written so there is <strong>nothing to argue about</strong> — the number is published, by a named body, on a known day.",
        zh: "多數加密預測市場敗在語意含糊，而不是流動性不足。這裡的護城河只有一件事：物流合約可以寫到<strong>無可爭辯</strong>——數字由具名機構在已知的日期公布。"
      },
      note: {
        en: "Pregistic is pre-launch. The specifications on this page are launch drafts; thresholds are indicative and re-struck by the domain council at listing. Any price or volume shown elsewhere on this site is simulated demonstration data.",
        zh: "Pregistic 尚未開業。本頁的規格為掛牌前草稿，門檻值屬指示性數字，由領域委員會於掛牌時重新訂定。本站其他頁面顯示的價格與成交量皆為模擬示範數據。"
      },
      ctas: [
        {
          label: { en: "See the contract board", zh: "查看合約看板" },
          href: "#/markets",
          primary: true
        },
        {
          label: { en: "What the order book produces", zh: "訂單簿產出什麼" },
          href: "#/curve",
          primary: false
        }
      ]
    },

    /* ---------------------------------------------------------------- 2 */
    {
      kind: "steps",
      eyebrow: {
        en: "Lifecycle",
        zh: "生命週期"
      },
      heading: {
        en: "From specification to settlement, in five steps",
        zh: "從規格到結算，五個步驟"
      },
      lede: {
        en: "The same five steps run on every contract in every family. Nothing in the sequence depends on a judgement made after the fact.",
        zh: "四個合約家族、每一份合約，都走同樣的五個步驟。整個流程沒有任何一環，取決於事後才做的判斷。"
      },
      items: [
        {
          step: "01",
          title: { en: "Specification", zh: "合約規格" },
          body: {
            en: "Before anything is listed, the specification names one publisher, one series, one determination time and one tie-break. The domain council — chartering, freight forwarding, customs and trade law — writes it and tests it against the last three years of that source's actual prints. If a question cannot be answered from a single published number, it does not get written.",
            zh: "任何合約掛牌之前，規格已寫明唯一的發布機構、唯一的指數系列、唯一的判定時點與唯一的決勝規則。領域委員會——租船、貨運代理、報關與貿易法——負責撰寫，並以該來源過去三年的實際公布紀錄逐一測試。一個問題若無法由單一已公布的數字回答，就不會被寫成合約。"
          }
        },
        {
          step: "02",
          title: { en: "Listing", zh: "掛牌" },
          body: {
            en: "The threshold is struck at listing by the domain council, against the source's own published history and a forward view of where the number can plausibly sit. Specification, source, cadence, expiry and challenge terms are published with the contract and do not change afterwards. A methodology change by the publisher is handled by the rule written before listing, not by a decision taken after it.",
            zh: "門檻由領域委員會在掛牌時訂定，依據該來源自身的公布歷史，以及該數字合理可能落點的前瞻判斷。規格、來源、公布頻率、到期日與挑戰條款隨合約一併公開，此後不再更動。發布機構若變更方法論，依掛牌前已寫好的規則處理，而不是事後才做決定。"
          }
        },
        {
          step: "03",
          title: { en: "Trading", zh: "交易" },
          body: {
            en: "Continuous two-sided trading against a shared order book. Tickets start at US$1 — not 10 FEU, not a vessel voyage, not an ISDA. Collateral is non-custodial: positions and settlement sit on-chain through DEXBuilder, and the platform never holds user funds. Both sides read the same record.",
            zh: "在共用訂單簿上連續雙向交易。最小交易金額為 1 美元——不是 10 個 FEU，不是一個航次，也不需要 ISDA。保證金採非託管方式：持倉與結算經 DEXBuilder 上鏈，平台不持有用戶資金。買賣雙方看的是同一份紀錄。"
          }
        },
        {
          step: "04",
          title: { en: "Resolution", zh: "結算" },
          body: {
            en: "At the determination time the named source prints. The published number is read against the specification and the contract settles inside a T+1 window, with the source document posted alongside the result. Nothing is resolved by vote, by poll, or by the platform's reading of the news.",
            zh: "判定時點一到，具名來源公布數字。該數字對照規格判讀，合約在 T+1 窗口內完成結算，來源文件與結果一併張貼。不以投票、民調，或平台對新聞的解讀來裁定任何事情。"
          }
        },
        {
          step: "05",
          title: { en: "Challenge", zh: "挑戰" },
          body: {
            en: "A settlement can be challenged for 24 hours after it is posted, by any account that held a position at the determination time, on posting a bond. The challenge, the bond, the evidence and the outcome all go on the public record — including the ones we get wrong. A venue that resolves cleanly a hundred times earns the right to list the hard ones.",
            zh: "結算公布後 24 小時內，判定時點持有部位的任何帳戶都可繳付保證金提出挑戰。挑戰內容、保證金、證據與結果全部列入公開紀錄——包括我們判錯的那些。乾淨結算一百次的場所，才有資格掛牌困難的合約。"
          }
        }
      ]
    },

    /* ---------------------------------------------------------------- 3 */
    {
      kind: "table",
      eyebrow: {
        en: "Source universe",
        zh: "來源清單"
      },
      heading: {
        en: "Three tiers of settlement source",
        zh: "結算來源的三個層級"
      },
      lede: {
        en: "Every contract settles on exactly one source, and every source sits in one of three tiers. The tier decides what it costs us to use it and how fast a contract can be listed against it.",
        zh: "每份合約只用一個來源結算，每個來源歸屬於三個層級之一。層級決定了使用成本，也決定了以它為結算來源的合約能多快掛牌。"
      },
      cols: [
        { label: { en: "Tier", zh: "層級" }, align: "left" },
        { label: { en: "Sources", zh: "來源" }, align: "left" },
        { label: { en: "What it costs us", zh: "我們的成本" }, align: "left" },
        { label: { en: "Why we use it", zh: "採用的理由" }, align: "left" }
      ],
      rows: [
        [
          {
            value: { en: "Tier 1", zh: "第一層" },
            sub: { en: "Licensed benchmark feeds", zh: "授權指數行情" },
            strong: true
          },
          {
            en: "Xeneta XSI-C (daily, EU BMR compliant) · Freightos FBX (daily) · Drewry WCI (weekly, Thursday) · Baltic Exchange, including the BDI (daily, 13:00 London) · TAC Index air freight (weekly) · SCFIS (weekly, Monday)",
            zh: "Xeneta XSI-C（每日，符合歐盟基準規例）· Freightos FBX（每日）· Drewry WCI（每週四）· 波羅的海交易所，含 BDI（每日，倫敦時間 13:00）· TAC Index 空運指數（每週）· SCFIS（每週一）"
          },
          {
            en: "A negotiated redistribution licence per administrator, paid annually. Months of negotiation, real money, and no guarantee of a yes. Three signed licences are a Gate 1 deliverable of this round.",
            zh: "須向每一家指數管理機構逐一談成轉發授權，按年支付。談判以月計，費用實在，而且未必談得成。本輪 Gate 1 的交付項目，是三份簽妥的授權。"
          },
          {
            en: "These are the numbers that already price the world's cargo. A freight contract that does not settle on WCI, XSI-C, FBX or SCFIS is settling on something the trade does not use.",
            zh: "這些正是目前替全球貨載定價的數字。不以 WCI、XSI-C、FBX 或 SCFIS 結算的運價合約，等於拿業界不用的數字來結算。"
          }
        ],
        [
          {
            value: { en: "Tier 2", zh: "第二層" },
            sub: { en: "Public authority records", zh: "公權力機關紀錄" },
            strong: true
          },
          {
            en: "US Federal Register · USTR · US Customs and Border Protection · MOFCOM notices · Panama Canal Authority advisories to shipping · Suez Canal Authority · IMO MEPC record · EU Official Journal · IMF PortWatch",
            zh: "美國聯邦公報 · 美國貿易代表署（USTR）· 美國海關及邊境保衛局（CBP）· 中國商務部公告 · 巴拿馬運河管理局航運通告 · 蘇伊士運河管理局 · 國際海事組織 MEPC 會議紀錄 · 歐盟官方公報 · IMF PortWatch"
          },
          {
            en: "Nothing to licence. The cost is drafting: turning a gazette notice into a question with exactly one answer, and writing the tie-break for the day the notice is late, amended, or silent.",
            zh: "不需要任何授權，成本在撰寫：把一則公報公告寫成只有一個答案的問題，並為公告延遲、被修訂或根本沒出現的那一天，預先寫好決勝規則。"
          },
          {
            en: "Free, dated and beyond dispute. This is where the first wave of the board settles, and it is why a board can exist before a single benchmark licence is signed.",
            zh: "免費、有日期、無可爭辯。首波看板全部在這一層結算，也因此在任何一份指數授權簽妥之前，看板就已經可以成立。"
          }
        ],
        [
          {
            value: { en: "Tier 3", zh: "第三層" },
            sub: { en: "Attested analytics", zh: "出具確認的分析數據" },
            strong: true
          },
          {
            en: "Sea-Intelligence (monthly liner schedule reliability) · Lloyd's List Intelligence (vessel transit counts)",
            zh: "Sea-Intelligence（每月班輪船期準班率）· Lloyd's List Intelligence（船舶通行數）"
          },
          {
            en: "Contracted, attested and redistribution-licensed. The publisher attests the specific figure used at settlement, so the number that settles the contract is a number the publisher stands behind.",
            zh: "須簽約、須就數字出具確認，並取得轉發授權。發布機構針對結算所用的那個數字出具確認，因此結算的數字就是發布機構願意背書的數字。"
          },
          {
            en: "Two of the most-watched operational numbers in liner shipping — 62.2% global schedule reliability in March 2026, average delay 5.48 days — have no tradable expression anywhere.",
            zh: "班輪業最常被引用的兩項營運數字——2026 年 3 月全球船期準班率 62.2%、平均延誤 5.48 天——目前在任何場所都沒有可交易的表達方式。"
          }
        ]
      ],
      note: {
        en: "Schedule reliability and delay figures: Sea-Intelligence, March 2026. Tier 1 and Tier 3 contracts are listed only once the relevant redistribution licence is signed; until then the board runs on Tier 2.",
        zh: "準班率與延誤數字：Sea-Intelligence，2026 年 3 月。第一層與第三層合約須待相關轉發授權簽妥後才掛牌；在此之前，看板以第二層來源運作。"
      }
    },

    /* ---------------------------------------------------------------- 4 */
    {
      kind: "bullets",
      eyebrow: {
        en: "Design rules",
        zh: "設計規則"
      },
      heading: {
        en: "Four rules, written before the first contract",
        zh: "四條規則，早於第一份合約"
      },
      lede: {
        en: "They constrain what we are allowed to list. That is the point of writing them down first.",
        zh: "這些規則限制我們能掛什麼。先寫下來，就是為了受它限制。"
      },
      items: [
        {
          title: { en: "One source, named before listing.", zh: "單一來源，掛牌前具名。" },
          body: {
            en: "The contract specification carries the publisher, the series, the print date and the tie-break. Nothing is resolved by vote.",
            zh: "合約規格載明發布機構、指數系列、公布日期與決勝規則。沒有任何事項以投票裁定。"
          }
        },
        {
          title: { en: "Licence, don't scrape.", zh: "取得授權，不抓取。" },
          body: {
            en: "WCI, XSI-C, FBX, SCFIS, TAC and Sea-Intelligence are commercial benchmarks. Redistribution licences are a real cost and a real barrier — which is exactly why they are a moat.",
            zh: "WCI、XSI-C、FBX、SCFIS、TAC 與 Sea-Intelligence 都是商業指數。轉發授權是實實在在的成本與門檻——這正是它構成護城河的原因。"
          }
        },
        {
          title: { en: "Prefer the unarguable.", zh: "優先選擇無可爭辯的。" },
          body: {
            en: "First-wave contracts settle on government gazettes and canal authority advisories: free, dated, and beyond dispute.",
            zh: "首波合約以政府公報與運河管理局航運通告結算：免費、有日期、無可爭辯。"
          }
        },
        {
          title: { en: "Publish the disagreement.", zh: "公開爭議。" },
          body: {
            en: "Every challenge, bond and outcome is on the record. A venue that resolves cleanly a hundred times earns the right to list the hard ones.",
            zh: "每一次挑戰、保證金與結果都列入紀錄。乾淨結算一百次的場所，才有資格掛牌困難的合約。"
          }
        }
      ]
    },

    /* ---------------------------------------------------------------- 5 */
    {
      kind: "callout",
      tone: "gold",
      title: {
        en: "3 of 7",
        zh: "七組行情，只有三組每日發布"
      },
      body: {
        en: "Only three of the seven benchmark feeds we need are daily, and only XSI-C is verifiably compliant with the EU Benchmarks Regulation. A weekly feed cannot settle a daily question, and a non-compliant one cannot be put in front of a European professional client. Which feed a contract settles on is therefore the product decision — a domain judgement, not an engineering one.",
        zh: "我們需要的七組指數行情之中，只有三組是每日發布，而且只有 XSI-C 可查證符合歐盟基準規例。每週發布的行情無法結算每日的問題；不符合規例的行情不能送到歐洲專業客戶面前。因此，一份合約用哪一組行情結算，才是真正的產品決策——那是領域判斷，不是工程判斷。"
      }
    },

    /* ---------------------------------------------------------------- 6 */
    {
      kind: "table",
      eyebrow: {
        en: "Anatomy",
        zh: "規格解剖"
      },
      heading: {
        en: "One specification, read line by line",
        zh: "逐行讀一份合約規格"
      },
      lede: {
        en: "PCA-DRAFT-SEP26 — Panama Canal Neopanamax maximum draft at or below 47.5 ft on 30 September 2026. Every contract on the board carries these twelve lines before anyone can trade it.",
        zh: "PCA-DRAFT-SEP26——2026 年 9 月 30 日巴拿馬運河新巴拿馬型船閘最大吃水在 47.5 英尺或以下。看板上每一份合約，在任何人能交易之前，都先備齊這十二行。"
      },
      cols: [
        { label: { en: "Field", zh: "欄位" }, align: "left" },
        { label: { en: "PCA-DRAFT-SEP26", zh: "PCA-DRAFT-SEP26" }, align: "left" }
      ],
      rows: [
        [
          { en: "Contract code", zh: "合約代碼" },
          {
            en: "<strong>PCA-DRAFT-SEP26</strong> · binary, YES / NO · listed 12 June 2026",
            zh: "<strong>PCA-DRAFT-SEP26</strong> · 二元合約，YES／NO · 2026 年 6 月 12 日掛牌"
          }
        ],
        [
          { en: "Family", zh: "合約家族" },
          {
            en: "Chokepoints and ports — canal drafts, transit counts, auction clearing prices, congestion days, berth waits and schedule reliability.",
            zh: "咽喉水道與港口——運河吃水、通行數、拍賣成交價、壅塞天數、靠泊等待與船期準班率。"
          }
        ],
        [
          { en: "Question", zh: "結算問題" },
          {
            en: "Does the Panama Canal Authority advisory to shipping in force at 23:59 UTC on 30 September 2026 state a maximum authorised draft for the Neopanamax locks of 47.5 ft TFW or less?",
            zh: "2026 年 9 月 30 日 23:59 UTC 時生效的巴拿馬運河管理局航運通告，是否載明新巴拿馬型船閘的最大核准吃水為 47.5 英尺 TFW 或以下？"
          }
        ],
        [
          { en: "Resolution source", zh: "結算來源" },
          {
            en: "Panama Canal Authority (ACP), Advisory to Shipping, as published by the Authority. Tier 2 — public authority record, no licence required, no vendor able to withdraw it.",
            zh: "巴拿馬運河管理局（ACP）發布的航運通告。屬第二層——公權力機關紀錄，無須授權，也沒有任何供應商能把它收回。"
          }
        ],
        [
          { en: "Print cadence", zh: "公布頻率" },
          {
            en: "As published. The Authority issues draft advisories irregularly — typically two to six weeks ahead of the effective date — and supersedes them by advisory number.",
            zh: "隨時公布。管理局不定期發出吃水通告——通常在生效日前二至六週——並以通告編號取代前一份。"
          }
        ],
        [
          { en: "Expiry", zh: "到期" },
          {
            en: "30 September 2026, 23:59 UTC. The expiry time is the determination time; there is no separate observation period.",
            zh: "2026 年 9 月 30 日 23:59 UTC。到期時點即判定時點，沒有另設觀察期。"
          }
        ],
        [
          { en: "Settlement window", zh: "結算窗口" },
          {
            en: "T+1. The result is posted within 24 hours of the determination time, together with the advisory number and the document it was read from.",
            zh: "T+1。結果在判定時點後 24 小時內公布，並附上通告編號與所依據的文件。"
          }
        ],
        [
          { en: "Tie-break rule", zh: "決勝規則" },
          {
            en: "If two advisories are in force at the determination time, the higher advisory number governs. If an advisory states a range, its upper bound is used. If an advisory is issued after the determination time, it is disregarded even where it is stated to be effective earlier. Draft is read in feet of tropical fresh water (TFW) exactly as printed; no unit conversion and no rounding are performed. Exactly 47.5 ft resolves YES.",
            zh: "判定時點若有兩份通告同時生效，以編號較大者為準。通告若載明區間，取區間上限。通告若在判定時點之後才發出，即使載明較早生效，亦不予採計。吃水依通告所印的熱帶淡水（TFW）英尺數判讀，不作單位換算，不作四捨五入。恰為 47.5 英尺者，結算為 YES。"
          }
        ],
        [
          { en: "Challenge bond", zh: "挑戰保證金" },
          {
            en: "US$2,500 or 2% of the contract's open interest at settlement, whichever is greater, posted in the settlement asset within 24 hours of the result. A successful challenge reverses the settlement and returns the bond in full; a failed one forfeits it to the settlement fund. Both are published with the evidence.",
            zh: "2,500 美元，或結算時該合約未平倉金額的 2%，取其高者，須於結果公布後 24 小時內以結算資產繳付。挑戰成立者推翻原結算並全額退還保證金；挑戰不成立者，保證金沒入結算基金。兩種結果都連同證據公開。"
          }
        ],
        [
          { en: "Minimum ticket", zh: "最小交易金額" },
          {
            en: "US$1. Not 10 FEU, not a vessel voyage, not an ISDA.",
            zh: "1 美元。不是 10 個 FEU，不是一個航次，也不需要 ISDA。"
          }
        ],
        [
          { en: "Settlement asset", zh: "結算資產" },
          {
            en: "US dollar stablecoin collateral held on-chain. A YES share pays 1.00 on a YES resolution and 0.00 on NO; the two sides of every contract are fully collateralised at listing.",
            zh: "以鏈上持有的美元穩定幣作為保證金。結算為 YES 時，每一單位 YES 支付 1.00，NO 支付 0.00；每份合約的買賣雙方在掛牌時即全額提供保證金。"
          }
        ],
        [
          { en: "Custody", zh: "保管" },
          {
            en: "Non-custodial. Collateral, positions and settlement run on-chain through DEXBuilder. Chainova never holds user funds and cannot move a position.",
            zh: "非託管。保證金、持倉與結算全部經 DEXBuilder 上鏈執行。Chainova 不持有用戶資金，也無法移動任何部位。"
          }
        ]
      ],
      note: {
        en: "Launch draft. The 47.5 ft threshold is indicative and is re-struck by the domain council at listing. Pregistic is pre-launch: no contract is open for trading today.",
        zh: "掛牌前草稿。47.5 英尺的門檻屬指示性數字，由領域委員會於掛牌時重新訂定。Pregistic 尚未開業：目前沒有任何合約可供交易。"
      }
    },

    /* ---------------------------------------------------------------- 7 */
    {
      kind: "split",
      eyebrow: {
        en: "Sequencing",
        zh: "先後順序"
      },
      heading: {
        en: "What we can resolve on now, and what needs a signature first",
        zh: "現在就能結算的，與必須先簽授權的"
      },
      lede: {
        en: "The board is built in two waves, and the order is deliberate. The free half can be listed on day one; the licensed half is the part a competitor cannot copy on a weekend.",
        zh: "看板分兩波建立，順序是刻意安排的。免費的那一半第一天就能掛牌；需要授權的那一半，才是競爭對手無法在一個週末內複製的部分。"
      },
      left: {
        title: {
          en: "Wave one — public records",
          zh: "第一波：公開紀錄"
        },
        body: {
          en: "Government gazettes, canal authority advisories and customs disbursement data. Free to read, dated on publication, and beyond dispute. Around half the launch board settles here, and none of it waits on anyone's signature.",
          zh: "政府公報、運河管理局航運通告與海關撥付數據。免費可讀、公布即有日期、無可爭辯。開業看板約有一半在這裡結算，而且不必等任何人簽字。"
        },
        bullets: [
          {
            en: "Federal Register and USTR notices for tariff actions, rates and effective dates. PORTFEE-APR27 settles on whether the Section 301 China-vessel port fee steps up to $110 per net ton on 17 April 2027 as scheduled.",
            zh: "美國聯邦公報與 USTR 公告，涵蓋關稅措施、稅率與生效日。PORTFEE-APR27 的結算依據，是 301 條款對中國船舶的港口費是否如期於 2027 年 4 月 17 日調升至每淨噸 110 美元。"
          },
          {
            en: "Panama Canal Authority advisories and auction results — draft limits, transit slots and clearing prices, published to shipping as they take effect.",
            zh: "巴拿馬運河管理局的航運通告與拍賣結果——吃水上限、通行時段與成交價，在生效時對航運界公布。"
          },
          {
            en: "Suez Canal Authority records and IMF PortWatch for monthly transit counts measured against the 2023 baseline.",
            zh: "蘇伊士運河管理局紀錄與 IMF PortWatch，用於計算相對 2023 年基準的每月通行數。"
          },
          {
            en: "CBP disbursement data for IEEPA refund totals; MOFCOM notices for export-control extensions; the IMO MEPC record for the Net-Zero Framework.",
            zh: "CBP 撥付數據用於 IEEPA 退稅累計金額；商務部公告用於出口管制的延長；IMO MEPC 紀錄用於淨零框架。"
          },
          {
            en: "Nothing in this wave can be withdrawn by a vendor, repriced mid-contract, or made conditional on a commercial relationship.",
            zh: "這一波的來源，沒有任何一項會被供應商收回、在合約存續期間重新定價，或以商業關係作為提供條件。"
          }
        ]
      },
      right: {
        title: {
          en: "Wave two — licensed benchmarks",
          zh: "第二波：授權指數"
        },
        body: {
          en: "Drewry WCI, Xeneta XSI-C, Freightos FBX, SCFIS, Baltic and TAC. These are the numbers hedgers already price against, and every one of them is somebody's product. No contract settles on them until a redistribution licence is signed.",
          zh: "Drewry WCI、Xeneta XSI-C、Freightos FBX、SCFIS、波羅的海指數與 TAC。這些是對沖者本來就在對照的數字，而且每一組都是別人的產品。在轉發授權簽妥之前，沒有任何合約會以它們結算。"
        },
        bullets: [
          {
            en: "Three benchmark redistribution licences are a Gate 1 deliverable of this round, alongside the 60-contract library, the HK counsel opinion and the Head of Market Design hire.",
            zh: "三份指數轉發授權是本輪 Gate 1 的交付項目，與 60 份合約庫、香港法律意見書及市場設計主管到任並列。"
          },
          {
            en: "Negotiation runs in months, not weeks, and an administrator can simply say no. The Month-12 gate says so in advance: if no administrator has granted a licence, the moat does not exist and the plan is rewritten as a much smaller one.",
            zh: "談判以月計，不是以週計，而且指數管理機構完全可以拒絕。第 12 個月的關卡已事先寫明：若沒有任何管理機構授權，護城河就不存在，計劃改寫為一個規模小得多的版本。"
          },
          {
            en: "That slowness is why the licence is the moat and not the obstacle. A better-funded competitor still has to negotiate the same rights, with the same six administrators, on the same calendar — capital does not shorten it.",
            zh: "正因為慢，授權才是護城河，而不是障礙。資金更雄厚的競爭對手，一樣得向同樣六家管理機構、依同樣的時程談同樣的權利——錢並不能把它縮短。"
          },
          {
            en: "Until a licence lands, a freight-rate view can still be expressed against a Tier 2 proxy. We would rather list nothing than settle a contract on a number we do not have the right to republish.",
            zh: "授權到手之前，運價方向的觀點仍可透過第二層的替代標的表達。我們寧可不掛牌，也不會用一個無權重新發布的數字去結算合約。"
          }
        ]
      }
    },

    /* ---------------------------------------------------------------- 8 */
    {
      kind: "bullets",
      eyebrow: {
        en: "Build vs buy",
        zh: "自建與外購"
      },
      heading: {
        en: "What the infrastructure partner provides, and what Pregistic owns",
        zh: "基礎設施夥伴提供什麼，Pregistic 自己擁有什麼"
      },
      lede: {
        en: "DEXBuilder is Gate Labs' white-label venue platform. It is a revenue-share partnership with no licence fee, no service fee and no minimum commitment, and the share is paid on <strong>executed trades only</strong>. Quoted time from configuration to live trading is about an hour, against three or four quarters of build. That single decision converts roughly 60% of a normal seed round from engineering into market-making and distribution.",
        zh: "DEXBuilder 是 Gate Labs 的白標交易場所平台。合作方式為收入分成，沒有授權費、沒有服務費、沒有最低承諾，分成只按<strong>已成交的交易</strong>計算。從設定到可交易的報價時間約為一小時，自建則需三、四個季度。光是這個決定，就把一輪正常種子資金約 60% 的用途，從工程轉為做市與分銷。"
      },
      items: [
        {
          title: { en: "Matching, clearing and risk — partner", zh: "撮合、清算與風控——夥伴提供" },
          body: {
            en: "A CEX-grade matching engine with multi-layer risk parameters at account, market and global level. Building the same thing takes 9 to 15 months of senior exchange engineers plus an audit cycle, and it is not the part a freight venue wins on.",
            zh: "交易所等級的撮合引擎，並在帳戶、市場與全域三個層級設有多層風險參數。自建同樣的東西需要 9 至 15 個月的資深交易所工程師再加一輪稽核，而這並不是一個運價交易場所勝出的地方。"
          }
        },
        {
          title: { en: "Settlement and custody — partner", zh: "結算與保管——夥伴提供" },
          body: {
            en: "Fully non-custodial and on-chain. The platform never touches user funds, which removes custody licence exposure, wallet infrastructure and the insurance that goes with them. Every movement is independently verifiable by both sides of a trade.",
            zh: "完全非託管、全程上鏈。平台不碰用戶資金，因此不必承擔保管牌照風險、錢包基礎建設與隨之而來的保險成本。每一筆資金移動，交易雙方都能各自查核。"
          }
        },
        {
          title: { en: "Compliance plumbing — partner", zh: "合規基礎功能——夥伴提供" },
          body: {
            en: "Enterprise KYC, AML, trading risk control, permission management and geo-fencing are built into the infrastructure layer rather than bolted on. Sequenced market access is a configuration we set, not a system we write.",
            zh: "企業級 KYC、AML、交易風控、權限管理與地理封鎖內建於基礎設施層，而不是事後外掛。分階段開放市場是我們設定的參數，不是我們要寫的系統。"
          }
        },
        {
          title: { en: "Liquidity network — partner", zh: "流動性網絡——夥伴提供" },
          body: {
            en: "Top-tier market makers at no market-making cost to the platform, with depth shared across prediction and event products. The round's liquidity line funds trader incentives, points and competitions — not market-maker retainers.",
            zh: "頂級做市商，平台不需負擔做市成本，深度在預測與事件類產品之間共用。本輪的流動性預算用於交易者激勵、積分與競賽——不是做市商的固定聘金。"
          }
        },
        {
          title: { en: "The contract library — Pregistic", zh: "合約庫——Pregistic 自有" },
          body: {
            en: "Sixty cleanly-settling logistics contracts is a year of domain work, not a feature. Every question, threshold, cadence and tie-break is written and stress-tested by the domain council before listing. No infrastructure partner supplies this, and it is first on our list of what is actually defensible.",
            zh: "六十份能乾淨結算的物流合約，是一整年的領域工作，不是一項功能。每個問題、門檻、公布頻率與決勝規則，都由領域委員會在掛牌前撰寫並反覆測試。沒有任何基礎設施夥伴會提供這個，而它在我們真正的防禦力清單上排第一。"
          }
        },
        {
          title: { en: "Benchmark licences — Pregistic", zh: "指數授權——Pregistic 自有" },
          body: {
            en: "Redistribution rights are negotiated by us, with the index administrators, under our name. They are slow, they cost money, and they do not come with a platform contract.",
            zh: "轉發權利由我們以自己的名義，逐一與指數管理機構談判取得。過程慢、要花錢，而且不會隨平台合約附送。"
          }
        },
        {
          title: { en: "Hedger distribution — Pregistic", zh: "對沖端分銷——Pregistic 自有" },
          body: {
            en: "Design partners, forwarder associations, and the first 200 hedging accounts in the world's densest trade corridor. The partner's 100+ media outlets, 2,000+ KOLs and 500+ community channels reach traders; reaching forwarders is our own work.",
            zh: "設計夥伴、貨代公會，以及全球最密集貿易走廊裡的前 200 個對沖帳戶。夥伴的 100 多家媒體、2,000 多位 KOL 與 500 多個社群渠道觸及的是交易者；要觸及貨代，是我們自己的工作。"
          }
        },
        {
          title: { en: "The curve — Pregistic", zh: "曲線——Pregistic 自有" },
          body: {
            en: "A live, market-implied probability curve on freight rates, chokepoint disruption and tariff outcomes falls out of an order book we operate. The infrastructure produces the trades; the interpretation, the history and the API are ours.",
            zh: "一條即時、由市場推導出來的機率曲線，涵蓋運價、咽喉水道中斷與關稅結果，是我們營運的訂單簿的副產品。基礎設施產生成交；判讀、歷史數據與 API 是我們的。"
          }
        }
      ]
    },

    /* ---------------------------------------------------------------- 9 */
    {
      kind: "faq",
      eyebrow: {
        en: "Questions",
        zh: "疑問"
      },
      heading: {
        en: "What an operator asks before trusting a settlement",
        zh: "業者在相信一次結算之前會問的問題"
      },
      items: [
        {
          q: {
            en: "What happens if the index publisher changes its methodology mid-contract?",
            zh: "指數發布機構在合約存續期間變更方法論，會怎樣？"
          },
          a: {
            en: "The specification says what happens before it happens. Each contract names the series and the methodology version in force at listing. If the administrator publishes a change together with a restated back series, settlement uses the restated series. If the change applies prospectively only, settlement uses the number as printed on the determination date under the new methodology, and we list a successor contract rather than adjusting a live one. If the series is discontinued outright before expiry, the contract voids and collateral is returned at the traded price — nobody should profit from a question the publisher stopped answering. In none of these cases does anyone consult our view of which outcome would be fairer.",
            zh: "規格在事情發生之前就已寫明處理方式。每份合約載明掛牌時生效的指數系列與方法論版本。若管理機構公布變更並同時重編歷史數列，結算採用重編後的數列。若變更僅向後適用，結算採用判定日依新方法論公布的數字，我們另行掛牌後續合約，而不去調整存續中的合約。若該系列在到期前直接停止發布，合約作廢，保證金按成交價退回——發布機構不再回答的問題，不該有人從中獲利。以上任何一種情況，都不會有人來問我們覺得哪個結果比較公道。"
          }
        },
        {
          q: {
            en: "What if the source does not print on the expiry date?",
            zh: "如果來源在到期日沒有公布數字呢？"
          },
          a: {
            en: "Every specification carries a fallback before it carries a threshold. For scheduled feeds, settlement uses the last print published on or before the determination time, provided it falls inside the stated grace period — five business days for a weekly series, two for a daily one. Beyond the grace period the contract voids and collateral is returned. For irregular sources such as canal authority advisories, the advisory in force at the determination time governs, and there is always one in force; that is precisely why advisories make good settlement sources. A public holiday is not an event, and a late print is not a dispute.",
            zh: "每份規格先寫備援，才寫門檻。定期發布的行情，結算採用判定時點當日或之前最後一次公布的數字，前提是該次公布落在規定的寬限期內——每週系列為五個營業日，每日系列為兩個營業日。超出寬限期，合約作廢並退回保證金。至於運河管理局航運通告這類不定期來源，以判定時點當時生效的通告為準，而任何時點都必定有一份通告生效中；這正是通告適合作為結算來源的原因。公眾假期不是事件，公布延遲也不是爭議。"
          }
        },
        {
          q: {
            en: "Who can challenge a settlement, and what does it cost?",
            zh: "誰可以挑戰結算？成本是多少？"
          },
          a: {
            en: "Any account that held a position in the contract at the determination time, within 24 hours of the result being posted. The bond is US$2,500 or 2% of the contract's open interest, whichever is greater. A successful challenge reverses the settlement, returns the bond in full, and is published with the evidence; a failed one forfeits the bond to the settlement fund. The bond exists to stop costless noise, not to price out a correct objection — and every challenge, bond and outcome goes on the public record whichever way it lands. A settlement dispute unresolved after 30 days is, by our own Month-12 gate, a terminal event for the plan.",
            zh: "判定時點持有該合約部位的任何帳戶，可在結果公布後 24 小時內提出。保證金為 2,500 美元或該合約未平倉金額的 2%，取其高者。挑戰成立者推翻原結算、全額退還保證金，並連同證據公開；挑戰不成立者，保證金沒入結算基金。保證金的作用是阻擋零成本的雜訊，不是把有道理的異議擋在門外——每一次挑戰、保證金與結果，無論結局如何都列入公開紀錄。依我們自訂的第 12 個月關卡，任何結算爭議若超過 30 天未解決，計劃即告終止。"
          }
        },
        {
          q: {
            en: "What stops the platform from resolving in its own favour?",
            zh: "有什麼能阻止平台把結算往自己有利的方向判？"
          },
          a: {
            en: "Three things, in order of how much weight they deserve. First, the contract names one external source and one tie-break rule before listing, so there is no discretionary step left for us to exercise. Second, the platform does not take positions in its own contracts: revenue is transaction fees, partner economics and data, and the infrastructure share is paid on executed trades regardless of which side wins. Third, settlement runs on-chain through DEXBuilder rather than on our own ledger, so the determination and the payout are both verifiable by the side that lost.",
            zh: "三件事，依可信的份量排序。第一，合約在掛牌前已指定唯一的外部來源與唯一的決勝規則，我們手上沒有可以行使的酌情環節。第二，平台不在自家合約上持倉：收入來自交易手續費、夥伴分成與數據，基礎設施分成按已成交交易計算，與哪一方贏無關。第三，結算經 DEXBuilder 上鏈執行，不在我們自己的帳本上，判定與付款輸的一方都能自行查核。"
          }
        },
        {
          q: {
            en: "Is my collateral held by Pregistic?",
            zh: "我的保證金是由 Pregistic 保管嗎？"
          },
          a: {
            en: "No. The venue is non-custodial by design: collateral, positions and settlement sit on-chain through DEXBuilder, and Chainova never holds user funds or has the ability to move a position. That is a structural choice rather than a policy — there is nothing to abscond with and nothing for us to freeze. It also cuts the other way, and we would rather say so here: the protections that come with a custodian do not apply either. You or your wallet provider hold the keys, and a lost key is a lost position.",
            zh: "不是。本場所在設計上即為非託管：保證金、持倉與結算經 DEXBuilder 上鏈，Chainova 不持有用戶資金，也無法移動任何部位。這是結構上的選擇，不是政策宣示——沒有東西可以被捲走，我們也沒有東西可以凍結。反過來說也成立，而我們寧可在這裡講清楚：託管機構附帶的保障同樣不存在。私鑰在你或你的錢包服務商手上，私鑰遺失就等於部位遺失。"
          }
        },
        {
          q: {
            en: "What happens if Pregistic shuts down?",
            zh: "如果 Pregistic 停止營運會怎樣？"
          },
          a: {
            en: "Open positions settle against their named sources, because the sources are not ours and the settlement logic is on-chain. Collateral is not on our balance sheet, so it is not available to our creditors. And the plan has published stop conditions with dates attached: if fewer than 8 of 15 design partners place a second trade by Month 6, or cumulative matched notional is below $4M at Month 12, the next tranche of spend does not happen. Roughly $1.4M of the round is returnable if we stop at Month 9 — there is no infrastructure capex, so there are no stranded assets to argue over.",
            zh: "未平倉部位仍依其具名來源結算，因為來源不屬於我們，結算邏輯在鏈上。保證金不在我們的資產負債表上，因此不屬於我們的債權人可以求償的財產。而且計劃已公開列出附日期的停止條件：若第 6 個月時 15 家設計夥伴中不足 8 家完成第二筆交易，或第 12 個月累計成交名目金額低於 400 萬美元，下一筆支出就不執行。若在第 9 個月停止，本輪約 140 萬美元可退回——沒有基礎設施資本支出，也就沒有擱淺資產需要爭。"
          }
        },
        {
          q: {
            en: "Can I hedge a real shipment with this, and what basis risk am I taking?",
            zh: "我能用這個對沖一票實際貨物嗎？要承擔什麼基差風險？"
          },
          a: {
            en: "Yes, at a size a forwarder recognises: tickets start at US$1, so twenty boxes a month is a hedgeable quantity, with no ISDA, no clearing broker and no 10-FEU lot. But an index hedge is <strong>not a perfect hedge of a specific booking</strong>, and we are not going to pretend otherwise. Your cost is a negotiated rate on one lane, with one carrier, on one sailing, carrying your own surcharges; the contract settles on a published composite. The gap between the two is basis risk and it stays with you — lane mix, contract versus spot, surcharge treatment, the timing between your booking date and the index print, and the fact that a binary pays 1.00 or 0.00 rather than the difference. A shipper who needs the exact difference wants a swap. What is on offer here is a dated, divisible, directional offset available in a size the swap market has never served. Size the hedge against the index, not against the invoice.",
            zh: "可以，而且是貨代認得的規模：最小交易金額 1 美元，因此每月二十個貨櫃就是可以對沖的量，不需要 ISDA、不需要結算經紀商，也沒有 10 個 FEU 一手的限制。但指數對沖<strong>不是某一筆訂艙的完美對沖</strong>，我們不會假裝它是。你的成本，是單一航線、單一船公司、單一航次談下來的運價，還帶著你自己的附加費；合約結算的則是一個已公布的綜合指數。兩者之間的落差就是基差風險，而且由你承擔——航線組合、長約與即期的差異、附加費的計算方式、你訂艙日與指數公布日之間的時間差，以及二元合約支付的是 1.00 或 0.00，而不是兩者之差。需要精準對到差額的托運人，要的是掉期。這裡提供的，是有到期日、可細分、有方向性的抵銷部位，而且規模小到掉期市場從未服務過。對沖規模請對著指數算，不要對著發票算。"
          }
        },
        {
          q: {
            en: "Who can trade, and where are you not available?",
            zh: "誰可以交易？哪些地方不提供服務？"
          },
          a: {
            en: "Anyone who completes KYC and AML onboarding, outside restricted markets. Not US persons at launch: the CFTC's event-contract rulemaking closed comments on 30 April 2026 with 3,561 filings and no final rule, and we revisit when there is one. The European Union is professional-client only, or not at all, following ESMA's 4 July 2026 statement on binary-payout event contracts marketed to retail clients. Hong Kong is our domicile — 13 SFC-licensed VATPs as of May 2026, and no settled local position on event contracts specifically — so we take formal counsel opinion before launch and design to the strictest plausible reading. Pregistic is not licensed or regulated as a venue in any jurisdiction today, and geo-fencing arrives with the infrastructure layer rather than as an afterthought.",
            zh: "完成 KYC 與 AML 註冊、且不在受限市場的任何人。開業時不服務美國人士：美國商品期貨交易委員會的事件合約規則制定已於 2026 年 4 月 30 日結束徵詢，收到 3,561 份意見，尚無最終規則，待規則出爐後再行檢視。歐盟僅限專業客戶，否則完全不提供，依據 ESMA 於 2026 年 7 月 4 日就向散戶行銷二元支付事件合約發表的立場。香港是我們的註冊地——截至 2026 年 5 月有 13 家證監會持牌虛擬資產交易平台，而香港對事件合約本身尚無定論——因此我們在開業前取得正式法律意見書，並依最嚴格的合理解釋來設計。Pregistic 目前在任何司法管轄區都不是持牌或受監管的交易場所；地理封鎖隨基礎設施層提供，而不是事後才補。"
          }
        }
      ]
    }

  ]
};
