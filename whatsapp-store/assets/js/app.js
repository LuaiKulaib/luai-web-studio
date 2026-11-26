/* =========================================================
   app.js — متجر النخبة | سلة واتساب + ربط Google Sheets
   ========================================================= */
'use strict';

let products = DEFAULT_PRODUCTS.map(p => ({ ...p }));
let activeCategory = 'all';
let searchTerm = '';
let activeCurrency = 'yer';
let appliedCoupon = null;
const cart = loadCart();

const SVG = {
  plus:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>`,
};

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('elite_wa_cart') || '{}');
  } catch {
    return {};
  }
}

function saveCart() {
  try {
    localStorage.setItem('elite_wa_cart', JSON.stringify(cart));
  } catch {
    // ignore storage errors
  }
}

function getPrice(item) {
  return activeCurrency === 'sar' ? item.priceSar : item.priceYer;
}

function formatMoney(amount) {
  return activeCurrency === 'sar'
    ? `${amount.toLocaleString('en-US')} ر.س`
    : `${amount.toLocaleString('en-US')} ر.ي`;
}

function stockBadgeClass(stock) {
  if (stock === 'نفدت الكمية') return 'stock-out';
  if (stock === 'كمية محدودة') return 'stock-low';
  return 'stock-ok';
}

function renderCatalog() {
  const grid = document.getElementById('prod-grid');
  const countEl = document.getElementById('catalog-count');
  if (!grid) return;

  const q = searchTerm.trim().toLowerCase();
  const list = products.filter(p => {
    const okCat = activeCategory === 'all' || p.category === activeCategory;
    const okQ = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.catLabel.toLowerCase().includes(q);
    return okCat && okQ;
  });

  if (countEl) {
    countEl.textContent = list.length === 0
      ? 'لا توجد منتجات مطابقة'
      : `يعرض ${list.length} ${list.length === 1 ? 'منتج' : 'منتجات'}`;
  }

  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;background:#fff;border-radius:14px;border:1px dashed var(--border);color:var(--muted);">لم يتم العثور على منتجات مطابقة للبحث.</div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const qty = cart[p.id] || 0;
    const out = p.stock === 'نفدت الكمية';
    const ctrlHTML = out
      ? `<button type="button" class="btn-add" disabled>غير متوفر</button>`
      : qty === 0
        ? `<button type="button" class="btn-add" data-act="inc" data-id="${p.id}">${SVG.plus} <span>أضف للسلة</span></button>`
        : `<div class="qty-ctrl">
             <button type="button" class="qty-btn" data-act="dec" data-id="${p.id}">-</button>
             <span class="qty-val">${qty}</span>
             <button type="button" class="qty-btn" data-act="inc" data-id="${p.id}">+</button>
           </div>`;

    return `
      <article class="prod-card">
        <div class="prod-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="prod-badge">${p.badge}</span>` : ''}
          <span class="stock-pill ${stockBadgeClass(p.stock)}">${p.stock}</span>
        </div>
        <div class="prod-body">
          <span class="prod-cat">${p.catLabel}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="prod-footer">
            <span class="prod-price">${formatMoney(getPrice(p))}</span>
            ${ctrlHTML}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function updateCartBadge() {
  const badge = document.getElementById('head-cart-count');
  if (!badge) return;
  const count = Object.values(cart).reduce((acc, q) => acc + (q > 0 ? q : 0), 0);
  badge.textContent = String(count);
}

function renderCartDrawer() {
  const listEl = document.getElementById('cart-list');
  const totalsEl = document.getElementById('totals-box');
  if (!listEl || !totalsEl) return;

  let subtotal = 0;
  const rows = [];

  Object.entries(cart).forEach(([id, qty]) => {
    if (qty <= 0) return;
    const p = products.find(x => x.id === id);
    if (!p) return;
    const unit = getPrice(p);
    const sub = unit * qty;
    subtotal += sub;
    rows.push(`
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}">
        <div class="cart-item-info">
          <strong>${p.name}</strong>
          <span>${formatMoney(sub)}</span>
        </div>
        <div class="qty-ctrl">
          <button type="button" class="qty-btn" data-act="dec" data-id="${p.id}">-</button>
          <span class="qty-val">${qty}</span>
          <button type="button" class="qty-btn" data-act="inc" data-id="${p.id}">+</button>
        </div>
      </div>
    `);
  });

  listEl.innerHTML = rows.length
    ? rows.join('')
    : `<p style="text-align:center;color:var(--muted);padding:1rem 0;">السلة فارغة — أضف منتجات للبدء.</p>`;

  const zoneId = document.getElementById('c-zone')?.value || STORE_CONFIG.deliveryZones[0].id;
  const zone = STORE_CONFIG.deliveryZones.find(z => z.id === zoneId) || STORE_CONFIG.deliveryZones[0];
  const deliveryFee = subtotal > 0 ? (activeCurrency === 'sar' ? zone.feeSar : zone.feeYer) : 0;
  const discountRate = appliedCoupon ? (STORE_CONFIG.coupons[appliedCoupon] || 0) : 0;
  const discountAmt = Math.round(subtotal * discountRate);
  const grandTotal = Math.max(0, subtotal - discountAmt + deliveryFee);

  totalsEl.innerHTML = `
    <div class="totals-line"><span>المجموع الفرعي</span><strong>${formatMoney(subtotal)}</strong></div>
    ${discountAmt > 0 ? `<div class="totals-line" style="color:var(--emerald);"><span>خصم الكوبون (${appliedCoupon})</span><strong>-${formatMoney(discountAmt)}</strong></div>` : ''}
    <div class="totals-line"><span>${zone.label}</span><strong>${deliveryFee === 0 ? 'مجاني' : formatMoney(deliveryFee)}</strong></div>
    <div class="totals-line grand"><span>الإجمالي النهائي</span><span style="color:var(--emerald);">${formatMoney(grandTotal)}</span></div>
  `;
}

function adjustCart(id, delta) {
  const next = Math.max(0, (cart[id] || 0) + delta);
  if (next === 0) delete cart[id];
  else cart[id] = next;
  saveCart();
  updateCartBadge();
  renderCatalog();
  renderCartDrawer();
}

function renderZonesSelect() {
  const sel = document.getElementById('c-zone');
  if (!sel) return;
  sel.innerHTML = STORE_CONFIG.deliveryZones.map(z => {
    const fee = activeCurrency === 'sar' ? z.feeSar : z.feeYer;
    const feeLbl = fee === 0 ? 'مجاني' : formatMoney(fee);
    return `<option value="${z.id}">${z.label} (${feeLbl})</option>`;
  }).join('');
}

function renderMerchantEditor() {
  const wrap = document.getElementById('merchant-rows');
  if (!wrap) return;
  wrap.innerHTML = products.map((p, idx) => `
    <div class="sheet-row">
      <strong>${p.name}</strong>
      <input type="number" data-m-price="${idx}" value="${getPrice(p)}" min="1" aria-label="سعر ${p.name}">
      <select data-m-stock="${idx}" aria-label="توفر ${p.name}">
        <option value="متوفر" ${p.stock === 'متوفر' ? 'selected' : ''}>متوفر</option>
        <option value="كمية محدودة" ${p.stock === 'كمية محدودة' ? 'selected' : ''}>كمية محدودة</option>
        <option value="نفدت الكمية" ${p.stock === 'نفدت الكمية' ? 'selected' : ''}>نفدت الكمية</option>
      </select>
    </div>
  `).join('');
}

async function syncFromCsvUrl(url) {
  const msgEl = document.getElementById('csv-msg');
  const statusEl = document.getElementById('sheet-status-text');
  if (!url) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    const lines = text.split(/\r?\n/).filter(Boolean).slice(1);
    const parsed = lines.map((line, i) => {
      const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length < 4) return null;
      return {
        id: cols[0] || `S-${i}`,
        category: cols[1] || 'electronics',
        catLabel: cols[2] || 'منتج',
        name: cols[3],
        desc: cols[4] || '',
        priceYer: Number(cols[5]) || 5000,
        priceSar: Number(cols[6]) || 40,
        stock: cols[7] || 'متوفر',
        badge: cols[8] || null,
        image: cols[9] || 'assets/images/watch.jpg',
      };
    }).filter(Boolean);

    if (parsed.length) {
      products = parsed;
      renderCatalog();
      renderMerchantEditor();
      renderCartDrawer();
      if (statusEl) statusEl.textContent = `تمت المزامنة مع Google Sheets (${parsed.length} أصناف)`;
      if (msgEl) msgEl.textContent = `تم تحديث ${parsed.length} منتجات من الجدول بنجاح.`;
    }
  } catch (err) {
    if (msgEl) msgEl.textContent = 'تعذر جلب الرابط (تحقق من نشر الجدول بصيغة CSV عامة).';
  }
}

