/* =========================================================
   app.js — دار نورة للعناية والتجميل والسبا (الفئة الفاخرة Pro)
   Parisian Atelier Beauty Boutique — Filterable Catalog,
   Multi-Session Treatment Basket & Specialist Slot Scheduler
   ========================================================= */
'use strict';

(function initBeautyPro() {
  const CFG = typeof BEAUTY_CONFIG !== 'undefined' ? BEAUTY_CONFIG : {
    whatsappNumber: '967782259937',
    salonName: 'دار نورة للعناية والتجميل',
    tagline: 'بشرة · شعر · أظافر · باقات العرائس VIP',
  };

  const DATA = typeof BEAUTY_DATA !== 'undefined' ? BEAUTY_DATA : {
    services: [],
    packages: [],
  };

  const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', rate: 1 },
    SAR: { code: 'SAR', symbol: 'ر.س', rate: 3.75 },
    YER: { code: 'YER', symbol: 'ر.ي', rate: 535 },
  };

  const CAT_LABELS = {
    skin: 'العناية بالبشرة',
    hair: 'الشعر والسبا',
    nails: 'الأظافر والسبا',
  };

  const SERVICE_PRICING = {
    'skin-glow': { priceUsd: 55, minutes: 60 },
    'hair-spa': { priceUsd: 78, minutes: 90 },
    'nails-care': { priceUsd: 35, minutes: 50 },
  };

  const EXTRA_CATALOG_ITEMS = [
    {
      id: 'skin-meso',
      cat: 'skin',
      badge: 'نضارة فورية',
      title: 'جلسة الميزوثيرابي والكولاجين الباريسي',
      duration: '45 دقيقة',
      minutes: 45,
      priceUsd: 68,
      desc: 'أمبولات فيتامينات ومضادات أكسدة لتجديد إشراقة البشرة وتقليص المسام قبل المناسبات.',
      image: '../assets/images/skin.jpg',
    },
    {
      id: 'hair-botox',
      cat: 'hair',
      badge: 'فروة الرأس',
      title: 'سبا فروة الرأس الياباني وتصفيف المناسبات',
      duration: '75 دقيقة',
      minutes: 75,
      priceUsd: 62,
      desc: 'تنظيف عميق لفروة الرأس بالبخار والزيوت النباتية مع سشوار وتصفيف حريري ثابت.',
      image: '../assets/images/hair.jpg',
    },
    {
      id: 'nails-gel',
      cat: 'nails',
      badge: 'كوتور فرنسي',
      title: 'طلاء جل فرنسي وبرافين شمعي لليدين والقدمين',
      duration: '60 دقيقة',
      minutes: 60,
      priceUsd: 44,
      desc: 'برافين دافئ لتنعيم اليدين والقدمين مع لون جل فرنسي مقاوم للتقشّر ولمعان فائق.',
      image: '../assets/images/salon.jpg',
    },
  ];

  const SPECIALISTS = [
    {
      id: 'lina',
      name: 'الأخصائية لينا المنصور',
      role: 'خبيرة البشرة والهيدرافيشل الطبي',
      focus: 'skin',
      note: 'خبرة 9 سنوات في البروتوكولات الفرنسية',
    },
    {
      id: 'reem',
      name: 'الستايلست ريم الحداد',
      role: 'أخصائية الكيراتين وتصفيف المناسبات',
      focus: 'hair',
      note: 'ترميم الشعر وتصفيف العرائس والسهرات',
    },
    {
      id: 'nada',
      name: 'الأخصائية ندى العولقي',
      role: 'فنانة الأظافر وسبا اليدين والقدمين',
      focus: 'nails',
      note: 'كوتور الأظافر، الجل الفرنسي، والبرافين',
    },
    {
      id: 'any',
      name: 'أي أخصائية متاحة (تنسيق فوري)',
      role: 'توزيع تلقائي لفريق الأتيليه',
      focus: 'all',
      note: 'مثالية للجلسات المدمجة متعددة الأقسام',
    },
  ];

  const DAYS = [
    { id: 'sat', label: 'السبت', sub: 'الفترة الكاملة' },
    { id: 'sun', label: 'الأحد', sub: 'مواعيد متاحة' },
    { id: 'mon', label: 'الإثنين', sub: 'مواعيد متاحة' },
    { id: 'tue', label: 'الثلاثاء', sub: 'عناية هادئة' },
    { id: 'wed', label: 'الأربعاء', sub: 'مواعيد متاحة' },
    { id: 'thu', label: 'الخميس', sub: 'ذروة المناسبات' },
    { id: 'fri', label: 'الجمعة', sub: 'فترة مسائية' },
  ];

  const TIME_SLOTS = [
    { id: '1000', startMinutes: 600, label: '10:00 ص', period: 'صباحي' },
    { id: '1130', startMinutes: 690, label: '11:30 ص', period: 'صباحي' },
    { id: '1300', startMinutes: 780, label: '01:00 م', period: 'ظهيرة' },
    { id: '1530', startMinutes: 930, label: '03:30 م', period: 'عصري' },
    { id: '1700', startMinutes: 1020, label: '05:00 م', period: 'مسائي' },
    { id: '1830', startMinutes: 1110, label: '06:30 م', period: 'مسائي' },
    { id: '2000', startMinutes: 1200, label: '08:00 م', period: 'مسائي متأخر' },
  ];

  const PACKAGE_PRESETS = {
    'باقة العروس الملكية': {
      priceUsd: 210,
      services: ['skin-glow', 'hair-spa', 'nails-care', 'nails-gel'],
    },
    'باقة الإشراقة السريعة': {
      priceUsd: 115,
      services: ['skin-glow', 'hair-botox', 'nails-care'],
    },
    'باقة الاسترخاء الأسبوعية': {
      priceUsd: 135,
      services: ['skin-meso', 'hair-spa', 'nails-care'],
    },
  };

  function resolveRelativeImage(path) {
    if (!path) return '../assets/images/salon.jpg';
    return path.startsWith('../') ? path : `../${path}`;
  }

  function parseDurationMinutes(str, fallback) {
    const match = String(str || '').match(/\d+/);
    return match ? Number(match[0]) : fallback;
  }

  function buildCatalog() {
    const baseServices = (DATA.services || []).map(svc => {
      const meta = SERVICE_PRICING[svc.id] || { priceUsd: 50, minutes: 60 };
      return {
        id: svc.id,
        cat: svc.cat,
        badge: svc.badge || 'معتمد',
        title: svc.title,
        duration: svc.duration || `${meta.minutes} دقيقة`,
        minutes: parseDurationMinutes(svc.duration, meta.minutes),
        priceUsd: meta.priceUsd,
        desc: svc.desc,
        image: resolveRelativeImage(svc.image),
      };
    });

    return baseServices.concat(EXTRA_CATALOG_ITEMS);
  }

  const CATALOG = buildCatalog();

  const state = {
    currency: 'USD',
    activeCat: 'all',
    basketIds: ['skin-glow'],
    specialistId: 'lina',
    dayId: 'thu',
    slotId: '1530',
  };

  function formatMoney(usdAmount, currCode) {
    const c = CURRENCIES[currCode || state.currency] || CURRENCIES.USD;
    const raw = Math.round(usdAmount * c.rate);
    const formatted = raw.toLocaleString('en-US');
    return c.code === 'USD' ? `$${formatted}` : `${formatted} ${c.symbol}`;
  }

  function formatDurationHuman(totalMins) {
    if (totalMins <= 0) return '0 دقيقة';
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    if (hrs === 0) return `${mins} دقيقة`;
    const hrLabel = hrs === 1 ? 'ساعة واحدة' : hrs === 2 ? 'ساعتان' : `${hrs} ساعات`;
    return mins > 0 ? `${hrLabel} و${mins} دقيقة` : hrLabel;
  }

  function formatClockFromMinutes(totalMinsFromMidnight) {
    const normalized = ((totalMinsFromMidnight % 1440) + 1440) % 1440;
    const h24 = Math.floor(normalized / 60);
    const mins = normalized % 60;
    const suffix = h24 >= 12 ? 'م' : 'ص';
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    const hh = String(h12).padStart(2, '0');
    const mm = String(mins).padStart(2, '0');
    return `${hh}:${mm} ${suffix}`;
  }

  function getBasketItems() {
    return state.basketIds
      .map(id => CATALOG.find(item => item.id === id))
      .filter(Boolean);
  }

  function getTotals() {
    const items = getBasketItems();
    const totalMinutes = items.reduce((acc, item) => acc + item.minutes, 0);
    const totalUsd = items.reduce((acc, item) => acc + item.priceUsd, 0);
    return { items, totalMinutes, totalUsd };
  }

  function toggleBasketService(id) {
    const exists = state.basketIds.includes(id);
    if (exists) {
      state.basketIds = state.basketIds.filter(item => item !== id);
    } else {
      state.basketIds = [...state.basketIds, id];
    }
    renderAll();
  }

  function renderCurrencyButtons() {
    document.querySelectorAll('#pro-currency-switch .curr-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.curr === state.currency);
    });
  }

  function renderCatalog() {
    const grid = document.getElementById('pro-catalog-grid');
    const counter = document.getElementById('pro-catalog-count');
    if (!grid) return;

    const list = state.activeCat === 'all'
      ? CATALOG
      : CATALOG.filter(item => item.cat === state.activeCat);

    if (counter) counter.textContent = String(list.length);

    grid.innerHTML = list.map(item => {
      const inBasket = state.basketIds.includes(item.id);
      const catName = CAT_LABELS[item.cat] || 'عناية خاصة';
      return `
        <article class="svc-card ${inBasket ? 'is-in-basket' : ''}">
          <div class="svc-media">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <span class="svc-badge">${item.badge}</span>
            <span class="svc-cat-tag">${catName}</span>
          </div>
          <div class="svc-body">
            <div class="svc-meta-line">
              <span class="svc-dur font-tech">${item.minutes} دقيقة</span>
              <span class="svc-price font-tech">${formatMoney(item.priceUsd)}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <button type="button" class="btn-basket-toggle ${inBasket ? 'is-added' : ''}" data-toggle-id="${item.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${inBasket
                  ? '<polyline points="20 6 9 17 4 12"/>'
                  : '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'}
              </svg>
              <span>${inBasket ? 'مضافة إلى سلة الجلسات' : 'أضيفي لسلة الجلسات'}</span>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderPackages() {
    const grid = document.getElementById('pro-packages-grid');
    if (!grid) return;

    const pkgs = DATA.packages || [];
    grid.innerHTML = pkgs.map(pkg => {
      const preset = PACKAGE_PRESETS[pkg.name] || { priceUsd: 120, services: ['skin-glow', 'nails-care'] };
      return `
        <article class="pkg-card">
          <div>
            <span class="pkg-note">${pkg.note}</span>
            <h3>${pkg.name}</h3>
            <p>${pkg.items}</p>
          </div>
          <div class="pkg-footer">
            <strong class="pkg-price-tag font-tech">${formatMoney(preset.priceUsd)}</strong>
            <button type="button" class="btn-load-pkg" data-pkg-name="${pkg.name}">تفعيل في السلة</button>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderBasket() {
    const listEl = document.getElementById('pro-basket-list');
    const chipsEl = document.getElementById('pro-quick-add-chips');
    const totalMinsEl = document.getElementById('pro-total-minutes');
    const humanDurEl = document.getElementById('pro-duration-human');
    const sessionsCountEl = document.getElementById('pro-total-sessions');
    const perkEl = document.getElementById('pro-perk-badge');
    const totalPriceEl = document.getElementById('pro-total-price');
    const multiCurrEl = document.getElementById('pro-multi-curr-note');
    const headerCountEl = document.getElementById('pro-header-count');
    const dockMinsEl = document.getElementById('pro-dock-mins');

    const { items, totalMinutes, totalUsd } = getTotals();

    if (listEl) {
      if (items.length === 0) {
        listEl.innerHTML = '<div class="basket-empty">سلة الجلسات فارغة حالياً — اختاري جلسة من الكتالوج أو الإضافة السريعة أدناه.</div>';
      } else {
        listEl.innerHTML = items.map(item => `
          <div class="basket-item">
            <div class="basket-item-info">
              <strong>${item.title}</strong>
              <small class="font-tech">${CAT_LABELS[item.cat] || ''} &middot; ${item.minutes} دقيقة</small>
            </div>
            <div class="basket-item-actions">
              <span class="basket-item-price font-tech">${formatMoney(item.priceUsd)}</span>
              <button type="button" class="btn-remove-item" data-remove-id="${item.id}" aria-label="إزالة ${item.title}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    if (chipsEl) {
      chipsEl.innerHTML = CATALOG.map(item => {
        const isIn = state.basketIds.includes(item.id);
        const shortName = item.title.split(' ').slice(0, 3).join(' ');
        return `
          <button type="button" class="quick-chip ${isIn ? 'is-in' : ''}" data-quick-id="${item.id}">
            ${isIn ? 'مفعّلة: ' : '+ '}${shortName}
          </button>
        `;
      }).join('');
    }

    if (totalMinsEl) totalMinsEl.textContent = `${totalMinutes} دقيقة`;
    if (humanDurEl) humanDurEl.textContent = formatDurationHuman(totalMinutes);
    if (sessionsCountEl) {
      sessionsCountEl.textContent = items.length === 1 ? '1 جلسة' : `${items.length} جلسات`;
    }
    if (perkEl) {
      if (items.length >= 3 || totalMinutes >= 140) {
        perkEl.textContent = 'ترقية ضيافة الأتيليه + سيروم ختامي';
      } else if (items.length >= 2) {
        perkEl.textContent = 'تجهيز الغرفة المزدوجة بدون انتظار';
      } else {
        perkEl.textContent = 'ضيافة الشاي الفرنسي والترحيب';
      }
    }

    if (totalPriceEl) totalPriceEl.textContent = formatMoney(totalUsd);
    if (multiCurrEl) {
      multiCurrEl.textContent = `${formatMoney(totalUsd, 'USD')} · ${formatMoney(totalUsd, 'SAR')} · ${formatMoney(totalUsd, 'YER')}`;
    }
    if (headerCountEl) headerCountEl.textContent = String(items.length);
    if (dockMinsEl) dockMinsEl.textContent = `${totalMinutes} د`;
  }

  function renderSpecialists() {
    const grid = document.getElementById('pro-specialist-grid');
    if (!grid) return;

    grid.innerHTML = SPECIALISTS.map(spec => {
      const selected = spec.id === state.specialistId;
      return `
        <button type="button" class="spec-card ${selected ? 'is-selected' : ''}" data-spec-id="${spec.id}">
          <span class="spec-role">${spec.role}</span>
          <strong>${spec.name}</strong>
          <small>${spec.note}</small>
        </button>
      `;
    }).join('');
  }

  function renderScheduleSelectors() {
    const dayWrap = document.getElementById('pro-day-pills');
    const slotWrap = document.getElementById('pro-slot-grid');
    const rangeLabel = document.getElementById('pro-slot-range-label');
    const { totalMinutes } = getTotals();

    if (dayWrap) {
      dayWrap.innerHTML = DAYS.map(day => `
        <button type="button" class="day-pill ${day.id === state.dayId ? 'is-selected' : ''}" data-day-id="${day.id}">
          <strong>${day.label}</strong>
          <span>${day.sub}</span>
        </button>
      `).join('');
    }

    if (slotWrap) {
      slotWrap.innerHTML = TIME_SLOTS.map(slot => `
        <button type="button" class="slot-btn ${slot.id === state.slotId ? 'is-selected' : ''}" data-slot-id="${slot.id}">
          <strong class="font-tech">${slot.label}</strong>
          <small>${slot.period}</small>
        </button>
      `).join('');
    }

    const activeSlot = TIME_SLOTS.find(s => s.id === state.slotId) || TIME_SLOTS[0];
    const endClock = formatClockFromMinutes(activeSlot.startMinutes + Math.max(totalMinutes, 30));
    if (rangeLabel) {
      rangeLabel.textContent = `${activeSlot.label} – ${endClock}`;
    }
  }

  function buildBookingSummaryText() {
    const { items, totalMinutes, totalUsd } = getTotals();
    const spec = SPECIALISTS.find(s => s.id === state.specialistId) || SPECIALISTS[0];
    const day = DAYS.find(d => d.id === state.dayId) || DAYS[0];
    const slot = TIME_SLOTS.find(s => s.id === state.slotId) || TIME_SLOTS[0];
    const endClock = formatClockFromMinutes(slot.startMinutes + Math.max(totalMinutes, 30));

    const clientName = document.getElementById('pro-client-name')?.value.trim() || 'غير محدد';
    const clientPhone = document.getElementById('pro-client-phone')?.value.trim() || 'غير محدد';
    const clientNotes = document.getElementById('pro-client-notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

    const servicesLines = items.length > 0
      ? items.map((s, idx) => `${idx + 1}. ${s.title} (${s.minutes} دقيقة - ${formatMoney(s.priceUsd)})`).join('\n')
      : 'لم يتم اختيار جلسات بعد';

    return [
      `*طلب حجز موعد — ${CFG.salonName}*`,
      `التصنيف: الفئة الفاخرة Pro`,
      `--------------------------------`,
      `الاسم: ${clientName}`,
      `رقم الجوال: ${clientPhone}`,
      `الأخصائية: ${spec.name}`,
      `اليوم والساعة: ${day.label} (${slot.label} حتى ${endClock})`,
      `إجمالي المدة: ${totalMinutes} دقيقة (${formatDurationHuman(totalMinutes)})`,
      `--------------------------------`,
      `الجلسات المختارة:`,
      servicesLines,
      `--------------------------------`,
      `الإجمالي (${state.currency}): ${formatMoney(totalUsd)}`,
      `المقابل بالعملات: ${formatMoney(totalUsd, 'USD')} | ${formatMoney(totalUsd, 'SAR')} | ${formatMoney(totalUsd, 'YER')}`,
      `ملاحظات: ${clientNotes}`,
    ].join('\n');
  }

  function renderSummaryCard() {
    const { items, totalMinutes, totalUsd } = getTotals();
    const spec = SPECIALISTS.find(s => s.id === state.specialistId) || SPECIALISTS[0];
    const day = DAYS.find(d => d.id === state.dayId) || DAYS[0];
    const slot = TIME_SLOTS.find(s => s.id === state.slotId) || TIME_SLOTS[0];
    const endClock = formatClockFromMinutes(slot.startMinutes + Math.max(totalMinutes, 30));

    const sumServices = document.getElementById('sum-services');
    const sumDuration = document.getElementById('sum-duration');
    const sumSpecialist = document.getElementById('sum-specialist');
    const sumDatetime = document.getElementById('sum-datetime');
    const sumEndtime = document.getElementById('sum-endtime');
    const sumPrice = document.getElementById('sum-price');
    const fabWa = document.getElementById('pro-fab-wa');

    if (sumServices) {
      sumServices.textContent = items.length > 0
        ? items.map(i => i.title).join(' + ')
        : 'اختاري جلسة واحدة على الأقل';
    }
    if (sumDuration) {
      sumDuration.textContent = `${totalMinutes} دقيقة (${formatDurationHuman(totalMinutes)})`;
    }
    if (sumSpecialist) sumSpecialist.textContent = spec.name;
    if (sumDatetime) sumDatetime.textContent = `${day.label} — ${slot.label}`;
    if (sumEndtime) sumEndtime.textContent = endClock;
    if (sumPrice) {
      sumPrice.textContent = `${formatMoney(totalUsd)} (${state.currency})`;
    }
    if (fabWa) {
      const quickMsg = `أهلاً ${CFG.salonName}، أستفسر عن حجز جلسات عبر الفئة الفاخرة Pro.`;
      fabWa.href = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(quickMsg)}`;
    }
  }

  function renderAll() {
    renderCurrencyButtons();
    renderCatalog();
    renderPackages();
    renderBasket();
    renderSpecialists();
    renderScheduleSelectors();
    renderSummaryCard();
  }

  function bindEvents() {
    const salonInline = document.getElementById('pro-salon-inline');
    if (salonInline && CFG.salonName) {
      salonInline.textContent = CFG.salonName;
    }

    document.getElementById('pro-currency-switch')?.addEventListener('click', e => {
      const btn = e.target.closest('.curr-btn');
      if (!btn || !btn.dataset.curr) return;
      state.currency = btn.dataset.curr;
      renderAll();
    });

    document.getElementById('pro-cat-filters')?.addEventListener('click', e => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      document.querySelectorAll('#pro-cat-filters .filter-pill').forEach(p => p.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.activeCat = btn.dataset.cat || 'all';
      renderCatalog();
    });

    document.getElementById('pro-catalog-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-toggle-id]');
      if (!btn) return;
      toggleBasketService(btn.dataset.toggleId);
    });

    document.getElementById('pro-packages-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-pkg-name]');
      if (!btn) return;
      const preset = PACKAGE_PRESETS[btn.dataset.pkgName];
      if (!preset) return;
      state.basketIds = [...preset.services];
      renderAll();
      document.getElementById('basket-scheduler')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('pro-basket-list')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-remove-id]');
      if (!btn) return;
      state.basketIds = state.basketIds.filter(id => id !== btn.dataset.removeId);
      renderAll();
    });

    document.getElementById('pro-quick-add-chips')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-quick-id]');
      if (!btn) return;
      toggleBasketService(btn.dataset.quickId);
    });

    document.getElementById('pro-clear-basket')?.addEventListener('click', () => {
      state.basketIds = [];
      renderAll();
    });

    document.getElementById('pro-specialist-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-spec-id]');
      if (!btn) return;
      state.specialistId = btn.dataset.specId;
      renderSpecialists();
      renderSummaryCard();
    });

    document.getElementById('pro-day-pills')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-day-id]');
      if (!btn) return;
      state.dayId = btn.dataset.dayId;
      renderScheduleSelectors();
      renderSummaryCard();
    });

    document.getElementById('pro-slot-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-slot-id]');
      if (!btn) return;
      state.slotId = btn.dataset.slotId;
      renderScheduleSelectors();
      renderSummaryCard();
    });

    document.getElementById('pro-booking-form')?.addEventListener('submit', e => {
      e.preventDefault();
      if (state.basketIds.length === 0) {
        state.basketIds = ['skin-glow'];
        renderAll();
      }
      const message = buildBookingSummaryText();
      window.open(`https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });

    document.getElementById('pro-copy-summary')?.addEventListener('click', () => {
      const label = document.getElementById('pro-copy-label');
      const text = buildBookingSummaryText();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          if (label) {
            label.textContent = 'تم نسخ ملخص الموعد';
            setTimeout(() => { label.textContent = 'نسخ ملخص الموعد'; }, 2400);
          }
        });
      }
    });

    const menuBtn = document.getElementById('pro-menu-btn');
    const drawer = document.getElementById('pro-mobile-drawer');
    menuBtn?.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      if (drawer) drawer.hidden = expanded;
    });
    drawer?.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        drawer.hidden = true;
        menuBtn?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    renderAll();
  });
})();
