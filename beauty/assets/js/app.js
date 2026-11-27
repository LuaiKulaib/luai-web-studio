/* =========================================================
   app.js — دار نورة للعناية والتجميل والسبا
   ========================================================= */
'use strict';

let activeCat = 'all';

function renderServices() {
  const grid = document.getElementById('be-services');
  if (!grid) return;
  const list = activeCat === 'all'
    ? BEAUTY_DATA.services
    : BEAUTY_DATA.services.filter(s => s.cat === activeCat);

  grid.innerHTML = list.map(s => {
    const wa = `https://wa.me/${BEAUTY_CONFIG.whatsappNumber}?text=${encodeURIComponent('أهلاً، أرغب بحجز موعد: ' + s.title)}`;
    return `
      <article class="svc-card">
        <div class="svc-img">
          <img src="${s.image}" alt="${s.title}" loading="lazy">
          <span class="svc-badge">${s.badge}</span>
        </div>
        <div class="svc-body">
          <span class="svc-dur">المدة: ${s.duration}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <a href="${wa}" class="btn-wa" target="_blank" rel="noopener">احجزي عبر واتساب</a>
        </div>
      </article>
    `;
  }).join('');
}

function renderPackages() {
  const grid = document.getElementById('be-packages');
  if (!grid) return;
  grid.innerHTML = BEAUTY_DATA.packages.map(p => `
    <div class="pkg-card">
      <span>${p.note}</span>
      <h3>${p.name}</h3>
      <p>${p.items}</p>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderPackages();

  document.getElementById('be-filters')?.addEventListener('click', e => {
    const btn = e.target.closest('.f-pill');
    if (!btn) return;
    document.querySelectorAll('.f-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    renderServices();
  });

  document.getElementById('be-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const service = document.getElementById('b-service')?.value;
    const time = document.getElementById('b-time')?.value;
    const name = document.getElementById('b-name')?.value.trim();
    const day = document.getElementById('b-day')?.value.trim();
    const msg = `*حجز موعد — ${BEAUTY_CONFIG.salonName}*\nالخدمة: ${service}\nالفترة: ${time}\nالاسم: ${name}\nاليوم: ${day}`;
    window.open(`https://wa.me/${BEAUTY_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
});