function sendWhatsAppCheckout() {
  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  if (!entries.length) return;

  const name = document.getElementById('c-name')?.value.trim() || 'عميل المتجر';
  const phone = document.getElementById('c-phone')?.value.trim() || 'غير محدد';
  const addr = document.getElementById('c-address')?.value.trim() || 'غير محدد';
  const zoneId = document.getElementById('c-zone')?.value;
  const zone = STORE_CONFIG.deliveryZones.find(z => z.id === zoneId) || STORE_CONFIG.deliveryZones[0];

  const lines = [
    `*طلب جديد — ${STORE_CONFIG.storeName}*`,
    `العميل: ${name} (${phone})`,
    `الشحن: ${zone.label} — ${addr}`,
    '--- المنتجات ---',
  ];

  let subtotal = 0;
  entries.forEach(([id, qty]) => {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const sub = getPrice(p) * qty;
    subtotal += sub;
    lines.push(`• ${p.name} × ${qty} = ${formatMoney(sub)}`);
  });

  const fee = activeCurrency === 'sar' ? zone.feeSar : zone.feeYer;
  const discRate = appliedCoupon ? (STORE_CONFIG.coupons[appliedCoupon] || 0) : 0;
  const disc = Math.round(subtotal * discRate);
  const total = Math.max(0, subtotal - disc + fee);

  if (disc > 0) lines.push(`الخصم (${appliedCoupon}): -${formatMoney(disc)}`);
  lines.push(`رسوم التوصيل: ${fee === 0 ? 'مجاني' : formatMoney(fee)}`);
  lines.push(`*الإجمالي النهائي:* ${formatMoney(total)}`);

  window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
}

