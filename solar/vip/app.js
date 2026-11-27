/* =========================================================
   Industrial Solar & Irrigation Grid — VIP Tier ($250)
   app.js
   ========================================================= */

'use strict';

const SOLAR_CONFIG = {
  whatsappNumber: '967782259937',
  businessName: 'الشمس للطاقة المتجددة',
  tagline: 'توريد وتركيب في صنعاء وعموم المحافظات',
  phone: '0782259937',
  tierLabel: 'الفئة الملكية VIP',
  pshYemen: 6.5,
  panelWatts: 550,
  systemEfficiency: 0.78,
};

const SOLAR_DATA = {
  stats: [
    { value: '+350', label: 'منظومة مركّبة' },
    { value: '+800', label: 'كيلو واط مثبّتة' },
    { value: '5', label: 'سنوات كفالة' },
    { value: '12', label: 'محافظة مغطّاة' },
  ],

  packages: [
    {
      id: 'home-small',
      code: 'SOL-1K',
      category: 'residential',
      tag: 'الأكثر طلباً',
      name: 'منظومة المنزل الصغير',
      subtitle: 'تكفي للإنارة والمراوح والشاحن',
      watts: '1 كيلو واط',
      specs: [
        { icon: 'panel', text: 'لوحان شمسيان 500 واط' },
        { icon: 'inverter', text: 'انفرتر 1 كيلو واط' },
        { icon: 'battery', text: 'بطارية 100 أمبير' },
        { icon: 'cable', text: 'أسلاك وحوامل كاملة' },
        { icon: 'warranty', text: 'كفالة 5 سنوات على الألواح' },
      ],
      boqPreset: {
        mode: 'factory',
        panels: 2,
        panelWatt: 500,
        inverterKw: 1,
        inverterLabel: 'انفرتر هايبريد 1 kW MPPT (12V)',
        storageKwh: 1.2,
        batteryLabel: 'بطارية تخزين 100Ah / 12V عميقة التفريغ',
        hasPump: false,
        wellDepth: 0,
      },
    },
    {
      id: 'home-medium',
      code: 'SOL-3K',
      category: 'residential',
      tag: null,
      name: 'منظومة البيت المتوسط',
      subtitle: 'تشغّل الثلاجة والتلفاز والإنارة',
      watts: '2–3 كيلو واط',
      specs: [
        { icon: 'panel', text: '4 ألواح شمسية 500 واط' },
        { icon: 'inverter', text: 'انفرتر 3 كيلو واط هايبريد' },
        { icon: 'battery', text: 'بطاريتان 200 أمبير' },
        { icon: 'cable', text: 'أسلاك ولوحة تحكم' },
        { icon: 'warranty', text: 'كفالة 5 سنوات' },
      ],
      boqPreset: {
        mode: 'factory',
        panels: 4,
        panelWatt: 500,
        inverterKw: 3,
        inverterLabel: 'انفرتر هايبريد 3 kW MPPT (24V)',
        storageKwh: 4.8,
        batteryLabel: 'بطاريتان 200Ah (24V) أو ما يعادلها LiFePO4',
        hasPump: false,
        wellDepth: 0,
      },
    },
    {
      id: 'villa',
      code: 'SOL-10K',
      category: 'residential',
      tag: 'مناسبة للفيلا',
      name: 'منظومة الفيلا والمجمع',
      subtitle: 'مكيفات + أجهزة كهربائية كاملة',
      watts: '5–10 كيلو واط',
      specs: [
        { icon: 'panel', text: '10–20 لوح شمسي' },
        { icon: 'inverter', text: 'انفرتر 10 كيلو واط ثلاثي' },
        { icon: 'battery', text: 'بنك بطاريات 400–800 أمبير' },
        { icon: 'cable', text: 'نظام مراقبة ذكي' },
        { icon: 'warranty', text: 'كفالة 5 سنوات + صيانة سنوية' },
      ],
      boqPreset: {
        mode: 'factory',
        panels: 16,
        panelWatt: 550,
        inverterKw: 10,
        inverterLabel: 'انفرتر هايبريد ثلاثي الطور 10 kW MPPT مع مراقبة ذكية',
        storageKwh: 15,
        batteryLabel: 'بنك بطاريات LiFePO4 48V (سعة 15 kWh / 300Ah) أو 400–800Ah',
        hasPump: false,
        wellDepth: 0,
      },
    },
    {
      id: 'pump',
      code: 'AGRI-VFD',
      category: 'agricultural',
      tag: 'للأراضي الزراعية',
      name: 'غطاسة زراعية شمسية',
      subtitle: 'ري الآبار والأراضي بدون ديزل',
      watts: '1–5 حصان',
      specs: [
        { icon: 'panel', text: '4–12 لوح شمسي حسب الغطاسة' },
        { icon: 'pump', text: 'غطاسة شمسية مباشرة' },
        { icon: 'controller', text: 'وحدة تحكم MPPT' },
        { icon: 'pipe', text: 'مواسير ووصلات حسب العمق' },
        { icon: 'warranty', text: 'كفالة 3 سنوات على الغطاسة' },
      ],
      boqPreset: {
        mode: 'well',
        panels: 12,
        panelWatt: 550,
        inverterKw: 5.5,
        inverterLabel: 'وحدة تحكم وضخ VFD MPPT بقدرة 5.5 kW مع غطاسة زراعية',
        storageKwh: 5,
        batteryLabel: 'تشغيل نهاري مباشر (مع خيار بنك بطاريات LiFePO4 مساند)',
        hasPump: true,
        wellDepth: 110,
      },
    },
    {
      id: 'commercial',
      code: 'COM-15K',
      category: 'commercial',
      tag: null,
      name: 'المنظومة التجارية',
      subtitle: 'بقالة، محل، مطعم، ورشة',
      watts: '3–15 كيلو واط',
      specs: [
        { icon: 'panel', text: '6–30 لوح شمسي حسب الحمل' },
        { icon: 'inverter', text: 'انفرتر هايبريد تجاري' },
        { icon: 'battery', text: 'بنك بطاريات احتياطي' },
        { icon: 'meter', text: 'عداد إنتاج وشاشة مراقبة' },
        { icon: 'warranty', text: 'كفالة شاملة + عقد صيانة' },
      ],
      boqPreset: {
        mode: 'factory',
        panels: 24,
        panelWatt: 550,
        inverterKw: 15,
        inverterLabel: 'انفرتر هايبريد تجاري ثلاثي الطور 15 kW مع شاشة وعداد إنتاج',
        storageKwh: 20,
        batteryLabel: 'بنك بطاريات احتياطي LiFePO4 48V (20 kWh)',
        hasPump: false,
        wellDepth: 0,
      },
    },
  ],

  reasons: [
    {
      icon: 'power-cut',
      title: 'انقطاع الكهرباء',
      desc: 'لا تعتمد على الشبكة. منظومتك تعمل 24 ساعة حتى في أحلك الأوقات.',
    },
    {
      icon: 'diesel',
      title: 'وداع تكلفة الديزل',
      desc: 'وفّر 70-90% من فاتورة المولّد الشهرية من أول شهر تشغيل.',
    },
    {
      icon: 'sun',
      title: 'اليمن يمتلك أفضل إشعاع شمسي',
      desc: 'معدل إشعاع شمسي 6.5 ساعة يومياً — من أعلى المعدلات في العالم.',
    },
  ],

  process: [
    {
      step: '01',
      title: 'تقييم مجاني',
      desc: 'نزور موقعك ونحسب احتياجاتك الفعلية من الطاقة بدون تكلفة.',
    },
    {
      step: '02',
      title: 'تصميم المنظومة',
      desc: 'نصمم منظومة تناسب حمل منزلك أو منشأتك بدقة هندسية.',
    },
    {
      step: '03',
      title: 'التركيب الاحترافي',
      desc: 'فريق معتمد يركب الألواح والانفرتر والبطاريات في يوم واحد.',
    },
    {
      step: '04',
      title: 'تشغيل وتسليم',
      desc: 'نشغّل المنظومة، نختبرها، ونسلّمك دليل الاستخدام والكفالة.',
    },
  ],

  faqs: [
    {
      q: 'كم يستغرق تركيب المنظومة؟',
      a: 'تُركَّب المنظومات الصغيرة والمتوسطة في يوم واحد. المنظومات الكبيرة قد تستغرق 2–3 أيام.',
    },
    {
      q: 'هل تعمل الألواح في الغيوم والسحب؟',
      a: 'نعم، تعمل بكفاءة 20-30% في الغيوم، والبطارية تحتفظ بالطاقة ليلاً.',
    },
    {
      q: 'ما نوع الألواح الشمسية التي تستخدمون؟',
      a: 'نستخدم ألواح Mono PERC عالية الكفاءة من شركات صينية معتمدة (Jinko، LONGi) وأخرى.',
    },
    {
      q: 'هل تشمل الأسعار التركيب؟',
      a: 'نعم، الأسعار شاملة التركيب الكامل، الأسلاك، الحوامل، والاختبار. بدون رسوم خفية.',
    },
    {
      q: 'هل تصلون إلى المحافظات خارج صنعاء؟',
      a: 'نعم، نغطي 12 محافظة يمنية. تواصل معنا لتحديد تكلفة الوصول لمحافظتك.',
    },
  ],
};

