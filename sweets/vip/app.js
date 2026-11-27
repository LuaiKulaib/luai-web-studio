/* =========================================================
   app.js — دار البطريق للحلويات (الفئة الملكية VIP)
   ========================================================= */
'use strict';

const VIP_CONFIG = {
  whatsappNumber: '967782259937',
  brandName: 'دار البطريق للحلويات',
  tierLabel: 'الفئة الملكية VIP',
};

const VIP_CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1, prefix: true, roundTo: 1 },
  SAR: { code: 'SAR', symbol: 'ر.س', rate: 3.75, prefix: false, roundTo: 1 },
  YER: { code: 'YER', symbol: 'ر.ي', rate: 535, prefix: false, roundTo: 50 },
};

const VIP_DATA = {
  stats: [
    { value: '+350', label: 'وليمة وحفل كبار شخصيات' },
    { value: '20-300', label: 'سعة ضيافة مرنة للفعاليات' },
    { value: '-18°C', label: 'أسطول نقل مبرد معتمد' },
    { value: '16%', label: 'وفر عقود التوريد السنوية' },
  ],

  galleryItems: [
    {
      id: 'vip-belgian-tier',
      title: 'كيكة الشوكولاتة البلجيكية الملكية',
      temp: '+4°C · CHILLED',
      desc: 'ثلاث طبقات من الشوكولاتة البلجيكية 70% وجاناش البندق المحمّص للضيافة الرفيعة.',
      img: '../assets/images/dessert-1.jpg',
      priceUSD: 68,
      unitNote: 'حجم ملكي 2.5 كجم',
    },
    {
      id: 'vip-pistachio-berry',
      title: 'قاطو الفستق الحلبي والتوت البري',
      temp: '+4°C · FRESH',
      desc: 'إسفنج الفستق الفاخر محشو بكريمة الماسكاربوني وحبات الرازبيري الطازجة.',
      img: '../assets/images/dessert-3.jpg',
      priceUSD: 74,
      unitNote: 'حجم ملكي 2.5 كجم',
    },
    {
      id: 'vip-gelato-parfait',
      title: 'باقة جيلاتو البطريق للكؤوس الملكية',
      temp: '-18°C · FROZEN',
      desc: 'تشكيلة كؤوس جيلاتو الفانيليا والشوكولاتة بالكوكيز والصوص البلجيكي (12 كأساً).',
      img: '../assets/images/dessert-2.jpg',
      priceUSD: 52,
      unitNote: 'صندوق ضيافة 12 كأس',
    },
    {
      id: 'vip-raspberry-bars',
      title: 'علبة أعواد جيلاتو الرازبيري الفاخر',
      temp: '-18°C · FROZEN',
      desc: 'أعواد جيلاتو طبيعي 100% من توت العليق وكريمة الحليب الطازجة (24 قطعة).',
      img: '../assets/images/dessert-4.jpg',
      priceUSD: 44,
      unitNote: 'صندوق 24 قطعة',
    },
    {
      id: 'vip-crepe-platter',
      title: 'صينية الكريب الفرنسي بالشانتيي والتوت',
      temp: '+4°C · PASTRY',
      desc: 'صينية ضيافة مذهبة من لفائف الكريب الطازج المحشو بالكريمة المخفوقة والفواكه.',
      img: '../assets/images/dessert-5.jpg',
      priceUSD: 46,
      unitNote: 'صينية 24 قطعة',
    },
    {
      id: 'vip-pannacotta-collection',
      title: 'مجموعة جارات البانا كوتا بالفراولة',
      temp: '+4°C · GLASS JARS',
      desc: 'جارات زجاجية فاخرة من البانا كوتا الإيطالية بالفانيليا الطبيعية والفراولة الطازجة (12 جارة).',
      img: '../assets/images/dessert-hero.jpg',
      priceUSD: 38,
      unitNote: 'طقم 12 جارة زجاجية',
    },
  ],

  trays: [
    {
      id: 'gelato-tubs',
      title: 'أحواض الجيلاتو الملكي (Gelato Royal Tubs)',
      desc: 'أحواض ستانلس معزولة سعة 5 لتر بنكهات الفانيليا، الفستق، والتوت مع ملاعق تقديم فاخرة.',
      img: '../assets/images/dessert-4.jpg',
      servesPerUnit: 25,
      priceUSD: 48,
      recStepGuests: 30,
    },
    {
      id: 'macaron-towers',
      title: 'أبراج الماكرون والبانا كوتا (Macaron Towers)',
      desc: 'برج عرض باريسى فاخر يجمع 45 قطعة ماكرون وحلى كريمي بالفراولة والورد.',
      img: '../assets/images/dessert-hero.jpg',
      servesPerUnit: 40,
      priceUSD: 62,
      recStepGuests: 45,
    },
    {
      id: 'truffle-trays',
      title: 'صواني ترافل الشوكولاتة والكريب (Chocolate Truffle Trays)',
      desc: 'صوانٍ ذهبية من الترافل البلجيكي وكريب الشانتيي بالتوت الطازج لطاولات الاستقبال.',
      img: '../assets/images/dessert-5.jpg',
      servesPerUnit: 25,
      priceUSD: 42,
      recStepGuests: 28,
    },
    {
      id: 'custom-tiers',
      title: 'كيكات الطوابق الاحتفالية (Custom Tiers)',
      desc: 'كيكة متعددة الطوابق بنكهة الشوكولاتة الداكنة أو البستاشيو والتوت بتزيين ذهبي مخصّص.',
      img: '../assets/images/dessert-1.jpg',
      servesPerUnit: 55,
      priceUSD: 115,
      recStepGuests: 70,
    },
  ],

  addons: [
    { id: 'catering-staff', label: 'طاقم ضيافة وسرفيس في الموقع (4 ساعات)', priceUSD: 65 },
    { id: 'gelato-cart', label: 'عربة جيلاتو مبردة ذاتية التشغيل', priceUSD: 95 },
    { id: 'gold-seals', label: 'أختام شوكولاتة بشعار المناسبة', priceUSD: 30 },
  ],

  b2bVenues: [
    { id: 'hotel', name: 'فندق / منتجع سياحي', desc: 'بوفيهات وكوفي شوب الفندق', marginPct: '44%' },
    { id: 'cafe', name: 'مقهى مختص وروستري', desc: 'توريد قاطو وجيلاتو للعرض', marginPct: '42%' },
    { id: 'hall', name: 'قاعة أفراح ومؤتمرات', desc: 'باقات ضيافة أسبوعية مرنة', marginPct: '38%' },
    { id: 'corporate', name: 'شركة ومقر تنفيذي', desc: 'ضيافة اجتماعات وكبار الضيوف', marginPct: '40%' },
  ],

  b2bTerms: [
    { months: 1, label: 'عقد شهري تجريبي', discountPct: 0 },
    { months: 3, label: 'عقد ربع سنوي (3 أشهر)', discountPct: 6 },
    { months: 6, label: 'عقد نصف سنوي (6 أشهر)', discountPct: 11 },
    { months: 12, label: 'عقد سنوي استراتيجي (12 شهراً)', discountPct: 16 },
  ],

  b2bProducts: [
    { id: 'tubs5l', label: 'أحواض جيلاتو احترافية 5 لتر', min: 2, max: 24, defaultVal: 6, unitPriceUSD: 42 },
    { id: 'trays24', label: 'صواني ترافل وبتي فور (24 قطعة)', min: 2, max: 30, defaultVal: 8, unitPriceUSD: 34 },
    { id: 'fullCakes', label: 'كيكات فاخرة كاملة للتقطيع (1.5 كجم)', min: 2, max: 20, defaultVal: 5, unitPriceUSD: 36 },
    { id: 'jars12', label: 'درزن جارات بانا كوتا وميني تشيز', min: 2, max: 30, defaultVal: 6, unitPriceUSD: 28 },
  ],

  faqs: [
    {
      q: 'ما أقل مدة مسبقة لتأكيد طلبات الولائم (100 - 300 ضيف)؟',
      a: 'نوصي بتأكيد طلبيات الولائم الكبرى قبل الموعد بمدة 48 إلى 72 ساعة لضمان جدولة المعمل المخصّصة وحجز عربة الجيلاتو المبردة أو طاقم الضيافة.',
    },
    {
      q: 'كيف تضمن دار البطريق ثبات جودة الجيلاتو في القاعات المفتوحة؟',
      a: 'تُحفظ أحواض الجيلاتو الملكي داخل حافظات معزولة حرارياً (-18°C) مع إمكانية إضافة عربة التقديم المبردة التي تحافظ على القوام المثالي طوال مدة الحفل.',
    },
    {
      q: 'هل يمكن طباعة عرض السعر الرسمي وتقديمه لإدارة المشتريات أو الفندق؟',
      a: 'بالتأكيد. توفر المنصة نافذة عرض سعر رسمية بالرقم المرجعي قابلة للنسخ الفوري أو الطباعة المباشرة وحفظها كملف PDF.',
    },
    {
      q: 'هل تتوفر جلسات تذوق مسبقة قبل توقيع عقود التوريد B2B؟',
      a: 'نعم، نتيح للمقاهي والفنادق وقاعات الأفراح حجز جلسة تذوق خاصة في فرع شارع حدة أو إرسال صندوق عينات مجدول عبر فريق الكونسيرج.',
    },
  ],
};