function openDrawer(id) {
  document.getElementById('backdrop')?.classList.add('open');
  document.getElementById(id)?.classList.add('open');
}

function closeDrawers() {
  document.getElementById('backdrop')?.classList.remove('open');
  document.querySelectorAll('.drawer.open').forEach(d => d.classList.remove('open'));
}

document.addEventListener('DOMContentLoaded', () => {
  renderZonesSelect();
  renderCatalog();
  updateCartBadge();
  renderCartDrawer();
  renderMerchantEditor();

  if (STORE_CONFIG.googleSheetCsvUrl) {
    syncFromCsvUrl(STORE_CONFIG.googleSheetCsvUrl);
  }

  document.getElementById('cats-row')?.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    renderCatalog();
  });

  document.getElementById('store-search')?.addEventListener('input', e => {
    searchTerm = e.target.value;
    renderCatalog();
  });

  document.querySelectorAll('.curr-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.curr-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCurrency = btn.dataset.curr;
      renderZonesSelect();
      renderCatalog();
      renderCartDrawer();
      renderMerchantEditor();
    });
  });

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-act][data-id]');
    if (!btn) return;
    adjustCart(btn.dataset.id, btn.dataset.act === 'inc' ? 1 : -1);
  });

  document.getElementById('btn-open-cart')?.addEventListener('click', () => {
    renderCartDrawer();
    openDrawer('cart-drawer');
  });
  document.getElementById('btn-open-merchant')?.addEventListener('click', () => {
    renderMerchantEditor();
    openDrawer('merchant-drawer');
  });
  document.getElementById('btn-close-cart')?.addEventListener('click', closeDrawers);
  document.getElementById('btn-close-merchant')?.addEventListener('click', closeDrawers);
  document.getElementById('backdrop')?.addEventListener('click', closeDrawers);

  document.getElementById('c-zone')?.addEventListener('change', renderCartDrawer);

  document.getElementById('btn-apply-coupon')?.addEventListener('click', () => {
    const code = (document.getElementById('c-coupon')?.value || '').trim().toUpperCase();
    const msg = document.getElementById('coupon-msg');
    if (STORE_CONFIG.coupons[code]) {
      appliedCoupon = code;
      if (msg) {
        msg.style.color = 'var(--emerald)';
        msg.textContent = `تم تفعيل خصم ${Math.round(STORE_CONFIG.coupons[code] * 100)}% بنجاح.`;
      }
    } else {
      appliedCoupon = null;
      if (msg) {
        msg.style.color = 'var(--red)';
        msg.textContent = 'الكود غير صالح — جرّب SAVE10.';
      }
    }
    renderCartDrawer();
  });

  document.getElementById('merchant-rows')?.addEventListener('input', e => {
    const priceIdx = e.target.getAttribute('data-m-price');
    const stockIdx = e.target.getAttribute('data-m-stock');
    if (priceIdx !== null) {
      const val = Math.max(1, Number(e.target.value) || 1);
      if (activeCurrency === 'sar') products[priceIdx].priceSar = val;
      else products[priceIdx].priceYer = val;
    }
    if (stockIdx !== null) {
      products[stockIdx].stock = e.target.value;
    }
    renderCatalog();
    renderCartDrawer();
  });

  document.getElementById('btn-sync-csv')?.addEventListener('click', () => {
    const url = document.getElementById('sheet-csv-input')?.value.trim();
    syncFromCsvUrl(url);
  });

  document.getElementById('btn-wa-checkout')?.addEventListener('click', sendWhatsAppCheckout);
});
