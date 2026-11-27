/* =========================================================
   app.js — دار السدر (الفئة الملكية VIP)
   ========================================================= */
'use strict';

const VIP_CONFIG = {
  whatsappNumber: '967782259937',
  storeName: 'دار السدر',
  tierLabel: 'الفئة الملكية VIP',
};

const VIP_CURRENCIES = {
  SAR: { code: 'SAR', label: 'ر.س', rate: 1, decimals: 0 },
  AED: { code: 'AED', label: 'د.إ', rate: 0.98, decimals: 0 },
  KWD: { code: 'KWD', label: 'د.ك', rate: 0.082, decimals: 2 },
  USD: { code: 'USD', label: '$', rate: 0.266, decimals: 0 },
};

const GCC_ROUTES = {
  SA: {
    country: 'المملكة العربية السعودية',
    hubs: 'المكلا — الرياض / جدة',
    eta: '2 - 3 أيام عمل (VIP Priority)',
    feeSAR: 65,
    freeOverSAR: 1200,
    steps: [
      { title: 'ختم الخزنة المرقّم', desc: 'تشميع حراري للعبوة وإرفاق شهادة الدفعة الأصلية.' },
      { title: 'شحن جوي مبرد', desc: 'حفظ درجة الحرارة بين 18-22 مئوية عبر الشحن الجوي.' },
      { title: 'تخليص جمركي سريع', desc: 'اعتماد فوري عبر مسار الأولوية للشحنات الغذائية الفاخرة.' },
      { title: 'تسليم خاص لباب المقر', desc: 'توصيل مباشر مع إشعار مسبق للمستلم في الرياض وجدة والدمام.' },
    ],
  },
  AE: {
    country: 'الإمارات العربية المتحدة',
    hubs: 'المكلا — دبي / أبوظبي',
    eta: '2 - 4 أيام عمل (VIP Priority)',
    feeSAR: 75,
    freeOverSAR: 1400,
    steps: [
      { title: 'تجهيز الخزنة', desc: 'تغليف مزدوج مضاد للصدمات مع بطاقة الخط العربي.' },
      { title: 'شحن جوي مباشر', desc: 'رحلة شحن مخصصة إلى مطار دبي الدولي.' },
      { title: 'تخليص كبار الشخصيات', desc: 'مراجعة وإفراج جمركي سريع دون تأخير.' },
      { title: 'تسليم كونسيرج', desc: 'مندوب خاص لتسليم الطلب في دبي وأبوظبي والشارقة.' },
    ],
  },
  KW: {
    country: 'دولة الكويت',
    hubs: 'المكلا — مدينة الكويت',
    eta: '3 - 4 أيام عمل (VIP Priority)',
    feeSAR: 85,
    freeOverSAR: 1500,
    steps: [
      { title: 'توثيق الدفعة', desc: 'إصدار ملف الأصالة الرقمي والورقي للعبوة.' },
      { title: 'عبور جوي مبرد', desc: 'صناديق معزولة حرارياً لحماية الإنزيمات النشطة.' },
      { title: 'تخليص مطار الكويت', desc: 'تخليص مسرّع للشحنات الخاصة والهدايا الرسمية.' },
      { title: 'توصيل منزلي أو مكتبي', desc: 'تسليم مجدول حسب رغبة العميل في كافة المحافظات.' },
    ],
  },
  QA: {
    country: 'دولة قطر',
    hubs: 'المكلا — الدوحة',
    eta: '3 - 4 أيام عمل (VIP Priority)',
    feeSAR: 85,
    freeOverSAR: 1500,
    steps: [
      { title: 'الاعتماد المخبري', desc: 'إرفاق شهادة الفحص المصدّقة مع الشحنة.' },
      { title: 'نقل جوي مبرد', desc: 'مراقبة حرارية مستمرة طوال مسار الرحلة.' },
      { title: 'تخليص الدوحة السريع', desc: 'معالجة أولوية لشحنات دار السدر الملكية.' },
      { title: 'تسليم شخصي بالدوحة', desc: 'تسليم يدوي مع توقيع الاستلام.' },
    ],
  },
  BH: {
    country: 'مملكة البحرين',
    hubs: 'المكلا — المنامة',
    eta: '3 - 4 أيام عمل (VIP Priority)',
    feeSAR: 75,
    freeOverSAR: 1400,
    steps: [
      { title: 'تحضير الصندوق الملكي', desc: 'فحص نهائي لختم الشمع والبطاقة الذهبية.' },
      { title: 'مسار شحن جوي', desc: 'وصول سريع إلى مطار البحرين الدولي.' },
      { title: 'تخليص فوري', desc: 'إتمام الإجراءات الجمركية إلكترونياً قبل الهبوط.' },
      { title: 'توصيل للمنامة والمحرق', desc: 'توصيل خاص خلال ساعات من التخليص.' },
    ],
  },
  OM: {
    country: 'سلطنة عُمان',
    hubs: 'المكلا — مسقط / صلالة',
    eta: '2 - 4 أيام عمل (VIP Priority)',
    feeSAR: 70,
    freeOverSAR: 1300,
    steps: [
      { title: 'تعبئة الخزنة', desc: 'ختم دفعة الجني وإرفاق بطاقة الضمان الذهبي.' },
      { title: 'شحن إقليمي مباشر', desc: 'مسار بري وجوي مبرد بأعلى معايير الأمان.' },
      { title: 'تخليص حدودي سريع', desc: 'بيان شحن مكتمل لتفادي أي انتظار.' },
      { title: 'تسليم في مسقط وصلالة', desc: 'توصيل مباشر مع تنسيق مسبق.' },
    ],
  },
};