/* ---- Strictly Linear SVG Icon Map ----------------------- */
const ICONS = {
  panel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
  inverter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="8" width="16" height="10" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><circle cx="12" cy="13" r="2"/></svg>',
  battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="18" height="11" rx="2"/><path d="M22 11v3"/><line x1="6" y1="12" x2="12" y2="12"/></svg>',
  cable: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>',
  warranty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  pump: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20"/><path d="M2 12h20"/><circle cx="12" cy="12" r="4"/></svg>',
  controller: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><circle cx="8.5" cy="10" r="1.5"/><polyline points="12.5 10 15.5 7 18.5 10"/></svg>',
  pipe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/></svg>',
  meter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  'power-cut': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18.36 6.64A9 9 0 0 1 5.64 19.36"/><path d="M6.6 6.6A9 9 0 0 1 19.4 19.4"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
  diesel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  chevron: '<svg class="v-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
};

function getIcon(name) {
  return ICONS[name] || '';
}

function buildWaUrl(message) {
  return `https://wa.me/${SOLAR_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* ---- Currency Configuration & Formatters ---------------- */
const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1, minPrice: 0.7, maxPrice: 1.8, step: 0.05, decimals: 2 },
  SAR: { code: 'SAR', symbol: 'ر.س', rate: 3.75, minPrice: 2.6, maxPrice: 6.75, step: 0.15, decimals: 2 },
  YER: { code: 'YER', symbol: 'ر.ي', rate: 535, minPrice: 380, maxPrice: 960, step: 20, decimals: 0 },
};

function formatCurrency(usdAmount, currencyKey) {
  const cur = CURRENCIES[currencyKey] || CURRENCIES.USD;
  const converted = Math.round(usdAmount * cur.rate);
  const formatted = new Intl.NumberFormat('en-US').format(converted);
  return currencyKey === 'USD' ? `$${formatted}` : `${formatted} ${cur.symbol}`;
}

function formatUnitPrice(usdPrice, currencyKey) {
  const cur = CURRENCIES[currencyKey] || CURRENCIES.USD;
  const val = usdPrice * cur.rate;
  const fixed = cur.decimals === 0 ? Math.round(val).toString() : val.toFixed(cur.decimals);
  return currencyKey === 'USD' ? `$${fixed}` : `${fixed} ${cur.symbol}`;
}

/* ---- Simulator & BOQ State ------------------------------ */
const vipState = {
  mode: 'well',
  currency: 'USD',
  wellDepth: 120,
  pumpHp: 5,
  factoryKw: 15,
  dailyHours: 7,
  dieselLiters: 320,
  dieselPriceUsd: 1.15,
  includeMaint: true,
  autoSyncDiesel: true,
  activePkgFilter: 'all',
  boqSource: 'sim',
  boqPackageId: null,
  boqStorageMode: 'direct',
  lastRoi: null,
  lastBoq: null,
};

/* ---- ROI Physics & Financial Engine --------------------- */
function estimateSuggestedLiters(loadKw, dailyHours) {
  const liters = Math.round((loadKw * dailyHours * 30 * 0.31) / 20) * 20;
  return Math.max(120, Math.min(6000, liters));
}

function calculateRoiModel() {
  const isWell = vipState.mode === 'well';
  const loadKw = isWell ? vipState.pumpHp * 0.85 : vipState.factoryKw;
  const depthHeadroom = isWell ? 1 + Math.max(0, vipState.wellDepth - 80) * 0.0008 : 1;
  const effectiveLoadKw = loadKw * depthHeadroom;
  const dailyKwh = effectiveLoadKw * vipState.dailyHours;

  // Panel count using Yemen 6.5h irradiance & 78% efficiency
  const whPerPanel = SOLAR_CONFIG.panelWatts * SOLAR_CONFIG.pshYemen * SOLAR_CONFIG.systemEfficiency;
  const panelsCount = Math.max(4, Math.ceil((dailyKwh * 1000) / whPerPanel));

  // Inverter / VFD Drive sizing
  let driveKw = 5.5;
  if (isWell) {
    const vfdSizes = [2.2, 4, 5.5, 7.5, 11, 15, 18.5, 22, 30];
    driveKw = vfdSizes.find((s) => s >= loadKw * 1.35) || Math.ceil(loadKw * 1.35);
  } else {
    const invSizes = [5, 8, 10, 12, 15, 20, 30, 40, 50, 60];
    driveKw = invSizes.find((s) => s >= loadKw * 1.25) || Math.ceil(loadKw * 1.25);
  }

  // Storage capacity (when hybrid mode applies)
  const defaultHybrid = !isWell;
  const storageKwh = defaultHybrid ? Math.max(5, Math.ceil((dailyKwh * 0.35) / 5) * 5) : 0;

  // Capex Estimate in USD (aligned 1:1 with BOQ line items)
  const panelsCost = panelsCount * 125;
  const driveCost = Math.round(isWell ? 240 + driveKw * 88 : 380 + driveKw * 135);
  const batteryCost = storageKwh * 235;
  const protectionCost = Math.round(180 + panelsCount * 8);
  const mountingCablesCost = Math.round(160 + panelsCount * 24 + (isWell ? vipState.wellDepth * 2.1 : 0));
  const installCost = Math.round(240 + panelsCount * 18);
  const capexUsd = panelsCost + driveCost + batteryCost + protectionCost + mountingCablesCost + installCost;

  // Diesel monthly baseline vs Solar residual/cleaning cost
  const monthlyFuelUsd = vipState.dieselLiters * vipState.dieselPriceUsd;
  const monthlyDieselTotalUsd = vipState.includeMaint ? monthlyFuelUsd * 1.15 : monthlyFuelUsd;
  const solarMonthlyMaintUsd = 14 + panelsCount * 0.6;
  const dieselReplaceRatio = 0.88; // 88% diesel elimination within 70-90% official claim

  const monthlyNetSaveUsd = Math.max(0, monthlyDieselTotalUsd * dieselReplaceRatio - solarMonthlyMaintUsd);
  const annualNetSaveUsd = monthlyNetSaveUsd * 12;
  const fiveYearGrossSaveUsd = monthlyNetSaveUsd * 60;
  const fiveYearNetProfitUsd = fiveYearGrossSaveUsd - capexUsd;

  const paybackMonths =
    monthlyNetSaveUsd > 10 ? Math.max(4, Math.round(capexUsd / monthlyNetSaveUsd)) : 999;

  // 61 monthly cashflow points (month 0 to 60)
  const series = [];
  for (let m = 0; m <= 60; m += 1) {
    const dieselCum = m * monthlyDieselTotalUsd;
    const solarCum = capexUsd + m * (monthlyDieselTotalUsd * (1 - dieselReplaceRatio) + solarMonthlyMaintUsd);
    const netProfit = Math.max(0, dieselCum - solarCum);
    series.push({ m, dieselCum, solarCum, netProfit });
  }

  return {
    isWell,
    loadKw,
    dailyKwh,
    panelsCount,
    driveKw,
    storageKwh,
    capexUsd,
    monthlyDieselTotalUsd,
    monthlyNetSaveUsd,
    annualNetSaveUsd,
    fiveYearNetProfitUsd,
    paybackMonths,
    series,
  };
}

/* ---- Render Linear Inline SVG ROI Chart ----------------- */
function renderRoiChart(roi) {
  const svg = document.getElementById('roiChartSvg');
  if (!svg) return;

  const width = 720;
  const height = 300;
  const pad = { left: 74, right: 24, top: 24, bottom: 40 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const maxDiesel = roi.series[60].dieselCum;
  const maxSolar = roi.series[60].solarCum;
  const maxY = Math.max(maxDiesel, maxSolar, roi.capexUsd * 1.15, 5000);

  const xAt = (month) => pad.left + (month / 60) * plotW;
  const yAt = (val) => pad.top + plotH - (Math.min(val, maxY) / maxY) * plotH;

  let parts = [];

  // Horizontal gridlines + Y labels
  for (let i = 0; i <= 4; i += 1) {
    const ratio = i / 4;
    const val = maxY * ratio;
    const y = yAt(val).toFixed(1);
    parts.push(
      `<line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="rgba(241,245,249,0.10)" stroke-width="1" stroke-dasharray="4 4"/>`
    );
    parts.push(
      `<text x="${pad.left - 8}" y="${Number(y) + 4}" text-anchor="end" fill="#8FA3B8" font-family="Outfit, sans-serif" font-size="11">${formatCurrency(
        val,
        vipState.currency
      )}</text>`
    );
  }

  // X axis baseline + year ticks
  parts.push(
    `<line x1="${pad.left}" y1="${pad.top + plotH}" x2="${width - pad.right}" y2="${pad.top + plotH}" stroke="rgba(241,245,249,0.22)" stroke-width="1.2"/>`
  );
  for (let yr = 0; yr <= 5; yr += 1) {
    const m = yr * 12;
    const x = xAt(m).toFixed(1);
    parts.push(
      `<line x1="${x}" y1="${pad.top + plotH}" x2="${x}" y2="${pad.top + plotH + 5}" stroke="rgba(241,245,249,0.3)" stroke-width="1.2"/>`
    );
    parts.push(
      `<text x="${x}" y="${height - 14}" text-anchor="middle" fill="#CBD5E1" font-family="Tajawal, sans-serif" font-size="11.5">${
        yr === 0 ? 'البداية' : 'سنة ' + yr
      }</text>`
    );
  }

  // Build Polylines
  const dieselPts = roi.series.map((p) => `${xAt(p.m).toFixed(1)},${yAt(p.dieselCum).toFixed(1)}`).join(' ');
  const solarPts = roi.series.map((p) => `${xAt(p.m).toFixed(1)},${yAt(p.solarCum).toFixed(1)}`).join(' ');
  const netPts = roi.series.map((p) => `${xAt(p.m).toFixed(1)},${yAt(p.netProfit).toFixed(1)}`).join(' ');

  parts.push(
    `<polyline points="${dieselPts}" fill="none" stroke="#F87171" stroke-width="2.4" stroke-dasharray="6 4" stroke-linecap="round" stroke-linejoin="round"/>`
  );
  parts.push(
    `<polyline points="${solarPts}" fill="none" stroke="#F5B82E" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`
  );
  parts.push(
    `<polyline points="${netPts}" fill="none" stroke="#2DD4BF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`
  );

  // Break-even marker when payback <= 60 months
  if (roi.paybackMonths <= 60) {
    const bx = xAt(roi.paybackMonths);
    const bVal = roi.series[roi.paybackMonths] ? roi.series[roi.paybackMonths].dieselCum : roi.capexUsd;
    const by = yAt(bVal);

    parts.push(
      `<line x1="${bx.toFixed(1)}" y1="${pad.top}" x2="${bx.toFixed(1)}" y2="${pad.top + plotH}" stroke="rgba(245,184,46,0.45)" stroke-width="1.2" stroke-dasharray="3 3"/>`
    );
    parts.push(
      `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="7" fill="none" stroke="#F5B82E" stroke-width="1.8"/>`
    );
    parts.push(
      `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="3" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>`
    );

    const labelAnchor = roi.paybackMonths > 44 ? 'end' : 'start';
    const labelDx = roi.paybackMonths > 44 ? -10 : 10;
    parts.push(
      `<text x="${(bx + labelDx).toFixed(1)}" y="${Math.max(pad.top + 14, by - 10).toFixed(1)}" text-anchor="${labelAnchor}" fill="#FFD466" font-family="Tajawal, sans-serif" font-size="12" font-weight="700">نقطة التعادل: شهر ${
        roi.paybackMonths
      }</text>`
    );
  }

  // Year 5 End Nodes
  const endDiesel = roi.series[60];
  parts.push(
    `<circle cx="${xAt(60).toFixed(1)}" cy="${yAt(endDiesel.dieselCum).toFixed(1)}" r="4" fill="none" stroke="#F87171" stroke-width="2"/>`
  );
  parts.push(
    `<circle cx="${xAt(60).toFixed(1)}" cy="${yAt(endDiesel.netProfit).toFixed(1)}" r="4" fill="none" stroke="#2DD4BF" stroke-width="2"/>`
  );

  svg.innerHTML = parts.join('');
}

