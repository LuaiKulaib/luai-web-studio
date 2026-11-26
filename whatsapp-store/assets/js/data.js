/* =========================================================
   data.js — متجر النخبة | سلة واتساب + ربط Google Sheets
   ========================================================= */
'use strict';

const STORE_CONFIG = {
  whatsappNumber: '967782259937',
  storeName: 'متجر النخبة السريع',
  tagline: 'إلكترونيات · ساعات ذكية · عطور وهدايا — التحديث اللحظي من Google Sheets',
  // ضع رابط CSV المنشور من Google Sheets هنا لتحديث الأسعار والأصناف تلقائياً:
  // مثال: https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv
  googleSheetCsvUrl: '',
  coupons: {
    SAVE10: 0.10,
    VIP15:  0.15,
  },
  deliveryZones: [
    { id: 'sanaa',    label: 'توصيل داخل صنعاء',      feeYer: 1000, feeSar: 12 },
    { id: 'aden',     label: 'توصيل إلى عدن والمحافظات', feeYer: 2500, feeSar: 25 },
    { id: 'gcc',      label: 'شحن سريع لدول الخليج',    feeYer: 6500, feeSar: 45 },
    { id: 'pickup',   label: 'استلام مباشر من المعرض',  feeYer: 0,    feeSar: 0  },
  ],
};

const DEFAULT_PRODUCTS = [
  {
    id: 'P-101',
    category: 'electronics',
    catLabel: 'إلكترونيات',
    name: 'ساعة ذكية برو الترا — شاشة AMOLED',
    desc: 'مقاومة للماء، بطارية تدوم 10 أيام، متابعة نبضات القلب وإشعارات المكالمات.',
    priceYer: 24500,
    priceSar: 179,
    stock: 'متوفر',
    badge: 'الأكثر مبيعاً',
    image: 'assets/images/watch.jpg',
  },
  {
    id: 'P-102',
    category: 'electronics',
    catLabel: 'صوتيات',
    name: 'سماعة بلوتوث لاسلكية عازلة للضوضاء',
    desc: 'صوت نقي عالي الوضوح مع 40 ساعة تشغيل وشحن سريع عبر منفذ Type-C.',
    priceYer: 16500,
    priceSar: 119,
    stock: 'متوفر',
    badge: 'خصم اليوم',
    image: 'assets/images/headphones.jpg',
  },
  {
    id: 'P-103',
    category: 'gaming',
    catLabel: 'ألعاب وVR',
    name: 'طقم يد تحكم لاسلكي + نظارة واقع افتراضي',
    desc: 'استجابة فورية للألعاب، قبضة مريحة، متوافق مع منصات الألعاب والحاسب.',
    priceYer: 48000,
    priceSar: 349,
    stock: 'كمية محدودة',
    badge: 'آخر 3 قطع',
    image: 'assets/images/powerbank.jpg',
  },
  {
    id: 'P-104',
    category: 'electronics',
    catLabel: 'تصوير',
    name: 'كاميرا احترافية مدمجة مع عدسة 55 مم',
    desc: 'مثالية لتصوير المنتجات والمحتوى بدقة عالية وألوان سينمائية.',
    priceYer: 185000,
    priceSar: 1350,
    stock: 'متوفر',
    badge: 'ضمان سنة',
    image: 'assets/images/camera.jpg',
  },
  {
    id: 'P-105',
    category: 'gifts',
    catLabel: 'عطور وهدايا',
    name: 'طقم عطور فاخرة (ثلاث زجاجات أصلية)',
    desc: 'روائح شرقية وزهرية ثابتة طوال اليوم في عبوات زجاجية فاخرة.',
    priceYer: 32000,
    priceSar: 235,
    stock: 'متوفر',
    badge: 'هدية راقية',
    image: 'assets/images/perfume.jpg',
  },
  {
    id: 'P-106',
    category: 'gifts',
    catLabel: 'تغليف هدايا',
    name: 'بوكس الهدية الملكية الجاهز للشحن',
    desc: 'صندوق تغليف أنيق مع بطاقة إهداء مخصصة وتجهيز فوري للطلبات.',
    priceYer: 4500,
    priceSar: 35,
    stock: 'متوفر',
    badge: null,
    image: 'assets/images/bag.jpg',
  },
];
