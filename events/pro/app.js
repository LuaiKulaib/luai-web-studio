/* ==========================================================================
   Pro Tier ($120) — Royal Banquet Gallery Pro
   App Logic: Stats & Halls Sync, Guest & Table Estimator, Buffet Switcher,
              Kosha & Lighting Studio, Date Availability Checker, WhatsApp Dispatch
   ========================================================================== */
'use strict';

const PRO_SVG = {
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  sparkles: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M5 18l.8 2.2L8 21l-2.2.8L5 24l-.8-2.2L2 21l2.2-.8z"/></svg>',
  music: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  utensils: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v7"/></svg>',
  shield: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  wa: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
};

const HALL_PRICING = {
  'royal-hall': {
    name: 'القاعة الملكية للأفراح والمؤتمرات',
    baseUsd: 1850,
    minCap: 200,
    maxCap: 600,
  },
  'jasmine-hall': {
    name: 'قاعة الياسمين — للخطوبة والتخرج',
    baseUsd: 980,
    minCap: 100,
    maxCap: 250,
  },
  'catering-vip': {
    name: 'بوفيهات مفتوحة ومآدب الولائم (خارجي)',
    baseUsd: 680,
    minCap: 100,
    maxCap: 600,
  },
};

const BUFFET_TIERS = [
  {
    id: 'yemeni-royal',
    tag: 'AUTHENTIC YEMENI',
    name: 'سفرة يمنية ملكية',
    summary: 'الوليمة اليمنية الأصيلة بإشراف طهاة التراث والمناسبات الكبرى.',
    perGuestUsd: 18,
    courses: [
      'حنيذ لحم بلدي مطهو تقليدياً بالمرخ والفحم',
      'زربيان عدني ومندي بالزعفران واللوز المحمص',
      'مقبلات وسحاوق بالجبن وسلطات طازجة متنوعة',
      'بنت الصحن بعسل السدر الملكي والملوح الساخن',
      'قهوة عربية بالهيل وشاي عدني مبخر طوال الحفل',
      'عصائر طبيعية موسمية ومياه ضيافة فاخرة',
    ],
  },
  {
    id: 'intl-hotel',
    tag: '5-STAR HOTEL BUFFET',
    name: 'بوفيه فندقي عالمي',
    summary: 'بوفيه مفتوح متعدد المحطات يجمع المطبخ الشرقي والغربي الفاخر.',
    perGuestUsd: 24,
    courses: [
      'ركن السلطات الباردة والمقبلات الشامية والمتوسطية',
      'أطباق رئيسية: ستيك، فيليه هامور، ودجاج بالكريمة',
      'محطة أرز بخاري وكبسة ملكية ومكرونات فندقية',
      'ركن شواء حي ومخبوزات فرنسية ساخنة',
      'بوفيه حلويات فرنسية وميني تشيز كيك وتراميسو',
      'ركن مشروبات ساخنة وكوكتيلات ضيافة ترحيبية',
    ],
  },
  {
    id: 'grill-sweets',
    tag: 'GRILL & PASTRY BAR',
    name: 'مشويات وحلويات',
    summary: 'تشكيلة مشويات فحم فاخرة مع مائدة حلويات شرقية وغربية راقية.',
    perGuestUsd: 15,
    courses: [
      'تشكيلة كباب حلبي، شيش طاووق، وأوصال لحم على الفحم',
      'سمبوسك وميني فطائر ومعجنات ضيافة ساخنة',
      'حمص بالطحينة، متبل، وتبولة بلمسة شيف خاص',
      'صواني كنافة بالقشطة، بقلاوة فستق، وبسبوسة ملكية',
      'شاي أحمر وأخضر بالنعناع وقهوة استقبال عربية',
      'تغليف أنيق لتوزيعات الضيوف والحلويات',
    ],
  },
];