/* ---- Update ROI UI -------------------------------------- */
function updateRoiUI() {
  const roi = calculateRoiModel();
  vipState.lastRoi = roi;

  const cur = CURRENCIES[vipState.currency] || CURRENCIES.USD;

  // Readout tags
  const wellDepthVal = document.getElementById('wellDepthValue');
  const pumpPowerVal = document.getElementById('pumpPowerValue');
  const factoryKwVal = document.getElementById('factoryKwValue');
  const dailyHoursVal = document.getElementById('dailyHoursValue');
  const dieselLitersVal = document.getElementById('dieselLitersValue');
  const dieselPriceVal = document.getElementById('dieselPriceValue');

  if (wellDepthVal) wellDepthVal.textContent = `${vipState.wellDepth} m`;
  if (pumpPowerVal) pumpPowerVal.textContent = `${vipState.pumpHp} HP (${(vipState.pumpHp * 0.85).toFixed(1)} kW)`;
  if (factoryKwVal) factoryKwVal.textContent = `${vipState.factoryKw} kW`;
  if (dailyHoursVal) dailyHoursVal.textContent = `${vipState.dailyHours} ساعات / يوم`;
  if (dieselLitersVal) dieselLitersVal.textContent = `${new Intl.NumberFormat('en-US').format(vipState.dieselLiters)} لتر / شهر`;
  if (dieselPriceVal) dieselPriceVal.textContent = `${formatUnitPrice(vipState.dieselPriceUsd, vipState.currency)} / لتر`;

  // KPI cards
  const mSaveEl = document.getElementById('roiMonthlySave');
  const mNoteEl = document.getElementById('roiMonthlyDieselNote');
  const aSaveEl = document.getElementById('roiAnnualSave');
  const fySaveEl = document.getElementById('roiFiveYearSave');
  const roiPctEl = document.getElementById('roiRoiPercent');
  const paybackEl = document.getElementById('roiPaybackMonths');
  const capexEl = document.getElementById('roiCapexEstimate');

  if (mSaveEl) mSaveEl.textContent = formatCurrency(roi.monthlyNetSaveUsd, vipState.currency);
  if (mNoteEl) {
    mNoteEl.textContent = `مقابل فاتورة ديزل شهرية ${formatCurrency(roi.monthlyDieselTotalUsd, vipState.currency)}`;
  }
  if (aSaveEl) aSaveEl.textContent = formatCurrency(roi.annualNetSaveUsd, vipState.currency);
  if (fySaveEl) {
    fySaveEl.textContent =
      roi.fiveYearNetProfitUsd >= 0
        ? formatCurrency(roi.fiveYearNetProfitUsd, vipState.currency)
        : '-' + formatCurrency(Math.abs(roi.fiveYearNetProfitUsd), vipState.currency);
  }
  if (roiPctEl) {
    const pct = roi.capexUsd > 0 ? Math.round((roi.fiveYearNetProfitUsd / roi.capexUsd) * 100) : 0;
    roiPctEl.textContent = pct > 0 ? `عائد صافي +${pct}% بعد استرداد رأس المال` : 'عدّل استهلاك الديزل لحساب العائد';
  }
  if (paybackEl) {
    paybackEl.textContent = roi.paybackMonths <= 60 ? `${roi.paybackMonths} شهراً` : 'أكثر من 60 شهراً';
  }
  if (capexEl) {
    capexEl.textContent = `الاستثمار التقديري (${cur.code}): ${formatCurrency(roi.capexUsd, vipState.currency)}`;
  }

  // System summary strip under chart
  const strip = document.getElementById('roiSystemSummaryStrip');
  if (strip) {
    strip.innerHTML = `
      <span class="rec-chip">الألواح 550W: <strong>${roi.panelsCount} لوح</strong></span>
      <span class="rec-chip">${roi.isWell ? 'مغير سرعة VFD:' : 'انفرتر ثلاثي:'} <strong>${roi.driveKw} kW</strong></span>
      <span class="rec-chip">الإنتاج المتوقع: <strong>${roi.dailyKwh.toFixed(1)} kWh/يوم</strong></span>
    `;
  }

  renderRoiChart(roi);
}

