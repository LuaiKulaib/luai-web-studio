/* =========================================================
   app.js — مجموعة السعيد للتجارة والتبريد (الفئة الفاخرة Pro)
   ========================================================= */
'use strict';

const PRO_SVG = {
  check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  plus: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  close: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  pin: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  supermarket: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l1-5h16l1 5"/><path d="M5 12v9h14v-9"/><path d="M9 21v-6h6v6"/></svg>',
  shop: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  warehouseTruck: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="7" width="14" height="10" rx="1"/><path d="M15 11h4l3 3v3h-7z"/><circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/></svg>',
  retailer: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  handshakeCheck: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  handshake: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  truck: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  cold: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/></svg>',
  depot: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/></svg>',
};

const FACILITY_VIEWS = [
  {
    key: 'depot',
    tabLabel: 'المستودعات المركزية',
    tabSub: '31,000 SQM',
    image: '../assets/images/warehouse.jpg',
    alt: 'مخازن استيراد المواد الغذائية المجمدة والسلع الاستهلاكية',
    badge: 'منذ 1979 · استيراد وتوزيع',
    code: 'CAP · 20,650 MT',
    title: 'نستورد الأطعمة المجمدة والسلع الاستهلاكية بمعايير تبريد متكاملة',
    desc: 'شريك التوريد المعتمد للسوق اليمني في الدواجن واللحوم المجمدة، الأجبان والزبدة، زيوت الطبخ، الأرز، السكر، المعكرونة، والخضروات والمأكولات البحرية من كبرى المصانع العالمية.',
    caption: 'مخازن تبريد مركزية بمساحة 31,000 متر مربع وقدرة استيعابية 20,650 طن متري ومراقبة حرارية 24/7.',
  },
  {
    key: 'fleet',
    tabLabel: 'الأسطول المبرّد',
    tabSub: '270+ REEFER',
    image: '../assets/images/truck.jpg',
    alt: 'أسطول شاحنات التوزيع المبرّدة لمجموعة السعيد',
    badge: 'سلسلة تبريد متصلة',
    code: 'FLEET · 270+ UNITS',
    title: 'سلسلة تبريد متكاملة من الميناء إلى المستهلك دون انقطاع',
    desc: 'أكثر من 270 قاطرة وشاحنة مبرّدة ومستودعات بقدرة 20,650 طن متري لضمان وصول البضائع بأعلى معايير الجودة والانتظام الزمني.',
    caption: 'تغطي قوافل النقل المبرّدة المسارات بين الموانئ والمراكز الرئيسية في 6 محافظات يومياً.',
  },
  {
    key: 'wholesale',
    tabLabel: 'منظومة التوزيع',
    tabSub: '70% COVERAGE',
    image: '../assets/images/logistics.jpg',
    alt: 'خدمة تجار الجملة والوكلاء في المحافظات اليمنية',
    badge: 'توزيع مباشر ووكلاء معتمدون',
    code: 'REACH · 432 WHOLESALERS',
    title: 'شريكك الموثوق في الجملة والوكالات والتوريد المؤسسي',
    desc: 'ندعم أكثر من 432 تاجر جملة و302 وكيل رئيسي وفرعي و256 منفذ فئة (أ/ب) في صنعاء وعدن وتعز والحديدة والمكلا وإب.',
    caption: 'مزيج توزيع متوازن يجمع 40% توزيعاً مباشراً و30% عبر الوكلاء المعتمدين في عموم الجمهورية.',
  },
];

