/* =========================================================
   app.js — جسر العالم للشحن الدولي (الفئة الفاخرة Pro)
   Interactive 4-Step Waybill Tracker + CBM & Mode Comparator
   ========================================================= */
'use strict';

const PRO_SVG = {
  ship: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 1v4"/></svg>',
  plane: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  warehouse: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/></svg>',
  truck: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  dot: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" aria-hidden="true"><circle cx="12" cy="12" r="6"/></svg>'
};

const WAYBILL_STAGE_LOGS = {
  'WB-1024': [
    { facility: 'مستودع غوانزو المركزي — الصين', doc: 'بوليصة تجميع #GZ-4410 · مطابقة مقاسات', detail: 'تم استلام الطرود وقياس الحجم الفعلي (4.2 م³) وتثبيت ملصقات الشحن البحري LCL.' },
    { facility: 'ميناء نانشا البحري — خط الملاحة', doc: 'بيان شحن بحري B/L معتمد', detail: 'غادرت الحاوية المجمّعة ضمن الرحلة الأسبوعية المتجهة إلى خليج عدن.' },
    { facility: 'منفذ وميناء عدن الجمركي', doc: 'البيان الجمركي قيد المراجعة والتخليص', detail: 'تم تقديم الفواتير التجارية وقائمة التعبئة لإتمام الفسح الجمركي وتحويل الشحنة لصنعاء.' },
    { facility: 'مستودع التوزيع — صنعاء', doc: 'بانتظار إشعار التسليم النهائي', detail: 'سيتم التواصل مع المستلم فور انتهاء الترسيم الجمركي ووصول الشاحنة.' }
  ],
  'WB-2048': [
    { facility: 'مركز تجميع جبل علي — دبي', doc: 'إذن استلام بري #DXB-8812', detail: 'تم استلام 3 طرود وتدقيق أرقام التشغيل والوزن الإجمالي قبل التحميل.' },
    { facility: 'المنفذ البري الحدودي — البطحاء', doc: 'مانيفست نقل بري سريع', detail: 'انطلقت الشاحنة المخصّصة بنظام التتبع المباشر واجتازت التفتيش الحدودي دون ملاحظات.' },
    { facility: 'جمرك المنفذ — الرياض', doc: 'شهادة فسح جمركي مكتملة', detail: 'تم إنهاء الرسوم الجمركية والمطابقة المستندية وإصدار تصريح الخروج.' },
    { facility: 'مستودع التسليم — الرياض', doc: 'مكتمل — جاهز للاستلام', detail: 'الشحنة متوفرة في رصيف التسليم وجاهزة للاستلام بموجب رقم البوليصة.' }
  ],
  'WB-3090': [
    { facility: 'مستودع التغليف — إسطنبول', doc: 'قائمة تعبئة جوية AWB #IST-3090', detail: 'تم إعادة تدعيم التغليف ووزن الشحنة (85 كجم) وتجهيزها للمناولة الجوية.' },
    { facility: 'مطار إسطنبول الدولي — الشحن الجوي', doc: 'فحص أمني وإقلاع جوي نشط', detail: 'الشحنة على متن رحلة الشحن الجوي المتجهة لمطار عدن مع أولوية مناولة.' },
    { facility: 'جمرك المطار — محطة الوصول', doc: 'تحضير ملف التخليص المسبق', detail: 'الوثائق مرسلة إلكترونياً لفريق التخليص لتسريع الفسح فور الهبوط.' },
    { facility: 'مكتب التسليم — عدن / صنعاء', doc: 'مرحلة التسليم المجدولة', detail: 'يُسلّم الطرد للعميل أو يُعاد توجيهه داخلياً فور انتهاء إجراءات المطار.' }
  ]
};

