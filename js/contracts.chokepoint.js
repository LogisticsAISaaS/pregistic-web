window.PG = window.PG || {};

/* ==========================================================================
   PREGISTIC — contract family 02: chokepoints & ports
   --------------------------------------------------------------------------
   Canal drafts, transit counts, auction clearing prices, congestion days,
   berth waits and schedule reliability. The deck calls these the
   highest-salience, cleanest-settling events in the industry: the number is
   published, by a named body, on a known day.

   16 contracts. 11 live · 2 closing · 1 upcoming · 2 resolved.
   11 binary · 5 scalar.

   Prices, volumes and open interest in this file are SIMULATED DEMONSTRATION
   DATA. Pregistic is pre-launch; nothing here is a live quote. Thresholds are
   indicative and re-struck at listing by the domain council.

   Schema: see SPEC.md. Every human-readable string is {en, zh}.
   ========================================================================== */

window.PG.contractsByFamily = window.PG.contractsByFamily || {};

window.PG.contractsByFamily.chokepoint = [

  /* ---- 01 · launch board · Panama draft ------------------------------- */
  {
    id: 'PCA-DRAFT-SEP26',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'Panama Canal max draft at or below 47.5 ft, 30 Sep 2026',
      zh: '巴拿馬運河最大吃水於 2026 年 9 月 30 日不高於 47.5 英尺'
    },
    question: {
      en: "Does the Panama Canal Authority advisory in force on 30 September 2026 set the Neopanamax maximum authorised draft at or below 47.5 feet TFW?",
      zh: '2026 年 9 月 30 日生效的巴拿馬運河管理局航運通告，是否將新巴拿馬型船閘的最大容許吃水訂於 47.5 英尺（淡水）或以下？'
    },
    resolves: {
      en: 'Panama Canal Authority advisory to shipping',
      zh: '巴拿馬運河管理局航運通告'
    },
    sourceTag: 'ACP',
    cadence: { en: 'Advisories, as published', zh: '航運通告，隨時發佈' },
    expiry: '2026-09-30',
    listed: '2026-06-12',
    price: 0.34,
    open: 0.41,
    vol24: 184000,
    oi: 1240000,
    spread: 0.02,
    status: 'closing',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['panama', 'drought', 'draft', 'transit'],
    seed: 4417
  },

  /* ---- 02 · launch board · Panama slot auction ------------------------ */
  {
    id: 'PCA-SLOT-5M',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'Panama slot auction clears above US$5.0M in 2026',
      zh: '巴拿馬過閘時段拍賣成交價於 2026 年內高於 500 萬美元'
    },
    question: {
      en: 'Does any single Panama Canal transit slot auction clear above US$5.0 million on published auction results before 31 December 2026?',
      zh: '於 2026 年 12 月 31 日前，巴拿馬運河管理局公佈的拍賣結果中，是否有任何單一過閘時段成交價高於 500 萬美元？'
    },
    resolves: {
      en: 'Panama Canal Authority published auction results',
      zh: '巴拿馬運河管理局公佈的拍賣結果'
    },
    sourceTag: 'ACP',
    cadence: { en: 'Auction by auction, as results post', zh: '逐場拍賣，結果公佈時' },
    expiry: '2026-12-31',
    listed: '2026-06-20',
    price: 0.38,
    open: 0.29,
    vol24: 96000,
    oi: 610000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['panama', 'auction', 'slots', 'drought'],
    seed: 5821
  },

  /* ---- 03 · launch board · Suez recovery ------------------------------ */
  {
    id: 'SUEZ-80PC',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'Monthly Suez transits reach 80% of 2023 baseline',
      zh: '蘇伊士運河月度通行量回升至 2023 年基準的 80%'
    },
    question: {
      en: 'Do monthly Suez Canal transits reach 80% of the same month of 2023 in any month before 30 June 2027?',
      zh: '於 2027 年 6 月 30 日前，蘇伊士運河任何一個月的通行量，是否達到 2023 年同月的 80%？'
    },
    resolves: {
      en: 'Suez Canal Authority monthly statement, cross-checked against IMF PortWatch',
      zh: '蘇伊士運河管理局月度公佈，並以國際貨幣基金 PortWatch 覆核'
    },
    sourceTag: 'SCA/PW',
    cadence: { en: 'Monthly', zh: '每月' },
    expiry: '2027-06-30',
    listed: '2026-05-28',
    price: 0.21,
    open: 0.26,
    vol24: 142000,
    oi: 1880000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['suez', 'redsea', 'transit', 'recovery'],
    seed: 3164
  },

  /* ---- 04 · launch board · Hormuz ------------------------------------- */
  {
    id: 'HRMZ-100-4W',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'Hormuz weekly transits above 100 for four weeks',
      zh: '荷姆茲海峽週度通行量連續四週高於 100 艘次'
    },
    question: {
      en: "Do Strait of Hormuz weekly transits exceed 100 vessels in four consecutive weeks on Lloyd's List Intelligence counts before 31 December 2026?",
      zh: '於 2026 年 12 月 31 日前，勞氏情報統計的荷姆茲海峽週度通行量，是否連續四週超過 100 艘次？'
    },
    resolves: {
      en: "Lloyd's List Intelligence weekly transit counts",
      zh: '勞氏情報（Lloyd\'s List Intelligence）週度通行量統計'
    },
    sourceTag: 'LLOYDSLIST',
    cadence: { en: 'Weekly', zh: '每週' },
    expiry: '2026-12-31',
    listed: '2026-07-02',
    price: 0.57,
    open: 0.48,
    vol24: 118000,
    oi: 840000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['hormuz', 'tanker', 'warrisk', 'transit'],
    seed: 2290
  },

  /* ---- 05 · launch board · schedule reliability ----------------------- */
  {
    id: 'RELY-70-2027',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'Liner schedule reliability above 70% before 2028',
      zh: '全球班輪準班率於 2028 年前單月高於 70%'
    },
    question: {
      en: 'Does global liner schedule reliability exceed 70% in any monthly Sea-Intelligence print before December 2027?',
      zh: '於 2027 年 12 月前，Sea-Intelligence 任何一期月度報告的全球班輪準班率，是否超過 70%？'
    },
    resolves: {
      en: 'Sea-Intelligence Global Liner Performance monthly report',
      zh: 'Sea-Intelligence 月度《全球班輪表現》報告'
    },
    sourceTag: 'SEA-INT',
    cadence: { en: 'Monthly, about five weeks in arrears', zh: '每月，約滯後五週' },
    expiry: '2027-12-31',
    listed: '2026-04-16',
    price: 0.41,
    open: 0.37,
    vol24: 74000,
    oi: 1120000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['reliability', 'schedule', 'carriers', 'delay'],
    seed: 6708
  },

  /* ---- 06 · Gatun Lake level (scalar) --------------------------------- */
  {
    id: 'GATUN-DEC26',
    family: 'chokepoint',
    type: 'scalar',
    title: {
      en: 'Gatun Lake level, final December 2026 reading',
      zh: '加通湖水位，2026 年 12 月最後一次讀數'
    },
    question: {
      en: "Does the Panama Canal Authority's final published Gatun Lake gauge reading for December 2026 settle above 84.0 ft PLD?",
      zh: '巴拿馬運河管理局公佈的 2026 年 12 月最後一次加通湖水位讀數，是否高於 84.0 英尺（PLD 基準）？'
    },
    resolves: {
      en: 'Panama Canal Authority daily lake level readings',
      zh: '巴拿馬運河管理局每日湖泊水位讀數'
    },
    sourceTag: 'ACP',
    cadence: { en: 'Daily', zh: '每日' },
    expiry: '2026-12-31',
    listed: '2026-08-14',
    price: 0.56,
    open: 0.64,
    vol24: 61000,
    oi: 430000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: { en: 'ft PLD', zh: '英尺（PLD）' },
    range: [78, 89],
    strike: 84,
    tags: ['panama', 'gatun', 'drought', 'water'],
    seed: 1187
  },

  /* ---- 07 · Panama daily transit count (scalar) ----------------------- */
  {
    id: 'PCA-TRANSIT-OCT26',
    family: 'chokepoint',
    type: 'scalar',
    title: {
      en: 'Panama average daily transits, October 2026',
      zh: '巴拿馬運河 2026 年 10 月平均每日通行量'
    },
    question: {
      en: 'Does the Panama Canal Authority reported average daily transits across all lock lanes for October 2026 settle above 35.0?',
      zh: '巴拿馬運河管理局公佈的 2026 年 10 月全線平均每日通行量，是否高於 35.0 艘次？'
    },
    resolves: {
      en: 'Panama Canal Authority monthly transit statistics',
      zh: '巴拿馬運河管理局月度通行量統計'
    },
    sourceTag: 'ACP',
    cadence: { en: 'Monthly, first week', zh: '每月首週' },
    expiry: '2026-11-06',
    listed: '2026-07-24',
    price: 0.47,
    open: 0.52,
    vol24: 88000,
    oi: 520000,
    spread: 0.02,
    status: 'live',
    resolved: null,
    unit: { en: 'transits/day', zh: '艘次／日' },
    range: [24, 40],
    strike: 35,
    tags: ['panama', 'transit', 'capacity'],
    seed: 9042
  },

  /* ---- 08 · Bab al-Mandeb crossings ----------------------------------- */
  {
    id: 'BAM-35-DEC26',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'Bab al-Mandeb daily crossings back to 35',
      zh: '曼德海峽每日通行量回升至 35 艘次'
    },
    question: {
      en: 'Does the seven-day average of daily Bab al-Mandeb crossings reach 35 or more on any day before 31 December 2026 on IMF PortWatch data?',
      zh: '於 2026 年 12 月 31 日前，國際貨幣基金 PortWatch 數據中曼德海峽每日通行量的七日平均值，是否於任何一日達到 35 艘次或以上？'
    },
    resolves: {
      en: 'IMF PortWatch daily chokepoint transit calls',
      zh: '國際貨幣基金 PortWatch 每日咽喉水道通行數據'
    },
    sourceTag: 'PORTWATCH',
    cadence: { en: 'Daily', zh: '每日' },
    expiry: '2026-12-31',
    listed: '2026-07-30',
    price: 0.44,
    open: 0.51,
    vol24: 103000,
    oi: 690000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['redsea', 'babelmandeb', 'warrisk', 'transit'],
    seed: 7315
  },

  /* ---- 09 · Suez Canal Authority revenue (scalar) --------------------- */
  {
    id: 'SCA-REV-Q426',
    family: 'chokepoint',
    type: 'scalar',
    title: {
      en: 'Suez Canal Authority revenue, Q4 2026',
      zh: '蘇伊士運河管理局 2026 年第四季收入'
    },
    question: {
      en: 'Does Suez Canal Authority reported transit revenue for the fourth quarter of 2026 settle above US$1.10 billion?',
      zh: '蘇伊士運河管理局公佈的 2026 年第四季通行收入，是否高於 11.0 億美元？'
    },
    resolves: {
      en: 'Suez Canal Authority quarterly revenue statement',
      zh: '蘇伊士運河管理局季度收入公佈'
    },
    sourceTag: 'SCA',
    cadence: { en: 'Quarterly', zh: '每季' },
    expiry: '2027-02-10',
    listed: '2026-08-05',
    price: 0.39,
    open: 0.44,
    vol24: 52000,
    oi: 380000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: { en: 'US$bn', zh: '十億美元' },
    range: [0.6, 1.8],
    strike: 1.1,
    tags: ['suez', 'revenue', 'redsea'],
    seed: 4903
  },

  /* ---- 10 · average liner delay (scalar) ------------------------------ */
  {
    id: 'DELAY-AUG26',
    family: 'chokepoint',
    type: 'scalar',
    title: {
      en: 'Global average liner delay, August 2026 print',
      zh: '2026 年 8 月全球班輪平均延誤日數'
    },
    question: {
      en: 'Does the Sea-Intelligence average delay for late vessel arrivals in the August 2026 print settle above 5.50 days?',
      zh: 'Sea-Intelligence 2026 年 8 月報告中延誤到港船舶的平均延誤日數，是否高於 5.50 日？'
    },
    resolves: {
      en: 'Sea-Intelligence Global Liner Performance monthly report',
      zh: 'Sea-Intelligence 月度《全球班輪表現》報告'
    },
    sourceTag: 'SEA-INT',
    cadence: { en: 'Monthly, about five weeks in arrears', zh: '每月，約滯後五週' },
    expiry: '2026-10-09',
    listed: '2026-08-21',
    price: 0.48,
    open: 0.44,
    vol24: 67000,
    oi: 290000,
    spread: 0.03,
    status: 'closing',
    resolved: null,
    unit: { en: 'days', zh: '日' },
    range: [3.5, 7.5],
    strike: 5.5,
    tags: ['reliability', 'delay', 'schedule'],
    seed: 2648
  },

  /* ---- 11 · Cape of Good Hope routing share (scalar) ------------------ */
  {
    id: 'CAPE-SHARE-Q426',
    family: 'chokepoint',
    type: 'scalar',
    title: {
      en: 'Cape of Good Hope routing share, Q4 2026',
      zh: '2026 年第四季繞道好望角比例'
    },
    question: {
      en: 'Does the share of Asia–North Europe container sailings routed via the Cape of Good Hope in the fourth quarter of 2026 settle above 80%?',
      zh: '2026 年第四季亞洲—北歐航線貨櫃班次經好望角繞道的比例，是否高於 80%？'
    },
    resolves: {
      en: 'Clarksons Research quarterly routing analysis',
      zh: 'Clarksons Research 季度航線分析'
    },
    sourceTag: 'CLARKSONS',
    cadence: { en: 'Quarterly', zh: '每季' },
    expiry: '2027-01-22',
    listed: '2026-06-30',
    price: 0.72,
    open: 0.69,
    vol24: 58000,
    oi: 470000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: { en: '% of sailings', zh: '佔班次百分比' },
    range: [40, 100],
    strike: 80,
    tags: ['redsea', 'capeofgoodhope', 'routing', 'suez'],
    seed: 8531
  },

  /* ---- 12 · Rotterdam waiting time ------------------------------------ */
  {
    id: 'RTM-WAIT-Q426',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'Rotterdam container waiting time above 24 hours',
      zh: '鹿特丹貨櫃船等候時間超過 24 小時'
    },
    question: {
      en: 'Does the average container-vessel waiting time published by the Port of Rotterdam Authority exceed 24 hours in any calendar week of the fourth quarter of 2026?',
      zh: '鹿特丹港務局公佈的貨櫃船平均等候時間，是否於 2026 年第四季任何一週超過 24 小時？'
    },
    resolves: {
      en: 'Port of Rotterdam Authority published waiting times',
      zh: '鹿特丹港務局公佈的等候時間統計'
    },
    sourceTag: 'PORT OF RTM',
    cadence: { en: 'Weekly', zh: '每週' },
    expiry: '2027-01-08',
    listed: '2026-07-17',
    price: 0.63,
    open: 0.58,
    vol24: 45000,
    oi: 260000,
    spread: 0.04,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['rotterdam', 'congestion', 'berth', 'europe'],
    seed: 5476
  },

  /* ---- 13 · Shanghai congestion --------------------------------------- */
  {
    id: 'SHA-CONG-Q426',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'More than 40 boxships at anchor off Shanghai',
      zh: '上海錨地待泊貨櫃船超過 40 艘'
    },
    question: {
      en: 'Do more than 40 container vessels sit at anchor off the Port of Shanghai on any single day of the fourth quarter of 2026 on IMF PortWatch data?',
      zh: '於 2026 年第四季任何一日，國際貨幣基金 PortWatch 數據中上海港錨地待泊的貨櫃船，是否超過 40 艘？'
    },
    resolves: {
      en: 'IMF PortWatch daily port activity data',
      zh: '國際貨幣基金 PortWatch 每日港口活動數據'
    },
    sourceTag: 'PORTWATCH',
    cadence: { en: 'Daily', zh: '每日' },
    expiry: '2026-12-31',
    listed: '2026-08-08',
    price: 0.36,
    open: 0.33,
    vol24: 71000,
    oi: 410000,
    spread: 0.03,
    status: 'live',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['shanghai', 'congestion', 'ports', 'china'],
    seed: 3927
  },

  /* ---- 14 · US port labour action (upcoming) -------------------------- */
  {
    id: 'USPORT-STOP-SEP27',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'US terminal shut 24 hours by industrial action',
      zh: '美國貨櫃碼頭因勞資行動停工 24 小時'
    },
    question: {
      en: 'Does industrial action stop work for 24 consecutive hours or more at any US container terminal before 30 September 2027?',
      zh: '於 2027 年 9 月 30 日前，美國任何貨櫃碼頭是否因勞資行動連續停工 24 小時或以上？'
    },
    resolves: {
      en: "Lloyd's List Intelligence reporting, confirmed against the affected port authority's operational notices",
      zh: '勞氏情報報道，並對照受影響港務局的作業通告確認'
    },
    sourceTag: 'LLOYDSLIST',
    cadence: { en: 'Event-driven', zh: '事件觸發' },
    expiry: '2027-09-30',
    listed: '2026-09-28',
    price: 0.24,
    open: 0.24,
    vol24: 0,
    oi: 0,
    spread: 0.05,
    status: 'upcoming',
    resolved: null,
    unit: null,
    range: null,
    strike: null,
    tags: ['labour', 'usports', 'ila', 'ilwu'],
    seed: 6152
  },

  /* ---- 15 · settled · US West Coast berth wait ------------------------ */
  {
    id: 'LALB-WAIT-AUG26',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'Los Angeles / Long Beach berth wait above one day',
      zh: '洛杉磯／長灘泊位等候時間超過一日'
    },
    question: {
      en: 'Did the average at-anchor waiting time for container vessels at Los Angeles and Long Beach exceed 1.0 day in any week of August 2026?',
      zh: '2026 年 8 月任何一週，洛杉磯及長灘港貨櫃船的平均錨地等候時間，是否超過 1.0 日？'
    },
    resolves: {
      en: 'Port of Los Angeles and Port of Long Beach published vessel statistics',
      zh: '洛杉磯港及長灘港公佈的船舶統計'
    },
    sourceTag: 'POLA/POLB',
    cadence: { en: 'Weekly', zh: '每週' },
    expiry: '2026-08-31',
    listed: '2026-06-26',
    price: 0.97,
    open: 0.74,
    vol24: 0,
    oi: 0,
    spread: 0.02,
    status: 'resolved',
    resolved: 'YES',
    unit: null,
    range: null,
    strike: null,
    tags: ['uswc', 'berthwait', 'congestion', 'ports'],
    seed: 2071
  },

  /* ---- 16 · settled · Bosphorus suspension ---------------------------- */
  {
    id: 'BOSP-SUSP-AUG26',
    family: 'chokepoint',
    type: 'binary',
    title: {
      en: 'Bosphorus closed both ways for 24 hours',
      zh: '博斯普魯斯海峽雙向封閉 24 小時'
    },
    question: {
      en: 'Was two-way transit traffic in the Bosphorus suspended for 24 consecutive hours or more at any point during August 2026?',
      zh: '2026 年 8 月期間，博斯普魯斯海峽的雙向通行是否曾連續暫停 24 小時或以上？'
    },
    resolves: {
      en: "Lloyd's List Intelligence, read against Turkish Straits traffic notices",
      zh: '勞氏情報，並對照土耳其海峽航行通告'
    },
    sourceTag: 'LLOYDSLIST',
    cadence: { en: 'Event-driven', zh: '事件觸發' },
    expiry: '2026-08-31',
    listed: '2026-06-05',
    price: 0.03,
    open: 0.12,
    vol24: 0,
    oi: 0,
    spread: 0.02,
    status: 'resolved',
    resolved: 'NO',
    unit: null,
    range: null,
    strike: null,
    tags: ['bosphorus', 'turkishstraits', 'transit', 'blacksea'],
    seed: 7684
  }

];
