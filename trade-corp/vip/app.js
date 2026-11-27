/* =========================================================
   app.js — مجموعة السعيد للتجارة والتبريد (الفئة الملكية VIP)
   Identity: Global Holding Logistics Command & Tender Builder
   ========================================================= */
'use strict';

const VIP_SVG = {
  truck: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  cold: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/></svg>',
  depot: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/></svg>',
};

const VIP_SCENES = [
  {
    key: 'chambers',
    label: 'مخازن التبريد (-18°C)',
    tag: 'COLD CHAIN COMMAND · HUB-01',
    image: '../assets/images/warehouse.jpg',
    alt: 'مخازن التبريد المركزية لمجموعة السعيد',
    title: 'وحدات التخزين والتبريد المركزية — 20,650 طن متري',
    desc: 'تحكم رقمي بدرجات التجميد -18°C والتبريد +4°C عبر مساحة مخازن تبلغ 31,000 متر مربع.',
  },
  {
    key: 'reefers',
    label: 'الأسطول المبرّد (270+)',
    tag: 'FLEET DISPATCH · 270+ UNITS',
    image: '../assets/images/truck.jpg',
    alt: 'أسطول النقل المبرّد لمجموعة السعيد',
    title: 'قوافل النقل المبرّد عبر المحافظات — أكثر من 270 شاحنة',
    desc: 'ربط يومي متصل بين الموانئ البحرية والمستودعات الرئيسية في صنعاء وعدن والحديدة وتعز والمكلا وإب.',
  },
  {
    key: 'wholesale',
    label: 'التموين والجملة (432)',
    tag: 'WHOLESALE MATRIX · 70% COVERAGE',
    image: '../assets/images/logistics.jpg',
    alt: 'خدمات اللوجستيات والتوريد المؤسسي',
    title: 'شبكة تجار الجملة والوكلاء — 432 تاجر و302 وكيل',
    desc: 'مزيج استراتيجي يغطي 70% من السوق اليمني بواقع 40% توزيعاً مباشراً و30% عبر الوكلاء المعتمدين.',
  },
  {
    key: 'deals',
    label: 'الاتفاقيات الكبرى',
    tag: 'STRATEGIC CONTRACTS · 2026',
    image: '../assets/images/deal.jpg',
    alt: 'اتفاقيات التوريد الاستراتيجية لمجموعة السعيد',
    title: 'عقود توريد ومناقصات مؤسسية مضمونة المخزون',
    desc: 'اتفاقيات استراتيجية طويلة الأجل لتأمين السلع المجمدة والأساسية للمنظمات والأسواق الكبرى.',
  },
  {
    key: 'retail',
    label: 'التوسّع في التجزئة (50%+)',
    tag: 'RETAIL EXPANSION · 2,606 OUTLETS',
    image: '../assets/images/supermarket.jpg',
    alt: 'انتشار مجموعة السعيد في قطاع التجزئة والسوبرماركت',
    title: 'حضور مباشر في 26 منفذ فئة (أ) و230 منفذ فئة (ب)',
    desc: 'تجاوزت مشاركتنا في قطاع التجزئة والسوبرماركت 50% من المبيعات منذ عام 2020.',
  },
];

