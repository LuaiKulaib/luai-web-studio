/* =========================================================
   app.js — مجموعة الأفق القابضة (الفئة الفاخرة Pro)
   Architectural Engineering Group Pro
   ========================================================= */
'use strict';

const PRO_SVG = {
  building: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><path d="M9 22v-4h6v4"/></svg>',
  compass: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  layers: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  award: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/></svg>',
  clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  users: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  chevron: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
  spec: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  userBadge: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
};

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));
}

function resolveCorporateImage(path) {
  if (!path) return '../assets/images/office.jpg';
  if (path.startsWith('../assets/')) return path;
  if (path.startsWith('assets/')) return '../' + path;
  return path;
}

const PRO_SECTOR_DETAILS = {
  contracting: {
    code: 'DIV-01 · CONTRACTING',
    standard: 'FIDIC Red & Yellow Book',
    sectorOption: 'المقاولات والإنشاءات',
    image: '../assets/images/project.jpg',
    alt: 'مهندسو الموقع يراجعون المخططات التنفيذية لقطاع المقاولات',
    heroTitle: 'المقاولات والإنشاءات التجارية والبنية التحتية',
    heroMeta: 'تنفيذ إنشائي وكهروميكانيكي متكامل وفق معايير السلامة المهنية والجودة العالمية.',
    deliverables: [
      'أعمال الهيكل الخرساني والمباني الإدارية والتجارية',
      'الأنظمة الكهروميكانيكية (MEP) والتكييف المركزي',
      'مشاريع البنية التحتية والمحطات اللوجستية',
      'تسليم المفتاح مع فحوصات الجودة واختبارات التشغيل',
    ],
    director: 'م. نبيل الشميري — مدير العمليات الهندسية',
    kpis: [
      { value: '+64', label: 'مشروعاً إنشائياً' },
      { value: '98.6%', label: 'الالتزام بالجدول' },
      { value: 'ZERO', label: 'حوادث سلامة جسيمة' },
    ],
  },
  engineering: {
    code: 'DIV-02 · ENGINEERING',
    standard: 'ISO 9001 & PMP Governance',
    sectorOption: 'الاستشارات والإشراف الهندسي',
    image: '../assets/images/team.jpg',
    alt: 'فريق الاستشارات الهندسية وإدارة المشاريع يراجع مؤشرات الأداء',
    heroTitle: 'الاستشارات والدراسات والإشراف الهندسي المتخصص',
    heroMeta: 'دراسات الجدوى، التصاميم المعمارية والإنشائية، وإدارة العقود والمناقصات الكبرى.',
    deliverables: [
      'دراسات الجدوى الفنية والاقتصادية والهندسة القيمية',
      'التصاميم المعمارية والإنشائية واعتماد المخططات',
      'الإشراف الميداني وضبط الجودة المرحلي للمشاريع',
      'إدارة المخاطر وتدقيق جداول الكميات BOQ',
    ],
    director: 'م. طارق الأصبحي — الرئيس التنفيذي',
    kpis: [
      { value: '+45', label: 'دراسة وإشراف هندسي' },
      { value: 'PMP', label: 'منهجية إدارة معتمدة' },
      { value: '24h', label: 'استجابة تقارير الموقع' },
    ],
  },
  supply: {
    code: 'DIV-03 · SUPPLY & TENDERS',
    standard: 'ISO 28000 Supply Security',
    sectorOption: 'التوريدات والعقود الحكومية',
    image: '../assets/images/about.jpg',
    alt: 'اجتماع شراكة وتوقيع عقود التوريدات المؤسسية والحكومية',
    heroTitle: 'التوريدات المؤسسية وسلاسل الإمداد للعقود الحكومية',
    heroMeta: 'تجهيز وتوريد معدات الطاقة والأنظمة الصناعية واللوجستية بعقود مضمونة المواصفات.',
    deliverables: [
      'توريد وتركيب أنظمة الطاقة الاحتياطية ولوحات التحكم',
      'تأمين المعدات الصناعية وقطع الغيار الأصلية للمنشآت',
      'عقود إمداد وتوريد سنوية للشركات والمنظمات الدولية',
      'تخليص وفحص مطابقة فنية مع ضمانات ما بعد التوريد',
    ],
    director: 'أ. خالد المقطري — مدير التوريدات والعقود',
    kpis: [
      { value: '+31', label: 'عقد توريد استراتيجي' },
      { value: '3', label: 'محاور إقليمية للتسليم' },
      { value: '100%', label: 'مطابقة المواصفات' },
    ],
  },
};

