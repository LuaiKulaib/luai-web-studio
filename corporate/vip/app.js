/* =========================================================
   app.js — مجموعة الأفق القابضة (الفئة الملكية VIP)
   Identity: Sovereign Holding & Investor Relations
   ========================================================= */
'use strict';

const VIP_SVG = {
  building: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><path d="M9 22v-4h6v4"/></svg>',
  compass: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  layers: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  shield: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  award: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/></svg>',
  clock: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  users: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  chevron: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
  userBadge: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
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

const VIP_HERO_SCENES = {
  hq: {
    tag: 'HQ · AL-OFOQ GROUP',
    image: '../assets/images/office.jpg',
    alt: 'المقر التنفيذي لمجموعة الأفق القابضة',
    title: 'المقر التنفيذي وحوكمة المحفظة الهندسية',
    desc: 'إدارة مركزية للعقود الكبرى والمشاريع الإقليمية مع تدقيق جودة مستمر وفق معايير ISO.',
  },
  field: {
    tag: 'FIELD · ENGINEERING OPS',
    image: '../assets/images/project.jpg',
    alt: 'فرق العمليات الهندسية ومراقبة التنفيذ الميداني',
    title: 'انضباط ميداني وتدقيق سلامة HSE صفري الحوادث',
    desc: 'إشراف يومي للمهندسين المعتمدين في مواقع المقاولات ومشاريع البنية التحتية.',
  },
  analytics: {
    tag: 'IR · PORTFOLIO TELEMETRY',
    image: '../assets/images/team.jpg',
    alt: 'تحليل أداء المحفظة ودراسات الجدوى الهندسية',
    title: 'تخطيط هندسي مالي وتقارير مستثمرين دورية',
    desc: 'مراقبة مؤشرات الإنجاز، الانضباط الزمني، وهندسة القيمة عبر كافة عقود المجموعة.',
  },
  alliances: {
    tag: 'CORP · STRATEGIC CONTRACTS',
    image: '../assets/images/about.jpg',
    alt: 'اجتماع شراكة وتوقيع العقود الاستراتيجية',
    title: 'شراكات مؤسسية مستدامة في اليمن والخليج',
    desc: 'اتفاقيات طويلة الأمد مع الجهات الحكومية والقطاع الخاص لتنفيذ وتوريد المشاريع الحيوية.',
  },
};

const VIP_IR_PROFILES = {
  all: {
    label: 'المحفظة القابضة الشاملة',
    kpis: [
      { label: 'إجمالي المشاريع المنجزة', value: '+140', delta: 'نمو تراكمي 18.4% سنوياً' },
      { label: 'معدل الالتزام بالجدول الزمني', value: '98.4%', delta: 'اعتماد ISO 9001 & PMP' },
      { label: 'استمرارية العقود المؤسسية', value: '91%', delta: 'شراكات متكررة B2B' },
      { label: 'الامتثال للسلامة المهنية HSE', value: '100%', delta: '0 حوادث جسيمة مسجلة' },
    ],
    series: [62, 74, 88, 102, 118, 132, 144],
    sectorSeries: [62, 74, 88, 102, 118, 132, 144],
  },
  contracting: {
    label: 'قطاع المقاولات والإنشاءات',
    kpis: [
      { label: 'حصة القطاع من المحفظة', value: '46%', delta: 'الذراع التنفيذي الأكبر' },
      { label: 'مشاريع إنشائية وبنية تحتية', value: '+64', delta: 'مجمعات ومرافق تجارية' },
      { label: 'انضباط تسليم المراحل', value: '98.6%', delta: 'مراجعة أسبوعية موثقة' },
      { label: 'أحدث إنجاز رئيسي', value: '18,000 m²', delta: 'مجمع الأعمال الإداري — صنعاء' },
    ],
    series: [62, 74, 88, 102, 118, 132, 144],
    sectorSeries: [28, 34, 41, 48, 55, 61, 66],
  },
  engineering: {
    label: 'الاستشارات والإشراف الهندسي',
    kpis: [
      { label: 'حصة القطاع من المحفظة', value: '28%', delta: 'نمو استشاري مستقر' },
      { label: 'دراسات وإشراف مشاريع', value: '+45', delta: 'تغطية في اليمن والخليج' },
      { label: 'منهجية الإدارة المعتمدة', value: 'PMP', delta: 'FIDIC & Value Engineering' },
      { label: 'مشاريع إقليمية بارزة', value: 'عدن & جدة', delta: 'لوجستيات ومقرات شركات' },
    ],
    series: [62, 74, 88, 102, 118, 132, 144],
    sectorSeries: [18, 22, 26, 30, 35, 40, 45],
  },
  supply: {
    label: 'التوريدات والعقود الحكومية',
    kpis: [
      { label: 'حصة القطاع من المحفظة', value: '26%', delta: 'توسع عقود الطاقة والإمداد' },
      { label: 'عقود توريد استراتيجية', value: '+31', delta: 'معدات طاقة وخطوط تحكم' },
      { label: 'نسبة مطابقة المواصفات', value: '100%', delta: 'فحص فني وضمان شامل' },
      { label: 'محور التوريد الإقليمي', value: 'الرياض', delta: 'تجهيز 3 منشآت حيوية 2025' },
    ],
    series: [62, 74, 88, 102, 118, 132, 144],
    sectorSeries: [16, 18, 21, 24, 28, 31, 33],
  },
};

const VIP_SECTOR_WEIGHTS = [
  { key: 'contracting', label: 'المقاولات والإنشاءات والبنية التحتية', share: '46%', width: '46%' },
  { key: 'engineering', label: 'الاستشارات والإشراف الهندسي PMP', share: '28%', width: '28%' },
  { key: 'supply', label: 'التوريدات المؤسسية والعقود الحكومية', share: '26%', width: '26%' },
];

const VIP_YEARS = [
  { year: '2020', milestone: 'تأسيس منظومة الحوكمة الهندسية الرقمية وتوحيد إجراءات ISO 9001', growth: '+14%' },
  { year: '2021', milestone: 'توسيع عقود التوريدات اللوجستية ومشاريع القطاع التجاري', growth: '+19%' },
  { year: '2022', milestone: 'رفع طاقة التنفيذ الإقليمي وتفعيل مركز التنسيق للمشاريع الكبرى', growth: '+18%' },
  { year: '2023', milestone: 'إطلاق مكتب التطوير والشراكات في الرياض وتعزيز سلاسل الإمداد', growth: '+16%' },
  { year: '2024', milestone: 'إنجاز إشراف المحطة اللوجستية بعدن وإعادة تأهيل المقر الإقليمي بجدة', growth: '+16%' },
  { year: '2025', milestone: 'تسليم مجمع الأعمال الإداري بصنعاء وعقد تجهيز الطاقة بالرياض', growth: '+12%' },
  { year: '2026', milestone: 'تجاوز حاجز 140 مشروعاً منجزاً وإطلاق بوابة المستثمرين VIP', growth: '+9% YTD' },
];

const VIP_BRANCH_COMMAND = [
  {
    key: 'sanaa',
    code: 'HQ-SAN-01',
    shortName: 'صنعاء',
    commandRole: 'القيادة المركزية والحوكمة',
    lead: 'م. طارق الأصبحي — الرئيس التنفيذي',
    teams: '14 فريقاً هندسياً ومراقبة جودة',
    sla: '24 ساعة',
    flagship: 'مجمع الأعمال الإداري — صنعاء (18,000 م²)',
    coverage: 'المشاريع المركزية، العقود السيادية، والإدارة المالية',
  },
  {
    key: 'aden',
    code: 'REG-ADE-02',
    shortName: 'عدن',
    commandRole: 'المكتب الإقليمي والعمليات اللوجستية',
    lead: 'م. نبيل الشميري — مدير العمليات الهندسية',
    teams: '9 فرق إشراف ميداني وهندسة مدنية',
    sla: '24 - 36 ساعة',
    flagship: 'تطوير المحطة اللوجستية المركزية — عدن',
    coverage: 'المحافظات الساحلية، الموانئ، والمستودعات الاستراتيجية',
  },
  {
    key: 'riyadh',
    code: 'KSA-RUH-03',
    commandRole: 'مكتب التطوير والشراكات الإقليمية',
    lead: 'أ. خالد المقطري — مدير التوريدات والعقود',
    teams: 'وحدة المشتريات الدولية وسلاسل الإمداد',
    sla: '24 - 48 ساعة',
    flagship: 'عقد تجهيز وتوريد معدات الطاقة — الرياض',
    coverage: 'السعودية والخليج، التوريدات الصناعية، والشراكات الاستراتيجية',
  },
];

const VIP_SUBSCOPES = [
  'تنفيذ مبانٍ ومجمعات إدارية',
  'أعمال كهروميكانيكية MEP',
  'دراسات جدوى وتصميم معماري',
  'إشراف هندسي وإدارة عقود PMP',
  'توريد معدات طاقة وتحكم',
  'عقود إمداد وتجهيز سنوية',
];

const VIP_BUDGET_TIERS = [
  { code: 'TIER A', title: 'الفئة المؤسسية', range: '$100K – $500K', note: 'مشاريع متخصصة وعقود إشراف وتوريد مرحلي' },
  { code: 'TIER B', title: 'الفئة الإقليمية', range: '$500K – $2.5M', note: 'مشاريع إنشائية متكاملة وتجهيز منشآت حيوية' },
  { code: 'TIER C', title: 'الفئة الاستراتيجية الكبرى', range: '$2.5M – $10M+', note: 'بنية تحتية، مجمعات كبرى، وعقود توريد متعددة المواقع' },
  { code: 'FRAMEWORK', title: 'اتفاقية شراكة إطارية', range: 'Multi-Year', note: 'تعاون استراتيجي مستمر للشركات والمنظمات' },
];

const VIP_COMPLIANCE_DOCS = [
  'السجل التجاري',
  'شهادات الجودة ISO 9001 & 45001',
  'الشهادة الضريبية',
  'ملف السوابق الهندسية',
  'شهادة التصنيف والتأهيل',
];

let irActiveSector = 'all';
let irActiveYearIdx = 6;
let activeBranchIdx = 0;
let activePortfolioFilter = 'all';

const vipState = {
  scopes: ['المقاولات والإنشاءات'],
  subscopes: ['تنفيذ مبانٍ ومجمعات إدارية', 'أعمال كهروميكانيكية MEP'],
  budgetCode: 'TIER B',
  docs: ['السجل التجاري', 'شهادات الجودة ISO 9001 & 45001', 'الشهادة الضريبية'],
  branchCity: '',
  attachedProject: '',
};

function renderHeroStats() {
  const el = document.getElementById('vip-hero-stats');
  if (!el || typeof CORP_DATA === 'undefined') return;

  el.innerHTML = CORP_DATA.stats.map(s => `
    <div class="vip-stat-cell">
      <strong class="num-font">${s.value}</strong>
      <span>${s.label}</span>
    </div>
  `).join('');
}

function setHeroScene(key) {
  const scene = VIP_HERO_SCENES[key];
  if (!scene) return;

  const img = document.getElementById('vip-hero-img');
  const tag = document.getElementById('vip-hero-tag');
  const title = document.getElementById('vip-hero-title');
  const desc = document.getElementById('vip-hero-desc');

  if (img) {
    img.src = scene.image;
    img.alt = scene.alt;
  }
  if (tag) tag.textContent = scene.tag;
  if (title) title.textContent = scene.title;
  if (desc) desc.textContent = scene.desc;

  document.querySelectorAll('#vip-hero-scene-tabs .scene-tab').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.scene === key);
  });
}

