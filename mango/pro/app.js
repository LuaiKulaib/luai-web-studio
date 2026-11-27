/* =========================================================
   mango/pro/app.js — Luxury Botanical Editorial ($120 Pro)
   Tihama Golden Tropics® — Multi-Currency FOB Rates, Lab QC Drawer,
   Quarterly Harvest Filter & Direct Pro B2B WhatsApp RFQ
   ========================================================= */
'use strict';

(function initMangoProPortal() {
  if (typeof MANGO_DATA === 'undefined' || typeof MANGO_CONFIG === 'undefined') return;

  const waBase = `https://wa.me/${MANGO_CONFIG.whatsappNumber}?text=`;

  /* ---- Currency & Indicative FOB Pricing Table ---- */
  const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', rate: 1, label: 'USD $' },
    SAR: { code: 'SAR', symbol: 'ر.س', rate: 3.75, label: 'SAR ر.س' },
    EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR €' },
  };

  // Indicative base FOB Hodeidah USD per net kg + Lab QC metadata
  const PRO_META = {
    'qalb-althawr': {
      fobUsdPerKg: 2.85,
      pulpRatio: '80% – 82%',
      precoolTemp: '10.5°C خلال 5 ساعات',
      uneceClass: 'UNECE FFV-45 · Class I (Zero-Fiber)',
      mrlStatus: 'مطابق EU & GCC MRL (تقرير مخبري مرفق)',
      recommendedPack: 'صندوق 3.0 كجم VIP أو 4.5 كجم مفتوح التهوية',
    },
    'taimour': {
      fobUsdPerKg: 2.35,
      pulpRatio: '77% – 79%',
      precoolTemp: '11.0°C خلال 6 ساعات',
      uneceClass: 'UNECE FFV-45 · Class I (Retail Standard)',
      mrlStatus: 'مطابق GCC & SASO MRL',
      recommendedPack: 'كرتون 4.5 كجم تهوية 7% + شبك EPE',
    },
    'zubda': {
      fobUsdPerKg: 1.75,
      pulpRatio: '75% – 77%',
      precoolTemp: '10.0°C – 11.5°C (تبريد بحري)',
      uneceClass: 'UNECE FFV-45 · Class I (Sea Grade)',
      mrlStatus: 'مطابق EU & GCC MRL (فحص شحن بحري)',
      recommendedPack: 'كرتون تجاري معياري 5.0 كجم أو 4.5 كجم',
    },
    'hindi-special': {
      fobUsdPerKg: 2.15,
      pulpRatio: '76% – 78%',
      precoolTemp: '11.0°C خلال 6 ساعات',
      uneceClass: 'UNECE FFV-45 · Class I (Red Blush)',
      mrlStatus: 'مطابق GCC & EU MRL',
      recommendedPack: 'كرتون 4.5 كجم أو 3.0 كجم VIP',
    },
    'samaka': {
      fobUsdPerKg: 2.95,
      pulpRatio: '78% – 81%',
      precoolTemp: '10.0°C خلال 4 ساعات (جوي)',
      uneceClass: 'UNECE FFV-45 · Extra / Class I',
      mrlStatus: 'مطابق لمعايير البوتيكات والضيافة الفاخرة',
      recommendedPack: 'صندوق هدايا VIP 3.0 كجم + باركود التتبع',
    },
  };

  let activeCurrency = 'USD';
  let activeBoxKg = 4.5;
  let activeModeFilter = 'all';
  let activeQuarter = 'all';

  function formatMoney(usdAmount) {
    const cur = CURRENCIES[activeCurrency];
    const converted = usdAmount * cur.rate;
    const formatted = converted.toFixed(2);
    return activeCurrency === 'SAR'
      ? `${formatted} ${cur.symbol}`
      : `${cur.symbol}${formatted}`;
  }

  /* ---- 1. Editorial KPI Strip ---- */
  const kpiStrip = document.getElementById('pro-kpi-strip');
  if (kpiStrip) {
    kpiStrip.innerHTML = MANGO_DATA.kpis
      .map(
        (k) => `
        <div class="kpi-card-sm">
          <strong>${k.value}</strong>
          <small>${k.unit}</small>
          <span>${k.label}</span>
        </div>`
      )
      .join('');
  }

  /* ---- 2. Cultivars Grid + Currency Switcher ---- */
  const cultivarGrid = document.getElementById('pro-cultivar-grid');
  const currencySwitcher = document.getElementById('currency-switcher');
  const cartonWeightSelector = document.getElementById('rate-carton-selector');
  const modeFilters = document.getElementById('pro-cultivar-filters');
  const headerCurrencyIndicator = document.getElementById('header-currency-indicator');

  function renderProCultivars() {
    if (!cultivarGrid) return;
    const list =
      activeModeFilter === 'all'
        ? MANGO_DATA.cultivars
        : MANGO_DATA.cultivars.filter((c) => c.mode === activeModeFilter);

    cultivarGrid.innerHTML = list
      .map((c) => {
        const meta = PRO_META[c.id] || { fobUsdPerKg: 2.2 };
        const kgRate = formatMoney(meta.fobUsdPerKg);
        const cartonRate = formatMoney(meta.fobUsdPerKg * activeBoxKg);
        const imgPath = c.image.startsWith('../') ? c.image : `../${c.image}`;

        return `
        <article class="cult-pro-card">
          <div class="cult-pro-media">
            <img src="${imgPath}" alt="${c.nameAr}" loading="lazy" />
            <span class="cult-pro-badge">${c.badge}</span>
          </div>
          <div class="cult-pro-body">
            <div class="cult-pro-en">${c.nameEn}</div>
            <h3>${c.nameAr}</h3>
            <p class="cult-pro-desc">${c.desc}</p>

            <div class="rate-strip">
              <div class="rate-box">
                <span>سعر FOB / كجم صافي</span>
                <strong>${kgRate}</strong>
              </div>
              <div class="rate-box">
                <span>سعر كرتون ${activeBoxKg} كجم</span>
                <strong>${cartonRate}</strong>
              </div>
            </div>

            <div class="spec-row-mini">
              <div class="spec-chip">
                <span>الحلاوة (Brix)</span>
                <strong>${c.brix}</strong>
              </div>
              <div class="spec-chip">
                <span>المادة الجافة</span>
                <strong>${c.dryMatter}</strong>
              </div>
              <div class="spec-chip">
                <span>التدريج (Count)</span>
                <strong>${c.caliber}</strong>
              </div>
              <div class="spec-chip">
                <span>العمر التسويقي</span>
                <strong>${c.shelfLife.split('(')[0].trim()}</strong>
              </div>
            </div>

            <div class="cult-pro-actions">
              <button type="button" class="btn-lab-qc" data-qc-id="${c.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M9 3h6v7l4 9H5l4-9V3z" />
                  <line x1="9" y1="3" x2="15" y2="3" />
                </svg>
                <span>بطاقة Lab QC</span>
              </button>
              <button type="button" class="btn-select-rfq" data-select-cultivar="${c.nameAr}">تحديد للطلب</button>
            </div>
          </div>
        </article>`;
      })
      .join('');
  }

  renderProCultivars();

  if (currencySwitcher) {
    currencySwitcher.addEventListener('click', (e) => {
      const btn = e.target.closest('.curr-btn');
      if (!btn) return;
      activeCurrency = btn.dataset.currency || 'USD';
      currencySwitcher.querySelectorAll('.curr-btn').forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', String(isActive));
      });
      if (headerCurrencyIndicator) {
        headerCurrencyIndicator.innerHTML = `<span>${CURRENCIES[activeCurrency].label}</span>`;
      }
      renderProCultivars();
      updateLiveQuotePreview();
    });
  }

  if (cartonWeightSelector) {
    cartonWeightSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.cw-btn');
      if (!btn) return;
      activeBoxKg = parseFloat(btn.dataset.box) || 4.5;
      cartonWeightSelector.querySelectorAll('.cw-btn').forEach((b) => {
        b.classList.toggle('active', b === btn);
      });
      renderProCultivars();
    });
  }

  if (modeFilters) {
    modeFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.f-pill');
      if (!btn) return;
      activeModeFilter = btn.dataset.filter || 'all';
      modeFilters.querySelectorAll('.f-pill').forEach((b) => {
        b.classList.toggle('active', b === btn);
      });
      renderProCultivars();
    });
  }

  /* ---- 3. Interactive Lab QC & Cultivar Spec Modal ---- */
  const qcBackdrop = document.getElementById('qc-modal-backdrop');
  const qcBody = document.getElementById('qc-modal-body');
  const qcCloseBtn = document.getElementById('qc-modal-close');

  function openLabQcModal(cultivarId) {
    const cultivar = MANGO_DATA.cultivars.find((c) => c.id === cultivarId);
    const meta = PRO_META[cultivarId];
    if (!cultivar || !meta || !qcBackdrop || !qcBody) return;

    qcBody.innerHTML = `
      <div class="qc-head">
        <span class="qc-kicker">LABORATORY QUALITY CERTIFICATE · ${meta.uneceClass}</span>
        <h3 id="qc-modal-title">${cultivar.nameAr}</h3>
        <p>${cultivar.nameEn}</p>
      </div>

      <div class="qc-grid">
        <div class="qc-metric">
          <span>درجة الحلاوة المخبرية (Brix)</span>
          <strong>${cultivar.brix}</strong>
        </div>
        <div class="qc-metric">
          <span>المادة الجافة عند القطف (Dry Matter)</span>
          <strong>${cultivar.dryMatter}</strong>
        </div>
        <div class="qc-metric">
          <span>التصنيف الدولي</span>
          <strong>${meta.uneceClass}</strong>
        </div>
        <div class="qc-metric">
          <span>الأوزان والتدريج (Caliber / Count)</span>
          <strong>${cultivar.weightRange} (${cultivar.caliber})</strong>
        </div>
        <div class="qc-metric">
          <span>العمر التسويقي (Shelf Life)</span>
          <strong>${cultivar.shelfLife}</strong>
        </div>
        <div class="qc-metric">
          <span>نسبة اللب الصافي وبروتوكول التبريد</span>
          <strong>${meta.pulpRatio} · ${meta.precoolTemp}</strong>
        </div>
        <div class="qc-metric">
          <span>فحص متبقيات المبيدات (MRL)</span>
          <strong>${meta.mrlStatus}</strong>
        </div>
        <div class="qc-metric">
          <span>التعبئة الموصى بها</span>
          <strong>${meta.recommendedPack}</strong>
        </div>
      </div>

      <div class="qc-footer-actions">
        <button type="button" class="btn-select-rfq" id="qc-select-rfq-btn" data-cultivar-name="${cultivar.nameAr}">
          تحديد الصنف في نموذج طلب التسعيرة
        </button>
        <a href="${waBase}${encodeURIComponent(
          `السلام عليكم، أرجو إرسال تقرير الفحص المخبري (Lab QC) وتسعيرة الفئة الفاخرة Pro لصنف (${cultivar.nameAr}) بعملة ${activeCurrency}.`
        )}" target="_blank" rel="noopener noreferrer" class="btn-lab-qc">
          طلب عينة مخبرية عبر واتساب
        </a>
      </div>
    `;

    qcBackdrop.hidden = false;
    qcBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLabQcModal() {
    if (!qcBackdrop) return;
    qcBackdrop.hidden = true;
    qcBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (cultivarGrid) {
    cultivarGrid.addEventListener('click', (e) => {
      const qcBtn = e.target.closest('[data-qc-id]');
      if (qcBtn) {
        openLabQcModal(qcBtn.dataset.qcId);
        return;
      }
      const rfqBtn = e.target.closest('[data-select-cultivar]');
      if (rfqBtn) {
        selectCultivarInForm(rfqBtn.dataset.selectCultivar);
      }
    });
  }

  if (qcCloseBtn) {
    qcCloseBtn.addEventListener('click', closeLabQcModal);
  }

  if (qcBackdrop) {
    qcBackdrop.addEventListener('click', (e) => {
      if (e.target === qcBackdrop) closeLabQcModal();
      const modalRfqBtn = e.target.closest('#qc-select-rfq-btn');
      if (modalRfqBtn) {
        selectCultivarInForm(modalRfqBtn.dataset.cultivarName);
        closeLabQcModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && qcBackdrop && !qcBackdrop.hidden) {
      closeLabQcModal();
    }
  });

  /* ---- 4. Harvest Matrix with Quarterly Filter ---- */
  const calHead = document.getElementById('pro-calendar-head');
  const calBody = document.getElementById('pro-calendar-body');
  const quarterFilter = document.getElementById('quarter-filter');

  const QUARTER_RANGES = {
    all: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    Q1: [0, 1, 2],
    Q2: [3, 4, 5],
    Q3: [6, 7, 8],
    Q4: [9, 10, 11],
  };

  function renderQuarterlyCalendar() {
    if (!calHead || !calBody) return;
    const indices = QUARTER_RANGES[activeQuarter] || QUARTER_RANGES.all;

    calHead.innerHTML =
      `<th>الصنف التصديري</th>` +
      indices.map((idx) => `<th>${MANGO_DATA.months[idx]}</th>`).join('');

    calBody.innerHTML = MANGO_DATA.calendar
      .map(
        (row) => `
        <tr>
          <td>${row.cultivar}</td>
          ${indices
            .map((idx) => {
              const lvl = row.levels[idx];
              const label =
                lvl === 2 ? 'ذروة التصدير' : lvl === 1 ? 'كميات محدودة' : 'خارج الموسم';
              return `<td><span class="cal-badge-dot lvl-${lvl}" title="${row.cultivar} — ${MANGO_DATA.months[idx]}: ${label}"></span></td>`;
            })
            .join('')}
        </tr>`
      )
      .join('');
  }

  renderQuarterlyCalendar();

  if (quarterFilter) {
    quarterFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('.q-tab');
      if (!btn) return;
      activeQuarter = btn.dataset.quarter || 'all';
      quarterFilter.querySelectorAll('.q-tab').forEach((b) => {
        b.classList.toggle('active', b === btn);
      });
      renderQuarterlyCalendar();
    });
  }

  /* ---- 5. Cold Chain Steps, Packaging Cards & Certifications ---- */
  const coldStepsEl = document.getElementById('pro-cold-steps');
  if (coldStepsEl) {
    coldStepsEl.innerHTML = MANGO_DATA.coldChainSteps
      .map(
        (s) => `
        <div class="cold-step-card">
          <div class="cold-num">${s.num}</div>
          <div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
          </div>
        </div>`
      )
      .join('');
  }

  const packCardsEl = document.getElementById('pro-packaging-cards');
  if (packCardsEl) {
    packCardsEl.innerHTML = MANGO_DATA.packagingOptions
      .map(
        (p) => `
        <div class="pack-tier-card">
          <h4>${p.label}</h4>
          <div class="pack-tier-meta">
            <span>صافي ${p.netKg} كجم</span>
            <span>إجمالي ${p.grossKg} كجم</span>
            <span>${p.perEuroPallet} كرتون / باليت</span>
            <span>${p.perReefer40.toLocaleString('en-US')} كرتون / 40ft</span>
          </div>
          <p>${p.note}</p>
        </div>`
      )
      .join('');
  }

  const certGridEl = document.getElementById('pro-cert-grid');
  if (certGridEl) {
    certGridEl.innerHTML = MANGO_DATA.certifications
      .map(
        (c) => `
        <div class="cert-mini-box">
          <strong>${c.code}</strong>
          <span>${c.title}: ${c.desc}</span>
        </div>`
      )
      .join('');
  }

  /* ---- 6. Direct B2B Pro RFQ Form & Live Summary ---- */
  const rfqForm = document.getElementById('pro-rfq-form');
  const rfqCultivar = document.getElementById('pro-rfq-cultivar');
  const rfqMode = document.getElementById('pro-rfq-mode');
  const rfqPackaging = document.getElementById('pro-rfq-packaging');
  const rfqQty = document.getElementById('pro-rfq-qty');
  const rfqPort = document.getElementById('pro-rfq-port');
  const quoteSummaryEl = document.getElementById('pro-quote-summary');
  const lqpCurrencyTag = document.getElementById('lqp-currency-tag');

  if (rfqCultivar) {
    rfqCultivar.innerHTML =
      MANGO_DATA.cultivars
        .map((c) => `<option value="${c.nameAr}" data-id="${c.id}">${c.nameAr} (${c.caliber})</option>`)
        .join('') + `<option value="تشكيلة أصناف متعددة (Mixed Order)" data-id="taimour">تشكيلة أصناف متعددة (Mixed Order)</option>`;
  }

  if (rfqPackaging) {
    rfqPackaging.innerHTML = MANGO_DATA.packagingOptions
      .map((p) => `<option value="${p.label}" data-net="${p.netKg}">${p.label}</option>`)
      .join('');
  }

  function selectCultivarInForm(cultivarName) {
    if (!rfqCultivar) return;
    for (const opt of rfqCultivar.options) {
      if (opt.value === cultivarName) {
        rfqCultivar.value = cultivarName;
        break;
      }
    }
    updateLiveQuotePreview();
    document.getElementById('rfq')?.scrollIntoView({ behavior: 'smooth' });
  }

  function updateLiveQuotePreview() {
    if (!quoteSummaryEl || !rfqCultivar || !rfqPackaging) return;
    const selectedOpt = rfqCultivar.options[rfqCultivar.selectedIndex];
    const cultId = selectedOpt ? selectedOpt.dataset.id : 'taimour';
    const meta = PRO_META[cultId] || PRO_META['taimour'];
    const pkgOpt = rfqPackaging.options[rfqPackaging.selectedIndex];
    const boxKg = pkgOpt ? parseFloat(pkgOpt.dataset.net) : 4.5;

    if (lqpCurrencyTag) {
      lqpCurrencyTag.textContent = CURRENCIES[activeCurrency].label;
    }

    quoteSummaryEl.innerHTML = `
      الصنف: <strong>${rfqCultivar.value}</strong><br/>
      نمط الشحن: <strong>${rfqMode ? rfqMode.value : ''}</strong><br/>
      التعبئة المختارة: <strong>${rfqPackaging.value}</strong><br/>
      السعر الاسترشادي FOB الحديدة: <strong>${formatMoney(meta.fobUsdPerKg)} / كجم</strong>
      (ما يعادل <strong>${formatMoney(meta.fobUsdPerKg * boxKg)} / كرتون ${boxKg} كجم</strong>)
    `;
  }

  [rfqCultivar, rfqMode, rfqPackaging, rfqQty, rfqPort].forEach((el) => {
    if (el) el.addEventListener('change', updateLiveQuotePreview);
  });

  updateLiveQuotePreview();

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = document.getElementById('pro-rfq-company')?.value.trim() || '';
      const contact = document.getElementById('pro-rfq-contact')?.value.trim() || '';
      const cultivar = rfqCultivar?.value || '';
      const mode = rfqMode?.value || '';
      const packaging = rfqPackaging?.value || '';
      const qty = rfqQty?.value.trim() || '';
      const port = rfqPort?.value.trim() || '';
      const notes = document.getElementById('pro-rfq-notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

      const selectedOpt = rfqCultivar?.options[rfqCultivar.selectedIndex];
      const cultId = selectedOpt ? selectedOpt.dataset.id : 'taimour';
      const meta = PRO_META[cultId] || PRO_META['taimour'];
      const pkgOpt = rfqPackaging?.options[rfqPackaging.selectedIndex];
      const boxKg = pkgOpt ? parseFloat(pkgOpt.dataset.net) : 4.5;

      const message = [
        'طلب عرض سعر تصديري — الفئة الفاخرة Pro (Tihama Golden Tropics®)',
        '----------------------------------------',
        `الشركة / المستورد: ${company}`,
        `المسؤول / التواصل: ${contact}`,
        `الصنف التصديري: ${cultivar}`,
        `نمط الشحن الدولي: ${mode}`,
        `مواصفة التعبئة: ${packaging}`,
        `الكمية المطلوبة: ${qty}`,
        `ميناء / مطار الوجهة: ${port}`,
        `عملة التسعير المفضلة: ${CURRENCIES[activeCurrency].label} (السعر الاسترشادي ${formatMoney(meta.fobUsdPerKg)}/كجم · ${formatMoney(meta.fobUsdPerKg * boxKg)}/كرتون)`,
        `ملاحظات الفرز والملصقات: ${notes}`,
      ].join('\n');

      window.open(`${waBase}${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
  }
})();
