/* =========================================================
   app.js — قاعة الفخامة الملكية للمناسبات
   ========================================================= */
'use strict';

const SVG = {
  check:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  sparkles: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/></svg>`,
  music:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  utensils: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  shield:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
};

function renderStats() {
  const el = document.getElementById('ev-stats');
  if (el) {
    el.innerHTML = EVENTS_DATA.stats.map(s => `
      <div class="stat-item"><strong>${s.value}</strong><span>${s.label}</span></div>
    `).join('');
  }
}

function renderHalls() {
  const grid = document.getElementById('ev-halls');
  if (!grid) return;
  grid.innerHTML = EVENTS_DATA.halls.map(h => {
    const wa = `https://wa.me/${EVENTS_CONFIG.whatsappNumber}?text=${encodeURIComponent('أهلاً، أرغب بالاستفسار عن حجز: ' + h.title)}`;
    const listHTML = h.features.map(f => `<li>${SVG.check} <span>${f}</span></li>`).join('');
    return `
      <article class="hall-card">
        <div class="hall-img">
          <img src="${h.image}" alt="${h.title}" loading="lazy">
          <span class="hall-badge">${h.badge}</span>
        </div>
        <div class="hall-body">
          <div class="hall-cap">${h.capacity}</div>
          <h3>${h.title}</h3>
          <p>${h.desc}</p>
          <ul class="hall-list">${listHTML}</ul>
          <a href="${wa}" class="btn-wa" target="_blank" rel="noopener">استفسر عن الحجز عبر واتساب</a>
        </div>
      </article>
    `;
  }).join('');
}

function renderPerks() {
  const el = document.getElementById('ev-perks');
  if (el) {
    el.innerHTML = EVENTS_DATA.perks.map(p => `
      <div class="perk-card">
        <div class="perk-icon">${SVG[p.icon] || ''}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderHalls();
  renderPerks();

  document.getElementById('ev-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const type = document.getElementById('e-type')?.value;
    const hall = document.getElementById('e-hall')?.value;
    const name = document.getElementById('e-name')?.value.trim();
    const date = document.getElementById('e-date')?.value.trim();
    const msg = `*طلب حجز مناسبة — ${EVENTS_CONFIG.venueName}*\nالمناسبة: ${type}\nالقاعة: ${hall}\nالاسم: ${name}\nالتاريخ والضيوف: ${date}`;
    window.open(`https://wa.me/${EVENTS_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
});
