/* ============================================================
   دار الأواني للتجارة والجملة — B2B Wholesale Catalog & Data
   assets/js/data.js
   ============================================================ */

const WHOLESALE_CONFIG = {
  brandAr: 'دار الأواني للتجارة',
  brandSub: 'توريد الأدوات المنزلية والمطبخ بالجملة',
  whatsappNumber: '967782259937',
  displayPhone: '+967 782 259 937',
  currency: 'ر.س',
  minOrderAmount: 1500,
  freeShippingThreshold: 5000,
  volumeTiers: [
    { min: 25000, discount: 0.18, label: 'شريحة الموزعين الكبار (خصم إضافي 18%)' },
    { min: 10000, discount: 0.12, label: 'شريحة المعارض والهايبرماركت (خصم إضافي 12%)' },
    { min: 5000,  discount: 0.06, label: 'شريحة المحلات والأسواق (خصم إضافي 6% + شحن مجاني)' },
    { min: 0,     discount: 0.00, label: 'الطلب التجاري الأساسي (أضف للوصول لـ 5,000 ر.س لشحن مجاني + خصم 6%)' }
  ]
};

const DATA = {

  /* ── Quality Standards & Origin Partners Marquee ──────────── */
  standards: [
    {
      name: 'جرانيت كوري 10 طبقات',
      desc: 'مقاوم للالتصاق والخدش وخالٍ من PFOA',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    },
    {
      name: 'ستانلس ستيل 304 غذائي',
      desc: 'مقاوم للصدأ والحرارة بضمان 5 سنوات',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    },
    {
      name: 'بلاستيك PP5 صحي 100%',
      desc: 'معتمد للتلامس الغذائي (BPA Free)',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    },
    {
      name: 'زجاج حراري بوروسيليكات',
      desc: 'يتحمل درجات الحرارة العالية والفرن',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 13L2 9z"/></svg>`
    },
    {
      name: 'ترامس حافظة لـ 24 ساعة',
      desc: 'قلب زجاجي وردي ألماني وعزل مزدوج',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>`
    },
    {
      name: 'تعويض فوري للكسر',
      desc: 'تغطية 100% ضد تلفيات الشحن والنقل',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
    },
    {
      name: 'فواتير ضريبية وباركود',
      desc: 'جاهزة للإدخال الفوري في أنظمة الكاشير',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
    }
  ],

  /* ── Category Tabs ─────────────────────────────────────────── */
  categories: [
    { id: 'all',         name: 'كافة الأصناف (١٢)' },
    { id: 'cookware',    name: 'أواني الطهي والجرانيت' },
    { id: 'hospitality', name: 'الضيافة والترامس' },
    { id: 'tableware',   name: 'أطقم السفرة والبورسلين' },
    { id: 'storage',     name: 'التخزين والبلاستيكات' },
    { id: 'appliances',  name: 'الأجهزة الصغيرة' },
    { id: 'cleaning',    name: 'التنظيم والنظافة' }
  ],

  /* ── 12 High-Margin B2B Wholesale SKUs ─────────────────────── */
  products: [
    {
      id: 'sku-01',
      skuCode: 'DA-GR-101',
      category: 'cookware',
      categoryName: 'أواني الطهي والجرانيت',
      title: 'طقم قدور جرانيت كوري 10 قطع (إيدج بريميوم)',
      badge: 'الأكثر طلباً',
      badgeType: 'gold',
      img: 'assets/images/cat-cookware.jpg',
      unitsPerCarton: 4,
      unitLabel: 'طقم',
      cartonPrice: 960,
      unitWholesale: 240,
      suggestedRetail: 350,
      minCartons: 1,
      weightKg: '32 كجم / كرتون',
      material: 'جرانيت كوري مصبوب سماكة 5 ملم + أغطية بيركس ومقابض خشبية عازلة',
      tier5Price: 910,
      tier20Price: 840,
      desc: 'طقم احترافي من 4 قدور ومقلاة عميقة بألوان بيج رملي وأسود مطفي، سريع الدوران في محلات الأواني.'
    },
    {
      id: 'sku-02',
      skuCode: 'DA-TH-204',
      category: 'hospitality',
      categoryName: 'الضيافة والترمس',
      title: 'طقم ضيافة متكامل (إبريق حراري + علبة ضيافة نحاسية + صينية)',
      badge: 'موسمي رابح',
      badgeType: 'emerald',
      img: 'assets/images/cat-hospitality-tea.jpg',
      unitsPerCarton: 6,
      unitLabel: 'طقم متكامل',
      cartonPrice: 690,
      unitWholesale: 115,
      suggestedRetail: 180,
      minCartons: 1,
      weightKg: '16 كجم / كرتون',
      material: 'زجاج حراري مقاوم للغليان + وعاء نحاسي مطفي + صينية خوص فاخرة',
      tier5Price: 655,
      tier20Price: 610,
      desc: 'تصميم عصري دافئ للضيافة اليومية، يجمع بين العملية والأناقة ومطلوب بكثرة في المتاجر.'
    },
    {
      id: 'sku-03',
      skuCode: 'DA-TB-308',
      category: 'tableware',
      categoryName: 'أطقم السفرة والبورسلين',
      title: 'طقم سفرة بورسلين عاجي بحافة ذهبية (24 قطعة)',
      badge: 'تشكيلة 2026',
      badgeType: 'gold',
      img: 'assets/images/cat-tableware.jpg',
      unitsPerCarton: 4,
      unitLabel: 'طقم',
      cartonPrice: 780,
      unitWholesale: 195,
      suggestedRetail: 295,
      minCartons: 1,
      weightKg: '28 كجم / كرتون',
      material: 'بورسلين صلب مزدوج الحرق بحافة ذهبية مقاومة للغسيل',
      tier5Price: 740,
      tier20Price: 690,
      desc: 'يكفي 6 أشخاص بتغليف فوم مخصص وآمن جداً للشحن لمسافات طويلة دون كسر.'
    },
    {
      id: 'sku-04',
      skuCode: 'DA-ST-412',
      category: 'storage',
      categoryName: 'التخزين والبلاستيكات',
      title: 'طقم مرطبانات زجاجية محكمة الإغلاق لحفظ البقوليات (12 قطعة)',
      badge: 'هامش ربح +60%',
      badgeType: 'emerald',
      img: 'assets/images/cat-storage.jpg',
      unitsPerCarton: 8,
      unitLabel: 'طقم',
      cartonPrice: 520,
      unitWholesale: 65,
      suggestedRetail: 105,
      minCartons: 1,
      weightKg: '18 كجم / كرتون',
      material: 'زجاج نقي سميك + قفل معدني وحلقة سيليكون مانعة للرطوبة والحشرات',
      tier5Price: 495,
      tier20Price: 455,
      desc: 'منتج ترند سريع البيع في السوبرماركت والمتاجر الإلكترونية ومحلات التنظيم المنزلي.'
    },
    {
      id: 'sku-05',
      skuCode: 'DA-AP-502',
      category: 'appliances',
      categoryName: 'الأجهزة الصغيرة',
      title: 'ماكينة تحضير قهوة وإسبريسو ستانلس ستيل مدمجة (15 بار)',
      badge: 'دوران سريع',
      badgeType: 'emerald',
      img: 'assets/images/cat-appliances.jpg',
      unitsPerCarton: 6,
      unitLabel: 'جهاز',
      cartonPrice: 960,
      unitWholesale: 160,
      suggestedRetail: 259,
      minCartons: 1,
      weightKg: '19 كجم / كرتون',
      material: 'هيكل ستانلس ستيل 304 مقاوم للصدأ مع مضخة ضغط عالية وخزان قابل للفك',
      tier5Price: 910,
      tier20Price: 840,
      desc: 'ضمان استبدال فوري لمدة سنتين للتاجر، من أكثر أجهزة المشروبات الساخنة مبيعاً.'
    },
    {
      id: 'sku-06',
      skuCode: 'DA-CL-605',
      category: 'cleaning',
      categoryName: 'التنظيم والنظافة',
      title: 'طقم عبوات منظفات وغسيل عصرية مع فرشاة تنظيف مريحة',
      badge: 'الأكثر ربحية',
      badgeType: 'gold',
      img: 'assets/images/cat-cleaning.jpg',
      unitsPerCarton: 12,
      unitLabel: 'طقم',
      cartonPrice: 420,
      unitWholesale: 35,
      suggestedRetail: 62,
      minCartons: 1,
      weightKg: '12 كجم / كرتون',
      material: 'بلاستيك PP5 غير قابل للكسر مطلي بطبقة مطفية مقاومة للمنظفات',
      tier5Price: 396,
      tier20Price: 360,
      desc: 'تصميم مينيمال عصري يجذب محبي الترتيب المنزلي ومبيعاته عالية جداً في المتاجر الحديثة.'
    },
    {
      id: 'sku-07',
      skuCode: 'DA-GR-108',
      category: 'cookware',
      categoryName: 'أواني الطهي والجرانيت',
      title: 'طقم مقالي شواء وقلي جرانيت غير لاصق (3 مقاسات)',
      badge: 'عرض الكرتون',
      badgeType: 'gold',
      img: 'assets/images/cat-cookware.jpg',
      unitsPerCarton: 6,
      unitLabel: 'طقم',
      cartonPrice: 570,
      unitWholesale: 95,
      suggestedRetail: 145,
      minCartons: 1,
      weightKg: '21 كجم / كرتون',
      material: 'قاعدة توزيع حراري متساوي تناسب أفران الغاز والسيراميك والحث الحراري',
      tier5Price: 540,
      tier20Price: 498,
      desc: 'مقاسات 20 / 24 / 28 سم بمقبض ناعم الملمس مقاوم للحرارة.'
    },
    {
      id: 'sku-08',
      skuCode: 'DA-TH-219',
      category: 'hospitality',
      categoryName: 'الضيافة والترمس',
      title: 'طقم فناجين قهوة شرقية ومنقوشة مع التقديم الملكي (12 قطعة)',
      badge: 'هامش +75%',
      badgeType: 'emerald',
      img: 'assets/images/cat-hospitality-arabia.jpg',
      unitsPerCarton: 10,
      unitLabel: 'طقم',
      cartonPrice: 650,
      unitWholesale: 65,
      suggestedRetail: 115,
      minCartons: 1,
      weightKg: '22 كجم / كرتون',
      material: 'نحاس مطروق بلمسات تراثية فاخرة مع بطانة خزفية عازلة للحرارة',
      tier5Price: 615,
      tier20Price: 570,
      desc: 'مطلوب بكثرة كأطقم ضيافة للمجالس والهدايا، بتفاصيل نقوش شرقية عالية الطلب.'
    },
    {
      id: 'sku-09',
      skuCode: 'DA-AP-514',
      category: 'appliances',
      categoryName: 'الأجهزة الصغيرة',
      title: 'حافظات مشروبات حرارية ستانلس دبل مع صينية تقديم (طقم 3 قطع)',
      badge: 'جودة مضمونة',
      badgeType: 'gold',
      img: 'assets/images/cat-appliances.jpg',
      unitsPerCarton: 12,
      unitLabel: 'طقم',
      cartonPrice: 540,
      unitWholesale: 45,
      suggestedRetail: 78,
      minCartons: 1,
      weightKg: '16 كجم / كرتون',
      material: 'عزل حراري مزدوج يحفظ السخونة 12 ساعة والبرودة 24 ساعة',
      tier5Price: 510,
      tier20Price: 468,
      desc: 'مطلوب للمكاتب والرحلات والمقاهي، مطلي بطبقة مطفية مقاومة للخدش.'
    },
    {
      id: 'sku-10',
      skuCode: 'DA-ST-425',
      category: 'storage',
      categoryName: 'التخزين والبلاستيكات',
      title: 'طقم مرطبانات حفظ التوابل والحبوب بإغلاق مزدوج (8 قطع)',
      badge: 'الأسرع مبيعاً',
      badgeType: 'emerald',
      img: 'assets/images/cat-storage.jpg',
      unitsPerCarton: 10,
      unitLabel: 'طقم',
      cartonPrice: 390,
      unitWholesale: 39,
      suggestedRetail: 65,
      minCartons: 1,
      weightKg: '13 كجم / كرتون',
      material: 'زجاج حراري نقي بأقفال ستانلس غير قابلة للصدأ ومقاوم للرطوبة',
      tier5Price: 368,
      tier20Price: 340,
      desc: 'تشكيلة مقاسات مدمجة لتنظيم رفوف المطبخ والبهارات، تجذب ربات البيوت.'
    },
    {
      id: 'sku-11',
      skuCode: 'DA-CL-618',
      category: 'cleaning',
      categoryName: 'التنظيم والنظافة',
      title: 'أدوات تنظيم الغسيل وتنظيف المطبخ المينيمال (كرتون مشكل 12 قطعة)',
      badge: 'جديد',
      badgeType: 'gold',
      img: 'assets/images/cat-cleaning.jpg',
      unitsPerCarton: 12,
      unitLabel: 'طقم',
      cartonPrice: 468,
      unitWholesale: 39,
      suggestedRetail: 68,
      minCartons: 1,
      weightKg: '14 كجم / كرتون',
      material: 'بلاستيك PP5 غير قابل للكسر مع شعيرات تنظيف كثيفة مقاومة للتآكل',
      tier5Price: 440,
      tier20Price: 405,
      desc: 'ألوان بيضاء هادئة تناسب ديكور غرف الغسيل والمطابخ الحديثة.'
    },
    {
      id: 'sku-12',
      skuCode: 'DA-TB-320',
      category: 'tableware',
      categoryName: 'أطقم السفرة والبورسلين',
      title: 'صحون تقديم بيضاوية وصواني ضيافة خزفية (6 قطع)',
      badge: 'مناسب للمطاعم',
      badgeType: 'emerald',
      img: 'assets/images/cat-tableware.jpg',
      unitsPerCarton: 8,
      unitLabel: 'طقم',
      cartonPrice: 440,
      unitWholesale: 55,
      suggestedRetail: 92,
      minCartons: 1,
      weightKg: '20 كجم / كرتون',
      material: 'سيراميك عالي المتانة مقاوم للخدوش وآمن لغسالة الصحون والميكروويف',
      tier5Price: 418,
      tier20Price: 385,
      desc: 'ممتازة لمحلات الأواني ولشركات التموين والمطاعم والفنادق.'
    }
  ],

  /* ── Turnkey B2B Store Setup Packages ──────────────────────── */
  packages: [
    {
      id: 'starter',
      name: 'باقة الانطلاقة والتجارة الإلكترونية',
      subtitle: 'مثالية للمتاجر الإلكترونية والأسر المنتجة وبائعي الإنستغرام',
      price: '3,800',
      originalCostValue: '4,450',
      resaleValue: '6,200+',
      featured: false,
      badge: 'بداية سريعة',
      features: [
        'تشكيلة مختارة من 18 صنفاً (30 كرتوناً) الأكثر طلباً وسرعة في البيع',
        'هامش ربح صافٍ متوقع بين 45% إلى 65% عند البيع بالتجزئة',
        'تزويد التاجر بملف صور المنتجات الاحترافية عالية الدقة مجاناً',
        'فاتورة ضريبية معتمدة وتغليف محكم لكل الكراتين',
        'توصيل مجاني لجميع المناطق خلال 48 ساعة'
      ]
    },
    {
      id: 'showroom',
      name: 'باقة التاجر الشامل وتجهيز المعارض',
      subtitle: 'الاختيار الأول لافتتاح محل أدوات منزلية أو قسم أواني في سوبرماركت',
      price: '12,500',
      originalCostValue: '14,800',
      resaleValue: '21,500+',
      featured: true,
      badge: 'الأكثر مبيعاً للتجار',
      features: [
        'تشكيلة شاملة من 65 صنفاً تغطي كافة أقسام المنزل (طهي، ضيافة، بلاستيك، كهربائيات)',
        'خصم جملة تفضيلي إضافي 12% + تسهيلات في الاستبدال للأصناف البطيئة لمدة شهر',
        'طباعة وتوفير ملصقات الباركود وجدول تسعير استرشادي للمحاسبة والكاشير',
        'تعويض 100% فوري لأي قطعة متضررة أثناء الشحن دون إجراءات معقدة',
        'مدير حساب مخصص لمتابعة النواقص وتجديد المخزون دورياً'
      ]
    },
    {
      id: 'enterprise',
      name: 'باقة التوريد المؤسسي والموزعين',
      subtitle: 'للهايبرماركت، الفنادق، ومراكز التخفيضات الكبرى وتجار التوزيع',
      price: 'أسعار حاويات خاصة',
      originalCostValue: '',
      resaleValue: 'أعلى عائد سوقي',
      featured: false,
      badge: 'شراكة استراتيجية',
      features: [
        'أسعار استيراد مباشرة من المصنع مع خصومات تصل إلى 38% للكميات الكبيرة',
        'إمكانية التوريد بالباليت (طبليات) أو الحجز المسبق من الحاويات القادمة',
        'إصدار فواتير ائتمانية وجدولة توريد شهرية أو أسبوعية منتظمة',
        'تخصيص عبوات أو علامة تجارية خاصة (Private Label) للكميات السنوية',
        'أولوية الشحن عبر أسطول النقل المجهز لباب مستودعاتكم'
      ]
    }
  ],

  /* ── B2B Supply Process Steps ──────────────────────────────── */
  processSteps: [
    {
      step: '01',
      title: 'استيراد مباشر من المصانع',
      desc: 'نستورد كمياتنا مباشرة من كبرى مصانع الصين وكوريا وتركيا بدون وسطاء، لنمنح التاجر أقل سعر تكلفة في السوق.'
    },
    {
      step: '02',
      title: 'فحص ومطابقة المخبر والباركود',
      desc: 'كل شحنة تخضع لفحص جودة الطلاء، سمك المعدن، وشهادات السلامة الغذائية مع ترقيم باركود جاهز للبيع.'
    },
    {
      step: '03',
      title: 'تعبئة وتغليف مضاد للكسر',
      desc: 'نستخدم حشوات الفوم والكراتين المقواة خماسية الطبقات لضمان وصول الزجاجيات والخزف بحالتها المثالية بنسبة 99.8%.'
    },
    {
      step: '04',
      title: 'توريد وتغطية مستمرة لمخزونك',
      desc: 'شحن خلال 24-48 ساعة للمدن الرئيسية، وتوصيل سريع عبر كبرى شركات الشحن لجميع المناطق والقرى.'
    }
  ],

  /* ── Merchant Testimonials ─────────────────────────────────── */
  reviews: [
    {
      name: 'أحمد بن صالح الراجحي',
      role: 'صاحب سلسلة معارض لمسة بيت للأواني',
      rating: 5,
      text: 'نتعامل مع دار الأواني منذ 3 سنوات؛ التزامهم بالمواصفات الفعلية لأطقم الجرانيت والترامس ومستوى التغليف الممتاز قلل نسبة الكسر لدينا إلى الصفر تقريباً.'
    },
    {
      name: 'مؤسسة أطياف التجارية',
      role: 'إدارة المشتريات — 4 فروع سوبرماركت',
      rating: 5,
      text: 'أكبر ميزة وجدناها هي وضوح الفواتير الضريبية وتوفر الباركود الجاهز على كل كرتون وقطعة، إضافة إلى سرعة تعويض أو استبدال أي صنف خلال ساعات.'
    },
    {
      name: 'أميرة الشهري',
      role: 'مؤسسة متجر بيتي الحديث الإلكتروني',
      rating: 5,
      text: 'بدأت بباقة الانطلاقة وتسهيلاتهم في تزويدي بالصور الاستوديو ساعدتني أبيع الكمية خلال أسبوعين فقط. حالياً نطلب أسبوعياً بالكميات الكبيرة.'
    },
    {
      name: 'خالد الغامدي',
      role: 'مدير مركز تـوفيـر الـتـخـفـيـضـات',
      rating: 5,
      text: 'أسعارهم في البلاستيكات وحافظات الطعام منافسة جداً وتعطينا هامش ربح ممتاز يسمح لنا بعمل عروض تجذب المتسوقين باستمرار.'
    }
  ],

  /* ── B2B Frequently Asked Questions ────────────────────────── */
  faqs: [
    {
      q: 'ما هو الحد الأدنى للطلب (MOQ) للاستفادة من أسعار الجملة؟',
      a: 'الحد الأدنى للطلب التجاري هو 1,500 ريال فقط، ويمكنك تنويع الطلبية بأقل كمية 1 كرتون من كل صنف لتجربة حركة البيع في محلك، كما تحصل على شحن مجاني وخصم إضافي 6% عند وصول الطلبية إلى 5,000 ريال فأكثر.'
    },
    {
      q: 'ماذا يحدث إذا تعرضت قطعة زجاجية أو خزفية للكسر أثناء الشحن؟',
      a: 'لا يتحمل التاجر أي خسارة؛ فقط صوّر القطعة المتضررة عند استلام الشحنة خلال 48 ساعة وأرسلها لمدير حسابك على واتساب، وسيتم خصم قيمتها فوراً من الفاتورة أو إرسال بديل مجاني مع شحنتك القادمة.'
    },
    {
      q: 'هل الأسعار المعروضة في الكتالوج شاملة الضريبة وهل تصدرون فواتير ضريبية إلكترونية؟',
      a: 'نعم، نصدر فواتير ضريبية إلكترونية رسمية معتمدة تتضمن الرقم الضريبي واسم منشأتك أو سجلك التجاري، مما يتيح لك إدخال المشتريات في نظامك المحاسبي والخصم الضريبي بكل نظامية.'
    },
    {
      q: 'هل يمكنني طلب عينات أو معاينة البضاعة في المستودع قبل التوريد الكبير؟',
      a: 'بكل تأكيد! نرحب بجميع التجار وأصحاب المعارض لزيارة صالة العرض التجارية ومستودعاتنا المركزية لمعاينة خامات الجرانيت والستانلس والبورسلين يداً بيد يومياً من 8 صباحاً حتى 9 مساءً.'
    },
    {
      q: 'هل توفرون خدمة استبدال الأصناف التي لم تبع في معرضي؟',
      a: 'نعم، ضمن باقة التاجر الشامل وبوليصة شركائنا الدائمين، نوفر إمكانية استبدال الأصناف الراكدة (بحالتها وكرتونها الأصلي) بأصناف أخرى أكثر طلباً في منطقتك خلال 30 يوماً من تاريخ الشراء.'
    },
    {
      q: 'كيف يتم الشحن لخارج المدينة الرئيسية وكم يستغرق؟',
      a: 'يتم التجهيز والتحميل في نفس يوم تأكيد الطلبية. التوصيل داخل المدينة مجاني في غضون 24 ساعة عبر أسطولنا، ولباقي المدن والمحافظات يتم الشحن عبر مكاتب النقل السريع والمخصصة للطرود التجارية خلال 48 إلى 72 ساعة.'
    }
  ]
};
