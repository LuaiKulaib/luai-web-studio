/* =========================================================
   app.js — أكاديمية المستقبل للتدريب والتأهيل
   ========================================================= */
'use strict';

let activeCat = 'all';
let searchTerm = '';
let selectedModalCourse = null;

const SVG = {
  laptop:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  cert:      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  video:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
  briefcase: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
};

function renderStats() {
  const el = document.getElementById('ac-stats');
  if (el) {
    el.innerHTML = ACADEMY_DATA.stats.map(s => `
      <div class="stat-item"><strong>${s.value}</strong><span>${s.label}</span></div>
    `).join('');
  }
}

function renderBenefits() {
  const el = document.getElementById('ac-benefits');
  if (el) {
    el.innerHTML = ACADEMY_DATA.benefits.map(b => `
      <div class="ben-card">
        <div class="ben-icon">${SVG[b.icon] || ''}</div>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
      </div>
    `).join('');
  }
}

function renderCourses() {
  const grid = document.getElementById('ac-courses');
  if (!grid) return;
  const q = searchTerm.trim().toLowerCase();
  const list = ACADEMY_DATA.courses.filter(c => {
    const okCat = activeCat === 'all' || c.cat === activeCat;
    const okQ = !q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
    return okCat && okQ;
  });

  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:2.5rem;background:#fff;border-radius:14px;border:1px dashed var(--border);color:var(--slate);">لا توجد برامج مطابقة لبحثك.</div>`;
    return;
  }

  grid.innerHTML = list.map(c => {
    const wa = `https://wa.me/${ACADEMY_CONFIG.whatsappNumber}?text=${encodeURIComponent('أهلاً، أرغب بالتسجيل في: ' + c.title)}`;
    return `
      <article class="course-card">
        <div class="course-img">
          <img src="${c.image}" alt="${c.title}" loading="lazy">
          <span class="course-mode">${c.mode}</span>
        </div>
        <div class="course-body">
          <div class="course-meta"><span>${c.duration}</span><span>${c.startDate}</span></div>
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
          <div class="course-actions">
            <a href="${wa}" class="btn-wa-seat" target="_blank" rel="noopener">احجز مقعدك</a>
            <button type="button" class="btn-syllabus" data-syllabus="${c.id}">عرض المحاور</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function openSyllabus(id) {
  const c = ACADEMY_DATA.courses.find(x => x.id === id);
  if (!c) return;
  selectedModalCourse = c;
  document.getElementById('mod-title').textContent = c.title;
  document.getElementById('mod-list').innerHTML = c.modules.map((m, i) => `
    <div class="mod-item"><span class="mod-num">${i + 1}</span><span>${m}</span></div>
  `).join('');
  document.getElementById('ac-backdrop')?.classList.add('open');
  document.getElementById('ac-modal')?.classList.add('open');
}

function closeSyllabus() {
  document.getElementById('ac-backdrop')?.classList.remove('open');
  document.getElementById('ac-modal')?.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderBenefits();
  renderCourses();

  const sel = document.getElementById('a-course');
  if (sel) {
    sel.innerHTML = ACADEMY_DATA.courses.map(c => `<option value="${c.title}">${c.title}</option>`).join('');
  }

  document.getElementById('ac-cats')?.addEventListener('click', e => {
    const btn = e.target.closest('.cat-pill');
    if (!btn) return;
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    renderCourses();
  });

  document.getElementById('ac-search')?.addEventListener('input', e => {
    searchTerm = e.target.value;
    renderCourses();
  });

  document.getElementById('ac-courses')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-syllabus]');
    if (!btn) return;
    openSyllabus(btn.dataset.syllabus);
  });

  document.getElementById('btn-close-modal')?.addEventListener('click', closeSyllabus);
  document.getElementById('ac-backdrop')?.addEventListener('click', closeSyllabus);
  document.getElementById('btn-modal-register')?.addEventListener('click', () => {
    if (selectedModalCourse && sel) sel.value = selectedModalCourse.title;
    closeSyllabus();
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('ac-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('a-name')?.value.trim();
    const phone = document.getElementById('a-phone')?.value.trim();
    const course = document.getElementById('a-course')?.value;
    const mode = document.getElementById('a-mode')?.value;
    const msg = `*طلب تسجيل دبلوم — ${ACADEMY_CONFIG.academyName}*\nالاسم: ${name}\nالجوال: ${phone}\nالدبلوم: ${course}\nالحضور: ${mode}`;
    window.open(`https://wa.me/${ACADEMY_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
});