const VIP_DATA = {
  stats: [
    { value: '+5,000', label: 'طلب موصّل' },
    { value: '12', label: 'نوع عسل أصيل' },
    { value: '6', label: 'دول خليجية' },
    { value: '100%', label: 'طبيعي خالص' },
  ],

  features: [
    {
      icon: 'leaf',
      title: '100% طبيعي وخالص',
      desc: 'لا إضافات، لا تسخين، لا ماء. نضمن نقاء المنتج بشهادات مختبرية معتمدة.',
    },
    {
      icon: 'ship',
      title: 'شحن لدول الخليج',
      desc: 'نشحن إلى السعودية، الإمارات، الكويت، قطر، البحرين، عُمان خلال 3-7 أيام.',
    },
    {
      icon: 'gift',
      title: 'تغليف هدايا فاخر',
      desc: 'تغليف راقٍ مناسب للمناسبات والأعياد. مع رسالة شكر مخصصة حسب طلبك.',
    },
  ],

  products: [
    {
      id: 'sidr-hadhramaut',
      tag: 'الأعلى مبيعاً',
      allocation: 'متبقي 18 عبوة',
      batchCode: 'HAD-2026-089',
      name: 'عسل السدر الحضرمي',
      origin: 'وادي حضرموت — اليمن',
      image: '../assets/images/hero.jpg',
      imgPos: 'center center',
      desc: 'عسل سدر بكر من أشجار السدر البرية في وادي حضرموت. طعم كريمي وأرومة لا تُضاهى.',
      variants: [
        { label: '250 جم', priceSAR: 195 },
        { label: '500 جم', priceSAR: 370 },
        { label: '1 كجم', priceSAR: 690 },
      ],
    },
    {
      id: 'sidr-do-ani',
      tag: 'قطفة ملكية نادرة',
      allocation: 'متبقي 11 عبوة',
      batchCode: 'DOA-2026-014',
      name: 'عسل سدر دوعني',
      origin: 'وادي دوعن — حضرموت',
      image: '../assets/images/hero.jpg',
      imgPos: 'center 25%',
      desc: 'من أجود أنواع العسل اليمني عالمياً. يُجنى مرة واحدة في السنة من أزهار السدر.',
      variants: [
        { label: '250 جم', priceSAR: 260 },
        { label: '500 جم', priceSAR: 490 },
        { label: '1 كجم', priceSAR: 940 },
      ],
    },
    {
      id: 'sidr-highlands',
      tag: 'إصدار جبلي',
      allocation: 'متبقي 22 عبوة',
      batchCode: 'SUM-2026-031',
      name: 'عسل السمرة الجبلي',
      origin: 'المرتفعات اليمنية',
      image: '../assets/images/hero.jpg',
      imgPos: 'center 75%',
      desc: 'عسل بري من أزهار الغاب والسمرة الجبلية. داكن اللون، قوي الطعم، غني بالمضادات.',
      variants: [
        { label: '250 جم', priceSAR: 145 },
        { label: '500 جم', priceSAR: 275 },
      ],
    },
    {
      id: 'coffee-green',
      tag: 'حصاد تعز وإب',
      allocation: 'محصول طازج',
      batchCode: 'DOA-2026-014',
      name: 'بن يمني أخضر',
      origin: 'تعز وإب — اليمن',
      image: '../assets/images/coffee.jpg',
      imgPos: 'center center',
      desc: 'بن أرابيكا يمني خام غير محمّص. اختر درجة التحميص المناسبة لك.',
      variants: [
        { label: '250 جم', priceSAR: 65 },
        { label: '500 جم', priceSAR: 120 },
        { label: '1 كجم', priceSAR: 225 },
      ],
    },
    {
      id: 'coffee-roasted',
      tag: 'جديد',
      allocation: 'تحميص على الحجر',
      batchCode: 'HAD-2026-089',
      name: 'بن يمني محمّص (بن الجبل)',
      origin: 'تعز وريمة — اليمن',
      image: '../assets/images/coffee.jpg',
      imgPos: 'center 25%',
      desc: 'محمّص على الحجر التقليدي بنكهة موكا يمنية أصيلة. مطحون حسب الطلب.',
      variants: [
        { label: '250 جم', priceSAR: 80 },
        { label: '500 جم', priceSAR: 150 },
      ],
    },
    {
      id: 'gift-box',
      tag: 'هدية مميزة',
      allocation: 'تجهيز كبار الشخصيات',
      batchCode: 'DOA-2026-014',
      name: 'صندوق الهدية الملكية',
      origin: 'تشكيلة مختارة',
      image: '../assets/images/hero.jpg',
      imgPos: 'left center',
      desc: 'صندوق فاخر يتضمن عسل سدر + بن يمني + قهوة حضرمية مع تغليف هدية راقٍ.',
      variants: [
        { label: 'صغير', priceSAR: 340 },
        { label: 'متوسط', priceSAR: 580 },
        { label: 'كبير', priceSAR: 890 },
      ],
    },
  ],

  batches: {
    'DOA-2026-014': {
      code: 'DOA-2026-014',
      productName: 'عسل سدر دوعني — قطفة الخريف الملكية',
      origin: 'شعب دوعن الأيمن — حضرموت (ارتفاع 1,150م)',
      harvestMaster: 'مناحل آل باحشوان التراثية',
      labRef: 'ISO-17025 / GSO-147',
      metrics: [
        { label: 'إنزيم الدياستاز (Diastase)', val: '24.6 DN' },
        { label: 'نسبة الرطوبة (Moisture)', val: '15.2%' },
        { label: 'نسبة HMF', val: '4.1 mg/kg' },
        { label: 'لقاح السدر (Ziziphus)', val: '88.4%' },
        { label: 'التوصيل الكهربائي', val: '0.68 mS/cm' },
        { label: 'السكروز المتبقي', val: '0.9%' },
      ],
      verdict: 'نقاء مطلق — خالٍ تماماً من التغذية السكرية أو المعالجة الحرارية.',
    },
    'HAD-2026-089': {
      code: 'HAD-2026-089',
      productName: 'عسل السدر الحضرمي البكر — إصدار الخزنة',
      origin: 'وادي حضرموت — جردان وعمد',
      harvestMaster: 'مناحل وادي حضرموت المعتمدة',
      labRef: 'ISO-17025 / GSO-147',
      metrics: [
        { label: 'إنزيم الدياستاز (Diastase)', val: '21.8 DN' },
        { label: 'نسبة الرطوبة (Moisture)', val: '15.8%' },
        { label: 'نسبة HMF', val: '5.3 mg/kg' },
        { label: 'لقاح السدر (Ziziphus)', val: '84.0%' },
        { label: 'التوصيل الكهربائي', val: '0.64 mS/cm' },
        { label: 'السكروز المتبقي', val: '1.1%' },
      ],
      verdict: 'مطابق لأعلى المعايير الخليجية والدولية للعسل الأحادي الزهرة.',
    },
    'SUM-2026-031': {
      code: 'SUM-2026-031',
      productName: 'عسل السمرة الجبلي البري',
      origin: 'المرتفعات الجبلية — اليمن',
      harvestMaster: 'مناحل المرتفعات البرية',
      labRef: 'ISO-17025 / GSO-147',
      metrics: [
        { label: 'إنزيم الدياستاز (Diastase)', val: '19.4 DN' },
        { label: 'نسبة الرطوبة (Moisture)', val: '16.1%' },
        { label: 'نسبة HMF', val: '6.0 mg/kg' },
        { label: 'لقاح السمرة والغاب', val: '79.5%' },
        { label: 'التوصيل الكهربائي', val: '0.79 mS/cm' },
        { label: 'السكروز المتبقي', val: '1.4%' },
      ],
      verdict: 'عسل جبلي داكن غني بمضادات الأكسدة والأنزيمات الحية.',
    },
  },

  configurator: {
    primary: [
      { id: 'doani-1kg', label: 'عسل سدر دوعني (1 كجم)', priceSAR: 940 },
      { id: 'doani-500', label: 'عسل سدر دوعني (500 جم)', priceSAR: 490 },
      { id: 'hadrami-1kg', label: 'عسل السدر الحضرمي (1 كجم)', priceSAR: 690 },
      { id: 'hadrami-500', label: 'عسل السدر الحضرمي (500 جم)', priceSAR: 370 },
    ],
    secondary: [
      { id: 'coffee-roast', label: 'بن يمني محمّص (بن الجبل 500 جم)', priceSAR: 150 },
      { id: 'coffee-green', label: 'بن يمني أخضر (500 جم)', priceSAR: 120 },
      { id: 'sumra-500', label: 'عسل السمرة الجبلي (500 جم)', priceSAR: 275 },
      { id: 'none', label: 'بدون إضافة ثانوية', priceSAR: 0 },
    ],
    vessels: [
      { id: 'cedar', label: 'صندوق خشب الأرز المحفور بختم ذهبي', priceSAR: 140 },
      { id: 'velvet', label: 'صندوق مخمل أسود ملكي مبطّن بالحرير', priceSAR: 95 },
    ],
  },

  faqs: [
    {
      q: 'كيف أعرف أن العسل أصيل وغير مغشوش؟',
      a: 'كل دفعة تُرفق بشهادة تحليل مختبري معتمدة. كما نوفر ضمان استرداد كامل إذا لم تكن راضياً عن المنتج.',
    },
    {
      q: 'هل تشحنون لجميع دول الخليج؟',
      a: 'نعم، نشحن إلى السعودية والإمارات والكويت وقطر والبحرين وعُمان والأردن. تكلفة الشحن تُحسب حسب الوزن والوجهة.',
    },
    {
      q: 'كم يستغرق الشحن الدولي؟',
      a: 'عادةً 3-7 أيام عمل لدول الخليج. يُرسل لك رقم تتبع فور شحن الطلب.',
    },
    {
      q: 'هل يمكن طلب تغليف هدية خاص؟',
      a: 'بالتأكيد، لدينا تغليف هدايا راقٍ بأحجام مختلفة. يمكنك تحديد مناسبتك (عرس، رمضان، هدية رجال أعمال) عند الطلب.',
    },
    {
      q: 'ما الفرق بين عسل السدر الدوعني والحضرمي؟',
      a: 'كلاهما عسل سدر يمني أصيل، لكن الدوعني يُجنى من وادي دوعن الشهير برطوبته وأشجاره الكثيفة وله طعم أكثر كثافة، بينما الحضرمي أخف نسبياً وأكثر انتشاراً.',
    },
  ],
};

