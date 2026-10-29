/* ============================================================
   كروم برو — Site Data
   assets/js/data.js
   ============================================================ */
const DATA = {

  // Promo Bar
  promo: {
    badge: 'عرض خاص',
    text: 'خصم 20% على باقة الحماية الفضية والذهبية + تقسيط 4 دفعات بدون فوائد عبر تابي وتمارا!',
    linkText: 'احجز العرض الآن',
    linkUrl: 'https://wa.me/966500000000?text=' + encodeURIComponent('السلام عليكم، أود الاستفادة من العرض الموسمي لخصم 20% على باقات الحماية.')
  },

  // Brand Partners & Trust Highlights (Pure SVG Icons)
  brands: [
    {
      name: 'XPEL',
      desc: 'أفلام الحماية الذاتية الأمريكية',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    },
    {
      name: '3M',
      desc: 'عوازل نانو سيراميك المعتمدة',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    },
    {
      name: 'GTECHNIQ',
      desc: 'حماية طلاء كريستال سيراميك',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 13L2 9z"/></svg>`
    },
    {
      name: 'SUNTEK',
      desc: 'أفلام التظليل المقاومة للحرارة',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
    },
    {
      name: 'KOCH-CHEMIE',
      desc: 'مواد الديتيلنج الألمانية الفاخرة',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
    },
    {
      name: 'STEK',
      desc: 'أفلام حماية هيدروفوبيك ذكية',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
    },
    {
      name: 'HEXIS',
      desc: 'تجليد وأفلام بوليمر فرنسية',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`
    },
    {
      name: 'AVERY DENNISON',
      desc: 'أفلام تغيير الألوان الفاخرة',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>`
    }
  ],

  trustPillars: [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      title: 'ضمان رسمي حتى 10 سنوات',
      sub: 'شهادة ضمان إلكترونية معتمدة'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0"/></svg>`,
      title: 'كابينة تركيب معقمة ومفلترة',
      sub: 'بيئة خالية 100% من الأتربة والشوائب'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
      title: 'تقسيط تابي وتمارا بدون فوائد',
      sub: 'قسّم فاتورتك على 4 دفعات مريحة'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      title: 'التزام صارم بمواعيد التسليم',
      sub: 'تسليم في الموعد المحدد مع فحص الجودة'
    },
  ],

  // Interactive Pricing Calculator
  calculator: {
    carTypes: [
      { id: 'sedan', name: 'سيدان / هاتشباك', factor: 1.0, icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H7c-.6 0-1.1.2-1.5.6L3 10.5V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>` },
      { id: 'suv', name: 'جيب / عائلية SUV', factor: 1.25, icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 16H9m10 0h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-3l-2.5-4H6.5L3 9v5a2 2 0 0 0 2 2h1"/><circle cx="7.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>` },
      { id: 'supercar', name: 'سوبركار / كوبيه رياضية', factor: 1.45, icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 17h14M3 13l2-5h14l2 5M2 13h20v4a1 1 0 0 1-1 1h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3a1 1 0 0 1-1-1v-4z"/></svg>` },
    ],
    services: [
      { id: 'front-ppf', name: 'حماية الواجهة الأمامية PPF', basePrice: 2400, duration: 'يوم عمل واحد', warranty: 'ضمان 5 سنوات' },
      { id: 'full-ppf', name: 'حماية الهيكل بالكامل PPF', basePrice: 8500, duration: '3 - 4 أيام عمل', warranty: 'ضمان 10 سنوات' },
      { id: 'ceramic', name: 'نانو سيراميك 10H ثلاثي الطبقات', basePrice: 1600, duration: 'يوم ونصف', warranty: 'ضمان 3 سنوات' },
      { id: 'tint-ppf', name: 'باكيج حماية مقدمة + عازل حراري', basePrice: 3200, duration: 'يوم ونصف', warranty: 'ضمان 5 سنوات' },
      { id: 'full-protection', name: 'باكيج الحماية الملكية VIP الشاملة', basePrice: 11000, duration: '4 أيام عمل', warranty: 'ضمان 10 سنوات' },
    ]
  },

  // Services
  services: [
    {
      icon: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      title: 'حماية الطلاء بفيلم PPF',
      desc: 'أفلام حماية أمريكية أصلية عالية الشفافية مع خاصية الالتئام الذاتي بالحرارة لحماية الهيكل من الحصى والترميل.',
      duration: '٢ - ٣ أيام',
      warranty: 'ضمان ١٠ سنوات',
      badge: 'الدرع الأقوى للهيكل',
      link: 'احسب التكلفة لسيارتك',
    },
    {
      icon: `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
      title: 'طلاء نانو سيراميك 10H',
      desc: 'طبقات حماية كريستالية زجاجية تعطي لمعاناً فائقاً وعمقاً للون، مع خاصية طرد الماء والأوساخ وسهولة الغسيل الفائقة.',
      duration: 'يوم ونصف',
      warranty: 'ضمان ٥ سنوات',
      badge: 'لمعان زجاجي عاكس',
      link: 'احسب التكلفة لسيارتك',
    },
    {
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
      title: 'عازل حراري كربوني',
      desc: 'عزل حراري نانو سيراميك معتمد بنسبة حجب حرارة وأشعة تحت الحمراء IR تصل إلى 98% وتوفير رؤية ليلية فائقة الوضوح.',
      duration: '٣ - ٤ ساعات',
      warranty: 'ضمان ١٠ سنوات',
      badge: 'عزل حراري 98%',
      link: 'اطلب عرض سعر',
    },
    {
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
      title: 'تلميع ومعالجة الطلاء',
      desc: 'تصحيح طلاء متقدم من 3 مراحل لإزالة الدوائر والخدوش السطحية واستعادة بريق الوكالة الأصلي.',
      duration: 'يوم كامل',
      warranty: 'تصحيح 95%',
      badge: 'إعادة إحياء الطلاء',
      link: 'اطلب عرض سعر',
    },
    {
      icon: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      title: 'تنظيف وعناية تفصيلية',
      desc: 'ديتيلنج داخلي عميق بالبخار والتعقيم مع معالجة وترطيب الجلد والمقصورة ضد التشقق والبهتان.',
      duration: '٥ - ٦ ساعات',
      warranty: 'تعقيم نانو',
      badge: 'رائحة ونظافة وكالة',
      link: 'اطلب عرض سعر',
    },
    {
      icon: `<svg viewBox="0 0 24 24"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
      title: 'تجليد ولوازم زينة',
      desc: 'تغيير ألوان بالكامل أو جزئي (Roof wrap, Chrome delete)، جنوط مخصصة، وإكسسوارات حصرية.',
      duration: '١ - ٢ أيام',
      warranty: 'ضمان ٣ سنوات',
      badge: 'طابع رياضي حصري',
      link: 'اطلب عرض سعر',
    },
  ],

  // 3 Packages: البرونزية / الفضية / الذهبية VIP
  packages: [
    {
      name: 'باقة البرونزية',
      sub: 'تلميع ومعالجة وسيراميك سنة',
      desc: 'مخصصة للسيارات التي تحتاج استعادة بريق الطلاء وحماية نانو سيراميك أساسية.',
      price: '١,٤٩٠',
      featured: false,
      badge: 'بداية مثالية',
      features: [
        'تصحيح طلاء احترافي وإزالة الدوائر السطحية',
        'تطبيق طبقة نانو سيراميك 9H تدوم سنة كاملة',
        'تلميع وحماية الجنوط ومقابض الأبواب',
        'غسيل تفصيلي ومعالجة الإطارات',
        'ضمان رسمي لمدة سنة واحدة',
      ]
    },
    {
      name: 'باقة الفضية',
      sub: 'حماية PPF نصفي + عازل حراري',
      desc: 'الباقة الأكثر طلباً لحماية واجهة السيارة من الحصى مع عزل حراري للمقصورة.',
      price: '٣,٤٥٠',
      featured: true,
      badge: 'الأكثر طلباً ⭐',
      features: [
        'حماية الواجهة الأمامية PPF (الصدام + الكبوت كامل + الأنوار + المرايا)',
        'تظليل عازل حراري نانو سيراميك كربوني لكامل نوافذ السيارة',
        'حماية أطراف الأبواب والمقابض ضد الصدمات بفيلم شفاف',
        'معالجة نانو طاردة للمياه على الزجاج الأمامي',
        'ضمان معتمد 5 سنوات على الحماية والعازل الحراري',
      ]
    },
    {
      name: 'باقة الذهبية VIP',
      sub: 'حماية كاملة 10 سنوات + نانو للجنوط والجلد',
      desc: 'الدرع الأسطوري الشامل للهيكل والمقصورة مع أقصى درجات الضمان والرفاهية.',
      price: '٩,٨٠٠',
      featured: false,
      badge: 'حماية شاملة 100%',
      features: [
        'تغليف كامل لهيكل السيارة بفيلم PPF فائق الشفافية والالتئام الذاتي',
        'نانو سيراميك 10H مخصص لحماية الجنوط ومكابس المكابح',
        'نانو سيراميك داخلي لحماية جلود وفرش المقصورة من التصبغات',
        'عازل حراري بنسبة حجب IR 98% وتظليل البانوراما',
        'ضمان شامل لمدة ١٠ سنوات مع فحص وصيانة دورية مجانية',
        'خدمة استلام وتسليم السيارة عبر سطحة VIP مغلقة مجاناً',
      ]
    }
  ],

  // 4 Steps with matched 4 Real Images
  steps: [
    {
      num: '01',
      title: 'فحص وتشخيص دقيق',
      desc: 'معاينة حالة الطلاء بجهاز قياس السماكة الرقمي وكشف الخدوش والعيوب تحت إضاءة ديتيلنج متخصصة لتحديد خطة العمل بدقة.',
      img: 'assets/images/step-1.jpg',
      badge: 'فحص شامل ومجاني'
    },
    {
      num: '02',
      title: 'تجهيز وغسيل تفصيلي',
      desc: 'غسيل متعدد المراحل باستخدام مادة الكلاي بار (Clay Bar) لإزالة ذرات الحديد والأكسدة العالقة، لتجهيز السطح كمرآة نقية.',
      img: 'assets/images/step-2.jpg',
      badge: 'تعقيم وإزالة الشوائب'
    },
    {
      num: '03',
      title: 'التنفيذ في كابينة معقمة',
      desc: 'قص الفيلم إلكترونياً بأبعاد سيارتك بالملليمتر وتطبيقه داخل كابينة مغلقة خالية من الغبار والحرارة العالية لضمان نقاء مثالي.',
      img: 'assets/images/step-3.jpg',
      badge: 'كابينة خالية 100% من الأتربة'
    },
    {
      num: '04',
      title: 'فحص الجودة وتسليم الضمان',
      desc: 'مراجعة كافة الحواف والزوايا تحت أجهزة التجفيف الحراري، وتسليم شهادة الضمان الإلكتروني المعتمدة مع إرشادات الغسيل السليم.',
      img: 'assets/images/step-4.jpg',
      badge: 'شهادة ضمان معتمدة'
    },
  ],

  // Before / After Cases
  beforeAfterCases: [
    {
      id: 'ceramic',
      title: 'معالجة وتلميع نانو سيراميك',
      category: 'تصحيح طلاء + سيراميك 10H',
      desc: 'معالجة بهتان الطلاء وإزالة الخدوش الدائرية بنسبة 95% مع إضافة طبقة زجاجية عاكسة.',
      specs: [
        { label: 'مدة العمل', val: 'يوم ونصف' },
        { label: 'الضمان', val: '5 سنوات معتمدة' },
        { label: 'المنتج', val: 'Gtechniq Crystal Serum' }
      ],
      beforeImg: 'assets/images/ba-ceramic-before.jpg',
      afterImg: 'assets/images/ba-ceramic-after.jpg',
      beforeLabel: 'قبل: دوائر غسيل وبهتان',
      afterLabel: 'بعد: لمعان وتصحيح 100%'
    },
    {
      id: 'ppf',
      title: 'حماية كاملة بالفيلم الشفاف PPF',
      category: 'درع حماية ذاتي المعالجة',
      desc: 'تغليف الهيكل كاملاً بفيلم حماية فائق الشفافية ضد ضربات الحصى والترميل مع خاصية الالتئام الذاتي بالحرارة.',
      specs: [
        { label: 'مدة العمل', val: '3 أيام عمل' },
        { label: 'الضمان', val: '10 سنوات ضد الاصفرار' },
        { label: 'المنتج', val: 'XPEL Ultimate Plus' }
      ],
      beforeImg: 'assets/images/ba-ppf-before.jpg',
      afterImg: 'assets/images/ba-ppf-after.jpg',
      beforeLabel: 'قبل: معرض للترميل والحصى',
      afterLabel: 'بعد: محمي بدرع التئام ذاتي'
    },
    {
      id: 'tint',
      title: 'عازل حراري كربوني نانو سيراميك',
      category: 'عزل حراري بنسبة 98%',
      desc: 'تركيب عازل حراري بنسبة حجب حرارة IR 98% وتصفية متكاملة للأشعة الضارة مع وضوح رؤية استثنائي ليلاً.',
      specs: [
        { label: 'مدة العمل', val: '3 ساعات فقط' },
        { label: 'الضمان', val: '10 سنوات ضمان استبدال' },
        { label: 'المنتج', val: '3M Crystalline Series' }
      ],
      beforeImg: 'assets/images/ba-tint-before.jpg',
      afterImg: 'assets/images/ba-tint-after.jpg',
      beforeLabel: 'قبل: حرارة لافحة داخل السيارة',
      afterLabel: 'بعد: عزل حراري 98% وبرودة'
    },
    {
      id: 'interior',
      title: 'ديتيلنج وعناية داخلية للمقصورة',
      category: 'تعقيم وحماية الجلود والأنسجة',
      desc: 'تنظيف بالبخار الحراري لجميع الأجزاء، إزالة البقع المستعصية، وتغذية الجلود بمواد ألمانية أصلية.',
      specs: [
        { label: 'مدة العمل', val: '6 ساعات' },
        { label: 'الضمان', val: 'حماية سنة ضد التشققات' },
        { label: 'المنتج', val: 'Koch-Chemie Leather Star' }
      ],
      beforeImg: 'assets/images/ba-interior-before.jpg',
      afterImg: 'assets/images/ba-interior-after.jpg',
      beforeLabel: 'قبل: بهتان واتساخ الأنسجة',
      afterLabel: 'بعد: نظافة ورائحة وكالة'
    }
  ],

  // Reels Video Data
  reels: [
    {
      id: 'r1',
      title: 'اختبار الخدش والالتئام الذاتي لفيلم PPF بالحرارة',
      tag: 'اختبار عملي حقيقي',
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-mechanic-polishing-a-black-car-in-a-workshop-43753-large.mp4',
      poster: 'assets/images/step-3.jpg'
    },
    {
      id: 'r2',
      title: 'انزلاق قطرات الماء الخيالي بعد نانو سيراميك 10H',
      tag: 'طرد السوائل والشوائب',
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-car-washing-in-a-garage-43752-large.mp4',
      poster: 'assets/images/step-2.jpg'
    }
  ],

  // Categorized Gallery
  galleryCategories: [
    { id: 'all', name: 'الكل (١٢)' },
    { id: 'ppf', name: 'أفلام حماية PPF' },
    { id: 'ceramic', name: 'نانو سيراميك وتلميع' },
    { id: 'tint', name: 'عازل حراري وتظليل' },
    { id: 'interior', name: 'ديتيلنج داخلي وتجليد' },
  ],

  gallery: [
    { id: 1, category: 'ceramic', img: 'assets/images/g-1.jpg', label: 'تلميع بورش 911 GT3 RS', sub: 'تصحيح طلاء وسيراميك 10H' },
    { id: 2, category: 'ppf', img: 'assets/images/g-2.jpg', label: 'حماية PPF مرسيدس G63', sub: 'تغليف مطفي كامل مع ضمان 10 سنوات' },
    { id: 3, category: 'ceramic', img: 'assets/images/g-3.jpg', label: 'نانو سيراميك لامبورغيني', sub: 'لمعان كريستالي فائق مع طرد المياه' },
    { id: 4, category: 'tint', img: 'assets/images/g-4.jpg', label: 'عازل وتظليل بي إم دبليو M8', sub: 'عازل حراري كربوني بنسبة عزل 98%' },
    { id: 5, category: 'interior', img: 'assets/images/g-5.jpg', label: 'تفصيل داخلي رينج روفر', sub: 'بخار حراري وتغذية الجلود الفاخرة' },
    { id: 6, category: 'ppf', img: 'assets/images/g-6.jpg', label: 'درع كامل فيراري F8', sub: 'فيلم حماية أمريكي شفاف ذاتي الالتئام' },
    { id: 7, category: 'ppf', img: 'assets/images/g-7.jpg', label: 'حماية لكزس LX600', sub: 'باكيج حماية الواجهة والكبوت والمرايا' },
    { id: 8, category: 'ceramic', img: 'assets/images/g-8.jpg', label: 'معالجة طلاء أودي RS7', sub: 'إزالة الخدوش الدائرية بنسبة 95%' },
    { id: 9, category: 'ceramic', img: 'assets/images/g-9.jpg', label: 'سيراميك لاندكروزر 300', sub: 'حماية الهيكل والجنوط والزجاج الأمامي' },
    { id: 10, category: 'interior', img: 'assets/images/g-10.jpg', label: 'تجليد وتعتيم ماكلارين', sub: 'تجليد سقف كربوني وحماية الحواف' },
    { id: 11, category: 'ceramic', img: 'assets/images/g-11.jpg', label: 'حماية جنوط ومكابح', sub: 'نانو سيراميك مقاوم لغبار المكابح والحرارة' },
    { id: 12, category: 'ppf', img: 'assets/images/g-12.jpg', label: 'تشطيب ولمعان وكالة', sub: 'فحص نهائي تحت إضاءة الديتيلنج المسرحية' },
  ],

  // FAQs (Accordion Data)
  faqs: [
    {
      q: 'هل فيلم الحماية PPF يبهت أو يصفر مع حرارة وشمس الرياض؟',
      a: 'إطلاقاً. نستخدم حصرياً أفلام حماية أمريكية معتمدة (مثل XPEL وSunTek) معززة بطبقة حماية متقدمة من الأشعة فوق البنفسجية UV وتقنية الالتئام الذاتي (Self-Healing). نقدم معها شهادة ضمان إلكترونية رسمية تصل إلى 10 سنوات ضد الاصفرار، التقشر، أو التغير اللوني مع صيانة وفحص دوري مجاني.'
    },
    {
      q: 'هل إزالة فيلم الحماية بعد سنوات تضر دهان الوكالة الأصلي؟',
      a: 'لا، إطلاقاً. الأفلام التي نركبها مزودة بمادة لاصقة طبية أصلية تلتصق بالطلاء دون أن تتفاعل كيميائياً معه. عند رغبتك في إزالة الفيلم حتى بعد 10 سنوات، يُزال في كبائننا الحرارية المتخصصة بقطعة واحدة ويخرج طلاء الوكالة تحته بنفس لمعان ونظافة اليوم الأول دون أي خدش أو بقايا صمغية.'
    },
    {
      q: 'كم تستغرق مدة العمل لتسليم السيارة؟',
      a: 'تعتمد المدة على الخدمة المختارة لضمان أعلى درجات الدقة: تركيب العازل الحراري أو التلميع السريع يستغرق من 3 إلى 6 ساعات، حماية الواجهة الأمامية PPF تستغرق يوماً كاملاً، بينما حماية كامل الهيكل أو باقات VIP الشاملة تستغرق من 3 إلى 4 أيام عمل تشمل فترة الجفاف الحراري وفحص الجودة النهائي.'
    },
    {
      q: 'متى يمكنني غسيل السيارة بعد استلامها معالجة بالنانو سيراميك أو الـ PPF؟',
      a: 'يُفضل عدم غسيل السيارة بالماء المضغوط أو الصابون لمدة 5 إلى 7 أيام من الاستلام لاكتمال المعالجة والالتصاق الجزيئي النهائي. بعد ذلك، يمكنك غسيلها بكل أمان، بل ستلاحظ أن انزلاق المياه وطرد الأتربة والأوساخ أصبح أسهل بنسبة 80% بفضل الخاصية الهيدروفوبية دون الحاجة لفرك قوي.'
    },
    {
      q: 'هل توفرون خيارات الدفع بالتقسيط بدون فوائد؟',
      a: 'نعم، بكل تأكيد! نحن شركاء معتمدون لخدمتي (تابي Tamara & Tabby)، ويمكنك تقسيم تكلفة أي باقة أو خدمة على 4 دفعات شهرية مريحة ومتساوية بسعر الكاش الفعلي تماماً ودون أي رسوم إضافية أو فوائد، مع الموافقة الفورية عبر رقم جوالك أثناء الحجز.'
    },
    {
      q: 'ما الفرق بين حماية PPF وتطبيق النانو سيراميك؟',
      a: 'فيلم PPF هو درع مادي شفاف ملموس (سماكة 8 إلى 10 ميكرون) يحمي الهيكل من الحصى المتطاير، السافي، وخدوش المفاتيح مع خاصية الالتئام الذاتي بالحرارة. أما النانو سيراميك فهو طبقة كيميائية زجاجية سائلة تندمج مع مسام الطلاء لتعطيه بريقاً مائياً عاكساً وسهولة فائقة في التنظيف وطرد السوائل والكيماويات. والأفضل دائماً الجمع بينهما (حماية PPF للواجهة الأكثر عرضة للصدمات + نانو سيراميك لباقي السيارة).'
    }
  ],

  reviews: [
    { name: 'محمد العتيبي', badge: 'عميل دائم', stars: 5, text: 'شغل راقي جداً، غلفوا سيارتي PPF وكأنها خرجت من الوكالة. الفريق محترف والنتيجة فوق التوقعات.' },
    { name: 'Faisal Al-Qahtani', badge: 'عميل جديد', stars: 5, text: 'Best ceramic coating in Riyadh. My car looks absolutely stunning. The gloss and clarity are unbelievable!' },
    { name: 'سلطان الشمري', badge: 'عميل متكرر', stars: 5, text: 'الدقة في التنفيذ لا تُوصف. جربت أماكن كثيرة بس ما لقيت مثلهم. ضمان مكتوب وخدمة عملاء راقية جداً.' },
    { name: 'نورة الحربي', badge: 'مراجعة جوجل', stars: 5, text: 'أول مرة أزور المحل وما خاب ظني. العازل الحراري خفف حرارة السيارة بشكل ملحوظ تحت شمس الرياض.' },
    { name: 'Khalid Al-Dossary', badge: 'Local Guide', stars: 5, text: 'Amazing work on my Land Cruiser. The PPF edges are tucked seamlessly. Will definitely come back for every new car.' },
    { name: 'عبدالعزيز النجار', badge: 'عميل دائم', stars: 5, text: 'أفضل سيراميك في الرياض بلا منافس. لمعان زجاجي وسهولة غسيل خيالية، الماء ينزلق تلقائياً.' },
    { name: 'Rayan Al-Malki', badge: 'مراجعة جوجل', stars: 5, text: 'Incredible transformation. They detailed my interior and applied 10H ceramic. It looks factory fresh!' },
    { name: 'منى الزهراني', badge: 'عميلة جديدة', stars: 5, text: 'سرعة في الإنجاز ودقة في المواعيد. سلمت سيارتي الصباح واستلمتها العصر بحالة تشبه المعارض تماماً.' },
  ],

  stats: [
    { targetNum: 1200, suffix: '+', label: 'عميل راضٍ في الرياض' },
    { targetNum: 4.9, decimals: 1, suffix: '', label: 'متوسط التقييم من 5 نجوم' },
    { targetNum: 8, suffix: '+', label: 'سنوات خبرة واحتراف' },
    { targetNum: 100, suffix: '%', label: 'خامات أصلية وضمان رسمي' },
  ],
};
