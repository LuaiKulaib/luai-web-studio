/* ============================================================
   حلويات وآيسكريم البطريق — Penguin Ice Cream & Custom Cakes
   assets/js/app.js
   Full Interactive Landing Page Application
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPromoBar();
  initNavbarScrollAndSpy();
  initMobileNav();
  initPhoneSwitcher();
  initPhoneTilt();
  initSmartDeepLink();
  renderTrustPillars();
  renderAppFeatures();
  renderSteps();
  renderMenuFilters();
  renderSneakPeekMenu('all');
  renderReviews();
  renderLocations();
  renderFaqs();
  initSmartWhatsApp();
});

/* ── 1. Top Promo Bar with Session Storage ─────────────────── */
function initPromoBar() {
  const promoBar = document.getElementById('promo-bar');
  const closeBtn = document.getElementById('promo-close');
  if (!promoBar || !closeBtn) return;

  // Check if dismissed before in this session
  if (sessionStorage.getItem('penguin_promo_closed') === 'true') {
    promoBar.classList.add('hidden');
    promoBar.style.display = 'none';
    return;
  }

  closeBtn.addEventListener('click', () => {
    promoBar.classList.add('hidden');
    sessionStorage.setItem('penguin_promo_closed', 'true');
    setTimeout(() => {
      promoBar.style.display = 'none';
    }, 350);
  });
}

/* ── 2. Navbar Scroll Effect & Scrollspy Active Buttons ────── */
function initNavbarScrollAndSpy() {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-btn-link');
  const sections = document.querySelectorAll('section[id]');
  if (!nav) return;

  // Optimized Scroll effect on navbar with requestAnimationFrame
  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 30) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // Lightweight Scrollspy observer (without any scroll interruption)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
}

/* ── 3. Mobile Nav Drawer Toggle ───────────────────────────── */
function initMobileNav() {
  const ham = document.getElementById('ham-btn');
  const drawer = document.getElementById('nav-drawer');
  const closeBtn = document.getElementById('drawer-close');
  if (!ham || !drawer) return;

  const toggleDrawer = () => drawer.classList.toggle('open');
  const closeDrawer = () => drawer.classList.remove('open');

  ham.addEventListener('click', toggleDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ── 4. 3D Phone Screen Switcher (3 Interactive Screens) ───── */
function initPhoneSwitcher() {
  const imgEl = document.getElementById('phone-screen-img');
  const tabs = document.querySelectorAll('.phone-tab-btn');
  if (!imgEl || tabs.length === 0) return;

  const screens = {
    splash: {
      src: 'assets/images/app-screen-splash.png',
      alt: 'شاشة البداية والترحيب - تطبيق البطريق'
    },
    login: {
      src: 'assets/images/app-screen-login.png',
      alt: 'شاشة تسجيل الدخول والمحفظة - تطبيق البطريق'
    },
    cake: {
      src: 'assets/images/dessert-3.jpg',
      alt: 'شاشة استوديو تصميم وتخصيص الكيك - تطبيق البطريق'
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.dataset.screen;
      const target = screens[key] || screens.splash;

      imgEl.style.opacity = '0.2';
      imgEl.style.transform = 'scale(0.96)';

      setTimeout(() => {
        imgEl.src = target.src;
        imgEl.alt = target.alt;
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      }, 160);
    });
  });
}