const SVG = {
  leaf: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  ship: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  gift: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
  pin: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  seal: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  chevron: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
};

const vipState = {
  currency: 'SAR',
  selectedVariant: {},
  activeBatch: 'DOA-2026-014',
  activeGCC: 'SA',
  cfg: {
    primaryId: 'doani-1kg',
    secondaryId: 'coffee-roast',
    vesselId: 'cedar',
    recipient: '',
    occasion: 'إهداء ملكي خاص',
    dedication: 'مع أصدق الأمنيات بدوام الصحة والعزّ والبركة',
    qty: 1,
  },
  cart: [], // { type: 'product'|'bespoke', title, meta, unitSAR, qty }
};

VIP_DATA.products.forEach(p => {
  vipState.selectedVariant[p.id] = 0;
});

function fmtVIP(amountSAR) {
  const c = VIP_CURRENCIES[vipState.currency];
  const val = amountSAR * c.rate;
  const formatted = c.decimals > 0 ? val.toFixed(c.decimals) : Math.round(val).toLocaleString('en-US');
  return c.code === 'USD' ? `$${formatted}` : `${formatted} ${c.label}`;
}

function showVIPToast(msg) {
  const el = document.getElementById('vip-toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showVIPToast._t);
  showVIPToast._t = setTimeout(() => el.classList.remove('show'), 2700);
}

function renderVIPStatsAndFeatures() {
  const statsEl = document.getElementById('vip-stats-grid');
  if (statsEl) {
    statsEl.innerHTML = VIP_DATA.stats.map(s => `
      <div>
        <div class="v-stat-val">${s.value}</div>
        <div class="v-stat-lbl">${s.label}</div>
      </div>
    `).join('');
  }

  const featEl = document.getElementById('vip-feat-grid');
  if (featEl) {
    featEl.innerHTML = VIP_DATA.features.map(f => `
      <article class="v-pillar">
        <div class="v-pillar-icon">${SVG[f.icon] || ''}</div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </article>
    `).join('');
  }
}

function renderVIPProducts() {
  const grid = document.getElementById('vip-prod-grid');
  if (!grid) return;

  grid.innerHTML = VIP_DATA.products.map(p => {
    const vIdx = vipState.selectedVariant[p.id] || 0;
    const activeV = p.variants[vIdx];
    const sizesHTML = p.variants.map((v, idx) => `
      <button type="button" class="v-size-pill ${idx === vIdx ? 'active' : ''}" data-vip-prod="${p.id}" data-idx="${idx}">${v.label}</button>
    `).join('');

    return `
      <article class="vip-card">
        <div class="vip-card-media">
          <img src="${p.image}" alt="${p.name}" style="object-position:${p.imgPos};" loading="lazy">
          ${p.tag ? `<span class="vip-card-tag">${p.tag}</span>` : ''}
          <span class="vip-alloc-pill">${p.allocation}</span>
        </div>
        <div class="vip-card-body">
          <div class="vip-origin">${SVG.pin} <span>${p.origin}</span></div>
          <h3>${p.name}</h3>
          <p class="vip-desc">${p.desc}</p>
          <div class="vip-size-row">${sizesHTML}</div>
          <div class="vip-card-actions">
            <span class="vip-price">${fmtVIP(activeV.priceSAR)}</span>
            <div class="vip-btn-group">
              <button type="button" class="btn-inspect-batch" data-open-batch="${p.batchCode}">فحص الدفعة</button>
              <button type="button" class="btn-vip-add" data-vip-add="${p.id}">أضف للخزنة</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function buildDossierHTML(batch) {
  return `
    <div class="dossier-head">
      <div>
        <small>BATCH ID: ${batch.code} · ${batch.labRef}</small>
        <h3>${batch.productName}</h3>
      </div>
      <span class="dossier-verified">${SVG.seal} <span>معتمد مخبرياً</span></span>
    </div>
    <div class="dossier-grid">
      ${batch.metrics.map(m => `
        <div class="dossier-metric">
          <span>${m.label}</span>
          <strong>${m.val}</strong>
        </div>
      `).join('')}
    </div>
    <div class="dossier-meta-foot">
      <span>المصدر: ${batch.origin}</span>
      <span>المنحل: ${batch.harvestMaster}</span>
      <span>النتيجة: ${batch.verdict}</span>
    </div>
  `;
}

function renderBatchInspector() {
  const preview = document.getElementById('inspector-preview');
  if (!preview) return;
  const batch = VIP_DATA.batches[vipState.activeBatch] || VIP_DATA.batches['DOA-2026-014'];
  preview.innerHTML = buildDossierHTML(batch);

  document.querySelectorAll('.batch-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.batch === batch.code);
  });
}

function openBatchModal(batchCode) {
  const batch = VIP_DATA.batches[batchCode] || VIP_DATA.batches['DOA-2026-014'];
  const codeEl = document.getElementById('modal-batch-code');
  const titleEl = document.getElementById('modal-batch-title');
  const bodyEl = document.getElementById('modal-batch-body');

  if (codeEl) codeEl.textContent = `BATCH CERTIFICATE · ${batch.code}`;
  if (titleEl) titleEl.textContent = batch.productName;
  if (bodyEl) bodyEl.innerHTML = buildDossierHTML(batch);

  document.getElementById('batch-modal-backdrop')?.classList.add('open');
  document.getElementById('batch-modal')?.classList.add('open');
  document.getElementById('batch-modal')?.setAttribute('aria-hidden', 'false');
}

function closeBatchModal() {
  document.getElementById('batch-modal-backdrop')?.classList.remove('open');
  document.getElementById('batch-modal')?.classList.remove('open');
  document.getElementById('batch-modal')?.setAttribute('aria-hidden', 'true');
}

function getConfiguratorCalc() {
  const pItem = VIP_DATA.configurator.primary.find(x => x.id === vipState.cfg.primaryId);
  const sItem = VIP_DATA.configurator.secondary.find(x => x.id === vipState.cfg.secondaryId);
  const vItem = VIP_DATA.configurator.vessels.find(x => x.id === vipState.cfg.vesselId);

  const unitSAR = pItem.priceSAR + sItem.priceSAR + vItem.priceSAR;
  const qty = vipState.cfg.qty;
  const rawTotalSAR = unitSAR * qty;

  let discountRate = 0;
  if (qty >= 10) discountRate = 0.10;
  else if (qty >= 5) discountRate = 0.05;

  const discountSAR = rawTotalSAR * discountRate;
  const finalTotalSAR = rawTotalSAR - discountSAR;

  return { pItem, sItem, vItem, unitSAR, qty, discountRate, discountSAR, finalTotalSAR };
}

function renderConfigurator() {
  const pBox = document.getElementById('cfg-primary-options');
  const sBox = document.getElementById('cfg-secondary-options');
  const vBox = document.getElementById('cfg-vessel-options');

  if (pBox) {
    pBox.innerHTML = VIP_DATA.configurator.primary.map(opt => `
      <button type="button" class="cfg-option-card ${opt.id === vipState.cfg.primaryId ? 'active' : ''}" data-cfg-group="primary" data-cfg-id="${opt.id}">
        <strong>${opt.label}</strong>
        <span>${fmtVIP(opt.priceSAR)}</span>
      </button>
    `).join('');
  }

  if (sBox) {
    sBox.innerHTML = VIP_DATA.configurator.secondary.map(opt => `
      <button type="button" class="cfg-option-card ${opt.id === vipState.cfg.secondaryId ? 'active' : ''}" data-cfg-group="secondary" data-cfg-id="${opt.id}">
        <strong>${opt.label}</strong>
        <span>${opt.priceSAR === 0 ? 'مشمول / بدون إضافة' : `+ ${fmtVIP(opt.priceSAR)}`}</span>
      </button>
    `).join('');
  }

  if (vBox) {
    vBox.innerHTML = VIP_DATA.configurator.vessels.map(opt => `
      <button type="button" class="cfg-option-card ${opt.id === vipState.cfg.vesselId ? 'active' : ''}" data-cfg-group="vessel" data-cfg-id="${opt.id}">
        <strong>${opt.label}</strong>
        <span>+ ${fmtVIP(opt.priceSAR)}</span>
      </button>
    `).join('');
  }

  const calc = getConfiguratorCalc();

  document.getElementById('preview-occasion').textContent = vipState.cfg.occasion;
  document.getElementById('preview-recipient').textContent = vipState.cfg.recipient.trim()
    ? `إهداء إلى: ${vipState.cfg.recipient.trim()}`
    : 'إلى مقامكم الكريم';
  document.getElementById('preview-dedication').textContent = vipState.cfg.dedication.trim()
    || 'مع أصدق الأمنيات بدوام الصحة والعزّ والبركة';

  const specBox = document.getElementById('cfg-spec-breakdown');
  if (specBox) {
    specBox.innerHTML = `
      <div class="spec-line"><span>العبوة الأساسية</span><strong>${calc.pItem.label}</strong></div>
      <div class="spec-line"><span>الإضافة المرافقة</span><strong>${calc.sItem.label}</strong></div>
      <div class="spec-line"><span>الصندوق الفاخر</span><strong>${calc.vItem.label}</strong></div>
    `;
  }

  document.getElementById('cfg-qty-val').textContent = String(calc.qty);
  document.getElementById('cfg-qty-summary').textContent = String(calc.qty);
  document.getElementById('cfg-unit-price').textContent = fmtVIP(calc.unitSAR);

  const discRow = document.getElementById('cfg-discount-row');
  const discVal = document.getElementById('cfg-discount-val');
  if (discRow && discVal) {
    discRow.hidden = calc.discountRate === 0;
    discVal.textContent = `- ${fmtVIP(calc.discountSAR)} (${Math.round(calc.discountRate * 100)}%)`;
  }

  document.getElementById('tier-5-pill')?.classList.toggle('active', calc.qty >= 5 && calc.qty < 10);
  document.getElementById('tier-10-pill')?.classList.toggle('active', calc.qty >= 10);
  document.getElementById('cfg-total-price').textContent = fmtVIP(calc.finalTotalSAR);
}

function renderGCCTracker() {
  const board = document.getElementById('gcc-tracker-board');
  if (!board) return;
  const route = GCC_ROUTES[vipState.activeGCC] || GCC_ROUTES.SA;

  board.innerHTML = `
    <div class="tracker-summary-row">
      <div>
        <h3>${route.country} (${route.hubs})</h3>
      </div>
      <div class="tracker-badges">
        <span class="t-badge">مدة الوصول: ${route.eta}</span>
        <span class="t-badge">رسوم الشحن: ${fmtVIP(route.feeSAR)} (مجاني فوق ${fmtVIP(route.freeOverSAR)})</span>
      </div>
    </div>
    <div class="tracker-steps">
      ${route.steps.map((st, idx) => `
        <div class="t-step">
          <div class="t-step-num">STAGE 0${idx + 1}</div>
          <h4>${st.title}</h4>
          <p>${st.desc}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderVIPFAQ() {
  const list = document.getElementById('vip-faq-list');
  if (!list) return;
  list.innerHTML = VIP_DATA.faqs.map((f, i) => `
    <div class="v-faq-item ${i === 0 ? 'open' : ''}">
      <button type="button" class="v-faq-q" aria-expanded="${i === 0 ? 'true' : 'false'}">
        <span>${f.q}</span>
        ${SVG.chevron}
      </button>
      <div class="v-faq-a">${f.a}</div>
    </div>
  `).join('');
}

function renderVIPCart() {
  const container = document.getElementById('vip-cart-items');
  const countEl = document.getElementById('vip-cart-count');
  const subEl = document.getElementById('vip-sum-sub');
  const shipEl = document.getElementById('vip-sum-ship');
  const totalEl = document.getElementById('vip-sum-total');
  const checkoutBtn = document.getElementById('vip-checkout-wa');

  if (!container) return;

  const totalCount = vipState.cart.reduce((acc, item) => acc + item.qty, 0);
  if (countEl) countEl.textContent = String(totalCount);

  if (vipState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:2.5rem 1rem; color:var(--bronze);">
        <p>خزنة الطلبات فارغة حالياً.</p>
        <small>أضف مقتنيات من الخزنة أو صمّم صندوقك الملكي الخاص.</small>
      </div>
    `;
    if (subEl) subEl.textContent = fmtVIP(0);
    if (shipEl) shipEl.textContent = fmtVIP(0);
    if (totalEl) totalEl.textContent = fmtVIP(0);
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  let subSAR = 0;
  container.innerHTML = vipState.cart.map((item, idx) => {
    const lineSAR = item.unitSAR * item.qty;
    subSAR += lineSAR;
    return `
      <div class="v-cart-item">
        <div class="v-cart-item-top">
          <h4>${item.title}</h4>
          <strong style="color:var(--gold-champagne); font-family:var(--font-ui);">${fmtVIP(lineSAR)}</strong>
        </div>
        <div class="v-cart-meta">${item.meta}</div>
        <div class="v-cart-actions">
          <div class="vip-stepper" style="height:30px;">
            <button type="button" style="width:28px; height:28px;" data-vqty-delta="-1" data-vidx="${idx}">-</button>
            <span style="padding:0 0.65rem; font-size:0.84rem;">${item.qty}</span>
            <button type="button" style="width:28px; height:28px;" data-vqty-delta="1" data-vidx="${idx}">+</button>
          </div>
          <button type="button" class="v-remove-btn" data-vremove="${idx}">إزالة</button>
        </div>
      </div>
    `;
  }).join('');

  const countryCode = document.getElementById('vip-country-select')?.value || 'SA';
  const route = GCC_ROUTES[countryCode] || GCC_ROUTES.SA;
  const isFree = subSAR >= route.freeOverSAR;
  const shipSAR = isFree ? 0 : route.feeSAR;
  const totalSAR = subSAR + shipSAR;

  if (subEl) subEl.textContent = fmtVIP(subSAR);
  if (shipEl) shipEl.textContent = isFree ? 'مجاني (تأهل للشحن الملكي المجاني)' : fmtVIP(shipSAR);
  if (totalEl) totalEl.textContent = fmtVIP(totalSAR);
  if (checkoutBtn) checkoutBtn.disabled = false;
}

function openVIPCart() {
  document.getElementById('vip-drawer-backdrop')?.classList.add('open');
  document.getElementById('vip-cart-drawer')?.classList.add('open');
  document.getElementById('vip-cart-drawer')?.setAttribute('aria-hidden', 'false');
}

function closeVIPCart() {
  document.getElementById('vip-drawer-backdrop')?.classList.remove('open');
  document.getElementById('vip-cart-drawer')?.classList.remove('open');
  document.getElementById('vip-cart-drawer')?.setAttribute('aria-hidden', 'true');
}

function sendBespokeDirectToWhatsApp() {
  const calc = getConfiguratorCalc();
  const recipient = vipState.cfg.recipient.trim() || 'غير محدد';
  const dedication = vipState.cfg.dedication.trim() || 'بدون نص إضافي';
  const countryCode = document.getElementById('vip-country-select')?.value || vipState.activeGCC;
  const route = GCC_ROUTES[countryCode] || GCC_ROUTES.SA;

  const lines = [
    `طلب تصميم صندوق ملكي مخصص — ${VIP_CONFIG.storeName} (${VIP_CONFIG.tierLabel})`,
    `العملة المختارة: ${vipState.currency}`,
    `--- مواصفة الصندوق الملكي ---`,
    `العبوة الأساسية: ${calc.pItem.label}`,
    `الإضافة المرافقة: ${calc.sItem.label}`,
    `وعاء التقديم: ${calc.vItem.label}`,
    `المناسبة: ${vipState.cfg.occasion}`,
    `اسم المُهدى إليه: ${recipient}`,
    `نص الخط العربي الذهبي: ${dedication}`,
    `الكمية: ${calc.qty} صندوق`,
    calc.discountRate > 0 ? `خصم الشركات (${Math.round(calc.discountRate * 100)}%): -${fmtVIP(calc.discountSAR)}` : null,
    `الإجمالي النهائي للصناديق: ${fmtVIP(calc.finalTotalSAR)}`,
    `وجهة الشحن المفضلة: ${route.country} (${route.eta})`,
  ].filter(Boolean);

  window.open(`https://wa.me/${VIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
}

function submitVIPCartWhatsApp() {
  if (vipState.cart.length === 0) return;

  const countryCode = document.getElementById('vip-country-select')?.value || 'SA';
  const route = GCC_ROUTES[countryCode] || GCC_ROUTES.SA;
  const name = document.getElementById('vip-client-name')?.value.trim();
  const city = document.getElementById('vip-client-city')?.value.trim();
  const notes = document.getElementById('vip-client-notes')?.value.trim();

  let subSAR = 0;
  const itemsText = vipState.cart.map((item, i) => {
    const lineSAR = item.unitSAR * item.qty;
    subSAR += lineSAR;
    return `${i + 1}. ${item.title} (${item.meta}) × ${item.qty} = ${fmtVIP(lineSAR)}`;
  });

  const isFree = subSAR >= route.freeOverSAR;
  const shipSAR = isFree ? 0 : route.feeSAR;
  const totalSAR = subSAR + shipSAR;

  const lines = [
    `طلب خزنة ملكي جديد — ${VIP_CONFIG.storeName} (${VIP_CONFIG.tierLabel})`,
    `العملة: ${vipState.currency}`,
    `--- قائمة المقتنيات ---`,
    ...itemsText,
    `--- الشحن والكونسيرج ---`,
    `الوجهة: ${route.country}${city ? ` - ${city}` : ''} (${route.eta})`,
    `رسوم الشحن الجوي المبرد: ${isFree ? 'مجاني' : fmtVIP(shipSAR)}`,
    `الإجمالي النهائي: ${fmtVIP(totalSAR)}`,
    name ? `العميل / الجهة: ${name}` : null,
    notes ? `ملاحظات الكونسيرج: ${notes}` : null,
  ].filter(Boolean);

  window.open(`https://wa.me/${VIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
}

function bindVIPEvents() {
  window.addEventListener('scroll', () => {
    document.getElementById('vault-header')?.classList.toggle('scrolled', window.scrollY > 24);
  });

  // Currency Switcher
  document.getElementById('vip-currency-switcher')?.addEventListener('click', e => {
    const btn = e.target.closest('.v-curr-btn');
    if (!btn) return;
    vipState.currency = btn.dataset.curr;
    document.querySelectorAll('.v-curr-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderVIPProducts();
    renderConfigurator();
    renderGCCTracker();
    renderVIPCart();
  });

  // Products interactions
  document.getElementById('vip-prod-grid')?.addEventListener('click', e => {
    const sBtn = e.target.closest('.v-size-pill');
    if (sBtn) {
      vipState.selectedVariant[sBtn.dataset.vipProd] = Number(sBtn.dataset.idx);
      renderVIPProducts();
      return;
    }

    const bBtn = e.target.closest('[data-open-batch]');
    if (bBtn) {
      openBatchModal(bBtn.dataset.openBatch);
      return;
    }

    const addBtn = e.target.closest('[data-vip-add]');
    if (addBtn) {
      const prod = VIP_DATA.products.find(p => p.id === addBtn.dataset.vipAdd);
      const vIdx = vipState.selectedVariant[prod.id] || 0;
      const variant = prod.variants[vIdx];
      const meta = `${variant.label} · دفعة #${prod.batchCode}`;
      const existing = vipState.cart.find(c => c.type === 'product' && c.title === prod.name && c.meta === meta);
      if (existing) {
        existing.qty += 1;
      } else {
        vipState.cart.push({
          type: 'product',
          title: prod.name,
          meta,
          unitSAR: variant.priceSAR,
          qty: 1,
        });
      }
      renderVIPCart();
      openVIPCart();
      showVIPToast(`تم حجز ${prod.name} (${variant.label}) في خزنة الطلب`);
    }
  });

  // Batch Inspector
  document.getElementById('quick-batch-pills')?.addEventListener('click', e => {
    const pill = e.target.closest('.batch-pill');
    if (!pill) return;
    vipState.activeBatch = pill.dataset.batch;
    renderBatchInspector();
  });

  document.getElementById('batch-search-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const raw = document.getElementById('batch-code-input')?.value.trim().toUpperCase();
    if (!raw) return;
    if (VIP_DATA.batches[raw]) {
      vipState.activeBatch = raw;
      renderBatchInspector();
      openBatchModal(raw);
    } else {
      showVIPToast('رقم الدفعة غير موجود — جرّب DOA-2026-014 أو HAD-2026-089');
    }
  });

  document.getElementById('close-batch-modal')?.addEventListener('click', closeBatchModal);
  document.getElementById('batch-modal-backdrop')?.addEventListener('click', closeBatchModal);

  // Configurator Options
  document.getElementById('bespoke-configurator')?.addEventListener('click', e => {
    const card = e.target.closest('.cfg-option-card');
    if (!card) return;
    const grp = card.dataset.cfgGroup;
    const id = card.dataset.cfgId;
    if (grp === 'primary') vipState.cfg.primaryId = id;
    if (grp === 'secondary') vipState.cfg.secondaryId = id;
    if (grp === 'vessel') vipState.cfg.vesselId = id;
    renderConfigurator();
  });

  document.getElementById('cfg-recipient-name')?.addEventListener('input', e => {
    vipState.cfg.recipient = e.target.value;
    renderConfigurator();
  });

  document.getElementById('cfg-occasion')?.addEventListener('change', e => {
    vipState.cfg.occasion = e.target.value;
    renderConfigurator();
  });

  document.getElementById('cfg-dedication')?.addEventListener('input', e => {
    vipState.cfg.dedication = e.target.value;
    renderConfigurator();
  });

  document.getElementById('cfg-qty-minus')?.addEventListener('click', () => {
    if (vipState.cfg.qty > 1) {
      vipState.cfg.qty -= 1;
      renderConfigurator();
    }
  });

  document.getElementById('cfg-qty-plus')?.addEventListener('click', () => {
    vipState.cfg.qty += 1;
    renderConfigurator();
  });

  document.getElementById('cfg-add-to-cart-btn')?.addEventListener('click', () => {
    const calc = getConfiguratorCalc();
    const effectiveUnitSAR = calc.finalTotalSAR / calc.qty;
    const recipient = vipState.cfg.recipient.trim() || 'إهداء ملكي';
    vipState.cart.push({
      type: 'bespoke',
      title: `صندوق ملكي مخصص (${vipState.cfg.occasion})`,
      meta: `${calc.pItem.label} + ${calc.sItem.label} | ${calc.vItem.label} | إلى: ${recipient}`,
      unitSAR: effectiveUnitSAR,
      qty: calc.qty,
    });
    renderVIPCart();
    openVIPCart();
    showVIPToast('تمت إضافة الصندوق الملكي المخصص إلى خزنة الطلب');
  });

  document.getElementById('cfg-direct-wa-btn')?.addEventListener('click', sendBespokeDirectToWhatsApp);

  // GCC Tracker Tabs
  document.getElementById('gcc-country-tabs')?.addEventListener('click', e => {
    const tab = e.target.closest('.gcc-tab');
    if (!tab) return;
    vipState.activeGCC = tab.dataset.gcc;
    document.querySelectorAll('.gcc-tab').forEach(t => t.classList.toggle('active', t === tab));
    const sel = document.getElementById('vip-country-select');
    if (sel) sel.value = vipState.activeGCC;
    renderGCCTracker();
    renderVIPCart();
  });

  // FAQ Accordion
  document.getElementById('vip-faq-list')?.addEventListener('click', e => {
    const btn = e.target.closest('.v-faq-q');
    if (!btn) return;
    const item = btn.closest('.v-faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('#vip-faq-list .v-faq-item').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.v-faq-q')?.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // VIP Cart Drawer
  document.getElementById('open-vip-cart')?.addEventListener('click', openVIPCart);
  document.getElementById('close-vip-cart')?.addEventListener('click', closeVIPCart);
  document.getElementById('vip-drawer-backdrop')?.addEventListener('click', closeVIPCart);

  document.getElementById('vip-cart-items')?.addEventListener('click', e => {
    const qBtn = e.target.closest('[data-vqty-delta]');
    if (qBtn) {
      const idx = Number(qBtn.dataset.vidx);
      const delta = Number(qBtn.dataset.vqtyDelta);
      const item = vipState.cart[idx];
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) vipState.cart.splice(idx, 1);
      renderVIPCart();
      return;
    }

    const rBtn = e.target.closest('[data-vremove]');
    if (rBtn) {
      vipState.cart.splice(Number(rBtn.dataset.vremove), 1);
      renderVIPCart();
    }
  });

  document.getElementById('vip-country-select')?.addEventListener('change', () => {
    renderVIPCart();
  });

  document.getElementById('vip-checkout-wa')?.addEventListener('click', submitVIPCartWhatsApp);
}

document.addEventListener('DOMContentLoaded', () => {
  renderVIPStatsAndFeatures();
  renderVIPProducts();
  renderBatchInspector();
  renderConfigurator();
  renderGCCTracker();
  renderVIPFAQ();
  renderVIPCart();
  bindVIPEvents();
});
