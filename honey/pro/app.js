/* =========================================================
   app.js — دار السدر (الفئة الفاخرة Pro)
   ========================================================= */
'use strict';

const PRO_CONFIG = {
  whatsappNumber: '967782259937',
  storeName: 'دار السدر',
  tierLabel: 'الفئة الفاخرة Pro',
  giftWrapFeeSAR: 35,
};

const CURRENCIES = {
  SAR: { code: 'SAR', label: 'ر.س', rate: 1, decimals: 0 },
  AED: { code: 'AED', label: 'د.إ', rate: 0.98, decimals: 0 },
  KWD: { code: 'KWD', label: 'د.ك', rate: 0.082, decimals: 2 },
  USD: { code: 'USD', label: '$', rate: 0.266, decimals: 0 },
};

const GULF_SHIPPING = {
  SA: { name: 'المملكة العربية السعودية', feeSAR: 45, freeOverSAR: 650, eta: '3 - 4 أيام عمل' },
  AE: { name: 'الإمارات العربية المتحدة', feeSAR: 55, freeOverSAR: 750, eta: '3 - 5 أيام عمل' },
  KW: { name: 'دولة الكويت', feeSAR: 60, freeOverSAR: 800, eta: '4 - 5 أيام عمل' },
  QA: { name: 'دولة قطر', feeSAR: 60, freeOverSAR: 800, eta: '4 - 5 أيام عمل' },
  BH: { name: 'مملكة البحرين', feeSAR: 55, freeOverSAR: 750, eta: '4 - 6 أيام عمل' },
  OM: { name: 'سلطنة عُمان', feeSAR: 50, freeOverSAR: 700, eta: '3 - 5 أيام عمل' },
};