/* ── 5. Phone 3D Tilt Effect on Desktop ────────────────────── */
function initPhoneTilt() {
  const phone = document.getElementById('interactive-phone');
  if (!phone || window.innerWidth < 1024) return;

  const wrap = phone.parentElement;
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 16;
    const rotY = (x / rect.width) * 16;

    phone.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  });

  wrap.addEventListener('mouseleave', () => {
    phone.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
}

/* ── 6. Smart Deep Link & Device Store Detection ───────────── */
function initSmartDeepLink() {
  const deepLinkBtns = document.querySelectorAll('.js-deep-link');
  const playBtns = document.querySelectorAll('.js-play-store');
  const appleBtns = document.querySelectorAll('.js-app-store');

  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Auto highlight store based on user OS
  if (isAndroid) {
    playBtns.forEach(btn => btn.style.boxShadow = '0 0 0 3px #38BDF8, 0 10px 30px rgba(56, 189, 248, 0.4)');
  } else if (isIOS) {
    appleBtns.forEach(btn => btn.style.boxShadow = '0 0 0 3px #E63973, 0 10px 30px rgba(230, 57, 115, 0.4)');
  }

  // Deep Link Execution with fallback
  deepLinkBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const deepLink = DATA.brand.deepLinkUrl;
      const fallbackUrl = isIOS ? DATA.brand.appStoreUrl : DATA.brand.googlePlayUrl;

      const startTime = Date.now();
      window.location.href = deepLink;

      setTimeout(() => {
        // If user didn't leave the browser (app not installed), open store
        if (Date.now() - startTime < 1600) {
          window.open(fallbackUrl, '_blank');
        }
      }, 1000);
    });
  });
}

/* ── 7. Render Trust Pillars ───────────────────────────────── */
function renderTrustPillars() {
  const container = document.getElementById('trust-grid');
  if (!container || !DATA.trustPillars) return;

  container.innerHTML = DATA.trustPillars.map(p => `
    <div class="trust-card">
      <div class="trust-icon-box">${p.icon}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </div>
  `).join('');
}

/* ── 8. Render App Features ────────────────────────────────── */
function renderAppFeatures() {
  const container = document.getElementById('features-grid');
  if (!container || !DATA.appFeatures) return;

  container.innerHTML = DATA.appFeatures.map(f => `
    <div class="feature-card">
      <div class="feature-icon-wrap">${f.icon}</div>
      <div>
        <span class="feature-badge">${f.badge}</span>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>
    </div>
  `).join('');
}

/* ── 9. Render Simple 3 Order Steps ────────────────────────── */
function renderSteps() {
  const container = document.getElementById('steps-grid');
  if (!container || !DATA.steps) return;

  container.innerHTML = DATA.steps.map(s => `
    <div class="step-card">
      <div class="step-header-row">
        <div class="step-num-bubble">${s.num}</div>
        <span class="step-badge-pill">${s.badge || 'سريع'}</span>
      </div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>
  `).join('');
}

/* ── 10. Render Menu Filters & Sneak Peek Menu Showcase ────── */
function renderMenuFilters() {
  const container = document.getElementById('menu-filter-bar');
  if (!container || !DATA.menuCategories) return;

  container.innerHTML = DATA.menuCategories.map((c, i) => `
    <button class="menu-filter-btn ${i === 0 ? 'active' : ''}" data-cat="${c.id}" type="button">
      ${c.name}
    </button>
  `).join('');

  container.querySelectorAll('.menu-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.menu-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSneakPeekMenu(btn.dataset.cat);
    });
  });
}

