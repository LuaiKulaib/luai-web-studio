/* =========================================================
   app.js — الريان للصرافة والتحويلات المالية (الفئة الملكية VIP)
   Corporate & Importer Treasury FX Desk + Spread Savings Deltas
   + Reference Tracker + Multi-Branch Cash Pickup Split + Agreement Modal
   ========================================================= */
'use strict';

const VIP_SVG = {
  send: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  globe: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  briefcase: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  shield: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  dot: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg>'
};

const VOLUME_TIERS = {
  standard_corp: {
    id: 'standard_corp',
    label: 'شريحة التوريد ($10k – $49k)',
    sub: 'أفضلية 42% من السبريد',
    spreadFactor: 0.42
  },
  factory_corp: {
    id: 'factory_corp',
    label: 'شريحة الشركات ($50k – $249k)',
    sub: 'أفضلية 58% من السبريد',
    spreadFactor: 0.58
  },
  sovereign_corp: {
    id: 'sovereign_corp',
    label: 'كبار المستوردين ($250k+)',
    sub: 'أفضلية 74% من السبريد',
    spreadFactor: 0.74
  }
};

const INITIAL_SUPPLIER_DESKS = [
  {
    id: 'china',
    title: 'الصين — مورّدو المصانع (غوانزو / إيوو · RMB / USD)',
    subtitleEn: 'CHINA SUPPLIER SETTLEMENT · RMB / USD BRIDGE',
    currency: 'USD',
    active: true,
    amount: 35000,
    invoiceRef: 'INV-CN-8841',
    rmbPerUsd: 7.24
  },
  {
    id: 'dubai',
    title: 'دبي — التوريد وإعادة التصدير (AED)',
    subtitleEn: 'DUBAI JEBEL ALI TRADE DESK · AED',
    currency: 'AED',
    active: true,
    amount: 65000,
    invoiceRef: 'INV-DXB-4120',
    rmbPerUsd: null
  },
  {
    id: 'riyadh',
    title: 'الرياض وجدة — المشتريات والوكالات (SAR)',
    subtitleEn: 'KSA CORPORATE REMITTANCE · SAR',
    currency: 'SAR',
    active: true,
    amount: 80000,
    invoiceRef: 'INV-KSA-3095',
    rmbPerUsd: null
  },
  {
    id: 'europe',
    title: 'أوروبا — المعدات وخطوط الإنتاج (EUR)',
    subtitleEn: 'EUROPEAN MACHINERY & SEPA DESK · EUR',
    currency: 'EUR',
    active: false,
    amount: 18000,
    invoiceRef: 'INV-EUR-1102',
    rmbPerUsd: null
  }
];

const VIP_TRACKER_RECORDS = {
  'RY-4091': {
    ref: 'RY-4091',
    route: 'الرياض ← صنعاء — المركز الرئيسي (15,000 SAR)',
    statusText: 'جاهزة للتسليم بالفرع',
    currentStep: 3,
    isComplete: false,
    steps: [
      { title: 'قيد المنشأ', detail: 'تم الإيداع في الرياض بمستند #RYD-9041 والتحقق من بيانات المستفيد.' },
      { title: 'المقاصة والامتثال', detail: 'اكتمل التدقيق وتثبيت سعر الشراء الرسمي (141.5 ر.ي) دون خصومات.' },
      { title: 'تخصيص السيولة', detail: 'السيولة مخصصة وجاهزة في صنعاء — المركز الرئيسي (شارع الزبيري).' },
      { title: 'اعتماد الصرف', detail: 'بانتظار حضور المستفيد أو مندوب الشركة بأصل الهوية للتسليم.' }
    ]
  },
  'RY-8820': {
    ref: 'RY-8820',
    route: 'دبي ← عدن — فرع المنصورة (4,500 AED)',
    statusText: 'مكتملة — تم الصرف',
    currentStep: 4,
    isComplete: true,
    steps: [
      { title: 'قيد المنشأ', detail: 'تم استلام الحوالة من دبي برقم قيد #DXB-8820.' },
      { title: 'المقاصة والامتثال', detail: 'اعتُمد الصرف الرسمي للدرهم الإماراتي (144.2 ر.ي).' },
      { title: 'تخصيص السيولة', detail: 'تم تغذية شباك فرع المنصورة في عدن وإشعار المستفيد.' },
      { title: 'اعتماد الصرف', detail: 'تم التسليم بالكامل وأرشفة السند الإلكتروني #99210.' }
    ]
  },
  'RY-1154': {
    ref: 'RY-1154',
    route: 'الدوحة / أوروبا ← تعز — فرع التحرير (2,200 USD)',
    statusText: 'قيد التدقيق والمقاصة',
    currentStep: 2,
    isComplete: false,
    steps: [
      { title: 'قيد المنشأ', detail: 'وصلت الحوالة من مراسل الدوحة برقم إشعار #DOH-1154.' },
      { title: 'المقاصة والامتثال', detail: 'قيد المراجعة النهائية وسعر الصرف الرسمي (531.0 ر.ي).' },
      { title: 'تخصيص السيولة', detail: 'جاري التوجيه التلقائي لفرع تعز — شارع جمال.' },
      { title: 'اعتماد الصرف', detail: 'سيكون المبلغ جاهزاً للصرف فور اكتمال التوجيه للفرع.' }
    ]
  }
};

