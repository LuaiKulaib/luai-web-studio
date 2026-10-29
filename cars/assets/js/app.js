/* ============================================================
   كروم برو — Dynamic Rendering & App Logic
   assets/js/app.js
   Upgraded with Full Interactive Polish
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPromoBar();
  initNavScrollAndSpy();
  renderTrustRibbon();
  renderMarqueeBrands();
  renderServices();
  renderPricingCalculator();
  renderPackages();
  renderProcessInteractive();
  renderBeforeAfterSection();
  renderGallery();
  initGalleryLightbox();
  renderReviews();
  renderStats();
  renderFaqs();
  initReelsModal();
  initSmartWhatsApp();
});

/* ── 0. Top Promo Announcement Bar with Session Storage ────── */
function initPromoBar() {
  const promoBar = document.getElementById('promo-bar');
  const closeBtn = document.getElementById('promo-close');
  if (!promoBar || !closeBtn) return;

  if (sessionStorage.getItem('chromepro_promo_closed') === 'true') {
    promoBar.style.display = 'none';
    return;
  }

  closeBtn.addEventListener('click', () => {
    promoBar.style.transform = 'translateY(-100%)';
    promoBar.style.opacity = '0';
    sessionStorage.setItem('chromepro_promo_closed', 'true');
    setTimeout(() => {
      promoBar.style.display = 'none';
    }, 300);
  });
}

/* ── 0.1 Navbar Scroll & ScrollSpy Active Links ─────────────── */
function initNavScrollAndSpy() {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.car-nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');
  const ham = document.getElementById('car-ham-btn');
  const drawer = document.getElementById('car-nav-drawer');

  // Mobile drawer toggle
  if (ham && drawer) {
    ham.addEventListener('click', () => drawer.classList.toggle('open'));
    drawer.querySelectorAll('a').forEach(l => {
      l.addEventListener('click', () => drawer.classList.remove('open'));
    });
  }

  // Sticky blur and shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // ScrollSpy
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

  sections.forEach(s => observer.observe(s));
}

/* ── 1. Render Luxury Trust & Infinite Marquee Brands ──────── */
function renderTrustRibbon() {
  const trustContainer = document.getElementById('trust-grid');
  if (trustContainer && DATA.trustPillars) {
    trustContainer.innerHTML = DATA.trustPillars.map(t => `
      <div class="trust-item">
        <div class="trust-icon">${t.icon}</div>
        <div class="trust-text">
          <h4>${t.title}</h4>
          <p>${t.sub}</p>
        </div>
      </div>
    `).join('');
  }
}

function renderMarqueeBrands() {
  const marqueeContainer = document.getElementById('brands-marquee');
  const marqueeWrap = document.getElementById('marquee-wrapper');
  if (!marqueeContainer || !DATA.brands) return;

  const brandsList = [...DATA.brands, ...DATA.brands, ...DATA.brands];

  marqueeContainer.innerHTML = brandsList.map(b => `
    <div class="brand-pill" title="${b.desc}">
      <span class="brand-icon">${b.icon}</span>
      <span class="brand-title">${b.name}</span>
    </div>
  `).join('');

  // Pause on touch for mobile devices
  if (marqueeWrap) {
    marqueeWrap.addEventListener('touchstart', () => {
      marqueeContainer.style.animationPlayState = 'paused';
    }, { passive: true });

    marqueeWrap.addEventListener('touchend', () => {
      marqueeContainer.style.animationPlayState = 'running';
    }, { passive: true });
  }
}

/* ── 2. Render Services Grid with SVG Badges ───────────────── */
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container || !DATA.services) return;

  container.innerHTML = DATA.services.map(s => `
    <div class="srv-card">
      <div class="srv-top">
        <div class="srv-icon">${s.icon}</div>
        <span class="srv-badge">${s.badge}</span>
      </div>
      <h3 class="srv-title">${s.title}</h3>
      <p class="srv-desc">${s.desc}</p>
      
      <div class="srv-meta">
        <span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${s.duration}
        </span>
        <span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          ${s.warranty}
        </span>
      </div>

      <a href="https://wa.me/967782259937?text=${encodeURIComponent('السلام عليكم، أود الاستفسار وحجز موعد لخدمة: ' + s.title)}" target="_blank" class="srv-link">
        <span>${s.link}</span>
        <span class="arrow">↖</span>
      </a>
    </div>
  `).join('');
}

