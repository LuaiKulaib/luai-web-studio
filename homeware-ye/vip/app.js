/* ============================================================
   معرض الصقر للأدوات المنزلية — VIP Tier ($250)
   National Wholesale Distribution Hub:
   - Vehicle Load Estimator (شحن جزئي / دينة 3 طن / تريلا 20 طن)
   - Sub-Distributor Volume Bonus Tiers (5% / 10% / 15%)
   - 3-Currency Sync (USD / SAR / YER)
   - Printable & Copyable Pro-Forma Commercial Manifest Modal
   - Governorate Sub-Distributor Application Portal -> WhatsApp (VIP)
   ============================================================ */

(function () {
  'use strict';

  const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', label: 'الدولار (USD)', rate: 1, decimals: 2 },
    SAR: { code: 'SAR', symbol: 'ر.س', label: 'الريال السعودي (SAR)', rate: 3.75, decimals: 0 },
    YER: { code: 'YER', symbol: 'ر.ي', label: 'الريال اليمني (YER)', rate: 535, decimals: 0 }
  };

  const VEHICLES = {
    partial: {
      id: 'partial',
      label: 'شحن جزئي',
      maxCartons: 25,
      maxCbm: 3.6,
      maxWeightKg: 600,
      note: 'مجمع عبر مكاتب النقل البري من حي شعوب'
    },
    dyna3: {
      id: 'dyna3',
      label: 'دينة 3 طن',
      maxCartons: 120,
      maxCbm: 17.5,
      maxWeightKg: 3000,
      note: 'تحميل مباشر في ساحة مخازن حي شعوب'
    },
    trailer20: {
      id: 'trailer20',
      label: 'تريلا 20 طن',
      maxCartons: 650,
      maxCbm: 68.0,
      maxWeightKg: 20000,
      note: 'توريد مركزي لكبار الموزعين وسلاسل المعارض'
    }
  };

  // Sub-distributor volume bonus thresholds in USD
  const BONUS_TIERS = [
    { pct: 15, minUsd: 10000, label: 'موزع معتمد 15%' },
    { pct: 10, minUsd: 4000, label: 'موزع ذهبي 10%' },
    { pct: 5, minUsd: 1500, label: 'موزع فضي 5%' }
  ];

  // Physical packing, CBM, weight & indicative wholesale prices for all 12 real products in YE_DATA
  const SKU_MASTER = {
    'ye-01': {
      sku: 'SQ-YE01',
      defaultUnit: 'carton',
      cartonPriceUsd: 148,
      dozenPriceUsd: 428,
      cartonLabel: 'كرتون (4 أطقم × 10 قطع)',
      dozenLabel: 'درزن (12 طقم / 3 كراتين)',
      cartonCbm: 0.14,
      cartonKg: 24,
      dozenCartonsEquiv: 3
    },
    'ye-02': {
      sku: 'SQ-YE02',
      defaultUnit: 'carton',
      cartonPriceUsd: 162,
      dozenPriceUsd: 312,
      cartonLabel: 'كرتون (6 أطقم ستيل)',
      dozenLabel: 'درزن (12 قدر مشكلة)',
      cartonCbm: 0.15,
      cartonKg: 26,
      dozenCartonsEquiv: 2
    },
    'ye-03': {
      sku: 'SQ-YE03',
      defaultUnit: 'dozen',
      cartonPriceUsd: 210,
      dozenPriceUsd: 54,
      cartonLabel: 'كرتون (4 درازن / 48 مقلاة)',
      dozenLabel: 'درزن (ربطة 12 مقلاة)',
      cartonCbm: 0.11,
      cartonKg: 22,
      dozenCartonsEquiv: 0.25
    },
    'ye-04': {
      sku: 'SQ-YE04',
      defaultUnit: 'carton',
      cartonPriceUsd: 132,
      dozenPriceUsd: 256,
      cartonLabel: 'كرتون (6 أطقم ضيافة)',
      dozenLabel: 'درزن (12 طقم شاي)',
      cartonCbm: 0.13,
      cartonKg: 17,
      dozenCartonsEquiv: 2
    },
    'ye-05': {
      sku: 'SQ-YE05',
      defaultUnit: 'carton',
      cartonPriceUsd: 118,
      dozenPriceUsd: 118,
      cartonLabel: 'كرتون (12 طقم هدايا)',
      dozenLabel: 'درزن (12 طقم منقوش)',
      cartonCbm: 0.12,
      cartonKg: 18,
      dozenCartonsEquiv: 1
    },
    'ye-06': {
      sku: 'SQ-YE06',
      defaultUnit: 'carton',
      cartonPriceUsd: 136,
      dozenPriceUsd: 396,
      cartonLabel: 'كرتون (4 أطقم × 24 قطعة)',
      dozenLabel: 'درزن (12 طقم سفرة)',
      cartonCbm: 0.12,
      cartonKg: 28,
      dozenCartonsEquiv: 3
    },
    'ye-07': {
      sku: 'SQ-YE07',
      defaultUnit: 'dozen',
      cartonPriceUsd: 92,
      dozenPriceUsd: 24,
      cartonLabel: 'كرتون (4 درازن / 48 طبق)',
      dozenLabel: 'درزن (12 صحن تقديم)',
      cartonCbm: 0.09,
      cartonKg: 19,
      dozenCartonsEquiv: 0.25
    },
    'ye-08': {
      sku: 'SQ-YE08',
      defaultUnit: 'carton',
      cartonPriceUsd: 68,
      dozenPriceUsd: 36,
      cartonLabel: 'كرتون (24 برطمان زجاج)',
      dozenLabel: 'درزن (12 برطمان)',
      cartonCbm: 0.11,
      cartonKg: 16,
      dozenCartonsEquiv: 0.5
    },
    'ye-09': {
      sku: 'SQ-YE09',
      defaultUnit: 'dozen',
      cartonPriceUsd: 124,
      dozenPriceUsd: 32,
      cartonLabel: 'كرتون (4 درازن / 48 طقم)',
      dozenLabel: 'درزن (12 طقم حافظات)',
      cartonCbm: 0.16,
      cartonKg: 14,
      dozenCartonsEquiv: 0.25
    },
    'ye-10': {
      sku: 'SQ-YE10',
      defaultUnit: 'carton',
      cartonPriceUsd: 156,
      dozenPriceUsd: 156,
      cartonLabel: 'كرتون (12 جهاز 220V)',
      dozenLabel: 'درزن (12 جهاز كهربائي)',
      cartonCbm: 0.14,
      cartonKg: 20,
      dozenCartonsEquiv: 1
    },
    'ye-11': {
      sku: 'SQ-YE11',
      defaultUnit: 'dozen',
      cartonPriceUsd: 184,
      dozenPriceUsd: 48,
      cartonLabel: 'كرتون (4 درازن / 48 مطارة)',
      dozenLabel: 'درزن (12 مطارة ستانلس)',
      cartonCbm: 0.10,
      cartonKg: 16,
      dozenCartonsEquiv: 0.25
    },
    'ye-12': {
      sku: 'SQ-YE12',
      defaultUnit: 'dozen',
      cartonPriceUsd: 84,
      dozenPriceUsd: 22,
      cartonLabel: 'كرتون (4 درازن / 48 قطعة)',
      dozenLabel: 'درزن (ربطة 12 قطعة)',
      cartonCbm: 0.15,
      cartonKg: 15,
      dozenCartonsEquiv: 0.25
    }
  };

  const FREIGHT_LINES = [
    { id: 'sanaa', gov: 'صنعاء والأمانة', eta: '2 - 4 ساعات', hub: 'توصيل مباشر من مخازن حي شعوب', note: 'توصيل مجاني داخل أمانة العاصمة' },
    { id: 'aden', gov: 'عدن', eta: '24 - 36 ساعة', hub: 'مكاتب نقل خط عدن والتريلات المبردة/المغلقة', note: 'تغليف فوم ومضاعف للبورسلين والزجاج' },
    { id: 'taiz', gov: 'تعز', eta: '12 - 24 ساعة', hub: 'خط الحوبان والمدينة — ترحيل يومي', note: 'شحن جزئي ودينات يومية' },
    { id: 'hodiedah', gov: 'الحديدة', eta: '8 - 14 ساعة', hub: 'خط الساحل الغربي السريع', note: 'تسليم مجاني لمكتب الترحيل قبل 4:30 م' },
    { id: 'ibb', gov: 'إب', eta: '6 - 10 ساعات', hub: 'خط ذمار – إب اليومي', note: 'رحلتان يومياً من صنعاء' },
    { id: 'mukalla', gov: 'المكلا وحضرموت', eta: '36 - 48 ساعة', hub: 'ناقلات الخط الشرقي المعتمدة', note: 'رص وتحميل محكم للدينات والتريلات' },
    { id: 'marib', gov: 'مأرب وذمار والبيضاء وعمران', eta: '4 - 18 ساعة', hub: 'كافة خطوط النقل البري من صنعاء', note: 'تغطية شاملة لجميع المحافظات' }
  ];

  const LOAD_PRESETS = [
    {
      id: 'partial-starter',
      code: 'LOAD-PARTIAL',
      vehicle: 'partial',
      title: 'شحن جزئي — تجهيز محل متكامل',
      tierNote: 'يفتح حافز الموزع 5%',
      desc: 'تشكيلة سريعة الدوران من جميع الأقسام الستة مناسبة للشحن البري الجزئي لافتتاح أو تجديد أرفف المحلات.',
      items: {
        'ye-01': { qty: 3, unit: 'carton' },
        'ye-02': { qty: 2, unit: 'carton' },
        'ye-03': { qty: 4, unit: 'dozen' },
        'ye-04': { qty: 2, unit: 'carton' },
        'ye-06': { qty: 2, unit: 'carton' },
        'ye-08': { qty: 3, unit: 'carton' },
        'ye-10': { qty: 2, unit: 'carton' },
        'ye-12': { qty: 4, unit: 'dozen' }
      }
    },
    {
      id: 'dyna-3ton',
      code: 'LOAD-DYNA3T',
      vehicle: 'dyna3',
      title: 'حمولة دينة 3 طن — توزيع محافظات',
      tierNote: 'يفتح حافز الموزع 15%',
      desc: 'حمولة دينة متكاملة بتوازن مثالي بين قدور الجرانيت والاستيل، الترامس، السفرة، والكهربائيات بهامش ربح مرتفع.',
      items: {
        'ye-01': { qty: 18, unit: 'carton' },
        'ye-02': { qty: 14, unit: 'carton' },
        'ye-03': { qty: 16, unit: 'dozen' },
        'ye-04': { qty: 14, unit: 'carton' },
        'ye-05': { qty: 12, unit: 'carton' },
        'ye-06': { qty: 12, unit: 'carton' },
        'ye-07': { qty: 16, unit: 'dozen' },
        'ye-08': { qty: 14, unit: 'carton' },
        'ye-09': { qty: 16, unit: 'dozen' },
        'ye-10': { qty: 10, unit: 'carton' },
        'ye-11': { qty: 12, unit: 'dozen' },
        'ye-12': { qty: 16, unit: 'dozen' }
      }
    },
    {
      id: 'trailer-20ton',
      code: 'LOAD-TRAILER20T',
      vehicle: 'trailer20',
      title: 'حمولة تريلا 20 طن — موزع إقليمي',
      tierNote: 'أقصى شريحة حافز 15%',
      desc: 'توريد ضخم لكبار الموزعين ومستودعات الجملة في عدن، تعز، الحديدة، والمكلا بأكواد الـ 12 صنف كاملة.',
      items: {
        'ye-01': { qty: 80, unit: 'carton' },
        'ye-02': { qty: 65, unit: 'carton' },
        'ye-03': { qty: 45, unit: 'carton' },
        'ye-04': { qty: 55, unit: 'carton' },
        'ye-05': { qty: 50, unit: 'carton' },
        'ye-06': { qty: 60, unit: 'carton' },
        'ye-07': { qty: 40, unit: 'carton' },
        'ye-08': { qty: 55, unit: 'carton' },
        'ye-09': { qty: 45, unit: 'carton' },
        'ye-10': { qty: 45, unit: 'carton' },
        'ye-11': { qty: 40, unit: 'carton' },
        'ye-12': { qty: 45, unit: 'carton' }
      }
    }
  ];

  // Build normalized product list from YE_DATA.products
  const products = (YE_DATA.products || []).map((p) => {
    const cleanImg = p.img.startsWith('../') ? p.img : '../' + p.img.replace(/^\/+/, '');
    const meta = SKU_MASTER[p.id] || {
      sku: p.id.toUpperCase(),
      defaultUnit: 'carton',
      cartonPriceUsd: 100,
      dozenPriceUsd: 40,
      cartonLabel: p.packing,
      dozenLabel: 'درزن (12 قطعة)',
      cartonCbm: 0.12,
      cartonKg: 18,
      dozenCartonsEquiv: 0.5
    };
    return { ...p, ...meta, img: cleanImg };
  });

  const state = {
    currency: 'USD',
    category: 'all',
    search: '',
    viewMode: 'cards', // 'cards' | 'table'
    vehicleId: 'dyna3',
    govId: 'sanaa',
    activePresetId: null,
    cardUnits: {},
    manifest: {}, // { id: { qty, unit } }
    refCode: `SAQR-VIP-2026-${Math.floor(1000 + Math.random() * 9000)}`
  };

  products.forEach((p) => {
    state.cardUnits[p.id] = p.defaultUnit;
  });

  const els = {
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileNav: document.getElementById('mobileNav'),
    headerProformaBtn: document.getElementById('headerProformaBtn'),
    headerManifestCount: document.getElementById('headerManifestCount'),
    presetsGrid: document.getElementById('presetsGrid'),
    vipCategoryTabs: document.getElementById('vipCategoryTabs'),
    vipSearchInput: document.getElementById('vipSearchInput'),
    vipViewCardsBtn: document.getElementById('vipViewCardsBtn'),
    vipViewTableBtn: document.getElementById('vipViewTableBtn'),
    vipCatalogEl: document.getElementById('vipCatalogEl'),
    vipCatalogEmpty: document.getElementById('vipCatalogEmpty'),
    clearManifestBtn: document.getElementById('clearManifestBtn'),
    vehicleSelector: document.getElementById('vehicleSelector'),
    loadFillPercentText: document.getElementById('loadFillPercentText'),
    loadProgressFill: document.getElementById('loadProgressFill'),
    loadStatsText: document.getElementById('loadStatsText'),
    loadCapacityAlert: document.getElementById('loadCapacityAlert'),
    bonusTierBadge: document.getElementById('bonusTierBadge'),
    bonusProgressPills: document.getElementById('bonusProgressPills'),
    bonusHintText: document.getElementById('bonusHintText'),
    estGovSelect: document.getElementById('estGovSelect'),
    estGovMeta: document.getElementById('estGovMeta'),
    estCartonsCount: document.getElementById('estCartonsCount'),
    estDozensCount: document.getElementById('estDozensCount'),
    estItemsList: document.getElementById('estItemsList'),
    estWeightCbm: document.getElementById('estWeightCbm'),
    estSubtotalUsd: document.getElementById('estSubtotalUsd'),
    estSubtotalSar: document.getElementById('estSubtotalSar'),
    estSubtotalYer: document.getElementById('estSubtotalYer'),
    estBonusAmount: document.getElementById('estBonusAmount'),
    estNetTotal: document.getElementById('estNetTotal'),
    estAltTotals: document.getElementById('estAltTotals'),
    openProformaModalBtn: document.getElementById('openProformaModalBtn'),
    estWhatsappBtn: document.getElementById('estWhatsappBtn'),
    freightNetworkGrid: document.getElementById('freightNetworkGrid'),
    distForm: document.getElementById('distForm'),
    distCompany: document.getElementById('distCompany'),
    distPhone: document.getElementById('distPhone'),
    distGov: document.getElementById('distGov'),
    distFleet: document.getElementById('distFleet'),
    distMonthlyBracket: document.getElementById('distMonthlyBracket'),
    distNotes: document.getElementById('distNotes'),
    distCategoriesWrap: document.getElementById('distCategoriesWrap'),
    distProjectedBonus: document.getElementById('distProjectedBonus'),
    vipFaqList: document.getElementById('vipFaqList'),
    proformaBackdrop: document.getElementById('proformaBackdrop'),
    proformaModal: document.getElementById('proformaModal'),
    closeProformaModalBtn: document.getElementById('closeProformaModalBtn'),
    pfMerchantInput: document.getElementById('pfMerchantInput'),
    pfPhoneInput: document.getElementById('pfPhoneInput'),
    pfGovSelect: document.getElementById('pfGovSelect'),
    pfVehicleSelect: document.getElementById('pfVehicleSelect'),
    pfRefCode: document.getElementById('pfRefCode'),
    pfDate: document.getElementById('pfDate'),
    pfCurrencyDisplay: document.getElementById('pfCurrencyDisplay'),
    pfMerchantDisplay: document.getElementById('pfMerchantDisplay'),
    pfRouteDisplay: document.getElementById('pfRouteDisplay'),
    pfTableBody: document.getElementById('pfTableBody'),
    pfTotalUnits: document.getElementById('pfTotalUnits'),
    pfLoadSummary: document.getElementById('pfLoadSummary'),
    pfGrossTotal: document.getElementById('pfGrossTotal'),
    pfBonusLabel: document.getElementById('pfBonusLabel'),
    pfBonusValue: document.getElementById('pfBonusValue'),
    pfNetTotal: document.getElementById('pfNetTotal'),
    pfThreeCurrencies: document.getElementById('pfThreeCurrencies'),
    pfCopyBtn: document.getElementById('pfCopyBtn'),
    pfPrintBtn: document.getElementById('pfPrintBtn'),
    pfWhatsappBtn: document.getElementById('pfWhatsappBtn'),
    vipToast: document.getElementById('vipToast')
  };

  let toastTimer = null;

  function showToast(msg) {
    if (!els.vipToast) return;
    els.vipToast.textContent = msg;
    els.vipToast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.vipToast.hidden = true;
    }, 2800);
  }

  function formatMoney(usdAmount, currencyCode) {
    const code = currencyCode || state.currency;
    const cur = CURRENCIES[code] || CURRENCIES.USD;
    const raw = usdAmount * cur.rate;
    const val = code === 'YER' ? Math.round(raw / 10) * 10 : raw;
    const formatted = val.toLocaleString('en-US', {
      minimumFractionDigits: cur.decimals,
      maximumFractionDigits: cur.decimals
    });
    return code === 'USD' ? `$${formatted}` : `${formatted} ${cur.symbol}`;
  }

  function getUnitPriceUsd(product, unit) {
    return unit === 'dozen' ? product.dozenPriceUsd : product.cartonPriceUsd;
  }

  function getUnitShort(unit) {
    return unit === 'dozen' ? 'درزن' : 'كرتون';
  }

  function getBonusTier(grossUsd) {
    for (let i = 0; i < BONUS_TIERS.length; i += 1) {
      if (grossUsd >= BONUS_TIERS[i].minUsd) {
        return BONUS_TIERS[i];
      }
    }
    return { pct: 0, minUsd: 0, label: 'طلب أساسي (0%)' };
  }

  function computeMetrics() {
    const entries = Object.entries(state.manifest);
    let cartonsTotal = 0;
    let dozensTotal = 0;
    let equivCartons = 0;
    let totalCbm = 0;
    let totalKg = 0;
    let grossUsd = 0;

    const lines = entries.map(([id, entry]) => {
      const p = products.find((item) => item.id === id);
      if (!p) return null;
      const unit = entry.unit || p.defaultUnit;
      const qty = entry.qty || 0;
      const unitPriceUsd = getUnitPriceUsd(p, unit);
      const lineUsd = unitPriceUsd * qty;
      const cartonFactor = unit === 'dozen' ? p.dozenCartonsEquiv : 1;
      const lineCartonEquiv = qty * cartonFactor;

      if (unit === 'dozen') dozensTotal += qty;
      else cartonsTotal += qty;

      equivCartons += lineCartonEquiv;
      totalCbm += lineCartonEquiv * p.cartonCbm;
      totalKg += lineCartonEquiv * p.cartonKg;
      grossUsd += lineUsd;

      return {
        product: p,
        unit,
        qty,
        unitPriceUsd,
        lineUsd,
        lineCartonEquiv
      };
    }).filter(Boolean);

    const vehicle = VEHICLES[state.vehicleId] || VEHICLES.dyna3;
    const cbmPct = (totalCbm / vehicle.maxCbm) * 100;
    const weightPct = (totalKg / vehicle.maxWeightKg) * 100;
    const cartonPct = (equivCartons / vehicle.maxCartons) * 100;
    const fillPct = Math.round(Math.max(cbmPct, weightPct, cartonPct));

    const bonusTier = getBonusTier(grossUsd);
    const bonusUsd = grossUsd * (bonusTier.pct / 100);
    const netUsd = grossUsd - bonusUsd;

    return {
      lines,
      skuCount: lines.length,
      cartonsTotal,
      dozensTotal,
      totalUnits: cartonsTotal + dozensTotal,
      equivCartons,
      totalCbm,
      totalKg,
      vehicle,
      fillPct,
      grossUsd,
      bonusTier,
      bonusUsd,
      netUsd
    };
  }

  function syncCurrencyButtons() {
    document.querySelectorAll('[data-currency]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.currency === state.currency);
    });
  }

  function renderPresets() {
    if (!els.presetsGrid) return;
    els.presetsGrid.innerHTML = LOAD_PRESETS.map((preset) => {
      let estUsd = 0;
      let unitsCount = 0;
      Object.entries(preset.items).forEach(([id, entry]) => {
        const p = products.find((item) => item.id === id);
        if (p) {
          estUsd += getUnitPriceUsd(p, entry.unit) * entry.qty;
          unitsCount += entry.qty;
        }
      });
      const isActive = state.activePresetId === preset.id;
      return `
        <article class="preset-card ${isActive ? 'is-active' : ''}">
          <div class="preset-top">
            <span class="preset-code" dir="ltr">${preset.code}</span>
            <span class="preset-tier">${preset.tierNote}</span>
          </div>
          <h3>${preset.title}</h3>
          <p>${preset.desc}</p>
          <div class="preset-meta">
            <span>${unitsCount} وحدة شحن</span>
            <strong dir="ltr">${formatMoney(estUsd)}</strong>
          </div>
          <button type="button" class="btn btn-brass btn-full" data-apply-preset="${preset.id}">
            ${isActive ? 'الحمولة محملة حالياً' : 'تعبئة الحمولة في الحاسبة'}
          </button>
        </article>
      `;
    }).join('');
  }

  function applyPreset(presetId) {
    const preset = LOAD_PRESETS.find((pr) => pr.id === presetId);
    if (!preset) return;
    state.manifest = {};
    Object.entries(preset.items).forEach(([id, entry]) => {
      state.manifest[id] = { qty: entry.qty, unit: entry.unit };
      state.cardUnits[id] = entry.unit;
    });
    state.vehicleId = preset.vehicle;
    state.activePresetId = preset.id;
    renderPresets();
    renderCatalog();
    renderEstimator();
    showToast(`تم تحميل "${preset.title}" في الحاسبة والمانيفست`);
    const ws = document.getElementById('workspace');
    if (ws) ws.scrollIntoView({ behavior: 'smooth' });
  }

  function renderCategoryTabs() {
    if (!els.vipCategoryTabs) return;
    els.vipCategoryTabs.innerHTML = (YE_DATA.categories || []).map((c) => `
      <button type="button"
        class="cat-pill ${state.category === c.id ? 'active' : ''}"
        data-vip-cat="${c.id}">
        ${c.name}
      </button>
    `).join('');
  }

  function renderCatalog() {
    if (!els.vipCatalogEl) return;
    const q = state.search.trim().toLowerCase();

    const filtered = products.filter((p) => {
      const catOk = state.category === 'all' || p.category === state.category;
      const qOk = !q ||
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      return catOk && qOk;
    });

    if (filtered.length === 0) {
      els.vipCatalogEl.innerHTML = '';
      if (els.vipCatalogEmpty) els.vipCatalogEmpty.hidden = false;
      return;
    }

    if (els.vipCatalogEmpty) els.vipCatalogEmpty.hidden = true;

    if (state.viewMode === 'table') {
      els.vipCatalogEl.innerHTML = `
        <div class="vip-table-wrap">
          <table class="vip-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>الصنف والتعبئة</th>
                <th>الوحدة</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>إضافة سريعة</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((p) => {
                const entry = state.manifest[p.id];
                const unit = entry ? entry.unit : (state.cardUnits[p.id] || p.defaultUnit);
                const qty = entry ? entry.qty : 0;
                const priceUsd = getUnitPriceUsd(p, unit);
                return `
                  <tr>
                    <td dir="ltr"><strong>${p.sku}</strong></td>
                    <td>
                      <span class="vt-title">${p.title}</span>
                      <span class="vt-sub">${p.packing}</span>
                    </td>
                    <td>
                      <div class="vc-unit-switch">
                        <button type="button" class="vc-unit-btn ${unit === 'carton' ? 'active' : ''}" data-vip-unit="${p.id}" data-unit="carton">كرتون</button>
                        <button type="button" class="vc-unit-btn ${unit === 'dozen' ? 'active' : ''}" data-vip-unit="${p.id}" data-unit="dozen">درزن</button>
                      </div>
                    </td>
                    <td dir="ltr"><strong>${formatMoney(priceUsd)}</strong></td>
                    <td>
                      <div class="vc-qty-box">
                        <button type="button" data-vip-delta="${p.id}" data-delta="-1" aria-label="إنقاص">-</button>
                        <span>${qty}</span>
                        <button type="button" data-vip-delta="${p.id}" data-delta="1" aria-label="زيادة">+</button>
                      </div>
                    </td>
                    <td>
                      <div class="vc-quick-btns">
                        <button type="button" class="q-chip" data-vip-delta="${p.id}" data-delta="5">+5</button>
                        <button type="button" class="q-chip" data-vip-delta="${p.id}" data-delta="10">+10</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
      return;
    }

    els.vipCatalogEl.innerHTML = `
      <div class="vip-cards-grid">
        ${filtered.map((p) => {
          const entry = state.manifest[p.id];
          const unit = entry ? entry.unit : (state.cardUnits[p.id] || p.defaultUnit);
          const qty = entry ? entry.qty : 0;
          const priceUsd = getUnitPriceUsd(p, unit);
          const unitDesc = unit === 'dozen' ? p.dozenLabel : p.cartonLabel;

          return `
            <article class="vip-card">
              <div class="vc-media">
                <img src="${p.img}" alt="${p.title}" loading="lazy" />
                <span class="vc-tag">${p.tag}</span>
                <span class="vc-sku" dir="ltr">${p.sku}</span>
              </div>
              <div class="vc-body">
                <span class="vc-cat">${p.categoryName}</span>
                <h3 class="vc-title">${p.title}</h3>
                <div class="vc-specs">
                  <span>${unitDesc}</span>
                  <span dir="ltr">${p.cartonCbm} CBM · ${p.cartonKg} kg / carton</span>
                </div>

                <div class="vc-price-strip">
                  <div class="vc-unit-switch" role="group" aria-label="وحدة الطلب">
                    <button type="button" class="vc-unit-btn ${unit === 'carton' ? 'active' : ''}" data-vip-unit="${p.id}" data-unit="carton">كرتون</button>
                    <button type="button" class="vc-unit-btn ${unit === 'dozen' ? 'active' : ''}" data-vip-unit="${p.id}" data-unit="dozen">درزن</button>
                  </div>
                  <span class="vc-price" dir="ltr">${formatMoney(priceUsd)}</span>
                </div>

                <div class="vc-controls">
                  <div class="vc-quick-btns">
                    <button type="button" class="q-chip" data-vip-delta="${p.id}" data-delta="1">+1</button>
                    <button type="button" class="q-chip" data-vip-delta="${p.id}" data-delta="5">+5</button>
                    <button type="button" class="q-chip" data-vip-delta="${p.id}" data-delta="10">+10</button>
                  </div>

                  <div class="vc-qty-box">
                    <button type="button" data-vip-delta="${p.id}" data-delta="-1" aria-label="إنقاص">-</button>
                    <span>${qty}</span>
                    <button type="button" data-vip-delta="${p.id}" data-delta="1" aria-label="زيادة">+</button>
                  </div>
                </div>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderFreightOptions() {
    const opts = FREIGHT_LINES.map((f) => `<option value="${f.id}">${f.gov} (${f.eta})</option>`).join('');
    if (els.estGovSelect) {
      els.estGovSelect.innerHTML = opts;
      els.estGovSelect.value = state.govId;
    }
    if (els.pfGovSelect) {
      els.pfGovSelect.innerHTML = opts;
      els.pfGovSelect.value = state.govId;
    }

    const line = FREIGHT_LINES.find((f) => f.id === state.govId) || FREIGHT_LINES[0];
    if (els.estGovMeta && line) {
      els.estGovMeta.textContent = `${line.hub} · ${line.note}`;
    }

    if (els.freightNetworkGrid) {
      els.freightNetworkGrid.innerHTML = FREIGHT_LINES.slice(0, 6).map((f) => `
        <div class="net-card">
          <div class="net-card-top">
            <strong>${f.gov}</strong>
            <span class="net-eta">${f.eta}</span>
          </div>
          <span>${f.hub}</span>
          <span>${f.note}</span>
        </div>
      `).join('');
    }
  }

  function renderEstimator() {
    const m = computeMetrics();

    if (els.headerManifestCount) {
      els.headerManifestCount.textContent = String(m.totalUnits);
    }

    if (els.vehicleSelector) {
      els.vehicleSelector.querySelectorAll('[data-vehicle]').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.vehicle === state.vehicleId);
      });
    }

    if (els.loadFillPercentText) {
      els.loadFillPercentText.textContent = `${m.fillPct}%`;
    }

    if (els.loadProgressFill) {
      els.loadProgressFill.style.width = `${Math.min(100, m.fillPct)}%`;
      els.loadProgressFill.classList.toggle('is-over', m.fillPct > 100);
    }

    if (els.loadStatsText) {
      els.loadStatsText.textContent =
        `${Math.round(m.equivCartons)} / ${m.vehicle.maxCartons} كرتون مكافئ · ${m.totalCbm.toFixed(2)} / ${m.vehicle.maxCbm} م³ · ${Math.round(m.totalKg)} / ${m.vehicle.maxWeightKg} كجم`;
    }

    if (els.loadCapacityAlert) {
      if (m.fillPct > 100) {
        els.loadCapacityAlert.hidden = false;
        els.loadCapacityAlert.textContent = state.vehicleId === 'partial'
          ? 'تجاوزت الحمولة سعة الشحن الجزئي — يُنصح بالترقية إلى دينة 3 طن.'
          : state.vehicleId === 'dyna3'
            ? 'تجاوزت الحمولة سعة دينة 3 طن — يُنصح بالترقية إلى تريلا 20 طن.'
            : 'الحمولة تتطلب أكثر من تريلا واحدة — سيتم التقسيم عند التنفيذ.';
      } else {
        els.loadCapacityAlert.hidden = true;
      }
    }

    if (els.bonusTierBadge) {
      els.bonusTierBadge.textContent = m.bonusTier.pct > 0 ? `مفعل: ${m.bonusTier.label}` : '0% (طلب أساسي)';
      els.bonusTierBadge.classList.toggle('is-unlocked', m.bonusTier.pct > 0);
    }

    if (els.bonusProgressPills) {
      els.bonusProgressPills.querySelectorAll('[data-tier]').forEach((el) => {
        const tierPct = Number(el.dataset.tier);
        el.classList.toggle('is-active', m.bonusTier.pct >= tierPct);
      });
    }

    if (els.bonusHintText) {
      if (m.bonusTier.pct === 15) {
        els.bonusHintText.textContent = 'تم تفعيل أعلى شريحة حافز للموزع المعتمد (15%) على كامل المانيفست.';
      } else {
        const nextTier = [...BONUS_TIERS].reverse().find((t) => t.minUsd > m.grossUsd);
        if (nextTier) {
          const diff = nextTier.minUsd - m.grossUsd;
          els.bonusHintText.textContent = `متبقي ${formatMoney(diff)} لفتح شريحة حافز ${nextTier.pct}% (${nextTier.label}).`;
        }
      }
    }

    if (els.estCartonsCount) els.estCartonsCount.textContent = String(m.cartonsTotal);
    if (els.estDozensCount) els.estDozensCount.textContent = String(m.dozensTotal);
    if (els.estWeightCbm) {
      els.estWeightCbm.textContent = `${m.totalCbm.toFixed(2)} CBM · ${Math.round(m.totalKg).toLocaleString('en-US')} kg`;
    }

    if (els.estItemsList) {
      if (m.lines.length === 0) {
        els.estItemsList.innerHTML = '<div class="est-mini-empty">أضف أصنافاً من الكتالوج أو اختر إحدى الحمولات الجاهزة أعلاه.</div>';
      } else {
        els.estItemsList.innerHTML = m.lines.map((line) => `
          <div class="est-mini-row">
            <div>
              <strong>${line.product.sku} — ${line.qty} ${getUnitShort(line.unit)}</strong>
              <small>${line.product.title}</small>
            </div>
            <div class="est-mini-right">
              <span dir="ltr">${formatMoney(line.lineUsd)}</span>
              <button type="button" class="est-mini-del" data-est-remove="${line.product.id}" aria-label="إزالة الصنف">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    if (els.estSubtotalUsd) els.estSubtotalUsd.textContent = formatMoney(m.grossUsd, 'USD');
    if (els.estSubtotalSar) els.estSubtotalSar.textContent = formatMoney(m.grossUsd, 'SAR');
    if (els.estSubtotalYer) els.estSubtotalYer.textContent = formatMoney(m.grossUsd, 'YER');
    if (els.estBonusAmount) els.estBonusAmount.textContent = `-${formatMoney(m.bonusUsd)}`;
    if (els.estNetTotal) els.estNetTotal.textContent = formatMoney(m.netUsd);
    if (els.estAltTotals) {
      els.estAltTotals.textContent =
        `الصافي: ${formatMoney(m.netUsd, 'USD')}  |  ${formatMoney(m.netUsd, 'SAR')}  |  ${formatMoney(m.netUsd, 'YER')}`;
    }
  }

  function mutateManifest(id, delta) {
    const p = products.find((item) => item.id === id);
    if (!p) return;
    const current = state.manifest[id];
    const unit = current ? current.unit : (state.cardUnits[id] || p.defaultUnit);
    const nextQty = Math.max(0, (current ? current.qty : 0) + delta);

    if (nextQty === 0) {
      delete state.manifest[id];
    } else {
      state.manifest[id] = { qty: nextQty, unit };
      state.cardUnits[id] = unit;
    }

    state.activePresetId = null;
    renderPresets();
    renderCatalog();
    renderEstimator();
  }

  function setItemUnit(id, unit) {
    state.cardUnits[id] = unit;
    if (state.manifest[id]) {
      state.manifest[id].unit = unit;
    }
    state.activePresetId = null;
    renderPresets();
    renderCatalog();
    renderEstimator();
  }

  function populateProformaSheet() {
    const m = computeMetrics();
    const route = FREIGHT_LINES.find((f) => f.id === state.govId) || FREIGHT_LINES[0];
    const merchantName = els.pfMerchantInput && els.pfMerchantInput.value.trim()
      ? els.pfMerchantInput.value.trim()
      : 'تاجر جملة / موزع فرعي (مسودة عرض)';
    const merchantPhone = els.pfPhoneInput && els.pfPhoneInput.value.trim()
      ? ` — ${els.pfPhoneInput.value.trim()}`
      : '';

    if (els.pfRefCode) els.pfRefCode.textContent = state.refCode;
    if (els.pfDate) els.pfDate.textContent = new Date().toISOString().slice(0, 10);
    if (els.pfCurrencyDisplay) els.pfCurrencyDisplay.textContent = state.currency;
    if (els.pfMerchantDisplay) els.pfMerchantDisplay.textContent = `${merchantName}${merchantPhone}`;
    if (els.pfRouteDisplay) els.pfRouteDisplay.textContent = `${route.gov} (${route.eta}) — ${m.vehicle.label} (${m.fillPct}% امتلاء)`;
    if (els.pfGovSelect) els.pfGovSelect.value = state.govId;
    if (els.pfVehicleSelect) els.pfVehicleSelect.value = state.vehicleId;

    if (els.pfTableBody) {
      if (m.lines.length === 0) {
        els.pfTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:1.5rem;">لا توجد أصناف مضافة في المانيفست بعد.</td></tr>';
      } else {
        els.pfTableBody.innerHTML = m.lines.map((line, idx) => `
          <tr>
            <td dir="ltr">${idx + 1}</td>
            <td dir="ltr"><strong>${line.product.sku}</strong></td>
            <td><strong>${line.product.title}</strong><br><small>${line.product.packing}</small></td>
            <td>${getUnitShort(line.unit)}</td>
            <td dir="ltr">${line.qty}</td>
            <td dir="ltr">${formatMoney(line.unitPriceUsd)}</td>
            <td dir="ltr"><strong>${formatMoney(line.lineUsd)}</strong></td>
          </tr>
        `).join('');
      }
    }

    if (els.pfTotalUnits) els.pfTotalUnits.textContent = `${m.cartonsTotal} كرتون / ${m.dozensTotal} درزن`;
    if (els.pfLoadSummary) {
      els.pfLoadSummary.textContent = `إجمالي الشحنة: ${m.totalCbm.toFixed(2)} CBM (${Math.round(m.totalKg)} كجم) — امتلاء ${m.vehicle.label}: ${m.fillPct}%`;
    }
    if (els.pfGrossTotal) els.pfGrossTotal.textContent = formatMoney(m.grossUsd);
    if (els.pfBonusLabel) els.pfBonusLabel.textContent = `حافز الموزع (${m.bonusTier.pct}%):`;
    if (els.pfBonusValue) els.pfBonusValue.textContent = `-${formatMoney(m.bonusUsd)}`;
    if (els.pfNetTotal) els.pfNetTotal.textContent = formatMoney(m.netUsd);
    if (els.pfThreeCurrencies) {
      els.pfThreeCurrencies.textContent =
        `USD: ${formatMoney(m.netUsd, 'USD')} | SAR: ${formatMoney(m.netUsd, 'SAR')} | YER: ${formatMoney(m.netUsd, 'YER')}`;
    }
  }

  function openProformaModal() {
    if (!els.proformaModal || !els.proformaBackdrop) return;
    populateProformaSheet();
    els.proformaBackdrop.hidden = false;
    els.proformaModal.hidden = false;
  }

  function closeProformaModal() {
    if (!els.proformaModal || !els.proformaBackdrop) return;
    els.proformaBackdrop.hidden = true;
    els.proformaModal.hidden = true;
  }

  function buildManifestPlainText() {
    const m = computeMetrics();
    const route = FREIGHT_LINES.find((f) => f.id === state.govId) || FREIGHT_LINES[0];
    const merchant = els.pfMerchantInput && els.pfMerchantInput.value.trim()
      ? els.pfMerchantInput.value.trim()
      : 'تاجر جملة / موزع';
    const phone = els.pfPhoneInput && els.pfPhoneInput.value.trim()
      ? els.pfPhoneInput.value.trim()
      : 'غير محدد';

    const itemsLines = m.lines.map((line, i) =>
      `${i + 1}. [${line.product.sku}] ${line.product.title} — ${line.qty} ${getUnitShort(line.unit)} × ${formatMoney(line.unitPriceUsd)} = ${formatMoney(line.lineUsd)}`
    ).join('\n');

    return (
      `مانيفست توريد تجاري — الفئة الملكية VIP\n` +
      `معرض الصقر للأدوات المنزلية (حي شعوب، صنعاء)\n` +
      `المرجع: ${state.refCode}\n` +
      `التاجر: ${merchant} | الهاتف: ${phone}\n` +
      `وجهة الترحيل: ${route.gov} (${route.eta})\n` +
      `فئة المركبة: ${m.vehicle.label} (امتلاء ${m.fillPct}% | ${m.totalCbm.toFixed(2)} CBM | ${Math.round(m.totalKg)} كجم)\n` +
      `----------------------------------------\n` +
      itemsLines +
      `\n----------------------------------------\n` +
      `الإجمالي قبل الحافز: ${formatMoney(m.grossUsd)}\n` +
      `حافز الموزع (${m.bonusTier.pct}%): -${formatMoney(m.bonusUsd)}\n` +
      `الصافي (${state.currency}): ${formatMoney(m.netUsd)}\n` +
      `المعادل: ${formatMoney(m.netUsd, 'USD')} | ${formatMoney(m.netUsd, 'SAR')} | ${formatMoney(m.netUsd, 'YER')}`
    );
  }

  function copyProformaToClipboard() {
    const m = computeMetrics();
    if (m.lines.length === 0) {
      showToast('أضف أصنافاً إلى المانيفست أولاً قبل النسخ');
      return;
    }
    const text = buildManifestPlainText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('تم نسخ المانيفست التجاري بنجاح');
      }).catch(() => {
        showToast('تعذر النسخ التلقائي — استخدم زر الطباعة أو الإرسال');
      });
    } else {
      showToast('النسخ غير مدعوم في هذا المتصفح — استخدم الطباعة أو الواتساب');
    }
  }

  function dispatchVipWhatsapp() {
    const m = computeMetrics();
    if (m.lines.length === 0) {
      showToast('أضف أصنافاً إلى الحمولة أولاً قبل الإرسال');
      return;
    }
    const text = buildManifestPlainText();
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  function renderDistributorCategoriesAndFaq() {
    if (els.distCategoriesWrap && YE_DATA.categories) {
      els.distCategoriesWrap.innerHTML = YE_DATA.categories
        .filter((c) => c.id !== 'all')
        .map((c, idx) => `
          <label class="cat-check-pill">
            <input type="checkbox" name="distCat" value="${c.name}" ${idx < 2 ? 'checked' : ''} />
            <span>${c.name}</span>
          </label>
        `).join('');
    }

    if (els.vipFaqList && YE_DATA.faqs) {
      els.vipFaqList.innerHTML = YE_DATA.faqs.map((item, idx) => `
        <div class="vip-faq-item ${idx === 0 ? 'is-open' : ''}">
          <button type="button" class="vip-faq-q" aria-expanded="${idx === 0 ? 'true' : 'false'}">
            <span>${item.q}</span>
            <span class="vip-faq-icon" aria-hidden="true">+</span>
          </button>
          <div class="vip-faq-a" style="${idx === 0 ? 'max-height:240px;' : ''}">
            <div class="vip-faq-a-inner">${item.a}</div>
          </div>
        </div>
      `).join('');
    }
  }

  function bindEvents() {
    if (els.mobileMenuBtn && els.mobileNav) {
      els.mobileMenuBtn.addEventListener('click', () => {
        const next = els.mobileNav.hidden;
        els.mobileNav.hidden = !next;
        els.mobileMenuBtn.setAttribute('aria-expanded', String(next));
      });
      els.mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          els.mobileNav.hidden = true;
          els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    document.addEventListener('click', (e) => {
      const currBtn = e.target.closest('[data-currency]');
      if (currBtn) {
        const code = currBtn.dataset.currency;
        if (CURRENCIES[code] && code !== state.currency) {
          state.currency = code;
          syncCurrencyButtons();
          renderPresets();
          renderCatalog();
          renderEstimator();
          if (els.proformaModal && !els.proformaModal.hidden) populateProformaSheet();
          showToast(`تم التحويل إلى ${CURRENCIES[code].label}`);
        }
        return;
      }

      const presetBtn = e.target.closest('[data-apply-preset]');
      if (presetBtn) {
        applyPreset(presetBtn.dataset.applyPreset);
        return;
      }
    });

    if (els.vipCategoryTabs) {
      els.vipCategoryTabs.addEventListener('click', (e) => {
        const pill = e.target.closest('[data-vip-cat]');
        if (!pill) return;
        state.category = pill.dataset.vipCat;
        renderCategoryTabs();
        renderCatalog();
      });
    }

    if (els.vipSearchInput) {
      els.vipSearchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderCatalog();
      });
    }

    if (els.vipViewCardsBtn && els.vipViewTableBtn) {
      els.vipViewCardsBtn.addEventListener('click', () => {
        state.viewMode = 'cards';
        els.vipViewCardsBtn.classList.add('active');
        els.vipViewTableBtn.classList.remove('active');
        renderCatalog();
      });
      els.vipViewTableBtn.addEventListener('click', () => {
        state.viewMode = 'table';
        els.vipViewTableBtn.classList.add('active');
        els.vipViewCardsBtn.classList.remove('active');
        renderCatalog();
      });
    }

    if (els.vipCatalogEl) {
      els.vipCatalogEl.addEventListener('click', (e) => {
        const unitBtn = e.target.closest('[data-vip-unit]');
        if (unitBtn) {
          setItemUnit(unitBtn.dataset.vipUnit, unitBtn.dataset.unit);
          return;
        }
        const deltaBtn = e.target.closest('[data-vip-delta]');
        if (deltaBtn) {
          mutateManifest(deltaBtn.dataset.vipDelta, Number(deltaBtn.dataset.delta));
        }
      });
    }

    if (els.estItemsList) {
      els.estItemsList.addEventListener('click', (e) => {
        const rem = e.target.closest('[data-est-remove]');
        if (!rem) return;
        delete state.manifest[rem.dataset.estRemove];
        state.activePresetId = null;
        renderPresets();
        renderCatalog();
        renderEstimator();
      });
    }

    if (els.vehicleSelector) {
      els.vehicleSelector.addEventListener('click', (e) => {
        const vBtn = e.target.closest('[data-vehicle]');
        if (!vBtn) return;
        state.vehicleId = vBtn.dataset.vehicle;
        renderEstimator();
        if (els.proformaModal && !els.proformaModal.hidden) populateProformaSheet();
      });
    }

    if (els.estGovSelect) {
      els.estGovSelect.addEventListener('change', (e) => {
        state.govId = e.target.value;
        renderFreightOptions();
      });
    }

    if (els.clearManifestBtn) {
      els.clearManifestBtn.addEventListener('click', () => {
        state.manifest = {};
        state.activePresetId = null;
        renderPresets();
        renderCatalog();
        renderEstimator();
        showToast('تم تفريغ المانيفست وحاسبة الحمولة');
      });
    }

    if (els.headerProformaBtn) els.headerProformaBtn.addEventListener('click', openProformaModal);
    if (els.openProformaModalBtn) els.openProformaModalBtn.addEventListener('click', openProformaModal);
    if (els.closeProformaModalBtn) els.closeProformaModalBtn.addEventListener('click', closeProformaModal);
    if (els.proformaBackdrop) els.proformaBackdrop.addEventListener('click', closeProformaModal);

    if (els.pfMerchantInput) els.pfMerchantInput.addEventListener('input', populateProformaSheet);
    if (els.pfPhoneInput) els.pfPhoneInput.addEventListener('input', populateProformaSheet);
    if (els.pfGovSelect) {
      els.pfGovSelect.addEventListener('change', (e) => {
        state.govId = e.target.value;
        renderFreightOptions();
        populateProformaSheet();
      });
    }
    if (els.pfVehicleSelect) {
      els.pfVehicleSelect.addEventListener('change', (e) => {
        state.vehicleId = e.target.value;
        renderEstimator();
        populateProformaSheet();
      });
    }

    if (els.pfCopyBtn) els.pfCopyBtn.addEventListener('click', copyProformaToClipboard);
    if (els.pfPrintBtn) {
      els.pfPrintBtn.addEventListener('click', () => {
        populateProformaSheet();
        window.print();
      });
    }
    if (els.estWhatsappBtn) els.estWhatsappBtn.addEventListener('click', dispatchVipWhatsapp);
    if (els.pfWhatsappBtn) els.pfWhatsappBtn.addEventListener('click', dispatchVipWhatsapp);

    if (els.distMonthlyBracket && els.distProjectedBonus) {
      els.distMonthlyBracket.addEventListener('change', (e) => {
        els.distProjectedBonus.textContent = `شريحة الحافز المتوقعة: ${e.target.value}%`;
      });
    }

    if (els.distForm) {
      els.distForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const company = els.distCompany ? els.distCompany.value.trim() : '';
        const phone = els.distPhone ? els.distPhone.value.trim() : '';
        if (!company || !phone) {
          showToast('يرجى إدخال اسم المعرض ورقم الجوال أولاً');
          return;
        }
        const gov = els.distGov ? els.distGov.value : '';
        const fleet = els.distFleet ? els.distFleet.value : '';
        const bracket = els.distMonthlyBracket ? els.distMonthlyBracket.value : '5';
        const notes = els.distNotes ? els.distNotes.value.trim() : '';
        const checkedCats = Array.from(document.querySelectorAll('input[name="distCat"]:checked'))
          .map((inp) => inp.value);

        const msg =
          `طلب اعتماد موزع فرعي بالمحافظات — الفئة الملكية VIP\n` +
          `معرض الصقر للأدوات المنزلية (حي شعوب، صنعاء)\n` +
          `----------------------------------------\n` +
          `اسم المنشأة / المعرض: ${company}\n` +
          `رقم الجوال / الواتساب: ${phone}\n` +
          `المحافظة المستهدفة: ${gov}\n` +
          `نطاق الشحن والأسطول: ${fleet}\n` +
          `شريحة الحافز المستهدفة: ${bracket}%\n` +
          `الأقسام المستهدفة: ${checkedCats.length ? checkedCats.join('، ') : 'كافة الأقسام'}\n` +
          (notes ? `ملاحظات إضافية: ${notes}\n` : '') +
          `----------------------------------------\n` +
          `أرجو التواصل لترتيب شروط الوكالة الفرعية وكشف الأسعار المعتمد.`;

        window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      });
    }

    if (els.vipFaqList) {
      els.vipFaqList.addEventListener('click', (e) => {
        const btn = e.target.closest('.vip-faq-q');
        if (!btn) return;
        const item = btn.closest('.vip-faq-item');
        const ans = item.querySelector('.vip-faq-a');
        const isOpen = item.classList.contains('is-open');

        els.vipFaqList.querySelectorAll('.vip-faq-item').forEach((other) => {
          other.classList.remove('is-open');
          other.querySelector('.vip-faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.vip-faq-a').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeProformaModal();
    });
  }

  // Init
  syncCurrencyButtons();
  renderPresets();
  renderCategoryTabs();
  renderCatalog();
  renderFreightOptions();
  renderEstimator();
  renderDistributorCategoriesAndFaq();
  bindEvents();
})();
