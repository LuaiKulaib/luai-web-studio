/* =========================================================
   app.js — إعمار السحاب العقارية (Luxury Gulf Real Estate)
   ========================================================= */
'use strict';

let activeCurrency = 'sar';
let activeUnitId = ESTATE_DATA.units[0].id;
let activeMilestoneIdx = 0;

const SVG = {
  water:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`,
  trees:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3l6 8h-3l4 6H5l4-6H6l6-8z"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  club:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  pdf:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
};

function formatMoney(amountSar) {
  const r = ESTATE_CONFIG.rates[activeCurrency];
  const converted = Math.round(amountSar * r.mult);
  if (activeCurrency === 'usd') return `$${converted.toLocaleString('en-US')}`;
  return `${converted.toLocaleString('en-US')} ${r.label}`;
}

function getSelectedUnit() {
  return ESTATE_DATA.units.find(u => u.id === activeUnitId) || ESTATE_DATA.units[0];
}

function renderExecPrice() {
  const minSar = Math.min(...ESTATE_DATA.units.map(u => u.priceSar));
  const el = document.getElementById('exec-start-price');
  if (el) el.textContent = formatMoney(minSar);
}

function buildBlueprintSVG(unit) {
  const rooms = unit.blueprint.map(r => `
    <g>
      <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="4"
            fill="#FFFFFF" stroke="#1E293B" stroke-width="1.4"/>
      <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 - 4}" text-anchor="middle"
            font-family="Tajawal, sans-serif" font-size="10.5" font-weight="800" fill="#141923">${r.label}</text>
      <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 + 12}" text-anchor="middle"
            font-family="Outfit, sans-serif" font-size="9" font-weight="700" fill="#A37E38">${r.dim}</text>
    </g>
  `).join('');

  return `
    <svg class="blueprint-svg" viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="المخطط الهندسي للوحدة">
      <rect x="4" y="4" width="292" height="242" rx="8" fill="#EEF2F7" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="4 3"/>
      ${rooms}
    </svg>
  `;
}

function renderUnits() {
  const tabs = document.getElementById('unit-tabs');
  const stage = document.getElementById('floorplan-stage');
  if (!tabs || !stage) return;

  tabs.innerHTML = ESTATE_DATA.units.map(u => `
    <button type="button" class="unit-tab ${u.id === activeUnitId ? 'active' : ''}"
            data-unit="${u.id}" role="tab" aria-selected="${u.id === activeUnitId}">
      ${u.tabLabel}
    </button>
  `).join('');

  const u = getSelectedUnit();
  const waBrochure = `https://wa.me/${ESTATE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`أهلاً، أرغب باستلام كتيّب PDF والمخططات التفصيلية لوحدة: ${u.title}`)}`;

  stage.innerHTML = `
    <div class="unit-visual">
      <div class="unit-photo">
        <img src="${u.image}" alt="${u.title}">
        <span class="unit-price-tag">تبدأ من ${formatMoney(u.priceSar)}</span>
      </div>
      <div class="blueprint-box">
        <div class="blueprint-head">
          <span>المخطط الهندسي التوزيعي (2D Schematic)</span>
          <span style="color:var(--gold-dk);font-family:var(--ff-en);">${u.areaTotal}</span>
        </div>
        ${buildBlueprintSVG(u)}
      </div>
    </div>

    <div class="unit-details">
      <div>
        <h3>${u.title}</h3>
        <p class="sub">${u.subtitle}</p>

        <div class="specs-grid">
          <div class="spec-box"><span>المساحة الإجمالية</span><strong>${u.areaTotal}</strong></div>
          <div class="spec-box"><span>التراس والحديقة</span><strong>${u.areaTerrace}</strong></div>
          <div class="spec-box"><span>التقسيم الداخلي</span><strong>${u.rooms}</strong></div>
          <div class="spec-box"><span>المواقف</span><strong>${u.parking}</strong></div>
        </div>
      </div>

      <div class="unit-actions">
        <button type="button" class="btn-dark-solid" id="btn-select-for-inquiry">
          <span>طلب معاينة وتخصيص الوحدة</span>
        </button>
        <a href="${waBrochure}" class="btn-outline-dark" target="_blank" rel="noopener">
          ${SVG.pdf}
          <span>تحميل الكتيّب والمخطط</span>
        </a>
      </div>
    </div>
  `;

  document.getElementById('btn-select-for-inquiry')?.addEventListener('click', () => {
    const sel = document.getElementById('f-unit');
    if (sel) sel.value = u.title;
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  });
}