const vipState = {
  volumeTierId: 'factory_corp',
  desks: INITIAL_SUPPLIER_DESKS.map(d => ({ ...d })),
  activeRef: 'RY-4091',
  inspectStep: 3,
  splitEnabled: true,
  splitAmount: 50000,
  splitCurrency: 'USD',
  splitShares: [50, 30, 20],
  agreementRef: 'VIP-FX-2026-8840'
};

function getCurrencies() {
  return (typeof EX_DATA !== 'undefined' && Array.isArray(EX_DATA.currencies)) ? EX_DATA.currencies : [];
}

function getBranches() {
  return (typeof EX_DATA !== 'undefined' && Array.isArray(EX_DATA.branches)) ? EX_DATA.branches : [];
}

function getServices() {
  return (typeof EX_DATA !== 'undefined' && Array.isArray(EX_DATA.services)) ? EX_DATA.services : [];
}

function getCurrencyObj(code) {
  const list = getCurrencies();
  return list.find(c => c.code === code) || list[0];
}

function fmtNum(val, decimals = 0) {
  return Number(val).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function getVipDeskRates(currObj) {
  const tier = VOLUME_TIERS[vipState.volumeTierId] || VOLUME_TIERS.factory_corp;
  const spread = currObj.sellYer - currObj.buyYer;
  const unitDiscount = Number((spread * tier.spreadFactor).toFixed(2));
  const vipSell = Number((currObj.sellYer - unitDiscount).toFixed(2));
  const vipBuy = Number((currObj.buyYer + unitDiscount * 0.7).toFixed(2));
  return {
    stdBuy: currObj.buyYer,
    stdSell: currObj.sellYer,
    vipBuy,
    vipSell,
    unitSave: Number((currObj.sellYer - vipSell).toFixed(2))
  };
}

function renderTelemetryAndHeroBoard() {
  const currencies = getCurrencies();
  const teleEl = document.getElementById('vip-telemetry-rates');
  if (teleEl) {
    teleEl.innerHTML = currencies.map(c =>
      `<span class="tele-rate-chip">${c.code} <b>${c.buyYer.toFixed(1)}</b> / ${c.sellYer.toFixed(1)}</span>`
    ).join('');
  }

  const heroBoard = document.getElementById('vip-hero-board');
  if (heroBoard) {
    heroBoard.innerHTML = currencies.map(c => {
      const r = getVipDeskRates(c);
      return `
        <div class="hero-rate-tile">
          <div class="tile-top">
            <strong>${c.code}/YER</strong>
            <span>-${r.unitSave.toFixed(2)} ر.ي</span>
          </div>
          <div class="tile-nums">
            <span>السوق: ${r.stdSell.toFixed(1)}</span>
            <b>VIP: ${r.vipSell.toFixed(2)}</b>
          </div>
        </div>
      `;
    }).join('');
  }
}

function renderVolumeTiers() {
  const bar = document.getElementById('vip-volume-tiers');
  if (!bar) return;
  bar.innerHTML = Object.values(VOLUME_TIERS).map(t => `
    <button type="button" class="vol-tier-btn ${t.id === vipState.volumeTierId ? 'active' : ''}" data-tier="${t.id}">
      <strong>${t.label}</strong>
      <small>${t.sub}</small>
    </button>
  `).join('');

  bar.querySelectorAll('.vol-tier-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      vipState.volumeTierId = btn.dataset.tier;
      renderVolumeTiers();
      renderTelemetryAndHeroBoard();
      renderSupplierDesks();
      renderSpreadMatrix();
      updateSettlementConsole();
    });
  });
}