const PRO_PROJECT_SPECS = [
  {
    code: 'AFQ-PRJ-2025-01',
    location: 'صنعاء — شارع الزبيري',
    clientType: 'قطاع الأعمال والمؤسسات الإدارية',
    capacity: '18,000 م² مساحة بنائية',
    duration: '14 شهراً (تسليم في الموعد)',
    standard: 'ISO 9001:2015 / كود إنشائي حديث',
    office: 'مكتب صنعاء الرئيسي',
    deliverables: [
      'تنفيذ الهيكل الإنشائي والواجهات المعمارية العازلة للحرارة',
      'تركيب شبكات التكييف المركزي والطاقة الاحتياطية الذكية',
      'تجهيز أنظمة الحماية من الحريق والتحكم الأمني للمبنى',
      'اختبارات التشغيل والتسليم النهائي دون ملاحظات حرجة',
    ],
  },
  {
    code: 'AFQ-PRJ-2024-02',
    location: 'عدن — المنطقة اللوجستية',
    clientType: 'قطاع النقل والخدمات اللوجستية',
    capacity: 'محطة شحن ومستودعات مركزية',
    duration: '11 شهراً (إشراف متكامل)',
    standard: 'PMP & HSE Grade-A',
    office: 'مكتب عدن الإقليمي',
    deliverables: [
      'إعداد التصاميم الهندسية ومخططات حركة الشاحنات والرافعات',
      'الإشراف الفني اليومي وضبط جودة الخلطات والأرضيات الصناعية',
      'اعتماد مستخلصات المقاولين ومراقبة الجدول الزمني',
      'تقييم اختبارات التحميل والسلامة المهنية قبل الافتتاح',
    ],
  },
  {
    code: 'AFQ-PRJ-2025-03',
    location: 'الرياض — المنشآت الصناعية',
    clientType: 'عقود الطاقة والتجهيز المؤسسي',
    capacity: '3 منشآت حيوية متصلة',
    duration: '8 أشهر (توريد وتركيب)',
    standard: 'IEC / ISO Supply Compliance',
    office: 'مكتب الرياض للتطوير والشراكات',
    deliverables: [
      'توريد وحدات توليد طاقة احتياطية عالية الاعتمادية',
      'تجهيز لوحات التبديل التلقائي وخطوط التحكم الرئيسية',
      'اختبارات التحميل الكامل ومعايرة أنظمة الحماية الكهربائية',
      'توفير جدول صيانة دورية وقطع غيار استراتيجية لمدة 24 شهراً',
    ],
  },
  {
    code: 'AFQ-PRJ-2024-04',
    location: 'جدة — المقر الإقليمي للشركات',
    clientType: 'شركات قطاع خاص وإدارة مقرات',
    capacity: 'تأهيل إداري وهندسي شامل',
    duration: '7 أشهر (استشارات وإدارة عقود)',
    standard: 'FIDIC / Value Engineering',
    office: 'مكتب التطوير والشراكات الإقليمي',
    deliverables: [
      'تقييم الحالة الإنشائية والكهروميكانيكية للمقر القائم',
      'إعادة هندسة المساحات الإدارية لرفع الكفاءة التشغيلية',
      'إعداد كراسات المواصفات وإدارة عقود المقاولين الفرعيين',
      'تدقيق الجودة النهائية وتسليم وثائق التشغيل والصيانة',
    ],
  },
];

const PRO_GOV_MATRIX = [
  {
    group: 'quality',
    code: 'ISO 9001:2015',
    title: 'نظام إدارة الجودة الهندسية والتدقيق المرحلي',
    desc: 'مراجعة واعتماد المواد والمخططات التنفيذية عبر قوائم فحص رقمية قبل وبعد كل مرحلة إنشائية أو توريدية.',
    score: '99.4%',
    width: '99%',
    owner: 'إدارة ضمان الجودة QA/QC',
    cycle: 'تدقيق نصف سنوي معتمد',
  },
  {
    group: 'hse',
    code: 'ISO 45001:2018',
    title: 'منظومة السلامة والصحة المهنية HSE في المواقع',
    desc: 'تطبيق إلزامي لمعدات الحماية الشخصية، تصاريح العمل المرتفع والكهربائي، والفحص اليومي لبيئة التنفيذ.',
    score: '100%',
    width: '100%',
    owner: 'وحدة السلامة الميدانية HSE',
    cycle: '0 حوادث جسيمة مسجلة',
  },
  {
    group: 'compliance',
    code: 'FIDIC & PMP',
    title: 'حوكمة العقود والشفافية في إدارة المناقصات',
    desc: 'تقارير تقدم أسبوعية موثقة بالصور والكميات المنجزة ومطابقة كاملة لجداول الكميات والمستخلصات.',
    score: '98.6%',
    width: '98%',
    owner: 'لجنة العقود والمشاريع',
    cycle: 'توثيق مرحلي أسبوعي',
  },
  {
    group: 'quality',
    code: 'ISO 14001:2015',
    title: 'الإدارة البيئية وكفاءة الطاقة وسلاسل الإمداد',
    desc: 'معايير اختيار مواد بناء وأنظمة طاقة عالية الكفاءة وتقليل الفاقد الإنشائي والانبعاثات التشغيلية.',
    score: '97.2%',
    width: '97%',
    owner: 'قسم الاستدامة والتوريد',
    cycle: 'مراجعة سنوية شاملة',
  },
];

