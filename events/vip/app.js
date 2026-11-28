/* ==========================================================================
   VIP Tier ($250) — Palatial Gala & Conference Concierge
   App Logic: Full Event Configurator, Linear SVG Floor Seating Schematic,
              Cream Pro-Forma Contract Modal (Print / Copy / WhatsApp VIP)
   ========================================================================== */
'use strict';

const VIP_SVG = {
  check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  sparkles: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/></svg>',
  music: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  utensils: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v7"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
};

const EVENT_MODES = {
  wedding: {
    label: 'زفاف ملكي',
    enTag: 'ROYAL WEDDING GALA',
    stageTitle: 'منصة الكوشة والشاشة الخلفية',
    axisTitle: 'الممشى الملكي للزفة',
    defaultTableStyle: 'round-10',
  },
  gala: {
    label: 'مؤتمر وقمة أعمال',
    enTag: 'CORPORATE SUMMIT & GALA',
    stageTitle: 'المنصة الرئيسية وجدار المؤتمر',
    axisTitle: 'ممر الكاميرات والبروتوكول',
    defaultTableStyle: 'theater-vip',
  },
  soiree: {
    label: 'ملكة وتكريم خاص',
    enTag: 'PRIVATE SOIREE & HONORS',
    stageTitle: 'منصة التكريم والتصوير',
    axisTitle: 'محور الاستقبال الوسطي',
    defaultTableStyle: 'imperial-14',
  },
};

const VIP_HALLS = {
  'royal-hall': {
    id: 'royal-hall',
    code: 'ROYAL PALACE · 600 MAX',
    name: 'القاعة الملكية الكبرى',
    capNote: '350 – 600 ضيف · خالية من الأعمدة',
    baseUsd: 2400,
    maxCap: 600,
  },
  'jasmine-hall': {
    id: 'jasmine-hall',
    code: 'JASMINE SALON · 250 MAX',
    name: 'قاعة الياسمين الفاخرة',
    capNote: '100 – 250 ضيف · تنسيق ورد',
    baseUsd: 1350,
    maxCap: 250,
  },
  'catering-vip': {
    id: 'catering-vip',
    code: 'OFF-SITE PALACE SUITE',
    name: 'الضيافة الملكية المتنقلة (خارجي)',
    capNote: 'قصور ومزارع خاصة · 100–600 ضيف',
    baseUsd: 1100,
    maxCap: 600,
  },
};

const TABLE_STYLES = {
  'round-10': { label: 'طاولات ملكية مستديرة (10 مقاعد)', seatsPerTable: 10 },
  'imperial-14': { label: 'طاولات إمبراطورية ممتدة (14 مقعداً)', seatsPerTable: 14 },
  'theater-vip': { label: 'توزيع مؤتمرات ومجالس VIP (12 مقعداً/صف)', seatsPerTable: 12 },
};

const CATERING_TIERS = {
  'diwan-royal': { label: 'مأدبة الديوان اليمنية والخليجية الفاخرة', perGuestUsd: 22 },
  'five-star': { label: 'بوفيه فندقي 5 نجوم متعدد المحطات', perGuestUsd: 28 },
  'plated-vip': { label: 'عشاء VIP رسمي مقدّم على الطاولات (Plated)', perGuestUsd: 34 },
};

const CINEMA_PACKAGES = [
  {
    id: 'classic-photo',
    name: 'تغطية فوتوغرافية كلاسيكية',
    desc: 'مصوران محترفان + معالجة فورية + ألبوم جلدي فاخر.',
    priceUsd: 450,
  },
  {
    id: 'cinema-4k',
    name: 'باقة سينما 4K الاحترافية',
    desc: '3 كاميرات سينمائية 4K + طائرة درون داخلية + فيلم تشويقي خلال 48 ساعة.',
    priceUsd: 920,
  },
  {
    id: 'royal-broadcast',
    name: 'إنتاج ملكي + بث حي للديوان',
    desc: '4 كاميرات 4K + جيمبال وكرين + وحدة إخراج وبث مباشر خاص لجناح الرجال/النساء.',
    priceUsd: 1480,
  },
];

const AV_PACKAGES = [
  {
    id: 'ambient-led',
    name: 'صوت محيطي + شاشة LED مركزية',
    desc: 'سماعات موزعة عالية النقاء + شاشة P3 مقاس 4×2.5م + ميكروفونات لاسلكية.',
    priceUsd: 520,
  },
  {
    id: 'line-array-wall',
    name: 'هندسة Line Array + جدار LED 8×4م',
    desc: 'تغطية صوتية شاملة بدون صدى + جدار LED بانورامي مع مهندس صوت متفرغ.',
    priceUsd: 1150,
  },
  {
    id: 'summit-dmx',
    name: 'إنتاج مسرحي DMX + ترجمة فورية',
    desc: 'إضاءة مسرحية متحركة DMX + شاشات جانبية مساعدة + منظومة ترجمة ومؤتمرات.',
    priceUsd: 1790,
  },
];