const KOSHA_THEMES = [
  {
    id: 'pearl-gold',
    tag: 'CLASSIC PEARL & GOLD',
    name: 'كلاسيك لؤلؤي وذهبي',
    subtitle: 'هيدرانجيا بيضاء وشمعدانات كريستال',
    priceUsd: 380,
    image: '../assets/images/banquet.jpg',
    wash: 'linear-gradient(135deg, rgba(230,201,148,0.22), rgba(251,247,249,0.06))',
    swatches: [
      { label: 'أبيض لؤلؤي', hex: '#FAF8F5' },
      { label: 'ذهب شامبين', hex: '#C6934B' },
      { label: 'عاجي دافئ', hex: '#EDE3D2' },
    ],
    desc: 'تصميم أرستقراطي يعتمد على الزهور البيضاء الكثيفة والكريستال المعلق مع إضاءة دافئة تبرز فخامة الفساتين والمجوهرات.',
    specs: [
      'ممر زفة مرصّع بفازات الكريستال والورود البيضاء',
      'إضاءة مسرحية دافئة 3000K مخصصة للتصوير الفوتوغرافي',
      'تنسيق طاولات الضيوف بأغطية حريرية ومفارش ذهبية',
    ],
  },
  {
    id: 'royal-plum',
    tag: 'ROYAL PLUM & VELVET',
    name: 'خمري ملكي ومخمل',
    subtitle: 'مخمل عنابي وأقواس نحاسية',
    priceUsd: 520,
    image: '../assets/images/banquet.jpg',
    wash: 'linear-gradient(135deg, rgba(62,12,39,0.48), rgba(198,147,75,0.22))',
    swatches: [
      { label: 'خمري ملكي', hex: '#3E0C27' },
      { label: 'نحاس معتّق', hex: '#B47E3E' },
      { label: 'وردي مطفأ', hex: '#C792A4' },
    ],
    desc: 'إخراج مسرحي فخم بالستائر المخملية الداكنة وتباين الذهب الدافئ، مثالي للأعراس الشتوية والسهرات الرسمية الكبرى.',
    specs: [
      'خلفية كوشة مخملية بارتفاع 4.5 متر مع إطارات ذهبية',
      'بروجيكتور إضاءة مركّز (Follow Spot) لممشى الزفة',
      'شمعدانات نحاسية فاخرة على كافة طاولات كبار الشخصيات',
    ],
  },
  {
    id: 'jasmine-rose',
    tag: 'JASMINE BLUSH & LANTERNS',
    name: 'ياسمين وردي رومانسي',
    subtitle: 'زهور وردية وإضاءة فوانيس دافئة',
    priceUsd: 440,
    image: '../assets/images/hall.jpg',
    wash: 'linear-gradient(135deg, rgba(214,120,158,0.25), rgba(230,201,148,0.2))',
    swatches: [
      { label: 'وردي ياسمين', hex: '#D985A7' },
      { label: 'حرير لؤلؤي', hex: '#FBF7F9' },
      { label: 'عنبر دافئ', hex: '#DFA55E' },
    ],
    desc: 'طابع ناعم مفعم بالأنوثة والرومانسية لحفلات الخطوبة والملكة والتخرج مع تنسيق كثيف من الورد الجوري والفوانيس.',
    specs: [
      'أعمدة ورد طبيعي وصناعي بدرجات الزهر والياسمين',
      'سلسلة إضاءة دافئة خلفية (Warm Bokeh Wall)',
      'منضدة استقبال تذكارية ولوحة ترحيب خطية مذهبة',
    ],
  },
  {
    id: 'modern-ivory',
    tag: 'CONTEMPORARY IVORY LED',
    name: 'أبيض نقي معاصر',
    subtitle: 'منصة أكريليك وإضاءة محيطية ذكية',
    priceUsd: 590,
    image: '../assets/images/buffet.jpg',
    wash: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(198,147,75,0.28))',
    swatches: [
      { label: 'عاجي نقي', hex: '#FFFFFF' },
      { label: 'أكريليك شفاف', hex: '#E3E7EC' },
      { label: 'ذهب خفيف', hex: '#D5AC69' },
    ],
    desc: 'خطوط هندسية نظيفة مع منصة عرض أكريليك مضيئة وإضاءة قابلة لتغيير الألوان متزامنة مع دخول العروسين أو عرض المؤتمر.',
    specs: [
      'منصة كوشة هندسية مدمجة بشرائط LED متعددة المشاهد',
      'طاولات ضيافة بيضاء بتشطيب فندقي وزهور صفراء وبيضاء',
      'لوحة تحكم DMX لمزامنة الإضاءة مع المقطع الصوتي',
    ],
  },
];

