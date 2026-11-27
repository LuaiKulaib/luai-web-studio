/* =========================================================
   data.js — تهامة جولدن تروبيكس (Tihama Golden Tropics®)
   Al-Hudaydah, Yemen — International Mango Export Platform
   ========================================================= */
'use strict';

const MANGO_CONFIG = {
  whatsappNumber: '967782259937',
  brandAr: 'تهامة جولدن تروبيكس',
  brandEn: 'Tihama Golden Tropics®',
  origin: 'وادي سهام وزبيد — الحديدة، الجمهورية اليمنية',
  standardRef: 'UNECE FFV-45 · Class I · GlobalG.A.P. Aligned',
};

const MANGO_DATA = {
  kpis: [
    { value: '+4,200', unit: 'طن متري', label: 'الطاقة التصديرية الموسمية' },
    { value: '18°–23°', unit: 'Brix', label: 'نسبة الحلاوة المخبرية' },
    { value: '10°–12°C', unit: 'Reefer', label: 'سلسلة التبريد المستمرة' },
    { value: '+14', unit: 'دولة', label: 'وجهات التصدير (الخليج وأوروبا)' },
  ],

  cultivars: [
    {
      id: 'qalb-althawr',
      mode: 'air',
      badge: 'صنف ملكي · خالٍ من الألياف',
      nameAr: 'مانجو قلب الثور التهامي',
      nameEn: 'Qalb Al-Thawr (Hodeidah Heritage)',
      brix: '20° – 23° Brix',
      dryMatter: '≥ 16.5%',
      weightRange: '450 – 750 جم',
      caliber: '6 / 7 / 8 حبة',
      shelfLife: '10–14 يوماً (شحن جوي وبري مبرّد)',
      desc: 'أيقونة مزارع الحديدة ووديان تهامة: قوام كريمي غني خالٍ تماماً من الألياف، رائحة استوائية نفاذة، وطعم سكري مركّز مطلوب في متاجر الخليج الراقية.',
      image: 'assets/images/mangoes.jpg',
    },
    {
      id: 'taimour',
      mode: 'retail',
      badge: 'الأكثر طلباً في الخليج',
      nameAr: 'مانجو التيمور الفاخر',
      nameEn: 'Tihama Taimour Class I',
      brix: '19° – 21° Brix',
      dryMatter: '≥ 15.5%',
      weightRange: '350 – 500 جم',
      caliber: '8 / 9 / 10 حبة',
      shelfLife: '14–18 يوماً (مناسب لرفوف السوبرماركت)',
      desc: 'لون ذهبي مشرق مع لب متماسك وعصاري، مثالي لسلاسل الهايبرماركت وبوكسات الضيافة الفاخرة 3 كجم و4.5 كجم.',
      image: 'assets/images/hero.jpg',
    },
    {
      id: 'zubda',
      mode: 'sea',
      badge: 'تحمّل عالٍ للشحن البحري',
      nameAr: 'مانجو الزبدة التهامي',
      nameEn: 'Zubda Export Grade A',
      brix: '17° – 19° Brix',
      dryMatter: '≥ 15.0%',
      weightRange: '400 – 650 جم',
      caliber: '7 / 8 / 9 حبة',
      shelfLife: '20–24 يوماً (حاويات بحرية 40ft Reefer)',
      desc: 'صنف تصديري استراتيجي يتميز بقشرة متينة وتجانس عالٍ في الأحجام، مما يجعله الخيار الأول لعقود الشحن البحري وعصائر المصانع العالمية.',
      image: 'assets/images/crate.jpg',
    },
    {
      id: 'hindi-special',
      mode: 'retail',
      badge: 'لون وتوازن حمضي مثالي',
      nameAr: 'مانجو الهندي الخاص (بياض)',
      nameEn: 'Hindi Special — Red Blush',
      brix: '18° – 20° Brix',
      dryMatter: '≥ 14.5%',
      weightRange: '300 – 450 جم',
      caliber: '10 / 12 حبة',
      shelfLife: '14–18 يوماً (شحن بري وجوي)',
      desc: 'ثمرة متوسطة متناسقة بخدود حمراء جذابة وتوازن دقيق بين الحلاوة والانتعاش الحمضي، مفضّلة لأسواق التجزئة والمطاعم.',
      image: 'assets/images/mangoes.jpg',
    },
    {
      id: 'samaka',
      mode: 'air',
      badge: 'شحن جوي · هدايا VIP',
      nameAr: 'مانجو السمكة الملكية (عويس تهامة)',
      nameEn: 'Samaka / Golden Ewais',
      brix: '20° – 22° Brix',
      dryMatter: '≥ 16.0%',
      weightRange: '280 – 400 جم',
      caliber: '12 / 14 حبة',
      shelfLife: '10–12 يوماً (شحن جوي سريع)',
      desc: 'ثمرة عطرية مركّزة بنواة رقيقة ونسبة لب تتجاوز 78%، تُقطف يدوياً وتُغلّف بشبك EPE الفردي للأسواق المختصة.',
      image: 'assets/images/hero.jpg',
    },
  ],

  months: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],

  // 0 = غير متاح, 1 = بداية/نهاية موسم (محدود), 2 = ذروة التصدير (متاح بكميات تجارية)
  calendar: [
    { cultivar: 'التيمور الفاخر',        levels: [0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0] },
    { cultivar: 'قلب الثور التهامي',     levels: [0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0] },
    { cultivar: 'الزبدة التهامي',        levels: [0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0] },
    { cultivar: 'الهندي الخاص',          levels: [0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0] },
    { cultivar: 'السمكة الملكية',        levels: [0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0] },
  ],

  packagingOptions: [
    { id: 'box-45', label: 'كرتون تصديري مفتوح التهوية (4.5 كجم صافي)', netKg: 4.5, grossKg: 5.0, perEuroPallet: 160, perReefer40: 4160, note: 'تهوية 7% + شبك حماية EPE لكل ثمرة' },
    { id: 'box-50', label: 'كرتون تجاري معياري (5.0 كجم صافي)', netKg: 5.0, grossKg: 5.6, perEuroPallet: 144, perReefer40: 3600, note: 'طبقة واحدة متراصة + فواصل كرتونية' },
    { id: 'box-30', label: 'صندوق هدايا سوبرماركت VIP (3.0 كجم صافي)', netKg: 3.0, grossKg: 3.4, perEuroPallet: 200, perReefer40: 5200, note: 'ورق تغليف مذهب + باركود التتبع' },
  ],

  allocations: [
    { id: 'pallet',   label: 'باليت تصديري (1 Euro-Pallet)', mult: 'pallet' },
    { id: 'reefer20', label: 'شاحنة / حاوية 20 قدم مبرّدة (10 باليت)', mult: 10 },
    { id: 'reefer40', label: 'حاوية بحرية 40 قدم High-Cube (26 باليت)', mult: 'reefer40' },
  ],

  coldChainSteps: [
    {
      num: '01',
      title: 'القطف عند النضج الفسيولوجي',
      desc: 'قطف يدوي في الصباح الباكر قبل ارتفاع الحرارة مع فحص المادة الجافة (≥ 15%) لتجنب الكدمات.',
    },
    {
      num: '02',
      title: 'المعالجة الحرارية والتبريد المسبق',
      desc: 'غسل وتعقيم وتجفيف ثم خفض حرارة الثمرة إلى 10°–12°C خلال 6 ساعات داخل محطة التعبئة بالحديدة.',
    },
    {
      num: '03',
      title: 'الفرز والتدريج UNECE FFV-45',
      desc: 'فرز دقيق بالأوزان والأحجام (Count 6–14) تحت سقف عيوب ظاهرية أقل من 5% للفئة الممتازة Class I.',
    },
    {
      num: '04',
      title: 'التحميل المبرّد وأجهزة Data Logger',
      desc: 'شحن بحاويات مزودة بأجهزة تسجيل الحرارة والرطوبة مع شهادة الصحة النباتية Phytosanitary وفحص MRL.',
    },
  ],

  certifications: [
    { code: 'UNECE FFV-45', title: 'معيار الجودة الدولي', desc: 'مطابقة تامة لتصنيف الدرجة الأولى Class I في الشكل واللون.' },
    { code: 'GlobalG.A.P.', title: 'ممارسات زراعية جيدة', desc: 'تتبّع كامل من الحوض الزراعي في تهامة حتى رقم الشحنة.' },
    { code: 'HACCP / ISO',  title: 'سلامة محطة التعبئة', desc: 'تعبئة صحية مؤمنة في كراتين متوافقة مع التهوية والغازات.' },
    { code: 'MRL & Phyto',  title: 'شهادة الصحة النباتية', desc: 'خلو من الآفات الحجرية ومطابقة حدود متبقيات المبيدات للخليج وأوروبا.' },
  ],
};