const ROUTE_PROFILES = {
  china: {
    label: 'الصين (غوانزو / إيوو) ← اليمن ودول الخليج',
    originValue: 'الصين (غوانزو / إيوو)',
    defaultDest: 'صنعاء',
    airRatePerKg: 7.4,
    airMinUsd: 95,
    airTransit: '5 – 7 أيام',
    seaRatePerCbm: 155,
    seaMinCbm: 0.5,
    seaMinUsd: 110,
    seaTransit: '25 – 32 يوماً',
    landRatePerKg: 3.1,
    landBaseUsd: 135,
    landTransit: '29 – 35 يوماً (بحري + بري مكمّل)',
    landLabel: 'نقل متعدد (ميناء + بري داخلي)',
    landNote: 'شحن بحري للميناء + توصيل بري للمستودع'
  },
  uae: {
    label: 'الإمارات (دبي / جبل علي) ← صنعاء / عدن / الرياض',
    originValue: 'الإمارات (دبي / جبل علي)',
    defaultDest: 'الرياض / جدة',
    airRatePerKg: 4.8,
    airMinUsd: 70,
    airTransit: '2 – 4 أيام',
    seaRatePerCbm: 92,
    seaMinCbm: 0.5,
    seaMinUsd: 80,
    seaTransit: '6 – 10 أيام',
    landRatePerKg: 1.55,
    landBaseUsd: 65,
    landTransit: '4 – 7 أيام',
    landLabel: 'الشحن البري السريع (Land Freight)',
    landNote: 'نقل بري مباشر بالشاحنات عبر المنافذ'
  },
  ksa: {
    label: 'السعودية (جدة / الرياض) ← كافة المحافظات اليمنية',
    originValue: 'السعودية (جدة / الرياض)',
    defaultDest: 'صنعاء',
    airRatePerKg: 4.2,
    airMinUsd: 65,
    airTransit: '2 – 3 أيام',
    seaRatePerCbm: 85,
    seaMinCbm: 0.5,
    seaMinUsd: 75,
    seaTransit: '5 – 8 أيام',
    landRatePerKg: 1.25,
    landBaseUsd: 55,
    landTransit: '3 – 6 أيام',
    landLabel: 'الشحن البري المباشر (Land Freight)',
    landNote: 'خط بري منتظم مع تخليص منفذ الوديعة'
  },
  turkey: {
    label: 'تركيا وأوروبا ← الخليج واليمن',
    originValue: 'تركيا وأوروبا',
    defaultDest: 'عدن',
    airRatePerKg: 6.5,
    airMinUsd: 85,
    airTransit: '4 – 6 أيام',
    seaRatePerCbm: 140,
    seaMinCbm: 0.5,
    seaMinUsd: 105,
    seaTransit: '16 – 22 يوماً',
    landRatePerKg: 2.8,
    landBaseUsd: 120,
    landTransit: '18 – 25 يوماً (متعدد الوسائط)',
    landLabel: 'نقل مشترك (ميناء + شاحنة)',
    landNote: 'ربط بحري أو جوي يتبعه توصيل بري داخلي'
  }
};

const CBM_PRESETS = {
  'air-sample': { length: 42, width: 32, height: 28, count: 3, weight: 28 },
  'commercial-batch': { length: 60, width: 40, height: 50, count: 12, weight: 185 },
  'bulky-cargo': { length: 85, width: 65, height: 70, count: 18, weight: 520 }
};

const proState = {
  activeCode: 'WB-1024',
  inspectedStep: 2,
  selectedMode: 'sea',
  lastCalc: null
};

function resolveLocalImage(rawPath) {
  if (!rawPath) return '../assets/images/ship.jpg';
  const fileName = rawPath.split('/').pop();
  return `../assets/images/${fileName}`;
}

