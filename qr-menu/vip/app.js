/* =========================================================
   app.js — مطعم وكافيه الديوان (الفئة الملكية VIP)
   Signature Restaurant & Lounge OS
   Reuses MENU_CONFIG & MENU_DATA from ../assets/js/data.js
   ========================================================= */
(function () {
  'use strict';

  const CONFIG = typeof MENU_CONFIG !== 'undefined' ? MENU_CONFIG : {
    whatsappNumber: '967782259937',
    restaurantName: 'مطعم وكافيه الديوان',
    subtitle: 'مأكولات شرقية · مشويات على الفحم · قهوة مختصة',
    hours: 'مفتوح يومياً: 11:00 ص – 1:00 ص',
    location: 'صنعاء — شارع حدة',
  };

  const RAW_CATEGORIES = (typeof MENU_DATA !== 'undefined' && MENU_DATA.categories) ? MENU_DATA.categories : [];
  const RAW_ITEMS = (typeof MENU_DATA !== 'undefined' && MENU_DATA.items) ? MENU_DATA.items : [];

  const STATS_DATA = [
    { value: '3 فروع', label: 'شارع حدة · الأصبحي · الخليج' },
    { value: '10 – 150', label: 'قدرة استيعابية للولائم والعزائم' },
    { value: '8 أطباق', label: 'قائمة التذوّق المختارة للشيف' },
    { value: 'Pro-Forma', label: 'تذاكر مطبخ وضيوف قابلة للطباعة' },
  ];

  const BRANCHES = {
    hadda: {
      id: 'hadda',
      shortName: 'شارع حدة',
      fullName: 'فرع شارع حدة (المقر الرئيسي)',
      desc: 'المقر الرئيسي في قلب شارع حدة — يضم مجالس كبار الشخصيات والتراس البانورامي وركن الشواء المباشر.',
      hours: CONFIG.hours || '11:00 ص – 1:00 ص',
      majlisStatus: '4 أجنحة متاحة اليوم',
      capacity: 'سعة حتى 120 ضيف',
      valet: 'صف سيارات VIP مجاني',
      spaces: [
        { id: 'hadda-booth', name: 'بوث الديوان المبطّن', cap: '2 – 6 ضيوف · صالة هادئة', maxGuests: 6 },
        { id: 'hadda-majlis', name: 'مجلس الديوان الملكي', cap: '6 – 14 ضيف · عزل صوتي', maxGuests: 14 },
        { id: 'hadda-exec', name: 'جناح رجال الأعمال المغلق', cap: '8 – 20 ضيف · شاشة عرض', maxGuests: 20 },
        { id: 'hadda-terrace', name: 'التراس البانورامي المحجوز', cap: '4 – 12 ضيف · إطلالة حدة', maxGuests: 12 },
      ],
    },
    asbahi: {
      id: 'asbahi',
      shortName: 'حي الأصبحي',
      fullName: 'فرع حي الأصبحي (الأجنحة العائلية)',
      desc: 'تصميم هادئ للعائلات والولائم الخاصة مع مجالس مغلقة بمدخل مستقل وحديقة الفحم.',
      hours: 'مفتوح يومياً: 12:00 ظ – 1:00 ص',
      majlisStatus: '3 أجنحة عائلية متاحة',
      capacity: 'سعة حتى 90 ضيف',
      valet: 'مواقف خاصة للعائلات',
      spaces: [
        { id: 'asbahi-family', name: 'المجلس العائلي الملكي', cap: '6 – 16 ضيف · مدخل خاص', maxGuests: 16 },
        { id: 'asbahi-garden', name: 'بوث حديقة الفحم', cap: '2 – 6 ضيوف · جلسة خضراء', maxGuests: 6 },
        { id: 'asbahi-diwan', name: 'ديوانية الأصبحي المغلقة', cap: '10 – 24 ضيف · بوفيه جانبي', maxGuests: 24 },
        { id: 'asbahi-lounge', name: 'صالة القهوة المختصة VIP', cap: '4 – 8 ضيوف · إضاءة دافئة', maxGuests: 8 },
      ],
    },
    khaleej: {
      id: 'khaleej',
      shortName: 'فرع الخليج',
      fullName: 'فرع الخليج (اللاونج التنفيذي)',
      desc: 'جناح ضيافة تنفيذي مخصّص لاجتماعات الوفود، المآدب الرسمية، وسهرات اللاونج الممتدة.',
      hours: 'مفتوح يومياً: 11:00 ص – 2:00 ص',
      majlisStatus: '5 قاعات ومجالس متاحة',
      capacity: 'سعة حتى 160 ضيف',
      valet: 'استقبال بروتوكولي وخدمة صف',
      spaces: [
        { id: 'khaleej-royal', name: 'قاعة الخليج الملكية', cap: '10 – 24 ضيف · ضيافة رسمية', maxGuests: 24 },
        { id: 'khaleej-exec', name: 'غرفة الاجتماعات التنفيذية', cap: '6 – 14 ضيف · نظام صوتي', maxGuests: 14 },
        { id: 'khaleej-booth', name: 'بوث اللاونج الذهبي', cap: '2 – 5 ضيوف · خدمة سريعة', maxGuests: 5 },
        { id: 'khaleej-sky', name: 'جناح السهرة العلوي', cap: '6 – 16 ضيف · جلسة مسائية', maxGuests: 16 },
      ],
    },
  };

  const TIME_SLOTS = [
    { id: 'lunch', label: '1:30 م', sub: 'غداء تنفيذي' },
    { id: 'afternoon', label: '5:00 م', sub: 'عصرونية وكافيه' },
    { id: 'dinner1', label: '7:30 م', sub: 'عشاء أول' },
    { id: 'dinner2', label: '9:30 م', sub: 'عشاء كبار الشخصيات' },
    { id: 'late', label: '11:30 م', sub: 'سهرة الديوان' },
  ];

  const SETUP_STYLES = [
    { id: 'arabian', label: 'ضيافة عربية بالبخور ودلة القهوة', sub: 'تمور مختارة + عود' },
    { id: 'business', label: 'تنسيق اجتماعات رسمي', sub: 'مياه زجاجية + خدمة صامتة' },
    { id: 'celebration', label: 'طاولة احتفال خاص بالشموع', sub: 'تنسيق مائدة ذهبي فاخر' },
    { id: 'family', label: 'جلسة عائلية بخصوصية تامة', sub: 'فواصل مغلقة وبوفيه جانبي' },
  ];

  const TASTING_META = {
    'kebab-charcoal': {
      station: 'ركن الفحم والشواء',
      pairing: 'يوصى بتقديمه مع عصير البرتقال والنعناع لتوازن نكهة الفحم.',
      vipLabel: 'صينية تذوّق VIP (مضاعفة)',
      vipMult: 1.85,
      prepTime: '18 دقيقة',
    },
    'roasted-chicken': {
      station: 'ركن الفحم والشواء',
      pairing: 'يتكامل مع سلطة الكينوا الطازجة وخبز التنور الحار.',
      vipLabel: 'صينية عائلية كاملة VIP',
      vipMult: 1.75,
      prepTime: '20 دقيقة',
    },
    'pizza-margherita': {
      station: 'فرن الحطب الإيطالي',
      pairing: 'توليف مثالي مع مقبلات التوست الإيطالي وزيت الزيتون البكر.',
      vipLabel: 'لوح عائلي 14 إنش VIP',
      vipMult: 1.65,
      prepTime: '14 دقيقة',
    },
    'healthy-bowl': {
      station: 'البارد والسلطات',
      pairing: 'بداية خفيفة متوازنة قبل أطباق المشاوي الرئيسية.',
      vipLabel: 'طبق مشاركة للطاولة VIP',
      vipMult: 1.6,
      prepTime: '10 دقائق',
    },
    'bruschetta-plate': {
      station: 'البارد والسلطات',
      pairing: 'مقبّل افتتاحي أنيق يُقدّم مع مشروبات الحمضيات الطازجة.',
      vipLabel: 'طبق ضيافة مزدوج VIP',
      vipMult: 1.65,
      prepTime: '9 دقائق',
    },
    'fresh-orange': {
      station: 'ركن القهوة والعصائر',
      pairing: 'يُعصر لحظة التقديم ليرافق المشويات والأطباق الساخنة.',
      vipLabel: 'جك ضيافة 1 لتر VIP',
      vipMult: 2.3,
      prepTime: '5 دقائق',
    },
    'berry-bowl': {
      station: 'ركن القهوة والعصائر',
      pairing: 'خيار انتعاش استوائي مثالي لجلسات العصر واللاونج.',
      vipLabel: 'تشكيلة كأسين VIP',
      vipMult: 1.8,
      prepTime: '6 دقائق',
    },
    'latte-art': {
      station: 'ركن القهوة والعصائر',
      pairing: 'ختام راقٍ بعد الوجبة بنكهة تحميص البن العربي الطازج.',
      vipLabel: 'إبريق تقديم مزدوج VIP',
      vipMult: 1.9,
      prepTime: '5 دقائق',
    },
  };

  const BANQUET_TIERS = [
    {
      id: 'royal-grill',
      title: 'وليمة مشاوي الديوان الملكية',
      sub: 'تركيز على صواني المشاوي والدجاج والسلطات والعصائر',
      weights: {
        'kebab-charcoal': 1.0,
        'roasted-chicken': 0.85,
        'pizza-margherita': 0.35,
        'healthy-bowl': 0.7,
        'bruschetta-plate': 0.7,
        'fresh-orange': 1.0,
        'berry-bowl': 0.4,
        'latte-art': 0.7,
      },
    },
    {
      id: 'woodfire-med',
      title: 'مأدبة فرن الحطب والمقبلات',
      sub: 'أجواء إيطالية فاخرة من البيتزا والمقبلات والسموثي والقهوة',
      weights: {
        'kebab-charcoal': 0.4,
        'roasted-chicken': 0.4,
        'pizza-margherita': 1.1,
        'healthy-bowl': 0.9,
        'bruschetta-plate': 1.0,
        'fresh-orange': 0.7,
        'berry-bowl': 0.9,
        'latte-art': 0.9,
      },
    },
    {
      id: 'grand-8',
      title: 'المائدة الديوانية الشاملة (8 أصناف)',
      sub: 'تغطية متوازنة لجميع أطباق الديوان ومشروباتها في الوليمة',
      weights: {
        'kebab-charcoal': 0.85,
        'roasted-chicken': 0.8,
        'pizza-margherita': 0.75,
        'healthy-bowl': 0.75,
        'bruschetta-plate': 0.75,
        'fresh-orange': 0.9,
        'berry-bowl': 0.75,
        'latte-art': 0.85,
      },
    },
  ];

  const BANQUET_PLATTER_SPECS = {
    'kebab-charcoal': { platterTitle: 'صينية مشاوي مشكلة على الفحم (تكفي 5 ضيوف)', serves: 5, mult: 4.5, station: 'ركن الفحم والشواء' },
    'roasted-chicken': { platterTitle: 'صينية دجاج مشوي بالليمون والأرز (تكفي 4 ضيوف)', serves: 4, mult: 3.6, station: 'ركن الفحم والشواء' },
    'pizza-margherita': { platterTitle: 'لوح بيتزا مارغريتا فرن الحطب (8 شرائح / 4 ضيوف)', serves: 4, mult: 3.2, station: 'فرن الحطب الإيطالي' },
    'healthy-bowl': { platterTitle: 'جاط سلطة الكينوا والخضار الطازجة (تكفي 5 ضيوف)', serves: 5, mult: 4.0, station: 'البارد والسلطات' },
    'bruschetta-plate': { platterTitle: 'صحن مقبلات التوست الإيطالي والسلطة (تكفي 5 ضيوف)', serves: 5, mult: 4.0, station: 'البارد والسلطات' },
    'fresh-orange': { platterTitle: 'جك عصير برتقال وليمون بالنعناع (1.5 لتر · 5 أكواب)', serves: 5, mult: 4.2, station: 'ركن القهوة والعصائر' },
    'berry-bowl': { platterTitle: 'مجموعة سموثي بول الفواكه الاستوائية (4 كؤوس)', serves: 4, mult: 3.6, station: 'ركن القهوة والعصائر' },
    'latte-art': { platterTitle: 'حافظة لاتيه إسبريسو مختص (8 أكواب مع الأكواب)', serves: 8, mult: 6.5, station: 'ركن القهوة والعصائر' },
  };

  const BANQUET_VIP_ADDONS = [
    { id: 'service-crew', label: 'طاقم مضيفين ومشرف صالة مخصّص', sub: 'خدمة متكاملة طوال مدة الوليمة', yer: 12000, sar: 85, usd: 22.67 },
    { id: 'chafing-set', label: 'سخانات بوفيه نحاسية وطاولة عرض', sub: 'حفظ حرارة المشويات والأرز 3 ساعات', yer: 8500, sar: 60, usd: 16.00 },
    { id: 'arabic-coffee', label: 'ضيافة القهوة العربية بالتمر والبخور', sub: 'تقديم ترحيبي عند استقبال الضيوف', yer: 6500, sar: 46, usd: 12.27 },
    { id: 'thermal-pack', label: 'تجهيز وتغليف حراري للنقل الخارجي', sub: 'صناديق معزولة للولائم خارج الفرع', yer: 4500, sar: 32, usd: 8.53 },
  ];

  const VIP_FAQ = [
    {
      q: 'هل تتوفر الولائم ومجالس VIP في جميع الفروع الثلاثة؟',
      a: 'نعم، يدعم النظام التبديل المباشر بين فرع شارع حدة، فرع حي الأصبحي، وفرع الخليج مع تحديث فوري للمجالس المتاحة وساعات الدوام في التذكرة.',
    },
    {
      q: 'كيف يتم احتساب كميات الصواني في مُكوّن الولائم والعزائم؟',
      a: 'بمجرد تحديد عدد الضيوف (من 10 إلى 150 ضيفاً) واختيار طابع المأدبة، يوزع النظام الصواني والمشروبات حسابياً، كما يتيح لك زيادة أو إنقاص أي صينية يدوياً قبل الاعتماد.',
    },
    {
      q: 'ما الفرق بين تذكرة الضيف (Pro-Forma) وتذكرة المطبخ (Kitchen Prep)؟',
      a: 'تعرض تذكرة الضيف تفاصيل الفاتورة الرسمية بالأسعار والعملة المختارة وإجمالي المبلغ، بينما تُرتب تذكرة المطبخ الأصناف حسب محطات التحضير (الفحم، فرن الحطب، البارد، القهوة) وموعد تجهيز المجلس.',
    },
    {
      q: 'هل يمكن طباعة التذكرة بصيغة PDF أو نسخها مباشرة؟',
      a: 'نعم، تتضمن نافذة التذكرة الرسمية زر طباعة مخصّص يُخرج الورقة البيج الفاخرة فقط بشكل نظيف جاهز للحفظ كـ PDF، إضافة إلى زر نسخ فوري وإرسال مباشر عبر واتساب.',
    },
  ];

  const ITEMS = RAW_ITEMS.map(item => {
    const tMeta = TASTING_META[item.id] || {
      station: 'المطبخ الرئيسي',
      pairing: 'يُحضّر طازجاً عند الطلب.',
      vipLabel: 'حجم ضيافة VIP',
      vipMult: 1.75,
      prepTime: '15 دقيقة',
    };
    const bSpec = BANQUET_PLATTER_SPECS[item.id] || {
      platterTitle: `${item.name} (صينية ضيافة)`,
      serves: 4,
      mult: 3.5,
      station: tMeta.station,
    };
    const imgPath = item.image.startsWith('assets/') ? `../${item.image}` : item.image;
    const baseUsd = Number((item.priceSar / 3.75).toFixed(2));
    return {
      ...item,
      img: imgPath,
      priceUsd: baseUsd,
      station: tMeta.station,
      pairing: tMeta.pairing,
      vipLabel: tMeta.vipLabel,
      vipMult: tMeta.vipMult,
      prepTime: tMeta.prepTime,
      platterTitle: bSpec.platterTitle,
      platterServes: bSpec.serves,
      platterYer: Math.round((item.priceYer * bSpec.mult) / 50) * 50,
      platterSar: Math.round(item.priceSar * bSpec.mult),
      platterUsd: Number(((item.priceSar * bSpec.mult) / 3.75).toFixed(2)),
    };
  });

  function getDefaultDate() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  const state = {
    currency: 'YER', // 'YER' | 'SAR' | 'USD'
    branchId: 'hadda',
    tastingCat: 'all',
    majlis: {
      spaceId: BRANCHES.hadda.spaces[1].id,
      date: getDefaultDate(),
      slotId: 'dinner1',
      guests: 6,
      setupId: 'arabian',
      attached: false,
    },
    banquet: {
      guests: 30,
      tierId: 'royal-grill',
      platters: {}, // { itemId: qty }
      addons: [],   // ['service-crew', ...]
    },
    ledger: [], // [{ uid, title, sub, station, qty, unitYer, unitSar, unitUsd, kind }]
    proformaView: 'guest', // 'guest' | 'kitchen'
  };

  let toastTimer = null;

  function showToast(msg) {
    const el = document.getElementById('vip-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2700);
  }

  function formatMoney(yer, sar, usd, curr = state.currency) {
    if (curr === 'SAR') {
      const val = Number.isInteger(sar) ? sar : Number(sar.toFixed(1));
      return `${val.toLocaleString('en-US')} ر.س`;
    }
    if (curr === 'USD') {
      return `$${usd.toFixed(2)}`;
    }
    return `${Math.round(yer).toLocaleString('en-US')} ر.ي`;
  }

  function getActiveBranch() {
    return BRANCHES[state.branchId] || BRANCHES.hadda;
  }

  function getSelectedSpace() {
    const b = getActiveBranch();
    return b.spaces.find(s => s.id === state.majlis.spaceId) || b.spaces[0];
  }

  function getSelectedSlot() {
    return TIME_SLOTS.find(s => s.id === state.majlis.slotId) || TIME_SLOTS[0];
  }

  function getSelectedSetup() {
    return SETUP_STYLES.find(s => s.id === state.majlis.setupId) || SETUP_STYLES[0];
  }

  // ---- Branch Switching ----
  function setActiveBranch(branchId) {
    if (!BRANCHES[branchId]) return;
    state.branchId = branchId;
    const branch = getActiveBranch();
    state.majlis.spaceId = branch.spaces[0].id;

    document.querySelectorAll('.branch-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.branch === branchId);
    });

    const heroLive = document.getElementById('vip-hero-branch-pill');
    const hudBranch = document.getElementById('vip-hud-branch');
    const hudMajlis = document.getElementById('vip-hud-majlis');
    const hudHours = document.getElementById('vip-hud-hours');
    const majlisBadge = document.getElementById('majlis-branch-badge');
    const drawerBranch = document.getElementById('drawer-active-branch');

    if (heroLive) {
      heroLive.innerHTML = `<span class="pulse-gold" aria-hidden="true"></span><span>الفرع المفعّل حالياً: ${branch.fullName}</span>`;
    }
    if (hudBranch) hudBranch.textContent = `فرع ${branch.shortName}`;
    if (hudMajlis) hudMajlis.textContent = branch.majlisStatus;
    if (hudHours) hudHours.textContent = branch.hours.replace('مفتوح يومياً: ', '');
    if (majlisBadge) majlisBadge.textContent = `متصل بفرع: ${branch.shortName}`;
    if (drawerBranch) drawerBranch.textContent = `الفرع النشط: ${branch.fullName}`;

    renderBranchCommandGrid();
    renderMajlisScheduler();
    renderDrawer();
    if (document.getElementById('proforma-modal')?.classList.contains('open')) {
      renderProFormaSheet();
    }
  }

  function renderStats() {
    const wrap = document.getElementById('vip-stats-bar');
    if (!wrap) return;
    wrap.innerHTML = STATS_DATA.map(s => `
      <div class="vip-stat-card">
        <strong>${s.value}</strong>
        <span>${s.label}</span>
      </div>
    `).join('');
  }

  function renderBranchCommandGrid() {
    const grid = document.getElementById('branch-command-grid');
    if (!grid) return;
    grid.innerHTML = Object.values(BRANCHES).map(b => {
      const isActive = b.id === state.branchId;
      return `
        <button type="button" class="branch-card ${isActive ? 'active' : ''}" data-select-branch="${b.id}">
          <div>
            <div class="branch-card-top">
              <strong>${b.fullName}</strong>
              <span class="branch-status-tag">${isActive ? 'الفرع النشط' : 'تفعيل الفرع'}</span>
            </div>
            <p style="margin-top:0.55rem;">${b.desc}</p>
          </div>
          <div class="branch-meta-list">
            <span class="branch-meta-chip">${b.capacity}</span>
            <span class="branch-meta-chip">${b.majlisStatus}</span>
            <span class="branch-meta-chip">${b.valet}</span>
          </div>
        </button>
      `;
    }).join('');
  }

  // ---- Chef's Signature Tasting Grid ----
  function renderTastingTabs() {
    const wrap = document.getElementById('tasting-cat-tabs');
    if (!wrap) return;
    wrap.innerHTML = RAW_CATEGORIES.map(c => `
      <button type="button" class="t-cat-btn ${c.id === state.tastingCat ? 'active' : ''}" data-tcat="${c.id}" role="tab" aria-selected="${c.id === state.tastingCat}">
        ${c.label}
      </button>
    `).join('');
  }

  function renderTastingGrid() {
    const grid = document.getElementById('tasting-grid');
    if (!grid) return;

    const list = state.tastingCat === 'all'
      ? ITEMS
      : ITEMS.filter(i => i.cat === state.tastingCat);

    grid.innerHTML = list.map(item => {
      const vipYer = Math.round((item.priceYer * item.vipMult) / 50) * 50;
      const vipSar = Math.round(item.priceSar * item.vipMult);
      const vipUsd = Number(((item.priceSar * item.vipMult) / 3.75).toFixed(2));

      return `
        <article class="tasting-card">
          <div class="tasting-media">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <span class="tasting-tag">${item.tag || item.station}</span>
          </div>
          <div class="tasting-body">
            <div>
              <div class="tasting-head">
                <h3>${item.name}</h3>
                <span class="tasting-cal">${item.calories}</span>
              </div>
              <p class="tasting-desc">${item.desc}</p>
            </div>
            <div class="pairing-note">${item.pairing}</div>
            <div class="tasting-footer">
              <div class="tasting-price">
                <strong>${formatMoney(item.priceYer, item.priceSar, item.priceUsd)}</strong>
                <small>${item.station} · ${item.prepTime}</small>
              </div>
              <div class="tasting-actions">
                <button type="button" class="btn-tasting-add" data-add-std="${item.id}">+ طبق قياسي</button>
                <button type="button" class="btn-tasting-vip" data-add-vip="${item.id}" title="${formatMoney(vipYer, vipSar, vipUsd)}">${item.vipLabel}</button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // ---- Majlis & VIP Booth Scheduler ----
  function renderMajlisScheduler() {
    const branch = getActiveBranch();
    const spaceGrid = document.getElementById('majlis-space-grid');
    const slotsGrid = document.getElementById('majlis-slots-grid');
    const setupGrid = document.getElementById('majlis-setup-grid');
    const dateInput = document.getElementById('majlis-date');

    if (dateInput && !dateInput.value) dateInput.value = state.majlis.date;

    if (spaceGrid) {
      spaceGrid.innerHTML = branch.spaces.map(sp => `
        <button type="button" class="vip-choice-card ${sp.id === state.majlis.spaceId ? 'selected' : ''}" data-pick-space="${sp.id}">
          <strong>${sp.name}</strong>
          <span>${sp.cap}</span>
        </button>
      `).join('');
    }

    if (slotsGrid) {
      slotsGrid.innerHTML = TIME_SLOTS.map(sl => `
        <button type="button" class="vip-choice-card ${sl.id === state.majlis.slotId ? 'selected' : ''}" data-pick-slot="${sl.id}">
          <strong>${sl.label}</strong>
          <span>${sl.sub}</span>
        </button>
      `).join('');
    }

    if (setupGrid) {
      setupGrid.innerHTML = SETUP_STYLES.map(st => `
        <button type="button" class="vip-choice-card ${st.id === state.majlis.setupId ? 'selected' : ''}" data-pick-setup="${st.id}">
          <strong>${st.label}</strong>
          <span>${st.sub}</span>
        </button>
      `).join('');
    }

    const guestCountEl = document.getElementById('majlis-guest-count');
    if (guestCountEl) guestCountEl.textContent = `${state.majlis.guests} ضيوف`;

    const selSpace = getSelectedSpace();
    const selSlot = getSelectedSlot();
    const selSetup = getSelectedSetup();

    const sBranch = document.getElementById('majlis-summary-branch');
    const sSpace = document.getElementById('majlis-summary-space');
    const sTime = document.getElementById('majlis-summary-time');
    const sGuests = document.getElementById('majlis-summary-guests');
    const sSetup = document.getElementById('majlis-summary-setup');

    if (sBranch) sBranch.textContent = branch.fullName;
    if (sSpace) sSpace.textContent = selSpace.name;
    if (sTime) sTime.textContent = `${state.majlis.date} · ${selSlot.label} (${selSlot.sub})`;
    if (sGuests) sGuests.textContent = `${state.majlis.guests} ضيوف`;
    if (sSetup) sSetup.textContent = selSetup.label;
  }

  // ---- Banquet & Feast Builder ----
  function recalculateBanquetPlatters() {
    const tier = BANQUET_TIERS.find(t => t.id === state.banquet.tierId) || BANQUET_TIERS[0];
    const guests = state.banquet.guests;
    const next = {};

    ITEMS.forEach(item => {
      const weight = tier.weights[item.id] ?? 0.6;
      const rawQty = Math.round((guests * weight) / item.platterServes);
      next[item.id] = Math.max(weight >= 0.7 ? 1 : 0, rawQty);
    });

    state.banquet.platters = next;
  }

  function computeBanquetTotals() {
    let plattersCount = 0;
    let totalYer = 0;
    let totalSar = 0;
    let totalUsd = 0;

    ITEMS.forEach(item => {
      const qty = state.banquet.platters[item.id] || 0;
      if (qty <= 0) return;
      plattersCount += qty;
      totalYer += item.platterYer * qty;
      totalSar += item.platterSar * qty;
      totalUsd += item.platterUsd * qty;
    });

    state.banquet.addons.forEach(aid => {
      const addon = BANQUET_VIP_ADDONS.find(a => a.id === aid);
      if (!addon) return;
      totalYer += addon.yer;
      totalSar += addon.sar;
      totalUsd += addon.usd;
    });

    const g = Math.max(1, state.banquet.guests);
    return {
      plattersCount,
      totalYer,
      totalSar,
      totalUsd,
      perGuestYer: totalYer / g,
      perGuestSar: totalSar / g,
      perGuestUsd: totalUsd / g,
    };
  }

  function renderBanquetBuilder() {
    const guestDisplay = document.getElementById('banquet-guest-display');
    const guestRange = document.getElementById('banquet-guest-range');
    const tierGrid = document.getElementById('banquet-tier-grid');
    const plattersList = document.getElementById('banquet-platters-list');
    const addonsGrid = document.getElementById('banquet-addons-grid');

    if (guestDisplay) guestDisplay.textContent = `${state.banquet.guests} ضيفاً`;
    if (guestRange) guestRange.value = String(state.banquet.guests);

    document.querySelectorAll('.preset-chip').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.banquetGuests) === state.banquet.guests);
    });

    if (tierGrid) {
      tierGrid.innerHTML = BANQUET_TIERS.map(t => `
        <button type="button" class="vip-choice-card ${t.id === state.banquet.tierId ? 'selected' : ''}" data-pick-tier="${t.id}">
          <strong>${t.title}</strong>
          <span>${t.sub}</span>
        </button>
      `).join('');
    }

    if (plattersList) {
      plattersList.innerHTML = ITEMS.map(item => {
        const qty = state.banquet.platters[item.id] || 0;
        const lineYer = item.platterYer * qty;
        const lineSar = item.platterSar * qty;
        const lineUsd = item.platterUsd * qty;

        return `
          <div class="platter-row">
            <div class="platter-info">
              <img src="${item.img}" alt="${item.name}" loading="lazy">
              <div>
                <strong>${item.platterTitle}</strong>
                <span>${item.station} · سعر الوحدة: ${formatMoney(item.platterYer, item.platterSar, item.platterUsd)}</span>
              </div>
            </div>
            <div class="platter-controls">
              <div class="platter-qty-box">
                <button type="button" data-platter-dec="${item.id}" aria-label="إنقاص الصينية">-</button>
                <span>${qty}</span>
                <button type="button" data-platter-inc="${item.id}" aria-label="زيادة الصينية">+</button>
              </div>
              <span class="platter-line-cost">${formatMoney(lineYer, lineSar, lineUsd)}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    if (addonsGrid) {
      addonsGrid.innerHTML = BANQUET_VIP_ADDONS.map(a => {
        const active = state.banquet.addons.includes(a.id);
        return `
          <button type="button" class="vip-choice-card ${active ? 'selected' : ''}" data-toggle-banquet-addon="${a.id}">
            <strong>${a.label}</strong>
            <span>${a.sub} · +${formatMoney(a.yer, a.sar, a.usd)}</span>
          </button>
        `;
      }).join('');
    }

    const totals = computeBanquetTotals();
    const sumGuests = document.getElementById('banquet-summary-guests');
    const sumPlatters = document.getElementById('banquet-summary-platters');
    const sumPerGuest = document.getElementById('banquet-summary-per-guest');
    const sumTotal = document.getElementById('banquet-summary-total');

    if (sumGuests) sumGuests.textContent = `${state.banquet.guests} ضيفاً`;
    if (sumPlatters) sumPlatters.textContent = `${totals.plattersCount} وحدة / صينية`;
    if (sumPerGuest) sumPerGuest.textContent = formatMoney(totals.perGuestYer, totals.perGuestSar, totals.perGuestUsd);
    if (sumTotal) sumTotal.textContent = formatMoney(totals.totalYer, totals.totalSar, totals.totalUsd);
  }

  // ---- Ledger Management ----
  function addToLedger(entry) {
    const existing = state.ledger.find(x => x.uid === entry.uid);
    if (existing) {
      existing.qty += entry.qty;
    } else {
      state.ledger.push({ ...entry });
    }
    renderDrawer();
  }

  function pushBanquetToLedger(replaceExistingBanquet = true) {
    if (replaceExistingBanquet) {
      state.ledger = state.ledger.filter(x => x.kind !== 'banquet');
    }

    let addedCount = 0;
    ITEMS.forEach(item => {
      const qty = state.banquet.platters[item.id] || 0;
      if (qty <= 0) return;
      addedCount += qty;
      state.ledger.push({
        uid: `banquet__${item.id}`,
        title: item.platterTitle,
        sub: `وليمة (${state.banquet.guests} ضيف)`,
        station: item.station,
        qty,
        unitYer: item.platterYer,
        unitSar: item.platterSar,
        unitUsd: item.platterUsd,
        kind: 'banquet',
      });
    });

    state.banquet.addons.forEach(aid => {
      const addon = BANQUET_VIP_ADDONS.find(a => a.id === aid);
      if (!addon) return;
      state.ledger.push({
        uid: `banquet-addon__${addon.id}`,
        title: addon.label,
        sub: `تجهيز ضيافة الوليمة`,
        station: 'إدارة الصالة والضيافة',
        qty: 1,
        unitYer: addon.yer,
        unitSar: addon.sar,
        unitUsd: addon.usd,
        kind: 'banquet',
      });
    });

    renderDrawer();
    return addedCount;
  }

  function getLedgerTotals() {
    return state.ledger.reduce(
      (acc, item) => {
        acc.qty += item.qty;
        acc.yer += item.unitYer * item.qty;
        acc.sar += item.unitSar * item.qty;
        acc.usd += item.unitUsd * item.qty;
        return acc;
      },
      { qty: 0, yer: 0, sar: 0, usd: 0 }
    );
  }

  function getEffectiveDocumentItems() {
    if (state.ledger.length > 0) return state.ledger;

    // Fallback preview from active Banquet Builder if ledger is empty
    const preview = [];
    ITEMS.forEach(item => {
      const qty = state.banquet.platters[item.id] || 0;
      if (qty <= 0) return;
      preview.push({
        uid: `preview__${item.id}`,
        title: item.platterTitle,
        sub: `وليمة مقترحة (${state.banquet.guests} ضيف)`,
        station: item.station,
        qty,
        unitYer: item.platterYer,
        unitSar: item.platterSar,
        unitUsd: item.platterUsd,
      });
    });
    state.banquet.addons.forEach(aid => {
      const addon = BANQUET_VIP_ADDONS.find(a => a.id === aid);
      if (!addon) return;
      preview.push({
        uid: `preview-addon__${addon.id}`,
        title: addon.label,
        sub: 'تجهيز ضيافة VIP',
        station: 'إدارة الصالة والضيافة',
        qty: 1,
        unitYer: addon.yer,
        unitSar: addon.sar,
        unitUsd: addon.usd,
      });
    });
    return preview;
  }

  function renderDrawer() {
    const totals = getLedgerTotals();
    const countEl = document.getElementById('vip-drawer-count');
    const totalEl = document.getElementById('vip-ledger-total');
    const bodyEl = document.getElementById('drawer-ledger-items');
    const majlisBlock = document.getElementById('drawer-majlis-block');

    if (countEl) countEl.textContent = String(totals.qty);
    if (totalEl) totalEl.textContent = formatMoney(totals.yer, totals.sar, totals.usd);

    if (majlisBlock) {
      const b = getActiveBranch();
      const sp = getSelectedSpace();
      const sl = getSelectedSlot();
      const st = getSelectedSetup();
      if (state.majlis.attached) {
        majlisBlock.textContent = `حجز مجلس مثبّت: ${sp.name} (${b.shortName}) · ${state.majlis.date} ${sl.label} · ${state.majlis.guests} ضيوف · ${st.label}`;
      } else {
        majlisBlock.textContent = `الحجز الحالي قيد الإعداد: ${sp.name} (${b.shortName}) · ${sl.label}`;
      }
    }

    if (!bodyEl) return;
    if (state.ledger.length === 0) {
      bodyEl.innerHTML = `<div class="ledger-empty">طلبية الكونسيرج فارغة — أضف أطباقاً من قائمة التذوّق أو اعتمد الوليمة المجمّعة.</div>`;
      return;
    }

    bodyEl.innerHTML = state.ledger.map((item, idx) => `
      <div class="ledger-item">
        <div class="ledger-item-top">
          <strong>${item.title}</strong>
          <button type="button" class="btn-del-ledger" data-del-ledger="${idx}" aria-label="حذف البند">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
            </svg>
          </button>
        </div>
        <div class="ledger-sub">${item.sub} · ${item.station}</div>
        <div class="ledger-bottom">
          <div class="platter-qty-box">
            <button type="button" data-ledger-dec="${idx}" aria-label="إنقاص الكمية">-</button>
            <span>${item.qty}</span>
            <button type="button" data-ledger-inc="${idx}" aria-label="زيادة الكمية">+</button>
          </div>
          <span class="ledger-price">${formatMoney(item.unitYer * item.qty, item.unitSar * item.qty, item.unitUsd * item.qty)}</span>
        </div>
      </div>
    `).join('');
  }

  // ---- Pro-Forma Guest & Kitchen Ticket Modal ----
  function renderProFormaSheet() {
    const branch = getActiveBranch();
    const space = getSelectedSpace();
    const slot = getSelectedSlot();
    const setup = getSelectedSetup();
    const docItems = getEffectiveDocumentItems();
    const isKitchen = state.proformaView === 'kitchen';

    const badgeEl = document.getElementById('proforma-sheet-badge');
    const dateEl = document.getElementById('proforma-date-issued');
    const contextEl = document.getElementById('proforma-context-banner');
    const theadEl = document.getElementById('proforma-table-head');
    const tbodyEl = document.getElementById('proforma-table-body');
    const totalsEl = document.getElementById('proforma-totals-box');
    const kitchenNotesEl = document.getElementById('proforma-kitchen-notes');
    const branchFooterEl = document.getElementById('proforma-branch-footer');

    if (badgeEl) badgeEl.textContent = isKitchen ? 'KITCHEN PREP TICKET · تذكرة المطبخ' : 'GUEST PRO-FORMA TICKET · فاتورة الضيف';
    if (dateEl) dateEl.textContent = `تاريخ الإصدار: ${new Date().toISOString().split('T')[0]}`;

    if (contextEl) {
      contextEl.innerHTML = `
        <div>الفرع: ${branch.fullName} | الجناح / المجلس: ${space.name} (${state.majlis.guests} ضيوف)</div>
        <div>الموعد: ${state.majlis.date} — ${slot.label} (${slot.sub}) | التنسيق: ${setup.label}</div>
      `;
    }

    if (branchFooterEl) {
      branchFooterEl.textContent = `الفرع المعتمد: ${branch.fullName} | ${branch.hours} | واتساب الكونسيرج: ${CONFIG.whatsappNumber}+`;
    }

    if (isKitchen) {
      if (theadEl) {
        theadEl.innerHTML = `
          <tr>
            <th>محطة المطبخ</th>
            <th>الصنف / الصينية المطلوبة</th>
            <th>الكمية</th>
            <th>ملاحظات التحضير والتسليم</th>
          </tr>
        `;
      }
      if (tbodyEl) {
        if (!docItems.length) {
          tbodyEl.innerHTML = `<tr><td colspan="4" style="text-align:center;">لا توجد بنود مضافة بعد.</td></tr>`;
        } else {
          const sorted = [...docItems].sort((a, b) => a.station.localeCompare(b.station, 'ar'));
          tbodyEl.innerHTML = sorted.map(it => `
            <tr>
              <td><strong>${it.station}</strong></td>
              <td>${it.title}</td>
              <td><strong>× ${it.qty}</strong></td>
              <td>${it.sub} — تسليم ساخن للجناح قبل الموعد بـ 10 دقائق</td>
            </tr>
          `).join('');
        }
      }
      const totalUnits = docItems.reduce((s, it) => s + it.qty, 0);
      if (totalsEl) {
        totalsEl.innerHTML = `
          <span>إجمالي الوحدات الصادرة من المطبخ (${totalUnits} وحدة)</span>
          <span>تنفيذ: ${space.name} — ${slot.label}</span>
        `;
      }
      if (kitchenNotesEl) {
        const extraNote = document.getElementById('vip-ledger-notes')?.value.trim() || 'لا توجد ملاحظات إضافية';
        kitchenNotesEl.innerHTML = `<strong>تعليمات الشيف ومشرف الصالة:</strong> تجهيز ${setup.label} في ${space.name} قبل وصول الضيوف بـ 30 دقيقة. ملاحظات: ${extraNote}.`;
      }
    } else {
      if (theadEl) {
        theadEl.innerHTML = `
          <tr>
            <th>البند والمواصفات</th>
            <th>الكمية</th>
            <th>سعر الوحدة</th>
            <th>الإجمالي</th>
          </tr>
        `;
      }
      let sumYer = 0;
      let sumSar = 0;
      let sumUsd = 0;

      if (tbodyEl) {
        if (!docItems.length) {
          tbodyEl.innerHTML = `<tr><td colspan="4" style="text-align:center;">لا توجد بنود مضافة بعد.</td></tr>`;
        } else {
          tbodyEl.innerHTML = docItems.map(it => {
            const subYer = it.unitYer * it.qty;
            const subSar = it.unitSar * it.qty;
            const subUsd = it.unitUsd * it.qty;
            sumYer += subYer;
            sumSar += subSar;
            sumUsd += subUsd;
            return `
              <tr>
                <td><strong>${it.title}</strong><br><small style="color:#6B5B4E;">${it.sub}</small></td>
                <td>${it.qty}</td>
                <td>${formatMoney(it.unitYer, it.unitSar, it.unitUsd)}</td>
                <td><strong>${formatMoney(subYer, subSar, subUsd)}</strong></td>
              </tr>
            `;
          }).join('');
        }
      }
      if (totalsEl) {
        totalsEl.innerHTML = `
          <span>الإجمالي التقديري المعتمد (${state.currency})</span>
          <strong>${formatMoney(sumYer, sumSar, sumUsd)}</strong>
        `;
      }
      if (kitchenNotesEl) {
        const noteText = document.getElementById('vip-ledger-notes')?.value.trim() || 'الضيافة العربية والخدمة متضمنة حسب تنسيق المجلس.';
        kitchenNotesEl.innerHTML = `<strong>ملاحظات وتجهيزات الضيافة:</strong> ${noteText}`;
      }
    }
  }

  function buildVipWhatsAppText() {
    const branch = getActiveBranch();
    const space = getSelectedSpace();
    const slot = getSelectedSlot();
    const setup = getSelectedSetup();
    const docItems = getEffectiveDocumentItems();

    const guestName = (
      document.getElementById('proforma-guest-name')?.value.trim() ||
      document.getElementById('vip-ledger-client-name')?.value.trim() ||
      'ضيف دار الديوان الكريم'
    );
    const guestPhone = (
      document.getElementById('proforma-guest-phone')?.value.trim() ||
      document.getElementById('vip-ledger-client-phone')?.value.trim() ||
      ''
    );
    const generalNote = document.getElementById('vip-ledger-notes')?.value.trim() || '';

    const lines = [
      `*تذكرة ضيافة وطلب — ${CONFIG.restaurantName}*`,
      `الفئة: الفئة الملكية VIP`,
      `الفرع: ${branch.fullName}`,
      `الضيف / الجهة: ${guestName}`,
    ];
    if (guestPhone) lines.push(`رقم التواصل: ${guestPhone}`);
    lines.push(`حجز المجلس: ${space.name} (${state.majlis.guests} ضيوف)`);
    lines.push(`الموعد: ${state.majlis.date} | ${slot.label} (${slot.sub})`);
    lines.push(`التنسيق: ${setup.label}`);
    lines.push(`الوضع المعروض: ${state.proformaView === 'kitchen' ? 'تذكرة المطبخ (Kitchen Prep)' : 'تذكرة الضيف الرسمية (Pro-Forma)'}`);
    lines.push('--- البنود المعتمدة ---');

    let sumYer = 0;
    let sumSar = 0;
    let sumUsd = 0;

    docItems.forEach((it, idx) => {
      const subYer = it.unitYer * it.qty;
      const subSar = it.unitSar * it.qty;
      const subUsd = it.unitUsd * it.qty;
      sumYer += subYer;
      sumSar += subSar;
      sumUsd += subUsd;
      if (state.proformaView === 'kitchen') {
        lines.push(`${idx + 1}. [${it.station}] ${it.title} × ${it.qty}`);
      } else {
        lines.push(`${idx + 1}. ${it.title} × ${it.qty} = ${formatMoney(subYer, subSar, subUsd)}`);
      }
    });

    lines.push('---------------------------');
    lines.push(`*الإجمالي الكلي:* ${formatMoney(sumYer, sumSar, sumUsd)}`);
    if (state.currency !== 'YER') lines.push(`المعادل بالريال اليمني: ${formatMoney(sumYer, sumSar, sumUsd, 'YER')}`);
    if (generalNote) lines.push(`توجيهات إضافية: ${generalNote}`);
    return lines.join('\n');
  }

  function renderVipFaq() {
    const wrap = document.getElementById('vip-faq-list');
    if (!wrap) return;
    wrap.innerHTML = VIP_FAQ.map((f, idx) => `
      <div class="vip-faq-item ${idx === 0 ? 'open' : ''}">
        <button type="button" class="vip-faq-btn" aria-expanded="${idx === 0}">
          <span>${f.q}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="vip-faq-ans">${f.a}</div>
      </div>
    `).join('');
  }

  function openProFormaModal() {
    renderProFormaSheet();
    document.getElementById('proforma-backdrop')?.classList.add('open');
    document.getElementById('proforma-modal')?.classList.add('open');
  }

  function closeProFormaModal() {
    document.getElementById('proforma-backdrop')?.classList.remove('open');
    document.getElementById('proforma-modal')?.classList.remove('open');
  }

  function openVipDrawer() {
    renderDrawer();
    document.getElementById('vip-drawer-backdrop')?.classList.add('open');
    document.getElementById('vip-drawer')?.classList.add('open');
  }

  function closeVipDrawer() {
    document.getElementById('vip-drawer-backdrop')?.classList.remove('open');
    document.getElementById('vip-drawer')?.classList.remove('open');
  }

  function openMobileNav() {
    document.getElementById('vip-mobile-backdrop')?.classList.add('open');
    document.getElementById('vip-mobile-drawer')?.classList.add('open');
  }

  function closeMobileNav() {
    document.getElementById('vip-mobile-backdrop')?.classList.remove('open');
    document.getElementById('vip-mobile-drawer')?.classList.remove('open');
  }

  function bindEvents() {
    // Currency switcher
    document.getElementById('vip-currency-switcher')?.addEventListener('click', e => {
      const btn = e.target.closest('.v-curr-btn');
      if (!btn) return;
      document.querySelectorAll('.v-curr-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currency = btn.dataset.curr;
      renderTastingGrid();
      renderBanquetBuilder();
      renderDrawer();
      if (document.getElementById('proforma-modal')?.classList.contains('open')) {
        renderProFormaSheet();
      }
    });

    // Multi-Branch switcher (Header & Command Grid)
    document.getElementById('vip-branch-pills')?.addEventListener('click', e => {
      const btn = e.target.closest('.branch-pill');
      if (!btn) return;
      setActiveBranch(btn.dataset.branch);
      showToast(`تم التحويل إلى ${getActiveBranch().fullName}`);
    });

    document.getElementById('branch-command-grid')?.addEventListener('click', e => {
      const card = e.target.closest('[data-select-branch]');
      if (!card) return;
      setActiveBranch(card.dataset.selectBranch);
      showToast(`تم تفعيل ${getActiveBranch().fullName}`);
    });

    // Tasting category tabs & item additions
    document.getElementById('tasting-cat-tabs')?.addEventListener('click', e => {
      const btn = e.target.closest('.t-cat-btn');
      if (!btn) return;
      state.tastingCat = btn.dataset.tcat;
      renderTastingTabs();
      renderTastingGrid();
    });

    document.getElementById('tasting-grid')?.addEventListener('click', e => {
      const stdBtn = e.target.closest('[data-add-std]');
      if (stdBtn) {
        const item = ITEMS.find(i => i.id === stdBtn.dataset.addStd);
        if (!item) return;
        addToLedger({
          uid: `std__${item.id}`,
          title: item.name,
          sub: 'تقديم قياسي (قائمة الشيف)',
          station: item.station,
          qty: 1,
          unitYer: item.priceYer,
          unitSar: item.priceSar,
          unitUsd: item.priceUsd,
          kind: 'tasting',
        });
        showToast(`أُضيف "${item.name}" إلى طلبية الكونسيرج`);
        return;
      }

      const vipBtn = e.target.closest('[data-add-vip]');
      if (vipBtn) {
        const item = ITEMS.find(i => i.id === vipBtn.dataset.addVip);
        if (!item) return;
        const vipYer = Math.round((item.priceYer * item.vipMult) / 50) * 50;
        const vipSar = Math.round(item.priceSar * item.vipMult);
        const vipUsd = Number(((item.priceSar * item.vipMult) / 3.75).toFixed(2));
        addToLedger({
          uid: `vip__${item.id}`,
          title: `${item.name} — ${item.vipLabel}`,
          sub: 'حصة ضيافة VIP مضاعفة',
          station: item.station,
          qty: 1,
          unitYer: vipYer,
          unitSar: vipSar,
          unitUsd: vipUsd,
          kind: 'tasting',
        });
        showToast(`أُضيف "${item.name} (${item.vipLabel})" إلى الطلبية`);
      }
    });

    // Majlis & VIP Booth Scheduler
    document.getElementById('majlis-space-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-pick-space]');
      if (!btn) return;
      state.majlis.spaceId = btn.dataset.pickSpace;
      renderMajlisScheduler();
    });

    document.getElementById('majlis-slots-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-pick-slot]');
      if (!btn) return;
      state.majlis.slotId = btn.dataset.pickSlot;
      renderMajlisScheduler();
    });

    document.getElementById('majlis-setup-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-pick-setup]');
      if (!btn) return;
      state.majlis.setupId = btn.dataset.pickSetup;
      renderMajlisScheduler();
    });

    document.getElementById('majlis-date')?.addEventListener('change', e => {
      state.majlis.date = e.target.value || getDefaultDate();
      renderMajlisScheduler();
    });

    document.getElementById('majlis-guest-dec')?.addEventListener('click', () => {
      state.majlis.guests = Math.max(2, state.majlis.guests - 1);
      renderMajlisScheduler();
    });

    document.getElementById('majlis-guest-inc')?.addEventListener('click', () => {
      state.majlis.guests = Math.min(24, state.majlis.guests + 1);
      renderMajlisScheduler();
    });

    document.getElementById('btn-attach-majlis')?.addEventListener('click', () => {
      state.majlis.attached = true;
      renderDrawer();
      showToast(`تم تثبيت حجز "${getSelectedSpace().name}" في الطلبية`);
    });

    document.getElementById('btn-majlis-proforma')?.addEventListener('click', () => {
      state.majlis.attached = true;
      renderDrawer();
      openProFormaModal();
    });

    // Banquet & Feast Builder
    document.getElementById('banquet-guest-range')?.addEventListener('input', e => {
      state.banquet.guests = Number(e.target.value) || 30;
      recalculateBanquetPlatters();
      renderBanquetBuilder();
    });

    document.getElementById('banquet-preset-btns')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-banquet-guests]');
      if (!btn) return;
      state.banquet.guests = Number(btn.dataset.banquetGuests) || 30;
      recalculateBanquetPlatters();
      renderBanquetBuilder();
    });

    document.getElementById('banquet-tier-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-pick-tier]');
      if (!btn) return;
      state.banquet.tierId = btn.dataset.pickTier;
      recalculateBanquetPlatters();
      renderBanquetBuilder();
    });

    document.getElementById('banquet-platters-list')?.addEventListener('click', e => {
      const incBtn = e.target.closest('[data-platter-inc]');
      if (incBtn) {
        const id = incBtn.dataset.platterInc;
        state.banquet.platters[id] = (state.banquet.platters[id] || 0) + 1;
        renderBanquetBuilder();
        return;
      }
      const decBtn = e.target.closest('[data-platter-dec]');
      if (decBtn) {
        const id = decBtn.dataset.platterDec;
        state.banquet.platters[id] = Math.max(0, (state.banquet.platters[id] || 0) - 1);
        renderBanquetBuilder();
      }
    });

    document.getElementById('banquet-addons-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-toggle-banquet-addon]');
      if (!btn) return;
      const aid = btn.dataset.toggleBanquetAddon;
      if (state.banquet.addons.includes(aid)) {
        state.banquet.addons = state.banquet.addons.filter(x => x !== aid);
      } else {
        state.banquet.addons.push(aid);
      }
      renderBanquetBuilder();
    });

    document.getElementById('btn-add-banquet-ledger')?.addEventListener('click', () => {
      const count = pushBanquetToLedger(true);
      if (count === 0) {
        showToast('حدد صينية واحدة على الأقل داخل الوليمة');
        return;
      }
      showToast(`تم اعتماد الوليمة (${count} وحدة) في طلبية الكونسيرج`);
      openVipDrawer();
    });

    document.getElementById('btn-banquet-proforma')?.addEventListener('click', () => {
      pushBanquetToLedger(true);
      openProFormaModal();
    });

    // Pro-Forma Modal & Drawer Events
    document.getElementById('btn-open-proforma-header')?.addEventListener('click', openProFormaModal);
    document.getElementById('btn-drawer-to-proforma')?.addEventListener('click', () => {
      closeVipDrawer();
      openProFormaModal();
    });
    document.getElementById('btn-close-proforma')?.addEventListener('click', closeProFormaModal);
    document.getElementById('proforma-backdrop')?.addEventListener('click', closeProFormaModal);

    document.getElementById('ticket-view-guest')?.addEventListener('click', () => {
      state.proformaView = 'guest';
      document.getElementById('ticket-view-guest')?.classList.add('active');
      document.getElementById('ticket-view-kitchen')?.classList.remove('active');
      renderProFormaSheet();
    });

    document.getElementById('ticket-view-kitchen')?.addEventListener('click', () => {
      state.proformaView = 'kitchen';
      document.getElementById('ticket-view-kitchen')?.classList.add('active');
      document.getElementById('ticket-view-guest')?.classList.remove('active');
      renderProFormaSheet();
    });

    document.getElementById('btn-copy-proforma')?.addEventListener('click', async () => {
      const text = buildVipWhatsAppText();
      try {
        await navigator.clipboard.writeText(text);
        showToast('تم نسخ التذكرة الرسمية بنجاح');
      } catch {
        showToast('استخدم زر الطباعة أو الإرسال عبر واتساب');
      }
    });

    document.getElementById('btn-print-proforma')?.addEventListener('click', () => window.print());

    document.getElementById('btn-proforma-wa-dispatch')?.addEventListener('click', () => {
      const text = buildVipWhatsAppText();
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });

    document.getElementById('btn-drawer-wa-send')?.addEventListener('click', () => {
      const items = getEffectiveDocumentItems();
      if (!items.length) {
        showToast('أضف أطباقاً أو اعتمد الوليمة أولاً');
        return;
      }
      const text = buildVipWhatsAppText();
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });

    // VIP Drawer
    document.getElementById('btn-open-vip-drawer')?.addEventListener('click', openVipDrawer);
    document.getElementById('btn-close-vip-drawer')?.addEventListener('click', closeVipDrawer);
    document.getElementById('vip-drawer-backdrop')?.addEventListener('click', closeVipDrawer);

    document.getElementById('drawer-ledger-items')?.addEventListener('click', e => {
      const incBtn = e.target.closest('[data-ledger-inc]');
      if (incBtn) {
        const idx = Number(incBtn.dataset.ledgerInc);
        if (state.ledger[idx]) state.ledger[idx].qty += 1;
        renderDrawer();
        return;
      }
      const decBtn = e.target.closest('[data-ledger-dec]');
      if (decBtn) {
        const idx = Number(decBtn.dataset.ledgerDec);
        if (state.ledger[idx]) {
          state.ledger[idx].qty -= 1;
          if (state.ledger[idx].qty <= 0) state.ledger.splice(idx, 1);
        }
        renderDrawer();
        return;
      }
      const delBtn = e.target.closest('[data-del-ledger]');
      if (delBtn) {
        const idx = Number(delBtn.dataset.delLedger);
        state.ledger.splice(idx, 1);
        renderDrawer();
      }
    });

    // Mobile Nav
    document.getElementById('open-vip-mobile-nav')?.addEventListener('click', openMobileNav);
    document.getElementById('close-vip-mobile-nav')?.addEventListener('click', closeMobileNav);
    document.getElementById('vip-mobile-backdrop')?.addEventListener('click', closeMobileNav);
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // FAQ
    document.getElementById('vip-faq-list')?.addEventListener('click', e => {
      const btn = e.target.closest('.vip-faq-btn');
      if (!btn) return;
      const item = btn.closest('.vip-faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.vip-faq-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.vip-faq-btn')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const brandEl = document.getElementById('vip-brand-name');
    if (brandEl) brandEl.textContent = CONFIG.restaurantName;

    const topHours = document.getElementById('vip-topbar-hours');
    if (topHours) topHours.textContent = CONFIG.hours;

    renderStats();
    renderTastingTabs();
    renderTastingGrid();
    recalculateBanquetPlatters();
    renderBanquetBuilder();
    renderVipFaq();
    setActiveBranch('hadda');
    bindEvents();
  });
})();
