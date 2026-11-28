/* =========================================================
   app.js — الريان للصرافة والتحويلات المالية (الفئة الفاخرة Pro)
   Two-Way Multi-Currency Converter + Cross-Border Remittance Corridors
   + 4-Stage Tracker + Branch Explorer + Instant Rate-Lock Slip
   ========================================================= */
'use strict';

const PRO_SVG = {
  send: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  globe: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  briefcase: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  shield: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  dot: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg>'
};

const CORRIDORS = {
  riyadh: {
    id: 'riyadh',
    originName: 'الرياض — السعودية',
    shortLabel: 'ممر الرياض',
    currency: 'SAR',
    feeRate: 0.008,
    minFee: 15,
    maxFee: 140,
    eta: '10 – 20 دقيقة',
    channel: 'تسليم فوري عبر شبكة الخليج',
    complianceTag: 'إشعار مباشر بالرقم المرجعي'
  },
  dubai: {
    id: 'dubai',
    originName: 'دبي — الإمارات',
    shortLabel: 'ممر دبي',
    currency: 'AED',
    feeRate: 0.0085,
    minFee: 15,
    maxFee: 145,
    eta: '10 – 25 دقيقة',
    channel: 'شبكة الوكلاء المعتمدين بالإمارات',
    complianceTag: 'ربط إلكتروني فوري مع الفروع'
  },
  doha: {
    id: 'doha',
    originName: 'الدوحة — قطر',
    shortLabel: 'ممر الدوحة',
    currency: 'USD',
    feeRate: 0.01,
    minFee: 8,
    maxFee: 65,
    eta: '15 – 30 دقيقة',
    channel: 'تسوية دولارية مباشرة عبر المراسلين',
    complianceTag: 'تحويل موثق بسعر الصرف اليومي'
  },
  europe: {
    id: 'europe',
    originName: 'أوروبا — منطقة اليورو',
    shortLabel: 'ممر أوروبا',
    currency: 'EUR',
    feeRate: 0.0125,
    minFee: 12,
    maxFee: 95,
    eta: '2 – 6 ساعات عمل',
    channel: 'تحويل SEPA / مراسلين أوروبيين',
    complianceTag: 'مطابقة IBAN وإفصاح كامل'
  }
};

