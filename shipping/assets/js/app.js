/* =========================================================
   app.js — جسر العالم للشحن الدولي والتخليص الجمركي
   ========================================================= */
'use strict';

const SVG = {
  ship:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 1v4"/></svg>`,
  plane:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
  warehouse: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/></svg>`,
};

function renderTracking(code) {
  const box = document.getElementById('track-result');
  if (!box) return;
  const key = (code || '').trim().toUpperCase();
  const info = SHIP_DATA.demoTracking[key];
  if (!info) {
    box.innerHTML = `<p style="color:#DC2626;font-weight:700;">رقم البوليصة غير موجود في العرض التجريبي — جرّب WB-1024 أو WB-2048 أو WB-3090.</p>`;
    return;
  }
  const stepsHTML = info.steps.map((st, idx) => `
    <div class="t-step ${idx <= info.stepIndex ? 'done' : ''}">${st}</div>
  `).join('');

  box.innerHTML = `
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:.4rem;margin-bottom:.35rem;">
      <strong>${info.route}</strong>
      <span style="color:var(--orange);font-weight:800;">${info.eta}</span>
    </div>
    <div style="color:var(--slate);font-size:.8rem;">${info.type}</div>
    <div class="track-steps">${stepsHTML}</div>
  `;
}

function renderServices() {
  const el = document.getElementById('sh-services');
  if (!el) return;
  el.innerHTML = SHIP_DATA.services.map(s => `
    <article class="svc-card">
      <img src="${s.image}" alt="${s.title}" loading="lazy">
      <div class="svc-body">
        <div class="svc-icon">${SVG[s.icon] || ''}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    </article>
  `).join('');
}

function renderRoutes() {
  const el = document.getElementById('sh-routes');
  if (!el) return;
  el.innerHTML = SHIP_DATA.routes.map(r => `
    <div class="route-card">
      <div>
        <strong>${r.from} &larr; ${r.to}</strong>
        <span>المدة التقديرية: ${r.transit}</span>
      </div>
      <span class="route-badge">${r.mode}</span>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTracking('WB-1024');
  renderServices();
  renderRoutes();

  document.getElementById('btn-track')?.addEventListener('click', () => {
    renderTracking(document.getElementById('track-input')?.value);
  });

  document.querySelectorAll('.code-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = document.getElementById('track-input');
      if (inp) inp.value = btn.dataset.code;
      renderTracking(btn.dataset.code);
    });
  });

  document.getElementById('sh-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const origin = document.getElementById('s-origin')?.value;
    const dest = document.getElementById('s-dest')?.value;
    const mode = document.getElementById('s-mode')?.value;
    const weight = document.getElementById('s-weight')?.value.trim();
    const goods = document.getElementById('s-goods')?.value.trim();
    const msg = `*طلب تسعيرة شحنة — ${SHIP_CONFIG.companyName}*\nالمصدر: ${origin}\nالوجهة: ${dest}\nالوسيلة: ${mode}\nالوزن/الحجم: ${weight}\nالبضاعة والعميل: ${goods}`;
    window.open(`https://wa.me/${SHIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
});