function renderInvestorDashboard(sectorKey = 'all') {
  irActiveSector = sectorKey;
  const profile = VIP_IR_PROFILES[sectorKey] || VIP_IR_PROFILES.all;

  const kpiEl = document.getElementById('vip-ir-kpis');
  if (kpiEl) {
    kpiEl.innerHTML = profile.kpis.map(k => `
      <div class="ir-kpi-box">
        <small>${k.label}</small>
        <strong>${k.value}</strong>
        <span>${k.delta}</span>
      </div>
    `).join('');
  }

  const bdEl = document.getElementById('vip-sector-breakdown');
  if (bdEl) {
    bdEl.innerHTML = VIP_SECTOR_WEIGHTS.map(row => `
      <div class="bd-row ${sectorKey === row.key ? 'is-active' : ''}" data-bd-sector="${row.key}" role="button" tabindex="0">
        <div class="bd-row-top">
          <span>${row.label}</span>
          <strong class="num-font">${row.share}</strong>
        </div>
        <div class="bd-track"><div class="bd-fill" style="width:${row.width}"></div></div>
      </div>
    `).join('');

    bdEl.querySelectorAll('.bd-row').forEach(row => {
      const toggle = () => {
        const next = row.dataset.bdSector;
        renderInvestorDashboard(irActiveSector === next ? 'all' : next);
      };
      row.addEventListener('click', toggle);
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  document.querySelectorAll('#vip-ir-sector-tabs .ir-tab').forEach(btn => {
    const active = btn.dataset.irSector === sectorKey;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  renderGrowthChart();
}

function renderGrowthChart() {
  const wrap = document.getElementById('vip-growth-chart-wrap');
  const strip = document.getElementById('vip-growth-year-strip');
  const milestoneEl = document.getElementById('vip-growth-milestone');
  if (!wrap) return;

  const profile = VIP_IR_PROFILES[irActiveSector] || VIP_IR_PROFILES.all;
  const totalSeries = profile.series;
  const sectorSeries = profile.sectorSeries;

  const W = 560;
  const H = 210;
  const padX = 28;
  const padTop = 24;
  const padBottom = 26;
  const plotW = W - padX * 2;
  const plotH = H - padTop - padBottom;
  const maxVal = 160;

  const toCoords = arr => arr.map((val, i) => {
    const x = padX + (i / (arr.length - 1)) * plotW;
    const y = padTop + plotH - (val / maxVal) * plotH;
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)), val };
  });

  const totalPts = toCoords(totalSeries);
  const sectorPts = toCoords(sectorSeries);

  const gridLines = [40, 80, 120, 150].map(v => {
    const y = (padTop + plotH - (v / maxVal) * plotH).toFixed(1);
    return `<line x1="${padX}" y1="${y}" x2="${W - padX}" y2="${y}" stroke="rgba(221,179,91,0.14)" stroke-width="1" stroke-dasharray="4 4"/>`;
  }).join('');

  const totalPath = totalPts.map(p => `${p.x},${p.y}`).join(' ');
  const sectorPath = sectorPts.map(p => `${p.x},${p.y}`).join(' ');

  const totalNodes = totalPts.map((p, idx) => {
    const active = idx === irActiveYearIdx;
    return `
      <circle cx="${p.x}" cy="${p.y}" r="${active ? 7.5 : 4.5}" fill="none" stroke="#DDB35B" stroke-width="${active ? 2 : 1.5}"/>
      ${active ? `<circle cx="${p.x}" cy="${p.y}" r="12" fill="none" stroke="rgba(221,179,91,0.38)" stroke-width="1.2"/>` : ''}
    `;
  }).join('');

  const sectorNodes = irActiveSector === 'all' ? '' : sectorPts.map((p, idx) => {
    const active = idx === irActiveYearIdx;
    return `<circle cx="${p.x}" cy="${p.y}" r="${active ? 6 : 3.5}" fill="none" stroke="#60A5FA" stroke-width="1.8"/>`;
  }).join('');

  wrap.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="منحنى النمو التراكمي للمشاريع المنجزة 2020-2026">
      <line x1="${padX}" y1="${padTop + plotH}" x2="${W - padX}" y2="${padTop + plotH}" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>
      ${gridLines}
      <polyline points="${totalPath}" fill="none" stroke="#DDB35B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      ${irActiveSector !== 'all' ? `<polyline points="${sectorPath}" fill="none" stroke="#60A5FA" stroke-width="2" stroke-dasharray="5 3" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
      ${totalNodes}
      ${sectorNodes}
    </svg>
  `;

  if (strip) {
    strip.innerHTML = VIP_YEARS.map((y, idx) => `
      <button type="button" class="year-node-btn ${idx === irActiveYearIdx ? 'is-active' : ''}" data-year-idx="${idx}">${y.year}</button>
    `).join('');

    strip.querySelectorAll('.year-node-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        irActiveYearIdx = Number(btn.dataset.yearIdx);
        renderGrowthChart();
      });
    });
  }

  if (milestoneEl) {
    const yObj = VIP_YEARS[irActiveYearIdx] || VIP_YEARS[VIP_YEARS.length - 1];
    const totalVal = totalSeries[irActiveYearIdx];
    const secVal = sectorSeries[irActiveYearIdx];
    const countText = irActiveSector === 'all'
      ? `${totalVal} مشروعاً تراكمياً`
      : `${secVal} مشروعاً في القطاع (${totalVal} إجمالاً)`;

    milestoneEl.innerHTML = `
      <div class="cm-left">
        <strong>محطة عام <span class="num-font">${yObj.year}</span> · ${profile.label}</strong>
        <p>${yObj.milestone}</p>
      </div>
      <div class="cm-right">
        <strong class="num-font">${countText}</strong>
        <span>مؤشر التوسع السنوي: ${yObj.growth}</span>
      </div>
    `;
  }
}

function renderBranchCommand(idx = 0) {
  activeBranchIdx = idx;
  const switcher = document.getElementById('vip-branch-switcher');
  const detailEl = document.getElementById('vip-branch-detail');
  if (typeof CORP_DATA === 'undefined') return;

  if (switcher) {
    switcher.innerHTML = CORP_DATA.branches.map((br, i) => {
      const cmd = VIP_BRANCH_COMMAND[i] || VIP_BRANCH_COMMAND[0];
      return `
        <button type="button" class="branch-cmd-btn ${i === idx ? 'is-active' : ''}" role="tab" aria-selected="${i === idx}" data-branch-idx="${i}">
          <div class="bcb-top">
            <span class="bcb-code">${cmd.code}</span>
            <span class="bcb-role">${cmd.commandRole}</span>
          </div>
          <h3>${br.city}</h3>
          <p>${br.address}</p>
        </button>
      `;
    }).join('');

    switcher.querySelectorAll('.branch-cmd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        renderBranchCommand(Number(btn.dataset.branchIdx));
      });
    });
  }

  if (detailEl) {
    const branch = CORP_DATA.branches[idx] || CORP_DATA.branches[0];
    const cmd = VIP_BRANCH_COMMAND[idx] || VIP_BRANCH_COMMAND[0];

    detailEl.innerHTML = `
      <div class="bdc-head">
        <div>
          <span class="bdc-code">${cmd.code} · ${cmd.commandRole}</span>
          <h3>${branch.city}</h3>
        </div>
        <div class="bdc-sla">
          <strong class="num-font">${cmd.sla}</strong>
          <span>زمن التحريك والرد</span>
        </div>
      </div>

      <div class="bdc-specs-grid">
        <div class="bdc-spec">
          <small>العنوان المعتمد</small>
          <strong>${branch.address}</strong>
        </div>
        <div class="bdc-spec">
          <small>ساعات العمل الرسمية</small>
          <strong>${branch.hours}</strong>
        </div>
        <div class="bdc-spec">
          <small>الارتباط التنفيذي المباشر</small>
          <strong>${cmd.lead}</strong>
        </div>
        <div class="bdc-spec">
          <small>القوة الهندسية المخصصة</small>
          <strong>${cmd.teams}</strong>
        </div>
      </div>

      <div class="bdc-spec">
        <small>نطاق التغطية الجغرافية</small>
        <strong>${cmd.coverage}</strong>
      </div>

      <div class="bdc-footer">
        <div class="bdc-flagship">
          <span>أبرز المشاريع المرجعية المرتبطة بالمركز</span>
          <strong>${cmd.flagship}</strong>
        </div>
        <button type="button" class="btn-gold-outline" id="vip-assign-branch-btn">
          <span>اعتماد هذا الفرع في باني المناقصات</span>
        </button>
      </div>
    `;

    document.getElementById('vip-assign-branch-btn')?.addEventListener('click', () => {
      vipState.branchCity = branch.city;
      const sel = document.getElementById('vip-branch-select');
      if (sel) sel.value = branch.city;
      updateDossierSummary();
      document.getElementById('tender-configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function renderPortfolio(filter = 'all') {
  activePortfolioFilter = filter;
  const grid = document.getElementById('vip-portfolio-grid');
  if (!grid || typeof CORP_DATA === 'undefined') return;

  const items = CORP_DATA.projects.filter(p => filter === 'all' || p.cat === filter);
  grid.innerHTML = items.map(p => `
    <article class="vip-proj-card">
      <div class="vip-proj-media">
        <img src="${resolveCorporateImage(p.image)}" alt="${p.title}" loading="lazy">
        <span class="vip-proj-year num-font">${p.year}</span>
      </div>
      <div class="vip-proj-body">
        <span class="vip-proj-cat">${p.catLabel}</span>
        <h3>${p.title}</h3>
        <p>${p.scope}</p>
        <button type="button" class="btn-attach-ref" data-ref-title="${escapeHtml(p.title)}">
          <span>تضمين كمشروع مرجعي في ملف المناقصة</span>
        </button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.btn-attach-ref').forEach(btn => {
    btn.addEventListener('click', () => {
      vipState.attachedProject = btn.dataset.refTitle || '';
      const notesEl = document.getElementById('vip-notes');
      if (notesEl && !notesEl.value.includes(vipState.attachedProject)) {
        notesEl.value = `طلب عرض مشابه للمشروع المرجعي: ${vipState.attachedProject}${notesEl.value ? '\n' + notesEl.value : ''}`;
      }
      updateDossierSummary();
      document.getElementById('tender-configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('#vip-portfolio-filters .ir-tab').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.pfilter === filter);
  });
}

function renderLeadershipAndValues() {
  if (typeof CORP_DATA === 'undefined') return;

  const leadEl = document.getElementById('vip-leadership-grid');
  if (leadEl) {
    leadEl.innerHTML = CORP_DATA.leadership.map(l => `
      <article class="vip-leader-card">
        <div class="vip-leader-icon">${VIP_SVG.userBadge}</div>
        <div>
          <span>${l.role}</span>
          <h4>${l.name}</h4>
          <p>${l.bio}</p>
        </div>
      </article>
    `).join('');
  }

  const valEl = document.getElementById('vip-values-grid');
  if (valEl) {
    valEl.innerHTML = CORP_DATA.values.map(v => `
      <article class="vip-value-card">
        <div class="vip-val-icon">${VIP_SVG[v.icon] || VIP_SVG.shield}</div>
        <h4>${v.title}</h4>
        <p>${v.desc}</p>
      </article>
    `).join('');
  }
}

function renderTenderConfiguratorControls() {
  if (typeof CORP_DATA === 'undefined') return;

  const scopeGrid = document.getElementById('vip-scope-grid');
  if (scopeGrid) {
    scopeGrid.innerHTML = CORP_DATA.pillars.map(p => {
      const selected = vipState.scopes.includes(p.title);
      return `
        <button type="button" class="scope-toggle-card ${selected ? 'is-selected' : ''}" data-scope-title="${p.title}">
          <div class="stc-head">
            ${VIP_SVG[p.icon] || VIP_SVG.building}
            <span class="num-font">${selected ? 'ACTIVE' : 'SELECT'}</span>
          </div>
          <strong>${p.title}</strong>
          <small>${p.desc}</small>
        </button>
      `;
    }).join('');

    scopeGrid.querySelectorAll('.scope-toggle-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.scopeTitle;
        const exists = vipState.scopes.includes(title);
        if (exists && vipState.scopes.length > 1) {
          vipState.scopes = vipState.scopes.filter(s => s !== title);
        } else if (!exists) {
          vipState.scopes.push(title);
        }
        renderTenderConfiguratorControls();
        updateDossierSummary();
      });
    });
  }

  const subGrid = document.getElementById('vip-subscope-grid');
  if (subGrid) {
    subGrid.innerHTML = VIP_SUBSCOPES.map(item => {
      const selected = vipState.subscopes.includes(item);
      return `
        <button type="button" class="chip-toggle-btn ${selected ? 'is-selected' : ''}" data-subscope="${item}">
          ${VIP_SVG.check}
          <span>${item}</span>
        </button>
      `;
    }).join('');

    subGrid.querySelectorAll('.chip-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.subscope;
        if (vipState.subscopes.includes(val)) {
          vipState.subscopes = vipState.subscopes.filter(x => x !== val);
        } else {
          vipState.subscopes.push(val);
        }
        renderTenderConfiguratorControls();
        updateDossierSummary();
      });
    });
  }

  const budgetGrid = document.getElementById('vip-budget-grid');
  if (budgetGrid) {
    budgetGrid.innerHTML = VIP_BUDGET_TIERS.map(b => `
      <button type="button" class="budget-tier-btn ${vipState.budgetCode === b.code ? 'is-selected' : ''}" data-budget-code="${b.code}">
        <div class="bt-top">
          <span class="bt-code">${b.code}</span>
          <span class="bt-range">${b.range}</span>
        </div>
        <strong>${b.title}</strong>
        <small>${b.note}</small>
      </button>
    `).join('');

    budgetGrid.querySelectorAll('.budget-tier-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        vipState.budgetCode = btn.dataset.budgetCode;
        renderTenderConfiguratorControls();
        updateDossierSummary();
      });
    });
  }

  const compGrid = document.getElementById('vip-compliance-grid');
  if (compGrid) {
    compGrid.innerHTML = VIP_COMPLIANCE_DOCS.map(doc => {
      const selected = vipState.docs.includes(doc);
      return `
        <button type="button" class="chip-toggle-btn ${selected ? 'is-selected' : ''}" data-doc="${doc}">
          ${VIP_SVG.check}
          <span>${doc}</span>
        </button>
      `;
    }).join('');

    compGrid.querySelectorAll('.chip-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const doc = btn.dataset.doc;
        if (vipState.docs.includes(doc)) {
          if (vipState.docs.length > 1) {
            vipState.docs = vipState.docs.filter(d => d !== doc);
          }
        } else {
          vipState.docs.push(doc);
        }
        renderTenderConfiguratorControls();
        updateDossierSummary();
      });
    });
  }
}

