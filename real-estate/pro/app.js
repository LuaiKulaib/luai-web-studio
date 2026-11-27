/* ==========================================================================
   app.js — Pro Tier ($120) Architectural Gallery Minimalism
   Al-Sahab Developments (إعمار السحاب العقارية — أفق السحاب ريزيدنس)
   ========================================================================== */
'use strict';

(function () {
  if (typeof ESTATE_CONFIG === 'undefined' || typeof ESTATE_DATA === 'undefined') {
    return;
  }

  const state = {
    currency: 'sar',
    selectedUnitId: ESTATE_DATA.units[0].id,
    modalUnitId: ESTATE_DATA.units[0].id,
    downPct: 60,
    years: 20,
    rate: 4.5,
    lastMonthlyFmt: '',
  };

  const els = {
    currencySwitch: document.getElementById('currency-switch'),
    heroStartPrice: document.getElementById('hero-start-price'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    trackRecordGrid: document.getElementById('track-record-grid'),
    galleryFilters: document.getElementById('gallery-filters'),
    curatedGrid: document.getElementById('curated-grid'),
    residencesGrid: document.getElementById('residences-grid'),
    activeUnitBadge: document.getElementById('active-unit-badge'),
    amenitiesList: document.getElementById('amenities-list'),
    connectivityList: document.getElementById('connectivity-list'),
    locationSummaryText: document.getElementById('location-summary-text'),
    paymentUnitSelect: document.getElementById('payment-unit-select'),
    simUnitPrice: document.getElementById('sim-unit-price'),
    simQuarterlyAmount: document.getElementById('sim-quarterly-amount'),
    milestonesStack: document.getElementById('milestones-stack'),
    simDownPct: document.getElementById('sim-down-pct'),
    simDownPctVal: document.getElementById('sim-down-pct-val'),
    simYears: document.getElementById('sim-years'),
    simYearsVal: document.getElementById('sim-years-val'),
    simRate: document.getElementById('sim-rate'),
    simRateVal: document.getElementById('sim-rate-val'),
    simDownAmount: document.getElementById('sim-down-amount'),
    simLoanAmount: document.getElementById('sim-loan-amount'),
    simMonthlyPayment: document.getElementById('sim-monthly-payment'),
    formSummaryUnit: document.getElementById('form-summary-unit'),
    formSummaryPrice: document.getElementById('form-summary-price'),
    formSummaryMonthly: document.getElementById('form-summary-monthly'),
    viewingForm: document.getElementById('viewing-form'),
    leadName: document.getElementById('lead-name'),
    leadPhone: document.getElementById('lead-phone'),
    leadUnit: document.getElementById('lead-unit'),
    leadVisitType: document.getElementById('lead-visit-type'),
    leadCity: document.getElementById('lead-city'),
    leadDate: document.getElementById('lead-date'),
    leadNotes: document.getElementById('lead-notes'),
    formFeedback: document.getElementById('form-feedback'),
    floorplanModal: document.getElementById('floorplan-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalUnitTitle: document.getElementById('modal-unit-title'),
    modalAreaBadge: document.getElementById('modal-area-badge'),
    modalBlueprintSvg: document.getElementById('modal-blueprint-svg'),
    modalRoomReadout: document.getElementById('modal-room-readout'),
    modalUnitPrice: document.getElementById('modal-unit-price'),
    modalUnitSpecs: document.getElementById('modal-unit-specs'),
    modalSelectUnitBtn: document.getElementById('modal-select-unit-btn'),
  };

  function getUnitById(id) {
    return ESTATE_DATA.units.find((u) => u.id === id) || ESTATE_DATA.units[0];
  }

  function formatPrice(sarValue) {
    const rateObj = ESTATE_CONFIG.rates[state.currency] || ESTATE_CONFIG.rates.sar;
    const converted = Math.round(sarValue * rateObj.mult);
    const formatted = converted.toLocaleString('en-US');
    return rateObj.code === 'USD' ? '$' + formatted : formatted + ' ' + rateObj.label;
  }

  function resolveImagePath(relPath) {
    if (relPath.startsWith('../')) return relPath;
    return '../' + relPath.replace(/^\/+/, '');
  }

  function getAmenitySvg(iconName) {
    switch (iconName) {
      case 'water':
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M12 3v5"/></svg>';
      case 'trees':
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 22v-7"/><path d="M7 15h10l-3-6h2l-4-6-4 6h2l-3 6z"/></svg>';
      case 'shield':
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z"/></svg>';
      default:
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="8" width="18" height="12"/><path d="M7 8V5a5 5 0 0 1 10 0v3"/></svg>';
    }
  }

  function renderTrackRecord() {
    els.trackRecordGrid.innerHTML = ESTATE_DATA.trackRecord
      .map(
        (item) => `
      <div class="track-cell">
        <strong>${item.value}</strong>
        <span>${item.label}</span>
      </div>`
      )
      .join('');
  }

  function renderAmenitiesAndConnectivity() {
    if (els.locationSummaryText) {
      els.locationSummaryText.textContent = ESTATE_CONFIG.locationSummary;
    }

    els.amenitiesList.innerHTML = ESTATE_DATA.amenities
      .map(
        (a) => `
      <article class="amenity-card">
        <div class="amenity-icon">${getAmenitySvg(a.icon)}</div>
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
      </article>`
      )
      .join('');

    els.connectivityList.innerHTML = ESTATE_DATA.connectivity
      .map(
        (c) => `
      <div class="conn-item">
        <span class="conn-place">${c.place}</span>
        <strong class="conn-time">${c.time}</strong>
      </div>`
      )
      .join('');
  }

  function populateUnitSelects() {
    const optionsHtml = ESTATE_DATA.units
      .map((u) => `<option value="${u.id}">${u.title}</option>`)
      .join('');
    els.paymentUnitSelect.innerHTML = optionsHtml;
    els.leadUnit.innerHTML = optionsHtml;
    els.paymentUnitSelect.value = state.selectedUnitId;
    els.leadUnit.value = state.selectedUnitId;
  }

  function renderResidences() {
    const minPriceSar = Math.min(...ESTATE_DATA.units.map((u) => u.priceSar));
    els.heroStartPrice.textContent = formatPrice(minPriceSar);

    const activeUnit = getUnitById(state.selectedUnitId);
    els.activeUnitBadge.textContent = activeUnit.title;

    els.residencesGrid.innerHTML = ESTATE_DATA.units
      .map((u) => {
        const isSelected = u.id === state.selectedUnitId;
        return `
      <article class="residence-card ${isSelected ? 'is-selected' : ''}" data-unit-id="${u.id}">
        <div class="residence-media">
          <img src="${resolveImagePath(u.image)}" alt="${u.title}" loading="lazy">
          <span class="residence-tag">${u.tabLabel}</span>
        </div>
        <div class="residence-body">
          <div class="residence-top">
            <h3>${u.title}</h3>
            <span class="residence-price">${formatPrice(u.priceSar)}</span>
          </div>
          <p class="residence-desc">${u.subtitle}</p>
          <div class="residence-specs">
            <div class="spec-row">
              <span>المساحة الإجمالية</span>
              <strong class="num-font">${u.areaTotal}</strong>
            </div>
            <div class="spec-row">
              <span>مساحة التراس / الحديقة</span>
              <strong class="num-font">${u.areaTerrace}</strong>
            </div>
            <div class="spec-row">
              <span>التوزيع الداخلي</span>
              <strong>${u.rooms}</strong>
            </div>
            <div class="spec-row">
              <span>المواقف والخدمات</span>
              <strong>${u.parking}</strong>
            </div>
          </div>
          <div class="residence-actions">
            <button type="button" class="btn-brass-ghost js-open-modal" data-unit="${u.id}">
              <span>معاينة المخطط والخامات</span>
            </button>
            <button type="button" class="btn-obsidian js-select-unit" data-unit="${u.id}">
              <span>${isSelected ? 'مختارة في السداد' : 'اختيار لخطة السداد'}</span>
            </button>
          </div>
        </div>
      </article>`;
      })
      .join('');
  }

  function renderPaymentAndMortgage() {
    const unit = getUnitById(state.selectedUnitId);
    els.simUnitPrice.textContent = formatPrice(unit.priceSar);
    els.simQuarterlyAmount.textContent = formatPrice(unit.priceSar * 0.05);

    els.milestonesStack.innerHTML = ESTATE_DATA.paymentMilestones
      .map((m) => {
        const amount = unit.priceSar * (m.pct / 100);
        return `
      <div class="milestone-card">
        <div class="milestone-head">
          <span class="milestone-badge">
            <span class="milestone-step">${m.step}</span>
            <span>${m.title} (${m.pct}%)</span>
          </span>
          <strong class="milestone-amount">${formatPrice(amount)}</strong>
        </div>
        <div class="milestone-bar-track">
          <div class="milestone-bar-fill" style="width:${m.pct}%"></div>
        </div>
        <p class="milestone-timing">${m.timing}</p>
      </div>`;
      })
      .join('');

    // Mortgage calculation
    const downAmountSar = unit.priceSar * (state.downPct / 100);
    const loanAmountSar = Math.max(0, unit.priceSar - downAmountSar);
    const monthlyRate = state.rate / 100 / 12;
    const months = state.years * 12;
    let monthlySar = 0;

    if (loanAmountSar > 0 && monthlyRate > 0) {
      const factor = Math.pow(1 + monthlyRate, months);
      monthlySar = (loanAmountSar * (monthlyRate * factor)) / (factor - 1);
    } else if (loanAmountSar > 0) {
      monthlySar = loanAmountSar / months;
    }

    els.simDownPctVal.textContent = state.downPct + '%';
    els.simYearsVal.textContent = state.years + ' سنة';
    els.simRateVal.textContent = state.rate.toFixed(2).replace(/\.00$/, '') + '%';

    els.simDownAmount.textContent = formatPrice(downAmountSar);
    els.simLoanAmount.textContent = formatPrice(loanAmountSar);
    state.lastMonthlyFmt = formatPrice(monthlySar);
    els.simMonthlyPayment.textContent = state.lastMonthlyFmt;

    // Update form summary dossier
    els.formSummaryUnit.textContent = unit.title;
    els.formSummaryPrice.textContent = formatPrice(unit.priceSar);
    els.formSummaryMonthly.textContent =
      state.lastMonthlyFmt + ' (' + state.years + ' سنة)';
  }

  function renderBlueprintModal(unitId) {
    state.modalUnitId = unitId;
    const unit = getUnitById(unitId);
    els.modalUnitTitle.textContent = unit.title;
    els.modalAreaBadge.textContent = unit.areaTotal + ' + ' + unit.areaTerrace + ' تراس';
    els.modalUnitPrice.textContent = formatPrice(unit.priceSar);
    els.modalUnitSpecs.textContent = unit.rooms + ' · ' + unit.parking;

    const rectsHtml = unit.blueprint
      .map((room, idx) => {
        const cx = room.x + room.w / 2;
        const cy = room.y + room.h / 2;
        return `
      <g class="bp-room ${idx === 0 ? 'is-active' : ''}" data-room-idx="${idx}" tabindex="0" role="button" aria-label="${room.label} ${room.dim}">
        <rect x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}" fill="rgba(252,251,248,0.85)" stroke="#181A1F" stroke-width="1.35"/>
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" fill="#181A1F" font-family="Tajawal, sans-serif" font-size="10.5" font-weight="700">${room.label}</text>
        <text x="${cx}" y="${cy + 11}" text-anchor="middle" fill="#A88342" font-family="Outfit, sans-serif" font-size="9.5" font-weight="600">${room.dim}</text>
      </g>`;
      })
      .join('');

    els.modalBlueprintSvg.innerHTML = `
      <svg class="blueprint-svg" viewBox="0 0 300 252" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="archGrid" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(24,26,31,0.08)" stroke-width="0.6"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="300" height="252" fill="url(#archGrid)"/>
        <rect x="6" y="6" width="288" height="240" fill="none" stroke="#A88342" stroke-width="1.2" stroke-dasharray="4 3"/>
        ${rectsHtml}
      </svg>`;

    const firstRoom = unit.blueprint[0];
    els.modalRoomReadout.innerHTML = `<strong>${firstRoom.label}</strong><span class="num-font">${firstRoom.dim}</span>`;
    els.floorplanModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    els.floorplanModal.hidden = true;
    document.body.style.overflow = '';
  }

  function setSelectedUnit(unitId) {
    state.selectedUnitId = unitId;
    els.paymentUnitSelect.value = unitId;
    els.leadUnit.value = unitId;
    renderResidences();
    renderPaymentAndMortgage();
  }

  function bindEvents() {
    // Mobile menu
    els.mobileMenuBtn.addEventListener('click', () => {
      const isHidden = els.mobileDrawer.hidden;
      els.mobileDrawer.hidden = !isHidden;
      els.mobileMenuBtn.setAttribute('aria-expanded', String(isHidden));
    });

    els.mobileDrawer.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        els.mobileDrawer.hidden = true;
        els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Currency switch
    els.currencySwitch.addEventListener('click', (e) => {
      const btn = e.target.closest('.curr-btn');
      if (!btn) return;
      state.currency = btn.dataset.curr;
      els.currencySwitch.querySelectorAll('.curr-btn').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });
      renderResidences();
      renderPaymentAndMortgage();
      if (!els.floorplanModal.hidden) {
        renderBlueprintModal(state.modalUnitId);
      }
    });

    // Gallery filters
    els.galleryFilters.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      const filter = chip.dataset.filter;
      els.galleryFilters.querySelectorAll('.filter-chip').forEach((c) => {
        c.classList.toggle('is-active', c === chip);
      });
      els.curatedGrid.querySelectorAll('.curated-card').forEach((card) => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });

    // Residence cards clicks
    els.residencesGrid.addEventListener('click', (e) => {
      const modalBtn = e.target.closest('.js-open-modal');
      if (modalBtn) {
        renderBlueprintModal(modalBtn.dataset.unit);
        return;
      }
      const selectBtn = e.target.closest('.js-select-unit');
      if (selectBtn) {
        setSelectedUnit(selectBtn.dataset.unit);
        document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Modal room selection & close
    els.modalBlueprintSvg.addEventListener('click', (e) => {
      const roomGroup = e.target.closest('.bp-room');
      if (!roomGroup) return;
      const idx = Number(roomGroup.dataset.roomIdx);
      const unit = getUnitById(state.modalUnitId);
      const room = unit.blueprint[idx];
      if (!room) return;
      els.modalBlueprintSvg.querySelectorAll('.bp-room').forEach((g) => {
        g.classList.toggle('is-active', g === roomGroup);
      });
      els.modalRoomReadout.innerHTML = `<strong>${room.label}</strong><span class="num-font">${room.dim}</span>`;
    });

    els.modalCloseBtn.addEventListener('click', closeModal);
    els.floorplanModal.addEventListener('click', (e) => {
      if (e.target === els.floorplanModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !els.floorplanModal.hidden) closeModal();
    });

    els.modalSelectUnitBtn.addEventListener('click', () => {
      setSelectedUnit(state.modalUnitId);
      closeModal();
      document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
    });

    // Payment & form unit selects sync
    els.paymentUnitSelect.addEventListener('change', () => {
      setSelectedUnit(els.paymentUnitSelect.value);
    });
    els.leadUnit.addEventListener('change', () => {
      setSelectedUnit(els.leadUnit.value);
    });

    // Mortgage sliders
    els.simDownPct.addEventListener('input', () => {
      state.downPct = Number(els.simDownPct.value);
      renderPaymentAndMortgage();
    });
    els.simYears.addEventListener('input', () => {
      state.years = Number(els.simYears.value);
      renderPaymentAndMortgage();
    });
    els.simRate.addEventListener('input', () => {
      state.rate = Number(els.simRate.value);
      renderPaymentAndMortgage();
    });

    // Viewing Form -> WhatsApp
    els.viewingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = els.leadName.value.trim();
      const phone = els.leadPhone.value.trim();
      if (!name || !phone) {
        els.formFeedback.textContent = 'يرجى إدخال الاسم الكامل ورقم الجوال لإتمام الطلب.';
        els.formFeedback.className = 'form-feedback is-error';
        return;
      }

      const unit = getUnitById(els.leadUnit.value);
      const rateCode = ESTATE_CONFIG.rates[state.currency].code;
      const dateStr = els.leadDate.value || 'مرن حسب التنسيق';
      const notes = els.leadNotes.value.trim() || 'لا توجد ملاحظات إضافية';

      const msgLines = [
        'طلب زيارة خاصة والكتيّب المعماري — الفئة الفاخرة Pro',
        'المشروع: ' + ESTATE_CONFIG.projectTitle + ' (' + ESTATE_CONFIG.developerName + ')',
        'العميل: ' + name,
        'الجوال: ' + phone,
        'المدينة المفضّلة: ' + els.leadCity.value,
        'الوحدة المختارة: ' + unit.title,
        'السعر (' + rateCode + '): ' + formatPrice(unit.priceSar),
        'خطة السداد: ' + ESTATE_CONFIG.planSummary,
        'محاكاة التمويل: دفعة ' + state.downPct + '% / ' + state.years + ' سنة / قسط تقديري ' + state.lastMonthlyFmt,
        'نوع المعاينة: ' + els.leadVisitType.value,
        'الموعد المقترح: ' + dateStr,
        'ملاحظات: ' + notes,
      ];

      const waUrl =
        'https://wa.me/' +
        ESTATE_CONFIG.whatsappNumber +
        '?text=' +
        encodeURIComponent(msgLines.join('\n'));

      els.formFeedback.textContent =
        'تم تجهيز ملف الطلب بنجاح وجاري فتح واتساب للتنسيق المباشر مع مستشار المبيعات.';
      els.formFeedback.className = 'form-feedback is-success';
      window.open(waUrl, '_blank', 'noopener');
    });
  }

  function init() {
    renderTrackRecord();
    renderAmenitiesAndConnectivity();
    populateUnitSelects();
    renderResidences();
    renderPaymentAndMortgage();
    bindEvents();
  }

  init();
})();
