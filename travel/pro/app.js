/* ==========================================================================
   app.js — Luxury Pilgrimage & Hospitality Pro ($120)
   الصفوة للسفريات والسياحة والعمرة
   ========================================================================== */
'use strict';

(function () {
  if (typeof TRAVEL_CONFIG === 'undefined' || typeof TRAVEL_DATA === 'undefined') {
    return;
  }

  const RATES = {
    usd: { code: 'USD', mult: 1, symbol: '$', label: 'دولار' },
    sar: { code: 'SAR', mult: 3.75, symbol: '', label: 'ر.س' },
    yer: { code: 'YER', mult: 530, symbol: '', label: 'ر.ي' },
  };

  const PACKAGE_ENRICHMENT = {
    'umrah-vip': {
      baseUsd: 980,
      priceNote: 'تبدأ للفرد في الغرفة الرباعية',
      presetMode: 'air',
      presetHotel: 'central-zone',
      presetRoom: 'quad',
    },
    'umrah-land': {
      baseUsd: 440,
      priceNote: 'تبدأ للفرد شاملة التأشيرة والمنفذ',
      presetMode: 'land',
      presetHotel: 'shuttle-comfort',
      presetRoom: 'quad',
    },
    'flights-visas': {
      baseUsd: 390,
      priceNote: 'تقدير مبدئي لتخليص التأشيرة والتذكرة',
      presetMode: 'air',
      presetHotel: 'central-zone',
      presetRoom: 'double',
    },
    'family-tour': {
      baseUsd: 1150,
      priceNote: 'تبدأ للفرد لبرنامج 7 ليالٍ فاخر',
      presetMode: 'air',
      presetHotel: 'haram-front',
      presetRoom: 'double',
    },
  };

  const HOTEL_TIERS = [
    {
      id: 'haram-front',
      name: 'الصف الأول — إطلالة مباشرة على الساحة',
      shortName: 'الصف الأول (0 - 150 م)',
      distanceLabel: '0 - 150 متر · دقيقتان مشياً',
      proximityPct: 96,
      stars: '5 نجوم فاخر',
      makkahExamples: 'أبراج وقف الملك عبدالعزيز / سويس أوتيل / فيرمونت أو ما يعادلها',
      madinahDistance: 'الصف الأول بالمنطقة المركزية الشمالية (ملاصق للمسجد النبوي)',
      adultAddUsd: 520,
      childAddUsd: 260,
      perks: [
        'نزول مباشر عبر المصاعد إلى ساحات المسجد الحرام بدون باصات',
        'بوفيه إفطار عالمي يومي فاخر',
        'مناسب لكبار السن والعائلات الباحثة عن أعلى درجات الراحة',
      ],
    },
    {
      id: 'central-zone',
      name: 'النطاق القريب — المنطقة المركزية الراقية',
      shortName: 'النطاق القريب (250 - 450 م)',
      distanceLabel: '250 - 450 متر · 5 دقائق مشياً',
      proximityPct: 76,
      stars: '4 - 5 نجوم راقٍ',
      makkahExamples: 'فنادق شارع أجياد وإبراهيم الخليل / أنجم / كونراد المختارة',
      madinahDistance: 'المنطقة المركزية (4 دقائق مشياً لباب السلام)',
      adultAddUsd: 220,
      childAddUsd: 110,
      perks: [
        'مسافة مشي مستوية ومريحة إلى بوابات الحرم',
        'وجبة إفطار يومية وخدمة استقبال للأمتعة',
        'أفضل توازن بين القرب الفعلي والتكلفة الاقتصادية الذكية',
      ],
    },
    {
      id: 'shuttle-comfort',
      name: 'النطاق الميسّر — محيط الحرم بنقل ترددي VIP',
      shortName: 'النطاق الميسّر (700 - 1,100 م)',
      distanceLabel: '700 - 1,100 متر · باصات ترددية 24/7',
      proximityPct: 48,
      stars: '3 - 4 نجوم حديث',
      makkahExamples: 'فنادق محبس الجن / ريع بخش / كدي الحديثة المعتمدة',
      madinahDistance: 'المنطقة المركزية الجنوبية مع نقل منتظم',
      adultAddUsd: 0,
      childAddUsd: 0,
      perks: [
        'حافلات مكيفة حديثة تعمل كل 10 دقائق على مدار الساعة حتى الحرم',
        'غرف واسعة مجهزة للعائلات والمجموعات',
        'أقل تكلفة شاملة مع الحفاظ على نظافة الفندق وخدمة الإشراف',
      ],
    },
  ];

  const ROOM_TYPES = {
    double: { label: 'غرفة ثنائية (شخصان)', cap: 2, adultAddUsd: 210, childAddUsd: 90 },
    triple: { label: 'غرفة ثلاثية (3 أشخاص)', cap: 3, adultAddUsd: 85, childAddUsd: 40 },
    quad:   { label: 'غرفة رباعية (4 أشخاص)', cap: 4, adultAddUsd: 0, childAddUsd: 0 },
  };

  const TRAVEL_MODES = {
    air: {
      label: 'عمرة جوية — طيران مباشر',
      baseAdultUsd: 790,
      baseChildUsd: 540,
    },
    land: {
      label: 'عمرة بريّة — باصات VIP',
      baseAdultUsd: 360,
      baseChildUsd: 270,
    },
  };

  const VISA_CHECKLISTS = {
    umrah: {
      title: 'تأشيرة العمرة',
      processing: 'مدة الإنجاز: 24 - 48 ساعة',
      validity: 'صلاحية الإقامة: 90 يوماً (مسار نسك)',
      items: [
        { id: 'u-pass', title: 'جواز سفر إلكتروني ساري المفعول', note: 'صلاحية لا تقل عن 6 أشهر من تاريخ السفر مع صفحتين فارغتين' },
        { id: 'u-photo', title: 'صورتان شخصيتان حديثتان (4x6)', note: 'خلفية بيضاء واضحة وبدون فلاتر أو نظارات شمسية' },
        { id: 'u-vax', title: 'شهادة التطعيم المطلوبة (الحمى الشوكية)', note: 'تُؤخذ قبل السفر بـ 10 أيام على الأقل مع التوثيق الصحي' },
        { id: 'u-ticket', title: 'تأكيد مسار الذهاب والعودة والسكن', note: 'نرتّبه لك آلياً ضمن ملف الباقة المعتمدة على منصة نسك' },
        { id: 'u-family', title: 'وثائق صلة القرابة / المرافق عند اللزوم', note: 'صورة كرت العائلة أو عقد الزواج للمجموعات العائلية' },
      ],
    },
    visit: {
      title: 'زيارة عائلية / شخصية',
      processing: 'مدة الإنجاز: 3 - 6 أيام عمل',
      validity: 'صلاحية متعددة / مفردة حتى 90 يوماً',
      items: [
        { id: 'v-invite', title: 'مستند الدعوة الصادر من وزارة الخارجية', note: 'مصدّق من الغرفة التجارية أو الكفيل في المملكة' },
        { id: 'v-pass', title: 'أصل الجواز ساري لمدة 6 أشهر', note: 'مرفق به صورة واضحة لصفحة البيانات والتمديد إن وُجد' },
        { id: 'v-rel', title: 'إثبات صلة القرابة المعتمد', note: 'شهادة ميلاد أو عقد زواج مترجم ومصدّق حسب الأصول' },
        { id: 'v-ins', title: 'تأمين طبي ساري طوال فترة الزيارة', note: 'يُصدر فورياً مع ملف إنجاز السفارة السعودية' },
        { id: 'v-bio', title: 'موعد البصمة الحيوية (تأشير)', note: 'نقوم بحجز أقرب موعد مناسب وتجهيز ملف التأشير بالكامل' },
      ],
    },
    work: {
      title: 'تأشيرة عمل واستقدام',
      processing: 'مدة الإنجاز: 7 - 12 يوم عمل',
      validity: 'حسب عقد العمل والمهنة المعتمدة',
      items: [
        { id: 'w-deleg', title: 'تفويض إلكتروني معتمد على مكتب الصفوة', note: 'صادر من صاحب العمل عبر منصة إنجاز/قوى' },
        { id: 'w-med', title: 'الفحص الطبي المعتمد (جامكا / وافد)', note: 'نتيجة لائق صحياً صادرة من المراكز المعتمدة حديثاً' },
        { id: 'w-degree', title: 'المؤهل العلمي والخبرة مصدّقان', note: 'توثيق الخارجية والملحقية الثقافية للمهن التخصصية' },
        { id: 'w-crim', title: 'شهادة خلو من السوابق (فيش وتشبيه)', note: 'حديثة الإصدار ومطابقة لبيانات جواز السفر' },
        { id: 'w-pass', title: 'جواز سفر ساري لمدة سنة على الأقل', note: 'لتفادي الحاجة للتجديد أثناء إجراءات الإقامة الأولى' },
      ],
    },
    tourism: {
      title: 'سياحة دولية (دبي · إسطنبول)',
      processing: 'مدة الإنجاز: 24 - 72 ساعة',
      validity: 'تأشيرة سياحية 30 إلى 60 يوماً',
      items: [
        { id: 't-pass', title: 'صورة ملونة واضحة لصفحة جواز السفر', note: 'صلاحية الجواز أكثر من 6 أشهر عند موعد الدخول' },
        { id: 't-photo', title: 'صورة شخصية حديثة بدقة عالية', note: 'خلفية بيضاء صافية بصيغة رقمية أو ورقية' },
        { id: 't-hotel', title: 'حجز فندقي وتذكرة طيران ذهاب وعودة', note: 'مؤكدان ومشمولان تلقائياً ضمن برامج الصفوة العائلية' },
        { id: 't-bank', title: 'كشف حساب أو ملاءة مالية (لبعض الوجهات)', note: 'مطلوب لبعض السفارات الأوروبية والتركية حسب الجنسية' },
        { id: 't-ins', title: 'وثيقة تأمين السفر الدولي', note: 'تغطي الحالات الطارئة وفقدان الأمتعة طوال الرحلة' },
      ],
    },
  };

  const SVG = {
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    moon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    plane: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    doc: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    hotel: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><line x1="9" y1="9" x2="9" y2="9.01"/><line x1="9" y1="13" x2="9" y2="13.01"/></svg>',
    wa: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  };

  const state = {
    currency: 'usd',
    activeCat: 'all',
    selectedPackageTitle: TRAVEL_DATA.packages[0].title,
    hotelTierId: 'central-zone',
    travelMode: 'air',
    roomType: 'quad',
    adults: 2,
    children: 0,
    addonZiyarat: true,
    addonAirport: false,
    activeVisaType: 'umrah',
    checkedDocs: {
      umrah: { 'u-pass': true, 'u-photo': true },
      visit: {},
      work: {},
      tourism: {},
    },
    lastTotalFmt: '',
  };

  const els = {
    heroAgency: document.getElementById('pro-hero-agency'),
    heroTagline: document.getElementById('pro-hero-tagline'),
    currencySwitch: document.getElementById('pro-currency-switch'),
    calcCurrGroup: document.getElementById('calc-curr-group'),
    mobileMenuBtn: document.getElementById('pro-mobile-menu-btn'),
    mobileDrawer: document.getElementById('pro-mobile-drawer'),
    heroMainImg: document.getElementById('pro-hero-main-img'),
    heroCaption: document.getElementById('pro-hero-caption'),
    heroThumbs: document.getElementById('pro-hero-thumbs'),
    statsGrid: document.getElementById('pro-stats-grid'),
    pkgFilters: document.getElementById('pro-pkg-filters'),
    pkgCount: document.getElementById('pro-pkg-count'),
    packagesGrid: document.getElementById('pro-packages-grid'),
    hotelTiers: document.getElementById('pro-hotel-tiers'),
    hotelDetailPanel: document.getElementById('pro-hotel-detail-panel'),
    calcModeAir: document.getElementById('calc-mode-air'),
    calcModeLand: document.getElementById('calc-mode-land'),
    calcRoomGroup: document.getElementById('calc-room-group'),
    calcHotelSelect: document.getElementById('calc-hotel-select'),
    calcAdultsMinus: document.getElementById('calc-adults-minus'),
    calcAdultsVal: document.getElementById('calc-adults-val'),
    calcAdultsPlus: document.getElementById('calc-adults-plus'),
    calcChildrenMinus: document.getElementById('calc-children-minus'),
    calcChildrenVal: document.getElementById('calc-children-val'),
    calcChildrenPlus: document.getElementById('calc-children-plus'),
    calcAddonZiyarat: document.getElementById('calc-addon-ziyarat'),
    calcAddonAirport: document.getElementById('calc-addon-airport'),
    calcSummaryMode: document.getElementById('calc-summary-mode'),
    calcSummaryHotel: document.getElementById('calc-summary-hotel'),
    calcSummaryRoom: document.getElementById('calc-summary-room'),
    calcSummaryTravelers: document.getElementById('calc-summary-travelers'),
    calcSummaryRoomsCount: document.getElementById('calc-summary-rooms-count'),
    calcLineBase: document.getElementById('calc-line-base'),
    calcLineHotel: document.getElementById('calc-line-hotel'),
    calcLineAddons: document.getElementById('calc-line-addons'),
    calcPerAdult: document.getElementById('calc-per-adult'),
    calcTotalPrice: document.getElementById('calc-total-price'),
    calcApplyBtn: document.getElementById('calc-apply-btn'),
    visaTabs: document.getElementById('visa-tabs'),
    visaProcessingTime: document.getElementById('visa-processing-time'),
    visaValidityNote: document.getElementById('visa-validity-note'),
    visaProgressText: document.getElementById('visa-progress-text'),
    visaProgressBar: document.getElementById('visa-progress-bar'),
    visaChecklistItems: document.getElementById('visa-checklist-items'),
    visaResetBtn: document.getElementById('visa-reset-btn'),
    visaCheckAllBtn: document.getElementById('visa-check-all-btn'),
    servicesGrid: document.getElementById('pro-services-grid'),
    bookSumPkg: document.getElementById('book-sum-pkg'),
    bookSumMode: document.getElementById('book-sum-mode'),
    bookSumHotel: document.getElementById('book-sum-hotel'),
    bookSumRoom: document.getElementById('book-sum-room'),
    bookSumPax: document.getElementById('book-sum-pax'),
    bookSumVisa: document.getElementById('book-sum-visa'),
    bookSumTotal: document.getElementById('book-sum-total'),
    bookingForm: document.getElementById('pro-booking-form'),
    bookName: document.getElementById('book-name'),
    bookPhone: document.getElementById('book-phone'),
    bookCity: document.getElementById('book-city'),
    bookDate: document.getElementById('book-date'),
    bookNotes: document.getElementById('book-notes'),
    copySummaryBtn: document.getElementById('pro-copy-summary-btn'),
    bookingFeedback: document.getElementById('pro-booking-feedback'),
  };

  function resolveImagePath(imgPath) {
    if (!imgPath) return '../assets/images/makkah.jpg';
    return imgPath.startsWith('../') ? imgPath : '../' + imgPath;
  }

  function formatMoney(usdAmount) {
    const rate = RATES[state.currency] || RATES.usd;
    const raw = Math.round(usdAmount * rate.mult);
    const formatted = raw.toLocaleString('en-US');
    return rate.code === 'USD' ? '$' + formatted : formatted + ' ' + rate.label;
  }

  function getHotelTier(id) {
    return HOTEL_TIERS.find((t) => t.id === id) || HOTEL_TIERS[1];
  }

  function syncCurrencyButtons() {
    document.querySelectorAll('#pro-currency-switch .curr-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.curr === state.currency);
    });
    document.querySelectorAll('#calc-curr-group .mini-curr-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.curr === state.currency);
    });
  }

  function renderAgencyHeaderMeta() {
    if (els.heroAgency) els.heroAgency.textContent = TRAVEL_CONFIG.agencyName;
    if (els.heroTagline) els.heroTagline.textContent = TRAVEL_CONFIG.tagline;
  }

  function renderStats() {
    if (!els.statsGrid) return;
    els.statsGrid.innerHTML = TRAVEL_DATA.stats
      .map(
        (stat) => `
          <div class="stat-cell">
            <dd>${stat.value}</dd>
            <dt>${stat.label}</dt>
          </div>
        `
      )
      .join('');
  }

  function renderPackages() {
    if (!els.packagesGrid) return;
    const list =
      state.activeCat === 'all'
        ? TRAVEL_DATA.packages
        : TRAVEL_DATA.packages.filter((p) => p.cat === state.activeCat);

    if (els.pkgCount) {
      els.pkgCount.textContent = `عرض ${list.length} ${list.length === 1 ? 'باقة متاحة' : 'باقات متاحة'}`;
    }

    els.packagesGrid.innerHTML = list
      .map((pkg) => {
        const meta = PACKAGE_ENRICHMENT[pkg.id] || { baseUsd: 750, priceNote: 'تبدأ للفرد', presetMode: 'air', presetHotel: 'central-zone', presetRoom: 'quad' };
        const imgUrl = resolveImagePath(pkg.image);
        const waMsg = `أهلاً ${TRAVEL_CONFIG.agencyName} (الفئة الفاخرة Pro)، أرغب بالاستفسار عن: ${pkg.title} (السعر المبدئي ${formatMoney(meta.baseUsd)})`;
        const waHref = `https://wa.me/${TRAVEL_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
        const highlightsHtml = pkg.highlights
          .map((item) => `<li>${SVG.check}<span>${item}</span></li>`)
          .join('');

        return `
          <article class="pkg-card">
            <div class="pkg-media">
              <img src="${imgUrl}" alt="${pkg.title}" loading="lazy">
              <span class="pkg-badge">${pkg.badge}</span>
            </div>
            <div class="pkg-body">
              <div class="pkg-meta">${pkg.meta}</div>
              <h3 class="pkg-title">${pkg.title}</h3>
              <p class="pkg-desc">${pkg.desc}</p>
              <ul class="pkg-highlights">${highlightsHtml}</ul>
              <div class="pkg-footer">
                <div class="pkg-price">
                  <small>${meta.priceNote}</small>
                  <strong>${formatMoney(meta.baseUsd)}</strong>
                </div>
                <div class="pkg-actions">
                  <button type="button" class="btn-pkg-calc" data-pkg-id="${pkg.id}">تخصيص في الحاسبة</button>
                  <a href="${waHref}" class="btn-pkg-wa" target="_blank" rel="noopener">${SVG.wa}<span>استفسار واتساب</span></a>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  function renderHotelSelector() {
    if (!els.hotelTiers || !els.hotelDetailPanel) return;

    els.hotelTiers.innerHTML = HOTEL_TIERS.map((tier) => {
      const active = tier.id === state.hotelTierId;
      const addLabel =
        tier.adultAddUsd === 0
          ? 'مشمول بالسعر الأساسي'
          : `+${formatMoney(tier.adultAddUsd)} / بالغ`;

      return `
        <button type="button" class="hotel-tier-btn ${active ? 'is-selected' : ''}" data-tier="${tier.id}" role="radio" aria-checked="${active}">
          <div class="tier-top">
            <span class="tier-dist-badge">${SVG.pin}<span>${tier.distanceLabel}</span></span>
            <span class="tier-price">${addLabel}</span>
          </div>
          <h3>${tier.name}</h3>
          <p class="tier-sub">${tier.stars} · ${tier.makkahExamples}</p>
        </button>
      `;
    }).join('');

    const current = getHotelTier(state.hotelTierId);
    const perksHtml = current.perks
      .map((perk) => `<li>${SVG.check}<span>${perk}</span></li>`)
      .join('');

    els.hotelDetailPanel.innerHTML = `
      <div class="hotel-detail-head">
        <div>
          <small>${current.stars}</small>
          <h3>${current.name}</h3>
        </div>
        <span class="tier-dist-badge">${current.distanceLabel}</span>
      </div>

      <div class="proximity-meter">
        <div class="proximity-labels">
          <span>مؤشر القرب الفعلي من ساحات المسجد الحرام</span>
          <span class="num-font">${current.proximityPct}%</span>
        </div>
        <div class="proximity-bar">
          <div class="proximity-fill" style="width:${current.proximityPct}%"></div>
        </div>
      </div>

      <div class="hotel-detail-specs">
        <div class="hotel-spec-box">
          <span>فنادق مكة المكرمة المعتمدة</span>
          <strong>${current.makkahExamples}</strong>
        </div>
        <div class="hotel-spec-box">
          <span>فنادق المدينة المنورة المقابلة</span>
          <strong>${current.madinahDistance}</strong>
        </div>
      </div>

      <ul class="hotel-detail-list">${perksHtml}</ul>

      <div class="hotel-detail-footer">
        <div>
          <small style="display:block;font-size:.76rem;color:var(--muted);">فارق الترقية للفرد البالغ</small>
          <strong class="num-font" style="font-size:1.25rem;color:var(--emerald);">
            ${current.adultAddUsd === 0 ? 'مشمول بالباقة الأساسية' : '+' + formatMoney(current.adultAddUsd)}
          </strong>
        </div>
        <a href="#calculator" class="btn-emerald-sm" style="display:inline-flex;">تطبيق على الحاسبة</a>
      </div>
    `;
  }

  function updateCalculatorAndSummary() {
    const modeObj = TRAVEL_MODES[state.travelMode] || TRAVEL_MODES.air;
    const roomObj = ROOM_TYPES[state.roomType] || ROOM_TYPES.quad;
    const tierObj = getHotelTier(state.hotelTierId);

    const baseUsd =
      state.adults * modeObj.baseAdultUsd +
      state.children * modeObj.baseChildUsd;

    const hotelRoomUsd =
      state.adults * (tierObj.adultAddUsd + roomObj.adultAddUsd) +
      state.children * (tierObj.childAddUsd + roomObj.childAddUsd);

    const addonsUsd =
      (state.addonZiyarat ? state.adults * 35 + state.children * 20 : 0) +
      (state.addonAirport ? 110 : 0);

    const totalUsd = baseUsd + hotelRoomUsd + addonsUsd;
    const perAdultUsd = Math.round(
      modeObj.baseAdultUsd +
        tierObj.adultAddUsd +
        roomObj.adultAddUsd +
        (state.addonZiyarat ? 35 : 0) +
        (state.addonAirport ? 110 / Math.max(1, state.adults) : 0)
    );

    const effectiveBeds = state.adults + state.children * 0.5;
    const roomsNeeded = Math.max(1, Math.ceil(effectiveBeds / roomObj.cap));
    const paxLabel = `${state.adults} بالغ${state.children > 0 ? ` + ${state.children} طفل` : ''}`;
    const roomsLabel = `${roomsNeeded} ${roomsNeeded === 1 ? 'غرفة' : roomsNeeded === 2 ? 'غرفتان' : 'غرف'}`;

    if (els.calcAdultsVal) els.calcAdultsVal.textContent = String(state.adults);
    if (els.calcChildrenVal) els.calcChildrenVal.textContent = String(state.children);
    if (els.calcHotelSelect) els.calcHotelSelect.value = state.hotelTierId;

    if (els.calcModeAir) els.calcModeAir.classList.toggle('is-active', state.travelMode === 'air');
    if (els.calcModeLand) els.calcModeLand.classList.toggle('is-active', state.travelMode === 'land');

    document.querySelectorAll('#calc-room-group .room-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.room === state.roomType);
    });

    if (els.calcSummaryMode) els.calcSummaryMode.textContent = modeObj.label;
    if (els.calcSummaryHotel) els.calcSummaryHotel.textContent = tierObj.shortName;
    if (els.calcSummaryRoom) els.calcSummaryRoom.textContent = roomObj.label;
    if (els.calcSummaryTravelers) els.calcSummaryTravelers.textContent = paxLabel;
    if (els.calcSummaryRoomsCount) els.calcSummaryRoomsCount.textContent = roomsLabel;

    if (els.calcLineBase) els.calcLineBase.textContent = formatMoney(baseUsd);
    if (els.calcLineHotel) els.calcLineHotel.textContent = formatMoney(hotelRoomUsd);
    if (els.calcLineAddons) els.calcLineAddons.textContent = formatMoney(addonsUsd);
    if (els.calcPerAdult) els.calcPerAdult.textContent = formatMoney(perAdultUsd);

    state.lastTotalFmt = formatMoney(totalUsd);
    if (els.calcTotalPrice) els.calcTotalPrice.textContent = state.lastTotalFmt;

    // Sync Instant Booking Ticket
    if (els.bookSumPkg) els.bookSumPkg.textContent = state.selectedPackageTitle;
    if (els.bookSumMode) els.bookSumMode.textContent = modeObj.label;
    if (els.bookSumHotel) els.bookSumHotel.textContent = tierObj.shortName;
    if (els.bookSumRoom) els.bookSumRoom.textContent = roomObj.label;
    if (els.bookSumPax) els.bookSumPax.textContent = `${paxLabel} (${roomsLabel})`;
    if (els.bookSumTotal) els.bookSumTotal.textContent = state.lastTotalFmt;
  }

  function renderVisaChecklist() {
    const visa = VISA_CHECKLISTS[state.activeVisaType] || VISA_CHECKLISTS.umrah;
    const checkedMap = state.checkedDocs[state.activeVisaType] || {};

    document.querySelectorAll('#visa-tabs .visa-tab').forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.visa === state.activeVisaType);
    });

    if (els.visaProcessingTime) els.visaProcessingTime.textContent = visa.processing;
    if (els.visaValidityNote) els.visaValidityNote.textContent = visa.validity;

    let doneCount = 0;
    if (els.visaChecklistItems) {
      els.visaChecklistItems.innerHTML = visa.items
        .map((item) => {
          const isDone = Boolean(checkedMap[item.id]);
          if (isDone) doneCount += 1;
          return `
            <li class="visa-item ${isDone ? 'is-checked' : ''}" data-doc-id="${item.id}" role="checkbox" aria-checked="${isDone}" tabindex="0">
              <span class="visa-check-box">${isDone ? SVG.check : ''}</span>
              <div class="visa-item-copy">
                <strong>${item.title}</strong>
                <small>${item.note}</small>
              </div>
            </li>
          `;
        })
        .join('');
    }

    const total = visa.items.length;
    const pct = Math.round((doneCount / total) * 100);
    if (els.visaProgressText) els.visaProgressText.textContent = `${doneCount} / ${total} جاهز`;
    if (els.visaProgressBar) els.visaProgressBar.style.width = `${pct}%`;
    if (els.bookSumVisa) els.bookSumVisa.textContent = `${visa.title} (${doneCount}/${total} جاهز)`;
  }

  function renderServices() {
    if (!els.servicesGrid) return;
    els.servicesGrid.innerHTML = TRAVEL_DATA.services
      .map(
        (svc) => `
          <article class="svc-card">
            <div class="svc-icon-box">${SVG[svc.icon] || SVG.doc}</div>
            <h3>${svc.title}</h3>
            <p>${svc.desc}</p>
          </article>
        `
      )
      .join('');
  }

  function buildBookingMessage() {
    const modeObj = TRAVEL_MODES[state.travelMode] || TRAVEL_MODES.air;
    const roomObj = ROOM_TYPES[state.roomType] || ROOM_TYPES.quad;
    const tierObj = getHotelTier(state.hotelTierId);
    const visa = VISA_CHECKLISTS[state.activeVisaType] || VISA_CHECKLISTS.umrah;
    const checkedMap = state.checkedDocs[state.activeVisaType] || {};
    const readyCount = visa.items.filter((i) => checkedMap[i.id]).length;

    const name = els.bookName?.value.trim() || 'غير محدد';
    const phone = els.bookPhone?.value.trim() || 'غير محدد';
    const city = els.bookCity?.value || 'صنعاء';
    const dateVal = els.bookDate?.value || 'مرن / أقرب موعد';
    const notes = els.bookNotes?.value.trim() || 'لا توجد ملاحظات إضافية';

    return [
      `*طلب حجز رحلة — ${TRAVEL_CONFIG.agencyName} (الفئة الفاخرة Pro)*`,
      `البرنامج المختار: ${state.selectedPackageTitle}`,
      `وسيلة السفر: ${modeObj.label}`,
      `مستوى الفندق والقرب من الحرم: ${tierObj.name}`,
      `نوع الغرفة: ${roomObj.label}`,
      `المسافرون: ${state.adults} بالغ${state.children > 0 ? ` + ${state.children} طفل` : ''}`,
      `الخدمات الإضافية: ${state.addonZiyarat ? 'جولة المزارات الخاصة' : 'بدون مزارات'}${state.addonAirport ? ' + استقبال مطار خاص' : ''}`,
      `جاهزية مستندات (${visa.title}): ${readyCount} من ${visa.items.length}`,
      `التقدير المالي (${state.currency.toUpperCase()}): ${state.lastTotalFmt}`,
      `--- بيانات المسافر ---`,
      `الاسم: ${name}`,
      `الهاتف: ${phone}`,
      `مدينة المغادرة: ${city}`,
      `التاريخ المقترح: ${dateVal}`,
      `ملاحظات: ${notes}`,
    ].join('\n');
  }

  function handleCurrencyChange(curr) {
    if (!RATES[curr]) return;
    state.currency = curr;
    syncCurrencyButtons();
    renderPackages();
    renderHotelSelector();
    updateCalculatorAndSummary();
  }

  function bindEvents() {
    els.currencySwitch?.addEventListener('click', (e) => {
      const btn = e.target.closest('.curr-btn');
      if (btn) handleCurrencyChange(btn.dataset.curr);
    });

    els.calcCurrGroup?.addEventListener('click', (e) => {
      const btn = e.target.closest('.mini-curr-btn');
      if (btn) handleCurrencyChange(btn.dataset.curr);
    });

    els.mobileMenuBtn?.addEventListener('click', () => {
      const isHidden = els.mobileDrawer.hasAttribute('hidden');
      if (isHidden) {
        els.mobileDrawer.removeAttribute('hidden');
        els.mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        els.mobileDrawer.setAttribute('hidden', '');
        els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    els.mobileDrawer?.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        els.mobileDrawer.setAttribute('hidden', '');
        els.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      }
    });

    els.heroThumbs?.addEventListener('click', (e) => {
      const btn = e.target.closest('.thumb-item');
      if (!btn) return;
      document.querySelectorAll('#pro-hero-thumbs .thumb-item').forEach((t) => t.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (els.heroMainImg && btn.dataset.img) els.heroMainImg.src = btn.dataset.img;
      if (els.heroCaption && btn.dataset.caption) els.heroCaption.textContent = btn.dataset.caption;
    });

    els.pkgFilters?.addEventListener('click', (e) => {
      const btn = e.target.closest('.f-pill');
      if (!btn) return;
      document.querySelectorAll('#pro-pkg-filters .f-pill').forEach((p) => p.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.activeCat = btn.dataset.cat || 'all';
      renderPackages();
    });

    els.packagesGrid?.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-pkg-calc');
      if (!btn) return;
      const pkgId = btn.dataset.pkgId;
      const pkg = TRAVEL_DATA.packages.find((p) => p.id === pkgId);
      const preset = PACKAGE_ENRICHMENT[pkgId];
      if (pkg) state.selectedPackageTitle = pkg.title;
      if (preset) {
        state.travelMode = preset.presetMode;
        state.hotelTierId = preset.presetHotel;
        state.roomType = preset.presetRoom;
      }
      renderHotelSelector();
      updateCalculatorAndSummary();
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    });

    els.hotelTiers?.addEventListener('click', (e) => {
      const btn = e.target.closest('.hotel-tier-btn');
      if (!btn) return;
      state.hotelTierId = btn.dataset.tier;
      renderHotelSelector();
      updateCalculatorAndSummary();
    });

    els.calcHotelSelect?.addEventListener('change', (e) => {
      state.hotelTierId = e.target.value;
      renderHotelSelector();
      updateCalculatorAndSummary();
    });

    els.calcModeAir?.addEventListener('click', () => {
      state.travelMode = 'air';
      state.selectedPackageTitle = TRAVEL_DATA.packages[0].title;
      updateCalculatorAndSummary();
    });

    els.calcModeLand?.addEventListener('click', () => {
      state.travelMode = 'land';
      state.selectedPackageTitle = TRAVEL_DATA.packages[1].title;
      updateCalculatorAndSummary();
    });

    els.calcRoomGroup?.addEventListener('click', (e) => {
      const btn = e.target.closest('.room-btn');
      if (!btn) return;
      state.roomType = btn.dataset.room;
      updateCalculatorAndSummary();
    });

    els.calcAdultsMinus?.addEventListener('click', () => {
      if (state.adults > 1) {
        state.adults -= 1;
        updateCalculatorAndSummary();
      }
    });

    els.calcAdultsPlus?.addEventListener('click', () => {
      if (state.adults < 20) {
        state.adults += 1;
        updateCalculatorAndSummary();
      }
    });

    els.calcChildrenMinus?.addEventListener('click', () => {
      if (state.children > 0) {
        state.children -= 1;
        updateCalculatorAndSummary();
      }
    });

    els.calcChildrenPlus?.addEventListener('click', () => {
      if (state.children < 10) {
        state.children += 1;
        updateCalculatorAndSummary();
      }
    });

    els.calcAddonZiyarat?.addEventListener('change', (e) => {
      state.addonZiyarat = e.target.checked;
      updateCalculatorAndSummary();
    });

    els.calcAddonAirport?.addEventListener('change', (e) => {
      state.addonAirport = e.target.checked;
      updateCalculatorAndSummary();
    });

    els.calcApplyBtn?.addEventListener('click', () => {
      updateCalculatorAndSummary();
      if (els.bookingFeedback) {
        els.bookingFeedback.textContent = 'تم تحديث ملخص الحجز باختيارات الحاسبة بنجاح.';
      }
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    });

    els.visaTabs?.addEventListener('click', (e) => {
      const tab = e.target.closest('.visa-tab');
      if (!tab) return;
      state.activeVisaType = tab.dataset.visa;
      renderVisaChecklist();
    });

    const toggleVisaDoc = (docId) => {
      if (!docId) return;
      if (!state.checkedDocs[state.activeVisaType]) {
        state.checkedDocs[state.activeVisaType] = {};
      }
      const map = state.checkedDocs[state.activeVisaType];
      map[docId] = !map[docId];
      renderVisaChecklist();
    };

    els.visaChecklistItems?.addEventListener('click', (e) => {
      const item = e.target.closest('.visa-item');
      if (item) toggleVisaDoc(item.dataset.docId);
    });

    els.visaChecklistItems?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const item = e.target.closest('.visa-item');
        if (item) {
          e.preventDefault();
          toggleVisaDoc(item.dataset.docId);
        }
      }
    });

    els.visaResetBtn?.addEventListener('click', () => {
      state.checkedDocs[state.activeVisaType] = {};
      renderVisaChecklist();
    });

    els.visaCheckAllBtn?.addEventListener('click', () => {
      const visa = VISA_CHECKLISTS[state.activeVisaType];
      if (!visa) return;
      const map = {};
      visa.items.forEach((i) => {
        map[i.id] = true;
      });
      state.checkedDocs[state.activeVisaType] = map;
      renderVisaChecklist();
    });

    els.copySummaryBtn?.addEventListener('click', async () => {
      const msg = buildBookingMessage();
      try {
        await navigator.clipboard.writeText(msg);
        if (els.bookingFeedback) {
          els.bookingFeedback.textContent = 'تم نسخ ملخص الحجز التفصيلي إلى الحافظة.';
        }
      } catch (_err) {
        if (els.bookingFeedback) {
          els.bookingFeedback.textContent = 'تعذر النسخ التلقائي — يمكنك الإرسال مباشرة عبر واتساب.';
        }
      }
    });

    els.bookingForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = buildBookingMessage();
      const url = `https://wa.me/${TRAVEL_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener');
      if (els.bookingFeedback) {
        els.bookingFeedback.textContent = 'تم فتح محادثة واتساب بتفاصيل الحجز الكاملة (الفئة الفاخرة Pro).';
      }
    });
  }

  renderAgencyHeaderMeta();
  renderStats();
  renderPackages();
  renderHotelSelector();
  renderVisaChecklist();
  renderServices();
  updateCalculatorAndSummary();
  bindEvents();
})();
