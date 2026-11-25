/* =========================================================
   app.js — Solar Energy & Agricultural Pumps – Yemen
   ========================================================= */

'use strict';

/* ---- SVG Icon Library ----------------------------------- */
const ICONS = {
  panel: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`,
  inverter: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="8" width="16" height="10" rx="2"/><path d="M9 8V6a3 3 0 016 0v2"/><circle cx="12" cy="13" r="2"/></svg>`,
  battery: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="18" height="11" rx="2"/><path d="M22 11v3"/><line x1="6" y1="12" x2="12" y2="12"/></svg>`,
  cable: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>`,
  warranty: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  pump: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20"/><path d="M2 12h20"/><circle cx="12" cy="12" r="4"/></svg>`,
  controller: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><circle cx="8.5" cy="10" r="1.5"/><polyline points="12.5 10 15.5 7 18.5 10"/></svg>`,
  pipe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M5 6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2z"/></svg>`,
  meter: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'power-cut': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18.36 6.64A9 9 0 015.64 19.36"/><path d="M6.6 6.6A9 9 0 0119.4 19.4"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
  diesel: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  sun: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  chevron: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
  wa: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.42A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.065-1.113l-.29-.173-3.013.859.86-2.936-.19-.302A7.953 7.953 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/></svg>`,
};

function icon(name) { return ICONS[name] || ''; }

/* ---- Render: Stats -------------------------------------- */
function renderStats() {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;
  grid.innerHTML = SOLAR_DATA.stats.map(s => `
    <div class="stat-item">
      <div class="val">${s.value}</div>
      <div class="lbl">${s.label}</div>
    </div>
  `).join('');
}

/* ---- Render: Packages ----------------------------------- */
function renderPackages() {
  const grid = document.getElementById('pkg-grid');
  if (!grid) return;

  grid.innerHTML = SOLAR_DATA.packages.map(pkg => {
    const specsHTML = pkg.specs.map(s => `
      <div class="pkg-spec">
        ${icon(s.icon)}
        <span>${s.text}</span>
      </div>
    `).join('');

    const tagHTML = pkg.tag
      ? `<div class="pkg-tag">${pkg.tag}</div>`
      : `<div style="height:1.6rem"></div>`;

    const waMsg = encodeURIComponent(
      `أهلاً، أريد الاستفسار عن: ${pkg.name} (${pkg.watts})`
    );

    return `
      <article class="pkg-card">
        <div class="pkg-card-top">
          ${tagHTML}
          <h3>${pkg.name}</h3>
          <div class="sub">${pkg.subtitle}</div>
          <div class="pkg-watts">${pkg.watts}</div>
        </div>
        <div class="pkg-body">
          <div class="pkg-specs">${specsHTML}</div>
          <a href="https://wa.me/${SOLAR_CONFIG.whatsappNumber}?text=${waMsg}"
             class="btn-whatsapp" target="_blank" rel="noopener">
            ${icon('wa')} اطلب السعر
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/* ---- Render: Why Solar ---------------------------------- */
function renderWhy() {
  const grid = document.getElementById('why-grid');
  if (!grid) return;
  grid.innerHTML = SOLAR_DATA.reasons.map(r => `
    <div class="why-card">
      <div class="why-icon">${icon(r.icon)}</div>
      <h3>${r.title}</h3>
      <p>${r.desc}</p>
    </div>
  `).join('');
}

/* ---- Render: Process ------------------------------------ */
function renderProcess() {
  const grid = document.getElementById('process-grid');
  if (!grid) return;
  grid.innerHTML = SOLAR_DATA.process.map(p => `
    <div class="process-card">
      <div class="process-num">${p.step}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </div>
  `).join('');
}

/* ---- Render: FAQ ---------------------------------------- */
function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = SOLAR_DATA.faqs.map((faq, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
        <span>${faq.q}</span>
        ${icon('chevron')}
      </button>
      <div class="faq-a" id="faq-a-${i}" role="region">${faq.a}</div>
    </div>
  `).join('');

  list.addEventListener('click', e => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    list.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}

/* ---- Speed Dial FAB ------------------------------------ */
function initFAB() {
  const fab = document.getElementById('fab');
  const trigger = document.getElementById('fab-trigger');
  if (!fab || !trigger) return;

  trigger.addEventListener('click', () => {
    const open = fab.classList.toggle('open');
    trigger.setAttribute('aria-expanded', open);
    // Rotate icon
    trigger.querySelector('svg').style.transform = open ? 'rotate(45deg)' : '';
  });

  document.addEventListener('click', e => {
    if (!fab.contains(e.target)) {
      fab.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.querySelector('svg').style.transform = '';
    }
  });
}

/* ---- Init ---------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderPackages();
  renderWhy();
  renderProcess();
  renderFAQ();
  initFAB();
});
