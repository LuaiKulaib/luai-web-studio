/* =========================================================
   app.js — مطعم وكافيه الديوان (QR Menu)
   ========================================================= */
'use strict';

let activeCategory = 'all';
let searchTerm = '';
let activeCurrency = 'yer';
let orderMode = 'table';
const cart = {}; // { itemId: qty }

const SVG = {
  plus:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  trash: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`,
};

function formatPrice(item) {
  if (activeCurrency === 'sar') return `${item.priceSar} ر.س`;
  return `${item.priceYer.toLocaleString('en-US')} ر.ي`;
}

function getUnitPrice(item) {
  return activeCurrency === 'sar' ? item.priceSar : item.priceYer;
}

function formatTotal(amount) {
  if (activeCurrency === 'sar') return `${amount} ر.س`;
  return `${amount.toLocaleString('en-US')} ر.ي`;
}

function renderCategories() {
  const wrap = document.getElementById('cats-scroll');
  if (!wrap) return;
  wrap.innerHTML = MENU_DATA.categories.map(c => `
    <button type="button" class="cat-pill ${c.id === activeCategory ? 'active' : ''}"
            data-cat="${c.id}" role="tab" aria-selected="${c.id === activeCategory}">
      ${c.label}
    </button>
  `).join('');
}

function renderMenu() {
  const grid = document.getElementById('menu-grid');
  const countEl = document.getElementById('menu-count');
  if (!grid) return;

  const q = searchTerm.trim().toLowerCase();
  const filtered = MENU_DATA.items.filter(item => {
    const matchCat = activeCategory === 'all' || item.cat === activeCategory;
    const matchText = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    return matchCat && matchText;
  });

  if (countEl) {
    countEl.textContent = filtered.length === 0
      ? 'لا توجد أصناف مطابقة للبحث'
      : `يعرض ${filtered.length} ${filtered.length === 1 ? 'صنف' : 'أصناف'} جاهزة للطلب`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">لم يتم العثور على أطباق مطابقة — جرّب كلمة بحث أخرى أو اختر "الكل".</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const qty = cart[item.id] || 0;
    const actionHTML = qty === 0
      ? `<button type="button" class="btn-add" data-action="inc" data-id="${item.id}">${SVG.plus} <span>أضف للطلب</span></button>`
      : `<div class="qty-ctrl">
           <button type="button" class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="إنقاص">-</button>
           <span class="qty-val">${qty}</span>
           <button type="button" class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="زيادة">+</button>
         </div>`;

    return `
      <article class="dish-card">
        <div class="dish-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          ${item.tag ? `<span class="dish-tag">${item.tag}</span>` : ''}
        </div>
        <div class="dish-body">
          <div class="dish-top">
            <h3>${item.name}</h3>
            <span class="dish-cal">${item.calories}</span>
          </div>
          <p class="dish-desc">${item.desc}</p>
          <div class="dish-footer">
            <span class="dish-price">${formatPrice(item)}</span>
            ${actionHTML}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function updateCartBar() {
  const bar = document.getElementById('cart-bar');
  const countEl = document.getElementById('cart-summary-count');
  const totalEl = document.getElementById('cart-summary-total');
  if (!bar) return;

  let totalQty = 0;
  let totalPrice = 0;

  Object.entries(cart).forEach(([id, qty]) => {
    if (qty <= 0) return;
    const item = MENU_DATA.items.find(i => i.id === id);
    if (!item) return;
    totalQty += qty;
    totalPrice += getUnitPrice(item) * qty;
  });

  bar.classList.toggle('visible', totalQty > 0);
  if (countEl) countEl.textContent = `${totalQty} ${totalQty === 1 ? 'صنف' : 'أصناف'} في الطلب`;
  if (totalEl) totalEl.textContent = `الإجمالي: ${formatTotal(totalPrice)}`;
}

function renderCartSheet() {
  const wrap = document.getElementById('cart-items');
  const totalEl = document.getElementById('sheet-total');
  if (!wrap) return;

  let totalPrice = 0;
  const rows = [];

  Object.entries(cart).forEach(([id, qty]) => {
    if (qty <= 0) return;
    const item = MENU_DATA.items.find(i => i.id === id);
    if (!item) return;
    const sub = getUnitPrice(item) * qty;
    totalPrice += sub;
    rows.push(`
      <div class="cart-row">
        <span class="cart-row-name">${item.name}</span>
        <div class="qty-ctrl">
          <button type="button" class="qty-btn" data-action="dec" data-id="${item.id}">-</button>
          <span class="qty-val">${qty}</span>
          <button type="button" class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
        <span class="cart-row-price">${formatTotal(sub)}</span>
      </div>
    `);
  });

  wrap.innerHTML = rows.length ? rows.join('') : '<p style="color:var(--slate);text-align:center;">السلة فارغة حالياً</p>';
  if (totalEl) totalEl.textContent = formatTotal(totalPrice);
}

function adjustCart(id, delta) {
  const next = Math.max(0, (cart[id] || 0) + delta);
  if (next === 0) delete cart[id];
  else cart[id] = next;
  renderMenu();
  updateCartBar();
  renderCartSheet();
}

function openSheet(id) {
  document.getElementById('backdrop')?.classList.add('open');
  document.getElementById(id)?.classList.add('open');
}

function closeAllSheets() {
  document.getElementById('backdrop')?.classList.remove('open');
  document.querySelectorAll('.sheet.open').forEach(s => s.classList.remove('open'));
}

function sendWhatsAppOrder() {
  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  if (!entries.length) return;

  let lines = [`*طلب جديد — ${MENU_CONFIG.restaurantName}*`];
  if (orderMode === 'table') {
    const tbl = document.getElementById('table-num')?.value || MENU_CONFIG.defaultTable;
    lines.push(`نوع الطلب: داخل المطعم (طاولة رقم ${tbl})`);
  } else {
    const addr = document.getElementById('customer-address')?.value.trim() || 'استلام من المطعم / توصيل';
    lines.push(`نوع الطلب: سفري / توصيل (${addr})`);
  }

  lines.push('--- الأصناف ---');
  let total = 0;
  entries.forEach(([id, qty]) => {
    const item = MENU_DATA.items.find(i => i.id === id);
    if (!item) return;
    const sub = getUnitPrice(item) * qty;
    total += sub;
    lines.push(`• ${item.name} × ${qty} = ${formatTotal(sub)}`);
  });

  lines.push(`*الإجمالي:* ${formatTotal(total)}`);
  const notes = document.getElementById('order-notes')?.value.trim();
  if (notes) lines.push(`ملاحظات: ${notes}`);

  const url = `https://wa.me/${MENU_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderMenu();
  updateCartBar();

  document.getElementById('cats-scroll')?.addEventListener('click', e => {
    const btn = e.target.closest('.cat-pill');
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    renderCategories();
    renderMenu();
  });

  document.getElementById('menu-search')?.addEventListener('input', e => {
    searchTerm = e.target.value;
    renderMenu();
  });

  document.querySelectorAll('.curr-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.curr-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCurrency = btn.dataset.curr;
      renderMenu();
      updateCartBar();
      renderCartSheet();
    });
  });

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action][data-id]');
    if (!btn) return;
    const delta = btn.dataset.action === 'inc' ? 1 : -1;
    adjustCart(btn.dataset.id, delta);
  });

  document.getElementById('btn-open-cart')?.addEventListener('click', () => {
    renderCartSheet();
    openSheet('order-sheet');
  });

  document.getElementById('btn-qr-show')?.addEventListener('click', () => openSheet('qr-sheet'));
  document.getElementById('btn-close-order')?.addEventListener('click', closeAllSheets);
  document.getElementById('btn-close-qr')?.addEventListener('click', closeAllSheets);
  document.getElementById('backdrop')?.addEventListener('click', closeAllSheets);

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      orderMode = btn.dataset.mode;
      const isTable = orderMode === 'table';
      document.getElementById('table-input-wrap').style.display = isTable ? 'block' : 'none';
      document.getElementById('address-input-wrap').style.display = isTable ? 'none' : 'block';
    });
  });

  document.getElementById('table-num')?.addEventListener('change', e => {
    const pill = document.getElementById('hero-table-pill');
    if (pill) {
      pill.lastChild.textContent = ` طاولة رقم #${e.target.value} · جاهز للطلب`;
    }
  });

  document.getElementById('btn-send-wa')?.addEventListener('click', sendWhatsAppOrder);
});