/* ── Application State ───────────────────────────────────── */
const vipState = {
  currency: 'USD',
  guestCount: 80,
  eventType: 'حفل زفاف واستقبال ملكي',
  trayQuantities: {
    'gelato-tubs': 2,
    'macaron-towers': 1,
    'truffle-trays': 2,
    'custom-tiers': 1,
  },
  selectedAddons: new Set(),
  b2b: {
    venueId: 'hotel',
    termMonths: 6,
    cadence: 'توريد 3 مرات أسبوعياً',
    weeklyQty: {
      tubs5l: 6,
      trays24: 8,
      fullCakes: 5,
      jars12: 6,
    },
  },
  drawerItems: [],
  activeProposalMode: 'banquet',
  proposalRef: generateRefCode(),
};

function generateRefCode() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `MP-VIP-2026-${num}`;
}

function getTodayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatVipMoney(usdAmount) {
  const cfg = VIP_CURRENCIES[vipState.currency];
  let converted = usdAmount * cfg.rate;
  if (cfg.roundTo > 1) {
    converted = Math.round(converted / cfg.roundTo) * cfg.roundTo;
  } else {
    converted = Math.round(converted);
  }
  const formatted = converted.toLocaleString('en-US');
  return cfg.prefix ? `${cfg.symbol}${formatted}` : `${formatted} ${cfg.symbol}`;
}