const REMITTANCE_RECORDS = {
  'RY-4091': {
    ref: 'RY-4091',
    route: 'الرياض (السعودية) ← صنعاء — المركز الرئيسي',
    amountDisplay: '15,000 SAR',
    payoutDisplay: '2,122,500 ر.ي',
    currentStep: 3,
    statusText: 'جاهزة للتسليم بالفرع',
    isComplete: false,
    updatedAt: 'اليوم · 02:18 م',
    steps: [
      {
        title: 'استلام الحوالة بالمنشأ',
        facility: 'مكتب المراسل المعتمد — الرياض',
        doc: 'سند إيداع #RYD-9041 · تم التحقق من الهوية',
        detail: 'تم استلام مبلغ 15,000 ريال سعودي وإصدار الرقم المرجعي RY-4091 وتمريره إلى المقاصة المركزية.'
      },
      {
        title: 'المطابقة وتثبيت الصرف',
        facility: 'غرفة المقاصة المركزية — الريان',
        doc: 'تثبيت سعر الشراء الرسمي: 141.5 ر.ي',
        detail: 'تمت مراجعة الامتثال واعتماد معادل الريال اليمني بدقة تامة وربط العملية بفرع شارع الزبيري.'
      },
      {
        title: 'تخصيص السيولة بالفرع',
        facility: 'صنعاء — المركز الرئيسي (شارع الزبيري)',
        doc: 'أمر صرف نقدي نشط #SNA-4091',
        detail: 'السيولة النقدية مخصصة وجاهزة في شباك التسليم بالمركز الرئيسي؛ يرجى حضور المستفيد بأصل الهوية.'
      },
      {
        title: 'الصرف والتوثيق النهائي',
        facility: 'شباك تسليم الحوالات — صنعاء',
        doc: 'بانتظار توقيع المستفيد وإغلاق القيد',
        detail: 'سيصدر إشعار التسليم النهائي للمرسل فور استلام المستفيد للمبلغ من الفرع.'
      }
    ]
  },
  'RY-8820': {
    ref: 'RY-8820',
    route: 'دبي (الإمارات) ← عدن — فرع المنصورة',
    amountDisplay: '4,500 AED',
    payoutDisplay: '648,900 ر.ي',
    currentStep: 4,
    statusText: 'مكتملة — تم الصرف',
    isComplete: true,
    updatedAt: 'اليوم · 11:42 ص',
    steps: [
      {
        title: 'استلام الحوالة بالمنشأ',
        facility: 'مركز الصرافة الشريك — دبي',
        doc: 'إيصال تحويل دولي #DXB-8820',
        detail: 'تم قيد الحوالة الواردة من دبي بقيمة 4,500 درهم إماراتي وتسجيل بيانات المستفيد في عدن.'
      },
      {
        title: 'المطابقة وتثبيت الصرف',
        facility: 'غرفة المقاصة المركزية — الريان',
        doc: 'تثبيت سعر الشراء الرسمي: 144.2 ر.ي',
        detail: 'اكتملت مطابقة المستفيد واعتماد القيمة الصافية بالريال اليمني دون خصومات خفية.'
      },
      {
        title: 'تخصيص السيولة بالفرع',
        facility: 'عدن — فرع المنصورة (شارع التسعين)',
        doc: 'إذن صرف معتمد #ADE-8820',
        detail: 'تم تأكيد توافر المبلغ في خزينة فرع المنصورة وإرسال رسالة الإشعار لهاتف المستفيد.'
      },
      {
        title: 'الصرف والتوثيق النهائي',
        facility: 'شباك الصرف الفوري — فرع المنصورة',
        doc: 'مغلق ومسلّم بالكامل · سند #99210',
        detail: 'تم تسليم كامل المبلغ للمستفيد بعد التحقق من أصل البطاقة الشخصية وأرشفة السند الإلكتروني.'
      }
    ]
  },
  'RY-1154': {
    ref: 'RY-1154',
    route: 'الدوحة / أوروبا ← تعز — فرع التحرير',
    amountDisplay: '2,200 USD',
    payoutDisplay: '1,168,200 ر.ي',
    currentStep: 2,
    statusText: 'قيد التدقيق والمقاصة',
    isComplete: false,
    updatedAt: 'اليوم · 03:05 م',
    steps: [
      {
        title: 'استلام الحوالة بالمنشأ',
        facility: 'مراسل الدوحة المعتمد',
        doc: 'قيد صادر #DOH-1154',
        detail: 'تم استلام مبلغ 2,200 دولار أمريكي وإدخال بيانات المستلم في محافظة تعز بنجاح.'
      },
      {
        title: 'المطابقة وتثبيت الصرف',
        facility: 'غرفة الامتثال والخزينة — الريان',
        doc: 'مطابقة الاسم الرباعي وسعر الصرف (531.0 ر.ي)',
        detail: 'الحوالة في مرحلة التدقيق الآلي النهائي تمهيداً لإطلاق أمر الصرف الفوري نحو فرع التحرير.'
      },
      {
        title: 'تخصيص السيولة بالفرع',
        facility: 'تعز — فرع التحرير (شارع جمال)',
        doc: 'مجدول خلال الدقائق القادمة',
        detail: 'بمجرد انتهاء المطابقة سيتم تفعيل إشعار الجاهزية عبر شباك فرع التحرير.'
      },
      {
        title: 'الصرف والتوثيق النهائي',
        facility: 'شباك التسليم — تعز',
        doc: 'مرحلة الصرف عند حضور المستفيد',
        detail: 'يتاح الاستلام فور وصول إشعار الاعتماد طوال ساعات الدوام من 8:30 ص حتى 8:00 م.'
      }
    ]
  }
};