const VIP_DEPOTS = {
  'صنعاء': {
    code: 'HUB-SAN-01',
    role: 'مركز القيادة الرئيسية والتوزيع الإقليمي',
    capacityMt: '6,200 MT',
    areaSqm: '9,200 م²',
    fleetUnits: '82 شاحنة وقاطرة مبرّدة',
    channels: '9 فئة (أ) · 78 فئة (ب) · 148 تاجر جملة',
    sla: '4 - 6 ساعات حضرياً / 24 ساعة للمحيط',
    agents: '92 وكيل رئيسي وفرعي',
  },
  'عدن': {
    code: 'HUB-ADE-02',
    role: 'بوابة الاستيراد البحرية الجنوبية والتخليص',
    capacityMt: '4,800 MT',
    areaSqm: '7,400 م²',
    fleetUnits: '64 شاحنة وقاطرة مبرّدة',
    channels: '6 فئة (أ) · 54 فئة (ب) · 104 تاجر جملة',
    sla: '3 - 5 ساعات من الميناء / نفس اليوم إقليمياً',
    agents: '68 وكيل رئيسي وفرعي',
  },
  'الحديدة': {
    code: 'HUB-HOD-03',
    role: 'محطة الميناء الغربي ومنصة الترحيل المباشر',
    capacityMt: '4,150 MT',
    areaSqm: '6,100 م²',
    fleetUnits: '52 شاحنة وقاطرة مبرّدة',
    channels: '3 فئة (أ) · 28 فئة (ب) · 66 تاجر جملة',
    sla: '3 - 6 ساعات محلياً / قوافل يومية للمرتفعات',
    agents: '48 وكيل رئيسي وفرعي',
  },
  'تعز': {
    code: 'HUB-TAZ-04',
    role: 'المركز التجاري للقطاع الأوسط والتجزئة',
    capacityMt: '2,300 MT',
    areaSqm: '3,400 م²',
    fleetUnits: '34 شاحنة وقاطرة مبرّدة',
    channels: '4 فئة (أ) · 32 فئة (ب) · 52 تاجر جملة',
    sla: '6 - 10 ساعات داخل المحافظة والمديريات',
    agents: '40 وكيل رئيسي وفرعي',
  },
  'المكلا': {
    code: 'HUB-MKL-05',
    role: 'المحور الشرقي لإمداد حضرموت والوادي',
    capacityMt: '1,750 MT',
    areaSqm: '2,700 م²',
    fleetUnits: '24 شاحنة وقاطرة مبرّدة',
    channels: '2 فئة (أ) · 20 فئة (ب) · 34 تاجر جملة',
    sla: '6 - 12 ساعة للساحل / 24 ساعة للوادي',
    agents: '28 وكيل رئيسي وفرعي',
  },
  'إب': {
    code: 'HUB-IBB-06',
    role: 'مركز الإمداد المبرّد للمنطقة الوسطى',
    capacityMt: '1,450 MT',
    areaSqm: '2,200 م²',
    fleetUnits: '20 شاحنة وقاطرة مبرّدة',
    channels: '2 فئة (أ) · 18 فئة (ب) · 28 تاجر جملة',
    sla: '4 - 8 ساعات داخل المحافظة والمحيط',
    agents: '26 وكيل رئيسي وفرعي',
  },
};

const BUYER_SEGMENTS = [
  { id: 'ngo', label: 'المنظمات الدولية والإنسانية (NGOs)' },
  { id: 'supermarket', label: 'سلاسل السوبرماركت الكبرى (فئة أ/ب)' },
  { id: 'hotel', label: 'مجموعات الفنادق والضيافة والتموين' },
  { id: 'distributor', label: 'الوكلاء الرئيسيون وكبار الموزعين' },
];

const DIVISION_SPECS = [
  {
    en: 'AL-ASALA',
    name: 'الأصالة للدواجن',
    cat: 'دواجن ولحوم مجمدة',
    regimeKey: 'frozen',
    regimeLabel: '-18°C Frozen',
    fullPallets: 22,
    fullMt: 24.0,
    partialPallets: 11,
    partialMt: 12.0,
  },
  {
    en: 'GREEN MEADOW',
    name: 'المراعي الخضراء',
    cat: 'أجبان وزبدة طبيعية',
    regimeKey: 'chilled',
    regimeLabel: '+4°C Chilled',
    fullPallets: 20,
    fullMt: 18.5,
    partialPallets: 10,
    partialMt: 9.25,
  },
  {
    en: 'PALM OIL',
    name: 'نخلة التموين',
    cat: 'زيوت طبخ ونباتية',
    regimeKey: 'ambient',
    regimeLabel: '+18°C Ambient',
    fullPallets: 24,
    fullMt: 21.6,
    partialPallets: 12,
    partialMt: 10.8,
  },
  {
    en: 'SANABEL',
    name: 'سنابل السعيد',
    cat: 'أرز وسكر ومعكرونة',
    regimeKey: 'ambient',
    regimeLabel: '+18°C Ambient',
    fullPallets: 24,
    fullMt: 25.0,
    partialPallets: 12,
    partialMt: 12.5,
  },
  {
    en: 'QUTOUF',
    name: 'قطوف المجمدة',
    cat: 'خضروات وفواكه مجمدة',
    regimeKey: 'frozen',
    regimeLabel: '-18°C Frozen',
    fullPallets: 22,
    fullMt: 20.0,
    partialPallets: 11,
    partialMt: 10.0,
  },
  {
    en: 'DELTA SEA',
    name: 'دلتا البحرية',
    cat: 'أسماك ومأكولات بحرية',
    regimeKey: 'frozen',
    regimeLabel: '-18°C Frozen',
    fullPallets: 20,
    fullMt: 22.0,
    partialPallets: 10,
    partialMt: 11.0,
  },
];

