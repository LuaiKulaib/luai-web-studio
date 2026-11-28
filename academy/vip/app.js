/* =========================================================
   app.js — أكاديمية المستقبل للتدريب والتأهيل (الفئة الملكية VIP)
   Executive Academy & Corporate L&D — Dual Mode Portal,
   Corporate Team Builder (1-50 seats), Certificate Verification Demo,
   and Official Proposal / Enrollment Letter Modal -> WhatsApp VIP
   ========================================================= */
'use strict';

(function initAcademyVip() {
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

  const COURSE_RATES = {
    'fullstack-web': { indUsd: 320, corpSeatUsd: 290 },
    'ui-ux-design': { indUsd: 260, corpSeatUsd: 240 },
    'digital-marketing': { indUsd: 210, corpSeatUsd: 195 },
    'english-business': { indUsd: 220, corpSeatUsd: 205 },
  };

  const CERT_REGISTRY = {
    'CERT-2026-104': {
      code: 'CERT-2026-104',
      holder: 'أحمد عبدالرحمن الأهدل',
      courseId: 'fullstack-web',
      courseTitle: 'دبلوم تطوير تطبيقات الويب الحديثة',
      issueDate: '18 مارس 2026',
      hours: '60 ساعة تطبيقية',
      grade: 'امتياز مع مرتبة الشرف (96%)',
      mode: 'حضوري + أونلاين',
      hash: 'FA-REG-2026-8841A',
    },
    'CERT-2026-218': {
      code: 'CERT-2026-218',
      holder: 'سارة محمد باوزير',
      courseId: 'ui-ux-design',
      courseTitle: 'دبلوم تصميم واجهات المستخدم UI/UX',
      issueDate: '04 أبريل 2026',
      hours: '48 ساعة تطبيقية',
      grade: 'امتياز — أفضل مشروع تخرج (95%)',
      mode: 'حضوري + أونلاين',
      hash: 'FA-REG-2026-9217B',
    },
    'CERT-2025-882': {
      code: 'CERT-2025-882',
      holder: 'عمر خالد المقطري',
      courseId: 'digital-marketing',
      courseTitle: 'احتراف التسويق الرقمي وإدارة الحملات',
      issueDate: '22 ديسمبر 2025',
      hours: '36 ساعة تطبيقية',
      grade: 'جيد جداً مرتفع (91%)',
      mode: 'أونلاين مباشر',
      hash: 'FA-REG-2025-7740C',
    },
  };

  const SVG_ICONS = {
    laptop: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
    cert: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"/></svg>`,
    video: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
    briefcase: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,
    shieldOk: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    shieldWarn: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };

  const state = {
    currency: 'USD',
    portalMode: 'corporate', // 'individual' | 'corporate'
    activeCat: 'all',
    // Individual Executive State
    indCourseId: (DATA.courses[0] && DATA.courses[0].id) || 'fullstack-web',
    indCoaching: 'standard', // 'standard' | 'mentorship'
    indMode: 'حضوري في القاعة التنفيذية',
    indShift: 'الفترة الصباحية (9:00 AM - 12:00 PM)',
    indPlan: 'two',
    // Corporate L&D State
    corpSeats: 12,
    corpTracks: ['fullstack-web', 'digital-marketing'],
    corpDelivery: 'onsite', // 'onsite' | 'live-virtual'
    corpExtras: [
      'اختبار قياس المهارات قبل وبعد التدريب',
      'تقارير الحضور والإنجاز الأسبوعية لإدارة HR',
      'تخصيص مشاريع التخرج حسب تحديات الشركة الفعلية',
    ],
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

  function getIndividualCalc() {
    const course = getCourseById(state.indCourseId);
    const baseCourseUsd = (COURSE_RATES[course.id] && COURSE_RATES[course.id].indUsd) || 240;
    const coachingUsd = state.indCoaching === 'mentorship' ? 90 : 0;
    const modeFactor = state.indMode.includes('أونلاين') ? 0.9 : 1;
    const planDiscount = state.indPlan === 'full' ? 0.05 : 0;

    const baseUsd = Math.round((baseCourseUsd * modeFactor) + coachingUsd);
    const netUsd = Math.round(baseUsd * (1 - planDiscount));

    let planLabel = 'دفعتان ميسرتان (50% + 50%)';
    if (state.indPlan === 'three') planLabel = '3 دفعات شهرية مرنة';
    if (state.indPlan === 'full') planLabel = 'دفع كامل مقدماً (خصم 5%)';

    return {
      course,
      baseUsd,
      netUsd,
      planLabel,
      coachingLabel: state.indCoaching === 'mentorship'
        ? 'الباقة الملكية + 4 جلسات إرشاد فردي 1-on-1'
        : 'المسار التنفيذي الأساسي + شهادة موثقة',
    };
  }

  function getCorporateDiscountRate(seats) {
    if (seats >= 35) return { rate: 0.30, label: 'خصم الشراكة المؤسسية 30%' };
    if (seats >= 20) return { rate: 0.24, label: 'خصم المنشآت الكبرى 24%' };
    if (seats >= 10) return { rate: 0.18, label: 'خصم الشركات 18%' };
    if (seats >= 5) return { rate: 0.10, label: 'خصم المجموعات 10%' };
    return { rate: 0, label: 'السعر القياسي (1–4 موظفين)' };
  }

  function getCorporateCalc() {
    const selectedCourses = DATA.courses.filter(c => state.corpTracks.includes(c.id));
    const tracks = selectedCourses.length ? selectedCourses : [DATA.courses[0]];

    const seatTrackSumUsd = tracks.reduce((sum, c) => {
      const rateObj = COURSE_RATES[c.id] || { corpSeatUsd: 220 };
      return sum + rateObj.corpSeatUsd;
    }, 0);

    const deliveryFactor = state.corpDelivery === 'live-virtual' ? 0.88 : 1;
    const grossUsd = Math.round(seatTrackSumUsd * state.corpSeats * deliveryFactor);

    const tier = getCorporateDiscountRate(state.corpSeats);
    const bundleRate = tracks.length >= 2 ? 0.05 : 0;

    let net = grossUsd * (1 - tier.rate);
    net = net * (1 - bundleRate);
    const netUsd = Math.round(net);
    const savedUsd = Math.max(0, grossUsd - netUsd);
    const perSeatUsd = Math.round(netUsd / Math.max(1, state.corpSeats));

    return {
      tracks,
      seats: state.corpSeats,
      deliveryLabel: state.corpDelivery === 'live-virtual'
        ? 'أونلاين مباشر مخصص للفريق (Live Virtual)'
        : 'حضوري في مقر الشركة / القاعات التنفيذية',
      tier,
      bundleRate,
      grossUsd,
      savedUsd,
      netUsd,
      perSeatUsd,
    };
  }

  function renderStats() {
    const el = document.getElementById('vip-stats-strip');
    if (!el) return;
    el.innerHTML = DATA.stats.map(s => `
      <div class="vip-kpi-item">
        <dt class="font-num">${s.value}</dt>
        <dd>${s.label}</dd>
      </div>
    `).join('');
  }

  function renderBenefits() {
    const el = document.getElementById('vip-benefits-grid');
    if (!el) return;
    el.innerHTML = DATA.benefits.map(b => `
      <article class="vben-card">
        <div class="vben-icon">${SVG_ICONS[b.icon] || SVG_ICONS.cert}</div>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
      </article>
    `).join('');
  }

  function renderCorporateTracks() {
    const grid = document.getElementById('corp-tracks-grid');
    if (!grid) return;
    grid.innerHTML = DATA.courses.map(c => {
      const selected = state.corpTracks.includes(c.id);
      const seatUsd = (COURSE_RATES[c.id] && COURSE_RATES[c.id].corpSeatUsd) || 220;
      return `
        <button type="button" class="track-toggle-card${selected ? ' selected' : ''}" data-corp-track="${c.id}">
          <div>
            <strong>${c.title}</strong>
            <small>${c.duration} · <span class="font-num">${formatMoney(seatUsd, state.currency)}</span> / موظف</small>
          </div>
          <span class="track-check-mark">${selected ? SVG_ICONS.check : ''}</span>
        </button>
      `;
    }).join('');
  }

  function renderCorporateBuilder() {
    const calc = getCorporateCalc();

    const rangeEl = document.getElementById('corp-seats-range');
    const valEl = document.getElementById('corp-seats-val');
    const tierBadge = document.getElementById('corp-discount-tier-badge');
    if (rangeEl) rangeEl.value = String(state.corpSeats);
    if (valEl) valEl.textContent = String(state.corpSeats);
    if (tierBadge) tierBadge.textContent = calc.tier.label;

    document.querySelectorAll('#corp-presets .preset-btn').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.preset) === state.corpSeats);
    });

    const sumTracks = document.getElementById('corp-sum-tracks');
    const sumDeliv = document.getElementById('corp-sum-delivery');
    const sumSeats = document.getElementById('corp-sum-seats');
    const sumPerSeat = document.getElementById('corp-sum-per-seat');
    const sumGross = document.getElementById('corp-sum-gross');
    const sumDiscLabel = document.getElementById('corp-sum-discount-label');
    const sumDiscVal = document.getElementById('corp-sum-discount-val');
    const sumTotal = document.getElementById('corp-sum-total');
    const sumMulti = document.getElementById('corp-sum-multi');
    const waBtn = document.getElementById('corp-wa-btn');

    if (sumTracks) sumTracks.textContent = calc.tracks.map(t => t.title).join(' + ');
    if (sumDeliv) sumDeliv.textContent = calc.deliveryLabel;
    if (sumSeats) sumSeats.textContent = `${calc.seats} موظفين`;
    if (sumPerSeat) sumPerSeat.textContent = formatMoney(calc.perSeatUsd, state.currency);
    if (sumGross) sumGross.textContent = formatMoney(calc.grossUsd, state.currency);

    const discParts = [];
    if (calc.tier.rate > 0) discParts.push(`كمية ${Math.round(calc.tier.rate * 100)}%`);
    if (calc.bundleRate > 0) discParts.push('دمج مسارات 5%');

    if (sumDiscLabel) {
      sumDiscLabel.textContent = discParts.length ? `الخصومات (${discParts.join(' + ')})` : 'خصم الكمية';
    }
    if (sumDiscVal) {
      sumDiscVal.textContent = calc.savedUsd > 0 ? `- ${formatMoney(calc.savedUsd, state.currency)}` : '0';
    }
    if (sumTotal) sumTotal.textContent = formatMoney(calc.netUsd, state.currency);
    if (sumMulti) {
      sumMulti.textContent = `${formatMoney(calc.netUsd, 'USD')}  ·  ${formatMoney(calc.netUsd, 'SAR')}  ·  ${formatMoney(calc.netUsd, 'YER')}`;
    }

    if (waBtn) {
      const msg = buildWhatsAppDispatchText();
      waBtn.href = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }
  }

  function renderIndividualBuilder() {
    const calc = getIndividualCalc();
    const cTitle = document.getElementById('ind-sum-course');
    const cMeta = document.getElementById('ind-sum-meta');
    const cBase = document.getElementById('ind-sum-base');
    const cTotal = document.getElementById('ind-sum-total');
    const cMulti = document.getElementById('ind-sum-multi');
    const waBtn = document.getElementById('ind-wa-btn');

    if (cTitle && calc.course) cTitle.textContent = calc.course.title;
    if (cMeta) cMeta.textContent = `${state.indMode} · ${state.indShift}`;
    if (cBase) cBase.textContent = formatMoney(calc.baseUsd, state.currency);
    if (cTotal) cTotal.textContent = formatMoney(calc.netUsd, state.currency);
    if (cMulti) {
      cMulti.textContent = `${formatMoney(calc.netUsd, 'USD')}  ·  ${formatMoney(calc.netUsd, 'SAR')}  ·  ${formatMoney(calc.netUsd, 'YER')}`;
    }
    if (waBtn) {
      const msg = buildWhatsAppDispatchText();
      waBtn.href = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }
  }

  function renderCatalog() {
    const grid = document.getElementById('vip-courses-grid');
    if (!grid) return;

    const list = DATA.courses.filter(c => state.activeCat === 'all' || c.cat === state.activeCat);
    grid.innerHTML = list.map(c => {
      const indUsd = (COURSE_RATES[c.id] && COURSE_RATES[c.id].indUsd) || 240;
      const corpUsd = (COURSE_RATES[c.id] && COURSE_RATES[c.id].corpSeatUsd) || 220;
      return `
        <article class="vcourse-card">
          <div class="vcourse-img">
            <img src="${resolveImgPath(c.image)}" alt="${c.title}" loading="lazy">
            <span class="vcourse-badge">${c.mode}</span>
          </div>
          <div class="vcourse-body">
            <div class="vcourse-meta">
              <span>${c.catLabel}</span>
              <span>${c.duration}</span>
            </div>
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.82rem;color:var(--slate);border-top:1px solid var(--border);padding-top:0.85rem;margin-bottom:0.95rem;">
              <span>فردي: <strong class="font-num" style="color:var(--gold);">${formatMoney(indUsd, state.currency)}</strong></span>
              <span>للشركات/مقعد: <strong class="font-num" style="color:var(--ink);">${formatMoney(corpUsd, state.currency)}</strong></span>
            </div>
            <div class="vcourse-actions">
              <button type="button" class="btn-gold-solid" data-vip-syllabus="${c.id}" style="padding:0.7rem;">استكشاف المنهج</button>
              <button type="button" class="btn-glass-outline" data-vip-select="${c.id}" style="padding:0.7rem;">تحديد في البوابة</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function setPortalMode(mode) {
    state.portalMode = mode === 'individual' ? 'individual' : 'corporate';
    const isInd = state.portalMode === 'individual';

    document.getElementById('portal-tab-individual')?.classList.toggle('active', isInd);
    document.getElementById('portal-tab-individual')?.setAttribute('aria-selected', String(isInd));
    document.getElementById('portal-tab-corporate')?.classList.toggle('active', !isInd);
    document.getElementById('portal-tab-corporate')?.setAttribute('aria-selected', String(!isInd));

    document.querySelectorAll('#vip-hero-mode-switch .hmode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.portalMode === state.portalMode);
    });

    const pInd = document.getElementById('panel-individual');
    const pCorp = document.getElementById('panel-corporate');
    if (pInd) pInd.hidden = !isInd;
    if (pCorp) pCorp.hidden = isInd;

    const modeBadge = document.getElementById('vip-mode-badge');
    if (modeBadge) {
      modeBadge.textContent = isInd
        ? 'EXECUTIVE INDIVIDUAL TRACK · VIP'
        : 'CORPORATE L&D SOLUTIONS · VIP';
    }

    const orgField = document.getElementById('letter-org-field');
    if (orgField) {
      orgField.style.opacity = isInd ? '0.65' : '1';
    }

    renderIndividualBuilder();
    renderCorporateBuilder();
  }

  function setCurrency(curr) {
    if (!CURRENCIES[curr]) return;
    state.currency = curr;
    document.querySelectorAll('#vip-curr-switch .v-curr-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.curr === curr);
    });
    renderCorporateTracks();
    renderCorporateBuilder();
    renderIndividualBuilder();
    renderCatalog();
  }

  function verifyCertificate(rawCode) {
    const code = String(rawCode || '').trim().toUpperCase();
    const panel = document.getElementById('cert-result-panel');
    if (!panel) return;

    document.querySelectorAll('#cert-samples .sample-chip').forEach(ch => {
      ch.classList.toggle('active', ch.dataset.cert === code);
    });

    const record = CERT_REGISTRY[code];
    if (!record) {
      panel.innerHTML = `
        <div class="cert-result-card is-invalid">
          <div class="cert-verified-head">
            <span class="cert-status-pill" style="background:rgba(252,165,165,0.14);color:var(--danger);">
              ${SVG_ICONS.shieldWarn}
              <span>لم يتم العثور على شهادة مطابقة</span>
            </span>
            <span class="font-num" style="color:var(--muted);font-size:0.84rem;">QUERY: ${code || 'EMPTY'}</span>
          </div>
          <p style="font-size:0.9rem;color:var(--slate);">
            الرقم المرجعي المدخل غير مسجل في السجل التجريبي الحالي. يرجى التحقق من الرمز أو تجربة أحد الرموز المعتمدة: <strong class="font-num" style="color:var(--gold);">CERT-2026-104</strong> أو <strong class="font-num" style="color:var(--gold);">CERT-2026-218</strong> أو <strong class="font-num" style="color:var(--gold);">CERT-2025-882</strong>.
          </p>
        </div>
      `;
      return;
    }

    panel.innerHTML = `
      <div class="cert-result-card">
        <div class="cert-verified-head">
          <span class="cert-status-pill">
            ${SVG_ICONS.shieldOk}
            <span>شهادة موثقة وصادرة عن أكاديمية المستقبل</span>
          </span>
          <span class="font-num" style="color:var(--gold);font-weight:800;font-size:0.92rem;">${record.code}</span>
        </div>
        <div class="cert-grid">
          <div class="cert-cell"><span>اسم الخريج / الخريجة</span><strong>${record.holder}</strong></div>
          <div class="cert-cell"><span>البرنامج الدبلومي</span><strong>${record.courseTitle}</strong></div>
          <div class="cert-cell"><span>تاريخ الإصدار</span><strong>${record.issueDate}</strong></div>
          <div class="cert-cell"><span>الساعات المعتمدة</span><strong class="font-num">${record.hours}</strong></div>
          <div class="cert-cell"><span>التقدير العام</span><strong style="color:var(--ok);">${record.grade}</strong></div>
          <div class="cert-cell"><span>معرف التوثيق</span><strong class="font-num">${record.hash}</strong></div>
        </div>
      </div>
    `;
  }

  function openVipSyllabus(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;
    state.modalCourseId = course.id;

    document.getElementById('vsyl-cat').textContent = course.catLabel;
    document.getElementById('vsyl-title').textContent = course.title;
    document.getElementById('vsyl-meta').textContent = `${course.duration} · ${course.mode} · ${course.startDate}`;
    document.getElementById('vsyl-desc').textContent = course.desc;

    const imgEl = document.getElementById('vsyl-img');
    if (imgEl) {
      imgEl.src = resolveImgPath(course.image);
      imgEl.alt = course.title;
    }

    const modEl = document.getElementById('vsyl-modules');
    if (modEl) {
      modEl.innerHTML = course.modules.map((m, idx) => `
        <div class="vmod-row">
          <span class="vmod-num">0${idx + 1}</span>
          <span>${m}</span>
        </div>
      `).join('');
    }

    showModal('vip-syllabus-modal');
  }

  function populateLetterSheet() {
    const org = document.getElementById('letter-org')?.value.trim() || 'السادة / إدارة الموارد البشرية والتدريب المحترمين';
    const person = document.getElementById('letter-person')?.value.trim() || 'الأستاذ/ة مقدم الطلب';
    const role = document.getElementById('letter-role')?.value.trim() || (state.portalMode === 'corporate' ? 'إدارة الموارد البشرية والتطوير' : 'مرشح/ة للمسار التنفيذي');
    const phone = document.getElementById('letter-phone')?.value.trim() || 'غير مرفق';
    const notes = document.getElementById('letter-notes')?.value.trim();

    const refNum = `FA-VIP-2026-${String(Math.floor(1000 + Math.random() * 8999))}`;
    const todayStr = new Date().toLocaleDateString('en-GB');

    document.getElementById('vlet-ref').textContent = refNum;
    document.getElementById('vlet-date').textContent = todayStr;

    const subjectEl = document.getElementById('vlet-subject');
    const addrEl = document.getElementById('vlet-addressee');
    const introEl = document.getElementById('vlet-intro');
    const tbodyEl = document.getElementById('vlet-table-body');
    const totalsEl = document.getElementById('vlet-totals-row');
    const delivEl = document.getElementById('vlet-deliverables');

    if (state.portalMode === 'corporate') {
      const calc = getCorporateCalc();
      subjectEl.textContent = 'عرض فني ومالي رسمي لتدريب وتأهيل الكوادر المؤسسية (L&D)';
      addrEl.textContent = `السادة / ${org} — عناية: ${person} (${role})`;
      introEl.textContent = 'تهديكم أكاديمية المستقبل للتدريب والتأهيل أطيب التحيات، ويسرها تقديم العرض التدريبي المخصص لرفع كفاءة فريق العمل لديكم وفق المعايير العملية المعتمدة بنسبة 92% تطبيق عملي:';

      tbodyEl.innerHTML = `
        <tr><td>عدد الموظفين المشمولين</td><td class="font-num">${calc.seats} موظفاً</td></tr>
        <tr><td>المسارات التدريبية المختارة</td><td>${calc.tracks.map(t => t.title).join(' + ')}</td></tr>
        <tr><td>صيغة التنفيذ</td><td>${calc.deliveryLabel}</td></tr>
        <tr><td>فئة الخصم المؤسسي</td><td>${calc.tier.label}${calc.bundleRate > 0 ? ' + خصم دمج مسارات 5%' : ''}</td></tr>
        <tr><td>متوسط التكلفة للموظف</td><td class="font-num">${formatMoney(calc.perSeatUsd, 'USD')} | ${formatMoney(calc.perSeatUsd, 'SAR')}</td></tr>
        <tr><td>رقم التواصل المسجل</td><td class="font-num">${phone}</td></tr>
        ${notes ? `<tr><td>متطلبات خاصة</td><td>${notes}</td></tr>` : ''}
      `;

      totalsEl.innerHTML = `صافي القيمة المالية للعرض: <span class="font-num">${formatMoney(calc.netUsd, 'USD')}</span> &nbsp;|&nbsp; <span class="font-num">${formatMoney(calc.netUsd, 'SAR')}</span> &nbsp;|&nbsp; <span class="font-num">${formatMoney(calc.netUsd, 'YER')}</span> (إجمالي التوفير: <span class="font-num">${formatMoney(calc.savedUsd, state.currency)}</span>)`;

      const items = state.corpExtras.length
        ? [...state.corpExtras, 'إصدار شهادات اجتياز موثقة برقم تحقق رقمي لكل متدرب']
        : ['تدريب عملي بنسبة 92%', 'تسجيلات مرئية لجميع الجلسات', 'شهادات اجتياز موثقة رقمياً'];
      delivEl.innerHTML = items.map(x => `<li>${x}</li>`).join('');
    } else {
      const calc = getIndividualCalc();
      subjectEl.textContent = 'خطاب قبول مبدئي وخطة تأهيل تنفيذي فردية (VIP)';
      addrEl.textContent = `إلى الأستاذ/ة: ${person} (${role})`;
      introEl.textContent = 'تؤكد أكاديمية المستقبل للتدريب والتأهيل جاهزيتها لاعتماد التحاقكم بالمسار التنفيذي المختار وتوفير كامل التسهيلات التدريبية والإرشادية وفق التفاصيل التالية:';

      tbodyEl.innerHTML = `
        <tr><td>الدبلوم التخصصي</td><td>${calc.course.title} (${calc.course.duration})</td></tr>
        <tr><td>الباقة التنفيذية</td><td>${calc.coachingLabel}</td></tr>
        <tr><td>نظام الحضور والجدولة</td><td>${state.indMode} — ${state.indShift}</td></tr>
        <tr><td>خطة السداد المعتمدة</td><td>${calc.planLabel}</td></tr>
        <tr><td>رقم الواتساب المسجل</td><td class="font-num">${phone}</td></tr>
        ${notes ? `<tr><td>ملاحظات المتدرب</td><td>${notes}</td></tr>` : ''}
      `;

      totalsEl.innerHTML = `إجمالي الاستثمار التعليمي: <span class="font-num">${formatMoney(calc.netUsd, 'USD')}</span> &nbsp;|&nbsp; <span class="font-num">${formatMoney(calc.netUsd, 'SAR')}</span> &nbsp;|&nbsp; <span class="font-num">${formatMoney(calc.netUsd, 'YER')}</span>`;

      delivEl.innerHTML = [
        'تطبيق عملي بنسبة 92% على مشاريع واقعية من الأسبوع الأول',
        'حفظ كامل التسجيلات والمصادر للمراجعة المستمرة',
        'شهادة اجتياز موثقة في بوابة التحقق الرقمي للأكاديمية',
        'توجيه وتقييم لمشروع التخرج وملف الأعمال المهني',
      ].map(x => `<li>${x}</li>`).join('');
    }

    const waBtn = document.getElementById('vlet-wa-btn');
    if (waBtn) {
      waBtn.href = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(buildWhatsAppDispatchText())}`;
    }
  }

  function buildWhatsAppDispatchText() {
    const org = document.getElementById('letter-org')?.value.trim();
    const person = document.getElementById('letter-person')?.value.trim() || 'مقدم الطلب';
    const phone = document.getElementById('letter-phone')?.value.trim() || 'غير مرفق';
    const notes = document.getElementById('letter-notes')?.value.trim();

    if (state.portalMode === 'corporate') {
      const calc = getCorporateCalc();
      const lines = [
        `*طلب عرض تدريب مؤسسي L&D — ${CFG.academyName} (الفئة الملكية VIP)*`,
        org ? `الجهة / الشركة: ${org}` : 'الجهة / الشركة: غير محددة',
        `اسم المسؤول: ${person}`,
        `رقم التواصل: ${phone}`,
        `عدد المقاعد: ${calc.seats} موظفاً (${calc.tier.label})`,
        `المسارات المختارة: ${calc.tracks.map(t => t.title).join(' + ')}`,
        `صيغة التنفيذ: ${calc.deliveryLabel}`,
        `الإجمالي الصافي: ${formatMoney(calc.netUsd, 'USD')} | ${formatMoney(calc.netUsd, 'SAR')} | ${formatMoney(calc.netUsd, 'YER')}`,
      ];
      if (notes) lines.push(`ملاحظات: ${notes}`);
      return lines.join('\n');
    }

    const calc = getIndividualCalc();
    const lines = [
      `*طلب التحاق تنفيذي (أفراد) — ${CFG.academyName} (الفئة الملكية VIP)*`,
      `الاسم: ${person}`,
      `رقم التواصل: ${phone}`,
      `الدبلوم: ${calc.course.title}`,
      `الباقة: ${calc.coachingLabel}`,
      `الحضور والفترة: ${state.indMode} · ${state.indShift}`,
      `خطة السداد: ${calc.planLabel}`,
      `الإجمالي: ${formatMoney(calc.netUsd, 'USD')} | ${formatMoney(calc.netUsd, 'SAR')} | ${formatMoney(calc.netUsd, 'YER')}`,
    ];
    if (notes) lines.push(`ملاحظات: ${notes}`);
    return lines.join('\n');
  }

  function showModal(id) {
    const backdrop = document.getElementById('vip-modal-backdrop');
    const modal = document.getElementById(id);
    if (!modal) return;
    backdrop?.classList.add('open');
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    document.getElementById('vip-modal-backdrop')?.classList.remove('open');
    ['vip-syllabus-modal', 'vip-letter-modal'].forEach(id => {
      const m = document.getElementById(id);
      if (m) {
        m.classList.remove('open');
        m.hidden = true;
      }
    });
    document.body.style.overflow = '';
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderBenefits();
    renderCatalog();
    renderCorporateTracks();

    const indSel = document.getElementById('ind-course');
    if (indSel) {
      indSel.innerHTML = DATA.courses.map(c => `<option value="${c.id}">${c.title}</option>`).join('');
      indSel.value = state.indCourseId;
    }

    setPortalMode('corporate');
    verifyCertificate('CERT-2026-104');

    // Mobile drawer
    const menuBtn = document.getElementById('vip-menu-btn');
    const drawer = document.getElementById('vip-mobile-drawer');
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

    // Anchor jump to L&D Builder switches mode automatically
    document.querySelectorAll('a[href="#ld-builder"]').forEach(link => {
      link.addEventListener('click', () => setPortalMode('corporate'));
    });

    // Currency switcher
    document.getElementById('vip-curr-switch')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-curr]');
      if (btn) setCurrency(btn.dataset.curr);
    });

    // Hero visual gallery thumbs
    document.getElementById('vip-stage-thumbs')?.addEventListener('click', e => {
      const btn = e.target.closest('.sthumb');
      if (!btn) return;
      document.querySelectorAll('#vip-stage-thumbs .sthumb').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      const img = document.getElementById('vip-stage-img');
      const title = document.getElementById('vip-stage-title');
      const sub = document.getElementById('vip-stage-sub');
      if (img) img.src = resolveImgPath(btn.dataset.img);
      if (title) title.textContent = btn.dataset.title || '';
      if (sub) sub.textContent = btn.dataset.sub || '';
    });

    // Dual Portal Switchers
    document.getElementById('vip-hero-mode-switch')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-portal-mode]');
      if (btn) setPortalMode(btn.dataset.portalMode);
    });
    document.querySelector('.portal-switcher-bar')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-portal-mode]');
      if (btn) setPortalMode(btn.dataset.portalMode);
    });

    // Individual controls
    indSel?.addEventListener('change', e => {
      state.indCourseId = e.target.value;
      renderIndividualBuilder();
    });

    document.getElementById('ind-coaching-group')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-coaching]');
      if (!btn) return;
      document.querySelectorAll('#ind-coaching-group .vip-choice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.indCoaching = btn.dataset.coaching;
      renderIndividualBuilder();
    });

    document.getElementById('ind-mode-group')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-indmode]');
      if (!btn) return;
      document.querySelectorAll('#ind-mode-group .vip-choice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.indMode = btn.dataset.indmode;
      renderIndividualBuilder();
    });

    document.getElementById('ind-shift-group')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-shift]');
      if (!btn) return;
      document.querySelectorAll('#ind-shift-group .vip-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.indShift = btn.dataset.shift;
      renderIndividualBuilder();
    });

    document.getElementById('ind-plan-group')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-indplan]');
      if (!btn) return;
      document.querySelectorAll('#ind-plan-group .vip-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.indPlan = btn.dataset.indplan;
      renderIndividualBuilder();
    });

    // Corporate L&D controls
    const seatRange = document.getElementById('corp-seats-range');
    seatRange?.addEventListener('input', e => {
      state.corpSeats = Math.max(1, Math.min(50, Number(e.target.value) || 1));
      renderCorporateBuilder();
    });

    document.getElementById('corp-seats-dec')?.addEventListener('click', () => {
      if (state.corpSeats > 1) {
        state.corpSeats -= 1;
        renderCorporateBuilder();
      }
    });

    document.getElementById('corp-seats-inc')?.addEventListener('click', () => {
      if (state.corpSeats < 50) {
        state.corpSeats += 1;
        renderCorporateBuilder();
      }
    });

    document.getElementById('corp-presets')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-preset]');
      if (!btn) return;
      state.corpSeats = Number(btn.dataset.preset) || 12;
      renderCorporateBuilder();
    });

    document.getElementById('corp-tracks-grid')?.addEventListener('click', e => {
      const card = e.target.closest('[data-corp-track]');
      if (!card) return;
      const trackId = card.dataset.corpTrack;
      const exists = state.corpTracks.includes(trackId);
      if (exists && state.corpTracks.length > 1) {
        state.corpTracks = state.corpTracks.filter(id => id !== trackId);
      } else if (!exists) {
        state.corpTracks.push(trackId);
      }
      renderCorporateTracks();
      renderCorporateBuilder();
    });

    document.getElementById('corp-delivery-group')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-delivery]');
      if (!btn) return;
      document.querySelectorAll('#corp-delivery-group .vip-choice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.corpDelivery = btn.dataset.delivery;
      renderCorporateBuilder();
    });

    document.getElementById('corp-extras-group')?.addEventListener('change', () => {
      state.corpExtras = Array.from(document.querySelectorAll('#corp-extras-group input:checked')).map(el => el.value);
    });

    // Catalog filters & card clicks
    document.getElementById('vip-cats')?.addEventListener('click', e => {
      const btn = e.target.closest('.vcat-pill');
      if (!btn) return;
      document.querySelectorAll('#vip-cats .vcat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCat = btn.dataset.cat;
      renderCatalog();
    });

    document.getElementById('vip-courses-grid')?.addEventListener('click', e => {
      const sylBtn = e.target.closest('[data-vip-syllabus]');
      if (sylBtn) {
        openVipSyllabus(sylBtn.dataset.vipSyllabus);
        return;
      }
      const selBtn = e.target.closest('[data-vip-select]');
      if (selBtn) {
        const id = selBtn.dataset.vipSelect;
        if (state.portalMode === 'corporate') {
          if (!state.corpTracks.includes(id)) state.corpTracks.push(id);
          renderCorporateTracks();
          renderCorporateBuilder();
        } else {
          state.indCourseId = id;
          if (indSel) indSel.value = id;
          renderIndividualBuilder();
        }
        document.getElementById('portal')?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Certificate Verification Demo
    document.getElementById('cert-verify-form')?.addEventListener('submit', e => {
      e.preventDefault();
      verifyCertificate(document.getElementById('cert-code-input')?.value);
    });

    document.getElementById('cert-samples')?.addEventListener('click', e => {
      const chip = e.target.closest('[data-cert]');
      if (!chip) return;
      const input = document.getElementById('cert-code-input');
      if (input) input.value = chip.dataset.cert;
      verifyCertificate(chip.dataset.cert);
    });

    // Letter modal triggers & controls
    document.getElementById('ind-open-letter-btn')?.addEventListener('click', () => {
      setPortalMode('individual');
      populateLetterSheet();
      showModal('vip-letter-modal');
    });

    document.getElementById('corp-open-letter-btn')?.addEventListener('click', () => {
      setPortalMode('corporate');
      populateLetterSheet();
      showModal('vip-letter-modal');
    });

    document.getElementById('letter-intake-form')?.addEventListener('submit', e => {
      e.preventDefault();
      populateLetterSheet();
      showModal('vip-letter-modal');
    });

    document.getElementById('letter-direct-wa-btn')?.addEventListener('click', () => {
      const msg = buildWhatsAppDispatchText();
      window.open(`https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    });

    document.getElementById('vlet-print-btn')?.addEventListener('click', () => {
      window.print();
    });

    document.getElementById('vlet-copy-btn')?.addEventListener('click', async () => {
      const sheet = document.getElementById('vlet-sheet');
      const label = document.getElementById('vlet-copy-label');
      const text = sheet ? sheet.innerText.replace(/\n{3,}/g, '\n\n') : buildWhatsAppDispatchText();
      try {
        await navigator.clipboard.writeText(text);
        if (label) {
          label.textContent = 'تم نسخ نص الخطاب';
          setTimeout(() => { label.textContent = 'نسخ نص الخطاب'; }, 2400);
        }
      } catch {
        if (label) label.textContent = 'يرجى النسخ يدوياً';
      }
    });

    // Modal closers & syllabus action buttons
    document.getElementById('vsyl-close')?.addEventListener('click', closeAllModals);
    document.getElementById('vlet-close')?.addEventListener('click', closeAllModals);
    document.getElementById('vip-modal-backdrop')?.addEventListener('click', closeAllModals);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAllModals();
    });

    document.getElementById('vsyl-pick-ind')?.addEventListener('click', () => {
      if (state.modalCourseId) {
        state.indCourseId = state.modalCourseId;
        if (indSel) indSel.value = state.modalCourseId;
      }
      setPortalMode('individual');
      closeAllModals();
      document.getElementById('portal')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('vsyl-add-corp')?.addEventListener('click', () => {
      if (state.modalCourseId && !state.corpTracks.includes(state.modalCourseId)) {
        state.corpTracks.push(state.modalCourseId);
      }
      renderCorporateTracks();
      setPortalMode('corporate');
      closeAllModals();
      document.getElementById('portal')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
