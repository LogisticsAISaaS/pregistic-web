/* ==========================================================================
   PREGISTIC — contract dataset: family "freight"
   --------------------------------------------------------------------------
   Container, dry bulk and tanker freight benchmarks. Levels, spreads and
   ranges on Drewry WCI, Xeneta XSI-C, Freightos FBX, SCFIS, SCFI and the
   Baltic indices (BDI, BCI, BPI, BDTI/TD3C).

   Grounding: seed deck sections 03 (freight volatility), 08 (product
   families), 09 (launch board) and 24 (sources). Market picture as at
   14 September 2026: Drewry WCI composite $4,339 (13 Aug 2026), up 85%
   year-on-year; Shanghai–New York $8,706/FEU (13 Aug 2026); WCI composite
   $4,166 (25 Jun 2026); 2019 average $1,420; Sep 2021 peak $10,377.

   Pregistic is PRE-LAUNCH. Every price, volume and open-interest figure in
   this file is SIMULATED DEMONSTRATION DATA for the board UI. Nothing here
   is a quote, an assessment or an executable market. Thresholds are
   indicative and re-struck at listing.
   ========================================================================== */

window.PG = window.PG || {};
window.PG.contractsByFamily = window.PG.contractsByFamily || {};

window.PG.contractsByFamily.freight = [

  {
    id: 'WCI-COMP-DEC26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'Drewry WCI composite above $4,000/FEU at year-end',
      zh: '德魯里 WCI 綜合指數年末高於 4,000 美元/FEU'
    },
    question: {
      en: 'Will the Drewry World Container Index composite assessment settle above US$4,000 per 40ft container on the final weekly print of 2026, dated 31 December 2026?',
      zh: '德魯里世界貨櫃運價指數（WCI）綜合運價，於 2026 年最後一次週度公布（2026 年 12 月 31 日），是否高於每 FEU 4,000 美元？'
    },
    resolves: {
      en: 'Drewry World Container Index composite, weekly assessment published Thursday',
      zh: '德魯里世界貨櫃運價指數綜合運價，每週四公布的週度評估值'
    },
    sourceTag: 'DREWRY',
    cadence: { en: 'Weekly, Thursday', zh: '每週一次，逢週四' },
    expiry: '2026-12-31',
    listed: '2026-06-12',
    price: 0.78,
    open: 0.66,
    vol24: 412000,
    oi: 2840000,
    spread: 0.01,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['wci', 'container', 'composite', 'drewry'],
    seed: 3101
  },

  {
    id: 'XSI-NEU-Q127',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'XSI-C North Europe import average above 2,200 in Q1 2027',
      zh: 'XSI-C 北歐進口平均運價 2027 年首季高於 2,200'
    },
    question: {
      en: 'Will the Xeneta XSI-C North Europe import average, taken across every daily print from 1 January to 31 March 2027, exceed 2,200 index points?',
      zh: 'Xeneta XSI-C 北歐進口運價指數，於 2027 年 1 月 1 日至 3 月 31 日所有每日公布值的平均數，是否高於 2,200 點？'
    },
    resolves: {
      en: 'Xeneta XSI-C North Europe import index, daily, EU BMR compliant',
      zh: 'Xeneta XSI-C 北歐進口指數，每日公布，符合歐盟基準規例（EU BMR）'
    },
    sourceTag: 'XSI-C',
    cadence: { en: 'Daily, every business day', zh: '每個營業日公布' },
    expiry: '2027-03-31',
    listed: '2026-06-12',
    price: 0.61,
    open: 0.57,
    vol24: 186000,
    oi: 1310000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['xsi-c', 'xeneta', 'north-europe', 'quarterly'],
    seed: 3122
  },

  {
    id: 'SCFIS-EU-MAR27',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'SCFIS Europe above 1,800 at the March 2027 EC expiry',
      zh: 'SCFIS 歐洲線於 2027 年 3 月 EC 到期日高於 1,800'
    },
    question: {
      en: 'Will the SCFIS Europe settlement index print above 1,800 points on the Monday print used to settle the March 2027 INE EC container freight futures contract?',
      zh: '上海出口貨櫃結算運價指數（SCFIS）歐洲航線，於用作結算上海國際能源交易中心（INE）EC 貨櫃運價期貨 2027 年 3 月合約的週一公布值，是否高於 1,800 點？'
    },
    resolves: {
      en: 'Shanghai Shipping Exchange SCFIS Europe, weekly Monday print',
      zh: '上海航運交易所 SCFIS 歐洲航線，每週一公布值'
    },
    sourceTag: 'SSE-SCFIS',
    cadence: { en: 'Weekly, Monday', zh: '每週一次，逢週一' },
    expiry: '2027-03-29',
    listed: '2026-06-19',
    price: 0.54,
    open: 0.49,
    vol24: 238000,
    oi: 1660000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['scfis', 'europe', 'ine-ec', 'settlement'],
    seed: 3147
  },

  {
    id: 'BDI-3000-Q127',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'Baltic Dry Index prints above 3,000 before April 2027',
      zh: '波羅的海乾散貨指數於 2027 年 4 月前突破 3,000'
    },
    question: {
      en: 'Will the Baltic Dry Index record any daily print above 3,000 points on or before 31 March 2027?',
      zh: '波羅的海乾散貨指數（BDI）於 2027 年 3 月 31 日或之前，是否曾有任何一日公布值高於 3,000 點？'
    },
    resolves: {
      en: 'Baltic Exchange BDI, daily print published 13:00 London',
      zh: '波羅的海交易所 BDI，每日倫敦時間 13:00 公布'
    },
    sourceTag: 'BALTIC',
    cadence: { en: 'Daily, 13:00 London', zh: '每日倫敦時間 13:00' },
    expiry: '2027-03-31',
    listed: '2026-06-19',
    price: 0.43,
    open: 0.52,
    vol24: 164000,
    oi: 980000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['bdi', 'dry-bulk', 'baltic', 'threshold'],
    seed: 3168
  },

  {
    id: 'WCI-COMP-Q426',
    family: 'freight',
    type: 'scalar',
    title: {
      en: 'Drewry WCI composite Q4 2026 average level',
      zh: '德魯里 WCI 綜合指數 2026 年第四季平均值'
    },
    question: {
      en: 'What will the mean of all fourteen Drewry WCI composite weekly prints from 1 October to 31 December 2026 be, in US dollars per 40ft container?',
      zh: '德魯里 WCI 綜合運價於 2026 年 10 月 1 日至 12 月 31 日十四次週度公布值的平均數，以每 FEU 美元計，將會是多少？'
    },
    resolves: {
      en: 'Drewry WCI composite, arithmetic mean of the fourteen Q4 weekly prints',
      zh: '德魯里 WCI 綜合運價，第四季十四次週度公布值的算術平均數'
    },
    sourceTag: 'DREWRY',
    cadence: { en: 'Weekly, Thursday', zh: '每週一次，逢週四' },
    expiry: '2026-12-31',
    listed: '2026-07-02',
    price: 0.57,
    open: 0.44,
    vol24: 296000,
    oi: 1920000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: { en: 'US$/FEU', zh: '美元/FEU' },
    range: [2400, 7200],
    strike: 4400,
    tags: ['wci', 'container', 'quarterly', 'average'],
    seed: 3185
  },

  {
    id: 'WCI-TPAC-EUR-NOV26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'Shanghai–LA above Shanghai–Rotterdam on 26 Nov 2026',
      zh: '11 月 26 日上海–洛杉磯運價高於上海–鹿特丹'
    },
    question: {
      en: 'Will the Drewry WCI Shanghai to Los Angeles assessment exceed the Shanghai to Rotterdam assessment on the weekly print of 26 November 2026?',
      zh: '德魯里 WCI 上海至洛杉磯運價，於 2026 年 11 月 26 日的週度公布值，是否高於同日的上海至鹿特丹運價？'
    },
    resolves: {
      en: 'Drewry WCI lane assessments, Shanghai–Los Angeles less Shanghai–Rotterdam, same print date',
      zh: '德魯里 WCI 航線評估值：同一公布日的上海–洛杉磯減上海–鹿特丹'
    },
    sourceTag: 'DREWRY',
    cadence: { en: 'Weekly, Thursday', zh: '每週一次，逢週四' },
    expiry: '2026-11-26',
    listed: '2026-07-09',
    price: 0.83,
    open: 0.79,
    vol24: 124000,
    oi: 760000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['wci', 'spread', 'transpacific', 'asia-europe'],
    seed: 3204
  },

  {
    id: 'WCI-SHA-NYC-OCT26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'Shanghai–New York touches $9,000/FEU by 8 Oct 2026',
      zh: '上海–紐約於 10 月 8 日前觸及 9,000 美元/FEU'
    },
    question: {
      en: 'Will the Drewry WCI Shanghai to New York assessment reach or exceed US$9,000 per 40ft container on any weekly print up to and including 8 October 2026?',
      zh: '德魯里 WCI 上海至紐約運價，於 2026 年 10 月 8 日或之前的任何一次週度公布值，是否達到或高於每 FEU 9,000 美元？'
    },
    resolves: {
      en: 'Drewry WCI Shanghai–New York, weekly Thursday assessment; last print $8,706 on 13 August 2026',
      zh: '德魯里 WCI 上海–紐約，每週四公布的評估值；2026 年 8 月 13 日公布值為 8,706 美元'
    },
    sourceTag: 'DREWRY',
    cadence: { en: 'Weekly, Thursday', zh: '每週一次，逢週四' },
    expiry: '2026-10-08',
    listed: '2026-06-26',
    price: 0.36,
    open: 0.29,
    vol24: 208000,
    oi: 640000,
    spread: 0.03,
    status: 'closing',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['wci', 'shanghai-new-york', 'transpacific', 'threshold'],
    seed: 3221
  },

  {
    id: 'FBX-NAWC-SEP26',
    family: 'freight',
    type: 'scalar',
    title: {
      en: 'FBX01 China–US West Coast, print of 25 Sep 2026',
      zh: 'FBX01 中國–美西 2026 年 9 月 25 日公布值'
    },
    question: {
      en: 'What will the Freightos Baltic Index FBX01 China/East Asia to North America West Coast rate be on the print of 25 September 2026, in US dollars per 40ft container?',
      zh: 'Freightos 波羅的海指數 FBX01（中國／東亞至北美西岸）於 2026 年 9 月 25 日的公布值，以每 FEU 美元計，將會是多少？'
    },
    resolves: {
      en: 'Freightos Baltic Index FBX01, published rate for the named date',
      zh: 'Freightos 波羅的海指數 FBX01，指定日期的公布運價'
    },
    sourceTag: 'FBX',
    cadence: { en: 'Daily, every business day', zh: '每個營業日公布' },
    expiry: '2026-09-25',
    listed: '2026-08-06',
    price: 0.62,
    open: 0.55,
    vol24: 148000,
    oi: 420000,
    spread: 0.02,
    status: 'closing',
    resolved: null,
    unit: { en: 'US$/FEU', zh: '美元/FEU' },
    range: [1800, 7500],
    strike: 4200,
    tags: ['fbx', 'freightos', 'transpacific', 'weekly-print'],
    seed: 3243
  },

  {
    id: 'FBX-NEUR-DEC26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'FBX11 China–North Europe above $3,200/FEU on 30 Dec',
      zh: 'FBX11 中國–北歐於 12 月 30 日高於 3,200 美元/FEU'
    },
    question: {
      en: 'Will the Freightos Baltic Index FBX11 China/East Asia to North Europe rate print above US$3,200 per 40ft container on 30 December 2026?',
      zh: 'Freightos 波羅的海指數 FBX11（中國／東亞至北歐）於 2026 年 12 月 30 日的公布值，是否高於每 FEU 3,200 美元？'
    },
    resolves: {
      en: 'Freightos Baltic Index FBX11, published rate for the named date',
      zh: 'Freightos 波羅的海指數 FBX11，指定日期的公布運價'
    },
    sourceTag: 'FBX',
    cadence: { en: 'Daily, every business day', zh: '每個營業日公布' },
    expiry: '2026-12-30',
    listed: '2026-07-16',
    price: 0.66,
    open: 0.58,
    vol24: 96000,
    oi: 580000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['fbx', 'freightos', 'asia-europe', 'threshold'],
    seed: 3266
  },

  {
    id: 'SCFI-COMP-DEC26',
    family: 'freight',
    type: 'scalar',
    title: {
      en: 'SCFI composite level on the last print of 2026',
      zh: '上海出口貨櫃運價指數 2026 年末次公布值'
    },
    question: {
      en: 'What will the Shanghai Containerized Freight Index composite read on its final Friday print of 2026, dated 25 December 2026?',
      zh: '上海出口貨櫃運價指數（SCFI）綜合指數，於 2026 年最後一次週五公布（2026 年 12 月 25 日），將會是多少點？'
    },
    resolves: {
      en: 'Shanghai Shipping Exchange SCFI composite, weekly Friday print',
      zh: '上海航運交易所 SCFI 綜合指數，每週五公布值'
    },
    sourceTag: 'SSE-SCFI',
    cadence: { en: 'Weekly, Friday', zh: '每週一次，逢週五' },
    expiry: '2026-12-25',
    listed: '2026-07-23',
    price: 0.59,
    open: 0.48,
    vol24: 132000,
    oi: 870000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: { en: 'Index points', zh: '指數點' },
    range: [1100, 3200],
    strike: 1900,
    tags: ['scfi', 'container', 'year-end', 'level'],
    seed: 3288
  },

  {
    id: 'BDI-RANGE-H226',
    family: 'freight',
    type: 'scalar',
    title: {
      en: 'BDI high-to-low range across H2 2026',
      zh: 'BDI 2026 年下半年高低區間'
    },
    question: {
      en: 'What will the difference between the highest and the lowest Baltic Dry Index daily print between 1 July and 31 December 2026 be, in index points?',
      zh: '2026 年 7 月 1 日至 12 月 31 日期間，波羅的海乾散貨指數每日公布值的最高值與最低值之差，將會是多少指數點？'
    },
    resolves: {
      en: 'Baltic Exchange BDI daily prints, highest less lowest across the window',
      zh: '波羅的海交易所 BDI 每日公布值，區間內最高值減最低值'
    },
    sourceTag: 'BALTIC',
    cadence: { en: 'Daily, 13:00 London', zh: '每日倫敦時間 13:00' },
    expiry: '2026-12-31',
    listed: '2026-06-30',
    price: 0.49,
    open: 0.51,
    vol24: 88000,
    oi: 640000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: { en: 'Index points', zh: '指數點' },
    range: [400, 3200],
    strike: 1600,
    tags: ['bdi', 'dry-bulk', 'range', 'volatility'],
    seed: 3307
  },

  {
    id: 'BCI-5TC-30K-NOV26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'Baltic Capesize 5TC above $30,000/day by 30 Nov 2026',
      zh: '波羅的海海岬型 5TC 於 11 月 30 日前高於 30,000 美元/日'
    },
    question: {
      en: 'Will the Baltic Capesize 5TC timecharter average print above US$30,000 per day on any daily assessment on or before 30 November 2026?',
      zh: '波羅的海海岬型五條航線期租平均（5TC），於 2026 年 11 月 30 日或之前的任何一日公布值，是否高於每日 30,000 美元？'
    },
    resolves: {
      en: 'Baltic Exchange Capesize 5TC timecharter average, daily assessment',
      zh: '波羅的海交易所海岬型 5TC 期租平均值，每日評估值'
    },
    sourceTag: 'BALTIC',
    cadence: { en: 'Daily, 13:00 London', zh: '每日倫敦時間 13:00' },
    expiry: '2026-11-30',
    listed: '2026-07-30',
    price: 0.34,
    open: 0.40,
    vol24: 74000,
    oi: 510000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['bci', 'capesize', 'dry-bulk', 'timecharter'],
    seed: 3329
  },

  {
    id: 'BPI-82-NOV26',
    family: 'freight',
    type: 'scalar',
    title: {
      en: 'Baltic Panamax 82 5TC November 2026 average',
      zh: '波羅的海巴拿馬型 82 5TC 2026 年 11 月平均值'
    },
    question: {
      en: 'What will the arithmetic mean of the Baltic Panamax 82 5TC timecharter average across every daily print in November 2026 be, in US dollars per day?',
      zh: '波羅的海巴拿馬型 82 期租平均（5TC），於 2026 年 11 月所有每日公布值的算術平均數，以每日美元計，將會是多少？'
    },
    resolves: {
      en: 'Baltic Exchange Panamax 82 5TC, mean of the November daily prints',
      zh: '波羅的海交易所巴拿馬型 82 5TC，11 月每日公布值的平均數'
    },
    sourceTag: 'BALTIC',
    cadence: { en: 'Daily, 13:00 London', zh: '每日倫敦時間 13:00' },
    expiry: '2026-11-30',
    listed: '2026-08-13',
    price: 0.46,
    open: 0.43,
    vol24: 52000,
    oi: 310000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: { en: 'US$/day', zh: '美元/日' },
    range: [7000, 26000],
    strike: 14500,
    tags: ['bpi', 'panamax', 'dry-bulk', 'monthly-average'],
    seed: 3344
  },

  {
    id: 'TD3C-WS-NOV26',
    family: 'freight',
    type: 'scalar',
    title: {
      en: 'Baltic TD3C VLCC November 2026 average rate',
      zh: '波羅的海 TD3C 超大型油輪 2026 年 11 月平均運價'
    },
    question: {
      en: 'What will the arithmetic mean of the Baltic TD3C Ras Tanura to Ningbo 270,000 mt crude rate across every daily print in November 2026 be, in Worldscale points?',
      zh: '波羅的海 TD3C（拉斯坦努拉至寧波，27 萬公噸原油）於 2026 年 11 月所有每日公布值的算術平均數，以世界油輪運價指數（WS）點計，將會是多少？'
    },
    resolves: {
      en: 'Baltic Exchange TD3C dirty tanker route, daily assessment',
      zh: '波羅的海交易所 TD3C 原油運輸航線，每日評估值'
    },
    sourceTag: 'BALTIC',
    cadence: { en: 'Daily, 13:00 London', zh: '每日倫敦時間 13:00' },
    expiry: '2026-11-30',
    listed: '2026-08-06',
    price: 0.51,
    open: 0.47,
    vol24: 61000,
    oi: 380000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: { en: 'Worldscale points', zh: 'WS 點' },
    range: [30, 120],
    strike: 72,
    tags: ['td3c', 'tanker', 'vlcc', 'baltic'],
    seed: 3361
  },

  {
    id: 'BDTI-1200-DEC26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'Baltic Dirty Tanker Index above 1,200 by 18 Dec 2026',
      zh: '波羅的海原油運價指數於 12 月 18 日前高於 1,200'
    },
    question: {
      en: 'Will the Baltic Dirty Tanker Index record any daily print above 1,200 points on or before 18 December 2026?',
      zh: '波羅的海原油運價指數（BDTI）於 2026 年 12 月 18 日或之前，是否曾有任何一日公布值高於 1,200 點？'
    },
    resolves: {
      en: 'Baltic Exchange BDTI, daily print published 13:00 London',
      zh: '波羅的海交易所 BDTI，每日倫敦時間 13:00 公布'
    },
    sourceTag: 'BALTIC',
    cadence: { en: 'Daily, 13:00 London', zh: '每日倫敦時間 13:00' },
    expiry: '2026-12-18',
    listed: '2026-08-20',
    price: 0.38,
    open: 0.33,
    vol24: 44000,
    oi: 260000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['bdti', 'tanker', 'baltic', 'threshold'],
    seed: 3378
  },

  {
    id: 'XSI-TPAC-EUR-DEC26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'XSI-C Far East–USWC above Far East–N Europe, 15 Dec',
      zh: '12 月 15 日 XSI-C 遠東–美西高於遠東–北歐'
    },
    question: {
      en: 'Will the Xeneta XSI-C Far East to US West Coast import average exceed the Far East to North Europe import average on the daily print of 15 December 2026?',
      zh: 'Xeneta XSI-C 遠東至美西進口平均運價，於 2026 年 12 月 15 日的每日公布值，是否高於同日的遠東至北歐進口平均運價？'
    },
    resolves: {
      en: 'Xeneta XSI-C corridor import averages, both taken from the same daily print',
      zh: 'Xeneta XSI-C 兩條航線進口平均運價，取自同一日的公布值'
    },
    sourceTag: 'XSI-C',
    cadence: { en: 'Daily, every business day', zh: '每個營業日公布' },
    expiry: '2026-12-15',
    listed: '2026-07-16',
    price: 0.88,
    open: 0.86,
    vol24: 110000,
    oi: 690000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['xsi-c', 'spread', 'transpacific', 'asia-europe'],
    seed: 3392
  },

  {
    id: 'WCI-4000-8W-NOV26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'WCI composite holds $4,000/FEU for eight weeks',
      zh: 'WCI 綜合指數連續八週守住 4,000 美元/FEU'
    },
    question: {
      en: 'Will the Drewry WCI composite assessment print at or above US$4,000 per 40ft container on eight consecutive weekly prints ending on or before 26 November 2026?',
      zh: '德魯里 WCI 綜合運價，是否於 2026 年 11 月 26 日或之前，連續八次週度公布值均達到或高於每 FEU 4,000 美元？'
    },
    resolves: {
      en: 'Drewry WCI composite, eight consecutive weekly Thursday prints',
      zh: '德魯里 WCI 綜合運價，連續八次的週四公布值'
    },
    sourceTag: 'DREWRY',
    cadence: { en: 'Weekly, Thursday', zh: '每週一次，逢週四' },
    expiry: '2026-11-26',
    listed: '2026-07-23',
    price: 0.69,
    open: 0.60,
    vol24: 118000,
    oi: 720000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['wci', 'container', 'persistence', 'composite'],
    seed: 3411
  },

  {
    id: 'SCFIS-USWC-JUN27',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'SCFIS US West Coast above 1,400 at end of June 2027',
      zh: 'SCFIS 美西航線於 2027 年 6 月底高於 1,400'
    },
    question: {
      en: 'Will the SCFIS US West Coast settlement index print above 1,400 points on the final Monday print of June 2027, dated 28 June 2027?',
      zh: '上海出口貨櫃結算運價指數（SCFIS）美西航線，於 2027 年 6 月最後一次週一公布（2027 年 6 月 28 日），是否高於 1,400 點？'
    },
    resolves: {
      en: 'Shanghai Shipping Exchange SCFIS US West Coast, weekly Monday print',
      zh: '上海航運交易所 SCFIS 美西航線，每週一公布值'
    },
    sourceTag: 'SSE-SCFIS',
    cadence: { en: 'Weekly, Monday', zh: '每週一次，逢週一' },
    expiry: '2027-06-28',
    listed: '2026-10-05',
    price: 0.47,
    open: 0.47,
    vol24: 8000,
    oi: 40000,
    spread: 0.05,
    status: 'upcoming',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['scfis', 'us-west-coast', 'transpacific', 'settlement'],
    seed: 3427
  },

  {
    id: 'WCI-COMP-JUN26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'Drewry WCI composite above $4,000/FEU, 25 Jun 2026',
      zh: '德魯里 WCI 綜合指數 2026 年 6 月 25 日高於 4,000 美元/FEU'
    },
    question: {
      en: 'Did the Drewry WCI composite assessment settle above US$4,000 per 40ft container on the final June 2026 weekly print, dated 25 June 2026?',
      zh: '德魯里 WCI 綜合運價，於 2026 年 6 月最後一次週度公布（2026 年 6 月 25 日），是否高於每 FEU 4,000 美元？'
    },
    resolves: {
      en: 'Drewry WCI composite, weekly print of 25 June 2026 — settled at $4,166/FEU',
      zh: '德魯里 WCI 綜合運價，2026 年 6 月 25 日的週度公布值——結算值為每 FEU 4,166 美元'
    },
    sourceTag: 'DREWRY',
    cadence: { en: 'Weekly, Thursday', zh: '每週一次，逢週四' },
    expiry: '2026-06-25',
    listed: '2026-03-05',
    price: 0.97,
    open: 0.62,
    vol24: 14000,
    oi: 540000,
    spread: 0.01,
    status: 'resolved',
    resolved: 'YES',
    unit: null,
    range: null,
    strike: null,
    tags: ['wci', 'container', 'composite', 'settled'],
    seed: 3448
  },

  {
    id: 'WCI-SHA-NYC-AUG26',
    family: 'freight',
    type: 'binary',
    title: {
      en: 'Shanghai–New York at $9,000/FEU on 13 Aug 2026',
      zh: '上海–紐約於 2026 年 8 月 13 日達 9,000 美元/FEU'
    },
    question: {
      en: 'Did the Drewry WCI Shanghai to New York assessment reach or exceed US$9,000 per 40ft container on the weekly print of 13 August 2026?',
      zh: '德魯里 WCI 上海至紐約運價，於 2026 年 8 月 13 日的週度公布值，是否達到或高於每 FEU 9,000 美元？'
    },
    resolves: {
      en: 'Drewry WCI Shanghai–New York, print of 13 August 2026 — settled at $8,706/FEU',
      zh: '德魯里 WCI 上海–紐約，2026 年 8 月 13 日的公布值——結算值為每 FEU 8,706 美元'
    },
    sourceTag: 'DREWRY',
    cadence: { en: 'Weekly, Thursday', zh: '每週一次，逢週四' },
    expiry: '2026-08-13',
    listed: '2026-05-21',
    price: 0.06,
    open: 0.41,
    vol24: 9000,
    oi: 285000,
    spread: 0.02,
    status: 'resolved',
    resolved: 'NO',
    unit: null,
    range: null,
    strike: null,
    tags: ['wci', 'shanghai-new-york', 'transpacific', 'settled'],
    seed: 3463
  }

];