function computeDeskRow(desk) {
  const curr = getCurrencyObj(desk.currency);
  const r = getVipDeskRates(curr);
  const amount = Math.max(0, Number(desk.amount) || 0);
  const stdCostYer = Math.round(amount * r.stdSell);
  const vipCostYer = Math.round(amount * r.vipSell);
  const savingsYer = Math.max(0, stdCostYer - vipCostYer);
  const rmbCovered = desk.rmbPerUsd ? Math.round(amount * desk.rmbPerUsd) : null;
  return { desk, curr, rates: r, amount, stdCostYer, vipCostYer, savingsYer, rmbCovered };
}

function renderSupplierDesks() {
  const wrap = document.getElementById('vip-supplier-corridors');
  if (!wrap) return;

  wrap.innerHTML = vipState.desks.map((d, idx) => {
    const calc = computeDeskRow(d);
    return `
      <article class="supplier-card ${d.active ? 'active' : ''}" data-desk-idx="${idx}">
        <div class="supplier-card-head">
          <label class="supplier-toggle">
            <input type="checkbox" class="desk-active-cb" data-idx="${idx}" ${d.active ? 'checked' : ''}>
            <div>
              <strong>${d.title}</strong>
              <small class="num-font">${d.subtitleEn}</small>
            </div>
          </label>
          <span class="delta-badge num-font" id="desk-delta-${d.id}">وفّر ${fmtNum(calc.savingsYer)} ر.ي</span>
        </div>

        <div class="supplier-inputs">
          <div class="steel-field">
            <label for="desk-amt-${d.id}">مبلغ تسوية المورد (${d.currency})</label>
            <input type="number" id="desk-amt-${d.id}" class="num-font desk-amt-input" data-idx="${idx}" value="${d.amount}" min="0" step="100">
          </div>
          <div class="steel-field">
            <label for="desk-ref-${d.id}">مرجع الفاتورة / المورّد</label>
            <input type="text" id="desk-ref-${d.id}" class="num-font desk-ref-input" data-idx="${idx}" value="${d.invoiceRef}">
          </div>
        </div>

        <div class="supplier-metrics">
          <div class="sup-metric">
            <small>سعر البيع الاعتيادي</small>
            <strong class="num-font">${calc.rates.stdSell.toFixed(1)} ر.ي</strong>
          </div>
          <div class="sup-metric">
            <small>سعر مكتب VIP الخاص</small>
            <strong class="vip-rate num-font" id="desk-viprate-${d.id}">${calc.rates.vipSell.toFixed(2)} ر.ي</strong>
          </div>
          <div class="sup-metric">
            <small>التكلفة عبر VIP</small>
            <strong class="delta-green num-font" id="desk-cost-${d.id}">${fmtNum(calc.vipCostYer)} ر.ي</strong>
          </div>
        </div>

        ${d.rmbPerUsd ? `
          <div class="rmb-cross-note num-font" id="desk-rmb-${d.id}">
            تغطية فواتير المصانع باليوان الصيني (تقريبي بسعر ${d.rmbPerUsd} RMB/USD): ${fmtNum(calc.rmbCovered)} RMB
          </div>
        ` : ''}
      </article>
    `;
  }).join('');

  wrap.querySelectorAll('.desk-active-cb').forEach(cb => {
    cb.addEventListener('change', e => {
      const i = Number(e.target.dataset.idx);
      vipState.desks[i].active = e.target.checked;
      e.target.closest('.supplier-card')?.classList.toggle('active', e.target.checked);
      updateSettlementConsole();
    });
  });

  wrap.querySelectorAll('.desk-amt-input').forEach(inp => {
    inp.addEventListener('input', e => {
      const i = Number(e.target.dataset.idx);
      vipState.desks[i].amount = Math.max(0, Number(e.target.value) || 0);
      const calc = computeDeskRow(vipState.desks[i]);
      const d = vipState.desks[i];
      const deltaEl = document.getElementById(`desk-delta-${d.id}`);
      const costEl = document.getElementById(`desk-cost-${d.id}`);
      const rmbEl = document.getElementById(`desk-rmb-${d.id}`);
      if (deltaEl) deltaEl.textContent = `وفّر ${fmtNum(calc.savingsYer)} ر.ي`;
      if (costEl) costEl.textContent = `${fmtNum(calc.vipCostYer)} ر.ي`;
      if (rmbEl && d.rmbPerUsd) rmbEl.textContent = `تغطية فواتير المصانع باليوان الصيني (تقريبي بسعر ${d.rmbPerUsd} RMB/USD): ${fmtNum(calc.rmbCovered)} RMB`;
      updateSettlementConsole();
    });
  });

  wrap.querySelectorAll('.desk-ref-input').forEach(inp => {
    inp.addEventListener('input', e => {
      const i = Number(e.target.dataset.idx);
      vipState.desks[i].invoiceRef = e.target.value.trim() || '-';
    });
  });
}

