/* =========================================================
   app.js — دار نورة للعناية والتجميل والسبا (الفئة الملكية VIP)
   Maison Sanctuary & Bridal Suite — 7-Day Bridal Program Builder,
   Annual VIP Memberships, Home/Hotel Concierge & Printable Dossier
   ========================================================= */
'use strict';

(function initBeautyVip() {
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

  const DAILY_RITUALS = [
    {
      id: 'moroccan-bath',
      cat: 'سبا وعناية الجسم',
      title: 'الحمام المغربي الملكي بالورد الدمشقي',
      desc: 'بخار عشبي، تلييف مغربي أصيل، قناع النيلة الصحراوية وترطيب بزبدة الشيا.',
      minutes: 120,
      priceUsd: 85,
    },
    {
      id: 'hydrafacial',
      cat: 'تجديد البشرة',
      title: 'جلسة الهيدرافيشل وأمبولات الكولاجين الذهبي',
      desc: 'تنظيف عميق للمسام، تقشير ألماسي، وسيروم نضارة فوري مضاد للإجهاد.',
      minutes: 75,
      priceUsd: 70,
    },
    {
      id: 'keratin',
      cat: 'الشعر والكيراتين',
      title: 'علاج الكيراتين والبيوتين وسبا فروة الرأس',
      desc: 'ترميم ألياف الشعر ومنحه لمعاناً حريرياً يستمر طوال أسبوع الزفاف.',
      minutes: 110,
      priceUsd: 95,
    },
    {
      id: 'nail-couture',
      cat: 'كوتور الأظافر',
      title: 'كوتور الأظافر، الجل الفرنسي وشمع البرافين',
      desc: 'مانيكير وباديكير ملكي مع نحت وتلميع احترافي وترطيب عميق لليدين والقدمين.',
      minutes: 70,
      priceUsd: 50,
    },
    {
      id: 'bridal-styling',
      cat: 'الإطلالة الملكية',
      title: 'بروفة وتنفيذ تسريحة ومكياج العروس الكامل',
      desc: 'تصميم تسريحة التاج والطرحة مع مكياج سينمائي ثابت بإشراف كبرى الخبيرات.',
      minutes: 150,
      priceUsd: 180,
    },
    {
      id: 'companion-suite',
      cat: 'جناح المرافقة',
      title: 'جناح المرافقة الخاص والضيافة الملكية',
      desc: 'استضافة مرافقة العروس مع تصفيف شعر، مانيكير سريع، وبوفيه ضيافة خاص.',
      minutes: 90,
      priceUsd: 65,
    },
  ];

  const DAY_DEFINITIONS = [
    { day: 1, title: 'اليوم 1 — التهيئة والتنقية', defaultPeriod: 'صباحي (10:00 ص)' },
    { day: 2, title: 'اليوم 2 — تغذية الشعر العميقة', defaultPeriod: 'ظهيرة (01:30 م)' },
    { day: 3, title: 'اليوم 3 — تجديد وإشراقة البشرة', defaultPeriod: 'صباحي (10:00 ص)' },
    { day: 4, title: 'اليوم 4 — استرخاء الملاذ والسبا', defaultPeriod: 'مسائي خاص (05:00 م)' },
    { day: 5, title: 'اليوم 5 — كوتور الأظافر والبروفة', defaultPeriod: 'ظهيرة (01:30 م)' },
    { day: 6, title: 'اليوم 6 — الحمام المغربي الختامي', defaultPeriod: 'مسائي خاص (05:00 م)' },
    { day: 7, title: 'اليوم 7 — ليلة الزفاف والتتويج', defaultPeriod: 'صباحي (10:00 ص)' },
  ];

  const PERIOD_OPTIONS = [
    'صباحي (10:00 ص)',
    'ظهيرة (01:30 م)',
    'مسائي خاص (05:00 م)',
  ];

  const MEMBERSHIPS = [
    {
      id: 'silver',
      en: 'SILVER GLOW',
      ar: 'الإشراقة الفضية',
      annualUsd: 390,
      discountPct: 12,
      freeConcierge: false,
      perks: [
        'خصم 12% فوري على برنامج العروس والجلسات',
        'جلستا هيدرافيشل مجانيتان خلال العام',
        'أولوية حجز المواعيد في المواسم والأعياد',
      ],
    },
    {
      id: 'gold',
      en: 'GOLD SANCTUARY',
      ar: 'الملاذ الذهبية',
      annualUsd: 720,
      discountPct: 20,
      freeConcierge: false,
      perks: [
        'خصم 20% فوري على برنامج العروس الكامل',
        '4 جلسات حمام مغربي وسبا شعر سنوياً',
        'دخول الجناح الخاص بدون رسوم إضافية',
      ],
    },
    {
      id: 'diamond',
      en: 'DIAMOND BRIDAL',
      ar: 'الألماس للعرائس',
      annualUsd: 1150,
      discountPct: 28,
      freeConcierge: true,
      perks: [
        'خصم 28% على جميع طقوس السبعة أيام',
        'خدمة الكونسيرج للمنزل أو الفندق مجاناً بالكامل',
        'استضافة مرافقة VIP + عناية ما بعد الزفاف',
      ],
    },
  ];

  const CONCIERGE_BASE_USD = 65;

  const PRESET_TEMPLATES = {
    'باقة العروس الملكية': {
      1: ['moroccan-bath'],
      2: ['keratin'],
      3: ['hydrafacial'],
      4: ['companion-suite'],
      5: ['nail-couture'],
      6: ['moroccan-bath', 'hydrafacial'],
      7: ['bridal-styling', 'companion-suite'],
    },
    'باقة الإشراقة السريعة': {
      1: [],
      2: [],
      3: [],
      4: [],
      5: ['keratin'],
      6: ['hydrafacial', 'nail-couture'],
      7: ['bridal-styling'],
    },
    'باقة الاسترخاء الأسبوعية': {
      1: ['moroccan-bath'],
      2: [],
      3: ['hydrafacial'],
      4: [],
      5: ['keratin', 'nail-couture'],
      6: [],
      7: [],
    },
  };

  function createEmptyOrPresetSchedule(templateMap) {
    const map = templateMap || PRESET_TEMPLATES['باقة العروس الملكية'];
    return DAY_DEFINITIONS.map(def => ({
      day: def.day,
      title: def.title,
      period: def.defaultPeriod,
      rituals: [...(map[def.day] || [])],
    }));
  }

  const state = {
    currency: 'USD',
    activeDay: 1,
    activePreset: 'باقة العروس الملكية',
    schedule: createEmptyOrPresetSchedule(PRESET_TEMPLATES['باقة العروس الملكية']),
    membershipId: 'gold',
    includeMembershipFee: false,
    venueMode: 'maison',
  };

  function resolveRelativeImage(path) {
    if (!path) return '../assets/images/salon.jpg';
    return path.startsWith('../') ? path : `../${path}`;
  }

  function formatMoney(usdAmount, currCode) {
    const c = CURRENCIES[currCode || state.currency] || CURRENCIES.USD;
    const raw = Math.round(usdAmount * c.rate);
    const formatted = raw.toLocaleString('en-US');
    return c.code === 'USD' ? `$${formatted}` : `${formatted} ${c.symbol}`;
  }

  function formatHours(totalMinutes) {
    const hrs = (totalMinutes / 60).toFixed(1).replace(/\.0$/, '');
    return `${hrs} ساعة (${totalMinutes} دقيقة)`;
  }

  function getActiveMembership() {
    return MEMBERSHIPS.find(m => m.id === state.membershipId) || MEMBERSHIPS[1];
  }

  function computeProgramMetrics() {
    const tier = getActiveMembership();
    const activeDays = state.schedule.filter(d => d.rituals.length > 0);
    let totalRituals = 0;
    let totalMinutes = 0;
    let subtotalUsd = 0;

    const dayBreakdowns = activeDays.map(d => {
      const items = d.rituals
        .map(id => DAILY_RITUALS.find(r => r.id === id))
        .filter(Boolean);
      const dayMins = items.reduce((acc, r) => acc + r.minutes, 0);
      const dayUsd = items.reduce((acc, r) => acc + r.priceUsd, 0);
      totalRituals += items.length;
      totalMinutes += dayMins;
      subtotalUsd += dayUsd;
      return {
        day: d.day,
        title: d.title,
        period: d.period,
        items,
        dayMins,
        dayUsd,
      };
    });

    const discountUsd = Math.round((subtotalUsd * tier.discountPct) / 100);
    const conciergeFeeUsd = state.venueMode === 'concierge'
      ? (tier.freeConcierge ? 0 : CONCIERGE_BASE_USD)
      : 0;
    const membershipFeeUsd = state.includeMembershipFee ? tier.annualUsd : 0;
    const grandTotalUsd = Math.max(0, subtotalUsd - discountUsd) + conciergeFeeUsd + membershipFeeUsd;

    return {
      tier,
      activeDays,
      dayBreakdowns,
      totalRituals,
      totalMinutes,
      subtotalUsd,
      discountUsd,
      conciergeFeeUsd,
      membershipFeeUsd,
      grandTotalUsd,
    };
  }

  function renderCurrencyButtons() {
    document.querySelectorAll('#vip-curr-switch .v-curr-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.curr === state.currency);
    });
  }

  function renderPresets() {
    const wrap = document.getElementById('vip-preset-pills');
    if (!wrap) return;

    const packageNames = (DATA.packages || []).map(p => p.name);
    const presetList = packageNames.length > 0 ? packageNames : Object.keys(PRESET_TEMPLATES);

    wrap.innerHTML = presetList.map(name => `
      <button type="button" class="preset-btn ${state.activePreset === name ? 'is-active' : ''}" data-preset="${name}">
        ${name}
      </button>
    `).join('');
  }

  function renderDayBuilder() {
    const daysStrip = document.getElementById('vip-days-strip');
    const periodPills = document.getElementById('vip-period-pills');
    const ritualsGrid = document.getElementById('vip-rituals-grid');
    const activeSummary = document.getElementById('vip-active-day-summary');

    const currentDayObj = state.schedule.find(d => d.day === state.activeDay) || state.schedule[0];

    if (activeSummary) {
      const count = currentDayObj.rituals.length;
      activeSummary.textContent = `اليوم ${currentDayObj.day} · ${count} ${count === 1 ? 'طقس' : 'طقوس'}`;
    }

    if (daysStrip) {
      daysStrip.innerHTML = state.schedule.map(d => `
        <button type="button" class="day-tab ${d.day === state.activeDay ? 'is-active' : ''}" data-day="${d.day}">
          <strong>اليوم ${d.day}</strong>
          <small class="font-tech">${d.rituals.length} طقوس</small>
        </button>
      `).join('');
    }

    if (periodPills) {
      periodPills.innerHTML = PERIOD_OPTIONS.map(period => `
        <button type="button" class="period-btn ${currentDayObj.period === period ? 'is-active' : ''}" data-period="${period}">
          ${period}
        </button>
      `).join('');
    }

    if (ritualsGrid) {
      ritualsGrid.innerHTML = DAILY_RITUALS.map(ritual => {
        const enabled = currentDayObj.rituals.includes(ritual.id);
        return `
          <button type="button" class="ritual-toggle-card ${enabled ? 'is-enabled' : ''}" data-ritual-id="${ritual.id}">
            <div class="rt-top">
              <span class="rt-cat">${ritual.cat}</span>
              <span class="rt-state">${enabled ? 'مفعّل باليوم' : 'إضافة لليوم'}</span>
            </div>
            <strong>${ritual.title}</strong>
            <p>${ritual.desc}</p>
            <div class="rt-bottom font-tech">
              <span>${ritual.minutes} دقيقة</span>
              <span>${formatMoney(ritual.priceUsd)}</span>
            </div>
          </button>
        `;
      }).join('');
    }
  }

  function renderMatrix() {
    const grid = document.getElementById('vip-matrix-grid');
    if (!grid) return;

    grid.innerHTML = state.schedule.map(d => {
      const items = d.rituals.map(id => DAILY_RITUALS.find(r => r.id === id)).filter(Boolean);
      const isEditing = d.day === state.activeDay;
      return `
        <div class="matrix-day-row ${isEditing ? 'is-editing' : ''}">
          <div class="matrix-day-info">
            <strong>${d.title} &middot; <span class="font-tech">${d.period}</span></strong>
            <div class="matrix-day-tags">
              ${items.length > 0
                ? items.map(r => `<span class="matrix-tag">${r.title.split(' ').slice(0, 3).join(' ')}</span>`).join('')
                : '<span class="matrix-empty-note">يوم راحة حر (بدون طقوس مضافة)</span>'}
            </div>
          </div>
          <div class="matrix-day-actions">
            <button type="button" class="btn-edit-day" data-jump-day="${d.day}">تعديل اليوم</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderMemberships() {
    const grid = document.getElementById('vip-membership-grid');
    if (!grid) return;

    grid.innerHTML = MEMBERSHIPS.map(tier => {
      const selected = tier.id === state.membershipId;
      return `
        <button type="button" class="tier-card ${selected ? 'is-selected' : ''}" data-tier-id="${tier.id}">
          <div>
            <span class="tier-en font-serif-en">${tier.en}</span>
            <h4>${tier.ar}</h4>
            <div class="tier-price font-tech">${formatMoney(tier.annualUsd)} <small>/ سنوياً</small></div>
            <ul class="tier-perks">
              ${tier.perks.map(p => `<li>- ${p}</li>`).join('')}
            </ul>
          </div>
          <div class="tier-badge-select">${selected ? 'الباقة المختارة حالياً' : `اختيار ${tier.en}`}</div>
        </button>
      `;
    }).join('');
  }

  function renderConcierge() {
    const statusBadge = document.getElementById('vip-concierge-status');
    const detailsBox = document.getElementById('vip-concierge-details');
    const feeNote = document.getElementById('vip-concierge-fee-note');
    const tier = getActiveMembership();

    document.querySelectorAll('#vip-concierge-switch .venue-btn').forEach(btn => {
      btn.classList.toggle('is-selected', btn.dataset.venue === state.venueMode);
    });

    if (detailsBox) {
      detailsBox.hidden = state.venueMode !== 'concierge';
    }

    if (statusBadge) {
      statusBadge.textContent = state.venueMode === 'concierge'
        ? 'كونسيرج المنزل / الفندق'
        : 'الجناح الملكي بدار نورة';
    }

    if (feeNote) {
      feeNote.textContent = tier.freeConcierge
        ? `خدمة الكونسيرج المتنقل مشمولة مجاناً (0 رسوم) ضمن عضوية ${tier.en}.`
        : `رسوم انتقال طاقم الكونسيرج وتجهيزاته: ${formatMoney(CONCIERGE_BASE_USD)} (تُعفى مجاناً مع Diamond Bridal).`;
    }
  }

  function renderDossierSummary() {
    const m = computeProgramMetrics();
    const venueAddress = document.getElementById('vip-venue-address')?.value.trim();
    const companions = document.getElementById('vip-companions-count')?.value || 'العروس فقط';

    const elDays = document.getElementById('sum-vip-days');
    const elRituals = document.getElementById('sum-vip-rituals');
    const elTier = document.getElementById('sum-vip-tier');
    const elVenue = document.getElementById('sum-vip-venue');
    const elSub = document.getElementById('sum-vip-subtotal');
    const elDisc = document.getElementById('sum-vip-discount');
    const elExtras = document.getElementById('sum-vip-extras');
    const elTotal = document.getElementById('sum-vip-total');
    const elMulti = document.getElementById('vip-multi-curr-banner');
    const fabWa = document.getElementById('vip-fab-wa');

    if (elDays) elDays.textContent = `${m.activeDays.length} من 7 أيام`;
    if (elRituals) elRituals.textContent = `${m.totalRituals} طقوس · ${formatHours(m.totalMinutes)}`;
    if (elTier) elTier.textContent = `${m.tier.en} (${m.tier.ar} - ${m.tier.discountPct}%)`;
    if (elVenue) {
      elVenue.textContent = state.venueMode === 'concierge'
        ? `كونسيرج خاص${venueAddress ? ' (' + venueAddress + ')' : ''} · ${companions}`
        : 'الجناح الملكي بدار نورة';
    }
    if (elSub) elSub.textContent = formatMoney(m.subtotalUsd);
    if (elDisc) elDisc.textContent = `- ${formatMoney(m.discountUsd)} (${m.tier.discountPct}%)`;

    const extraSum = m.conciergeFeeUsd + m.membershipFeeUsd;
    if (elExtras) {
      if (state.venueMode === 'concierge' && m.tier.freeConcierge && !state.includeMembershipFee) {
        elExtras.textContent = 'مجاناً (امتياز Diamond)';
      } else {
        elExtras.textContent = formatMoney(extraSum);
      }
    }

    if (elTotal) elTotal.textContent = `${formatMoney(m.grandTotalUsd)} (${state.currency})`;
    if (elMulti) {
      elMulti.textContent = `${formatMoney(m.grandTotalUsd, 'USD')} · ${formatMoney(m.grandTotalUsd, 'SAR')} · ${formatMoney(m.grandTotalUsd, 'YER')}`;
    }

    if (fabWa) {
      const quickMsg = `أهلاً ${CFG.salonName}، أستفسر عن برنامج العروس الملكي — الفئة الملكية VIP.`;
      fabWa.href = `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(quickMsg)}`;
    }
  }

  function renderSuitesFromBaseData() {
    const svcGrid = document.getElementById('vip-base-services');
    const pkgGrid = document.getElementById('vip-base-packages');

    if (svcGrid) {
      svcGrid.innerHTML = (DATA.services || []).map(svc => `
        <article class="vip-svc-card">
          <div class="vip-svc-img">
            <img src="${resolveRelativeImage(svc.image)}" alt="${svc.title}" loading="lazy">
            <span class="vip-svc-badge">${svc.badge}</span>
          </div>
          <div class="vip-svc-body">
            <small class="font-tech">مدة الجلسة: ${svc.duration}</small>
            <h3>${svc.title}</h3>
            <p>${svc.desc}</p>
          </div>
        </article>
      `).join('');
    }

    if (pkgGrid) {
      pkgGrid.innerHTML = (DATA.packages || []).map(pkg => `
        <article class="vip-pkg-card">
          <div>
            <span>${pkg.note}</span>
            <h3>${pkg.name}</h3>
            <p>${pkg.items}</p>
          </div>
          <button type="button" class="vip-pkg-btn" data-suite-preset="${pkg.name}">تطبيق في مصمم 7 أيام</button>
        </article>
      `).join('');
    }
  }

  function populateModal() {
    const m = computeProgramMetrics();
    const brideName = document.getElementById('vip-bride-name')?.value.trim() || 'ضيفة الملاذ الملكي';
    const eventDate = document.getElementById('vip-event-date')?.value.trim() || 'يُحدد بالتنسيق المباشر';
    const venueAddress = document.getElementById('vip-venue-address')?.value.trim();
    const companions = document.getElementById('vip-companions-count')?.value || 'العروس فقط';

    const refEl = document.getElementById('modal-dossier-ref');
    const brideEl = document.getElementById('modal-bride-name');
    const dateEl = document.getElementById('modal-event-date');
    const tierEl = document.getElementById('modal-membership-tier');
    const venueEl = document.getElementById('modal-venue-mode');
    const tbody = document.getElementById('modal-schedule-tbody');
    const subEl = document.getElementById('modal-subtotal');
    const discEl = document.getElementById('modal-discount');
    const extEl = document.getElementById('modal-extras');
    const grandEl = document.getElementById('modal-grand-total');
    const multiEl = document.getElementById('modal-multi-currencies');

    if (refEl) refEl.textContent = `DN-VIP-2026-${String(m.totalRituals).padStart(2, '0')}`;
    if (brideEl) brideEl.textContent = brideName;
    if (dateEl) dateEl.textContent = eventDate;
    if (tierEl) tierEl.textContent = `${m.tier.en} (${m.tier.ar})`;
    if (venueEl) {
      venueEl.textContent = state.venueMode === 'concierge'
        ? `كونسيرج المنزل/الفندق${venueAddress ? ' — ' + venueAddress : ''} (${companions})`
        : 'الجناح الملكي في دار نورة';
    }

    if (tbody) {
      if (m.dayBreakdowns.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">لم يتم تفعيل طقوس بعد في أيام البرنامج السبعة.</td></tr>';
      } else {
        tbody.innerHTML = m.dayBreakdowns.map(d => `
          <tr>
            <td><strong>${d.title}</strong></td>
            <td class="font-tech">${d.period}</td>
            <td>${d.items.map(r => r.title).join(' + ')}</td>
            <td class="font-tech">${d.dayMins} دقيقة</td>
            <td class="font-tech">${formatMoney(d.dayUsd)}</td>
          </tr>
        `).join('');
      }
    }

    if (subEl) subEl.textContent = formatMoney(m.subtotalUsd);
    if (discEl) discEl.textContent = `- ${formatMoney(m.discountUsd)} (${m.tier.discountPct}%)`;
    if (extEl) extEl.textContent = formatMoney(m.conciergeFeeUsd + m.membershipFeeUsd);
    if (grandEl) grandEl.textContent = `${formatMoney(m.grandTotalUsd)} (${state.currency})`;
    if (multiEl) {
      multiEl.textContent = `${formatMoney(m.grandTotalUsd, 'USD')} | ${formatMoney(m.grandTotalUsd, 'SAR')} | ${formatMoney(m.grandTotalUsd, 'YER')}`;
    }
  }

  function buildRoyalWhatsappText() {
    const m = computeProgramMetrics();
    const brideName = document.getElementById('vip-bride-name')?.value.trim() || 'غير محدد';
    const bridePhone = document.getElementById('vip-bride-phone')?.value.trim() || 'غير محدد';
    const eventDate = document.getElementById('vip-event-date')?.value.trim() || 'غير محدد';
    const venueAddress = document.getElementById('vip-venue-address')?.value.trim() || 'يُحدد لاحقاً';
    const companions = document.getElementById('vip-companions-count')?.value || 'العروس فقط';

    const venueDesc = state.venueMode === 'concierge'
      ? `خدمة الكونسيرج الخاصة (المنزل / الفندق: ${venueAddress} | ${companions})`
      : 'الجناح الملكي في دار نورة (Maison Private Suite)';

    const scheduleLines = m.dayBreakdowns.length > 0
      ? m.dayBreakdowns.map(d => `- ${d.title} [${d.period}]: ${d.items.map(r => r.title).join(' + ')} (${d.dayMins} د)`).join('\n')
      : 'لم يتم تحديد طقوس يومية بعد.';

    return [
      `*ملف برنامج العروس والملاذ الملكي — ${CFG.salonName}*`,
      `التصنيف: الفئة الملكية VIP`,
      `--------------------------------`,
      `الاسم: ${brideName}`,
      `الجوال: ${bridePhone}`,
      `تاريخ المناسبة / البدء: ${eventDate}`,
      `باقة العضوية السنوية: ${m.tier.en} (${m.tier.ar} - خصم ${m.tier.discountPct}%)`,
      `احتساب رسم العضوية السنوية: ${state.includeMembershipFee ? 'نعم (' + formatMoney(m.tier.annualUsd) + ')' : 'تطبيق امتياز الخصم فقط'}`,
      `مقر التنفيذ: ${venueDesc}`,
      `--------------------------------`,
      `جدول الأيام (${m.activeDays.length} أيام نشطة | ${m.totalRituals} طقوس):`,
      scheduleLines,
      `--------------------------------`,
      `قيمة الطقوس: ${formatMoney(m.subtotalUsd)}`,
      `خصم العضوية: - ${formatMoney(m.discountUsd)}`,
      `الإجمالي النهائي (${state.currency}): ${formatMoney(m.grandTotalUsd)}`,
      `المقابل بالعملات: ${formatMoney(m.grandTotalUsd, 'USD')} | ${formatMoney(m.grandTotalUsd, 'SAR')} | ${formatMoney(m.grandTotalUsd, 'YER')}`,
    ].join('\n');
  }

  function openModal() {
    const modal = document.getElementById('vip-schedule-modal');
    if (!modal) return;
    populateModal();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('vip-schedule-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function copyItinerary(labelId) {
    const text = buildRoyalWhatsappText();
    const labelEl = document.getElementById(labelId);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (labelEl) {
          const orig = labelEl.textContent;
          labelEl.textContent = 'تم نسخ الجدول الملكي';
          setTimeout(() => { labelEl.textContent = orig; }, 2400);
        }
      });
    }
  }

  function dispatchWhatsapp() {
    const text = buildRoyalWhatsappText();
    window.open(`https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  function renderAll() {
    renderCurrencyButtons();
    renderPresets();
    renderDayBuilder();
    renderMatrix();
    renderMemberships();
    renderConcierge();
    renderDossierSummary();
    populateModal();
  }

  function applyPreset(name) {
    const map = PRESET_TEMPLATES[name];
    if (!map) return;
    state.activePreset = name;
    state.schedule = createEmptyOrPresetSchedule(map);
    const firstActive = state.schedule.find(d => d.rituals.length > 0);
    state.activeDay = firstActive ? firstActive.day : 1;
    renderAll();
  }

  function bindEvents() {
    const salonInline = document.getElementById('vip-salon-inline');
    if (salonInline && CFG.salonName) {
      salonInline.textContent = CFG.salonName;
    }

    document.getElementById('vip-curr-switch')?.addEventListener('click', e => {
      const btn = e.target.closest('.v-curr-btn');
      if (!btn || !btn.dataset.curr) return;
      state.currency = btn.dataset.curr;
      renderAll();
    });

    document.getElementById('vip-preset-pills')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-preset]');
      if (!btn) return;
      applyPreset(btn.dataset.preset);
    });

    document.getElementById('vip-base-packages')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-suite-preset]');
      if (!btn) return;
      applyPreset(btn.dataset.suitePreset);
      document.getElementById('bridal-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('vip-days-strip')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-day]');
      if (!btn) return;
      state.activeDay = Number(btn.dataset.day);
      renderDayBuilder();
      renderMatrix();
    });

    document.getElementById('vip-period-pills')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-period]');
      if (!btn) return;
      const dayObj = state.schedule.find(d => d.day === state.activeDay);
      if (dayObj) {
        dayObj.period = btn.dataset.period;
        renderAll();
      }
    });

    document.getElementById('vip-rituals-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-ritual-id]');
      if (!btn) return;
      const id = btn.dataset.ritualId;
      const dayObj = state.schedule.find(d => d.day === state.activeDay);
      if (!dayObj) return;
      if (dayObj.rituals.includes(id)) {
        dayObj.rituals = dayObj.rituals.filter(r => r !== id);
      } else {
        dayObj.rituals = [...dayObj.rituals, id];
      }
      state.activePreset = '';
      renderAll();
    });

    document.getElementById('vip-matrix-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-jump-day]');
      if (!btn) return;
      state.activeDay = Number(btn.dataset.jumpDay);
      renderDayBuilder();
      renderMatrix();
      document.getElementById('vip-days-strip')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    document.getElementById('vip-reset-program')?.addEventListener('click', () => {
      applyPreset('باقة العروس الملكية');
    });

    document.getElementById('vip-membership-grid')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-tier-id]');
      if (!btn) return;
      state.membershipId = btn.dataset.tierId;
      renderAll();
    });

    document.getElementById('vip-include-membership-fee')?.addEventListener('change', e => {
      state.includeMembershipFee = Boolean(e.target.checked);
      renderAll();
    });

    document.getElementById('vip-concierge-switch')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-venue]');
      if (!btn) return;
      state.venueMode = btn.dataset.venue;
      renderAll();
    });

    ['vip-venue-address', 'vip-companions-count', 'vip-bride-name', 'vip-bride-phone', 'vip-event-date'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => {
        renderDossierSummary();
        populateModal();
      });
      document.getElementById(id)?.addEventListener('change', () => {
        renderDossierSummary();
        populateModal();
      });
    });

    ['vip-open-modal-top', 'vip-open-modal-hero', 'vip-open-modal-dossier', 'vip-fab-modal-btn'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', openModal);
    });

    document.getElementById('vip-modal-close')?.addEventListener('click', closeModal);
    document.getElementById('vip-schedule-modal')?.addEventListener('click', e => {
      if (e.target.id === 'vip-schedule-modal') closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    document.getElementById('vip-modal-print')?.addEventListener('click', () => {
      populateModal();
      window.print();
    });

    document.getElementById('vip-copy-direct')?.addEventListener('click', () => copyItinerary('vip-copy-direct-label'));
    document.getElementById('vip-modal-copy')?.addEventListener('click', () => copyItinerary('vip-modal-copy-label'));
    document.getElementById('vip-wa-dispatch-direct')?.addEventListener('click', dispatchWhatsapp);
    document.getElementById('vip-modal-wa')?.addEventListener('click', dispatchWhatsapp);

    const menuBtn = document.getElementById('vip-menu-btn');
    const drawer = document.getElementById('vip-mobile-drawer');
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
    renderSuitesFromBaseData();
    bindEvents();
    renderAll();
  });
})();
