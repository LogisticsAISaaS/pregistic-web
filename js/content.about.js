/* =========================================================================
   js/content.about.js — PG.content.about  +  PG.content.legal
   -------------------------------------------------------------------------
   Two pages live in this file:

     #/about   Chainova, the shipped systems, the team, the hires, the
               regulatory posture, contact.
     #/legal   Site terms, the demonstration-data notice, risk disclosure,
               jurisdiction and eligibility, privacy.

   Section shapes used here (all per SPEC.md):
     hero    {kind, eyebrow, heading, lede, note, ctas:[{label, href, primary}]}
     stats   {kind, eyebrow, heading, lede, items:[{value, label, source}]}
     table   {kind, eyebrow, heading, lede, cols:[{label, align, width}],
              rows:[[cell,…]], note}   cell = {en,zh} or {value, sub, strong}
     cards   {kind, eyebrow, heading, lede, items:[{tag, title, body, foot}]}
     bullets {kind, eyebrow, heading, lede, items:[{title, body}], note}
     callout {kind, tone, eyebrow, title, body}
     custom  {kind, slot:'contact', eyebrow, heading, lede}   — js/pages.js
              owns the form; this file supplies the heading block only.

   Every human-readable value is {en, zh}. zh is Traditional Chinese
   (繁體中文, Hong Kong / Taiwan vocabulary).

   Pregistic is pre-launch. Nothing in this file may claim a live venue,
   a deposit facility, or a licence. Deck figures keep their attribution
   and their as-of date.
   ========================================================================= */

window.PG = window.PG || {};
window.PG.content = window.PG.content || {};

/* =========================================================================
   #/about
   ========================================================================= */