const proState = {
  convMode: 'buy',        // 'buy' | 'sell'
  convDirection: 'f2y',   // 'f2y' (foreign -> YER) | 'y2f' (YER -> foreign)
  convCurrency: 'SAR',
  convAmount: 1000,
  corridorId: 'riyadh',
  corridorAmount: 2500,
  corridorPayout: 'yer',
  selectedBranchCity: 'صنعاء — المركز الرئيسي',
  branchFilter: 'all',
  activeRef: 'RY-4091',
  selectedTrackStep: 3,
  slipSource: 'converter',
  lockRefCode: 'RY-PRO-4820'
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

function renderTickerAndRates() {
  const currencies = getCurrencies();
  const tickerEl = document.getElementById('pro-ticker-pills');
  if (tickerEl) {
    tickerEl.innerHTML = currencies.map(c =>
      `<span class="ticker-chip">${c.code} <b>${c.buyYer.toFixed(1)}</b> / ${c.sellYer.toFixed(1)}</span>`
    ).join('');
  }

  const tbody = document.getElementById('pro-rates-body');
  if (tbody) {
    tbody.innerHTML = currencies.map(c => {
      const spread = (c.sellYer - c.buyYer).toFixed(2);
      const spreadPct = (((c.sellYer - c.buyYer) / c.buyYer) * 100).toFixed(2);
      return `
        <tr>
          <td>${c.name}</td>
          <td><span class="code-badge num-font">${c.code}/YER</span></td>
          <td class="buy-val num-font">${c.buyYer.toFixed(1)}</td>
          <td class="sell-val num-font">${c.sellYer.toFixed(1)}</td>
          <td><span class="spread-chip num-font">${spread} ر.ي (${spreadPct}%)</span></td>
          <td>
            <button type="button" class="btn-board-pick" data-pick-curr="${c.code}">
              تطبيق في المحوّل
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('[data-pick-curr]').forEach(btn => {
      btn.addEventListener('click', () => {
        proState.convCurrency = btn.dataset.pickCurr;
        const sel = document.getElementById('pro-conv-curr');
        if (sel) sel.value = proState.convCurrency;
        syncConverterUI();
        document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}

function populateConverterSelects() {
  const currencies = getCurrencies();
  const sel = document.getElementById('pro-conv-curr');
  if (sel) {
    sel.innerHTML = currencies.map(c =>
      `<option value="${c.code}">${c.name} (${c.code})</option>`
    ).join('');
    sel.value = proState.convCurrency;
  }

  const pillsEl = document.getElementById('pro-curr-pills');
  if (pillsEl) {
    pillsEl.innerHTML = currencies.map(c => `
      <button type="button" class="curr-pill ${c.code === proState.convCurrency ? 'active' : ''}" data-curr="${c.code}">
        <strong>${c.code}</strong>
        <small>${c.name}</small>
      </button>
    `).join('');

    pillsEl.querySelectorAll('.curr-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        proState.convCurrency = btn.dataset.curr;
        if (sel) sel.value = proState.convCurrency;
        syncConverterUI();
      });
    });
  }
}

function renderAmountPresets() {
  const wrap = document.getElementById('pro-amount-presets');
  if (!wrap) return;
  const presets = proState.convDirection === 'f2y'
    ? [500, 1000, 5000, 10000]
    : [100000, 250000, 500000, 1000000];
  wrap.innerHTML = presets.map(v =>
    `<button type="button" class="preset-btn" data-preset="${v}">${fmtNum(v)}</button>`
  ).join('');
  wrap.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = Number(btn.dataset.preset);
      proState.convAmount = val;
      const inp = document.getElementById('pro-conv-amount');
      if (inp) inp.value = val;
      calcTwoWayConverter();
    });
  });
}

function calcTwoWayConverter() {
  const curr = getCurrencyObj(proState.convCurrency);
  if (!curr) return null;

  const amountInput = document.getElementById('pro-conv-amount');
  const rawAmount = Math.max(0, Number(amountInput?.value) || 0);
  proState.convAmount = rawAmount;

  const rate = proState.convMode === 'sell' ? curr.sellYer : curr.buyYer;
  const spread = (curr.sellYer - curr.buyYer).toFixed(2);

  let resultDisplay = '';
  let foreignAmount = 0;
  let yerAmount = 0;

  if (proState.convDirection === 'f2y') {
    foreignAmount = rawAmount;
    yerAmount = Math.round(rawAmount * rate);
    resultDisplay = `${fmtNum(yerAmount)} ر.ي`;
  } else {
    yerAmount = rawAmount;
    foreignAmount = rate > 0 ? rawAmount / rate : 0;
    resultDisplay = `${fmtNum(foreignAmount, 2)} ${curr.code}`;
  }

  const dirLabelEl = document.getElementById('pro-dir-label');
  const amountLabelEl = document.getElementById('pro-amount-label');
  const unitEl = document.getElementById('pro-input-unit');
  const outCaptionEl = document.getElementById('pro-output-caption');
  const rateBadgeEl = document.getElementById('pro-conv-rate-used');
  const outMainEl = document.getElementById('pro-conv-result');
  const modeNoteEl = document.getElementById('pro-conv-mode-note');
  const spreadNoteEl = document.getElementById('pro-conv-spread-note');

  if (dirLabelEl) {
    dirLabelEl.textContent = proState.convDirection === 'f2y' ? 'أجنبي إلى يمني' : 'يمني إلى أجنبي';
  }
  if (amountLabelEl) {
    amountLabelEl.textContent = proState.convDirection === 'f2y'
      ? `المبلغ بعملة ${curr.name}`
      : 'المبلغ بالريال اليمني (ر.ي)';
  }
  if (unitEl) {
    unitEl.textContent = proState.convDirection === 'f2y' ? curr.code : 'YER';
  }
  if (outCaptionEl) {
    outCaptionEl.textContent = proState.convDirection === 'f2y'
      ? 'المبلغ المقابل بالريال اليمني'
      : `القيمة المقابلة بعملة ${curr.name}`;
  }
  if (rateBadgeEl) {
    rateBadgeEl.textContent = `1 ${curr.code} = ${rate.toFixed(1)} ر.ي`;
  }
  if (outMainEl) {
    outMainEl.textContent = resultDisplay;
  }
  if (modeNoteEl) {
    modeNoteEl.textContent = proState.convMode === 'sell'
      ? 'سعر البيع للعميل في شباك الفروع'
      : 'سعر الشراء من العميل في شباك الفروع';
  }
  if (spreadNoteEl) {
    spreadNoteEl.textContent = `السبريد: ${spread} ر.ي`;
  }

  updateRateLockPreview();
  return { curr, rate, foreignAmount, yerAmount, resultDisplay };
}

function syncConverterUI() {
  document.querySelectorAll('#pro-curr-pills .curr-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.curr === proState.convCurrency);
  });
  document.querySelectorAll('.mode-tab').forEach(tab => {
    const isActive = tab.dataset.mode === proState.convMode;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });
  calcTwoWayConverter();
}

function renderCorridorTabsAndBranches() {
  const tabsEl = document.getElementById('pro-corridor-tabs');
  if (tabsEl) {
    tabsEl.innerHTML = Object.values(CORRIDORS).map(c => `
      <button type="button" class="corridor-tab ${c.id === proState.corridorId ? 'active' : ''}" data-corridor="${c.id}" role="tab" aria-selected="${c.id === proState.corridorId}">
        <strong>${c.shortLabel}</strong>
        <small class="num-font">${c.currency} · ${c.eta}</small>
      </button>
    `).join('');

    tabsEl.querySelectorAll('.corridor-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        proState.corridorId = btn.dataset.corridor;
        tabsEl.querySelectorAll('.corridor-tab').forEach(el => {
          const active = el.dataset.corridor === proState.corridorId;
          el.classList.toggle('active', active);
          el.setAttribute('aria-selected', String(active));
        });
        calcCorridor();
      });
    });
  }

  const branches = getBranches();
  const corrBranchSel = document.getElementById('corr-branch');
  const lockBranchSel = document.getElementById('lock-branch');
  const optionsHtml = branches.map(b => `<option value="${b.city}">${b.city}</option>`).join('');
  if (corrBranchSel) {
    corrBranchSel.innerHTML = optionsHtml;
    corrBranchSel.value = proState.selectedBranchCity;
  }
  if (lockBranchSel) {
    lockBranchSel.innerHTML = optionsHtml;
    lockBranchSel.value = proState.selectedBranchCity;
  }
}

function calcCorridor() {
  const corr = CORRIDORS[proState.corridorId] || CORRIDORS.riyadh;
  const currObj = getCurrencyObj(corr.currency);
  const amountEl = document.getElementById('corr-amount');
  const branchEl = document.getElementById('corr-branch');
  const payoutEl = document.getElementById('corr-payout');

  const sendAmount = Math.max(0, Number(amountEl?.value) || 0);
  proState.corridorAmount = sendAmount;
  if (branchEl?.value) proState.selectedBranchCity = branchEl.value;
  if (payoutEl?.value) proState.corridorPayout = payoutEl.value;

  const rawFee = sendAmount * corr.feeRate;
  const fee = sendAmount > 0 ? Math.min(corr.maxFee, Math.max(corr.minFee, rawFee)) : 0;
  const rate = currObj ? currObj.buyYer : 141.5;

  const branchObj = getBranches().find(b => b.city === proState.selectedBranchCity) || getBranches()[0];
  const payoutYer = Math.round(sendAmount * rate);

  const unitBadge = document.getElementById('corr-unit-badge');
  const etaBadge = document.getElementById('corr-eta-badge');
  const titleEl = document.getElementById('corr-title');
  const outSent = document.getElementById('corr-out-sent');
  const outFee = document.getElementById('corr-out-fee');
  const outRate = document.getElementById('corr-out-rate');
  const outBranch = document.getElementById('corr-out-branch');
  const outNet = document.getElementById('corr-out-net');
  const outNetNote = document.getElementById('corr-out-net-note');
  const metaWrap = document.getElementById('corr-route-meta');

  if (unitBadge) unitBadge.textContent = corr.currency;
  if (etaBadge) etaBadge.textContent = `تسليم خلال ${corr.eta}`;
  if (titleEl) titleEl.textContent = `${corr.originName} ← ${proState.selectedBranchCity.split('—')[0].trim()}`;
  if (outSent) outSent.textContent = `${fmtNum(sendAmount, 2)} ${corr.currency}`;
  if (outFee) outFee.textContent = `${fmtNum(fee, 2)} ${corr.currency}`;
  if (outRate) outRate.textContent = `1 ${corr.currency} = ${rate.toFixed(1)} ر.ي`;
  if (outBranch && branchObj) outBranch.textContent = `${branchObj.city} (${branchObj.hours})`;

  if (proState.corridorPayout === 'yer') {
    if (outNet) outNet.textContent = `${fmtNum(payoutYer)} ر.ي`;
    if (outNetNote) outNetNote.textContent = `تُسلم كاملة للمستفيد بسعر الشراء المعتمد (${rate.toFixed(1)} ر.ي) · والرسوم تُسدّد مع الإرسال`;
  } else {
    if (outNet) outNet.textContent = `${fmtNum(sendAmount, 2)} ${corr.currency}`;
    if (outNetNote) outNetNote.textContent = `تسليم نقدي بنفس العملة المرسلة مع سداد رسم الخدمة (${fmtNum(fee, 2)} ${corr.currency}) عند الإيداع`;
  }

  if (metaWrap) {
    metaWrap.innerHTML = `
      <div class="corr-highlight-box">
        <span>قناة التحويل</span>
        <strong>${corr.channel}</strong>
      </div>
      <div class="corr-highlight-box">
        <span>زمن التوفّر بالفرع</span>
        <strong class="num-font">${corr.eta}</strong>
      </div>
      <div class="corr-highlight-box">
        <span>الامتثال والتوثيق</span>
        <strong>${corr.complianceTag}</strong>
      </div>
    `;
  }

  updateRateLockPreview();
  return { corr, currObj, sendAmount, fee, rate, payoutYer, branchObj };
}

function renderTracker(refCode, customStep = null) {
  const cleanCode = (refCode || '').trim().toUpperCase();
  const box = document.getElementById('pro-track-result');
  if (!box) return;

  const rec = REMITTANCE_RECORDS[cleanCode];
  document.querySelectorAll('.demo-chip').forEach(ch => {
    ch.classList.toggle('active', ch.dataset.ref === cleanCode);
  });

  if (!rec) {
    box.innerHTML = `
      <div class="track-card-head">
        <div class="track-ref-title">
          <strong class="num-font">${cleanCode || 'بدون مرجع'}</strong>
          <span>الرقم غير مدرج ضمن السجلات التجريبية الفورية</span>
        </div>
        <span class="track-status-pill pending">بحاجة لتأكيد غرفة الحوالات</span>
      </div>
      <div class="step-inspector">
        <div class="step-inspector-head">
          <strong>استعلام مباشر عن المرجع</strong>
          <span>فريق الريان المباشر</span>
        </div>
        <p>للاستعلام الفوري عن حوالة خارج الأرقام التجريبية (RY-4091 / RY-8820 / RY-1154)، أرسل الرقم المرجعي إلى واتساب العمليات (${EX_CONFIG.whatsappNumber}) للتحقق اللحظي.</p>
      </div>
    `;
    return;
  }

  proState.activeRef = cleanCode;
  const activeInspect = customStep || rec.currentStep;
  proState.selectedTrackStep = activeInspect;
  const stepDetail = rec.steps[activeInspect - 1] || rec.steps[0];

  box.innerHTML = `
    <div class="track-card-head">
      <div class="track-ref-title">
        <strong class="num-font">${rec.ref}</strong>
        <span>${rec.route}</span>
      </div>
      <span class="track-status-pill ${rec.isComplete ? '' : 'pending'}">${rec.statusText}</span>
    </div>

    <div class="track-meta-strip">
      <div class="track-meta-item">
        <small>مبلغ الحوالة</small>
        <strong class="num-font">${rec.amountDisplay}</strong>
      </div>
      <div class="track-meta-item">
        <small>المعادل بالريال اليمني</small>
        <strong class="num-font">${rec.payoutDisplay}</strong>
      </div>
      <div class="track-meta-item">
        <small>آخر تحديث تشغيلي</small>
        <strong>${rec.updatedAt}</strong>
      </div>
    </div>

    <div class="steps-4" role="group" aria-label="مراحل الحوالة الأربع">
      ${rec.steps.map((st, idx) => {
        const num = idx + 1;
        const isDone = rec.isComplete ? num <= rec.currentStep : num < rec.currentStep;
        const isCurr = !rec.isComplete && num === rec.currentStep;
        const cls = isDone ? 'done' : isCurr ? 'current' : '';
        const selectedCls = num === activeInspect ? 'selected' : '';
        const icon = isDone ? PRO_SVG.check : isCurr ? PRO_SVG.clock : PRO_SVG.dot;
        return `
          <button type="button" class="step-btn ${cls} ${selectedCls}" data-track-step="${num}">
            <span class="step-num">${icon} <span>مرحلة ${num}</span></span>
            <strong>${st.title}</strong>
          </button>
        `;
      }).join('')}
    </div>

    <div class="step-inspector">
      <div class="step-inspector-head">
        <strong>${stepDetail.facility}</strong>
        <span>${stepDetail.doc}</span>
      </div>
      <p>${stepDetail.detail}</p>
    </div>
  `;

  box.querySelectorAll('[data-track-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      renderTracker(rec.ref, Number(btn.dataset.trackStep));
    });
  });
}

function renderBranchesAndServices() {
  const branches = getBranches();
  const grid = document.getElementById('pro-branches-grid');
  if (grid) {
    const filtered = proState.branchFilter === 'all'
      ? branches
      : branches.filter(b => b.city.includes(proState.branchFilter));

    grid.innerHTML = filtered.map(b => {
      const isSelected = b.city === proState.selectedBranchCity;
      return `
        <article class="branch-card ${isSelected ? 'selected' : ''}">
          <div>
            <div class="branch-top">
              <span class="branch-badge">شباك الصرف والحوالات متاح</span>
            </div>
            <h3>${b.city}</h3>
            <p class="branch-loc">${b.loc}</p>
          </div>
          <div>
            <div class="branch-hours">
              ${PRO_SVG.clock}
              <span>ساعات العمل: ${b.hours}</span>
            </div>
          </div>
          <button type="button" class="btn-branch-pick" data-branch-city="${b.city}">
            ${isSelected ? 'مختار كفرع الاستلام والتثبيت' : 'تحديد كفرع الاستلام'}
          </button>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('[data-branch-city]').forEach(btn => {
      btn.addEventListener('click', () => {
        proState.selectedBranchCity = btn.dataset.branchCity;
        const corrSel = document.getElementById('corr-branch');
        const lockSel = document.getElementById('lock-branch');
        if (corrSel) corrSel.value = proState.selectedBranchCity;
        if (lockSel) lockSel.value = proState.selectedBranchCity;
        renderBranchesAndServices();
        calcCorridor();
      });
    });
  }

  const svcGrid = document.getElementById('pro-services-grid');
  if (svcGrid) {
    svcGrid.innerHTML = getServices().map(s => `
      <article class="svc-card">
        <div class="svc-icon">${PRO_SVG[s.icon] || PRO_SVG.shield}</div>
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </article>
    `).join('');
  }
}

function buildSlipData() {
  const clientName = (document.getElementById('lock-client-name')?.value || '').trim() || 'عميل الفئة الفاخرة';
  const clientPhone = (document.getElementById('lock-client-phone')?.value || '').trim() || 'غير محدد';
  const branch = document.getElementById('lock-branch')?.value || proState.selectedBranchCity;
  const sourceType = document.getElementById('lock-source-type')?.value || proState.slipSource;
  const notes = (document.getElementById('lock-notes')?.value || '').trim() || 'لا توجد ملاحظات إضافية';

  proState.slipSource = sourceType;
  proState.selectedBranchCity = branch;

  if (sourceType === 'corridor') {
    const corr = CORRIDORS[proState.corridorId] || CORRIDORS.riyadh;
    const currObj = getCurrencyObj(corr.currency);
    const amount = proState.corridorAmount;
    const fee = amount > 0 ? Math.min(corr.maxFee, Math.max(corr.minFee, amount * corr.feeRate)) : 0;
    const rate = currObj ? currObj.buyYer : 141.5;
    const netText = proState.corridorPayout === 'yer'
      ? `${fmtNum(Math.round(amount * rate))} ر.ي`
      : `${fmtNum(amount, 2)} ${corr.currency}`;

    return {
      refCode: proState.lockRefCode,
      clientName,
      clientPhone,
      branch,
      opType: `حوالة دولية (${corr.originName})`,
      amountText: `${fmtNum(amount, 2)} ${corr.currency} (رسوم: ${fmtNum(fee, 2)} ${corr.currency})`,
      rateText: `1 ${corr.currency} = ${rate.toFixed(1)} ر.ي`,
      finalText: netText,
      notes
    };
  }

  const curr = getCurrencyObj(proState.convCurrency);
  const rate = proState.convMode === 'sell' ? curr.sellYer : curr.buyYer;
  const modeLabel = proState.convMode === 'sell' ? 'بيع عملة أجنبية للعميل' : 'شراء عملة من العميل (صرف يمني)';
  const amountText = proState.convDirection === 'f2y'
    ? `${fmtNum(proState.convAmount, 2)} ${curr.code}`
    : `${fmtNum(proState.convAmount)} ر.ي`;
  const finalText = proState.convDirection === 'f2y'
    ? `${fmtNum(Math.round(proState.convAmount * rate))} ر.ي`
    : `${fmtNum(rate > 0 ? proState.convAmount / rate : 0, 2)} ${curr.code}`;

  return {
    refCode: proState.lockRefCode,
    clientName,
    clientPhone,
    branch,
    opType: modeLabel,
    amountText,
    rateText: `1 ${curr.code} = ${rate.toFixed(1)} ر.ي`,
    finalText,
    notes
  };
}

function updateRateLockPreview() {
  const preview = document.getElementById('pro-slip-preview');
  if (!preview) return;
  const d = buildSlipData();
  preview.innerHTML = `
    <div class="slip-line"><span>رقم القسيمة المرجعي</span><strong class="num-font">${d.refCode}</strong></div>
    <div class="slip-line"><span>العميل / المؤسسة</span><strong>${d.clientName}</strong></div>
    <div class="slip-line"><span>رقم التواصل</span><strong class="num-font">${d.clientPhone}</strong></div>
    <div class="slip-line"><span>نوع العملية</span><strong>${d.opType}</strong></div>
    <div class="slip-line"><span>المبلغ الأساسي</span><strong class="num-font">${d.amountText}</strong></div>
    <div class="slip-line"><span>سعر الصرف المثبّت</span><strong class="num-font">${d.rateText}</strong></div>
    <div class="slip-line"><span>الفرع المستلم / المنفذ</span><strong>${d.branch}</strong></div>
    <div class="slip-line"><span>ملاحظات</span><strong>${d.notes}</strong></div>
    <div class="slip-line highlight"><span>صافي القيمة المعتمدة</span><strong class="num-font">${d.finalText}</strong></div>
  `;
}

function formatSlipText(d) {
  return [
    `*قسيمة تثبيت سعر الصرف — ${EX_CONFIG.companyName}*`,
    `الفئة: الفئة الفاخرة Pro`,
    `رقم القسيمة: ${d.refCode}`,
    `العميل: ${d.clientName}`,
    `الهاتف: ${d.clientPhone}`,
    `العملية: ${d.opType}`,
    `المبلغ: ${d.amountText}`,
    `السعر المثبّت: ${d.rateText}`,
    `الصافي المعتمد: ${d.finalText}`,
    `الفرع: ${d.branch}`,
    `ملاحظات: ${d.notes}`,
    `صلاحية التثبيت المبدئي: 30 دقيقة من الإرسال`
  ].join('\n');
}

function showSlipStatus(msg) {
  const el = document.getElementById('pro-slip-status');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
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

function bindEvents() {
  const menuBtn = document.getElementById('pro-menu-btn');
  const drawer = document.getElementById('pro-mobile-drawer');
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

  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      proState.convMode = tab.dataset.mode;
      syncConverterUI();
    });
  });

  document.getElementById('pro-swap-dir')?.addEventListener('click', () => {
    proState.convDirection = proState.convDirection === 'f2y' ? 'y2f' : 'f2y';
    const inp = document.getElementById('pro-conv-amount');
    if (inp) {
      const nextVal = proState.convDirection === 'f2y' ? 1000 : 250000;
      inp.value = nextVal;
      proState.convAmount = nextVal;
    }
    renderAmountPresets();
    calcTwoWayConverter();
  });

  document.getElementById('pro-conv-curr')?.addEventListener('change', e => {
    proState.convCurrency = e.target.value;
    syncConverterUI();
  });

  document.getElementById('pro-conv-amount')?.addEventListener('input', calcTwoWayConverter);

  document.getElementById('pro-sync-slip-btn')?.addEventListener('click', () => {
    proState.slipSource = 'converter';
    const srcSel = document.getElementById('lock-source-type');
    if (srcSel) srcSel.value = 'converter';
    updateRateLockPreview();
    showSlipStatus('تم إدراج بيانات المحوّل في قسيمة تثبيت السعر بنجاح.');
    document.getElementById('rate-lock')?.scrollIntoView({ behavior: 'smooth' });
  });

  ['corr-amount', 'corr-branch', 'corr-payout'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calcCorridor);
    document.getElementById(id)?.addEventListener('change', calcCorridor);
  });

  document.getElementById('corr-lock-btn')?.addEventListener('click', () => {
    proState.slipSource = 'corridor';
    const srcSel = document.getElementById('lock-source-type');
    const lockBr = document.getElementById('lock-branch');
    if (srcSel) srcSel.value = 'corridor';
    if (lockBr) lockBr.value = proState.selectedBranchCity;
    updateRateLockPreview();
    showSlipStatus('تم ترحيل بيانات الحوالة الدولية إلى قسيمة التثبيت.');
    document.getElementById('rate-lock')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('corr-wa-btn')?.addEventListener('click', () => {
    const r = calcCorridor();
    const netText = proState.corridorPayout === 'yer'
      ? `${fmtNum(r.payoutYer)} ر.ي`
      : `${fmtNum(r.sendAmount, 2)} ${r.corr.currency}`;
    const msg = [
      `*طلب حوالة دولية — ${EX_CONFIG.companyName}*`,
      `الفئة: الفئة الفاخرة Pro`,
      `الممر: ${r.corr.originName}`,
      `المبلغ المرسل: ${fmtNum(r.sendAmount, 2)} ${r.corr.currency}`,
      `رسوم التحويل: ${fmtNum(r.fee, 2)} ${r.corr.currency}`,
      `سعر الصرف: 1 ${r.corr.currency} = ${r.rate.toFixed(1)} ر.ي`,
      `صافي الاستلام: ${netText}`,
      `الفرع المستلم: ${proState.selectedBranchCity}`
    ].join('\n');
    window.open(`https://wa.me/${EX_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  document.querySelectorAll('.demo-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.ref;
      const inp = document.getElementById('pro-track-input');
      if (inp) inp.value = code;
      renderTracker(code);
    });
  });

  document.getElementById('pro-track-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const code = document.getElementById('pro-track-input')?.value || '';
    renderTracker(code);
  });

  document.querySelectorAll('#pro-branch-filters .filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      proState.branchFilter = btn.dataset.city;
      document.querySelectorAll('#pro-branch-filters .filter-pill').forEach(el => {
        el.classList.toggle('active', el === btn);
      });
      renderBranchesAndServices();
    });
  });

  ['lock-client-name', 'lock-client-phone', 'lock-branch', 'lock-source-type', 'lock-notes'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateRateLockPreview);
    document.getElementById(id)?.addEventListener('change', () => {
      if (id === 'lock-branch') {
        const val = document.getElementById('lock-branch')?.value;
        if (val) {
          proState.selectedBranchCity = val;
          renderBranchesAndServices();
        }
      }
      updateRateLockPreview();
    });
  });

  document.getElementById('pro-copy-slip-btn')?.addEventListener('click', () => {
    const text = formatSlipText(buildSlipData());
    copyTextSafe(text)
      .then(() => showSlipStatus('تم نسخ نص قسيمة تثبيت السعر إلى الحافظة بنجاح.'))
      .catch(() => showSlipStatus('تعذّر النسخ التلقائي — يمكنك الإرسال مباشرة عبر واتساب.'));
  });

  document.getElementById('pro-send-wa-btn')?.addEventListener('click', () => {
    const text = formatSlipText(buildSlipData());
    showSlipStatus('جاري تحويلك إلى واتساب الخزينة لتأكيد تثبيت السعر.');
    window.open(`https://wa.me/${EX_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTickerAndRates();
  populateConverterSelects();
  renderAmountPresets();
  renderCorridorTabsAndBranches();
  calcTwoWayConverter();
  calcCorridor();
  renderTracker(proState.activeRef, 3);
  renderBranchesAndServices();
  updateRateLockPreview();
  bindEvents();
});
