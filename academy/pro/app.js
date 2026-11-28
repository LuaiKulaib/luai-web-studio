/* =========================================================
   app.js — أكاديمية المستقبل للتدريب والتأهيل (الفئة الفاخرة Pro)
   Modern EdTech Campus Pro — Filterable Catalog, Syllabus Explorer Modal,
   Live Tuition Calculator (USD/SAR/YER), Schedule Picker & Reservation
   ========================================================= */
'use strict';

(function initAcademyPro() {
  const CFG = typeof ACADEMY_CONFIG !== 'undefined' ? ACADEMY_CONFIG : {
    whatsappNumber: '967782259937',
    academyName: 'أكاديمية المستقبل',
    tagline: 'دبلومات مهنية وتقنية · تدريب حضوري وأونلاين',
  };

  const DATA = typeof ACADEMY_DATA !== 'undefined' ? ACADEMY_DATA : {
    stats: [],
    courses: [],
    benefits: [],
  };

  const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', rate: 1 },
    SAR: { code: 'SAR', symbol: 'ر.س', rate: 3.75 },
    YER: { code: 'YER', symbol: 'ر.ي', rate: 535 },
  };

  const COURSE_DETAILS = {
    'fullstack-web': {
      baseUsd: 320,
      outcome: 'بناء موقع شركة ومتجر تفاعلي متكامل مع النشر المباشر وربط الواتساب.',
      moduleExtras: [
        { week: 'الأسبوع 1 – 2', lab: 'بناء هيكل صفحات متجاوب باستخدام Grid وFlexbox ومعايير WCAG.', tools: 'HTML5, CSS3, Responsive Grid' },
        { week: 'الأسبوع 3 – 5', lab: 'برمجة تفاعلات DOM، التصفية اللحظية، وحفظ الحالة عبر JavaScript ES6+.', tools: 'JavaScript ES6+, DOM APIs, JSON' },
        { week: 'الأسبوع 6 – 8', lab: 'تطوير حاسبات تفاعلية، نماذج طلب ذكية، وربط واجهات WhatsApp والبيانات.', tools: 'State Logic, Forms, Webhooks' },
        { week: 'الأسبوع 9 – 10', lab: 'مراجعة الكود النهائي، تحسين السرعة، ونشر المشروع على GitHub Pages.', tools: 'Git, GitHub Pages, QA Audit' },
      ],
    },
    'ui-ux-design': {
      baseUsd: 260,
      outcome: 'ملف أعمال (Portfolio) احترافي مع نظام تصميم متكامل ونموذج تفاعلي قابل للاختبار.',
      moduleExtras: [
        { week: 'الأسبوع 1 – 2', lab: 'رسم خرائط رحلة المستخدم، هيكلة المعلومات، وبناء Wireframes منخفضة الدقة.', tools: 'UX Research, User Flows, Wireframing' },
        { week: 'الأسبوع 3 – 4', lab: 'إعداد المتغيرات اللونية، الشبكات، والمكونات القابلة لإعادة الاستخدام في Figma.', tools: 'Figma Components, Auto Layout, Tokens' },
        { week: 'الأسبوع 5 – 6', lab: 'ربط الشاشات والانتقالات الذكية واختبار قابلية الاستخدام مع مستخدمين فعليين.', tools: 'Interactive Prototyping, Usability Testing' },
        { week: 'الأسبوع 7 – 8', lab: 'تجهيز ملف العرض الاحترافي وتسليم الأصول للمبرمجين بمعايير الشركات.', tools: 'Behance Case Study, Dev Handoff' },
      ],
    },
    'digital-marketing': {
      baseUsd: 210,
      outcome: 'خطة إطلاق حملات ممولة متكاملة مع تقارير قياس الأداء وتحسين التحويل.',
      moduleExtras: [
        { week: 'الأسبوع 1 – 2', lab: 'تحليل المنافسين، بناء شخصية المشتري، وصياغة جدول محتوى بيعي أسبوعي.', tools: 'Audience Persona, Content Matrix' },
        { week: 'الأسبوع 3 – 4', lab: 'إعداد هيكلة الحملات الإعلانية، اختبار A/B للإعلانات، وضبط الاستهداف الجغرافي.', tools: 'Meta Ads, TikTok Ads, Google Ads' },
        { week: 'الأسبوع 5', lab: 'تحليل مسارات الهبوط وربط أزرار التحويل الفوري لخفض تكلفة الرسالة والطلب.', tools: 'Landing Optimization, CTA Copywriting' },
        { week: 'الأسبوع 6', lab: 'قراءة مؤشرات ROAS وCPA وإعداد لوحة متابعة أسبوعية للعملاء والشركات.', tools: 'Analytics KPI, ROAS & CPA Audits' },
      ],
    },
    'english-business': {
      baseUsd: 220,
      outcome: 'جاهزية كاملة للمراسلات الرسمية، العروض التقديمية، واجتياز مقابلات العمل.',
      moduleExtras: [
        { week: 'الأسبوع 1 – 2', lab: 'تدريبات نطق يومية وكسر رهبة التحدث في بيئات العمل والاجتماعات.', tools: 'Speaking Drills, Fluency Labs' },
        { week: 'الأسبوع 3 – 4', lab: 'صياغة البريد الإلكتروني الرسمي، طلبات التوظيف، وإعادة هيكلة السيرة الذاتية.', tools: 'Business Emails, ATS Resume' },
        { week: 'الأسبوع 5 – 6', lab: 'تطبيق عملي على المقابلات الوظيفية وتقديم العروض أمام لجنة التقييم.', tools: 'Mock Interviews, Presentation Pitch' },
        { week: 'الأسبوع 7 – 8', lab: 'اختبار قياس التقدم النهائي وإصدار شهادة اجتياز البرنامج المعتمدة.', tools: 'Level Assessment, Certified Evaluation' },
      ],
    },
  };

  const SCHEDULE_BATCHES = {
    'next-5': {
      label: 'دفعة بداية الشهر (5 الشهر القادم)',
      slots: [
        { id: 'morning', period: 'الفترة الصباحية', time: '9:00 AM - 12:00 PM', seatsLeft: 6, desc: 'مناسبة للطلاب والخريجين وتفرغ الصباح' },
        { id: 'afternoon', period: 'الفترة العصرية', time: '3:00 PM - 6:00 PM', seatsLeft: 4, desc: 'جلسات تفاعلية متوازنة مع وقت المراجعة' },
        { id: 'evening', period: 'الفترة المسائية', time: '6:30 PM - 9:30 PM', seatsLeft: 3, desc: 'مصممة للموظفين وأصحاب الأعمال' },
      ],
    },
    'mid-15': {
      label: 'دفعة منتصف الشهر (15 الشهر القادم)',
      slots: [
        { id: 'morning', period: 'الفترة الصباحية', time: '9:30 AM - 12:30 PM', seatsLeft: 8, desc: 'مقاعد مفتوحة مع أولوية التسجيل المبكر' },
        { id: 'afternoon', period: 'الفترة العصرية', time: '3:30 PM - 6:30 PM', seatsLeft: 5, desc: 'تطبيق معملي مباشر مع متابعة المدرب' },
        { id: 'evening', period: 'الفترة المسائية', time: '7:00 PM - 10:00 PM', seatsLeft: 7, desc: 'مناسبة للحضور المسائي أو البث المباشر' },
      ],
    },
    'intensive': {
      label: 'الدفعة المكثفة السريعة',
      slots: [
        { id: 'morning', period: 'المعسكر الصباحي', time: '8:30 AM - 12:30 PM', seatsLeft: 5, desc: 'ساعات تطبيق مكثفة لإنجاز أسرع' },
        { id: 'afternoon', period: 'المعسكر العصري', time: '2:30 PM - 6:30 PM', seatsLeft: 3, desc: 'مشاريع عملية مضغوطة بإشراف مباشر' },
        { id: 'evening', period: 'المعسكر المسائي', time: '6:00 PM - 9:30 PM', seatsLeft: 4, desc: 'تأهيل مسائي سريع قبل موسم التوظيف' },
      ],
    },
  };

  const SVG_ICONS = {
    laptop: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
    cert: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/></svg>`,
    video: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
    briefcase: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    users: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    award: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/></svg>`,
    layers: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    trending: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  };

  const state = {
    currency: 'USD',
    activeCat: 'all',
    searchTerm: '',
    calcCourseId: (DATA.courses[0] && DATA.courses[0].id) || 'fullstack-web',
    calcMode: 'campus',
    seats: 1,
    earlyBird: true,
    plan: 'two',
    schedBatch: 'next-5',
    schedDays: 'السبت · الاثنين · الأربعاء',
    schedMode: 'حضوري في القاعات الذكية',
    schedSlotId: 'morning',
    modalCourseId: null,
  };

  function resolveImgPath(rawPath) {
    const file = String(rawPath || 'hero.jpg').split('/').pop();
    const allowed = ['hero.jpg', 'coding.jpg', 'design.jpg', 'business.jpg'];
    const safeFile = allowed.includes(file) ? file : 'hero.jpg';
    return `../assets/images/${safeFile}`;
  }

  function formatMoney(usdAmount, currCode) {
    const c = CURRENCIES[currCode] || CURRENCIES.USD;
    const raw = Math.round(usdAmount * c.rate);
    const numStr = raw.toLocaleString('en-US');
    return c.code === 'USD' ? `$${numStr}` : `${numStr} ${c.symbol}`;
  }

  function getCourseById(id) {
    return DATA.courses.find(c => c.id === id) || DATA.courses[0];
  }

  function getCourseBaseUsd(id) {
    return (COURSE_DETAILS[id] && COURSE_DETAILS[id].baseUsd) || 240;
  }

  function getCalculation() {
    const course = getCourseById(state.calcCourseId);
    const unitBaseUsd = getCourseBaseUsd(course.id);
    const modeFactor = state.calcMode === 'online' ? 0.9 : 1;
    const rawSubtotal = unitBaseUsd * modeFactor * state.seats;

    let groupRate = 0;
    if (state.seats === 2) groupRate = 0.1;
    else if (state.seats >= 3) groupRate = 0.15;

    const earlyRate = state.earlyBird ? 0.15 : 0;
    const fullPlanRate = state.plan === 'full' ? 0.05 : 0;

    // Sequential multiplicative fairness capped reasonably
    let discounted = rawSubtotal;
    discounted = discounted * (1 - earlyRate);
    discounted = discounted * (1 - groupRate);
    discounted = discounted * (1 - fullPlanRate);

    const netUsd = Math.round(discounted);
    const baseTotalUsd = Math.round(rawSubtotal);
    const savedUsd = Math.max(0, baseTotalUsd - netUsd);

    let installments = [];
    let planLabel = '';
    if (state.plan === 'full') {
      planLabel = 'دفع كامل مقدماً (خصم إضافي 5%)';
      installments = [
        { label: 'دفعة واحدة شاملة عند التسجيل', amountUsd: netUsd },
      ];
    } else if (state.plan === 'three') {
      planLabel = '3 دفعات شهرية (40% + 30% + 30%)';
      const p1 = Math.round(netUsd * 0.4);
      const p2 = Math.round(netUsd * 0.3);
      const p3 = Math.max(0, netUsd - p1 - p2);
      installments = [
        { label: 'الدفعة الأولى (عند تثبيت المقعد — 40%)', amountUsd: p1 },
        { label: 'الدفعة الثانية (بداية الشهر الثاني — 30%)', amountUsd: p2 },
        { label: 'الدفعة الثالثة (قبل التخرج — 30%)', amountUsd: p3 },
      ];
    } else {
      planLabel = 'دفعتان ميسرتان (50% + 50%)';
      const half = Math.round(netUsd * 0.5);
      const rest = Math.max(0, netUsd - half);
      installments = [
        { label: 'الدفعة الأولى (عند التسجيل — 50%)', amountUsd: half },
        { label: 'الدفعة الثانية (منتصف الدبلوم — 50%)', amountUsd: rest },
      ];
    }

    return {
      course,
      baseTotalUsd,
      savedUsd,
      netUsd,
      earlyRate,
      groupRate,
      fullPlanRate,
      planLabel,
      installments,
    };
  }

  function renderStats() {
    const el = document.getElementById('pro-stats');
    if (!el) return;
    const iconKeys = ['users', 'award', 'trending', 'layers'];
    el.innerHTML = DATA.stats.map((s, idx) => `
      <div class="stat-card">
        <div class="stat-icon">${SVG_ICONS[iconKeys[idx % iconKeys.length]]}</div>
        <div>
          <strong class="font-num">${s.value}</strong>
          <span>${s.label}</span>
        </div>
      </div>
    `).join('');
  }

  function renderBenefits() {
    const el = document.getElementById('pro-benefits-grid');
    if (!el) return;
    el.innerHTML = DATA.benefits.map(b => `
      <article class="ben-card">
        <div class="ben-icon">${SVG_ICONS[b.icon] || SVG_ICONS.award}</div>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
      </article>
    `).join('');
  }

  function renderCourses() {
    const grid = document.getElementById('pro-courses-grid');
    const countEl = document.getElementById('pro-results-count');
    if (!grid) return;

    const q = state.searchTerm.trim().toLowerCase();
    const list = DATA.courses.filter(c => {
      const okCat = state.activeCat === 'all' || c.cat === state.activeCat;
      const hay = `${c.title} ${c.desc} ${c.catLabel} ${c.modules.join(' ')}`.toLowerCase();
      const okQuery = !q || hay.includes(q);
      return okCat && okQuery;
    });

    if (countEl) {
      countEl.textContent = list.length === DATA.courses.length
        ? `عرض كافة الدبلومات (${list.length} مسارات معتمدة)`
        : `نتائج التصفية: ${list.length} من أصل ${DATA.courses.length} دبلومات`;
    }

    if (!list.length) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:2.5rem;background:#fff;border:1px dashed var(--border-strong);border-radius:16px;color:var(--slate);">
          لا توجد برامج مطابقة لعبارة البحث الحالية. جرّب اختيار كافة المسارات أو تعديل كلمة البحث.
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(c => {
      const baseUsd = getCourseBaseUsd(c.id);
      return `
        <article class="course-card">
          <div class="course-thumb">
            <img src="${resolveImgPath(c.image)}" alt="${c.title}" loading="lazy">
            <span class="course-mode-badge">${c.mode}</span>
            <span class="course-cat-badge">${c.catLabel}</span>
          </div>
          <div class="course-body">
            <div class="course-meta-top">
              <span>${c.duration}</span>
              <span>${c.startDate}</span>
            </div>
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <div class="course-foot-row">
              <div class="course-price-label">
                <small>الرسوم القياسية تبدأ من</small>
                <strong class="font-num">${formatMoney(baseUsd, state.currency)}</strong>
              </div>
              <span class="course-modules-pill">${c.modules.length} محاور تطبيقية</span>
            </div>
            <div class="course-actions">
              <button type="button" class="btn-card-syllabus" data-open-syllabus="${c.id}">استكشف المنهج</button>
              <button type="button" class="btn-card-calc" data-pick-calc="${c.id}">حساب الرسوم والحجز</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderCalculator() {
    const calc = getCalculation();
    const seatsVal = document.getElementById('calc-seats-val');
    const seatsBadge = document.getElementById('calc-seats-badge');
    const sumCourse = document.getElementById('calc-sum-course');
    const sumMeta = document.getElementById('calc-sum-meta');
    const baseVal = document.getElementById('calc-base-val');
    const discRow = document.getElementById('calc-discount-row');
    const discLabel = document.getElementById('calc-discount-label');
    const discVal = document.getElementById('calc-discount-val');
    const totalPrimary = document.getElementById('calc-total-primary');
    const mUsd = document.getElementById('calc-multi-usd');
    const mSar = document.getElementById('calc-multi-sar');
    const mYer = document.getElementById('calc-multi-yer');
    const instList = document.getElementById('calc-installment-list');
    const waBtn = document.getElementById('calc-wa-btn');

    if (seatsVal) seatsVal.textContent = String(state.seats);
    if (seatsBadge) {
      if (state.seats === 1) seatsBadge.textContent = 'مقعد فردي';
      else if (state.seats === 2) seatsBadge.textContent = 'ثنائي (خصم 10%)';
      else seatsBadge.textContent = `مجموعة (${state.seats} مقاعد · خصم 15%)`;
    }

    if (sumCourse && calc.course) sumCourse.textContent = calc.course.title;
    if (sumMeta && calc.course) {
      const modeName = state.calcMode === 'online' ? 'أونلاين مباشر' : 'حضوري في القاعة';
      sumMeta.textContent = `${modeName} · ${state.seats} مقعد · ${calc.course.duration}`;
    }

    if (baseVal) baseVal.textContent = formatMoney(calc.baseTotalUsd, state.currency);

    const activeDiscountTags = [];
    if (calc.earlyRate > 0) activeDiscountTags.push('مبكر 15%');
    if (calc.groupRate > 0) activeDiscountTags.push(`مجموعة ${Math.round(calc.groupRate * 100)}%`);
    if (calc.fullPlanRate > 0) activeDiscountTags.push('دفع كامل 5%');

    if (discRow) {
      discRow.style.display = calc.savedUsd > 0 ? 'flex' : 'none';
    }
    if (discLabel) {
      discLabel.textContent = activeDiscountTags.length
        ? `الخصومات (${activeDiscountTags.join(' + ')})`
        : 'إجمالي الخصومات';
    }
    if (discVal) discVal.textContent = `- ${formatMoney(calc.savedUsd, state.currency)}`;

    if (totalPrimary) totalPrimary.textContent = formatMoney(calc.netUsd, state.currency);
    if (mUsd) mUsd.textContent = formatMoney(calc.netUsd, 'USD');
    if (mSar) mSar.textContent = formatMoney(calc.netUsd, 'SAR');
    if (mYer) mYer.textContent = formatMoney(calc.netUsd, 'YER');

    if (instList) {
      instList.innerHTML = calc.installments.map(item => `
        <div class="inst-item">
          <span>${item.label}</span>
          <strong class="font-num">${formatMoney(item.amountUsd, state.currency)}</strong>
        </div>
      `).join('');
    }

    if (waBtn && calc.course) {
      const msg = [
        `أهلاً، أرغب باعتماد خطة الرسوم التالية في ${CFG.academyName} — الفئة الفاخرة Pro:`,
        `- الدبلوم: ${calc.course.title}`,
        `- نظام الدراسة: ${state.calcMode === 'online' ? 'أونلاين مباشر (Zoom)' : 'حضوري في القاعة'}`,
        `- عدد المقاعد: ${state.seats}`,
        `- خطة السداد: ${calc.planLabel}`,
        `- الإجمالي الصافي: ${formatMoney(calc.netUsd, 'USD')} | ${formatMoney(calc.netUsd, 'SAR')} | ${formatMoney(calc.netUsd, 'YER')}`,
      ].join('\n');
      waBtn.href = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }

    renderTicketSummary();
  }

  function getScheduleLabel() {
    const batch = SCHEDULE_BATCHES[state.schedBatch] || SCHEDULE_BATCHES['next-5'];
    const slot = batch.slots.find(s => s.id === state.schedSlotId) || batch.slots[0];
    return `${batch.label} · ${state.schedDays} · ${slot.period} (${slot.time})`;
  }

  function renderSchedule() {
    const grid = document.getElementById('sched-slots-grid');
    const pickedEl = document.getElementById('sched-picked-label');
    const batch = SCHEDULE_BATCHES[state.schedBatch] || SCHEDULE_BATCHES['next-5'];

    if (grid) {
      grid.innerHTML = batch.slots.map(slot => {
        const isActive = slot.id === state.schedSlotId;
        return `
          <button type="button" class="slot-card${isActive ? ' active' : ''}" data-slot="${slot.id}">
            <div class="slot-top">
              <span class="slot-period">${slot.period}</span>
              <span class="slot-seats">متبقي ${slot.seatsLeft} مقاعد</span>
            </div>
            <strong class="slot-time font-num">${slot.time}</strong>
            <p class="slot-desc">${slot.desc}</p>
          </button>
        `;
      }).join('');
    }

    if (pickedEl) {
      pickedEl.textContent = `${getScheduleLabel()} · ${state.schedMode}`;
    }

    renderTicketSummary();
  }

  function renderTicketSummary() {
    const calc = getCalculation();
    const resCourseSel = document.getElementById('res-course');
    const resModeSel = document.getElementById('res-mode');
    const chosenTitle = (resCourseSel && resCourseSel.value) || (calc.course && calc.course.title) || '—';
    const chosenMode = (resModeSel && resModeSel.value) || state.schedMode;

    const tCourse = document.getElementById('ticket-course');
    const tSched = document.getElementById('ticket-schedule');
    const tMode = document.getElementById('ticket-mode');
    const tSeats = document.getElementById('ticket-seats');
    const tPlan = document.getElementById('ticket-plan');
    const tTotal = document.getElementById('ticket-total');
    const tMulti = document.getElementById('ticket-multi');

    if (tCourse) tCourse.textContent = chosenTitle;
    if (tSched) tSched.textContent = getScheduleLabel();
    if (tMode) tMode.textContent = chosenMode;
    if (tSeats) tSeats.textContent = `${state.seats} ${state.seats === 1 ? 'مقعد' : 'مقاعد'}`;
    if (tPlan) tPlan.textContent = calc.planLabel;
    if (tTotal) tTotal.textContent = formatMoney(calc.netUsd, state.currency);
    if (tMulti) {
      tMulti.textContent = `${formatMoney(calc.netUsd, 'USD')}  ·  ${formatMoney(calc.netUsd, 'SAR')}  ·  ${formatMoney(calc.netUsd, 'YER')}`;
    }
  }

  function syncCurrencyButtons() {
    document.querySelectorAll('#pro-currency-switch .curr-btn, #calc-curr-pills .mini-curr').forEach(btn => {
      const active = btn.dataset.curr === state.currency;
      btn.classList.toggle('is-active', active);
      btn.classList.toggle('active', active);
    });
  }

  function setCurrency(curr) {
    if (!CURRENCIES[curr]) return;
    state.currency = curr;
    syncCurrencyButtons();
    renderCourses();
    renderCalculator();
    if (state.modalCourseId) {
      const feeEl = document.getElementById('syllabus-fee');
      if (feeEl) feeEl.textContent = formatMoney(getCourseBaseUsd(state.modalCourseId), state.currency);
    }
  }

  function openSyllabusModal(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;
    state.modalCourseId = course.id;

    const detail = COURSE_DETAILS[course.id] || { baseUsd: 240, outcome: '', moduleExtras: [] };
    const modal = document.getElementById('syllabus-modal');
    const backdrop = document.getElementById('syllabus-backdrop');

    document.getElementById('syllabus-cat').textContent = course.catLabel;
    document.getElementById('syllabus-title').textContent = course.title;
    document.getElementById('syllabus-meta').textContent = `${course.duration} · ${course.mode} · ${course.startDate}`;
    document.getElementById('syllabus-desc').textContent = course.desc;
    document.getElementById('syllabus-outcome').textContent = detail.outcome;
    document.getElementById('syllabus-fee').textContent = formatMoney(detail.baseUsd, state.currency);

    const imgEl = document.getElementById('syllabus-img');
    if (imgEl) {
      imgEl.src = resolveImgPath(course.image);
      imgEl.alt = course.title;
    }

    const modulesEl = document.getElementById('syllabus-modules');
    if (modulesEl) {
      modulesEl.innerHTML = course.modules.map((modTitle, idx) => {
        const extra = detail.moduleExtras[idx] || { week: `المحور 0${idx + 1}`, lab: 'تطبيق عملي موجه مع المدرب.', tools: 'Practical Lab' };
        const isOpen = idx === 0;
        return `
          <div class="mod-accordion">
            <button type="button" class="mod-acc-trigger" aria-expanded="${isOpen ? 'true' : 'false'}" data-mod-idx="${idx}">
              <span class="mod-acc-left">
                <span class="mod-num-badge">0${idx + 1}</span>
                <strong>${modTitle}</strong>
              </span>
              <span class="mod-week">${extra.week}</span>
            </button>
            <div class="mod-acc-panel" ${isOpen ? '' : 'hidden'}>
              <p><strong>التطبيق العملي:</strong> ${extra.lab}</p>
              <p style="margin-top:0.35rem;color:var(--violet);font-weight:700;">الأدوات والمهارات: <span class="font-num">${extra.tools}</span></p>
            </div>
          </div>
        `;
      }).join('');
    }

    backdrop?.classList.add('open');
    if (modal) {
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add('open'));
    }
    document.body.style.overflow = 'hidden';
  }

  function closeSyllabusModal() {
    const modal = document.getElementById('syllabus-modal');
    const backdrop = document.getElementById('syllabus-backdrop');
    backdrop?.classList.remove('open');
    if (modal) {
      modal.classList.remove('open');
      modal.hidden = true;
    }
    document.body.style.overflow = '';
  }

  function selectCourseEverywhere(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;
    state.calcCourseId = course.id;
    const calcSel = document.getElementById('calc-course');
    const resSel = document.getElementById('res-course');
    if (calcSel) calcSel.value = course.id;
    if (resSel) resSel.value = course.title;
    renderCalculator();
  }

  function buildReservationText() {
    const calc = getCalculation();
    const name = document.getElementById('res-name')?.value.trim() || 'متدرب/ة جديد/ة';
    const phone = document.getElementById('res-phone')?.value.trim() || 'غير محدد';
    const email = document.getElementById('res-email')?.value.trim() || '—';
    const level = document.getElementById('res-level')?.value || 'مبتدئ من الصفر';
    const course = document.getElementById('res-course')?.value || (calc.course && calc.course.title) || '';
    const mode = document.getElementById('res-mode')?.value || state.schedMode;
    const notes = document.getElementById('res-notes')?.value.trim();

    const lines = [
      `*طلب حجز مقعد — ${CFG.academyName} (الفئة الفاخرة Pro)*`,
      `الاسم: ${name}`,
      `رقم الواتساب: ${phone}`,
      `البريد الإلكتروني: ${email}`,
      `المستوى الحالي: ${level}`,
      `الدبلوم المطلوب: ${course}`,
      `نظام الحضور: ${mode}`,
      `الموعد المختار: ${getScheduleLabel()}`,
      `عدد المقاعد: ${state.seats}`,
      `خطة السداد: ${calc.planLabel}`,
      `الرسوم التقديرية: ${formatMoney(calc.netUsd, 'USD')} | ${formatMoney(calc.netUsd, 'SAR')} | ${formatMoney(calc.netUsd, 'YER')}`,
    ];
    if (notes) lines.push(`ملاحظات: ${notes}`);
    return lines.join('\n');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderBenefits();
    renderCourses();

    const calcCourseSel = document.getElementById('calc-course');
    const resCourseSel = document.getElementById('res-course');
    if (calcCourseSel) {
      calcCourseSel.innerHTML = DATA.courses.map(c => `<option value="${c.id}">${c.title}</option>`).join('');
      calcCourseSel.value = state.calcCourseId;
    }
    if (resCourseSel) {
      resCourseSel.innerHTML = DATA.courses.map(c => `<option value="${c.title}">${c.title}</option>`).join('');
    }

    renderCalculator();
    renderSchedule();

    // Mobile Drawer
    const menuBtn = document.getElementById('pro-menu-btn');
    const drawer = document.getElementById('pro-mobile-drawer');
    menuBtn?.addEventListener('click', () => {
      const isOpen = !drawer.hidden;
      drawer.hidden = isOpen;
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    drawer?.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        drawer.hidden = true;
        menuBtn?.setAttribute('aria-expanded', 'false');
      }
    });

    // Currency switchers
    document.getElementById('pro-currency-switch')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-curr]');
      if (btn) setCurrency(btn.dataset.curr);
    });
    document.getElementById('calc-curr-pills')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-curr]');
      if (btn) setCurrency(btn.dataset.curr);
    });

    // Catalog filters
    document.getElementById('pro-cats')?.addEventListener('click', e => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      document.querySelectorAll('#pro-cats .cat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCat = btn.dataset.cat;
      renderCourses();
    });

    document.getElementById('pro-search')?.addEventListener('input', e => {
      state.searchTerm = e.target.value;
      renderCourses();
    });

    document.getElementById('pro-courses-grid')?.addEventListener('click', e => {
      const sylBtn = e.target.closest('[data-open-syllabus]');
      if (sylBtn) {
        openSyllabusModal(sylBtn.dataset.openSyllabus);
        return;
      }
      const calcBtn = e.target.closest('[data-pick-calc]');
      if (calcBtn) {
        selectCourseEverywhere(calcBtn.dataset.pickCalc);
        document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Modal handlers
    document.getElementById('syllabus-close-btn')?.addEventListener('click', closeSyllabusModal);
    document.getElementById('syllabus-backdrop')?.addEventListener('click', closeSyllabusModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSyllabusModal();
    });

    document.getElementById('syllabus-modules')?.addEventListener('click', e => {
      const trigger = e.target.closest('.mod-acc-trigger');
      if (!trigger) return;
      const panel = trigger.nextElementSibling;
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });

    document.getElementById('syllabus-to-calc')?.addEventListener('click', () => {
      if (state.modalCourseId) selectCourseEverywhere(state.modalCourseId);
      closeSyllabusModal();
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('syllabus-to-reserve')?.addEventListener('click', () => {
      if (state.modalCourseId) selectCourseEverywhere(state.modalCourseId);
      closeSyllabusModal();
      document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Calculator handlers
    calcCourseSel?.addEventListener('change', e => {
      selectCourseEverywhere(e.target.value);
    });

    document.getElementById('calc-mode-group')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-mode]');
      if (!btn) return;
      document.querySelectorAll('#calc-mode-group .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.calcMode = btn.dataset.mode;
      const resMode = document.getElementById('res-mode');
      if (resMode) {
        resMode.value = state.calcMode === 'online' ? 'أونلاين مباشر (Zoom)' : 'حضوري في القاعة';
      }
      renderCalculator();
    });

    document.getElementById('calc-seats-dec')?.addEventListener('click', () => {
      if (state.seats > 1) {
        state.seats -= 1;
        renderCalculator();
      }
    });

    document.getElementById('calc-seats-inc')?.addEventListener('click', () => {
      if (state.seats < 5) {
        state.seats += 1;
        renderCalculator();
      }
    });

    document.getElementById('calc-earlybird')?.addEventListener('change', e => {
      state.earlyBird = e.target.checked;
      renderCalculator();
    });

    document.getElementById('calc-plan-group')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-plan]');
      if (!btn) return;
      document.querySelectorAll('#calc-plan-group .plan-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.plan = btn.dataset.plan;
      renderCalculator();
    });

    document.getElementById('calc-apply-btn')?.addEventListener('click', () => {
      renderTicketSummary();
      document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Schedule Picker handlers
    document.getElementById('sched-batch-tabs')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-batch]');
      if (!btn) return;
      document.querySelectorAll('#sched-batch-tabs .batch-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.schedBatch = btn.dataset.batch;
      renderSchedule();
    });

    document.getElementById('sched-days-group')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-days]');
      if (!btn) return;
      document.querySelectorAll('#sched-days-group .days-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.schedDays = btn.dataset.days;
      renderSchedule();
    });

    document.getElementById('sched-mode-group')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-smode]');
      if (!btn) return;
      document.querySelectorAll('#sched-mode-group .s-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.schedMode = btn.dataset.smode;
      const resMode = document.getElementById('res-mode');
      if (resMode) {
        resMode.value = state.schedMode.includes('أونلاين') ? 'أونلاين مباشر (Zoom)' : 'حضوري في القاعة';
      }
      renderSchedule();
    });

    document.getElementById('sched-slots-grid')?.addEventListener('click', e => {
      const card = e.target.closest('[data-slot]');
      if (!card) return;
      state.schedSlotId = card.dataset.slot;
      renderSchedule();
    });

    document.getElementById('sched-apply-btn')?.addEventListener('click', () => {
      renderTicketSummary();
      document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Reservation Form & Sync
    resCourseSel?.addEventListener('change', e => {
      const matched = DATA.courses.find(c => c.title === e.target.value);
      if (matched) {
        state.calcCourseId = matched.id;
        if (calcCourseSel) calcCourseSel.value = matched.id;
        renderCalculator();
      } else {
        renderTicketSummary();
      }
    });

    document.getElementById('res-mode')?.addEventListener('change', () => {
      renderTicketSummary();
    });

    document.getElementById('pro-reserve-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const msg = buildReservationText();
      window.open(`https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    });

    document.getElementById('res-copy-btn')?.addEventListener('click', async () => {
      const text = buildReservationText().replace(/\*/g, '');
      const labelEl = document.getElementById('res-copy-label');
      try {
        await navigator.clipboard.writeText(text);
        if (labelEl) {
          labelEl.textContent = 'تم نسخ ملخص الحجز بنجاح';
          setTimeout(() => { labelEl.textContent = 'نسخ ملخص الحجز'; }, 2400);
        }
      } catch {
        if (labelEl) labelEl.textContent = 'حدّد النص من النموذج للنسخ';
      }
    });
  });
})();