function initBranchAndFaqControls() {
  if (typeof CORP_DATA === 'undefined') return;

  const brSelect = document.getElementById('vip-branch-select');
  if (brSelect) {
    brSelect.innerHTML = CORP_DATA.branches.map(b => `<option value="${b.city}">${b.city}</option>`).join('');
    if (!vipState.branchCity && CORP_DATA.branches[0]) {
      vipState.branchCity = CORP_DATA.branches[0].city;
    }
    brSelect.value = vipState.branchCity;
    brSelect.addEventListener('change', () => {
      vipState.branchCity = brSelect.value;
      updateDossierSummary();
    });
  }

  const timelineSel = document.getElementById('vip-timeline-select');
  timelineSel?.addEventListener('change', updateDossierSummary);

  const faqEl = document.getElementById('vip-faqs-list');
  if (faqEl) {
    faqEl.innerHTML = CORP_DATA.faqs.map((f, i) => `
      <div class="vip-faq-item ${i === 0 ? 'open' : ''}">
        <button type="button" class="vip-faq-q">
          <span>${f.q}</span>
          ${VIP_SVG.chevron}
        </button>
        <div class="vip-faq-a">${f.a}</div>
      </div>
    `).join('');

    faqEl.addEventListener('click', e => {
      const btn = e.target.closest('.vip-faq-q');
      if (!btn) return;
      btn.closest('.vip-faq-item')?.classList.toggle('open');
    });
  }
}

