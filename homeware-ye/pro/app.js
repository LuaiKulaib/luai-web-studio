/* ============================================================
   معرض الصقر للأدوات المنزلية — Pro Tier ($120)
   Interactive 3-Currency Catalog (USD / SAR / YER),
   Dozen/Carton Quote Drawer & Governorate Daily Freight Dispatch
   ============================================================ */

(function () {
  'use strict';

  const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', label: 'الدولار (USD)', rate: 1, decimals: 2 },
    SAR: { code: 'SAR', symbol: 'ر.س', label: 'الريال السعودي (SAR)', rate: 3.75, decimals: 0 },
    YER: { code: 'YER', symbol: 'ر.ي', label: 'الريال اليمني (YER)', rate: 535, decimals: 0 }
  };

  // Indicative wholesale unit prices & SKU metadata mapped directly to YE_DATA.products IDs
  const SKU_SPECS = {
    'ye-01': {
      sku: 'SQ-YE01',
      defaultUnit: 'carton',
      cartonPriceUsd: 148,
      dozenPriceUsd: 428,
      cartonLabel: 'كرتون (4 أطقم × 10 قطع)',
      dozenLabel: 'درزن (12 طقم / 3 كراتين)'
    },
    'ye-02': {
      sku: 'SQ-YE02',
      defaultUnit: 'carton',
      cartonPriceUsd: 162,
      dozenPriceUsd: 312,
      cartonLabel: 'كرتون (6 أطقم ستيل)',
      dozenLabel: 'درزن (12 قدر مقاسات مشكلة)'
    },
    'ye-03': {
      sku: 'SQ-YE03',
      defaultUnit: 'dozen',
      cartonPriceUsd: 210,
      dozenPriceUsd: 54,
      cartonLabel: 'كرتون كامل (4 درازن / 48 حبة)',
      dozenLabel: 'درزن (ربطة 12 مقلاة)'
    },
    'ye-04': {
      sku: 'SQ-YE04',
      defaultUnit: 'carton',
      cartonPriceUsd: 132,
      dozenPriceUsd: 256,
      cartonLabel: 'كرتون (6 أطقم ضيافة)',
      dozenLabel: 'درزن (12 طقم شاي)'
    },
    'ye-05': {
      sku: 'SQ-YE05',
      defaultUnit: 'carton',
      cartonPriceUsd: 118,
      dozenPriceUsd: 118,
      cartonLabel: 'كرتون (12 طقم بعلب هدايا)',
      dozenLabel: 'درزن (12 طقم منقوش)'
    },
    'ye-06': {
      sku: 'SQ-YE06',
      defaultUnit: 'carton',
      cartonPriceUsd: 136,
      dozenPriceUsd: 396,
      cartonLabel: 'كرتون (4 أطقم × 24 قطعة)',
      dozenLabel: 'درزن (12 طقم سفرة / 3 كراتين)'
    },
    'ye-07': {
      sku: 'SQ-YE07',
      defaultUnit: 'dozen',
      cartonPriceUsd: 92,
      dozenPriceUsd: 24,
      cartonLabel: 'كرتون (4 درازن / 48 طبق)',
      dozenLabel: 'درزن (12 صحن تقديم)'
    },
    'ye-08': {
      sku: 'SQ-YE08',
      defaultUnit: 'carton',
      cartonPriceUsd: 68,
      dozenPriceUsd: 36,
      cartonLabel: 'كرتون (24 حبة زجاج محكم)',
      dozenLabel: 'درزن (12 برطمان)'
    },
    'ye-09': {
      sku: 'SQ-YE09',
      defaultUnit: 'dozen',
      cartonPriceUsd: 124,
      dozenPriceUsd: 32,
      cartonLabel: 'كرتون (4 درازن / 48 طقم)',
      dozenLabel: 'درزن (12 طقم حافظات)'
    },
    'ye-10': {
      sku: 'SQ-YE10',
      defaultUnit: 'carton',
      cartonPriceUsd: 156,
      dozenPriceUsd: 156,
      cartonLabel: 'كرتون (12 جهاز 220V)',
      dozenLabel: 'درزن (12 جهاز كهربائي)'
    },
    'ye-11': {
      sku: 'SQ-YE11',
      defaultUnit: 'dozen',
      cartonPriceUsd: 184,
      dozenPriceUsd: 48,
      cartonLabel: 'كرتون (4 درازن / 48 مطارة)',
      dozenLabel: 'درزن (12 حبة ستانلس دبل)'
    },
    'ye-12': {
      sku: 'SQ-YE12',
      defaultUnit: 'dozen',
      cartonPriceUsd: 84,
      dozenPriceUsd: 22,
      cartonLabel: 'كرتون (4 درازن / 48 قطعة)',
      dozenLabel: 'درزن (ربطة 12 قطعة)'
    }
  };

  // Governorate Daily Freight Schedule (6 core routes required + additional lines)
  const FREIGHT_ROUTES = [
    {
      id: 'sanaa',
      gov: 'صنعاء والأمانة',
      hub: 'توصيل مباشر من حي شعوب',
      schedule: 'يومي — فترتان (صباحي / مسائي)',
      eta: 'خلال 2 - 4 ساعات',
      transferFee: 'توصيل مجاني للمحل'
    },
    {
      id: 'aden',
      gov: 'عدن',
      hub: 'مكاتب الترحيل المعتمدة (خط عدن)',
      schedule: 'رحلات يومية — التسليم 04:00 عصراً',
      eta: '24 - 36 ساعة',
      transferFee: 'مجاني حتى مكتب الترحيل'
    },
    {
      id: 'taiz',
      gov: 'تعز',
      hub: 'خطوط النقل البري — الحوبان / المدينة',
      schedule: 'ترحيل يومي منتظم',
      eta: '12 - 24 ساعة',
      transferFee: 'مجاني حتى مكتب الترحيل'
    },
    {
      id: 'hodiedah',
      gov: 'الحديدة',
      hub: 'مكاتب نقل الساحل الغربي',
      schedule: 'ترحيل يومي سريع',
      eta: '8 - 14 ساعة',
      transferFee: 'مجاني حتى مكتب الترحيل'
    },
    {
      id: 'ibb',
      gov: 'إب',
      hub: 'مكاتب نقل خط إب وذمار',
      schedule: 'يومي — دفعتان يومياً',
      eta: '6 - 10 ساعات',
      transferFee: 'مجاني حتى مكتب الترحيل'
    },
    {
      id: 'mukalla',
      gov: 'المكلا وحضرموت',
      hub: 'ناقلات الخط الشرقي المعتمدة',
      schedule: 'رحلات يومية منتظمة',
      eta: '36 - 48 ساعة',
      transferFee: 'مجاني حتى مكتب الترحيل'
    },
    {
      id: 'other',
      gov: 'ذمار / مأرب / البيضاء / محافظات أخرى',
      hub: 'كافة مكاتب الترحيل الوطنية بصنعاء',
      schedule: 'حسب خط المحافظة اليومي',
      eta: '6 - 36 ساعة',
      transferFee: 'مجاني حتى مكتب الترحيل'
    }
  ];

  // Normalize image paths from data.js to ../assets/images/ directory
  const products = (YE_DATA.products || []).map((p) => {
    const cleanImg = p.img.startsWith('../') ? p.img : '../' + p.img.replace(/^\/+/, '');
    const spec = SKU_SPECS[p.id] || {
      sku: p.id.toUpperCase(),
      defaultUnit: 'carton',
      cartonPriceUsd: 100,
      dozenPriceUsd: 40,
      cartonLabel: p.packing,
      dozenLabel: 'درزن (12 قطعة)'
    };
    return { ...p, ...spec, img: cleanImg };
  });

  const state = {
    currency: 'USD',
    activeCat: 'all',
    search: '',
    cardUnit: {}, // { id: 'carton' | 'dozen' }
    quote: {},    // { id: { qty: number, unit: 'carton' | 'dozen' } }
    selectedGovId: 'sanaa'
  };

  products.forEach((p) => {
    state.cardUnit[p.id] = p.defaultUnit;
  });

  const els = {
    topBar: document.getElementById('topBar'),
    topCloseBtn: document.getElementById('topCloseBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileNav: document.getElementById('mobileNav'),
    heroOpenDrawerBtn: document.getElementById('heroOpenDrawerBtn'),
    activeCurrencyRateText: document.getElementById('activeCurrencyRateText'),
    catPills: document.getElementById('catPills'),
    catalogSearch: document.getElementById('catalogSearch'),
    catalogResultCount: document.getElementById('catalogResultCount'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),
    productsGrid: document.getElementById('productsGrid'),
    catalogEmpty: document.getElementById('catalogEmpty'),
    freightTableBody: document.getElementById('freightTableBody'),
    setupGrid: document.getElementById('setupGrid'),
    faqList: document.getElementById('faqList'),
    openDrawerBtn: document.getElementById('openDrawerBtn'),
    headerDrawerCount: document.getElementById('headerDrawerCount'),
    drawerBackdrop: document.getElementById('drawerBackdrop'),
    quoteDrawer: document.getElementById('quoteDrawer'),
    closeDrawerBtn: document.getElementById('closeDrawerBtn'),
    drawerEmpty: document.getElementById('drawerEmpty'),
    drawerList: document.getElementById('drawerList'),
    drawerMerchantName: document.getElementById('drawerMerchantName'),
    drawerGovSelect: document.getElementById('drawerGovSelect'),
    drawerGovMeta: document.getElementById('drawerGovMeta'),
    drawerTotalSkus: document.getElementById('drawerTotalSkus'),
    drawerTotalCartons: document.getElementById('drawerTotalCartons'),
    drawerTotalDozens: document.getElementById('drawerTotalDozens'),
    drawerSubtotal: document.getElementById('drawerSubtotal'),
    drawerAltTotals: document.getElementById('drawerAltTotals'),
    sendQuoteWaBtn: document.getElementById('sendQuoteWaBtn'),
    clearDrawerBtn: document.getElementById('clearDrawerBtn'),
    floatingBar: document.getElementById('floatingBar'),
    floatingCountText: document.getElementById('floatingCountText'),
    floatingTotalText: document.getElementById('floatingTotalText'),
    floatingOpenBtn: document.getElementById('floatingOpenBtn'),
    toastNotice: document.getElementById('toastNotice')
  };

  let toastTimer = null;

  function showToast(msg) {
    if (!els.toastNotice) return;
    els.toastNotice.textContent = msg;
    els.toastNotice.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toastNotice.hidden = true;
    }, 2800);
  }

  function formatMoney(usdAmount, currencyCode) {
    const code = currencyCode || state.currency;
    const cur = CURRENCIES[code] || CURRENCIES.USD;
    const raw = usdAmount * cur.rate;
    const val = code === 'YER' ? Math.round(raw / 10) * 10 : raw;
    const formatted = val.toLocaleString('en-US', {
      minimumFractionDigits: cur.decimals,
      maximumFractionDigits: cur.decimals
    });
    return code === 'USD' ? `$${formatted}` : `${formatted} ${cur.symbol}`;
  }

  function getUnitPriceUsd(product, unit) {
    return unit === 'dozen' ? product.dozenPriceUsd : product.cartonPriceUsd;
  }

  function getUnitLabel(product, unit) {
    return unit === 'dozen' ? product.dozenLabel : product.cartonLabel;
  }

  function getUnitShort(unit) {
    return unit === 'dozen' ? 'درزن' : 'كرتون';
  }

  function syncCurrencyButtons() {
    document.querySelectorAll('[data-currency]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.currency === state.currency);
    });
    if (els.activeCurrencyRateText) {
      const cur = CURRENCIES[state.currency];
      els.activeCurrencyRateText.textContent = `العملة النشطة: ${cur.code}  |  1 USD = 3.75 SAR = 535 YER`;
    }
  }

  function renderCategoryPills() {
    if (!els.catPills) return;
    els.catPills.innerHTML = (YE_DATA.categories || []).map((c) => `
      <button type="button"
        class="cat-pill ${state.activeCat === c.id ? 'active' : ''}"
        data-cat="${c.id}">
        ${c.name}
      </button>
    `).join('');
  }

  function renderProducts() {
    if (!els.productsGrid) return;
    const q = state.search.trim().toLowerCase();

    const filtered = products.filter((p) => {
      const catMatch = state.activeCat === 'all' || p.category === state.activeCat;
      const textMatch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      return catMatch && textMatch;
    });

    if (els.catalogResultCount) {
      els.catalogResultCount.textContent = `عرض ${filtered.length} من أصل ${products.length} صنف`;
    }

    if (filtered.length === 0) {
      els.productsGrid.innerHTML = '';
      if (els.catalogEmpty) els.catalogEmpty.hidden = false;
      return;
    }

    if (els.catalogEmpty) els.catalogEmpty.hidden = true;

    els.productsGrid.innerHTML = filtered.map((p) => {
      const qEntry = state.quote[p.id];
      const activeUnit = qEntry ? qEntry.unit : (state.cardUnit[p.id] || p.defaultUnit);
      const qty = qEntry ? qEntry.qty : 0;
      const unitPriceUsd = getUnitPriceUsd(p, activeUnit);
      const unitText = getUnitLabel(p, activeUnit);
      const waDirect = `السلام عليكم، أستفسر من الفئة الفاخرة Pro عن توفر وسعر الصنف:\n${p.sku} — ${p.title}\nالوحدة: ${getUnitShort(activeUnit)} (${unitText})`;

      return `
        <article class="product-card" data-product-id="${p.id}">
          <div class="pc-media">
            <img src="${p.img}" alt="${p.title}" loading="lazy" />
            <span class="pc-tag">${p.tag}</span>
            <span class="pc-sku" dir="ltr">${p.sku}</span>
          </div>
          <div class="pc-body">
            <span class="pc-cat">${p.categoryName}</span>
            <h3 class="pc-title">${p.title}</h3>
            <p class="pc-desc">${p.desc}</p>

            <div class="pc-specs">
              <div><strong>التعبئة:</strong> ${p.packing}</div>
              <div><strong>المواصفة:</strong> ${p.origin}</div>
            </div>

            <div class="pc-pricing-panel">
              <div class="pc-unit-row">
                <div class="unit-toggle" role="group" aria-label="تبديل وحدة التسعير">
                  <button type="button" class="unit-btn ${activeUnit === 'carton' ? 'active' : ''}" data-card-unit="${p.id}" data-unit="carton">كرتون</button>
                  <button type="button" class="unit-btn ${activeUnit === 'dozen' ? 'active' : ''}" data-card-unit="${p.id}" data-unit="dozen">درزن</button>
                </div>
                <div class="pc-price-box">
                  <span class="pc-price-main" dir="ltr">${formatMoney(unitPriceUsd)}</span>
                  <span class="pc-price-sub">${unitText}</span>
                </div>
              </div>

              <div class="pc-actions">
                ${qty > 0 ? `
                  <div class="qty-stepper">
                    <button type="button" data-card-dec="${p.id}" aria-label="إنقاص الكمية">-</button>
                    <span>${qty} ${getUnitShort(activeUnit)}</span>
                    <button type="button" data-card-inc="${p.id}" aria-label="زيادة الكمية">+</button>
                  </div>
                ` : `
                  <button type="button" class="btn btn-indigo btn-sm" data-card-add="${p.id}">
                    + أضف لكشف الطلبية
                  </button>
                `}
                <a href="https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waDirect)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
                  استفسار
                </a>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderFreightTable() {
    if (els.freightTableBody) {
      els.freightTableBody.innerHTML = FREIGHT_ROUTES.slice(0, 6).map((route) => {
        const isSelected = state.selectedGovId === route.id;
        return `
          <tr>
            <td>
              <span class="freight-gov-name">${route.gov}</span>
              <span class="freight-gov-hub">${route.hub}</span>
            </td>
            <td>${route.schedule}</td>
            <td>${route.eta}</td>
            <td>${route.transferFee}</td>
            <td>
              <button type="button" class="freight-select-btn ${isSelected ? 'is-selected' : ''}" data-select-gov="${route.id}">
                ${isSelected ? 'مختارة للطلبية' : 'اختيار للطلبية'}
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    if (els.drawerGovSelect) {
      els.drawerGovSelect.innerHTML = FREIGHT_ROUTES.map((r) => `
        <option value="${r.id}" ${r.id === state.selectedGovId ? 'selected' : ''}>${r.gov} — ${r.eta}</option>
      `).join('');
    }

    const activeRoute = FREIGHT_ROUTES.find((r) => r.id === state.selectedGovId) || FREIGHT_ROUTES[0];
    if (els.drawerGovMeta && activeRoute) {
      els.drawerGovMeta.textContent = `${activeRoute.hub} · ${activeRoute.transferFee}`;
    }
  }

  function renderSetupPlans() {
    if (!els.setupGrid || !YE_DATA.setupPlans) return;
    const checkSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    els.setupGrid.innerHTML = YE_DATA.setupPlans.map((plan) => `
      <article class="setup-card ${plan.featured ? 'is-featured' : ''}">
        <span class="setup-badge">${plan.badge}</span>
        <h3>${plan.title}</h3>
        <p>${plan.desc}</p>
        <ul class="setup-points">
          ${plan.points.map((pt) => `<li>${checkSvg}<span>${pt}</span></li>`).join('')}
        </ul>
        <a href="https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(plan.waText + ' (الفئة الفاخرة Pro)')}" target="_blank" rel="noopener" class="btn ${plan.featured ? 'btn-primary' : 'btn-indigo'} btn-full">
          <span>طلب استشارة وتجهيز الكشف عبر واتساب</span>
        </a>
      </article>
    `).join('');
  }

  function renderFaq() {
    if (!els.faqList || !YE_DATA.faqs) return;
    els.faqList.innerHTML = YE_DATA.faqs.map((item, idx) => `
      <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
        <button type="button" class="faq-q" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${item.q}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-a" style="${idx === 0 ? 'max-height:240px;' : ''}">
          <div class="faq-a-inner">${item.a}</div>
        </div>
      </div>
    `).join('');
  }

  function updateQuoteTotalsAndDrawer() {
    const entries = Object.entries(state.quote);
    let totalSkus = entries.length;
    let totalCartons = 0;
    let totalDozens = 0;
    let totalUsd = 0;

    const rowsHtml = entries.map(([id, item]) => {
      const p = products.find((prod) => prod.id === id);
      if (!p) return '';
      const unitPriceUsd = getUnitPriceUsd(p, item.unit);
      const lineUsd = unitPriceUsd * item.qty;
      totalUsd += lineUsd;
      if (item.unit === 'dozen') totalDozens += item.qty;
      else totalCartons += item.qty;

      return `
        <div class="drawer-item" data-drawer-id="${p.id}">
          <img src="${p.img}" alt="${p.title}" />
          <div>
            <div class="di-top">
              <strong>${p.title}</strong>
              <button type="button" class="di-remove" data-drawer-remove="${p.id}" aria-label="حذف الصنف">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="di-meta">${p.sku} · ${getUnitLabel(p, item.unit)}</div>
            <div class="di-controls">
              <div class="unit-toggle" role="group" aria-label="تبديل الوحدة">
                <button type="button" class="unit-btn ${item.unit === 'carton' ? 'active' : ''}" data-drawer-unit="${p.id}" data-unit="carton">كرتون</button>
                <button type="button" class="unit-btn ${item.unit === 'dozen' ? 'active' : ''}" data-drawer-unit="${p.id}" data-unit="dozen">درزن</button>
              </div>
              <div class="di-stepper">
                <button type="button" data-drawer-dec="${p.id}" aria-label="إنقاص">-</button>
                <span>${item.qty}</span>
                <button type="button" data-drawer-inc="${p.id}" aria-label="زيادة">+</button>
              </div>
              <span class="di-line-total" dir="ltr">${formatMoney(lineUsd)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const totalUnits = totalCartons + totalDozens;
    if (els.headerDrawerCount) els.headerDrawerCount.textContent = String(totalUnits);
    if (els.drawerTotalSkus) els.drawerTotalSkus.textContent = String(totalSkus);
    if (els.drawerTotalCartons) els.drawerTotalCartons.textContent = String(totalCartons);
    if (els.drawerTotalDozens) els.drawerTotalDozens.textContent = String(totalDozens);
    if (els.drawerSubtotal) els.drawerSubtotal.textContent = formatMoney(totalUsd);

    if (els.drawerAltTotals) {
      els.drawerAltTotals.textContent =
        `USD: ${formatMoney(totalUsd, 'USD')}  |  SAR: ${formatMoney(totalUsd, 'SAR')}  |  YER: ${formatMoney(totalUsd, 'YER')}`;
    }

    if (els.drawerEmpty && els.drawerList) {
      els.drawerEmpty.hidden = entries.length > 0;
      els.drawerList.innerHTML = rowsHtml;
    }

    if (els.floatingBar) {
      els.floatingBar.hidden = entries.length === 0;
      if (els.floatingCountText) {
        els.floatingCountText.textContent = `${totalSkus} أصناف (${totalCartons} كرتون / ${totalDozens} درزن)`;
      }
      if (els.floatingTotalText) {
        els.floatingTotalText.textContent = formatMoney(totalUsd);
      }
    }
  }

  function mutateQuote(id, delta, explicitUnit) {
    const p = products.find((item) => item.id === id);
    if (!p) return;
    const current = state.quote[id];
    const unit = explicitUnit || (current ? current.unit : (state.cardUnit[id] || p.defaultUnit));
    const nextQty = (current ? current.qty : 0) + delta;

    if (nextQty <= 0) {
      delete state.quote[id];
    } else {
      state.quote[id] = { qty: nextQty, unit };
      state.cardUnit[id] = unit;
    }

    renderProducts();
    updateQuoteTotalsAndDrawer();
  }

  function setItemUnit(id, unit) {
    const p = products.find((item) => item.id === id);
    if (!p) return;
    state.cardUnit[id] = unit;
    if (state.quote[id]) {
      state.quote[id].unit = unit;
    }
    renderProducts();
    updateQuoteTotalsAndDrawer();
  }

  function openDrawer() {
    if (!els.quoteDrawer || !els.drawerBackdrop) return;
    els.drawerBackdrop.hidden = false;
    els.quoteDrawer.classList.add('is-open');
    els.quoteDrawer.setAttribute('aria-hidden', 'false');
    updateQuoteTotalsAndDrawer();
  }

  function closeDrawer() {
    if (!els.quoteDrawer || !els.drawerBackdrop) return;
    els.quoteDrawer.classList.remove('is-open');
    els.quoteDrawer.setAttribute('aria-hidden', 'true');
    els.drawerBackdrop.hidden = true;
  }

  function dispatchQuoteWhatsapp() {
    const entries = Object.entries(state.quote);
    if (entries.length === 0) {
      showToast('أضف صنفاً واحداً على الأقل إلى كشف الطلبية أولاً');
      return;
    }

    const route = FREIGHT_ROUTES.find((r) => r.id === state.selectedGovId) || FREIGHT_ROUTES[0];
    const merchant = els.drawerMerchantName && els.drawerMerchantName.value.trim()
      ? els.drawerMerchantName.value.trim()
      : 'تاجر جملة (غير محدد)';

    let totalUsd = 0;
    let totalCartons = 0;
    let totalDozens = 0;

    const lines = entries.map(([id, item], idx) => {
      const p = products.find((prod) => prod.id === id);
      if (!p) return '';
      const unitUsd = getUnitPriceUsd(p, item.unit);
      const lineUsd = unitUsd * item.qty;
      totalUsd += lineUsd;
      if (item.unit === 'dozen') totalDozens += item.qty;
      else totalCartons += item.qty;
      return `${idx + 1}. [${p.sku}] ${p.title}\n   - الكمية: ${item.qty} ${getUnitShort(item.unit)} (${getUnitLabel(p, item.unit)})\n   - السعر التقديري: ${formatMoney(lineUsd)} (${formatMoney(unitUsd)} للوحدة)`;
    }).filter(Boolean);

    const msg =
      `السلام عليكم ورحمة الله،\n` +
      `طلب تسعيرة وتجهيز جملة — الفئة الفاخرة Pro\n` +
      `معرض الصقر للأدوات المنزلية (حي شعوب، صنعاء)\n` +
      `----------------------------------------\n` +
      `الجهة الطالبة: ${merchant}\n` +
      `وجهة الترحيل: ${route.gov} (${route.eta})\n` +
      `العملة المختارة: ${state.currency}\n` +
      `----------------------------------------\n` +
      lines.join('\n') +
      `\n----------------------------------------\n` +
      `الإجمالي: ${entries.length} أصناف (${totalCartons} كرتون / ${totalDozens} درزن)\n` +
      `الإجمالي الاسترشادي (${state.currency}): ${formatMoney(totalUsd)}\n` +
      `المعادل التقريبي: ${formatMoney(totalUsd, 'USD')} | ${formatMoney(totalUsd, 'SAR')} | ${formatMoney(totalUsd, 'YER')}\n` +
      `أرجو تأكيد التوفر والأسعار المعتمدة لليوم وترتيب الشحن.`;

    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  }

  // Event Bindings
  if (els.topCloseBtn && els.topBar) {
    els.topCloseBtn.addEventListener('click', () => {
      els.topBar.hidden = true;
    });
  }

  if (els.mobileMenuBtn && els.mobileNav) {
    els.mobileMenuBtn.addEventListener('click', () => {
      const next = els.mobileNav.hidden;
      els.mobileNav.hidden = !next;
      els.mobileMenuBtn.setAttribute('aria-expanded', String(next));
    });
    els.mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        els.mobileNav.hidden = true;
        els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sync all currency switchers
  document.addEventListener('click', (e) => {
    const currBtn = e.target.closest('[data-currency]');
    if (!currBtn) return;
    const nextCode = currBtn.dataset.currency;
    if (!CURRENCIES[nextCode] || nextCode === state.currency) return;
    state.currency = nextCode;
    syncCurrencyButtons();
    renderProducts();
    updateQuoteTotalsAndDrawer();
    showToast(`تم تحديث الأسعار إلى ${CURRENCIES[nextCode].label}`);
  });

  // Department quick jump cards
  document.querySelectorAll('[data-jump-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeCat = btn.dataset.jumpCat;
      renderCategoryPills();
      renderProducts();
      const target = document.getElementById('catalog');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  if (els.catPills) {
    els.catPills.addEventListener('click', (e) => {
      const pill = e.target.closest('[data-cat]');
      if (!pill) return;
      state.activeCat = pill.dataset.cat;
      renderCategoryPills();
      renderProducts();
    });
  }

  if (els.catalogSearch) {
    els.catalogSearch.addEventListener('input', (e) => {
      state.search = e.target.value;
      renderProducts();
    });
  }

  if (els.resetFiltersBtn) {
    els.resetFiltersBtn.addEventListener('click', () => {
      state.activeCat = 'all';
      state.search = '';
      if (els.catalogSearch) els.catalogSearch.value = '';
      renderCategoryPills();
      renderProducts();
    });
  }

  if (els.productsGrid) {
    els.productsGrid.addEventListener('click', (e) => {
      const unitBtn = e.target.closest('[data-card-unit]');
      if (unitBtn) {
        setItemUnit(unitBtn.dataset.cardUnit, unitBtn.dataset.unit);
        return;
      }
      const addBtn = e.target.closest('[data-card-add]');
      if (addBtn) {
        mutateQuote(addBtn.dataset.cardAdd, 1);
        showToast('تمت إضافة الصنف إلى كشف الطلبية');
        return;
      }
      const incBtn = e.target.closest('[data-card-inc]');
      if (incBtn) {
        mutateQuote(incBtn.dataset.cardInc, 1);
        return;
      }
      const decBtn = e.target.closest('[data-card-dec]');
      if (decBtn) {
        mutateQuote(decBtn.dataset.cardDec, -1);
      }
    });
  }

  if (els.freightTableBody) {
    els.freightTableBody.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-select-gov]');
      if (!btn) return;
      state.selectedGovId = btn.dataset.selectGov;
      renderFreightTable();
      const route = FREIGHT_ROUTES.find((r) => r.id === state.selectedGovId);
      showToast(`تم اعتماد الترحيل إلى: ${route ? route.gov : ''}`);
      openDrawer();
    });
  }

  if (els.drawerGovSelect) {
    els.drawerGovSelect.addEventListener('change', (e) => {
      state.selectedGovId = e.target.value;
      renderFreightTable();
    });
  }

  if (els.drawerList) {
    els.drawerList.addEventListener('click', (e) => {
      const unitBtn = e.target.closest('[data-drawer-unit]');
      if (unitBtn) {
        setItemUnit(unitBtn.dataset.drawerUnit, unitBtn.dataset.unit);
        return;
      }
      const incBtn = e.target.closest('[data-drawer-inc]');
      if (incBtn) {
        mutateQuote(incBtn.dataset.drawerInc, 1);
        return;
      }
      const decBtn = e.target.closest('[data-drawer-dec]');
      if (decBtn) {
        mutateQuote(decBtn.dataset.drawerDec, -1);
        return;
      }
      const remBtn = e.target.closest('[data-drawer-remove]');
      if (remBtn) {
        delete state.quote[remBtn.dataset.drawerRemove];
        renderProducts();
        updateQuoteTotalsAndDrawer();
      }
    });
  }

  if (els.openDrawerBtn) els.openDrawerBtn.addEventListener('click', openDrawer);
  if (els.heroOpenDrawerBtn) els.heroOpenDrawerBtn.addEventListener('click', openDrawer);
  if (els.floatingOpenBtn) els.floatingOpenBtn.addEventListener('click', openDrawer);
  if (els.closeDrawerBtn) els.closeDrawerBtn.addEventListener('click', closeDrawer);
  if (els.drawerBackdrop) els.drawerBackdrop.addEventListener('click', closeDrawer);

  if (els.clearDrawerBtn) {
    els.clearDrawerBtn.addEventListener('click', () => {
      state.quote = {};
      renderProducts();
      updateQuoteTotalsAndDrawer();
      showToast('تم تفريغ كشف الطلبية');
    });
  }

  if (els.sendQuoteWaBtn) {
    els.sendQuoteWaBtn.addEventListener('click', dispatchQuoteWhatsapp);
  }

  if (els.faqList) {
    els.faqList.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-q');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const ans = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('is-open');

      els.faqList.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Init
  syncCurrencyButtons();
  renderCategoryPills();
  renderProducts();
  renderFreightTable();
  renderSetupPlans();
  renderFaq();
  updateQuoteTotalsAndDrawer();
})();
