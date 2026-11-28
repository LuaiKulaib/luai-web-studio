/* =========================================================
   app.js — متجر النخبة السريع | الفئة الفاخرة Pro ($120)
   Boutique D2C Storefront Pro — Variants, Quick-View, Wishlist,
   Live Free-Shipping Progress, Multi-Currency & WhatsApp Pro
   ========================================================= */

(() => {
  'use strict';

  const ALLOWED_IMAGES = new Set([
    'watch.jpg',
    'headphones.jpg',
    'powerbank.jpg',
    'camera.jpg',
    'perfume.jpg',
    'bag.jpg',
  ]);

  const IMAGE_PREFIX = '../assets/images/';
  const FREE_SHIPPING_THRESHOLD = { yer: 40000, sar: 300, usd: 80 };
  const STORAGE_KEYS = {
    cart: 'elite_pro_cart_v1',
    wishlist: 'elite_pro_wishlist_v1',
    currency: 'elite_pro_currency_v1',
  };

  const PRODUCT_META = {
    'P-101': {
      variants: [
        { id: 'tit', label: 'تيتانيوم أسود', color: '#1E293B' },
        { id: 'slv', label: 'ستيل فضي', color: '#94A3B8' },
        { id: 'chm', label: 'ذهبي شامبانيا', color: '#C69232' },
      ],
      specs: [
        'شاشة AMOLED عالية السطوع مقاس 2.04 بوصة',
        'مقاومة للماء بمعيار IP68 مع بطارية حتى 10 أيام',
        'دعم استقبال المكالمات وقياس نبضات القلب بدقة',
        'شاحن مغناطيسي سريع + ضمان الوكيل',
      ],
    },
    'P-102': {
      variants: [
        { id: 'blk', label: 'أسود مطفي', color: '#18181B' },
        { id: 'emr', label: 'أخضر زمردي', color: '#072E24' },
        { id: 'snd', label: 'رملي دافئ', color: '#C9B79C' },
      ],
      specs: [
        'تقنية عزل الضوضاء النشط ANC للصوت النقي',
        'عمر تشغيل حتى 40 ساعة متواصلة مع الشحن السريع',
        'منفذ شحن Type-C مع اتصال Bluetooth 5.3 مستقر',
        'وسائد أذن مريحة للاستخدام الطويل والسفر',
      ],
    },
    'P-103': {
      variants: [
        { id: 'std', label: 'إصدار أسود برو', color: '#111827' },
        { id: 'cyn', label: 'إصدار نيون أزرق', color: '#0E7490' },
        { id: 'duo', label: 'طقم تحكم ثنائي', color: '#C69232' },
      ],
      specs: [
        'استجابة لاسلكية فورية بدون تأخير للألعاب',
        'قبضة مريحة مضادة للانزلاق مع اهتزاز تفاعلي',
        'متوافق مع منصات الألعاب والحواسيب الحديثة',
        'عدسات مريحة للعين مع قابلية ضبط البعد البؤري',
      ],
    },
    'P-104': {
      variants: [
        { id: 'kit1', label: 'عدسة 55 مم قياسية', color: '#1F2937' },
        { id: 'kit2', label: 'عدسة + حقيبة حماية', color: '#072E24' },
        { id: 'kit3', label: 'حزمة صناع المحتوى', color: '#C69232' },
      ],
      specs: [
        'مستشعر احترافي عالي الدقة مع عدسة 55 مم',
        'تصوير فيديو واضح مع ألوان سينمائية متوازنة',
        'مناسبة لتصوير المنتجات والمحتوى التجاري',
        'تشمل ضمان سنة كاملة وبطارية إضافية أصلية',
      ],
    },
    'P-105': {
      variants: [
        { id: 'oud', label: 'عود وعنبر ملكي', color: '#78350F' },
        { id: 'msk', label: 'مسك وزهور بيضاء', color: '#D4AF37' },
        { id: 'mix', label: 'تشكيلة النخبة', color: '#072E24' },
      ],
      specs: [
        'طقم متكامل من 3 زجاجات عطرية بتركيز عالٍ',
        'ثبات يدوم طوال اليوم بتركيبة شرقية وزهرية',
        'زجاجات فاخرة مناسبة للاقتناء أو الإهداء الرسمي',
        'تغليف محكم آمن للشحن الداخلي والخليجي',
      ],
    },
    'P-106': {
      variants: [
        { id: 'for', label: 'زمردي وذهبي', color: '#072E24' },
        { id: 'crm', label: 'كريمي فاخر', color: '#E5D3B3' },
        { id: 'obs', label: 'أسود ملكي', color: '#111827' },
      ],
      specs: [
        'صندوق هدايا صلب ببطانة مخملية فاخرة',
        'يشمل بطاقة إهداء مخصصة وشريط ساتان أنيق',
        'تجهيز فوري وتغليف محمي ضد الصدمات',
        'ملائم لإرفاقه مع الساعات والعطور والإلكترونيات',
      ],
    },
  };

  const DEFAULT_VARIANTS = [
    { id: 'std', label: 'الإصدار القياسي', color: '#072E24' },
    { id: 'dlx', label: 'إصدار النخبة', color: '#C69232' },
  ];

  const SVG = {
    plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    heart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  };

  function resolveImage(rawPath) {
    const file = String(rawPath || '').split('/').pop();
    return IMAGE_PREFIX + (ALLOWED_IMAGES.has(file) ? file : 'watch.jpg');
  }

  function hydrateProduct(raw) {
    const meta = PRODUCT_META[raw.id] || {};
    return {
      ...raw,
      image: resolveImage(raw.image),
      variants: meta.variants || DEFAULT_VARIANTS,
      specs: meta.specs || [raw.desc || 'منتج أصلي مضمون من متجر النخبة السريع'],
    };
  }

  function readStorage(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage quota errors
    }
  }

  const baseProducts = (typeof DEFAULT_PRODUCTS !== 'undefined' ? DEFAULT_PRODUCTS : []).map(hydrateProduct);

  const state = {
    products: baseProducts.map((p) => ({ ...p })),
    activeCategory: 'all',
    searchTerm: '',
    sortBy: 'default',
    currency: localStorage.getItem(STORAGE_KEYS.currency) || 'yer',
    appliedCoupon: null,
    selectedVariants: {},
    cart: readStorage(STORAGE_KEYS.cart, {}),
    wishlist: readStorage(STORAGE_KEYS.wishlist, []),
    quickView: {
      productId: null,
      qty: 1,
    },
  };

  if (!['yer', 'sar', 'usd'].includes(state.currency)) {
    state.currency = 'yer';
  }

  state.products.forEach((p) => {
    state.selectedVariants[p.id] = p.variants[0].id;
  });

  const els = {
    sheetStatusText: document.getElementById('sheetStatusText'),
    openSheetModalBtn: document.getElementById('openSheetModalBtn'),
    openWishlistBtn: document.getElementById('openWishlistBtn'),
    headWishlistCount: document.getElementById('headWishlistCount'),
    openCartBtn: document.getElementById('openCartBtn'),
    headCartCount: document.getElementById('headCartCount'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileNav: document.getElementById('mobileNav'),
    heroQuickViewBtn: document.getElementById('heroQuickViewBtn'),
    heroFeaturedPrice: document.getElementById('heroFeaturedPrice'),
    barShippingCard: document.getElementById('barShippingCard'),
    barShippingText: document.getElementById('barShippingText'),
    barShippingPct: document.getElementById('barShippingPct'),
    barShippingFill: document.getElementById('barShippingFill'),
    storeSearch: document.getElementById('storeSearch'),
    catsRow: document.getElementById('catsRow'),
    storeSort: document.getElementById('storeSort'),
    catalogCount: document.getElementById('catalogCount'),
    prodGrid: document.getElementById('prodGrid'),
    faqList: document.getElementById('faqList'),
    backdrop: document.getElementById('backdrop'),
    qvModal: document.getElementById('qvModal'),
    closeQvBtn: document.getElementById('closeQvBtn'),
    qvImg: document.getElementById('qvImg'),
    qvStock: document.getElementById('qvStock'),
    qvCat: document.getElementById('qvCat'),
    qvSku: document.getElementById('qvSku'),
    qvTitle: document.getElementById('qvTitle'),
    qvPrice: document.getElementById('qvPrice'),
    qvDesc: document.getElementById('qvDesc'),
    qvSpecs: document.getElementById('qvSpecs'),
    qvSelectedVarName: document.getElementById('qvSelectedVarName'),
    qvVariants: document.getElementById('qvVariants'),
    qvQtyMinus: document.getElementById('qvQtyMinus'),
    qvQtyVal: document.getElementById('qvQtyVal'),
    qvQtyPlus: document.getElementById('qvQtyPlus'),
    qvAddBtn: document.getElementById('qvAddBtn'),
    qvWishBtn: document.getElementById('qvWishBtn'),
    qvWaBtn: document.getElementById('qvWaBtn'),
    sheetModal: document.getElementById('sheetModal'),
    closeSheetModalBtn: document.getElementById('closeSheetModalBtn'),
    sheetCsvInput: document.getElementById('sheetCsvInput'),
    syncCsvBtn: document.getElementById('syncCsvBtn'),
    sheetCsvMsg: document.getElementById('sheetCsvMsg'),
    resetSheetBtn: document.getElementById('resetSheetBtn'),
    wishlistDrawer: document.getElementById('wishlistDrawer'),
    closeWishlistBtn: document.getElementById('closeWishlistBtn'),
    wishlistItems: document.getElementById('wishlistItems'),
    wishAddAllBtn: document.getElementById('wishAddAllBtn'),
    cartDrawer: document.getElementById('cartDrawer'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    drawerShippingText: document.getElementById('drawerShippingText'),
    drawerShippingPct: document.getElementById('drawerShippingPct'),
    drawerShippingFill: document.getElementById('drawerShippingFill'),
    cartItems: document.getElementById('cartItems'),
    checkoutZone: document.getElementById('checkoutZone'),
    checkoutName: document.getElementById('checkoutName'),
    checkoutPhone: document.getElementById('checkoutPhone'),
    checkoutAddress: document.getElementById('checkoutAddress'),
    checkoutNotes: document.getElementById('checkoutNotes'),
    couponInput: document.getElementById('couponInput'),
    applyCouponBtn: document.getElementById('applyCouponBtn'),
    couponMsg: document.getElementById('couponMsg'),
    totalsBox: document.getElementById('totalsBox'),
    waCheckoutBtn: document.getElementById('waCheckoutBtn'),
    proToast: document.getElementById('proToast'),
  };

  let toastTimer = null;

  function showToast(msg) {
    if (!els.proToast) return;
    els.proToast.textContent = msg;
    els.proToast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.proToast.hidden = true;
    }, 2800);
  }

  function getPrice(item) {
    if (state.currency === 'sar') return Number(item.priceSar) || 0;
    if (state.currency === 'usd') return Number(((Number(item.priceSar) || 0) / 3.75).toFixed(2));
    return Number(item.priceYer) || 0;
  }

  function getZoneFee(zone) {
    if (!zone) return 0;
    if (state.currency === 'sar') return Number(zone.feeSar) || 0;
    if (state.currency === 'usd') return Number(((Number(zone.feeSar) || 0) / 3.75).toFixed(2));
    return Number(zone.feeYer) || 0;
  }

  function formatMoney(amount) {
    const val = Number(amount) || 0;
    if (state.currency === 'usd') {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (state.currency === 'sar') {
      return `${Math.round(val).toLocaleString('en-US')} ر.س`;
    }
    return `${Math.round(val).toLocaleString('en-US')} ر.ي`;
  }

  function stockBadgeClass(stock) {
    if (stock === 'نفدت الكمية') return 'stock-out';
    if (stock === 'كمية محدودة') return 'stock-low';
    return 'stock-ok';
  }

  function getSelectedVariant(product) {
    const varId = state.selectedVariants[product.id];
    return product.variants.find((v) => v.id === varId) || product.variants[0];
  }

  function makeCartKey(productId, variantId) {
    return `${productId}::${variantId}`;
  }

  function parseCartKey(key) {
    const [productId, variantId] = String(key).split('::');
    return { productId, variantId };
  }

  function computeCartSubtotal() {
    let subtotal = 0;
    Object.entries(state.cart).forEach(([key, qty]) => {
      if (qty <= 0) return;
      const { productId } = parseCartKey(key);
      const prod = state.products.find((p) => p.id === productId);
      if (!prod) return;
      subtotal += getPrice(prod) * qty;
    });
    return state.currency === 'usd' ? Number(subtotal.toFixed(2)) : Math.round(subtotal);
  }

  function updateShippingBars() {
    const subtotal = computeCartSubtotal();
    const threshold = FREE_SHIPPING_THRESHOLD[state.currency];
    const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
    const unlocked = subtotal >= threshold && subtotal > 0;
    const remaining = Math.max(0, threshold - subtotal);

    const text = unlocked
      ? 'تهانينا! تم تفعيل الشحن المجاني لطلبك بالكامل'
      : `أضف منتجات بقيمة ${formatMoney(remaining)} لتفعيل الشحن المجاني`;

    if (els.barShippingText) els.barShippingText.textContent = text;
    if (els.barShippingPct) els.barShippingPct.textContent = `${pct}%`;
    if (els.barShippingFill) els.barShippingFill.style.width = `${pct}%`;
    if (els.barShippingCard) {
      els.barShippingCard.classList.toggle('unlocked', unlocked);
      const track = els.barShippingCard.querySelector('.shipping-track');
      if (track) track.setAttribute('aria-valuenow', String(pct));
    }

    if (els.drawerShippingText) els.drawerShippingText.textContent = text;
    if (els.drawerShippingPct) els.drawerShippingPct.textContent = `${pct}%`;
    if (els.drawerShippingFill) els.drawerShippingFill.style.width = `${pct}%`;
    const drawerBox = els.drawerShippingFill?.closest('.drawer-shipping-box');
    if (drawerBox) drawerBox.classList.toggle('unlocked', unlocked);
  }

  function updateHeaderBadges() {
    const totalQty = Object.values(state.cart).reduce((acc, q) => acc + (q > 0 ? q : 0), 0);
    if (els.headCartCount) els.headCartCount.textContent = String(totalQty);
    if (els.headWishlistCount) els.headWishlistCount.textContent = String(state.wishlist.length);

    const featured = state.products[0];
    if (featured && els.heroFeaturedPrice) {
      els.heroFeaturedPrice.textContent = formatMoney(getPrice(featured));
    }
  }

  function renderCatalog() {
    if (!els.prodGrid) return;

    const q = state.searchTerm.trim().toLowerCase();
    const filtered = state.products.filter((p) => {
      const okCat = state.activeCategory === 'all' || p.category === state.activeCategory;
      const okQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.catLabel.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      return okCat && okQ;
    });

    if (state.sortBy === 'price-asc') {
      filtered.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (state.sortBy === 'price-desc') {
      filtered.sort((a, b) => getPrice(b) - getPrice(a));
    }

    if (els.catalogCount) {
      els.catalogCount.textContent =
        filtered.length === 0
          ? 'لا توجد منتجات مطابقة'
          : `يعرض ${filtered.length} ${filtered.length === 1 ? 'منتج' : 'منتجات'}`;
    }

    if (!filtered.length) {
      els.prodGrid.innerHTML =
        '<div class="empty-box" style="grid-column:1/-1;">لم يتم العثور على منتجات مطابقة للبحث. جرّب تصفية التصنيفات أو مسح كلمة البحث.</div>';
      return;
    }

    els.prodGrid.innerHTML = filtered
      .map((p) => {
        const activeVar = getSelectedVariant(p);
        const cartKey = makeCartKey(p.id, activeVar.id);
        const qty = state.cart[cartKey] || 0;
        const out = p.stock === 'نفدت الكمية';
        const isWished = state.wishlist.includes(p.id);

        const variantsHtml = p.variants
          .map(
            (v) => `
            <button
              type="button"
              class="var-pill ${v.id === activeVar.id ? 'active' : ''}"
              data-var-prod="${p.id}"
              data-var-id="${v.id}"
            >
              <span class="var-swatch" style="background:${v.color};" aria-hidden="true"></span>
              <span>${v.label}</span>
            </button>
          `
          )
          .join('');

        const ctrlHtml = out
          ? '<button type="button" class="btn-add" disabled>نفدت الكمية</button>'
          : qty === 0
            ? `<button type="button" class="btn-add" data-cart-act="inc" data-cart-key="${cartKey}">${SVG.plus}<span>أضف للسلة</span></button>`
            : `<div class="qty-ctrl">
                 <button type="button" class="qty-btn" data-cart-act="dec" data-cart-key="${cartKey}" aria-label="إنقاص">-</button>
                 <span class="qty-val num-font">${qty}</span>
                 <button type="button" class="qty-btn" data-cart-act="inc" data-cart-key="${cartKey}" aria-label="زيادة">+</button>
               </div>`;

        return `
          <article class="prod-card">
            <div class="prod-media">
              <img src="${p.image}" alt="${p.name}" loading="lazy" data-qv-open="${p.id}" />
              ${p.badge ? `<span class="prod-badge">${p.badge}</span>` : ''}
              <span class="stock-pill ${stockBadgeClass(p.stock)}">${p.stock}</span>
              <div class="prod-media-actions">
                <button type="button" class="media-action-btn ${isWished ? 'wish-active' : ''}" data-wish-toggle="${p.id}" aria-label="إضافة للمفضلة">${SVG.heart}</button>
                <button type="button" class="media-action-btn" data-qv-open="${p.id}" aria-label="معاينة سريعة">${SVG.eye}</button>
              </div>
            </div>

            <div class="prod-body">
              <div class="prod-top-meta">
                <span class="prod-cat">${p.catLabel}</span>
                <span class="prod-sku num-font">${p.id}</span>
              </div>
              <button type="button" class="prod-title-btn" data-qv-open="${p.id}">${p.name}</button>
              <p class="prod-desc">${p.desc}</p>

              <div class="variant-section">
                <span class="variant-label">الإصدار / اللون: <strong>${activeVar.label}</strong></span>
                <div class="variant-pills">${variantsHtml}</div>
              </div>

              <div class="prod-footer">
                <div class="prod-price-col">
                  <small>السعر الحالي</small>
                  <span class="prod-price num-font">${formatMoney(getPrice(p))}</span>
                </div>
                ${ctrlHtml}
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  function renderZonesSelect() {
    if (!els.checkoutZone) return;
    const prev = els.checkoutZone.value;
    const zones = STORE_CONFIG.deliveryZones || [];
    els.checkoutZone.innerHTML = zones
      .map((z) => {
        const fee = getZoneFee(z);
        const label = fee === 0 ? 'مجاني' : formatMoney(fee);
        return `<option value="${z.id}">${z.label} (${label})</option>`;
      })
      .join('');
    if (prev && zones.some((z) => z.id === prev)) {
      els.checkoutZone.value = prev;
    }
  }

  function renderCartDrawer() {
    if (!els.cartItems || !els.totalsBox) return;

    const entries = Object.entries(state.cart).filter(([, qty]) => qty > 0);
    if (!entries.length) {
      els.cartItems.innerHTML =
        '<div class="empty-box">السلة فارغة حالياً — أضف منتجاتك المفضلة من المتجر للبدء.</div>';
    } else {
      els.cartItems.innerHTML = entries
        .map(([key, qty]) => {
          const { productId, variantId } = parseCartKey(key);
          const prod = state.products.find((p) => p.id === productId);
          if (!prod) return '';
          const variant = prod.variants.find((v) => v.id === variantId) || prod.variants[0];
          const lineSub = getPrice(prod) * qty;
          return `
            <div class="cart-item">
              <img src="${prod.image}" alt="${prod.name}" />
              <div class="cart-item-info">
                <strong>${prod.name}</strong>
                <span class="cart-variant-tag">${variant.label}</span>
                <span class="cart-item-price num-font">${formatMoney(lineSub)}</span>
              </div>
              <div class="qty-ctrl">
                <button type="button" class="qty-btn" data-cart-act="dec" data-cart-key="${key}" aria-label="إنقاص">-</button>
                <span class="qty-val num-font">${qty}</span>
                <button type="button" class="qty-btn" data-cart-act="inc" data-cart-key="${key}" aria-label="زيادة">+</button>
              </div>
              <button type="button" class="btn-remove-mini" data-cart-act="del" data-cart-key="${key}" aria-label="حذف الصنف">${SVG.trash}</button>
            </div>
          `;
        })
        .join('');
    }

    const subtotal = computeCartSubtotal();
    const zones = STORE_CONFIG.deliveryZones || [];
    const zoneId = els.checkoutZone?.value || zones[0]?.id;
    const zone = zones.find((z) => z.id === zoneId) || zones[0];
    const threshold = FREE_SHIPPING_THRESHOLD[state.currency];
    const freeShippingUnlocked = subtotal >= threshold && subtotal > 0;
    const rawZoneFee = getZoneFee(zone);
    const deliveryFee = subtotal === 0 || freeShippingUnlocked ? 0 : rawZoneFee;

    const discRate = state.appliedCoupon ? STORE_CONFIG.coupons[state.appliedCoupon] || 0 : 0;
    const discRaw = subtotal * discRate;
    const discountAmt = state.currency === 'usd' ? Number(discRaw.toFixed(2)) : Math.round(discRaw);
    const grandTotal = Math.max(0, subtotal - discountAmt + deliveryFee);

    const shippingText =
      subtotal === 0
        ? formatMoney(0)
        : freeShippingUnlocked
          ? 'مجاني (تأهلت للشحن المجاني)'
          : rawZoneFee === 0
            ? 'مجاني'
            : formatMoney(deliveryFee);

    els.totalsBox.innerHTML = `
      <div class="totals-line"><span>المجموع الفرعي</span><strong class="num-font">${formatMoney(subtotal)}</strong></div>
      ${
        discountAmt > 0
          ? `<div class="totals-line discount"><span>خصم الكوبون (<span class="num-font">${state.appliedCoupon}</span>)</span><strong class="num-font">-${formatMoney(discountAmt)}</strong></div>`
          : ''
      }
      <div class="totals-line"><span>${zone ? zone.label : 'التوصيل'}</span><strong>${shippingText}</strong></div>
      <div class="totals-line grand"><span>الإجمالي النهائي</span><span class="num-font">${formatMoney(grandTotal)}</span></div>
    `;

    updateShippingBars();
  }

  function renderWishlistDrawer() {
    if (!els.wishlistItems) return;
    const validIds = state.wishlist.filter((id) => state.products.some((p) => p.id === id));
    if (validIds.length !== state.wishlist.length) {
      state.wishlist = validIds;
      writeStorage(STORAGE_KEYS.wishlist, state.wishlist);
    }

    if (!validIds.length) {
      els.wishlistItems.innerHTML =
        '<div class="empty-box">قائمة المفضلة فارغة — اضغط على أيقونة القلب لحفظ أي منتج لاحقاً.</div>';
      if (els.wishAddAllBtn) els.wishAddAllBtn.disabled = true;
      return;
    }

    if (els.wishAddAllBtn) els.wishAddAllBtn.disabled = false;

    els.wishlistItems.innerHTML = validIds
      .map((id) => {
        const prod = state.products.find((p) => p.id === id);
        if (!prod) return '';
        const activeVar = getSelectedVariant(prod);
        const out = prod.stock === 'نفدت الكمية';
        return `
          <div class="wish-item">
            <img src="${prod.image}" alt="${prod.name}" />
            <div class="wish-item-info">
              <strong>${prod.name}</strong>
              <span class="cart-variant-tag">${activeVar.label}</span>
              <span class="wish-item-price num-font">${formatMoney(getPrice(prod))}</span>
            </div>
            <button type="button" class="btn-forest-sm" style="padding:0.42rem 0.72rem;" data-wish-move="${prod.id}" ${out ? 'disabled' : ''}>
              ${out ? 'نفدت' : 'للسلة'}
            </button>
            <button type="button" class="btn-remove-mini" data-wish-toggle="${prod.id}" aria-label="إزالة من المفضلة">${SVG.trash}</button>
          </div>
        `;
      })
      .join('');
  }

  function adjustCart(cartKey, delta) {
    const next = Math.max(0, (state.cart[cartKey] || 0) + delta);
    if (next === 0) delete state.cart[cartKey];
    else state.cart[cartKey] = next;
    writeStorage(STORAGE_KEYS.cart, state.cart);
    updateHeaderBadges();
    renderCatalog();
    renderCartDrawer();
  }

  function removeCartItem(cartKey) {
    delete state.cart[cartKey];
    writeStorage(STORAGE_KEYS.cart, state.cart);
    updateHeaderBadges();
    renderCatalog();
    renderCartDrawer();
  }

  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx >= 0) {
      state.wishlist.splice(idx, 1);
      showToast('تمت إزالة المنتج من المفضلة');
    } else {
      state.wishlist.push(productId);
      showToast('تم حفظ المنتج في قائمة المفضلة');
    }
    writeStorage(STORAGE_KEYS.wishlist, state.wishlist);
    updateHeaderBadges();
    renderCatalog();
    renderWishlistDrawer();
    if (state.quickView.productId === productId) {
      renderQuickView(productId);
    }
  }

  function renderQuickView(productId) {
    const prod = state.products.find((p) => p.id === productId);
    if (!prod || !els.qvModal) return;

    state.quickView.productId = prod.id;
    const activeVar = getSelectedVariant(prod);
    const out = prod.stock === 'نفدت الكمية';
    const wished = state.wishlist.includes(prod.id);

    els.qvImg.src = prod.image;
    els.qvImg.alt = prod.name;
    els.qvStock.textContent = prod.stock;
    els.qvStock.className = `qv-stock-pill ${stockBadgeClass(prod.stock)}`;
    els.qvCat.textContent = prod.catLabel;
    els.qvSku.textContent = prod.id;
    els.qvTitle.textContent = prod.name;
    els.qvPrice.textContent = formatMoney(getPrice(prod));
    els.qvDesc.textContent = prod.desc;
    els.qvSelectedVarName.textContent = activeVar.label;
    els.qvQtyVal.textContent = String(state.quickView.qty);

    els.qvSpecs.innerHTML = prod.specs
      .map((s) => `<li>${SVG.check}<span>${s}</span></li>`)
      .join('');

    els.qvVariants.innerHTML = prod.variants
      .map(
        (v) => `
        <button
          type="button"
          class="var-pill ${v.id === activeVar.id ? 'active' : ''}"
          data-qv-var="${v.id}"
        >
          <span class="var-swatch" style="background:${v.color};" aria-hidden="true"></span>
          <span>${v.label}</span>
        </button>
      `
      )
      .join('');

    els.qvAddBtn.disabled = out;
    els.qvWaBtn.disabled = out;
    els.qvWishBtn.classList.toggle('active', wished);
  }

  function openQuickView(productId) {
    state.quickView.qty = 1;
    renderQuickView(productId);
    closeAllOverlays(false);
    els.backdrop.classList.add('open');
    els.qvModal.hidden = false;
  }

  function openDrawer(drawerEl) {
    closeAllOverlays(false);
    els.backdrop.classList.add('open');
    drawerEl?.classList.add('open');
  }

  function openSheetModal() {
    closeAllOverlays(false);
    els.backdrop.classList.add('open');
    if (els.sheetModal) els.sheetModal.hidden = false;
  }

  function closeAllOverlays(hideBackdrop = true) {
    if (hideBackdrop) els.backdrop?.classList.remove('open');
    document.querySelectorAll('.drawer.open').forEach((d) => d.classList.remove('open'));
    if (els.qvModal) els.qvModal.hidden = true;
    if (els.sheetModal) els.sheetModal.hidden = true;
  }

  function applyCouponCode(rawCode, openCart = false) {
    const code = String(rawCode || '').trim().toUpperCase();
    if (els.couponInput) els.couponInput.value = code;
    const rate = STORE_CONFIG.coupons?.[code];

    if (rate) {
      state.appliedCoupon = code;
      if (els.couponMsg) {
        els.couponMsg.style.color = 'var(--emerald)';
        els.couponMsg.textContent = `تم تفعيل خصم ${Math.round(rate * 100)}% بكود ${code}.`;
      }
      showToast(`تم تفعيل كود الخصم ${code} (${Math.round(rate * 100)}%)`);
    } else {
      state.appliedCoupon = null;
      if (els.couponMsg) {
        els.couponMsg.style.color = 'var(--red)';
        els.couponMsg.textContent = 'الكود غير صالح — جرّب SAVE10 أو VIP15.';
      }
    }

    renderCartDrawer();
    if (openCart) openDrawer(els.cartDrawer);
  }

  async function syncFromCsvUrl(url) {
    if (!url) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const lines = text.split(/\r?\n/).filter(Boolean).slice(1);
      const parsed = lines
        .map((line, i) => {
          const cols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
          if (cols.length < 4) return null;
          return hydrateProduct({
            id: cols[0] || `S-${i + 1}`,
            category: cols[1] || 'electronics',
            catLabel: cols[2] || 'إلكترونيات',
            name: cols[3],
            desc: cols[4] || '',
            priceYer: Number(cols[5]) || 5000,
            priceSar: Number(cols[6]) || 40,
            stock: cols[7] || 'متوفر',
            badge: cols[8] || null,
            image: cols[9] || 'watch.jpg',
          });
        })
        .filter(Boolean);

      if (parsed.length) {
        state.products = parsed;
        state.products.forEach((p) => {
          if (!state.selectedVariants[p.id]) {
            state.selectedVariants[p.id] = p.variants[0].id;
          }
        });
        renderCatalog();
        renderWishlistDrawer();
        renderCartDrawer();
        updateHeaderBadges();
        if (els.sheetStatusText) {
          els.sheetStatusText.textContent = `تمت المزامنة مع Google Sheets (${parsed.length} أصناف محدثة)`;
        }
        if (els.sheetCsvMsg) {
          els.sheetCsvMsg.textContent = `تم تحديث ${parsed.length} منتجات من الجدول بنجاح.`;
        }
        showToast(`تمت مزامنة ${parsed.length} أصناف من Google Sheets`);
      }
    } catch {
      if (els.sheetCsvMsg) {
        els.sheetCsvMsg.textContent = 'تعذر جلب الرابط — تحقق من نشر الجدول بصيغة CSV عامة.';
      }
    }
  }

  function resetCatalogToDefault() {
    state.products = baseProducts.map((p) => ({ ...p }));
    renderCatalog();
    renderWishlistDrawer();
    renderCartDrawer();
    updateHeaderBadges();
    if (els.sheetStatusText) {
      els.sheetStatusText.textContent = 'متصل بنظام Google Sheets — تحديث الأسعار والمخزون لحظياً';
    }
    if (els.sheetCsvMsg) {
      els.sheetCsvMsg.textContent = 'تمت استعادة الكتالوج الافتراضي المدمج.';
    }
    showToast('تمت استعادة بيانات الكتالوج الافتراضية');
  }

  function sendWhatsAppCheckout() {
    const entries = Object.entries(state.cart).filter(([, qty]) => qty > 0);
    if (!entries.length) {
      showToast('السلة فارغة — أضف منتجاً أولاً');
      return;
    }

    const name = els.checkoutName?.value.trim() || 'عميل البوتيك';
    const phone = els.checkoutPhone?.value.trim() || 'غير محدد';
    const addr = els.checkoutAddress?.value.trim() || 'غير محدد';
    const notes = els.checkoutNotes?.value.trim() || '';
    const zones = STORE_CONFIG.deliveryZones || [];
    const zoneId = els.checkoutZone?.value;
    const zone = zones.find((z) => z.id === zoneId) || zones[0];

    const currencyLabel =
      state.currency === 'sar' ? 'ريال سعودي (SAR)' : state.currency === 'usd' ? 'دولار أمريكي (USD)' : 'ريال يمني (YER)';

    const lines = [
      `*طلب جديد — ${STORE_CONFIG.storeName} (الفئة الفاخرة Pro)*`,
      `العميل: ${name}`,
      `الجوال: ${phone}`,
      `الشحن: ${zone ? zone.label : ''} — ${addr}`,
      `العملة: ${currencyLabel}`,
      '--- الأصناف المختارة ---',
    ];

    let subtotal = 0;
    entries.forEach(([key, qty]) => {
      const { productId, variantId } = parseCartKey(key);
      const prod = state.products.find((p) => p.id === productId);
      if (!prod) return;
      const variant = prod.variants.find((v) => v.id === variantId) || prod.variants[0];
      const lineSub = getPrice(prod) * qty;
      subtotal += lineSub;
      lines.push(`- ${prod.name} [${variant.label}] × ${qty} = ${formatMoney(lineSub)}`);
    });

    if (state.currency === 'usd') subtotal = Number(subtotal.toFixed(2));
    else subtotal = Math.round(subtotal);

    const threshold = FREE_SHIPPING_THRESHOLD[state.currency];
    const freeShip = subtotal >= threshold && subtotal > 0;
    const fee = freeShip ? 0 : getZoneFee(zone);
    const discRate = state.appliedCoupon ? STORE_CONFIG.coupons[state.appliedCoupon] || 0 : 0;
    const discAmt = state.currency === 'usd' ? Number((subtotal * discRate).toFixed(2)) : Math.round(subtotal * discRate);
    const grandTotal = Math.max(0, subtotal - discAmt + fee);

    if (discAmt > 0) lines.push(`الخصم (${state.appliedCoupon}): -${formatMoney(discAmt)}`);
    lines.push(`رسوم التوصيل: ${freeShip ? 'مجاني (تجاوز حد الشحن المجاني)' : fee === 0 ? 'مجاني' : formatMoney(fee)}`);
    if (notes) lines.push(`ملاحظات: ${notes}`);
    lines.push(`*الإجمالي النهائي:* ${formatMoney(grandTotal)}`);

    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener');
  }

  function sendDirectProductWhatsApp(productId) {
    const prod = state.products.find((p) => p.id === productId);
    if (!prod) return;
    const variant = getSelectedVariant(prod);
    const qty = state.quickView.qty || 1;
    const total = getPrice(prod) * qty;
    const lines = [
      `*طلب سريع — ${STORE_CONFIG.storeName} (الفئة الفاخرة Pro)*`,
      `المنتج: ${prod.name} (${prod.id})`,
      `الإصدار / اللون: ${variant.label}`,
      `الكمية: ${qty}`,
      `*الإجمالي:* ${formatMoney(total)}`,
    ];
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  }

  function bindEvents() {
    document.querySelectorAll('.curr-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.currency === state.currency);
      btn.addEventListener('click', () => {
        state.currency = btn.dataset.currency;
        localStorage.setItem(STORAGE_KEYS.currency, state.currency);
        document.querySelectorAll('.curr-btn').forEach((b) => b.classList.toggle('active', b === btn));
        renderZonesSelect();
        renderCatalog();
        renderWishlistDrawer();
        renderCartDrawer();
        updateHeaderBadges();
        if (state.quickView.productId && !els.qvModal.hidden) {
          renderQuickView(state.quickView.productId);
        }
      });
    });

    els.catsRow?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-btn');
      if (!btn) return;
      els.catsRow.querySelectorAll('.cat-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.cat;
      renderCatalog();
    });

    els.storeSearch?.addEventListener('input', (e) => {
      state.searchTerm = e.target.value;
      renderCatalog();
    });

    els.storeSort?.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });

    document.addEventListener('click', (e) => {
      const varBtn = e.target.closest('[data-var-prod][data-var-id]');
      if (varBtn) {
        state.selectedVariants[varBtn.dataset.varProd] = varBtn.dataset.varId;
        renderCatalog();
        return;
      }

      const qvVarBtn = e.target.closest('[data-qv-var]');
      if (qvVarBtn && state.quickView.productId) {
        state.selectedVariants[state.quickView.productId] = qvVarBtn.dataset.qvVar;
        renderQuickView(state.quickView.productId);
        renderCatalog();
        return;
      }

      const qvTrigger = e.target.closest('[data-qv-open]');
      if (qvTrigger) {
        openQuickView(qvTrigger.dataset.qvOpen);
        return;
      }

      const wishBtn = e.target.closest('[data-wish-toggle]');
      if (wishBtn) {
        toggleWishlist(wishBtn.dataset.wishToggle);
        return;
      }

      const wishMoveBtn = e.target.closest('[data-wish-move]');
      if (wishMoveBtn) {
        const prod = state.products.find((p) => p.id === wishMoveBtn.dataset.wishMove);
        if (prod && prod.stock !== 'نفدت الكمية') {
          const variant = getSelectedVariant(prod);
          adjustCart(makeCartKey(prod.id, variant.id), 1);
          showToast(`تمت إضافة "${prod.name}" إلى السلة`);
        }
        return;
      }

      const cartActBtn = e.target.closest('[data-cart-act][data-cart-key]');
      if (cartActBtn) {
        const act = cartActBtn.dataset.cartAct;
        const key = cartActBtn.dataset.cartKey;
        if (act === 'del') removeCartItem(key);
        else adjustCart(key, act === 'inc' ? 1 : -1);
        return;
      }

      const couponChip = e.target.closest('[data-apply-coupon]');
      if (couponChip) {
        const code = couponChip.dataset.applyCoupon;
        const openCart = !els.cartDrawer.classList.contains('open') && Object.keys(state.cart).length > 0;
        applyCouponCode(code, openCart);
      }
    });

    els.heroQuickViewBtn?.addEventListener('click', () => {
      if (state.products[0]) openQuickView(state.products[0].id);
    });

    els.qvQtyMinus?.addEventListener('click', () => {
      state.quickView.qty = Math.max(1, state.quickView.qty - 1);
      if (els.qvQtyVal) els.qvQtyVal.textContent = String(state.quickView.qty);
    });

    els.qvQtyPlus?.addEventListener('click', () => {
      state.quickView.qty += 1;
      if (els.qvQtyVal) els.qvQtyVal.textContent = String(state.quickView.qty);
    });

    els.qvAddBtn?.addEventListener('click', () => {
      const prod = state.products.find((p) => p.id === state.quickView.productId);
      if (!prod || prod.stock === 'نفدت الكمية') return;
      const variant = getSelectedVariant(prod);
      adjustCart(makeCartKey(prod.id, variant.id), state.quickView.qty);
      showToast(`أُضيف ${prod.name} (${variant.label}) إلى السلة`);
      closeAllOverlays();
      openDrawer(els.cartDrawer);
    });

    els.qvWishBtn?.addEventListener('click', () => {
      if (state.quickView.productId) toggleWishlist(state.quickView.productId);
    });

    els.qvWaBtn?.addEventListener('click', () => {
      if (state.quickView.productId) sendDirectProductWhatsApp(state.quickView.productId);
    });

    els.openCartBtn?.addEventListener('click', () => {
      renderCartDrawer();
      openDrawer(els.cartDrawer);
    });

    els.openWishlistBtn?.addEventListener('click', () => {
      renderWishlistDrawer();
      openDrawer(els.wishlistDrawer);
    });

    els.wishAddAllBtn?.addEventListener('click', () => {
      let added = 0;
      state.wishlist.forEach((id) => {
        const prod = state.products.find((p) => p.id === id);
        if (prod && prod.stock !== 'نفدت الكمية') {
          const variant = getSelectedVariant(prod);
          adjustCart(makeCartKey(prod.id, variant.id), 1);
          added += 1;
        }
      });
      if (added > 0) {
        showToast(`تم نقل ${added} منتجات من المفضلة إلى السلة`);
        openDrawer(els.cartDrawer);
      }
    });

    els.openSheetModalBtn?.addEventListener('click', openSheetModal);
    els.closeQvBtn?.addEventListener('click', () => closeAllOverlays(true));
    els.closeSheetModalBtn?.addEventListener('click', () => closeAllOverlays(true));
    els.closeCartBtn?.addEventListener('click', () => closeAllOverlays(true));
    els.closeWishlistBtn?.addEventListener('click', () => closeAllOverlays(true));
    els.backdrop?.addEventListener('click', () => closeAllOverlays(true));

    els.checkoutZone?.addEventListener('change', renderCartDrawer);
    els.applyCouponBtn?.addEventListener('click', () => {
      applyCouponCode(els.couponInput?.value, false);
    });

    els.syncCsvBtn?.addEventListener('click', () => {
      const url = els.sheetCsvInput?.value.trim();
      if (url) syncFromCsvUrl(url);
    });

    els.resetSheetBtn?.addEventListener('click', resetCatalogToDefault);
    els.waCheckoutBtn?.addEventListener('click', sendWhatsAppCheckout);

    els.mobileMenuBtn?.addEventListener('click', () => {
      const isHidden = els.mobileNav.hidden;
      els.mobileNav.hidden = !isHidden;
      els.mobileMenuBtn.setAttribute('aria-expanded', String(isHidden));
    });

    els.mobileNav?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        els.mobileNav.hidden = true;
        els.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      });
    });

    els.faqList?.addEventListener('click', (e) => {
      const trigger = e.target.closest('.faq-trigger');
      if (!trigger) return;
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      const panel = trigger.nextElementSibling;
      if (panel) panel.hidden = expanded;
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllOverlays(true);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderZonesSelect();
    renderCatalog();
    renderWishlistDrawer();
    renderCartDrawer();
    updateHeaderBadges();
    bindEvents();

    if (typeof STORE_CONFIG !== 'undefined' && STORE_CONFIG.googleSheetCsvUrl) {
      syncFromCsvUrl(STORE_CONFIG.googleSheetCsvUrl);
    }
  });
})();