/* ---- Build Itemized Technical BOQ ----------------------- */
function generateBoqModel() {
  const roi = vipState.lastRoi || calculateRoiModel();
  let spec;

  if (vipState.boqSource === 'pkg' && vipState.boqPackageId) {
    const pkg = SOLAR_DATA.packages.find((p) => p.id === vipState.boqPackageId) || SOLAR_DATA.packages[3];
    const p = pkg.boqPreset;
    const isDirect = vipState.boqStorageMode === 'direct';
    spec = {
      title: `جدول كميات: ${pkg.name} (${pkg.watts})`,
      panels: p.panels,
      panelWatt: p.panelWatt,
      inverterKw: p.inverterKw,
      inverterLabel: p.inverterLabel,
      storageKwh: isDirect ? 0 : p.storageKwh,
      batteryLabel: isDirect ? 'تشغيل نهاري مباشر بدون بطاريات' : p.batteryLabel,
      wellDepth: p.wellDepth,
      isWell: p.hasPump,
      paybackText: 'توفير 70–90% من الديزل',
    };
  } else {
    const isDirect = vipState.boqStorageMode === 'direct';
    const storageKwh = isDirect ? 0 : Math.max(5, Math.ceil((roi.dailyKwh * 0.35) / 5) * 5);
    spec = {
      title: roi.isWell
        ? `مقايسة غطاسة بئر عميق (${vipState.pumpHp} HP · عمق ${vipState.wellDepth}m)`
        : `مقايسة منشأة صناعية / تجارية (${vipState.factoryKw} kW)`,
      panels: roi.panelsCount,
      panelWatt: SOLAR_CONFIG.panelWatts,
      inverterKw: roi.driveKw,
      inverterLabel: roi.isWell
        ? `مغير سرعة شمسي VFD MPPT بقدرة ${roi.driveKw} kW IP65`
        : `انفرتر هايبريد ثلاثي الطور ${roi.driveKw} kW مع MPPT ومراقبة ذكية`,
      storageKwh,
      batteryLabel: isDirect
        ? 'تشغيل نهاري مباشر (VFD Direct) — بدون بطاريات'
        : `بنك بطاريات ليثيوم LiFePO4 48V بسعة ${storageKwh} kWh مع BMS`,
      wellDepth: roi.isWell ? vipState.wellDepth : 0,
      isWell: roi.isWell,
      paybackText: roi.paybackMonths <= 60 ? `${roi.paybackMonths} شهراً` : 'حسب التشغيل',
    };
  }

  const rows = [
    {
      name: `ألواح شمسية Tier-1 Mono PERC (${spec.panelWatt}W)`,
      detail: 'Jinko / LONGi عالية الكفاءة — كفاءة توليد حتى في الغيوم 20-30%',
      unit: 'لوح',
      qty: spec.panels,
      costUsd: spec.panels * (spec.panelWatt === 500 ? 115 : 125),
      warranty: '5 سنوات',
    },
    {
      name: spec.isWell ? 'وحدة التحكم والقيادة الشمسية (MPPT / VFD)' : 'الانفرتر الشمسي الهجين (MPPT Hybrid)',
      detail: spec.inverterLabel,
      unit: 'جهاز',
      qty: 1,
      costUsd: Math.round(spec.isWell ? 240 + spec.inverterKw * 88 : 380 + spec.inverterKw * 135),
      warranty: spec.isWell ? '3 سنوات' : '5 سنوات',
    },
    {
      name: spec.storageKwh > 0 ? 'بنك بطاريات الليثيوم LiFePO4 الذكي' : 'وحدة التشغيل النهاري المباشر (بدون تخزين)',
      detail: spec.batteryLabel,
      unit: spec.storageKwh > 0 ? 'kWh' : 'نظام',
      qty: spec.storageKwh > 0 ? spec.storageKwh : 1,
      costUsd: spec.storageKwh > 0 ? spec.storageKwh * 235 : 0,
      warranty: spec.storageKwh > 0 ? '6000+ دورة' : 'مشمول',
    },
    {
      name: 'لوحة الحماية الكهربائية AC/DC والتأريض',
      detail: 'قواطع DC مزدوجة، مانع صواعق SPD، فيوزات MC4 وقضيب تأريض نحاسي',
      unit: 'لوحة',
      qty: 1,
      costUsd: Math.round(180 + spec.panels * 8),
      warranty: '3 سنوات',
    },
    {
      name: 'الهيكل المعدني المجلفن والكابلات الشمسية',
      detail: spec.wellDepth > 0
        ? `هياكل مقاومة للرياح + كابلات TUV 6mm² ومواسير/كابل غطاسة لعمق ${spec.wellDepth}m`
        : 'هياكل تثبيت مجلفنة بزاوية إشعاع 6.5 ساعة + كابلات شمسية 6mm² TUV',
      unit: 'مجموعة',
      qty: 1,
      costUsd: Math.round(160 + spec.panels * 24 + spec.wellDepth * 2.1),
      warranty: '5 سنوات',
    },
    {
      name: 'التوريد، التركيب الهندسي، البرمجة، والاختبار',
      detail: 'تنفيذ ميداني كامل في صنعاء و12 محافظة يمنية مع فحص الأحمال والتسليم',
      unit: 'خدمة',
      qty: 1,
      costUsd: Math.round(240 + spec.panels * 18),
      warranty: 'ضمان تنفيذ',
    },
  ];

  const totalUsd = rows.reduce((sum, r) => sum + r.costUsd, 0);

  return { spec, rows, totalUsd };
}