const BRAND_META = {
  'AL-ASALA': {
    group: 'cold',
    temp: '-18°C تجميد عميق',
    pack: 'كرتون 10 كجم / حاوية 40 قدم',
    channel: 'سوبرماركت · جملة · مناقصات',
  },
  'GREEN MEADOW': {
    group: 'cold',
    temp: '+2°C إلى +4°C مبرّد',
    pack: 'كرتون معياري · عبوات مبرّدة',
    channel: 'فئة (أ/ب) · فنادق · تموين',
  },
  'PALM OIL': {
    group: 'staples',
    temp: '+18°C مخزن جاف مكيّف',
    pack: 'جالون 20 لتر / كرتون 12 عبوة',
    channel: 'تجار الجملة · الوكلاء · المنظمات',
  },
  'SANABEL': {
    group: 'staples',
    temp: '+18°C مخزن جاف مكيّف',
    pack: 'أكياس 25-50 كجم / كراتين تجزئة',
    channel: 'المؤسسات · الجملة · السوبرماركت',
  },
  'QUTOUF': {
    group: 'cold',
    temp: '-18°C تجميد سريع',
    pack: 'كرتون 10 كجم (20 × 500 جم)',
    channel: 'سوبرماركت · مطاعم · فنادق',
  },
  'DELTA SEA': {
    group: 'cold',
    temp: '-18°C تجميد بحري',
    pack: 'كرتون عازل 10-20 كجم',
    channel: 'ضيافة · فئة (أ) · جملة',
  },
};

const CITY_DEPOTS = {
  'صنعاء': {
    role: 'المركز الرئيسي للإدارة والتوزيع الاستراتيجي',
    capacityMt: '6,200 طن متري',
    capacityShare: '30% من السعة الوطنية',
    fleetCount: '82 شاحنة وقاطرة مبرّدة',
    depotArea: '9,200 متر مربع',
    outletsText: '9 فئة (أ) · 78 فئة (ب)',
    leadTime: '4 - 6 ساعات حضرياً / 24 ساعة للمحيط',
    wholesaleInfo: '148 تاجر جملة · 92 وكيل رئيسي وفرعي',
    thermalNote: 'غرف تجميد -18°C وتبريد +4°C مع مولدات احتياطية مزدوجة',
  },
  'عدن': {
    role: 'البوابة البحرية الجنوبية ومحور الاستيراد والتخليص',
    capacityMt: '4,800 طن متري',
    capacityShare: '23% من السعة الوطنية',
    fleetCount: '64 شاحنة وقاطرة مبرّدة',
    depotArea: '7,400 متر مربع',
    outletsText: '6 فئة (أ) · 54 فئة (ب)',
    leadTime: '3 - 5 ساعات من الميناء / نفس اليوم للمحافظات المجاورة',
    wholesaleInfo: '104 تاجر جملة · 68 وكيل رئيسي وفرعي',
    thermalNote: 'محطة ربط مباشر للحاويات المبرّدة 40 قدم فور وصول السفن',
  },
  'الحديدة': {
    role: 'محطة الاستقبال المينائية وإمداد الساحل الغربي',
    capacityMt: '4,150 طن متري',
    capacityShare: '20% من السعة الوطنية',
    fleetCount: '52 شاحنة وقاطرة مبرّدة',
    depotArea: '6,100 متر مربع',
    outletsText: '3 فئة (أ) · 28 فئة (ب)',
    leadTime: '3 - 6 ساعات محلياً / خطوط ترحيل يومية للمرتفعات',
    wholesaleInfo: '66 تاجر جملة · 48 وكيل رئيسي وفرعي',
    thermalNote: 'منصة تخزين انتقالي عالية السعة لخطوط الترحيل المبرّدة',
  },
  'تعز': {
    role: 'مركز التوزيع الإقليمي للقطاع الأوسط والتجاري',
    capacityMt: '2,300 طن متري',
    capacityShare: '11% من السعة الوطنية',
    fleetCount: '34 شاحنة وقاطرة مبرّدة',
    depotArea: '3,400 متر مربع',
    outletsText: '4 فئة (أ) · 32 فئة (ب)',
    leadTime: '6 - 10 ساعات داخل المدينة والمديريات',
    wholesaleInfo: '52 تاجر جملة · 40 وكيل رئيسي وفرعي',
    thermalNote: 'مخازن مجزأة للتبريد والتجميد تخدم قطاع التجزئة والجملة بكفاءة',
  },
  'المكلا': {
    role: 'المركز الشرقي لإمداد حضرموت والمحافظات الشرقية',
    capacityMt: '1,750 طن متري',
    capacityShare: '8.5% من السعة الوطنية',
    fleetCount: '24 شاحنة وقاطرة مبرّدة',
    depotArea: '2,700 متر مربع',
    outletsText: '2 فئة (أ) · 20 فئة (ب)',
    leadTime: '6 - 12 ساعة ساحلياً / 24 ساعة للوادي',
    wholesaleInfo: '34 تاجر جملة · 28 وكيل رئيسي وفرعي',
    thermalNote: 'استقبال مباشر عبر الميناء وخطوط توزيع منتظمة لأسواق الساحل والوادي',
  },
  'إب': {
    role: 'محور التوزيع الأخضر للمناطق الوسطى',
    capacityMt: '1,450 طن متري',
    capacityShare: '7.5% من السعة الوطنية',
    fleetCount: '20 شاحنة وقاطرة مبرّدة',
    depotArea: '2,200 متر مربع',
    outletsText: '2 فئة (أ) · 18 فئة (ب)',
    leadTime: '4 - 8 ساعات داخل المحافظة والمناطق المجاورة',
    wholesaleInfo: '28 تاجر جملة · 26 وكيل رئيسي وفرعي',
    thermalNote: 'توزيع يومي مباشر لمنافذ التجزئة والمراكز التجارية',
  },
};

