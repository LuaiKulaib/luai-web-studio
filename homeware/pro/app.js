/* ============================================================
   دار الأواني للتجارة والجملة — Pro Tier ($120) Logic
   Multi-Currency B2B Catalog, Margin Simulator & Quote Drawer
   ============================================================ */

(function () {
  'use strict';

  const CURRENCIES = {
    SAR: { code: 'SAR', symbol: 'ر.س', name: 'الريال السعودي (SAR)', rate: 1, decimals: 0 },
    AED: { code: 'AED', symbol: 'د.إ', name: 'الدرهم الإماراتي (AED)', rate: 0.98, decimals: 0 },
    USD: { code: 'USD', symbol: '$', name: 'الدولار الأمريكي (USD)', rate: 0.2667, decimals: 2 }
  };

  const state = {
    currency: 'SAR',
    category: 'all',
    search: '',
    sort: 'featured',
    cardCartons: {},
    quoteCart: {}, // { skuId: cartonsCount }
    simCartons: 10,
    simMarkup: 55,
    simTurnover: 1
  };

  // Normalize image paths from ../assets/js/data.js to ../assets/images/...
  const products = (DATA.products || []).map((p) => {
    const imgPath = p.img.startsWith('../') ? p.img : '../' + p.img.replace(/^\/+/, '');
    const marginPct = Math.round(((p.suggestedRetail - p.unitWholesale) / p.unitWholesale) * 100);
    return { ...p, img: imgPath, marginPct };
  });

  // DOM Cache
  const els = {
    standardsGrid: document.getElementById('standardsGrid'),
    categoryTabs: document.getElementById('categoryTabs'),
    catalogGrid: document.getElementById('catalogGrid'),
    catalogEmpty: document.getElementById('catalogEmpty'),
    catalogSearch: document.getElementById('catalogSearch'),
    catalogSort: document.getElementById('catalogSort'),
    catalogResultCount: document.getElementById('catalogResultCount'),
    resetCatalogFilters: document.getElementById('resetCatalogFilters'),
    activeCurrencyName: document.getElementById('activeCurrencyName'),
    heroMoqDisplay: document.getElementById('heroMoqDisplay'),
    tier5kLabel: document.getElementById('tier5kLabel'),
    tier10kLabel: document.getElementById('tier10kLabel'),
    tier25kLabel: document.getElementById('tier25kLabel'),
    marker5k: document.getElementById('marker5k'),
    marker10k: document.getElementById('marker10k'),
    marker25k: document.getElementById('marker25k'),
    headerQuoteCount: document.getElementById('headerQuoteCount'),
    openQuoteDrawerBtn: document.getElementById('openQuoteDrawerBtn'),
    closeQuoteDrawerBtn: document.getElementById('closeQuoteDrawerBtn'),
    drawerBackdrop: document.getElementById('drawerBackdrop'),
    quoteDrawer: document.getElementById('quoteDrawer'),
    drawerTierLabel: document.getElementById('drawerTierLabel'),
    drawerTierPercent: document.getElementById('drawerTierPercent'),
    drawerTierFill: document.getElementById('drawerTierFill'),
    drawerTierHint: document.getElementById('drawerTierHint'),
    drawerEmptyState: document.getElementById('drawerEmptyState'),
    drawerItemsList: document.getElementById('drawerItemsList'),
    drawerTotalQty: document.getElementById('drawerTotalQty'),
    drawerSubtotal: document.getElementById('drawerSubtotal'),
    drawerDiscountAmount: document.getElementById('drawerDiscountAmount'),
    drawerExpectedProfit: document.getElementById('drawerExpectedProfit'),
    drawerNetPayable: document.getElementById('drawerNetPayable'),
    merchantNameInput: document.getElementById('merchantNameInput'),
    merchantCityInput: document.getElementById('merchantCityInput'),
    dispatchWhatsappBtn: document.getElementById('dispatchWhatsappBtn'),
    clearQuoteBtn: document.getElementById('clearQuoteBtn'),
    floatingQuoteBar: document.getElementById('floatingQuoteBar'),
    floatingCartonsCount: document.getElementById('floatingCartonsCount'),
    floatingNetTotal: document.getElementById('floatingNetTotal'),
    floatingDiscountNote: document.getElementById('floatingDiscountNote'),
    floatingOpenDrawerBtn: document.getElementById('floatingOpenDrawerBtn'),
    processList: document.getElementById('processList'),
    packagesGrid: document.getElementById('packagesGrid'),
    reviewsGrid: document.getElementById('reviewsGrid'),
    faqList: document.getElementById('faqList'),
    simCartonsRange: document.getElementById('simCartonsRange'),
    simMarkupRange: document.getElementById('simMarkupRange'),
    simTurnoverRange: document.getElementById('simTurnoverRange'),
    simCartonsValue: document.getElementById('simCartonsValue'),
    simMarkupValue: document.getElementById('simMarkupValue'),
    simTurnoverValue: document.getElementById('simTurnoverValue'),
    simTierText: document.getElementById('simTierText'),
    simNetInvestment: document.getElementById('simNetInvestment'),
    simDiscountSaved: document.getElementById('simDiscountSaved'),
    simExpectedRevenue: document.getElementById('simExpectedRevenue'),
    simMonthlyProfit: document.getElementById('simMonthlyProfit'),
    simAnnualProfit: document.getElementById('simAnnualProfit'),
    simRoiPercent: document.getElementById('simRoiPercent'),
    simBarCost: document.getElementById('simBarCost'),
    simBarProfit: document.getElementById('simBarProfit'),
    applySimToQuoteBtn: document.getElementById('applySimToQuoteBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileNav: document.getElementById('mobileNav'),
    toastNotice: document.getElementById('toastNotice')
  };

  let toastTimer = null;

  function showToast(message) {
    if (!els.toastNotice) return;
    els.toastNotice.textContent = message;
    els.toastNotice.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toastNotice.hidden = true;
    }, 2800);
  }

  function convertFromSar(amountSar) {
    const cur = CURRENCIES[state.currency];
    return amountSar * cur.rate;
  }

  function formatMoney(amountSar) {
    const cur = CURRENCIES[state.currency];
    const converted = convertFromSar(amountSar);
    const formatted = converted.toLocaleString('en-US', {
      minimumFractionDigits: cur.decimals,
      maximumFractionDigits: cur.decimals
    });
    return cur.code === 'USD' ? `$${formatted}` : `${formatted} ${cur.symbol}`;
  }

  function getVolumeTier(subtotalSar) {
    const tiers = WHOLESALE_CONFIG.volumeTiers;
    for (let i = 0; i < tiers.length; i += 1) {
      if (subtotalSar >= tiers[i].min) {
        return tiers[i];
      }
    }
    return tiers[tiers.length - 1];
  }

  function getCartonPriceSar(product, cartons) {
    if (cartons >= 20 && product.tier20Price) return product.tier20Price;
    if (cartons >= 5 && product.tier5Price) return product.tier5Price;
    return product.cartonPrice;
  }

  function renderStandards() {
    if (!els.standardsGrid) return;
    els.standardsGrid.innerHTML = (DATA.standards || [])
      .map(
        (item) => `
      <div class="standard-item">
        <div class="standard-icon" aria-hidden="true">${item.icon}</div>
        <div>
          <strong>${item.name}</strong>
          <span>${item.desc}</span>
        </div>
      </div>`
      )
      .join('');
  }

  function renderCategoryTabs() {
    if (!els.categoryTabs) return;
    els.categoryTabs.innerHTML = (DATA.categories || [])
      .map((cat) => {
        const count =
          cat.id === 'all'
            ? products.length
            : products.filter((p) => p.category === cat.id).length;
        const label = cat.id === 'all' ? `كافة الأصناف (${count})` : `${cat.name} (${count})`;
        const activeClass = state.category === cat.id ? 'active' : '';
        return `<button type="button" class="cat-tab ${activeClass}" data-cat="${cat.id}" role="tab" aria-selected="${
          state.category === cat.id
        }">${label}</button>`;
      })
      .join('');
  }

  function getFilteredProducts() {
    const q = state.search.trim().toLowerCase();
    let list = products.filter((p) => {
      const catOk = state.category === 'all' || p.category === state.category;
      const searchOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.skuCode.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q);
      return catOk && searchOk;
    });

    if (state.sort === 'margin-desc') {
      list = [...list].sort((a, b) => b.marginPct - a.marginPct);
    } else if (state.sort === 'price-asc') {
      list = [...list].sort((a, b) => a.cartonPrice - b.cartonPrice);
    } else if (state.sort === 'price-desc') {
      list = [...list].sort((a, b) => b.cartonPrice - a.cartonPrice);
    }

    return list;
  }

  function renderCatalog() {
    if (!els.catalogGrid) return;
    const filtered = getFilteredProducts();

    if (els.catalogResultCount) {
      els.catalogResultCount.textContent = `عرض ${filtered.length} من أصل ${products.length} صنفاً تجارياً`;
    }

    if (filtered.length === 0) {
      els.catalogGrid.innerHTML = '';
      if (els.catalogEmpty) els.catalogEmpty.hidden = false;
      return;
    }

    if (els.catalogEmpty) els.catalogEmpty.hidden = true;

    els.catalogGrid.innerHTML = filtered
      .map((p) => {
        const qty = state.cardCartons[p.id] || p.minCartons || 1;
        const retailCartonValue = p.suggestedRetail * p.unitsPerCarton;
        const cartonPrice = getCartonPriceSar(p, qty);
        const profitPerCarton = retailCartonValue - cartonPrice;
        const badgeClass = p.badgeType === 'emerald' ? 'emerald' : '';

        return `
      <article class="sku-card" data-sku-id="${p.id}">
        <div class="sku-media">
          <img src="${p.img}" alt="${p.title}" loading="lazy" />
          <span class="sku-code-pill" dir="ltr">${p.skuCode}</span>
          <span class="sku-margin-pill">هامش التاجر +${p.marginPct}%</span>
        </div>
        <div class="sku-body">
          <div class="sku-cat-row">
            <span class="sku-cat-name">${p.categoryName}</span>
            <span class="sku-badge ${badgeClass}">${p.badge}</span>
          </div>
          <h3 class="sku-title">${p.title}</h3>
          <p class="sku-material">${p.material}</p>

          <div class="sku-price-panel">
            <div class="price-col">
              <span>سعر الكرتون (${p.unitsPerCarton} ${p.unitLabel})</span>
              <strong>${formatMoney(cartonPrice)}</strong>
              <small>الوحدة جملة: ${formatMoney(p.unitWholesale)}</small>
            </div>
            <div class="price-col retail">
              <span>البيع المقترح للقطعة</span>
              <strong>${formatMoney(p.suggestedRetail)}</strong>
              <small>ربح الكرتون: ${formatMoney(profitPerCarton)}</small>
            </div>
          </div>

          <div class="sku-specs-row">
            <span>الوزن: ${p.weightKg}</span>
            <span>سعر 20+ كرتون: ${formatMoney(p.tier20Price)}</span>
          </div>

          <div class="sku-actions">
            <div class="qty-stepper" aria-label="كمية الكراتين">
              <button type="button" class="card-qty-dec" data-id="${p.id}" aria-label="إنقاص">-</button>
              <span data-card-qty="${p.id}">${qty}</span>
              <button type="button" class="card-qty-inc" data-id="${p.id}" aria-label="زيادة">+</button>
            </div>
            <button type="button" class="add-quote-btn" data-add-id="${p.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>أضف لعرض السعر</span>
            </button>
          </div>
        </div>
      </article>`;
      })
      .join('');
  }

  function calculateQuoteSummary() {
    const items = Object.entries(state.quoteCart)
      .filter(([, cartons]) => cartons > 0)
      .map(([skuId, cartons]) => {
        const product = products.find((p) => p.id === skuId);
        if (!product) return null;
        const unitCartonPrice = getCartonPriceSar(product, cartons);
        const lineSubtotal = unitCartonPrice * cartons;
        const lineRetailTotal = product.suggestedRetail * product.unitsPerCarton * cartons;
        const totalUnits = product.unitsPerCarton * cartons;
        return {
          product,
          cartons,
          totalUnits,
          unitCartonPrice,
          lineSubtotal,
          lineRetailTotal
        };
      })
      .filter(Boolean);

    const totalCartons = items.reduce((sum, it) => sum + it.cartons, 0);
    const totalUnits = items.reduce((sum, it) => sum + it.totalUnits, 0);
    const subtotalSar = items.reduce((sum, it) => sum + it.lineSubtotal, 0);
    const retailTotalSar = items.reduce((sum, it) => sum + it.lineRetailTotal, 0);

    const tier = getVolumeTier(subtotalSar);
    const discountSar = subtotalSar * tier.discount;
    const netPayableSar = subtotalSar - discountSar;
    const expectedProfitSar = Math.max(0, retailTotalSar - netPayableSar);

    return {
      items,
      totalCartons,
      totalUnits,
      subtotalSar,
      retailTotalSar,
      tier,
      discountSar,
      netPayableSar,
      expectedProfitSar
    };
  }

  function renderQuoteDrawer() {
    const summary = calculateQuoteSummary();

    if (els.headerQuoteCount) {
      els.headerQuoteCount.textContent = summary.totalCartons;
    }

    // Floating bar
    if (els.floatingQuoteBar) {
      if (summary.totalCartons > 0) {
        els.floatingQuoteBar.hidden = false;
        els.floatingCartonsCount.textContent = `${summary.totalCartons} كرتون`;
        els.floatingNetTotal.textContent = formatMoney(summary.netPayableSar);
        if (summary.subtotalSar < 5000) {
          els.floatingDiscountNote.textContent = `أضف ${formatMoney(5000 - summary.subtotalSar)} لفتح خصم 6% + شحن مجاني`;
        } else {
          els.floatingDiscountNote.textContent = `${summary.tier.label}`;
        }
      } else {
        els.floatingQuoteBar.hidden = true;
      }
    }

    // Tier progress bar
    const progressPct = Math.min(100, Math.round((summary.subtotalSar / 25000) * 100));
    if (els.drawerTierFill) els.drawerTierFill.style.width = `${progressPct}%`;
    if (els.drawerTierPercent) els.drawerTierPercent.textContent = `${Math.round(summary.tier.discount * 100)}%`;
    if (els.drawerTierLabel) els.drawerTierLabel.textContent = summary.tier.label;

    if (els.drawerTierHint) {
      if (summary.subtotalSar < 5000) {
        els.drawerTierHint.textContent = `متبقي ${formatMoney(5000 - summary.subtotalSar)} لفتح شريحة 6% + شحن مجاني.`;
      } else if (summary.subtotalSar < 10000) {
        els.drawerTierHint.textContent = `ممتاز! فتحت خصم 6%. متبقي ${formatMoney(10000 - summary.subtotalSar)} لخصم 12%.`;
      } else if (summary.subtotalSar < 25000) {
        els.drawerTierHint.textContent = `شريحة المعارض (12%) مفعلة! متبقي ${formatMoney(25000 - summary.subtotalSar)} لأعلى خصم 18%.`;
      } else {
        els.drawerTierHint.textContent = 'تم تفعيل أعلى شريحة خصم للموزعين (18%) مع أولوية الشحن المجاني.';
      }
    }

    // Drawer items
    if (summary.items.length === 0) {
      if (els.drawerEmptyState) els.drawerEmptyState.hidden = false;
      if (els.drawerItemsList) els.drawerItemsList.innerHTML = '';
    } else {
      if (els.drawerEmptyState) els.drawerEmptyState.hidden = true;
      if (els.drawerItemsList) {
        els.drawerItemsList.innerHTML = summary.items
          .map(
            (it) => `
          <div class="drawer-item">
            <div class="drawer-item-top">
              <div>
                <strong>${it.product.title}</strong>
                <small dir="ltr">${it.product.skuCode} &bull; ${it.totalUnits} ${it.product.unitLabel}</small>
              </div>
              <button type="button" class="remove-item-btn" data-remove-id="${it.product.id}">حذف</button>
            </div>
            <div class="drawer-item-bottom">
              <div class="qty-stepper">
                <button type="button" class="drawer-qty-dec" data-id="${it.product.id}" aria-label="إنقاص">-</button>
                <span>${it.cartons}</span>
                <button type="button" class="drawer-qty-inc" data-id="${it.product.id}" aria-label="زيادة">+</button>
              </div>
              <div class="drawer-item-price">
                <strong>${formatMoney(it.lineSubtotal)}</strong>
                <small>${formatMoney(it.unitCartonPrice)} / كرتون</small>
              </div>
            </div>
          </div>`
          )
          .join('');
      }
    }

    // Totals
    if (els.drawerTotalQty) {
      els.drawerTotalQty.textContent = `${summary.totalCartons} كرتون (${summary.totalUnits} قطعة)`;
    }
    if (els.drawerSubtotal) els.drawerSubtotal.textContent = formatMoney(summary.subtotalSar);
    if (els.drawerDiscountAmount) {
      els.drawerDiscountAmount.textContent = `- ${formatMoney(summary.discountSar)} (${Math.round(summary.tier.discount * 100)}%)`;
    }
    if (els.drawerExpectedProfit) els.drawerExpectedProfit.textContent = formatMoney(summary.expectedProfitSar);
    if (els.drawerNetPayable) els.drawerNetPayable.textContent = formatMoney(summary.netPayableSar);
  }

  function updateCurrencyLabels() {
    const cur = CURRENCIES[state.currency];
    if (els.activeCurrencyName) els.activeCurrencyName.textContent = cur.name;
    if (els.heroMoqDisplay) els.heroMoqDisplay.textContent = formatMoney(WHOLESALE_CONFIG.minOrderAmount);
    if (els.tier5kLabel) els.tier5kLabel.textContent = `${formatMoney(5000)}+`;
    if (els.tier10kLabel) els.tier10kLabel.textContent = `${formatMoney(10000)}+`;
    if (els.tier25kLabel) els.tier25kLabel.textContent = `${formatMoney(25000)}+`;
    if (els.marker5k) els.marker5k.textContent = `${formatMoney(5000)} (6%)`;
    if (els.marker10k) els.marker10k.textContent = `${formatMoney(10000)} (12%)`;
    if (els.marker25k) els.marker25k.textContent = `${formatMoney(25000)} (18%)`;
  }

  function renderSimulator() {
    const cartons = state.simCartons;
    const markup = state.simMarkup;
    const turnover = state.simTurnover;

    if (els.simCartonsValue) els.simCartonsValue.textContent = `${cartons} كرتون`;
    if (els.simMarkupValue) els.simMarkupValue.textContent = `+${markup}%`;
    if (els.simTurnoverValue) els.simTurnoverValue.textContent = `${turnover.toFixed(1)} دورة / شهر`;

    const avgCartonCostSar = 620;
    const grossInvestmentSar = cartons * avgCartonCostSar;
    const tier = getVolumeTier(grossInvestmentSar);
    const savedSar = grossInvestmentSar * tier.discount;
    const netInvestmentSar = grossInvestmentSar - savedSar;

    const cycleRevenueSar = grossInvestmentSar * (1 + markup / 100);
    const monthlyRevenueSar = cycleRevenueSar * turnover;
    const monthlyCostSar = netInvestmentSar * turnover;
    const monthlyProfitSar = monthlyRevenueSar - monthlyCostSar;
    const annualProfitSar = monthlyProfitSar * 12;
    const roiPct = netInvestmentSar > 0 ? Math.round((monthlyProfitSar / netInvestmentSar) * 100) : 0;

    if (els.simTierText) {
      els.simTierText.textContent = tier.discount > 0 ? `خصم ${Math.round(tier.discount * 100)}% مفعّل` : 'الأساسي (أضف لـ 5,000 ر.س)';
    }
    if (els.simNetInvestment) els.simNetInvestment.textContent = formatMoney(netInvestmentSar);
    if (els.simDiscountSaved) els.simDiscountSaved.textContent = `توفير خصم الشريحة: ${formatMoney(savedSar)}`;
    if (els.simExpectedRevenue) els.simExpectedRevenue.textContent = formatMoney(monthlyRevenueSar);
    if (els.simMonthlyProfit) els.simMonthlyProfit.textContent = formatMoney(monthlyProfitSar);
    if (els.simAnnualProfit) els.simAnnualProfit.textContent = `عائد سنوي تقديري: ${formatMoney(annualProfitSar)}`;
    if (els.simRoiPercent) els.simRoiPercent.textContent = `${roiPct}%`;

    const totalBar = monthlyCostSar + monthlyProfitSar;
    const costPct = totalBar > 0 ? Math.round((monthlyCostSar / totalBar) * 100) : 60;
    const profitPct = 100 - costPct;
    if (els.simBarCost) els.simBarCost.style.width = `${costPct}%`;
    if (els.simBarProfit) els.simBarProfit.style.width = `${profitPct}%`;
  }

  function renderProcess() {
    if (!els.processList) return;
    els.processList.innerHTML = (DATA.processSteps || [])
      .map(
        (step) => `
      <div class="process-step">
        <span class="process-num" dir="ltr">${step.step}</span>
        <h3>${step.title}</h3>
        <p>${step.desc}</p>
      </div>`
      )
      .join('');
  }

  function renderPackages() {
    if (!els.packagesGrid) return;
    els.packagesGrid.innerHTML = (DATA.packages || [])
      .map((pkg) => {
        const numericPrice = Number(String(pkg.price).replace(/,/g, ''));
        const displayPrice = Number.isFinite(numericPrice) && numericPrice > 0 ? formatMoney(numericPrice) : pkg.price;
        const displayResale = pkg.resaleValue.includes('+')
          ? `قيمة بيع متوقعة: ${formatMoney(Number(pkg.resaleValue.replace(/[,+]/g, '')))}+`
          : pkg.resaleValue;

        return `
      <article class="package-card ${pkg.featured ? 'featured' : ''}">
        <span class="pkg-badge">${pkg.badge}</span>
        <h3>${pkg.name}</h3>
        <p class="pkg-sub">${pkg.subtitle}</p>
        <div class="pkg-price">
          <strong>${displayPrice}</strong>
          <small>${displayResale}</small>
        </div>
        <ul class="pkg-features">
          ${pkg.features
            .map(
              (f) => `
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${f}</span>
            </li>`
            )
            .join('')}
        </ul>
        <button type="button" class="btn ${pkg.featured ? 'btn-copper' : 'btn-primary'} btn-block pkg-order-btn" data-pkg-name="${pkg.name}" data-pkg-price="${displayPrice}">
          طلب هذه الباقة عبر واتساب
        </button>
      </article>`;
      })
      .join('');
  }

  function renderReviews() {
    if (!els.reviewsGrid) return;
    const starSvg =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

    els.reviewsGrid.innerHTML = (DATA.reviews || [])
      .map(
        (rev) => `
      <article class="review-card">
        <div class="review-stars" aria-label="تقييم ${rev.rating} من 5">
          ${starSvg.repeat(rev.rating || 5)}
        </div>
        <p>"${rev.text}"</p>
        <div class="review-author">
          <strong>${rev.name}</strong>
          <span>${rev.role}</span>
        </div>
      </article>`
      )
      .join('');
  }

  function renderFaqs() {
    if (!els.faqList) return;
    els.faqList.innerHTML = (DATA.faqs || [])
      .map(
        (item, idx) => `
      <div class="faq-item ${idx === 0 ? 'open' : ''}">
        <button type="button" class="faq-trigger" aria-expanded="${idx === 0}">
          <span>${item.q}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">${item.a}</div>
      </div>`
      )
      .join('');
  }

  function openDrawer() {
    if (!els.quoteDrawer || !els.drawerBackdrop) return;
    els.drawerBackdrop.hidden = false;
    els.quoteDrawer.classList.add('open');
    els.quoteDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!els.quoteDrawer || !els.drawerBackdrop) return;
    els.quoteDrawer.classList.remove('open');
    els.quoteDrawer.setAttribute('aria-hidden', 'true');
    els.drawerBackdrop.hidden = true;
    document.body.style.overflow = '';
  }

  function dispatchWhatsappOrder() {
    const summary = calculateQuoteSummary();
    if (summary.items.length === 0) {
      showToast('يرجى إضافة صنف واحد على الأقل إلى عرض السعر أولاً.');
      return;
    }

    const merchantName = (els.merchantNameInput?.value || '').trim() || 'عميل جملة جديد';
    const merchantCity = (els.merchantCityInput?.value || '').trim() || 'غير محددة';
    const cur = CURRENCIES[state.currency];

    const lines = [
      'السلام عليكم فريق مبيعات دار الأواني للتجارة والجملة',
      'طلب عرض سعر وتوريد تجاري (الفئة الفاخرة Pro)',
      '--------------------------------',
      `اسم التاجر / المنشأة: ${merchantName}`,
      `المدينة / الوجهة: ${merchantCity}`,
      `العملة المختارة: ${cur.code}`,
      '',
      'تفاصيل الكراتين والأصناف:'
    ];

    summary.items.forEach((it, idx) => {
      lines.push(
        `${idx + 1}. [${it.product.skuCode}] ${it.product.title} — ${it.cartons} كرتون (${formatMoney(it.lineSubtotal)})`
      );
    });

    lines.push('--------------------------------');
    lines.push(`إجمالي الكراتين: ${summary.totalCartons} كرتون (${summary.totalUnits} قطعة)`);
    lines.push(`المجموع الفرعي: ${formatMoney(summary.subtotalSar)}`);
    lines.push(`الشريحة المطبقة: ${summary.tier.label}`);
    lines.push(`خصم الكميات: ${formatMoney(summary.discountSar)}`);
    lines.push(`الصافي المطلوب: ${formatMoney(summary.netPayableSar)}`);
    lines.push(`ربح التاجر المتوقع: ${formatMoney(summary.expectedProfitSar)}`);

    const url = `https://wa.me/${WHOLESALE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function applySimulatorAllocation() {
    const targetCartons = state.simCartons;
    state.quoteCart = {};
    const perProduct = Math.max(1, Math.floor(targetCartons / products.length));
    let remainder = targetCartons - perProduct * products.length;

    products.forEach((p, idx) => {
      let qty = perProduct;
      if (remainder > 0 && idx < remainder) qty += 1;
      if (idx < targetCartons) {
        state.quoteCart[p.id] = qty > 0 ? qty : 1;
      }
    });

    renderQuoteDrawer();
    openDrawer();
    showToast(`تم توزيع ${targetCartons} كرتوناً بشكل متوازن داخل عرض السعر.`);
  }

  function bindEvents() {
    // Currency switcher
    document.querySelectorAll('.curr-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextCur = btn.dataset.currency;
        if (!CURRENCIES[nextCur]) return;
        state.currency = nextCur;
        document.querySelectorAll('.curr-btn').forEach((b) => b.classList.toggle('active', b === btn));
        updateCurrencyLabels();
        renderCatalog();
        renderQuoteDrawer();
        renderSimulator();
        renderPackages();
      });
    });

    // Mobile menu
    if (els.mobileMenuBtn && els.mobileNav) {
      els.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !els.mobileNav.hidden;
        els.mobileNav.hidden = isOpen;
        els.mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
      });
      els.mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          els.mobileNav.hidden = true;
          els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Category tabs
    if (els.categoryTabs) {
      els.categoryTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.cat-tab');
        if (!tab) return;
        state.category = tab.dataset.cat;
        renderCategoryTabs();
        renderCatalog();
      });
    }

    // Search & sort
    if (els.catalogSearch) {
      els.catalogSearch.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderCatalog();
      });
    }

    if (els.catalogSort) {
      els.catalogSort.addEventListener('change', (e) => {
        state.sort = e.target.value;
        renderCatalog();
      });
    }

    if (els.resetCatalogFilters) {
      els.resetCatalogFilters.addEventListener('click', () => {
        state.category = 'all';
        state.search = '';
        state.sort = 'featured';
        if (els.catalogSearch) els.catalogSearch.value = '';
        if (els.catalogSort) els.catalogSort.value = 'featured';
        renderCategoryTabs();
        renderCatalog();
      });
    }

    // Catalog grid actions (delegation)
    if (els.catalogGrid) {
      els.catalogGrid.addEventListener('click', (e) => {
        const decBtn = e.target.closest('.card-qty-dec');
        const incBtn = e.target.closest('.card-qty-inc');
        const addBtn = e.target.closest('.add-quote-btn');

        if (decBtn) {
          const id = decBtn.dataset.id;
          const current = state.cardCartons[id] || 1;
          state.cardCartons[id] = Math.max(1, current - 1);
          renderCatalog();
        } else if (incBtn) {
          const id = incBtn.dataset.id;
          const current = state.cardCartons[id] || 1;
          state.cardCartons[id] = current + 1;
          renderCatalog();
        } else if (addBtn) {
          const id = addBtn.dataset.addId;
          const qty = state.cardCartons[id] || 1;
          state.quoteCart[id] = (state.quoteCart[id] || 0) + qty;
          renderQuoteDrawer();
          const prod = products.find((p) => p.id === id);
          showToast(`تمت إضافة ${qty} كرتون من ${prod ? prod.skuCode : 'الصنف'} لعرض السعر.`);
        }
      });
    }

    // Drawer open / close
    if (els.openQuoteDrawerBtn) els.openQuoteDrawerBtn.addEventListener('click', openDrawer);
    if (els.floatingOpenDrawerBtn) els.floatingOpenDrawerBtn.addEventListener('click', openDrawer);
    if (els.closeQuoteDrawerBtn) els.closeQuoteDrawerBtn.addEventListener('click', closeDrawer);
    if (els.drawerBackdrop) els.drawerBackdrop.addEventListener('click', closeDrawer);

    // Drawer item steppers
    if (els.drawerItemsList) {
      els.drawerItemsList.addEventListener('click', (e) => {
        const decBtn = e.target.closest('.drawer-qty-dec');
        const incBtn = e.target.closest('.drawer-qty-inc');
        const remBtn = e.target.closest('.remove-item-btn');

        if (decBtn) {
          const id = decBtn.dataset.id;
          const next = (state.quoteCart[id] || 1) - 1;
          if (next <= 0) delete state.quoteCart[id];
          else state.quoteCart[id] = next;
          renderQuoteDrawer();
        } else if (incBtn) {
          const id = incBtn.dataset.id;
          state.quoteCart[id] = (state.quoteCart[id] || 0) + 1;
          renderQuoteDrawer();
        } else if (remBtn) {
          const id = remBtn.dataset.removeId;
          delete state.quoteCart[id];
          renderQuoteDrawer();
        }
      });
    }

    if (els.clearQuoteBtn) {
      els.clearQuoteBtn.addEventListener('click', () => {
        state.quoteCart = {};
        renderQuoteDrawer();
        showToast('تم تفريغ قائمة عرض السعر.');
      });
    }

    if (els.dispatchWhatsappBtn) {
      els.dispatchWhatsappBtn.addEventListener('click', dispatchWhatsappOrder);
    }

    // Simulator sliders & presets
    const syncPresets = () => {
      document.querySelectorAll('.sim-preset-btn').forEach((b) => {
        const match =
          Number(b.dataset.cartons) === state.simCartons &&
          Number(b.dataset.markup) === state.simMarkup &&
          Number(b.dataset.turnover) === state.simTurnover;
        b.classList.toggle('active', match);
      });
    };

    document.querySelectorAll('.sim-preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.simCartons = Number(btn.dataset.cartons);
        state.simMarkup = Number(btn.dataset.markup);
        state.simTurnover = Number(btn.dataset.turnover);
        if (els.simCartonsRange) els.simCartonsRange.value = state.simCartons;
        if (els.simMarkupRange) els.simMarkupRange.value = state.simMarkup;
        if (els.simTurnoverRange) els.simTurnoverRange.value = state.simTurnover;
        syncPresets();
        renderSimulator();
      });
    });

    if (els.simCartonsRange) {
      els.simCartonsRange.addEventListener('input', (e) => {
        state.simCartons = Number(e.target.value);
        syncPresets();
        renderSimulator();
      });
    }

    if (els.simMarkupRange) {
      els.simMarkupRange.addEventListener('input', (e) => {
        state.simMarkup = Number(e.target.value);
        syncPresets();
        renderSimulator();
      });
    }

    if (els.simTurnoverRange) {
      els.simTurnoverRange.addEventListener('input', (e) => {
        state.simTurnover = Number(e.target.value);
        syncPresets();
        renderSimulator();
      });
    }

    if (els.applySimToQuoteBtn) {
      els.applySimToQuoteBtn.addEventListener('click', applySimulatorAllocation);
    }

    // Package order buttons
    if (els.packagesGrid) {
      els.packagesGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.pkg-order-btn');
        if (!btn) return;
        const msg = `السلام عليكم، أرغب في طلب (${btn.dataset.pkgName}) بسعر ${btn.dataset.pkgPrice} عبر بوابة دار الأواني (الفئة الفاخرة Pro).`;
        window.open(`https://wa.me/${WHOLESALE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
      });
    }

    // FAQ accordion
    if (els.faqList) {
      els.faqList.addEventListener('click', (e) => {
        const trigger = e.target.closest('.faq-trigger');
        if (!trigger) return;
        const item = trigger.closest('.faq-item');
        const isOpen = item.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
      });
    }
  }

  function init() {
    updateCurrencyLabels();
    renderStandards();
    renderCategoryTabs();
    renderCatalog();
    renderSimulator();
    renderProcess();
    renderPackages();
    renderReviews();
    renderFaqs();
    renderQuoteDrawer();
    bindEvents();
  }

  init();
})();