function renderWaybillTracker(code, forcedStep) {
  const output = document.getElementById('pro-track-result');
  if (!output || typeof SHIP_DATA === 'undefined') return;

  const normalized = (code || '').trim().toUpperCase();
  const info = SHIP_DATA.demoTracking[normalized];

  document.querySelectorAll('.demo-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.code === normalized);
  });

  if (!info) {
    output.innerHTML = `
      <div class="track-error-box">
        رقم البوليصة <span class="num-font">${escapeHtml(normalized || '---')}</span> غير مسجل في بيانات العرض التجريبي. جرّب <span class="num-font">WB-1024</span> أو <span class="num-font">WB-2048</span> أو <span class="num-font">WB-3090</span>.
      </div>
    `;
    return;
  }

  proState.activeCode = normalized;
  const maxStep = info.steps.length - 1;
  const currentStep = Math.min(Math.max(info.stepIndex, 0), maxStep);
  const inspected = typeof forcedStep === 'number'
    ? Math.min(Math.max(forcedStep, 0), maxStep)
    : currentStep;
  proState.inspectedStep = inspected;

  const progressPct = Math.round(((currentStep + 1) / info.steps.length) * 100);
  const isCompleted = currentStep >= maxStep;
  const logs = WAYBILL_STAGE_LOGS[normalized] || [];
  const activeLog = logs[inspected] || {
    facility: 'مركز العمليات اللوجستية',
    doc: 'تحديث تشغيلي مسجل',
    detail: info.steps[inspected] || ''
  };

  const stepStateLabel = inspected < currentStep
    ? { text: 'مرحلة مكتملة', cls: 'done' }
    : inspected === currentStep
      ? { text: isCompleted ? 'تم الإنجاز' : 'المرحلة الحالية', cls: isCompleted ? 'done' : 'current' }
      : { text: 'مرحلة قادمة', cls: 'upcoming' };

  const nodesHtml = info.steps.map((stepTitle, idx) => {
    let cls = 'milestone-node';
    let iconSvg = PRO_SVG.dot;
    if (idx < currentStep || (isCompleted && idx === currentStep)) {
      cls += ' done';
      iconSvg = PRO_SVG.check;
    } else if (idx === currentStep) {
      cls += ' current';
      iconSvg = PRO_SVG.clock;
    }
    if (idx === inspected) cls += ' inspected';

    return `
      <button type="button" class="${cls}" data-step-index="${idx}" aria-pressed="${idx === inspected}">
        <span class="node-head">
          <span class="num-font">0${idx + 1}</span>
          ${iconSvg}
        </span>
        <span class="node-title">${escapeHtml(stepTitle)}</span>
      </button>
    `;
  }).join('');

  output.innerHTML = `
    <div class="waybill-meta-top">
      <div>
        <span class="waybill-code-tag">${escapeHtml(normalized)}</span>
        <div class="waybill-route">${escapeHtml(info.route)}</div>
        <div class="waybill-type">${escapeHtml(info.type)}</div>
      </div>
      <span class="waybill-eta-pill ${isCompleted ? 'arrived' : ''}">${escapeHtml(info.eta)}</span>
    </div>

    <div class="milestone-progress-bar" role="progressbar" aria-valuenow="${progressPct}" aria-valuemin="0" aria-valuemax="100">
      <div class="milestone-progress-fill" style="width: ${progressPct}%;"></div>
    </div>

    <div class="milestone-grid" role="tablist" aria-label="مراحل رحلة الشحنة">${nodesHtml}</div>

    <div class="milestone-inspector">
      <div class="inspector-top">
        <strong>المرحلة <span class="num-font">0${inspected + 1}</span>: ${escapeHtml(info.steps[inspected])}</strong>
        <span class="inspector-status ${stepStateLabel.cls}">${stepStateLabel.text}</span>
      </div>
      <p class="inspector-desc">${escapeHtml(activeLog.detail)}</p>
      <div class="inspector-meta">
        <span>الموقع: ${escapeHtml(activeLog.facility)}</span>
        <span>الوثيقة: ${escapeHtml(activeLog.doc)}</span>
      </div>
    </div>
  `;

  output.querySelectorAll('.milestone-node').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.stepIndex);
      renderWaybillTracker(proState.activeCode, idx);
    });
  });
}

function getSafePositive(id, fallback, minVal) {
  const el = document.getElementById(id);
  const parsed = Number(el?.value);
  if (!Number.isFinite(parsed) || parsed < minVal) return fallback;
  return parsed;
}