window.PG.content.about = {

  meta: {
    title: {
      en: "About — Chainova, the team and the regulatory posture",
      zh: "關於 — Chainova、團隊與監管立場"
    },
    blurb: {
      en: "Pregistic is built by Chainova Technology Limited, a Hong Kong firm that has delivered compliance-grade blockchain and AI systems to regulated industries for five years. Hong Kong domicile, non-custodial by design, sequenced market access.",
      zh: "Pregistic 由 Chainova Technology Limited 建構。這家香港公司五年來為受規管行業交付合規級的區塊鏈與人工智能系統。註冊於香港、設計上非託管、市場准入分階段開放。"
    }
  },

  sections: [

    /* ---- 01 · hero -------------------------------------------------- */
    {
      kind: "hero",
      eyebrow: { en: "Why us", zh: "為何是我們" },
      heading: {
        en: "Five years shipping compliance-grade systems in Hong Kong.",
        zh: "在香港交付合規級系統，已經五年。"
      },
      lede: {
        en: "Chainova Technology Limited builds blockchain and AI systems for Hong Kong's regulated industries — identity verification, asset custody controls, supply-chain data standards, tokenised assets with compliance gating. Pregistic is not a first venture into an unfamiliar discipline. It is the same work — write the spec, name the source, prove the record — pointed at freight.",
        zh: "Chainova Technology Limited 為香港受規管行業建構區塊鏈與人工智能系統：身份驗證、資產託管控制、供應鏈數據標準，以及帶合規閘口的資產代幣化。Pregistic 並非踏進一個陌生的領域。同一套功夫——把規格寫清楚、把來源指名、把紀錄留證——只是這次對準運價。"
      },
      note: {
        en: "Chainova Technology Limited · Hong Kong · chainovahk.com · Pregistic is pre-launch and is not operating a trading venue.",
        zh: "Chainova Technology Limited · 香港 · chainovahk.com · Pregistic 尚未上線，目前並無營運任何交易場所。"
      },
      ctas: [
        {
          label: { en: "The contract board", zh: "合約板" },
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

    /* ---- 02 · stats ------------------------------------------------- */
    {
      kind: "stats",
      eyebrow: { en: "Chainova, by the numbers", zh: "Chainova 的數字" },
      heading: {
        en: "A delivery business, not a first-time crypto team.",
        zh: "一家交付型公司，不是第一次做加密產品的團隊。"
      },
      lede: {
        en: "Company metrics as published by Chainova. Enterprise clients in Hong Kong audit their vendors; every one of these projects was delivered into that standard.",
        zh: "以下為 Chainova 公佈的公司數字。香港的企業客戶會審核供應商，這些項目全部是按那個標準交付的。"
      },
      items: [
        {
          value: { en: "50+", zh: "50+" },
          label: { en: "Projects delivered", zh: "已交付項目" },
          source: { en: "Chainova · chainovahk.com", zh: "Chainova · chainovahk.com" }
        },
        {
          value: { en: "30+", zh: "30+" },
          label: { en: "Enterprise clients", zh: "企業客戶" },
          source: { en: "Chainova · chainovahk.com", zh: "Chainova · chainovahk.com" }
        },
        {
          value: { en: "5+", zh: "5+" },
          label: { en: "Years in AI and blockchain", zh: "人工智能與區塊鏈年資" },
          source: { en: "Chainova · chainovahk.com", zh: "Chainova · chainovahk.com" }
        },
        {
          value: { en: "15+", zh: "15+" },
          label: { en: "Industry awards", zh: "行業獎項" },
          source: { en: "Chainova · chainovahk.com", zh: "Chainova · chainovahk.com" }
        }
      ]
    },

    /* ---- 03 · shipped systems (table) ------------------------------- */
    {
      kind: "table",
      eyebrow: { en: "Shipped, not proposed", zh: "已交付，不是提案" },
      heading: {
        en: "Four systems already built that map onto this venue.",
        zh: "四套已建成的系統，直接對應這個交易場所。"
      },
      lede: {
        en: "A prediction market on trade is four problems: write a settlement spec against a published number, move and reconcile collateral, verify who is on the other side, and gate access by jurisdiction. Chainova has shipped production systems for each of them.",
        zh: "貿易預測市場說到底是四個問題：依一個公開數字寫出結算規格、移動與對賬抵押品、核實對手方身份、按司法管轄區控制准入。這四件事，Chainova 都已經交付過正式生產系統。"
      },
      cols: [
        { label: { en: "Shipped system", zh: "已交付系統" }, width: "38%" },
        { label: { en: "How it maps onto the venue", zh: "如何對應這個交易場所" } }
      ],
      rows: [
        [
          {
            value: { en: "Digital Product Passport standards dataset", zh: "數碼產品護照標準數據集" },
            sub: { en: "Supply-chain data schemas and standards", zh: "供應鏈數據結構與標準" },
            strong: true
          },
          {
            en: "The same discipline as writing a settlement spec against a published benchmark: one named series, one print date, one tie-break, no discretion. The accompanying carbon-capture measurement work solved the same physical-data oracle problem — take a measurement made in the world and make it resolve a contract.",
            zh: "這與依公開基準寫結算規格是同一套功夫：指定一個數列、一個公佈日期、一條決勝規則，不留裁量空間。同期的碳捕集量度工作解決的是同一個實體數據預言機問題——把現實世界量出來的數字，變成能夠結算合約的依據。"
          }
        ],
        [
          {
            value: { en: "Custody Asset Manager system", zh: "資產託管管理系統" },
            sub: { en: "Asset movement, controls and reconciliation", zh: "資產移轉、控制與對賬" },
            strong: true
          },
          {
            en: "Directly relevant to collateral and settlement design: what moves, on whose instruction, against what record, and how a disputed position is reconstructed afterwards. On Pregistic the platform never holds user funds, but the control and reconciliation logic is the same problem.",
            zh: "與抵押品及結算設計直接相關：什麼在移動、依誰的指示、對應哪一筆紀錄，以及事後如何重建一個有爭議的部位。在 Pregistic，平台不持有用戶資金，但控制與對賬的邏輯是同一個問題。"
          }
        ],
        [
          {
            value: { en: "VAPass mobile identity verification", zh: "VAPass 流動身份驗證" },
            sub: { en: "Production KYC-grade identity at scale", zh: "規模化的生產級 KYC 身份驗證" },
            strong: true
          },
          {
            en: "Identity verification built and run inside a Hong Kong regulatory context, not a demo. Venue onboarding is KYC and AML at the door for every account, in a category where the regulator's first question is who exactly is on the other side of this contract.",
            zh: "在香港的監管脈絡下實際建成並運行的身份驗證，不是示範品。交易場所的開戶就是在門口做 KYC 與 AML；在這個領域，監管機構第一條問題就是：合約另一邊究竟是誰。"
          }
        ],
        [
          {
            value: { en: "RWA Web3 launchpad and identity compliance", zh: "真實世界資產 Web3 發行平台與身份合規" },
            sub: { en: "Tokenised real-world assets with compliance gating", zh: "帶合規閘口的真實世界資產代幣化" },
            strong: true
          },
          {
            en: "Venue onboarding, effectively: eligibility checks, permissioning and jurisdiction gating wired into the product rather than bolted on. That is the shape of sequenced market access — no US persons at launch, EU professional-client only or not at all.",
            zh: "實質上就是交易場所的開戶流程：資格審查、權限管理與司法管轄區閘口寫進產品本身，而不是事後加掛。分階段市場准入就是這個形狀——上線時不服務美國人士，歐盟只面向專業客戶，或者乾脆不開放。"
          }
        ]
      ],
      note: {
        en: "<strong>The domain layer is where this venue lives or dies.</strong> Contract specification is written and stress-tested before listing by a domain group covering chartering, freight forwarding, and customs and trade compliance — an ex-freight-derivatives broker, an ex-forwarder and NVOCC operator, and a customs and trade counsel. Hong Kong is the domicile and not a compromise: it sits inside the world's densest trade corridor, hosts the forwarder and chartering community we need as first users, has a functioning virtual-asset framework, and is where the enterprise relationships already are.",
        zh: "<strong>領域知識這一層，決定這個交易場所的生死。</strong>每一張合約在掛牌前，都由一個涵蓋租船、貨運代理、以及海關與貿易合規的領域小組撰寫並做壓力測試——成員包括一位前運費衍生品經紀、一位前貨代及無船承運人營運者，以及一位海關與貿易法律顧問。香港作為註冊地不是妥協：它位處全球最密集的貿易走廊之內，聚集了我們最需要的首批用戶——貨代與租船社群，擁有可運作的虛擬資產監管框架，而我們的企業關係本來就在這裡。"
      }
    },

    /* ---- 04 · team cards -------------------------------------------- */
    {
      kind: "cards",
      eyebrow: { en: "Team", zh: "團隊" },
      heading: {
        en: "Three founders. One delivery record.",
        zh: "三位創辦人，一份交付紀錄。"
      },
      lede: {
        en: "Chainova's founding team, all Hong Kong based. They run the company that shipped the four systems above, and they are the people accountable for the gates on the plan.",
        zh: "Chainova 的創辦團隊，全部常駐香港。上述四套系統由他們的公司交付，計劃書上的每一道關卡也由他們負責。"
      },
      items: [
        {
          tag: { en: "Co-founder & CEO", zh: "聯合創辦人兼行政總裁" },
          title: { en: "Gigi Leung", zh: "Gigi Leung" },
          body: {
            en: "Runs the firm that has delivered 50+ projects to 30+ enterprise clients across Hong Kong's regulated industries. On Pregistic she owns the commercial and regulatory interface — the counsel opinion on contract characterisation, the DEXBuilder partnership terms and the delivery plan.",
            zh: "她所經營的公司，已為香港受規管行業的 30 多家企業客戶交付超過 50 個項目。在 Pregistic，她負責商務與監管的對接面：合約性質認定的法律意見、DEXBuilder 合作條款，以及交付計劃。"
          },
          foot: { en: "Chainova · Hong Kong", zh: "Chainova · 香港" }
        },
        {
          tag: { en: "Co-founder & CTO", zh: "聯合創辦人兼技術總監" },
          title: { en: "Lucas Mo", zh: "Lucas Mo" },
          body: {
            en: "Built the systems Chainova ships into regulated industries: identity verification, custody controls and reconciliation, supply-chain data standards. On Pregistic he owns the DEXBuilder integration, the resolution and settlement engine, and the data layer that produces the Pregistic Curve as a by-product of the order book.",
            zh: "Chainova 交付給受規管行業的系統由他建成：身份驗證、託管控制與對賬、供應鏈數據標準。在 Pregistic，他負責 DEXBuilder 整合、判定與結算引擎，以及把訂單簿副產品轉化為 Pregistic 價格曲線的數據層。"
          },
          foot: { en: "Chainova · Hong Kong", zh: "Chainova · 香港" }
        },
        {
          tag: { en: "Co-founder & COO", zh: "聯合創辦人兼營運總監" },
          title: { en: "Alan Wu", zh: "Alan Wu" },
          body: {
            en: "Runs enterprise delivery at Chainova, where clients audit their vendors and a missed control is a finding. On Pregistic he owns operations: account onboarding and the KYC and AML process, the domain council's contract review cycle, the settlement record, and the discipline that keeps a failed gate from being rationalised away.",
            zh: "他在 Chainova 負責企業交付；那裡的客戶會審核供應商，任何控制點失守都會被寫成審核發現。在 Pregistic，他負責營運：開戶與 KYC、AML 流程，領域委員會的合約覆核週期，結算紀錄，以及確保關卡失守時不會被事後自圓其說的紀律。"
          },
          foot: { en: "Chainova · Hong Kong", zh: "Chainova · 香港" }
        }
      ]
    },

    /* ---- 05 · hires and domain council ------------------------------ */
    {
      kind: "cards",
      eyebrow: { en: "What this round hires", zh: "本輪資金聘用的人" },
      heading: {
        en: "Two hires and four council seats.",
        zh: "兩個職位，四個委員會席位。"
      },
      lede: {
        en: "The round funds the three things infrastructure cannot buy: event design, domain distribution and liquidity. The first two are people. These are the two roles we are hiring for them.",
        zh: "本輪資金投向基礎設施買不到的三件事：事件設計、行業分銷與流動性。前兩件都是人。以下兩個職位，正是為此而設。"
      },
      items: [
        {
          tag: { en: "Hire 01 · funded by this round", zh: "職位 01 · 由本輪資金支付" },
          title: { en: "Head of Market Design", zh: "市場設計主管" },
          body: {
            en: "A freight derivatives or FFA broker background. Owns the contract library, benchmark licence negotiations, threshold striking and the settlement rulebook. The single highest-leverage hire in the company.",
            zh: "背景為運費衍生品或遠期運費協議經紀。負責合約庫、基準指數授權談判、履約價訂定與結算規則手冊。公司內槓桿最高的一個職位。"
          },
          foot: { en: "The first cheque written after close", zh: "交割後開出的第一張支票" }
        },
        {
          tag: { en: "Hire 02 · funded by this round", zh: "職位 02 · 由本輪資金支付" },
          title: { en: "Head of Hedger Distribution", zh: "對沖客戶分銷主管" },
          body: {
            en: "A forwarding or NVOCC commercial background with a live book in the Asia–Europe and transpacific trades. Owns design partners, forwarder association channels and the conversion of the first 200 hedging accounts.",
            zh: "背景為貨運代理或無船承運人商務，並在亞歐與跨太平洋航線上有在手的客戶簿。負責設計夥伴、貨代公會渠道，以及首批 200 個對沖帳戶的轉化。"
          },
          foot: { en: "Target: the first 200 hedging accounts", zh: "目標：首批 200 個對沖帳戶" }
        },
        {
          tag: { en: "Domain council seat", zh: "領域委員會席位" },
          title: { en: "Chartering and dry bulk", zh: "租船與乾散貨" },
          body: {
            en: "Vessel economics and FFA market structure. Reviews every dry bulk and tanker contract before listing, and stress-tests thresholds against how the underlying voyage market actually prices.",
            zh: "船舶經濟學與遠期運費協議市場結構。在掛牌前覆核每一張乾散貨與油輪合約，並以實際航次市場的定價方式，對履約價做壓力測試。"
          },
          foot: { en: "To be named at close", zh: "交割時公佈人選" }
        },
        {
          tag: { en: "Domain council seat", zh: "領域委員會席位" },
          title: { en: "Freight forwarding", zh: "貨運代理" },
          body: {
            en: "SME hedging demand and pricing behaviour. Answers the question the whole plan rests on: at what ticket size, on which lane, does a forwarder quoting a fixed rate on a floating cost actually buy protection.",
            zh: "中小企業的對沖需求與定價行為。回答整份計劃所依賴的問題：一個以浮動成本報固定價的貨代，究竟在哪條航線、多大的交易額之下，才會真的買保護。"
          },
          foot: { en: "To be named at close", zh: "交割時公佈人選" }
        },
        {
          tag: { en: "Domain council seat", zh: "領域委員會席位" },
          title: { en: "Customs and trade law", zh: "海關與貿易法" },
          body: {
            en: "Tariff contract resolution language. A policy contract is only as good as its wording: what counts as an effective date, what counts as an extension, and which gazette print settles it.",
            zh: "關稅合約的判定條文。政策合約的價值全在措辭：什麼算生效日、什麼算延期，以及哪一份憲報公佈才作準。"
          },
          foot: { en: "To be named at close", zh: "交割時公佈人選" }
        },
        {
          tag: { en: "Domain council seat", zh: "領域委員會席位" },
          title: { en: "Market microstructure", zh: "市場微觀結構" },
          body: {
            en: "Fee design and market-maker incentives. Holds the Month-9 gate honest: if the median bid–ask across the ten flagship contracts is wider than 6 points, the terms get renegotiated or the venue stops.",
            zh: "費用設計與造市商誘因。守住第 9 個月那道關卡：若十張旗艦合約的買賣價差中位數闊於 6 個點，就重新談造市條款，否則停止。"
          },
          foot: { en: "To be named at close", zh: "交割時公佈人選" }
        }
      ]
    },

    /* ---- 06 · regulatory posture ------------------------------------ */
    {
      kind: "cards",
      eyebrow: { en: "Regulatory posture", zh: "監管立場" },
      heading: {
        en: "Hong Kong domicile. Non-custodial by design. Sequenced market access.",
        zh: "註冊於香港。設計上非託管。市場准入分階段開放。"
      },
      lede: {
        en: "Pregistic is pre-launch and is not licensed or regulated in any jurisdiction. What follows is the posture the venue is being built to, with the dates and filings it rests on. It is a statement of intent, not a permission already held.",
        zh: "Pregistic 尚未上線，在任何司法管轄區均未取得牌照或受到監管。以下是這個交易場所正在依循的立場，以及其所依據的日期與文件。這是意向的陳述，不是已經到手的許可。"
      },
      items: [
        {
          tag: { en: "United States", zh: "美國" },
          title: { en: "Not at launch", zh: "上線時不開放" },
          body: {
            en: "The CFTC's event-contract ANPR closed for comment on 30 April 2026 with 3,561 filings and no final rule, and 44 states are contesting CFTC authority over sports contracts. We do not serve US persons at launch and revisit the question on a final rule.",
            zh: "美國商品期貨交易委員會的事件合約預先立法通告於 2026 年 4 月 30 日截止收集意見，共收到 3,561 份意見書，至今未有最終規則；同時有 44 個州就該委員會對體育合約的管轄權提出爭議。上線時我們不服務美國人士，待最終規則出台後再行檢討。"
          },
          foot: { en: "CFTC ANPR 91 FR 12516 · comments closed 30 Apr 2026", zh: "CFTC ANPR 91 FR 12516 · 意見期於 2026 年 4 月 30 日結束" }
        },
        {
          tag: { en: "European Union", zh: "歐盟" },
          title: { en: "Non-retail only", zh: "只面向非零售客戶" },
          body: {
            en: "ESMA's statement of 4 July 2026 prohibits marketing binary-payout event contracts to retail clients where those contracts are financial instruments, and requires MiFID II authorisation even for non-retail. EU access is professional-client only, or not at all.",
            zh: "歐洲證券及市場管理局 2026 年 7 月 4 日的聲明，禁止向零售客戶推廣屬於金融工具的二元派付事件合約，即使面向非零售客戶亦須取得 MiFID II 授權。歐盟的准入因此只限專業客戶，或者乾脆不開放。"
          },
          foot: { en: "ESMA statement · 4 Jul 2026", zh: "ESMA 聲明 · 2026 年 7 月 4 日" }
        },
        {
          tag: { en: "Hong Kong", zh: "香港" },
          title: { en: "Licensed-adjacent", zh: "貼近持牌制度" },
          body: {
            en: "13 SFC-licensed virtual asset trading platforms as of May 2026, inside an established virtual-asset framework. There is no settled Hong Kong position on event contracts specifically, so we take formal local counsel opinion before launch and design to the strictest plausible reading.",
            zh: "截至 2026 年 5 月，香港有 13 家證監會持牌虛擬資產交易平台，制度框架已然成形。惟香港對事件合約本身尚無定論，因此我們在上線前取得本地正式法律意見，並按最嚴格的合理解讀來設計產品。"
          },
          foot: { en: "13 SFC-licensed VATPs · May 2026", zh: "13 家證監會持牌虛擬資產交易平台 · 2026 年 5 月" }
        },
        {
          tag: { en: "Structure", zh: "架構" },
          title: { en: "Nothing to abscond with", zh: "沒有可以捲走的東西" },
          body: {
            en: "Non-custodial throughout: the platform never holds user funds, and every movement is on-chain and independently verifiable by both sides. Enterprise KYC, AML, permissioning and geo-fencing come with the infrastructure layer rather than as an afterthought.",
            zh: "全程非託管：平台不持有用戶資金，每一筆移轉都在鏈上，雙方均可獨立驗證。企業級 KYC、AML、權限管理與地域封鎖，隨基礎設施層一併提供，而非事後補上。"
          },
          foot: { en: "Non-custodial by design", zh: "設計上即為非託管" }
        }
      ]
    },

    /* ---- 07 · the easier regulatory case + compliance spend --------- */
    {
      kind: "bullets",
      eyebrow: { en: "The case, and what it costs", zh: "理據，以及代價" },
      heading: {
        en: "Why a hedging contract is the easier regulatory case.",
        zh: "為何對沖合約在監管上是比較容易的一種。"
      },
      lede: {
        en: "The regulatory heat in event contracts is about sports and retail gambling optics. A contract on the Panama Canal draft or the SCFIS index is a different animal, and the precedent for it is decades old.",
        zh: "事件合約的監管火力，集中在體育與零售賭博的觀感上。一張關於巴拿馬運河吃水深度或 SCFIS 指數的合約，性質不同，而且相關先例已有數十年歷史。"
      },
      items: [
        {
          title: { en: "There is a real hedger.", zh: "真的存在對沖者。" },
          body: {
            en: "A canal draft restriction, a freight index level or a tariff effective date has an identifiable class of exposed parties — forwarders, BCOs, 3PLs, terminal operators, insurers — with a commercial reason to transfer that risk, not an entertainment reason to take it.",
            zh: "運河吃水限制、運價指數水平或關稅生效日，背後都有一群身份明確的風險承受者：貨代、實際貨主、第三方物流、碼頭營運商、保險公司。他們轉移這些風險是出於商業理由，不是娛樂理由。"
          }
        },
        {
          title: { en: "The settlement source is published.", zh: "結算來源是公開的。" },
          body: {
            en: "One named publisher, one series, one print date, disclosed before listing and resolved by nobody's vote. First-wave contracts settle on government gazettes and canal authority advisories: free, dated and beyond dispute.",
            zh: "一個指名的公佈機構、一個數列、一個公佈日期，全部在掛牌前披露，不由任何人投票決定。第一批合約依政府憲報與運河當局的航運通告結算：免費、有日期、無從爭辯。"
          }
        },
        {
          title: { en: "The precedent is not new.", zh: "先例並不新鮮。" },
          body: {
            en: "This is the same logic under which the CFTC has long accepted weather and commodity index contracts, and under which roughly 1,600 event contracts were certified in 2025. We are asking to be read as an index hedge, because that is what the contract is.",
            zh: "這正是美國商品期貨交易委員會長年接受天氣與商品指數合約的邏輯，也是 2025 年約 1,600 張事件合約獲得認證的邏輯。我們要求監管機構把它讀成指數對沖工具，因為合約本身就是這樣。"
          }
        },
        {
          title: { en: "HK counsel opinion, pre-launch.", zh: "上線前的香港法律意見。" },
          body: {
            en: "Formal local counsel opinion on contract characterisation — what these instruments are under Hong Kong law — obtained before the first market opens, not after a regulator asks.",
            zh: "在第一個市場開盤之前，先取得本地律師就合約性質認定所出具的正式意見——即這些工具在香港法下屬於什麼——而不是等監管機構來問才去找。"
          }
        },
        {
          title: { en: "Jurisdiction matrix, quarterly.", zh: "司法管轄區矩陣，每季覆核。" },
          body: {
            en: "A jurisdiction matrix and geo-fencing policy, reviewed every quarter. Rules in this category moved three times in eighteen months; a matrix written once is a matrix that is wrong by the second quarter.",
            zh: "一份司法管轄區矩陣與地域封鎖政策，每季覆核一次。這個領域的規則在十八個月內改了三次；只寫一次的矩陣，到第二季就已經是錯的。"
          }
        },
        {
          title: { en: "Smart-contract and settlement audit.", zh: "智能合約與結算審計。" },
          body: {
            en: "An external audit of the smart-contract and settlement path before public launch. Non-custodial means the code is the custodian, and an unaudited custodian is not a posture, it is a hope.",
            zh: "公開上線之前，對智能合約與結算路徑做外部審計。非託管的意思是由程式碼擔任託管人；未經審計的託管人不是一種立場，只是一種期望。"
          }
        },
        {
          title: { en: "Licensed-venue application pathway.", zh: "持牌交易場所申請路徑。" },
          body: {
            en: "An application pathway to a licensed venue structure is a Year-2 milestone, filed in the Month 19–24 gate alongside professional-client access in permitted jurisdictions. Venues that exist when rules land get grandfathered; venues that do not, do not.",
            zh: "取得持牌交易場所架構的申請路徑，是第二年的里程碑，於第 19 至 24 個月的關卡連同准許地區的專業客戶准入一併提交。規則落地時已經存在的場所可獲豁免延續；不存在的，就沒有。"
          }
        }
      ],
      note: {
        en: "Legal, compliance and audit is a funded, standing line of work rather than a one-off. Nothing on this page is legal advice, and nothing on it claims an authorisation, registration or licence that Pregistic or Chainova Technology Limited holds today. The full risk disclosure is on the <a href=\"#/legal\">legal page</a>.",
        zh: "法律、合規與審計是持續投入的常設工作，並非一次性支出。本頁任何內容均不構成法律意見，亦不表示 Pregistic 或 Chainova Technology Limited 目前持有任何授權、註冊或牌照。完整的風險披露載於<a href=\"#/legal\">法律頁面</a>。"
      }
    },

    /* ---- 08 · contact (custom slot) --------------------------------- */
    {
      kind: "custom",
      slot: "contact",
      eyebrow: { en: "Contact", zh: "聯絡" },
      heading: {
        en: "Get in touch.",
        zh: "聯絡我們。"
      },
      lede: {
        en: "Two conversations we want: hedgers who move cargo and want a place on the design-partner list; benchmark administrators and data buyers for the Pregistic Curve. The form below composes an email in your own mail client to <strong>hello@pregistic.com</strong> — nothing is submitted to a server from this page, and Pregistic cannot open an account or take a deposit today.",
        zh: "我們想展開兩種對話：實際運貨、想加入設計夥伴名單的對沖者；Pregistic 價格曲線的基準指數管理機構與數據買家。下方表格會在你自己的郵件程式中草擬一封寄往 <strong>hello@pregistic.com</strong> 的電郵——本頁不會把任何資料送到伺服器，而 Pregistic 目前亦無法開戶或接受存入資金。"
      }
    }

  ]
};

/* =========================================================================
   #/legal
   ========================================================================= */

window.PG.content.legal = {

  meta: {
    title: {
      en: "Terms, risk and privacy",
      zh: "條款、風險與私隱"
    },
    blurb: {
      en: "The terms governing use of this website, the demonstration-data notice, the risk disclosure for the intended product, jurisdiction and eligibility, and what this site does with personal data.",
      zh: "規範本網站使用的條款、示範數據聲明、擬議產品的風險披露、司法管轄區與資格限制，以及本網站如何處理個人資料。"
    }
  },

  sections: [

    /* ---- 01 · hero -------------------------------------------------- */
    {
      kind: "hero",
      eyebrow: { en: "Legal", zh: "法律" },
      heading: {
        en: "Terms, risk and privacy.",
        zh: "條款、風險與私隱。"
      },
      lede: {
        en: "These terms govern your use of pregistic.com. Pregistic is pre-launch: Chainova Technology Limited is not operating a trading venue, is not accepting funds, and is not licensed or regulated in any jurisdiction. Nothing on this website is an offer, a solicitation, or advice of any kind.",
        zh: "以下條款規範你對 pregistic.com 的使用。Pregistic 尚未上線：Chainova Technology Limited 並無營運任何交易場所、並無接受任何資金，亦未在任何司法管轄區取得牌照或受到監管。本網站的任何內容均不構成要約、招攬或任何形式的意見。"
      },
      note: {
        en: "Last updated 14 September 2026 · Chainova Technology Limited · Hong Kong · hello@pregistic.com",
        zh: "最後更新：2026 年 9 月 14 日 · Chainova Technology Limited · 香港 · hello@pregistic.com"
      },
      ctas: [
        {
          label: { en: "Back to about", zh: "返回關於頁面" },
          href: "#/about",
          primary: false
        }
      ]
    },

    /* ---- 02 · site terms -------------------------------------------- */
    {
      kind: "bullets",
      eyebrow: { en: "Site terms", zh: "網站條款" },
      heading: {
        en: "What this website is, and what it is not.",
        zh: "這個網站是什麼，不是什麼。"
      },
      lede: {
        en: "By using this website you accept the terms below. If you do not accept them, please stop using the site.",
        zh: "使用本網站即表示你接受以下條款。若你不接受，請停止使用本網站。"
      },
      items: [
        {
          title: { en: "The operator.", zh: "營運者。" },
          body: {
            en: "This website is published by Chainova Technology Limited, a company domiciled in Hong Kong (chainovahk.com). Pregistic is a product being developed by Chainova. Correspondence: hello@pregistic.com.",
            zh: "本網站由 Chainova Technology Limited 發佈，該公司註冊於香港（chainovahk.com）。Pregistic 是 Chainova 正在開發的產品。聯絡方式：hello@pregistic.com。"
          }
        },
        {
          title: { en: "The website is informational.", zh: "本網站僅供資訊用途。" },
          body: {
            en: "It describes a venue that is being built, the contracts intended for listing, and the seed round being raised to fund it. It is not a trading interface, it processes no orders, and it holds no client money.",
            zh: "它描述的是一個正在興建的交易場所、擬掛牌的合約，以及為此募集的種子輪。它不是交易介面，不處理任何委託，亦不持有任何客戶資金。"
          }
        },
        {
          title: { en: "Not an offer or a solicitation.", zh: "並非要約或招攬。" },
          body: {
            en: "Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security, financial instrument, event contract, derivative, token or other product, in any jurisdiction where such an offer or solicitation would be unlawful, and no such offer is made to any person by means of this website.",
            zh: "本網站的任何內容，均不構成在任何會令該要約或招攬屬違法的司法管轄區內，出售任何證券、金融工具、事件合約、衍生工具、代幣或其他產品的要約，亦不構成購買上述產品的要約邀請；本網站亦不向任何人作出此類要約。"
          }
        },
        {
          title: { en: "No advice.", zh: "不提供任何意見。" },
          body: {
            en: "Nothing here is investment, legal, tax, accounting or trading advice, and nothing here takes account of your circumstances. Take your own professional advice before acting on anything you read.",
            zh: "本網站的內容不構成投資、法律、稅務、會計或交易意見，亦未考慮你的個人情況。在依據所閱內容行事之前，請自行尋求專業意見。"
          }
        },
        {
          title: { en: "Content changes without notice.", zh: "內容可隨時更改，恕不另行通知。" },
          body: {
            en: "Contract specifications, thresholds, expiry dates, sources and figures are indicative and are drawn from the seed materials as at the dates stated on them. Thresholds are re-struck at listing. Any of it may change, be corrected or be withdrawn without notice.",
            zh: "合約規格、履約價、到期日、來源與數字均屬指示性質，取自種子輪文件中所註明日期的版本。履約價會在掛牌時重新訂定。上述任何內容均可能在不另行通知的情況下更改、更正或撤回。"
          }
        },
        {
          title: { en: "Third-party names.", zh: "第三方名稱。" },
          body: {
            en: "Benchmark administrators, exchanges, authorities and venues named on this site are named to identify a proposed settlement source or a market comparison. Their names and marks belong to them. Naming a benchmark is not a claim of a redistribution licence, an endorsement or an affiliation; benchmark redistribution licences are a Gate 1 deliverable and are not held today.",
            zh: "本網站提及的基準指數管理機構、交易所、主管當局與交易場所，僅用以指明擬議的結算來源或市場比較對象。其名稱與標誌歸各自所有人擁有。提及某項基準指數，不代表我們已取得再分發授權、獲得背書或存在任何從屬關係；基準指數再分發授權屬於第一道關卡的交付項目，目前並未持有。"
          }
        },
        {
          title: { en: "No warranty.", zh: "不作保證。" },
          body: {
            en: "The site is provided as it stands. Chainova Technology Limited does not warrant that the content is complete, current or error-free, and to the extent permitted by law accepts no liability for any loss arising from reliance on it.",
            zh: "本網站按現狀提供。Chainova Technology Limited 不保證內容完整、最新或無誤，並在法律容許的範圍內，對任何因依賴本網站內容而產生的損失概不負責。"
          }
        },
        {
          title: { en: "Governing law.", zh: "管轄法律。" },
          body: {
            en: "These terms are governed by the laws of the Hong Kong Special Administrative Region, and the courts of Hong Kong have exclusive jurisdiction over any dispute arising from them or from your use of this website.",
            zh: "本條款受香港特別行政區法律管轄；因本條款或因你使用本網站而產生的任何爭議，均由香港法院專屬管轄。"
          }
        }
      ]
    },

    /* ---- 03 · demonstration data notice ----------------------------- */
    {
      kind: "callout",
      tone: "gold",
      eyebrow: { en: "Demonstration data", zh: "示範數據" },
      title: {
        en: "Every price on this site is simulated.",
        zh: "本網站上的每一個價格都是模擬的。"
      },
      body: {
        en: "Every price, order book, bid–ask spread, volume, open interest, chart line and position shown anywhere on this website is <strong>simulated demonstration data</strong>. It is generated in your own browser by a deterministic simulation from a fixed seed, and it is regenerated the same way on every visit. No live market is operating. No order book shown here has ever existed. No order shown here has ever been matched. No funds can be deposited, no account can be opened and no position can be taken. The demo trade ticket is paper only: it writes to your own browser's local storage and is never sent anywhere. What is real on this site is the contract wording, the named settlement source, the expiry date and the cited figures — the numbers that move are not.",
        zh: "本網站任何位置顯示的價格、訂單簿、買賣價差、成交量、未平倉合約、圖表曲線與持倉，全部都是<strong>模擬的示範數據</strong>。它們由一個固定種子的確定性模擬程式在你自己的瀏覽器內產生，每次瀏覽都以同樣方式重新生成。目前並無任何市場在營運。這裡顯示的訂單簿從未存在過。這裡顯示的委託從未成交過。你無法存入資金、無法開戶，亦無法建立任何部位。示範交易單純屬紙上操作：它只寫入你自己瀏覽器的本機儲存空間，不會傳送到任何地方。本網站真實的部分是合約條文、指名的結算來源、到期日與所引用的數字；會跳動的價格則不是。"
      }
    },

    /* ---- 04 · risk disclosure --------------------------------------- */
    {
      kind: "bullets",
      eyebrow: { en: "Risk disclosure", zh: "風險披露" },
      heading: {
        en: "What can go wrong with the product we intend to launch.",
        zh: "我們擬推出的產品，可能出什麼問題。"
      },
      lede: {
        en: "This disclosure describes the intended future product, not a service available today. If Pregistic launches, these risks apply to anyone who trades on it. Read them as written; none of them is hypothetical.",
        zh: "本披露描述的是擬於未來推出的產品，而非目前可用的服務。若 Pregistic 上線，以下風險適用於每一位在其上交易的人。請按字面理解；當中沒有一項是假設性的。"
      },
      items: [
        {
          title: { en: "A contract can expire worthless.", zh: "合約可以到期歸零。" },
          body: {
            en: "A binary event contract settles at one or at nothing. If the event does not occur as specified by the expiry, the position pays zero and the entire amount paid for it is lost. Scalar contracts settle within a stated range and can settle at either bound.",
            zh: "二元事件合約的結算結果不是全額就是零。若指定事件在到期前未按條文所述發生，該部位結算為零，為此支付的全部金額即告損失。區間合約在指定範圍內結算，亦可能在上下任何一端的邊界結算。"
          }
        },
        {
          title: { en: "An index hedge is not your booking.", zh: "指數對沖不等於你的訂艙。" },
          body: {
            en: "Basis risk is the central risk of this product. A contract settles on a published benchmark — a Drewry WCI composite print, an XSI-C average, an SCFIS level — while your exposure is one lane, one carrier, one contract rate, on one date. The benchmark can move against the market while your own cost does not move with it, and a hedge that pays on the index can still leave you worse off on the booking.",
            zh: "基差風險是本產品的核心風險。合約依公開基準結算——Drewry WCI 綜合指數的某一次公佈、XSI-C 的平均值、SCFIS 的某一水平——而你的風險曝露卻是某一條航線、某一家船公司、某一份合約運價、某一個日期。基準可以朝某個方向移動，而你自身的成本卻不隨之移動；即使指數上的對沖有派付，你在那筆訂艙上仍可能更差。"
          }
        },
        {
          title: { en: "Markets may be illiquid.", zh: "市場可能缺乏流動性。" },
          body: {
            en: "A listed contract is not a liquid contract. Quotes may be thin or absent, spreads may be wide, and you may be unable to close a position at a price anywhere near the last print, or at all, before expiry. The plan's own Month-9 gate treats a median bid–ask wider than 6 points across the ten flagship contracts as a reason to stop — because a venue nobody can get out of is worse than no venue.",
            zh: "掛牌的合約不等於有流動性的合約。報價可能稀薄甚至沒有，價差可能很闊，你亦可能無法在接近上一次成交價的水平平倉，甚至在到期前根本無法平倉。計劃本身第 9 個月的關卡，就把十張旗艦合約買賣價差中位數闊於 6 個點視為停止的理由——因為一個無法離場的市場，比沒有市場更糟。"
          }
        },
        {
          title: { en: "Settlement depends on a third party.", zh: "結算依賴第三方。" },
          body: {
            en: "Every contract resolves against one named publisher: a benchmark administrator, a canal authority, a government gazette. That publisher can change its methodology, reschedule or suspend a series, restrict redistribution, or stop publishing altogether. The specification carries a tie-break and a fallback, but a source failure remains a real risk to resolution and to timing.",
            zh: "每一張合約都依一個指名的公佈機構判定：基準指數管理機構、運河當局、政府憲報。該機構可以更改方法論、改期或暫停某一數列、限制再分發，甚至完全停止公佈。合約規格載有決勝規則與後備安排，但來源失效對判定結果與判定時間仍構成實質風險。"
          }
        },
        {
          title: { en: "The regulatory treatment is unsettled.", zh: "監管處理尚未定案。" },
          body: {
            en: "Event contracts are treated differently in every major jurisdiction and the treatment is moving. The CFTC's event-contract ANPR closed on 30 April 2026 with no final rule. ESMA restricted binary-payout event contracts for retail clients on 4 July 2026. Hong Kong has no settled position on event contracts specifically. A rule change can restrict, suspend or remove access to some or all contracts, with little notice, including for users who already hold positions.",
            zh: "各主要司法管轄區對事件合約的處理各不相同，而且仍在變動。美國商品期貨交易委員會的事件合約預先立法通告於 2026 年 4 月 30 日截止，至今未有最終規則。歐洲證券及市場管理局於 2026 年 7 月 4 日限制零售客戶買賣二元派付事件合約。香港對事件合約本身亦無定論。規則一旦改變，可能在短時間內限制、暫停或取消部分或全部合約的准入，已持有部位的用戶亦不例外。"
          }
        },
        {
          title: { en: "Non-custodial means self-custody.", zh: "非託管即是自行保管。" },
          body: {
            en: "The platform never holds user funds, which removes one risk and creates another: the keys are yours. A lost key, a compromised device, a mistaken address or a signed transaction you did not understand cannot be reversed by us or by anyone else. There is no deposit insurance, no chargeback and no account recovery.",
            zh: "平台不持有用戶資金，這消除了一種風險，同時製造另一種：私鑰在你手上。遺失私鑰、裝置被入侵、地址輸錯，或簽署了你並不理解的交易，我們與任何人都無法撤回。這裡沒有存款保障、沒有交易追討，亦沒有帳戶復原。"
          }
        },
        {
          title: { en: "Infrastructure and counterparty risk.", zh: "基礎設施與對手方風險。" },
          body: {
            en: "The venue is intended to run on DEXBuilder infrastructure provided by Gate Labs, under a commercial arrangement. Matching, clearing, risk control and on-chain settlement would be operated on that stack. Smart-contract defects, oracle failure, chain congestion, operational outage or the end of that commercial relationship are all risks to the service.",
            zh: "本交易場所擬運行於 Gate Labs 提供的 DEXBuilder 基礎設施之上，雙方以商業協議為基礎。撮合、清算、風險控制與鏈上結算均在該套系統上運作。智能合約缺陷、預言機失效、區塊鏈擠塞、營運中斷，或該商業關係終止，全部都是服務面對的風險。"
          }
        },
        {
          title: { en: "Hedging does not remove risk.", zh: "對沖不會消除風險。" },
          body: {
            en: "It exchanges one exposure for another, and it costs money whether or not the event occurs. These contracts are not suitable for everyone. Trade only what you can afford to lose in full, and only after you have read the contract specification and the named settlement source.",
            zh: "對沖只是把一種風險曝露換成另一種，而且無論事件是否發生都要付出成本。這些合約並不適合所有人。只投入你能夠全數損失得起的金額，而且必須先讀過合約規格與指名的結算來源。"
          }
        }
      ],
      note: {
        en: "This disclosure is a summary written for a pre-launch website. If Pregistic launches, a full contract specification and a complete risk disclosure will be published for each market before it opens, and eligibility will be confirmed at onboarding.",
        zh: "本披露是為上線前網站撰寫的摘要。若 Pregistic 上線，每一個市場在開盤前都會公佈完整的合約規格與完整的風險披露，資格亦會在開戶時確認。"
      }
    },

    /* ---- 05 · jurisdiction and eligibility -------------------------- */
    {
      kind: "bullets",
      eyebrow: { en: "Jurisdiction and eligibility", zh: "司法管轄區與資格" },
      heading: {
        en: "Who would be able to use the venue, and who would not.",
        zh: "誰可以使用這個交易場所，誰不可以。"
      },
      lede: {
        en: "Market access is sequenced by jurisdiction, not opened globally on day one. The restrictions below are the ones the venue is being designed to at launch; they may tighten, and they may change as rules settle.",
        zh: "市場准入按司法管轄區分階段開放，並非第一日就全球開放。以下限制是上線時的設計依據；它們可能收緊，亦可能隨規則定案而改變。"
      },
      items: [
        {
          title: { en: "United States — not at launch.", zh: "美國——上線時不開放。" },
          body: {
            en: "The venue would not be available to US persons at launch, and would not accept applications from them. The position is revisited on a CFTC final rule, not before.",
            zh: "上線時，本交易場所不向美國人士開放，亦不接受其申請。此立場須待美國商品期貨交易委員會的最終規則出台後才會檢討，在此之前不變。"
          }
        },
        {
          title: { en: "European Union — professional clients only, or not at all.", zh: "歐盟——只限專業客戶，或完全不開放。" },
          body: {
            en: "Following ESMA's 4 July 2026 statement, EU access would be limited to clients categorised as professional under MiFID II, in jurisdictions where the necessary authorisation is in place. Where it is not, the answer is no access.",
            zh: "按歐洲證券及市場管理局 2026 年 7 月 4 日的聲明，歐盟的准入將只限於 MiFID II 下被分類為專業客戶者，且僅限於已取得所需授權的司法管轄區。未取得授權的地方，答案就是不開放。"
          }
        },
        {
          title: { en: "Identity verification is mandatory.", zh: "身份驗證屬強制性。" },
          body: {
            en: "Access is subject to KYC and AML checks at onboarding, with ongoing monitoring. There is no anonymous access, no unverified account and no trading before verification completes.",
            zh: "准入須通過開戶時的 KYC 與 AML 審查，並設持續監察。不設匿名准入、不設未經核實的帳戶，驗證完成前不得交易。"
          }
        },
        {
          title: { en: "Access is geo-fenced.", zh: "准入設有地域封鎖。" },
          body: {
            en: "Availability is controlled by jurisdiction at the infrastructure layer. Using a VPN, a proxy, a false declaration or another person's identity to reach a restricted market would be a breach of terms and grounds for closing the account.",
            zh: "可用性由基礎設施層按司法管轄區控制。使用虛擬私人網絡、代理伺服器、虛假聲明或他人身份去接達受限市場，均屬違反條款，並構成關閉帳戶的理由。"
          }
        },
        {
          title: { en: "Sanctions exclusions.", zh: "制裁排除。" },
          body: {
            en: "Persons, entities and jurisdictions subject to applicable sanctions are excluded, and screening against applicable lists is part of onboarding and of ongoing monitoring.",
            zh: "受適用制裁的個人、實體與司法管轄區一律排除在外；對照適用名單的篩查，屬開戶程序與持續監察的一部分。"
          }
        },
        {
          title: { en: "Eligibility is yours to confirm.", zh: "資格須由你自行確認。" },
          body: {
            en: "You are responsible for knowing whether trading these contracts is lawful for you where you live and where you are tax-resident. Passing an onboarding check is not advice that your participation is lawful.",
            zh: "你須自行了解，在你居住地與稅務居民所在地，買賣這些合約對你而言是否合法。通過開戶審查並不等於我們就你的參與是否合法提供了意見。"
          }
        },
        {
          title: { en: "Nothing is being marketed today.", zh: "現階段並無進行任何推廣。" },
          body: {
            en: "Pregistic is pre-launch. Asking for early access, joining the design-partner list or requesting investor materials creates no account, no entitlement and no offer of service, in any jurisdiction.",
            zh: "Pregistic 尚未上線。索取早期使用權、加入設計夥伴名單或索取投資人資料，均不產生任何帳戶、任何權利，亦不構成在任何司法管轄區提供服務的要約。"
          }
        }
      ]
    },

    /* ---- 06 · privacy ------------------------------------------------ */
    {
      kind: "bullets",
      eyebrow: { en: "Privacy", zh: "私隱" },
      heading: {
        en: "What this website knows about you.",
        zh: "這個網站對你知道些什麼。"
      },
      lede: {
        en: "Almost nothing, by construction. This is a static website: there is no account, no login and no analytics script. Chainova Technology Limited is the data user for the purposes of Hong Kong's Personal Data (Privacy) Ordinance.",
        zh: "按其構造，幾乎一無所知。這是一個靜態網站：沒有帳戶、沒有登入，也沒有分析追蹤程式。就香港《個人資料（私隱）條例》而言，Chainova Technology Limited 為資料使用者。"
      },
      items: [
        {
          title: { en: "A visit collects nothing we can read.", zh: "一次瀏覽不會收集我們能讀取的資料。" },
          body: {
            en: "Your theme choice, your language, your watchlist and your paper positions are written to your own browser's local storage under a <strong>pg.</strong> prefix. They stay on your device, they are never transmitted to us, and we cannot see them. Clearing site data in your browser deletes them permanently.",
            zh: "你的主題選擇、語言、關注清單與紙上持倉，都以 <strong>pg.</strong> 為前綴寫入你自己瀏覽器的本機儲存空間。它們留在你的裝置上，不會傳送給我們，我們亦無法查看。在瀏覽器中清除網站資料即可永久刪除。"
          }
        },
        {
          title: { en: "No analytics, no advertising, no profiling.", zh: "沒有分析、沒有廣告、沒有用戶畫像。" },
          body: {
            en: "The site sets no advertising cookies, runs no analytics or tracking script, and builds no profile of you. It does load web fonts from Google Fonts, which means your browser makes a request to that service and the service sees your IP address and user agent, as it would on any site that uses it.",
            zh: "本網站不設廣告 Cookie、不運行任何分析或追蹤程式、亦不為你建立任何用戶畫像。網站確會從 Google Fonts 載入網頁字體，因此你的瀏覽器會向該服務發出請求，而該服務會看到你的 IP 位址與瀏覽器識別字串——任何使用該服務的網站都是如此。"
          }
        },
        {
          title: { en: "An access request collects what you choose to send.", zh: "提出查詢時，只收集你選擇寄出的內容。" },
          body: {
            en: "The contact form does not submit to a server. It composes a message in your own mail client, which you then choose to send or not. If you send it, we receive what you typed: name, email address, company, role, jurisdiction, area of interest and your message.",
            zh: "聯絡表格不會提交到任何伺服器。它只在你自己的郵件程式中草擬一封郵件，寄不寄出由你決定。若你寄出，我們會收到你所輸入的內容：姓名、電郵地址、公司、職位、司法管轄區、關注範疇與你的留言。"
          }
        },
        {
          title: { en: "Why we hold it.", zh: "我們為何保存這些資料。" },
          body: {
            en: "To reply to you, to assess whether you would be eligible for early access in your jurisdiction, and to manage the seed round. We do not use it for anything else, and we do not add you to a marketing list you did not ask for.",
            zh: "用於回覆你、評估你在所屬司法管轄區內是否符合早期使用的資格，以及管理種子輪。除此以外不作他用，亦不會把你加入你未曾要求的推廣名單。"
          }
        },
        {
          title: { en: "Who sees it.", zh: "誰會看到這些資料。" },
          body: {
            en: "Chainova staff working on Pregistic, and our professional advisers under a duty of confidence where a specific matter requires it. Your details are not sold, not rented, not passed to advertisers and not shared with the infrastructure partner, unless the law requires disclosure.",
            zh: "負責 Pregistic 的 Chainova 員工，以及在特定事項有需要時、負有保密責任的專業顧問。你的資料不會被出售、出租、交予廣告商，亦不會提供予基礎設施合作夥伴，除非法律要求披露。"
          }
        },
        {
          title: { en: "How long we keep it.", zh: "保存多久。" },
          body: {
            en: "For as long as the conversation is live, and in any case no longer than 24 months after your last contact with us, unless you have become a counterparty or a record must be kept to meet a legal obligation. After that the record is deleted.",
            zh: "保存至對話結束為止，而無論如何不會超過你最後一次與我們聯絡後的 24 個月；除非你已成為交易對手，或因法定責任而須保留紀錄。期限屆滿後，紀錄即予刪除。"
          }
        },
        {
          title: { en: "How to see it or delete it.", zh: "如何查閱或刪除。" },
          body: {
            en: "Email <strong>hello@pregistic.com</strong> and ask for a copy of what we hold, a correction, or deletion. We will action a deletion request and confirm it in writing. To remove what this site stored on your own device, clear site data for pregistic.com in your browser — that is entirely in your hands and needs no request to us.",
            zh: "電郵至 <strong>hello@pregistic.com</strong>，要求索取我們所持資料的副本、更正，或刪除。我們會處理刪除要求，並以書面確認。至於本網站儲存在你自己裝置上的資料，在瀏覽器中清除 pregistic.com 的網站資料即可——這完全由你控制，無須向我們提出要求。"
          }
        },
        {
          title: { en: "Contact.", zh: "聯絡。" },
          body: {
            en: "Chainova Technology Limited, Hong Kong · chainovahk.com · hello@pregistic.com. Privacy questions and data requests go to the same address and are answered by a person.",
            zh: "Chainova Technology Limited，香港 · chainovahk.com · hello@pregistic.com。私隱查詢與資料要求同樣寄往上述地址，並由真人回覆。"
          }
        }
      ],
      note: {
        en: "This notice covers the website only. If Pregistic launches, account onboarding will involve identity documents and sanctions screening under a separate, fuller privacy notice published before any account is opened.",
        zh: "本聲明只涵蓋本網站。若 Pregistic 上線，開戶程序將涉及身份證明文件與制裁篩查，屆時會在任何帳戶開立之前，另行公佈一份更完整的私隱聲明。"
      }
    }

  ]
};