const state = {
  selectedBrands: new Set(),
  activeFilter: 'all',
  activeCity: 'صنعاء',
  activeTab: 'accreditation',
  activeFacility: 0,
};

function resolveAssetPath(path) {
  if (!path) return '';
  if (path.startsWith('assets/')) return '../' + path;
  return path;
}

function renderHeroSwitcher() {
  const tabsEl = document.getElementById('hero-facility-tabs');
  const imgEl = document.getElementById('hero-main-img');
  const badgeEl = document.getElementById('hero-frame-badge');
  const codeEl = document.getElementById('hero-frame-code');
  const captionEl = document.getElementById('hero-frame-caption');
  const titleEl = document.getElementById('hero-title');
  const descEl = document.getElementById('hero-desc');
  if (!tabsEl) return;

  function applyFacility(idx) {
    state.activeFacility = idx;
    const view = FACILITY_VIEWS[idx] || FACILITY_VIEWS[0];
    if (imgEl) {
      imgEl.src = view.image;
      imgEl.alt = view.alt;
    }
    if (badgeEl) badgeEl.textContent = view.badge;
    if (codeEl) codeEl.textContent = view.code;
    if (captionEl) captionEl.textContent = view.caption;
    if (titleEl) titleEl.textContent = view.title;
    if (descEl) descEl.textContent = view.desc;

    tabsEl.querySelectorAll('.facility-tab-btn').forEach((btn, i) => {
      btn.classList.toggle('is-active', i === idx);
      btn.setAttribute('aria-selected', String(i === idx));
    });
  }

  tabsEl.innerHTML = FACILITY_VIEWS.map((v, idx) => `
    <button type="button" class="facility-tab-btn ${idx === 0 ? 'is-active' : ''}" data-facility="${idx}" role="tab" aria-selected="${idx === 0}">
      <strong>${v.tabLabel}</strong>
      <small>${v.tabSub}</small>
    </button>
  `).join('');

  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('.facility-tab-btn');
    if (!btn) return;
    applyFacility(Number(btn.dataset.facility));
  });

  applyFacility(0);
}

