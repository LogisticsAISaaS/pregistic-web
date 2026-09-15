/* ==========================================================================
   PREGISTIC — contract dataset · family 04: AIR & LAST MILE
   --------------------------------------------------------------------------
   Air cargo spot indices, peak-season surcharges and GRI announcements,
   carrier on-time metrics, and last-mile / e-commerce customs events.

   Deck section 04: Baltic and TAC launched air freight spot indices on
   1 Jul 2025 expressly to enable derivatives. Fifteen months later there is
   still no contract. Deck section 08 calls this "a category with published
   benchmarks and no derivative anywhere on earth"; Gate 4 (M19-M24) lists
   the air cargo family as the first air freight derivative anywhere. Several
   of these are therefore still marked upcoming.

   10 contracts · 7 binary, 3 scalar · 5 live, 1 closing, 3 upcoming,
   1 resolved. Resolution sources: TAC Index / Baltic Exchange, IATA,
   published carrier tariff filings, US Federal Register / CBP, Cirium.

   Prices, volumes and open interest on this site are SIMULATED
   DEMONSTRATION DATA. Pregistic is pre-launch. Thresholds are indicative
   and re-struck at listing.
   ========================================================================== */

window.PG = window.PG || {};
window.PG.contractsByFamily = window.PG.contractsByFamily || {};