function getPortfolioTotals() {
  const activeCalcs = vipState.desks.filter(d => d.active).map(computeDeskRow);
  let stdTotal = 0;
  let vipTotal = 0;
  activeCalcs.forEach(c => {
    stdTotal += c.stdCostYer;
    vipTotal += c.vipCostYer;
  });
  const savingsYer = Math.max(0, stdTotal - vipTotal);
  const usdBase = getCurrencyObj('USD')?.sellYer || 533.5;
  const savingsUsd = usdBase > 0 ? savingsYer / usdBase : 0;
  const bps = stdTotal > 0 ? Math.round((savingsYer / stdTotal) * 10000) : 0;
  return { activeCalcs, stdTotal, vipTotal, savingsYer, savingsUsd, bps };
}

function updateSettlementConsole() {
  const totals = getPortfolioTotals();
  const linesEl = document.getElementById('vip-console-lines');
  if (linesEl) {
    if (totals.activeCalcs.length === 0) {
      linesEl.innerHTML = `<div class="console-line"><span>لا توجد ممرات مفعّلة حالياً</span><strong>اختر مورّداً واحداً على الأقل</strong></div>`;
    } else {
      linesEl.innerHTML = totals.activeCalcs.map(c => `
        <div class="console-line">
          <span>${c.desk.title.split('—')[0].trim()} (<span class="num-font">${fmtNum(c.amount)} ${c.desk.currency}</span>)</span>
          <strong class="num-font">${fmtNum(c.vipCostYer)} ر.ي</strong>
        </div>
      `).join('');
    }
  }

  const stdEl = document.getElementById('vip-std-total');
  const vipEl = document.getElementById('vip-desk-total');
  const savYerEl = document.getElementById('vip-total-savings-yer');
  const savUsdEl = document.getElementById('vip-total-savings-usd');
  const bpsEl = document.getElementById('vip-savings-bps');
  const headSav = document.getElementById('vip-header-savings');
  const stripSav = document.getElementById('strip-savings-readout');

  if (stdEl) stdEl.textContent = `${fmtNum(totals.stdTotal)} ر.ي`;
  if (vipEl) vipEl.textContent = `${fmtNum(totals.vipTotal)} ر.ي`;
  if (savYerEl) savYerEl.textContent = `${fmtNum(totals.savingsYer)} ر.ي`;
  if (savUsdEl) savUsdEl.textContent = `المعادل التقريبي: $${fmtNum(totals.savingsUsd, 2)}`;
  if (bpsEl) bpsEl.textContent = `${totals.bps} bps`;
  if (headSav) headSav.textContent = `${fmtNum(totals.savingsYer)} ر.ي`;
  if (stripSav) stripSav.textContent = `الوفر: ${fmtNum(totals.savingsYer)} ر.ي`;
}

function renderSpreadMatrix() {
  const tbody = document.getElementById('vip-matrix-body');
  if (!tbody) return;
  tbody.innerHTML = getCurrencies().map(c => {
    const r = getVipDeskRates(c);
    return `
      <tr>
        <td><span class="vip-code-tag num-font">${c.code}</span> ${c.name}</td>
        <td class="num-font">${r.stdBuy.toFixed(1)}</td>
        <td class="num-font">${r.stdSell.toFixed(1)}</td>
        <td class="num-font" style="color:var(--gold-hi);">${r.vipSell.toFixed(2)}</td>
        <td class="num-font" style="color:var(--emerald-hi);">${r.vipBuy.toFixed(2)}</td>
        <td><span class="delta-badge num-font">-${r.unitSave.toFixed(2)} ر.ي / وحدة</span></td>
      </tr>
    `;
  }).join('');
}

