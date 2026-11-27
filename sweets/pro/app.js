/* =========================================================
   app.js — حلويات وآيسكريم البطريق (الفئة الفاخرة Pro)
   ========================================================= */
'use strict';

const PRO_CONFIG = {
  whatsappNumber: '967782259937',
  brandName: 'حلويات وآيسكريم البطريق',
  tierLabel: 'الفئة الفاخرة Pro',
  topperPriceUSD: 4,
};

const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1, prefix: true, roundTo: 1 },
  SAR: { code: 'SAR', symbol: 'ر.س', rate: 3.75, prefix: false, roundTo: 1 },
  YER: { code: 'YER', symbol: 'ر.ي', rate: 535, prefix: false, roundTo: 50 },
};

const PRO_DATA = {
  metrics: [
    { value: '+15,480', label: 'تقييم موثق على المتاجر' },
    { value: '100%', label: 'جيلاتو حليب وفواكه طبيعية' },
    { value: '4.9 / 5', label: 'معدل رضا العملاء' },
    { value: '0 دقيقة', label: 'انتظار عند الاستلام المجدول' },
  ],

  categories: [
    { id: 'all', name: 'جميع الابتكارات' },
    { id: 'cakes', name: 'كيكات المناسبات' },
    { id: 'gelato', name: 'الجيلاتو والآيسكريم' },
    { id: 'boxes', name: 'بوكسات الضيافة' },
  ],

  menuItems: [
    {
      id: 'belgian-chocolate-cake',
      category: 'cakes',
      tag: 'الأكثر طلباً',
      readyBadge: 'تجهيز مسبق: ساعتان',
      title: 'كيكة الشوكولاتة البلجيكية الفاخرة',
      desc: 'إسفنج شوكولاتة داكنة محشو بطبقات جاناش بلجيكي غني وكرانشي البندق المحمّص.',
      img: '../assets/images/dessert-1.jpg',
      variants: [
        { label: '1 كجم (8-10 أشخاص)', priceUSD: 32 },
        { label: '2 كجم (18-22 شخص)', priceUSD: 56 },
      ],
    },
    {
      id: 'pistachio-raspberry-cake',
      category: 'cakes',
      tag: 'إصدار البوتيك',
      readyBadge: 'تجهيز مسبق: 3 ساعات',
      title: 'كيكة الفستق والتوت البري المخصصة',
      desc: 'طبقات إسفنج فستق حلبي طري مع كريمة الماسكاربوني وحبات التوت الأحمر الطازجة.',
      img: '../assets/images/dessert-3.jpg',
      variants: [
        { label: '1 كجم (8-10 أشخاص)', priceUSD: 36 },
        { label: '2 كجم (18-22 شخص)', priceUSD: 64 },
      ],
    },
    {
      id: 'penguin-parfait-gelato',
      category: 'gelato',
      tag: 'جيلاتو المعمل',
      readyBadge: 'استلام فوري مبرد',
      title: 'بارفيه جيلاتو البطريق بالكوكيز والجاناش',
      desc: 'كأس جيلاتو فانيليا وشوكولاتة طبيعية بطبقات الكوكيز المقرمش وصوص الشوكولاتة الدافئ.',
      img: '../assets/images/dessert-2.jpg',
      variants: [
        { label: 'كأس فاخر مفرد', priceUSD: 6 },
        { label: 'بوكس عائلي (4 كؤوس)', priceUSD: 21 },
      ],
    },
    {
      id: 'raspberry-gelato-bars',
      category: 'gelato',
      tag: 'طبيعي 100%',
      readyBadge: 'استلام فوري من الثلاجة',
      title: 'أعواد جيلاتو الرازبيري والكريمة',
      desc: 'آيسكريم فواكه طبيعي محضر يومياً من التوت الأحمر وكريمة الحليب الطازج دون نكهات صناعية.',
      img: '../assets/images/dessert-4.jpg',
      variants: [
        { label: 'بوكس 6 أعواد', priceUSD: 12 },
        { label: 'بوكس 12 عود', priceUSD: 22 },
      ],
    },
    {
      id: 'french-crepe-platter',
      category: 'boxes',
      tag: 'للجمعات',
      readyBadge: 'جاهز خلال 30 دقيقة',
      title: 'صينية الكريب الفرنسي بالتوت والشانتيي',
      desc: 'لفائف كريب فرنسي محشوة بكريمة الشانتيي المخفوقة والفراولة والتوت الطازج للمناسبات.',
      img: '../assets/images/dessert-5.jpg',
      variants: [
        { label: 'صينية 8 أشخاص', priceUSD: 17 },
        { label: 'صينية 16 شخص', priceUSD: 31 },
      ],
    },
    {
      id: 'tropical-sorbet-trio',
      category: 'boxes',
      tag: 'منعش',
      readyBadge: 'تجهيز فوري',
      title: 'تشكيلة السوربيه والمنعشات الاستوائية',
      desc: 'ثلاثية طبيعية من سوربيه المانجو، الليمون بالنعناع، وفاكهة التنين بالتوت للضيافة الصيفية.',
      img: '../assets/images/dessert-6.jpg',
      variants: [
        { label: 'تشكيلة 6 أكواب', priceUSD: 15 },
        { label: 'تشكيلة 12 كوب', priceUSD: 28 },
      ],
    },
  ],

  studio: {
    sizes: [
      { id: '1kg', label: '1 كجم', servings: '8 - 10 أشخاص', tiers: 1, leadTime: 'تجهيز خلال 4 ساعات', priceUSD: 32 },
      { id: '2kg', label: '2 كجم', servings: '18 - 22 شخص', tiers: 2, leadTime: 'تجهيز خلال 6 ساعات', priceUSD: 56 },
      { id: '3kg', label: '3 كجم', servings: '30 - 35 شخص', tiers: 3, leadTime: 'حجز مسبق 24 ساعة', priceUSD: 82 },
    ],
    sponges: [
      { id: 'vanilla', label: 'فانيليا مدغشقر البيضاء', extraUSD: 0 },
      { id: 'chocolate', label: 'شوكولاتة بلجيكية 70%', extraUSD: 3 },
      { id: 'redvelvet', label: 'ريد فيلفيت مخملي', extraUSD: 4 },
      { id: 'pistachio', label: 'فستق حلبي محمّص', extraUSD: 6 },
    ],
    fillings: [
      { id: 'hazelnut', label: 'كرانشي البندق والبرالين', color: '#7A4B2A', extraUSD: 0 },
      { id: 'berry', label: 'كومبوت التوت والفراولة', color: '#9E1F46', extraUSD: 2 },
      { id: 'caramel', label: 'كراميل مملح وبسكويت لوتس', color: '#C98E4B', extraUSD: 2 },
      { id: 'whitechoc', label: 'موس شوكولاتة بيضاء وفستق', color: '#7D9B56', extraUSD: 4 },
    ],
    frostings: [
      { id: 'champagne', label: 'كريمة شامبين عاجية', bg: '#F7EFE6', accent: '#C98E4B' },
      { id: 'rose', label: 'باستيل وردي ناعم', bg: '#F4CBD8', accent: '#8E2D52' },
      { id: 'ganache', label: 'جاناش شوكولاتة داكنة', bg: '#4E2921', accent: '#E5BA68' },
    ],
  },

  branches: [
    {
      id: 'hadda',
      name: 'الفرع الرئيسي — شارع حدة',
      address: 'شارع حدة، بجوار مركز الكميم التجاري',
      hours: 'يومياً: 10:00 صباحاً – 1:30 فجراً',
    },
    {
      id: 'asbahi',
      name: 'فرع الأصبحي — حي الأصبحي',
      address: 'شارع الأصبحي العام، تقاطع شارع 24',
      hours: 'يومياً: 11:00 صباحاً – 1:00 فجراً',
    },
  ],

  timeSlots: [
    'الصباح 11:00 - 1:00',
    'العصر 4:00 - 6:30',
    'المساء 7:00 - 9:30',
    'ليلاً 10:00 - 12:30',
  ],

  reviews: [
    {
      name: 'سارة المهيدب',
      meta: 'حجز كيكة تخرج مخصّصة',
      text: 'صممت كيكة تخرج أختي من الاستوديو، اخترت حشوة البندق وكتابة الإهداء واستلمتها مبردة من فرع حدة دون دقيقة انتظار.',
    },
    {
      name: 'عبدالله الحاشدي',
      meta: 'طلب جيلاتو وبوكسات جمعات',
      text: 'جيلاتو الفواكه الطبيعي لا يُعلى عليه. جدولة موعد الاستلام قبل وصولنا للفرع وفرت علينا الازدحام تماماً.',
    },
    {
      name: 'ريم القحطاني',
      meta: 'تصميم كيكة ميلاد باستيل',
      text: 'المعاينة الفورية في استوديو الكيك ساعدتني أختار الحجم والتغليف المناسب بدقة، والطعم فاق التوقعات.',
    },
    {
      name: 'محمد الصنعاني',
      meta: 'عميل دائم — فرع الأصبحي',
      text: 'تغليف أنيق ومذاق متوازن في الشوكولاتة البلجيكية والبانا كوتا. تعامل راقٍ وسرعة في تأكيد الطلب عبر واتساب.',
    },
  ],

  faqs: [
    {
      q: 'كم يستغرق تجهيز الكيكة المصمّمة عبر استوديو الكيك؟',
      a: 'كيكات 1 كجم تُجهز خلال 4 ساعات من تأكيد الطلب، وأحجام 2 كجم خلال 6 ساعات، بينما يُفضّل حجز كيكات المناسبات الكبيرة (3 كجم) قبل 24 ساعة لضمان إتقان كل التفاصيل.',
    },
    {
      q: 'كيف يعمل نظام الاستلام السريع دون انتظار من الفرع؟',
      a: 'بمجرد اختيارك للفرع والفترة الزمنية في جدول الاستلام، يقوم المعمل بتحضير طلبك وحفظه في ثلاجات الاستلام السريع المخصصة لتستلمه فور وصولك مباشرة.',
    },
    {
      q: 'هل تتوفر خيارات الدفع والتسعير بأكثر من عملة؟',
      a: 'نعم، يمكنك التبديل الفوري أعلى الصفحة بين الدولار الأمريكي (USD) والريال السعودي (SAR) والريال اليمني (YER) ليظهر لك الإجمالي النهائي بوضوح.',
    },
    {
      q: 'هل الجيلاتو خالٍ من الزيوت المهدرجة والنكهات الصناعية؟',
      a: 'جميع نكهات الجيلاتو والسوربيه في معمل البطريق تُصنع يومياً من الحليب الطبيعي والفواكه الطازجة الخالصة دون أي بدائل دهنية مهدرجة.',
    },
  ],
};