function getActiveBudgetTier() {
  return VIP_BUDGET_TIERS.find(b => b.code === vipState.budgetCode) || VIP_BUDGET_TIERS[1];
}

function updateDossierSummary() {
  const sumEl = document.getElementById('vip-summary-body');
  const headerChip = document.getElementById('vip-header-scope-count');
  const budgetObj = getActiveBudgetTier();
  const timeline = document.getElementById('vip-timeline-select')?.value || 'مشروع مرحلي (6 – 12 شهراً)';

  if (headerChip) {
    headerChip.textContent = `${vipState.scopes.length} قطاع · ${budgetObj.code}`;
  }

  if (!sumEl) return;

  sumEl.innerHTML = `
    <div class="sum-item">
      <small>نطاقات العمل المختارة (${vipState.scopes.length})</small>
      <strong>${vipState.scopes.join(' + ')}</strong>
      <div class="sum-tags">
        ${vipState.subscopes.length
          ? vipState.subscopes.map(s => `<span>${escapeHtml(s)}</span>`).join('')
          : '<span>نطاق عام شامل</span>'}
      </div>
    </div>

    <div class="sum-item">
      <small>فئة الميزانية التقديرية</small>
      <strong>${budgetObj.title} (<span class="num-font">${budgetObj.range}</span>)</strong>
    </div>

    <div class="sum-item">
      <small>مركز القيادة والجدول الزمني</small>
      <strong>${escapeHtml(vipState.branchCity || 'صنعاء — المقر الرئيسي')}</strong>
      <span style="font-size:0.78rem;color:var(--gold);display:block;margin-top:0.2rem;">${escapeHtml(timeline)}</span>
    </div>

    <div class="sum-item">
      <small>الوثائق القانونية المحددة (${vipState.docs.length})</small>
      <div class="sum-tags">
        ${vipState.docs.map(d => `<span>${escapeHtml(d)}</span>`).join('')}
      </div>
    </div>

    ${vipState.attachedProject ? `
      <div class="sum-item">
        <small>مشروع مرجعي مرفق</small>
        <strong>${escapeHtml(vipState.attachedProject)}</strong>
      </div>
    ` : ''}
  `;
}

