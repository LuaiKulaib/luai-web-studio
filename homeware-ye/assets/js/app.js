/* ============================================================
   معرض الصقر للأدوات المنزلية — حي شعوب، صنعاء
   Practical Order List Drawer & Catalog Filter Logic (Zero Calculators)
   assets/js/app.js
   ============================================================ */

(function () {
  'use strict';

  const state = {
    activeCat: 'all',
    search: '',
    orderList: {} // { id: count }
  };

  // Top Bar Close & Mobile Drawer
  const topBar = document.getElementById('top-bar');
  const topClose = document.getElementById('top-close');
  if (topClose && topBar) {
    topClose.addEventListener('click', () => topBar.classList.add('is-hidden'));
  }

  const hamBtn = document.getElementById('ham-btn');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const closeNav = () => {
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
  if (drawerClose) drawerClose.addEventListener('click', closeNav);
  document.querySelectorAll('.drawer-link').forEach((a) => a.addEventListener('click', closeNav));

  // Quick Department Jump Cards
  document.querySelectorAll('[data-jump-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeCat = btn.dataset.jumpCat;
      renderCategoryPills();
      renderProducts();
      const catEl = document.getElementById('catalog');
      if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Catalog Filters & Grid
  const catPillsEl = document.getElementById('cat-pills');
  const gridEl = document.getElementById('products-grid');
  const searchEl = document.getElementById('catalog-search');

  function renderCategoryPills() {
    if (!catPillsEl) return;
    catPillsEl.innerHTML = YE_DATA.categories.map((c) => `
      <button type="button"
        class="cat-pill ${state.activeCat === c.id ? 'active' : ''}"
        data-cat="${c.id}">
        ${c.name}
      </button>
    `).join('');

    catPillsEl.querySelectorAll('.cat-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeCat = btn.dataset.cat;
        renderCategoryPills();
        renderProducts();
      });
    });
  }

  function renderProducts() {
    if (!gridEl) return;
    const q = state.search.trim().toLowerCase();

    const list = YE_DATA.products.filter((p) => {
      const catOk = state.activeCat === 'all' || p.category === state.activeCat;
      const textOk = !q ||
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q);
      return catOk && textOk;
    });

    if (list.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:40px; background:#F4F6F8; border-radius:14px;">
          <strong>لا توجد أصناف مطابقة للبحث</strong>
          <p style="font-size:0.88rem; color:#4B5563; margin-top:6px;">جرّب البحث بكلمة أخرى أو اعرض كافة الأصناف.</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = list.map((p) => {
      const qty = state.orderList[p.id] || 0;
      const waDirect = `السلام عليكم، أستفسر عن سعر الجملة اليوم وتوفر صنف:\n${p.title}\n(${p.packing})`;

      return `
        <article class="product-card">
          <div class="pc-media">
            <img src="${p.img}" alt="${p.title}" loading="lazy" />
            <span class="pc-tag">${p.tag}</span>
            <span class="pc-unit-mode">${p.unitMode}</span>
          </div>
          <div class="pc-body">
            <span class="pc-cat">${p.categoryName}</span>
            <h3 class="pc-title">${p.title}</h3>
            <p class="pc-desc">${p.desc}</p>

            <div class="pc-packing-box">
              <div><strong>التعبئة:</strong> ${p.packing}</div>
              <div><strong>المواصفة:</strong> ${p.origin}</div>
            </div>

            <div class="pc-actions">
              ${qty > 0 ? `
                <div class="qty-bar">
                  <button type="button" class="qty-btn" data-dec="${p.id}">−</button>
                  <span style="font-weight:800; font-size:0.85rem;">${qty} مضاف للكشف</span>
                  <button type="button" class="qty-btn" data-inc="${p.id}">+</button>
                </div>
              ` : `
                <button type="button" class="btn btn--navy btn--sm add-btn" data-inc="${p.id}">
                  + أضف لكشف الطلبية
                </button>
              `}
              <a href="https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waDirect)}" target="_blank" class="btn btn--wa btn--sm">
                اسأل عن السعر
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  if (gridEl) {
    gridEl.addEventListener('click', (e) => {
      const inc = e.target.closest('[data-inc]');
      const dec = e.target.closest('[data-dec]');
      if (inc) updateOrderQty(inc.dataset.inc, 1);
      if (dec) updateOrderQty(dec.dataset.dec, -1);
    });
  }

  if (searchEl) {
    searchEl.addEventListener('input', (e) => {
      state.search = e.target.value;
      renderProducts();
    });
  }

  // Simple Order List Drawer (كشف الطلبية — بدون أسعار أو حاسبة)
  const orderDrawer = document.getElementById('order-drawer');
  const orderBackdrop = document.getElementById('order-backdrop');
  const openOrderBtn = document.getElementById('open-order-drawer');
  const closeOrderBtn = document.getElementById('close-order-drawer');
  const orderCountEl = document.getElementById('nav-order-count');
  const odListEl = document.getElementById('od-list');
  const odTotalItemsEl = document.getElementById('od-total-items');
  const odTotalUnitsEl = document.getElementById('od-total-units');
  const sendOrderWaBtn = document.getElementById('send-order-wa');

  function updateOrderQty(id, delta) {
    const cur = state.orderList[id] || 0;
    const next = Math.max(0, cur + delta);
    if (next === 0) delete state.orderList[id];
    else state.orderList[id] = next;
    renderProducts();
    renderOrderDrawer();
  }

  function openOrderDrawer() {
    if (!orderDrawer || !orderBackdrop) return;
    renderOrderDrawer();
    orderDrawer.classList.add('is-open');
    orderBackdrop.classList.add('is-open');
    orderDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeOrderDrawer() {
    if (!orderDrawer || !orderBackdrop) return;
    orderDrawer.classList.remove('is-open');
    orderBackdrop.classList.remove('is-open');
    orderDrawer.setAttribute('aria-hidden', 'true');
  }

  if (openOrderBtn) openOrderBtn.addEventListener('click', openOrderDrawer);
  if (closeOrderBtn) closeOrderBtn.addEventListener('click', closeOrderDrawer);
  if (orderBackdrop) orderBackdrop.addEventListener('click', closeOrderDrawer);

  function renderOrderDrawer() {
    const entries = Object.entries(state.orderList);
    const totalUnits = entries.reduce((sum, [, q]) => sum + q, 0);

    if (orderCountEl) orderCountEl.textContent = totalUnits;
    if (odTotalItemsEl) odTotalItemsEl.textContent = `${entries.length} صنف`;
    if (odTotalUnitsEl) odTotalUnitsEl.textContent = `${totalUnits}`;

    if (!odListEl) return;
    if (entries.length === 0) {
      odListEl.innerHTML = `
        <div class="od-empty">
          <div style="font-size:2.2rem; margin-bottom:8px;">📋</div>
          <strong>كشف الطلبية فارغ حالياً</strong>
          <p style="font-size:0.84rem; margin-top:6px;">أضف الأصناف التي ترغب بالسؤال عن سعرها أو طلبها من الكتالوج، ثم أرسل الكشف بضغطة واحدة إلى واتساب المعرض.</p>
        </div>
      `;
      return;
    }

    odListEl.innerHTML = entries.map(([id, qty]) => {
      const p = YE_DATA.products.find((item) => item.id === id);
      if (!p) return '';
      return `
        <div class="od-item">
          <img src="${p.img}" alt="${p.title}" />
          <div>
            <strong>${p.title}</strong>
            <small>${p.unitMode} · ${p.packing}</small>
            <div class="od-qty">
              <button type="button" data-od-dec="${p.id}">−</button>
              <span style="font-weight:800; font-size:0.84rem;">${qty} (${p.unitMode})</span>
              <button type="button" data-od-inc="${p.id}">+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (odListEl) {
    odListEl.addEventListener('click', (e) => {
      const inc = e.target.closest('[data-od-inc]');
      const dec = e.target.closest('[data-od-dec]');
      if (inc) updateOrderQty(inc.dataset.odInc, 1);
      if (dec) updateOrderQty(dec.dataset.odDec, -1);
    });
  }

  if (sendOrderWaBtn) {
    sendOrderWaBtn.addEventListener('click', () => {
      const entries = Object.entries(state.orderList);
      if (entries.length === 0) {
        alert('أضف صنفاً واحداً على الأقل إلى كشف الطلبية أولاً.');
        return;
      }

      const lines = entries.map(([id, qty], idx) => {
        const p = YE_DATA.products.find((x) => x.id === id);
        return p ? `${idx + 1}. ${p.title}\n   ← الكمية المطلوبة: ${qty} (${p.unitMode})` : '';
      });

      const msg =
        `السلام عليكم ورحمة الله،\n` +
        `أرجو تسعير كشف الطلبية التالي (جملة) وتأكيد التوفر:\n\n` +
        lines.join('\n') +
        `\n\nأرجو الرد بالأسعار المعتمدة لليوم وطريقة الشحن/الترحيل.`;

      window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // Setup Plans, Governorates & FAQ
  const setupGrid = document.getElementById('setup-grid');
  if (setupGrid && YE_DATA.setupPlans) {
    setupGrid.innerHTML = YE_DATA.setupPlans.map((plan) => `
      <article class="setup-card ${plan.featured ? 'is-featured' : ''}">
        <span class="setup-badge">${plan.badge}</span>
        <h3>${plan.title}</h3>
        <p>${plan.desc}</p>
        <ul class="setup-points">
          ${plan.points.map((pt) => `<li>${pt}</li>`).join('')}
        </ul>
        <a href="https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(plan.waText)}" target="_blank" class="btn ${plan.featured ? 'btn--wa' : 'btn--navy'} btn--full">
          <span>استشارة وتجهيز الكشف عبر واتساب</span>
        </a>
      </article>
    `).join('');
  }

  const govBadges = document.getElementById('gov-badges');
  if (govBadges && YE_DATA.governorates) {
    govBadges.innerHTML = YE_DATA.governorates.map((g) => `<span class="gov-badge">🚛 ${g}</span>`).join('');
  }

  const faqList = document.getElementById('faq-list');
  if (faqList && YE_DATA.faqs) {
    faqList.innerHTML = YE_DATA.faqs.map((f, i) => `
      <div class="faq-item ${i === 0 ? 'is-open' : ''}">
        <button type="button" class="faq-q">
          <span>${f.q}</span>
          <span>+</span>
        </button>
        <div class="faq-a" style="${i === 0 ? 'max-height:220px;' : ''}">
          <div class="faq-a-inner">${f.a}</div>
        </div>
      </div>
    `).join('');

    faqList.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-q');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const ans = item.querySelector('.faq-a');
      const open = item.classList.contains('is-open');

      faqList.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('is-open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  }

  // Smart Expandable Speed-Dial FAB
  const dialWrap = document.getElementById('speed-dial-wrap');
  const dialMainBtn = document.getElementById('dial-main-btn');
  const dialBackdrop = document.getElementById('dial-backdrop');
  const dialActions = document.getElementById('dial-actions');
  const dialOpenList = document.getElementById('dial-open-list');

  function toggleDial(force) {
    if (!dialWrap) return;
    const next = typeof force === 'boolean' ? force : !dialWrap.classList.contains('is-open');
    dialWrap.classList.toggle('is-open', next);
    if (dialBackdrop) dialBackdrop.classList.toggle('is-open', next);
    if (dialMainBtn) dialMainBtn.setAttribute('aria-expanded', String(next));
    if (dialActions) dialActions.setAttribute('aria-hidden', String(!next));
  }

  if (dialMainBtn) dialMainBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDial(); });
  if (dialBackdrop) dialBackdrop.addEventListener('click', () => toggleDial(false));
  if (dialOpenList) dialOpenList.addEventListener('click', () => { toggleDial(false); openOrderDrawer(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleDial(false);
      closeOrderDrawer();
      closeNav();
    }
  });

  // Init
  renderCategoryPills();
  renderProducts();
  renderOrderDrawer();
})();
