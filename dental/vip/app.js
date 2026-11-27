/* =========================================================
   app.js — عيادة ابتسامة (الفئة الملكية VIP)
   Luxury Smile Atelier & Diagnostics — Makeover & 0% Installment
   Planner, Clinical Gallery, Dental Tourism Concierge & Plan Card
   ========================================================= */
'use strict';

(function initDentalVIP() {
  const CFG = typeof DENTAL_CONFIG !== 'undefined' ? DENTAL_CONFIG : {
    whatsappNumber: '967782259937',
    clinicName: 'عيادة ابتسامة',
    tagline: 'عيادة أسنان متخصصة — صنعاء',
    phone: '0782259937',
  };

  const DATA = typeof DENTAL_DATA !== 'undefined' ? DENTAL_DATA : {
    stats: [],
    services: [],
    doctors: [],
    steps: [],
    faqs: [],
  };

  const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', rate: 1 },
    SAR: { code: 'SAR', symbol: 'ر.س', rate: 3.75 },
    YER: { code: 'YER', symbol: 'ر.ي', rate: 535 },
  };

  const GALLERY_CARDS = [
    {
      code: 'SUITE · 01',
      img: '../assets/images/chair2.jpg',
      focus: 'center',
      title: 'الجناح العلاجي الخاص VIP',
      desc: 'غرفة علاج مستقلة مع إضاءة هادئة وخصوصية كاملة للمراجعين وكبار الشخصيات.',
    },
    {
      code: 'LAB · 02',
      img: '../assets/images/chair.jpg',
      focus: 'center',
      title: 'استوديو القشور المجهرية E.max',
      desc: 'تصنيع وتثبيت القشور الخزفية بأدق سماكة تحفظ بنية السن الطبيعي.',
    },
    {
      code: 'CBCT · 03',
      img: '../assets/images/team.jpg',
      focus: 'top',
      title: 'وحدة التشخيص ثلاثي الأبعاد',
      desc: 'مسح رقمي شامل للفكين والجيوب الأنفية مجاناً قبل اعتماد خطة الزراعة أو التقويم.',
    },
    {
      code: 'BOARD · 04',
      img: '../assets/images/smile.jpg',
      focus: 'center',
      title: 'المجلس الطبي الاستشاري',
      desc: 'تنسيق مشترك بين أطباء التجميل والتقويم والزراعة لتحقيق تناسق الوجه والابتسامة.',
    },
    {
      code: 'LASER · 05',
      img: '../assets/images/hero.jpg',
      focus: 'center',
      title: 'تبييض الليزر والجل الألماني',
      desc: 'تفتيح درجات اللون في جلسة مريحة خالية من الحساسية مع حماية اللثة.',
    },
    {
      code: 'CONCIERGE · 06',
      img: '../assets/images/chair.jpg',
      focus: 'center',
      title: 'برنامج السياحة العلاجية',
      desc: 'تنسيق استقبال المطار والفندق الشريك للقادمين من المحافظات اليمنية ودول الخليج.',
    },
  ];

  const MAKEOVER_PROCEDURES = {
    'hollywood-veneers': {
      id: 'hollywood-veneers',
      title: 'ابتسامة هوليوود (قشور E.max)',
      sub: 'تصميم رقمي وقشور سويسرية فائقة الشفافية',
      unitLabel: 'للشريحة / السن',
      unitPriceUsd: 240,
      recommendedDoctor: 1, // د. سارة الأنسي
      contextForCount: count => {
        if (count <= 4) return `تجميل القواطع الأمامية بدقة عالية (${count} قشور E.max).`;
        if (count <= 10) return `تغطية الفك العلوي الكامل لابتسامة متناسقة (${count} قشور E.max).`;
        return `تحول شامل للفكين العلوي والسفلي (${count} قشرة E.max).`;
      },
      calcDays: count => (count <= 6 ? 4 : count <= 12 ? 6 : 8),
      timelineForDays: days => [
        { day: 'اليوم 1', text: 'فحص أولي + أشعة 3D CBCT مجانية + تصميم الابتسامة الرقمي.' },
        { day: `اليوم 2 – ${days - 1}`, text: 'تجربة نموذج الابتسامة المؤقت وتصنيع قشور E.max السويسرية في المختبر.' },
        { day: `اليوم ${days}`, text: 'التثبيت النهائي، مطابقة الإطباق، وتسليم شهادة الضمان.' },
      ],
    },
    'full-arch-implants': {
      id: 'full-arch-implants',
      title: 'زراعة الفك الكامل (Full Arch Implants)',
      sub: 'غرسات تيتانيوم ثلاثية الأبعاد بضمان مدى الحياة',
      unitLabel: 'للوحدة (غرسة + تاج)',
      unitPriceUsd: 620,
      recommendedDoctor: 2, // د. محمد القرشي
      contextForCount: count => {
        if (count <= 4) return `زراعة تعويضية دقيقة لـ ${count} وحدات بالتوجيه الثلاثي 3D.`;
        if (count <= 10) return `إعادة تأهيل قوس فكي متكامل بـ ${count} وحدات تيتانيوم.`;
        return `زراعة شاملة للفكين الكاملين (${count} وحدة تيتانيوم وتيجان زيركون).`;
      },
      calcDays: count => (count <= 4 ? 5 : count <= 10 ? 7 : 10),
      timelineForDays: days => [
        { day: 'اليوم 1', text: 'تخطيط جراحي ثلاثي الأبعاد عبر أشعة CBCT المجانية تحت تخدير مريح.' },
        { day: 'اليوم 2 – 3', text: 'وضع غرسات التيتانيوم المعتمدة بدون ألم مع تركيبات مؤقتة جمالية.' },
        { day: `اليوم ${days}`, text: 'فحص الاستقرار الأولي، خطة التعافي، وجدولة التاج النهائي.' },
      ],
    },
    'invisalign-aligners': {
      id: 'invisalign-aligners',
      title: 'تقويم انفيزاليين الشفاف (Invisalign)',
      sub: 'قوالب رقمية شفافة مخصصة للحركة التدريجية',
      unitLabel: 'لكل مرحلة قوالب رقمية',
      unitPriceUsd: 115,
      recommendedDoctor: 0, // د. أحمد الحميدي
      contextForCount: count => {
        if (count <= 6) return `تصحيح جمالي خفيف (${count} مراحل قوالب رقمية شفافة).`;
        if (count <= 12) return `تقويم متوسط التطابق والاصطفاف (${count} مرحلة رقمية).`;
        return `تقويم شامل متكامل للفكين (${count} مرحلة قوالب شفافة مخصصة).`;
      },
      calcDays: count => (count <= 8 ? 4 : 6),
      timelineForDays: days => [
        { day: 'اليوم 1', text: 'تقييم د. أحمد الحميدي مع تصوير CBCT مجاني ومسح رقمي للأسنان.' },
        { day: 'اليوم 2 – 3', text: 'اعتماد محاكاة حركة الأسنان ثلاثية الأبعاد وتجهيز سلسلة القوالب.' },
        { day: `اليوم ${days}`, text: 'استلام الدفعة الأولى من القوالب الشفافة وخطة المتابعة عن بُعد.' },
      ],
    },
    'laser-gum': {
      id: 'laser-gum',
      title: 'تجميل وتوريد اللثة بالليزر (Laser Gum Contouring)',
      sub: 'تحديد خط الابتسامة بالليزر بدون جراحة أو غرز',
      unitLabel: 'للسن / الوحدة اللثوية',
      unitPriceUsd: 45,
      recommendedDoctor: 1, // د. سارة الأنسي
      contextForCount: count => `تحديد وتناسق خط اللثة بالليزر لـ ${count} أسنان في جلسة واحدة لطيفة.`,
      calcDays: count => (count <= 10 ? 1 : 2),
      timelineForDays: days => [
        { day: 'اليوم 1', text: 'فحص خط الابتسامة مجاناً وتطبيق التحديد والتوريد بالليزر الدقيق.' },
        { day: days > 1 ? 'اليوم 2' : 'نفس اليوم', text: 'مراجعة نهائية بعد التهدئة وتقديم إرشادات العناية السريعة.' },
      ],
    },
  };

  const SVG = {
    sparkle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/></svg>',
    diamond: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="2"/><polyline points="2 8.5 12 12 22 8.5"/></svg>',
    tooth: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c-2.5 0-4.5 1.2-5.5 3-0.6 1.1-0.5 2.2-0.3 3.3 0.4 2.2 0.7 4.5 0.4 6.5-0.2 1.5 0.7 3 2.2 3.4 1 0.3 2 0 2.8-0.6 0.4-0.3 0.6-0.3 1 0 0.8 0.6 1.8 0.9 2.8 0.6 1.5-0.4 2.4-1.9 2.2-3.4-0.3-2 0-4.3 0.4-6.5 0.2-1.1 0.3-2.2-0.3-3.3C16.5 4.2 14.5 3 12 3z"/></svg>',
    align: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><circle cx="8" cy="6" r="1.5"/><circle cx="13" cy="12" r="1.5"/></svg>',
    shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
    star: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    doctor: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 14v4m-2-2h4"/></svg>',
    arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    chevron: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
  };

  const state = {
    currency: 'USD',
    procId: 'hollywood-veneers',
    units: 8,
    installmentEnabled: true,
    months: 6,
    patientName: '',
    patientPhone: '',
    origin: 'صنعاء (زيارة محلية)',
    vipSuite: true,
    airportTransfer: false,
    hotelPackage: false,
    doctorIndex: 1,
    visitDate: '',
    shift: 'الفترة الصباحية (9:00 AM - 1:00 PM)',
    serial: 'VIP-IBT-' + String(Math.floor(2600 + Math.random() * 7000)),
  };

  function formatMoney(usdAmount, currCode) {
    const c = CURRENCIES[currCode] || CURRENCIES.USD;
    const val = Math.round(usdAmount * c.rate);
    const numStr = val.toLocaleString('en-US');
    return c.code === 'USD' ? `$${numStr}` : `${numStr} ${c.symbol}`;
  }

  function getPlanSummaryData() {
    const proc = MAKEOVER_PROCEDURES[state.procId];
    const totalUsd = proc.unitPriceUsd * state.units;
    const downPaymentUsd = Math.round(totalUsd * 0.3);
    const financedUsd = totalUsd - downPaymentUsd;
    const monthlyUsd = Math.round(financedUsd / state.months);
    const days = proc.calcDays(state.units);

    return {
      proc,
      totalUsd,
      downPaymentUsd,
      monthlyUsd,
      days,
    };
  }

  function renderStats() {
    const el = document.getElementById('vip-stats-strip');
    if (!el) return;
    el.innerHTML = DATA.stats.map(s => `
      <div class="vip-kpi-cell">
        <dd class="font-tech">${s.value}</dd>
        <dt>${s.label}</dt>
      </div>
    `).join('');
  }

  function renderClinicalCards() {
    const el = document.getElementById('vip-clinical-cards');
    if (!el) return;
    el.innerHTML = GALLERY_CARDS.map(card => `
      <article class="clinical-card">
        <div class="clinical-card-media">
          <img src="${card.img}" alt="${card.title}" class="${card.focus === 'top' ? 'img-top' : ''}" loading="lazy">
          <span class="clinical-card-code font-tech">${card.code}</span>
        </div>
        <div class="clinical-card-body">
          <h3>${card.title}</h3>
          <p>${card.desc}</p>
        </div>
      </article>
    `).join('');
  }

  function renderServices() {
    const el = document.getElementById('vip-services-grid');
    if (!el) return;
    el.innerHTML = DATA.services.map(svc => {
      const waHref = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(`أهلاً، أرغب بالاستفسار عن خدمة: ${svc.title} في ${CFG.clinicName} (الفئة الملكية VIP)`)}`;
      return `
        <article class="vip-svc-card">
          <div>
            <div class="vip-svc-top">
              <div class="vip-svc-icon">${SVG[svc.icon] || SVG.tooth}</div>
              ${svc.tag ? `<span class="vip-svc-tag">${svc.tag}</span>` : ''}
            </div>
            <h4>${svc.title}</h4>
            <p>${svc.desc}</p>
          </div>
          <div class="vip-svc-foot">
            <span>فحص 3D CBCT مجاني</span>
            <a href="${waHref}" target="_blank" rel="noopener">
              <span>توجيه كونسيرج</span>
              ${SVG.arrow}
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderProcedureButtons() {
    const grid = document.getElementById('vip-proc-grid');
    if (!grid) return;
    grid.innerHTML = Object.values(MAKEOVER_PROCEDURES).map(p => `
      <button type="button" class="proc-btn ${p.id === state.procId ? 'is-active' : ''}" data-proc="${p.id}">
        <strong>${p.title}</strong>
        <small>${p.sub}</small>
        <span class="proc-rate font-tech">${formatMoney(p.unitPriceUsd, state.currency)} / ${p.unitLabel}</span>
      </button>
    `).join('');
  }

  function updatePlannerUI() {
    const { proc, totalUsd, downPaymentUsd, monthlyUsd, days } = getPlanSummaryData();

    const unitBadge = document.getElementById('vip-unit-badge');
    const sliderCtx = document.getElementById('vip-slider-context');
    const monthsWrap = document.getElementById('vip-months-wrap');
    const procTitle = document.getElementById('vip-plan-proc-title');
    const metricLabel = document.getElementById('vip-hero-metric-label');
    const metricValue = document.getElementById('vip-hero-metric-value');
    const timelineDays = document.getElementById('vip-timeline-days');
    const vtBadge = document.getElementById('vip-vt-badge');
    const totalUsdEl = document.getElementById('vip-total-usd');
    const totalSarEl = document.getElementById('vip-total-sar');
    const totalYerEl = document.getElementById('vip-total-yer');
    const downEl = document.getElementById('vip-downpayment-val');
    const monthsTxtEl = document.getElementById('vip-months-txt');
    const monthlyValEl = document.getElementById('vip-monthly-val');
    const instDetails = document.getElementById('vip-installment-details');
    const vtList = document.getElementById('vip-timeline-steps');

    if (unitBadge) unitBadge.textContent = String(state.units);
    if (sliderCtx) sliderCtx.textContent = proc.contextForCount(state.units);
    if (monthsWrap) monthsWrap.classList.toggle('is-disabled', !state.installmentEnabled);
    if (procTitle) procTitle.textContent = proc.title;

    if (metricLabel && metricValue) {
      if (state.installmentEnabled) {
        metricLabel.textContent = `القسط الشهري لمدة ${state.months} أشهر (0% فوائد)`;
        metricValue.textContent = formatMoney(monthlyUsd, state.currency);
      } else {
        metricLabel.textContent = 'إجمالي خطة العلاج (دفع مباشر)';
        metricValue.textContent = formatMoney(totalUsd, state.currency);
      }
    }

    if (timelineDays) timelineDays.textContent = days === 1 ? 'يوم واحد' : `${days} أيام`;
    if (vtBadge) vtBadge.textContent = `${days} DAYS PROTOCOL`;

    if (totalUsdEl) totalUsdEl.textContent = formatMoney(totalUsd, 'USD');
    if (totalSarEl) totalSarEl.textContent = formatMoney(totalUsd, 'SAR');
    if (totalYerEl) totalYerEl.textContent = formatMoney(totalUsd, 'YER');

    if (instDetails) {
      if (state.installmentEnabled) {
        instDetails.style.display = 'flex';
        if (downEl) downEl.textContent = formatMoney(downPaymentUsd, state.currency);
        if (monthsTxtEl) monthsTxtEl.textContent = String(state.months);
        if (monthlyValEl) monthlyValEl.textContent = `${formatMoney(monthlyUsd, state.currency)} / شهر`;
      } else {
        instDetails.style.display = 'none';
      }
    }

    if (vtList) {
      vtList.innerHTML = proc.timelineForDays(days).map(step => `
        <li>
          <span class="vt-day">${step.day}</span>
          <span>${step.text}</span>
        </li>
      `).join('');
    }
  }

  function renderDoctorsAndSteps() {
    const docGrid = document.getElementById('vip-doctors-grid');
    const docSelect = document.getElementById('vip-doctor-select');
    const stepsGrid = document.getElementById('vip-steps-grid');

    if (docGrid) {
      docGrid.innerHTML = DATA.doctors.map((d, idx) => `
        <article class="vip-doc-card">
          <div>
            <div class="vdoc-top">
              <div class="vdoc-avatar">${SVG.doctor}</div>
              <div>
                <h3>${d.name}</h3>
                <div class="vdoc-spec">${d.spec}</div>
              </div>
            </div>
            <div class="vdoc-specs">
              <div class="vdoc-row"><span>الخبرة</span><strong>${d.exp}</strong></div>
              <div class="vdoc-row"><span>الاعتماد</span><strong>${d.degree}</strong></div>
              <div class="vdoc-row"><span>استشارة 3D CBCT</span><strong class="text-gold">مشمولة مجاناً</strong></div>
            </div>
          </div>
          <button type="button" class="btn-gold-outline btn-full vip-doc-pick" data-doc-idx="${idx}">
            <span>تعيين ${d.name} في بطاقة الخطة</span>
          </button>
        </article>
      `).join('');
    }

    if (docSelect) {
      docSelect.innerHTML = DATA.doctors.map((d, idx) => `
        <option value="${idx}" ${idx === state.doctorIndex ? 'selected' : ''}>${d.name} — ${d.spec}</option>
      `).join('');
    }

    if (stepsGrid) {
      stepsGrid.innerHTML = DATA.steps.map(s => `
        <article class="vip-step-card">
          <span class="vip-step-num font-tech">${s.step}</span>
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </article>
      `).join('');
    }
  }

  function getHospitalitySummary() {
    const items = [];
    if (state.vipSuite) items.push('الجناح الخاص VIP Private Suite');
    if (state.airportTransfer) items.push('استقبال وتوصيل من المطار');
    if (state.hotelPackage) items.push('حجز فندق شريك');
    return items.length ? items.join(' + ') : 'استقبال العيادة الخاص';
  }

  function buildTreatmentCardText() {
    const { proc, totalUsd, downPaymentUsd, monthlyUsd, days } = getPlanSummaryData();
    const doc = DATA.doctors[state.doctorIndex] || DATA.doctors[0];
    const payMode = state.installmentEnabled
      ? `تقسيط 0% لمدة ${state.months} أشهر (دفعة أولى 30%: ${formatMoney(downPaymentUsd, state.currency)} + ${formatMoney(monthlyUsd, state.currency)}/شهر)`
      : 'دفع مباشر بالكامل';

    return [
      `بطاقة خطة العلاج الشخصية — ${CFG.clinicName} (الفئة الملكية VIP)`,
      `المرجع: ${state.serial}`,
      `المراجع: ${state.patientName || 'ضيف الأتيليه الخاص'}`,
      state.patientPhone ? `الهاتف: ${state.patientPhone}` : '',
      `المدينة / القدوم: ${state.origin}`,
      `الطبيب المشرف: ${doc.name} (${doc.spec})`,
      `الموعد المقترح: ${state.visitDate ? `${state.visitDate} — ` : ''}${state.shift}`,
      `الإجراء المعتمد: ${proc.title} (${state.units} وحدة)`,
      `المدة التقديرية للزيارة: ${days === 1 ? 'يوم واحد' : `${days} أيام`}`,
      `الكشف الأول + أشعة 3D CBCT: مجاني (0 رسوم)`,
      `التكلفة الإجمالية: ${formatMoney(totalUsd, 'USD')} | ${formatMoney(totalUsd, 'SAR')} | ${formatMoney(totalUsd, 'YER')}`,
      `نظام السداد: ${payMode}`,
      `الضيافة والسياحة العلاجية: ${getHospitalitySummary()}`,
    ].filter(Boolean).join('\n');
  }

  function updatePlanCard() {
    const { proc, totalUsd, downPaymentUsd, monthlyUsd, days } = getPlanSummaryData();
    const doc = DATA.doctors[state.doctorIndex] || DATA.doctors[0];

    const elSerial = document.getElementById('card-serial');
    const elPatient = document.getElementById('card-patient');
    const elOrigin = document.getElementById('card-origin');
    const elDoctor = document.getElementById('card-doctor');
    const elTiming = document.getElementById('card-timing');
    const elProc = document.getElementById('card-procedure');
    const elDays = document.getElementById('card-days');
    const elCost = document.getElementById('card-cost');
    const elInst = document.getElementById('card-installment');
    const elHosp = document.getElementById('card-hospitality');
    const waBtn = document.getElementById('vip-wa-send-btn');

    if (elSerial) elSerial.textContent = `REF: ${state.serial}`;
    if (elPatient) elPatient.textContent = state.patientName || 'ضيف الأتيليه الخاص';
    if (elOrigin) elOrigin.textContent = state.origin;
    if (elDoctor) elDoctor.textContent = `${doc.name} (${doc.spec})`;
    if (elTiming) elTiming.textContent = state.visitDate ? `${state.visitDate} · ${state.shift}` : state.shift;
    if (elProc) elProc.textContent = `${proc.title} (${state.units} وحدة)`;
    if (elDays) elDays.textContent = days === 1 ? 'يوم واحد' : `${days} أيام عمل`;
    if (elCost) {
      elCost.textContent = `${formatMoney(totalUsd, state.currency)} (${formatMoney(totalUsd, 'USD')} / ${formatMoney(totalUsd, 'SAR')})`;
    }
    if (elInst) {
      elInst.textContent = state.installmentEnabled
        ? `تقسيط 0% (${state.months} أشهر) · دفعة أولى ${formatMoney(downPaymentUsd, state.currency)} + ${formatMoney(monthlyUsd, state.currency)}/شهر`
        : 'دفع كامل بدون تقسيط';
    }
    if (elHosp) elHosp.textContent = getHospitalitySummary();

    if (waBtn) {
      waBtn.href = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(buildTreatmentCardText())}`;
    }
  }

  function syncCurrency() {
    document.querySelectorAll('.v-curr-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.curr === state.currency);
    });
    renderProcedureButtons();
    updatePlannerUI();
    updatePlanCard();
  }

  function renderFAQ() {
    const list = document.getElementById('vip-faq-list');
    if (!list) return;
    list.innerHTML = DATA.faqs.map((f, idx) => `
      <div class="v-faq-item ${idx === 0 ? 'is-open' : ''}">
        <button type="button" class="v-faq-q" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${f.q}</span>
          ${SVG.chevron}
        </button>
        <div class="v-faq-a">${f.a}</div>
      </div>
    `).join('');

    list.addEventListener('click', e => {
      const btn = e.target.closest('.v-faq-q');
      if (!btn) return;
      const item = btn.closest('.v-faq-item');
      const wasOpen = item.classList.contains('is-open');
      list.querySelectorAll('.v-faq-item.is-open').forEach(el => {
        el.classList.remove('is-open');
        el.querySelector('.v-faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  function bindEvents() {
    // Mobile Menu
    const menuBtn = document.getElementById('vip-menu-btn');
    const drawer = document.getElementById('vip-mobile-drawer');
    if (menuBtn && drawer) {
      menuBtn.addEventListener('click', () => {
        const isHidden = drawer.hasAttribute('hidden');
        if (isHidden) {
          drawer.removeAttribute('hidden');
          menuBtn.setAttribute('aria-expanded', 'true');
        } else {
          drawer.setAttribute('hidden', '');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
      drawer.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
          drawer.setAttribute('hidden', '');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Hero Gallery Switcher
    const thumbs = document.getElementById('stage-thumbs');
    const mainImg = document.getElementById('stage-main-img');
    const codeEl = document.getElementById('stage-code');
    const titleEl = document.getElementById('stage-title');
    const subEl = document.getElementById('stage-subtitle');

    if (thumbs && mainImg) {
      thumbs.addEventListener('click', e => {
        const btn = e.target.closest('.stage-thumb');
        if (!btn) return;
        thumbs.querySelectorAll('.stage-thumb').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        mainImg.src = btn.dataset.img;
        mainImg.classList.toggle('img-top', btn.dataset.focus === 'top');
        if (codeEl) codeEl.textContent = btn.dataset.code;
        if (titleEl) titleEl.textContent = btn.dataset.title;
        if (subEl) subEl.textContent = btn.dataset.sub;
      });
    }

    // Currency Switchers
    document.querySelectorAll('#vip-header-curr, #vip-planner-curr').forEach(group => {
      group.addEventListener('click', e => {
        const btn = e.target.closest('.v-curr-btn');
        if (!btn) return;
        state.currency = btn.dataset.curr;
        syncCurrency();
      });
    });

    // Makeover Procedure Cards
    const procGrid = document.getElementById('vip-proc-grid');
    if (procGrid) {
      procGrid.addEventListener('click', e => {
        const btn = e.target.closest('.proc-btn');
        if (!btn) return;
        state.procId = btn.dataset.proc;
        const proc = MAKEOVER_PROCEDURES[state.procId];
        if (proc && typeof proc.recommendedDoctor === 'number') {
          state.doctorIndex = proc.recommendedDoctor;
          const docSelect = document.getElementById('vip-doctor-select');
          if (docSelect) docSelect.value = String(state.doctorIndex);
        }
        renderProcedureButtons();
        updatePlannerUI();
        updatePlanCard();
      });
    }

    // Unit Slider (2-20)
    const slider = document.getElementById('vip-unit-slider');
    if (slider) {
      slider.addEventListener('input', () => {
        state.units = Number(slider.value);
        updatePlannerUI();
        updatePlanCard();
      });
    }

    // 0% Installment Toggle
    const instToggle = document.getElementById('vip-installment-toggle');
    if (instToggle) {
      instToggle.addEventListener('change', () => {
        state.installmentEnabled = instToggle.checked;
        updatePlannerUI();
        updatePlanCard();
      });
    }

    // Installment Months (3-6)
    const monthsPills = document.getElementById('vip-months-pills');
    if (monthsPills) {
      monthsPills.addEventListener('click', e => {
        const btn = e.target.closest('.month-btn');
        if (!btn) return;
        state.months = Number(btn.dataset.months);
        monthsPills.querySelectorAll('.month-btn').forEach(b => b.classList.toggle('is-active', b === btn));
        updatePlannerUI();
        updatePlanCard();
      });
    }

    // Sync to Concierge CTA
    const syncBtn = document.getElementById('vip-sync-concierge-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        updatePlanCard();
        document.getElementById('concierge').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Doctor Pick Buttons
    const docGrid = document.getElementById('vip-doctors-grid');
    if (docGrid) {
      docGrid.addEventListener('click', e => {
        const btn = e.target.closest('.vip-doc-pick');
        if (!btn) return;
        state.doctorIndex = Number(btn.dataset.docIdx);
        const docSelect = document.getElementById('vip-doctor-select');
        if (docSelect) docSelect.value = String(state.doctorIndex);
        updatePlanCard();
        document.getElementById('concierge').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Concierge Form Controls
    const nameEl = document.getElementById('vip-patient-name');
    const phoneEl = document.getElementById('vip-patient-phone');
    const originEl = document.getElementById('vip-origin-select');
    const suiteEl = document.getElementById('pkg-vip-suite');
    const airportEl = document.getElementById('pkg-airport');
    const hotelEl = document.getElementById('pkg-hotel');
    const docSelectEl = document.getElementById('vip-doctor-select');
    const dateEl = document.getElementById('vip-visit-date');
    const shiftRow = document.getElementById('vip-shift-row');

    if (nameEl) nameEl.addEventListener('input', () => { state.patientName = nameEl.value.trim(); updatePlanCard(); });
    if (phoneEl) phoneEl.addEventListener('input', () => { state.patientPhone = phoneEl.value.trim(); updatePlanCard(); });
    if (originEl) originEl.addEventListener('change', () => { state.origin = originEl.value; updatePlanCard(); });
    if (suiteEl) suiteEl.addEventListener('change', () => { state.vipSuite = suiteEl.checked; updatePlanCard(); });
    if (airportEl) airportEl.addEventListener('change', () => { state.airportTransfer = airportEl.checked; updatePlanCard(); });
    if (hotelEl) hotelEl.addEventListener('change', () => { state.hotelPackage = hotelEl.checked; updatePlanCard(); });
    if (docSelectEl) docSelectEl.addEventListener('change', () => { state.doctorIndex = Number(docSelectEl.value); updatePlanCard(); });
    if (dateEl) dateEl.addEventListener('change', () => { state.visitDate = dateEl.value; updatePlanCard(); });

    if (shiftRow) {
      shiftRow.addEventListener('click', e => {
        const btn = e.target.closest('.v-shift-btn');
        if (!btn) return;
        state.shift = btn.dataset.shift;
        shiftRow.querySelectorAll('.v-shift-btn').forEach(b => b.classList.toggle('is-active', b === btn));
        updatePlanCard();
      });
    }

    // Print & Copy Personalized Treatment Plan Card
    const printBtn = document.getElementById('vip-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const copyBtn = document.getElementById('vip-copy-btn');
    const copyLabel = document.getElementById('vip-copy-label');
    if (copyBtn && copyLabel) {
      copyBtn.addEventListener('click', () => {
        const text = buildTreatmentCardText();
        const done = () => {
          copyLabel.textContent = 'تم نسخ البطاقة بنجاح';
          setTimeout(() => {
            copyLabel.textContent = 'نسخ بطاقة الخطة';
          }, 2200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            done();
          });
        } else {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          done();
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderClinicalCards();
    renderServices();
    renderProcedureButtons();
    renderDoctorsAndSteps();
    updatePlannerUI();
    updatePlanCard();
    renderFAQ();
    bindEvents();
  });
})();