function collectDossierPayload(useSampleDefaults = false) {
  const orgInput = document.getElementById('vip-org')?.value.trim() || '';
  const contactInput = document.getElementById('vip-contact')?.value.trim() || '';
  const phoneInput = document.getElementById('vip-phone')?.value.trim() || '';
  const emailInput = document.getElementById('vip-email')?.value.trim() || '';
  const refInput = document.getElementById('vip-ref')?.value.trim() || '';
  const notesInput = document.getElementById('vip-notes')?.value.trim() || '';
  const timeline = document.getElementById('vip-timeline-select')?.value || 'مشروع مرحلي (6 – 12 شهراً)';
  const budgetObj = getActiveBudgetTier();

  const org = orgInput || (useSampleDefaults ? 'مؤسسة الشريك الاستراتيجي للتطوير (نموذج معاينة)' : '');
  const contact = contactInput || (useSampleDefaults ? 'إدارة المشاريع والمناقصات' : '');
  const phone = phoneInput || (useSampleDefaults ? '0782259937' : '');
  const email = emailInput || 'contracts@alofoq-group.example';
  const refCode = refInput || `AFQ-VIP-2026-${String(Math.floor(100 + Math.random() * 899))}`;
  const notes = notesInput || 'طلب استلام ملف القدرة الفنية والمالية وتقديم عرض فني ومالي وفق الشروط المعتمدة.';

  return {
    dossierId: refCode,
    dateStr: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
    org,
    contact,
    phone,
    email,
    timeline,
    branch: vipState.branchCity || 'صنعاء — المقر الرئيسي',
    budgetTitle: `${budgetObj.title} (${budgetObj.range})`,
    scopes: [...vipState.scopes],
    subscopes: [...vipState.subscopes],
    docs: [...vipState.docs],
    attachedProject: vipState.attachedProject,
    notes,
  };
}