/* ── Application State ───────────────────────────────────── */
const state = {
  currency: 'USD',
  activeCategory: 'all',
  selectedVariants: {},
  studio: {
    sizeId: '1kg',
    spongeId: 'vanilla',
    fillingId: 'hazelnut',
    frostingId: 'champagne',
    occasion: 'عيد ميلاد سعيد',
    message: 'أجمل التهاني وأحلى اللحظات',
    topper: false,
  },
  pickup: {
    branchId: 'hadda',
    date: getTodayISO(),
    slot: 'العصر 4:00 - 6:30',
    fulfillment: 'استلام مباشر من ثلاجة الحجز السريع',
  },
  cart: [],
};

function getTodayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/* ── Currency Helper ─────────────────────────────────────── */
function formatMoney(usdAmount) {
  const cfg = CURRENCIES[state.currency];
  let converted = usdAmount * cfg.rate;
  if (cfg.roundTo > 1) {
    converted = Math.round(converted / cfg.roundTo) * cfg.roundTo;
  } else {
    converted = Math.round(converted);
  }
  const formatted = converted.toLocaleString('en-US');
  return cfg.prefix ? `${cfg.symbol}${formatted}` : `${formatted} ${cfg.symbol}`;
}

/* ── Init Lifecycle ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  PRO_DATA.menuItems.forEach((item) => {
    state.selectedVariants[item.id] = 0;
  });

  initHeaderScroll();
  initCurrencySwitcher();
  initMobileNav();
  initCartDrawer();

  renderMetrics();
  renderMenuTabs();
  renderMenuGrid();

  initCakeStudio();
  initPickupScheduler();
  initAppCompanionTabs();
  renderReviews();
  renderFaqs();
  renderCart();
});

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
}

function initCurrencySwitcher() {
  const wrap = document.getElementById('currency-switcher');
  if (!wrap) return;
  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.curr-btn');
    if (!btn) return;
    state.currency = btn.dataset.curr;
    wrap.querySelectorAll('.curr-btn').forEach((el) => {
      el.classList.toggle('active', el.dataset.curr === state.currency);
    });
    renderMenuGrid();
    renderStudioSizeCards();
    updateCakePreview();
    renderCart();
  });
}

function initMobileNav() {
  const openBtn = document.getElementById('open-mobile-nav');
  const closeBtn = document.getElementById('close-mobile-nav');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  if (!openBtn || !drawer || !backdrop) return;

  const setOpen = (isOpen) => {
    drawer.classList.toggle('open', isOpen);
    backdrop.classList.toggle('open', isOpen);
  };

  openBtn.addEventListener('click', () => setOpen(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
  backdrop.addEventListener('click', () => setOpen(false));
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

/* ── Render Metrics Band ─────────────────────────────────── */
function renderMetrics() {
  const container = document.getElementById('metrics-grid');
  if (!container) return;
  container.innerHTML = PRO_DATA.metrics.map((m) => `
    <div class="metric-item">
      <div class="metric-val">${m.value}</div>
      <div class="metric-label">${m.label}</div>
    </div>
  `).join('');
}