function renderVipTracker(refCode, customStep = null) {
  const code = (refCode || '').trim().toUpperCase();
  const box = document.getElementById('vip-track-result');
  if (!box) return;

  document.querySelectorAll('.vip-chip').forEach(ch => {
    ch.classList.toggle('active', ch.dataset.ref === code);
  });

  const rec = VIP_TRACKER_RECORDS[code];
  if (!rec) {
    box.innerHTML = `
      <div class="vip-track-head">
        <div>
          <strong class="num-font">${code || 'بدون مرجع'}</strong>
          <span>لا يتوفر سجل تجريبي لهذا المرجع</span>
        </div>
        <span class="delta-badge">مراجعة مكتب VIP</span>
      </div>
      <div class="vip-step-detail">
        <strong>الاستعلام الفوري عبر مكتب كبار العملاء</strong>
        <p>تواصل مع غرفة عمليات VIP على الرقم ${EX_CONFIG.whatsappNumber} لتزويده برقم المرجع والتحقق من حالة الصرف.</p>
      </div>
    `;
    return;
  }

  vipState.activeRef = code;
  const activeStep = customStep || rec.currentStep;
  vipState.inspectStep = activeStep;
  const stepData = rec.steps[activeStep - 1] || rec.steps[0];

  box.innerHTML = `
    <div class="vip-track-head">
      <div>
        <strong class="num-font">${rec.ref}</strong>
        <span>${rec.route}</span>
      </div>
      <span class="delta-badge">${rec.statusText}</span>
    </div>

    <div class="vip-steps-grid">
      ${rec.steps.map((st, idx) => {
        const num = idx + 1;
        const done = rec.isComplete ? num <= rec.currentStep : num < rec.currentStep;
        const curr = !rec.isComplete && num === rec.currentStep;
        const cls = done ? 'done' : curr ? 'current' : '';
        const sel = num === activeStep ? 'selected' : '';
        const ico = done ? VIP_SVG.check : curr ? VIP_SVG.clock : VIP_SVG.dot;
        return `
          <button type="button" class="vip-step-btn ${cls} ${sel}" data-vip-step="${num}">
            <span>${ico} مرحلة ${num}</span>
            <strong>${st.title}</strong>
          </button>
        `;
      }).join('')}
    </div>

    <div class="vip-step-detail">
      <strong>المرحلة ${activeStep}: ${stepData.title}</strong>
      <p>${stepData.detail}</p>
    </div>
  `;

  box.querySelectorAll('[data-vip-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      renderVipTracker(rec.ref, Number(btn.dataset.vipStep));
    });
  });
}

function populateSplitCurrency() {
  const sel = document.getElementById('vip-split-currency');
  if (!sel) return;
  const list = getCurrencies();
  sel.innerHTML = [
    ...list.map(c => `<option value="${c.code}">${c.name} (${c.code})</option>`),
    `<option value="YER">ريال يمني (YER)</option>`
  ].join('');
  sel.value = vipState.splitCurrency;
}

function getSplitBreakdown() {
  const branches = getBranches();
  const totalAmount = Math.max(0, Number(vipState.splitAmount) || 0);
  const totalPct = vipState.splitShares.reduce((a, b) => a + b, 0);
  const authPrefixes = ['AUTH-SNA', 'AUTH-ADE', 'AUTH-TAZ'];

  return {
    totalAmount,
    totalPct,
    rows: branches.map((b, i) => {
      const pct = Math.max(0, Math.min(100, Number(vipState.splitShares[i]) || 0));
      const amt = totalPct > 0 ? (totalAmount * pct) / 100 : 0;
      return {
        branch: b,
        pct,
        amount: amt,
        authCode: `${authPrefixes[i] || 'AUTH-BR'}-${410 + i * 17}`
      };
    })
  };
}