function renderBoqModalContent() {
  const boq = generateBoqModel();
  vipState.lastBoq = boq;

  const titleEl = document.getElementById('boqModalTitle');
  const summaryEl = document.getElementById('boqSummaryStrip');
  const bodyEl = document.getElementById('boqTableBody');
  const totalEl = document.getElementById('boqTotalCost');
  const waBtn = document.getElementById('boqWhatsappBtn');

  if (titleEl) titleEl.textContent = boq.spec.title;

  if (summaryEl) {
    const arrayKw = ((boq.spec.panels * boq.spec.panelWatt) / 1000).toFixed(2);
    summaryEl.innerHTML = `
      <div class="boq-sum-box"><span>قدرة مصفوفة الألواح</span><strong>${arrayKw} kWp (${boq.spec.panels} لوح)</strong></div>
      <div class="boq-sum-box"><span>قدرة الانفرتر / VFD</span><strong>${boq.spec.inverterKw} kW</strong></div>
      <div class="boq-sum-box"><span>التخزين / التشغيل</span><strong>${boq.spec.storageKwh > 0 ? boq.spec.storageKwh + ' kWh LiFePO4' : 'ضخ نهاري مباشر'}</strong></div>
      <div class="boq-sum-box"><span>فترة الاسترداد المقدرة</span><strong>${boq.spec.paybackText}</strong></div>
    `;
  }

  if (bodyEl) {
    bodyEl.innerHTML = boq.rows
      .map(
        (row, idx) => `
        <tr>
          <td class="font-tech">0${idx + 1}</td>
          <td>
            <span class="boq-item-title">${row.name}</span>
            <span class="boq-item-spec">${row.detail}</span>
          </td>
          <td>${row.unit}</td>
          <td class="font-tech">${row.qty}</td>
          <td class="font-tech">${row.costUsd > 0 ? formatCurrency(row.costUsd, vipState.currency) : 'مشمول'}</td>
          <td>${row.warranty}</td>
        </tr>
      `
      )
      .join('');
  }

  if (totalEl) {
    totalEl.textContent = formatCurrency(boq.totalUsd, vipState.currency);
  }

  if (waBtn) {
    waBtn.href = buildWaUrl(buildBoqTextSummary(boq));
  }
}