const PRO_LEADER_META = [
  { exp: 'خبرة 22 عاماً', domain: 'الاستراتيجية والاستثمار' },
  { exp: 'ماجستير + PMP', domain: 'العمليات والإنشاءات' },
  { exp: 'سلاسل الإمداد B2B', domain: 'المناقصات والعقود' },
];

let activeSectorKey = 'contracting';
let activeProjectFilter = 'all';
let activeGovGroup = 'all';
let lastFocusedElement = null;

function renderHeroStats() {
  const el = document.getElementById('pro-hero-stats');
  if (!el || typeof CORP_DATA === 'undefined') return;

  el.innerHTML = CORP_DATA.stats.map(s => `
    <div class="stat-cell">
      <strong class="num-font">${s.value}</strong>
      <span>${s.label}</span>
    </div>
  `).join('');
}

function updateHeroPreview(key) {
  const detail = PRO_SECTOR_DETAILS[key];
  if (!detail) return;

  const img = document.getElementById('pro-hero-preview-img');
  const tag = document.getElementById('pro-hero-preview-tag');
  const title = document.getElementById('pro-hero-preview-title');
  const meta = document.getElementById('pro-hero-preview-meta');

  if (img) {
    img.src = detail.image;
    img.alt = detail.alt;
  }
  if (tag) tag.textContent = detail.code;
  if (title) title.textContent = detail.heroTitle;
  if (meta) meta.textContent = detail.heroMeta;

  document.querySelectorAll('#pro-hero-pillar-btns .hero-switch-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.heroKey === key);
  });
}

function renderSectorSpotlight(key) {
  activeSectorKey = key;
  const panel = document.getElementById('pro-sector-panel');
  if (!panel || typeof CORP_DATA === 'undefined') return;

  const pillar = CORP_DATA.pillars.find(p => p.id === key) || CORP_DATA.pillars[0];
  const detail = PRO_SECTOR_DETAILS[key] || PRO_SECTOR_DETAILS.contracting;

  panel.innerHTML = `
    <div class="spot-copy">
      <div class="spot-meta-row">
        <span class="spot-code num-font">${detail.code}</span>
        <span class="spot-std num-font">${detail.standard}</span>
      </div>
      <h3>${pillar.title}</h3>
      <p>${pillar.desc}</p>
      <div class="spot-deliverables">
        ${detail.deliverables.map(item => `
          <div class="spot-deliv-item">
            ${PRO_SVG.check}
            <span>${item}</span>
          </div>
        `).join('')}
      </div>
      <div class="spot-footer-bar">
        <div class="spot-director">
          <span>المسؤول المباشر للقطاع</span>
          <strong>${detail.director}</strong>
        </div>
        <button type="button" class="btn-azure" data-prefill-sector="${detail.sectorOption}">
          <span>اطلب عرض سعر لهذا القطاع</span>
        </button>
      </div>
    </div>

    <div class="spot-media-box">
      <img src="${detail.image}" alt="${detail.alt}" loading="lazy">
      <div class="spot-kpis">
        ${detail.kpis.map(k => `
          <div class="spot-kpi">
            <strong>${k.value}</strong>
            <span>${k.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  panel.querySelector('[data-prefill-sector]')?.addEventListener('click', e => {
    const sectorName = e.currentTarget.getAttribute('data-prefill-sector');
    prefillRfqForm(sectorName, '');
  });

  document.querySelectorAll('#pro-sector-tabs .sector-tab').forEach(tab => {
    const active = tab.dataset.sector === key;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  document.querySelectorAll('#pro-pillars-overview .pillar-card').forEach(card => {
    card.classList.toggle('is-active', card.dataset.sector === key);
  });
}

function renderPillarsOverview() {
  const el = document.getElementById('pro-pillars-overview');
  if (!el || typeof CORP_DATA === 'undefined') return;

  el.innerHTML = CORP_DATA.pillars.map(p => `
    <article class="pillar-card ${p.id === activeSectorKey ? 'is-active' : ''}" data-sector="${p.id}" tabindex="0" role="button">
      <div class="pillar-icon-box">${PRO_SVG[p.icon] || PRO_SVG.building}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </article>
  `).join('');

  el.querySelectorAll('.pillar-card').forEach(card => {
    const activate = () => renderSectorSpotlight(card.dataset.sector);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        activate();
      }
    });
  });
}