function computeFreightModels() {
  const length = getSafePositive('cbm-length', 60, 1);
  const width = getSafePositive('cbm-width', 40, 1);
  const height = getSafePositive('cbm-height', 50, 1);
  const count = Math.round(getSafePositive('cbm-count', 1, 1));
  const actualKg = getSafePositive('cbm-weight', 10, 0.5);
  const routeKey = document.getElementById('cbm-route')?.value || 'china';
  const profile = ROUTE_PROFILES[routeKey] || ROUTE_PROFILES.china;

  const singleCbm = (length * width * height) / 1000000;
  const totalCbm = singleCbm * count;
  const airVolKg = (length * width * height * count) / 6000;
  const chargeableKg = Math.max(actualKg, airVolKg);
  const seaWm = Math.max(totalCbm, actualKg / 1000);
  const billedSeaWm = Math.max(seaWm, profile.seaMinCbm);
  const density = totalCbm > 0 ? actualKg / totalCbm : 0;

  // Volume discount tier for larger shipments
  const airTierFactor = chargeableKg >= 300 ? 0.9 : chargeableKg >= 100 ? 0.95 : 1;
  const airCost = Math.max(profile.airMinUsd, Math.round(chargeableKg * profile.airRatePerKg * airTierFactor));

  const seaTierFactor = billedSeaWm >= 8 ? 0.88 : billedSeaWm >= 3 ? 0.94 : 1;
  const seaCost = Math.max(profile.seaMinUsd, Math.round(billedSeaWm * profile.seaRatePerCbm * seaTierFactor));

  const landChargeable = Math.max(actualKg, totalCbm * 250);
  const landCost = Math.max(profile.landBaseUsd, Math.round(landChargeable * profile.landRatePerKg));

  const modes = [
    {
      key: 'air',
      quoteModeValue: 'الشحن الجوي السريع (Air Express)',
      title: 'الشحن الجوي السريع (Air Express)',
      icon: PRO_SVG.plane,
      cost: airCost,
      transit: profile.airTransit,
      unitText: `حوالي $${(profile.airRatePerKg * airTierFactor).toFixed(2)} / كجم`,
      basisLabel: 'الوزن المعتمد',
      basisValue: `${chargeableKg.toFixed(1)} kg`,
      note: 'أولوية وصول للمستودع والمطار'
    },
    {
      key: 'sea',
      quoteModeValue: 'الشحن البحري المجمّع (Sea LCL)',
      title: 'الشحن البحري المجمّع (Sea LCL)',
      icon: PRO_SVG.ship,
      cost: seaCost,
      transit: profile.seaTransit,
      unitText: `حوالي $${Math.round(profile.seaRatePerCbm * seaTierFactor)} / W/M`,
      basisLabel: 'الوحدة البحرية',
      basisValue: `${billedSeaWm.toFixed(2)} CBM`,
      note: billedSeaWm > seaWm ? `حد أدنى ${profile.seaMinCbm} CBM` : 'تجميع أسبوعي منتظم'
    },
    {
      key: 'land',
      quoteModeValue: 'الشحن البري (Land Freight)',
      title: profile.landLabel,
      icon: PRO_SVG.truck,
      cost: landCost,
      transit: profile.landTransit,
      unitText: `حوالي $${profile.landRatePerKg.toFixed(2)} / كجم مكافئ`,
      basisLabel: 'الوزن المكافئ',
      basisValue: `${landChargeable.toFixed(1)} kg`,
      note: profile.landNote
    }
  ];

  const minCost = Math.min(...modes.map((m) => m.cost));

  const result = {
    length,
    width,
    height,
    count,
    actualKg,
    singleCbm,
    totalCbm,
    airVolKg,
    chargeableKg,
    seaWm,
    density,
    routeKey,
    profile,
    modes,
    minCost
  };

  proState.lastCalc = result;
  return result;
}