/* ── Render Menu Gallery ─────────────────────────────────── */
function renderMenuTabs() {
  const tabsEl = document.getElementById('menu-tabs');
  if (!tabsEl) return;
  tabsEl.innerHTML = PRO_DATA.categories.map((cat) => `
    <button type="button"
      class="menu-tab-btn ${cat.id === state.activeCategory ? 'active' : ''}"
      data-cat="${cat.id}"
      role="tab"
      aria-selected="${cat.id === state.activeCategory}">
      ${cat.name}
    </button>
  `).join('');

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.menu-tab-btn');
    if (!btn) return;
    state.activeCategory = btn.dataset.cat;
    renderMenuTabs();
    renderMenuGrid();
  });
}

function renderMenuGrid() {
  const gridEl = document.getElementById('menu-grid');
  if (!gridEl) return;

  const list = state.activeCategory === 'all'
    ? PRO_DATA.menuItems
    : PRO_DATA.menuItems.filter((item) => item.category === state.activeCategory);

  gridEl.innerHTML = list.map((item) => {
    const vIdx = state.selectedVariants[item.id] || 0;
    const activeVariant = item.variants[vIdx];
    const variantsHtml = item.variants.map((v, idx) => `
      <button type="button"
        class="variant-pill ${idx === vIdx ? 'active' : ''}"
        data-item-id="${item.id}"
        data-v-idx="${idx}">
        ${v.label}
      </button>
    `).join('');

    return `
      <article class="menu-card">
        <div class="menu-card-media">
          <img src="${item.img}" alt="${item.title}" loading="lazy">
          <span class="menu-card-tag">${item.tag}</span>
          <span class="menu-card-ready">${item.readyBadge}</span>
        </div>
        <div class="menu-card-body">
          <h3>${item.title}</h3>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="variant-pills">${variantsHtml}</div>
          <div class="menu-card-foot">
            <span class="menu-price">${formatMoney(activeVariant.priceUSD)}</span>
            <button type="button" class="btn-add-mini" data-add-menu="${item.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>أضف للسلة</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  gridEl.onclick = (e) => {
    const vBtn = e.target.closest('.variant-pill');
    if (vBtn) {
      state.selectedVariants[vBtn.dataset.itemId] = Number(vBtn.dataset.vIdx);
      renderMenuGrid();
      return;
    }

    const addBtn = e.target.closest('[data-add-menu]');
    if (addBtn) {
      addMenuItemToCart(addBtn.dataset.addMenu);
    }
  };
}

function addMenuItemToCart(itemId) {
  const item = PRO_DATA.menuItems.find((x) => x.id === itemId);
  if (!item) return;
  const vIdx = state.selectedVariants[item.id] || 0;
  const variant = item.variants[vIdx];
  const cartKey = `menu:${item.id}:${vIdx}`;

  const existing = state.cart.find((c) => c.key === cartKey);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      key: cartKey,
      type: 'menu',
      title: item.title,
      meta: variant.label,
      unitPriceUSD: variant.priceUSD,
      qty: 1,
    });
  }

  renderCart();
  showToast(`تمت إضافة "${item.title}" إلى السلة`);
}

/* ── Custom Celebration Cake Studio ──────────────────────── */
function initCakeStudio() {
  renderStudioSizeCards();
  renderStudioSponges();
  renderStudioFillings();
  renderStudioFrostings();

  const occSelect = document.getElementById('cake-occasion-select');
  const msgInput = document.getElementById('cake-message-input');
  const topperToggle = document.getElementById('cake-topper-toggle');
  const addStudioBtn = document.getElementById('studio-add-btn');

  if (occSelect) {
    occSelect.addEventListener('change', (e) => {
      state.studio.occasion = e.target.value;
      updateCakePreview();
    });
  }

  if (msgInput) {
    msgInput.addEventListener('input', (e) => {
      state.studio.message = e.target.value.trim() || 'احتفال سعيد مع البطريق';
      updateCakePreview();
    });
  }

  if (topperToggle) {
    topperToggle.addEventListener('change', (e) => {
      state.studio.topper = e.target.checked;
      updateCakePreview();
    });
  }

  if (addStudioBtn) {
    addStudioBtn.addEventListener('click', addCustomCakeToCart);
  }

  updateCakePreview();
}

function renderStudioSizeCards() {
  const container = document.getElementById('studio-size-options');
  if (!container) return;

  container.innerHTML = PRO_DATA.studio.sizes.map((s) => `
    <button type="button" class="size-card-btn ${state.studio.sizeId === s.id ? 'active' : ''}" data-size-id="${s.id}">
      <strong>${s.label}</strong>
      <span>${s.servings}</span>
      <div class="size-price">${formatMoney(s.priceUSD)}</div>
    </button>
  `).join('');

  container.onclick = (e) => {
    const btn = e.target.closest('[data-size-id]');
    if (!btn) return;
    state.studio.sizeId = btn.dataset.sizeId;
    renderStudioSizeCards();
    updateCakePreview();
  };
}

function renderStudioSponges() {
  const container = document.getElementById('studio-sponge-options');
  if (!container) return;

  container.innerHTML = PRO_DATA.studio.sponges.map((sp) => `
    <button type="button" class="option-pill-btn ${state.studio.spongeId === sp.id ? 'active' : ''}" data-sponge-id="${sp.id}">
      <span>${sp.label}</span>
      <small>${sp.extraUSD > 0 ? `+${sp.extraUSD}$` : 'قياسي'}</small>
    </button>
  `).join('');

  container.onclick = (e) => {
    const btn = e.target.closest('[data-sponge-id]');
    if (!btn) return;
    state.studio.spongeId = btn.dataset.spongeId;
    renderStudioSponges();
    updateCakePreview();
  };
}

function renderStudioFillings() {
  const container = document.getElementById('studio-filling-options');
  if (!container) return;

  container.innerHTML = PRO_DATA.studio.fillings.map((fl) => `
    <button type="button" class="option-pill-btn ${state.studio.fillingId === fl.id ? 'active' : ''}" data-filling-id="${fl.id}">
      <span>${fl.label}</span>
      <small>${fl.extraUSD > 0 ? `+${fl.extraUSD}$` : 'قياسي'}</small>
    </button>
  `).join('');

  container.onclick = (e) => {
    const btn = e.target.closest('[data-filling-id]');
    if (!btn) return;
    state.studio.fillingId = btn.dataset.fillingId;
    renderStudioFillings();
    updateCakePreview();
  };
}

function renderStudioFrostings() {
  const container = document.getElementById('studio-frosting-options');
  if (!container) return;

  container.innerHTML = PRO_DATA.studio.frostings.map((fr) => `
    <button type="button" class="swatch-btn ${state.studio.frostingId === fr.id ? 'active' : ''}" data-frosting-id="${fr.id}">
      <span class="swatch-circle" style="background:${fr.bg};"></span>
      <span>${fr.label}</span>
    </button>
  `).join('');

  container.onclick = (e) => {
    const btn = e.target.closest('[data-frosting-id]');
    if (!btn) return;
    state.studio.frostingId = btn.dataset.frostingId;
    renderStudioFrostings();
    updateCakePreview();
  };
}

function getStudioComputed() {
  const size = PRO_DATA.studio.sizes.find((s) => s.id === state.studio.sizeId);
  const sponge = PRO_DATA.studio.sponges.find((s) => s.id === state.studio.spongeId);
  const filling = PRO_DATA.studio.fillings.find((f) => f.id === state.studio.fillingId);
  const frosting = PRO_DATA.studio.frostings.find((f) => f.id === state.studio.frostingId);
  const topperUSD = state.studio.topper ? PRO_CONFIG.topperPriceUSD : 0;
  const totalUSD = size.priceUSD + sponge.extraUSD + filling.extraUSD + topperUSD;
  return { size, sponge, filling, frosting, totalUSD };
}

function updateCakePreview() {
  const { size, sponge, filling, frosting, totalUSD } = getStudioComputed();

  const tierBadge = document.getElementById('preview-tier-badge');
  const leadtimeEl = document.getElementById('preview-leadtime');
  const occLabel = document.getElementById('preview-occasion-label');
  const msgEl = document.getElementById('preview-message-text');
  const sizeSum = document.getElementById('preview-size-summary');
  const spongeSum = document.getElementById('preview-sponge-summary');
  const fillingSum = document.getElementById('preview-filling-summary');
  const frostingSum = document.getElementById('preview-frosting-summary');
  const topperRow = document.getElementById('preview-topper-row');
  const priceEl = document.getElementById('studio-price');
  const cakeRenderEl = document.getElementById('couture-cake-render');

  if (tierBadge) tierBadge.textContent = `${size.id.toUpperCase()} · ${size.tiers} ${size.tiers === 1 ? 'TIER' : 'TIERS'}`;
  if (leadtimeEl) leadtimeEl.textContent = size.leadTime;
  if (occLabel) occLabel.textContent = state.studio.occasion;
  if (msgEl) msgEl.textContent = state.studio.message;
  if (sizeSum) sizeSum.textContent = `${size.label} (${size.servings})`;
  if (spongeSum) spongeSum.textContent = sponge.label;
  if (fillingSum) fillingSum.textContent = filling.label;
  if (frostingSum) frostingSum.textContent = frosting.label;
  if (topperRow) topperRow.style.display = state.studio.topper ? 'flex' : 'none';
  if (priceEl) priceEl.textContent = formatMoney(totalUSD);

  if (cakeRenderEl) {
    const tierClasses = size.tiers === 3
      ? ['cake-tier--top', 'cake-tier--mid', 'cake-tier--base']
      : size.tiers === 2
        ? ['cake-tier--mid', 'cake-tier--base']
        : ['cake-tier--base'];

    const topperHtml = state.studio.topper ? '<div class="cake-topper-arch"></div>' : '';
    const tiersHtml = tierClasses.map((cls) => `
      <div class="cake-tier ${cls}" style="background:${frosting.bg};">
        <span class="cake-tier-filling-band" style="background:${filling.color};"></span>
        <span class="cake-tier-ribbon" style="background:${frosting.accent};"></span>
      </div>
    `).join('');

    cakeRenderEl.innerHTML = `${topperHtml}${tiersHtml}<div class="cake-pedestal"></div>`;
  }
}

function addCustomCakeToCart() {
  const { size, sponge, filling, frosting, totalUSD } = getStudioComputed();
  const topperNote = state.studio.topper ? ' + تاج ذهبي وشمعة شرار' : '';
  const meta = `${size.label} | إسفنج: ${sponge.label} | حشوة: ${filling.label} | تغليف: ${frosting.label}${topperNote} | عبارة: "${state.studio.message}" (${state.studio.occasion})`;
  const cartKey = `cake:${Date.now()}`;

  state.cart.push({
    key: cartKey,
    type: 'custom-cake',
    title: `كيكة مناسبة مخصّصة (${size.label})`,
    meta,
    unitPriceUSD: totalUSD,
    qty: 1,
  });

  renderCart();
  openCartDrawer();
  showToast('تمت إضافة الكيكة المخصصة إلى سلة الطلبات');
}

/* ── Branch Pickup Time Scheduler ────────────────────────── */
function initPickupScheduler() {
  const dateInput = document.getElementById('scheduler-date');
  const fulfillSelect = document.getElementById('scheduler-fulfillment');

  if (dateInput) {
    dateInput.min = getTodayISO();
    dateInput.value = state.pickup.date;
    dateInput.addEventListener('change', (e) => {
      state.pickup.date = e.target.value || getTodayISO();
      updatePickupSummary();
    });
  }

  if (fulfillSelect) {
    fulfillSelect.addEventListener('change', (e) => {
      state.pickup.fulfillment = e.target.value;
      updatePickupSummary();
    });
  }

  renderBranchChoices();
  renderTimeSlots();
  updatePickupSummary();
}

function renderBranchChoices() {
  const container = document.getElementById('branch-selector-list');
  if (!container) return;

  container.innerHTML = PRO_DATA.branches.map((br) => `
    <button type="button" class="branch-choice-btn ${state.pickup.branchId === br.id ? 'active' : ''}" data-branch-id="${br.id}">
      <strong>${br.name}</strong>
      <span>${br.address}</span>
      <span>${br.hours}</span>
    </button>
  `).join('');

  container.onclick = (e) => {
    const btn = e.target.closest('[data-branch-id]');
    if (!btn) return;
    state.pickup.branchId = btn.dataset.branchId;
    renderBranchChoices();
    updatePickupSummary();
  };
}

function renderTimeSlots() {
  const container = document.getElementById('time-slots-grid');
  if (!container) return;

  container.innerHTML = PRO_DATA.timeSlots.map((slot) => `
    <button type="button" class="slot-pill-btn ${state.pickup.slot === slot ? 'active' : ''}" data-slot="${slot}">
      ${slot}
    </button>
  `).join('');

  container.onclick = (e) => {
    const btn = e.target.closest('[data-slot]');
    if (!btn) return;
    state.pickup.slot = btn.dataset.slot;
    renderTimeSlots();
    updatePickupSummary();
  };
}

function updatePickupSummary() {
  const branch = PRO_DATA.branches.find((b) => b.id === state.pickup.branchId);
  const summaryEl = document.getElementById('scheduler-summary-text');
  const drawerBranchEl = document.getElementById('drawer-branch-display');
  const drawerTimeEl = document.getElementById('drawer-time-display');

  if (summaryEl && branch) {
    summaryEl.textContent = `${state.pickup.fulfillment} — ${branch.name} (${state.pickup.date} | ${state.pickup.slot})`;
  }
  if (drawerBranchEl && branch) {
    drawerBranchEl.textContent = branch.name;
  }
  if (drawerTimeEl) {
    drawerTimeEl.textContent = `${state.pickup.date} · ${state.pickup.slot}`;
  }
}

/* ── App Companion Screen Switcher ───────────────────────── */
function initAppCompanionTabs() {
  const tabsWrap = document.getElementById('app-screen-tabs');
  const imgEl = document.getElementById('companion-screen-img');
  if (!tabsWrap || !imgEl) return;

  const map = {
    splash: '../assets/images/app-screen-splash.png',
    login: '../assets/images/app-screen-login.png',
  };

  tabsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.app-tab-btn');
    if (!btn) return;
    const key = btn.dataset.screen;
    if (!map[key]) return;
    imgEl.src = map[key];
    tabsWrap.querySelectorAll('.app-tab-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.screen === key);
    });
  });
}

/* ── Reviews & FAQ Rendering ─────────────────────────────── */
function renderReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;

  const starSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  grid.innerHTML = PRO_DATA.reviews.map((r) => `
    <article class="review-card">
      <div class="review-stars" aria-label="تقييم 5 من 5">
        ${starSvg.repeat(5)}
      </div>
      <p>"${r.text}"</p>
      <div class="review-author">
        <strong>${r.name}</strong>
        <span>${r.meta}</span>
      </div>
    </article>
  `).join('');
}

function renderFaqs() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  list.innerHTML = PRO_DATA.faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'open' : ''}">
      <button type="button" class="faq-trigger" aria-expanded="${idx === 0}">
        <span>${faq.q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="faq-answer">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');

  list.onclick = (e) => {
    const trigger = e.target.closest('.faq-trigger');
    if (!trigger) return;
    const item = trigger.parentElement;
    const wasOpen = item.classList.contains('open');
    list.querySelectorAll('.faq-item').forEach((el) => {
      el.classList.remove('open');
      el.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  };
}

/* ── Slide-Over Cart Drawer & WhatsApp Checkout ──────────── */
function initCartDrawer() {
  const openBtn = document.getElementById('open-cart-btn');
  const closeBtn = document.getElementById('close-cart-btn');
  const backdrop = document.getElementById('cart-backdrop');
  const checkoutBtn = document.getElementById('whatsapp-checkout-btn');

  if (openBtn) openBtn.addEventListener('click', openCartDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (backdrop) backdrop.addEventListener('click', closeCartDrawer);
  if (checkoutBtn) checkoutBtn.addEventListener('click', dispatchWhatsAppOrder);
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function renderCart() {
  const countEl = document.getElementById('cart-count');
  const container = document.getElementById('cart-items-container');
  const totalEl = document.getElementById('cart-grand-total');

  const totalItems = state.cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotalUSD = state.cart.reduce((acc, item) => acc + (item.unitPriceUSD * item.qty), 0);

  if (countEl) countEl.textContent = String(totalItems);
  if (totalEl) totalEl.textContent = formatMoney(subtotalUSD);

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p>سلة الطلبات فارغة حالياً.</p>
        <p>أضف أصناف الجيلاتو أو صمّم كيكتك في الاستوديو.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.cart.map((item) => `
    <div class="cart-item">
      <div class="cart-item-top">
        <strong>${item.title}</strong>
        <strong>${formatMoney(item.unitPriceUSD * item.qty)}</strong>
      </div>
      <div class="cart-item-meta">${item.meta}</div>
      <div class="cart-item-bottom">
        <div class="qty-controls">
          <button type="button" class="qty-btn" data-qty-action="dec" data-key="${item.key}" aria-label="إنقاص الكمية">-</button>
          <span>${item.qty}</span>
          <button type="button" class="qty-btn" data-qty-action="inc" data-key="${item.key}" aria-label="زيادة الكمية">+</button>
        </div>
        <button type="button" class="remove-item-btn" data-remove-key="${item.key}">إزالة</button>
      </div>
    </div>
  `).join('');

  container.onclick = (e) => {
    const qtyBtn = e.target.closest('[data-qty-action]');
    if (qtyBtn) {
      const key = qtyBtn.dataset.key;
      const action = qtyBtn.dataset.qtyAction;
      const item = state.cart.find((c) => c.key === key);
      if (!item) return;
      if (action === 'inc') item.qty += 1;
      else if (action === 'dec') {
        item.qty -= 1;
        if (item.qty <= 0) state.cart = state.cart.filter((c) => c.key !== key);
      }
      renderCart();
      return;
    }

    const remBtn = e.target.closest('[data-remove-key]');
    if (remBtn) {
      state.cart = state.cart.filter((c) => c.key !== remBtn.dataset.removeKey);
      renderCart();
    }
  };
}

function dispatchWhatsAppOrder() {
  if (state.cart.length === 0) {
    showToast('الرجاء إضافة صنف واحد على الأقل قبل إرسال الطلب');
    return;
  }

  const nameInput = document.getElementById('customer-name');
  const phoneInput = document.getElementById('customer-phone');
  const customerName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'عميل بوتيك البطريق';
  const customerPhone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'غير محدد';

  const branch = PRO_DATA.branches.find((b) => b.id === state.pickup.branchId);
  const subtotalUSD = state.cart.reduce((acc, item) => acc + (item.unitPriceUSD * item.qty), 0);

  const lines = [
    `طلب جديد من ${PRO_CONFIG.brandName} — ${PRO_CONFIG.tierLabel}`,
    `--------------------------------`,
    `العميل: ${customerName}`,
    `رقم الهاتف: ${customerPhone}`,
    `طريقة الاستلام: ${state.pickup.fulfillment}`,
    `الفرع: ${branch ? branch.name : ''}`,
    `موعد الاستلام: ${state.pickup.date} | ${state.pickup.slot}`,
    `العملة المختارة: ${state.currency}`,
    `--------------------------------`,
    `تفاصيل الطلب:`,
  ];

  state.cart.forEach((item, idx) => {
    lines.push(`${idx + 1}. ${item.title} × ${item.qty} = ${formatMoney(item.unitPriceUSD * item.qty)}`);
    lines.push(`   المواصفات: ${item.meta}`);
  });

  lines.push(`--------------------------------`);
  lines.push(`الإجمالي الكلي: ${formatMoney(subtotalUSD)}`);

  const url = `https://wa.me/${PRO_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener');
}

/* ── Toast Helper ────────────────────────────────────────── */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('boutique-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