function renderCashSplit() {
  const listEl = document.getElementById('vip-branch-split-list');
  const pctTotalEl = document.getElementById('vip-split-total-pct');
  const meterFill = document.getElementById('vip-split-meter-fill');
  const noteEl = document.getElementById('vip-split-note');
  if (!listEl) return;

  const data = getSplitBreakdown();
  if (pctTotalEl) {
    pctTotalEl.textContent = `${data.totalPct}%`;
    pctTotalEl.classList.toggle('warn', data.totalPct !== 100);
  }
  if (meterFill) {
    meterFill.style.width = `${Math.min(100, data.totalPct)}%`;
  }
  if (noteEl) {
    noteEl.hidden = data.totalPct === 100;
  }

  listEl.innerHTML = data.rows.map((r, idx) => `
    <div class="split-branch-row">
      <div class="split-row-top">
        <strong>${r.branch.city}</strong>
        <span class="num-font" id="split-amt-label-${idx}">${fmtNum(r.amount, vipState.splitCurrency === 'YER' ? 0 : 2)} ${vipState.splitCurrency}</span>
      </div>
      <div class="split-range-wrap">
        <input type="range" min="0" max="100" value="${r.pct}" class="split-slider" data-split-idx="${idx}" aria-label="نسبة ${r.branch.city}">
        <input type="number" min="0" max="100" value="${r.pct}" class="num-font split-num" data-split-idx="${idx}" aria-label="نسبة مئوية ${r.branch.city}">
      </div>
      <div class="split-row-foot">
        <span>${r.branch.loc}</span>
        <span class="num-font">${r.authCode}</span>
      </div>
    </div>
  `).join('');

  const syncSplitTotalsOnly = () => {
    const updated = getSplitBreakdown();
    if (pctTotalEl) {
      pctTotalEl.textContent = `${updated.totalPct}%`;
      pctTotalEl.classList.toggle('warn', updated.totalPct !== 100);
    }
    if (meterFill) {
      meterFill.style.width = `${Math.min(100, updated.totalPct)}%`;
    }
    if (noteEl) {
      noteEl.hidden = updated.totalPct === 100;
    }
    updated.rows.forEach((row, idx) => {
      const lbl = document.getElementById(`split-amt-label-${idx}`);
      if (lbl) lbl.textContent = `${fmtNum(row.amount, vipState.splitCurrency === 'YER' ? 0 : 2)} ${vipState.splitCurrency}`;
    });
  };

  listEl.querySelectorAll('.split-slider').forEach(sl => {
    sl.addEventListener('input', e => {
      const i = Number(e.target.dataset.splitIdx);
      const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
      vipState.splitShares[i] = val;
      const numInp = listEl.querySelector(`.split-num[data-split-idx="${i}"]`);
      if (numInp) numInp.value = val;
      syncSplitTotalsOnly();
    });
  });

  listEl.querySelectorAll('.split-num').forEach(inp => {
    inp.addEventListener('input', e => {
      const i = Number(e.target.dataset.splitIdx);
      const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
      vipState.splitShares[i] = val;
      const slider = listEl.querySelector(`.split-slider[data-split-idx="${i}"]`);
      if (slider) slider.value = val;
      syncSplitTotalsOnly();
    });
  });
}

function renderInfrastructure() {
  const brGrid = document.getElementById('vip-branches-grid');
  if (brGrid) {
    brGrid.innerHTML = getBranches().map(b => `
      <article class="vip-branch-card">
        <h3>${b.city}</h3>
        <p>${b.loc}</p>
        <small>الدوام المعتمد: ${b.hours}</small>
      </article>
    `).join('');
  }

  const svcGrid = document.getElementById('vip-services-grid');
  if (svcGrid) {
    svcGrid.innerHTML = getServices().map(s => `
      <article class="vip-svc-card">
        <div class="vip-svc-icon">${VIP_SVG[s.icon] || VIP_SVG.shield}</div>
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </article>
    `).join('');
  }
}

function buildAgreementPayload() {
  const company = (document.getElementById('vip-company-name')?.value || '').trim() || 'شركة استيراد وتجارة';
  const contact = (document.getElementById('vip-contact-person')?.value || '').trim() || 'غير محدد';
  const purpose = (document.getElementById('vip-settlement-purpose')?.value || '').trim() || 'تسويات مورّدين وصرف مؤسسي';
  const tier = VOLUME_TIERS[vipState.volumeTierId] || VOLUME_TIERS.factory_corp;
  const totals = getPortfolioTotals();
  const splitData = getSplitBreakdown();
  const nowStr = new Date().toLocaleDateString('en-GB') + ' · 60 دقيقة صلاحية تثبيت';

  return {
    ref: vipState.agreementRef,
    company,
    contact,
    purpose,
    tierLabel: tier.label,
    timestamp: nowStr,
    totals,
    splitEnabled: vipState.splitEnabled,
    splitCurrency: vipState.splitCurrency,
    splitData
  };
}

