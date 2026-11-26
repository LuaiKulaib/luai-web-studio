/* =========================================================
   app.js — مجموعة الأفق القابضة (Multi-Page Corporate Site)
   ========================================================= */
'use strict';

const SVG = {
  building: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><path d="M9 22v-4h6v4"/></svg>`,
  compass:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  layers:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  shield:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  award:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  clock:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  users:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  chevron:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`,
};

function renderShell() {
  const page = document.body.dataset.page || 'home';
  const navItems = [
    { id: 'home',     href: 'index.html',    label: 'الرئيسية' },
    { id: 'about',    href: 'about.html',    label: 'من نحن' },
    { id: 'services', href: 'services.html', label: 'الخدمات والمشاريع' },
    { id: 'contact',  href: 'contact.html',  label: 'اتصل بنا والفروع' },
  ];

  const headerSlot = document.getElementById('corp-header');
  if (headerSlot) {
    const linksHTML = navItems.map(n => `
      <a href="${n.href}" class="${n.id === page ? 'active' : ''}">${n.label}</a>
    `).join('');

    headerSlot.innerHTML = `
      <div class="top-strip">
        <div class="container top-strip-inner">
          <span>صنعاء · عدن · الرياض — خدمات مقاولات وتوريدات مؤسسية</span>
          <span>هاتف الإدارة: 0782259937</span>
        </div>
      </div>
      <header class="site-header">
        <div class="container header-inner">
          <a href="index.html" class="brand-lockup">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
              <rect width="38" height="38" rx="9" fill="#0F172A"/>
              <path d="M9 28L19 9l10 19H9z" stroke="#3B82F6" stroke-width="2" stroke-linejoin="round"/>
              <path d="M14 28l5-10 5 10" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/>
            </svg>
            <div class="brand-text">
              <strong>مجموعة الأفق</strong>
              <span>Al-Ofoq Corporate Group</span>
            </div>
          </a>

          <nav class="nav-links" aria-label="القائمة الرئيسية">${linksHTML}</nav>

          <div class="header-actions">
            <a href="contact.html" class="btn-rfp">طلب عرض / مناقصة</a>
            <button type="button" class="menu-btn" id="menu-btn" aria-label="القائمة" aria-expanded="false">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
        <div class="mobile-drawer" id="mobile-drawer">${linksHTML}</div>
      </header>
    `;

    const menuBtn = document.getElementById('menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    menuBtn?.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  const footerSlot = document.getElementById('corp-footer');
  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <h4>${CORP_CONFIG.companyName}</h4>
              <p style="font-size:.88rem;max-width:340px;">شركة متخصصة في المقاولات، الاستشارات الهندسية، والتوريدات المؤسسية في اليمن والخليج منذ أكثر من 25 عاماً.</p>
            </div>
            <div class="footer-col">
              <h4>صفحات الموقع</h4>
              <a href="index.html">الصفحة الرئيسية</a>
              <a href="about.html">من نحن والقيادة</a>
              <a href="services.html">الخدمات والمشاريع</a>
              <a href="contact.html">اتصل بنا والفروع</a>
            </div>
            <div class="footer-col">
              <h4>التواصل المباشر</h4>
              <a href="https://wa.me/${CORP_CONFIG.whatsappNumber}" target="_blank" rel="noopener">واتساب الإدارة: 967782259937+</a>
              <a href="tel:+${CORP_CONFIG.whatsappNumber}">الهاتف: ${CORP_CONFIG.phone}</a>
              <a href="contact.html">تقديم طلب مناقصة</a>
            </div>
          </div>
          <div class="footer-bottom">
            جميع الحقوق محفوظة &copy; 2026 — ${CORP_CONFIG.companyName} | صُمّم بواسطة
            <a href="https://luaikulaib.github.io/luai-web-studio/" target="_blank" rel="noopener">لؤي ويب ستوديو</a>
          </div>
        </div>
      </footer>
    `;
  }
}

function renderStats() {
  const el = document.getElementById('corp-stats');
  if (!el) return;
  el.innerHTML = CORP_DATA.stats.map(s => `
    <div class="stat-box"><strong>${s.value}</strong><span>${s.label}</span></div>
  `).join('');
}

function renderPillars() {
  const el = document.getElementById('corp-pillars');
  if (!el) return;
  el.innerHTML = CORP_DATA.pillars.map(p => `
    <article class="corp-card">
      <div class="icon-box">${SVG[p.icon] || ''}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </article>
  `).join('');
}

function renderProjects(filter = 'all', limit = null) {
  const el = document.getElementById('corp-projects');
  if (!el) return;
  let items = filter === 'all' ? CORP_DATA.projects : CORP_DATA.projects.filter(p => p.cat === filter);
  if (limit) items = items.slice(0, limit);
  el.innerHTML = items.map(p => `
    <article class="proj-card">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="proj-body">
        <div class="proj-meta"><span>${p.catLabel}</span><span>${p.year}</span></div>
        <h3>${p.title}</h3>
        <p>${p.scope}</p>
      </div>
    </article>
  `).join('');
}

function renderAboutSections() {
  const valEl = document.getElementById('corp-values');
  if (valEl) {
    valEl.innerHTML = CORP_DATA.values.map(v => `
      <div class="corp-card">
        <div class="icon-box">${SVG[v.icon] || ''}</div>
        <h3>${v.title}</h3>
        <p>${v.desc}</p>
      </div>
    `).join('');
  }

  const leadEl = document.getElementById('corp-leadership');
  if (leadEl) {
    leadEl.innerHTML = CORP_DATA.leadership.map(l => `
      <div class="corp-card">
        <span style="display:inline-block;font-size:.76rem;font-weight:800;color:var(--blue);margin-bottom:.3rem;">${l.role}</span>
        <h3>${l.name}</h3>
        <p>${l.bio}</p>
      </div>
    `).join('');
  }
}

function renderContactSections() {
  const brEl = document.getElementById('corp-branches');
  if (brEl) {
    brEl.innerHTML = CORP_DATA.branches.map(b => `
      <div class="corp-card">
        <h3>${b.city}</h3>
        <p style="margin-bottom:.35rem;">${b.address}</p>
        <small style="color:var(--blue);font-weight:700;">${b.hours}</small>
      </div>
    `).join('');
  }

  const faqEl = document.getElementById('corp-faqs');
  if (faqEl) {
    faqEl.innerHTML = CORP_DATA.faqs.map(f => `
      <div class="faq-item">
        <button type="button" class="faq-q"><span>${f.q}</span>${SVG.chevron}</button>
        <div class="faq-a">${f.a}</div>
      </div>
    `).join('');
    faqEl.addEventListener('click', e => {
      const btn = e.target.closest('.faq-q');
      if (!btn) return;
      btn.closest('.faq-item').classList.toggle('open');
    });
  }

  document.getElementById('corp-contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const org = document.getElementById('cf-org')?.value.trim();
    const person = document.getElementById('cf-name')?.value.trim();
    const phone = document.getElementById('cf-phone')?.value.trim();
    const dept = document.getElementById('cf-dept')?.value;
    const msg = document.getElementById('cf-msg')?.value.trim();

    const text = [
      `*مراسلة رسمية — ${CORP_CONFIG.companyName}*`,
      `الجهة / الشركة: ${org}`,
      `الاسم: ${person} (${phone})`,
      `القسم المعني: ${dept}`,
      `التفاصيل: ${msg}`,
    ].join('\n');

    window.open(`https://wa.me/${CORP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderShell();
  renderStats();
  renderPillars();

  const page = document.body.dataset.page;
  if (page === 'home') renderProjects('all', 2);
  if (page === 'services') {
    renderProjects('all');
    document.getElementById('proj-filters')?.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      document.querySelectorAll('#proj-filters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  }
  if (page === 'about') renderAboutSections();
  if (page === 'contact') renderContactSections();
});