function buildPlainTextDossier(payload) {
  const company = (typeof CORP_CONFIG !== 'undefined' && CORP_CONFIG.companyName) ? CORP_CONFIG.companyName : 'مجموعة الأفق القابضة';
  return [
    `*ملف القدرة المؤسسية وطلب المناقصة — ${company}*`,
    'التصنيف: الفئة الملكية VIP',
    `المرجع: ${payload.dossierId} | التاريخ: ${payload.dateStr}`,
    `الجهة الطالبة: ${payload.org}`,
    `المفوض الرسمي: ${payload.contact} (${payload.phone})`,
    `البريد المؤسسي: ${payload.email}`,
    `نطاق العمل: ${payload.scopes.join(' + ')}`,
    `المسارات التفصيلية: ${payload.subscopes.length ? payload.subscopes.join('، ') : 'نطاق عام متكامل'}`,
    `فئة الميزانية التقديرية: ${payload.budgetTitle}`,
    `مركز التنفيذ المشرف: ${payload.branch}`,
    `الجدول الزمني المستهدف: ${payload.timeline}`,
    `الوثائق الرسمية المطلوبة: ${payload.docs.join('، ')}`,
    payload.attachedProject ? `مرجع سوابق مرفق: ${payload.attachedProject}` : '',
    `ملاحظات ونطاق المشروع: ${payload.notes}`,
  ].filter(Boolean).join('\n');
}

