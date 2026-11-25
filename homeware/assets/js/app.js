/* ============================================================
   دار الأواني للتجارة والجملة — Interactive Application Logic
   assets/js/app.js
   ============================================================ */

(function () {
  'use strict';

  // ── Helper: Number Formatting ─────────────────────────────
  const fmt = (num) => Math.round(num).toLocaleString('en-US');

  // ── Application State ─────────────────────────────────────
  const state = {
    activeCategory: 'all',
    searchQuery: '',
    quoteCart: {}, // { productId: cartonCount }
    calc: {
      bizType: 'متجر إلكتروني / ناشئ',
      budget: 12500,
      margin: 0.55
    },
    activeModalProductId: null
  };

  // ── 0. Promo Bar & Sticky Header & Mobile Drawer ──────────
  const promoBar = document.getElementById('promo-bar');
  const promoClose = document.getElementById('promo-close');
  if (promoClose && promoBar) {
    promoClose.addEventListener('click', () => promoBar.classList.add('is-hidden'));
  }

  const header = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });

  const hamBtn = document.getElementById('ham-btn');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const closeNavDrawer = () => {
    if (!navDrawer) return;
    navDrawer.classList.remove('is-open');
    navDrawer.setAttribute('aria-hidden', 'true');
  };
  if (hamBtn && navDrawer) {
    hamBtn.addEventListener('click', () => {
      navDrawer.classList.add('is-open');
      navDrawer.setAttribute('aria-hidden', 'false');
    });
  }
  if (drawerClose) drawerClose.addEventListener('click', closeNavDrawer);
  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', closeNavDrawer);
  });

  // ── 1. Quality Standards Infinite Marquee ─────────────────
  const marqueeTrack = document.getElementById('standards-marquee');
  if (marqueeTrack && DATA.standards) {
    const itemsHtml = DATA.standards.map((s) => `
      <div class="marquee-pill">
        ${s.icon}
        <strong>${s.name}</strong>
        <span>· ${s.desc}</span>
      </div>
    `).join('');
    // Duplicate twice for seamless continuous horizontal scroll
    marqueeTrack.innerHTML = itemsHtml + itemsHtml;
  }

  // ── 2. Category Tabs & Wholesale Catalog ──────────────────
  const tabsWrap = document.getElementById('category-tabs');
  const gridWrap = document.getElementById('products-grid');
  const searchInput = document.getElementById('catalog-search');

  const getProductCartonPrice = (product, qty) => {
    if (qty >= 20) return product.tier20Price;
    if (qty >= 5) return product.tier5Price;
    return product.cartonPrice;
  };

  function renderCategoryTabs() {
    if (!tabsWrap) return;
    tabsWrap.innerHTML = DATA.categories.map((cat) => `
      <button type="button"
        class="cat-tab ${state.activeCategory === cat.id ? 'active' : ''}"
        data-cat="${cat.id}" role="tab"
        aria-selected="${state.activeCategory === cat.id}">
        ${cat.name}
      </button>
    `).join('');

    tabsWrap.querySelectorAll('.cat-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeCategory = btn.dataset.cat;
        renderCategoryTabs();
        renderProducts();
      });
    });
  }

  function renderProducts() {
    if (!gridWrap) return;
    const q = state.searchQuery.trim().toLowerCase();

    const filtered = DATA.products.filter((p) => {
      const catMatch = state.activeCategory === 'all' || p.category === state.activeCategory;
      const textMatch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.skuCode.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q);
      return catMatch && textMatch;
    });

    if (filtered.length === 0) {
      gridWrap.innerHTML = `
        <div class="empty-catalog">
          <strong>لم يتم العثور على أصناف مطابقة لبحثك</strong>
          <p style="margin-top:6px;">جرّب البحث بكلمة أخرى أو اضغط على "كافة الأصناف".</p>
        </div>
      `;
      return;
    }

    gridWrap.innerHTML = filtered.map((p) => {
      const qtyInCart = state.quoteCart[p.id] || 0;
      const cartonResaleTotal = p.suggestedRetail * p.unitsPerCarton;
      const cartonProfit = cartonResaleTotal - p.cartonPrice;
      const roiPct = Math.round((cartonProfit / p.cartonPrice) * 100);

      return `
        <article class="product-card" data-id="${p.id}">
          <div class="pc-media" style="cursor:pointer;" data-action="open-modal" data-id="${p.id}">
            <img src="${p.img}" alt="${p.title}" loading="lazy" />
            <span class="pc-badge pc-badge--${p.badgeType}">${p.badge}</span>
            <span class="pc-sku">${p.skuCode}</span>
          </div>
          <div class="pc-body">
            <span class="pc-cat">${p.categoryName} · ${p.unitsPerCarton} ${p.unitLabel}/كرتون</span>
            <h3 class="pc-title">${p.title}</h3>
            <p class="pc-desc">${p.desc}</p>

            <div class="pc-econ">
              <div class="econ-cell">
                <span>جملة الكرتون (${p.unitsPerCarton} حبات)</span>
                <strong>${fmt(p.cartonPrice)} ${WHOLESALE_CONFIG.currency}</strong>
              </div>
              <div class="econ-cell">
                <span>سعر الحبة (${p.unitWholesale} ← بيع ${p.suggestedRetail})</span>
                <strong>${fmt(p.unitWholesale)} ${WHOLESALE_CONFIG.currency}</strong>
              </div>
              <div class="econ-profit">
                <span>ربح التاجر بالكرتون: <strong>+${fmt(cartonProfit)} ${WHOLESALE_CONFIG.currency}</strong></span>
                <span class="roi-tag">+${roiPct}% ربح</span>
              </div>
            </div>

            <div class="pc-actions">
              ${qtyInCart > 0 ? `
                <div class="qty-control">
                  <button type="button" class="qty-btn" data-action="dec" data-id="${p.id}" aria-label="إنقاص كرتون">−</button>
                  <span class="qty-val">${qtyInCart} كرتون بالسلة</span>
                  <button type="button" class="qty-btn" data-action="inc" data-id="${p.id}" aria-label="زيادة كرتون">+</button>
                </div>
              ` : `
                <button type="button" class="btn btn--primary btn--sm add-btn" data-action="inc" data-id="${p.id}">
                  <span>+ أضف كرتون للتسعيرة</span>
                </button>
              `}
              <button type="button" class="btn btn--outline btn--sm" data-action="open-modal" data-id="${p.id}" title="تفاصيل الشرائح">
                الشرائح
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  if (gridWrap) {
    gridWrap.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      const action = target.dataset.action;
      const id = target.dataset.id;
      if (action === 'inc') updateCartQty(id, 1);
      else if (action === 'dec') updateCartQty(id, -1);
      else if (action === 'open-modal') openProductModal(id);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // ── 3. Quote Cart Drawer Logic ────────────────────────────
  const quoteDrawer = document.getElementById('quote-drawer');
  const quoteBackdrop = document.getElementById('quote-backdrop');
  const openQuoteBtn = document.getElementById('open-quote-drawer');
  const closeQuoteBtn = document.getElementById('close-quote-drawer');
  const navCartCount = document.getElementById('nav-cart-count');
  const qdItemsList = document.getElementById('qd-items-list');
  const qdTotalCartons = document.getElementById('qd-total-cartons');
  const qdSubtotal = document.getElementById('qd-subtotal');
  const qdDiscount = document.getElementById('qd-discount');
  const qdNetTotal = document.getElementById('qd-net-total');
  const qdProfitPill = document.getElementById('qd-profit-pill');
  const qdTierBar = document.getElementById('qd-tier-bar');
  const sendQuoteWaBtn = document.getElementById('send-quote-wa');

  function getVolumeTier(amount) {
    return WHOLESALE_CONFIG.volumeTiers.find((t) => amount >= t.min) || WHOLESALE_CONFIG.volumeTiers[WHOLESALE_CONFIG.volumeTiers.length - 1];
  }

  function updateCartQty(productId, delta) {
    const current = state.quoteCart[productId] || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) delete state.quoteCart[productId];
    else state.quoteCart[productId] = next;

    renderProducts();
    renderQuoteCart();
  }

  function openQuoteDrawer() {
    if (!quoteDrawer || !quoteBackdrop) return;
    renderQuoteCart();
    quoteDrawer.classList.add('is-open');
    quoteBackdrop.classList.add('is-open');
    quoteDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeQuoteDrawer() {
    if (!quoteDrawer || !quoteBackdrop) return;
    quoteDrawer.classList.remove('is-open');
    quoteBackdrop.classList.remove('is-open');
    quoteDrawer.setAttribute('aria-hidden', 'true');
  }

  if (openQuoteBtn) openQuoteBtn.addEventListener('click', openQuoteDrawer);
  if (closeQuoteBtn) closeQuoteBtn.addEventListener('click', closeQuoteDrawer);
  if (quoteBackdrop) quoteBackdrop.addEventListener('click', closeQuoteDrawer);

  function renderQuoteCart() {
    const entries = Object.entries(state.quoteCart);
    let totalCartons = 0;
    let subtotal = 0;
    let totalRetailValue = 0;

    entries.forEach(([id, qty]) => {
      const p = DATA.products.find((item) => item.id === id);
      if (!p) return;
      totalCartons += qty;
      const effectiveCartonPrice = getProductCartonPrice(p, qty);
      subtotal += effectiveCartonPrice * qty;
      totalRetailValue += p.suggestedRetail * p.unitsPerCarton * qty;
    });

    if (navCartCount) navCartCount.textContent = totalCartons;

    if (!qdItemsList) return;

    if (entries.length === 0) {
      qdItemsList.innerHTML = `
        <div class="qd-empty">
          <div style="font-size:2.4rem; margin-bottom:10px;">📦</div>
          <strong>سلة التسعيرة فارغة حالياً</strong>
          <p style="font-size:0.86rem; margin-top:6px;">تصفح كتالوج الجملة وأضف الكراتين لحساب شريحة الخصم الخاصة بك وإرسالها مباشرة عبر واتساب.</p>
        </div>
      `;
      if (qdTierBar) qdTierBar.textContent = 'أضف أصنافاً بقيمة 5,000 ر.س للحصول على شحن مجاني + خصم 6%';
      if (qdTotalCartons) qdTotalCartons.textContent = '0 كرتون';
      if (qdSubtotal) qdSubtotal.textContent = '0 ر.س';
      if (qdDiscount) qdDiscount.textContent = '0 ر.س';
      if (qdNetTotal) qdNetTotal.textContent = '0 ر.س';
      if (qdProfitPill) qdProfitPill.innerHTML = 'ربحك التقديري عند إعادة البيع: <strong>+0 ر.س</strong>';
      return;
    }

    qdItemsList.innerHTML = entries.map(([id, qty]) => {
      const p = DATA.products.find((item) => item.id === id);
      if (!p) return '';
      const unitCarton = getProductCartonPrice(p, qty);
      const lineTotal = unitCarton * qty;
      return `
        <div class="qd-item">
          <img src="${p.img}" alt="${p.title}" />
          <div class="qd-item-info">
            <strong>${p.title}</strong>
            <div class="qd-item-meta">${p.skuCode} · سعر الكرتون: ${fmt(unitCarton)} ر.س (${p.unitsPerCarton} ${p.unitLabel})</div>
            <div class="qd-item-controls">
              <div class="qd-qty-btns">
                <button type="button" data-cart-dec="${p.id}">−</button>
                <span>${qty} كرتون</span>
                <button type="button" data-cart-inc="${p.id}">+</button>
              </div>
              <strong style="color:var(--emerald-deep); font-size:0.9rem;">${fmt(lineTotal)} ر.س</strong>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const tier = getVolumeTier(subtotal);
    const discountAmount = Math.round(subtotal * tier.discount);
    const netTotal = subtotal - discountAmount;
    const estProfit = Math.max(0, totalRetailValue - netTotal);

    if (qdTierBar) qdTierBar.textContent = `🏆 ${tier.label}`;
    if (qdTotalCartons) qdTotalCartons.textContent = `${totalCartons} كرتون`;
    if (qdSubtotal) qdSubtotal.textContent = `${fmt(subtotal)} ${WHOLESALE_CONFIG.currency}`;
    if (qdDiscount) qdDiscount.textContent = discountAmount > 0 ? `− ${fmt(discountAmount)} ${WHOLESALE_CONFIG.currency} (${Math.round(tier.discount * 100)}%)` : '0 ر.س';
    if (qdNetTotal) qdNetTotal.textContent = `${fmt(netTotal)} ${WHOLESALE_CONFIG.currency}`;
    if (qdProfitPill) qdProfitPill.innerHTML = `ربحك التقديري عند إعادة البيع: <strong>+${fmt(estProfit)} ${WHOLESALE_CONFIG.currency}</strong>`;
  }

  if (qdItemsList) {
    qdItemsList.addEventListener('click', (e) => {
      const incBtn = e.target.closest('[data-cart-inc]');
      const decBtn = e.target.closest('[data-cart-dec]');
      if (incBtn) updateCartQty(incBtn.dataset.cartInc, 1);
      if (decBtn) updateCartQty(decBtn.dataset.cartDec, -1);
    });
  }

  if (sendQuoteWaBtn) {
    sendQuoteWaBtn.addEventListener('click', () => {
      const entries = Object.entries(state.quoteCart);
      if (entries.length === 0) {
        alert('يرجى إضافة صنف واحد على الأقل لطلبية الجملة أولاً.');
        return;
      }

      let subtotal = 0;
      const lines = entries.map(([id, qty], idx) => {
        const p = DATA.products.find((item) => item.id === id);
        if (!p) return '';
        const unitCarton = getProductCartonPrice(p, qty);
        subtotal += unitCarton * qty;
        return `${idx + 1}. [${p.skuCode}] ${p.title}\n   ← الكمية: ${qty} كرتون × ${fmt(unitCarton)} ر.س = ${fmt(unitCarton * qty)} ر.س`;
      });

      const tier = getVolumeTier(subtotal);
      const discountAmount = Math.round(subtotal * tier.discount);
      const netTotal = subtotal - discountAmount;

      const msg =
        `السلام عليكم ورحمة الله،\n` +
        `أرغب بطلب تسعيرة جملة رسمية للأصناف التالية من دار الأواني:\n\n` +
        lines.join('\n') +
        `\n\n──────────────\n` +
        `الإجمالي قبل الخصم: ${fmt(subtotal)} ر.س\n` +
        `خصم الشريحة (${Math.round(tier.discount * 100)}%): −${fmt(discountAmount)} ر.س\n` +
        `الصافي المطلوب: *${fmt(netTotal)} ر.س*\n` +
        `يرجى تأكيد التوفر وتكاليف/تفاصيل الشحن.`;

      const url = `https://wa.me/${WHOLESALE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  }

  // ── 4. Product Details & Tiered Pricing Modal ─────────────
  const pModal = document.getElementById('product-modal');
  const pModalBackdrop = document.getElementById('product-modal-backdrop');
  const pModalClose = document.getElementById('product-modal-close');
  const pmAddBtn = document.getElementById('pm-add-carton');

  function openProductModal(id) {
    const p = DATA.products.find((item) => item.id === id);
    if (!p || !pModal) return;
    state.activeModalProductId = p.id;

    document.getElementById('pm-img').src = p.img;
    document.getElementById('pm-img').alt = p.title;
    document.getElementById('pm-sku').textContent = p.skuCode;
    document.getElementById('pm-cat').textContent = p.categoryName;
    document.getElementById('pm-title').textContent = p.title;
    document.getElementById('pm-desc').textContent = p.desc;
    document.getElementById('pm-packing').textContent = `${p.unitsPerCarton} ${p.unitLabel} / كرتون`;
    document.getElementById('pm-weight').textContent = p.weightKg;
    document.getElementById('pm-material').textContent = p.material;

    document.getElementById('pm-t1').textContent = `${fmt(p.cartonPrice)} ر.س`;
    document.getElementById('pm-t5').textContent = `${fmt(p.tier5Price)} ر.س`;
    document.getElementById('pm-t20').textContent = `${fmt(p.tier20Price)} ر.س`;

    const waText = `السلام عليكم، أود الاستفسار عن توفر وكميات الصنف: ${p.title} (${p.skuCode})`;
    document.getElementById('pm-wa-direct').href = `https://wa.me/${WHOLESALE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    pModal.classList.add('is-open');
    pModal.setAttribute('aria-hidden', 'false');
  }

  function closeProductModal() {
    if (!pModal) return;
    pModal.classList.remove('is-open');
    pModal.setAttribute('aria-hidden', 'true');
    state.activeModalProductId = null;
  }

  if (pModalBackdrop) pModalBackdrop.addEventListener('click', closeProductModal);
  if (pModalClose) pModalClose.addEventListener('click', closeProductModal);
  if (pmAddBtn) {
    pmAddBtn.addEventListener('click', () => {
      if (!state.activeModalProductId) return;
      updateCartQty(state.activeModalProductId, 1);
      closeProductModal();
      openQuoteDrawer();
    });
  }

  // ── 5. Interactive Profit & Order Calculator ──────────────
  const budgetSlider = document.getElementById('budget-slider');
  const budgetDisplay = document.getElementById('budget-display');
  const bizContainer = document.getElementById('calc-biz-type');
  const marginContainer = document.getElementById('calc-margin-pills');

  function updateCalculatorUI() {
    const grossBudget = state.calc.budget;
    const tier = getVolumeTier(grossBudget);
    const saved = Math.round(grossBudget * tier.discount);
    const netCost = grossBudget - saved;
    const resaleValue = Math.round(grossBudget * (1 + state.calc.margin));
    const netProfit = resaleValue - netCost;
    const roiPercent = Math.round((netProfit / netCost) * 100);
    const freeShip = grossBudget >= WHOLESALE_CONFIG.freeShippingThreshold;

    if (budgetDisplay) budgetDisplay.textContent = `${fmt(grossBudget)} ر.س`;
    const tierNotice = document.getElementById('calc-tier-notice');
    if (tierNotice) {
      tierNotice.innerHTML = grossBudget >= 5000
        ? `🏆 أنت مؤهل حالياً لـ: <strong>${tier.label}</strong>`
        : `💡 أضف <strong>${fmt(5000 - grossBudget)} ر.س</strong> للوصول للشحن المجاني + خصم 6% إضافي!`;
    }

    document.getElementById('res-net-cost').textContent = `${fmt(netCost)} ر.س`;
    document.getElementById('res-discount-saved').textContent = saved > 0 ? `${fmt(saved)} ر.س (${Math.round(tier.discount * 100)}%)` : '0 ر.س (شريحة أساسية)';
    document.getElementById('res-shipping').textContent = freeShip ? 'مجاني بالكامل 🚛' : 'شحن اقتصادي موحد (95 ر.س)';
    document.getElementById('res-shipping').className = freeShip ? 'text-emerald' : 'text-gold';
    document.getElementById('res-resale-total').textContent = `${fmt(resaleValue)} ر.س`;
    document.getElementById('res-net-profit').textContent = `+${fmt(netProfit)} ر.س`;
    document.getElementById('res-roi-percent').textContent = `عائد متوقع ~${roiPercent}% على رأس المال بعد خصم الشريحة`;

    const waBtn = document.getElementById('calc-whatsapp-btn');
    if (waBtn) {
      const msg =
        `السلام عليكم، استخدمت حاسبة الأرباح في دار الأواني:\n` +
        `• نوع النشاط: ${state.calc.bizType}\n` +
        `• الميزانية المقترحة: ${fmt(grossBudget)} ر.س (صافي بعد الخصم: ${fmt(netCost)} ر.س)\n` +
        `أرجو اقتراح تشكيلة الأصناف الأكثر مبيعاً المناسبة لهذه الميزانية.`;
      waBtn.href = `https://wa.me/${WHOLESALE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }
  }

  if (bizContainer) {
    bizContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.biz-pill');
      if (!btn) return;
      bizContainer.querySelectorAll('.biz-pill').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.calc.bizType = btn.dataset.biz;
      const suggested = parseInt(btn.dataset.suggestedBudget, 10);
      if (suggested && budgetSlider) {
        state.calc.budget = suggested;
        budgetSlider.value = suggested;
      }
      updateCalculatorUI();
    });
  }

  if (marginContainer) {
    marginContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.margin-pill');
      if (!btn) return;
      marginContainer.querySelectorAll('.margin-pill').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.calc.margin = parseFloat(btn.dataset.margin);
      updateCalculatorUI();
    });
  }

  if (budgetSlider) {
    budgetSlider.addEventListener('input', (e) => {
      state.calc.budget = parseInt(e.target.value, 10);
      updateCalculatorUI();
    });
  }

  // ── 6. Render Packages, Process, Reviews & FAQ ────────────
  const pkgGrid = document.getElementById('packages-grid');
  if (pkgGrid && DATA.packages) {
    pkgGrid.innerHTML = DATA.packages.map((pkg) => {
      const waMsg = `السلام عليكم، أرغب بالاستفسار وحجز (${pkg.name}) لتوريد الأدوات المنزلية بالجملة.`;
      return `
        <article class="package-card ${pkg.featured ? 'is-featured' : ''}">
          <span class="pkg-badge">${pkg.badge}</span>
          <h3 class="pkg-title">${pkg.name}</h3>
          <p class="pkg-sub">${pkg.subtitle}</p>

          <div class="pkg-price-box">
            <div class="pkg-price">${pkg.price} ${pkg.originalCostValue ? '<small style="font-size:0.9rem;">ر.س</small>' : ''}</div>
            <div class="pkg-resale">القيمة البيعية المتوقعة للتاجر: ${pkg.resaleValue} ${pkg.originalCostValue ? 'ر.س' : ''}</div>
          </div>

          <ul class="pkg-features">
            ${pkg.features.map((f) => `<li>${f}</li>`).join('')}
          </ul>

          <a href="https://wa.me/${WHOLESALE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}" target="_blank"
             class="btn ${pkg.featured ? 'btn--gold' : 'btn--primary'} btn--full btn--lg">
            <span>طلب الباقة والتفاصيل عبر واتساب</span>
            <span>↖</span>
          </a>
        </article>
      `;
    }).join('');
  }

  const processGrid = document.getElementById('process-grid');
  if (processGrid && DATA.processSteps) {
    processGrid.innerHTML = DATA.processSteps.map((s) => `
      <div class="process-card">
        <div class="process-num">${s.step}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  const reviewsGrid = document.getElementById('reviews-grid');
  if (reviewsGrid && DATA.reviews) {
    reviewsGrid.innerHTML = DATA.reviews.map((r) => `
      <article class="review-card">
        <div class="review-stars">${'★'.repeat(r.rating)}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-author">
          <strong>${r.name}</strong>
          <span>${r.role}</span>
        </div>
      </article>
    `).join('');
  }

  const faqList = document.getElementById('faq-list');
  if (faqList && DATA.faqs) {
    faqList.innerHTML = DATA.faqs.map((item, idx) => `
      <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
        <button type="button" class="faq-q" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${item.q}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-a" style="${idx === 0 ? 'max-height: 260px;' : ''}">
          <div class="faq-a-inner">${item.a}</div>
        </div>
      </div>
    `).join('');

    faqList.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-q');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('is-open');

      faqList.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  }

  // ── 7. Smart Expandable Speed-Dial FAB ────────────────────
  const dialWrap = document.getElementById('speed-dial-wrap');
  const dialMainBtn = document.getElementById('dial-main-btn');
  const dialBackdrop = document.getElementById('dial-backdrop');
  const dialActions = document.getElementById('dial-actions');
  const dialOpenCart = document.getElementById('dial-open-cart');
  const bubbleClose = document.getElementById('bubble-close');
  const waBubble = document.getElementById('wa-bubble');

  function toggleDial(forceState) {
    if (!dialWrap) return;
    const nextState = typeof forceState === 'boolean' ? forceState : !dialWrap.classList.contains('is-open');
    dialWrap.classList.toggle('is-open', nextState);
    if (dialBackdrop) dialBackdrop.classList.toggle('is-open', nextState);
    if (dialMainBtn) dialMainBtn.setAttribute('aria-expanded', String(nextState));
    if (dialActions) dialActions.setAttribute('aria-hidden', String(!nextState));
  }

  if (dialMainBtn) {
    dialMainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDial();
    });
  }

  if (dialBackdrop) {
    dialBackdrop.addEventListener('click', () => toggleDial(false));
  }

  if (dialOpenCart) {
    dialOpenCart.addEventListener('click', () => {
      toggleDial(false);
      openQuoteDrawer();
    });
  }

  if (bubbleClose && waBubble) {
    bubbleClose.addEventListener('click', (e) => {
      e.stopPropagation();
      waBubble.classList.add('is-dismissed');
    });
  }

  // Global Escape Key Handler for Modals, Drawers & Speed-Dial
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleDial(false);
      closeQuoteDrawer();
      closeProductModal();
      closeNavDrawer();
    }
  });

  // ── Initialize View ───────────────────────────────────────
  renderCategoryTabs();
  renderProducts();
  renderQuoteCart();
  updateCalculatorUI();

})();