const CREW_ADDONS = [
  {
    id: 'bridal-suite',
    name: 'جناح العروس والضيافة الخاص VIP Suite',
    desc: 'جناح مستقل بتجهيز فندقي وإطلالة خاصة ومساعدة شخصية.',
    priceUsd: 380,
    staffBonus: 2,
  },
  {
    id: 'royal-stewards',
    name: 'طاقم الصبابين والضيافة بزي رسمي',
    desc: 'خدمة القهوة العربية والشاي العدني والبخور عند المداخل والطاولات.',
    priceUsd: 420,
    staffBonus: 8,
  },
  {
    id: 'valet-security',
    name: 'إدارة المواقف Valet والأمن التنظيمي',
    desc: 'تنظيم 120 موقف سيارات خاص مع فريق استقبال وحراسة للأجنحة.',
    priceUsd: 340,
    staffBonus: 6,
  },
  {
    id: 'natural-florals',
    name: 'باقة الزهور الطبيعية والكوشة المعمارية',
    desc: 'تنسيق ورد طبيعي فاخر للمنصة والممشى وموائد كبار الشخصيات.',
    priceUsd: 780,
    staffBonus: 0,
  },
];

const FLOOR_ZONES = [
  {
    id: 'stage-led',
    code: 'ZONE · 01',
    name: 'المنصة الرئيسية وجدار LED',
    subtitle: 'منصة الكوشة الملكية أو منصة المتحدثين الرئيسية',
    xPct: 50,
    yPct: 16,
    rect: { x: 205, y: 24, w: 350, h: 72 },
    dim: '14 م × 4.5 م (ارتفاع 0.7 م)',
    av: 'جدار LED بانورامي P3 + وحدات إضاءة DMX موجهة',
    staff: 'مهندسان صوت ومرئيات + منسق دخول رئيسي',
    notes: 'خط رؤية مكشوف بنسبة 100% لجميع الطاولات بفضل خلو القاعة الكبرى من الأعمدة.',
  },
  {
    id: 'catwalk-axis',
    code: 'ZONE · 02',
    name: 'الممشى الملكي ومحور العرض',
    subtitle: 'ممر الزفة المركزي أو محور التصوير والبروتوكول',
    xPct: 50,
    yPct: 47,
    rect: { x: 332, y: 108, w: 96, h: 224 },
    dim: '18 م × 3.4 م',
    av: 'تغطية Follow Spot متابعة + ميكروفونات محيطية نقية',
    staff: 'منسقا بروتوكول + مصورا جيمبال 4K',
    notes: 'مسافة آمنة على الجانبين لمرور طاقم الضيافة والكاميرات دون إعاقة جلوس الضيوف.',
  },
  {
    id: 'vip-majlis',
    code: 'ZONE · 03',
    name: 'مقصورة كبار الشخصيات VIP',
    subtitle: 'طاولات الصف الأمامي ومجلس الضيوف الرسميين',
    xPct: 24,
    yPct: 33,
    rect: { x: 54, y: 108, w: 256, h: 86 },
    dim: 'منطقتان متناظرتان يمين ويسار المنصة',
    av: 'قرب مثالي من المنصة بزاوية رؤية 15 درجة وضغط صوتي متوازن',
    staff: 'مضيف خاص لكل 8 ضيوف VIP + خدمة ضيافة عربية فورية',
    notes: 'مجهّزة بمسافة حركة أوسع (1.8 م بين الطاولات) وكراسي ملكية مبطنة.',
  },
  {
    id: 'main-banquet',
    code: 'ZONE · 04',
    name: 'نطاق موائد الضيوف الرئيسية',
    subtitle: 'توزيع هندسي متناظر للطاولات المستديرة أو الإمبراطورية',
    xPct: 76,
    yPct: 58,
    rect: { x: 450, y: 204, w: 256, h: 132 },
    dim: 'مساحة صافية خالية من الأعمدة 28 م × 22 م',
    av: 'توزيع صوتي رباعي النقاط يضمن وضوح الصوت في أبعد طاولة',
    staff: 'كابتن صالة + مضيف لكل طاولتين',
    notes: 'يتمدد التوزيع تلقائياً بين 10 و60 طاولة حسب عدد المدعوين المختار في المهندس.',
  },
  {
    id: 'buffet-gallery',
    code: 'ZONE · 05',
    name: 'رواق البوفيه والضيافة الفندقية',
    subtitle: 'خطوط تقديم مزدوجة تمنع الازدحام أثناء العشاء',
    xPct: 24,
    yPct: 83,
    rect: { x: 54, y: 350, w: 390, h: 74 },
    dim: '16 م × 4.2 م (مسار مزدوج الاتجاه)',
    av: 'إضاءة دافئة لإبراز الأطباق + حاجز صوتي عن المطبخ الخلفي',
    staff: 'شيف مشرف + 6 طهاة تقديم + فريق تعبئة مستمر',
    notes: 'تجهيز منفصل للبوفيه الساخن والبارد ومحطة الحلويات والقهوة العدنية.',
  },
  {
    id: 'suite-valet',
    code: 'ZONE · 06',
    name: 'الجناح الملكي والمدخل الخاص',
    subtitle: 'جناح العروس/كبار الشخصيات وبوابة 120 موقفاً',
    xPct: 76,
    yPct: 83,
    rect: { x: 462, y: 350, w: 244, h: 74 },
    dim: 'جناح خاص 48 م² + بوابة VIP مغطاة',
    av: 'شاشة متابعة حية داخل الجناح لمراقبة مجريات القاعة',
    staff: 'طاقم استقبال + فريق Valet لـ 120 مركبة + أمن مداخل',
    notes: 'مدخل معزول تماماً عن مسار الضيوف العام لضمان الخصوصية الكاملة.',
  },
];

const vipState = {
  currency: 'usd',
  mode: 'wedding',
  hallId: 'royal-hall',
  guests: 400,
  tableStyle: 'round-10',
  cateringTier: 'diwan-royal',
  cinemaId: 'cinema-4k',
  avId: 'line-array-wall',
  addons: new Set(['bridal-suite', 'royal-stewards', 'natural-florals']),
  activeZoneId: 'stage-led',
  contractRef: 'RYL-VIP-2026-408',
};