function renderCalculatorAndComparator() {
  const calc = computeFreightModels();

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('out-total-cbm', `${calc.totalCbm.toFixed(3)} m³`);
  setText('out-single-cbm', `${calc.singleCbm.toFixed(3)} m³ / للكرتون`);
  setText('out-vol-weight', `${calc.airVolKg.toFixed(1)} kg`);
  setText('out-chargeable-kg', `${calc.chargeableKg.toFixed(1)} kg`);
  setText('out-sea-wm', `${calc.seaWm.toFixed(3)} FT`);

  const governedByVol = calc.airVolKg > calc.actualKg;
  setText('out-governing-basis', governedByVol ? 'يحكمها الوزن الحجمي' : 'يحكمها الوزن الفعلي');
  setText('out-density-ratio', `${calc.density.toFixed(1)} kg/m³`);

  const densityPct = Math.min(100, Math.max(12, Math.round((calc.density / 320) * 100)));
  const densityBar = document.getElementById('out-density-bar');
  if (densityBar) densityBar.style.width = `${densityPct}%`;

  const densityNote = governedByVol
    ? `الحجم الكلي يتجاوز كثافة الشحن الجوي القياسية (167 kg/m³)، لذا يُحتسب الوزن الحجمي (${calc.airVolKg.toFixed(1)} كجم) في الجوي، ويكون البحري LCL أكثر كفاءة.`
    : `الكثافة عالية (${calc.density.toFixed(1)} kg/m³) والوزن الفعلي هو الأعلى؛ قارن فرق التكلفة أدناه لاختيار التوازن الأنسب بين الزمن والسعر.`;
  setText('out-density-note', densityNote);

  setText('comp-route-caption', `المسار المحدد: ${calc.profile.label}`);

  const cardsWrap = document.getElementById('comparator-cards');
  if (cardsWrap) {
    cardsWrap.innerHTML = calc.modes.map((m) => {
      const isCheapest = m.cost === calc.minCost;
      const isSelected = proState.selectedMode === m.key;
      let badgeHtml = '<span class="mode-badge">خيار قياسي</span>';
      if (isCheapest) {
        badgeHtml = '<span class="mode-badge best">الأوفر تكلفة</span>';
      } else if (m.key === 'air') {
        badgeHtml = '<span class="mode-badge fastest">الأسرع وصولاً</span>';
      }

      return `
        <article class="mode-card ${isCheapest ? 'is-best-value' : ''} ${isSelected ? 'is-selected' : ''}">
          <div>
            <div class="mode-card-top">
              <div class="mode-icon">${m.icon}</div>
              ${badgeHtml}
            </div>
            <h4 class="mode-title">${escapeHtml(m.title)}</h4>
            <div class="mode-price num-font">$${m.cost.toLocaleString('en-US')}</div>
            <div class="mode-unit-rate">${escapeHtml(m.unitText)}</div>
          </div>

          <ul class="mode-specs">
            <li><span>مدة الوصول</span><strong class="num-font">${escapeHtml(m.transit)}</strong></li>
            <li><span>${escapeHtml(m.basisLabel)}</span><strong class="num-font">${escapeHtml(m.basisValue)}</strong></li>
            <li><span>التشغيل</span><strong>${escapeHtml(m.note)}</strong></li>
          </ul>

          <button type="button" class="btn-choose-mode" data-choose-mode="${m.key}">
            ${isSelected ? 'مختارة — اعتماد في التسعيرة' : 'اعتماد هذه الوسيلة للتسعير'}
          </button>
        </article>
      `;
    }).join('');

    cardsWrap.querySelectorAll('[data-choose-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        proState.selectedMode = btn.dataset.chooseMode;
        renderCalculatorAndComparator();
        syncCalculatorToQuote(true);
      });
    });
  }

  syncCalculatorToQuote(false);
}