function renderProjects(filter = 'all') {
  activeProjectFilter = filter;
  const grid = document.getElementById('pro-projects-grid');
  const countEl = document.getElementById('pro-projects-count');
  if (!grid || typeof CORP_DATA === 'undefined') return;

  const allProjects = CORP_DATA.projects;
  const indexed = allProjects
    .map((p, idx) => ({ ...p, originalIdx: idx, spec: PRO_PROJECT_SPECS[idx] || PRO_PROJECT_SPECS[0] }))
    .filter(p => filter === 'all' || p.cat === filter);

  if (countEl) {
    countEl.textContent = `${indexed.length} / ${allProjects.length}`;
  }

  grid.innerHTML = indexed.map(p => `
    <article class="proj-card">
      <div class="proj-media">
        <img src="${resolveCorporateImage(p.image)}" alt="${p.title}" loading="lazy">
        <span class="proj-code-chip num-font">${p.spec.code}</span>
      </div>
      <div class="proj-body">
        <div class="proj-meta">
          <span class="proj-cat-tag">${p.catLabel}</span>
          <span class="proj-year num-font">${p.year}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.scope}</p>
        <div class="proj-specs-mini">
          <span>${p.spec.location}</span>
          <span>${p.spec.capacity}</span>
        </div>
        <button type="button" class="btn-spec-open" data-project-idx="${p.originalIdx}">
          ${PRO_SVG.spec}
          <span>استعراض المواصفات الفنية ونطاق المشروع</span>
        </button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.btn-spec-open').forEach(btn => {
    btn.addEventListener('click', () => {
      openProjectModal(Number(btn.dataset.projectIdx));
    });
  });

  document.querySelectorAll('#pro-project-filters .filter-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.filter === filter);
  });
}

function openProjectModal(idx) {
  if (typeof CORP_DATA === 'undefined') return;
  const proj = CORP_DATA.projects[idx];
  const spec = PRO_PROJECT_SPECS[idx] || PRO_PROJECT_SPECS[0];
  const modal = document.getElementById('pro-project-modal');
  if (!proj || !modal) return;

  lastFocusedElement = document.activeElement;

  const codeEl = document.getElementById('pro-modal-code');
  const titleEl = document.getElementById('pro-modal-title');
  const catEl = document.getElementById('pro-modal-cat');
  const yearEl = document.getElementById('pro-modal-year');
  const imgEl = document.getElementById('pro-modal-img');
  const scopeEl = document.getElementById('pro-modal-scope');
  const specsEl = document.getElementById('pro-modal-specs');
  const delivEl = document.getElementById('pro-modal-deliverables');
  const rfqBtn = document.getElementById('pro-modal-rfq-btn');

  if (codeEl) codeEl.textContent = spec.code;
  if (titleEl) titleEl.textContent = proj.title;
  if (catEl) catEl.textContent = proj.catLabel;
  if (yearEl) yearEl.textContent = proj.year;
  if (imgEl) {
    imgEl.src = resolveCorporateImage(proj.image);
    imgEl.alt = proj.title;
  }
  if (scopeEl) scopeEl.textContent = proj.scope;

  if (specsEl) {
    specsEl.innerHTML = `
      <div class="spec-metric-box"><small>الموقع الجغرافي</small><strong>${spec.location}</strong></div>
      <div class="spec-metric-box"><small>السعة / النطاق</small><strong>${spec.capacity}</strong></div>
      <div class="spec-metric-box"><small>مدة التنفيذ</small><strong>${spec.duration}</strong></div>
      <div class="spec-metric-box"><small>المعيار والفرع</small><strong>${spec.standard} · ${spec.office}</strong></div>
    `;
  }

  if (delivEl) {
    delivEl.innerHTML = spec.deliverables.map(item => `
      <li>${PRO_SVG.check}<span>${item}</span></li>
    `).join('');
  }

  if (rfqBtn) {
    rfqBtn.onclick = () => {
      const sectorMap = {
        contracting: 'المقاولات والإنشاءات',
        engineering: 'الاستشارات والإشراف الهندسي',
        supply: 'التوريدات والعقود الحكومية',
      };
      closeProjectModal();
      prefillRfqForm(sectorMap[proj.cat] || 'المقاولات والإنشاءات', `طلب مشروع أو مناقصة مماثلة لمرجع (${spec.code} — ${proj.title})`);
    };
  }

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('pro-modal-close')?.focus();
}

function closeProjectModal() {
  const modal = document.getElementById('pro-project-modal');
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

function renderGovernanceMatrix(group = 'all') {
  activeGovGroup = group;
  const el = document.getElementById('pro-gov-matrix');
  if (!el) return;

  const items = group === 'all' ? PRO_GOV_MATRIX : PRO_GOV_MATRIX.filter(g => g.group === group);
  el.innerHTML = items.map(g => `
    <article class="gov-card">
      <div class="gov-card-top">
        <span class="gov-code">${g.code}</span>
        <strong class="gov-score">${g.score}</strong>
      </div>
      <h3>${g.title}</h3>
      <p>${g.desc}</p>
      <div class="gov-bar-track"><div class="gov-bar-fill" style="width:${g.width}"></div></div>
      <div class="gov-audit-meta">
        <span>الجهة المسؤولة: ${g.owner}</span>
        <span>${g.cycle}</span>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('#pro-gov-tabs .gov-tab').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.gov === group);
  });
}

