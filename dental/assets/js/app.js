/* =========================================================
   app.js — عيادة ابتسامة — Dental Clinic
   ========================================================= */
'use strict';

const SVG = {
  sparkle: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5z"/><path d="M19 15l.5 1.5L21 17l-1.5.5L19 19l-.5-1.5L17 17l1.5-.5z"/></svg>`,
  diamond:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="2"/><polyline points="2 8.5 12 12 22 8.5"/></svg>`,
  tooth:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c-2.5 0-4.5 1.2-5.5 3-0.6 1.1-0.5 2.2-0.3 3.3 0.4 2.2 0.7 4.5 0.4 6.5-0.2 1.5 0.7 3 2.2 3.4 1 0.3 2 0 2.8-0.6 0.4-0.3 0.6-0.3 1 0 0.8 0.6 1.8 0.9 2.8 0.6 1.5-0.4 2.4-1.9 2.2-3.4-0.3-2 0-4.3 0.4-6.5 0.2-1.1 0.3-2.2-0.3-3.3C16.5 4.2 14.5 3 12 3z"/></svg>`,
  align:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><circle cx="7" cy="6" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="17" cy="18" r="1.5" fill="currentColor"/></svg>`,
  shield:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  star:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  doctor:   `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M14 14v2m2-1h-4"/></svg>`,
  wa:       `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.42A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.065-1.113l-.29-.173-3.013.859.86-2.936-.19-.302A7.953 7.953 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/></svg>`,
  arrow:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  chevron:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
};

function renderStats() {
  const g = document.getElementById('stats-grid');
  if (!g) return;
  g.innerHTML = DENTAL_DATA.stats.map(s => `
    <div class="stat-item">
      <div class="val">${s.value}</div>
      <div class="lbl">${s.label}</div>
    </div>`).join('');
}

function renderServices() {
  const g = document.getElementById('svc-grid');
  if (!g) return;
  g.innerHTML = DENTAL_DATA.services.map(s => {
    const wa = `https://wa.me/${DENTAL_CONFIG.whatsappNumber}?text=${encodeURIComponent('أهلاً، أريد الاستفسار عن: ' + s.title)}`;
    return `
    <div class="svc-card">
      ${s.tag ? `<span class="svc-tag">${s.tag}</span>` : ''}
      <div class="svc-icon">${SVG[s.icon] || ''}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <a href="${wa}" class="svc-link" target="_blank" rel="noopener">
        احجز الآن ${SVG.arrow}
      </a>
    </div>`;
  }).join('');
}

function renderDoctors() {
  const g = document.getElementById('doc-grid');
  if (!g) return;
  g.innerHTML = DENTAL_DATA.doctors.map(d => `
    <div class="doc-card">
      <div class="doc-avatar">${SVG.doctor}</div>
      <h3>${d.name}</h3>
      <div class="sp">${d.spec}</div>
      <div class="ex">${d.exp}</div>
      <div class="dg">${d.degree}</div>
    </div>`).join('');
}

function renderSteps() {
  const g = document.getElementById('steps-grid');
  if (!g) return;
  g.innerHTML = DENTAL_DATA.steps.map(s => `
    <div class="step-card">
      <div class="step-num">${s.step}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>`).join('');
}

function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = DENTAL_DATA.faqs.map((f, i) => `
    <div class="faq-item" id="fi-${i}">
      <button class="faq-q" aria-expanded="false">
        <span>${f.q}</span>${SVG.chevron}
      </button>
      <div class="faq-a">${f.a}</div>
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
    if (!open) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
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
  renderServices();
  renderDoctors();
  renderSteps();
  renderFAQ();
  initFAB();
});
