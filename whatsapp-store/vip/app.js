/* =========================================================
   app.js — متجر النخبة السريع | الفئة الملكية VIP ($250)
   Omnichannel Luxury E-Commerce:
   - Smart Custom Bundle Builder (Watch + Audio + Perfume + Gift Box)
   - Live Google Sheets Merchant Editor Simulation (Edit & Sync)
   - Printable / Copyable Tax Invoice & Gift Receipt Modal
   - Multi-Currency (YER / SAR / USD), Variants, Quick-View, Wishlist & Cart -> WhatsApp VIP
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
    cart: 'elite_vip_cart_v1',
    bundles: 'elite_vip_bundles_v1',
    wishlist: 'elite_vip_wishlist_v1',
    currency: 'elite_vip_currency_v1',
  };

  const BUNDLE_SLOT_DEFS = [
    { id: 'P-101', role: 'الساعة الذكية' },
    { id: 'P-102', role: 'الصوتيات اللاسلكية' },
    { id: 'P-105', role: 'طقم العطور الفاخرة' },
    { id: 'P-106', role: 'بوكس الهدية الملكي' },
  ];

  const BUNDLE_PRESETS = {
    royal: ['P-101', 'P-102', 'P-105', 'P-106'],
    trio: ['P-101', 'P-102', 'P-105'],
    gift: ['P-105', 'P-106'],
  };

  const BADGE_OPTIONS = [
    '',
    'الأكثر مبيعاً',
    'خصم اليوم',
    'آخر 3 قطع',
    'ضمان سنة',
    'هدية راقية',
    'إصدار VIP',
  ];

  const PRODUCT_META = {
    'P-101': {
      variants: [
        { id: 'tit', label: 'تيتانيوم أسود', color: '#1E293B' },
        { id: 'slv', label: 'ستيل فضي', color: '#94A3B8' },
        { id: 'chm', label: 'ذهبي بلاتيني', color: '#E5BC66' },
      ],
      specs: [
        'شاشة AMOLED فائقة السطوع مقاس 2.04 بوصة',
        'مقاومة للماء بمعيار IP68 مع بطارية تدوم 10 أيام',
        'مكالمات بلوتوث وقياسات صحية متكاملة',
        'شاحن مغناطيسي سريع + ضمان الوكيل المعتمد',
      ],
    },
    'P-102': {
      variants: [
        { id: 'blk', label: 'أسود مطفي', color: '#18181B' },
        { id: 'emr', label: 'أخضر زمردي', color: '#072E24' },
        { id: 'snd', label: 'رملي بلاتيني', color: '#C9B79C' },
      ],
      specs: [
        'عزل ضوضاء نشط ANC لتجربة استماع نقية',
        'تشغيل مستمر حتى 40 ساعة مع شحن سريع Type-C',
        'اتصال مستقر Bluetooth 5.3 متعدد الأجهزة',
        'تصميم مريح وخفيف للسفر والعمل اليومي',
      ],
    },
    'P-103': {
      variants: [
        { id: 'std', label: 'إصدار أسود برو', color: '#111827' },
        { id: 'cyn', label: 'إصدار نيون أزرق', color: '#0E7490' },
        { id: 'duo', label: 'طقم تحكم ثنائي', color: '#E5BC66' },
      ],
      specs: [
        'استجابة فورية للألعاب بدقة تحكم احترافية',
        'قبضة مريحة مضادة للانزلاق مع اهتزاز تفاعلي',
        'متوافق مع منصات الألعاب والحاسب والواقع الافتراضي',
        'عدسات مريحة للعين مع ضبط البعد البؤري',
      ],
    },
    'P-104': {
      variants: [
        { id: 'kit1', label: 'عدسة 55 مم قياسية', color: '#1F2937' },
        { id: 'kit2', label: 'عدسة + حقيبة حماية', color: '#072E24' },
        { id: 'kit3', label: 'حزمة صناع المحتوى', color: '#E5BC66' },
      ],
      specs: [
        'مستشعر احترافي عالي الوضوح مع عدسة 55 مم',
        'ألوان سينمائية دقيقة لتصوير المنتجات والمحتوى',
        'هيكل مدمج عملي مع تركيز تلقائي سريع',
        'ضمان سنة كاملة وبطارية إضافية أصلية',
      ],
    },
    'P-105': {
      variants: [
        { id: 'oud', label: 'عود وعنبر ملكي', color: '#78350F' },
        { id: 'msk', label: 'مسك وزهور بيضاء', color: '#D4AF37' },
        { id: 'mix', label: 'تشكيلة النخبة', color: '#072E24' },
      ],
      specs: [
        'ثلاث زجاجات عطرية أصلية بتركيز عالٍ وثبات طويل',
        'توازن عطري بين النفحات الشرقية والزهور الفاخرة',
        'عبوات زجاجية مصممة للإهداء والمناسبات الرسمية',
        'تغليف محكم آمن للشحن داخل اليمن والخليج',
      ],
    },
    'P-106': {
      variants: [
        { id: 'obs', label: 'تغليف أوبسيديان وذهبي', color: '#080C12' },
        { id: 'for', label: 'تغليف زمردي ملكي', color: '#072E24' },
        { id: 'crm', label: 'تغليف كريمي فاخر', color: '#E5D3B3' },
      ],
      specs: [
        'صندوق هدايا صلب ببطانة مخملية فاخرة',
        'بطاقة إهداء مخصصة مع شريط ساتان بلاتيني',
        'حماية فائقة للقطع التقنية والعطور أثناء الشحن',
        'تجهيز فوري لإرسال الهدية باسم العميل مباشرة',
      ],
    },
  };

  const DEFAULT_VARIANTS = [
    { id: 'std', label: 'الإصدار القياسي', color: '#1E293B' },
    { id: 'vip', label: 'إصدار VIP الذهبي', color: '#E5BC66' },
  ];

  const SVG = {
    plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    heart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function resolveImage(rawPath) {
    const file = String(rawPath || '').split('/').pop();
    return IMAGE_PREFIX + (ALLOWED_IMAGES.has(file) ? file : 'watch.jpg');
  }

  function hydrateProduct(raw) {
    const meta = PRODUCT_META[raw.id] || {};
    const priceSar = Number(raw.priceSar) || 100;
    const priceYer = Number(raw.priceYer) || Math.round(priceSar * 137);
    const yerPerSar = priceSar > 0 ? priceYer / priceSar : 137;
    return {
      ...raw,
      priceSar,
      priceYer,
      yerPerSar,
      image: resolveImage(raw.image),
      variants: meta.variants || DEFAULT_VARIANTS,
      specs: meta.specs || [raw.desc || 'منتج أصلي مضمون من متجر النخبة السريع'],
    };
  }

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage errors
    }
  }

  const baseProducts = (typeof DEFAULT_PRODUCTS !== 'undefined' ? DEFAULT_PRODUCTS : []).map(hydrateProduct);

  function cloneSheetRows(productsList) {
    return productsList.map((p) => ({
      id: p.id,
      priceSar: p.priceSar,
      stock: p.stock,
      badge: p.badge || '',
    }));
  }

  const state = {
    products: baseProducts.map((p) => ({ ...p })),
    sheetDraft: cloneSheetRows(baseProducts),
    activeCategory: 'all',
    searchTerm: '',
    sortBy: 'default',
    currency: localStorage.getItem(STORAGE_KEYS.currency) || 'yer',
    appliedCoupon: null,
    selectedVariants: {},
    bundleSelection: new Set(BUNDLE_PRESETS.royal),
    bundleVariants: {},
    activePreset: 'royal',
    cart: readStorage(STORAGE_KEYS.cart, {}),
    bundles: readStorage(STORAGE_KEYS.bundles, []),
    wishlist: readStorage(STORAGE_KEYS.wishlist, []),
    quickView: {
      productId: null,
      qty: 1,
    },
    invoiceMode: 'tax',
    invoiceRef: `ELV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    invoicePreviewBundleOnly: false,
  };

  if (!['yer', 'sar', 'usd'].includes(state.currency)) {
    state.currency = 'yer';
  }

  state.products.forEach((p) => {
    state.selectedVariants[p.id] = p.variants[0].id;
    state.bundleVariants[p.id] = p.variants[0].id;
  });

  const els = {
    sheetStatusText: document.getElementById('sheetStatusText'),
    openWishlistBtn: document.getElementById('openWishlistBtn'),
    headWishlistCount: document.getElementById('headWishlistCount'),
    openInvoiceHeaderBtn: document.getElementById('openInvoiceHeaderBtn'),
    openCartBtn: document.getElementById('openCartBtn'),
    headCartCount: document.getElementById('headCartCount'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileNav: document.getElementById('mobileNav'),
    heroBundlePreviewPrice: document.getElementById('heroBundlePreviewPrice'),
    bundleTierBar: document.getElementById('bundleTierBar'),
    bundleSlotsGrid: document.getElementById('bundleSlotsGrid'),
    bundleTierTitle: document.getElementById('bundleTierTitle'),
    bundleDiscountBadge: document.getElementById('bundleDiscountBadge'),
    bundleSelectedList: document.getElementById('bundleSelectedList'),
    bundleRecipient: document.getElementById('bundleRecipient'),
    bundleRibbon: document.getElementById('bundleRibbon'),
    bundleGiftMessage: document.getElementById('bundleGiftMessage'),
    bundleTotalsBox: document.getElementById('bundleTotalsBox'),
    addBundleToCartBtn: document.getElementById('addBundleToCartBtn'),
    bundleQuickInvoiceBtn: document.getElementById('bundleQuickInvoiceBtn'),
    bundleWaBtn: document.getElementById('bundleWaBtn'),
    barShippingCard: document.getElementById('barShippingCard'),
    barShippingText: document.getElementById('barShippingText'),
    barShippingPct: document.getElementById('barShippingPct'),
    barShippingFill: document.getElementById('barShippingFill'),
    storeSearch: document.getElementById('storeSearch'),
    catsRow: document.getElementById('catsRow'),
    storeSort: document.getElementById('storeSort'),
    catalogCount: document.getElementById('catalogCount'),
    prodGrid: document.getElementById('prodGrid'),
    merchantStudioCard: document.getElementById('merchantStudioCard'),
    sheetLastSync: document.getElementById('sheetLastSync'),
    sheetSyncBadge: document.getElementById('sheetSyncBadge'),
    merchantResetBtn: document.getElementById('merchantResetBtn'),
    merchantSyncBtn: document.getElementById('merchantSyncBtn'),
    merchantSheetBody: document.getElementById('merchantSheetBody'),
    sheetCsvInput: document.getElementById('sheetCsvInput'),
    syncCsvBtn: document.getElementById('syncCsvBtn'),
    sheetCsvMsg: document.getElementById('sheetCsvMsg'),
    merchantDiffLog: document.getElementById('merchantDiffLog'),
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
    wishlistDrawer: document.getElementById('wishlistDrawer'),
    closeWishlistBtn: document.getElementById('closeWishlistBtn'),
    wishlistItems: document.getElementById('wishlistItems'),
    wishAddAllBtn: document.getElementById('wishAddAllBtn'),
    cartDrawer: document.getElementById('cartDrawer'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    drawerShippingBox: document.getElementById('drawerShippingBox'),
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
    openInvoiceFromCartBtn: document.getElementById('openInvoiceFromCartBtn'),
    waCheckoutBtn: document.getElementById('waCheckoutBtn'),
    invoiceModal: document.getElementById('invoiceModal'),
    closeInvoiceBtn: document.getElementById('closeInvoiceBtn'),
    invoicePaper: document.getElementById('invoicePaper'),
    invoiceModalTitle: document.getElementById('invoiceModalTitle'),
    invSubtitle: document.getElementById('invSubtitle'),
    invRefDisplay: document.getElementById('invRefDisplay'),
    invDateDisplay: document.getElementById('invDateDisplay'),
    invCustomerBox: document.getElementById('invCustomerBox'),
    invGiftBanner: document.getElementById('invGiftBanner'),
    invTableHead: document.getElementById('invTableHead'),
    invTableBody: document.getElementById('invTableBody'),
    invCurrencyBadge: document.getElementById('invCurrencyBadge'),
    invTotalsCard: document.getElementById('invTotalsCard'),
    copyInvoiceBtn: document.getElementById('copyInvoiceBtn'),
    printInvoiceBtn: document.getElementById('printInvoiceBtn'),
    invoiceWaBtn: document.getElementById('invoiceWaBtn'),
    vipToast: document.getElementById('vipToast'),
  };

  let toastTimer = null;

  function showToast(msg) {
    if (!els.vipToast) return;
    els.vipToast.textContent = msg;
    els.vipToast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.vipToast.hidden = true;
    }, 3000);
  }

  function roundCurrency(value) {
    const num = Number(value) || 0;
    return state.currency === 'usd' ? Number(num.toFixed(2)) : Math.round(num);
  }

  function getPriceFromSar(sar, yer) {
    if (state.currency === 'sar') return Number(sar) || 0;
    if (state.currency === 'usd') return Number(((Number(sar) || 0) / 3.75).toFixed(2));
    return Number(yer) || 0;
  }

  function getPrice(item) {
    return getPriceFromSar(item.priceSar, item.priceYer);
  }

  function getZoneFee(zone) {
    if (!zone) return 0;
    return getPriceFromSar(zone.feeSar, zone.feeYer);
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

  function getSelectedVariant(product, map = state.selectedVariants) {
    const varId = map[product.id];
    return product.variants.find((v) => v.id === varId) || product.variants[0];
  }

  function makeCartKey(productId, variantId) {
    return `${productId}::${variantId}`;
  }

  function parseCartKey(key) {
    const [productId, variantId] = String(key).split('::');
    return { productId, variantId };
  }

  function getBundleDiscountMeta(count) {
    if (count >= 4) {
      return { rate: 0.18, pct: 18, title: 'الباقة الملكية الكاملة', tierCount: 4 };
    }
    if (count === 3) {
      return { rate: 0.10, pct: 10, title: 'الباقة الثلاثية الذكية', tierCount: 3 };
    }
    if (count === 2) {
      return { rate: 0.05, pct: 5, title: 'باقة الإهداء الثنائية', tierCount: 2 };
    }
    return { rate: 0, pct: 0, title: 'تشكيلة مخصصة (أضف قطعتين للخصم)', tierCount: 0 };
  }

  function computeActiveBuilderTotals() {
    const selectedItems = BUNDLE_SLOT_DEFS
      .map((slot) => state.products.find((p) => p.id === slot.id))
      .filter((p) => p && state.bundleSelection.has(p.id) && p.stock !== 'نفدت الكمية');

    const rawTotal = roundCurrency(selectedItems.reduce((sum, p) => sum + getPrice(p), 0));
    const meta = getBundleDiscountMeta(selectedItems.length);
    const discountAmt = roundCurrency(rawTotal * meta.rate);
    const netTotal = Math.max(0, roundCurrency(rawTotal - discountAmt));

    return { selectedItems, rawTotal, meta, discountAmt, netTotal };
  }

  function computeBundleEntryPricing(bundle) {
    let rawUnit = 0;
    const resolvedItems = (bundle.items || []).map((entry) => {
      const prod = state.products.find((p) => p.id === entry.id);
      const variant = prod ? prod.variants.find((v) => v.id === entry.variantId) || prod.variants[0] : null;
      const unitPrice = prod ? getPrice(prod) : 0;
      rawUnit += unitPrice;
      return {
        id: entry.id,
        name: prod ? prod.name : entry.name || entry.id,
        variantLabel: variant ? variant.label : entry.variantLabel || '',
        unitPrice,
      };
    });

    rawUnit = roundCurrency(rawUnit);
    const meta = getBundleDiscountMeta(resolvedItems.length);
    const discountUnit = roundCurrency(rawUnit * meta.rate);
    const netUnit = Math.max(0, roundCurrency(rawUnit - discountUnit));
    const qty = Math.max(1, Number(bundle.qty) || 1);

    return {
      resolvedItems,
      meta,
      rawLine: roundCurrency(rawUnit * qty),
      discountLine: roundCurrency(discountUnit * qty),
      netUnit,
      netLine: roundCurrency(netUnit * qty),
      qty,
    };
  }

  function computeCartFinancials() {
    let itemSubtotal = 0;
    let bundleRawTotal = 0;
    let bundleSavings = 0;
    let bundleNetTotal = 0;
    let totalCount = 0;

    Object.entries(state.cart).forEach(([key, qty]) => {
      if (qty <= 0) return;
      const { productId } = parseCartKey(key);
      const prod = state.products.find((p) => p.id === productId);
      if (!prod) return;
      itemSubtotal += getPrice(prod) * qty;
      totalCount += qty;
    });

    state.bundles.forEach((bnd) => {
      const pricing = computeBundleEntryPricing(bnd);
      bundleRawTotal += pricing.rawLine;
      bundleSavings += pricing.discountLine;
      bundleNetTotal += pricing.netLine;
      totalCount += pricing.qty;
    });

    itemSubtotal = roundCurrency(itemSubtotal);
    bundleRawTotal = roundCurrency(bundleRawTotal);
    bundleSavings = roundCurrency(bundleSavings);
    bundleNetTotal = roundCurrency(bundleNetTotal);

    const subtotalAfterBundles = roundCurrency(itemSubtotal + bundleNetTotal);
    const discRate = state.appliedCoupon ? STORE_CONFIG.coupons?.[state.appliedCoupon] || 0 : 0;
    const couponDiscount = roundCurrency(subtotalAfterBundles * discRate);
    const taxableNet = Math.max(0, roundCurrency(subtotalAfterBundles - couponDiscount));

    const zones = STORE_CONFIG.deliveryZones || [];
    const zoneId = els.checkoutZone?.value || zones[0]?.id;
    const zone = zones.find((z) => z.id === zoneId) || zones[0];
    const threshold = FREE_SHIPPING_THRESHOLD[state.currency];
    const freeShippingUnlocked = subtotalAfterBundles >= threshold && subtotalAfterBundles > 0;
    const rawZoneFee = getZoneFee(zone);
    const deliveryFee = subtotalAfterBundles === 0 || freeShippingUnlocked ? 0 : rawZoneFee;
    const grandTotal = roundCurrency(taxableNet + deliveryFee);
    const vatIncluded = roundCurrency((grandTotal * 15) / 115);

    return {
      totalCount,
      itemSubtotal,
      bundleRawTotal,
      bundleSavings,
      bundleNetTotal,
      subtotalAfterBundles,
      couponDiscount,
      zone,
      rawZoneFee,
      freeShippingUnlocked,
      deliveryFee,
      grandTotal,
      vatIncluded,
    };
  }

  function updateShippingBars() {
    const fin = computeCartFinancials();
    const threshold = FREE_SHIPPING_THRESHOLD[state.currency];
    const pct = Math.min(100, Math.round((fin.subtotalAfterBundles / threshold) * 100));
    const remaining = Math.max(0, roundCurrency(threshold - fin.subtotalAfterBundles));

    const text = fin.freeShippingUnlocked
      ? 'تهانينا! تأهلت للشحن المجاني الملكي'
      : `أضف منتجات أو باقات بقيمة ${formatMoney(remaining)} لتفعيل الشحن المجاني`;

    if (els.barShippingText) els.barShippingText.textContent = text;
    if (els.barShippingPct) els.barShippingPct.textContent = `${pct}%`;
    if (els.barShippingFill) els.barShippingFill.style.width = `${pct}%`;
    if (els.barShippingCard) {
      els.barShippingCard.classList.toggle('unlocked', fin.freeShippingUnlocked);
      const track = els.barShippingCard.querySelector('.shipping-track');
      if (track) track.setAttribute('aria-valuenow', String(pct));
    }

    if (els.drawerShippingText) els.drawerShippingText.textContent = text;
    if (els.drawerShippingPct) els.drawerShippingPct.textContent = `${pct}%`;
    if (els.drawerShippingFill) els.drawerShippingFill.style.width = `${pct}%`;
    if (els.drawerShippingBox) els.drawerShippingBox.classList.toggle('unlocked', fin.freeShippingUnlocked);
  }

  function updateHeaderBadges() {
    const fin = computeCartFinancials();
    if (els.headCartCount) els.headCartCount.textContent = String(fin.totalCount);
    if (els.headWishlistCount) els.headWishlistCount.textContent = String(state.wishlist.length);

    const royalIds = BUNDLE_PRESETS.royal;
    const royalRaw = royalIds.reduce((sum, id) => {
      const p = state.products.find((item) => item.id === id);
      return sum + (p ? getPrice(p) : 0);
    }, 0);
    const royalNet = roundCurrency(royalRaw * 0.82);
    if (els.heroBundlePreviewPrice) {
      els.heroBundlePreviewPrice.textContent = formatMoney(royalNet);
    }
  }

  function renderBundleBuilder() {
    if (!els.bundleSlotsGrid) return;

    els.bundleSlotsGrid.innerHTML = BUNDLE_SLOT_DEFS.map((slot) => {
      const prod = state.products.find((p) => p.id === slot.id);
      if (!prod) return '';
      const out = prod.stock === 'نفدت الكمية';
      if (out && state.bundleSelection.has(prod.id)) {
        state.bundleSelection.delete(prod.id);
      }

      const selected = state.bundleSelection.has(prod.id) && !out;
      const activeVar = getSelectedVariant(prod, state.bundleVariants);

      const varPills = prod.variants
        .map(
          (v) => `
          <button
            type="button"
            class="slot-var-pill ${v.id === activeVar.id ? 'active' : ''}"
            data-bundle-var-prod="${prod.id}"
            data-bundle-var-id="${v.id}"
          >
            <span class="var-swatch" style="background:${v.color};" aria-hidden="true"></span>
            <span>${v.label}</span>
          </button>
        `
        )
        .join('');

      return `
        <article class="bundle-slot-card ${selected ? 'selected' : ''}">
          <div class="slot-media">
            <img src="${prod.image}" alt="${escapeHtml(prod.name)}" />
            <span class="slot-role-tag">${slot.role}</span>
            <button
              type="button"
              class="slot-toggle-btn"
              data-bundle-toggle="${prod.id}"
              ${out ? 'disabled' : ''}
            >
              ${out ? 'نفدت الكمية' : selected ? 'مضافة للباقة' : 'إضافة للباقة'}
            </button>
          </div>

          <div class="slot-body">
            <div class="slot-head">
              <h3>${escapeHtml(prod.name)}</h3>
              <span class="slot-price num-font">${formatMoney(getPrice(prod))}</span>
            </div>
            <div class="slot-stock-line">الرمز: <span class="num-font">${prod.id}</span> · الحالة: <strong>${escapeHtml(prod.stock)}</strong></div>
            <div class="slot-variants">${varPills}</div>
          </div>
        </article>
      `;
    }).join('');

    const { selectedItems, rawTotal, meta, discountAmt, netTotal } = computeActiveBuilderTotals();

    if (els.bundleTierBar) {
      els.bundleTierBar.querySelectorAll('.tier-step').forEach((step) => {
        const tierCount = Number(step.dataset.tierCount);
        step.classList.toggle('active', meta.tierCount === tierCount);
      });
    }

    document.querySelectorAll('.preset-chip').forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.bundlePreset === state.activePreset);
    });

    if (els.bundleTierTitle) els.bundleTierTitle.textContent = meta.title;
    if (els.bundleDiscountBadge) {
      els.bundleDiscountBadge.textContent = meta.pct > 0 ? `-${meta.pct}%` : '0%';
    }

    if (els.bundleSelectedList) {
      els.bundleSelectedList.innerHTML = selectedItems.length
        ? selectedItems
            .map((p) => {
              const v = getSelectedVariant(p, state.bundleVariants);
              return `
                <li>
                  <div>
                    <strong>${escapeHtml(p.name)}</strong>
                    <small>${escapeHtml(v.label)}</small>
                  </div>
                  <span class="num-font">${formatMoney(getPrice(p))}</span>
                </li>
              `;
            })
            .join('')
        : '<li><span>اختر قطعتين على الأقل لتكوين باقة بخصم فوري.</span></li>';
    }

    if (els.bundleTotalsBox) {
      els.bundleTotalsBox.innerHTML = `
        <div class="bt-row"><span>قيمة القطع منفردة</span><span class="num-font" style="text-decoration:line-through;">${formatMoney(rawTotal)}</span></div>
        <div class="bt-row discount"><span>خصم الباقة التلقائي (${meta.pct}%)</span><span class="num-font">-${formatMoney(discountAmt)}</span></div>
        <div class="bt-row grand"><span>سعر الباقة النهائي</span><span class="num-font">${formatMoney(netTotal)}</span></div>
      `;
    }

    const disableActions = selectedItems.length === 0;
    if (els.addBundleToCartBtn) els.addBundleToCartBtn.disabled = disableActions;
    if (els.bundleQuickInvoiceBtn) els.bundleQuickInvoiceBtn.disabled = disableActions;
    if (els.bundleWaBtn) els.bundleWaBtn.disabled = disableActions;
  }

  function renderCatalog() {
    if (!els.prodGrid) return;

    const q = state.searchTerm.trim().toLowerCase();
    const list = state.products.filter((p) => {
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
      list.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (state.sortBy === 'price-desc') {
      list.sort((a, b) => getPrice(b) - getPrice(a));
    }

    if (els.catalogCount) {
      els.catalogCount.textContent =
        list.length === 0
          ? 'لا توجد منتجات مطابقة'
          : `يعرض ${list.length} ${list.length === 1 ? 'منتج' : 'منتجات'}`;
    }

    if (!list.length) {
      els.prodGrid.innerHTML =
        '<div class="empty-box" style="grid-column:1/-1;background:var(--obsidian-card);color:var(--muted-light);border-color:var(--obsidian-border);">لم يتم العثور على منتجات مطابقة للبحث.</div>';
      return;
    }

    els.prodGrid.innerHTML = list
      .map((p) => {
        const activeVar = getSelectedVariant(p);
        const cartKey = makeCartKey(p.id, activeVar.id);
        const qty = state.cart[cartKey] || 0;
        const out = p.stock === 'نفدت الكمية';
        const wished = state.wishlist.includes(p.id);

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
              <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" data-qv-open="${p.id}" />
              ${p.badge ? `<span class="prod-badge">${escapeHtml(p.badge)}</span>` : ''}
              <span class="stock-pill ${stockBadgeClass(p.stock)}">${escapeHtml(p.stock)}</span>
              <div class="prod-media-actions">
                <button type="button" class="media-action-btn ${wished ? 'wish-active' : ''}" data-wish-toggle="${p.id}" aria-label="إضافة للمفضلة">${SVG.heart}</button>
                <button type="button" class="media-action-btn" data-qv-open="${p.id}" aria-label="معاينة سريعة">${SVG.eye}</button>
              </div>
            </div>

            <div class="prod-body">
              <div class="prod-top-meta">
                <span class="prod-cat">${escapeHtml(p.catLabel)}</span>
                <span class="prod-sku num-font">${escapeHtml(p.id)}</span>
              </div>
              <button type="button" class="prod-title-btn" data-qv-open="${p.id}">${escapeHtml(p.name)}</button>
              <p class="prod-desc">${escapeHtml(p.desc)}</p>

              <div class="variant-section">
                <span class="variant-label">الإصدار / اللون: <strong>${escapeHtml(activeVar.label)}</strong></span>
                <div class="variant-pills">${variantsHtml}</div>
              </div>

              <div class="prod-footer">
                <div class="prod-price-col">
                  <small>السعر المحدث</small>
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

  function hasPendingSheetChanges() {
    return state.sheetDraft.some((draft) => {
      const live = state.products.find((p) => p.id === draft.id);
      if (!live) return false;
      return (
        Number(draft.priceSar) !== Number(live.priceSar) ||
        draft.stock !== live.stock ||
        (draft.badge || '') !== (live.badge || '')
      );
    });
  }

  function updateSheetBadgeUi() {
    if (!els.sheetSyncBadge) return;
    const pending = hasPendingSheetChanges();
    els.sheetSyncBadge.className = `sheet-sync-badge ${pending ? 'pending' : 'synced'}`;
    els.sheetSyncBadge.textContent = pending ? 'تعديلات معلقة — اضغط مزامنة' : 'متزامن مع المتجر';
  }

  function renderMerchantSheet() {
    if (!els.merchantSheetBody) return;

    els.merchantSheetBody.innerHTML = state.products
      .map((prod, idx) => {
        const draft = state.sheetDraft.find((d) => d.id === prod.id) || {
          id: prod.id,
          priceSar: prod.priceSar,
          stock: prod.stock,
          badge: prod.badge || '',
        };
        const isPending =
          Number(draft.priceSar) !== Number(prod.priceSar) ||
          draft.stock !== prod.stock ||
          (draft.badge || '') !== (prod.badge || '');

        const equivYer = Math.round((Number(draft.priceSar) || 0) * prod.yerPerSar);
        const equivUsd = ((Number(draft.priceSar) || 0) / 3.75).toFixed(2);

        const badgeOpts = BADGE_OPTIONS.map(
          (b) => `<option value="${escapeHtml(b)}" ${(draft.badge || '') === b ? 'selected' : ''}>${b || 'بدون شارة'}</option>`
        ).join('');

        return `
          <tr class="${isPending ? 'pending-row' : ''}" data-sheet-row="${prod.id}">
            <td class="num-font">${idx + 1}</td>
            <td class="num-font" dir="ltr"><strong>${escapeHtml(prod.id)}</strong></td>
            <td>
              <div class="sheet-prod-cell">
                <img src="${prod.image}" alt="${escapeHtml(prod.name)}" />
                <strong>${escapeHtml(prod.name)}</strong>
              </div>
            </td>
            <td>${escapeHtml(prod.catLabel)}</td>
            <td>
              <input
                type="number"
                class="sheet-input-sar"
                data-sheet-sar="${prod.id}"
                value="${draft.priceSar}"
                min="1"
                step="1"
                aria-label="سعر ${escapeHtml(prod.name)} بالريال السعودي"
              />
            </td>
            <td class="sheet-equiv num-font" data-sheet-equiv="${prod.id}">
              ${equivYer.toLocaleString('en-US')} ر.ي · $${equivUsd}
            </td>
            <td>
              <select class="sheet-select" data-sheet-stock="${prod.id}" aria-label="توفر ${escapeHtml(prod.name)}">
                <option value="متوفر" ${draft.stock === 'متوفر' ? 'selected' : ''}>متوفر</option>
                <option value="كمية محدودة" ${draft.stock === 'كمية محدودة' ? 'selected' : ''}>كمية محدودة</option>
                <option value="نفدت الكمية" ${draft.stock === 'نفدت الكمية' ? 'selected' : ''}>نفدت الكمية</option>
              </select>
            </td>
            <td>
              <select class="sheet-select" data-sheet-badge="${prod.id}" aria-label="شارة ${escapeHtml(prod.name)}">
                ${badgeOpts}
              </select>
            </td>
          </tr>
        `;
      })
      .join('');

    updateSheetBadgeUi();
  }

  function syncMerchantSheetEdits() {
    const diffs = [];
    state.sheetDraft.forEach((draft) => {
      const prod = state.products.find((p) => p.id === draft.id);
      if (!prod) return;

      const nextSar = Math.max(1, Math.round(Number(draft.priceSar) || prod.priceSar));
      const nextYer = Math.round(nextSar * prod.yerPerSar);
      const nextStock = draft.stock;
      const nextBadge = draft.badge || null;

      if (nextSar !== prod.priceSar) {
        diffs.push(`${prod.id}: السعر ${prod.priceSar} إلى ${nextSar} ر.س`);
      }
      if (nextStock !== prod.stock) {
        diffs.push(`${prod.id}: المخزون "${prod.stock}" إلى "${nextStock}"`);
      }
      if ((nextBadge || '') !== (prod.badge || '')) {
        diffs.push(`${prod.id}: الشارة "${nextBadge || 'بدون'}"`);
      }

      prod.priceSar = nextSar;
      prod.priceYer = nextYer;
      prod.stock = nextStock;
      prod.badge = nextBadge;
      draft.priceSar = nextSar;
    });

    const nowStr = new Date().toLocaleTimeString('en-GB', { hour12: false });
    if (els.sheetLastSync) {
      els.sheetLastSync.textContent = `آخر مزامنة: ${nowStr}`;
    }
    if (els.sheetStatusText) {
      els.sheetStatusText.textContent = `متصل بجدول Google Sheets — آخر مزامنة ${nowStr}`;
    }

    if (els.merchantDiffLog) {
      els.merchantDiffLog.innerHTML = diffs.length
        ? diffs.map((d) => `<li>${escapeHtml(d)}</li>`).join('')
        : `<li>تمت المزامنة (${nowStr}) — كافة الخلايا مطابقة للمتجر.</li>`;
    }

    renderMerchantSheet();
    renderBundleBuilder();
    renderCatalog();
    renderWishlistDrawer();
    renderCartDrawer();
    updateHeaderBadges();
    if (state.quickView.productId && !els.qvModal.hidden) {
      renderQuickView(state.quickView.productId);
    }
    if (!els.invoiceModal.hidden) {
      renderInvoiceModal();
    }

    showToast(
      diffs.length
        ? `تمت مزامنة ${diffs.length} تحديثات من Google Sheets مع المتجر`
        : 'تم تأكيد المزامنة مع Google Sheets'
    );
  }

  function resetMerchantSheet() {
    state.products = baseProducts.map((p) => ({ ...p }));
    state.sheetDraft = cloneSheetRows(state.products);
    if (els.sheetLastSync) els.sheetLastSync.textContent = 'تمت الاستعادة للقيم الافتراضية';
    if (els.sheetStatusText) {
      els.sheetStatusText.textContent = 'متصل بنظام Google Sheets — القيم الأصلية مفعلة';
    }
    if (els.merchantDiffLog) {
      els.merchantDiffLog.innerHTML = '<li>تمت استعادة الأسعار وحالة المخزون الأصلية لجميع الأصناف.</li>';
    }
    renderMerchantSheet();
    renderBundleBuilder();
    renderCatalog();
    renderWishlistDrawer();
    renderCartDrawer();
    updateHeaderBadges();
    showToast('تمت استعادة أسعار ومخزون الكتالوج الافتراضية');
  }

  function renderZonesSelect() {
    if (!els.checkoutZone) return;
    const prev = els.checkoutZone.value;
    const zones = STORE_CONFIG.deliveryZones || [];
    els.checkoutZone.innerHTML = zones
      .map((z) => {
        const fee = getZoneFee(z);
        const label = fee === 0 ? 'مجاني' : formatMoney(fee);
        return `<option value="${z.id}">${escapeHtml(z.label)} (${label})</option>`;
      })
      .join('');
    if (prev && zones.some((z) => z.id === prev)) {
      els.checkoutZone.value = prev;
    }
  }

  function renderCartDrawer() {
    if (!els.cartItems || !els.totalsBox) return;

    const itemEntries = Object.entries(state.cart).filter(([, qty]) => qty > 0);
    const hasAny = itemEntries.length > 0 || state.bundles.length > 0;

    if (!hasAny) {
      els.cartItems.innerHTML =
        '<div class="empty-box">السلة فارغة — أضف منتجات منفردة أو كوّن باقة مخصصة بخصم حتى 18%.</div>';
    } else {
      const bundlesHtml = state.bundles
        .map((bnd) => {
          const pricing = computeBundleEntryPricing(bnd);
          const itemsLis = pricing.resolvedItems
            .map(
              (it) =>
                `<li>• ${escapeHtml(it.name)} (${escapeHtml(it.variantLabel)})</li>`
            )
            .join('');
          const giftInfo = bnd.recipient
            ? `<small>إهداء إلى: ${escapeHtml(bnd.recipient)} · ${escapeHtml(bnd.ribbon || '')}</small>`
            : '';

          return `
            <div class="cart-bundle-item">
              <div class="cart-bundle-head">
                <div class="cart-bundle-title">
                  <strong>${escapeHtml(pricing.meta.title)} (${pricing.resolvedItems.length} قطع)</strong>
                  <small>خصم باقة تلقائي -${pricing.meta.pct}%</small>
                  ${giftInfo}
                </div>
                <button type="button" class="btn-remove-mini" data-bundle-del="${escapeHtml(bnd.uid)}" aria-label="حذف الباقة">${SVG.trash}</button>
              </div>
              <ul class="cart-bundle-items">${itemsLis}</ul>
              <div class="cart-bundle-foot">
                <div class="qty-ctrl">
                  <button type="button" class="qty-btn" data-bundle-act="dec" data-bundle-uid="${escapeHtml(bnd.uid)}" aria-label="إنقاص">-</button>
                  <span class="qty-val num-font">${pricing.qty}</span>
                  <button type="button" class="qty-btn" data-bundle-act="inc" data-bundle-uid="${escapeHtml(bnd.uid)}" aria-label="زيادة">+</button>
                </div>
                <span class="num-font">${formatMoney(pricing.netLine)}</span>
              </div>
            </div>
          `;
        })
        .join('');

      const itemsHtml = itemEntries
        .map(([key, qty]) => {
          const { productId, variantId } = parseCartKey(key);
          const prod = state.products.find((p) => p.id === productId);
          if (!prod) return '';
          const variant = prod.variants.find((v) => v.id === variantId) || prod.variants[0];
          const lineSub = roundCurrency(getPrice(prod) * qty);
          return `
            <div class="cart-item">
              <img src="${prod.image}" alt="${escapeHtml(prod.name)}" />
              <div class="cart-item-info">
                <strong>${escapeHtml(prod.name)}</strong>
                <span class="cart-variant-tag">${escapeHtml(variant.label)}</span>
                <span class="cart-item-price num-font">${formatMoney(lineSub)}</span>
              </div>
              <div class="qty-ctrl">
                <button type="button" class="qty-btn" data-cart-act="dec" data-cart-key="${key}" aria-label="إنقاص">-</button>
                <span class="qty-val num-font">${qty}</span>
                <button type="button" class="qty-btn" data-cart-act="inc" data-cart-key="${key}" aria-label="زيادة">+</button>
              </div>
              <button type="button" class="btn-remove-mini" data-cart-act="del" data-cart-key="${key}" aria-label="حذف">${SVG.trash}</button>
            </div>
          `;
        })
        .join('');

      els.cartItems.innerHTML = bundlesHtml + itemsHtml;
    }

    const fin = computeCartFinancials();
    const shippingLabel =
      fin.subtotalAfterBundles === 0
        ? formatMoney(0)
        : fin.freeShippingUnlocked
          ? 'مجاني (تجاوز حد الشحن)'
          : fin.rawZoneFee === 0
            ? 'مجاني'
            : formatMoney(fin.deliveryFee);

    els.totalsBox.innerHTML = `
      <div class="totals-line"><span>إجمالي الطلب قبل الخصم</span><strong class="num-font">${formatMoney(roundCurrency(fin.itemSubtotal + fin.bundleRawTotal))}</strong></div>
      ${
        fin.bundleSavings > 0
          ? `<div class="totals-line discount"><span>خصم الباقات الذكي</span><strong class="num-font">-${formatMoney(fin.bundleSavings)}</strong></div>`
          : ''
      }
      ${
        fin.couponDiscount > 0
          ? `<div class="totals-line discount"><span>خصم الكوبون (<span class="num-font">${escapeHtml(state.appliedCoupon)}</span>)</span><strong class="num-font">-${formatMoney(fin.couponDiscount)}</strong></div>`
          : ''
      }
      <div class="totals-line"><span>${escapeHtml(fin.zone ? fin.zone.label : 'التوصيل')}</span><strong>${shippingLabel}</strong></div>
      <div class="totals-line grand"><span>الإجمالي النهائي</span><span class="num-font">${formatMoney(fin.grandTotal)}</span></div>
    `;

    updateShippingBars();
  }

  function renderWishlistDrawer() {
    if (!els.wishlistItems) return;
    const valid = state.wishlist.filter((id) => state.products.some((p) => p.id === id));
    if (valid.length !== state.wishlist.length) {
      state.wishlist = valid;
      writeStorage(STORAGE_KEYS.wishlist, state.wishlist);
    }

    if (!valid.length) {
      els.wishlistItems.innerHTML =
        '<div class="empty-box">قائمة المفضلة فارغة — اضغط أيقونة القلب لحفظ المنتجات التي تهمك.</div>';
      if (els.wishAddAllBtn) els.wishAddAllBtn.disabled = true;
      return;
    }

    if (els.wishAddAllBtn) els.wishAddAllBtn.disabled = false;

    els.wishlistItems.innerHTML = valid
      .map((id) => {
        const prod = state.products.find((p) => p.id === id);
        if (!prod) return '';
        const activeVar = getSelectedVariant(prod);
        const out = prod.stock === 'نفدت الكمية';
        return `
          <div class="wish-item">
            <img src="${prod.image}" alt="${escapeHtml(prod.name)}" />
            <div class="wish-item-info">
              <strong>${escapeHtml(prod.name)}</strong>
              <span class="cart-variant-tag">${escapeHtml(activeVar.label)}</span>
              <span class="wish-item-price num-font">${formatMoney(getPrice(prod))}</span>
            </div>
            <button type="button" class="btn-obsidian-sm" style="padding:0.42rem 0.72rem;" data-wish-move="${prod.id}" ${out ? 'disabled' : ''}>
              ${out ? 'نفدت' : 'للسلة'}
            </button>
            <button type="button" class="btn-remove-mini" data-wish-toggle="${prod.id}" aria-label="حذف">${SVG.trash}</button>
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

  function adjustBundleQty(uid, delta) {
    const idx = state.bundles.findIndex((b) => b.uid === uid);
    if (idx < 0) return;
    const next = (state.bundles[idx].qty || 1) + delta;
    if (next <= 0) state.bundles.splice(idx, 1);
    else state.bundles[idx].qty = next;
    writeStorage(STORAGE_KEYS.bundles, state.bundles);
    updateHeaderBadges();
    renderCartDrawer();
  }

  function removeBundle(uid) {
    state.bundles = state.bundles.filter((b) => b.uid !== uid);
    writeStorage(STORAGE_KEYS.bundles, state.bundles);
    updateHeaderBadges();
    renderCartDrawer();
  }

  function addCurrentBuilderToCart() {
    const { selectedItems, meta } = computeActiveBuilderTotals();
    if (!selectedItems.length) {
      showToast('اختر منتجاً واحداً على الأقل من منشئ الباقات');
      return null;
    }

    const bundleEntry = {
      uid: `BND-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      title: meta.title,
      items: selectedItems.map((p) => {
        const v = getSelectedVariant(p, state.bundleVariants);
        return {
          id: p.id,
          name: p.name,
          variantId: v.id,
          variantLabel: v.label,
        };
      }),
      recipient: els.bundleRecipient?.value.trim() || '',
      ribbon: els.bundleRibbon?.value || '',
      giftMessage: els.bundleGiftMessage?.value.trim() || '',
      qty: 1,
    };

    state.bundles.push(bundleEntry);
    writeStorage(STORAGE_KEYS.bundles, state.bundles);
    updateHeaderBadges();
    renderCartDrawer();
    return bundleEntry;
  }

  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx >= 0) {
      state.wishlist.splice(idx, 1);
      showToast('تمت الإزالة من المفضلة');
    } else {
      state.wishlist.push(productId);
      showToast('تم الحفظ في المفضلة VIP');
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
      .map((s) => `<li>${SVG.check}<span>${escapeHtml(s)}</span></li>`)
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
    els.qvWishBtn.classList.toggle('active', wished);
  }

  function getInvoiceSnapshot() {
    const itemEntries = Object.entries(state.cart).filter(([, qty]) => qty > 0);
    const hasCartData = itemEntries.length > 0 || state.bundles.length > 0;

    if (hasCartData) {
      state.invoicePreviewBundleOnly = false;
      const rows = [];

      state.bundles.forEach((bnd) => {
        const pricing = computeBundleEntryPricing(bnd);
        rows.push({
          sku: 'BUNDLE',
          title: `${pricing.meta.title} (خصم ${pricing.meta.pct}%)`,
          detail: pricing.resolvedItems.map((it) => `${it.name} [${it.variantLabel}]`).join(' + '),
          qty: pricing.qty,
          unitPrice: pricing.netUnit,
          lineTotal: pricing.netLine,
          recipient: bnd.recipient,
          ribbon: bnd.ribbon,
          giftMessage: bnd.giftMessage,
        });
      });

      itemEntries.forEach(([key, qty]) => {
        const { productId, variantId } = parseCartKey(key);
        const prod = state.products.find((p) => p.id === productId);
        if (!prod) return;
        const variant = prod.variants.find((v) => v.id === variantId) || prod.variants[0];
        const unit = getPrice(prod);
        rows.push({
          sku: prod.id,
          title: prod.name,
          detail: variant.label,
          qty,
          unitPrice: unit,
          lineTotal: roundCurrency(unit * qty),
          recipient: '',
          ribbon: '',
          giftMessage: '',
        });
      });

      return { rows, fin: computeCartFinancials(), isPreview: false };
    }

    // Fallback preview from active Bundle Builder if cart is empty
    state.invoicePreviewBundleOnly = true;
    const { selectedItems, rawTotal, meta, discountAmt, netTotal } = computeActiveBuilderTotals();
    const zones = STORE_CONFIG.deliveryZones || [];
    const zoneId = els.checkoutZone?.value || zones[0]?.id;
    const zone = zones.find((z) => z.id === zoneId) || zones[0];
    const threshold = FREE_SHIPPING_THRESHOLD[state.currency];
    const freeShip = netTotal >= threshold && netTotal > 0;
    const fee = netTotal === 0 || freeShip ? 0 : getZoneFee(zone);
    const grandTotal = roundCurrency(netTotal + fee);

    const rows = selectedItems.length
      ? [
          {
            sku: 'PREVIEW-BND',
            title: `${meta.title} (معاينة من منشئ الباقات)`,
            detail: selectedItems
              .map((p) => `${p.name} [${getSelectedVariant(p, state.bundleVariants).label}]`)
              .join(' + '),
            qty: 1,
            unitPrice: netTotal,
            lineTotal: netTotal,
            recipient: els.bundleRecipient?.value.trim() || '',
            ribbon: els.bundleRibbon?.value || '',
            giftMessage: els.bundleGiftMessage?.value.trim() || '',
          },
        ]
      : [];

    return {
      rows,
      isPreview: true,
      fin: {
        totalCount: rows.length,
        itemSubtotal: 0,
        bundleRawTotal: rawTotal,
        bundleSavings: discountAmt,
        bundleNetTotal: netTotal,
        subtotalAfterBundles: netTotal,
        couponDiscount: 0,
        zone,
        rawZoneFee: getZoneFee(zone),
        freeShippingUnlocked: freeShip,
        deliveryFee: fee,
        grandTotal,
        vatIncluded: roundCurrency((grandTotal * 15) / 115),
      },
    };
  }

  function renderInvoiceModal() {
    if (!els.invoiceModal) return;

    const { rows, fin, isPreview } = getInvoiceSnapshot();
    const isGift = state.invoiceMode === 'gift';

    document.querySelectorAll('.inv-tab').forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.invMode === state.invoiceMode);
    });

    if (els.invoiceModalTitle) {
      els.invoiceModalTitle.textContent = isGift
        ? 'إيصال هدية ملكي — متجر النخبة السريع VIP'
        : 'متجر النخبة السريع — الفئة الملكية VIP';
    }
    if (els.invSubtitle) {
      els.invSubtitle.textContent = isGift
        ? 'إيصال إهداء معتمد خالٍ من الأسعار المالية'
        : isPreview
          ? 'معاينة فاتورة ضريبية مبسطة للباقة المختارة'
          : 'فاتورة ضريبية مبسطة صادرة إلكترونياً';
    }

    if (els.invRefDisplay) els.invRefDisplay.textContent = state.invoiceRef;
    if (els.invDateDisplay) {
      els.invDateDisplay.textContent = new Date().toLocaleDateString('en-CA');
    }
    if (els.invCurrencyBadge) {
      els.invCurrencyBadge.textContent = isGift ? 'GIFT RECEIPT' : state.currency.toUpperCase();
    }

    const custName = els.checkoutName?.value.trim() || 'عميل الفئة الملكية VIP';
    const custPhone = els.checkoutPhone?.value.trim() || 'غير محدد';
    const custAddr = els.checkoutAddress?.value.trim() || 'غير محدد';
    const zoneLabel = fin.zone ? fin.zone.label : 'توصيل';

    if (els.invCustomerBox) {
      els.invCustomerBox.innerHTML = `
        <small>بيانات العميل والشحن</small>
        <strong>${escapeHtml(custName)}</strong>
        <span>الجوال: <span class="num-font" dir="ltr">${escapeHtml(custPhone)}</span> · ${escapeHtml(zoneLabel)} — ${escapeHtml(custAddr)}</span>
      `;
    }

    const firstGift = rows.find((r) => r.recipient || r.giftMessage) || {
      recipient: els.bundleRecipient?.value.trim() || '',
      ribbon: els.bundleRibbon?.value || '',
      giftMessage: els.bundleGiftMessage?.value.trim() || '',
    };

    if (els.invGiftBanner) {
      if (isGift || firstGift.recipient || firstGift.giftMessage) {
        els.invGiftBanner.hidden = false;
        els.invGiftBanner.innerHTML = `
          <strong>تفاصيل الإهداء الملكي:</strong>
          ${firstGift.recipient ? `<span>المُهدى إليه: <strong>${escapeHtml(firstGift.recipient)}</strong></span> · ` : ''}
          ${firstGift.ribbon ? `<span>التغليف: ${escapeHtml(firstGift.ribbon)}</span>` : ''}
          ${firstGift.giftMessage ? `<div style="margin-top:0.25rem;">بطاقة الإهداء: "${escapeHtml(firstGift.giftMessage)}"</div>` : ''}
        `;
      } else {
        els.invGiftBanner.hidden = true;
      }
    }

    if (els.invTableHead && els.invTableBody) {
      if (isGift) {
        els.invTableHead.innerHTML = `
          <tr>
            <th>#</th>
            <th>الرمز</th>
            <th>محتويات الهدية</th>
            <th>الإصدار / التفاصيل</th>
            <th>الكمية</th>
          </tr>
        `;
        els.invTableBody.innerHTML = rows.length
          ? rows
              .map(
                (r, i) => `
              <tr>
                <td class="num-font">${i + 1}</td>
                <td class="num-font">${escapeHtml(r.sku)}</td>
                <td><strong>${escapeHtml(r.title)}</strong></td>
                <td>${escapeHtml(r.detail)}</td>
                <td class="num-font">${r.qty}</td>
              </tr>
            `
              )
              .join('')
          : '<tr><td colspan="5">لا توجد أصناف مضافة حالياً.</td></tr>';
      } else {
        els.invTableHead.innerHTML = `
          <tr>
            <th>#</th>
            <th>الرمز</th>
            <th>الصنف / الباقة</th>
            <th>الكمية</th>
            <th>سعر الوحدة</th>
            <th>الإجمالي</th>
          </tr>
        `;
        els.invTableBody.innerHTML = rows.length
          ? rows
              .map(
                (r, i) => `
              <tr>
                <td class="num-font">${i + 1}</td>
                <td class="num-font">${escapeHtml(r.sku)}</td>
                <td>
                  <strong>${escapeHtml(r.title)}</strong>
                  <div style="font-size:0.75rem;color:#475569;">${escapeHtml(r.detail)}</div>
                </td>
                <td class="num-font">${r.qty}</td>
                <td class="num-font">${formatMoney(r.unitPrice)}</td>
                <td class="num-font"><strong>${formatMoney(r.lineTotal)}</strong></td>
              </tr>
            `
              )
              .join('')
          : '<tr><td colspan="6">السلة فارغة — أضف منتجات أو باقة لعرض الفاتورة.</td></tr>';
      }
    }

    if (els.invTotalsCard) {
      if (isGift) {
        const totalUnits = rows.reduce((acc, r) => acc + r.qty, 0);
        els.invTotalsCard.innerHTML = `
          <div class="totals-line"><span>نوع المستند</span><strong>إيصال هدية (Gift Receipt)</strong></div>
          <div class="totals-line"><span>عدد البنود المرفقة</span><strong class="num-font">${totalUnits}</strong></div>
          <div class="totals-line"><span>نطاق التسليم</span><strong>${escapeHtml(zoneLabel)}</strong></div>
          <div class="totals-line grand"><span>الحالة</span><span>مدفوعة / جاهزة للإهداء</span></div>
        `;
      } else {
        els.invTotalsCard.innerHTML = `
          <div class="totals-line"><span>المجموع قبل الخصم</span><strong class="num-font">${formatMoney(roundCurrency(fin.itemSubtotal + fin.bundleRawTotal))}</strong></div>
          ${fin.bundleSavings > 0 ? `<div class="totals-line discount"><span>خصم الباقات التلقائي</span><strong class="num-font">-${formatMoney(fin.bundleSavings)}</strong></div>` : ''}
          ${fin.couponDiscount > 0 ? `<div class="totals-line discount"><span>خصم الكوبون (${escapeHtml(state.appliedCoupon)})</span><strong class="num-font">-${formatMoney(fin.couponDiscount)}</strong></div>` : ''}
          <div class="totals-line"><span>الشحن (${escapeHtml(zoneLabel)})</span><strong class="num-font">${fin.freeShippingUnlocked || fin.deliveryFee === 0 ? 'مجاني' : formatMoney(fin.deliveryFee)}</strong></div>
          <div class="totals-line"><span>ضريبة القيمة المضافة المشمولة (15%)</span><strong class="num-font">${formatMoney(fin.vatIncluded)}</strong></div>
          <div class="totals-line grand"><span>الإجمالي المستحق</span><span class="num-font">${formatMoney(fin.grandTotal)}</span></div>
        `;
      }
    }
  }

  function buildInvoicePlainText() {
    const { rows, fin } = getInvoiceSnapshot();
    const isGift = state.invoiceMode === 'gift';
    const custName = els.checkoutName?.value.trim() || 'عميل الفئة الملكية VIP';
    const custPhone = els.checkoutPhone?.value.trim() || 'غير محدد';
    const custAddr = els.checkoutAddress?.value.trim() || 'غير محدد';
    const zoneLabel = fin.zone ? fin.zone.label : 'توصيل';

    const lines = [
      isGift
        ? `إيصال هدية ملكي — ${STORE_CONFIG.storeName} (الفئة الملكية VIP)`
        : `فاتورة ضريبية مبسطة — ${STORE_CONFIG.storeName} (الفئة الملكية VIP)`,
      `المرجع: ${state.invoiceRef}`,
      `العميل: ${custName} (${custPhone})`,
      `التوصيل: ${zoneLabel} — ${custAddr}`,
      '--- البنود ---',
    ];

    rows.forEach((r, idx) => {
      if (isGift) {
        lines.push(`${idx + 1}. ${r.title} (${r.detail}) × ${r.qty}`);
      } else {
        lines.push(`${idx + 1}. ${r.title} [${r.detail}] × ${r.qty} = ${formatMoney(r.lineTotal)}`);
      }
    });

    if (!isGift) {
      if (fin.bundleSavings > 0) lines.push(`خصم الباقات: -${formatMoney(fin.bundleSavings)}`);
      if (fin.couponDiscount > 0) lines.push(`خصم الكوبون (${state.appliedCoupon}): -${formatMoney(fin.couponDiscount)}`);
      lines.push(`الشحن: ${fin.freeShippingUnlocked || fin.deliveryFee === 0 ? 'مجاني' : formatMoney(fin.deliveryFee)}`);
      lines.push(`الإجمالي النهائي (شامل الضريبة 15%): ${formatMoney(fin.grandTotal)}`);
    } else {
      const recipient = els.bundleRecipient?.value.trim();
      const giftMsg = els.bundleGiftMessage?.value.trim();
      if (recipient) lines.push(`المُهدى إليه: ${recipient}`);
      if (giftMsg) lines.push(`رسالة الإهداء: ${giftMsg}`);
    }

    return lines.join('\n');
  }

  async function copyInvoiceText() {
    const text = buildInvoicePlainText();
    try {
      await navigator.clipboard.writeText(text);
      showToast('تم نسخ نص الفاتورة بنجاح');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('تم نسخ نص الفاتورة بنجاح');
    }
  }

  function sendWhatsAppOrder(useBundlePreviewOnly = false) {
    const { rows, fin } = useBundlePreviewOnly
      ? (() => {
          const { selectedItems, rawTotal, meta, discountAmt, netTotal } = computeActiveBuilderTotals();
          const zones = STORE_CONFIG.deliveryZones || [];
          const zone = zones.find((z) => z.id === els.checkoutZone?.value) || zones[0];
          const freeShip = netTotal >= FREE_SHIPPING_THRESHOLD[state.currency] && netTotal > 0;
          const fee = netTotal === 0 || freeShip ? 0 : getZoneFee(zone);
          return {
            rows: selectedItems.length
              ? [
                  {
                    title: `${meta.title} (خصم ${meta.pct}%)`,
                    detail: selectedItems
                      .map((p) => `${p.name} [${getSelectedVariant(p, state.bundleVariants).label}]`)
                      .join(' + '),
                    qty: 1,
                    lineTotal: netTotal,
                    recipient: els.bundleRecipient?.value.trim() || '',
                    ribbon: els.bundleRibbon?.value || '',
                    giftMessage: els.bundleGiftMessage?.value.trim() || '',
                  },
                ]
              : [],
            fin: {
              bundleSavings: discountAmt,
              couponDiscount: 0,
              zone,
              freeShippingUnlocked: freeShip,
              deliveryFee: fee,
              grandTotal: roundCurrency(netTotal + fee),
              bundleRawTotal: rawTotal,
            },
          };
        })()
      : getInvoiceSnapshot();

    if (!rows.length) {
      showToast('أضف منتجات أو باقة أولاً قبل الإرسال للواتساب');
      return;
    }

    const name = els.checkoutName?.value.trim() || 'عميل الفئة الملكية VIP';
    const phone = els.checkoutPhone?.value.trim() || 'غير محدد';
    const addr = els.checkoutAddress?.value.trim() || 'غير محدد';
    const notes = els.checkoutNotes?.value.trim() || '';
    const currLabel =
      state.currency === 'sar' ? 'ريال سعودي (SAR)' : state.currency === 'usd' ? 'دولار أمريكي (USD)' : 'ريال يمني (YER)';

    const lines = [
      `*طلب جديد — ${STORE_CONFIG.storeName} (الفئة الملكية VIP)*`,
      `رقم المرجع: ${state.invoiceRef}`,
      `العميل: ${name} (${phone})`,
      `التوصيل: ${fin.zone ? fin.zone.label : ''} — ${addr}`,
      `العملة: ${currLabel}`,
      '--- تفاصيل الطلب ---',
    ];

    rows.forEach((r) => {
      lines.push(`- ${r.title} [${r.detail}] × ${r.qty} = ${formatMoney(r.lineTotal)}`);
      if (r.recipient) lines.push(`  إهداء إلى: ${r.recipient} (${r.ribbon || 'تغليف ملكي'})`);
      if (r.giftMessage) lines.push(`  رسالة البطاقة: ${r.giftMessage}`);
    });

    if (fin.bundleSavings > 0) lines.push(`خصم الباقات التلقائي: -${formatMoney(fin.bundleSavings)}`);
    if (fin.couponDiscount > 0) lines.push(`خصم الكوبون (${state.appliedCoupon}): -${formatMoney(fin.couponDiscount)}`);
    lines.push(`رسوم التوصيل: ${fin.freeShippingUnlocked || fin.deliveryFee === 0 ? 'مجاني' : formatMoney(fin.deliveryFee)}`);
    if (notes) lines.push(`ملاحظات: ${notes}`);
    lines.push(`*الإجمالي النهائي:* ${formatMoney(fin.grandTotal)}`);

    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener');
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
        state.sheetDraft = cloneSheetRows(parsed);
        state.products.forEach((p) => {
          if (!state.selectedVariants[p.id]) state.selectedVariants[p.id] = p.variants[0].id;
          if (!state.bundleVariants[p.id]) state.bundleVariants[p.id] = p.variants[0].id;
        });

        renderMerchantSheet();
        renderBundleBuilder();
        renderCatalog();
        renderWishlistDrawer();
        renderCartDrawer();
        updateHeaderBadges();
        if (els.sheetCsvMsg) {
          els.sheetCsvMsg.textContent = `تم جلب ومزامنة ${parsed.length} أصناف من رابط CSV بنجاح.`;
        }
        showToast(`تمت مزامنة ${parsed.length} أصناف من Google Sheets`);
      }
    } catch {
      if (els.sheetCsvMsg) {
        els.sheetCsvMsg.textContent = 'تعذر جلب الرابط — تأكد من نشر الجدول بصيغة CSV عامة.';
      }
    }
  }

  function applyCouponCode(rawCode, openCart = false) {
    const code = String(rawCode || '').trim().toUpperCase();
    if (els.couponInput) els.couponInput.value = code;
    const rate = STORE_CONFIG.coupons?.[code];

    if (rate) {
      state.appliedCoupon = code;
      if (els.couponMsg) {
        els.couponMsg.style.color = 'var(--emerald-dark)';
        els.couponMsg.textContent = `تم تفعيل خصم ${Math.round(rate * 100)}% بكود ${code}.`;
      }
      showToast(`تم تفعيل كود الخصم ${code}`);
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

  function openDrawer(drawerEl) {
    closeAllOverlays(false);
    els.backdrop?.classList.add('open');
    drawerEl?.classList.add('open');
  }

  function openQuickView(productId) {
    state.quickView.qty = 1;
    renderQuickView(productId);
    closeAllOverlays(false);
    els.backdrop?.classList.add('open');
    if (els.qvModal) els.qvModal.hidden = false;
  }

  function openInvoiceModal() {
    renderInvoiceModal();
    closeAllOverlays(false);
    els.backdrop?.classList.add('open');
    if (els.invoiceModal) els.invoiceModal.hidden = false;
  }

  function closeAllOverlays(hideBackdrop = true) {
    if (hideBackdrop) els.backdrop?.classList.remove('open');
    document.querySelectorAll('.drawer.open').forEach((d) => d.classList.remove('open'));
    if (els.qvModal) els.qvModal.hidden = true;
    if (els.invoiceModal) els.invoiceModal.hidden = true;
  }

  function bindEvents() {
    document.querySelectorAll('.curr-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.currency === state.currency);
      btn.addEventListener('click', () => {
        state.currency = btn.dataset.currency;
        localStorage.setItem(STORAGE_KEYS.currency, state.currency);
        document.querySelectorAll('.curr-btn').forEach((b) => b.classList.toggle('active', b === btn));
        renderZonesSelect();
        renderBundleBuilder();
        renderCatalog();
        renderWishlistDrawer();
        renderCartDrawer();
        updateHeaderBadges();
        if (state.quickView.productId && !els.qvModal.hidden) {
          renderQuickView(state.quickView.productId);
        }
        if (!els.invoiceModal.hidden) {
          renderInvoiceModal();
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
      const presetBtn = e.target.closest('[data-bundle-preset]');
      if (presetBtn) {
        const key = presetBtn.dataset.bundlePreset;
        const ids = BUNDLE_PRESETS[key] || BUNDLE_PRESETS.royal;
        state.activePreset = key;
        state.bundleSelection = new Set(ids);
        renderBundleBuilder();
        return;
      }

      const bundleToggle = e.target.closest('[data-bundle-toggle]');
      if (bundleToggle) {
        const id = bundleToggle.dataset.bundleToggle;
        if (state.bundleSelection.has(id)) state.bundleSelection.delete(id);
        else state.bundleSelection.add(id);
        state.activePreset = '';
        renderBundleBuilder();
        return;
      }

      const bundleVar = e.target.closest('[data-bundle-var-prod][data-bundle-var-id]');
      if (bundleVar) {
        state.bundleVariants[bundleVar.dataset.bundleVarProd] = bundleVar.dataset.bundleVarId;
        renderBundleBuilder();
        return;
      }

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
          showToast(`أُضيف "${prod.name}" إلى السلة`);
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

      const bundleDel = e.target.closest('[data-bundle-del]');
      if (bundleDel) {
        removeBundle(bundleDel.dataset.bundleDel);
        return;
      }

      const bundleAct = e.target.closest('[data-bundle-act][data-bundle-uid]');
      if (bundleAct) {
        adjustBundleQty(bundleAct.dataset.bundleUid, bundleAct.dataset.bundleAct === 'inc' ? 1 : -1);
        return;
      }

      const couponChip = e.target.closest('[data-apply-coupon]');
      if (couponChip) {
        applyCouponCode(couponChip.dataset.applyCoupon, false);
        return;
      }

      const invTab = e.target.closest('[data-inv-mode]');
      if (invTab) {
        state.invoiceMode = invTab.dataset.invMode;
        renderInvoiceModal();
      }
    });

    els.addBundleToCartBtn?.addEventListener('click', () => {
      const added = addCurrentBuilderToCart();
      if (added) {
        showToast('تمت إضافة الباقة المخصصة إلى السلة');
        openDrawer(els.cartDrawer);
      }
    });

    els.bundleQuickInvoiceBtn?.addEventListener('click', () => {
      const hasCart = Object.keys(state.cart).length > 0 || state.bundles.length > 0;
      if (!hasCart) {
        addCurrentBuilderToCart();
      }
      openInvoiceModal();
    });

    els.bundleWaBtn?.addEventListener('click', () => {
      sendWhatsAppOrder(true);
    });

    els.merchantSheetBody?.addEventListener('input', (e) => {
      const sarId = e.target.getAttribute('data-sheet-sar');
      if (!sarId) return;
      const draft = state.sheetDraft.find((d) => d.id === sarId);
      const prod = state.products.find((p) => p.id === sarId);
      if (!draft || !prod) return;

      draft.priceSar = Math.max(1, Number(e.target.value) || 1);
      const equivCell = els.merchantSheetBody.querySelector(`[data-sheet-equiv="${sarId}"]`);
      if (equivCell) {
        const yer = Math.round(draft.priceSar * prod.yerPerSar);
        const usd = (draft.priceSar / 3.75).toFixed(2);
        equivCell.textContent = `${yer.toLocaleString('en-US')} ر.ي · $${usd}`;
      }
      const row = e.target.closest('tr');
      if (row) {
        const isPending =
          Number(draft.priceSar) !== Number(prod.priceSar) ||
          draft.stock !== prod.stock ||
          (draft.badge || '') !== (prod.badge || '');
        row.classList.toggle('pending-row', isPending);
      }
      updateSheetBadgeUi();
    });

    els.merchantSheetBody?.addEventListener('change', (e) => {
      const stockId = e.target.getAttribute('data-sheet-stock');
      const badgeId = e.target.getAttribute('data-sheet-badge');
      const id = stockId || badgeId;
      if (!id) return;
      const draft = state.sheetDraft.find((d) => d.id === id);
      const prod = state.products.find((p) => p.id === id);
      if (!draft || !prod) return;

      if (stockId) draft.stock = e.target.value;
      if (badgeId) draft.badge = e.target.value;

      const row = e.target.closest('tr');
      if (row) {
        const isPending =
          Number(draft.priceSar) !== Number(prod.priceSar) ||
          draft.stock !== prod.stock ||
          (draft.badge || '') !== (prod.badge || '');
        row.classList.toggle('pending-row', isPending);
      }
      updateSheetBadgeUi();
    });

    els.merchantSyncBtn?.addEventListener('click', syncMerchantSheetEdits);
    els.merchantResetBtn?.addEventListener('click', resetMerchantSheet);
    els.syncCsvBtn?.addEventListener('click', () => {
      const url = els.sheetCsvInput?.value.trim();
      if (url) syncFromCsvUrl(url);
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
      showToast(`أُضيف "${prod.name}" إلى السلة`);
      closeAllOverlays();
      openDrawer(els.cartDrawer);
    });

    els.qvWishBtn?.addEventListener('click', () => {
      if (state.quickView.productId) toggleWishlist(state.quickView.productId);
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
        showToast(`تم نقل ${added} منتجات من المفضلة للسلة`);
        openDrawer(els.cartDrawer);
      }
    });

    els.openInvoiceHeaderBtn?.addEventListener('click', openInvoiceModal);
    els.openInvoiceFromCartBtn?.addEventListener('click', openInvoiceModal);
    els.closeInvoiceBtn?.addEventListener('click', () => closeAllOverlays(true));
    els.closeQvBtn?.addEventListener('click', () => closeAllOverlays(true));
    els.closeCartBtn?.addEventListener('click', () => closeAllOverlays(true));
    els.closeWishlistBtn?.addEventListener('click', () => closeAllOverlays(true));
    els.backdrop?.addEventListener('click', () => closeAllOverlays(true));

    els.checkoutZone?.addEventListener('change', renderCartDrawer);
    els.applyCouponBtn?.addEventListener('click', () => {
      applyCouponCode(els.couponInput?.value, false);
    });

    els.waCheckoutBtn?.addEventListener('click', () => sendWhatsAppOrder(false));
    els.invoiceWaBtn?.addEventListener('click', () => sendWhatsAppOrder(state.invoicePreviewBundleOnly));
    els.copyInvoiceBtn?.addEventListener('click', copyInvoiceText);
    els.printInvoiceBtn?.addEventListener('click', () => window.print());

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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllOverlays(true);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderZonesSelect();
    renderBundleBuilder();
    renderCatalog();
    renderMerchantSheet();
    renderWishlistDrawer();
    renderCartDrawer();
    updateHeaderBadges();
    bindEvents();

    if (typeof STORE_CONFIG !== 'undefined' && STORE_CONFIG.googleSheetCsvUrl) {
      syncFromCsvUrl(STORE_CONFIG.googleSheetCsvUrl);
    }
  });
})();