/* ── Init Lifecycle ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initVipHeaderScroll();
  initVipCurrencySwitcher();
  initVipMobileNav();
  initVipDrawer();
  initProposalModal();

  renderVipStats();
  renderMaisonGallery();

  initBanquetBuilder();
  initB2bEstimator();
  initVipAppTabs();
  renderVipFaqs();
  renderVipDrawer();
});

function initVipHeaderScroll() {
  const header = document.getElementById('vip-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
}

function initVipCurrencySwitcher() {
  const wrap = document.getElementById('vip-currency-switcher');
  if (!wrap) return;
  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.v-curr-btn');
    if (!btn) return;
    vipState.currency = btn.dataset.curr;
    wrap.querySelectorAll('.v-curr-btn').forEach((el) => {
      el.classList.toggle('active', el.dataset.curr === vipState.currency);
    });
    renderMaisonGallery();
    renderBanquetTrays();
    renderBanquetAddons();
    updateBanquetSummary();
    updateB2bDossier();
    renderVipDrawer();
    if (document.getElementById('proposal-modal').classList.contains('open')) {
      populateProposalModal(vipState.activeProposalMode);
    }
  });
}

function initVipMobileNav() {
  const openBtn = document.getElementById('open-vip-mobile-nav');
  const closeBtn = document.getElementById('close-vip-mobile-nav');
  const drawer = document.getElementById('vip-mobile-drawer');
  const backdrop = document.getElementById('vip-mobile-backdrop');
  if (!openBtn || !drawer || !backdrop) return;

  const setOpen = (isOpen) => {
    drawer.classList.toggle('open', isOpen);
    backdrop.classList.toggle('open', isOpen);
  };

  openBtn.addEventListener('click', () => setOpen(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
  backdrop.addEventListener('click', () => setOpen(false));
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

/* ── Stats & Cream Gallery Panel ─────────────────────────── */
function renderVipStats() {
  const el = document.getElementById('vip-stats-grid');
  if (!el) return;
  el.innerHTML = VIP_DATA.stats.map((s) => `
    <div class="v-stat-cell">
      <strong>${s.value}</strong>
      <span>${s.label}</span>
    </div>
  `).join('');
}

function renderMaisonGallery() {
  const grid = document.getElementById('maison-gallery-grid');
  if (!grid) return;

  grid.innerHTML = VIP_DATA.galleryItems.map((item) => `
    <article class="gallery-item-card">
      <div class="gallery-card-img">
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <span class="gallery-card-temp">${item.temp}</span>
      </div>
      <div class="gallery-card-body">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="gallery-card-foot">
          <span class="gallery-price">${formatVipMoney(item.priceUSD)}</span>
          <button type="button" class="btn-gallery-add" data-gallery-add="${item.id}">أضف للكونسيرج</button>
        </div>
      </div>
    </article>
  `).join('');

  grid.onclick = (e) => {
    const btn = e.target.closest('[data-gallery-add]');
    if (!btn) return;
    const item = VIP_DATA.galleryItems.find((g) => g.id === btn.dataset.galleryAdd);
    if (!item) return;

    const key = `gal:${item.id}`;
    const existing = vipState.drawerItems.find((d) => d.key === key);
    if (existing) {
      existing.qty += 1;
    } else {
      vipState.drawerItems.push({
        key,
        title: item.title,
        meta: item.unitNote,
        unitPriceUSD: item.priceUSD,
        qty: 1,
      });
    }
    renderVipDrawer();
    showVipToast(`تمت إضافة "${item.title}" لطلبية الكونسيرج`);
  };
}

/* ── Banquet & VIP Hospitality Tray Builder ──────────────── */
function getRecommendedTrayQty(guests) {
  return {
    'gelato-tubs': Math.max(1, Math.ceil(guests / 35)),
    'macaron-towers': Math.max(1, Math.ceil(guests / 55)),
    'truffle-trays': Math.max(1, Math.ceil(guests / 30)),
    'custom-tiers': Math.max(1, Math.ceil(guests / 80)),
  };
}

function initBanquetBuilder() {
  const slider = document.getElementById('guest-count-slider');
  const eventSelect = document.getElementById('banquet-event-type');
  const presetsRow = document.getElementById('guest-presets-row');
  const applyRecBtn = document.getElementById('apply-recommended-btn');
  const openPropBtn = document.getElementById('open-banquet-proposal-btn');
  const addToDrawerBtn = document.getElementById('add-banquet-to-drawer-btn');
  const sendWaBtn = document.getElementById('send-banquet-wa-btn');

  applyRecommendedQuantities();

  if (slider) {
    slider.addEventListener('input', (e) => {
      setGuestCount(Number(e.target.value));
    });
  }

  if (eventSelect) {
    eventSelect.addEventListener('change', (e) => {
      vipState.eventType = e.target.value;
    });
  }

  if (presetsRow) {
    presetsRow.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-guests]');
      if (!btn) return;
      const val = Number(btn.dataset.guests);
      if (slider) slider.value = String(val);
      setGuestCount(val);
      applyRecommendedQuantities();
    });
  }

  if (applyRecBtn) {
    applyRecBtn.addEventListener('click', () => {
      applyRecommendedQuantities();
      showVipToast(`تم ضبط التوزيع المقترح لعدد ${vipState.guestCount} ضيفاً`);
    });
  }

  if (openPropBtn) {
    openPropBtn.addEventListener('click', () => openProposalModal('banquet'));
  }

  if (addToDrawerBtn) {
    addToDrawerBtn.addEventListener('click', addBanquetBundleToDrawer);
  }

  if (sendWaBtn) {
    sendWaBtn.addEventListener('click', dispatchBanquetWhatsApp);
  }
}

function setGuestCount(count) {
  vipState.guestCount = count;
  const display = document.getElementById('guest-count-display');
  const formula = document.getElementById('recommended-formula-text');
  if (display) display.textContent = `${count} ضيفاً`;
  if (formula) formula.textContent = `التوزيع الذكي المقترح لعدد ${count} ضيفاً جاهز للتطبيق`;

  document.querySelectorAll('#guest-presets-row .preset-pill').forEach((pill) => {
    pill.classList.toggle('active', Number(pill.dataset.guests) === count);
  });

  renderBanquetTrays();
  updateBanquetSummary();
}

