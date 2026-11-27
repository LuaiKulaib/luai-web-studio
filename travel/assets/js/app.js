/* =========================================================
   app.js — الصفوة للسفريات والسياحة والعمرة
   ========================================================= */
'use strict';

let activeCat = 'all';

const SVG = {
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  moon:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  plane: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
  doc:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  hotel: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>`,
};

function renderStats() {
  const el = document.getElementById('tr-stats');
  if (el) {
    el.innerHTML = TRAVEL_DATA.stats.map(s => `
      <div class="stat-item"><strong>${s.value}</strong><span>${s.label}</span></div>
    `).join('');
  }
}

function renderPackages() {
  const grid = document.getElementById('tr-packages');
  if (!grid) return;
  const list = activeCat === 'all'
    ? TRAVEL_DATA.packages
    : TRAVEL_DATA.packages.filter(p => p.cat === activeCat);

  grid.innerHTML = list.map(p => {
    const wa = `https://wa.me/${TRAVEL_CONFIG.whatsappNumber}?text=${encodeURIComponent('أهلاً، أرغب بالاستفسار وحجز: ' + p.title)}`;
    const listHTML = p.highlights.map(h => `<li>${SVG.check} <span>${h}</span></li>`).join('');
    return `
      <article class="pkg-card">
        <div class="pkg-img">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="pkg-badge">${p.badge}</span>
        </div>
        <div class="pkg-body">
          <div class="pkg-meta">${p.meta}</div>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <ul class="pkg-list">${listHTML}</ul>
          <a href="${wa}" class="btn-wa" target="_blank" rel="noopener">احجز الآن عبر واتساب</a>
        </div>
      </article>
    `;
  }).join('');
}

function renderServices() {
  const el = document.getElementById('tr-services');
  if (!el) return;
  el.innerHTML = TRAVEL_DATA.services.map(s => `
    <div class="svc-card">
      <div class="svc-icon">${SVG[s.icon] || ''}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderPackages();
  renderServices();

  document.getElementById('tr-filters')?.addEventListener('click', e => {
    const btn = e.target.closest('.f-pill');
    if (!btn) return;
    document.querySelectorAll('.f-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    renderPackages();
  });

  document.getElementById('tr-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const service = document.getElementById('t-service')?.value;
    const city = document.getElementById('t-city')?.value;
    const name = document.getElementById('t-name')?.value.trim();
    const count = document.getElementById('t-count')?.value.trim();
    const msg = `*طلب سفر أو عمرة — ${TRAVEL_CONFIG.agencyName}*\nالخدمة: ${service}\nالمغادرة: ${city}\nالاسم: ${name}\nالتفاصيل: ${count}`;
    window.open(`https://wa.me/${TRAVEL_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
});
