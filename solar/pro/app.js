/* =========================================================
   CleanTech Engineering Pro — app.js
   Solar Energy & Agricultural Pumps — Yemen
   ========================================================= */

'use strict';

const SOLAR_CONFIG = {
  whatsappNumber: '967782259937',
  businessName: 'الشمس للطاقة المتجددة',
  tagline: 'توريد وتركيب في صنعاء وعموم المحافظات',
  phone: '0782259937',
  tierLabel: 'الفئة الفاخرة Pro',
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
    },
    {
      id: 'home-medium',
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
    },
    {
      id: 'villa',
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
    },
    {
      id: 'pump',
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
    },
    {
      id: 'commercial',
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
  led: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/></svg>',
  fan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="2.5"/><path d="M12 9.5V4a2.5 2.5 0 0 1 5 0c0 2-2.5 3.5-5 5.5z"/><path d="M14.5 12H20a2.5 2.5 0 0 1 0 5c-2 0-3.5-2.5-5.5-5z"/><path d="M12 14.5V20a2.5 2.5 0 0 1-5 0c0-2 2.5-3.5 5-5.5z"/><path d="M9.5 12H4a2.5 2.5 0 0 1 0-5c2 0 3.5 2.5 5.5 5z"/></svg>',
  tv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="13" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="18" x2="12" y2="21"/></svg>',
  fridge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="9" y1="6" x2="9" y2="8"/><line x1="9" y1="14" x2="9" y2="17"/></svg>',
  washer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="2" width="18" height="20" rx="2"/><line x1="3" y1="7" x2="21" y2="7"/><circle cx="12" cy="14" r="4"/><line x1="7" y1="4.5" x2="8" y2="4.5"/></svg>',
  ac: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="9" rx="2"/><line x1="6" y1="13" x2="18" y2="13"/><path d="M7 17c0 1.5-1 2.5-1 3.5"/><path d="M12 17v4"/><path d="M17 17c0 1.5 1 2.5 1 3.5"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  chevron: '<svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
};

function getIcon(name) {
  return ICONS[name] || '';
}