function renderSneakPeekMenu(category = 'all') {
  const container = document.getElementById('menu-grid');
  if (!container || !DATA.sneakPeekMenu) return;

  const items = category === 'all' 
    ? DATA.sneakPeekMenu 
    : DATA.sneakPeekMenu.filter(m => m.category === category);

  container.innerHTML = items.map(m => `
    <div class="menu-card">
      <div class="menu-img-wrap">
        <img src="${m.img}" alt="${m.title}" loading="lazy" />
        <span class="menu-tag">${m.tag}</span>
        <span class="menu-ready-tag">${m.readyBadge}</span>
      </div>
      <div class="menu-body">
        <h3>${m.title}</h3>
        <p>${m.desc}</p>
        <div class="menu-footer-row">
          <span class="menu-price">${m.price}</span>
          <a href="#download" class="menu-cta-btn">
            <span>احجزه بالتطبيق</span>
            <span>📲</span>
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── 11. Render Reviews ────────────────────────────────────── */
function renderReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container || !DATA.reviews) return;

  const star = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  container.innerHTML = DATA.reviews.map(r => `
    <div class="rev-card">
      <div class="rev-header">
        <div class="rev-stars" style="display:flex; gap:2px;">${star.repeat(r.stars)}</div>
        <span class="rev-date">${r.date || 'مؤخراً'}</span>
      </div>
      <p class="rev-text">"${r.text}"</p>
      <div class="rev-author">
        <strong>${r.name}</strong>
        <span>${r.badge}</span>
      </div>
    </div>
  `).join('');
}

/* ── 12. Render Locations & Dynamic Google Map Switcher ────── */
function renderLocations() {
  const listContainer = document.getElementById('locations-list');
  const iframe = document.getElementById('google-map-iframe');
  const branchNameBadge = document.getElementById('map-branch-name');
  if (!listContainer || !DATA.locations) return;

  listContainer.innerHTML = DATA.locations.map((loc, idx) => `
    <div class="loc-card ${idx === 0 ? 'active' : ''}" data-branch-id="${loc.id}">
      <div>
        <span class="loc-badge">فرع مجهز بصالة تذوق</span>
        <span class="loc-status-pill">${loc.status}</span>
      </div>
      <h3>${loc.branch}</h3>
      <p>${loc.address} — ${loc.city}</p>
      
      <div class="loc-meta-row">
        <span><strong>ساعات العمل:</strong> ${loc.hours}</span>
        <span><strong>الهاتف والحجز المباشر:</strong> ${loc.phone}</span>
      </div>

      <div class="loc-select-hint">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>انقر لعرض موقع الفرع على الخريطة ↗</span>
      </div>
    </div>
  `).join('');

  // Switch map location when clicking branch card
  listContainer.querySelectorAll('.loc-card').forEach(card => {
    card.addEventListener('click', () => {
      listContainer.querySelectorAll('.loc-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const branchId = card.dataset.branchId;
      const targetLoc = DATA.locations.find(l => l.id === branchId);
      if (targetLoc && iframe) {
        iframe.src = targetLoc.mapEmbedUrl;
        if (branchNameBadge) {
          branchNameBadge.textContent = targetLoc.branch;
        }
      }
    });
  });
}

/* ── 13. Render FAQ Accordion ──────────────────────────────── */
function renderFaqs() {
  const container = document.getElementById('faq-wrap');
  if (!container || !DATA.faqs) return;

  container.innerHTML = DATA.faqs.map((f, idx) => `
    <div class="faq-item ${idx === 0 ? 'open' : ''}">
      <button class="faq-btn" type="button" aria-expanded="${idx === 0}">
        <div>
          <span class="faq-cat-badge">${f.category || 'عام'}</span>
          <span>${f.q}</span>
        </div>
        <div class="icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </button>
      <div class="faq-content">
        <div class="faq-content-inner">
          <p>${f.a}</p>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const isOpen = parent.classList.contains('open');

      container.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── 14. Smart Floating Speed-Dial Contact Hub ────────────── */
function initSmartWhatsApp() {
  const dialWrap = document.getElementById('speed-dial-wrap');
  const mainBtn = document.getElementById('dial-main-btn');
  const dialActions = document.getElementById('dial-actions');
  const backdrop = document.getElementById('dial-backdrop');
  const bubble = document.getElementById('smart-wa-bubble');
  const closeBtn = document.getElementById('bubble-close');

  function openDial() {
    dialWrap.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    mainBtn.setAttribute('aria-expanded', 'true');
    if (dialActions) dialActions.setAttribute('aria-hidden', 'false');
    if (bubble) bubble.classList.remove('visible');
  }

  function closeDial() {
    dialWrap.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    mainBtn.setAttribute('aria-expanded', 'false');
    if (dialActions) dialActions.setAttribute('aria-hidden', 'true');
  }

  if (bubble) {
    setTimeout(() => {
      if (!dialWrap || !dialWrap.classList.contains('active')) {
        bubble.classList.add('visible');
      }
    }, 3500);

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        bubble.classList.remove('visible');
      });
    }
  }

  if (mainBtn && dialWrap) {
    mainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (dialWrap.classList.contains('active')) {
        closeDial();
      } else {
        openDial();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        closeDial();
      });
    }

    document.addEventListener('click', (e) => {
      if (!dialWrap.contains(e.target)) {
        closeDial();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dialWrap.classList.contains('active')) {
        closeDial();
      }
    });
  }
}