function syncCalculatorToQuote(scrollToForm) {
  const calc = proState.lastCalc;
  if (!calc) return;

  const chosen = calc.modes.find((m) => m.key === proState.selectedMode) || calc.modes[1];
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('q-sum-cbm', `${calc.totalCbm.toFixed(3)} m³`);
  setText('q-sum-actual', `${calc.actualKg.toFixed(1)} kg`);
  setText('q-sum-charge', `${calc.chargeableKg.toFixed(1)} kg`);
  setText('q-sum-est', `$${chosen.cost.toLocaleString('en-US')}`);

  const originEl = document.getElementById('q-origin');
  const destEl = document.getElementById('q-dest');
  const modeEl = document.getElementById('q-mode');
  const specsEl = document.getElementById('q-specs');

  if (originEl) originEl.value = calc.profile.originValue;
  if (destEl && scrollToForm) destEl.value = calc.profile.defaultDest;
  if (modeEl) modeEl.value = chosen.quoteModeValue;
  if (specsEl) {
    specsEl.value = `${calc.count} كرتون (${calc.length}x${calc.width}x${calc.height} سم) · ${calc.totalCbm.toFixed(3)} CBM · فعلي ${calc.actualKg.toFixed(1)} كجم · محتسب ${calc.chargeableKg.toFixed(1)} كجم (~$${chosen.cost})`;
  }

  if (scrollToForm) {
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderServices() {
  const wrap = document.getElementById('pro-services');
  if (!wrap || typeof SHIP_DATA === 'undefined') return;

  wrap.innerHTML = SHIP_DATA.services.map((svc) => `
    <article class="svc-card">
      <div class="svc-media">
        <img src="${resolveLocalImage(svc.image)}" alt="${escapeHtml(svc.title)}" loading="lazy">
      </div>
      <div class="svc-body">
        <div class="svc-icon-box">${PRO_SVG[svc.icon] || PRO_SVG.ship}</div>
        <h3>${escapeHtml(svc.title)}</h3>
        <p>${escapeHtml(svc.desc)}</p>
      </div>
    </article>
  `).join('');
}

function renderRoutes() {
  const wrap = document.getElementById('pro-routes');
  if (!wrap || typeof SHIP_DATA === 'undefined') return;

  const routeKeyMap = ['china', 'uae', 'ksa', 'turkey'];

  wrap.innerHTML = SHIP_DATA.routes.map((route, idx) => {
    const key = routeKeyMap[idx] || 'china';
    return `
      <div class="route-card">
        <div class="route-info">
          <strong>${escapeHtml(route.from)} &larr; ${escapeHtml(route.to)}</strong>
          <span>المدة التقديرية: ${escapeHtml(route.transit)}</span>
        </div>
        <div class="route-actions">
          <span class="route-badge">${escapeHtml(route.mode)}</span>
          <button type="button" class="route-apply-btn" data-apply-route="${key}">تطبيق بالحاسبة</button>
        </div>
      </div>
    `;
  }).join('');

  wrap.querySelectorAll('[data-apply-route]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const routeSelect = document.getElementById('cbm-route');
      if (routeSelect) routeSelect.value = btn.dataset.applyRoute;
      renderCalculatorAndComparator();
      document.getElementById('cbm-engine')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer
  const menuBtn = document.getElementById('pro-menu-btn');
  const drawer = document.getElementById('pro-mobile-drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !drawer.hidden;
      drawer.hidden = isOpen;
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Initial Renders
  renderWaybillTracker('WB-1024');
  renderCalculatorAndComparator();
  renderServices();
  renderRoutes();

  // Waybill Tracker Events
  document.getElementById('pro-track-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = document.getElementById('pro-track-input')?.value;
    renderWaybillTracker(val);
  });

  document.querySelectorAll('.demo-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const inp = document.getElementById('pro-track-input');
      if (inp) inp.value = chip.dataset.code;
      renderWaybillTracker(chip.dataset.code);
    });
  });

  // CBM Inputs & Presets
  ['cbm-length', 'cbm-width', 'cbm-height', 'cbm-count', 'cbm-weight', 'cbm-route'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => renderCalculatorAndComparator());
    el.addEventListener('change', () => renderCalculatorAndComparator());
  });

  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = CBM_PRESETS[btn.dataset.preset];
      if (!preset) return;
      document.querySelectorAll('.preset-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const setVal = (id, v) => {
        const el = document.getElementById(id);
        if (el) el.value = String(v);
      };
      setVal('cbm-length', preset.length);
      setVal('cbm-width', preset.width);
      setVal('cbm-height', preset.height);
      setVal('cbm-count', preset.count);
      setVal('cbm-weight', preset.weight);
      renderCalculatorAndComparator();
    });
  });

  document.getElementById('sync-all-to-quote')?.addEventListener('click', () => {
    syncCalculatorToQuote(true);
  });

  // Quote Form -> WhatsApp 967782259937 tagged "الفئة الفاخرة Pro"
  document.getElementById('pro-quote-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const origin = document.getElementById('q-origin')?.value || '';
    const dest = document.getElementById('q-dest')?.value || '';
    const mode = document.getElementById('q-mode')?.value || '';
    const specs = document.getElementById('q-specs')?.value.trim() || '';
    const goods = document.getElementById('q-goods')?.value.trim() || '';
    const client = document.getElementById('q-client')?.value.trim() || '';
    const notes = document.getElementById('q-notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

    const companyName = typeof SHIP_CONFIG !== 'undefined' ? SHIP_CONFIG.companyName : 'جسر العالم للشحن';
    const waNumber = typeof SHIP_CONFIG !== 'undefined' ? SHIP_CONFIG.whatsappNumber : '967782259937';

    const message = [
      `*طلب تسعيرة شحنة — ${companyName} (الفئة الفاخرة Pro)*`,
      `المصدر: ${origin}`,
      `الوجهة النهائية: ${dest}`,
      `وسيلة الشحن: ${mode}`,
      `الحجم والوزن: ${specs}`,
      `نوع البضاعة: ${goods}`,
      `العميل / المؤسسة: ${client}`,
      `ملاحظات: ${notes}`
    ].join('\n');

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener');

    const fb = document.getElementById('pro-quote-feedback');
    if (fb) {
      fb.hidden = false;
      fb.textContent = `تم تجهيز طلب التسعيرة (${mode}) وفتح محادثة واتساب ${waNumber} بتصنيف الفئة الفاخرة Pro.`;
    }
  });
});
