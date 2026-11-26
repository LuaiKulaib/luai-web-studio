/* =========================================================
   app.js — مجموعة السعيد للتجارة والتبريد
   ========================================================= */
'use strict';

const SVG = {
  supermarket: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l1-5h16l1 5"/><path d="M3 9v1a2 2 0 0 0 4 0V9m0 1a2 2 0 0 0 4 0V9m0 1a2 2 0 0 0 4 0V9m0 1a2 2 0 0 0 4 0V9"/><path d="M5 12v9h14v-9"/><path d="M9 21v-6h6v6"/></svg>`,
  shop: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  warehouseTruck: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="7" width="14" height="10" rx="1"/><path d="M15 11h4l3 3v3h-7z"/><circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/><path d="M3 7l9-4 9 4"/></svg>`,
  retailer: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  handshakeCheck: `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  handshake: `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  truck: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  cold: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></svg>`,
  depot: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect x="6" y="10" width="12" height="12"/></svg>`,
  retailGrowth: `<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  arrowLeft: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
};

let currentSlide = 0;
let slideTimer = null;

function renderHero() {
  const slidesEl = document.getElementById('hero-slides');
  const copyEl = document.getElementById('hero-copy');
  const dotsEl = document.getElementById('hero-dots');
  if (!slidesEl || !copyEl || !dotsEl) return;

  slidesEl.innerHTML = TRADE_DATA.heroSlides.map((s, idx) => `
    <div class="hero-slide ${idx === 0 ? 'active' : ''}">
      <img src="${s.image}" alt="${s.alt}">
    </div>
  `).join('');

  dotsEl.innerHTML = TRADE_DATA.heroSlides.map((_, idx) => `
    <button type="button" class="hero-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}" aria-label="شريحة ${idx + 1}"></button>
  `).join('');

  function showSlide(index) {
    const total = TRADE_DATA.heroSlides.length;
    currentSlide = (index + total) % total;
    const s = TRADE_DATA.heroSlides[currentSlide];

    slidesEl.querySelectorAll('.hero-slide').forEach((el, i) => {
      el.classList.toggle('active', i === currentSlide);
    });
    dotsEl.querySelectorAll('.hero-dot').forEach((el, i) => {
      el.classList.toggle('active', i === currentSlide);
    });

    copyEl.innerHTML = `
      <span class="hero-badge">${s.badge}</span>
      <h1>${s.title}</h1>
      <p>${s.desc}</p>
      <div class="hero-cta-row">
        <a href="${s.ctaHref}" class="btn-crimson">
          <span class="circle-arrow">${SVG.arrowLeft}</span>
          <span>${s.ctaText}</span>
        </a>
        <a href="https://wa.me/${TRADE_CONFIG.whatsappNumber}?text=${encodeURIComponent('أهلاً، أرغب بقائمة أسعار الجملة والتوريد لدى مجموعة السعيد')}" class="btn-ghost-light" target="_blank" rel="noopener">
          تواصل مع المبيعات
        </a>
      </div>
    `;
  }

  function resetAuto() {
    if (slideTimer) clearInterval(slideTimer);
    slideTimer = setInterval(() => showSlide(currentSlide + 1), 6500);
  }

  document.getElementById('hero-prev')?.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    resetAuto();
  });
  document.getElementById('hero-next')?.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    resetAuto();
  });
  dotsEl.addEventListener('click', e => {
    const dot = e.target.closest('.hero-dot');
    if (!dot) return;
    showSlide(Number(dot.dataset.slide));
    resetAuto();
  });

  showSlide(0);
  resetAuto();
}

function renderBrands() {
  const el = document.getElementById('brands-grid');
  if (!el) return;
  el.innerHTML = TRADE_DATA.brands.map(b => `
    <div class="brand-card">
      <div class="brand-seal" style="background:${b.color};">${b.en}</div>
      <h3>${b.name}</h3>
      <p>${b.cat}</p>
    </div>
  `).join('');
}

function renderNetwork() {
  const citiesEl = document.getElementById('cities-row');
  const directEl = document.getElementById('direct-grid');
  const indirectEl = document.getElementById('indirect-grid');

  if (citiesEl) {
    citiesEl.innerHTML = TRADE_DATA.cities.map(c => `
      <span class="city-pill">${SVG.pin} ${c}</span>
    `).join('');
  }

  if (directEl) {
    directEl.innerHTML = TRADE_DATA.directNetwork.map(item => `
      <div class="metric-card">
        <div class="metric-icon">${SVG[item.icon] || ''}</div>
        <div class="metric-val">${item.value}</div>
        <div class="metric-lbl">${item.label}</div>
      </div>
    `).join('');
  }

  if (indirectEl) {
    indirectEl.innerHTML = TRADE_DATA.indirectNetwork.map(item => `
      <div class="metric-card">
        <div class="metric-icon">${SVG[item.icon] || ''}</div>
        <div class="metric-val">${item.value}</div>
        <div class="metric-lbl">${item.label}</div>
      </div>
    `).join('');
  }
}

function renderInfra() {
  const el = document.getElementById('infra-grid');
  if (!el) return;
  el.innerHTML = TRADE_DATA.infrastructure.map(item => `
    <article class="infra-card">
      <div class="infra-circle">${SVG[item.icon] || ''}</div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </article>
  `).join('');
}

function renderHighlights() {
  const el = document.getElementById('highlights-grid');
  if (!el) return;
  const n = TRADE_DATA.news;
  const r = TRADE_DATA.retailShare;
  const waNews = `https://wa.me/${TRADE_CONFIG.whatsappNumber}?text=${encodeURIComponent(n.waText)}`;

  el.innerHTML = `
    <article class="news-card">
      <img src="${n.image}" alt="${n.title}" loading="lazy">
      <div class="news-overlay">
        <h3>${n.title}</h3>
        <p>${n.summary}</p>
        <a href="${waNews}" class="btn-dark-sm" target="_blank" rel="noopener">
          اطلب تفاصيل التوريد ${SVG.arrowLeft}
        </a>
      </div>
    </article>

    <article class="retail-card">
      <img src="${r.image}" alt="${r.title}" loading="lazy">
      <div class="retail-inner">
        <div class="retail-badge-icon">${SVG[r.icon] || ''}</div>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
      </div>
    </article>
  `;
}

function initUI() {
  const menuBtn = document.getElementById('menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const fab = document.getElementById('fab');
  const trigger = document.getElementById('fab-trigger');
  if (fab && trigger) {
    trigger.addEventListener('click', () => {
      const open = fab.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open);
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
}

document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderBrands();
  renderNetwork();
  renderInfra();
  renderHighlights();
  initUI();
});
