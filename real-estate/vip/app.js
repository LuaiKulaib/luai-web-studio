/* ==========================================================================
   app.js — VIP Tier ($250) Ultra-Private Sovereign Concierge
   Al-Sahab Developments (إعمار السحاب العقارية — أفق السحاب ريزيدنس)
   ========================================================================== */
'use strict';

(function () {
  if (typeof ESTATE_CONFIG === 'undefined' || typeof ESTATE_DATA === 'undefined') {
    return;
  }

  const MARBLE_PALETTES = {
    calacatta: {
      name: 'Calacatta Gold',
      arName: 'رخام كلكتا الذهبي الإيطالي',
      pctAdd: 0,
      img: '../assets/images/interior.jpg',
      tag: 'CALACATTA GOLD EDITION',
      desc: 'تناغم الرخام الأبيض العاجي بعروق ذهبية ناعمة مع إنارة معمارية دافئة ونحاس مصقول.',
    },
    marquina: {
      name: 'Nero Marquina',
      arName: 'رخام نيرو ماركينا الأسود الملكي',
      pctAdd: 0.025,
      img: '../assets/images/finishing.jpg',
      tag: 'NERO MARQUINA SOVEREIGN EDITION',
      desc: 'رخام داكن عميق بعروق بيضاء حادة يمنح الصالات حضوراً ليلياً مهيباً وفخامة استثنائية.',
    },
    travertine: {
      name: 'Warm Travertine',
      arName: 'ترافرتين روماني دافئ غير لامع',
      pctAdd: 0.015,
      img: '../assets/images/villa.jpg',
      tag: 'WARM TRAVERTINE ARCHITECTURAL',
      desc: 'ملمس حجري طبيعي مطفي مع خشب البلوط الأوروبي لإحساس منتجعي هادئ ومتصل بالطبيعة.',
    },
  };

  const MASTERPLAN_ZONES = {
    lagoon: {
      title: 'البحيرة الكريستالية ومسابح الإنفينيتي',
      desc: 'مسطحات مائية بإدارة فندقية على مدار العام تحيط بالفلل والمساكن الرئيسية مع شاطئ رملي خاص.',
    },
    villas: {
      title: 'جناح الفلل الملكية المستقلة والتاون هاوس',
      desc: 'ارتدادات خضراء واسعة ومجالس ضيافة منفصلة تمنح العائلة أقصى درجات الخصوصية والأمان.',
    },
    towers: {
      title: 'أبراج البنتهاوس وأجنحة الداون تاون',
      desc: 'مصاعد خاصة سريعة، واجهات زجاجية 270 درجة، ومسابح سماوية مطلّة على الأفق.',
    },
    club: {
      title: 'الممشى الأخضر 4 كم والنادي الصحي البوتيك',
      desc: 'أكثر من 45% مساحات خضراء متصلة بنادٍ صحي، سبا متكامل، ومطاعم بوتيك منتقاة.',
    },
  };

  const UPGRADE_LABELS = {
    knx: 'نظام KNX الذكي',
    kitchen: 'مطبخ إيطالي مدمج',
    pool: 'تدفئة وتبريد المسبح',
    acoustic: 'تنقية الهواء والعزل الصوتي',
  };

  const state = {
    currency: 'sar',
    selectedUnitId: ESTATE_DATA.units[0].id,
    strategy: 'long-term', // 'long-term' | 'holiday-home'
    years: 5,
    appreciationPct: 8.0,
    baseYieldPct: 8.4,
    marble: 'calacatta',
    selectedUpgrades: ['knx'],
    upgradesSarTotal: 85000,
    customTotalSar: 0,
    lastNetReturnFmt: '',
    lastRoiPctText: '',
  };

  const els = {
    currSwitch: document.getElementById('vip-currency-switch'),
    menuBtn: document.getElementById('vip-menu-btn'),
    mobileDrawer: document.getElementById('vip-mobile-drawer'),
    heroSpotlightImg: document.getElementById('hero-spotlight-img'),
    spotlightCode: document.getElementById('spotlight-code'),
    spotlightTitle: document.getElementById('spotlight-title'),
    spotlightThumbs: document.getElementById('spotlight-thumbs'),
    vipHeroStartPrice: document.getElementById('vip-hero-start-price'),
    vipTrackRecord: document.getElementById('vip-track-record'),
    vipUnitSelector: document.getElementById('vip-unit-selector'),
    termUnitImg: document.getElementById('term-unit-img'),
    termUnitTitle: document.getElementById('term-unit-title'),
    termUnitPrice: document.getElementById('term-unit-price'),
    termUnitSubtitle: document.getElementById('term-unit-subtitle'),
    termUnitArea: document.getElementById('term-unit-area'),
    termUnitTerrace: document.getElementById('term-unit-terrace'),
    termUnitRooms: document.getElementById('term-unit-rooms'),
    termUnitParking: document.getElementById('term-unit-parking'),
    strategyToggle: document.getElementById('strategy-toggle'),
    roiYears: document.getElementById('roi-years'),
    roiYearsVal: document.getElementById('roi-years-val'),
    roiAppreciation: document.getElementById('roi-appreciation'),
    roiAppreciationVal: document.getElementById('roi-appreciation-val'),
    roiYield: document.getElementById('roi-yield'),
    roiYieldVal: document.getElementById('roi-yield-val'),
    roiExitValue: document.getElementById('roi-exit-value'),
    roiNetRent: document.getElementById('roi-net-rent'),
    roiCapGain: document.getElementById('roi-cap-gain'),
    roiTotalReturn: document.getElementById('roi-total-return'),
    roiTotalPct: document.getElementById('roi-total-pct'),
    roiSvgChart: document.getElementById('roi-svg-chart'),
    customTotalPrice: document.getElementById('custom-total-price'),
    marbleCards: document.getElementById('marble-cards'),
    upgradesList: document.getElementById('upgrades-list'),
    marblePreviewImg: document.getElementById('marble-preview-img'),
    marblePreviewTag: document.getElementById('marble-preview-tag'),
    marblePreviewDesc: document.getElementById('marble-preview-desc'),
    bespokeDeltaLabel: document.getElementById('bespoke-delta-label'),
    bespokeMilestones: document.getElementById('bespoke-milestones'),
    vipLocationSummary: document.getElementById('vip-location-summary'),
    masterplanCanvas: document.getElementById('masterplan-canvas'),
    masterplanReadout: document.getElementById('masterplan-readout'),
    vipAmenitiesStack: document.getElementById('vip-amenities-stack'),
    vipConnList: document.getElementById('vip-conn-list'),
    dosUnit: document.getElementById('dos-unit'),
    dosMarble: document.getElementById('dos-marble'),
    dosUpgrades: document.getElementById('dos-upgrades'),
    dosTotalPrice: document.getElementById('dos-total-price'),
    dosStrategy: document.getElementById('dos-strategy'),
    dosHorizon: document.getElementById('dos-horizon'),
    dosRoi: document.getElementById('dos-roi'),
    conciergeForm: document.getElementById('concierge-form'),
    vipName: document.getElementById('vip-name'),
    vipPhone: document.getElementById('vip-phone'),
    vipService: document.getElementById('vip-service'),
    vipCity: document.getElementById('vip-city'),
    vipDate: document.getElementById('vip-date'),
    vipTime: document.getElementById('vip-time'),
    vipPickup: document.getElementById('vip-pickup'),
    vipNotes: document.getElementById('vip-notes'),
    vipFeedback: document.getElementById('vip-feedback'),
  };

  function getUnit() {
    return ESTATE_DATA.units.find((u) => u.id === state.selectedUnitId) || ESTATE_DATA.units[0];
  }

  function formatMoney(sarAmount) {
    const rate = ESTATE_CONFIG.rates[state.currency] || ESTATE_CONFIG.rates.sar;
    const val = Math.round(sarAmount * rate.mult);
    const numStr = val.toLocaleString('en-US');
    return rate.code === 'USD' ? '$' + numStr : numStr + ' ' + rate.label;
  }

  function formatCompact(sarAmount) {
    const rate = ESTATE_CONFIG.rates[state.currency] || ESTATE_CONFIG.rates.sar;
    const val = sarAmount * rate.mult;
    if (val >= 1000000) {
      return (val / 1000000).toFixed(2) + 'M ' + (rate.code === 'USD' ? '$' : rate.label);
    }
    return Math.round(val / 1000) + 'K';
  }

  function resolveImage(rel) {
    return rel.startsWith('../') ? rel : '../' + rel.replace(/^\/+/, '');
  }

  function getAmenitySvg(iconName) {
    switch (iconName) {
      case 'water':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>';
      case 'trees':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 22v-7"/><path d="M7 15h10l-3-6h2l-4-6-4 6h2l-3 6z"/></svg>';
      case 'shield':
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z"/></svg>';
      default:
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="8" width="18" height="12"/><path d="M7 8V5a5 5 0 0 1 10 0v3"/></svg>';
    }
  }

  function renderStaticCollections() {
    els.vipTrackRecord.innerHTML = ESTATE_DATA.trackRecord
      .map(
        (t) => `
      <div class="vip-kpi-cell">
        <strong>${t.value}</strong>
        <span>${t.label}</span>
      </div>`
      )
      .join('');

    els.vipLocationSummary.textContent = ESTATE_CONFIG.locationSummary;

    els.vipAmenitiesStack.innerHTML = ESTATE_DATA.amenities
      .map(
        (a) => `
      <article class="vip-amenity-row">
        <div class="vip-amenity-ico">${getAmenitySvg(a.icon)}</div>
        <div>
          <h4>${a.title}</h4>
          <p>${a.desc}</p>
        </div>
      </article>`
      )
      .join('');

    els.vipConnList.innerHTML = ESTATE_DATA.connectivity
      .map(
        (c) => `
      <div class="vip-conn-item">
        <span>${c.place}</span>
        <strong>${c.time}</strong>
      </div>`
      )
      .join('');
  }

  function renderUnitSelectorAndPreview() {
    const minPrice = Math.min(...ESTATE_DATA.units.map((u) => u.priceSar));
    els.vipHeroStartPrice.textContent = formatMoney(minPrice);

    els.vipUnitSelector.innerHTML = ESTATE_DATA.units
      .map((u) => {
        const active = u.id === state.selectedUnitId;
        return `
      <button type="button" class="vip-unit-tab ${active ? 'is-active' : ''}" data-unit="${u.id}" role="tab" aria-selected="${active}">
        <span>${u.tabLabel}</span>
        <strong>${u.title}</strong>
        <em>${formatMoney(u.priceSar)}</em>
      </button>`;
      })
      .join('');

    const unit = getUnit();
    els.termUnitImg.src = resolveImage(unit.image);
    els.termUnitImg.alt = unit.title;
    els.termUnitTitle.textContent = unit.title;
    els.termUnitPrice.textContent = formatMoney(unit.priceSar);
    els.termUnitSubtitle.textContent = unit.subtitle;
    els.termUnitArea.textContent = unit.areaTotal;
    els.termUnitTerrace.textContent = unit.areaTerrace;
    els.termUnitRooms.textContent = unit.rooms;
    els.termUnitParking.textContent = unit.parking;
  }

  function renderRoiTerminal() {
    const unit = getUnit();
    const basePrice = state.customTotalSar > 0 ? state.customTotalSar : unit.priceSar;
    const isHoliday = state.strategy === 'holiday-home';
    const grossYieldPct = isHoliday ? state.baseYieldPct + 2.4 : state.baseYieldPct;
    const mgmtFeeRate = isHoliday ? 0.12 : 0.04;
    const appRate = state.appreciationPct / 100;

    els.roiYearsVal.textContent = state.years + (state.years === 1 ? ' سنة' : ' سنوات');
    els.roiAppreciationVal.textContent = state.appreciationPct.toFixed(1) + '%';
    els.roiYieldVal.textContent =
      state.baseYieldPct.toFixed(1) + '%' + (isHoliday ? ' (+2.4% فندقي)' : '');

    let runningValue = basePrice;
    let cumulativeRent = 0;
    const yearlyPoints = [];

    for (let y = 1; y <= state.years; y += 1) {
      const grossRent = runningValue * (grossYieldPct / 100);
      const netRentYear = grossRent * (1 - mgmtFeeRate);
      cumulativeRent += netRentYear;
      runningValue = runningValue * (1 + appRate);
      yearlyPoints.push({
        year: y,
        value: runningValue,
        rent: cumulativeRent,
      });
    }

    const capGain = runningValue - basePrice;
    const totalNetReturn = capGain + cumulativeRent;
    const totalRoiPct = (totalNetReturn / basePrice) * 100;

    els.roiExitValue.textContent = formatMoney(runningValue);
    els.roiNetRent.textContent = formatMoney(cumulativeRent);
    els.roiCapGain.textContent = formatMoney(capGain);
    state.lastNetReturnFmt = formatMoney(totalNetReturn);
    state.lastRoiPctText = totalRoiPct.toFixed(1) + '%';
    els.roiTotalReturn.textContent = state.lastNetReturnFmt;
    els.roiTotalPct.textContent =
      'ROI: ' + state.lastRoiPctText + ' خلال ' + state.years + ' سنوات';

    // Render SVG Chart
    const svgW = 520;
    const svgH = 170;
    const padX = 28;
    const padTop = 18;
    const padBottom = 28;
    const chartH = svgH - padTop - padBottom;
    const maxVal = Math.max(...yearlyPoints.map((p) => p.value + p.rent)) * 1.05;
    const colW = (svgW - padX * 2) / yearlyPoints.length;

    const barsHtml = yearlyPoints
      .map((pt, i) => {
        const valH = (pt.value / maxVal) * chartH;
        const rentH = (pt.rent / maxVal) * chartH;
        const x = padX + i * colW + colW * 0.18;
        const barW = Math.max(12, colW * 0.64);
        const yVal = padTop + (chartH - valH);
        const yRent = yVal - rentH;
        return `
      <g>
        <rect x="${x.toFixed(1)}" y="${yRent.toFixed(1)}" width="${barW.toFixed(1)}" height="${rentH.toFixed(1)}" fill="#4B5B76" rx="2"/>
        <rect x="${x.toFixed(1)}" y="${yVal.toFixed(1)}" width="${barW.toFixed(1)}" height="${valH.toFixed(1)}" fill="#D4AF63" rx="2"/>
        <text x="${(x + barW / 2).toFixed(1)}" y="${svgH - 8}" text-anchor="middle" fill="#9CA5B4" font-family="Outfit, sans-serif" font-size="10">Y${pt.year}</text>
      </g>`;
      })
      .join('');

    const lastPt = yearlyPoints[yearlyPoints.length - 1];
    els.roiSvgChart.innerHTML = `
      <svg viewBox="0 0 ${svgW} ${svgH}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">
        <line x1="${padX}" y1="${padTop + chartH}" x2="${svgW - padX}" y2="${padTop + chartH}" stroke="rgba(247,244,236,0.16)" stroke-width="1"/>
        ${barsHtml}
        <text x="${svgW - padX}" y="13" text-anchor="end" fill="#EFE0B9" font-family="Outfit, sans-serif" font-size="10.5" font-weight="600">
          ${formatCompact(lastPt.value + lastPt.rent)}
        </text>
      </svg>`;
  }

  function renderCustomizer() {
    const unit = getUnit();
    const palette = MARBLE_PALETTES[state.marble] || MARBLE_PALETTES.calacatta;

    // Update upgrade price labels dynamically in current currency
    els.upgradesList.querySelectorAll('.upgrade-price').forEach((span) => {
      const baseSar = Number(span.dataset.baseSar || 0);
      span.textContent = '+' + formatMoney(baseSar);
    });

    const marbleAddSar = Math.round(unit.priceSar * palette.pctAdd);
    const totalDeltaSar = marbleAddSar + state.upgradesSarTotal;
    state.customTotalSar = unit.priceSar + totalDeltaSar;

    els.customTotalPrice.textContent = formatMoney(state.customTotalSar);
    els.bespokeDeltaLabel.textContent = 'إضافة التخصيص: +' + formatMoney(totalDeltaSar);

    els.marblePreviewImg.src = palette.img;
    els.marblePreviewTag.textContent = palette.tag;
    els.marblePreviewDesc.textContent = palette.desc;

    els.bespokeMilestones.innerHTML = ESTATE_DATA.paymentMilestones
      .map((m) => {
        const amt = state.customTotalSar * (m.pct / 100);
        return `
      <div class="b-milestone-row">
        <span>${m.step} · ${m.title} (${m.pct}%)</span>
        <strong>${formatMoney(amt)}</strong>
      </div>`;
      })
      .join('');
  }

  function renderInvestorDossier() {
    const unit = getUnit();
    const palette = MARBLE_PALETTES[state.marble] || MARBLE_PALETTES.calacatta;
    const upgradeNames = state.selectedUpgrades.length
      ? state.selectedUpgrades.map((k) => UPGRADE_LABELS[k]).join(' + ')
      : 'الباقة القياسية';

    els.dosUnit.textContent = unit.title;
    els.dosMarble.textContent = palette.name + ' (' + palette.arName + ')';
    els.dosUpgrades.textContent = upgradeNames;
    els.dosTotalPrice.textContent = formatMoney(state.customTotalSar);
    els.dosStrategy.textContent =
      state.strategy === 'holiday-home'
        ? 'بيوت عطلات وإدارة فندقية'
        : 'إيجار طويل الأمد';
    els.dosHorizon.textContent = state.years + ' سنوات · نمو ' + state.appreciationPct.toFixed(1) + '%';
    els.dosRoi.textContent = state.lastNetReturnFmt + ' (' + state.lastRoiPctText + ')';
  }

  function refreshAll() {
    renderUnitSelectorAndPreview();
    renderCustomizer();
    renderRoiTerminal();
    renderInvestorDossier();
  }

  function syncUpgradesState() {
    const checked = Array.from(
      els.upgradesList.querySelectorAll('input[type="checkbox"]:checked')
    );
    state.selectedUpgrades = checked.map((cb) => cb.value);
    state.upgradesSarTotal = checked.reduce(
      (sum, cb) => sum + Number(cb.dataset.sar || 0),
      0
    );
  }

  function bindEvents() {
    // Mobile nav
    els.menuBtn.addEventListener('click', () => {
      const isHidden = els.mobileDrawer.hidden;
      els.mobileDrawer.hidden = !isHidden;
      els.menuBtn.setAttribute('aria-expanded', String(isHidden));
    });

    els.mobileDrawer.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        els.mobileDrawer.hidden = true;
        els.menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Currency switcher
    els.currSwitch.addEventListener('click', (e) => {
      const btn = e.target.closest('.v-curr-btn');
      if (!btn) return;
      state.currency = btn.dataset.curr;
      els.currSwitch.querySelectorAll('.v-curr-btn').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });
      refreshAll();
    });

    // Hero Gallery Spotlight
    els.spotlightThumbs.addEventListener('click', (e) => {
      const btn = e.target.closest('.thumb-btn');
      if (!btn) return;
      els.spotlightThumbs.querySelectorAll('.thumb-btn').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });
      els.heroSpotlightImg.src = btn.dataset.img;
      els.spotlightTitle.textContent = btn.dataset.title;
      els.spotlightCode.textContent = btn.dataset.code;
    });

    // Unit selector tabs
    els.vipUnitSelector.addEventListener('click', (e) => {
      const tab = e.target.closest('.vip-unit-tab');
      if (!tab) return;
      state.selectedUnitId = tab.dataset.unit;
      refreshAll();
    });

    // Strategy toggle
    els.strategyToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.strat-btn');
      if (!btn) return;
      state.strategy = btn.dataset.strategy;
      els.strategyToggle.querySelectorAll('.strat-btn').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });
      renderRoiTerminal();
      renderInvestorDossier();
    });

    // ROI sliders
    els.roiYears.addEventListener('input', () => {
      state.years = Number(els.roiYears.value);
      renderRoiTerminal();
      renderInvestorDossier();
    });
    els.roiAppreciation.addEventListener('input', () => {
      state.appreciationPct = Number(els.roiAppreciation.value);
      renderRoiTerminal();
      renderInvestorDossier();
    });
    els.roiYield.addEventListener('input', () => {
      state.baseYieldPct = Number(els.roiYield.value);
      renderRoiTerminal();
      renderInvestorDossier();
    });

    // Marble palette cards
    els.marbleCards.addEventListener('click', (e) => {
      const card = e.target.closest('.marble-card');
      if (!card) return;
      state.marble = card.dataset.marble;
      els.marbleCards.querySelectorAll('.marble-card').forEach((c) => {
        c.classList.toggle('is-active', c === card);
      });
      renderCustomizer();
      renderRoiTerminal();
      renderInvestorDossier();
    });

    // Smart Home upgrades
    els.upgradesList.addEventListener('change', () => {
      syncUpgradesState();
      renderCustomizer();
      renderRoiTerminal();
      renderInvestorDossier();
    });

    // Masterplan interactive SVG zones
    els.masterplanCanvas.addEventListener('click', (e) => {
      const zone = e.target.closest('.mp-zone');
      if (!zone) return;
      const info = MASTERPLAN_ZONES[zone.dataset.zone];
      if (!info) return;
      els.masterplanCanvas.querySelectorAll('.mp-zone').forEach((z) => {
        z.classList.toggle('is-active', z === zone);
      });
      els.masterplanReadout.innerHTML = `<strong>${info.title}</strong><span>${info.desc}</span>`;
    });

    // Concierge Form -> WhatsApp Investor Brief
    els.conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = els.vipName.value.trim();
      const phone = els.vipPhone.value.trim();

      if (!name || !phone) {
        els.vipFeedback.textContent = 'يرجى إدخال اسم المستثمر ورقم الهاتف المباشر لتأكيد حجز الديوان الخاص.';
        els.vipFeedback.className = 'vip-feedback is-error';
        return;
      }

      const unit = getUnit();
      const palette = MARBLE_PALETTES[state.marble] || MARBLE_PALETTES.calacatta;
      const rateCode = ESTATE_CONFIG.rates[state.currency].code;
      const upgradesText = state.selectedUpgrades.length
        ? state.selectedUpgrades.map((k) => UPGRADE_LABELS[k]).join('، ')
        : 'بدون إضافات';
      const stratText =
        state.strategy === 'holiday-home'
          ? 'بيوت عطلات وإدارة فندقية'
          : 'إيجار طويل الأمد';

      const briefLines = [
        'ملف مستثمر تنفيذي وجدولة ديوان خاص — الفئة الملكية VIP',
        'المشروع: ' + ESTATE_CONFIG.projectTitle + ' (' + ESTATE_CONFIG.developerName + ')',
        'المستثمر: ' + name,
        'الهاتف المباشر: ' + phone,
        'الأصل العقاري: ' + unit.title,
        'لوحة الرخام: ' + palette.name + ' (' + palette.arName + ')',
        'الحزم الذكية: ' + upgradesText,
        'القيمة المخصصة (' + rateCode + '): ' + formatMoney(state.customTotalSar),
        'توقعات ROI (' + state.years + ' سنوات / ' + stratText + '): عائد صافي ' + state.lastNetReturnFmt + ' (' + state.lastRoiPctText + ')',
        'الخدمة المطلوبة: ' + els.vipService.value,
        'المدينة: ' + els.vipCity.value,
        'التاريخ والفترة: ' + (els.vipDate.value || 'مرن') + ' · ' + els.vipTime.value,
        'نقطة الانطلاق / التوصيل: ' + (els.vipPickup.value.trim() || 'سيتم التحديد مع الكونسيرج'),
        'ملاحظات: ' + (els.vipNotes.value.trim() || 'لا توجد'),
      ];

      const waUrl =
        'https://wa.me/' +
        ESTATE_CONFIG.whatsappNumber +
        '?text=' +
        encodeURIComponent(briefLines.join('\n'));

      els.vipFeedback.textContent =
        'تم إعداد الملف التنفيذي بنجاح وجاري توجيهك إلى مكتب الكونسيرج الخاص عبر واتساب.';
      els.vipFeedback.className = 'vip-feedback is-success';
      window.open(waUrl, '_blank', 'noopener');
    });
  }

  function init() {
    renderStaticCollections();
    syncUpgradesState();
    refreshAll();
    bindEvents();
  }

  init();
})();
