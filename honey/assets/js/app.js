/* =========================================================
   app.js — دار السدر | عسل يمني وبن أصيل
   ========================================================= */
'use strict';

const SVG = {
  leaf:    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  ship:    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  gift:    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
  pin:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  chevron: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
  wa:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.42A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.065-1.113l-.29-.173-3.013.859.86-2.936-.19-.302A7.953 7.953 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/></svg>`,
};

function renderStats() {
  const g = document.getElementById('stats-grid');
  if (!g) return;
  g.innerHTML = HONEY_DATA.stats.map(s => `
    <div class="stat-item">
      <div class="val">${s.value}</div>
      <div class="lbl">${s.label}</div>
    </div>`).join('');
}

function renderProducts() {
  const g = document.getElementById('prod-grid');
  if (!g) return;
  g.innerHTML = HONEY_DATA.products.map(p => {
    const wa = `https://wa.me/${HONEY_CONFIG.whatsappNumber}?text=${encodeURIComponent('أهلاً، أريد الاستفسار والطلب من دار السدر: ' + p.name)}`;
    const tagHTML = p.tag
      ? `<span class="prod-tag">${p.tag}</span>`
      : `<div style="height:1.55rem"></div>`;
    const sizesHTML = p.sizes.map(sz => `<span class="size-tag">${sz}</span>`).join('');
    return `
      <article class="prod-card">
        <div class="prod-card-top">
          ${tagHTML}
          <h3>${p.name}</h3>
          <div class="prod-origin">${SVG.pin} <span>${p.origin}</span></div>
        </div>
        <div class="prod-body">
          <p class="prod-desc">${p.desc}</p>
          <div class="prod-sizes">${sizesHTML}</div>
          <a href="${wa}" class="btn-whatsapp" target="_blank" rel="noopener">
            ${SVG.wa} اطلب عبر واتساب
          </a>
        </div>
      </article>`;
  }).join('');
}

function renderFeatures() {
  const g = document.getElementById('feat-grid');
  if (!g) return;
  g.innerHTML = HONEY_DATA.features.map(f => `
    <div class="feat-card">
      <div class="feat-icon">${SVG[f.icon] || ''}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>`).join('');
}

function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = HONEY_DATA.faqs.map((f, i) => `
    <div class="faq-item" id="hfaq-${i}">
      <button class="faq-q" aria-expanded="false" aria-controls="hfaq-a-${i}">
        <span>${f.q}</span>${SVG.chevron}
      </button>
      <div class="faq-a" id="hfaq-a-${i}" role="region">${f.a}</div>
    </div>`).join('');

  list.addEventListener('click', e => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const open = item.classList.contains('open');
    list.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!open) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}

function initFAB() {
  const fab = document.getElementById('fab');
  const btn = document.getElementById('fab-trigger');
  if (!fab || !btn) return;
  btn.addEventListener('click', () => {
    const open = fab.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.querySelector('svg').style.transform = open ? 'rotate(45deg)' : '';
  });
  document.addEventListener('click', e => {
    if (!fab.contains(e.target)) {
      fab.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelector('svg').style.transform = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderProducts();
  renderFeatures();
  renderFAQ();
  initFAB();
});