const state = {
  currency: 'usd',
  hallFilter: 'all',
  guests: 350,
  hallId: 'royal-hall',
  buffetId: 'yemeni-royal',
  koshaId: 'pearl-gold',
  eventType: 'حفل زفاف ملكي',
  eventDate: '',
  eventShift: 'الفترة المسائية (4:00 م – 11:30 م)',
  availabilityStatus: null,
};

function resolveImg(path) {
  if (!path) return '../assets/images/banquet.jpg';
  if (path.startsWith('../assets/')) return path;
  if (path.startsWith('assets/')) return '../' + path;
  return path;
}

function formatPrice(usdAmount) {
  const num = Math.round(Number(usdAmount) || 0);
  if (state.currency === 'sar') {
    const sar = Math.round(num * 3.75);
    return sar.toLocaleString('en-US') + ' ر.س';
  }
  return '$' + num.toLocaleString('en-US');
}

function getIsoOffsetDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getNextWeekendDates() {
  const dates = [];
  const d = new Date();
  d.setDate(d.getDate() + 3);
  while (dates.length < 4) {
    const dow = d.getDay(); // 4=Thu, 5=Fri
    if (dow === 4 || dow === 5) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const labelDay = dow === 4 ? 'الخميس' : 'الجمعة';
      dates.push({ iso: `${y}-${m}-${day}`, label: `${labelDay} ${day}/${m}` });
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function evaluateAvailability(isoDate, hallId, shift) {
  if (!isoDate) {
    return {
      cls: 'is-priority',
      badge: 'يرجى تحديد تاريخ المناسبة',
      text: 'اختر تاريخاً من التقويم أو من تواريخ نهاية الأسبوع المقترحة.',
      note: 'يُفضّل الحجز قبل 21 يوماً لضمان توفر القاعة والتنسيق المخصص.',
      shortLabel: 'بانتظار تحديد التاريخ',
    };
  }

  const parsed = new Date(isoDate + 'T12:00:00');
  const dayOfWeek = Number.isNaN(parsed.getTime()) ? 0 : parsed.getDay();
  const dayNum = Number(isoDate.split('-')[2] || 1);
  const hallName = HALL_PRICING[hallId]?.name || 'القاعة المختارة';
  const isEvening = shift.includes('المسائية');

  // Realistic deterministic availability logic for interactive preview
  if (dayNum % 9 === 0 && isEvening && hallId === 'royal-hall') {
    return {
      cls: 'is-partial',
      badge: 'حجز مسائي مسجّل — بديل متاح',
      text: `الفترة المسائية لـ (${hallName}) مزدحمة في ${isoDate}؛ الفترة الظهيرة أو قاعة الياسمين متاحة.`,
      note: 'يمكنك اختيار الفترة الظهيرة أو تأكيد الانتظار عبر واتساب خلال دقائق.',
      shortLabel: 'فترة مسائية محجوزة — بديل متاح',
    };
  }

  if (dayOfWeek === 4 || dayOfWeek === 5) {
    return {
      cls: 'is-priority',
      badge: 'متاح بأولوية التثبيت (نهاية الأسبوع)',
      text: `${hallName} متاحة مبدئياً بتاريخ ${isoDate} (${isEvening ? 'فترة مسائية' : 'فترة ظهيرة'}).`,
      note: 'أيام الخميس والجمعة تشهد طلباً مرتفعاً — يُنصح بإرسال الاستعلام وتثبيت العربون مبكراً.',
      shortLabel: 'متاح (أولوية نهاية الأسبوع)',
    };
  }

  return {
    cls: 'is-available',
    badge: 'متاح للحجز الفوري',
    text: `${hallName} متاحة بالكامل في تاريخ ${isoDate} مع مرونة كاملة في تجهيز الكوشة مبكراً.`,
    note: 'يشمل حجز منتصف الأسبوع مزايا إضافية في وقت استلام جناح العروس والبروفة الصوتية.',
    shortLabel: 'متاح للحجز الفوري',
  };
}

function renderStats() {
  const el = document.getElementById('pro-stats-ledger');
  if (!el || typeof EVENTS_DATA === 'undefined') return;
  el.innerHTML = EVENTS_DATA.stats
    .map(
      (s) => `
      <div class="ledger-stat">
        <dt>${s.label}</dt>
        <dd class="num-font">${s.value}</dd>
      </div>`
    )
    .join('');
}

function renderHalls() {
  const grid = document.getElementById('pro-halls-grid');
  if (!grid || typeof EVENTS_DATA === 'undefined') return;

  const list =
    state.hallFilter === 'all'
      ? EVENTS_DATA.halls
      : EVENTS_DATA.halls.filter((h) => h.id === state.hallFilter);

  grid.innerHTML = list
    .map((h) => {
      const waText = `أهلاً، أرغب بالاستفسار عن (${h.title}) — الفئة الفاخرة Pro`;
      const waUrl = `https://wa.me/${EVENTS_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;
      const featuresHtml = h.features
        .map((f) => `<li>${PRO_SVG.check}<span>${f}</span></li>`)
        .join('');
      const basePrice = HALL_PRICING[h.id]?.baseUsd || 1000;

      return `
        <article class="hall-pro-card">
          <div class="hall-pro-img">
            <img src="${resolveImg(h.image)}" alt="${h.title}" loading="lazy">
            <span class="hall-pro-badge">${h.badge}</span>
          </div>
          <div class="hall-pro-body">
            <div class="hall-pro-cap">${h.capacity} · ابتداءً من <span class="num-font">${formatPrice(basePrice)}</span></div>
            <h3>${h.title}</h3>
            <p>${h.desc}</p>
            <ul class="hall-pro-features">${featuresHtml}</ul>
            <div class="hall-card-actions">
              <button type="button" class="btn-select-hall" data-pick-hall="${h.id}">
                اختيار للحاسبة والتقدير
              </button>
              <a href="${waUrl}" class="btn-wa-mini" target="_blank" rel="noopener" aria-label="استفسار واتساب حول ${h.title}">
                ${PRO_SVG.wa}
              </a>
            </div>
          </div>
        </article>`;
    })
    .join('');
}

function renderPerks() {
  const grid = document.getElementById('pro-perks-grid');
  if (!grid || typeof EVENTS_DATA === 'undefined') return;
  grid.innerHTML = EVENTS_DATA.perks
    .map((p) => {
      const title = p.title.replace('وضيفة', 'وضيافة');
      return `
        <div class="perk-pro-card">
          <div class="perk-pro-icon">${PRO_SVG[p.icon] || PRO_SVG.sparkles}</div>
          <h4>${title}</h4>
          <p>${p.desc}</p>
        </div>`;
    })
    .join('');
}

function renderBuffetTiers() {
  const grid = document.getElementById('pro-buffet-grid');
  const menuList = document.getElementById('pro-buffet-menu-list');
  if (!grid || !menuList) return;

  grid.innerHTML = BUFFET_TIERS.map((b) => {
    const active = b.id === state.buffetId;
    return `
      <button type="button" class="buffet-tier-btn ${active ? 'is-active' : ''}" data-buffet="${b.id}" role="radio" aria-checked="${active}">
        <span class="buffet-tier-tag en-serif">${b.tag}</span>
        <strong>${b.name}</strong>
        <small>${b.summary}</small>
        <div class="buffet-tier-rate num-font">${formatPrice(b.perGuestUsd)} / ضيف</div>
      </button>`;
  }).join('');

  const current = BUFFET_TIERS.find((b) => b.id === state.buffetId) || BUFFET_TIERS[0];
  menuList.innerHTML = current.courses
    .map((c) => `<li>${PRO_SVG.check}<span>${c}</span></li>`)
    .join('');
}

function renderKoshaThemes() {
  const tabsEl = document.getElementById('pro-kosha-tabs');
  if (!tabsEl) return;

  tabsEl.innerHTML = KOSHA_THEMES.map((t) => {
    const active = t.id === state.koshaId;
    const dotsHtml = t.swatches
      .map((s) => `<i style="background:${s.hex}" title="${s.label}"></i>`)
      .join('');
    return `
      <button type="button" class="kosha-theme-btn ${active ? 'is-active' : ''}" data-kosha="${t.id}" role="radio" aria-checked="${active}">
        <div class="kosha-btn-info">
          <strong>${t.name}</strong>
          <span>${t.subtitle}</span>
        </div>
        <div class="kosha-btn-meta">
          <div class="kosha-swatch-dots">${dotsHtml}</div>
          <div class="kosha-btn-price num-font">+ ${formatPrice(t.priceUsd)}</div>
        </div>
      </button>`;
  }).join('');

  const activeTheme = KOSHA_THEMES.find((t) => t.id === state.koshaId) || KOSHA_THEMES[0];
  const imgEl = document.getElementById('pro-kosha-img');
  const washEl = document.getElementById('pro-kosha-wash');
  const tagEl = document.getElementById('pro-kosha-tag');
  const priceEl = document.getElementById('pro-kosha-price');
  const swatchesEl = document.getElementById('pro-kosha-swatches');
  const titleEl = document.getElementById('pro-kosha-title');
  const descEl = document.getElementById('pro-kosha-desc');
  const specsEl = document.getElementById('pro-kosha-specs');

  if (imgEl) {
    imgEl.src = activeTheme.image;
    imgEl.alt = activeTheme.name;
  }
  if (washEl) washEl.style.background = activeTheme.wash;
  if (tagEl) tagEl.textContent = activeTheme.tag;
  if (priceEl) priceEl.textContent = formatPrice(activeTheme.priceUsd);
  if (swatchesEl) {
    swatchesEl.innerHTML = activeTheme.swatches
      .map((s) => `<span class="swatch-chip"><i style="background:${s.hex}"></i>${s.label}</span>`)
      .join('');
  }
  if (titleEl) titleEl.textContent = activeTheme.name;
  if (descEl) descEl.textContent = activeTheme.desc;
  if (specsEl) {
    specsEl.innerHTML = activeTheme.specs
      .map((sp) => `<li>${PRO_SVG.check}<span>${sp}</span></li>`)
      .join('');
  }
}

function getEstimateCalculation() {
  const hall = HALL_PRICING[state.hallId] || HALL_PRICING['royal-hall'];
  const buffet = BUFFET_TIERS.find((b) => b.id === state.buffetId) || BUFFET_TIERS[0];
  const kosha = KOSHA_THEMES.find((k) => k.id === state.koshaId) || KOSHA_THEMES[0];

  const tablesCount = Math.ceil(state.guests / 10);
  const staffCount = Math.max(8, Math.ceil(state.guests / 20));
  const vipTables = state.guests >= 300 ? 3 : 2;

  const hallUsd = hall.baseUsd;
  const buffetUsd = state.guests * buffet.perGuestUsd;
  const koshaUsd = kosha.priceUsd;
  const totalUsd = hallUsd + buffetUsd + koshaUsd;
  const perGuestUsd = Math.round(totalUsd / state.guests);
  const depositUsd = Math.round(totalUsd * 0.3);

  return {
    hall,
    buffet,
    kosha,
    tablesCount,
    staffCount,
    vipTables,
    hallUsd,
    buffetUsd,
    koshaUsd,
    totalUsd,
    perGuestUsd,
    depositUsd,
  };
}

function updateEstimatorAndSummary() {
  const guestsValueEl = document.getElementById('pro-guests-value');
  const hallSelectEl = document.getElementById('pro-hall-select');
  const hallRecEl = document.getElementById('pro-hall-recommend');

  if (guestsValueEl) guestsValueEl.textContent = `${state.guests} ضيف`;
  if (hallSelectEl) hallSelectEl.value = state.hallId;

  if (hallRecEl) {
    if (state.hallId === 'jasmine-hall' && state.guests > 250) {
      hallRecEl.textContent = 'تنبيه: سعة قاعة الياسمين القصوى 250 ضيفاً — يُوصى بالتبديل إلى القاعة الملكية.';
    } else if (state.guests <= 250 && state.hallId === 'jasmine-hall') {
      hallRecEl.textContent = 'اختيار مثالي: قاعة الياسمين تمنح استغلالاً مريحاً وتكلفة اقتصادية لعدد ضيوفك.';
    } else if (state.hallId === 'catering-vip') {
      hallRecEl.textContent = 'تشمل الباقة نقل تجهيزات البوفيه والطاولات والطاقم إلى موقع مناسبتك الخارجي.';
    } else {
      hallRecEl.textContent = 'القاعة الملكية تستوعب حتى 600 ضيف بخلو كامل من الأعمدة ومدخل VIP مستقل.';
    }
  }

  document.querySelectorAll('#pro-guests-presets .preset-chip').forEach((btn) => {
    btn.classList.toggle('is-active', Number(btn.dataset.guests) === state.guests);
  });

  const calc = getEstimateCalculation();
  const avail = evaluateAvailability(state.eventDate, state.hallId, state.eventShift);
  state.availabilityStatus = avail;

  // Estimator card fields
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText('est-tables-count', String(calc.tablesCount));
  setText('est-staff-count', String(calc.staffCount));
  setText('est-vip-tables', String(calc.vipTables));
  setText('est-hall-name', calc.hall.name);
  setText('est-buffet-name', calc.buffet.name);
  setText('est-kosha-name', calc.kosha.name);
  setText('est-hall-cost', formatPrice(calc.hallUsd));
  setText('est-buffet-cost', formatPrice(calc.buffetUsd));
  setText('est-kosha-cost', formatPrice(calc.koshaUsd));
  setText('est-total-cost', formatPrice(calc.totalUsd));
  setText('est-per-guest', formatPrice(calc.perGuestUsd));
  setText('est-deposit', formatPrice(calc.depositUsd));

  // Availability banner
  const banner = document.getElementById('pro-avail-banner');
  if (banner) {
    banner.classList.remove('is-available', 'is-priority', 'is-partial');
    banner.classList.add(avail.cls);
  }
  setText('pro-avail-badge', avail.badge);
  setText('pro-avail-text', avail.text);
  setText('pro-avail-note', avail.note);

  // Booking summary ticket
  setText('sum-event-type', state.eventType);
  setText(
    'sum-event-date',
    state.eventDate ? `${state.eventDate} · ${state.eventShift.split('(')[0].trim()}` : 'غير محدد'
  );
  setText('sum-avail-status', avail.shortLabel);
  setText('sum-hall', calc.hall.name);
  setText('sum-guests-tables', `${state.guests} ضيف (${calc.tablesCount} طاولة)`);
  setText('sum-buffet', calc.buffet.name);
  setText('sum-kosha', calc.kosha.name);
  setText('sum-total', formatPrice(calc.totalUsd));
  setText('sum-deposit', formatPrice(calc.depositUsd));
}

function renderQuickDates() {
  const container = document.getElementById('pro-quick-dates');
  const dateInput = document.getElementById('pro-event-date');
  if (!container || !dateInput) return;

  const list = getNextWeekendDates();
  if (!state.eventDate) {
    state.eventDate = list[0]?.iso || getIsoOffsetDate(10);
  }
  dateInput.min = getIsoOffsetDate(1);
  dateInput.value = state.eventDate;

  container.innerHTML = list
    .map(
      (item) =>
        `<button type="button" class="quick-date-btn ${item.iso === state.eventDate ? 'is-active' : ''}" data-qdate="${item.iso}">${item.label}</button>`
    )
    .join('');
}

function syncQuickDateButtons() {
  document.querySelectorAll('#pro-quick-dates .quick-date-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.qdate === state.eventDate);
  });
}

function buildProSummaryText(includeClientFields) {
  const calc = getEstimateCalculation();
  const avail = state.availabilityStatus || evaluateAvailability(state.eventDate, state.hallId, state.eventShift);
  const name = document.getElementById('pro-client-name')?.value.trim() || 'غير مدخل';
  const phone = document.getElementById('pro-client-phone')?.value.trim() || 'غير مدخل';
  const notes = document.getElementById('pro-client-notes')?.value.trim();

  const lines = [
    `*طلب حجز وتقدير باقة — ${EVENTS_CONFIG.venueName} (الفئة الفاخرة Pro)*`,
    `نوع المناسبة: ${state.eventType}`,
    `التاريخ المقترح: ${state.eventDate || 'غير محدد'} — ${state.eventShift}`,
    `حالة التوفر المبدئية: ${avail.shortLabel}`,
    `القاعة المختارة: ${calc.hall.name}`,
    `عدد الضيوف: ${state.guests} ضيف (${calc.tablesCount} طاولة مستديرة + ${calc.staffCount} مضيفين)`,
    `مستوى البوفيه: ${calc.buffet.name} (${formatPrice(calc.buffet.perGuestUsd)} / ضيف)`,
    `ثيم الكوشة والإضاءة: ${calc.kosha.name}`,
    `الإجمالي التقديري: ${formatPrice(calc.totalUsd)} | عربون التثبيت (30%): ${formatPrice(calc.depositUsd)}`,
  ];

  if (includeClientFields) {
    lines.push(`الاسم: ${name}`);
    lines.push(`الهاتف: ${phone}`);
    if (notes) lines.push(`ملاحظات إضافية: ${notes}`);
  }

  return lines.join('\n');
}

function bindEvents() {
  // Mobile drawer
  const mobileBtn = document.getElementById('pro-mobile-btn');
  const mobileDrawer = document.getElementById('pro-mobile-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const willOpen = mobileDrawer.hidden;
      mobileDrawer.hidden = !willOpen;
      mobileBtn.setAttribute('aria-expanded', String(willOpen));
    });
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileDrawer.hidden = true;
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Currency switch
  document.getElementById('pro-currency-switch')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.curr-btn');
    if (!btn) return;
    state.currency = btn.dataset.curr || 'usd';
    document.querySelectorAll('#pro-currency-switch .curr-btn').forEach((b) => {
      b.classList.toggle('is-active', b === btn);
    });
    renderHalls();
    renderBuffetTiers();
    renderKoshaThemes();
    updateEstimatorAndSummary();
  });

  // Hero gallery switcher
  document.getElementById('pro-hero-thumbs')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.hero-thumb');
    if (!btn) return;
    const heroImg = document.getElementById('pro-hero-img');
    const heroCode = document.getElementById('pro-hero-code');
    const heroCaption = document.getElementById('pro-hero-caption');
    if (heroImg) heroImg.src = btn.dataset.img;
    if (heroCode) heroCode.textContent = btn.dataset.code;
    if (heroCaption) heroCaption.textContent = btn.dataset.caption;

    document.querySelectorAll('#pro-hero-thumbs .hero-thumb').forEach((t) => {
      t.classList.toggle('is-active', t === btn);
    });
  });

  // Hall filter pills
  document.getElementById('pro-hall-filters')?.addEventListener('click', (e) => {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;
    state.hallFilter = pill.dataset.filter || 'all';
    document.querySelectorAll('#pro-hall-filters .filter-pill').forEach((p) => {
      p.classList.toggle('is-active', p === pill);
    });
    renderHalls();
  });

  // Pick hall from cards into estimator
  document.getElementById('pro-halls-grid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pick-hall]');
    if (!btn) return;
    const pickedId = btn.dataset.pickHall;
    state.hallId = pickedId;
    if (pickedId === 'jasmine-hall' && state.guests > 250) {
      state.guests = 250;
      const rangeEl = document.getElementById('pro-guests-range');
      if (rangeEl) rangeEl.value = '250';
    } else if (pickedId === 'royal-hall' && state.guests < 250) {
      state.guests = 350;
      const rangeEl = document.getElementById('pro-guests-range');
      if (rangeEl) rangeEl.value = '350';
    }
    updateEstimatorAndSummary();
    document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Guest count range slider
  document.getElementById('pro-guests-range')?.addEventListener('input', (e) => {
    state.guests = Number(e.target.value) || 350;
    if (state.guests > 250 && state.hallId === 'jasmine-hall') {
      state.hallId = 'royal-hall';
    }
    updateEstimatorAndSummary();
  });

  // Guest presets
  document.getElementById('pro-guests-presets')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.preset-chip');
    if (!chip) return;
    state.guests = Number(chip.dataset.guests) || 350;
    const rangeEl = document.getElementById('pro-guests-range');
    if (rangeEl) rangeEl.value = String(state.guests);

    if (state.guests > 250 && state.hallId === 'jasmine-hall') {
      state.hallId = 'royal-hall';
    } else if (state.guests <= 250 && state.hallId === 'royal-hall') {
      state.hallId = 'jasmine-hall';
    }
    updateEstimatorAndSummary();
  });

  // Hall select
  document.getElementById('pro-hall-select')?.addEventListener('change', (e) => {
    state.hallId = e.target.value;
    updateEstimatorAndSummary();
  });

  // Buffet tier switcher
  document.getElementById('pro-buffet-grid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.buffet-tier-btn');
    if (!btn) return;
    state.buffetId = btn.dataset.buffet;
    renderBuffetTiers();
    updateEstimatorAndSummary();
  });

  // Kosha & Lighting theme switcher
  document.getElementById('pro-kosha-tabs')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.kosha-theme-btn');
    if (!btn) return;
    state.koshaId = btn.dataset.kosha;
    renderKoshaThemes();
    updateEstimatorAndSummary();
  });

  // Availability checker inputs
  document.getElementById('pro-event-type')?.addEventListener('change', (e) => {
    state.eventType = e.target.value;
    updateEstimatorAndSummary();
  });

  document.getElementById('pro-event-shift')?.addEventListener('change', (e) => {
    state.eventShift = e.target.value;
    updateEstimatorAndSummary();
  });

  document.getElementById('pro-event-date')?.addEventListener('change', (e) => {
    state.eventDate = e.target.value;
    syncQuickDateButtons();
    updateEstimatorAndSummary();
  });

  document.getElementById('pro-quick-dates')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.quick-date-btn');
    if (!btn) return;
    state.eventDate = btn.dataset.qdate;
    const dateInput = document.getElementById('pro-event-date');
    if (dateInput) dateInput.value = state.eventDate;
    syncQuickDateButtons();
    updateEstimatorAndSummary();
  });

  // Copy summary
  document.getElementById('pro-copy-summary')?.addEventListener('click', async () => {
    const text = buildProSummaryText(false);
    const label = document.getElementById('pro-copy-label');
    try {
      await navigator.clipboard.writeText(text);
      if (label) label.textContent = 'تم نسخ تفاصيل الباقة بنجاح';
    } catch {
      if (label) label.textContent = 'تعذر النسخ التلقائي — يمكنك الإرسال عبر واتساب';
    }
    setTimeout(() => {
      if (label) label.textContent = 'نسخ تفاصيل التقدير كاملة';
    }, 2600);
  });

  // WhatsApp submission
  document.getElementById('pro-event-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('pro-client-name');
    const phoneEl = document.getElementById('pro-client-phone');
    const feedback = document.getElementById('pro-form-feedback');

    const name = nameEl?.value.trim() || '';
    const phone = phoneEl?.value.trim() || '';

    if (!name || !phone) {
      if (feedback) {
        feedback.textContent = 'يرجى إدخال الاسم ورقم الهاتف قبل إرسال ملخص الحجز.';
      }
      (!name ? nameEl : phoneEl)?.focus();
      return;
    }

    const msg = buildProSummaryText(true);
    const waUrl = `https://wa.me/${EVENTS_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    if (feedback) {
      feedback.textContent = 'جاري فتح محادثة واتساب مع ملخص باقة الفئة الفاخرة Pro...';
    }
    window.open(waUrl, '_blank', 'noopener');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderHalls();
  renderPerks();
  renderBuffetTiers();
  renderKoshaThemes();
  renderQuickDates();
  updateEstimatorAndSummary();
  bindEvents();
});