function openDossierModal(payload) {
  const modal = document.getElementById('vip-dossier-modal');
  const paper = document.getElementById('vip-dossier-paper');
  const copyStatus = document.getElementById('vip-copy-status');
  if (!modal || !paper) return;

  const companyName = (typeof CORP_CONFIG !== 'undefined' && CORP_CONFIG.companyName) ? CORP_CONFIG.companyName : 'مجموعة الأفق القابضة';
  const companyEn = (typeof CORP_CONFIG !== 'undefined' && CORP_CONFIG.companyEn) ? CORP_CONFIG.companyEn : 'Al-Ofoq Corporate Group';
  const phone = (typeof CORP_CONFIG !== 'undefined' && CORP_CONFIG.phone) ? CORP_CONFIG.phone : '0782259937';
  const stats = (typeof CORP_DATA !== 'undefined' && CORP_DATA.stats) ? CORP_DATA.stats : [];
  const leaders = (typeof CORP_DATA !== 'undefined' && CORP_DATA.leadership) ? CORP_DATA.leadership : [];

  paper.innerHTML = `
    <div class="paper-letterhead">
      <div class="paper-brand">
        <h2>${companyName} — ملف القدرة والمناقصة</h2>
        <p>${companyEn} · الفئة الملكية VIP | هاتف الإدارة: ${phone}</p>
      </div>
      <div class="paper-ref-box">
        <strong>${escapeHtml(payload.dossierId)}</strong>
        <span>التاريخ: ${escapeHtml(payload.dateStr)}</span>
      </div>
    </div>

    <div class="paper-kpis">
      ${stats.map(s => `
        <div class="paper-kpi">
          <strong>${s.value}</strong>
          <span>${s.label}</span>
        </div>
      `).join('')}
    </div>

    <div class="paper-section">
      <h3>بيانات الجهة الطالبة والعقد المستهدف</h3>
      <div class="paper-grid-2">
        <div class="paper-row"><strong>الجهة / الشركة:</strong> <span>${escapeHtml(payload.org)}</span></div>
        <div class="paper-row"><strong>المفوّض الرسمي:</strong> <span>${escapeHtml(payload.contact)}</span></div>
        <div class="paper-row"><strong>رقم التواصل:</strong> <span class="num-font">${escapeHtml(payload.phone)}</span></div>
        <div class="paper-row"><strong>البريد المؤسسي:</strong> <span class="num-font">${escapeHtml(payload.email)}</span></div>
        <div class="paper-row"><strong>مركز القيادة المشرف:</strong> <span>${escapeHtml(payload.branch)}</span></div>
        <div class="paper-row"><strong>فئة الميزانية والجدول:</strong> <span>${escapeHtml(payload.budgetTitle)} · ${escapeHtml(payload.timeline)}</span></div>
      </div>
    </div>

    <div class="paper-section">
      <h3>نطاق الأعمال الهندسية والتوريدية المطلوبة</h3>
      <div class="paper-tags" style="margin-bottom:0.55rem;">
        ${payload.scopes.map(s => `<span>${escapeHtml(s)}</span>`).join('')}
      </div>
      <div class="paper-tags">
        ${payload.subscopes.map(sub => `<span>${escapeHtml(sub)}</span>`).join('')}
      </div>
    </div>

    <div class="paper-section">
      <h3>حزمة المستندات القانونية والاعتماد المطلوبة</h3>
      <div class="paper-tags">
        ${payload.docs.map(d => `<span>${escapeHtml(d)}</span>`).join('')}
      </div>
    </div>

    <div class="paper-section">
      <h3>ملاحظات النطاق والمواصفات الفنية</h3>
      <p style="font-size:0.88rem;color:#334155;">${escapeHtml(payload.notes)}</p>
    </div>

    <div class="paper-board-sign">
      ${leaders.map(l => `
        <div>
          <strong>${l.name}</strong>
          <span>${l.role}</span>
        </div>
      `).join('')}
    </div>
  `;

  const plainText = buildPlainTextDossier(payload);
  const waNumber = (typeof CORP_CONFIG !== 'undefined' && CORP_CONFIG.whatsappNumber) ? CORP_CONFIG.whatsappNumber : '967782259937';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(plainText)}`;

  const copyBtn = document.getElementById('vip-copy-btn');
  const waBtn = document.getElementById('vip-wa-btn');

  if (copyStatus) copyStatus.textContent = '';

  if (copyBtn) {
    copyBtn.onclick = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(plainText);
        } else {
          const ta = document.createElement('textarea');
          ta.value = plainText;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        if (copyStatus) copyStatus.textContent = 'تم نسخ نص ملف القدرة والمناقصة إلى الحافظة بنجاح.';
      } catch {
        if (copyStatus) copyStatus.textContent = 'يرجى تحديد النص ونسخه يدوياً أو استخدام زر الطباعة PDF.';
      }
    };
  }

  if (waBtn) {
    waBtn.onclick = () => {
      window.open(waUrl, '_blank', 'noopener');
    };
  }

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('vip-modal-close')?.focus();
}

function closeDossierModal() {
  const modal = document.getElementById('vip-dossier-modal');
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

function bindVipInteractions() {
  const menuBtn = document.getElementById('vip-menu-btn');
  const drawer = document.getElementById('vip-mobile-drawer');

  menuBtn?.addEventListener('click', () => {
    if (!drawer) return;
    const willOpen = drawer.hidden;
    drawer.hidden = !willOpen;
    menuBtn.setAttribute('aria-expanded', String(willOpen));
  });

  drawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.hidden = true;
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  document.getElementById('vip-hero-scene-tabs')?.addEventListener('click', e => {
    const btn = e.target.closest('.scene-tab');
    if (!btn) return;
    setHeroScene(btn.dataset.scene);
  });

  document.getElementById('vip-ir-sector-tabs')?.addEventListener('click', e => {
    const btn = e.target.closest('.ir-tab');
    if (!btn) return;
    renderInvestorDashboard(btn.dataset.irSector);
  });

  document.getElementById('vip-portfolio-filters')?.addEventListener('click', e => {
    const btn = e.target.closest('.ir-tab');
    if (!btn) return;
    renderPortfolio(btn.dataset.pfilter);
  });

  const form = document.getElementById('vip-tender-form');
  const statusEl = document.getElementById('vip-form-status');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const payload = collectDossierPayload(false);
    if (!payload.org || !payload.contact || !payload.phone) {
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.textContent = 'يرجى تعبئة اسم الجهة، اسم المفوض الرسمي، ورقم التواصل لإصدار ملف القدرة الرسمي.';
      }
      return;
    }
    if (statusEl) statusEl.hidden = true;
    openDossierModal(payload);
  });

  document.getElementById('vip-preview-sample-btn')?.addEventListener('click', () => {
    if (statusEl) statusEl.hidden = true;
    openDossierModal(collectDossierPayload(true));
  });

  document.getElementById('vip-print-btn')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('vip-modal-close')?.addEventListener('click', closeDossierModal);
  document.getElementById('vip-dossier-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDossierModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDossierModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeroStats();
  setHeroScene('hq');
  renderInvestorDashboard('all');
  renderBranchCommand(0);
  renderPortfolio('all');
  renderLeadershipAndValues();
  renderTenderConfiguratorControls();
  initBranchAndFaqControls();
  updateDossierSummary();
  bindVipInteractions();
});
