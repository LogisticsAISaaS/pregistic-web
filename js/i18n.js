/* =========================================================================
   PREGISTIC — js/i18n.js
   UI chrome string dictionary. Data only, no DOM, no side effects.

   Attaches:  window.PG.strings
   Consumed by: PG.t('nav.markets') — dotted key lookup into this object.

   Every leaf is {en, zh}. zh is Traditional Chinese (繁體中文),
   Hong Kong / Taiwan vocabulary. Labels, not prose.

   Page copy lives in js/content.*.js. Contract text lives in js/contracts.js.
   ========================================================================= */

window.PG = window.PG || {};

window.PG.strings = {

  /* ---------------------------------------------------------------- brand */
  brand: {
    name:     { en: 'Pregistic',  zh: 'Pregistic' },
    tagline:  { en: 'The prediction market for global trade',
                zh: '全球貿易的預測市場' },
    strap:    { en: 'Freight rates, chokepoints, ports and tariffs — dated, priced, settleable.',
                zh: '運價、咽喉水道、港口與關稅——有到期日、有價格、可結算。' },
    company:  { en: 'Chainova Technology Limited', zh: 'Chainova Technology Limited' },
    domicile: { en: 'Hong Kong', zh: '香港' },
    domain:   { en: 'pregistic.com', zh: 'pregistic.com' },
    stage:    { en: 'Pre-launch · seed round', zh: '上線前 · 種子輪' }
  },

  /* ------------------------------------------------------------------ nav */
  nav: {
    home:          { en: 'Home',            zh: '首頁' },
    markets:       { en: 'Markets',         zh: '市場' },
    how:           { en: 'How it settles',  zh: '如何結算' },
    curve:         { en: 'The Curve',       zh: '價格曲線' },
    investors:     { en: 'Investors',       zh: '投資人' },
    about:         { en: 'About',           zh: '關於' },
    legal:         { en: 'Legal',           zh: '法律' },
    menu:          { en: 'Menu',            zh: '選單' },
    close:         { en: 'Close',           zh: '關閉' },
    language:      { en: 'Language',        zh: '語言' },
    langEn:        { en: 'English',         zh: 'English' },
    langZh:        { en: '繁體中文',         zh: '繁體中文' },
    theme:         { en: 'Theme',           zh: '主題' },
    themeLight:    { en: 'Light',           zh: '淺色' },
    themeDark:     { en: 'Dark',            zh: '深色' },
    skipToContent: { en: 'Skip to content', zh: '跳至主要內容' }
  },

  /* ------------------------------------------------------------------ cta */
  cta: {
    requestAccess:  { en: 'Request access',         zh: '申請使用權限' },
    viewBoard:      { en: 'View the board',         zh: '查看合約看板' },
    readDeck:       { en: 'Read the seed deck',     zh: '閱讀種子輪簡報' },
    contractSpec:   { en: 'Contract specification', zh: '合約規格' },
    backToBoard:    { en: 'Back to the board',      zh: '返回合約看板' },
    viewAll:        { en: 'View all',               zh: '查看全部' },
    learnMore:      { en: 'Read the detail',        zh: '閱讀詳情' },
    copyLink:       { en: 'Copy link',              zh: '複製連結' },
    copied:         { en: 'Copied',                 zh: '已複製' },
    download:       { en: 'Download',               zh: '下載' },
    submit:         { en: 'Submit',                 zh: '提交' },
    reset:          { en: 'Reset',                  zh: '重設' },
    clear:          { en: 'Clear',                  zh: '清除' },
    seeMethodology: { en: 'See methodology',        zh: '查看方法說明' }
  },

  /* ---------------------------------------------------------------- board */
  board: {
    title:             { en: 'Contract board', zh: '合約看板' },
    subtitle:          { en: '60+ contracts specified for launch, across four families.',
                         zh: '四大類別，逾 60 張合約已完成上線規格。' },
    search:            { en: 'Search', zh: '搜尋' },
    searchPlaceholder: { en: 'Ticker, contract, source', zh: '代號、合約或資料來源' },
    family:            { en: 'Family', zh: '類別' },
    allFamilies:       { en: 'All families', zh: '全部類別' },
    status:            { en: 'Status', zh: '狀態' },
    allStatuses:       { en: 'All statuses', zh: '全部狀態' },
    sort:              { en: 'Sort', zh: '排序' },
    sortVolume:        { en: '24h volume', zh: '24 小時成交額' },
    sortExpiry:        { en: 'Expiry', zh: '到期日' },
    sortMove:          { en: '30d move', zh: '30 日變動' },
    sortLiquidity:     { en: 'Liquidity', zh: '流動性' },
    sortAlpha:         { en: 'Ticker A–Z', zh: '代號 A–Z' },
    results:           { en: 'Results', zh: '結果' },
    noResults:         { en: 'No contracts match', zh: '沒有符合的合約' },
    noResultsHint:     { en: 'Clear a filter, or search by ticker or source.',
                         zh: '請清除篩選條件，或改以代號、資料來源搜尋。' },
    watchlist:         { en: 'Watchlist', zh: '自選清單' },
    watchlistEmpty:    { en: 'Nothing on the watchlist yet', zh: '自選清單尚無合約' },
    addWatch:          { en: 'Add to watchlist', zh: '加入自選' },
    removeWatch:       { en: 'Remove from watchlist', zh: '移出自選' },
    showing:           { en: 'Showing', zh: '顯示' },
    of:                { en: 'of', zh: '／共' },
    contracts:         { en: 'contracts', zh: '張合約' }
  },

  /* --------------------------------------------------------------- family */
  family: {
    freight:        { en: 'Freight rates', zh: '運價' },
    chokepoint:     { en: 'Chokepoints & ports', zh: '咽喉水道與港口' },
    policy:         { en: 'Trade policy', zh: '貿易政策' },
    air:            { en: 'Air & last mile', zh: '空運與末端配送' },
    freightDesc:    { en: 'Container, dry bulk and tanker benchmarks — WCI, XSI-C, SCFIS, FBX, BDI.',
                      zh: '貨櫃、乾散貨與油輪基準運價——WCI、XSI-C、SCFIS、FBX、BDI。' },
    chokepointDesc: { en: 'Canal drafts, transit counts, slot auctions, congestion and schedule reliability.',
                      zh: '運河吃水、通行艘次、船位拍賣、擁堵天數與船期準點率。' },
    policyDesc:     { en: 'Tariff actions and effective dates, export controls, review outcomes.',
                      zh: '關稅措施與生效日期、出口管制、審查結果。' },
    airDesc:        { en: 'Air cargo spot indices, peak-season surcharges, carrier on-time metrics.',
                      zh: '空運現貨指數、旺季附加費、航空公司準點指標。' },
    audienceFreight:    { en: 'Hedgers · carriers · analysts', zh: '對沖方 · 船公司 · 分析師' },
    audienceChokepoint: { en: 'Operators · insurers · traders', zh: '營運商 · 保險公司 · 交易員' },
    audiencePolicy:     { en: 'Importers · counsel · macro', zh: '進口商 · 法務 · 宏觀交易' },
    audienceAir:        { en: 'Forwarders · e-commerce', zh: '貨運承攬 · 電商' }
  },

  /* --------------------------------------------------------------- status */
  status: {
    live:       { en: 'Live', zh: '交易中' },
    closing:    { en: 'Closing', zh: '即將截止' },
    upcoming:   { en: 'Upcoming', zh: '待掛牌' },
    resolved:   { en: 'Resolved', zh: '已結算' },
    expiresIn:  { en: 'Expires in', zh: '距到期' },
    expired:    { en: 'Expired', zh: '已到期' },
    settledYes: { en: 'Settled YES', zh: '結算為 YES' },
    settledNo:  { en: 'Settled NO', zh: '結算為 NO' },
    daysLeft:   { en: 'days left', zh: '天' },
    today:      { en: 'Today', zh: '今日' }
  },

  /* ----------------------------------------------------------------- cols */
  cols: {
    contract:     { en: 'Contract', zh: '合約' },
    market:       { en: 'Market', zh: '市場' },
    price:        { en: 'Price', zh: '價格' },
    yes:          { en: 'YES', zh: 'YES' },
    no:           { en: 'NO', zh: 'NO' },
    change24h:    { en: '24h', zh: '24 小時' },
    change30d:    { en: '30d', zh: '30 日' },
    volume24h:    { en: '24h volume', zh: '24 小時成交額' },
    openInterest: { en: 'Open interest', zh: '未平倉金額' },
    spread:       { en: 'Spread', zh: '買賣價差' },
    expiry:       { en: 'Expiry', zh: '到期日' },
    source:       { en: 'Source', zh: '資料來源' },
    cadence:      { en: 'Cadence', zh: '發佈頻率' },
    status:       { en: 'Status', zh: '狀態' },
    size:         { en: 'Size', zh: '數量' },
    total:        { en: 'Total', zh: '累計' },
    bid:          { en: 'Bid', zh: '買價' },
    ask:          { en: 'Ask', zh: '賣價' },
    depth:        { en: 'Depth', zh: '深度' }
  },

  /* --------------------------------------------------------------- detail */
  detail: {
    question:            { en: 'Resolution question', zh: '結算問題' },
    resolution:          { en: 'Resolution', zh: '結算' },
    resolutionSource:    { en: 'Resolution source', zh: '結算資料來源' },
    specification:       { en: 'Specification', zh: '合約規格' },
    listed:              { en: 'Listed', zh: '掛牌日' },
    expires:             { en: 'Expires', zh: '到期日' },
    settlement:          { en: 'Settlement', zh: '結算方式' },
    tieBreak:            { en: 'Tie-break', zh: '平手裁定' },
    orderBook:           { en: 'Order book', zh: '委託簿' },
    priceHistory:        { en: 'Price history', zh: '價格走勢' },
    tradeTicket:         { en: 'Trade ticket', zh: '下單面板' },
    relatedContracts:    { en: 'Related contracts', zh: '相關合約' },
    aboutThisMarket:     { en: 'About this market', zh: '關於此市場' },
    rulebook:            { en: 'Rulebook', zh: '規則手冊' },
    challengeWindow:     { en: 'Challenge window', zh: '異議期' },
    range30d:            { en: '30-day range', zh: '30 日區間' },
    impliedProbability:  { en: 'Implied probability', zh: '市場隱含機率' },
    threshold:           { en: 'Threshold', zh: '結算門檻' },
    unit:                { en: 'Unit', zh: '計價單位' },
    settlementWindow:    { en: 'T+1 settlement window', zh: 'T+1 結算窗口' },
    thresholdNote:       { en: 'Thresholds are indicative and re-struck at listing.',
                           zh: '門檻為指示性數值，掛牌時重新訂定。' }
  },

  /* --------------------------------------------------------------- ticket */
  ticket: {
    side:              { en: 'Side', zh: '方向' },
    buyYes:            { en: 'Buy YES', zh: '買入 YES' },
    buyNo:             { en: 'Buy NO', zh: '買入 NO' },
    amount:            { en: 'Amount (US$)', zh: '金額（美元）' },
    shares:            { en: 'Contracts', zh: '合約張數' },
    avgPrice:          { en: 'Average price', zh: '平均成交價' },
    maxPayout:         { en: 'Max payout', zh: '最高給付' },
    profitIfRight:     { en: 'Profit if right', zh: '判斷正確之收益' },
    costBasis:         { en: 'Cost', zh: '成本' },
    place:             { en: 'Place paper trade', zh: '送出模擬單' },
    placed:            { en: 'Paper trade recorded', zh: '模擬單已記錄' },
    paperOnly:         { en: 'Paper only', zh: '僅供模擬' },
    insufficientDepth: { en: 'Not enough depth in the demo book', zh: '示範委託簿深度不足' },
    minAmount:         { en: 'Minimum US$1', zh: '最低 1 美元' },
    positions:         { en: 'Paper positions', zh: '模擬持倉' },
    noPositions:       { en: 'No paper positions yet', zh: '尚無模擬持倉' },
    position:          { en: 'Position', zh: '持倉' },
    entry:             { en: 'Entry', zh: '進場價' },
    current:           { en: 'Current', zh: '現價' },
    pnl:               { en: 'P&L', zh: '損益' },
    closePosition:     { en: 'Close position', zh: '平倉' },
    clearAll:          { en: 'Clear all', zh: '全部清除' },
    clearedAll:        { en: 'Paper positions cleared', zh: '模擬持倉已清除' },
    slippage:          { en: 'Slippage', zh: '滑價' }
  },

  /* ----------------------------------------------------------------- demo */
  demo: {
    badge:  { en: 'DEMO BOOK', zh: 'DEMO BOOK · 示範' },
    notice: { en: 'Every price, book and volume on this site is simulated demonstration data: Pregistic is pre-launch, nothing here is a live market, and nothing here is an offer.',
              zh: '本網站所有價格、委託簿與成交量均為模擬示範數據：Pregistic 尚未上線，此處並非實際交易市場，亦不構成任何要約。' },
    paperNotice: { en: 'The ticket is paper only. Positions stay in your own browser and are never sent anywhere.',
                   zh: '下單面板僅供模擬。持倉只存放於你自己的瀏覽器，不會傳送至任何地方。' },
    short:  { en: 'Simulated data', zh: '模擬數據' }
  },

  /* ---------------------------------------------------------------- chart */
  chart: {
    days7:       { en: '7D', zh: '7 日' },
    days30:      { en: '30D', zh: '30 日' },
    days90:      { en: '90D', zh: '90 日' },
    all:         { en: 'All', zh: '全部' },
    probability: { en: 'Probability', zh: '機率' },
    price:       { en: 'Price', zh: '價格' },
    date:        { en: 'Date', zh: '日期' }
  },

  /* ---------------------------------------------------------------- model */
  model: {
    title:         { en: 'Diligence model', zh: '盡職調查模型' },
    lede:          { en: 'Move the assumptions. The deck base case is the starting position.',
                     zh: '可自行調整假設，起始值為簡報的基準情境。' },
    reset:         { en: 'Reset assumptions', zh: '重設假設' },
    presets:       { en: 'Presets', zh: '預設情境' },
    presetBase:    { en: 'Base case · hedger-led', zh: '基準情境 · 對沖需求主導' },
    presetUpside:  { en: 'Upside case · flow-led', zh: '上行情境 · 交易流主導' },
    presetWeather: { en: 'Weather anchor · 0.5%', zh: '天氣衍生品錨點 · 0.5%' },
    presetEarly:   { en: 'Early commodity · 5%', zh: '早期商品錨點 · 5%' },
    presetMature:  { en: 'Mature commodity · 15%', zh: '成熟商品錨點 · 15%' },
    presetFx:      { en: 'Corporate FX · 45%', zh: '企業外匯錨點 · 45%' },
    exposureBase:  { en: 'Hedgeable exposure base', zh: '可對沖敞口基數' },
    penetration:   { en: 'Penetration', zh: '滲透率' },
    notional:      { en: 'Notional', zh: '名目金額' },
    matched:       { en: 'Matched notional', zh: '撮合名目金額' },
    takeRate:      { en: 'Blended take rate', zh: '綜合抽成率' },
    grossFees:     { en: 'Gross trading fees', zh: '交易費收入（毛額）' },
    infraShare:    { en: 'Infrastructure share', zh: '基礎設施分成' },
    netTrading:    { en: 'Net trading revenue', zh: '交易淨收入' },
    dataRevenue:   { en: 'Data, index & API', zh: '數據、指數與 API' },
    totalNet:      { en: 'Total net revenue', zh: '淨收入合計' },
    feePool:       { en: 'Fee pool', zh: '費用池' },
    samShare:      { en: 'Share of pool captured', zh: '取得之費用池份額' },
    sam:           { en: 'SAM at this anchor', zh: '此錨點下的 SAM' },
    accounts:      { en: 'Active accounts implied', zh: '隱含活躍帳戶數' },
    perAccount:    { en: 'Annual notional per account', zh: '每帳戶年名目金額' },
    dataSeats:     { en: 'Enterprise data seats', zh: '企業數據席位' },
    seatPrice:     { en: 'Revenue per seat', zh: '每席位收入' },
    year1:         { en: 'YR 1 · 2027', zh: '第 1 年 · 2027' },
    year2:         { en: 'YR 2 · 2028', zh: '第 2 年 · 2028' },
    year3:         { en: 'YR 3 · 2029', zh: '第 3 年 · 2029' },
    assumptions:   { en: 'Assumptions', zh: '假設' },
    output:        { en: 'Output', zh: '結果' },
    note:          { en: 'Anchors and the 1.1% implied take rate are from the seed deck. Treat the fee pool as ±30%. Constructed inputs stay marked.',
                     zh: '各錨點與 1.1% 隱含抽成率取自種子輪簡報；費用池應視為 ±30% 區間；推算而得的輸入值均已標示。' }
  },

  /* ----------------------------------------------------------------- form */
  form: {
    name:         { en: 'Name', zh: '姓名' },
    email:        { en: 'Email', zh: '電郵地址' },
    company:      { en: 'Company', zh: '公司' },
    role:         { en: 'Role', zh: '身分' },
    jurisdiction: { en: 'Jurisdiction', zh: '所在司法管轄區' },
    interest:     { en: 'What you would trade or hedge', zh: '你會交易或對沖的標的' },
    message:      { en: 'Message', zh: '訊息' },
    required:     { en: 'Required', zh: '必填' },
    invalidEmail: { en: 'Enter a valid email address', zh: '請輸入有效的電郵地址' },
    composeEmail: { en: 'Compose email', zh: '撰寫電郵' },
    copyDetails:  { en: 'Copy details', zh: '複製內容' },
    formNote:     { en: 'This page sends nothing. It opens a pre-filled message in your own mail client.',
                    zh: '本頁不會傳送任何資料，只會在你自己的郵件程式中開啟已填好的訊息。' },
    selectOne:    { en: 'Select one', zh: '請選擇' },
    optional:     { en: 'Optional', zh: '選填' }
  },

  /* --------------------------------------------------------------- footer */
  footer: {
    product:      { en: 'Product', zh: '產品' },
    company:      { en: 'Company', zh: '公司' },
    legal:        { en: 'Legal', zh: '法律' },
    contact:      { en: 'Contact', zh: '聯絡' },
    rights:       { en: 'All rights reserved.', zh: '版權所有。' },
    confidential: { en: 'Seed materials · confidential', zh: '種子輪資料 · 機密' },
    builtBy:      { en: 'Built by Chainova Technology Limited on DEXBuilder (Gate Labs) infrastructure.',
                    zh: '由 Chainova Technology Limited 建設，採用 DEXBuilder（Gate Labs）基礎設施。' },
    disclaimer:   { en: 'Pre-launch. Not an offer of securities and not investment advice.',
                    zh: '尚未上線。本網站不構成證券要約，亦非投資建議。' }
  },

  /* ----------------------------------------------------------------- misc */
  misc: {
    loading:      { en: 'Loading', zh: '載入中' },
    error:        { en: 'Something went wrong', zh: '發生錯誤' },
    notFound:     { en: 'Page not found', zh: '找不到頁面' },
    notFoundHint: { en: 'The link may be out of date. Start from the contract board.',
                    zh: '連結可能已失效，請從合約看板開始。' },
    updated:      { en: 'Updated', zh: '更新於' },
    asOf:         { en: 'As of', zh: '截至' },
    source:       { en: 'Source', zh: '來源' },
    sources:      { en: 'Sources', zh: '來源' },
    note:         { en: 'Note', zh: '註' },
    simulated:    { en: 'Simulated', zh: '模擬' },
    constructed:  { en: 'CONSTRUCTED', zh: '推算值' },
    sourced:      { en: 'SOURCED', zh: '引用來源' },
    comingSoon:   { en: 'Specified, not yet listed', zh: '已完成規格，尚未掛牌' },
    page404:      { en: '404', zh: '404' },
    today:        { en: '14 September 2026', zh: '2026 年 9 月 14 日' },
    allFourFamilies: { en: 'All four families', zh: '四大類別' }
  },

  /* ---------------------------------------------------------------- roles */
  roles: {
    shipper:   { en: 'Shipper / BCO', zh: '貨主 / BCO' },
    forwarder: { en: 'Freight forwarder / NVOCC', zh: '貨運承攬 / NVOCC' },
    threepl:   { en: '3PL', zh: '第三方物流（3PL）' },
    carrier:   { en: 'Carrier / operator', zh: '船公司 / 營運商' },
    broker:    { en: 'Broker', zh: '經紀商' },
    trader:    { en: 'Trader', zh: '交易員' },
    insurer:   { en: 'Insurer', zh: '保險公司' },
    analyst:   { en: 'Analyst', zh: '分析師' },
    investor:  { en: 'Investor', zh: '投資人' },
    press:     { en: 'Press', zh: '媒體' },
    other:     { en: 'Other', zh: '其他' }
  },

  /* -------------------------------------------------------- jurisdictions */
  jurisdictions: {
    hongKong:       { en: 'Hong Kong', zh: '香港' },
    mainlandChina:  { en: 'Mainland China', zh: '中國內地' },
    singapore:      { en: 'Singapore', zh: '新加坡' },
    japan:          { en: 'Japan', zh: '日本' },
    southKorea:     { en: 'South Korea', zh: '南韓' },
    southeastAsia:  { en: 'Southeast Asia', zh: '東南亞' },
    india:          { en: 'India', zh: '印度' },
    middleEast:     { en: 'Middle East', zh: '中東' },
    europeanUnion:  { en: 'European Union', zh: '歐盟' },
    unitedKingdom:  { en: 'United Kingdom', zh: '英國' },
    unitedStates:   { en: 'United States', zh: '美國' },
    latinAmerica:   { en: 'Latin America', zh: '拉丁美洲' },
    africa:         { en: 'Africa', zh: '非洲' },
    other:          { en: 'Other', zh: '其他' }
  }

};