function renderAgreementModalSheet() {
  const sheet = document.getElementById('vip-agreement-sheet');
  if (!sheet) return;
  const p = buildAgreementPayload();

  sheet.innerHTML = `
    <div class="sheet-header">
      <div>
        <h4>${EX_CONFIG.companyName} — اتفاقية تسوية وتثبيت سعر الصرف (الفئة الملكية VIP)</h4>
        <p>وثيقة مبدئية محررة عبر مكتب الصرف الخاص وتحويلات الشركات والمستوردين</p>
      </div>
      <div class="num-font" style="text-align:left; font-size:0.82rem; font-weight:800;">
        <div>REF: ${p.ref}</div>
        <div>${p.timestamp}</div>
      </div>
    </div>

    <div class="sheet-meta-grid">
      <div><strong>الشركة / المستورد:</strong> ${p.company}</div>
      <div><strong>المسؤول المالي:</strong> ${p.contact}</div>
      <div><strong>شريحة التعاقد:</strong> ${p.tierLabel}</div>
      <div><strong>الغرض التجاري:</strong> ${p.purpose}</div>
    </div>

    <table class="sheet-table">
      <thead>
        <tr>
          <th>ممر السداد والعملة</th>
          <th>المرجع</th>
          <th>المبلغ الأجنبي</th>
          <th>السعر الاعتيادي</th>
          <th>سعر مكتب VIP</th>
          <th>التكلفة بالريال اليمني</th>
          <th>الوفر المحقق</th>
        </tr>
      </thead>
      <tbody>
        ${p.totals.activeCalcs.length ? p.totals.activeCalcs.map(c => `
          <tr>
            <td>${c.desk.title.split('—')[0].trim()} (${c.desk.currency})</td>
            <td class="num-font">${c.desk.invoiceRef}</td>
            <td class="num-font">${fmtNum(c.amount)} ${c.desk.currency}</td>
            <td class="num-font">${c.rates.stdSell.toFixed(1)}</td>
            <td class="num-font" style="color:#059669;">${c.rates.vipSell.toFixed(2)}</td>
            <td class="num-font">${fmtNum(c.vipCostYer)} ر.ي</td>
            <td class="num-font" style="color:#047857;">${fmtNum(c.savingsYer)} ر.ي</td>
          </tr>
        `).join('') : `<tr><td colspan="7">لم يتم تحديد ممرات مورّدين نشطة</td></tr>`}
      </tbody>
    </table>

    ${p.splitEnabled ? `
      <table class="sheet-table">
        <thead>
          <tr>
            <th>فرع الصرف النقدي الموزّع</th>
            <th>النسبة</th>
            <th>المبلغ المخصص (${p.splitCurrency})</th>
            <th>ساعات الدوام</th>
            <th>كود التفويض</th>
          </tr>
        </thead>
        <tbody>
          ${p.splitData.rows.map(r => `
            <tr>
              <td>${r.branch.city}</td>
              <td class="num-font">${r.pct}%</td>
              <td class="num-font">${fmtNum(r.amount, p.splitCurrency === 'YER' ? 0 : 2)} ${p.splitCurrency}</td>
              <td>${r.branch.hours}</td>
              <td class="num-font">${r.authCode}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : ''}

    <div class="sheet-summary-box">
      <div><strong>إجمالي التسوية الاعتيادية:</strong> <span class="num-font">${fmtNum(p.totals.stdTotal)} ر.ي</span></div>
      <div><strong>إجمالي مكتب VIP الخاص:</strong> <span class="num-font">${fmtNum(p.totals.vipTotal)} ر.ي</span></div>
      <div><strong>صافي الوفر المؤسسي:</strong> <span class="num-font" style="color:#047857;">${fmtNum(p.totals.savingsYer)} ر.ي ($${fmtNum(p.totals.savingsUsd, 2)})</span></div>
    </div>
  `;
}

function formatAgreementText(p) {
  const lines = [
    `*اتفاقية تسوية وتثبيت سعر الصرف — ${EX_CONFIG.companyName}*`,
    `الفئة: الفئة الملكية VIP`,
    `رقم الاتفاقية: ${p.ref}`,
    `الشركة / المستورد: ${p.company}`,
    `المسؤول: ${p.contact}`,
    `الشريحة: ${p.tierLabel}`,
    `الغرض: ${p.purpose}`,
    `--- تسويات الموردين ---`
  ];
  p.totals.activeCalcs.forEach(c => {
    lines.push(`• ${c.desk.title.split('—')[0].trim()}: ${fmtNum(c.amount)} ${c.desk.currency} | سعر VIP ${c.rates.vipSell.toFixed(2)} (بدلاً من ${c.rates.stdSell.toFixed(1)}) = ${fmtNum(c.vipCostYer)} ر.ي | الوفر: ${fmtNum(c.savingsYer)} ر.ي`);
  });
  lines.push(`إجمالي مكتب VIP: ${fmtNum(p.totals.vipTotal)} ر.ي`);
  lines.push(`إجمالي الوفر المحقق: ${fmtNum(p.totals.savingsYer)} ر.ي (~$${fmtNum(p.totals.savingsUsd, 2)})`);

  if (p.splitEnabled) {
    lines.push(`--- توزيع الصرف النقدي على الفروع (${fmtNum(p.splitData.totalAmount)} ${p.splitCurrency}) ---`);
    p.splitData.rows.forEach(r => {
      lines.push(`• ${r.branch.city}: ${r.pct}% (${fmtNum(r.amount, p.splitCurrency === 'YER' ? 0 : 2)} ${p.splitCurrency}) · ${r.authCode}`);
    });
  }
  return lines.join('\n');
}

function openAgreementModal() {
  renderAgreementModalSheet();
  const modal = document.getElementById('vip-agreement-modal');
  const statusEl = document.getElementById('agreement-action-status');
  if (statusEl) statusEl.hidden = true;
  if (modal) modal.hidden = false;
}

function closeAgreementModal() {
  const modal = document.getElementById('vip-agreement-modal');
  if (modal) modal.hidden = true;
}

function showAgreementStatus(msg) {
  const statusEl = document.getElementById('agreement-action-status');
  if (!statusEl) return;
  statusEl.textContent = msg;
  statusEl.hidden = false;
}

function copyTextSafe(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      ta.remove();
      resolve();
    } catch (err) {
      ta.remove();
      reject(err);
    }
  });
}