function renderBrands() {
  const grid = document.getElementById('pro-brands-grid');
  if (!grid || typeof TRADE_DATA === 'undefined') return;

  const filtered = TRADE_DATA.brands.filter(b => {
    if (state.activeFilter === 'all') return true;
    const meta = BRAND_META[b.en] || { group: 'cold' };
    return meta.group === state.activeFilter;
  });

  grid.innerHTML = filtered.map(b => {
    const meta = BRAND_META[b.en] || { temp: '-18°C', pack: 'معبأ قياسي', channel: 'جملة وتجزئة' };
    const selected = state.selectedBrands.has(b.name);
    return `
      <article class="brand-card ${selected ? 'is-selected' : ''}" style="--brand-color:${b.color};">
        <div>
          <div class="brand-card-top">
            <span class="brand-en-badge">${b.en}</span>
            <span class="temp-badge">${meta.temp}</span>
          </div>
          <h3>${b.name}</h3>
          <p class="brand-cat">${b.cat}</p>
          <ul class="brand-specs">
            <li><span>التعبئة القياسية</span><strong>${meta.pack}</strong></li>
            <li><span>قنوات التوريد</span><strong>${meta.channel}</strong></li>
          </ul>
        </div>
        <button type="button" class="brand-toggle-btn" data-brand-toggle="${b.name}" aria-pressed="${selected}">
          ${selected ? PRO_SVG.check : PRO_SVG.plus}
          <span>${selected ? 'مضاف لطلب التسعير' : 'إضافة لطلب التسعير'}</span>
        </button>
      </article>
    `;
  }).join('');
}

function syncInquiryCartUI() {
  const count = state.selectedBrands.size;
  const headerCount = document.getElementById('header-cart-count');
  const dockCount = document.getElementById('dock-count');
  const formCount = document.getElementById('form-brand-count');
  const chipsEl = document.getElementById('dock-chips');
  const clearBtn = document.getElementById('clear-cart-btn');

  if (headerCount) headerCount.textContent = String(count);
  if (dockCount) dockCount.textContent = String(count);
  if (formCount) formCount.textContent = String(count);
  if (clearBtn) clearBtn.hidden = count === 0;

  if (chipsEl) {
    if (count === 0) {
      chipsEl.innerHTML = '<span class="dock-empty">لم يتم تحديد أصناف بعد — يمكنك النقر على "إضافة لطلب التسعير" في أي علامة أعلاه.</span>';
    } else {
      chipsEl.innerHTML = Array.from(state.selectedBrands).map(name => `
        <span class="dock-chip">
          <span>${name}</span>
          <button type="button" data-remove-brand="${name}" aria-label="إزالة ${name}">${PRO_SVG.close}</button>
        </span>
      `).join('');
    }
  }

  document.querySelectorAll('#form-brands-list input[type="checkbox"]').forEach(cb => {
    cb.checked = state.selectedBrands.has(cb.value);
  });

  renderBrands();
}