function renderPaymentPlan() {
  const grid = document.getElementById('milestones-grid');
  const sub = document.getElementById('payment-unit-subtitle');
  if (!grid) return;

  const u = getSelectedUnit();
  if (sub) {
    sub.textContent = `القيم المحسوبة أدناه لـ (${u.title}) بقيمة ${formatMoney(u.priceSar)} — اضغط على أي دفعة`;
  }

  grid.innerHTML = ESTATE_DATA.paymentMilestones.map((m, idx) => {
    const amountSar = Math.round(u.priceSar * (m.pct / 100));
    return `
      <div class="ms-card ${idx === activeMilestoneIdx ? 'active' : ''}" data-ms="${idx}">
        <div class="ms-top">
          <span class="ms-step">STEP ${m.step}</span>
          <span class="ms-pct">${m.pct}%</span>
        </div>
        <h3>${m.title}</h3>
        <p>${m.timing}</p>
        <span class="ms-amount">قيمة الدفعة: ${formatMoney(amountSar)}</span>
      </div>
    `;
  }).join('');
}

function updateROI() {
  const priceEl = document.getElementById('roi-price');
  const yieldEl = document.getElementById('roi-yield');
  const growthEl = document.getElementById('roi-growth');
  if (!priceEl || !yieldEl || !growthEl) return;

  const priceSar = Number(priceEl.value);
  const yld = Number(yieldEl.value);
  const grw = Number(growthEl.value);

  document.getElementById('lbl-roi-price').textContent = formatMoney(priceSar);
  document.getElementById('lbl-roi-yield').textContent = `${yld.toFixed(1)}%`;
  document.getElementById('lbl-roi-growth').textContent = `${grw.toFixed(1)}%`;

  const annualRent = priceSar * (yld / 100);
  const fiveYearRent = annualRent * 5;
  const futureAsset = priceSar * Math.pow(1 + grw / 100, 5);
  const total5y = futureAsset + fiveYearRent;

  document.getElementById('out-annual-rent').textContent = formatMoney(annualRent);
  document.getElementById('out-5y-rent').textContent = formatMoney(fiveYearRent);
  document.getElementById('out-total-5y').textContent = formatMoney(total5y);
}

function renderStaticSections() {
  const amEl = document.getElementById('amenities-grid');
  if (amEl) {
    amEl.innerHTML = ESTATE_DATA.amenities.map(a => `
      <div class="amenity-card">
        <div class="amenity-icon">${SVG[a.icon] || ''}</div>
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
      </div>
    `).join('');
  }

  const connEl = document.getElementById('conn-bar');
  if (connEl) {
    connEl.innerHTML = ESTATE_DATA.connectivity.map(c => `
      <div class="conn-card">
        <strong>${c.time}</strong>
        <span>${c.place}</span>
      </div>
    `).join('');
  }

  const trEl = document.getElementById('track-grid');
  if (trEl) {
    trEl.innerHTML = ESTATE_DATA.trackRecord.map(t => `
      <div class="track-card">
        <strong>${t.value}</strong>
        <span>${t.label}</span>
      </div>
    `).join('');
  }

  const unitSel = document.getElementById('f-unit');
  if (unitSel) {
    unitSel.innerHTML = ESTATE_DATA.units.map(u => `
      <option value="${u.title}">${u.title}</option>
    `).join('');
  }
}

function initInteractions() {
  document.querySelectorAll('.curr-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.curr-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCurrency = btn.dataset.curr;
      renderExecPrice();
      renderUnits();
      renderPaymentPlan();
      updateROI();
    });
  });

  document.getElementById('unit-tabs')?.addEventListener('click', e => {
    const tab = e.target.closest('.unit-tab');
    if (!tab) return;
    activeUnitId = tab.dataset.unit;
    renderUnits();
    renderPaymentPlan();
    const u = getSelectedUnit();
    const roiSlider = document.getElementById('roi-price');
    if (roiSlider) {
      roiSlider.value = u.priceSar;
      updateROI();
    }
    const sel = document.getElementById('f-unit');
    if (sel) sel.value = u.title;
  });

  document.getElementById('milestones-grid')?.addEventListener('click', e => {
    const card = e.target.closest('.ms-card');
    if (!card) return;
    activeMilestoneIdx = Number(card.dataset.ms);
    renderPaymentPlan();
  });

  ['roi-price', 'roi-yield', 'roi-growth'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateROI);
  });

  document.getElementById('lead-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('f-name')?.value.trim();
    const phone = document.getElementById('f-phone')?.value.trim();
    const unit = document.getElementById('f-unit')?.value;
    const purpose = document.getElementById('f-purpose')?.value;
    const timeline = document.getElementById('f-timeline')?.value;

    const msg = [
      `*طلب استشارة وتفاصيل — ${ESTATE_CONFIG.projectTitle}*`,
      `الاسم: ${name}`,
      `الجوال: ${phone}`,
      `الوحدة المطلوبة: ${unit}`,
      `الغرض: ${purpose}`,
      `موعد الشراء: ${timeline}`,
    ].join('\n');

    window.open(`https://wa.me/${ESTATE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

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
  renderStaticSections();
  renderExecPrice();
  renderUnits();
  renderPaymentPlan();
  updateROI();
  initInteractions();
});