const PRESET_ALLOCATIONS = {
  ngo: {
    segment: 'ngo',
    items: {
      'AL-ASALA': { full: 1, partial: 0 },
      'GREEN MEADOW': { full: 0, partial: 1 },
      'PALM OIL': { full: 1, partial: 1 },
      'SANABEL': { full: 2, partial: 0 },
      'QUTOUF': { full: 0, partial: 0 },
      'DELTA SEA': { full: 0, partial: 0 },
    },
  },
  supermarket: {
    segment: 'supermarket',
    items: {
      'AL-ASALA': { full: 1, partial: 1 },
      'GREEN MEADOW': { full: 1, partial: 0 },
      'PALM OIL': { full: 0, partial: 1 },
      'SANABEL': { full: 1, partial: 0 },
      'QUTOUF': { full: 0, partial: 1 },
      'DELTA SEA': { full: 0, partial: 1 },
    },
  },
  hotel: {
    segment: 'hotel',
    items: {
      'AL-ASALA': { full: 1, partial: 0 },
      'GREEN MEADOW': { full: 0, partial: 1 },
      'PALM OIL': { full: 0, partial: 1 },
      'SANABEL': { full: 0, partial: 1 },
      'QUTOUF': { full: 0, partial: 1 },
      'DELTA SEA': { full: 1, partial: 0 },
    },
  },
};

