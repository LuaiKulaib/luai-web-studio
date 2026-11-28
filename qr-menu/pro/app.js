/* =========================================================
   app.js — مطعم وكافيه الديوان (الفئة الفاخرة Pro)
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
    defaultTable: '4',
  };

  const RAW_CATEGORIES = (typeof MENU_DATA !== 'undefined' && MENU_DATA.categories) ? MENU_DATA.categories : [];
  const RAW_ITEMS = (typeof MENU_DATA !== 'undefined' && MENU_DATA.items) ? MENU_DATA.items : [];

  const DIETARY_META = {
    'kebab-charcoal': {
      kcal: 720,
      prepTime: '16 – 20 دقيقة',
      filters: ['high-protein'],
      badges: ['غني بالبروتين', 'مشوي على الفحم'],
      portionType: 'grill',
      prepType: 'grill',
      addonGroup: 'grill',
    },
    'roasted-chicken': {
      kcal: 640,
      prepTime: '18 – 22 دقيقة',
      filters: ['high-protein'],
      badges: ['غني بالبروتين', 'وجبة متكاملة'],
      portionType: 'chicken',
      prepType: 'grill',
      addonGroup: 'grill',
    },
    'pizza-margherita': {
      kcal: 580,
      prepTime: '12 – 15 دقيقة',
      filters: ['vegetarian'],
      badges: ['نباتي', 'تخمير 48 ساعة'],
      portionType: 'pizza',
      prepType: 'pizza',
      addonGroup: 'pizza',
    },
    'healthy-bowl': {
      kcal: 310,
      prepTime: '8 – 10 دقائق',
      filters: ['low-cal', 'vegetarian'],
      badges: ['أقل من 350 سعرة', 'نباتي طازج'],
      portionType: 'salad',
      prepType: 'salad',
      addonGroup: 'salad',
    },
    'bruschetta-plate': {
      kcal: 280,
      prepTime: '8 – 10 دقائق',
      filters: ['low-cal', 'vegetarian'],
      badges: ['أقل من 350 سعرة', 'نباتي'],
      portionType: 'salad',
      prepType: 'salad',
      addonGroup: 'salad',
    },
    'fresh-orange': {
      kcal: 120,
      prepTime: '4 – 6 دقائق',
      filters: ['low-cal', 'vegetarian', 'beverage'],
      badges: ['120 سعرة فقط', 'طازج بدون سكر'],
      portionType: 'drink',
      prepType: 'cold-drink',
      addonGroup: 'drink',
    },
    'berry-bowl': {
      kcal: 260,
      prepTime: '5 – 7 دقائق',
      filters: ['low-cal', 'vegetarian', 'beverage'],
      badges: ['أقل من 350 سعرة', 'فواكه طبيعية'],
      portionType: 'drink',
      prepType: 'smoothie',
      addonGroup: 'drink',
    },
    'latte-art': {
      kcal: 150,
      prepTime: '4 – 6 دقائق',
      filters: ['low-cal', 'vegetarian', 'beverage'],
      badges: ['150 سعرة', 'بن عربي مختص'],
      portionType: 'coffee',
      prepType: 'coffee',
      addonGroup: 'coffee',
    },
  };

  const PORTION_TEMPLATES = {
    grill: [
      { id: 'std', label: 'حصة قياسية (Standard)', sub: 'تكفي شخص واحد', yer: 0, sar: 0, usd: 0, cal: 0 },
      { id: 'lrg', label: 'حصة وفيرة (Large)', sub: '+1 سيخ وخضار مضاعفة', yer: 1500, sar: 11, usd: 2.93, cal: 220 },
      { id: 'fam', label: 'صحن مشاركة عائلي', sub: 'يكفي 2 – 3 أشخاص', yer: 3600, sar: 26, usd: 6.93, cal: 540 },
    ],
    chicken: [
      { id: 'std', label: 'نصف دجاجة مع الأرز', sub: 'الحصة القياسية', yer: 0, sar: 0, usd: 0, cal: 0 },
      { id: 'lrg', label: 'دجاجة كاملة مشوية', sub: 'مع أرز ومقبلات مضاعفة', yer: 2600, sar: 19, usd: 5.07, cal: 420 },
    ],
    pizza: [
      { id: 'std', label: 'حجم وسط (10 إنش)', sub: '6 قطع · قياسي', yer: 0, sar: 0, usd: 0, cal: 0 },
      { id: 'lrg', label: 'حجم عائلي (14 إنش)', sub: '8 قطع كبيرة', yer: 1400, sar: 10, usd: 2.67, cal: 280 },
    ],
    salad: [
      { id: 'std', label: 'طبق فردي (Regular)', sub: 'تقديم قياسي', yer: 0, sar: 0, usd: 0, cal: 0 },
      { id: 'lrg', label: 'طبق مشاركة كبير', sub: 'ضعف الكمية للطاولة', yer: 900, sar: 7, usd: 1.87, cal: 150 },
    ],
    drink: [
      { id: 'std', label: 'كأس قياسي (350 مل)', sub: 'تقديم فردي', yer: 0, sar: 0, usd: 0, cal: 0 },
      { id: 'lrg', label: 'كأس كبير (500 مل)', sub: 'كمية إضافية 45%', yer: 450, sar: 3.5, usd: 0.93, cal: 55 },
      { id: 'jug', label: 'جك ضيافة للطاولة (1 لتر)', sub: 'يكفي 3 – 4 أكواب', yer: 1500, sar: 11, usd: 2.93, cal: 180 },
    ],
    coffee: [
      { id: 'std', label: 'كوب قياسي (240 مل)', sub: 'دبل شوت إسبريسو', yer: 0, sar: 0, usd: 0, cal: 0 },
      { id: 'lrg', label: 'كوب كبير (360 مل)', sub: 'مع رغوة حليب إضافية', yer: 400, sar: 3, usd: 0.80, cal: 55 },
    ],
  };

  const PREP_TEMPLATES = {
    grill: [
      { id: 'classic', label: 'شواء الديوان المتوازن', sub: 'عصارة كاملة على الجمر' },
      { id: 'charred', label: 'تحمير إضافي (Well-Done)', sub: 'نكهة فحم مدخنة قوية' },
      { id: 'spicy', label: 'تتبيلة حارة (Spicy)', sub: 'فلفل عدني وبهار مشوي' },
      { id: 'mild', label: 'بهار خفيف بدون شطة', sub: 'مناسب للأطفال والضيوف' },
    ],
    pizza: [
      { id: 'neapolitan', label: 'خبز نابولي طري ومقرمش', sub: 'حرارة فرن الحطب القياسية' },
      { id: 'crispy', label: 'عجينة رقيقة مقرمشة (Thin)', sub: 'تحمير إضافي للأطراف' },
      { id: 'stuffed', label: 'أطراف غنية بالأعشاب والجبن', sub: 'دهن زيت زيتون وثوم' },
    ],
    salad: [
      { id: 'mixed', label: 'خلط الصلصة مع الطبق', sub: 'جاهز للتقديم فوراً' },
      { id: 'side', label: 'تقديم الصلصة جانباً', sub: 'لتحكم الضيف بالسعرات' },
      { id: 'no-onion', label: 'بدون بصل أو ثوم', sub: 'تحضير خاص لطيف' },
    ],
    'cold-drink': [
      { id: 'no-sugar', label: 'طبيعي 100% بدون سكر', sub: 'الخيار الصحي الموصى به' },
      { id: 'light-ice', label: 'ثلج خفيف جداً', sub: 'تركيز فاكهة أعلى' },
      { id: 'extra-mint', label: 'نعناع وليمون مضاعف', sub: 'انتعاش حمضي أقوى' },
    ],
    smoothie: [
      { id: 'classic-bowl', label: 'قوام كثيف تقليدي', sub: 'مع بذور الشيا والرمان' },
      { id: 'honey-touch', label: 'تحلية خفيفة بعسل السدر', sub: 'بدون سكر مكرر' },
    ],
    coffee: [
      { id: 'whole-milk', label: 'حليب طازج كامل الدسم', sub: 'رغوة كريمية متماسكة' },
      { id: 'oat-milk', label: 'حليب شوفان نباتي', sub: 'مذاق مخملي خفيف' },
      { id: 'extra-hot', label: 'حرارة تقديم عالية (Extra Hot)', sub: 'للاستمتاع الطويل' },
    ],
  };

  const ADDON_TEMPLATES = {
    grill: [
      { id: 'toum', label: 'ثومية الديوان الكريمية', yer: 250, sar: 2, usd: 0.53, cal: 85 },
      { id: 'tanoor', label: 'خبز تنور حار إضافي', yer: 300, sar: 2.5, usd: 0.67, cal: 140 },
      { id: 'sahawiq', label: 'سحاوق بالجبن والطماطم', yer: 350, sar: 3, usd: 0.80, cal: 70 },
      { id: 'grilled-veg', label: 'طبق خضار مشوية على الفحم', yer: 500, sar: 4, usd: 1.07, cal: 95 },
    ],
    pizza: [
      { id: 'extra-mozz', label: 'جبنة موزاريلا إيطالية مضاعفة', yer: 550, sar: 4, usd: 1.07, cal: 130 },
      { id: 'truffle-oil', label: 'رشة زيت كمأة وأوريجانو', yer: 450, sar: 3.5, usd: 0.93, cal: 60 },
      { id: 'olives-jalapeno', label: 'زيتون أسود وفلفل هالبينو', yer: 300, sar: 2.5, usd: 0.67, cal: 45 },
      { id: 'garlic-dip', label: 'صوص ثوم وأعشاب جانبي', yer: 250, sar: 2, usd: 0.53, cal: 80 },
    ],
    salad: [
      { id: 'avocado', label: 'شرائح أفوكادو طازجة', yer: 550, sar: 4, usd: 1.07, cal: 110 },
      { id: 'feta', label: 'مكعبات جبنة فيتا يونانية', yer: 450, sar: 3.5, usd: 0.93, cal: 90 },
      { id: 'grilled-chicken-strip', label: 'شرائح صدر دجاج مشوي', yer: 900, sar: 7, usd: 1.87, cal: 165 },
      { id: 'pomegranate', label: 'دبس رمان ومكسرات محمصة', yer: 350, sar: 3, usd: 0.80, cal: 75 },
    ],
    drink: [
      { id: 'chia', label: 'إضافة بذور الشيا العضوية', yer: 250, sar: 2, usd: 0.53, cal: 40 },
      { id: 'honey-side', label: 'ملعقة عسل طبيعي', yer: 350, sar: 3, usd: 0.80, cal: 60 },
      { id: 'fresh-mint-pack', label: 'أوراق نعناع وليمون إضافية', yer: 150, sar: 1, usd: 0.27, cal: 5 },
    ],
    coffee: [
      { id: 'extra-shot', label: 'شوت إسبريسو إضافي', yer: 450, sar: 3.5, usd: 0.93, cal: 10 },
      { id: 'caramel-vanilla', label: 'سيروب فانيليا أو كراميل', yer: 300, sar: 2.5, usd: 0.67, cal: 45 },
      { id: 'biscuit-side', label: 'قطعة بسكويت لوتس جانبية', yer: 250, sar: 2, usd: 0.53, cal: 75 },
    ],
  };

  const STANDARDS_DATA = [
    {
      title: 'تخصيص دقيق لكل طبق',
      desc: 'تحكم كامل بحجم الحصة ودرجة الشواء والصوصات الجانبية قبل وصول التذكرة إلى طاقم المطبخ.',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    },
    {
      title: 'شفافية السعرات والبدائل',
      desc: 'يظهر كل طبق مع إجمالي السعرات الحرارية وتحديث حي عند إضافة الإضافات أو تغيير حجم الحصة.',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    },
    {
      title: 'تقسيم الفاتورة بين الضيوف',
      desc: 'احسب نصيب كل فرد في الطاولة من 1 إلى 10 ضيوف بعملتك المفضلة وأرفق التقسيم في التذكرة.',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    },
  ];

  const FAQ_DATA = [
    {
      q: 'كيف يتم ربط الطلب برقم الطاولة أو الاستلام السفري؟',
      a: 'اختر وضع الخدمة من أعلى الصفحة ("صالة / طاولة" أو "استلام سفري") ثم حدد رقم الطاولة أو وقت الاستلام؛ يتم تضمين هذه البيانات تلقائياً في رأس التذكرة المرسلة للمطبخ عبر واتساب.',
    },
    {
      q: 'هل يمكنني طلب نفس الطبق بتخصيصين مختلفين لضيفين؟',
      a: 'نعم بالتأكيد. كل طبق تقوم بتخصيصه يظهر كبند مستقل داخل تذكرة الطلب بمواصفاته الدقيقة (مثل صحن مشاوي سبايسي مقابل صحن بدون بهارات حارة).',
    },
    {
      q: 'كيف يعمل مقسّم الفاتورة في تذكرة Pro؟',
      a: 'من داخل التذكرة الجانبية اختر عدد الضيوف من 1 إلى 10 أفراد، وسيقوم النظام فوراً بحساب نصيب الفرد الواحد بالعملة المختارة (ر.ي أو ر.س أو USD) مع خيار إرفاقه في رسالة واتساب.',
    },
    {
      q: 'هل الأسعار تشمل التبديل بين الريال اليمني والسعودي والدولار؟',
      a: 'نعم، جميع الأطباق والإضافات مسعّرة بدقة عبر العملات الثلاث YER و SAR و USD ويمكن التبديل بينها في أي لحظة دون فقدان محتويات التذكرة.',
    },
  ];

  // Build normalized items from data.js
  const ITEMS = RAW_ITEMS.map(item => {
    const meta = DIETARY_META[item.id] || {
      kcal: parseInt(item.calories, 10) || 350,
      prepTime: '12 – 15 دقيقة',
      filters: ['vegetarian'],
      badges: [],
      portionType: 'salad',
      prepType: 'salad',
      addonGroup: 'salad',
    };
    const imgPath = item.image.startsWith('assets/') ? `../${item.image}` : item.image;
    return {
      ...item,
      img: imgPath,
      priceUsd: Number((item.priceSar / 3.75).toFixed(2)),
      kcal: meta.kcal,
      prepTime: meta.prepTime,
      filters: meta.filters,
      badges: meta.badges,
      portions: PORTION_TEMPLATES[meta.portionType] || PORTION_TEMPLATES.salad,
      prepOptions: PREP_TEMPLATES[meta.prepType] || PREP_TEMPLATES.salad,
      addons: ADDON_TEMPLATES[meta.addonGroup] || ADDON_TEMPLATES.salad,
    };
  });

  const state = {
    currency: 'YER', // 'YER' | 'SAR' | 'USD'
    mode: 'dinein',  // 'dinein' | 'takeaway'
    branch: 'الصالة الرئيسية — شارع حدة',
    table: CONFIG.defaultTable || '4',
    takeawayBranch: 'فرع شارع حدة الرئيسي — كاونتر الاستلام',
    takeawayTime: 'استلام فوري (15-20 دقيقة)',
    takeawayPack: 'تغليف حراري حافظ للسخونة',
    category: 'all',
    dietary: 'all',
    search: '',
    splitGuests: 1,
    includeSplitInWa: true,
    cart: [], // [{ uid, itemId, qty, portionId, prepId, addonIds, note }]
    modal: {
      itemId: null,
      portionId: 'std',
      prepId: '',
      addonIds: [],
      qty: 1,
      note: '',
    },
  };

  let toastTimer = null;

  function showToast(msg) {
    const el = document.getElementById('pro-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function formatMoney(yer, sar, usd, curr = state.currency) {
    if (curr === 'SAR') {
      const val = Number.isInteger(sar) ? sar : Number(sar.toFixed(1));
      return `${val} ر.س`;
    }
    if (curr === 'USD') {
      return `$${usd.toFixed(2)}`;
    }
    return `${Math.round(yer).toLocaleString('en-US')} ر.ي`;
  }

  function formatDelta(opt) {
    if (opt.yer === 0 && opt.sar === 0) return 'ضمن السعر';
    return `+${formatMoney(opt.yer, opt.sar, opt.usd)}`;
  }

  function getItemById(id) {
    return ITEMS.find(i => i.id === id);
  }

  function computeLinePricing(line) {
    const item = getItemById(line.itemId);
    if (!item) return { unitYer: 0, unitSar: 0, unitUsd: 0, unitKcal: 0, portion: null, prep: null, addons: [] };

    const portion = item.portions.find(p => p.id === line.portionId) || item.portions[0];
    const prep = item.prepOptions.find(p => p.id === line.prepId) || item.prepOptions[0];
    const addons = (line.addonIds || [])
      .map(aid => item.addons.find(a => a.id === aid))
      .filter(Boolean);

    const unitYer = item.priceYer + (portion?.yer || 0) + addons.reduce((s, a) => s + a.yer, 0);
    const unitSar = item.priceSar + (portion?.sar || 0) + addons.reduce((s, a) => s + a.sar, 0);
    const unitUsd = item.priceUsd + (portion?.usd || 0) + addons.reduce((s, a) => s + a.usd, 0);
    const unitKcal = item.kcal + (portion?.cal || 0) + addons.reduce((s, a) => s + a.cal, 0);

    return { unitYer, unitSar, unitUsd, unitKcal, portion, prep, addons };
  }

  function getCartTotals() {
    return state.cart.reduce(
      (acc, line) => {
        const p = computeLinePricing(line);
        acc.qty += line.qty;
        acc.yer += p.unitYer * line.qty;
        acc.sar += p.unitSar * line.qty;
        acc.usd += p.unitUsd * line.qty;
        return acc;
      },
      { qty: 0, yer: 0, sar: 0, usd: 0 }
    );
  }

  function getFulfillmentSummaryText() {
    if (state.mode === 'dinein') {
      const tableLabel = state.table.startsWith('VIP') ? state.table : `طاولة رقم #${state.table}`;
      return `صالة / ${tableLabel} · ${state.branch}`;
    }
    return `استلام سفري · ${state.takeawayBranch} · ${state.takeawayTime}`;
  }

  function syncFulfillmentUI() {
    const summary = getFulfillmentSummaryText();
    const headerStatus = document.getElementById('header-table-status');
    const heroBadge = document.getElementById('hero-fulfillment-badge');
    const heroBranch = document.getElementById('hero-active-branch');
    const liveSummary = document.getElementById('fulfillment-live-summary');
    const drawerSummary = document.getElementById('drawer-mode-summary');
    const qrTable = document.getElementById('qr-placard-table');
    const qrBranch = document.getElementById('qr-placard-branch');

    if (headerStatus) {
      headerStatus.textContent = state.mode === 'dinein'
        ? (state.table.startsWith('VIP') ? state.table : `طاولة #${state.table}`)
        : 'استلام سفري';
    }
    if (heroBadge) heroBadge.textContent = `${summary} · جاهز لاستقبال الطلب`;
    if (heroBranch) heroBranch.textContent = state.mode === 'dinein' ? state.branch : state.takeawayBranch;
    if (liveSummary) liveSummary.textContent = `التوجيه النشط: ${summary}`;
    if (drawerSummary) drawerSummary.textContent = summary;
    if (qrTable) qrTable.textContent = state.table.startsWith('VIP') ? `جناح ${state.table}` : `طاولة رقم #${state.table}`;
    if (qrBranch) qrBranch.textContent = state.branch;
  }

  function renderCategories() {
    const wrap = document.getElementById('pro-cat-tabs');
    if (!wrap) return;
    wrap.innerHTML = RAW_CATEGORIES.map(c => `
      <button type="button" class="cat-pill ${c.id === state.category ? 'active' : ''}"
              data-cat="${c.id}" role="tab" aria-selected="${c.id === state.category}">
        ${c.label}
      </button>
    `).join('');
  }

  function renderMenu() {
    const grid = document.getElementById('pro-menu-grid');
    const countEl = document.getElementById('pro-menu-count');
    if (!grid) return;

    const q = state.search.trim().toLowerCase();
    const filtered = ITEMS.filter(item => {
      const matchCat = state.category === 'all' || item.cat === state.category;
      const matchDiet = state.dietary === 'all' || item.filters.includes(state.dietary);
      const matchText = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      return matchCat && matchDiet && matchText;
    });

    if (countEl) {
      countEl.textContent = filtered.length === 0
        ? 'لا توجد أطباق مطابقة للتصفية الحالية'
        : `يعرض ${filtered.length} من أصل ${ITEMS.length} أصناف`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-menu-state">لم يتم العثور على أصناف مطابقة — جرّب إزالة مرشّح السعرات أو البحث بكلمة أخرى.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const inTicketQty = state.cart
        .filter(line => line.itemId === item.id)
        .reduce((sum, line) => sum + line.qty, 0);

      const badgesHtml = item.badges.map(b => `<span class="diet-mini-badge">${b}</span>`).join('');
      const countPill = inTicketQty > 0 ? `<span class="dish-in-ticket-count">${inTicketQty} بالتذكرة</span>` : '';

      return `
        <article class="dish-card">
          <div class="dish-media">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            ${item.tag ? `<span class="dish-tag-badge">${item.tag}</span>` : ''}
          </div>
          <div class="dish-content">
            <div>
              <div class="dish-top-meta">
                <h3>${item.name}</h3>
                <span class="cal-pill">${item.calories}</span>
              </div>
              <p class="dish-desc">${item.desc}</p>
              <div class="dish-badges-row">${badgesHtml}</div>
            </div>
            <div class="dish-bottom">
              <div class="dish-price-box">
                <strong>${formatMoney(item.priceYer, item.priceSar, item.priceUsd)}</strong>
                <span>${item.prepTime}</span>
              </div>
              <div class="dish-card-actions">
                ${countPill}
                <button type="button" class="btn-customize" data-open-custom="${item.id}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
                    <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
                    <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
                  </svg>
                  <span>تخصيص وإضافة</span>
                </button>
                <button type="button" class="btn-quick-add" data-quick-add="${item.id}" aria-label="إضافة سريعة للطبق" title="إضافة سريعة بالمواصفات القياسية">+</button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderStandardsAndFaq() {
    const stdGrid = document.getElementById('pro-standards-grid');
    if (stdGrid) {
      stdGrid.innerHTML = STANDARDS_DATA.map(s => `
        <article class="standard-card">
          <div class="standard-icon">${s.icon}</div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </article>
      `).join('');
    }

    const faqList = document.getElementById('pro-faq-list');
    if (faqList) {
      faqList.innerHTML = FAQ_DATA.map((f, idx) => `
        <div class="faq-item ${idx === 0 ? 'open' : ''}">
          <button type="button" class="faq-trigger" aria-expanded="${idx === 0}">
            <span>${f.q}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div class="faq-answer">${f.a}</div>
        </div>
      `).join('');
    }
  }

  // ---- Dish Customization Modal ----
  function openCustomModal(itemId) {
    const item = getItemById(itemId);
    if (!item) return;

    state.modal = {
      itemId: item.id,
      portionId: item.portions[0].id,
      prepId: item.prepOptions[0].id,
      addonIds: [],
      qty: 1,
      note: '',
    };

    const imgEl = document.getElementById('custom-dish-img');
    const tagEl = document.getElementById('custom-dish-tag');
    const titleEl = document.getElementById('custom-dish-title');
    const descEl = document.getElementById('custom-dish-desc');
    const calEl = document.getElementById('custom-dish-base-cal');
    const noteInput = document.getElementById('custom-note-input');

    if (imgEl) {
      imgEl.src = item.img;
      imgEl.alt = item.name;
    }
    if (tagEl) tagEl.textContent = item.tag || 'اختيار الشيف';
    if (titleEl) titleEl.textContent = item.name;
    if (descEl) descEl.textContent = item.desc;
    if (calEl) calEl.textContent = `${item.calories} (قياسي)`;
    if (noteInput) noteInput.value = '';

    renderCustomModalOptions();
    document.getElementById('custom-backdrop')?.classList.add('open');
    document.getElementById('custom-modal')?.classList.add('open');
  }

  function closeCustomModal() {
    document.getElementById('custom-backdrop')?.classList.remove('open');
    document.getElementById('custom-modal')?.classList.remove('open');
  }

  function renderCustomModalOptions() {
    const item = getItemById(state.modal.itemId);
    if (!item) return;

    const portionWrap = document.getElementById('custom-portion-options');
    const prepWrap = document.getElementById('custom-prep-options');
    const addonsWrap = document.getElementById('custom-addons-options');

    if (portionWrap) {
      portionWrap.innerHTML = item.portions.map(p => `
        <button type="button" class="opt-card ${state.modal.portionId === p.id ? 'selected' : ''}" data-pick-portion="${p.id}">
          <div>
            <span class="opt-title">${p.label}</span>
            <span class="opt-sub">${p.sub}</span>
          </div>
          <span class="opt-delta">${formatDelta(p)}</span>
        </button>
      `).join('');
    }

    if (prepWrap) {
      prepWrap.innerHTML = item.prepOptions.map(pr => `
        <button type="button" class="opt-card ${state.modal.prepId === pr.id ? 'selected' : ''}" data-pick-prep="${pr.id}">
          <div>
            <span class="opt-title">${pr.label}</span>
            <span class="opt-sub">${pr.sub}</span>
          </div>
        </button>
      `).join('');
    }

    if (addonsWrap) {
      addonsWrap.innerHTML = item.addons.map(a => {
        const active = state.modal.addonIds.includes(a.id);
        return `
          <button type="button" class="addon-card ${active ? 'selected' : ''}" data-toggle-addon="${a.id}">
            <div>
              <span class="opt-title">${a.label}</span>
              <span class="opt-sub">+${a.cal} سعرة</span>
            </div>
            <span class="opt-delta">${formatDelta(a)}</span>
          </button>
        `;
      }).join('');
    }

    const qtyVal = document.getElementById('custom-qty-val');
    if (qtyVal) qtyVal.textContent = String(state.modal.qty);

    const p = computeLinePricing({
      itemId: state.modal.itemId,
      portionId: state.modal.portionId,
      prepId: state.modal.prepId,
      addonIds: state.modal.addonIds,
      qty: state.modal.qty,
    });

    const totalKcal = p.unitKcal * state.modal.qty;
    const calReadout = document.getElementById('custom-live-calories');
    const totalReadout = document.getElementById('custom-live-total');
    if (calReadout) calReadout.textContent = `${totalKcal.toLocaleString('en-US')} سعرة إجمالاً`;
    if (totalReadout) {
      totalReadout.textContent = formatMoney(
        p.unitYer * state.modal.qty,
        p.unitSar * state.modal.qty,
        p.unitUsd * state.modal.qty
      );
    }
  }

  function addConfiguredItemToCart(configObj) {
    const sortedAddons = [...(configObj.addonIds || [])].sort().join(',');
    const cleanNote = (configObj.note || '').trim();
    const uid = `${configObj.itemId}__${configObj.portionId}__${configObj.prepId}__${sortedAddons}__${cleanNote}`;

    const existing = state.cart.find(c => c.uid === uid);
    if (existing) {
      existing.qty += configObj.qty;
    } else {
      state.cart.push({
        uid,
        itemId: configObj.itemId,
        qty: configObj.qty,
        portionId: configObj.portionId,
        prepId: configObj.prepId,
        addonIds: [...(configObj.addonIds || [])],
        note: cleanNote,
      });
    }

    renderMenu();
    syncTicketUI();
  }

  // ---- Ticket Drawer & Bill Splitter ----
  function syncTicketUI() {
    const totals = getCartTotals();

    const headerBadge = document.getElementById('ticket-badge-count');
    const stickyBar = document.getElementById('pro-sticky-bar');
    const stickyCount = document.getElementById('sticky-ticket-count');
    const stickyTotal = document.getElementById('sticky-ticket-total');
    const stickySplit = document.getElementById('sticky-split-preview');

    if (headerBadge) headerBadge.textContent = String(totals.qty);
    if (stickyBar) stickyBar.classList.toggle('visible', totals.qty > 0);
    if (stickyCount) stickyCount.textContent = `${totals.qty} ${totals.qty === 1 ? 'صنف' : 'أصناف'} في التذكرة`;
    if (stickyTotal) stickyTotal.textContent = `الإجمالي: ${formatMoney(totals.yer, totals.sar, totals.usd)}`;

    const g = state.splitGuests;
    const perGuestStr = formatMoney(totals.yer / g, totals.sar / g, totals.usd / g);
    if (stickySplit) stickySplit.textContent = g > 1 ? `نصيب الفرد (${g}): ${perGuestStr}` : `لضيف واحد: ${perGuestStr}`;

    renderTicketItems(totals, perGuestStr);
  }

  function renderTicketItems(totals, perGuestStr) {
    const list = document.getElementById('ticket-items-list');
    const subEl = document.getElementById('ticket-subtotal-val');
    const grandEl = document.getElementById('ticket-grand-total-val');
    const secEl = document.getElementById('ticket-secondary-currency');
    const splitAmtEl = document.getElementById('split-per-guest-amount');
    const splitCountEl = document.getElementById('split-guest-count');

    if (splitCountEl) splitCountEl.textContent = String(state.splitGuests);
    if (splitAmtEl) splitAmtEl.textContent = perGuestStr;

    document.querySelectorAll('.split-preset-btn').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.guests) === state.splitGuests);
    });

    if (subEl) subEl.textContent = formatMoney(totals.yer, totals.sar, totals.usd);
    if (grandEl) grandEl.textContent = formatMoney(totals.yer, totals.sar, totals.usd);
    if (secEl) {
      const refs = [];
      if (state.currency !== 'YER') refs.push(formatMoney(totals.yer, totals.sar, totals.usd, 'YER'));
      if (state.currency !== 'SAR') refs.push(formatMoney(totals.yer, totals.sar, totals.usd, 'SAR'));
      if (state.currency !== 'USD') refs.push(formatMoney(totals.yer, totals.sar, totals.usd, 'USD'));
      secEl.textContent = `المعادل التقريبي: ${refs.join(' · ')}`;
    }

    if (!list) return;
    if (state.cart.length === 0) {
      list.innerHTML = `<div class="ticket-empty">التذكرة فارغة حالياً — اختر أي طبق واضغط "تخصيص وإضافة" لبناء طلبك.</div>`;
      return;
    }

    list.innerHTML = state.cart.map((line, idx) => {
      const item = getItemById(line.itemId);
      if (!item) return '';
      const p = computeLinePricing(line);
      const specParts = [p.portion?.label, p.prep?.label];
      if (p.addons.length) specParts.push(`إضافات: ${p.addons.map(a => a.label).join('، ')}`);
      if (line.note) specParts.push(`ملاحظة: ${line.note}`);

      return `
        <div class="ticket-line-card">
          <div class="ticket-line-top">
            <strong>${item.name}</strong>
            <button type="button" class="btn-remove-line" data-remove-idx="${idx}" aria-label="حذف الصنف">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
              </svg>
            </button>
          </div>
          <p class="ticket-line-specs">${specParts.filter(Boolean).join(' · ')} (${p.unitKcal} سعرة/وحدة)</p>
          <div class="ticket-line-bottom">
            <div class="qty-stepper">
              <button type="button" data-line-dec="${idx}" aria-label="إنقاص الكمية">-</button>
              <span>${line.qty}</span>
              <button type="button" data-line-inc="${idx}" aria-label="زيادة الكمية">+</button>
            </div>
            <span class="ticket-line-price">${formatMoney(p.unitYer * line.qty, p.unitSar * line.qty, p.unitUsd * line.qty)}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function buildWhatsAppTicketText() {
    const totals = getCartTotals();
    const guestName = document.getElementById('ticket-guest-name')?.value.trim();
    const generalNote = document.getElementById('ticket-general-note')?.value.trim();

    const lines = [
      `*تذكرة طلب — ${CONFIG.restaurantName}*`,
      `الفئة: الفئة الفاخرة Pro`,
      `الخدمة: ${getFulfillmentSummaryText()}`,
    ];

    if (state.mode === 'takeaway') {
      lines.push(`التغليف: ${state.takeawayPack}`);
    }
    if (guestName) lines.push(`الضيف الكريم: ${guestName}`);
    lines.push(`العملة المعتمدة: ${state.currency}`);
    lines.push('--- تفاصيل الأطباق المخصّصة ---');

    state.cart.forEach((line, i) => {
      const item = getItemById(line.itemId);
      if (!item) return;
      const p = computeLinePricing(line);
      const lineSub = formatMoney(p.unitYer * line.qty, p.unitSar * line.qty, p.unitUsd * line.qty);
      lines.push(`${i + 1}. ${item.name} × ${line.qty} = ${lineSub}`);
      lines.push(`   - الحجم: ${p.portion?.label || 'قياسي'} | التحضير: ${p.prep?.label || 'قياسي'}`);
      if (p.addons.length) lines.push(`   - الإضافات: ${p.addons.map(a => a.label).join('، ')}`);
      if (line.note) lines.push(`   - ملاحظة الطبق: ${line.note}`);
    });

    lines.push('---------------------------');
    lines.push(`*الإجمالي النهائي:* ${formatMoney(totals.yer, totals.sar, totals.usd)}`);
    if (state.currency !== 'YER') lines.push(`المعادل بالريال اليمني: ${formatMoney(totals.yer, totals.sar, totals.usd, 'YER')}`);

    if (state.includeSplitInWa && state.splitGuests > 1) {
      const g = state.splitGuests;
      const perGuest = formatMoney(totals.yer / g, totals.sar / g, totals.usd / g);
      lines.push(`تقسيم الفاتورة: ${g} ضيوف | نصيب الضيف الواحد: ${perGuest}`);
    }

    if (generalNote) lines.push(`ملاحظات عامة: ${generalNote}`);
    return lines.join('\n');
  }

  function openTicketDrawer() {
    syncTicketUI();
    document.getElementById('ticket-backdrop')?.classList.add('open');
    document.getElementById('ticket-drawer')?.classList.add('open');
  }

  function closeTicketDrawer() {
    document.getElementById('ticket-backdrop')?.classList.remove('open');
    document.getElementById('ticket-drawer')?.classList.remove('open');
  }

  function openQrModal() {
    syncFulfillmentUI();
    document.getElementById('qr-backdrop')?.classList.add('open');
    document.getElementById('qr-modal')?.classList.add('open');
  }

  function closeQrModal() {
    document.getElementById('qr-backdrop')?.classList.remove('open');
    document.getElementById('qr-modal')?.classList.remove('open');
  }

  function openMobileNav() {
    document.getElementById('mobile-nav-backdrop')?.classList.add('open');
    document.getElementById('mobile-nav-drawer')?.classList.add('open');
  }

  function closeMobileNav() {
    document.getElementById('mobile-nav-backdrop')?.classList.remove('open');
    document.getElementById('mobile-nav-drawer')?.classList.remove('open');
  }

  function bindEvents() {
    // Currency switcher
    document.getElementById('currency-switcher')?.addEventListener('click', e => {
      const btn = e.target.closest('.curr-btn');
      if (!btn) return;
      document.querySelectorAll('.curr-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currency = btn.dataset.curr;
      renderMenu();
      renderCustomModalOptions();
      syncTicketUI();
    });

    // Fulfillment mode switch
    document.querySelectorAll('.mode-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-tab').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        state.mode = btn.dataset.mode;

        const isDinein = state.mode === 'dinein';
        document.getElementById('dinein-controls')?.classList.toggle('hidden', !isDinein);
        document.getElementById('takeaway-controls')?.classList.toggle('hidden', isDinein);
        syncFulfillmentUI();
      });
    });

    document.getElementById('pro-branch-select')?.addEventListener('change', e => {
      state.branch = e.target.value;
      syncFulfillmentUI();
    });
    document.getElementById('pro-table-select')?.addEventListener('change', e => {
      state.table = e.target.value;
      syncFulfillmentUI();
    });
    document.getElementById('takeaway-branch-select')?.addEventListener('change', e => {
      state.takeawayBranch = e.target.value;
      syncFulfillmentUI();
    });
    document.getElementById('takeaway-time-select')?.addEventListener('change', e => {
      state.takeawayTime = e.target.value;
      syncFulfillmentUI();
    });
    document.getElementById('takeaway-pack-select')?.addEventListener('change', e => {
      state.takeawayPack = e.target.value;
    });

    // Search & Filters
    document.getElementById('pro-menu-search')?.addEventListener('input', e => {
      state.search = e.target.value;
      renderMenu();
    });

    document.getElementById('pro-cat-tabs')?.addEventListener('click', e => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      state.category = btn.dataset.cat;
      renderCategories();
      renderMenu();
    });

    document.getElementById('dietary-filter-bar')?.addEventListener('click', e => {
      const btn = e.target.closest('.diet-pill');
      if (!btn) return;
      document.querySelectorAll('.diet-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.dietary = btn.dataset.diet;
      renderMenu();
    });

    // Menu grid actions
    document.getElementById('pro-menu-grid')?.addEventListener('click', e => {
      const customBtn = e.target.closest('[data-open-custom]');
      if (customBtn) {
        openCustomModal(customBtn.dataset.openCustom);
        return;
      }
      const quickBtn = e.target.closest('[data-quick-add]');
      if (quickBtn) {
        const item = getItemById(quickBtn.dataset.quickAdd);
        if (!item) return;
        addConfiguredItemToCart({
          itemId: item.id,
          portionId: item.portions[0].id,
          prepId: item.prepOptions[0].id,
          addonIds: [],
          qty: 1,
          note: '',
        });
        showToast(`تمت إضافة "${item.name}" إلى التذكرة`);
      }
    });

    // Customization modal interactions
    document.getElementById('custom-portion-options')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-pick-portion]');
      if (!btn) return;
      state.modal.portionId = btn.dataset.pickPortion;
      renderCustomModalOptions();
    });

    document.getElementById('custom-prep-options')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-pick-prep]');
      if (!btn) return;
      state.modal.prepId = btn.dataset.pickPrep;
      renderCustomModalOptions();
    });

    document.getElementById('custom-addons-options')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-toggle-addon]');
      if (!btn) return;
      const aid = btn.dataset.toggleAddon;
      if (state.modal.addonIds.includes(aid)) {
        state.modal.addonIds = state.modal.addonIds.filter(id => id !== aid);
      } else {
        state.modal.addonIds.push(aid);
      }
      renderCustomModalOptions();
    });

    document.getElementById('custom-qty-dec')?.addEventListener('click', () => {
      state.modal.qty = Math.max(1, state.modal.qty - 1);
      renderCustomModalOptions();
    });
    document.getElementById('custom-qty-inc')?.addEventListener('click', () => {
      state.modal.qty = Math.min(20, state.modal.qty + 1);
      renderCustomModalOptions();
    });

    document.getElementById('btn-confirm-custom')?.addEventListener('click', () => {
      if (!state.modal.itemId) return;
      const item = getItemById(state.modal.itemId);
      state.modal.note = document.getElementById('custom-note-input')?.value || '';
      addConfiguredItemToCart(state.modal);
      closeCustomModal();
      if (item) showToast(`تمت إضافة "${item.name}" بالتخصيص المختار`);
    });

    document.getElementById('btn-close-custom')?.addEventListener('click', closeCustomModal);
    document.getElementById('custom-backdrop')?.addEventListener('click', closeCustomModal);

    // Ticket drawer & item controls
    document.getElementById('btn-open-ticket')?.addEventListener('click', openTicketDrawer);
    document.getElementById('btn-sticky-open-ticket')?.addEventListener('click', openTicketDrawer);
    document.getElementById('btn-close-ticket')?.addEventListener('click', closeTicketDrawer);
    document.getElementById('ticket-backdrop')?.addEventListener('click', closeTicketDrawer);

    document.getElementById('btn-edit-fulfillment')?.addEventListener('click', () => {
      closeTicketDrawer();
      document.getElementById('table-qr-panel')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('ticket-items-list')?.addEventListener('click', e => {
      const incBtn = e.target.closest('[data-line-inc]');
      if (incBtn) {
        const idx = Number(incBtn.dataset.lineInc);
        if (state.cart[idx]) state.cart[idx].qty += 1;
        renderMenu();
        syncTicketUI();
        return;
      }
      const decBtn = e.target.closest('[data-line-dec]');
      if (decBtn) {
        const idx = Number(decBtn.dataset.lineDec);
        if (state.cart[idx]) {
          state.cart[idx].qty -= 1;
          if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
        }
        renderMenu();
        syncTicketUI();
        return;
      }
      const rmBtn = e.target.closest('[data-remove-idx]');
      if (rmBtn) {
        const idx = Number(rmBtn.dataset.removeIdx);
        state.cart.splice(idx, 1);
        renderMenu();
        syncTicketUI();
      }
    });

    // Bill Splitter (1-10 Guests)
    document.getElementById('split-guest-dec')?.addEventListener('click', () => {
      state.splitGuests = Math.max(1, state.splitGuests - 1);
      syncTicketUI();
    });
    document.getElementById('split-guest-inc')?.addEventListener('click', () => {
      state.splitGuests = Math.min(10, state.splitGuests + 1);
      syncTicketUI();
    });
    document.querySelectorAll('.split-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.splitGuests = Math.min(10, Math.max(1, Number(btn.dataset.guests) || 1));
        syncTicketUI();
      });
    });
    document.getElementById('split-include-toggle')?.addEventListener('change', e => {
      state.includeSplitInWa = e.target.checked;
    });

    // Copy & WhatsApp Dispatch
    document.getElementById('btn-copy-ticket')?.addEventListener('click', async () => {
      if (state.cart.length === 0) {
        showToast('أضف صنفاً واحداً على الأقل قبل نسخ التذكرة');
        return;
      }
      const text = buildWhatsAppTicketText();
      try {
        await navigator.clipboard.writeText(text);
        showToast('تم نسخ نص التذكرة بالكامل');
      } catch {
        showToast('تعذر النسخ التلقائي — استخدم زر الإرسال عبر واتساب');
      }
    });

    document.getElementById('btn-send-wa-pro')?.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('التذكرة فارغة — اختر الأطباق أولاً');
        return;
      }
      const text = buildWhatsAppTicketText();
      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');
    });

    // QR Modal
    document.getElementById('btn-open-qr')?.addEventListener('click', openQrModal);
    document.getElementById('btn-preview-table-qr')?.addEventListener('click', openQrModal);
    document.getElementById('btn-close-qr')?.addEventListener('click', closeQrModal);
    document.getElementById('qr-backdrop')?.addEventListener('click', closeQrModal);
    document.getElementById('btn-print-qr')?.addEventListener('click', () => window.print());

    // Mobile Nav
    document.getElementById('open-mobile-nav')?.addEventListener('click', openMobileNav);
    document.getElementById('close-mobile-nav')?.addEventListener('click', closeMobileNav);
    document.getElementById('mobile-nav-backdrop')?.addEventListener('click', closeMobileNav);
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // FAQ Accordion
    document.getElementById('pro-faq-list')?.addEventListener('click', e => {
      const btn = e.target.closest('.faq-trigger');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const hoursEl = document.getElementById('topbar-hours');
    if (hoursEl) hoursEl.textContent = `${CONFIG.hours} · ${CONFIG.location}`;

    const brandEl = document.getElementById('brand-name-display');
    if (brandEl) brandEl.textContent = CONFIG.restaurantName;

    renderCategories();
    renderMenu();
    renderStandardsAndFaq();
    syncFulfillmentUI();
    syncTicketUI();
    bindEvents();
  });
})();