function resolveImg(path) {
  if (!path) return '../assets/images/banquet.jpg';
  if (path.startsWith('../assets/')) return path;
  if (path.startsWith('assets/')) return '../' + path;
  return path;
}

function formatMoney(usd) {
  const num = Math.round(Number(usd) || 0);
  if (vipState.currency === 'sar') {
    return Math.round(num * 3.75).toLocaleString('en-US') + ' ر.س';
  }
  return '$' + num.toLocaleString('en-US');
}

function getTodayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getDefaultEventIso() {
  const d = new Date();
  d.setDate(d.getDate() + 25);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function computeVipQuote() {
  const mode = EVENT_MODES[vipState.mode] || EVENT_MODES.wedding;
  const hall = VIP_HALLS[vipState.hallId] || VIP_HALLS['royal-hall'];
  const tableStyle = TABLE_STYLES[vipState.tableStyle] || TABLE_STYLES['round-10'];
  const catering = CATERING_TIERS[vipState.cateringTier] || CATERING_TIERS['diwan-royal'];
  const cinema = CINEMA_PACKAGES.find((c) => c.id === vipState.cinemaId) || CINEMA_PACKAGES[0];
  const av = AV_PACKAGES.find((a) => a.id === vipState.avId) || AV_PACKAGES[0];
  const activeAddons = CREW_ADDONS.filter((a) => vipState.addons.has(a.id));

  const tablesCount = Math.ceil(vipState.guests / tableStyle.seatsPerTable);
  const baseStaff = Math.max(10, Math.ceil(vipState.guests / 25));
  const addonStaff = activeAddons.reduce((sum, item) => sum + item.staffBonus, 0);
  const totalStaff = baseStaff + addonStaff;

  const hallUsd = hall.baseUsd;
  const cateringUsd = vipState.guests * catering.perGuestUsd;
  const cinemaUsd = cinema.priceUsd;
  const avUsd = av.priceUsd;
  const addonsUsd = activeAddons.reduce((sum, item) => sum + item.priceUsd, 0);

  const totalUsd = hallUsd + cateringUsd + cinemaUsd + avUsd + addonsUsd;
  const depositUsd = Math.round(totalUsd * 0.35);
  const balanceUsd = totalUsd - depositUsd;

  return {
    mode,
    hall,
    tableStyle,
    catering,
    cinema,
    av,
    activeAddons,
    tablesCount,
    totalStaff,
    hallUsd,
    cateringUsd,
    cinemaUsd,
    avUsd,
    addonsUsd,
    totalUsd,
    depositUsd,
    balanceUsd,
  };
}

function renderStats() {
  const el = document.getElementById('vip-stats-strip');
  if (!el || typeof EVENTS_DATA === 'undefined') return;
  el.innerHTML = EVENTS_DATA.stats
    .map(
      (s) => `
      <div class="vip-stat-cell">
        <dt>${s.label}</dt>
        <dd class="num-font">${s.value}</dd>
      </div>`
    )
    .join('');
}

function renderHallPickCards() {
  const container = document.getElementById('vip-hall-cards');
  if (!container) return;
  container.innerHTML = Object.values(VIP_HALLS)
    .map((h) => {
      const active = h.id === vipState.hallId;
      return `
        <button type="button" class="hall-pick-btn ${active ? 'is-active' : ''}" data-vip-hall="${h.id}" role="radio" aria-checked="${active}">
          <span class="en-serif">${h.code}</span>
          <strong>${h.name}</strong>
          <small>${h.capNote}</small>
          <div class="hall-pick-price num-font">${formatMoney(h.baseUsd)}</div>
        </button>`;
    })
    .join('');
}

function renderCinemaOptions() {
  const container = document.getElementById('vip-cinema-grid');
  if (!container) return;
  container.innerHTML = CINEMA_PACKAGES.map((c) => {
    const active = c.id === vipState.cinemaId;
    return `
      <button type="button" class="triad-card-btn ${active ? 'is-active' : ''}" data-cinema="${c.id}" role="radio" aria-checked="${active}">
        <strong>${c.name}</strong>
        <small>${c.desc}</small>
        <div class="triad-price num-font">+ ${formatMoney(c.priceUsd)}</div>
      </button>`;
  }).join('');
}

function renderAvOptions() {
  const container = document.getElementById('vip-av-grid');
  if (!container) return;
  container.innerHTML = AV_PACKAGES.map((a) => {
    const active = a.id === vipState.avId;
    return `
      <button type="button" class="triad-card-btn ${active ? 'is-active' : ''}" data-av="${a.id}" role="radio" aria-checked="${active}">
        <strong>${a.name}</strong>
        <small>${a.desc}</small>
        <div class="triad-price num-font">+ ${formatMoney(a.priceUsd)}</div>
      </button>`;
  }).join('');
}

function renderCrewAddons() {
  const container = document.getElementById('vip-crew-grid');
  if (!container) return;
  container.innerHTML = CREW_ADDONS.map((item) => {
    const active = vipState.addons.has(item.id);
    return `
      <button type="button" class="crew-toggle-btn ${active ? 'is-active' : ''}" data-addon="${item.id}" aria-pressed="${active}">
        <div class="crew-toggle-copy">
          <strong>${item.name}</strong>
          <small>${item.desc}</small>
        </div>
        <div class="crew-toggle-right">
          <span class="crew-check-box" aria-hidden="true">${active ? VIP_SVG.check : ''}</span>
          <span class="crew-price num-font">+ ${formatMoney(item.priceUsd)}</span>
        </div>
      </button>`;
  }).join('');
}

function renderShowcaseHallsAndPerks() {
  const hallsGrid = document.getElementById('vip-halls-grid');
  const perksGrid = document.getElementById('vip-perks-grid');
  if (typeof EVENTS_DATA === 'undefined') return;

  if (hallsGrid) {
    hallsGrid.innerHTML = EVENTS_DATA.halls
      .map((h) => {
        const list = h.features.map((f) => `<li>${VIP_SVG.check}<span>${f}</span></li>`).join('');
        return `
          <article class="vip-hall-card">
            <div class="vip-hall-img">
              <img src="${resolveImg(h.image)}" alt="${h.title}" loading="lazy">
              <span class="vip-hall-badge">${h.badge}</span>
            </div>
            <div class="vip-hall-body">
              <div class="vip-hall-cap">${h.capacity}</div>
              <h3>${h.title}</h3>
              <p>${h.desc}</p>
              <ul class="vip-hall-list">${list}</ul>
              <button type="button" class="btn-gold-outline btn-full" data-load-hall="${h.id}">
                <span>اعتماد في مهندس الحفل VIP</span>
              </button>
            </div>
          </article>`;
      })
      .join('');
  }

  if (perksGrid) {
    perksGrid.innerHTML = EVENTS_DATA.perks
      .map((p) => {
        const title = p.title.replace('وضيفة', 'وضيافة');
        return `
          <div class="vip-perk-card">
            <div class="vip-perk-icon">${VIP_SVG[p.icon] || VIP_SVG.sparkles}</div>
            <h4>${title}</h4>
            <p>${p.desc}</p>
          </div>`;
      })
      .join('');
  }
}

function renderFloorPlanSchematic() {
  const pillsEl = document.getElementById('vip-zone-pills');
  const stageEl = document.getElementById('vip-blueprint-wrap');
  const hallLabelEl = document.getElementById('vip-floor-hall-label');
  const metaEl = document.getElementById('vip-floor-layout-meta');
  if (!pillsEl || !stageEl) return;

  const q = computeVipQuote();
  if (hallLabelEl) hallLabelEl.textContent = q.hall.name;
  if (metaEl) metaEl.textContent = `${vipState.guests} ضيف · ${q.tablesCount} طاولة · ${q.mode.label}`;

  pillsEl.innerHTML = FLOOR_ZONES.map((z) => {
    const active = z.id === vipState.activeZoneId;
    return `<button type="button" class="zone-pill-btn ${active ? 'is-active' : ''}" data-zone="${z.id}" role="tab" aria-selected="${active}">${z.name}</button>`;
  }).join('');

  // Dynamic round/imperial table geometry in pure linear SVG (fill="none")
  const activeTableSlots = Math.min(20, Math.max(6, Math.round(vipState.guests / 30)));
  const leftTableCoords = [
    [98, 228], [166, 228], [234, 228], [292, 228],
    [98, 276], [166, 276], [234, 276], [292, 276],
    [132, 316], [258, 316],
  ];
  const rightTableCoords = [
    [472, 228], [540, 228], [608, 228], [666, 228],
    [472, 276], [540, 276], [608, 276], [666, 276],
    [506, 316], [632, 316],
  ];

  const renderTableGlyph = (cx, cy, idx) => {
    const isActive = idx < activeTableSlots;
    const strokeCol = isActive ? '#E3B65B' : 'rgba(227,182,91,0.22)';
    const chairCol = isActive ? 'rgba(247,223,170,0.65)' : 'rgba(227,182,91,0.16)';
    if (vipState.tableStyle === 'imperial-14') {
      return `
        <g>
          <rect x="${cx - 17}" y="${cy - 8}" width="34" height="16" rx="3" stroke="${strokeCol}" stroke-width="1.2"/>
          <line x1="${cx - 12}" y1="${cy - 12}" x2="${cx + 12}" y2="${cy - 12}" stroke="${chairCol}" stroke-width="1"/>
          <line x1="${cx - 12}" y1="${cy + 12}" x2="${cx + 12}" y2="${cy + 12}" stroke="${chairCol}" stroke-width="1"/>
        </g>`;
    }
    if (vipState.tableStyle === 'theater-vip') {
      return `
        <g>
          <rect x="${cx - 18}" y="${cy - 5}" width="36" height="10" rx="2" stroke="${strokeCol}" stroke-width="1.2"/>
          <circle cx="${cx - 10}" cy="${cy + 9}" r="2.5" stroke="${chairCol}" stroke-width="1"/>
          <circle cx="${cx}" cy="${cy + 9}" r="2.5" stroke="${chairCol}" stroke-width="1"/>
          <circle cx="${cx + 10}" cy="${cy + 9}" r="2.5" stroke="${chairCol}" stroke-width="1"/>
        </g>`;
    }
    return `
      <g>
        <circle cx="${cx}" cy="${cy}" r="11" stroke="${strokeCol}" stroke-width="1.25"/>
        <circle cx="${cx - 16}" cy="${cy}" r="2.4" stroke="${chairCol}" stroke-width="1"/>
        <circle cx="${cx + 16}" cy="${cy}" r="2.4" stroke="${chairCol}" stroke-width="1"/>
        <circle cx="${cx}" cy="${cy - 16}" r="2.4" stroke="${chairCol}" stroke-width="1"/>
        <circle cx="${cx}" cy="${cy + 16}" r="2.4" stroke="${chairCol}" stroke-width="1"/>
      </g>`;
  };

  const tablesSvg = leftTableCoords
    .concat(rightTableCoords)
    .map((pt, idx) => renderTableGlyph(pt[0], pt[1], idx))
    .join('');

  const zoneFramesSvg = FLOOR_ZONES.map((z) => {
    const active = z.id === vipState.activeZoneId;
    const stroke = active ? '#F7DFAA' : 'rgba(227, 182, 91, 0.34)';
    const sw = active ? '2.1' : '1.1';
    const dash = active ? '' : 'stroke-dasharray="5 4"';
    return `<rect x="${z.rect.x}" y="${z.rect.y}" width="${z.rect.w}" height="${z.rect.h}" rx="8" stroke="${stroke}" stroke-width="${sw}" ${dash}/>`;
  }).join('');

  const hotspotsHtml = FLOOR_ZONES.map((z) => {
    const active = z.id === vipState.activeZoneId;
    return `
      <button type="button" class="bp-hotspot ${active ? 'is-active' : ''}" data-zone="${z.id}" style="left:${z.xPct}%;top:${z.yPct}%;">
        ${z.name}
      </button>`;
  }).join('');

  stageEl.innerHTML = `
    <div class="blueprint-canvas">
      <svg class="blueprint-svg" viewBox="0 0 760 460" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Outer Architectural Hall Perimeter -->
        <rect x="18" y="12" width="724" height="436" rx="14" stroke="rgba(227,182,91,0.52)" stroke-width="1.6"/>
        <rect x="28" y="20" width="704" height="420" rx="10" stroke="rgba(227,182,91,0.18)" stroke-width="0.9"/>

        <!-- LED Wall & Audio Line Array Towers -->
        <line x1="230" y1="36" x2="530" y2="36" stroke="#E3B65B" stroke-width="2.2"/>
        <rect x="186" y="34" width="12" height="22" rx="2" stroke="#E3B65B" stroke-width="1.2"/>
        <rect x="562" y="34" width="12" height="22" rx="2" stroke="#E3B65B" stroke-width="1.2"/>

        <!-- VIP Front Tables (Left & Right) -->
        <circle cx="116" cy="150" r="15" stroke="#F7DFAA" stroke-width="1.35"/>
        <circle cx="184" cy="150" r="15" stroke="#F7DFAA" stroke-width="1.35"/>
        <circle cx="252" cy="150" r="15" stroke="#F7DFAA" stroke-width="1.35"/>
        <circle cx="508" cy="150" r="15" stroke="#F7DFAA" stroke-width="1.35"/>
        <circle cx="576" cy="150" r="15" stroke="#F7DFAA" stroke-width="1.35"/>
        <circle cx="644" cy="150" r="15" stroke="#F7DFAA" stroke-width="1.35"/>

        <!-- Royal Catwalk / Center Axis -->
        <line x1="350" y1="112" x2="350" y2="332" stroke="rgba(227,182,91,0.45)" stroke-width="1.2" stroke-dasharray="6 4"/>
        <line x1="410" y1="112" x2="410" y2="332" stroke="rgba(227,182,91,0.45)" stroke-width="1.2" stroke-dasharray="6 4"/>
        <circle cx="380" cy="222" r="24" stroke="rgba(247,223,170,0.42)" stroke-width="1.2"/>

        <!-- Dynamic Main Banquet Seating -->
        ${tablesSvg}

        <!-- Buffet Station Lines -->
        <rect x="76" y="374" width="150" height="26" rx="4" stroke="rgba(227,182,91,0.55)" stroke-width="1.2"/>
        <rect x="248" y="374" width="150" height="26" rx="4" stroke="rgba(227,182,91,0.55)" stroke-width="1.2"/>

        <!-- Bridal Suite & VIP Valet Entrance Arch -->
        <path d="M540 436 A26 26 0 0 1 592 436" stroke="#E3B65B" stroke-width="1.4"/>
        <rect x="614" y="366" width="72" height="44" rx="5" stroke="rgba(227,182,91,0.55)" stroke-width="1.2"/>

        <!-- Highlighted Zone Blueprint Boxes -->
        ${zoneFramesSvg}
      </svg>
      ${hotspotsHtml}
    </div>`;

  // Update Zone Inspector
  const activeZone = FLOOR_ZONES.find((z) => z.id === vipState.activeZoneId) || FLOOR_ZONES[0];
  let zoneCap = '';
  if (activeZone.id === 'vip-majlis') {
    zoneCap = `${Math.min(60, Math.round(vipState.guests * 0.15))} ضيف من كبار الشخصيات (6 طاولات أمامية)`;
  } else if (activeZone.id === 'main-banquet') {
    zoneCap = `${Math.max(40, vipState.guests - 60)} ضيفاً موزعين على ${Math.max(4, q.tablesCount - 6)} طاولة`;
  } else if (activeZone.id === 'stage-led') {
    zoneCap = q.mode.stageTitle + ' — سعة 12–18 شخصية على المنصة';
  } else if (activeZone.id === 'catwalk-axis') {
    zoneCap = q.mode.axisTitle + ' — مسار حر بعرض 3.4 متر';
  } else if (activeZone.id === 'buffet-gallery') {
    zoneCap = `خدمة متزامنة حتى ${vipState.guests} ضيف خلال 25 دقيقة`;
  } else {
    zoneCap = 'جناح تحضير خاص + بوابة 120 موقف سيارات VIP';
  }

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setTxt('zone-ins-code', activeZone.code);
  setTxt('zone-ins-title', activeZone.name);
  setTxt('zone-ins-subtitle', activeZone.subtitle);
  setTxt('zone-ins-cap', zoneCap);
  setTxt('zone-ins-dim', activeZone.dim);
  setTxt('zone-ins-av', activeZone.av);
  setTxt('zone-ins-staff', activeZone.staff);
  setTxt('zone-ins-notes', activeZone.notes);
}

function syncAllLedgersAndSummaries() {
  const q = computeVipQuote();

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTxt('vip-guests-readout', `${vipState.guests} ضيف`);
  setTxt('led-mode-label', q.mode.label);
  setTxt('led-guests-tables', `${q.tablesCount} طاولة`);
  setTxt('led-staff-count', `${q.totalStaff} كادراً`);
  setTxt('led-total', formatMoney(q.totalUsd));
  setTxt('led-deposit', formatMoney(q.depositUsd));

  const linesEl = document.getElementById('led-lines');
  if (linesEl) {
    const rows = [
      { label: q.hall.name, val: formatMoney(q.hallUsd) },
      { label: `${q.catering.label} (${vipState.guests} ضيف)`, val: formatMoney(q.cateringUsd) },
      { label: q.cinema.name, val: formatMoney(q.cinemaUsd) },
      { label: q.av.name, val: formatMoney(q.avUsd) },
      { label: `الطاقم والزهور والجناح (${q.activeAddons.length} إضافات)`, val: formatMoney(q.addonsUsd) },
    ];
    linesEl.innerHTML = rows
      .map((r) => `<div class="ledger-line-item"><span>${r.label}</span><strong>${r.val}</strong></div>`)
      .join('');
  }

  // Concierge summary box
  setTxt('con-summary-hall', q.hall.name);
  setTxt('con-summary-guests', `${vipState.guests} ضيف (${q.tablesCount} طاولة)`);
  setTxt('con-summary-cinema', q.cinema.name);
  setTxt('con-summary-av', q.av.name);
  setTxt('con-summary-total', formatMoney(q.totalUsd));

  renderFloorPlanSchematic();
}

function buildVipMessageText() {
  const q = computeVipQuote();
  const name = document.getElementById('vip-client-name')?.value.trim() || 'عميل الديوان الملكي';
  const org = document.getElementById('vip-client-org')?.value.trim();
  const phone = document.getElementById('vip-client-phone')?.value.trim() || 'غير محدد';
  const eventDate = document.getElementById('vip-event-date')?.value || 'غير محدد';
  const meeting = document.getElementById('vip-meeting-time')?.value || '';
  const notes = document.getElementById('vip-notes')?.value.trim();

  const addonsNames = q.activeAddons.length
    ? q.activeAddons.map((a) => a.name).join(' + ')
    : 'بدون إضافات تشغيلية إضافية';

  const lines = [
    `*ملف تعاقد وتجهيز حفل — ${EVENTS_CONFIG.venueName} (الفئة الملكية VIP)*`,
    `رقم المرجع المبدئي: ${vipState.contractRef}`,
    `طبيعة المناسبة: ${q.mode.label}`,
    `القاعة المعتمدة: ${q.hall.name}`,
    `الضيوف والطاولات: ${vipState.guests} ضيف | ${q.tablesCount} طاولة (${q.tableStyle.label})`,
    `الضيافة والبوفيه: ${q.catering.label}`,
    `التصوير والسينما 4K: ${q.cinema.name}`,
    `الصوتيات والشاشات LED: ${q.av.name}`,
    `الجناح وطاقم البروتوكول: ${addonsNames}`,
    `القيمة التقديرية الإجمالية: ${formatMoney(q.totalUsd)} (دفعة التثبيت 35%: ${formatMoney(q.depositUsd)})`,
    `---`,
    `المستضيف: ${name}${org ? ' — ' + org : ''}`,
    `الهاتف: ${phone}`,
    `تاريخ المناسبة: ${eventDate}`,
    `موعد الاجتماع/المعاينة: ${meeting}`,
  ];
  if (notes) lines.push(`توجيهات إضافية: ${notes}`);
  return lines.join('\n');
}

function populateContractModal() {
  const q = computeVipQuote();
  const name = document.getElementById('vip-client-name')?.value.trim() || 'السادة / المستضيف الكريم';
  const org = document.getElementById('vip-client-org')?.value.trim();
  const phone = document.getElementById('vip-client-phone')?.value.trim() || 'يُستكمل عند التثبيت';
  const eventDate = document.getElementById('vip-event-date')?.value || getDefaultEventIso();

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTxt('vcon-ref', vipState.contractRef);
  setTxt('vcon-issue-date', getTodayIso());
  setTxt('vcon-event-date', eventDate);
  setTxt(
    'vcon-client-line',
    `الطرف الثاني (المستضيف): ${name}${org ? ' (' + org + ')' : ''} — هاتف التواصل: ${phone}`
  );
  setTxt(
    'vcon-mode-line',
    `طبيعة الفعالية: ${q.mode.label} (${q.mode.enTag}) — إجمالي الحضور المقدّر: ${vipState.guests} ضيف`
  );

  const tbody = document.getElementById('vcon-breakdown-body');
  if (tbody) {
    const addonsSummary = q.activeAddons.length
      ? q.activeAddons.map((a) => a.name).join('، ')
      : 'الخدمة التشغيلية القياسية للقاعة';
    const tableRows = [
      {
        item: 'حجز القاعة وتجهيز المرافق',
        spec: `${q.hall.name} (${q.hall.capNote})`,
        price: formatMoney(q.hallUsd),
      },
      {
        item: 'المأدبة وتجهيز الطاولات',
        spec: `${q.catering.label} — ${q.tablesCount} طاولة (${q.tableStyle.label}) لعدد ${vipState.guests} ضيف`,
        price: formatMoney(q.cateringUsd),
      },
      {
        item: 'التصوير والإنتاج السينمائي 4K',
        spec: `${q.cinema.name}: ${q.cinema.desc}`,
        price: formatMoney(q.cinemaUsd),
      },
      {
        item: 'هندسة الصوت والشاشات LED',
        spec: `${q.av.name}: ${q.av.desc}`,
        price: formatMoney(q.avUsd),
      },
      {
        item: 'الجناح الملكي وطاقم البروتوكول',
        spec: `${addonsSummary} — إجمالي طاقم التشغيل: ${q.totalStaff} كادراً`,
        price: formatMoney(q.addonsUsd),
      },
    ];

    tbody.innerHTML = tableRows
      .map(
        (r) => `
        <tr>
          <td><strong>${r.item}</strong></td>
          <td>${r.spec}</td>
          <td class="num-font">${r.price}</td>
        </tr>`
      )
      .join('');
  }

  setTxt('vcon-subtotal', formatMoney(q.totalUsd));
  setTxt('vcon-total', formatMoney(q.totalUsd));
  setTxt('vcon-deposit', formatMoney(q.depositUsd));
  setTxt('vcon-balance', formatMoney(q.balanceUsd));

  const termsEl = document.getElementById('vcon-terms-list');
  if (termsEl) {
    const terms = [
      'يُثبّت حجز التاريخ والقاعة بصورة نهائية فور سداد دفعة التثبيت الأولى البالغة 35% من قيمة العقد.',
      'تلتزم إدارة القاعة بتسليم القاعة وجناح العروس قبل بدء المناسبة بـ 4 ساعات للبروفة الصوتية والمرئية.',
      'يشمل العقد توفير 120 موقف سيارات خاص مع فصل كامل لمداخل وأجنحة الضيافة وفق الخصوصية.',
      'يحق للمستضيف تعديل عدد الضيوف بزيادة أو نقصان حتى 15% قبل موعد الفعالية بـ 72 ساعة على الأقل.',
    ];
    termsEl.innerHTML = terms.map((t) => `<li>${t}</li>`).join('');
  }

  const waBtn = document.getElementById('vcon-wa-btn');
  if (waBtn) {
    waBtn.href = `https://wa.me/${EVENTS_CONFIG.whatsappNumber}?text=${encodeURIComponent(buildVipMessageText())}`;
  }
}

function openContractModal() {
  populateContractModal();
  const backdrop = document.getElementById('vip-modal-backdrop');
  const modal = document.getElementById('vip-contract-modal');
  if (backdrop) backdrop.hidden = false;
  if (modal) modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeContractModal() {
  const backdrop = document.getElementById('vip-modal-backdrop');
  const modal = document.getElementById('vip-contract-modal');
  if (backdrop) backdrop.hidden = true;
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
}

function bindEvents() {
  // Mobile menu
  const menuBtn = document.getElementById('vip-menu-btn');
  const drawer = document.getElementById('vip-mobile-drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const willOpen = drawer.hidden;
      drawer.hidden = !willOpen;
      menuBtn.setAttribute('aria-expanded', String(willOpen));
    });
    drawer.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        drawer.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Currency switch
  document.getElementById('vip-currency-switch')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.v-curr-btn');
    if (!btn) return;
    vipState.currency = btn.dataset.curr || 'usd';
    document.querySelectorAll('#vip-currency-switch .v-curr-btn').forEach((b) => {
      b.classList.toggle('is-active', b === btn);
    });
    renderHallPickCards();
    renderCinemaOptions();
    renderAvOptions();
    renderCrewAddons();
    syncAllLedgersAndSummaries();
    const modal = document.getElementById('vip-contract-modal');
    if (modal && !modal.hidden) populateContractModal();
  });

  // Hero spotlight thumbs
  document.getElementById('vip-spotlight-thumbs')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.v-thumb');
    if (!btn) return;
    const mainImg = document.getElementById('vip-spotlight-main');
    const bgImg = document.getElementById('vip-hero-backdrop');
    const codeEl = document.getElementById('vip-spotlight-code');
    const titleEl = document.getElementById('vip-spotlight-title');

    if (mainImg) mainImg.src = btn.dataset.img;
    if (bgImg) bgImg.src = btn.dataset.img;
    if (codeEl) codeEl.textContent = btn.dataset.code;
    if (titleEl) titleEl.textContent = btn.dataset.title;

    document.querySelectorAll('#vip-spotlight-thumbs .v-thumb').forEach((t) => {
      t.classList.toggle('is-active', t === btn);
    });
  });

  // Event mode tabs
  document.getElementById('vip-mode-tabs')?.addEventListener('click', (e) => {
    const tab = e.target.closest('.mode-tab');
    if (!tab) return;
    vipState.mode = tab.dataset.mode || 'wedding';
    document.querySelectorAll('#vip-mode-tabs .mode-tab').forEach((t) => {
      const isAct = t === tab;
      t.classList.toggle('is-active', isAct);
      t.setAttribute('aria-selected', String(isAct));
    });
    const modeObj = EVENT_MODES[vipState.mode];
    if (modeObj) {
      vipState.tableStyle = modeObj.defaultTableStyle;
      const sel = document.getElementById('vip-table-style');
      if (sel) sel.value = vipState.tableStyle;
    }
    syncAllLedgersAndSummaries();
  });

  // Hall tier selection
  document.getElementById('vip-hall-cards')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-vip-hall]');
    if (!btn) return;
    vipState.hallId = btn.dataset.vipHall;
    const maxCap = VIP_HALLS[vipState.hallId]?.maxCap || 600;
    if (vipState.guests > maxCap) {
      vipState.guests = maxCap;
      const range = document.getElementById('vip-guests-range');
      if (range) range.value = String(maxCap);
    }
    renderHallPickCards();
    syncAllLedgersAndSummaries();
  });

  // Load hall from showcase cards
  document.getElementById('vip-halls-grid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-load-hall]');
    if (!btn) return;
    vipState.hallId = btn.dataset.loadHall;
    const maxCap = VIP_HALLS[vipState.hallId]?.maxCap || 600;
    if (vipState.guests > maxCap) {
      vipState.guests = maxCap;
      const range = document.getElementById('vip-guests-range');
      if (range) range.value = String(maxCap);
    }
    renderHallPickCards();
    syncAllLedgersAndSummaries();
    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Guests range & table/catering selects
  document.getElementById('vip-guests-range')?.addEventListener('input', (e) => {
    vipState.guests = Number(e.target.value) || 400;
    if (vipState.guests > 250 && vipState.hallId === 'jasmine-hall') {
      vipState.hallId = 'royal-hall';
      renderHallPickCards();
    }
    syncAllLedgersAndSummaries();
  });

  document.getElementById('vip-table-style')?.addEventListener('change', (e) => {
    vipState.tableStyle = e.target.value;
    syncAllLedgersAndSummaries();
  });

  document.getElementById('vip-catering-tier')?.addEventListener('change', (e) => {
    vipState.cateringTier = e.target.value;
    syncAllLedgersAndSummaries();
  });

  // Cinema & AV selection
  document.getElementById('vip-cinema-grid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cinema]');
    if (!btn) return;
    vipState.cinemaId = btn.dataset.cinema;
    renderCinemaOptions();
    syncAllLedgersAndSummaries();
  });

  document.getElementById('vip-av-grid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-av]');
    if (!btn) return;
    vipState.avId = btn.dataset.av;
    renderAvOptions();
    syncAllLedgersAndSummaries();
  });

  // Crew / Suite addons toggles
  document.getElementById('vip-crew-grid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-addon]');
    if (!btn) return;
    const id = btn.dataset.addon;
    if (vipState.addons.has(id)) {
      vipState.addons.delete(id);
    } else {
      vipState.addons.add(id);
    }
    renderCrewAddons();
    syncAllLedgersAndSummaries();
  });

  // Floorplan interactive zone selection (pills or blueprint hotspots)
  const handleZoneClick = (e) => {
    const btn = e.target.closest('[data-zone]');
    if (!btn) return;
    vipState.activeZoneId = btn.dataset.zone;
    renderFloorPlanSchematic();
  };
  document.getElementById('vip-zone-pills')?.addEventListener('click', handleZoneClick);
  document.getElementById('vip-blueprint-wrap')?.addEventListener('click', handleZoneClick);

  // Contract modal triggers
  document.getElementById('vip-open-contract-top')?.addEventListener('click', openContractModal);
  document.getElementById('led-open-contract')?.addEventListener('click', openContractModal);
  document.getElementById('vip-preview-contract-btn')?.addEventListener('click', openContractModal);
  document.getElementById('vcon-close')?.addEventListener('click', closeContractModal);
  document.getElementById('vip-modal-backdrop')?.addEventListener('click', closeContractModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeContractModal();
  });

  // Print & Copy Contract Modal Actions
  document.getElementById('vcon-print-btn')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('vcon-copy-btn')?.addEventListener('click', async () => {
    const label = document.getElementById('vcon-copy-label');
    const text = buildVipMessageText();
    try {
      await navigator.clipboard.writeText(text);
      if (label) label.textContent = 'تم نسخ نص العقد بنجاح';
    } catch {
      if (label) label.textContent = 'تعذر النسخ — استخدم الطباعة أو واتساب';
    }
    setTimeout(() => {
      if (label) label.textContent = 'نسخ نص العقد المبدئي';
    }, 2600);
  });

  // Concierge form submission -> WhatsApp VIP
  document.getElementById('vip-concierge-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('vip-client-name');
    const phoneEl = document.getElementById('vip-client-phone');
    const feedback = document.getElementById('vip-concierge-feedback');

    if (!nameEl?.value.trim() || !phoneEl?.value.trim()) {
      if (feedback) {
        feedback.textContent = 'يرجى إدخال اسم المستضيف ورقم الهاتف المباشر لإرسال ملف التعاقد.';
      }
      (!nameEl?.value.trim() ? nameEl : phoneEl)?.focus();
      return;
    }

    const msg = buildVipMessageText();
    const url = `https://wa.me/${EVENTS_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    if (feedback) {
      feedback.textContent = 'جاري فتح خط الكونسيرج الملكي عبر واتساب مع ملف التعاقد الكامل...';
    }
    window.open(url, '_blank', 'noopener');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('vip-event-date');
  if (dateInput) {
    dateInput.min = getTodayIso();
    dateInput.value = getDefaultEventIso();
  }

  renderStats();
  renderHallPickCards();
  renderCinemaOptions();
  renderAvOptions();
  renderCrewAddons();
  renderShowcaseHallsAndPerks();
  syncAllLedgersAndSummaries();
  bindEvents();
});