function buildBoqTextSummary(boq) {
  const projectName = (document.getElementById('boqProjectTitleInput')?.value || '').trim() || 'مشروع جديد';
  const gov = document.getElementById('boqGovSelect')?.value || 'صنعاء';
  const lines = [
    `طلب اعتماد جدول الكميات الفني (BOQ) — ${SOLAR_CONFIG.businessName} (${SOLAR_CONFIG.tierLabel})`,
    `المشروع / العميل: ${projectName}`,
    `المحافظة: ${gov}`,
    `المواصفة: ${boq.spec.title}`,
    `--------------------------------`,
  ];
  boq.rows.forEach((r, idx) => {
    lines.push(`${idx + 1}. ${r.name} | الكمية: ${r.qty} ${r.unit} | ${r.costUsd > 0 ? formatCurrency(r.costUsd, vipState.currency) : 'مشمول'}`);
  });
  lines.push(`--------------------------------`);
  lines.push(`الإجمالي التقديري: ${formatCurrency(boq.totalUsd, vipState.currency)} (${vipState.currency})`);
  lines.push(`فترة الاسترداد التقديرية: ${boq.spec.paybackText}`);
  return lines.join('\n');
}

function openBoqModal(source, pkgId) {
  vipState.boqSource = source || 'sim';
  vipState.boqPackageId = pkgId || null;

  if (source === 'pkg' && pkgId) {
    const pkg = SOLAR_DATA.packages.find((p) => p.id === pkgId);
    if (pkg) {
      vipState.boqStorageMode = pkg.boqPreset.hasPump ? 'direct' : 'hybrid';
    }
  } else {
    vipState.boqStorageMode = vipState.mode === 'well' ? 'direct' : 'hybrid';
  }

  const pills = document.getElementById('boqStoragePills');
  if (pills) {
    pills.querySelectorAll('.boq-pill').forEach((p) => {
      p.classList.toggle('is-active', p.dataset.storage === vipState.boqStorageMode);
    });
  }

  renderBoqModalContent();

  const modal = document.getElementById('boqModal');
  if (modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
}

function closeBoqModal() {
  const modal = document.getElementById('boqModal');
  if (modal) {
    modal.hidden = true;
    document.body.style.overflow = '';
  }
}

/* ---- Render Catalog & Content Sections ------------------ */
function renderHeroStats() {
  const grid = document.getElementById('vipStatsGrid');
  if (!grid) return;
  grid.innerHTML = SOLAR_DATA.stats
    .map(
      (s) => `
      <div class="t-card">
        <span class="t-card-val">${s.value}</span>
        <span class="t-card-lbl">${s.label}</span>
      </div>
    `
    )
    .join('');
}

function renderPackages() {
  const grid = document.getElementById('vipPkgGrid');
  if (!grid) return;

  const list = SOLAR_DATA.packages.filter(
    (pkg) => vipState.activePkgFilter === 'all' || pkg.category === vipState.activePkgFilter
  );

  grid.innerHTML = list
    .map((pkg) => {
      const specsHtml = pkg.specs
        .map(
          (spec) => `
          <div class="v-spec-line">
            ${getIcon(spec.icon)}
            <span>${spec.text}</span>
          </div>
        `
        )
        .join('');

      const waUrl = buildWaUrl(
        `مرحباً ${SOLAR_CONFIG.businessName} (${SOLAR_CONFIG.tierLabel})، أطلب استشارة وتنفيذ لباقة: ${pkg.name} (${pkg.watts}).`
      );

      return `
        <article class="v-pkg-card">
          <div class="v-pkg-top">
            <div class="v-pkg-meta">
              ${pkg.tag ? `<span class="v-pkg-tag">${pkg.tag}</span>` : '<span></span>'}
              <span class="v-pkg-code font-tech">${pkg.code}</span>
            </div>
            <h3>${pkg.name}</h3>
            <div class="v-pkg-sub">${pkg.subtitle}</div>
            <span class="v-pkg-watts">${pkg.watts}</span>
          </div>
          <div class="v-pkg-body">
            <div class="v-pkg-specs">${specsHtml}</div>
            <div class="v-pkg-actions">
              <button type="button" class="btn btn-gold-outline btn-sm" data-open-boq="${pkg.id}">مقايسة BOQ</button>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-sm">اعتماد فوري</a>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderReasons() {
  const grid = document.getElementById('vipReasonsGrid');
  if (!grid) return;
  grid.innerHTML = SOLAR_DATA.reasons
    .map(
      (r) => `
      <div class="v-reason-card">
        <div class="v-reason-icon">${getIcon(r.icon)}</div>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
      </div>
    `
    )
    .join('');
}

function renderProcess() {
  const grid = document.getElementById('vipProcessGrid');
  if (!grid) return;
  grid.innerHTML = SOLAR_DATA.process
    .map(
      (p) => `
      <div class="v-proc-card">
        <div class="v-proc-step">${p.step}</div>
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
      </div>
    `
    )
    .join('');
}

function renderFaqs() {
  const list = document.getElementById('vipFaqList');
  if (!list) return;
  list.innerHTML = SOLAR_DATA.faqs
    .map(
      (f, idx) => `
      <div class="v-faq-item ${idx === 0 ? 'is-open' : ''}">
        <button type="button" class="v-faq-btn" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${f.q}</span>
          ${getIcon('chevron')}
        </button>
        <div class="v-faq-ans" ${idx === 0 ? '' : 'hidden'}>${f.a}</div>
      </div>
    `
    )
    .join('');
}

/* ---- Currency Slider Sync ------------------------------- */
function syncPriceSliderToCurrency() {
  const cur = CURRENCIES[vipState.currency] || CURRENCIES.USD;
  const slider = document.getElementById('dieselPriceSlider');
  const scale = document.getElementById('dieselPriceScale');
  if (slider) {
    slider.min = String(cur.minPrice);
    slider.max = String(cur.maxPrice);
    slider.step = String(cur.step);
    const currentLocal = vipState.dieselPriceUsd * cur.rate;
    slider.value = cur.decimals === 0 ? String(Math.round(currentLocal)) : currentLocal.toFixed(cur.decimals);
  }
  if (scale) {
    const mid = (cur.minPrice + cur.maxPrice) / 2;
    const fmt = (n) => (vipState.currency === 'USD' ? `$${n.toFixed(2)}` : `${Math.round(n)} ${cur.symbol}`);
    scale.innerHTML = `<span>${fmt(cur.minPrice)}</span><span>${fmt(mid)}</span><span>${fmt(cur.maxPrice)}</span>`;
  }
}

/* ---- Wire Events ---------------------------------------- */
function bindEvents() {
  // Mobile menu
  const menuBtn = document.getElementById('vipMenuToggle');
  const drawer = document.getElementById('vipMobileDrawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const open = drawer.hidden;
      drawer.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Global VIP WhatsApp links
  const defaultWa = buildWaUrl(
    `مرحباً ${SOLAR_CONFIG.businessName} (${SOLAR_CONFIG.tierLabel})، نرغب بدراسة وتوريد منظومة طاقة شمسية صناعية أو غطاسة زراعية.`
  );
  ['headerVipWaBtn', 'footerVipWaBtn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = defaultWa;
  });

  // Currency Switcher
  const currBar = document.getElementById('roiCurrencyBar');
  if (currBar) {
    currBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.curr-btn');
      if (!btn) return;
      vipState.currency = btn.dataset.currency || 'USD';
      currBar.querySelectorAll('.curr-btn').forEach((b) => b.classList.toggle('is-active', b === btn));
      syncPriceSliderToCurrency();
      updateRoiUI();
      const modal = document.getElementById('boqModal');
      if (modal && !modal.hidden) renderBoqModalContent();
    });
  }

  // Mode Tabs (Well vs Factory)
  const modeTabs = document.getElementById('roiModeTabs');
  const wellFields = document.getElementById('wellModeFields');
  const factoryFields = document.getElementById('factoryModeFields');
  if (modeTabs && wellFields && factoryFields) {
    modeTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.mode-tab');
      if (!tab) return;
      vipState.mode = tab.dataset.mode || 'well';
      modeTabs.querySelectorAll('.mode-tab').forEach((t) => t.classList.toggle('is-active', t === tab));
      wellFields.hidden = vipState.mode !== 'well';
      factoryFields.hidden = vipState.mode !== 'factory';

      if (vipState.autoSyncDiesel) {
        const loadKw = vipState.mode === 'well' ? vipState.pumpHp * 0.85 : vipState.factoryKw;
        vipState.dieselLiters = estimateSuggestedLiters(loadKw, vipState.dailyHours);
        const dSlider = document.getElementById('dieselLitersSlider');
        if (dSlider) dSlider.value = String(vipState.dieselLiters);
      }
      updateRoiUI();
    });
  }

  // ROI Sliders
  const wellDepthSlider = document.getElementById('wellDepthSlider');
  if (wellDepthSlider) {
    wellDepthSlider.addEventListener('input', () => {
      vipState.wellDepth = Number(wellDepthSlider.value) || 120;
      updateRoiUI();
    });
  }

  const pumpPowerSlider = document.getElementById('pumpPowerSlider');
  if (pumpPowerSlider) {
    pumpPowerSlider.addEventListener('input', () => {
      vipState.pumpHp = Number(pumpPowerSlider.value) || 5;
      if (vipState.autoSyncDiesel) {
        vipState.dieselLiters = estimateSuggestedLiters(vipState.pumpHp * 0.85, vipState.dailyHours);
        const dSlider = document.getElementById('dieselLitersSlider');
        if (dSlider) dSlider.value = String(vipState.dieselLiters);
      }
      updateRoiUI();
    });
  }

  const factoryKwSlider = document.getElementById('factoryKwSlider');
  if (factoryKwSlider) {
    factoryKwSlider.addEventListener('input', () => {
      vipState.factoryKw = Number(factoryKwSlider.value) || 15;
      if (vipState.autoSyncDiesel) {
        vipState.dieselLiters = estimateSuggestedLiters(vipState.factoryKw, vipState.dailyHours);
        const dSlider = document.getElementById('dieselLitersSlider');
        if (dSlider) dSlider.value = String(vipState.dieselLiters);
      }
      updateRoiUI();
    });
  }

  const dailyHoursSlider = document.getElementById('dailyHoursSlider');
  if (dailyHoursSlider) {
    dailyHoursSlider.addEventListener('input', () => {
      vipState.dailyHours = Number(dailyHoursSlider.value) || 7;
      if (vipState.autoSyncDiesel) {
        const loadKw = vipState.mode === 'well' ? vipState.pumpHp * 0.85 : vipState.factoryKw;
        vipState.dieselLiters = estimateSuggestedLiters(loadKw, vipState.dailyHours);
        const dSlider = document.getElementById('dieselLitersSlider');
        if (dSlider) dSlider.value = String(vipState.dieselLiters);
      }
      updateRoiUI();
    });
  }

  const dieselLitersSlider = document.getElementById('dieselLitersSlider');
  if (dieselLitersSlider) {
    dieselLitersSlider.addEventListener('input', () => {
      vipState.autoSyncDiesel = false;
      vipState.dieselLiters = Number(dieselLitersSlider.value) || 320;
      updateRoiUI();
    });
  }

  const syncDieselBtn = document.getElementById('syncDieselBtn');
  if (syncDieselBtn) {
    syncDieselBtn.addEventListener('click', () => {
      vipState.autoSyncDiesel = true;
      const loadKw = vipState.mode === 'well' ? vipState.pumpHp * 0.85 : vipState.factoryKw;
      vipState.dieselLiters = estimateSuggestedLiters(loadKw, vipState.dailyHours);
      if (dieselLitersSlider) dieselLitersSlider.value = String(vipState.dieselLiters);
      updateRoiUI();
    });
  }

  const dieselPriceSlider = document.getElementById('dieselPriceSlider');
  if (dieselPriceSlider) {
    dieselPriceSlider.addEventListener('input', () => {
      const cur = CURRENCIES[vipState.currency] || CURRENCIES.USD;
      vipState.dieselPriceUsd = Number(dieselPriceSlider.value) / cur.rate;
      updateRoiUI();
    });
  }

  const includeMaintCheck = document.getElementById('includeMaintCheck');
  if (includeMaintCheck) {
    includeMaintCheck.addEventListener('change', () => {
      vipState.includeMaint = includeMaintCheck.checked;
      updateRoiUI();
    });
  }

  // Package Filters & Open BOQ from Catalog Cards
  const pkgFilters = document.getElementById('vipPkgFilters');
  if (pkgFilters) {
    pkgFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.sys-filter-btn');
      if (!btn) return;
      vipState.activePkgFilter = btn.dataset.filter || 'all';
      pkgFilters.querySelectorAll('.sys-filter-btn').forEach((b) => b.classList.toggle('is-active', b === btn));
      renderPackages();
    });
  }

  const vipPkgGrid = document.getElementById('vipPkgGrid');
  if (vipPkgGrid) {
    vipPkgGrid.addEventListener('click', (e) => {
      const boqBtn = e.target.closest('[data-open-boq]');
      if (!boqBtn) return;
      openBoqModal('pkg', boqBtn.dataset.openBoq);
    });
  }

  // Open BOQ Modal Triggers
  ['headerOpenBoqBtn', 'heroOpenBoqBtn', 'openBoqFromSimBtn', 'deskOpenBoqBtn', 'dispatchOpenBoqBtn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => openBoqModal('sim', null));
    }
  });

  // BOQ Modal Controls
  const boqCloseBtn = document.getElementById('boqCloseBtn');
  const boqModal = document.getElementById('boqModal');
  if (boqCloseBtn) boqCloseBtn.addEventListener('click', closeBoqModal);
  if (boqModal) {
    boqModal.addEventListener('click', (e) => {
      if (e.target === boqModal) closeBoqModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && boqModal && !boqModal.hidden) {
      closeBoqModal();
    }
  });

  const boqStoragePills = document.getElementById('boqStoragePills');
  if (boqStoragePills) {
    boqStoragePills.addEventListener('click', (e) => {
      const pill = e.target.closest('.boq-pill');
      if (!pill) return;
      vipState.boqStorageMode = pill.dataset.storage || 'hybrid';
      boqStoragePills.querySelectorAll('.boq-pill').forEach((p) => p.classList.toggle('is-active', p === pill));
      renderBoqModalContent();
    });
  }

  ['boqProjectTitleInput', 'boqGovSelect'].forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        const waBtn = document.getElementById('boqWhatsappBtn');
        if (waBtn && vipState.lastBoq) {
          waBtn.href = buildWaUrl(buildBoqTextSummary(vipState.lastBoq));
        }
      });
    }
  });

  // Copy & Print BOQ
  const boqCopyBtn = document.getElementById('boqCopyBtn');
  const boqCopyToast = document.getElementById('boqCopyToast');
  if (boqCopyBtn && boqCopyToast) {
    boqCopyBtn.addEventListener('click', () => {
      if (!vipState.lastBoq) return;
      const text = buildBoqTextSummary(vipState.lastBoq);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          boqCopyToast.hidden = false;
          setTimeout(() => {
            boqCopyToast.hidden = true;
          }, 2600);
        });
      } else {
        boqCopyToast.hidden = false;
        boqCopyToast.textContent = 'استخدم زر طباعة أو واتساب لمشاركة المقايسة';
      }
    });
  }

  const boqPrintBtn = document.getElementById('boqPrintBtn');
  if (boqPrintBtn) {
    boqPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // FAQ Accordion
  const faqList = document.getElementById('vipFaqList');
  if (faqList) {
    faqList.addEventListener('click', (e) => {
      const btn = e.target.closest('.v-faq-btn');
      if (!btn) return;
      const item = btn.closest('.v-faq-item');
      const ans = item.querySelector('.v-faq-ans');
      const isOpen = item.classList.contains('is-open');

      faqList.querySelectorAll('.v-faq-item').forEach((el) => {
        el.classList.remove('is-open');
        const a = el.querySelector('.v-faq-ans');
        const b = el.querySelector('.v-faq-btn');
        if (a) a.hidden = true;
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        if (ans) ans.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // VIP Dispatch Form Submission
  const dispatchForm = document.getElementById('vipDispatchForm');
  const feedback = document.getElementById('vipFormFeedback');
  if (dispatchForm && feedback) {
    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('vipClientName')?.value || '').trim();
      const phone = (document.getElementById('vipClientPhone')?.value || '').trim();
      const gov = document.getElementById('vipClientGov')?.value || '';
      const scope = document.getElementById('vipProjectScope')?.value || '';
      const notes = (document.getElementById('vipNotes')?.value || '').trim();

      if (!name || phone.length < 7) {
        feedback.hidden = false;
        feedback.className = 'vip-form-feedback is-error';
        feedback.textContent = 'يرجى كتابة اسم المنشأة/العميل ورقم الهاتف الصحيح لتوجيه المهندس.';
        return;
      }

      const roi = vipState.lastRoi || calculateRoiModel();
      const msg = [
        `طلب اعتماد هندسي — ${SOLAR_CONFIG.businessName} (${SOLAR_CONFIG.tierLabel})`,
        `الاسم / المنشأة: ${name}`,
        `الهاتف: ${phone}`,
        `المحافظة: ${gov}`,
        `نطاق المشروع: ${scope}`,
        `--- بيانات محاكي الجدوى ROI ---`,
        `النوع: ${roi.isWell ? 'بئر عميق ' + vipState.pumpHp + ' HP (عمق ' + vipState.wellDepth + 'm)' : 'منشأة ' + vipState.factoryKw + ' kW'}`,
        `القدرة الشمسية المقترحة: ${roi.panelsCount} لوح (550W) · محول ${roi.driveKw} kW`,
        `الوفر السنوي المتوقع: ${formatCurrency(roi.annualNetSaveUsd, vipState.currency)} | الاسترداد: ${roi.paybackMonths} شهراً`,
      ];
      if (notes) msg.push(`ملاحظات: ${notes}`);

      feedback.hidden = false;
      feedback.className = 'vip-form-feedback is-success';
      feedback.textContent = 'تم إعداد ملف الاعتماد الهندسي بنجاح — يتم التحويل الآن إلى واتساب الفئة الملكية VIP.';

      window.open(buildWaUrl(msg.join('\n')), '_blank', 'noopener,noreferrer');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeroStats();
  renderPackages();
  renderReasons();
  renderProcess();
  renderFaqs();
  syncPriceSliderToCurrency();
  bindEvents();
  updateRoiUI();
});
