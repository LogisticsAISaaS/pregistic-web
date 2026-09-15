window.PG = window.PG || {};

/* --------------------------------------------------------------------------
   PREGISTIC — contract dataset · family 'policy'
   Trade policy: tariff actions, rates and effective dates; export controls;
   sanctions listings; review outcomes.

   Resolution for this family comes from public authority records — the US
   Federal Register, USTR, CBP disbursement data, MOFCOM notices, the Official
   Journal of the EU, the IMO MEPC record, the WTO and the Yale Budget Lab.
   Public, dated, unarguable. One named source per contract, fixed before
   listing. Thresholds are indicative and re-struck at listing.

   Prices, volumes and open interest in this file are simulated demonstration
   data for a pre-launch venue. Nothing here is a live quote.
   -------------------------------------------------------------------------- */

window.PG.contractsByFamily = window.PG.contractsByFamily || {};

window.PG.contractsByFamily.policy = [

  {
    id: 'REE-NOV10',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'China extends rare-earth export-control suspension',
      zh: '中國延長稀土出口管制暫緩措施'
    },
    question: {
      en: 'Does MOFCOM publish a notice on or before 10 November 2026 extending the suspension of its rare-earth export-control measures?',
      zh: '中國商務部是否在 2026 年 11 月 10 日或之前公佈通告，延長稀土出口管制措施的暫緩實施？'
    },
    resolves: {
      en: 'MOFCOM announcement or notice published on mofcom.gov.cn',
      zh: '中國商務部於 mofcom.gov.cn 公佈的公告或通知'
    },
    sourceTag: 'MOFCOM',
    cadence: { en: 'Notices, as published', zh: '公告，按公佈時間' },
    expiry: '2026-11-10',
    listed: '2026-06-18',
    price: 0.62,
    open: 0.54,
    vol24: 412000,
    oi: 2860000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['rare-earth', 'export-control', 'china', 'mofcom'],
    seed: 7103
  },

  {
    id: 'PORTFEE-APR27',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'Section 301 vessel port fee steps to $110/net ton',
      zh: '301 條款船舶港口費按期升至每淨噸 110 美元'
    },
    question: {
      en: 'Does the Section 301 fee on Chinese-built and Chinese-operated vessels rise to US$110 per net ton on 17 April 2027 without deferral, suspension or reduction?',
      zh: '針對中國建造及中國營運船舶的 301 條款費用，是否於 2027 年 4 月 17 日按原定升至每淨噸 110 美元，且未獲延期、暫緩或調低？'
    },
    resolves: {
      en: 'USTR notice in the Federal Register and the fee schedule in force on the date',
      zh: '美國貿易代表署（USTR）於《聯邦公報》刊登的通知，以及當日生效的收費表'
    },
    sourceTag: 'USTR',
    cadence: { en: 'Federal Register notices, as published', zh: '《聯邦公報》通知，按刊登時間' },
    expiry: '2027-04-17',
    listed: '2026-05-28',
    price: 0.46,
    open: 0.55,
    vol24: 268000,
    oi: 3140000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['section-301', 'port-fee', 'vessels', 'ustr'],
    seed: 7217
  },

  {
    id: 'TARIFF-118-DEC26',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'US average statutory tariff above 11.8% on Dec 2026 print',
      zh: '美國平均法定關稅稅率於 2026 年 12 月報告高於 11.8%'
    },
    question: {
      en: 'Is the US average statutory tariff rate reported above 11.8% in the Yale Budget Lab State of US Tariffs publication dated December 2026?',
      zh: '耶魯預算實驗室（Yale Budget Lab）2026 年 12 月《美國關稅現況》報告所載的美國平均法定關稅稅率，是否高於 11.8%？'
    },
    resolves: {
      en: 'Yale Budget Lab, State of US Tariffs, December 2026 edition',
      zh: '耶魯預算實驗室《美國關稅現況》2026 年 12 月版'
    },
    sourceTag: 'YALE BL',
    cadence: { en: 'Periodic updates, roughly monthly', zh: '不定期更新，約每月一次' },
    expiry: '2026-12-31',
    listed: '2026-06-05',
    price: 0.43,
    open: 0.37,
    vol24: 331000,
    oi: 2210000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['tariff-rate', 'yale-budget-lab', 'macro'],
    seed: 7331
  },

  {
    id: 'REFUND-130B',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'IEEPA tariff refunds paid exceed $130bn',
      zh: 'IEEPA 關稅退稅累計支付額超過 1,300 億美元'
    },
    question: {
      en: 'Do cumulative refunds of tariffs collected under IEEPA, as disbursed by CBP, exceed US$130bn before 31 March 2027?',
      zh: '根據《國際緊急經濟權力法》（IEEPA）徵收、並由美國海關暨邊境保護局（CBP）退還的關稅累計金額，是否於 2027 年 3 月 31 日之前超過 1,300 億美元？'
    },
    resolves: {
      en: 'CBP disbursement data, monthly refund reporting',
      zh: '美國海關暨邊境保護局（CBP）每月公佈的退稅撥付數據'
    },
    sourceTag: 'CBP',
    cadence: { en: 'Monthly disbursement reporting', zh: '每月撥付報表' },
    expiry: '2027-03-31',
    listed: '2026-07-09',
    price: 0.31,
    open: 0.40,
    vol24: 296000,
    oi: 1980000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['ieepa', 'refunds', 'cbp', 'scotus'],
    seed: 7448
  },

  {
    id: 'IMO-NZF-2026',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'IMO adopts the Net-Zero Framework at the reconvened session',
      zh: 'IMO 於復會的特別會議通過淨零框架'
    },
    question: {
      en: 'Does the IMO adopt the Net-Zero Framework amendments to MARPOL Annex VI at the reconvened extraordinary session of the Marine Environment Protection Committee?',
      zh: '國際海事組織（IMO）是否於海上環境保護委員會復會的特別會議上，通過《防止船舶污染國際公約》附則六的淨零框架修正案？'
    },
    resolves: {
      en: 'IMO MEPC session report and the adopted resolution text',
      zh: 'IMO 海上環境保護委員會（MEPC）會議報告及所通過的決議文本'
    },
    sourceTag: 'IMO MEPC',
    cadence: { en: 'Session records, after each meeting', zh: '會議紀錄，每次會議後公佈' },
    expiry: '2026-10-09',
    listed: '2026-04-22',
    price: 0.39,
    open: 0.48,
    vol24: 508000,
    oi: 1620000,
    spread: 0.04,
    status: 'closing',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['imo', 'net-zero', 'marpol', 'carbon'],
    seed: 7562
  },

  {
    id: 'USMCA-2027',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'July 2027 USMCA joint review ends in a one-year rollover',
      zh: '2027 年 7 月 USMCA 聯合檢討以再延一年作結'
    },
    question: {
      en: 'Does the July 2027 USMCA joint review conclude with the three parties confirming a further one-year extension, rather than a sixteen-year term extension or a withdrawal notice?',
      zh: '2027 年 7 月的《美墨加協定》（USMCA）聯合檢討，是否以三方確認再延長一年作結，而非延長十六年期限或發出退出通知？'
    },
    resolves: {
      en: 'USTR statement on the joint review outcome',
      zh: '美國貿易代表署（USTR）就聯合檢討結果發表的聲明'
    },
    sourceTag: 'USTR',
    cadence: { en: 'Statements, at review milestones', zh: '聲明，於檢討節點公佈' },
    expiry: '2027-07-31',
    listed: '2026-10-06',
    price: 0.58,
    open: 0.55,
    vol24: 0,
    oi: 0,
    spread: 0.05,
    status: 'upcoming',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['usmca', 'review', 'north-america', 'ustr'],
    seed: 7679
  },

  {
    id: 'S301-EXCL-DEC26',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'Section 301 exclusions extended past 31 Dec 2026',
      zh: '301 條款關稅排除措施延續至 2026 年 12 月 31 日之後'
    },
    question: {
      en: 'Does USTR publish a Federal Register notice extending the current Section 301 exclusions beyond 31 December 2026 for a period of at least three months?',
      zh: '美國貿易代表署（USTR）是否於《聯邦公報》刊登通知，將現行 301 條款關稅排除措施在 2026 年 12 月 31 日之後至少再延長三個月？'
    },
    resolves: {
      en: 'USTR notice as published in the Federal Register',
      zh: '美國貿易代表署於《聯邦公報》刊登的通知'
    },
    sourceTag: 'FED REGISTER',
    cadence: { en: 'Federal Register, daily', zh: '《聯邦公報》，每日刊登' },
    expiry: '2026-12-31',
    listed: '2026-06-30',
    price: 0.74,
    open: 0.69,
    vol24: 187000,
    oi: 1340000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['section-301', 'exclusions', 'ustr', 'federal-register'],
    seed: 7784
  },

  {
    id: 'S232-SEMI-SEP26',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'Section 232 semiconductor duties proclaimed by 30 Sep 2026',
      zh: '半導體 232 條款關稅於 2026 年 9 月 30 日前公佈'
    },
    question: {
      en: 'Is a presidential proclamation imposing Section 232 duties on semiconductors and semiconductor manufacturing equipment published in the Federal Register on or before 30 September 2026?',
      zh: '對半導體及半導體製造設備課徵《貿易擴張法》第 232 條關稅的總統公告，是否於 2026 年 9 月 30 日或之前刊登於《聯邦公報》？'
    },
    resolves: {
      en: 'Presidential proclamation as published in the Federal Register',
      zh: '刊登於《聯邦公報》的總統公告'
    },
    sourceTag: 'FED REGISTER',
    cadence: { en: 'Federal Register, daily', zh: '《聯邦公報》，每日刊登' },
    expiry: '2026-09-30',
    listed: '2026-05-14',
    price: 0.66,
    open: 0.52,
    vol24: 623000,
    oi: 1180000,
    spread: 0.03,
    status: 'closing',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['section-232', 'semiconductors', 'proclamation', 'federal-register'],
    seed: 7891
  },

  {
    id: 'IEEPA-RULE-JAN27',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'CBP finalises the IEEPA refund procedure',
      zh: 'CBP 就 IEEPA 退稅程序公佈最終規則'
    },
    question: {
      en: 'Do CBP and Treasury publish a final rule or final notice in the Federal Register setting the procedure and timetable for IEEPA tariff refunds before 31 January 2027?',
      zh: '美國海關暨邊境保護局（CBP）與財政部是否於 2027 年 1 月 31 日之前，在《聯邦公報》刊登最終規則或最終通知，訂明 IEEPA 關稅退稅的程序與時間表？'
    },
    resolves: {
      en: 'Final rule or final notice in the Federal Register',
      zh: '《聯邦公報》刊登的最終規則或最終通知'
    },
    sourceTag: 'FED REGISTER',
    cadence: { en: 'Federal Register, daily', zh: '《聯邦公報》，每日刊登' },
    expiry: '2027-01-31',
    listed: '2026-06-26',
    price: 0.63,
    open: 0.55,
    vol24: 214000,
    oi: 1520000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['ieepa', 'refunds', 'cbp', 'rulemaking'],
    seed: 7906
  },

  {
    id: 'CBAM-MASS-28',
    family: 'policy',
    type: 'scalar',
    title: {
      en: 'CBAM de minimis mass threshold in force on 1 Jan 2028',
      zh: '2028 年 1 月 1 日生效的 CBAM 最低質量門檻'
    },
    question: {
      en: 'What annual de minimis mass threshold, in tonnes per importer, is in force for the EU Carbon Border Adjustment Mechanism on 1 January 2028?',
      zh: '歐盟碳邊境調整機制（CBAM）於 2028 年 1 月 1 日生效的年度最低質量門檻為多少（以每名進口商噸數計）？'
    },
    resolves: {
      en: 'The CBAM regulation as amended and published in the Official Journal of the EU',
      zh: '刊登於《歐盟官方公報》的 CBAM 法規（經修訂版本）'
    },
    sourceTag: 'EU OJ',
    cadence: { en: 'Official Journal, daily', zh: '《歐盟官方公報》，每日刊登' },
    expiry: '2027-12-31',
    listed: '2026-07-16',
    price: 0.34,
    open: 0.30,
    vol24: 96000,
    oi: 740000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: { en: 'tonnes/importer/yr', zh: '噸／進口商／年' },
    range: [0, 200],
    strike: 50,
    tags: ['cbam', 'eu', 'carbon', 'threshold'],
    seed: 7013
  },

  {
    id: 'ETS-MRV-5000GT',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'EU ETS maritime scope extended below 5,000 GT',
      zh: '歐盟碳排放交易體系海運範圍擴大至 5,000 總噸以下船舶'
    },
    question: {
      en: 'With the 100% surrender obligation in force since 1 January 2026, is a legislative act extending the EU Emissions Trading System to ships of 400 to 5,000 gross tonnage published in the Official Journal before 31 December 2027?',
      zh: '在 100% 繳付義務自 2026 年 1 月 1 日起全面生效的情況下，將歐盟碳排放交易體系（ETS）適用範圍擴大至 400 至 5,000 總噸船舶的立法文件，是否於 2027 年 12 月 31 日之前刊登於《歐盟官方公報》？'
    },
    resolves: {
      en: 'Directive or regulation published in the Official Journal of the EU',
      zh: '刊登於《歐盟官方公報》的指令或法規'
    },
    sourceTag: 'EU OJ',
    cadence: { en: 'Official Journal, daily', zh: '《歐盟官方公報》，每日刊登' },
    expiry: '2027-12-31',
    listed: '2026-06-11',
    price: 0.37,
    open: 0.35,
    vol24: 74000,
    oi: 610000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['eu-ets', 'maritime', 'carbon', 'official-journal'],
    seed: 7128
  },

  {
    id: 'BIS-ENTITY-2026',
    family: 'policy',
    type: 'scalar',
    title: {
      en: 'Entity List additions in Federal Register notices, 2026',
      zh: '2026 年《聯邦公報》通知新增實體清單主體數目'
    },
    question: {
      en: 'How many parties are added to the Commerce Department Entity List by Bureau of Industry and Security final rules bearing a 2026 publication date?',
      zh: '以 2026 年為刊登日期的美國工業與安全局（BIS）最終規則，合共將多少主體列入美國商務部實體清單？'
    },
    resolves: {
      en: 'Bureau of Industry and Security final rules in the Federal Register',
      zh: '美國工業與安全局（BIS）刊登於《聯邦公報》的最終規則'
    },
    sourceTag: 'BIS',
    cadence: { en: 'Final rules, as published', zh: '最終規則，按刊登時間' },
    expiry: '2027-01-15',
    listed: '2026-05-07',
    price: 0.57,
    open: 0.51,
    vol24: 128000,
    oi: 880000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: { en: 'parties added', zh: '新增主體數' },
    range: [0, 600],
    strike: 250,
    tags: ['export-control', 'entity-list', 'bis', 'federal-register'],
    seed: 7235
  },

  {
    id: 'USCN-TRUCE-NOV26',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'US-China tariff truce rolled over for a further year',
      zh: '美中關稅休戰再延長一年'
    },
    question: {
      en: 'Does a Federal Register notice published on or before 10 November 2026 continue the suspension of the additional Section 301 tariff rate on goods of China for at least a further twelve months?',
      zh: '是否有《聯邦公報》通知於 2026 年 11 月 10 日或之前刊登，將對中國貨品加徵 301 條款關稅稅率的暫緩措施至少再延長十二個月？'
    },
    resolves: {
      en: 'USTR notice as published in the Federal Register',
      zh: '美國貿易代表署（USTR）於《聯邦公報》刊登的通知'
    },
    sourceTag: 'USTR',
    cadence: { en: 'Federal Register notices, as published', zh: '《聯邦公報》通知，按刊登時間' },
    expiry: '2026-11-10',
    listed: '2026-06-18',
    price: 0.69,
    open: 0.61,
    vol24: 447000,
    oi: 3320000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['us-china', 'section-301', 'truce', 'ustr'],
    seed: 7342
  },

  {
    id: 'DEMIN-US-AUG26',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'US de minimis exemption restored before 31 Aug 2026',
      zh: '美國小額免稅待遇於 2026 年 8 月 31 日前恢復'
    },
    question: {
      en: 'Was the US de minimis duty exemption for commercial shipments restored in any form by an executive order, statute or CBP rule published before 31 August 2026?',
      zh: '美國對商業付運的小額免稅（de minimis）待遇，是否透過 2026 年 8 月 31 日之前公佈的行政命令、法例或 CBP 規則以任何形式恢復？'
    },
    resolves: {
      en: 'Federal Register and CBP published rulings',
      zh: '《聯邦公報》及美國海關暨邊境保護局公佈的裁定'
    },
    sourceTag: 'CBP',
    cadence: { en: 'Federal Register, daily', zh: '《聯邦公報》，每日刊登' },
    expiry: '2026-08-31',
    listed: '2026-03-16',
    price: 0.03,
    open: 0.08,
    vol24: 0,
    oi: 0,
    spread: 0.02,
    status: 'resolved',
    resolved: 'NO',
    unit: null,
    range: null,
    strike: null,
    tags: ['de-minimis', 'cbp', 'federal-register', 'settled'],
    seed: 7459
  },

  {
    id: 'USMCA-RVC-2027',
    family: 'policy',
    type: 'binary',
    title: {
      en: 'USMCA auto regional value content raised above 75%',
      zh: 'USMCA 汽車區域價值含量門檻上調至 75% 以上'
    },
    question: {
      en: 'Is an instrument raising the USMCA regional value content requirement for passenger vehicles above 75% published in the Federal Register before 31 December 2027?',
      zh: '將《美墨加協定》（USMCA）客車區域價值含量要求上調至 75% 以上的文件，是否於 2027 年 12 月 31 日之前刊登於《聯邦公報》？'
    },
    resolves: {
      en: 'Federal Register notice and the USMCA uniform regulations as amended',
      zh: '《聯邦公報》通知及經修訂的 USMCA 統一規例'
    },
    sourceTag: 'FED REGISTER',
    cadence: { en: 'Federal Register, daily', zh: '《聯邦公報》，每日刊登' },
    expiry: '2027-12-31',
    listed: '2026-10-12',
    price: 0.31,
    open: 0.28,
    vol24: 0,
    oi: 0,
    spread: 0.05,
    status: 'upcoming',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['usmca', 'rules-of-origin', 'autos', 'federal-register'],
    seed: 7566
  },

  {
    id: 'INDIA-TRF-MAR27',
    family: 'policy',
    type: 'scalar',
    title: {
      en: 'US additional tariff rate on Indian goods, 31 Mar 2027',
      zh: '2027 年 3 月 31 日美國對印度貨品的額外關稅稅率'
    },
    question: {
      en: 'What additional ad valorem tariff rate applies to goods of India under the Harmonized Tariff Schedule of the United States in force on 31 March 2027?',
      zh: '於 2027 年 3 月 31 日生效的《美國協調關稅表》下，適用於印度貨品的額外從價關稅稅率為多少？'
    },
    resolves: {
      en: 'Harmonized Tariff Schedule and Federal Register notices in force on the date',
      zh: '當日生效的《美國協調關稅表》及《聯邦公報》通知'
    },
    sourceTag: 'FED REGISTER',
    cadence: { en: 'Federal Register, daily', zh: '《聯邦公報》，每日刊登' },
    expiry: '2027-03-31',
    listed: '2026-06-02',
    price: 0.42,
    open: 0.52,
    vol24: 163000,
    oi: 1070000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: { en: '% ad valorem', zh: '從價百分比' },
    range: [0, 60],
    strike: 25,
    tags: ['india', 'tariff-rate', 'federal-register', 'asia'],
    seed: 7671
  },

  {
    id: 'TARIFF-EFF-JUN27',
    family: 'policy',
    type: 'scalar',
    title: {
      en: 'US average effective tariff rate, June 2027 print',
      zh: '2027 年 6 月報告的美國平均有效關稅稅率'
    },
    question: {
      en: 'What average effective US tariff rate does the Yale Budget Lab report in its June 2027 State of US Tariffs publication, against a statutory rate of 11.0% in the 11 August 2026 print?',
      zh: '以 2026 年 8 月 11 日報告的 11.0% 法定稅率為基準，耶魯預算實驗室於 2027 年 6 月《美國關稅現況》報告中所載的美國平均有效關稅稅率為多少？'
    },
    resolves: {
      en: 'Yale Budget Lab, State of US Tariffs, June 2027 edition',
      zh: '耶魯預算實驗室《美國關稅現況》2027 年 6 月版'
    },
    sourceTag: 'YALE BL',
    cadence: { en: 'Periodic updates, roughly monthly', zh: '不定期更新，約每月一次' },
    expiry: '2027-06-30',
    listed: '2026-07-02',
    price: 0.55,
    open: 0.50,
    vol24: 209000,
    oi: 1460000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: { en: '% effective', zh: '有效稅率百分比' },
    range: [4, 20],
    strike: 11.0,
    tags: ['tariff-rate', 'yale-budget-lab', 'macro', 'effective'],
    seed: 7788
  },

  {
    id: 'IMO-CARBON-100',
    family: 'policy',
    type: 'scalar',
    title: {
      en: 'IMO Net-Zero Framework Tier 1 remedial unit price, 2028',
      zh: 'IMO 淨零框架 2028 年第一級補救單位價格'
    },
    question: {
      en: 'What price per tonne of CO2 equivalent applies to Tier 1 remedial units for compliance year 2028 under the IMO Net-Zero Framework, as recorded by the MEPC?',
      zh: '按海上環境保護委員會（MEPC）紀錄，IMO 淨零框架下 2028 合規年度第一級補救單位的價格為每噸二氧化碳當量多少美元？'
    },
    resolves: {
      en: 'IMO MEPC session record and the adopted guidelines',
      zh: 'IMO 海上環境保護委員會會議紀錄及所通過的指引'
    },
    sourceTag: 'IMO MEPC',
    cadence: { en: 'Session records, after each meeting', zh: '會議紀錄，每次會議後公佈' },
    expiry: '2027-06-30',
    listed: '2026-07-24',
    price: 0.46,
    open: 0.44,
    vol24: 88000,
    oi: 520000,
    spread: 0.05,
    status: 'live',
    resolved: null,
    unit: { en: 'US$/t CO2e', zh: '美元／噸二氧化碳當量' },
    range: [0, 250],
    strike: 100,
    tags: ['imo', 'carbon-price', 'net-zero', 'mepc'],
    seed: 7893
  }

];