function renderValues() {
  const el = document.getElementById('pro-values-grid');
  if (!el || typeof CORP_DATA === 'undefined') return;

  el.innerHTML = CORP_DATA.values.map(v => `
    <article class="value-card">
      <div class="value-icon">${PRO_SVG[v.icon] || PRO_SVG.shield}</div>
      <h4>${v.title}</h4>
      <p>${v.desc}</p>
    </article>
  `).join('');
}

function renderLeadership() {
  const el = document.getElementById('pro-leadership-grid');
  if (!el || typeof CORP_DATA === 'undefined') return;

  el.innerHTML = CORP_DATA.leadership.map((l, idx) => {
    const meta = PRO_LEADER_META[idx] || PRO_LEADER_META[0];
    return `
      <article class="leader-card">
        <div class="leader-top">
          <div class="leader-crest">${PRO_SVG.userBadge}</div>
          <div>
            <span class="leader-role">${l.role}</span>
            <h3>${l.name}</h3>
          </div>
        </div>
        <p class="leader-bio">${l.bio}</p>
        <div class="leader-meta">
          <span>${meta.domain}</span>
          <span class="num-font">${meta.exp}</span>
        </div>
      </article>
    `;
  }).join('');
}

function renderBranchesAndFaqs() {
  const brEl = document.getElementById('pro-branches-grid');
  const branchSelect = document.getElementById('pro-branch');

  if (typeof CORP_DATA !== 'undefined') {
    if (brEl) {
      const codes = ['HQ-SAN-01', 'REG-ADE-02', 'KSA-RUH-03'];
      brEl.innerHTML = CORP_DATA.branches.map((b, idx) => `
        <article class="branch-card">
          <div class="branch-head">
            <h3>${b.city}</h3>
            <span class="branch-code">${codes[idx] || 'HUB'}</span>
          </div>
          <p class="branch-addr">${b.address}</p>
          <span class="branch-hours">${b.hours}</span>
        </article>
      `).join('');
    }

    if (branchSelect) {
      branchSelect.innerHTML = CORP_DATA.branches.map(b => `
        <option value="${b.city}">${b.city}</option>
      `).join('');
    }

    const faqEl = document.getElementById('pro-faqs-list');
    if (faqEl) {
      faqEl.innerHTML = CORP_DATA.faqs.map((f, i) => `
        <div class="faq-item ${i === 0 ? 'open' : ''}">
          <button type="button" class="faq-q">
            <span>${f.q}</span>
            ${PRO_SVG.chevron}
          </button>
          <div class="faq-a">${f.a}</div>
        </div>
      `).join('');

      faqEl.addEventListener('click', e => {
        const btn = e.target.closest('.faq-q');
        if (!btn) return;
        btn.closest('.faq-item')?.classList.toggle('open');
      });
    }
  }
}