const PRO_DATA = {
  stats: [
    { value: '+5,000', label: 'طلب موصّل لدول الخليج' },
    { value: '12', label: 'نوع عسل يمني أصيل' },
    { value: '6', label: 'دول خليجية مشمولة بالشحن' },
    { value: '100%', label: 'طبيعي خالص موثق مخبرياً' },
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
      category: 'honey',
      tag: 'الأعلى مبيعاً',
      name: 'عسل السدر الحضرمي',
      origin: 'وادي حضرموت — اليمن',
      harvestBadge: 'HARVEST 2026',
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
      category: 'honey',
      tag: 'إصدار ملكي',
      name: 'عسل سدر دوعني',
      origin: 'وادي دوعن — حضرموت',
      harvestBadge: 'WADI DOAN',
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
      category: 'honey',
      tag: null,
      name: 'عسل السمرة الجبلي',
      origin: 'المرتفعات اليمنية',
      harvestBadge: 'HIGHLAND WILD',
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
      category: 'coffee',
      tag: null,
      name: 'بن يمني أخضر',
      origin: 'تعز وإب — اليمن',
      harvestBadge: 'RAW ARABICA',
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
      category: 'coffee',
      tag: 'جديد',
      name: 'بن يمني محمّص (بن الجبل)',
      origin: 'تعز وريمة — اليمن',
      harvestBadge: 'STONE ROASTED',
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
      category: 'gifts',
      tag: 'هدية مميزة',
      name: 'صندوق الهدية الملكية',
      origin: 'تشكيلة مختارة',
      harvestBadge: 'ROYAL BOX',
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

  labCertificates: {
    'sidr-do-ani': {
      title: 'شهادة التحليل المخبري — عسل سدر دوعني ملكي',
      ref: 'LAB-DOA-2026-014',
      harvestDate: 'قطفة الخريف — وادي دوعن',
      labName: 'مختبر فحص الجودة المعتمد (ISO/IEC 17025)',
      metrics: [
        { label: 'نشاط إنزيم الدياستاز (Diastase)', val: '24.6 DN', status: 'مطابق ومرتفع النقاء' },
        { label: 'نسبة الرطوبة (Moisture)', val: '15.2%', status: 'مثالي أقل من الحد المعياري' },
        { label: 'مركب HMF', val: '4.1 mg/kg', status: 'طازج وغير مسخّن نهائياً' },
        { label: 'نقاء حبوب لقاح السدر', val: '88.4%', status: 'منشأ زهري دوعني أصيل' },
      ],
      notes: 'خالي من السكريات المضافة، والمضادات الحيوية، وأي آثار للمعالجة الحرارية.',
    },
    'sidr-hadhramaut': {
      title: 'شهادة التحليل المخبري — عسل السدر الحضرمي البكر',
      ref: 'LAB-HAD-2026-089',
      harvestDate: 'قطفة الموسم — وادي حضرموت',
      labName: 'مختبر فحص الجودة المعتمد (ISO/IEC 17025)',
      metrics: [
        { label: 'نشاط إنزيم الدياستاز (Diastase)', val: '21.8 DN', status: 'نقاء عالٍ وحيوية كاملة' },
        { label: 'نسبة الرطوبة (Moisture)', val: '15.8%', status: 'ضمن النطاق الذهبي' },
        { label: 'مركب HMF', val: '5.3 mg/kg', status: 'فرز بارد يدوي 100%' },
        { label: 'السكروز (Sucrose)', val: '1.1%', status: 'أقل من الحد المسموح (5%)' },
      ],
      notes: 'تم التحقق من التوصيل الكهربائي والبصمة النباتية لمراعي وادي حضرموت.',
    },
    'sidr-highlands': {
      title: 'شهادة التحليل المخبري — عسل السمرة الجبلي البري',
      ref: 'LAB-SUM-2026-031',
      harvestDate: 'قطفة المرتفعات الجبلية',
      labName: 'مختبر فحص الجودة المعتمد (ISO/IEC 17025)',
      metrics: [
        { label: 'نشاط إنزيم الدياستاز (Diastase)', val: '19.4 DN', status: 'فعالية طبيعية موثقة' },
        { label: 'نسبة الرطوبة (Moisture)', val: '16.1%', status: 'كثافة جبلية متوازنة' },
        { label: 'مركب HMF', val: '6.0 mg/kg', status: 'طبيعي خام غير مبستر' },
        { label: 'مؤشر مضادات الأكسدة', val: 'مرتفع', status: 'رحيق أزهار الغاب والسمرة' },
      ],
      notes: 'عسل جبلي داكن غني بالمعادن الطبيعية ومطابق للمواصفات القياسية الخليجية.',
    },
  },

  faqs: [
    {
      cat: 'quality',
      q: 'كيف أعرف أن العسل أصيل وغير مغشوش؟',
      a: 'كل دفعة تُرفق بشهادة تحليل مختبري معتمدة. كما نوفر ضمان استرداد كامل إذا لم تكن راضياً عن المنتج.',
    },
    {
      cat: 'shipping',
      q: 'هل تشحنون لجميع دول الخليج؟',
      a: 'نعم، نشحن إلى السعودية والإمارات والكويت وقطر والبحرين وعُمان والأردن. تكلفة الشحن تُحسب حسب الوزن والوجهة.',
    },
    {
      cat: 'shipping',
      q: 'كم يستغرق الشحن الدولي؟',
      a: 'عادةً 3-7 أيام عمل لدول الخليج. يُرسل لك رقم تتبع فور شحن الطلب.',
    },
    {
      cat: 'shipping',
      q: 'هل يمكن طلب تغليف هدية خاص؟',
      a: 'بالتأكيد، لدينا تغليف هدايا راقٍ بأحجام مختلفة. يمكنك تحديد مناسبتك (عرس، رمضان، هدية رجال أعمال) عند الطلب.',
    },
    {
      cat: 'quality',
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
  bag: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  seal: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  chevron: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
};

const state = {
  currency: 'SAR',
  category: 'all',
  labKey: 'sidr-do-ani',
  faqCat: 'all',
  selectedVariant: {},
  cart: [],
  giftWrap: false,
  country: 'SA',
};

PRO_DATA.products.forEach(p => {
  state.selectedVariant[p.id] = 0;
});

function formatPrice(amountSAR) {
  const c = CURRENCIES[state.currency];
  const converted = amountSAR * c.rate;
  const formatted = c.decimals > 0 ? converted.toFixed(c.decimals) : Math.round(converted).toLocaleString('en-US');
  return c.code === 'USD' ? `$${formatted}` : `${formatted} ${c.label}`;
}

function showToast(msg) {
  const el = document.getElementById('toast-banner');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => el.classList.remove('show'), 2600);
}

function renderStatsAndFeatures() {
  const statsEl = document.getElementById('stats-grid');
  if (statsEl) {
    statsEl.innerHTML = PRO_DATA.stats.map(s => `
      <div class="stat-item">
        <div class="val">${s.value}</div>
        <div class="lbl">${s.label}</div>
      </div>
    `).join('');
  }

  const featEl = document.getElementById('feat-grid');
  if (featEl) {
    featEl.innerHTML = PRO_DATA.features.map(f => `
      <article class="feat-card">
        <div class="feat-icon">${SVG[f.icon] || ''}</div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </article>
    `).join('');
  }
}

function renderProducts() {
  const grid = document.getElementById('prod-grid');
  if (!grid) return;

  const list = state.category === 'all'
    ? PRO_DATA.products
    : PRO_DATA.products.filter(p => p.category === state.category);

  grid.innerHTML = list.map(p => {
    const vIdx = state.selectedVariant[p.id] || 0;
    const activeVariant = p.variants[vIdx];
    const tagHTML = p.tag ? `<span class="prod-badge">${p.tag}</span>` : '';
    const pillsHTML = p.variants.map((v, idx) => `
      <button type="button" class="size-pill ${idx === vIdx ? 'active' : ''}" data-prod="${p.id}" data-idx="${idx}">
        ${v.label}
      </button>
    `).join('');

    return `
      <article class="prod-card" data-id="${p.id}">
        <div class="prod-media">
          <img src="${p.image}" alt="${p.name}" style="object-position:${p.imgPos};" loading="lazy">
          ${tagHTML}
          <span class="prod-harvest-tag">${p.harvestBadge}</span>
        </div>
        <div class="prod-body">
          <div class="prod-origin">${SVG.pin} <span>${p.origin}</span></div>
          <h3>${p.name}</h3>
          <p class="prod-desc">${p.desc}</p>
          <div class="size-pills">${pillsHTML}</div>
          <div class="prod-price-row">
            <div class="price-display">
              <span class="price-value">${formatPrice(activeVariant.priceSAR)}</span>
              <span class="price-note">العبوة المختارة: ${activeVariant.label}</span>
            </div>
            <button type="button" class="btn-add-cart" data-add="${p.id}">
              ${SVG.bag}
              <span>أضف للسلة</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderLabCertificate() {
  const sheet = document.getElementById('certificate-sheet');
  if (!sheet) return;
  const cert = PRO_DATA.labCertificates[state.labKey];
  if (!cert) return;

  sheet.innerHTML = `
    <div class="cert-header">
      <div class="cert-title-block">
        <small>CERTIFICATE ID: ${cert.ref}</small>
        <h3>${cert.title}</h3>
      </div>
      <div class="cert-seal">
        ${SVG.seal}
        <span>نتيجة الفحص: مطابق وطبيعي 100%</span>
      </div>
    </div>
    <div class="cert-metrics-grid">
      ${cert.metrics.map(m => `
        <div class="cert-metric-box">
          <span>${m.label}</span>
          <strong>${m.val}</strong>
          <small>${m.status}</small>
        </div>
      `).join('')}
    </div>
    <div class="cert-footer-notes">
      <span>المصدر والموسم: ${cert.harvestDate}</span>
      <span>الجهة الفاحصة: ${cert.labName}</span>
      <span>ملاحظة المختبر: ${cert.notes}</span>
    </div>
  `;
}

function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  const items = state.faqCat === 'all'
    ? PRO_DATA.faqs
    : PRO_DATA.faqs.filter(f => f.cat === state.faqCat);

  list.innerHTML = items.map((f, idx) => `
    <div class="faq-item ${idx === 0 ? 'open' : ''}">
      <button type="button" class="faq-q" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <span>${f.q}</span>
        ${SVG.chevron}
      </button>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const countEl = document.getElementById('cart-count');
  const giftPriceLbl = document.getElementById('gift-wrap-price-lbl');
  const sumSubEl = document.getElementById('sum-subtotal');
  const sumGiftRow = document.getElementById('sum-gift-row');
  const sumGiftEl = document.getElementById('sum-gift');
  const sumShipEl = document.getElementById('sum-shipping');
  const sumTotEl = document.getElementById('sum-total');
  const etaPill = document.getElementById('shipping-eta-pill');
  const checkoutBtn = document.getElementById('checkout-wa-btn');

  if (!container) return;

  const totalQty = state.cart.reduce((acc, item) => acc + item.qty, 0);
  if (countEl) countEl.textContent = String(totalQty);
  if (giftPriceLbl) giftPriceLbl.textContent = `+ ${formatPrice(PRO_CONFIG.giftWrapFeeSAR)}`;

  const shipInfo = GULF_SHIPPING[state.country] || GULF_SHIPPING.SA;
  if (etaPill) etaPill.textContent = shipInfo.eta;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        ${SVG.bag}
        <p>سلة المقتنيات فارغة حالياً.</p>
        <small>اختر الحجم المطلوب من العسل أو البن وأضفه إلى السلة.</small>
      </div>
    `;
    if (sumSubEl) sumSubEl.textContent = formatPrice(0);
    if (sumGiftRow) sumGiftRow.hidden = true;
    if (sumShipEl) sumShipEl.textContent = formatPrice(0);
    if (sumTotEl) sumTotEl.textContent = formatPrice(0);
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  let subtotalSAR = 0;
  container.innerHTML = state.cart.map((item, index) => {
    const prod = PRO_DATA.products.find(p => p.id === item.productId);
    const variant = prod.variants[item.variantIndex];
    const lineSAR = variant.priceSAR * item.qty;
    subtotalSAR += lineSAR;

    return `
      <div class="cart-item">
        <img src="${prod.image}" alt="${prod.name}">
        <div class="cart-item-info">
          <h4>${prod.name}</h4>
          <div class="cart-item-meta">${variant.label} · ${prod.origin}</div>
          <div class="cart-item-actions">
            <div>
              <span class="qty-stepper">
                <button type="button" data-qty-delta="-1" data-cart-idx="${index}" aria-label="إنقاص الكمية">-</button>
                <span>${item.qty}</span>
                <button type="button" data-qty-delta="1" data-cart-idx="${index}" aria-label="زيادة الكمية">+</button>
              </span>
              <button type="button" class="cart-remove" data-remove-idx="${index}">حذف</button>
            </div>
            <span class="cart-item-price">${formatPrice(lineSAR)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const giftFeeSAR = state.giftWrap ? PRO_CONFIG.giftWrapFeeSAR : 0;
  const isFreeShip = subtotalSAR >= shipInfo.freeOverSAR;
  const shippingFeeSAR = isFreeShip ? 0 : shipInfo.feeSAR;
  const totalSAR = subtotalSAR + giftFeeSAR + shippingFeeSAR;

  if (sumSubEl) sumSubEl.textContent = formatPrice(subtotalSAR);
  if (sumGiftRow && sumGiftEl) {
    sumGiftRow.hidden = !state.giftWrap;
    sumGiftEl.textContent = formatPrice(giftFeeSAR);
  }
  if (sumShipEl) {
    sumShipEl.textContent = isFreeShip ? 'مجاني (تجاوزت حد الشحن المجاني)' : formatPrice(shippingFeeSAR);
  }
  if (sumTotEl) sumTotEl.textContent = formatPrice(totalSAR);
  if (checkoutBtn) checkoutBtn.disabled = false;
}

function openCart() {
  document.getElementById('cart-backdrop')?.classList.add('open');
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-drawer')?.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  document.getElementById('cart-backdrop')?.classList.remove('open');
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-drawer')?.setAttribute('aria-hidden', 'true');
}

function submitWhatsAppOrder() {
  if (state.cart.length === 0) return;

  const shipInfo = GULF_SHIPPING[state.country] || GULF_SHIPPING.SA;
  const customerName = document.getElementById('customer-name-input')?.value.trim();
  const customerCity = document.getElementById('customer-city-input')?.value.trim();
  const giftNote = document.getElementById('gift-note-input')?.value.trim();

  let subtotalSAR = 0;
  const lines = state.cart.map((item, i) => {
    const prod = PRO_DATA.products.find(p => p.id === item.productId);
    const variant = prod.variants[item.variantIndex];
    const lineSAR = variant.priceSAR * item.qty;
    subtotalSAR += lineSAR;
    return `${i + 1}. ${prod.name} (${variant.label}) × ${item.qty} = ${formatPrice(lineSAR)}`;
  });

  const giftFeeSAR = state.giftWrap ? PRO_CONFIG.giftWrapFeeSAR : 0;
  const isFreeShip = subtotalSAR >= shipInfo.freeOverSAR;
  const shippingFeeSAR = isFreeShip ? 0 : shipInfo.feeSAR;
  const totalSAR = subtotalSAR + giftFeeSAR + shippingFeeSAR;

  const messageParts = [
    `طلب جديد من ${PRO_CONFIG.storeName} (${PRO_CONFIG.tierLabel})`,
    `العملة المختارة: ${state.currency}`,
    `--- تفاصيل المقتنيات ---`,
    ...lines,
    `--- التغليف والشحن ---`,
    `تغليف هدايا ملكي: ${state.giftWrap ? `نعم (${formatPrice(giftFeeSAR)})` : 'لا'}`,
  ];

  if (state.giftWrap && giftNote) {
    messageParts.push(`نص بطاقة الإهداء: ${giftNote}`);
  }

  messageParts.push(`الوجهة: ${shipInfo.name}${customerCity ? ` - ${customerCity}` : ''} (${shipInfo.eta})`);
  messageParts.push(`رسوم الشحن: ${isFreeShip ? 'مجاني' : formatPrice(shippingFeeSAR)}`);
  messageParts.push(`الإجمالي النهائي: ${formatPrice(totalSAR)}`);

  if (customerName) {
    messageParts.push(`الاسم: ${customerName}`);
  }

  const url = `https://wa.me/${PRO_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageParts.join('\n'))}`;
  window.open(url, '_blank', 'noopener');
}

function bindEvents() {
  window.addEventListener('scroll', () => {
    const header = document.getElementById('site-header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  });

  document.getElementById('currency-switcher')?.addEventListener('click', e => {
    const btn = e.target.closest('.curr-btn');
    if (!btn) return;
    state.currency = btn.dataset.curr;
    document.querySelectorAll('.curr-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderProducts();
    renderCart();
  });

  document.getElementById('collection-filters')?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    state.category = btn.dataset.cat;
    document.querySelectorAll('.filter-pill').forEach(b => {
      const isAct = b === btn;
      b.classList.toggle('active', isAct);
      b.setAttribute('aria-selected', String(isAct));
    });
    renderProducts();
  });

  document.getElementById('prod-grid')?.addEventListener('click', e => {
    const sizeBtn = e.target.closest('.size-pill');
    if (sizeBtn) {
      const prodId = sizeBtn.dataset.prod;
      const idx = Number(sizeBtn.dataset.idx);
      state.selectedVariant[prodId] = idx;
      renderProducts();
      return;
    }

    const addBtn = e.target.closest('.btn-add-cart');
    if (addBtn) {
      const prodId = addBtn.dataset.add;
      const vIdx = state.selectedVariant[prodId] || 0;
      const existing = state.cart.find(c => c.productId === prodId && c.variantIndex === vIdx);
      if (existing) {
        existing.qty += 1;
      } else {
        state.cart.push({ productId: prodId, variantIndex: vIdx, qty: 1 });
      }
      const prod = PRO_DATA.products.find(p => p.id === prodId);
      renderCart();
      openCart();
      showToast(`تمت إضافة ${prod.name} (${prod.variants[vIdx].label}) إلى السلة`);
    }
  });

  document.getElementById('lab-tabs')?.addEventListener('click', e => {
    const tab = e.target.closest('.lab-tab');
    if (!tab) return;
    state.labKey = tab.dataset.lab;
    document.querySelectorAll('.lab-tab').forEach(t => {
      const isAct = t === tab;
      t.classList.toggle('active', isAct);
      t.setAttribute('aria-selected', String(isAct));
    });
    renderLabCertificate();
  });

  document.getElementById('faq-filter-bar')?.addEventListener('click', e => {
    const btn = e.target.closest('.faq-filter-btn');
    if (!btn) return;
    state.faqCat = btn.dataset.faqCat;
    document.querySelectorAll('.faq-filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderFAQ();
  });

  document.getElementById('faq-list')?.addEventListener('click', e => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('#faq-list .faq-item').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  document.getElementById('open-cart-btn')?.addEventListener('click', openCart);
  document.getElementById('close-cart-btn')?.addEventListener('click', closeCart);
  document.getElementById('cart-backdrop')?.addEventListener('click', closeCart);

  document.getElementById('cart-items-container')?.addEventListener('click', e => {
    const qtyBtn = e.target.closest('[data-qty-delta]');
    if (qtyBtn) {
      const idx = Number(qtyBtn.dataset.cartIdx);
      const delta = Number(qtyBtn.dataset.qtyDelta);
      const item = state.cart[idx];
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) state.cart.splice(idx, 1);
      renderCart();
      return;
    }

    const remBtn = e.target.closest('[data-remove-idx]');
    if (remBtn) {
      state.cart.splice(Number(remBtn.dataset.removeIdx), 1);
      renderCart();
    }
  });

  document.getElementById('gift-wrap-toggle')?.addEventListener('change', e => {
    state.giftWrap = e.target.checked;
    const noteWrap = document.getElementById('gift-note-wrap');
    if (noteWrap) noteWrap.hidden = !state.giftWrap;
    renderCart();
  });

  document.getElementById('gulf-country-select')?.addEventListener('change', e => {
    state.country = e.target.value;
    renderCart();
  });

  document.getElementById('checkout-wa-btn')?.addEventListener('click', submitWhatsAppOrder);
}

document.addEventListener('DOMContentLoaded', () => {
  renderStatsAndFeatures();
  renderProducts();
  renderLabCertificate();
  renderFAQ();
  renderCart();
  bindEvents();
});