function applyRecommendedQuantities() {
  const rec = getRecommendedTrayQty(vipState.guestCount);
  vipState.trayQuantities = { ...rec };
  renderBanquetTrays();
  renderBanquetAddons();
  updateBanquetSummary();
}

function renderBanquetTrays() {
  const grid = document.getElementById('banquet-trays-grid');
  if (!grid) return;

  const rec = getRecommendedTrayQty(vipState.guestCount);

  grid.innerHTML = VIP_DATA.trays.map((tray) => {
    const qty = vipState.trayQuantities[tray.id] || 0;
    const recCount = rec[tray.id];
    return `
      <article class="tray-card ${qty > 0 ? 'has-qty' : ''}">
        <div class="tray-card-media">
          <img src="${tray.img}" alt="${tray.title}" loading="lazy">
          <span class="tray-rec-badge">المقترح: ${recCount}</span>
        </div>
        <div class="tray-card-body">
          <h3>${tray.title}</h3>
          <p>${tray.desc} (يكفي ~${tray.servesPerUnit} ضيفاً للوحدة)</p>
          <div class="tray-card-foot">
            <span class="tray-unit-price">${formatVipMoney(tray.priceUSD)}</span>
            <div class="tray-qty-ctrl">
              <button type="button" class="tray-qty-btn" data-tray-act="dec" data-tray-id="${tray.id}" aria-label="إنقاص">-</button>
              <strong>${qty}</strong>
              <button type="button" class="tray-qty-btn" data-tray-act="inc" data-tray-id="${tray.id}" aria-label="زيادة">+</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  grid.onclick = (e) => {
    const btn = e.target.closest('[data-tray-act]');
    if (!btn) return;
    const id = btn.dataset.trayId;
    const act = btn.dataset.trayAct;
    const current = vipState.trayQuantities[id] || 0;
    vipState.trayQuantities[id] = act === 'inc' ? current + 1 : Math.max(0, current - 1);
    renderBanquetTrays();
    updateBanquetSummary();
  };
}

function renderBanquetAddons() {
  const list = document.getElementById('banquet-addons-list');
  if (!list) return;

  list.innerHTML = VIP_DATA.addons.map((addon) => {
    const active = vipState.selectedAddons.has(addon.id);
    return `
      <label class="addon-toggle-card ${active ? 'active' : ''}">
        <div class="addon-toggle-top">
          <strong>${addon.label}</strong>
          <input type="checkbox" data-addon-id="${addon.id}" ${active ? 'checked' : ''}>
        </div>
        <span>+${formatVipMoney(addon.priceUSD)}</span>
      </label>
    `;
  }).join('');

  list.onchange = (e) => {
    const cb = e.target.closest('[data-addon-id]');
    if (!cb) return;
    if (cb.checked) vipState.selectedAddons.add(cb.dataset.addonId);
    else vipState.selectedAddons.delete(cb.dataset.addonId);
    renderBanquetAddons();
    updateBanquetSummary();
  };
}

function computeBanquetTotals() {
  const lines = [];
  let servings = 0;
  let grossUSD = 0;

  VIP_DATA.trays.forEach((tray) => {
    const qty = vipState.trayQuantities[tray.id] || 0;
    if (qty > 0) {
      const lineUSD = qty * tray.priceUSD;
      grossUSD += lineUSD;
      servings += qty * tray.servesPerUnit;
      lines.push({
        label: tray.title,
        qty,
        unitUSD: tray.priceUSD,
        totalUSD: lineUSD,
      });
    }
  });

  VIP_DATA.addons.forEach((addon) => {
    if (vipState.selectedAddons.has(addon.id)) {
      grossUSD += addon.priceUSD;
      lines.push({
        label: addon.label,
        qty: 1,
        unitUSD: addon.priceUSD,
        totalUSD: addon.priceUSD,
      });
    }
  });

  let discountPct = 0;
  if (vipState.guestCount >= 200) discountPct = 10;
  else if (vipState.guestCount >= 100) discountPct = 5;

  const discountUSD = grossUSD * (discountPct / 100);
  const netUSD = grossUSD - discountUSD;

  return { lines, servings, grossUSD, discountPct, discountUSD, netUSD };
}

function updateBanquetSummary() {
  const { lines, servings, grossUSD, discountPct, discountUSD, netUSD } = computeBanquetTotals();

  const ratioEl = document.getElementById('coverage-ratio-text');
  const fillEl = document.getElementById('coverage-fill-bar');
  const statusEl = document.getElementById('coverage-status-note');
  const breakdownEl = document.getElementById('banquet-breakdown-list');
  const grossEl = document.getElementById('banquet-gross-total');
  const discRow = document.getElementById('banquet-discount-row');
  const discLabel = document.getElementById('banquet-discount-label');
  const discVal = document.getElementById('banquet-discount-val');
  const netEl = document.getElementById('banquet-net-total');

  const pct = Math.min(100, Math.round((servings / vipState.guestCount) * 100));
  if (ratioEl) ratioEl.textContent = `${servings} حصة / ${vipState.guestCount} ضيفاً`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (statusEl) {
    statusEl.textContent = servings >= vipState.guestCount
      ? 'توزيع متكامل يكفي جميع المدعوين مع هامش ضيافة مريح'
      : 'يمكنك زيادة صواني الضيافة لتغطية كامل عدد المدعوين';
  }

  if (breakdownEl) {
    breakdownEl.innerHTML = lines.length > 0
      ? lines.map((l) => `
          <div class="breakdown-item">
            <span>${l.label} × ${l.qty}</span>
            <strong>${formatVipMoney(l.totalUSD)}</strong>
          </div>
        `).join('')
      : '<div class="breakdown-item"><span>لم يتم اختيار صوانٍ بعد</span><strong>-</strong></div>';
  }

  if (grossEl) grossEl.textContent = formatVipMoney(grossUSD);
  if (discRow) discRow.style.display = discountPct > 0 ? 'flex' : 'none';
  if (discLabel) discLabel.textContent = `خصم باقات الضيافة الكبرى (${discountPct}%)`;
  if (discVal) discVal.textContent = `-${formatVipMoney(discountUSD)}`;
  if (netEl) netEl.textContent = formatVipMoney(netUSD);
}

function addBanquetBundleToDrawer() {
  const { lines, netUSD } = computeBanquetTotals();
  if (lines.length === 0) {
    showVipToast('يرجى اختيار صينية واحدة على الأقل');
    return;
  }

  const summaryMeta = `${vipState.eventType} (${vipState.guestCount} ضيفاً) — ${lines.map((l) => `${l.label} × ${l.qty}`).join('، ')}`;
  vipState.drawerItems.push({
    key: `banquet:${Date.now()}`,
    title: `باقة وليمة VIP (${vipState.guestCount} ضيفاً)`,
    meta: summaryMeta,
    unitPriceUSD: netUSD,
    qty: 1,
  });

  renderVipDrawer();
  openVipDrawer();
  showVipToast('تمت إضافة باقة الوليمة إلى طلبية الكونسيرج');
}

function dispatchBanquetWhatsApp() {
  const { lines, grossUSD, discountPct, netUSD } = computeBanquetTotals();
  if (lines.length === 0) {
    showVipToast('يرجى اختيار صينية واحدة على الأقل قبل الإرسال');
    return;
  }

  const msg = [
    `طلب باقة ضيافة وولائم — ${VIP_CONFIG.brandName} (${VIP_CONFIG.tierLabel})`,
    `--------------------------------`,
    `المناسبة: ${vipState.eventType}`,
    `عدد الضيوف: ${vipState.guestCount} ضيفاً`,
    `العملة المختارة: ${vipState.currency}`,
    `--------------------------------`,
    `التفاصيل:`,
    ...lines.map((l, i) => `${i + 1}. ${l.label} × ${l.qty} = ${formatVipMoney(l.totalUSD)}`),
    `--------------------------------`,
    `المجموع الأساسي: ${formatVipMoney(grossUSD)}`,
    discountPct > 0 ? `خصم الفئة (${discountPct}%): مطبق` : `خصم الكميات: لا يوجد`,
    `الإجمالي الصافي: ${formatVipMoney(netUSD)}`,
  ].join('\n');

  window.open(`https://wa.me/${VIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

/* ── B2B Supply Contract Estimator ───────────────────────── */
function initB2bEstimator() {
  renderB2bVenueTypes();
  renderB2bTerms();
  renderB2bSliders();

  const cadenceSelect = document.getElementById('b2b-cadence-select');
  const openPropBtn = document.getElementById('open-b2b-proposal-btn');
  const sendWaBtn = document.getElementById('send-b2b-wa-btn');

  if (cadenceSelect) {
    cadenceSelect.addEventListener('change', (e) => {
      vipState.b2b.cadence = e.target.value;
      updateB2bDossier();
    });
  }

  if (openPropBtn) {
    openPropBtn.addEventListener('click', () => openProposalModal('b2b'));
  }

  if (sendWaBtn) {
    sendWaBtn.addEventListener('click', dispatchB2bWhatsApp);
  }

  updateB2bDossier();
}

function renderB2bVenueTypes() {
  const el = document.getElementById('b2b-venue-types');
  if (!el) return;

  el.innerHTML = VIP_DATA.b2bVenues.map((v) => `
    <button type="button" class="venue-btn ${vipState.b2b.venueId === v.id ? 'active' : ''}" data-venue-id="${v.id}">
      <strong>${v.name}</strong>
      <span>${v.desc}</span>
    </button>
  `).join('');

  el.onclick = (e) => {
    const btn = e.target.closest('[data-venue-id]');
    if (!btn) return;
    vipState.b2b.venueId = btn.dataset.venueId;
    renderB2bVenueTypes();
    updateB2bDossier();
  };
}

function renderB2bTerms() {
  const el = document.getElementById('b2b-contract-terms');
  if (!el) return;

  el.innerHTML = VIP_DATA.b2bTerms.map((t) => `
    <button type="button" class="term-btn ${vipState.b2b.termMonths === t.months ? 'active' : ''}" data-term-months="${t.months}">
      <strong>${t.label}</strong>
      <span>${t.discountPct > 0 ? `خصم تعاقدي ${t.discountPct}%` : 'بدون التزام طويل'}</span>
    </button>
  `).join('');

  el.onclick = (e) => {
    const btn = e.target.closest('[data-term-months]');
    if (!btn) return;
    vipState.b2b.termMonths = Number(btn.dataset.termMonths);
    renderB2bTerms();
    updateB2bDossier();
  };
}

function renderB2bSliders() {
  const el = document.getElementById('b2b-sliders-grid');
  if (!el) return;

  el.innerHTML = VIP_DATA.b2bProducts.map((p) => {
    const val = vipState.b2b.weeklyQty[p.id];
    return `
      <div class="b2b-slider-box">
        <div class="b2b-slider-top">
          <span>${p.label}</span>
          <strong id="b2b-val-${p.id}">${val} / أسبوع</strong>
        </div>
        <input type="range" min="${p.min}" max="${p.max}" value="${val}" data-b2b-slider="${p.id}" aria-label="${p.label}">
      </div>
    `;
  }).join('');

  el.oninput = (e) => {
    const input = e.target.closest('[data-b2b-slider]');
    if (!input) return;
    const id = input.dataset.b2bSlider;
    const val = Number(input.value);
    vipState.b2b.weeklyQty[id] = val;
    const labelEl = document.getElementById(`b2b-val-${id}`);
    if (labelEl) labelEl.textContent = `${val} / أسبوع`;
    updateB2bDossier();
  };
}

function computeB2bFinancials() {
  const venue = VIP_DATA.b2bVenues.find((v) => v.id === vipState.b2b.venueId);
  const term = VIP_DATA.b2bTerms.find((t) => t.months === vipState.b2b.termMonths);

  let weeklyGrossUSD = 0;
  const monthlyLines = [];

  VIP_DATA.b2bProducts.forEach((p) => {
    const wQty = vipState.b2b.weeklyQty[p.id];
    const monthlyQty = wQty * 4;
    const monthlyLineUSD = monthlyQty * p.unitPriceUSD;
    weeklyGrossUSD += wQty * p.unitPriceUSD;
    monthlyLines.push({
      label: `${p.label} (${wQty} أسبوعياً / ${monthlyQty} شهرياً)`,
      qty: monthlyQty,
      unitUSD: p.unitPriceUSD,
      totalUSD: monthlyLineUSD,
    });
  });

  const monthlyGrossUSD = weeklyGrossUSD * 4;
  const discountRate = term.discountPct / 100;
  const monthlyDiscountUSD = monthlyGrossUSD * discountRate;
  const monthlyNetUSD = monthlyGrossUSD - monthlyDiscountUSD;
  const contractTotalUSD = monthlyNetUSD * term.months;
  const totalSavingsUSD = monthlyDiscountUSD * term.months;

  return {
    venue,
    term,
    monthlyLines,
    monthlyGrossUSD,
    monthlyNetUSD,
    contractTotalUSD,
    totalSavingsUSD,
  };
}

function updateB2bDossier() {
  const { venue, term, monthlyLines, monthlyNetUSD, contractTotalUSD, totalSavingsUSD } = computeB2bFinancials();

  const badgeEl = document.getElementById('b2b-tier-badge');
  const mNetEl = document.getElementById('b2b-monthly-net');
  const cTotEl = document.getElementById('b2b-contract-total');
  const savEl = document.getElementById('b2b-total-savings');
  const marginEl = document.getElementById('b2b-partner-margin');
  const linesEl = document.getElementById('b2b-lines-summary');

  if (badgeEl) badgeEl.textContent = `${venue.name} · ${term.label}`;
  if (mNetEl) mNetEl.textContent = formatVipMoney(monthlyNetUSD);
  if (cTotEl) cTotEl.textContent = formatVipMoney(contractTotalUSD);
  if (savEl) savEl.textContent = formatVipMoney(totalSavingsUSD);
  if (marginEl) marginEl.textContent = `~${venue.marginPct}`;

  if (linesEl) {
    linesEl.innerHTML = monthlyLines.map((l) => `
      <div class="dossier-line-row">
        <span>${l.label}</span>
        <strong>${formatVipMoney(l.totalUSD)}</strong>
      </div>
    `).join('');
  }
}

function dispatchB2bWhatsApp() {
  const { venue, term, monthlyLines, monthlyNetUSD, contractTotalUSD } = computeB2bFinancials();

  const msg = [
    `طلب عقد توريد تجاري B2B — ${VIP_CONFIG.brandName} (${VIP_CONFIG.tierLabel})`,
    `--------------------------------`,
    `نوع المنشأة: ${venue.name}`,
    `مدة العقد: ${term.label} (خصم ${term.discountPct}%)`,
    `وتيرة التسليم: ${vipState.b2b.cadence}`,
    `العملة المختارة: ${vipState.currency}`,
    `--------------------------------`,
    `مخصصات التوريد الشهرية:`,
    ...monthlyLines.map((l, i) => `${i + 1}. ${l.label} = ${formatVipMoney(l.totalUSD)}`),
    `--------------------------------`,
    `صافي الفاتورة الشهرية: ${formatVipMoney(monthlyNetUSD)}`,
    `إجمالي قيمة العقد (${term.months} أشهر): ${formatVipMoney(contractTotalUSD)}`,
  ].join('\n');

  window.open(`https://wa.me/${VIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

/* ── Interactive Printable / Copyable Proposal Modal ─────── */
function initProposalModal() {
  const backdrop = document.getElementById('proposal-backdrop');
  const closeBtn = document.getElementById('close-proposal-btn');
  const copyBtn = document.getElementById('copy-proposal-btn');
  const printBtn = document.getElementById('print-proposal-btn');
  const waBtn = document.getElementById('modal-wa-dispatch-btn');
  const eventDateInput = document.getElementById('proposal-event-date-input');

  if (eventDateInput) {
    eventDateInput.value = getTodayISO();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeProposalModal);
  if (backdrop) backdrop.addEventListener('click', closeProposalModal);
  if (copyBtn) copyBtn.addEventListener('click', copyProposalToClipboard);
  if (printBtn) printBtn.addEventListener('click', () => window.print());
  if (waBtn) waBtn.addEventListener('click', dispatchProposalModalWhatsApp);
}

function openProposalModal(mode) {
  vipState.activeProposalMode = mode;
  vipState.proposalRef = generateRefCode();
  populateProposalModal(mode);

  const modal = document.getElementById('proposal-modal');
  const backdrop = document.getElementById('proposal-backdrop');
  if (modal) modal.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
}

function closeProposalModal() {
  const modal = document.getElementById('proposal-modal');
  const backdrop = document.getElementById('proposal-backdrop');
  if (modal) modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function getProposalSnapshot(mode) {
  if (mode === 'b2b') {
    const { venue, term, monthlyLines, monthlyGrossUSD, monthlyNetUSD, contractTotalUSD, totalSavingsUSD } = computeB2bFinancials();
    return {
      modeTitle: 'مسودة عقد توريد تجاري B2B',
      contextText: `الجهة الشريكة: ${venue.name} | مدة التعاقد: ${term.label} | الوتيرة: ${vipState.b2b.cadence}`,
      rows: monthlyLines,
      totals: [
        { label: 'القيمة الشهرية قبل الخصم', val: formatVipMoney(monthlyGrossUSD) },
        { label: `الخصم التعاقدي (${term.discountPct}%) طوال المدة`, val: `-${formatVipMoney(totalSavingsUSD)}` },
        { label: 'صافي الفاتورة الشهرية', val: formatVipMoney(monthlyNetUSD) },
        { label: `إجمالي قيمة العقد (${term.months} أشهر)`, val: formatVipMoney(contractTotalUSD), grand: true },
      ],
    };
  }

  const { lines, grossUSD, discountPct, discountUSD, netUSD } = computeBanquetTotals();
  return {
    modeTitle: 'عرض ضيافة وولائم VIP',
    contextText: `المناسبة: ${vipState.eventType} | عدد الضيوف: ${vipState.guestCount} ضيفاً | التجهيز المبرد: مشمول`,
    rows: lines,
    totals: [
      { label: 'المجموع قبل الخصم', val: formatVipMoney(grossUSD) },
      { label: `خصم باقات الضيافة (${discountPct}%)`, val: `-${formatVipMoney(discountUSD)}` },
      { label: 'الإجمالي النهائي للضيافة', val: formatVipMoney(netUSD), grand: true },
    ],
  };
}

function populateProposalModal(mode) {
  const snap = getProposalSnapshot(mode);
  const refEl = document.getElementById('proposal-ref-code');
  const modeBadge = document.getElementById('proposal-mode-badge');
  const issuedEl = document.getElementById('proposal-date-issued');
  const contextEl = document.getElementById('proposal-context-banner');
  const tbody = document.getElementById('proposal-table-body');
  const totalsBox = document.getElementById('proposal-totals-box');

  if (refEl) refEl.textContent = `REF: ${vipState.proposalRef}`;
  if (modeBadge) modeBadge.textContent = snap.modeTitle;
  if (issuedEl) issuedEl.textContent = `تاريخ الإصدار: ${getTodayISO()}`;
  if (contextEl) contextEl.textContent = snap.contextText;

  if (tbody) {
    tbody.innerHTML = snap.rows.map((r) => `
      <tr>
        <td>${r.label}</td>
        <td>${r.qty}</td>
        <td>${formatVipMoney(r.unitUSD)}</td>
        <td><strong>${formatVipMoney(r.totalUSD)}</strong></td>
      </tr>
    `).join('');
  }

  if (totalsBox) {
    totalsBox.innerHTML = snap.totals.map((t) => `
      <div class="sheet-total-line ${t.grand ? 'grand' : ''}">
        <span>${t.label}</span>
        <strong>${t.val}</strong>
      </div>
    `).join('');
  }
}

function buildProposalPlainText() {
  const snap = getProposalSnapshot(vipState.activeProposalMode);
  const clientNameEl = document.getElementById('proposal-client-input');
  const eventDateEl = document.getElementById('proposal-event-date-input');
  const clientName = clientNameEl ? clientNameEl.value.trim() : 'ضيف دار البطريق';
  const eventDate = eventDateEl ? eventDateEl.value : getTodayISO();

  const lines = [
    `عرض سعر رسمي — ${VIP_CONFIG.brandName} (${VIP_CONFIG.tierLabel})`,
    `المرجع: ${vipState.proposalRef}`,
    `نوع العرض: ${snap.modeTitle}`,
    `العميل / الجهة: ${clientName}`,
    `تاريخ الفعالية / التوريد: ${eventDate}`,
    `${snap.contextText}`,
    `العملة: ${vipState.currency}`,
    `--------------------------------`,
  ];

  snap.rows.forEach((r, idx) => {
    lines.push(`${idx + 1}. ${r.label} | الكمية: ${r.qty} | الإجمالي: ${formatVipMoney(r.totalUSD)}`);
  });

  lines.push(`--------------------------------`);
  snap.totals.forEach((t) => {
    lines.push(`${t.label}: ${t.val}`);
  });
  lines.push(`للاعتماد المباشر — واتساب كونسيرج: ${VIP_CONFIG.whatsappNumber}+`);
  return lines.join('\n');
}

function copyProposalToClipboard() {
  const text = buildProposalPlainText();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showVipToast('تم نسخ عرض السعر الرسمي إلى الحافظة');
    }).catch(() => fallbackCopyText(text));
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showVipToast('تم نسخ عرض السعر الرسمي إلى الحافظة');
}

function dispatchProposalModalWhatsApp() {
  const text = buildProposalPlainText();
  window.open(`https://wa.me/${VIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}

/* ── VIP App Companion & FAQ ─────────────────────────────── */
function initVipAppTabs() {
  const tabs = document.getElementById('vip-app-tabs');
  const img = document.getElementById('vip-app-screen-img');
  if (!tabs || !img) return;

  const map = {
    splash: '../assets/images/app-screen-splash.png',
    login: '../assets/images/app-screen-login.png',
  };

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.v-app-tab');
    if (!btn) return;
    const key = btn.dataset.screen;
    if (!map[key]) return;
    img.src = map[key];
    tabs.querySelectorAll('.v-app-tab').forEach((b) => {
      b.classList.toggle('active', b.dataset.screen === key);
    });
  });
}

function renderVipFaqs() {
  const list = document.getElementById('vip-faq-list');
  if (!list) return;

  list.innerHTML = VIP_DATA.faqs.map((faq, idx) => `
    <div class="v-faq-item ${idx === 0 ? 'open' : ''}">
      <button type="button" class="v-faq-trigger" aria-expanded="${idx === 0}">
        <span>${faq.q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="v-faq-answer">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');

  list.onclick = (e) => {
    const btn = e.target.closest('.v-faq-trigger');
    if (!btn) return;
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    list.querySelectorAll('.v-faq-item').forEach((el) => {
      el.classList.remove('open');
      el.querySelector('.v-faq-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };
}

/* ── VIP Concierge Slide-Over Drawer ─────────────────────── */
function initVipDrawer() {
  const openBtn = document.getElementById('open-vip-drawer');
  const closeBtn = document.getElementById('close-vip-drawer');
  const backdrop = document.getElementById('vip-drawer-backdrop');
  const waBtn = document.getElementById('vip-drawer-wa-btn');

  if (openBtn) openBtn.addEventListener('click', openVipDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeVipDrawer);
  if (backdrop) backdrop.addEventListener('click', closeVipDrawer);
  if (waBtn) waBtn.addEventListener('click', dispatchDrawerWhatsApp);
}

function openVipDrawer() {
  const drawer = document.getElementById('vip-drawer');
  const backdrop = document.getElementById('vip-drawer-backdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
}

function closeVipDrawer() {
  const drawer = document.getElementById('vip-drawer');
  const backdrop = document.getElementById('vip-drawer-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function renderVipDrawer() {
  const countEl = document.getElementById('vip-cart-count');
  const bodyEl = document.getElementById('vip-drawer-items');
  const totalEl = document.getElementById('vip-drawer-total');

  const count = vipState.drawerItems.reduce((acc, i) => acc + i.qty, 0);
  const totalUSD = vipState.drawerItems.reduce((acc, i) => acc + (i.unitPriceUSD * i.qty), 0);

  if (countEl) countEl.textContent = String(count);
  if (totalEl) totalEl.textContent = formatVipMoney(totalUSD);
  if (!bodyEl) return;

  if (vipState.drawerItems.length === 0) {
    bodyEl.innerHTML = `
      <div class="v-drawer-empty">
        <p>طلبية الكونسيرج فارغة حالياً.</p>
        <p>أضف أصناف جناح العرض أو باقة الولائم للمتابعة.</p>
      </div>
    `;
    return;
  }

  bodyEl.innerHTML = vipState.drawerItems.map((item) => `
    <div class="v-drawer-item">
      <div class="v-drawer-item-top">
        <strong>${item.title}</strong>
        <strong>${formatVipMoney(item.unitPriceUSD * item.qty)}</strong>
      </div>
      <div class="v-drawer-item-meta">${item.meta}</div>
      <div class="v-drawer-item-foot">
        <div class="tray-qty-ctrl">
          <button type="button" class="tray-qty-btn" data-d-act="dec" data-d-key="${item.key}">-</button>
          <span>${item.qty}</span>
          <button type="button" class="tray-qty-btn" data-d-act="inc" data-d-key="${item.key}">+</button>
        </div>
        <button type="button" class="btn-gold-outline-sm" data-d-remove="${item.key}">إزالة</button>
      </div>
    </div>
  `).join('');

  bodyEl.onclick = (e) => {
    const qBtn = e.target.closest('[data-d-act]');
    if (qBtn) {
      const key = qBtn.dataset.dKey;
      const item = vipState.drawerItems.find((i) => i.key === key);
      if (!item) return;
      if (qBtn.dataset.dAct === 'inc') item.qty += 1;
      else {
        item.qty -= 1;
        if (item.qty <= 0) vipState.drawerItems = vipState.drawerItems.filter((i) => i.key !== key);
      }
      renderVipDrawer();
      return;
    }

    const rBtn = e.target.closest('[data-d-remove]');
    if (rBtn) {
      vipState.drawerItems = vipState.drawerItems.filter((i) => i.key !== rBtn.dataset.dRemove);
      renderVipDrawer();
    }
  };
}

function dispatchDrawerWhatsApp() {
  if (vipState.drawerItems.length === 0) {
    showVipToast('طلبية الكونسيرج فارغة حالياً');
    return;
  }

  const nameEl = document.getElementById('vip-client-name');
  const phoneEl = document.getElementById('vip-client-phone');
  const clientName = nameEl && nameEl.value.trim() ? nameEl.value.trim() : 'عميل الفئة الملكية VIP';
  const clientPhone = phoneEl && phoneEl.value.trim() ? phoneEl.value.trim() : 'غير محدد';
  const totalUSD = vipState.drawerItems.reduce((acc, i) => acc + (i.unitPriceUSD * i.qty), 0);

  const lines = [
    `طلبية كونسيرج جديدة — ${VIP_CONFIG.brandName} (${VIP_CONFIG.tierLabel})`,
    `--------------------------------`,
    `العميل / الجهة: ${clientName}`,
    `رقم التواصل: ${clientPhone}`,
    `العملة المختارة: ${vipState.currency}`,
    `--------------------------------`,
    ...vipState.drawerItems.map((i, idx) => `${idx + 1}. ${i.title} × ${i.qty} = ${formatVipMoney(i.unitPriceUSD * i.qty)}\n   (${i.meta})`),
    `--------------------------------`,
    `الإجمالي الكلي: ${formatVipMoney(totalUSD)}`,
  ];

  window.open(`https://wa.me/${VIP_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
}

/* ── Toast Helper ────────────────────────────────────────── */
let vipToastTimer = null;
function showVipToast(message) {
  const el = document.getElementById('vip-toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(vipToastTimer);
  vipToastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 2800);
}