/* ── 3. Interactive Pricing / Package Estimator Calculator ──── */
function renderPricingCalculator() {
  const carContainer = document.getElementById('calc-cars');
  const srvContainer = document.getElementById('calc-services');
  if (!carContainer || !srvContainer || !DATA.calculator) return;

  let selectedCar = DATA.calculator.carTypes[0];
  let selectedSrv = DATA.calculator.services[0];

  // Render Cars Buttons
  carContainer.innerHTML = DATA.calculator.carTypes.map((c, idx) => `
    <button class="calc-car-btn ${idx === 0 ? 'active' : ''}" data-id="${c.id}" type="button">
      ${c.icon}
      <span>${c.name}</span>
    </button>
  `).join('');

  // Render Services Radio Buttons
  srvContainer.innerHTML = DATA.calculator.services.map((s, idx) => `
    <div class="calc-srv-btn ${idx === 0 ? 'active' : ''}" data-id="${s.id}">
      <span class="title">${s.name}</span>
      <div class="radio-dot"></div>
    </div>
  `).join('');

  function updateEstimate() {
    const finalPrice = Math.round(selectedSrv.basePrice * selectedCar.factor);
    const priceFormatted = finalPrice.toLocaleString('ar-SA');

    const resultBox = document.getElementById('calc-result-box');
    if (!resultBox) return;

    const waText = encodeURIComponent(
      `السلام عليكم ورحمة الله وبركاته،\n` +
      `أود تأكيد حجز عرض الحماية لسيارتي عبر الحاسبة:\n` +
      `🚗 فئة السيارة: ${selectedCar.name}\n` +
      `🛡️ الخدمة المطلوبة: ${selectedSrv.name}\n` +
      `⏱️ المدة المتوقعة: ${selectedSrv.duration}\n` +
      `📜 الضمان: ${selectedSrv.warranty}\n` +
      `💰 التكلفة التقديرية: ${priceFormatted} ريال\n` +
      `🎁 كود العرض الموسمي: CHROME20 (خصم 20% عند الحضور)`
    );

    resultBox.innerHTML = `
      <div>
        <span class="calc-result-header">التقدير الفوري للحساب</span>
        <h3 class="calc-result-title">${selectedSrv.name}</h3>
        
        <div class="calc-price-display">
          <span class="calc-price-amt">${priceFormatted}</span>
          <span class="calc-price-curr">ريال</span>
          <p class="calc-subnote">تقديري تقريبي شامل الضريبة والتركيب الكامل وضمان الجودة</p>
        </div>

        <div class="calc-details-list">
          <div class="calc-det-row">
            <span class="k">فئة السيارة:</span>
            <span class="v">${selectedCar.name}</span>
          </div>
          <div class="calc-det-row">
            <span class="k">المدة المتوقعة:</span>
            <span class="v">${selectedSrv.duration}</span>
          </div>
          <div class="calc-det-row">
            <span class="k">الضمان المعتمد:</span>
            <span class="v">${selectedSrv.warranty}</span>
          </div>
          <div class="calc-det-row">
            <span class="k">القسط الشهري (تابي/تمارا):</span>
            <span class="v">على 4 دفعات (${Math.round(finalPrice / 4).toLocaleString('ar-SA')} ر.س/شهر)</span>
          </div>
        </div>
      </div>

      <a href="https://wa.me/967782259937?text=${waText}" target="_blank" class="btn btn--primary btn--lg" style="width: 100%; justify-content: center;">
        <span>احجز هذا الباكيج عبر واتساب بضغطة واحدة</span>
        <span>↖</span>
      </a>
    `;
  }

  // Car Selection Event
  carContainer.querySelectorAll('.calc-car-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      carContainer.querySelectorAll('.calc-car-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCar = DATA.calculator.carTypes.find(c => c.id === btn.dataset.id);
      updateEstimate();
    });
  });

  // Service Selection Event
  srvContainer.querySelectorAll('.calc-srv-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      srvContainer.querySelectorAll('.calc-srv-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSrv = DATA.calculator.services.find(s => s.id === btn.dataset.id);
      updateEstimate();
    });
  });

  updateEstimate();
}