function initBrandsModule() {
  const filtersEl = document.getElementById('brand-filters');
  const grid = document.getElementById('pro-brands-grid');
  const dockChips = document.getElementById('dock-chips');
  const clearBtn = document.getElementById('clear-cart-btn');
  const formList = document.getElementById('form-brands-list');
  const headerCartBtn = document.getElementById('header-cart-btn');

  if (formList && typeof TRADE_DATA !== 'undefined') {
    formList.innerHTML = TRADE_DATA.brands.map(b => `
      <label class="brand-check-pill">
        <input type="checkbox" value="${b.name}">
        <span>${b.name}</span>
      </label>
    `).join('');

    formList.addEventListener('change', e => {
      const cb = e.target;
      if (!cb || cb.type !== 'checkbox') return;
      if (cb.checked) state.selectedBrands.add(cb.value);
      else state.selectedBrands.delete(cb.value);
      syncInquiryCartUI();
    });
  }

  if (filtersEl) {
    filtersEl.addEventListener('click', e => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      state.activeFilter = btn.dataset.filter || 'all';
      filtersEl.querySelectorAll('.filter-pill').forEach(p => {
        p.classList.toggle('is-active', p === btn);
      });
      renderBrands();
    });
  }

  if (grid) {
    grid.addEventListener('click', e => {
      const btn = e.target.closest('[data-brand-toggle]');
      if (!btn) return;
      const brandName = btn.dataset.brandToggle;
      if (state.selectedBrands.has(brandName)) state.selectedBrands.delete(brandName);
      else state.selectedBrands.add(brandName);
      syncInquiryCartUI();
    });
  }

  if (dockChips) {
    dockChips.addEventListener('click', e => {
      const rm = e.target.closest('[data-remove-brand]');
      if (!rm) return;
      state.selectedBrands.delete(rm.dataset.removeBrand);
      syncInquiryCartUI();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.selectedBrands.clear();
      syncInquiryCartUI();
    });
  }

  if (headerCartBtn) {
    headerCartBtn.addEventListener('click', () => {
      const inquirySec = document.getElementById('inquiry');
      if (inquirySec) inquirySec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  syncInquiryCartUI();
}

function renderCityDossier(city) {
  const dossier = document.getElementById('city-dossier');
  const selector = document.getElementById('city-selector');
  if (!dossier) return;

  state.activeCity = city;
  const info = CITY_DEPOTS[city] || CITY_DEPOTS['صنعاء'];

  if (selector) {
    selector.querySelectorAll('.city-tab-btn').forEach(btn => {
      const active = btn.dataset.city === city;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });
  }

  dossier.innerHTML = `
    <div class="dossier-head">
      <div class="dossier-title-group">
        <h3>فرع ومستودعات ${city} — ${info.role}</h3>
        <p>${info.thermalNote}</p>
      </div>
      <span class="dossier-status-pill">تشغيل نشط · تغطية مضمونة</span>
    </div>

    <div class="dossier-metrics-grid">
      <div class="dossier-stat">
        <span class="dossier-stat-label">السعة التبريدية المحلية</span>
        <strong class="dossier-stat-val num-font">${info.capacityMt}</strong>
        <small>${info.capacityShare}</small>
      </div>
      <div class="dossier-stat">
        <span class="dossier-stat-label">أسطول النقل المخصّص</span>
        <strong class="dossier-stat-val">${info.fleetCount}</strong>
        <small>تجهيز تبريد وتجميد متصل</small>
      </div>
      <div class="dossier-stat">
        <span class="dossier-stat-label">مساحة المستودعات</span>
        <strong class="dossier-stat-val num-font">${info.depotArea}</strong>
        <small>ضمن 31,000 م² إجمالاً</small>
      </div>
      <div class="dossier-stat">
        <span class="dossier-stat-label">منافذ التجزئة النشطة</span>
        <strong class="dossier-stat-val">${info.outletsText}</strong>
        <small>تزويد منتظم ومباشر</small>
      </div>
      <div class="dossier-stat">
        <span class="dossier-stat-label">زمن التوصيل الإقليمي</span>
        <strong class="dossier-stat-val" style="font-size:1.02rem;">${info.leadTime}</strong>
        <small>جدولة شحن دقيقة</small>
      </div>
    </div>

    <div class="dossier-foot">
      <span class="dossier-coverage-note">شبكة الشركاء بالمنطقة: ${info.wholesaleInfo}</span>
      <button type="button" class="btn-navy-sm" id="dossier-select-city-btn">
        <span>اعتماد فرع ${city} في طلب التسعير أو الوكالة</span>
      </button>
    </div>
  `;

  const selectBtn = document.getElementById('dossier-select-city-btn');
  if (selectBtn) {
    selectBtn.addEventListener('click', () => {
      const accCity = document.getElementById('acc-city');
      const whCity = document.getElementById('wh-city');
      if (accCity) accCity.value = city;
      if (whCity) whCity.value = city;
      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function renderNetworkSection() {
  if (typeof TRADE_DATA === 'undefined') return;
  const selector = document.getElementById('city-selector');
  const directEl = document.getElementById('pro-direct-grid');
  const indirectEl = document.getElementById('pro-indirect-grid');

  if (selector) {
    selector.innerHTML = TRADE_DATA.cities.map(c => {
      const info = CITY_DEPOTS[c];
      return `
        <button type="button" class="city-tab-btn ${c === state.activeCity ? 'is-active' : ''}" data-city="${c}" role="tab" aria-selected="${c === state.activeCity}">
          <span class="city-row-top">${PRO_SVG.pin} <span>${c}</span></span>
          <small>${info ? info.capacityMt : ''}</small>
        </button>
      `;
    }).join('');

    selector.addEventListener('click', e => {
      const btn = e.target.closest('.city-tab-btn');
      if (!btn) return;
      renderCityDossier(btn.dataset.city);
    });
  }

  if (directEl) {
    directEl.innerHTML = TRADE_DATA.directNetwork.map(item => `
      <div class="mini-metric-card">
        <div class="mini-metric-icon">${PRO_SVG[item.icon] || ''}</div>
        <div class="mini-metric-val">${item.value}</div>
        <div class="mini-metric-lbl">${item.label}</div>
      </div>
    `).join('');
  }

  if (indirectEl) {
    indirectEl.innerHTML = TRADE_DATA.indirectNetwork.map(item => `
      <div class="mini-metric-card">
        <div class="mini-metric-icon">${PRO_SVG[item.icon] || ''}</div>
        <div class="mini-metric-val">${item.value}</div>
        <div class="mini-metric-lbl">${item.label}</div>
      </div>
    `).join('');
  }

  renderCityDossier(state.activeCity);
}

function renderInfrastructure() {
  const el = document.getElementById('pro-infra-grid');
  if (!el || typeof TRADE_DATA === 'undefined') return;
  const thumbMap = {
    truck: '../assets/images/truck.jpg',
    cold: '../assets/images/warehouse.jpg',
    depot: '../assets/images/logistics.jpg',
  };

  el.innerHTML = TRADE_DATA.infrastructure.map(item => `
    <article class="infra-card">
      <div class="infra-thumb">
        <img src="${resolveAssetPath(thumbMap[item.icon] || '../assets/images/warehouse.jpg')}" alt="${item.title}" loading="lazy">
      </div>
      <div class="infra-body">
        <div class="infra-icon-head">
          ${PRO_SVG[item.icon] || ''}
          <h3>${item.title}</h3>
        </div>
        <p>${item.desc}</p>
      </div>
    </article>
  `).join('');
}

function initDualInquiryForm() {
  const tabsEl = document.getElementById('inquiry-tabs');
  const accPanel = document.getElementById('panel-accreditation');
  const whPanel = document.getElementById('panel-wholesale');
  const submitText = document.getElementById('submit-btn-text');
  const form = document.getElementById('pro-inquiry-form');
  const feedback = document.getElementById('pro-form-feedback');
  const accCity = document.getElementById('acc-city');
  const whCity = document.getElementById('wh-city');

  if (typeof TRADE_DATA !== 'undefined') {
    const cityOptions = TRADE_DATA.cities.map(c => `<option value="${c}">${c}</option>`).join('');
    if (accCity) accCity.innerHTML = cityOptions;
    if (whCity) whCity.innerHTML = cityOptions;
  }

  function setActiveTab(tab) {
    state.activeTab = tab;
    const isAcc = tab === 'accreditation';
    if (accPanel) accPanel.hidden = !isAcc;
    if (whPanel) whPanel.hidden = isAcc;
    if (submitText) {
      submitText.textContent = isAcc
        ? 'إرسال طلب الاعتماد عبر واتساب المبيعات'
        : 'إرسال طلب تسعيرة الجملة والمؤسسات عبر واتساب';
    }
    if (tabsEl) {
      tabsEl.querySelectorAll('.inq-tab').forEach(btn => {
        const active = btn.dataset.tab === tab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });
    }
    if (feedback) {
      feedback.hidden = true;
      feedback.className = 'form-feedback';
    }
  }

  if (tabsEl) {
    tabsEl.addEventListener('click', e => {
      const btn = e.target.closest('.inq-tab');
      if (!btn) return;
      setActiveTab(btn.dataset.tab);
    });
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!feedback) return;

      const selectedList = state.selectedBrands.size > 0
        ? Array.from(state.selectedBrands).join('، ')
        : 'جميع العلامات التجارية المتوفرة';

      let messageLines = [];

      if (state.activeTab === 'accreditation') {
        const name = (document.getElementById('acc-name')?.value || '').trim();
        const phone = (document.getElementById('acc-phone')?.value || '').trim();
        const city = document.getElementById('acc-city')?.value || 'صنعاء';
        const tier = document.getElementById('acc-tier')?.value || '';
        const exp = document.getElementById('acc-exp')?.value || '';
        const capacity = (document.getElementById('acc-capacity')?.value || '').trim() || 'سيتم التوضيح عند التواصل';
        const notes = (document.getElementById('acc-notes')?.value || '').trim();

        if (!name || !phone) {
          feedback.hidden = false;
          feedback.className = 'form-feedback is-error';
          feedback.textContent = 'يرجى إدخال اسم الشركة أو التاجر المتقدم ورقم الهاتف لإتمام إرسال الطلب.';
          return;
        }

        messageLines = [
          'طلب اعتماد وكالة معتمدة — مجموعة السعيد للتجارة والتبريد (الفئة الفاخرة Pro)',
          '----------------------------------',
          `اسم المتقدم / الشركة: ${name}`,
          `رقم التواصل: ${phone}`,
          `المحافظة المستهدفة: ${city}`,
          `درجة الوكالة: ${tier}`,
          `سنوات الخبرة: ${exp}`,
          `القدرة التخزينية والأسطول: ${capacity}`,
          `العلامات المطلوبة: ${selectedList}`,
        ];
        if (notes) messageLines.push(`ملاحظات: ${notes}`);
      } else {
        const name = (document.getElementById('wh-name')?.value || '').trim();
        const phone = (document.getElementById('wh-phone')?.value || '').trim();
        const segment = document.getElementById('wh-segment')?.value || '';
        const city = document.getElementById('wh-city')?.value || 'صنعاء';
        const cadence = document.getElementById('wh-cadence')?.value || '';
        const volume = (document.getElementById('wh-volume')?.value || '').trim() || 'حسب عرض الأسعار';
        const notes = (document.getElementById('wh-notes')?.value || '').trim();

        if (!name || !phone) {
          feedback.hidden = false;
          feedback.className = 'form-feedback is-error';
          feedback.textContent = 'يرجى إدخال اسم المنشأة أو السوبرماركت ورقم التواصل الرسمي لإتمام الطلب.';
          return;
        }

        messageLines = [
          'طلب توريد جملة ومؤسسات — مجموعة السعيد للتجارة والتبريد (الفئة الفاخرة Pro)',
          '----------------------------------',
          `اسم المنشأة / الجهة: ${name}`,
          `رقم التواصل: ${phone}`,
          `تصنيف المشتري: ${segment}`,
          `مدينة التسليم (الفرع): ${city}`,
          `دورية التوريد: ${cadence}`,
          `الحجم التقديري: ${volume}`,
          `العلامات المطلوبة: ${selectedList}`,
        ];
        if (notes) messageLines.push(`ملاحظات إضافية: ${notes}`);
      }

      const waNumber = typeof TRADE_CONFIG !== 'undefined' ? TRADE_CONFIG.whatsappNumber : '967782259937';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`;

      feedback.hidden = false;
      feedback.className = 'form-feedback is-success';
      feedback.innerHTML = `
        تم تجهيز ملخص الطلب المؤسسي بنجاح وإرفاق (${state.selectedBrands.size || 6}) أصناف.
        <a href="${waUrl}" target="_blank" rel="noopener" style="text-decoration:underline;margin-right:8px;">افتح المحادثة في واتساب الآن</a>
      `;

      window.open(waUrl, '_blank', 'noopener');
    });
  }

  setActiveTab('accreditation');
}

function initHeaderNavigation() {
  const menuBtn = document.getElementById('pro-menu-btn');
  const drawer = document.getElementById('pro-mobile-drawer');
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
  initHeaderNavigation();
  renderHeroSwitcher();
  initBrandsModule();
  renderNetworkSection();
  renderInfrastructure();
  initDualInquiryForm();
});