function bindVipEvents() {
  const menuBtn = document.getElementById('vip-menu-btn');
  const drawer = document.getElementById('vip-mobile-drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const open = drawer.hidden;
      drawer.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.getElementById('vip-header-agreement-btn')?.addEventListener('click', openAgreementModal);
  document.getElementById('btn-open-agreement')?.addEventListener('click', openAgreementModal);
  document.getElementById('agreement-close-btn')?.addEventListener('click', closeAgreementModal);
  document.getElementById('agreement-backdrop')?.addEventListener('click', closeAgreementModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAgreementModal();
  });

  document.getElementById('agreement-print-btn')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('agreement-copy-btn')?.addEventListener('click', () => {
    const text = formatAgreementText(buildAgreementPayload());
    copyTextSafe(text)
      .then(() => showAgreementStatus('تم نسخ نص اتفاقية التسوية وتثبيت الصرف إلى الحافظة.'))
      .catch(() => showAgreementStatus('تعذّر النسخ التلقائي — استخدم زر الطباعة أو الإرسال عبر واتساب.'));
  });

  document.getElementById('agreement-wa-btn')?.addEventListener('click', () => {
    const text = formatAgreementText(buildAgreementPayload());
    showAgreementStatus('جاري فتح واتساب مكتب كبار العملاء VIP لاعتماد الاتفاقية.');
    window.open(`https://wa.me/${EX_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  document.querySelectorAll('.vip-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const ref = btn.dataset.ref;
      const inp = document.getElementById('vip-track-input');
      if (inp) inp.value = ref;
      renderVipTracker(ref);
    });
  });

  document.getElementById('vip-track-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const ref = document.getElementById('vip-track-input')?.value || '';
    renderVipTracker(ref);
  });

  document.getElementById('vip-split-enabled')?.addEventListener('change', e => {
    vipState.splitEnabled = e.target.checked;
  });

  document.getElementById('vip-split-amount')?.addEventListener('input', e => {
    vipState.splitAmount = Math.max(0, Number(e.target.value) || 0);
    renderCashSplit();
  });

  document.getElementById('vip-split-currency')?.addEventListener('change', e => {
    vipState.splitCurrency = e.target.value;
    renderCashSplit();
  });

  document.getElementById('vip-split-normalize')?.addEventListener('click', () => {
    const sum = vipState.splitShares.reduce((a, b) => a + b, 0);
    if (sum <= 0) {
      vipState.splitShares = [50, 30, 20];
    } else {
      const scaled = vipState.splitShares.map(v => Math.round((v / sum) * 100));
      const diff = 100 - scaled.reduce((a, b) => a + b, 0);
      scaled[0] = Math.max(0, scaled[0] + diff);
      vipState.splitShares = scaled;
    }
    renderCashSplit();
  });

  document.querySelectorAll('.split-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parts = btn.dataset.split.split(',').map(Number);
      if (parts.length === 3) {
        vipState.splitShares = parts;
        document.querySelectorAll('.split-preset-btn').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        renderCashSplit();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTelemetryAndHeroBoard();
  renderVolumeTiers();
  renderSupplierDesks();
  updateSettlementConsole();
  renderSpreadMatrix();
  renderVipTracker(vipState.activeRef, 3);
  populateSplitCurrency();
  renderCashSplit();
  renderInfrastructure();
  bindVipEvents();
});