/* ── 4. Render Packages & Pricing ──────────────────────────── */
function renderPackages() {
  const container = document.getElementById('packages-grid');
  if (!container || !DATA.packages) return;

  container.innerHTML = DATA.packages.map(p => `
    <div class="pkg-card ${p.featured ? 'featured' : ''}">
      ${p.featured ? `<div class="pkg-floating-badge">${p.badge}</div>` : ''}
      
      <div>
        <div class="pkg-header">
          <h3 class="pkg-title">${p.name}</h3>
          <p class="pkg-desc" style="color:var(--accent2); font-weight:700; margin-bottom:4px;">${p.sub}</p>
          <p class="pkg-desc">${p.desc}</p>
        </div>

        <div class="pkg-price-row">
          <span class="pkg-currency">تبدأ من</span>
          <span class="pkg-amount">${p.price}</span>
          <span class="pkg-currency">ريال</span>
          <span class="pkg-period">/ شامل الضريبة</span>
        </div>

        <ul class="pkg-features">
          ${p.features.map(f => `
            <li>
              <span class="chk">✓</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <a href="https://wa.me/967782259937?text=${encodeURIComponent('السلام عليكم، أرغب في حجز ' + p.name + ' لسيارتي.')}" target="_blank" class="btn ${p.featured ? 'btn--primary' : 'btn--ghost'}" style="width: 100%; justify-content: center;">
        <span>احجز هذه الباقة الآن</span>
        <span>↖</span>
      </a>
    </div>
  `).join('');
}

/* ── 5. Render Modern Interactive Workflow (Adaptive Desktop Split & Mobile Story Stage) ── */
function renderProcessInteractive() {
  const container = document.getElementById('process-interactive');
  if (!container || !DATA.steps) return;

  let activeIndex = 0;
  let autoCycleTimer = null;

  function renderHTML() {
    container.innerHTML = `
      <!-- 1. Mobile & Tablet Step Selector Tabs (تظهر في الجوال والشاشات الصغيرة) -->
      <div class="process-mobile-tabs" role="tablist">
        ${DATA.steps.map((st, idx) => `
          <button class="pm-tab-btn ${idx === activeIndex ? 'active' : ''}" data-index="${idx}" type="button">
            <span class="pm-num">${st.num}</span>
            <span class="pm-title">${st.title.split(' ')[0]}</span>
          </button>
        `).join('')}
      </div>

      <!-- 2. Desktop Process Steps List (تظهر في شاشات الكمبيوتر جنباً إلى جنب) -->
      <div class="process-steps-list">
        ${DATA.steps.map((st, idx) => `
          <div class="step-item ${idx === activeIndex ? 'active' : ''}" data-index="${idx}">
            <div class="step-badge-num">${st.num}</div>
            <div class="step-item-content">
              <h3>${st.title}</h3>
              <p>${st.desc}</p>
              <div class="step-meta-row">
                <span class="step-item-badge">${st.badge}</span>
                <div class="step-timer-bar"><div class="step-timer-fill"></div></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- 3. Process Preview Stage (الصورة الحقيقية المرافقة لكل مرحلة) -->
      <div class="process-preview-wrap">
        <div class="process-active-tag">
          <span class="pulse-indicator"></span>
          <span id="process-active-step-label">صورة المرحلة الحالية: الخطوة ${DATA.steps[activeIndex].num}</span>
        </div>

        <div class="process-img-box">
          <img id="process-preview-img" src="${DATA.steps[activeIndex].img}" alt="${DATA.steps[activeIndex].title}" class="process-preview-img" />
        </div>

        <div class="process-preview-overlay">
          <div>
            <span class="process-preview-counter" id="process-preview-step">الخطوة ${DATA.steps[activeIndex].num} من 04</span>
            <div class="process-preview-title" id="process-preview-title">${DATA.steps[activeIndex].title}</div>
          </div>
          <span class="badge" id="process-preview-badge" style="background:var(--accent); color:#000; font-weight:800; font-size:12px; padding:4px 12px; border-radius:99px;">
            ${DATA.steps[activeIndex].badge}
          </span>
        </div>

        <!-- Mobile Step Description Box (يظهر تحت الصورة في الجوال لتوضيح كامل تفاصيل الخطوة) -->
        <div class="process-mobile-desc-card">
          <h4 id="pm-desc-title">${DATA.steps[activeIndex].title}</h4>
          <p id="pm-desc-text">${DATA.steps[activeIndex].desc}</p>
          
          <div class="pm-card-footer">
            <span class="step-item-badge" id="pm-desc-badge">${DATA.steps[activeIndex].badge}</span>
            <div class="pm-nav-arrows">
              <button class="pm-arrow-btn" id="pm-prev-btn" type="button" aria-label="الخطوة السابقة">‹</button>
              <button class="pm-arrow-btn" id="pm-next-btn" type="button" aria-label="الخطوة التالية">›</button>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function setActiveStep(idx) {
    activeIndex = idx;

    // Update Desktop Step Cards
    const items = container.querySelectorAll('.step-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === activeIndex);
    });

    // Update Mobile Step Tabs
    const tabs = container.querySelectorAll('.pm-tab-btn');
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === activeIndex);
    });

    // Update Preview Elements
    const img = document.getElementById('process-preview-img');
    const title = document.getElementById('process-preview-title');
    const stepCounter = document.getElementById('process-preview-step');
    const badgeEl = document.getElementById('process-preview-badge');
    const activeLabel = document.getElementById('process-active-step-label');

    // Mobile Elements
    const pmTitle = document.getElementById('pm-desc-title');
    const pmText = document.getElementById('pm-desc-text');
    const pmBadge = document.getElementById('pm-desc-badge');

    if (img) {
      img.style.opacity = '0.3';
      img.style.transform = 'scale(0.97)';
      setTimeout(() => {
        img.src = DATA.steps[activeIndex].img;
        img.alt = DATA.steps[activeIndex].title;
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 140);
    }

    const currentData = DATA.steps[activeIndex];
    if (title) title.textContent = currentData.title;
    if (stepCounter) stepCounter.textContent = `الخطوة ${currentData.num} من 04`;
    if (badgeEl) badgeEl.textContent = currentData.badge;
    if (activeLabel) activeLabel.textContent = `صورة المرحلة الحالية: الخطوة ${currentData.num}`;

    if (pmTitle) pmTitle.textContent = currentData.title;
    if (pmText) pmText.textContent = currentData.desc;
    if (pmBadge) pmBadge.textContent = currentData.badge;
  }

  function bindEvents() {
    // Desktop Step Items click / hover
    container.querySelectorAll('.step-item').forEach(item => {
      item.addEventListener('click', () => {
        clearInterval(autoCycleTimer);
        const idx = parseInt(item.dataset.index, 10);
        setActiveStep(idx);
        startAutoCycle();
      });
      item.addEventListener('mouseenter', () => {
        clearInterval(autoCycleTimer);
        const idx = parseInt(item.dataset.index, 10);
        setActiveStep(idx);
      });
      item.addEventListener('mouseleave', () => {
        startAutoCycle();
      });
    });

    // Mobile Tabs click
    container.querySelectorAll('.pm-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        clearInterval(autoCycleTimer);
        const idx = parseInt(btn.dataset.index, 10);
        setActiveStep(idx);
        startAutoCycle();
      });
    });

    // Mobile Arrows
    const prevBtn = document.getElementById('pm-prev-btn');
    const nextBtn = document.getElementById('pm-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        clearInterval(autoCycleTimer);
        const newIdx = (activeIndex - 1 + DATA.steps.length) % DATA.steps.length;
        setActiveStep(newIdx);
        startAutoCycle();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        clearInterval(autoCycleTimer);
        const newIdx = (activeIndex + 1) % DATA.steps.length;
        setActiveStep(newIdx);
        startAutoCycle();
      });
    }
  }

  function startAutoCycle() {
    clearInterval(autoCycleTimer);
    autoCycleTimer = setInterval(() => {
      activeIndex = (activeIndex + 1) % DATA.steps.length;
      setActiveStep(activeIndex);
    }, 4500);
  }

  renderHTML();
  startAutoCycle();
}

/* ── 6. Render Upgraded Before / After Section ──────────────── */
function renderBeforeAfterSection() {
  const tabsContainer = document.getElementById('ba-tabs');
  const showcaseContainer = document.getElementById('ba-showcase');
  if (!tabsContainer || !showcaseContainer || !DATA.beforeAfterCases) return;

  tabsContainer.innerHTML = DATA.beforeAfterCases.map((item, idx) => `
    <button class="ba-cat-btn ${idx === 0 ? 'active' : ''}" data-id="${item.id}" type="button">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <span>${item.title}</span>
    </button>
  `).join('');

  loadBeforeAfterCase(DATA.beforeAfterCases[0]);

  tabsContainer.querySelectorAll('.ba-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.ba-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const caseItem = DATA.beforeAfterCases.find(c => c.id === btn.dataset.id);
      if (caseItem) loadBeforeAfterCase(caseItem);
    });
  });
}

function loadBeforeAfterCase(c) {
  const afterImg = document.getElementById('ba-after-img');
  const beforeImg = document.getElementById('ba-before-img');
  const afterLabel = document.getElementById('ba-label-after');
  const beforeLabel = document.getElementById('ba-label-before');

  if (afterImg) afterImg.src = c.afterImg;
  if (beforeImg) beforeImg.src = c.beforeImg;
  if (afterLabel) afterLabel.textContent = c.afterLabel;
  if (beforeLabel) beforeLabel.textContent = c.beforeLabel;

  const infoContainer = document.getElementById('ba-info-panel');
  if (infoContainer) {
    infoContainer.innerHTML = `
      <div>
        <span class="ba-info-cat">${c.category}</span>
        <h3 class="ba-info-title">${c.title}</h3>
        <p class="ba-info-desc">${c.desc}</p>
        
        <div class="ba-specs">
          ${c.specs.map(sp => `
            <div class="ba-spec-row">
              <span class="ba-spec-label">${sp.label}</span>
              <span class="ba-spec-val">${sp.val}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <a href="https://wa.me/967782259937?text=${encodeURIComponent('السلام عليكم، أرغب في حجز خدمة مماثلة لـ ' + c.title)}" target="_blank" class="btn btn--primary" style="width: 100%; justify-content: center;">
        <span>احجز هذه الخدمة لسيارتك</span>
        <span>↖</span>
      </a>
    `;
  }
}

/* ── 7. Render Filterable Gallery with Lightbox ────────────── */
let activeGalleryCategory = 'all';
let currentLightboxIndex = 0;

function renderGallery() {
  const tabsContainer = document.getElementById('gallery-tabs');
  const gridContainer = document.getElementById('gallery-grid');
  if (!gridContainer || !DATA.gallery) return;

  if (tabsContainer && DATA.galleryCategories) {
    tabsContainer.innerHTML = DATA.galleryCategories.map(cat => `
      <button class="gallery-tab-btn ${cat.id === activeGalleryCategory ? 'active' : ''}" data-cat="${cat.id}" type="button">
        ${cat.name}
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.gallery-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.gallery-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeGalleryCategory = btn.dataset.cat;
        filterAndRenderGrid();
      });
    });
  }

  function filterAndRenderGrid() {
    const filtered = activeGalleryCategory === 'all'
      ? DATA.gallery
      : DATA.gallery.filter(item => item.category === activeGalleryCategory);

    gridContainer.innerHTML = filtered.map(g => `
      <div class="gallery-fig" data-id="${g.id}">
        <figure>
          <img src="${g.img}" alt="${g.label}" class="gallery-img" loading="lazy" />
          <div class="gallery-overlay">
            <span class="gallery-tag">${g.label}</span>
            <span class="gallery-zoom-hint">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
              تكبير
            </span>
          </div>
        </figure>
      </div>
    `).join('');

    gridContainer.querySelectorAll('.gallery-fig').forEach(fig => {
      fig.addEventListener('click', () => {
        const id = parseInt(fig.dataset.id, 10);
        const idx = DATA.gallery.findIndex(x => x.id === id);
        if (idx !== -1) openLightboxByIndex(idx);
      });
    });
  }

  filterAndRenderGrid();
}

/* ── 8. Fullscreen Image Lightbox with Previous/Next Arrows ── */
function openLightboxByIndex(idx) {
  currentLightboxIndex = idx;
  const item = DATA.gallery[currentLightboxIndex];
  if (!item) return;

  const modal = document.getElementById('gallery-lightbox');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const subEl = document.getElementById('lightbox-sub');
  const catEl = document.getElementById('lightbox-cat');
  const ctaEl = document.getElementById('lightbox-whatsapp');

  if (!modal || !imgEl) return;

  imgEl.src = item.img;
  imgEl.alt = item.label;
  if (titleEl) titleEl.textContent = item.label;
  if (subEl) subEl.textContent = item.sub || 'تنفيذ مركز كروم برو بالرياض';
  if (catEl) catEl.textContent = getCategoryName(item.category);
  if (ctaEl) {
    ctaEl.href = `https://wa.me/967782259937?text=${encodeURIComponent('السلام عليكم، أعجبني هذا الشغل في المعرض (' + item.label + ') وأرغب بحجز موعد لسيارتي.')}`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function getCategoryName(catId) {
  const found = DATA.galleryCategories.find(c => c.id === catId);
  return found ? found.name : 'معرض الأعمال';
}

function initGalleryLightbox() {
  const modal = document.getElementById('gallery-lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!modal) return;

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newIdx = (currentLightboxIndex - 1 + DATA.gallery.length) % DATA.gallery.length;
      openLightboxByIndex(newIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newIdx = (currentLightboxIndex + 1) % DATA.gallery.length;
      openLightboxByIndex(newIdx);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const newIdx = (currentLightboxIndex + 1) % DATA.gallery.length;
      openLightboxByIndex(newIdx);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const newIdx = (currentLightboxIndex - 1 + DATA.gallery.length) % DATA.gallery.length;
      openLightboxByIndex(newIdx);
    }
  });
}

/* ── 9. Render Reviews Cards (SVG Stars) ───────────────────── */
function renderReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container || !DATA.reviews) return;

  const starSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="color:var(--accent); margin-left:2px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  container.innerHTML = DATA.reviews.map(r => `
    <div class="rev-card">
      <div class="rev-stars" style="display:flex;">${starSvg.repeat(r.stars)}</div>
      <p class="rev-text">"${r.text}"</p>
      <div class="rev-footer">
        <span class="rev-name">${r.name}</span>
        <span class="rev-badge">· ${r.badge}</span>
      </div>
    </div>
  `).join('');
}

/* ── 10. Render Stats Numbers with Animated Counter ────────── */
function renderStats() {
  const container = document.getElementById('stats-grid');
  if (!container || !DATA.stats) return;

  container.innerHTML = DATA.stats.map(st => `
    <div class="stat">
      <span class="stat-num stat-counter" data-target="${st.targetNum}" data-decimals="${st.decimals || 0}" data-suffix="${st.suffix}">
        0${st.suffix}
      </span>
      <span class="stat-label">${st.label}</span>
    </div>
  `).join('');
}

/* ── 11. Render Interactive FAQ Accordion ──────────────────── */
function renderFaqs() {
  const container = document.getElementById('faq-accordion');
  if (!container || !DATA.faqs) return;

  container.innerHTML = DATA.faqs.map((f, idx) => `
    <div class="faq-item ${idx === 0 ? 'open' : ''}">
      <button class="faq-question" type="button" aria-expanded="${idx === 0}">
        <span class="q-num">0${idx + 1}</span>
        <span class="q-text">${f.q}</span>
        <span class="q-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-inner">
          <p>${f.a}</p>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const isOpen = parent.classList.contains('open');

      container.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── 12. Reels / Video Shorts Modal ────────────────────────── */
function initReelsModal() {
  const modal = document.getElementById('reels-modal');
  const closeBtn = document.getElementById('modal-close');
  const videoEl = document.getElementById('modal-video');
  const loaderEl = document.getElementById('video-loader');
  const openBtns = document.querySelectorAll('.js-open-reel');
  const titleEl = document.getElementById('modal-video-title');
  const tagEl = document.getElementById('modal-video-tag');

  if (!modal || !videoEl) return;

  openBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const reelData = DATA.reels[idx % DATA.reels.length];
      if (reelData) {
        if (loaderEl) loaderEl.style.display = 'flex';
        videoEl.src = reelData.videoSrc;
        videoEl.poster = reelData.poster;
        if (titleEl) titleEl.textContent = reelData.title;
        if (tagEl) tagEl.textContent = reelData.tag;
        modal.classList.add('active');

        videoEl.oncanplay = () => {
          if (loaderEl) loaderEl.style.display = 'none';
        };

        videoEl.play().catch(() => {});
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    videoEl.pause();
    videoEl.currentTime = 0;
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ── 13. Smart Expandable Speed-Dial Contact Hub ──────────── */
function initSmartWhatsApp() {
  const dialWrap = document.getElementById('speed-dial-wrap');
  const mainBtn = document.getElementById('dial-main-btn');
  const dialActions = document.getElementById('dial-actions');
  const backdrop = document.getElementById('dial-backdrop');
  const bubble = document.getElementById('wa-bubble');
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