function prefillRfqForm(sectorVal, scopeNote) {
  const sectorEl = document.getElementById('pro-sector');
  const scopeEl = document.getElementById('pro-scope');
  if (sectorEl && sectorVal) {
    sectorEl.value = sectorVal;
  }
  if (scopeEl && scopeNote) {
    scopeEl.value = scopeNote;
  }
  document.getElementById('rfq')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function bindRfqForm() {
  const form = document.getElementById('pro-rfq-form');
  const feedback = document.getElementById('pro-rfq-feedback');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const org = document.getElementById('pro-org')?.value.trim() || '';
    const name = document.getElementById('pro-name')?.value.trim() || '';
    const phone = document.getElementById('pro-phone')?.value.trim() || '';
    const email = document.getElementById('pro-email')?.value.trim() || 'غير محدد';
    const sector = document.getElementById('pro-sector')?.value || '';
    const branch = document.getElementById('pro-branch')?.value || '';
    const qualification = document.getElementById('pro-qualification')?.value || '';
    const budget = document.getElementById('pro-budget')?.value || '';
    const scope = document.getElementById('pro-scope')?.value.trim() || '';

    const docs = Array.from(document.querySelectorAll('#pro-docs-group input[name="pro-doc"]:checked'))
      .map(chk => chk.value);

    const waNumber = (typeof CORP_CONFIG !== 'undefined' && CORP_CONFIG.whatsappNumber)
      ? CORP_CONFIG.whatsappNumber
      : '967782259937';

    const message = [
      '*طلب تأهيل مسبق ومناقصة — مجموعة الأفق القابضة*',
      'التصنيف: الفئة الفاخرة Pro',
      `الجهة / الشركة: ${org}`,
      `المسؤول: ${name} | الهاتف: ${phone}`,
      `البريد المؤسسي: ${email}`,
      `القطاع الهندسي: ${sector}`,
      `الفرع المعني: ${branch}`,
      `نوع التأهيل / الطرح: ${qualification}`,
      `الميزانية التقديرية: ${budget}`,
      `المستندات المطلوبة: ${docs.length ? docs.join('، ') : 'حسب كراسة الشروط'}`,
      `نطاق العمل والجدول الزمني: ${scope}`,
    ].join('\n');

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener');

    if (feedback) {
      feedback.hidden = false;
      feedback.innerHTML = `تم تجهيز طلب التأهيل والمناقصة (الفئة الفاخرة Pro) للجهة <strong>${escapeHtml(org)}</strong>. <a href="${waUrl}" target="_blank" rel="noopener">اضغط هنا إذا لم تفتح نافذة واتساب تلقائياً</a>`;
    }
  });
}

function bindNavigationAndInteractions() {
  const menuBtn = document.getElementById('pro-menu-btn');
  const drawer = document.getElementById('pro-mobile-drawer');

  menuBtn?.addEventListener('click', () => {
    if (!drawer) return;
    const isHidden = drawer.hidden;
    drawer.hidden = !isHidden;
    menuBtn.setAttribute('aria-expanded', String(isHidden));
  });

  drawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.hidden = true;
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  document.getElementById('pro-hero-pillar-btns')?.addEventListener('click', e => {
    const btn = e.target.closest('.hero-switch-btn');
    if (!btn) return;
    updateHeroPreview(btn.dataset.heroKey);
  });

  document.getElementById('pro-sector-tabs')?.addEventListener('click', e => {
    const tab = e.target.closest('.sector-tab');
    if (!tab) return;
    renderSectorSpotlight(tab.dataset.sector);
  });

  document.getElementById('pro-project-filters')?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    renderProjects(btn.dataset.filter);
  });

  document.getElementById('pro-gov-tabs')?.addEventListener('click', e => {
    const btn = e.target.closest('.gov-tab');
    if (!btn) return;
    renderGovernanceMatrix(btn.dataset.gov);
  });

  document.getElementById('pro-modal-close')?.addEventListener('click', closeProjectModal);
  document.getElementById('pro-project-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeProjectModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeroStats();
  updateHeroPreview('contracting');
  renderPillarsOverview();
  renderSectorSpotlight('contracting');
  renderProjects('all');
  renderGovernanceMatrix('all');
  renderValues();
  renderLeadership();
  renderBranchesAndFaqs();
  bindRfqForm();
  bindNavigationAndInteractions();
});
