/* ============================================================
   دار الأواني للتجارة والجملة — VIP Tier ($250)
   Global Supply Chain Command Portal & Pro-Forma Generator
   ============================================================ */

(function () {
  'use strict';

  const CURRENCIES = {
    SAR: { code: 'SAR', symbol: 'ر.س', rate: 1, decimals: 0 },
    AED: { code: 'AED', symbol: 'د.إ', rate: 0.98, decimals: 0 },
    USD: { code: 'USD', symbol: '$', rate: 0.2667, decimals: 2 }
  };

  // Normalize products from ../assets/js/data.js
  const products = (DATA.products || []).map((p) => {
    const imgPath = p.img.startsWith('../') ? p.img : '../' + p.img.replace(/^\/+/, '');
    const numericWeight = parseFloat(String(p.weightKg).replace(/[^\d.]/g, '')) || 18;
    const marginPct = Math.round(((p.suggestedRetail - p.unitWholesale) / p.unitWholesale) * 100);
    return { ...p, img: imgPath, numericWeight, marginPct };
  });

  // 3 Turnkey Showroom Opening Presets balanced across all 6 categories
  const OPENING_PRESETS = [
    {
      id: 'neighborhood-15k',
      code: 'PRESET-15K',
      title: 'متجر حي متكامل — 15k',
      subtitle: 'تشكيلة افتتاح متوازنة تغطي كافة الأقسام الستة لبدء المبيعات الفورية بأسرع دوران.',
      tierNote: 'يفتح خصم 12% + شحن مجاني',
      categoriesCovered: ['الطهي', 'الضيافة', 'السفرة', 'التخزين', 'الأجهزة', 'النظافة'],
      allocation: {
        'sku-01': 3, 'sku-07': 2,
        'sku-02': 3, 'sku-08': 2,
        'sku-03': 2, 'sku-12': 2,
        'sku-04': 3, 'sku-10': 2,
        'sku-05': 2, 'sku-09': 2,
        'sku-06': 3, 'sku-11': 2
      }
    },
    {
      id: 'showroom-35k',
      code: 'PRESET-35K',
      title: 'معرض متوسط — 35k',
      subtitle: 'تجهيز شامل لصالة عرض متخصصة بعمق مخزون مرتفع في الجرانيت وأطقم الضيافة.',
      tierNote: 'يفتح أقصى خصم 18% فوري',
      categoriesCovered: ['الطهي', 'الضيافة', 'السفرة', 'التخزين', 'الأجهزة', 'النظافة'],
      allocation: {
        'sku-01': 8, 'sku-07': 5,
        'sku-02': 7, 'sku-08': 6,
        'sku-03': 6, 'sku-12': 4,
        'sku-04': 6, 'sku-10': 5,
        'sku-05': 6, 'sku-09': 5,
        'sku-06': 6, 'sku-11': 5
      }
    },
    {
      id: 'hypermarket-75k',
      code: 'PRESET-75K',
      title: 'هايبرماركت جناح كامل — 75k',
      subtitle: 'توريد بالطبليات لتغطية جناح أدوات منزلية متكامل بأسعار الشريحة العليا.',
      tierNote: 'خصم 18% + أسعار 20+ كرتون',
      categoriesCovered: ['توريد طبليات', 'كافة الـ 12 SKU', 'أولوية الشحن', 'ملصقات باركود'],
      allocation: {
        'sku-01': 15, 'sku-07': 12,
        'sku-02': 14, 'sku-08': 12,
        'sku-03': 12, 'sku-12': 12,
        'sku-04': 15, 'sku-10': 14,
        'sku-05': 12, 'sku-09': 12,
        'sku-06': 15, 'sku-11': 14
      }
    }
  ];

  const state = {
    currency: 'SAR',
    category: 'all',
    search: '',
    viewMode: 'grid', // 'grid' | 'table'
    activePresetId: null,
    manifest: {}, // { skuId: cartons }
    refCode: `DAQ-VIP-2026-${Math.floor(1000 + Math.random() * 9000)}`
  };

  const els = {
    headerManifestCount: document.getElementById('headerManifestCount'),
    headerProformaBtn: document.getElementById('headerProformaBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileNav: document.getElementById('mobileNav'),
    presetsGrid: document.getElementById('presetsGrid'),
    activePresetName: document.getElementById('activePresetName'),
    vipSearchInput: document.getElementById('vipSearchInput'),
    vipCategoryTabs: document.getElementById('vipCategoryTabs'),
    vipCatalogContainer: document.getElementById('vipCatalogContainer'),
    clearManifestBtn: document.getElementById('clearManifestBtn'),
    manifestTierLabel: document.getElementById('manifestTierLabel'),
    manifestTierRate: document.getElementById('manifestTierRate'),
    manifestTierFill: document.getElementById('manifestTierFill'),
    manifestTierNextHint: document.getElementById('manifestTierNextHint'),
    manifestLoadText: document.getElementById('manifestLoadText'),
    manifestLoadFill: document.getElementById('manifestLoadFill'),
    manifestItemsList: document.getElementById('manifestItemsList'),
    manifestCounts: document.getElementById('manifestCounts'),
    manifestSubtotal: document.getElementById('manifestSubtotal'),
    manifestDiscount: document.getElementById('manifestDiscount'),
    manifestNetPayable: document.getElementById('manifestNetPayable'),
    manifestRetailRevenue: document.getElementById('manifestRetailRevenue'),
    manifestProfitSummary: document.getElementById('manifestProfitSummary'),
    openProformaModalBtn: document.getElementById('openProformaModalBtn'),
    manifestWhatsappBtn: document.getElementById('manifestWhatsappBtn'),
    vipStandardsGrid: document.getElementById('vipStandardsGrid'),
    vipProcessGrid: document.getElementById('vipProcessGrid'),
    vipFaqList: document.getElementById('vipFaqList'),
    proformaBackdrop: document.getElementById('proformaBackdrop'),
    proformaModal: document.getElementById('proformaModal'),
    closeProformaModalBtn: document.getElementById('closeProformaModalBtn'),
    copyProformaBtn: document.getElementById('copyProformaBtn'),
    printProformaBtn: document.getElementById('printProformaBtn'),
    proformaWhatsappBtn: document.getElementById('proformaWhatsappBtn'),
    pfCompanyInput: document.getElementById('pfCompanyInput'),
    pfVatInput: document.getElementById('pfVatInput'),
    pfCityInput: document.getElementById('pfCityInput'),
    pfRefNumber: document.getElementById('pfRefNumber'),
    pfDate: document.getElementById('pfDate'),
    pfCurrency: document.getElementById('pfCurrency'),
    pfCompanyDisplay: document.getElementById('pfCompanyDisplay'),
    pfVatCityDisplay: document.getElementById('pfVatCityDisplay'),
    pfTableBody: document.getElementById('pfTableBody'),
    pfSubtotal: document.getElementById('pfSubtotal'),
    pfTierPct: document.getElementById('pfTierPct'),
    pfDiscount: document.getElementById('pfDiscount'),
    pfNetPayable: document.getElementById('pfNetPayable'),
    pfRetailRevenue: document.getElementById('pfRetailRevenue'),
    pfNetMargin: document.getElementById('pfNetMargin'),
    vipToast: document.getElementById('vipToast')
  };

  let toastTimer = null;

  function showToast(msg) {
    if (!els.vipToast) return;
    els.vipToast.textContent = msg;
    els.vipToast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.vipToast.hidden = true;
    }, 2800);
  }

  function formatMoney(amountSar) {
    const cur = CURRENCIES[state.currency];
    const val = amountSar * cur.rate;
    const str = val.toLocaleString('en-US', {
      minimumFractionDigits: cur.decimals,
      maximumFractionDigits: cur.decimals
    });
    return cur.code === 'USD' ? `$${str}` : `${str} ${cur.symbol}`;
  }

  function getCartonPriceSar(product, cartons) {
    if (cartons >= 20 && product.tier20Price) return product.tier20Price;
    if (cartons >= 5 && product.tier5Price) return product.tier5Price;
    return product.cartonPrice;
  }

  function getVolumeTier(subtotalSar) {
    const tiers = WHOLESALE_CONFIG.volumeTiers;
    for (let i = 0; i < tiers.length; i += 1) {
      if (subtotalSar >= tiers[i].min) return tiers[i];
    }
    return tiers[tiers.length - 1];
  }

  function computeAllocationTotals(allocationMap) {
    const items = Object.entries(allocationMap)
      .filter(([, cartons]) => cartons > 0)
      .map(([skuId, cartons]) => {
        const product = products.find((p) => p.id === skuId);
        if (!product) return null;
        const unitCartonPrice = getCartonPriceSar(product, cartons);
        const lineSubtotalSar = unitCartonPrice * cartons;
        const totalUnits = product.unitsPerCarton * cartons;
        const lineRetailSar = product.suggestedRetail * totalUnits;
        const lineWeightKg = product.numericWeight * cartons;
        return {
          product,
          cartons,
          totalUnits,
          unitCartonPrice,
          lineSubtotalSar,
          lineRetailSar,
          lineWeightKg
        };
      })
      .filter(Boolean);

    const totalCartons = items.reduce((s, it) => s + it.cartons, 0);
    const totalUnits = items.reduce((s, it) => s + it.totalUnits, 0);
    const totalWeightKg = items.reduce((s, it) => s + it.lineWeightKg, 0);
    const subtotalSar = items.reduce((s, it) => s + it.lineSubtotalSar, 0);
    const retailRevenueSar = items.reduce((s, it) => s + it.lineRetailSar, 0);
    const tier = getVolumeTier(subtotalSar);
    const discountSar = subtotalSar * tier.discount;
    const netPayableSar = subtotalSar - discountSar;
    const netProfitSar = Math.max(0, retailRevenueSar - netPayableSar);
    const netMarginPct = retailRevenueSar > 0 ? Math.round((netProfitSar / retailRevenueSar) * 100) : 0;

    return {
      items,
      totalCartons,
      totalUnits,
      totalWeightKg,
      subtotalSar,
      retailRevenueSar,
      tier,
      discountSar,
      netPayableSar,
      netProfitSar,
      netMarginPct
    };
  }

  function renderPresets() {
    if (!els.presetsGrid) return;
    els.presetsGrid.innerHTML = OPENING_PRESETS.map((preset) => {
      const stats = computeAllocationTotals(preset.allocation);
      const isSelected = state.activePresetId === preset.id;
      return `
      <article class="preset-card ${isSelected ? 'selected' : ''}">
        <div class="preset-top">
          <span class="preset-code" dir="ltr">${preset.code}</span>
          <span class="preset-tier">${preset.tierNote}</span>
        </div>
        <h3>${preset.title}</h3>
        <p class="preset-desc">${preset.subtitle}</p>
        <div class="preset-metrics">
          <div>
            <span>الصافي بعد الخصم</span>
            <strong>${formatMoney(stats.netPayableSar)}</strong>
          </div>
          <div>
            <span>الربح المتوقع (${stats.netMarginPct}%)</span>
            <strong>${formatMoney(stats.netProfitSar)}</strong>
          </div>
        </div>
        <div class="preset-cats">
          <span>${stats.totalCartons} كرتون</span>
          <span>${stats.totalUnits} قطعة</span>
          ${preset.categoriesCovered.map((c) => `<span>${c}</span>`).join('')}
        </div>
        <button type="button" class="btn btn-champagne btn-block preset-btn" data-preset-id="${preset.id}">
          ${isSelected ? 'تمت التعبئة — أعد التطبيق' : 'تعبئة المانيفست بهذه الباقة'}
        </button>
      </article>`;
    }).join('');
  }

  function renderCategoryTabs() {
    if (!els.vipCategoryTabs) return;
    els.vipCategoryTabs.innerHTML = (DATA.categories || [])
      .map((cat) => {
        const count =
          cat.id === 'all'
            ? products.length
            : products.filter((p) => p.category === cat.id).length;
        const active = state.category === cat.id ? 'active' : '';
        return `<button type="button" class="vip-cat-btn ${active}" data-cat="${cat.id}">${
          cat.id === 'all' ? `الكل (${count})` : `${cat.name} (${count})`
        }</button>`;
      })
      .join('');
  }

  function getFilteredProducts() {
    const q = state.search.trim().toLowerCase();
    return products.filter((p) => {
      const catOk = state.category === 'all' || p.category === state.category;
      const searchOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.skuCode.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }

  function renderCatalogBuilder() {
    if (!els.vipCatalogContainer) return;
    const list = getFilteredProducts();

    if (list.length === 0) {
      els.vipCatalogContainer.innerHTML =
        '<div class="manifest-empty">لا توجد أصناف مطابقة للبحث الحالي.</div>';
      return;
    }

    if (state.viewMode === 'table') {
      els.vipCatalogContainer.innerHTML = `
      <div class="trade-table-wrap">
        <table class="trade-table">
          <thead>
            <tr>
              <th>الصنف والباركود</th>
              <th>الوحدات/كرتون</th>
              <th>سعر الكرتون</th>
              <th>البيع المقترح</th>
              <th>الهامش</th>
              <th>الكمية (كرتون)</th>
              <th>إجمالي السطر</th>
            </tr>
          </thead>
          <tbody>
            ${list
              .map((p) => {
                const qty = state.manifest[p.id] || 0;
                const price = getCartonPriceSar(p, qty || 1);
                const lineTotal = qty * price;
                return `
              <tr>
                <td>
                  <div class="table-sku-cell">
                    <img src="${p.img}" alt="${p.title}" loading="lazy" />
                    <div>
                      <strong>${p.title}</strong>
                      <small dir="ltr">${p.skuCode} &bull; ${p.weightKg}</small>
                    </div>
                  </div>
                </td>
                <td>${p.unitsPerCarton} ${p.unitLabel}</td>
                <td dir="ltr">${formatMoney(price)}</td>
                <td dir="ltr">${formatMoney(p.suggestedRetail)}</td>
                <td>+${p.marginPct}%</td>
                <td>
                  <input type="number" min="0" max="500" class="table-qty-input" data-table-qty-id="${p.id}" value="${qty}" aria-label="كمية ${p.skuCode}" />
                </td>
                <td dir="ltr"><strong>${formatMoney(lineTotal)}</strong></td>
              </tr>`;
              })
              .join('')}
          </tbody>
        </table>
      </div>`;
      return;
    }

    els.vipCatalogContainer.innerHTML = `
    <div class="vip-grid">
      ${list
        .map((p) => {
          const qty = state.manifest[p.id] || 0;
          const price = getCartonPriceSar(p, qty || 1);
          const lineTotal = qty * price;
          return `
        <article class="vip-sku-card">
          <div class="vip-sku-media">
            <img src="${p.img}" alt="${p.title}" loading="lazy" />
            <span class="vip-sku-code" dir="ltr">${p.skuCode}</span>
            <span class="vip-sku-margin">هامش +${p.marginPct}%</span>
          </div>
          <div class="vip-sku-body">
            <h3>${p.title}</h3>
            <div class="vip-sku-meta">${p.unitsPerCarton} ${p.unitLabel}/كرتون &bull; ${p.weightKg}</div>
            <div class="vip-price-strip">
              <div>
                <span>كرتون جملة</span>
                <strong>${formatMoney(price)}</strong>
              </div>
              <div>
                <span>20+ كرتون</span>
                <strong>${formatMoney(p.tier20Price)}</strong>
              </div>
              <div>
                <span>تجزئة مقترح</span>
                <strong>${formatMoney(p.suggestedRetail)}</strong>
              </div>
            </div>
            <div class="vip-card-actions">
              <div class="trade-stepper">
                <button type="button" class="vip-qty-dec" data-id="${p.id}" aria-label="إنقاص">-</button>
                <span>${qty}</span>
                <button type="button" class="vip-qty-inc" data-id="${p.id}" aria-label="زيادة">+</button>
              </div>
              <span class="vip-line-total">${qty > 0 ? formatMoney(lineTotal) : '0 كرتون'}</span>
            </div>
          </div>
        </article>`;
        })
        .join('')}
    </div>`;
  }

  function renderManifestPanel() {
    const summary = computeAllocationTotals(state.manifest);

    if (els.headerManifestCount) {
      els.headerManifestCount.textContent = summary.totalCartons;
    }

    const progressPct = Math.min(100, Math.round((summary.subtotalSar / 25000) * 100));
    if (els.manifestTierLabel) els.manifestTierLabel.textContent = summary.tier.label;
    if (els.manifestTierRate) els.manifestTierRate.textContent = `${Math.round(summary.tier.discount * 100)}%`;
    if (els.manifestTierFill) els.manifestTierFill.style.width = `${progressPct}%`;

    if (els.manifestTierNextHint) {
      if (summary.subtotalSar < 5000) {
        els.manifestTierNextHint.textContent = `أضف ${formatMoney(5000 - summary.subtotalSar)} لفتح خصم 6% + شحن مجاني.`;
      } else if (summary.subtotalSar < 10000) {
        els.manifestTierNextHint.textContent = `متبقي ${formatMoney(10000 - summary.subtotalSar)} للوصول إلى خصم المعارض 12%.`;
      } else if (summary.subtotalSar < 25000) {
        els.manifestTierNextHint.textContent = `متبقي ${formatMoney(25000 - summary.subtotalSar)} لتفعيل أقصى خصم للموزعين 18%.`;
      } else {
        els.manifestTierNextHint.textContent = 'تم تفعيل أقصى خصم تجاري (18%) مع أولوية التجهيز والشحن.';
      }
    }

    // Weight & pallet load estimation (1 standard pallet ~ 750 kg)
    const palletPct = Math.min(100, Math.round((summary.totalWeightKg / 1500) * 100));
    if (els.manifestLoadText) {
      els.manifestLoadText.textContent = `${summary.totalWeightKg.toLocaleString('en-US')} كجم • ${palletPct}% سعة شحنة`;
    }
    if (els.manifestLoadFill) {
      els.manifestLoadFill.style.width = `${palletPct}%`;
    }

    // Line items
    if (els.manifestItemsList) {
      if (summary.items.length === 0) {
        els.manifestItemsList.innerHTML =
          '<div class="manifest-empty">اختر باقة افتتاح جاهزة أو أضف كراتين من الأصناف لتجهيز المانيفست.</div>';
      } else {
        els.manifestItemsList.innerHTML = summary.items
          .map(
            (it) => `
          <div class="manifest-line-item">
            <div>
              <strong>${it.product.title}</strong>
              <small dir="ltr">${it.product.skuCode} &times; ${it.cartons} كرتون (${it.totalUnits} قطعة)</small>
            </div>
            <div class="trade-stepper">
              <button type="button" class="vip-qty-dec" data-id="${it.product.id}" aria-label="إنقاص">-</button>
              <span>${it.cartons}</span>
              <button type="button" class="vip-qty-inc" data-id="${it.product.id}" aria-label="زيادة">+</button>
            </div>
          </div>`
          )
          .join('');
      }
    }

    if (els.manifestCounts) {
      els.manifestCounts.textContent = `${summary.items.length} صنف • ${summary.totalCartons} كرتون`;
    }
    if (els.manifestSubtotal) els.manifestSubtotal.textContent = formatMoney(summary.subtotalSar);
    if (els.manifestDiscount) {
      els.manifestDiscount.textContent = `- ${formatMoney(summary.discountSar)} (${Math.round(summary.tier.discount * 100)}%)`;
    }
    if (els.manifestNetPayable) els.manifestNetPayable.textContent = formatMoney(summary.netPayableSar);
    if (els.manifestRetailRevenue) els.manifestRetailRevenue.textContent = formatMoney(summary.retailRevenueSar);
    if (els.manifestProfitSummary) {
      els.manifestProfitSummary.textContent = `${formatMoney(summary.netProfitSar)} (${summary.netMarginPct}%)`;
    }
  }

  function renderOperationsAndFaq() {
    if (els.vipStandardsGrid) {
      els.vipStandardsGrid.innerHTML = (DATA.standards || [])
        .map(
          (s) => `
        <div class="ops-std-card">
          <div class="ops-std-icon" aria-hidden="true">${s.icon}</div>
          <div>
            <strong>${s.name}</strong>
            <span>${s.desc}</span>
          </div>
        </div>`
        )
        .join('');
    }

    if (els.vipProcessGrid) {
      els.vipProcessGrid.innerHTML = (DATA.processSteps || [])
        .map(
          (step) => `
        <article class="ops-step-card">
          <span dir="ltr">${step.step}</span>
          <h3>${step.title}</h3>
          <p>${step.desc}</p>
        </article>`
        )
        .join('');
    }

    if (els.vipFaqList) {
      els.vipFaqList.innerHTML = (DATA.faqs || [])
        .map(
          (f) => `
        <article class="vip-faq-card">
          <h3>${f.q}</h3>
          <p>${f.a}</p>
        </article>`
        )
        .join('');
    }
  }

  function populateProformaSheet() {
    const summary = computeAllocationTotals(state.manifest);
    const cur = CURRENCIES[state.currency];
    const company = (els.pfCompanyInput?.value || '').trim() || 'عميل التوريد المؤسسي';
    const vat = (els.pfVatInput?.value || '').trim() || 'قيد التحديث';
    const city = (els.pfCityInput?.value || '').trim() || 'غير محددة';

    if (els.pfRefNumber) els.pfRefNumber.textContent = state.refCode;
    if (els.pfDate) els.pfDate.textContent = new Date().toISOString().slice(0, 10);
    if (els.pfCurrency) els.pfCurrency.textContent = cur.code;
    if (els.pfCompanyDisplay) els.pfCompanyDisplay.textContent = company;
    if (els.pfVatCityDisplay) {
      els.pfVatCityDisplay.textContent = `المدينة: ${city} • السجل/الرقم الضريبي: ${vat}`;
    }

    if (els.pfTableBody) {
      els.pfTableBody.innerHTML = summary.items
        .map(
          (it, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td dir="ltr"><strong>${it.product.skuCode}</strong></td>
          <td>${it.product.title}</td>
          <td dir="ltr">${it.cartons}</td>
          <td dir="ltr">${it.totalUnits}</td>
          <td dir="ltr">${formatMoney(it.unitCartonPrice)}</td>
          <td dir="ltr"><strong>${formatMoney(it.lineSubtotalSar)}</strong></td>
          <td dir="ltr">${formatMoney(it.lineRetailSar)}</td>
        </tr>`
        )
        .join('');
    }

    if (els.pfSubtotal) els.pfSubtotal.textContent = formatMoney(summary.subtotalSar);
    if (els.pfTierPct) els.pfTierPct.textContent = `${Math.round(summary.tier.discount * 100)}%`;
    if (els.pfDiscount) els.pfDiscount.textContent = `- ${formatMoney(summary.discountSar)}`;
    if (els.pfNetPayable) els.pfNetPayable.textContent = formatMoney(summary.netPayableSar);
    if (els.pfRetailRevenue) els.pfRetailRevenue.textContent = formatMoney(summary.retailRevenueSar);
    if (els.pfNetMargin) {
      els.pfNetMargin.textContent = `${formatMoney(summary.netProfitSar)} (${summary.netMarginPct}%)`;
    }
  }

  function openProformaModal() {
    const summary = computeAllocationTotals(state.manifest);
    if (summary.items.length === 0) {
      showToast('اختر باقة افتتاح أو أضف كراتين أولاً لإصدار عرض السعر الرسمي.');
      return;
    }
    populateProformaSheet();
    if (els.proformaBackdrop) {
      els.proformaBackdrop.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function closeProformaModal() {
    if (els.proformaBackdrop) {
      els.proformaBackdrop.hidden = true;
      document.body.style.overflow = '';
    }
  }

  function buildWhatsappText() {
    const summary = computeAllocationTotals(state.manifest);
    const cur = CURRENCIES[state.currency];
    const company = (els.pfCompanyInput?.value || '').trim() || 'شريك توريد مؤسسي';
    const vat = (els.pfVatInput?.value || '').trim() || 'غير مرفق';
    const city = (els.pfCityInput?.value || '').trim() || 'غير محددة';
    const presetObj = OPENING_PRESETS.find((p) => p.id === state.activePresetId);

    const lines = [
      'السلام عليكم إدارة كبار العملاء — دار الأواني للتجارة والجملة',
      'اعتماد أمر توريد تنفيذي (الفئة الملكية VIP)',
      `رقم المرجع: ${state.refCode}`,
      '--------------------------------',
      `المنشأة / المشتري: ${company}`,
      `الرقم الضريبي / السجل: ${vat}`,
      `المدينة / وجهة التسليم: ${city}`,
      `الباقة / الوضع: ${presetObj ? presetObj.title : 'بناء حاوية مخصصة'}`,
      `العملة: ${cur.code}`,
      '',
      'بيان الأصناف (SKU):'
    ];

    summary.items.forEach((it, idx) => {
      lines.push(
        `${idx + 1}. [${it.product.skuCode}] ${it.product.title} — ${it.cartons} كرتون (${it.totalUnits} قطعة) = ${formatMoney(it.lineSubtotalSar)}`
      );
    });

    lines.push('--------------------------------');
    lines.push(`إجمالي الكراتين: ${summary.totalCartons} كرتون (${summary.totalUnits} قطعة)`);
    lines.push(`الوزن التقديري: ${summary.totalWeightKg} كجم`);
    lines.push(`إجمالي الجملة: ${formatMoney(summary.subtotalSar)}`);
    lines.push(`خصم الشريحة (${Math.round(summary.tier.discount * 100)}%): - ${formatMoney(summary.discountSar)}`);
    lines.push(`صافي الفاتورة المستحق: ${formatMoney(summary.netPayableSar)}`);
    lines.push(`عائد التجزئة المتوقع: ${formatMoney(summary.retailRevenueSar)}`);
    lines.push(`صافي ربح التاجر المتوقع: ${formatMoney(summary.netProfitSar)} (${summary.netMarginPct}%)`);

    return lines.join('\n');
  }

  function dispatchVipWhatsapp() {
    const summary = computeAllocationTotals(state.manifest);
    if (summary.items.length === 0) {
      showToast('قائمة التوريد فارغة. اختر باقة أو أضف أصنافاً أولاً.');
      return;
    }
    const text = buildWhatsappText();
    const url = `https://wa.me/${WHOLESALE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function copyProformaToClipboard() {
    const text = buildWhatsappText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => showToast('تم نسخ نص عرض السعر التجاري إلى الحافظة بنجاح.'))
        .catch(() => showToast('تعذر النسخ التلقائي — يمكنك استخدام زر الطباعة أو واتساب.'));
    } else {
      showToast('المتصفح لا يدعم النسخ التلقائي.');
    }
  }

  function adjustManifestItem(skuId, delta) {
    const current = state.manifest[skuId] || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) delete state.manifest[skuId];
    else state.manifest[skuId] = next;

    state.activePresetId = null;
    if (els.activePresetName) els.activePresetName.textContent = 'تخصيص يدوي مفتوح';
    renderPresets();
    renderCatalogBuilder();
    renderManifestPanel();
  }

  function applyPreset(presetId) {
    const preset = OPENING_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    state.activePresetId = preset.id;
    state.manifest = { ...preset.allocation };
    if (els.activePresetName) els.activePresetName.textContent = preset.title;
    renderPresets();
    renderCatalogBuilder();
    renderManifestPanel();
    showToast(`تمت تعبئة المانيفست تلقائياً بباقة (${preset.title}).`);
  }

  function bindEvents() {
    // Currency switch
    document.querySelectorAll('.curr-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cur = btn.dataset.currency;
        if (!CURRENCIES[cur]) return;
        state.currency = cur;
        document.querySelectorAll('.curr-btn').forEach((b) => b.classList.toggle('active', b === btn));
        renderPresets();
        renderCatalogBuilder();
        renderManifestPanel();
        if (els.proformaBackdrop && !els.proformaBackdrop.hidden) populateProformaSheet();
      });
    });

    // Mobile drawer
    if (els.mobileMenuBtn && els.mobileNav) {
      els.mobileMenuBtn.addEventListener('click', () => {
        const open = !els.mobileNav.hidden;
        els.mobileNav.hidden = open;
        els.mobileMenuBtn.setAttribute('aria-expanded', String(!open));
      });
      els.mobileNav.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
          els.mobileNav.hidden = true;
          els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Presets click
    if (els.presetsGrid) {
      els.presetsGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.preset-btn');
        if (!btn) return;
        applyPreset(btn.dataset.presetId);
      });
    }

    // View mode switch
    document.querySelectorAll('.view-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.viewMode = btn.dataset.view;
        document.querySelectorAll('.view-btn').forEach((b) => b.classList.toggle('active', b === btn));
        renderCatalogBuilder();
      });
    });

    // Category tabs
    if (els.vipCategoryTabs) {
      els.vipCategoryTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.vip-cat-btn');
        if (!btn) return;
        state.category = btn.dataset.cat;
        renderCategoryTabs();
        renderCatalogBuilder();
      });
    }

    // Search
    if (els.vipSearchInput) {
      els.vipSearchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderCatalogBuilder();
      });
    }

    // Catalog builder interactions (steppers + table numeric inputs)
    if (els.vipCatalogContainer) {
      els.vipCatalogContainer.addEventListener('click', (e) => {
        const dec = e.target.closest('.vip-qty-dec');
        const inc = e.target.closest('.vip-qty-inc');
        if (dec) adjustManifestItem(dec.dataset.id, -1);
        else if (inc) adjustManifestItem(inc.dataset.id, 1);
      });

      els.vipCatalogContainer.addEventListener('change', (e) => {
        const input = e.target.closest('.table-qty-input');
        if (!input) return;
        const id = input.dataset.tableQtyId;
        const val = Math.max(0, parseInt(input.value, 10) || 0);
        if (val === 0) delete state.manifest[id];
        else state.manifest[id] = val;
        state.activePresetId = null;
        if (els.activePresetName) els.activePresetName.textContent = 'تخصيص يدوي مفتوح';
        renderPresets();
        renderCatalogBuilder();
        renderManifestPanel();
      });
    }

    // Manifest panel steppers
    if (els.manifestItemsList) {
      els.manifestItemsList.addEventListener('click', (e) => {
        const dec = e.target.closest('.vip-qty-dec');
        const inc = e.target.closest('.vip-qty-inc');
        if (dec) adjustManifestItem(dec.dataset.id, -1);
        else if (inc) adjustManifestItem(inc.dataset.id, 1);
      });
    }

    if (els.clearManifestBtn) {
      els.clearManifestBtn.addEventListener('click', () => {
        state.manifest = {};
        state.activePresetId = null;
        if (els.activePresetName) els.activePresetName.textContent = 'تخصيص يدوي مفتوح';
        renderPresets();
        renderCatalogBuilder();
        renderManifestPanel();
        showToast('تم تفريغ المانيفست.');
      });
    }

    // Modals & dispatches
    if (els.openProformaModalBtn) els.openProformaModalBtn.addEventListener('click', openProformaModal);
    if (els.headerProformaBtn) els.headerProformaBtn.addEventListener('click', openProformaModal);
    if (els.closeProformaModalBtn) els.closeProformaModalBtn.addEventListener('click', closeProformaModal);
    if (els.proformaBackdrop) {
      els.proformaBackdrop.addEventListener('click', (e) => {
        if (e.target === els.proformaBackdrop) closeProformaModal();
      });
    }

    [els.pfCompanyInput, els.pfVatInput, els.pfCityInput].forEach((inp) => {
      if (inp) inp.addEventListener('input', populateProformaSheet);
    });

    if (els.printProformaBtn) {
      els.printProformaBtn.addEventListener('click', () => {
        populateProformaSheet();
        window.print();
      });
    }

    if (els.copyProformaBtn) els.copyProformaBtn.addEventListener('click', copyProformaToClipboard);
    if (els.manifestWhatsappBtn) els.manifestWhatsappBtn.addEventListener('click', dispatchVipWhatsapp);
    if (els.proformaWhatsappBtn) els.proformaWhatsappBtn.addEventListener('click', dispatchVipWhatsapp);
  }

  function init() {
    renderPresets();
    renderCategoryTabs();
    renderCatalogBuilder();
    renderManifestPanel();
    renderOperationsAndFaq();
    bindEvents();
  }

  init();
})();