window.PG.contractsByFamily.air = [

  {
    id: 'TAC-HKG-W47',
    family: 'air',
    type: 'binary',
    title: {
      en: 'BAI Hong Kong–North America above 2025 peak in week 47',
      zh: 'BAI 香港—北美於第 47 週高於 2025 年高位'
    },
    question: {
      en: 'Does the Baltic Air Freight Index Hong Kong–North America route settle above its highest 2025 weekly level on the week 47, 2026 print?',
      zh: '波羅的海航空貨運指數（BAI）香港—北美航線，於 2026 年第 47 週的公布值，是否高於其 2025 年最高單週水平？'
    },
    resolves: {
      en: 'Baltic Air Freight Index, Hong Kong–North America route, TAC Index weekly assessment',
      zh: '波羅的海航空貨運指數（BAI）香港—北美航線，TAC Index 每週評估值'
    },
    sourceTag: 'BAI/TAC',
    cadence: { en: 'Weekly, Monday print', zh: '每週一公布' },
    expiry: '2026-11-23',
    listed: '2026-07-06',
    price: 0.42,
    open: 0.55,
    vol24: 118000,
    oi: 640000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['air', 'hongkong', 'transpacific', 'bai', 'peak'],
    seed: 7311
  },

  {
    id: 'PEAK-GRI-OCT26',
    family: 'air',
    type: 'binary',
    title: {
      en: 'Three top-10 carriers file an October transpacific GRI',
      zh: '三家前十大航空公司公布 10 月跨太平洋 GRI'
    },
    question: {
      en: 'Do three or more of the top ten air cargo carriers by tonne-kilometre announce a transpacific peak-season general rate increase effective in October 2026?',
      zh: '按貨運噸公里計的前十大航空貨運承運人中，是否有三家或以上公布自 2026 年 10 月起生效的跨太平洋旺季綜合運價調漲（GRI）？'
    },
    resolves: {
      en: 'Published carrier tariff filings, as distributed through IATA TACT and carrier tariff pages',
      zh: '已公布的承運人運價備案，透過 IATA TACT 及各承運人運價頁面發布'
    },
    sourceTag: 'TACT',
    cadence: { en: 'Filings, as published', zh: '運價備案，公布時即計' },
    expiry: '2026-10-01',
    listed: '2026-08-03',
    price: 0.73,
    open: 0.61,
    vol24: 164000,
    oi: 585000,
    spread: 0.02,
    status: 'closing',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['air', 'gri', 'surcharge', 'transpacific', 'peak'],
    seed: 7343
  },

  {
    id: 'DEMINIMIS-27',
    family: 'air',
    type: 'binary',
    title: {
      en: 'US de minimis exemption restored in any form before 2028',
      zh: '美國小額免稅於 2028 年前以任何形式恢復'
    },
    question: {
      en: 'Is the US de minimis duty exemption restored in any form, at any threshold and for any set of origins, before 31 December 2027?',
      zh: '美國小額免稅（de minimis）進口關稅豁免，是否在 2027 年 12 月 31 日前以任何形式、任何門檻、針對任何來源地恢復？'
    },
    resolves: {
      en: 'US Federal Register notice or CBP guidance giving effect to the exemption',
      zh: '美國聯邦公報公告，或美國海關及邊境保衛局（CBP）就該豁免生效發出的指引'
    },
    sourceTag: 'CBP/FR',
    cadence: { en: 'Notices, as published', zh: '公告，刊憲時即計' },
    expiry: '2027-12-31',
    listed: '2026-06-22',
    price: 0.21,
    open: 0.17,
    vol24: 96000,
    oi: 872000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['lastmile', 'ecommerce', 'customs', 'deminimis', 'tariff'],
    seed: 7368
  },

  {
    id: 'TAC-PVG-EUR-W44',
    family: 'air',
    type: 'scalar',
    title: {
      en: 'TAC Shanghai–Europe weekly spot, week 44 2026 print',
      zh: 'TAC 上海—歐洲即期運價，2026 年第 44 週公布值'
    },
    question: {
      en: 'At what level, in US dollars per kilogram, does the TAC Index Shanghai–Europe all-in air cargo spot rate print for week 44 of 2026?',
      zh: 'TAC Index 上海—歐洲航空貨運全包即期運價，於 2026 年第 44 週的公布值為多少（美元／公斤）？'
    },
    resolves: {
      en: 'TAC Index / Baltic Exchange, Shanghai–Europe route, weekly all-in spot assessment',
      zh: 'TAC Index／波羅的海交易所，上海—歐洲航線，每週全包即期運價評估值'
    },
    sourceTag: 'TAC',
    cadence: { en: 'Weekly, Monday print', zh: '每週一公布' },
    expiry: '2026-11-02',
    listed: '2026-07-20',
    price: 0.48,
    open: 0.39,
    vol24: 74000,
    oi: 410000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: { en: 'US$/kg', zh: '美元／公斤' },
    range: [2.20, 6.40],
    strike: 4.20,
    tags: ['air', 'shanghai', 'europe', 'spot', 'tac'],
    seed: 7395
  },

  {
    id: 'BAI-FRA-NAM-Q127',
    family: 'air',
    type: 'scalar',
    title: {
      en: 'TAC Frankfurt–North America Q1 2027 quarterly average',
      zh: 'TAC 法蘭克福—北美 2027 年第一季均價'
    },
    question: {
      en: 'What is the arithmetic average of the TAC Index Frankfurt–North America weekly spot prints across the thirteen weeks of Q1 2027, in US dollars per kilogram?',
      zh: 'TAC Index 法蘭克福—北美航線每週即期運價，於 2027 年第一季十三個公布值的算術平均為多少（美元／公斤）？'
    },
    resolves: {
      en: 'TAC Index / Baltic Exchange, Frankfurt–North America route, weekly prints averaged over Q1 2027',
      zh: 'TAC Index／波羅的海交易所，法蘭克福—北美航線，2027 年第一季各週公布值之平均'
    },
    sourceTag: 'BAI/TAC',
    cadence: { en: 'Weekly, averaged at quarter end', zh: '每週公布，季末取平均' },
    expiry: '2027-04-05',
    listed: '2026-10-05',
    price: 0.44,
    open: 0.46,
    vol24: 9000,
    oi: 48000,
    spread: 0.06,
    status: 'upcoming',
    resolved: null,
    unit: { en: 'US$/kg', zh: '美元／公斤' },
    range: [1.20, 3.60],
    strike: 2.35,
    tags: ['air', 'frankfurt', 'atlantic', 'quarterly', 'tac'],
    seed: 7423
  },

  {
    id: 'IATA-CTK-2026',
    family: 'air',
    type: 'scalar',
    title: {
      en: 'IATA global air cargo tonne-kilometres, full-year 2026',
      zh: 'IATA 全球航空貨運噸公里，2026 全年'
    },
    question: {
      en: 'What full-year 2026 change in global industry cargo tonne-kilometres, against 2025, does IATA report in its full-year air cargo market analysis?',
      zh: '國際航空運輸協會（IATA）在其全年航空貨運市場分析中，公布的 2026 全年全球貨運噸公里（CTK）較 2025 年的變動為多少？'
    },
    resolves: {
      en: 'IATA Air Cargo Market Analysis, full-year 2026 industry CTK figure',
      zh: '國際航空運輸協會（IATA）航空貨運市場分析，2026 全年行業 CTK 數值'
    },
    sourceTag: 'IATA',
    cadence: { en: 'Monthly, full-year print in February', zh: '每月公布，全年數據於 2 月公布' },
    expiry: '2027-02-10',
    listed: '2026-06-29',
    price: 0.56,
    open: 0.63,
    vol24: 68000,
    oi: 385000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: { en: '% year on year', zh: '按年變動 %' },
    range: [-4, 10],
    strike: 3.5,
    tags: ['air', 'iata', 'volume', 'global', 'ctk'],
    seed: 7451
  },

  {
    id: 'ECOM-FRTR-NOV26',
    family: 'air',
    type: 'binary',
    title: {
      en: 'China–North America freighter departures above Nov 2025',
      zh: '中國—北美全貨機班次高於 2025 年 11 月'
    },
    question: {
      en: 'Do scheduled and charter freighter departures from mainland China to North America in November 2026 exceed the November 2025 count?',
      zh: '2026 年 11 月由中國內地飛往北美的定期及包機全貨機班次，是否多於 2025 年 11 月的班次數？'
    },
    resolves: {
      en: 'Cirium published freighter schedule and capacity data, mainland China to North America',
      zh: 'Cirium 公布之全貨機航班時刻及運力數據，中國內地至北美'
    },
    sourceTag: 'CIRIUM',
    cadence: { en: 'Monthly, published in arrears', zh: '每月公布，數據滯後一期' },
    expiry: '2026-12-07',
    listed: '2026-08-17',
    price: 0.63,
    open: 0.58,
    vol24: 52000,
    oi: 296000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['air', 'ecommerce', 'charter', 'capacity', 'transpacific'],
    seed: 7486
  },

  {
    id: 'FDX-OTP-DEC26',
    family: 'air',
    type: 'binary',
    title: {
      en: 'FedEx Express on-time arrival above 80% in December 2026',
      zh: 'FedEx Express 2026 年 12 月準點到達率高於 80%'
    },
    question: {
      en: 'Does FedEx Express record a monthly on-time arrival rate above 80.0% for December 2026?',
      zh: 'FedEx Express 於 2026 年 12 月的單月準點到達率，是否高於 80.0%？'
    },
    resolves: {
      en: 'Cirium on-time performance data, monthly airline on-time arrival rate',
      zh: 'Cirium 準點表現數據，航空公司每月準點到達率'
    },
    sourceTag: 'CIRIUM',
    cadence: { en: 'Monthly, mid-month for the prior month', zh: '每月中公布上月數據' },
    expiry: '2027-01-15',
    listed: '2026-11-02',
    price: 0.51,
    open: 0.53,
    vol24: 6500,
    oi: 31000,
    spread: 0.06,
    status: 'upcoming',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['air', 'ontime', 'reliability', 'lastmile', 'carrier'],
    seed: 7510
  },

  {
    id: 'AIRSEA-RATIO-DEC26',
    family: 'air',
    type: 'binary',
    title: {
      en: 'Air-to-ocean rate ratio above 12× on the final 2026 prints',
      zh: '空運對海運運價比率於 2026 年末公布值高於 12 倍'
    },
    question: {
      en: 'On the final 2026 prints, is the TAC Index Shanghai–North America air spot rate more than twelve times the Drewry WCI Shanghai–Los Angeles rate converted at 10,000 kg per FEU?',
      zh: '以 2026 年最後一期公布值計，TAC Index 上海—北美空運即期運價，是否高於 Drewry 世界貨櫃指數（WCI）上海—洛杉磯運價按每 FEU 10,000 公斤換算後的十二倍？'
    },
    resolves: {
      en: 'TAC Index / Baltic Exchange air print and Drewry WCI container print, final 2026 assessments, converted at the payload rule fixed at listing',
      zh: 'TAC Index／波羅的海交易所空運公布值，與 Drewry 世界貨櫃指數（WCI）貨櫃公布值，取 2026 年最後一期評估，按掛牌時訂定的載重換算規則計算'
    },
    sourceTag: 'TAC+DREWRY',
    cadence: { en: 'Weekly both legs, final print of the year', zh: '兩邊均為每週公布，取全年最後一期' },
    expiry: '2027-01-04',
    listed: '2026-10-19',
    price: 0.37,
    open: 0.35,
    vol24: 3200,
    oi: 22000,
    spread: 0.05,
    status: 'upcoming',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['air', 'ocean', 'ratio', 'spread', 'modeshift'],
    seed: 7544
  },

  {
    id: 'TPAC-SURCH-AUG26',
    family: 'air',
    type: 'binary',
    title: {
      en: 'Two top-10 carriers filed an August transpacific surcharge',
      zh: '兩家前十大承運人公布 8 月跨太平洋附加費'
    },
    question: {
      en: 'Did two or more of the top ten air cargo carriers file a transpacific peak-season surcharge effective in August 2026?',
      zh: '前十大航空貨運承運人中，是否有兩家或以上公布自 2026 年 8 月起生效的跨太平洋旺季附加費？'
    },
    resolves: {
      en: 'Published carrier tariff filings, as distributed through IATA TACT and carrier tariff pages',
      zh: '已公布的承運人運價備案，透過 IATA TACT 及各承運人運價頁面發布'
    },
    sourceTag: 'TACT',
    cadence: { en: 'Filings, as published', zh: '運價備案，公布時即計' },
    expiry: '2026-08-03',
    listed: '2026-06-15',
    price: 0.97,
    open: 0.72,
    vol24: 4100,
    oi: 26000,
    spread: 0.05,
    status: 'resolved',
    resolved: 'YES',
    unit: null,
    range: null,
    strike: null,
    tags: ['air', 'surcharge', 'transpacific', 'peak', 'settled'],
    seed: 7577
  }

];