const vipState = {
  sceneIndex: 0,
  activeCity: 'صنعاء',
  buyerSegment: 'ngo',
  targetDepot: 'صنعاء',
  allocations: {},
  tenderRef: `ALS-VIP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
};

DIVISION_SPECS.forEach(d => {
  vipState.allocations[d.en] = { full: 0, partial: 0 };
});
// Initialize with an active baseline allocation so users immediately experience live telemetry
vipState.allocations['AL-ASALA'] = { full: 1, partial: 0 };
vipState.allocations['SANABEL'] = { full: 1, partial: 1 };

function computeTotals() {
  let fullContainers = 0;
  let partialContainers = 0;
  let pallets = 0;
  let totalMt = 0;
  const regimeMt = { frozen: 0, chilled: 0, ambient: 0 };
  const rows = [];

  DIVISION_SPECS.forEach(d => {
    const qty = vipState.allocations[d.en] || { full: 0, partial: 0 };
    const divPallets = qty.full * d.fullPallets + qty.partial * d.partialPallets;
    const divMt = qty.full * d.fullMt + qty.partial * d.partialMt;

    fullContainers += qty.full;
    partialContainers += qty.partial;
    pallets += divPallets;
    totalMt += divMt;
    regimeMt[d.regimeKey] += divMt;

    if (qty.full > 0 || qty.partial > 0) {
      rows.push({
        ...d,
        full: qty.full,
        partial: qty.partial,
        pallets: divPallets,
        mt: divMt,
      });
    }
  });

  const trucksNeeded = totalMt > 0 ? Math.max(1, Math.ceil(totalMt / 22)) : 0;
  return { fullContainers, partialContainers, pallets, totalMt, regimeMt, trucksNeeded, rows };
}

function initHeroViewport() {
  const pillsEl = document.getElementById('vip-scene-pills');
  const imgEl = document.getElementById('vip-hero-img');
  const tagEl = document.getElementById('vp-tag');
  const titleEl = document.getElementById('vp-title');
  const descEl = document.getElementById('vp-desc');
  if (!pillsEl) return;

  function showScene(idx) {
    vipState.sceneIndex = idx;
    const s = VIP_SCENES[idx] || VIP_SCENES[0];
    if (imgEl) {
      imgEl.src = s.image;
      imgEl.alt = s.alt;
    }
    if (tagEl) tagEl.textContent = s.tag;
    if (titleEl) titleEl.textContent = s.title;
    if (descEl) descEl.textContent = s.desc;

    pillsEl.querySelectorAll('.scene-pill').forEach((btn, i) => {
      btn.classList.toggle('is-active', i === idx);
      btn.setAttribute('aria-selected', String(i === idx));
    });
  }

  pillsEl.innerHTML = VIP_SCENES.map((s, idx) => `
    <button type="button" class="scene-pill ${idx === 0 ? 'is-active' : ''}" data-scene="${idx}" role="tab" aria-selected="${idx === 0}">
      ${s.label}
    </button>
  `).join('');

  pillsEl.addEventListener('click', e => {
    const btn = e.target.closest('.scene-pill');
    if (!btn) return;
    showScene(Number(btn.dataset.scene));
  });

  showScene(0);
}

function renderCityTelemetryPanel(city) {
  vipState.activeCity = city;
  const tabsEl = document.getElementById('vip-city-tabs');
  const panelEl = document.getElementById('vip-city-panel');
  if (!panelEl) return;

  const info = VIP_DEPOTS[city] || VIP_DEPOTS['صنعاء'];

  if (tabsEl) {
    tabsEl.querySelectorAll('.gov-tab').forEach(tab => {
      const active = tab.dataset.city === city;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  }

  panelEl.innerHTML = `
    <div class="gov-panel-head">
      <div>
        <h3>${city} — ${info.role}</h3>
        <p>رمز المركز اللوجستي: <span class="num-font">${info.code}</span> · شبكة الوكلاء: ${info.agents}</p>
      </div>
      <button type="button" class="btn-gold-outline" id="sync-city-to-builder" style="display:inline-flex;">
        <span>تعيين ${city} كمستودع تسليم بالمناقصة</span>
      </button>
    </div>

    <div class="gov-metrics-grid">
      <div class="gov-stat">
        <span>السعة التبريدية</span>
        <strong class="num-font">${info.capacityMt}</strong>
        <small>ضمن 20,650 طن متري</small>
      </div>
      <div class="gov-stat">
        <span>مساحة المخازن</span>
        <strong class="num-font">${info.areaSqm}</strong>
        <small>ضمن 31,000 متر مربع</small>
      </div>
      <div class="gov-stat">
        <span>الأسطول المبرّد</span>
        <strong>${info.fleetUnits}</strong>
        <small>تجهيز -18°C و +4°C</small>
      </div>
      <div class="gov-stat">
        <span>قنوات التوزيع النشطة</span>
        <strong style="font-size:0.94rem;">${info.channels}</strong>
        <small>تزويد مباشر يومي</small>
      </div>
      <div class="gov-stat">
        <span>زمن التوصيل المعتمد</span>
        <strong style="font-size:0.94rem;">${info.sla}</strong>
        <small>معيار التزام الإمداد</small>
      </div>
    </div>
  `;

  const syncBtn = document.getElementById('sync-city-to-builder');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      vipState.targetDepot = city;
      renderDepotPills();
      updateConsoleTelemetry();
      document.getElementById('tender-builder')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function initCityMatrix() {
  const tabsEl = document.getElementById('vip-city-tabs');
  if (!tabsEl || typeof TRADE_DATA === 'undefined') return;

  tabsEl.innerHTML = TRADE_DATA.cities.map(c => {
    const info = VIP_DEPOTS[c];
    return `
      <button type="button" class="gov-tab ${c === vipState.activeCity ? 'is-active' : ''}" data-city="${c}" role="tab" aria-selected="${c === vipState.activeCity}">
        <strong>${c}</strong>
        <small>${info ? info.capacityMt : ''}</small>
      </button>
    `;
  }).join('');

  tabsEl.addEventListener('click', e => {
    const tab = e.target.closest('.gov-tab');
    if (!tab) return;
    renderCityTelemetryPanel(tab.dataset.city);
  });

  renderCityTelemetryPanel(vipState.activeCity);
}

function renderBuyerSegments() {
  const el = document.getElementById('vip-buyer-segments');
  if (!el) return;
  el.innerHTML = BUYER_SEGMENTS.map(seg => `
    <button type="button" class="seg-pill ${seg.id === vipState.buyerSegment ? 'is-active' : ''}" data-seg="${seg.id}">
      ${seg.label}
    </button>
  `).join('');
}

function renderDepotPills() {
  const el = document.getElementById('vip-depot-pills');
  if (!el || typeof TRADE_DATA === 'undefined') return;
  el.innerHTML = TRADE_DATA.cities.map(c => `
    <button type="button" class="depot-pill ${c === vipState.targetDepot ? 'is-active' : ''}" data-depot="${c}">
      ${c}
    </button>
  `).join('');
}

function renderDivisionsGrid() {
  const grid = document.getElementById('vip-division-grid');
  if (!grid) return;

  grid.innerHTML = DIVISION_SPECS.map(d => {
    const qty = vipState.allocations[d.en] || { full: 0, partial: 0 };
    const subPallets = qty.full * d.fullPallets + qty.partial * d.partialPallets;
    const subMt = qty.full * d.fullMt + qty.partial * d.partialMt;
    const hasQty = qty.full > 0 || qty.partial > 0;

    return `
      <article class="division-card ${hasQty ? 'has-qty' : ''}" data-div-card="${d.en}">
        <div>
          <div class="div-head">
            <span class="div-code">${d.en}</span>
            <span class="div-regime">${d.regimeLabel}</span>
          </div>
          <div class="div-title">
            <h3>${d.name}</h3>
            <p>${d.cat}</p>
          </div>
          <div class="div-spec-line">
            حاوية 40 قدم: <span class="num-font">${d.fullPallets}</span> باليت (<span class="num-font">${d.fullMt} MT</span>) · جزئي: <span class="num-font">${d.partialPallets}</span> باليت (<span class="num-font">${d.partialMt} MT</span>)
          </div>
        </div>

        <div class="stepper-row">
          <div class="stepper-box">
            <span>حاوية كاملة (40ft)</span>
            <div class="stepper-ctrl">
              <button type="button" class="step-btn" data-div="${d.en}" data-kind="full" data-delta="-1" aria-label="إنقاص حاوية كاملة ${d.name}">-</button>
              <span class="step-val">${qty.full}</span>
              <button type="button" class="step-btn" data-div="${d.en}" data-kind="full" data-delta="1" aria-label="زيادة حاوية كاملة ${d.name}">+</button>
            </div>
          </div>

          <div class="stepper-box">
            <span>تخصيص جزئي (نصف)</span>
            <div class="stepper-ctrl">
              <button type="button" class="step-btn" data-div="${d.en}" data-kind="partial" data-delta="-1" aria-label="إنقاص حاوية جزئية ${d.name}">-</button>
              <span class="step-val">${qty.partial}</span>
              <button type="button" class="step-btn" data-div="${d.en}" data-kind="partial" data-delta="1" aria-label="زيادة حاوية جزئية ${d.name}">+</button>
            </div>
          </div>
        </div>

        <div class="div-subtotal">
          <span>مخصص هذا القسم:</span>
          <strong class="num-font">${subPallets} باليت · ${subMt.toFixed(1)} MT</strong>
        </div>
      </article>
    `;
  }).join('');
}

function updateConsoleTelemetry() {
  const totals = computeTotals();

  const headerTon = document.getElementById('vip-header-tonnage');
  const depotLbl = document.getElementById('console-depot-label');
  const sumFull = document.getElementById('sum-full');
  const sumPartial = document.getElementById('sum-partial');
  const sumPallets = document.getElementById('sum-pallets');
  const sumTonnage = document.getElementById('sum-tonnage');
  const sumTrucks = document.getElementById('sum-trucks');
  const splitText = document.getElementById('split-summary-text');

  const barFrozen = document.getElementById('bar-frozen');
  const barChilled = document.getElementById('bar-chilled');
  const barAmbient = document.getElementById('bar-ambient');
  const mtFrozen = document.getElementById('mt-frozen');
  const mtChilled = document.getElementById('mt-chilled');
  const mtAmbient = document.getElementById('mt-ambient');

  if (headerTon) headerTon.textContent = `${totals.totalMt.toFixed(1)} MT`;
  if (depotLbl) depotLbl.textContent = `مستودع ${vipState.targetDepot}`;
  if (sumFull) sumFull.textContent = String(totals.fullContainers);
  if (sumPartial) sumPartial.textContent = String(totals.partialContainers);
  if (sumPallets) sumPallets.textContent = String(totals.pallets);
  if (sumTonnage) sumTonnage.textContent = totals.totalMt.toFixed(1);
  if (sumTrucks) sumTrucks.textContent = `${totals.trucksNeeded} شاحنة / قاطرة مبرّدة`;
  if (splitText) splitText.textContent = `${totals.totalMt.toFixed(1)} MT`;

  const denom = totals.totalMt > 0 ? totals.totalMt : 1;
  if (barFrozen) barFrozen.style.width = `${((totals.regimeMt.frozen / denom) * 100).toFixed(1)}%`;
  if (barChilled) barChilled.style.width = `${((totals.regimeMt.chilled / denom) * 100).toFixed(1)}%`;
  if (barAmbient) barAmbient.style.width = `${((totals.regimeMt.ambient / denom) * 100).toFixed(1)}%`;

  if (mtFrozen) mtFrozen.textContent = totals.regimeMt.frozen.toFixed(1);
  if (mtChilled) mtChilled.textContent = totals.regimeMt.chilled.toFixed(1);
  if (mtAmbient) mtAmbient.textContent = totals.regimeMt.ambient.toFixed(1);
}

function buildTenderManifestData() {
  const totals = computeTotals();
  const segObj = BUYER_SEGMENTS.find(s => s.id === vipState.buyerSegment) || BUYER_SEGMENTS[0];
  const depotInfo = VIP_DEPOTS[vipState.targetDepot] || VIP_DEPOTS['صنعاء'];

  const orgName = (document.getElementById('vip-org-name')?.value || '').trim();
  const contactPerson = (document.getElementById('vip-contact-person')?.value || '').trim();
  const orgPhone = (document.getElementById('vip-org-phone')?.value || '').trim();
  const schedule = document.getElementById('vip-schedule')?.value || 'توريد عاجل خلال 72 ساعة';
  const notes = (document.getElementById('vip-tender-notes')?.value || '').trim();

  return {
    ref: vipState.tenderRef,
    date: new Date().toISOString().slice(0, 10),
    segmentLabel: segObj.label,
    depotCity: vipState.targetDepot,
    depotCode: depotInfo.code,
    depotSla: depotInfo.sla,
    orgName: orgName || 'جهة مؤسسية / شريك تجاري (غير محدد بعد)',
    contactPerson: contactPerson || 'إدارة المشتريات والمناقصات',
    orgPhone: orgPhone || 'لم يُدرج بعد',
    schedule,
    notes: notes || 'تطبق معايير سلسلة التبريد المعتمدة (-18°C / +4°C / +18°C) أثناء الاستلام والتفريغ.',
    totals,
  };
}

function buildTenderPlainText(manifest) {
  const lines = [
    'وثيقة تخصيص توريد ومناقصة مؤسسية — مجموعة السعيد للتجارة والتبريد (الفئة الملكية VIP)',
    '============================================================',
    `المرجع: ${manifest.ref} | التاريخ: ${manifest.date}`,
    `تصنيف الجهة: ${manifest.segmentLabel}`,
    `اسم الجهة: ${manifest.orgName}`,
    `المفوض بالتوقيع: ${manifest.contactPerson} | الهاتف: ${manifest.orgPhone}`,
    `مستودع التسليم: ${manifest.depotCity} (${manifest.depotCode})`,
    `زمن الاستجابة المعتمد: ${manifest.depotSla}`,
    `جدول التسليم: ${manifest.schedule}`,
    '------------------------------------------------------------',
    'تفاصيل تخصيص الحاويات والأقسام:',
  ];

  manifest.totals.rows.forEach((r, idx) => {
    lines.push(
      `${idx + 1}. ${r.name} (${r.en}) [${r.regimeLabel}]: ${r.full} حاوية كاملة + ${r.partial} جزئية = ${r.pallets} باليت (${r.mt.toFixed(1)} MT)`
    );
  });

  lines.push('------------------------------------------------------------');
  lines.push(
    `الإجمالي العام: ${manifest.totals.fullContainers} حاوية كاملة (40ft) + ${manifest.totals.partialContainers} تخصيص جزئي`
  );
  lines.push(
    `إجمالي الباليتات: ${manifest.totals.pallets} باليت | الحمولة الإجمالية: ${manifest.totals.totalMt.toFixed(1)} طن متري`
  );
  lines.push(
    `الأسطول المبرّد المقدر للترحيل: ${manifest.totals.trucksNeeded} شاحنة / قاطرة مبرّدة`
  );
  lines.push(
    `التوزيع الحراري: -18°C (${manifest.totals.regimeMt.frozen.toFixed(1)} MT) | +4°C (${manifest.totals.regimeMt.chilled.toFixed(1)} MT) | +18°C (${manifest.totals.regimeMt.ambient.toFixed(1)} MT)`
  );
  lines.push(`ملاحظات: ${manifest.notes}`);
  return lines.join('\n');
}

function renderTenderModalSheet(manifest) {
  const paper = document.getElementById('tender-sheet-paper');
  if (!paper) return;

  const rowsHtml = manifest.totals.rows.map((r, idx) => `
    <tr>
      <td class="num-font">${idx + 1}</td>
      <td><strong>${r.name}</strong><br><small style="color:#64748B;">${r.cat} (${r.en})</small></td>
      <td class="num-font">${r.regimeLabel}</td>
      <td class="num-font">${r.full}</td>
      <td class="num-font">${r.partial}</td>
      <td class="num-font">${r.pallets}</td>
      <td class="num-font">${r.mt.toFixed(1)} MT</td>
    </tr>
  `).join('');

  paper.innerHTML = `
    <div class="sheet-header">
      <div>
        <h4>مجموعة السعيد للتجارة والتبريد</h4>
        <div class="sheet-sub">وثيقة تخصيص التوريد والمناقصات المؤسسية — الفئة الملكية VIP</div>
      </div>
      <div class="sheet-ref-box">
        <strong>REF: ${manifest.ref}</strong>
        <span>التاريخ: <span class="num-font">${manifest.date}</span></span>
      </div>
    </div>

    <div class="sheet-meta-grid">
      <div><span>اسم الجهة الطالبة:</span><strong>${manifest.orgName}</strong></div>
      <div><span>تصنيف الجهة:</span><strong>${manifest.segmentLabel}</strong></div>
      <div><span>المفوض بالتواصل:</span><strong>${manifest.contactPerson}</strong></div>
      <div><span>رقم التواصل الرسمي:</span><strong class="num-font">${manifest.orgPhone}</strong></div>
      <div><span>مستودع التسليم المعتمد:</span><strong>${manifest.depotCity} (${manifest.depotCode})</strong></div>
      <div><span>جدول التسليم:</span><strong>${manifest.schedule}</strong></div>
    </div>

    <div class="sheet-table-wrap">
      <table class="sheet-table">
        <thead>
          <tr>
            <th>#</th>
            <th>القسم والعلامة التجارية</th>
            <th>النطاق الحراري</th>
            <th>حاوية كاملة (40ft)</th>
            <th>تخصيص جزئي</th>
            <th>الباليتات</th>
            <th>الحمولة (MT)</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
        <tfoot>
          <tr>
            <td colspan="3">الإجمالي الكلي للتخصيص</td>
            <td class="num-font">${manifest.totals.fullContainers}</td>
            <td class="num-font">${manifest.totals.partialContainers}</td>
            <td class="num-font">${manifest.totals.pallets}</td>
            <td class="num-font">${manifest.totals.totalMt.toFixed(1)} MT</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="sheet-notes-box">
      <strong>مؤشرات التشغيل والترحيل:</strong>
      الأسطول المبرّد المخصص للدفعة: <span class="num-font">${manifest.totals.trucksNeeded}</span> شاحنة/قاطرة مبرّدة ·
      زمن الاستجابة للمستودع: ${manifest.depotSla} ·
      التفصيل الحراري: -18°C (<span class="num-font">${manifest.totals.regimeMt.frozen.toFixed(1)} MT</span>)، +4°C (<span class="num-font">${manifest.totals.regimeMt.chilled.toFixed(1)} MT</span>)، +18°C (<span class="num-font">${manifest.totals.regimeMt.ambient.toFixed(1)} MT</span>).
      <br>
      <strong>اشتراطات وملاحظات:</strong> ${manifest.notes}
    </div>
  `;
}

function validateAndGetManifest(requireOrgFields) {
  const feedback = document.getElementById('vip-console-feedback');
  const totals = computeTotals();

  if (totals.rows.length === 0) {
    if (feedback) {
      feedback.hidden = false;
      feedback.className = 'console-feedback is-error';
      feedback.textContent = 'يرجى تحديد حاوية كاملة أو تخصيص جزئي واحد على الأقل من أقسام المنتجات الستة.';
    }
    return null;
  }

  if (requireOrgFields) {
    const orgName = (document.getElementById('vip-org-name')?.value || '').trim();
    const orgPhone = (document.getElementById('vip-org-phone')?.value || '').trim();
    if (!orgName || !orgPhone) {
      if (feedback) {
        feedback.hidden = false;
        feedback.className = 'console-feedback is-error';
        feedback.textContent = 'يرجى إدخال اسم الجهة الطالبة ورقم الهاتف الرسمي قبل الإرسال المباشر عبر واتساب.';
      }
      return null;
    }
  }

  if (feedback) {
    feedback.hidden = true;
    feedback.className = 'console-feedback';
  }
  return buildTenderManifestData();
}

function dispatchWhatsAppManifest(manifest) {
  const waNumber = typeof TRADE_CONFIG !== 'undefined' ? TRADE_CONFIG.whatsappNumber : '967782259937';
  const text = buildTenderPlainText(manifest);
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  const feedback = document.getElementById('vip-console-feedback');
  if (feedback) {
    feedback.hidden = false;
    feedback.className = 'console-feedback is-success';
    feedback.innerHTML = `
      تم تجهيز وثيقة التخصيص (${manifest.totals.totalMt.toFixed(1)} MT) وإرسالها لبوابة واتساب VIP.
      <a href="${waUrl}" target="_blank" rel="noopener" style="text-decoration:underline;margin-right:6px;">فتح المحادثة</a>
    `;
  }

  window.open(waUrl, '_blank', 'noopener');
}

function initTenderBuilder() {
  const segEl = document.getElementById('vip-buyer-segments');
  const depotEl = document.getElementById('vip-depot-pills');
  const presetsEl = document.getElementById('vip-presets');
  const gridEl = document.getElementById('vip-division-grid');
  const openModalBtn = document.getElementById('open-tender-modal-btn');
  const directWaBtn = document.getElementById('vip-direct-wa-btn');

  const modal = document.getElementById('tender-modal');
  const closeModalBtn = document.getElementById('close-tender-modal-btn');
  const printBtn = document.getElementById('modal-print-btn');
  const copyBtn = document.getElementById('modal-copy-btn');
  const modalWaBtn = document.getElementById('modal-wa-btn');
  const copyStatus = document.getElementById('modal-copy-status');

  renderBuyerSegments();
  renderDepotPills();
  renderDivisionsGrid();
  updateConsoleTelemetry();

  if (segEl) {
    segEl.addEventListener('click', e => {
      const btn = e.target.closest('.seg-pill');
      if (!btn) return;
      vipState.buyerSegment = btn.dataset.seg;
      renderBuyerSegments();
    });
  }

  if (depotEl) {
    depotEl.addEventListener('click', e => {
      const btn = e.target.closest('.depot-pill');
      if (!btn) return;
      vipState.targetDepot = btn.dataset.depot;
      renderDepotPills();
      updateConsoleTelemetry();
    });
  }

  if (presetsEl) {
    presetsEl.addEventListener('click', e => {
      const btn = e.target.closest('.preset-btn');
      if (!btn) return;
      const key = btn.dataset.preset;
      if (key === 'reset') {
        DIVISION_SPECS.forEach(d => {
          vipState.allocations[d.en] = { full: 0, partial: 0 };
        });
      } else if (PRESET_ALLOCATIONS[key]) {
        const p = PRESET_ALLOCATIONS[key];
        vipState.buyerSegment = p.segment;
        DIVISION_SPECS.forEach(d => {
          const item = p.items[d.en] || { full: 0, partial: 0 };
          vipState.allocations[d.en] = { full: item.full, partial: item.partial };
        });
        renderBuyerSegments();
      }
      renderDivisionsGrid();
      updateConsoleTelemetry();
    });
  }

  if (gridEl) {
    gridEl.addEventListener('click', e => {
      const btn = e.target.closest('.step-btn');
      if (!btn) return;
      const divCode = btn.dataset.div;
      const kind = btn.dataset.kind;
      const delta = Number(btn.dataset.delta);
      const current = vipState.allocations[divCode] || { full: 0, partial: 0 };
      current[kind] = Math.max(0, Math.min(50, current[kind] + delta));
      vipState.allocations[divCode] = current;
      renderDivisionsGrid();
      updateConsoleTelemetry();
    });
  }

  function closeModal() {
    if (modal) modal.hidden = true;
    if (copyStatus) copyStatus.textContent = '';
  }

  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      const manifest = validateAndGetManifest(false);
      if (!manifest || !modal) return;
      renderTenderModalSheet(manifest);
      modal.hidden = false;
      if (copyStatus) copyStatus.textContent = '';
    });
  }

  if (directWaBtn) {
    directWaBtn.addEventListener('click', () => {
      const manifest = validateAndGetManifest(true);
      if (!manifest) return;
      dispatchWhatsAppManifest(manifest);
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const manifest = buildTenderManifestData();
      const plain = buildTenderPlainText(manifest);
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(plain);
        } else {
          const ta = document.createElement('textarea');
          ta.value = plain;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        if (copyStatus) copyStatus.textContent = 'تم نسخ بيان تخصيص المناقصة بنجاح إلى الحافظة.';
      } catch (_err) {
        if (copyStatus) copyStatus.textContent = 'تعذر النسخ التلقائي — يمكنك استخدام الطباعة أو الإرسال المباشر عبر واتساب.';
      }
    });
  }

  if (modalWaBtn) {
    modalWaBtn.addEventListener('click', () => {
      const manifest = buildTenderManifestData();
      dispatchWhatsAppManifest(manifest);
    });
  }
}

function renderAssetsPillars() {
  const el = document.getElementById('vip-infra-grid');
  if (!el || typeof TRADE_DATA === 'undefined') return;
  const imgMap = {
    truck: '../assets/images/truck.jpg',
    cold: '../assets/images/warehouse.jpg',
    depot: '../assets/images/logistics.jpg',
  };

  el.innerHTML = TRADE_DATA.infrastructure.map(item => `
    <article class="asset-pillar-card">
      <div class="asset-pillar-img">
        <img src="${imgMap[item.icon] || '../assets/images/warehouse.jpg'}" alt="${item.title}" loading="lazy">
      </div>
      <div class="asset-pillar-body">
        <div class="asset-pillar-head">
          ${VIP_SVG[item.icon] || ''}
          <h3>${item.title}</h3>
        </div>
        <p>${item.desc}</p>
      </div>
    </article>
  `).join('');
}

function initVipNavigation() {
  const menuBtn = document.getElementById('vip-menu-btn');
  const drawer = document.getElementById('vip-mobile-drawer');
  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = drawer.hasAttribute('hidden');
    if (isHidden) {
      drawer.removeAttribute('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      drawer.setAttribute('hidden', '');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.setAttribute('hidden', '');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initVipNavigation();
  initHeroViewport();
  initCityMatrix();
  initTenderBuilder();
  renderAssetsPillars();
});
