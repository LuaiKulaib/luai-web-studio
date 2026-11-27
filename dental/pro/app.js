/* =========================================================
   app.js — عيادة ابتسامة (الفئة الفاخرة Pro)
   Swiss Medical Precision Clinic — Interactive Estimator,
   Filterable Portfolio & Doctor Slot Scheduler
   ========================================================= */
'use strict';

(function initDentalPro() {
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
    USD: { code: 'USD', label: '$', rate: 1, decimals: 0 },
    SAR: { code: 'SAR', label: 'ر.س', rate: 3.75, decimals: 0 },
    YER: { code: 'YER', label: 'ر.ي', rate: 535, decimals: 0 },
  };

  const SERVICE_META = {
    whitening: {
      category: 'aesthetic',
      catLabel: 'تجميل وتبييض',
      baseUsd: 140,
      unitText: 'للجلسة',
      duration: '45 – 60 دقيقة',
      protocol: 'ليزر وجل ألماني معتمد',
      estimatable: true,
    },
    veneers: {
      category: 'aesthetic',
      catLabel: 'تجميل وتبييض',
      baseUsd: 210,
      unitText: 'للقشرة الواحدة',
      duration: '5 – 7 أيام عمل',
      protocol: 'E.max / زيركون سويسري',
      estimatable: true,
    },
    implant: {
      category: 'implant-ortho',
      catLabel: 'زراعة وتقويم',
      baseUsd: 580,
      unitText: 'للغرسة الواحدة',
      duration: 'تقييم CBCT فوري',
      protocol: 'تيتانيوم معتمد + ضمان مدى الحياة',
      estimatable: true,
    },
    ortho: {
      category: 'implant-ortho',
      catLabel: 'زراعة وتقويم',
      baseUsd: 850,
      unitText: 'تبدأ من',
      duration: '12 – 24 شهراً',
      protocol: 'تقويم معدني أو شفاف انفيزاليين',
      estimatable: true,
    },
    cleaning: {
      category: 'care',
      catLabel: 'لثة وأطفال',
      baseUsd: 35,
      unitText: 'للجلسة',
      duration: '30 – 45 دقيقة',
      protocol: 'موجات فوق صوتية وعناية لثوية',
      estimatable: false,
    },
    kids: {
      category: 'care',
      catLabel: 'لثة وأطفال',
      baseUsd: 30,
      unitText: 'تبدأ من',
      duration: '30 دقيقة',
      protocol: 'رعاية لطيفة بدون خوف',
      estimatable: false,
    },
  };

  const ESTIMATOR_PACKAGES = {
    whitening: {
      id: 'whitening',
      title: 'تبييض الأسنان',
      subtitle: 'تقنية الليزر والجل الألماني',
      hasQty: false,
      qtyLabel: 'عدد الجلسات',
      minQty: 1,
      maxQty: 2,
      defaultQty: 1,
      warranty: 'بروتوكول ألماني معتمد — نتيجة فورية',
      variants: [
        { id: 'clinic-laser', label: 'تبييض عيادة بالليزر والجل الألماني', sub: 'جلسة واحدة (45–60 دقيقة)', priceUsd: 140, duration: '45 – 60 دقيقة' },
        { id: 'dual-pro', label: 'تبييض مزدوج (عيادة + قوالب منزلية)', sub: 'جلسة ليزر + طقم منزلي 10 أيام', priceUsd: 210, duration: 'جلسة + متابعة 10 أيام' },
      ],
    },
    veneers: {
      id: 'veneers',
      title: 'قشور E.max والزيركون',
      subtitle: 'تصميم رقمي لابتسامة هوليوود',
      hasQty: true,
      qtyLabel: 'عدد القشور / الأسنان',
      minQty: 2,
      maxQty: 16,
      defaultQty: 6,
      scaleLabels: ['2', '6', '10', '12', '16'],
      warranty: 'ضمان 10 سنوات على القشور السويسرية',
      variants: [
        { id: 'zircon-pro', label: 'قشور زيركون جمالية عالية المتانة', sub: 'سعر الوحدة الواحدة', priceUsd: 175, duration: '5 أيام عمل مخبري' },
        { id: 'emax-swiss', label: 'قشور E.max السويسرية فائقة الشفافية', sub: 'سعر القشرة الواحدة', priceUsd: 230, duration: '6 – 7 أيام عمل' },
      ],
    },
    implant: {
      id: 'implant',
      title: 'زراعة الأسنان 3D',
      subtitle: 'غرسات تيتانيوم معتمدة ثلاثية الأبعاد',
      hasQty: true,
      qtyLabel: 'عدد الغرسات المطلوبة',
      minQty: 1,
      maxQty: 8,
      defaultQty: 1,
      scaleLabels: ['1', '2', '4', '6', '8'],
      warranty: 'كفالة مدى الحياة على الغرسة التيتانيوم',
      variants: [
        { id: 'ti-implant', label: 'غرسة تيتانيوم ثلاثية الأبعاد 3D', sub: 'تشمل التاج النهائي بعد الالتئام', priceUsd: 580, duration: 'تقييم فوري + مرحلة التاج' },
        { id: 'german-ti', label: 'غرسة تيتانيوم ألمانية + دعامة زيركون', sub: 'خطة جراحية موجهة بالأشعة CBCT', priceUsd: 740, duration: 'تركيب موجّه بأشعة 3D' },
      ],
    },
    ortho: {
      id: 'ortho',
      title: 'تقويم الأسنان',
      subtitle: 'بإشراف د. أحمد الحميدي (بورد عربي)',
      hasQty: false,
      qtyLabel: 'الفئة',
      minQty: 1,
      maxQty: 1,
      defaultQty: 1,
      warranty: 'متابعة شهرية منتظمة ومثبت بعد العلاج',
      variants: [
        { id: 'metal-ortho', label: 'تقويم معدني دقيق', sub: 'إغلاق سريع ودقيق', priceUsd: 850, duration: '12 – 18 شهراً' },
        { id: 'ceramic-ortho', label: 'تقويم خزفي تجميلي', sub: 'بلون قريب من المينا الطبيعي', priceUsd: 1150, duration: '14 – 20 شهراً' },
        { id: 'invisalign-pro', label: 'تقويم شفاف (انفيزاليين)', sub: 'قوالب رقمية غير مرئية قابلة للإزالة', priceUsd: 1750, duration: '12 – 24 شهراً' },
      ],
    },
  };

  const SLOTS = {
    morning: {
      label: 'الفترة الصباحية (9:00 AM – 1:00 PM)',
      times: ['9:00 AM', '10:00 AM', '11:15 AM', '12:15 PM'],
    },
    evening: {
      label: 'الفترة المسائية (4:00 PM – 9:00 PM)',
      times: ['4:00 PM', '5:30 PM', '7:00 PM', '8:15 PM'],
    },
  };

  const DAYS = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

  const SVG = {
    sparkle: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5z"/></svg>',
    diamond: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="2"/><polyline points="2 8.5 12 12 22 8.5"/></svg>',
    tooth: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c-2.5 0-4.5 1.2-5.5 3-0.6 1.1-0.5 2.2-0.3 3.3 0.4 2.2 0.7 4.5 0.4 6.5-0.2 1.5 0.7 3 2.2 3.4 1 0.3 2 0 2.8-0.6 0.4-0.3 0.6-0.3 1 0 0.8 0.6 1.8 0.9 2.8 0.6 1.5-0.4 2.4-1.9 2.2-3.4-0.3-2 0-4.3 0.4-6.5 0.2-1.1 0.3-2.2-0.3-3.3C16.5 4.2 14.5 3 12 3z"/></svg>',
    align: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><circle cx="8" cy="6" r="1.5"/><circle cx="13" cy="12" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>',
    shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
    star: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    doctor: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 14v4m-2-2h4"/></svg>',
    wa: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    chevron: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
  };

  const state = {
    currency: 'USD',
    filter: 'all',
    pkgId: 'whitening',
    variantId: 'clinic-laser',
    qty: 1,
    addonCleaning: false,
    linkedSummaryText: 'استشارة أولية + فحص شامل',
    linkedEstimateText: 'كشف مجاني',
    doctorIndex: 0,
    day: 'السبت',
    exactDate: '',
    shift: 'morning',
    slot: SLOTS.morning.times[0],
    patientName: '',
    patientPhone: '',
    freeCbct: true,
  };

  function formatAmount(usdAmount, currCode) {
    const c = CURRENCIES[currCode] || CURRENCIES.USD;
    const raw = Math.round(usdAmount * c.rate);
    const formatted = raw.toLocaleString('en-US');
    return c.code === 'USD' ? `$${formatted}` : `${formatted} ${c.label}`;
  }

  function renderStats() {
    const el = document.getElementById('pro-stats-ledger');
    if (!el) return;
    el.innerHTML = DATA.stats.map(s => `
      <div class="ledger-cell">
        <dd class="font-tech">${s.value}</dd>
        <dt>${s.label}</dt>
      </div>
    `).join('');
  }

  function renderTreatments() {
    const grid = document.getElementById('treatments-grid');
    if (!grid) return;

    const list = DATA.services.filter(svc => {
      const meta = SERVICE_META[svc.id] || { category: 'care' };
      return state.filter === 'all' || meta.category === state.filter;
    });

    grid.innerHTML = list.map(svc => {
      const meta = SERVICE_META[svc.id] || {
        catLabel: 'رعاية متخصصة',
        baseUsd: 50,
        unitText: 'تبدأ من',
        duration: '45 دقيقة',
        protocol: 'بروتوكول معتمد',
        estimatable: false,
      };
      const waMsg = `أهلاً، أرغب بالاستفسار عن خدمة: ${svc.title} في ${CFG.clinicName} (الفئة الفاخرة Pro)`;
      const waHref = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
      const btnText = meta.estimatable ? 'تقدير التكلفة' : 'حجز موعد';

      return `
        <article class="treatment-card">
          <div>
            <div class="treatment-top">
              <div class="treatment-icon">${SVG[svc.icon] || SVG.tooth}</div>
              <span class="treatment-badge ${svc.tag ? '' : 'is-cat'}">${svc.tag || meta.catLabel}</span>
            </div>
            <h3>${svc.title}</h3>
            <p>${svc.desc}</p>
            <div class="treatment-specs">
              <span>${meta.protocol}</span>
              <span>المدة: ${meta.duration}</span>
            </div>
          </div>

          <div class="treatment-foot">
            <div class="treatment-price">
              <small>${meta.unitText}</small>
              <strong class="font-tech">${formatAmount(meta.baseUsd, state.currency)}</strong>
            </div>
            <div class="treatment-actions">
              <button type="button" class="btn-card-est" data-service-id="${svc.id}">${btnText}</button>
              <a href="${waHref}" target="_blank" rel="noopener" class="btn-card-wa" aria-label="واتساب ${svc.title}">
                ${SVG.wa}
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderEstimatorPackages() {
    const grid = document.getElementById('est-pkg-grid');
    if (!grid) return;

    grid.innerHTML = Object.values(ESTIMATOR_PACKAGES).map(pkg => `
      <button type="button" class="pkg-option ${pkg.id === state.pkgId ? 'is-active' : ''}" data-pkg="${pkg.id}">
        <strong>${pkg.title}</strong>
        <small>${pkg.subtitle}</small>
      </button>
    `).join('');
  }

  function renderEstimatorVariants() {
    const pkg = ESTIMATOR_PACKAGES[state.pkgId];
    const container = document.getElementById('est-variant-pills');
    const qtyBlock = document.getElementById('est-qty-block');
    const qtyLabel = document.getElementById('est-qty-label');
    const qtyRange = document.getElementById('est-qty-range');
    const qtyDisplay = document.getElementById('est-qty-display');
    const scaleEl = document.getElementById('est-slider-scale');

    if (!pkg || !container) return;

    if (!pkg.variants.some(v => v.id === state.variantId)) {
      state.variantId = pkg.variants[0].id;
    }

    container.innerHTML = pkg.variants.map(v => `
      <button type="button" class="variant-pill ${v.id === state.variantId ? 'is-active' : ''}" data-variant="${v.id}">
        <strong>${v.label}</strong>
        <span>${v.sub} &middot; <span class="font-tech">${formatAmount(v.priceUsd, state.currency)}</span></span>
      </button>
    `).join('');

    if (qtyBlock && qtyRange && qtyDisplay && qtyLabel && scaleEl) {
      qtyBlock.style.display = pkg.hasQty ? 'block' : 'none';
      if (pkg.hasQty) {
        qtyLabel.textContent = `3. ${pkg.qtyLabel}`;
        qtyRange.min = String(pkg.minQty);
        qtyRange.max = String(pkg.maxQty);
        if (state.qty < pkg.minQty || state.qty > pkg.maxQty) {
          state.qty = pkg.defaultQty;
        }
        qtyRange.value = String(state.qty);
        qtyDisplay.textContent = String(state.qty);
        scaleEl.innerHTML = (pkg.scaleLabels || []).map(lbl => `<span>${lbl}</span>`).join('');
      } else {
        state.qty = 1;
      }
    }
  }

  function updateEstimatorSummary() {
    const pkg = ESTIMATOR_PACKAGES[state.pkgId];
    if (!pkg) return;
    const variant = pkg.variants.find(v => v.id === state.variantId) || pkg.variants[0];
    const units = pkg.hasQty ? state.qty : 1;
    const cleaningFeeUsd = state.addonCleaning ? 35 : 0;
    const totalUsd = (variant.priceUsd * units) + cleaningFeeUsd;

    const titleEl = document.getElementById('est-summary-title');
    const primaryEl = document.getElementById('est-primary-total');
    const subEl = document.getElementById('est-variant-summary');
    const usdEl = document.getElementById('est-val-usd');
    const sarEl = document.getElementById('est-val-sar');
    const yerEl = document.getElementById('est-val-yer');
    const durEl = document.getElementById('est-duration-val');
    const warEl = document.getElementById('est-warranty-val');
    const cleanPriceEl = document.getElementById('addon-cleaning-price');
    const waBtn = document.getElementById('est-direct-wa-btn');

    if (titleEl) titleEl.textContent = pkg.title;
    if (primaryEl) primaryEl.textContent = formatAmount(totalUsd, state.currency);
    if (subEl) {
      const qtyNote = pkg.hasQty ? ` (${units} وحدة)` : '';
      subEl.textContent = `${variant.label}${qtyNote}`;
    }
    if (usdEl) usdEl.textContent = formatAmount(totalUsd, 'USD');
    if (sarEl) sarEl.textContent = formatAmount(totalUsd, 'SAR');
    if (yerEl) yerEl.textContent = formatAmount(totalUsd, 'YER');
    if (durEl) durEl.textContent = variant.duration;
    if (warEl) warEl.textContent = pkg.warranty;
    if (cleanPriceEl) cleanPriceEl.textContent = `+${formatAmount(35, state.currency)}`;

    if (waBtn) {
      const msg = [
        `أهلاً ${CFG.clinicName} — استفسار باقة علاج (الفئة الفاخرة Pro):`,
        `- العلاج: ${pkg.title} (${variant.label})`,
        pkg.hasQty ? `- الكمية: ${units} وحدة` : '',
        state.addonCleaning ? '- إضافة: تنظيف وتلميع بالموجات فوق الصوتية' : '',
        '- الكشف الأول + أشعة 3D CBCT: مجاني',
        `- التكلفة التقديرية: ${formatAmount(totalUsd, 'USD')} | ${formatAmount(totalUsd, 'SAR')} | ${formatAmount(totalUsd, 'YER')}`,
      ].filter(Boolean).join('\n');
      waBtn.href = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }
  }

  function syncCurrencyUI() {
    document.querySelectorAll('.curr-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.curr === state.currency);
    });
    renderTreatments();
    renderEstimatorVariants();
    updateEstimatorSummary();
  }

  function renderSteps() {
    const el = document.getElementById('pro-steps-list');
    if (!el) return;
    el.innerHTML = DATA.steps.map(s => `
      <div class="step-row">
        <div class="step-num font-tech">${s.step}</div>
        <div class="step-body">
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </div>
      </div>
    `).join('');
  }

  function renderDoctors() {
    const grid = document.getElementById('pro-doctors-grid');
    if (!grid) return;

    grid.innerHTML = DATA.doctors.map((doc, idx) => `
      <article class="doctor-card">
        <div>
          <div class="doc-head">
            <div class="doc-avatar">${SVG.doctor}</div>
            <div>
              <h3>${doc.name}</h3>
              <div class="doc-spec">${doc.spec}</div>
            </div>
          </div>
          <div class="doc-meta-list">
            <div class="doc-meta-item">
              <span>الخبرة السريرية</span>
              <strong>${doc.exp}</strong>
            </div>
            <div class="doc-meta-item">
              <span>المؤهل الأكاديمي</span>
              <strong>${doc.degree}</strong>
            </div>
            <div class="doc-meta-item">
              <span>الاستشارة الأولى + 3D CBCT</span>
              <strong>مشمولة مجاناً</strong>
            </div>
          </div>
        </div>
        <button type="button" class="btn-obsidian btn-full doc-book-btn" data-doc-index="${idx}">
          <span>حجز موعد مع ${doc.name}</span>
        </button>
      </article>
    `).join('');
  }

  function renderSchedulerOptions() {
    const docWrap = document.getElementById('sch-doctor-options');
    const daysWrap = document.getElementById('sch-days-grid');
    const slotsWrap = document.getElementById('sch-slots-grid');

    if (docWrap) {
      docWrap.innerHTML = DATA.doctors.map((doc, idx) => `
        <button type="button" class="sch-doc-btn ${idx === state.doctorIndex ? 'is-active' : ''}" data-doc-idx="${idx}">
          <strong>${doc.name}</strong>
          <small>${doc.spec} &middot; ${doc.degree}</small>
        </button>
      `).join('') + `
        <button type="button" class="sch-doc-btn ${state.doctorIndex === -1 ? 'is-active' : ''}" data-doc-idx="-1">
          <strong>أول استشاري متاح</strong>
          <small>توجيه تلقائي حسب نوع الحالة</small>
        </button>
      `;
    }

    if (daysWrap) {
      daysWrap.innerHTML = DAYS.map(d => `
        <button type="button" class="day-pill ${d === state.day ? 'is-active' : ''}" data-day="${d}">${d}</button>
      `).join('');
    }

    if (slotsWrap) {
      const times = SLOTS[state.shift].times;
      if (!times.includes(state.slot)) state.slot = times[0];
      slotsWrap.innerHTML = times.map(t => `
        <button type="button" class="slot-btn ${t === state.slot ? 'is-active' : ''}" data-slot="${t}">${t}</button>
      `).join('');
    }
  }

  function buildBookingSummaryText() {
    const doc = state.doctorIndex >= 0 ? DATA.doctors[state.doctorIndex] : { name: 'أول استشاري متاح', spec: 'تشخيص وتجميل وزراعة' };
    const shiftText = state.shift === 'morning' ? 'صباحاً (9:00 AM - 1:00 PM)' : 'مساءً (4:00 PM - 9:00 PM)';
    const dayText = state.exactDate ? `${state.day} (${state.exactDate})` : state.day;

    return [
      `طلب حجز موعد — ${CFG.clinicName} (الفئة الفاخرة Pro)`,
      `الطبيب المطلوب: ${doc.name} (${doc.spec})`,
      `اليوم المفضل: ${dayText}`,
      `الفترة والساعة: ${shiftText} — الساعة ${state.slot}`,
      `الباقة / الاستفسار: ${state.linkedSummaryText}`,
      `التكلفة التقديرية: ${state.linkedEstimateText}`,
      `الأشعة الثلاثية CBCT: ${state.freeCbct ? 'نعم (كشف أول مجاني)' : 'لا'}`,
      state.patientName ? `اسم المريض: ${state.patientName}` : '',
      state.patientPhone ? `رقم التواصل: ${state.patientPhone}` : '',
    ].filter(Boolean).join('\n');
  }

  function updateSchedulerSummary() {
    const doc = state.doctorIndex >= 0 ? DATA.doctors[state.doctorIndex] : { name: 'أول استشاري متاح', spec: 'تشخيص وتجميل وزراعة' };
    const shiftShort = state.shift === 'morning' ? 'صباحاً' : 'مساءً';
    const dayText = state.exactDate ? `${state.day} (${state.exactDate})` : state.day;

    const elDoc = document.getElementById('sum-doctor');
    const elSpec = document.getElementById('sum-spec');
    const elDay = document.getElementById('sum-day');
    const elSlot = document.getElementById('sum-slot');
    const elPkg = document.getElementById('sum-package');
    const elEst = document.getElementById('sum-estimate');
    const elCbct = document.getElementById('sum-cbct');
    const waBtn = document.getElementById('sch-whatsapp-btn');

    if (elDoc) elDoc.textContent = doc.name;
    if (elSpec) elSpec.textContent = doc.spec;
    if (elDay) elDay.textContent = dayText;
    if (elSlot) elSlot.textContent = `${shiftShort} · ${state.slot}`;
    if (elPkg) elPkg.textContent = state.linkedSummaryText;
    if (elEst) elEst.textContent = state.linkedEstimateText;
    if (elCbct) elCbct.textContent = state.freeCbct ? 'مشمولة مجاناً' : 'كشف اعتيادي';

    if (waBtn) {
      waBtn.href = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(buildBookingSummaryText())}`;
    }
  }

  function renderFAQ() {
    const list = document.getElementById('pro-faq-list');
    if (!list) return;

    list.innerHTML = DATA.faqs.map((f, idx) => `
      <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
        <button type="button" class="faq-q" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${f.q}</span>
          ${SVG.chevron}
        </button>
        <div class="faq-a">${f.a}</div>
      </div>
    `).join('');

    list.addEventListener('click', e => {
      const btn = e.target.closest('.faq-q');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('is-open');
      list.querySelectorAll('.faq-item.is-open').forEach(el => {
        el.classList.remove('is-open');
        el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  function bindEvents() {
    // Mobile menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
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

    // Currency Switches (header & estimator synced)
    document.querySelectorAll('#header-currency-switch, #est-currency-switch').forEach(group => {
      group.addEventListener('click', e => {
        const btn = e.target.closest('.curr-btn');
        if (!btn) return;
        state.currency = btn.dataset.curr;
        syncCurrencyUI();
      });
    });

    // Portfolio filters
    const filterTabs = document.getElementById('treatment-filters');
    if (filterTabs) {
      filterTabs.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        state.filter = btn.dataset.filter;
        filterTabs.querySelectorAll('.filter-btn').forEach(b => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });
        renderTreatments();
      });
    }

    // Treatment card quick select -> jump to Estimator or Scheduler
    const treatmentsGrid = document.getElementById('treatments-grid');
    if (treatmentsGrid) {
      treatmentsGrid.addEventListener('click', e => {
        const btn = e.target.closest('.btn-card-est');
        if (!btn) return;
        const id = btn.dataset.serviceId;
        if (ESTIMATOR_PACKAGES[id]) {
          state.pkgId = id;
          state.variantId = ESTIMATOR_PACKAGES[id].variants[0].id;
          state.qty = ESTIMATOR_PACKAGES[id].defaultQty;
          renderEstimatorPackages();
          renderEstimatorVariants();
          updateEstimatorSummary();
          document.getElementById('estimator').scrollIntoView({ behavior: 'smooth' });
        } else {
          const svc = DATA.services.find(s => s.id === id);
          state.linkedSummaryText = svc ? svc.title : 'علاج وقائي';
          state.linkedEstimateText = formatAmount((SERVICE_META[id] || { baseUsd: 35 }).baseUsd, state.currency);
          updateSchedulerSummary();
          document.getElementById('scheduler').scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Estimator controls
    const estPkgGrid = document.getElementById('est-pkg-grid');
    if (estPkgGrid) {
      estPkgGrid.addEventListener('click', e => {
        const btn = e.target.closest('.pkg-option');
        if (!btn) return;
        state.pkgId = btn.dataset.pkg;
        const pkg = ESTIMATOR_PACKAGES[state.pkgId];
        state.variantId = pkg.variants[0].id;
        state.qty = pkg.defaultQty;
        renderEstimatorPackages();
        renderEstimatorVariants();
        updateEstimatorSummary();
      });
    }

    const estVariants = document.getElementById('est-variant-pills');
    if (estVariants) {
      estVariants.addEventListener('click', e => {
        const btn = e.target.closest('.variant-pill');
        if (!btn) return;
        state.variantId = btn.dataset.variant;
        renderEstimatorVariants();
        updateEstimatorSummary();
      });
    }

    const qtyRange = document.getElementById('est-qty-range');
    const qtyDisplay = document.getElementById('est-qty-display');
    if (qtyRange && qtyDisplay) {
      qtyRange.addEventListener('input', () => {
        state.qty = Number(qtyRange.value);
        qtyDisplay.textContent = String(state.qty);
        updateEstimatorSummary();
      });
    }

    const cleanCheck = document.getElementById('addon-cleaning');
    if (cleanCheck) {
      cleanCheck.addEventListener('change', () => {
        state.addonCleaning = cleanCheck.checked;
        updateEstimatorSummary();
      });
    }

    const applyEstBtn = document.getElementById('est-apply-scheduler-btn');
    if (applyEstBtn) {
      applyEstBtn.addEventListener('click', () => {
        const pkg = ESTIMATOR_PACKAGES[state.pkgId];
        const variant = pkg.variants.find(v => v.id === state.variantId) || pkg.variants[0];
        const units = pkg.hasQty ? state.qty : 1;
        const totalUsd = (variant.priceUsd * units) + (state.addonCleaning ? 35 : 0);

        state.linkedSummaryText = `${pkg.title} — ${variant.label}${pkg.hasQty ? ` (${units} وحدة)` : ''}`;
        state.linkedEstimateText = `${formatAmount(totalUsd, state.currency)} (${formatAmount(totalUsd, 'USD')})`;

        // Smart doctor suggestion based on chosen package
        if (state.pkgId === 'ortho') state.doctorIndex = 0;
        if (state.pkgId === 'veneers' || state.pkgId === 'whitening') state.doctorIndex = 1;
        if (state.pkgId === 'implant') state.doctorIndex = 2;

        renderSchedulerOptions();
        updateSchedulerSummary();
        document.getElementById('scheduler').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Doctor cards quick book
    const docGrid = document.getElementById('pro-doctors-grid');
    if (docGrid) {
      docGrid.addEventListener('click', e => {
        const btn = e.target.closest('.doc-book-btn');
        if (!btn) return;
        state.doctorIndex = Number(btn.dataset.docIndex);
        renderSchedulerOptions();
        updateSchedulerSummary();
        document.getElementById('scheduler').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Scheduler events
    const schDocOpts = document.getElementById('sch-doctor-options');
    if (schDocOpts) {
      schDocOpts.addEventListener('click', e => {
        const btn = e.target.closest('.sch-doc-btn');
        if (!btn) return;
        state.doctorIndex = Number(btn.dataset.docIdx);
        renderSchedulerOptions();
        updateSchedulerSummary();
      });
    }

    const schDays = document.getElementById('sch-days-grid');
    if (schDays) {
      schDays.addEventListener('click', e => {
        const btn = e.target.closest('.day-pill');
        if (!btn) return;
        state.day = btn.dataset.day;
        renderSchedulerOptions();
        updateSchedulerSummary();
      });
    }

    const exactDateInput = document.getElementById('sch-exact-date');
    if (exactDateInput) {
      exactDateInput.addEventListener('change', () => {
        state.exactDate = exactDateInput.value;
        updateSchedulerSummary();
      });
    }

    const shiftToggle = document.getElementById('sch-shift-toggle');
    if (shiftToggle) {
      shiftToggle.addEventListener('click', e => {
        const btn = e.target.closest('.shift-btn');
        if (!btn) return;
        state.shift = btn.dataset.shift;
        shiftToggle.querySelectorAll('.shift-btn').forEach(b => b.classList.toggle('is-active', b === btn));
        renderSchedulerOptions();
        updateSchedulerSummary();
      });
    }

    const slotsGrid = document.getElementById('sch-slots-grid');
    if (slotsGrid) {
      slotsGrid.addEventListener('click', e => {
        const btn = e.target.closest('.slot-btn');
        if (!btn) return;
        state.slot = btn.dataset.slot;
        renderSchedulerOptions();
        updateSchedulerSummary();
      });
    }

    const nameInput = document.getElementById('sch-patient-name');
    const phoneInput = document.getElementById('sch-patient-phone');
    const cbctInput = document.getElementById('sch-free-cbct');

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        state.patientName = nameInput.value.trim();
        updateSchedulerSummary();
      });
    }
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        state.patientPhone = phoneInput.value.trim();
        updateSchedulerSummary();
      });
    }
    if (cbctInput) {
      cbctInput.addEventListener('change', () => {
        state.freeCbct = cbctInput.checked;
        updateSchedulerSummary();
      });
    }

    const copyBtn = document.getElementById('sch-copy-btn');
    const copyLabel = document.getElementById('sch-copy-label');
    if (copyBtn && copyLabel) {
      copyBtn.addEventListener('click', () => {
        const txt = buildBookingSummaryText();
        const done = () => {
          copyLabel.textContent = 'تم نسخ ملخص الحجز بنجاح';
          setTimeout(() => {
            copyLabel.textContent = 'نسخ ملخص الحجز';
          }, 2200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).then(done).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = txt;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            done();
          });
        } else {
          const ta = document.createElement('textarea');
          ta.value = txt;
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
    renderTreatments();
    renderEstimatorPackages();
    renderEstimatorVariants();
    updateEstimatorSummary();
    renderSteps();
    renderDoctors();
    renderSchedulerOptions();
    updateSchedulerSummary();
    renderFAQ();
    bindEvents();
  });
})();