function buildWaUrl(message) {
  return `https://wa.me/${SOLAR_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* ---- Interactive Electrical & Pump Load State ----------- */
const APPLIANCE_CATALOG = [
  { id: 'led', name: 'إضاءة LED موفرة', icon: 'led', watts: 15, maxQty: 40, maxHours: 14 },
  { id: 'fan', name: 'مراوح سقف أو عمودية', icon: 'fan', watts: 65, maxQty: 12, maxHours: 16 },
  { id: 'tv', name: 'تلفاز وشواحن أجهزة', icon: 'tv', watts: 120, maxQty: 6, maxHours: 14 },
  { id: 'fridge', name: 'ثلاجة منزلية انفرتر', icon: 'fridge', watts: 180, maxQty: 4, maxHours: 14 },
  { id: 'washer', name: 'غسالة ملابس أوتوماتيك', icon: 'washer', watts: 500, maxQty: 3, maxHours: 6 },
  { id: 'ac', name: 'مكيف انفرتر 1.5 طن', icon: 'ac', watts: 1200, maxQty: 6, maxHours: 14 },
];

const LOAD_PRESETS = {
  small: {
    devices: {
      led: { qty: 6, hours: 6 },
      fan: { qty: 2, hours: 6 },
      tv: { qty: 1, hours: 4 },
      fridge: { qty: 0, hours: 10 },
      washer: { qty: 0, hours: 2 },
      ac: { qty: 0, hours: 6 },
    },
    pumpHp: 0,
    pumpHours: 5,
  },
  medium: {
    devices: {
      led: { qty: 12, hours: 6 },
      fan: { qty: 3, hours: 7 },
      tv: { qty: 1, hours: 6 },
      fridge: { qty: 1, hours: 12 },
      washer: { qty: 1, hours: 2 },
      ac: { qty: 0, hours: 6 },
    },
    pumpHp: 0,
    pumpHours: 5,
  },
  villa: {
    devices: {
      led: { qty: 20, hours: 7 },
      fan: { qty: 5, hours: 7 },
      tv: { qty: 2, hours: 6 },
      fridge: { qty: 2, hours: 11 },
      washer: { qty: 1, hours: 2 },
      ac: { qty: 2, hours: 7 },
    },
    pumpHp: 0,
    pumpHours: 5,
  },
  farm: {
    devices: {
      led: { qty: 6, hours: 5 },
      fan: { qty: 1, hours: 5 },
      tv: { qty: 1, hours: 3 },
      fridge: { qty: 0, hours: 10 },
      washer: { qty: 0, hours: 1 },
      ac: { qty: 0, hours: 6 },
    },
    pumpHp: 3,
    pumpHours: 6,
  },
  commercial: {
    devices: {
      led: { qty: 18, hours: 10 },
      fan: { qty: 4, hours: 10 },
      tv: { qty: 2, hours: 8 },
      fridge: { qty: 3, hours: 12 },
      washer: { qty: 0, hours: 1 },
      ac: { qty: 1, hours: 8 },
    },
    pumpHp: 0,
    pumpHours: 5,
  },
  clear: {
    devices: {
      led: { qty: 0, hours: 6 },
      fan: { qty: 0, hours: 6 },
      tv: { qty: 0, hours: 4 },
      fridge: { qty: 0, hours: 10 },
      washer: { qty: 0, hours: 1 },
      ac: { qty: 0, hours: 6 },
    },
    pumpHp: 0,
    pumpHours: 5,
  },
};

const calcState = {
  devices: JSON.parse(JSON.stringify(LOAD_PRESETS.medium.devices)),
  pumpHp: 0,
  pumpHours: 5,
  batteryChem: 'lifepo4',
  activePackageFilter: 'all',
  lastSummary: null,
};

/* ---- Engineering Sizing Engine -------------------------- */
function computeSolarSizing() {
  let applianceRunningW = 0;
  let applianceDailyWh = 0;

  APPLIANCE_CATALOG.forEach((item) => {
    const entry = calcState.devices[item.id];
    if (!entry || entry.qty <= 0) return;
    const itemW = entry.qty * item.watts;
    applianceRunningW += itemW;
    applianceDailyWh += itemW * entry.hours;
  });

  const pumpRunningW = calcState.pumpHp > 0 ? calcState.pumpHp * 850 : 0;
  const pumpDailyWh = pumpRunningW * calcState.pumpHours;

  const peakWatts = applianceRunningW + pumpRunningW;
  const dailyWh = applianceDailyWh + pumpDailyWh;

  // Inverter sizing with starting surge margin (1.25x appliances, 1.5x inductive pump)
  const requiredInverterW = applianceRunningW * 1.25 + pumpRunningW * 1.5;
  const inverterTiersKw = [1, 2, 3, 5, 8, 10, 12, 15, 20];
  let inverterKw = 0;
  if (requiredInverterW > 0) {
    inverterKw =
      inverterTiersKw.find((tier) => tier * 1000 >= requiredInverterW) ||
      Math.ceil(requiredInverterW / 1000);
  }

  // 550W Mono PERC panel count using Yemen 6.5 PSH and 0.78 system efficiency
  const whPerPanelDay = SOLAR_CONFIG.panelWatts * SOLAR_CONFIG.pshYemen * SOLAR_CONFIG.systemEfficiency;
  const panelsCount = dailyWh > 0 ? Math.max(2, Math.ceil(dailyWh / whPerPanelDay)) : 0;
  const panelsArrayWp = panelsCount * SOLAR_CONFIG.panelWatts;

  // System Bus Voltage
  let busVoltage = 24;
  if (peakWatts <= 1400) {
    busVoltage = 12;
  } else if (peakWatts <= 3600) {
    busVoltage = 24;
  } else {
    busVoltage = 48;
  }

  // Night storage energy (appliances run 65% outside direct solar peak; farm pumps operate direct daytime)
  const nightStorageWh = Math.round(applianceDailyWh * 0.65);
  let lifepo4Ah = 0;
  let gelAh = 0;

  if (nightStorageWh > 0) {
    lifepo4Ah = Math.max(50, Math.ceil(nightStorageWh / (busVoltage * 0.8 * 0.94) / 50) * 50);
    gelAh = Math.max(100, Math.ceil(nightStorageWh / (busVoltage * 0.5 * 0.85) / 50) * 50);
  }

  // Match official package from SOLAR_DATA.packages
  const acQty = calcState.devices.ac ? calcState.devices.ac.qty : 0;
  const fridgeQty = calcState.devices.fridge ? calcState.devices.fridge.qty : 0;
  const washerQty = calcState.devices.washer ? calcState.devices.washer.qty : 0;
  let matchedPkgId = 'home-medium';
  if (calcState.pumpHp > 0 && applianceRunningW <= 1200) {
    matchedPkgId = 'pump';
  } else if (peakWatts === 0 || (inverterKw <= 1 && dailyWh <= 3600)) {
    matchedPkgId = 'home-small';
  } else if (inverterKw <= 3 && dailyWh <= 8200 && acQty === 0) {
    matchedPkgId = 'home-medium';
  } else if (fridgeQty >= 3 && washerQty === 0) {
    matchedPkgId = 'commercial';
  } else if (acQty > 0 || (inverterKw <= 10 && calcState.pumpHp === 0 && dailyWh <= 28000)) {
    matchedPkgId = 'villa';
  } else {
    matchedPkgId = 'commercial';
  }

  const matchedPkg = SOLAR_DATA.packages.find((p) => p.id === matchedPkgId) || SOLAR_DATA.packages[1];

  return {
    peakWatts,
    dailyWh,
    inverterKw,
    panelsCount,
    panelsArrayWp,
    busVoltage,
    pumpRunningW,
    nightStorageWh,
    lifepo4Ah,
    gelAh,
    matchedPkg,
  };
}

function formatNum(num) {
  return new Intl.NumberFormat('en-US').format(Math.round(num));
}

/* ---- Render Functions ----------------------------------- */
function renderHeroStats() {
  const container = document.getElementById('heroStatsGrid');
  if (!container) return;
  container.innerHTML = SOLAR_DATA.stats
    .map(
      (s) => `
      <div class="t-stat">
        <span class="t-stat-val">${s.value}</span>
        <span class="t-stat-lbl">${s.label}</span>
      </div>
    `
    )
    .join('');
}

function renderDevicesList() {
  const container = document.getElementById('devicesList');
  if (!container) return;

  container.innerHTML = APPLIANCE_CATALOG.map((item) => {
    const state = calcState.devices[item.id];
    const rowClass = state.qty > 0 ? 'device-row has-load' : 'device-row';
    return `
      <div class="${rowClass}" data-device-id="${item.id}">
        <div class="device-info">
          <span class="device-icon-box">${getIcon(item.icon)}</span>
          <div>
            <span class="device-name">${item.name}</span>
            <span class="device-watt-note"><span class="font-tech">${item.watts} W</span> لكل وحدة</span>
          </div>
        </div>

        <div class="stepper-group">
          <span class="stepper-lbl">العدد</span>
          <div class="stepper">
            <button type="button" class="step-btn" data-action="qty-dec" data-id="${item.id}" aria-label="إنقاص عدد ${item.name}">-</button>
            <span class="step-val" id="qty-${item.id}">${state.qty}</span>
            <button type="button" class="step-btn" data-action="qty-inc" data-id="${item.id}" aria-label="زيادة عدد ${item.name}">+</button>
          </div>
        </div>

        <div class="stepper-group">
          <span class="stepper-lbl">ساعات / يوم</span>
          <div class="stepper">
            <button type="button" class="step-btn" data-action="hrs-dec" data-id="${item.id}" aria-label="إنقاص ساعات ${item.name}">-</button>
            <span class="step-val" id="hrs-${item.id}">${state.hours}</span>
            <button type="button" class="step-btn" data-action="hrs-inc" data-id="${item.id}" aria-label="زيادة ساعات ${item.name}">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateCalculatorUI() {
  const res = computeSolarSizing();
  calcState.lastSummary = res;

  // Pump visual telemetry
  const pumpReadout = document.getElementById('pumpWattReadout');
  if (pumpReadout) {
    pumpReadout.textContent = calcState.pumpHp > 0 ? `${calcState.pumpHp} HP · ${formatNum(res.pumpRunningW)} W` : '0 W';
  }
  const pumpHoursValue = document.getElementById('pumpHoursValue');
  if (pumpHoursValue) {
    pumpHoursValue.textContent = `${calcState.pumpHours} ساعات`;
  }

  // Main KPIs
  const voltageBadge = document.getElementById('systemVoltageBadge');
  const outPeakWatts = document.getElementById('outPeakWatts');
  const outRunningWatts = document.getElementById('outRunningWatts');
  const outDailyWh = document.getElementById('outDailyWh');
  const outDailyKwh = document.getElementById('outDailyKwh');
  const outInverterKw = document.getElementById('outInverterKw');
  const outInverterNote = document.getElementById('outInverterNote');
  const outPanelsCount = document.getElementById('outPanelsCount');
  const outPanelsArrayWp = document.getElementById('outPanelsArrayWp');

  if (voltageBadge) voltageBadge.textContent = `${res.busVoltage}V DC BUS`;
  if (outPeakWatts) outPeakWatts.textContent = `${formatNum(res.peakWatts)} W`;
  if (outRunningWatts) {
    outRunningWatts.textContent =
      res.peakWatts > 0 ? `${(res.peakWatts / 1000).toFixed(2)} kW تشغيل متزامن` : 'أضف أجهزة لبدء الحساب';
  }
  if (outDailyWh) outDailyWh.textContent = `${formatNum(res.dailyWh)} Wh`;
  if (outDailyKwh) outDailyKwh.textContent = `${(res.dailyWh / 1000).toFixed(2)} kWh / يوم`;
  if (outInverterKw) outInverterKw.textContent = res.inverterKw > 0 ? `${res.inverterKw} kW` : '0 kW';
  if (outInverterNote) {
    outInverterNote.textContent =
      calcState.pumpHp > 0 ? 'شامل معامل إقلاع الغطاسة / VFD' : 'معامل أمان إقلاع 1.25x';
  }
  if (outPanelsCount) outPanelsCount.textContent = res.panelsCount > 0 ? `${res.panelsCount} لوح` : '0 لوح';
  if (outPanelsArrayWp) {
    outPanelsArrayWp.textContent = `${formatNum(res.panelsArrayWp)} Wp (إشعاع 6.5 ساعة)`;
  }

  // Battery Bank Comparison
  const outLifepo4Ah = document.getElementById('outLifepo4Ah');
  const outLifepo4Meta = document.getElementById('outLifepo4Meta');
  const outGelAh = document.getElementById('outGelAh');
  const outGelMeta = document.getElementById('outGelMeta');
  const batCardLifepo4 = document.getElementById('batCardLifepo4');
  const batCardGel = document.getElementById('batCardGel');
  const batteryNoteText = document.getElementById('batteryNoteText');

  if (res.nightStorageWh === 0 && calcState.pumpHp > 0) {
    if (outLifepo4Ah) outLifepo4Ah.textContent = 'ضخ مباشر';
    if (outGelAh) outGelAh.textContent = 'ضخ مباشر';
    if (outLifepo4Meta) outLifepo4Meta.textContent = 'تشغيل نهاري بدون بطاريات لتقليل التكلفة';
    if (outGelMeta) outGelMeta.textContent = 'يمكن إضافة بنك بطاريات عند وجود أحمال ليلية';
    if (batteryNoteText) {
      batteryNoteText.textContent = 'تم احتساب الغطاسة الزراعية على وضع التشغيل النهاري المباشر عبر وحدة MPPT/VFD.';
    }
  } else {
    if (outLifepo4Ah) outLifepo4Ah.textContent = res.lifepo4Ah > 0 ? `${formatNum(res.lifepo4Ah)} Ah @ ${res.busVoltage}V` : '0 Ah';
    if (outGelAh) outGelAh.textContent = res.gelAh > 0 ? `${formatNum(res.gelAh)} Ah @ ${res.busVoltage}V` : '0 Ah';
    if (outLifepo4Meta) outLifepo4Meta.textContent = '80% تفريغ عميق · 6000+ دورة · 8–10 سنوات';
    if (outGelMeta) outGelMeta.textContent = '50% تفريغ آمن · 1200 دورة · 3–4 سنوات';
    if (batteryNoteText) {
      batteryNoteText.textContent =
        'سعة البطاريات محسوبة للتشغيل الليلي الآمن بناءً على جهد النظام (' + res.busVoltage + 'V) ومقارنة عمق التفريغ.';
    }
  }

  if (batCardLifepo4 && batCardGel) {
    batCardLifepo4.classList.toggle('is-selected', calcState.batteryChem === 'lifepo4');
    batCardGel.classList.toggle('is-selected', calcState.batteryChem === 'gel');
  }

  // Matched Package Banner
  const matchedPkgWatts = document.getElementById('matchedPkgWatts');
  const matchedPkgName = document.getElementById('matchedPkgName');
  const matchedPkgDesc = document.getElementById('matchedPkgDesc');
  const calcDirectWaBtn = document.getElementById('calcDirectWaBtn');

  if (matchedPkgWatts) matchedPkgWatts.textContent = res.matchedPkg.watts;
  if (matchedPkgName) matchedPkgName.textContent = res.matchedPkg.name;
  if (matchedPkgDesc) matchedPkgDesc.textContent = res.matchedPkg.subtitle;

  const chosenBatteryText =
    res.nightStorageWh === 0 && calcState.pumpHp > 0
      ? 'ضخ نهاري مباشر بدون بطاريات'
      : calcState.batteryChem === 'lifepo4'
      ? `LiFePO4 ليثيوم (${formatNum(res.lifepo4Ah)} Ah @ ${res.busVoltage}V)`
      : `Tubular Gel جل (${formatNum(res.gelAh)} Ah @ ${res.busVoltage}V)`;

  if (calcDirectWaBtn) {
    const waText = [
      `مرحباً ${SOLAR_CONFIG.businessName} (${SOLAR_CONFIG.tierLabel})،`,
      `أرسلت لكم نتيجة حاسبة الأحمال الهندسية:`,
      `- الحمل الذروي: ${formatNum(res.peakWatts)} W`,
      `- الاستهلاك اليومي: ${formatNum(res.dailyWh)} Wh`,
      `- الانفرتر المقترح: ${res.inverterKw} kW (${res.busVoltage}V)`,
      `- عدد الألواح (550W): ${res.panelsCount} لوح`,
      `- الغطاسة الزراعية: ${calcState.pumpHp > 0 ? calcState.pumpHp + ' HP (' + calcState.pumpHours + ' ساعات)' : 'بدون'}`,
      `- نوع البطاريات: ${chosenBatteryText}`,
      `- الباقة المطابقة: ${res.matchedPkg.name} (${res.matchedPkg.watts})`,
    ].join('\n');
    calcDirectWaBtn.href = buildWaUrl(waText);
  }

  // Sync Package Highlight & Booking Form Preview
  renderPackages();
  syncSurveySummary(res, chosenBatteryText);
}

function syncSurveySummary(res, chosenBatteryText) {
  const metricsEl = document.getElementById('surveyCalcMetrics');
  const pkgSelect = document.getElementById('selectedPackageInput');

  if (pkgSelect) {
    const targetText = `${res.matchedPkg.name} (${res.matchedPkg.watts})`;
    const matchingOpt = Array.from(pkgSelect.options).find((opt) => opt.value === targetText);
    if (matchingOpt) {
      pkgSelect.value = matchingOpt.value;
    }
  }

  if (metricsEl) {
    metricsEl.innerHTML = `
      <div class="preview-item"><span>الحمل الذروي / اليومي</span><strong>${formatNum(res.peakWatts)} W / ${(res.dailyWh / 1000).toFixed(1)} kWh</strong></div>
      <div class="preview-item"><span>الانفرتر والألواح</span><strong>${res.inverterKw} kW · ${res.panelsCount} لوح 550W</strong></div>
      <div class="preview-item"><span>بنك البطاريات</span><strong>${chosenBatteryText}</strong></div>
      <div class="preview-item"><span>الباقة المرشحة</span><strong>${res.matchedPkg.name}</strong></div>
    `;
  }
}

/* ---- Render Packages Grid ------------------------------- */
function renderPackages() {
  const grid = document.getElementById('pkgGrid');
  if (!grid) return;

  const matchedId = calcState.lastSummary ? calcState.lastSummary.matchedPkg.id : 'home-medium';
  const filtered = SOLAR_DATA.packages.filter(
    (pkg) => calcState.activePackageFilter === 'all' || pkg.category === calcState.activePackageFilter
  );

  grid.innerHTML = filtered
    .map((pkg) => {
      const isMatch = pkg.id === matchedId;
      const specsHtml = pkg.specs
        .map(
          (spec) => `
          <div class="pkg-spec-item">
            ${getIcon(spec.icon)}
            <span>${spec.text}</span>
          </div>
        `
        )
        .join('');

      const waUrl = buildWaUrl(
        `أهلاً ${SOLAR_CONFIG.businessName} (${SOLAR_CONFIG.tierLabel})، أريد الاستفسار عن: ${pkg.name} (${pkg.watts}) شاملة التركيب والكفالة.`
      );

      return `
        <article class="pkg-card ${isMatch ? 'is-recommended' : ''}">
          <div class="pkg-head">
            <div class="pkg-badges">
              ${pkg.tag ? `<span class="pkg-tag">${pkg.tag}</span>` : '<span></span>'}
              ${isMatch ? '<span class="pkg-match-badge">موصى به لحسابك</span>' : ''}
            </div>
            <h3>${pkg.name}</h3>
            <div class="pkg-sub">${pkg.subtitle}</div>
            <span class="pkg-watts">${pkg.watts}</span>
          </div>
          <div class="pkg-body">
            <div class="pkg-specs">${specsHtml}</div>
            <div class="pkg-card-actions">
              <button type="button" class="btn btn-navy btn-sm" data-select-pkg="${pkg.name} (${pkg.watts})">اختيار للمعاينة</button>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-amber btn-sm">طلب السعر</a>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

/* ---- Render Reasons, Process & FAQs --------------------- */
function renderReasons() {
  const grid = document.getElementById('reasonsGrid');
  if (!grid) return;
  grid.innerHTML = SOLAR_DATA.reasons
    .map(
      (r) => `
      <div class="reason-card">
        <div class="reason-icon">${getIcon(r.icon)}</div>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
      </div>
    `
    )
    .join('');
}

function renderProcess() {
  const grid = document.getElementById('processGrid');
  if (!grid) return;
  grid.innerHTML = SOLAR_DATA.process
    .map(
      (p) => `
      <div class="process-card">
        <div class="process-num">${p.step}</div>
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
      </div>
    `
    )
    .join('');
}

function renderFaqs() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = SOLAR_DATA.faqs
    .map(
      (faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
        <button type="button" class="faq-trigger" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${faq.q}</span>
          ${getIcon('chevron')}
        </button>
        <div class="faq-answer" ${idx === 0 ? '' : 'hidden'}>
          ${faq.a}
        </div>
      </div>
    `
    )
    .join('');
}

/* ---- Wire Global Links & Interactions ------------------- */
function initGlobalWhatsappLinks() {
  const defaultMsg = buildWaUrl(
    `مرحباً ${SOLAR_CONFIG.businessName} (${SOLAR_CONFIG.tierLabel})، أرغب باستشارة هندسية لمنظومة طاقة شمسية.`
  );
  ['headerWaBtn', 'footerWaBtn', 'floatingWaBtn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = defaultMsg;
  });
}

function bindEvents() {
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = drawer.hidden;
      drawer.hidden = !isOpen;
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Presets
  const presetBar = document.getElementById('presetBar');
  if (presetBar) {
    presetBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.preset-btn');
      if (!btn) return;
      const presetKey = btn.dataset.preset;
      const preset = LOAD_PRESETS[presetKey];
      if (!preset) return;

      calcState.devices = JSON.parse(JSON.stringify(preset.devices));
      calcState.pumpHp = preset.pumpHp;
      calcState.pumpHours = preset.pumpHours;

      presetBar.querySelectorAll('.preset-btn').forEach((b) => {
        b.classList.toggle('is-active', b === btn && presetKey !== 'clear');
      });

      const slider = document.getElementById('pumpHoursSlider');
      if (slider) slider.value = String(calcState.pumpHours);

      const hpPills = document.getElementById('pumpHpPills');
      if (hpPills) {
        hpPills.querySelectorAll('.hp-pill').forEach((pill) => {
          pill.classList.toggle('is-active', Number(pill.dataset.hp) === calcState.pumpHp);
        });
      }

      renderDevicesList();
      updateCalculatorUI();
    });
  }

  // Appliance steppers
  const devicesList = document.getElementById('devicesList');
  if (devicesList) {
    devicesList.addEventListener('click', (e) => {
      const btn = e.target.closest('.step-btn');
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const meta = APPLIANCE_CATALOG.find((d) => d.id === id);
      const state = calcState.devices[id];
      if (!meta || !state) return;

      if (action === 'qty-inc' && state.qty < meta.maxQty) state.qty += 1;
      if (action === 'qty-dec' && state.qty > 0) state.qty -= 1;
      if (action === 'hrs-inc' && state.hours < meta.maxHours) state.hours += 1;
      if (action === 'hrs-dec' && state.hours > 1) state.hours -= 1;

      const qtyEl = document.getElementById(`qty-${id}`);
      const hrsEl = document.getElementById(`hrs-${id}`);
      const rowEl = devicesList.querySelector(`[data-device-id="${id}"]`);
      if (qtyEl) qtyEl.textContent = String(state.qty);
      if (hrsEl) hrsEl.textContent = String(state.hours);
      if (rowEl) rowEl.classList.toggle('has-load', state.qty > 0);

      document.querySelectorAll('.preset-btn').forEach((b) => b.classList.remove('is-active'));
      updateCalculatorUI();
    });
  }

  // Agricultural Pump HP Pills
  const pumpHpPills = document.getElementById('pumpHpPills');
  if (pumpHpPills) {
    pumpHpPills.addEventListener('click', (e) => {
      const pill = e.target.closest('.hp-pill');
      if (!pill) return;
      calcState.pumpHp = Number(pill.dataset.hp) || 0;
      pumpHpPills.querySelectorAll('.hp-pill').forEach((p) => p.classList.toggle('is-active', p === pill));
      updateCalculatorUI();
    });
  }

  // Pump Hours Slider
  const pumpHoursSlider = document.getElementById('pumpHoursSlider');
  if (pumpHoursSlider) {
    pumpHoursSlider.addEventListener('input', () => {
      calcState.pumpHours = Number(pumpHoursSlider.value) || 5;
      updateCalculatorUI();
    });
  }

  // Battery Chemistry Toggle
  const batteryToggle = document.getElementById('batteryChemToggle');
  if (batteryToggle) {
    batteryToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.bat-btn');
      if (!btn) return;
      calcState.batteryChem = btn.dataset.chem || 'lifepo4';
      batteryToggle.querySelectorAll('.bat-btn').forEach((b) => b.classList.toggle('is-active', b === btn));
      updateCalculatorUI();
    });
  }

  // Apply Calculator to Survey Booking Form
  const applyCalcBtn = document.getElementById('applyCalcToSurveyBtn');
  if (applyCalcBtn) {
    applyCalcBtn.addEventListener('click', () => {
      const projectType = document.getElementById('projectType');
      if (projectType && calcState.pumpHp > 0) {
        projectType.value = 'مزرعة / غطاسة بئر';
      }
      const target = document.getElementById('survey-booking');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Package Filters & Select Action
  const pkgFilters = document.getElementById('pkgFilters');
  if (pkgFilters) {
    pkgFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.pkg-filter-btn');
      if (!btn) return;
      calcState.activePackageFilter = btn.dataset.filter || 'all';
      pkgFilters.querySelectorAll('.pkg-filter-btn').forEach((b) => b.classList.toggle('is-active', b === btn));
      renderPackages();
    });
  }

  const pkgGrid = document.getElementById('pkgGrid');
  if (pkgGrid) {
    pkgGrid.addEventListener('click', (e) => {
      const selectBtn = e.target.closest('[data-select-pkg]');
      if (!selectBtn) return;
      const pkgVal = selectBtn.dataset.selectPkg;
      const pkgSelect = document.getElementById('selectedPackageInput');
      if (pkgSelect) pkgSelect.value = pkgVal;
      const target = document.getElementById('survey-booking');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Survey Form Submission -> WhatsApp Dispatch
  const surveyForm = document.getElementById('surveyForm');
  const feedback = document.getElementById('surveyFormFeedback');
  if (surveyForm && feedback) {
    surveyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('clientName')?.value || '').trim();
      const phone = (document.getElementById('clientPhone')?.value || '').trim();
      const gov = document.getElementById('clientGov')?.value || '';
      const district = (document.getElementById('clientDistrict')?.value || '').trim();
      const projType = document.getElementById('projectType')?.value || '';
      const pkgName = document.getElementById('selectedPackageInput')?.value || '';
      const notes = (document.getElementById('clientNotes')?.value || '').trim();

      if (!name || phone.length < 7) {
        feedback.hidden = false;
        feedback.className = 'form-feedback is-error';
        feedback.textContent = 'يرجى إدخال الاسم الكامل ورقم الهاتف الصحيح لإرسال طلب المعاينة المجانية.';
        return;
      }

      const res = calcState.lastSummary || computeSolarSizing();
      const batteryLabel =
        res.nightStorageWh === 0 && calcState.pumpHp > 0
          ? 'ضخ نهاري مباشر'
          : calcState.batteryChem === 'lifepo4'
          ? `LiFePO4 ليثيوم (${formatNum(res.lifepo4Ah)} Ah @ ${res.busVoltage}V)`
          : `Tubular Gel (${formatNum(res.gelAh)} Ah @ ${res.busVoltage}V)`;

      const msgLines = [
        `طلب معاينة ميدانية مجانية — ${SOLAR_CONFIG.businessName} (${SOLAR_CONFIG.tierLabel})`,
        `الاسم: ${name}`,
        `الهاتف: ${phone}`,
        `المحافظة: ${gov}${district ? ' - ' + district : ''}`,
        `نوع المشروع: ${projType}`,
        `المنظومة المختارة: ${pkgName}`,
        `--- بيانات الحاسبة الهندسية ---`,
        `الحمل الذروي: ${formatNum(res.peakWatts)} W | الاستهلاك: ${formatNum(res.dailyWh)} Wh/يوم`,
        `الانفرتر: ${res.inverterKw} kW | الألواح: ${res.panelsCount} لوح (550W)`,
        `الغطاسة الزراعية: ${calcState.pumpHp > 0 ? calcState.pumpHp + ' HP' : 'لا يوجد'}`,
        `البطاريات المفضلة: ${batteryLabel}`,
      ];
      if (notes) msgLines.push(`ملاحظات: ${notes}`);

      feedback.hidden = false;
      feedback.className = 'form-feedback is-success';
      feedback.textContent = 'تم تجهيز طلب المعاينة الهندسية بنجاح — يتم التحويل الآن إلى واتساب الفريق الهندسي.';

      window.open(buildWaUrl(msgLines.join('\n')), '_blank', 'noopener,noreferrer');
    });
  }

  // FAQ Accordion
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.addEventListener('click', (e) => {
      const trigger = e.target.closest('.faq-trigger');
      if (!trigger) return;
      const item = trigger.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      faqList.querySelectorAll('.faq-item').forEach((el) => {
        el.classList.remove('is-open');
        const ans = el.querySelector('.faq-answer');
        const btn = el.querySelector('.faq-trigger');
        if (ans) ans.hidden = true;
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        if (answer) answer.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeroStats();
  renderDevicesList();
  renderReasons();
  renderProcess();
  renderFaqs();
  initGlobalWhatsappLinks();
  bindEvents();
  updateCalculatorUI();
});
