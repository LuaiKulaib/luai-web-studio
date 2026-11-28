/* =========================================================
   app.js — جسر العالم للشحن الدولي (الفئة الملكية VIP)
   Multi-Origin Consolidation Terminal + Container Fill % + Pro-Forma Manifest
   ========================================================= */
'use strict';

const VIP_SVG = {
  ship: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 1v4"/></svg>',
  plane: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  warehouse: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  dot: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" aria-hidden="true"><circle cx="12" cy="12" r="6"/></svg>'
};

const CONTAINER_SPECS = {
  FCL_20: {
    code: 'FCL_20',
    label: 'FCL 20ft',
    title: 'حاوية كاملة 20 قدم قياسية (FCL 20ft)',
    maxCbm: 28.0,
    maxKg: 21700,
    baseFreight: 2850,
    thcDoc: 290
  },
  FCL_40HC: {
    code: 'FCL_40HC',
    label: '40ft HC',
    title: 'حاوية كاملة 40 قدم مرتفعة (FCL 40ft HC)',
    maxCbm: 68.0,
    maxKg: 26500,
    baseFreight: 4450,
    thcDoc: 380
  },
  LCL: {
    code: 'LCL',
    label: 'LCL',
    title: 'شحن تجميعي مجمّع بالمساحة (LCL W/M)',
    maxCbm: 28.0,
    maxKg: 18000,
    ratePerCbm: 152,
    thcDoc: 145
  }
};

const DEST_FACTORS = {
  'ميناء عدن': { adj: 1.0, transitFcl: '24 – 29 يوماً', transitLcl: '27 – 33 يوماً' },
  'صنعاء — تخليص منفذ': { adj: 1.14, transitFcl: '28 – 34 يوماً', transitLcl: '30 – 36 يوماً' },
  'ميناء الحديدة': { adj: 1.04, transitFcl: '25 – 31 يوماً', transitLcl: '28 – 34 يوماً' },
  'الرياض / جدة': { adj: 0.92, transitFcl: '18 – 23 يوماً', transitLcl: '21 – 26 يوماً' },
  'دبي / الخليج': { adj: 0.85, transitFcl: '15 – 20 يوماً', transitLcl: '18 – 23 يوماً' }
};

const INITIAL_HUBS = [
  {
    id: 'guangzhou',
    name: 'مستودع غوانزو (الصين)',
    regionEn: 'GUANGZHOU HUB · CN',
    isChina: true,
    feederCost: 160,
    active: true,
    pallets: 10,
    cbm: 14.5,
    weight: 4200,
    note: 'أجهزة ومعدات تجارية'
  },
  {
    id: 'yiwu',
    name: 'مستودع إيوو (الصين)',
    regionEn: 'YIWU HUB · CN',
    isChina: true,
    feederCost: 145,
    active: true,
    pallets: 8,
    cbm: 11.0,
    weight: 2950,
    note: 'بضائع متنوعة وإكسسوارات'
  },
  {
    id: 'dubai',
    name: 'مركز دبي — جبل علي',
    regionEn: 'DUBAI JEBEL ALI · UAE',
    isChina: false,
    feederCost: 220,
    active: true,
    pallets: 5,
    cbm: 6.8,
    weight: 1850,
    note: 'قطع غيار وإعادة تصدير'
  },
  {
    id: 'jeddah',
    name: 'مركز ميناء جدة',
    regionEn: 'JEDDAH HUB · KSA',
    isChina: false,
    feederCost: 190,
    active: true,
    pallets: 3,
    cbm: 4.2,
    weight: 1100,
    note: 'تجهيزات صناعية خليجية'
  }
];

const SCENARIOS = {
  'china-dual': {
    container: 'FCL_20',
    hubs: {
      guangzhou: { active: true, pallets: 9, cbm: 13.2, weight: 3800, note: 'إلكترونيات وتغليف المصنع' },
      yiwu: { active: true, pallets: 7, cbm: 9.8, weight: 2400, note: 'مستلزمات تجارية الجملة' },
      dubai: { active: false, pallets: 0, cbm: 0, weight: 0, note: '' },
      jeddah: { active: false, pallets: 0, cbm: 0, weight: 0, note: '' }
    }
  },
  'multi-hub': {
    container: 'FCL_40HC',
    hubs: {
      guangzhou: { active: true, pallets: 10, cbm: 14.5, weight: 4200, note: 'أجهزة ومعدات تجارية' },
      yiwu: { active: true, pallets: 8, cbm: 11.0, weight: 2950, note: 'بضائع متنوعة وإكسسوارات' },
      dubai: { active: true, pallets: 5, cbm: 6.8, weight: 1850, note: 'قطع غيار وإعادة تصدير' },
      jeddah: { active: true, pallets: 3, cbm: 4.2, weight: 1100, note: 'تجهيزات صناعية خليجية' }
    }
  },
  'full-40hc': {
    container: 'FCL_40HC',
    hubs: {
      guangzhou: { active: true, pallets: 20, cbm: 32.0, weight: 9400, note: 'خط إنتاج ومعدات طاقة' },
      yiwu: { active: true, pallets: 14, cbm: 21.5, weight: 5800, note: 'دفعة تجارية موسمية' },
      dubai: { active: true, pallets: 6, cbm: 8.5, weight: 2600, note: 'مواد مساندة وقطع' },
      jeddah: { active: false, pallets: 0, cbm: 0, weight: 0, note: '' }
    }
  }
};

const WAYBILL_LOGS_VIP = {
  'WB-1024': [
    'غوانزو: استلام 4.2 م³ وإصدار بيان التجميع الأولي.',
    'نانشا البحري: إبحار السفينة على الممر الأسبوعي المباشر.',
    'ميناء عدن: البيان الجمركي قيد التدقيق وإجراءات الفسح.',
    'صنعاء: جاهزة للاستلام عند استكمال الترسيم والوصول.'
  ],
  'WB-2048': [
    'دبي جبل علي: تجميع 3 طرود وفحص الوزن والأختام.',
    'المنفذ البري: عبور سريع مع شاحنات النقل المجدولة.',
    'جمرك الرياض: فسح جمركي مكتمل ومطابقة الفاتورة.',
    'مستودع الرياض: الشحنة وصلت وجاهزة للتسليم.'
  ],
  'WB-3090': [
    'إسطنبول: تجهيز وتدعيم الشحنة بوزن 85 كجم.',
    'مطار إسطنبول: انطلاق جوي نشط نحو مطار عدن الدولي.',
    'جمارك المطار: تحضير التخليص الإلكتروني المسبق.',
    'التسليم النهائي: تسليم مباشر للعميل في عدن أو صنعاء.'
  ]
};

const vipState = {
  hubs: INITIAL_HUBS.map((h) => ({ ...h })),
  container: 'FCL_40HC',
  activeWaybill: 'WB-1024',
  inspectedStep: 2,
  manifestRef: `JW-VIP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`,
  lastComputed: null
};

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolveLocalImage(rawPath) {
  if (!rawPath) return '../assets/images/ship.jpg';
  const name = rawPath.split('/').pop();
  return `../assets/images/${name}`;
}

function renderHubsBuilder() {
  const container = document.getElementById('vip-hubs-container');
  if (!container) return;

  container.innerHTML = vipState.hubs.map((hub) => `
    <div class="hub-card ${hub.active ? 'is-active' : 'is-inactive'}" data-hub-id="${hub.id}">
      <div class="hub-card-head">
        <div>
          <span class="hub-country">${escapeHtml(hub.regionEn)}</span>
          <strong>${escapeHtml(hub.name)}</strong>
        </div>
        <button type="button" class="hub-toggle-btn" data-toggle-hub="${hub.id}">
          ${hub.active ? 'مفعّل' : 'إضافة للمسار'}
        </button>
      </div>

      <div class="hub-inputs-grid">
        <div class="hub-input-cell">
          <label for="hub-pallets-${hub.id}">الطبليات</label>
          <input type="number" id="hub-pallets-${hub.id}" class="num-font" data-hub-field="pallets" data-hub-target="${hub.id}" min="0" max="200" step="1" value="${hub.pallets}">
        </div>
        <div class="hub-input-cell">
          <label for="hub-cbm-${hub.id}">الحجم CBM</label>
          <input type="number" id="hub-cbm-${hub.id}" class="num-font" data-hub-field="cbm" data-hub-target="${hub.id}" min="0" max="120" step="0.5" value="${hub.cbm}">
        </div>
        <div class="hub-input-cell">
          <label for="hub-weight-${hub.id}">الوزن كجم</label>
          <input type="number" id="hub-weight-${hub.id}" class="num-font" data-hub-field="weight" data-hub-target="${hub.id}" min="0" max="50000" step="50" value="${hub.weight}">
        </div>
      </div>

      <input type="text" class="hub-note-input" data-hub-field="note" data-hub-target="${hub.id}" placeholder="وصف البضاعة أو رقم المورد..." value="${escapeHtml(hub.note)}" aria-label="وصف بضاعة ${escapeHtml(hub.name)}">
    </div>
  `).join('');

  container.querySelectorAll('[data-toggle-hub]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const hub = vipState.hubs.find((h) => h.id === btn.dataset.toggleHub);
      if (!hub) return;
      hub.active = !hub.active;
      if (hub.active && hub.cbm === 0 && hub.pallets === 0) {
        hub.pallets = 4;
        hub.cbm = 5.0;
        hub.weight = 1200;
      }
      renderHubsBuilder();
      recomputeTerminal();
    });
  });

  container.querySelectorAll('[data-hub-field]').forEach((input) => {
    input.addEventListener('input', () => {
      const hub = vipState.hubs.find((h) => h.id === input.dataset.hubTarget);
      if (!hub) return;
      const field = input.dataset.hubField;
      if (field === 'note') {
        hub.note = input.value;
      } else {
        const val = Math.max(0, Number(input.value) || 0);
        hub[field] = val;
        if (val > 0 && !hub.active) {
          hub.active = true;
          const card = container.querySelector(`[data-hub-id="${hub.id}"]`);
          card?.classList.add('is-active');
          card?.classList.remove('is-inactive');
          const tgl = card?.querySelector('[data-toggle-hub]');
          if (tgl) tgl.textContent = 'مفعّل';
        }
      }
      recomputeTerminal();
    });
  });
}

function computeTerminalMetrics() {
  const activeHubs = vipState.hubs.filter((h) => h.active && (h.cbm > 0 || h.pallets > 0 || h.weight > 0));
  const totalPallets = activeHubs.reduce((sum, h) => sum + Math.round(h.pallets), 0);
  const totalCbm = activeHubs.reduce((sum, h) => sum + h.cbm, 0);
  const totalWeight = activeHubs.reduce((sum, h) => sum + h.weight, 0);
  const chinaCbm = activeHubs.filter((h) => h.isChina).reduce((sum, h) => sum + h.cbm, 0);

  const spec = CONTAINER_SPECS[vipState.container] || CONTAINER_SPECS.FCL_40HC;
  const destName = document.getElementById('vip-dest')?.value || 'ميناء عدن';
  const destInfo = DEST_FACTORS[destName] || DEST_FACTORS['ميناء عدن'];
  const cargoValue = Math.max(500, Number(document.getElementById('vip-cargo-value')?.value) || 38000);

  const customsOn = Boolean(document.getElementById('toggle-customs')?.checked);
  const qcOn = Boolean(document.getElementById('toggle-qc')?.checked);
  const insOn = Boolean(document.getElementById('toggle-insurance')?.checked);

  const cbmFillPct = spec.maxCbm > 0 ? (totalCbm / spec.maxCbm) * 100 : 0;
  const weightFillPct = spec.maxKg > 0 ? (totalWeight / spec.maxKg) * 100 : 0;

  // Base Ocean / Consolidation Freight
  const seaWm = Math.max(totalCbm, totalWeight / 1000, activeHubs.length > 0 ? 1 : 0);
  let baseFreight = 0;
  if (activeHubs.length > 0) {
    if (spec.code === 'LCL') {
      baseFreight = Math.round(seaWm * spec.ratePerCbm * destInfo.adj);
    } else {
      baseFreight = Math.round(spec.baseFreight * destInfo.adj);
    }
  }

  // Multi-Origin Consolidation Feeder Transfer (first active hub included, extra hubs incur feeder transfer)
  let consolidationFee = 0;
  if (activeHubs.length > 1) {
    consolidationFee = activeHubs.slice(1).reduce((sum, h) => sum + h.feederCost, 0);
  }

  const thcDocFee = activeHubs.length > 0 ? spec.thcDoc : 0;

  // Add-on pricing
  const customsFeeEst = Math.round(240 + (activeHubs.length * 45) + (spec.code === 'FCL_40HC' ? 95 : 40));
  const qcFeeEst = chinaCbm > 0 ? Math.round(145 + chinaCbm * 2.5) : 165;
  const insFeeEst = Math.max(75, Math.round(cargoValue * 0.0085));

  const customsApplied = customsOn && activeHubs.length > 0 ? customsFeeEst : 0;
  const qcApplied = qcOn && activeHubs.length > 0 ? qcFeeEst : 0;
  const insApplied = insOn && activeHubs.length > 0 ? insFeeEst : 0;

  const grandTotal = baseFreight + consolidationFee + thcDocFee + customsApplied + qcApplied + insApplied;
  const costPerCbm = totalCbm > 0 ? Math.round(grandTotal / totalCbm) : 0;
  const transitEst = spec.code === 'LCL' ? destInfo.transitLcl : destInfo.transitFcl;

  const computed = {
    activeHubs,
    totalPallets,
    totalCbm,
    totalWeight,
    chinaCbm,
    spec,
    destName,
    cargoValue,
    cbmFillPct,
    weightFillPct,
    baseFreight,
    consolidationFee,
    thcDocFee,
    customsOn,
    qcOn,
    insOn,
    customsFeeEst,
    qcFeeEst,
    insFeeEst,
    customsApplied,
    qcApplied,
    insApplied,
    grandTotal,
    costPerCbm,
    transitEst
  };

  vipState.lastComputed = computed;
  return computed;
}

function recomputeTerminal() {
  const c = computeTerminalMetrics();
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('active-hubs-badge', `${c.activeHubs.length} مراكز نشطة`);
  setText('ledger-mode-tag', c.spec.label);
  setText('vip-header-cbm', `${c.totalCbm.toFixed(1)} CBM`);
  setText('strip-container-readout', `${c.spec.label} · ${Math.min(999, c.cbmFillPct).toFixed(1)}%`);

  setText('price-addon-customs', `+$${c.customsFeeEst.toLocaleString('en-US')}`);
  setText('price-addon-qc', c.chinaCbm > 0 ? `+$${c.qcFeeEst.toLocaleString('en-US')}` : 'مؤهل عند شحن الصين');
  setText('price-addon-ins', `+$${c.insFeeEst.toLocaleString('en-US')}`);

  const clampedBarWidth = Math.min(100, Math.max(0, c.cbmFillPct));
  setText('fill-pct-label', `${c.cbmFillPct.toFixed(1)}%`);

  const progress = document.getElementById('fill-progressbar');
  const barInner = document.getElementById('fill-bar-inner');
  if (progress) progress.setAttribute('aria-valuenow', String(Math.round(clampedBarWidth)));
  if (barInner) {
    barInner.style.width = `${clampedBarWidth}%`;
    barInner.classList.remove('warn', 'overload');
    if (c.cbmFillPct > 100 || c.weightFillPct > 100) {
      barInner.classList.add('overload');
    } else if (c.cbmFillPct >= 82) {
      barInner.classList.add('warn');
    }
  }

  setText('fill-cbm-ratio', `${c.totalCbm.toFixed(1)} / ${c.spec.maxCbm.toFixed(1)} CBM`);
  setText('fill-weight-ratio', `${c.totalWeight.toLocaleString('en-US')} / ${c.spec.maxKg.toLocaleString('en-US')} kg`);

  const alertBox = document.getElementById('capacity-alert');
  const alertTxt = document.getElementById('capacity-alert-text');
  const upgradeBtn = document.getElementById('btn-upgrade-40hc');
  if (alertBox && alertTxt && upgradeBtn) {
    if (c.spec.code === 'FCL_20' && c.totalCbm > c.spec.maxCbm) {
      alertBox.hidden = false;
      alertTxt.textContent = `الحجم المجمّع (${c.totalCbm.toFixed(1)} CBM) يتجاوز سعة حاوية 20 قدم.`;
      upgradeBtn.hidden = false;
    } else if (c.spec.code === 'FCL_40HC' && c.totalCbm > c.spec.maxCbm) {
      alertBox.hidden = false;
      alertTxt.textContent = `الحجم يتجاوز حاوية 40ft HC واحدة — يُقترح تقسيم الفائض إلى LCL إضافي.`;
      upgradeBtn.hidden = true;
    } else if (c.weightFillPct > 100) {
      alertBox.hidden = false;
      alertTxt.textContent = `الوزن الإجمالي يتخطى الحمولة القصوى للحاوية المحددة.`;
      upgradeBtn.hidden = c.spec.code === 'FCL_20';
    } else {
      alertBox.hidden = true;
      upgradeBtn.hidden = true;
    }
  }

  setText('stat-total-pallets', String(c.totalPallets));
  setText('stat-total-cbm', `${c.totalCbm.toFixed(1)} m³`);
  setText('stat-total-weight', `${c.totalWeight.toLocaleString('en-US')} kg`);
  setText('stat-transit-days', c.activeHubs.length > 0 ? c.transitEst : '-');

  const ledgerList = document.getElementById('cost-breakdown-list');
  if (ledgerList) {
    const lines = [
      { label: c.spec.code === 'LCL' ? 'الشحن البحري التجميعي (LCL W/M)' : `حجز حاوية ${c.spec.label} للمسار`, amount: c.baseFreight },
      { label: `رسوم التجميع والتحويل بين المراكز (${c.activeHubs.length})`, amount: c.consolidationFee },
      { label: 'مناولة الميناء وبوليصة الشحن (THC / B/L)', amount: c.thcDocFee },
      { label: 'التخليص الجمركي والبيان الموحد', amount: c.customsApplied, muted: !c.customsOn },
      { label: 'فحص الجودة والمطابقة في الصين (QC)', amount: c.qcApplied, muted: !c.qcOn },
      { label: 'التأمين البحري الشامل (All-Risks)', amount: c.insApplied, muted: !c.insOn }
    ];

    ledgerList.innerHTML = lines.map((line) => `
      <div class="cost-line ${line.muted ? 'muted' : ''}">
        <span>${escapeHtml(line.label)}</span>
        <strong>${line.muted ? 'غير مفعل' : `$${line.amount.toLocaleString('en-US')}`}</strong>
      </div>
    `).join('');
  }

  setText('grand-total-usd', `$${c.grandTotal.toLocaleString('en-US')}`);
  setText('cost-per-cbm-note', c.totalCbm > 0 ? `$${c.costPerCbm.toLocaleString('en-US')} / CBM متوسط التكلفة` : 'فعّل مركزاً واحداً على الأقل');
}

function buildManifestData() {
  const c = vipState.lastComputed || computeTerminalMetrics();
  const company = document.getElementById('vip-company-name')?.value.trim() || 'مجموعة الرواد للتجارة الدولية';
  const contact = document.getElementById('vip-contact-phone')?.value.trim() || '770000000';
  const issueDate = new Date().toLocaleDateString('ar-YE', { year: 'numeric', month: 'long', day: 'numeric' });
  return { ...c, company, contact, issueDate, refNo: vipState.manifestRef };
}

function renderManifestModal() {
  const sheet = document.getElementById('manifest-printable-sheet');
  if (!sheet) return;
  const m = buildManifestData();

  const rowsHtml = m.activeHubs.length > 0
    ? m.activeHubs.map((h) => `
        <tr>
          <td><strong>${escapeHtml(h.name)}</strong></td>
          <td class="num-font">${h.pallets}</td>
          <td class="num-font">${h.cbm.toFixed(1)} m&sup3;</td>
          <td class="num-font">${h.weight.toLocaleString('en-US')} kg</td>
          <td>${escapeHtml(h.note || 'بضائع تجارية عامة')}</td>
        </tr>
      `).join('')
    : `<tr><td colspan="5">لا توجد مراكز مفعلة — يرجى إدخال كميات في مركز واحد على الأقل.</td></tr>`;

  const activeAddons = [
    m.customsOn ? `التخليص الجمركي ($${m.customsApplied})` : null,
    m.qcOn ? `فحص الجودة في الصين ($${m.qcApplied})` : null,
    m.insOn ? `التأمين البحري الشامل ($${m.insApplied})` : null
  ].filter(Boolean);

  sheet.innerHTML = `
    <div class="sheet-header">
      <div class="sheet-title-block">
        <strong>جسر العالم للشحن الدولي والتخليص الجمركي</strong>
        <span>PRO-FORMA CONSOLIDATION &amp; BOOKING MANIFEST · الفئة الملكية VIP</span>
      </div>
      <div class="sheet-ref-block">
        <strong>${escapeHtml(m.refNo)}</strong>
        <span>تاريخ الإصدار: ${escapeHtml(m.issueDate)}</span>
      </div>
    </div>

    <div class="sheet-meta-grid">
      <div><span>العميل / المستورد</span><strong>${escapeHtml(m.company)}</strong></div>
      <div><span>هاتف التواصل</span><strong class="num-font">${escapeHtml(m.contact)}</strong></div>
      <div><span>الوجهة النهائية</span><strong>${escapeHtml(m.destName)}</strong></div>
      <div><span>نمط الحاوية والامتلاء</span><strong class="num-font">${escapeHtml(m.spec.label)} (${m.cbmFillPct.toFixed(1)}%)</strong></div>
    </div>

    <table class="sheet-table">
      <thead>
        <tr>
          <th>مركز التجميع (المصدر)</th>
          <th>الطبليات</th>
          <th>الحجم CBM</th>
          <th>الوزن</th>
          <th>وصف الحمولة</th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>

    <div class="sheet-summary-grid">
      <div class="sheet-box">
        <h4>مواصفات الحجز والخدمات المرافقة</h4>
        <div class="sheet-ledger-row"><span>إجمالي الطبليات / الحجم</span><strong class="num-font">${m.totalPallets} طبلية · ${m.totalCbm.toFixed(1)} CBM</strong></div>
        <div class="sheet-ledger-row"><span>الوزن الإجمالي القائم</span><strong class="num-font">${m.totalWeight.toLocaleString('en-US')} kg</strong></div>
        <div class="sheet-ledger-row"><span>المدة المتوقعة للوصول</span><strong class="num-font">${escapeHtml(m.transitEst)}</strong></div>
        <div class="sheet-ledger-row"><span>الخدمات المختارة</span><strong>${activeAddons.length ? escapeHtml(activeAddons.join(' + ')) : 'شحن أساسي فقط'}</strong></div>
      </div>

      <div class="sheet-box">
        <h4>البيان المالي المبدئي (Landed Cost)</h4>
        <div class="sheet-ledger-row"><span>الشحن البحري / الحاوية</span><strong class="num-font">$${m.baseFreight.toLocaleString('en-US')}</strong></div>
        <div class="sheet-ledger-row"><span>رسوم تجميع المراكز والمناولة</span><strong class="num-font">$${(m.consolidationFee + m.thcDocFee).toLocaleString('en-US')}</strong></div>
        <div class="sheet-ledger-row"><span>التخليص + الفحص + التأمين</span><strong class="num-font">$${(m.customsApplied + m.qcApplied + m.insApplied).toLocaleString('en-US')}</strong></div>
        <div class="sheet-ledger-total"><span>الإجمالي التقديري الواصل</span><strong class="num-font">$${m.grandTotal.toLocaleString('en-US')}</strong></div>
      </div>
    </div>
  `;
}

function formatManifestPlainText(m) {
  const hubLines = m.activeHubs.map(
    (h) => `- ${h.name}: ${h.pallets} طبلية | ${h.cbm.toFixed(1)} CBM | ${h.weight} كجم (${h.note || 'تجاري'})`
  ).join('\n');

  const addons = [
    m.customsOn ? `التخليص الجمركي ($${m.customsApplied})` : null,
    m.qcOn ? `فحص الجودة بالصين ($${m.qcApplied})` : null,
    m.insOn ? `التأمين البحري ($${m.insApplied})` : null
  ].filter(Boolean).join('، ') || 'بدون إضافات';

  return [
    `*اعتماد مانيفست تجميع وحجز شحنة — جسر العالم للشحن (الفئة الملكية VIP)*`,
    `رقم المرجع: ${m.refNo}`,
    `الشركة / المستورد: ${m.company} (${m.contact})`,
    `الحاوية: ${m.spec.title} — الامتلاء ${m.cbmFillPct.toFixed(1)}%`,
    `الوجهة: ${m.destName}`,
    `المراكز المجمّعة:`,
    hubLines || '- لم تحدد مراكز',
    `الإجمالي: ${m.totalPallets} طبلية | ${m.totalCbm.toFixed(1)} CBM | ${m.totalWeight} كجم`,
    `الخدمات المرافقة: ${addons}`,
    `التكلفة الواصلة التقديرية: $${m.grandTotal.toLocaleString('en-US')}`
  ].join('\n');
}

function openManifestModal() {
  renderManifestModal();
  const modal = document.getElementById('vip-manifest-modal');
  const status = document.getElementById('manifest-action-status');
  if (status) status.textContent = '';
  if (modal) modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeManifestModal() {
  const modal = document.getElementById('vip-manifest-modal');
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
}

function renderVipTracker(code, forcedStep) {
  const output = document.getElementById('vip-track-result');
  if (!output || typeof SHIP_DATA === 'undefined') return;

  const key = (code || '').trim().toUpperCase();
  const info = SHIP_DATA.demoTracking[key];

  document.querySelectorAll('.vip-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.code === key);
  });

  if (!info) {
    output.innerHTML = `<div class="vip-step-inspector">رقم البوليصة <span class="num-font">${escapeHtml(key || '---')}</span> غير موجود في العرض التجريبي. جرّب WB-1024 أو WB-2048 أو WB-3090.</div>`;
    return;
  }

  vipState.activeWaybill = key;
  const maxStep = info.steps.length - 1;
  const currStep = Math.min(Math.max(info.stepIndex, 0), maxStep);
  const inspected = typeof forcedStep === 'number' ? Math.min(Math.max(forcedStep, 0), maxStep) : currStep;
  vipState.inspectedStep = inspected;

  const pct = Math.round(((currStep + 1) / info.steps.length) * 100);
  const logs = WAYBILL_LOGS_VIP[key] || [];
  const stepLog = logs[inspected] || info.steps[inspected];
  const isDone = currStep >= maxStep;

  const stepsHtml = info.steps.map((st, idx) => {
    let cls = 'vip-step-btn';
    let icon = VIP_SVG.dot;
    if (idx < currStep || (isDone && idx === currStep)) {
      cls += ' done';
      icon = VIP_SVG.check;
    } else if (idx === currStep) {
      cls += ' current';
      icon = VIP_SVG.clock;
    }
    if (idx === inspected) cls += ' inspected';

    return `
      <button type="button" class="${cls}" data-vip-step="${idx}">
        <span class="vip-step-top">
          <span class="num-font">0${idx + 1}</span>
          ${icon}
        </span>
        <span class="vip-step-label">${escapeHtml(st)}</span>
      </button>
    `;
  }).join('');

  output.innerHTML = `
    <div class="vip-wb-head">
      <div>
        <span class="vip-wb-badge">${escapeHtml(key)}</span>
        <div class="vip-wb-route">${escapeHtml(info.route)}</div>
        <div class="vip-wb-type">${escapeHtml(info.type)}</div>
      </div>
      <span class="vip-wb-eta ${isDone ? 'done' : ''}">${escapeHtml(info.eta)}</span>
    </div>

    <div class="vip-progress-track">
      <div class="vip-progress-fill" style="width: ${pct}%;"></div>
    </div>

    <div class="vip-steps-grid">${stepsHtml}</div>

    <div class="vip-step-inspector">
      <strong>محطة 0${inspected + 1}: ${escapeHtml(info.steps[inspected])}</strong>
      <span>${escapeHtml(stepLog)}</span>
    </div>
  `;

  output.querySelectorAll('[data-vip-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      renderVipTracker(vipState.activeWaybill, Number(btn.dataset.vipStep));
    });
  });
}

function renderVipServicesAndRoutes() {
  const svcEl = document.getElementById('vip-services');
  const routeEl = document.getElementById('vip-routes');
  if (typeof SHIP_DATA === 'undefined') return;

  if (svcEl) {
    svcEl.innerHTML = SHIP_DATA.services.map((s) => `
      <article class="vip-svc-card">
        <img src="${resolveLocalImage(s.image)}" alt="${escapeHtml(s.title)}" loading="lazy">
        <div class="vip-svc-body">
          <div class="vip-svc-icon">${VIP_SVG[s.icon] || VIP_SVG.ship}</div>
          <h3>${escapeHtml(s.title)}</h3>
          <p>${escapeHtml(s.desc)}</p>
        </div>
      </article>
    `).join('');
  }

  if (routeEl) {
    routeEl.innerHTML = SHIP_DATA.routes.map((r) => `
      <div class="vip-route-card">
        <div>
          <strong>${escapeHtml(r.from)} &larr; ${escapeHtml(r.to)}</strong>
          <span>المدة القياسية: ${escapeHtml(r.transit)}</span>
        </div>
        <span class="vip-route-badge">${escapeHtml(r.mode)}</span>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer
  const menuBtn = document.getElementById('vip-menu-btn');
  const drawer = document.getElementById('vip-mobile-drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const open = !drawer.hidden;
      drawer.hidden = open;
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
    drawer.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        drawer.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Initial UI
  renderHubsBuilder();
  recomputeTerminal();
  renderVipTracker('WB-1024');
  renderVipServicesAndRoutes();

  // Scenario Presets
  document.querySelectorAll('.scenario-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sc = SCENARIOS[btn.dataset.scenario];
      if (!sc) return;
      document.querySelectorAll('.scenario-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      vipState.container = sc.container;
      document.querySelectorAll('.container-card').forEach((card) => {
        card.classList.toggle('active', card.dataset.container === sc.container);
      });

      vipState.hubs.forEach((hub) => {
        const cfg = sc.hubs[hub.id];
        if (cfg) {
          hub.active = cfg.active;
          hub.pallets = cfg.pallets;
          hub.cbm = cfg.cbm;
          hub.weight = cfg.weight;
          hub.note = cfg.note;
        }
      });

      renderHubsBuilder();
      recomputeTerminal();
    });
  });

  // Container Cards
  document.querySelectorAll('.container-card').forEach((card) => {
    card.addEventListener('click', () => {
      vipState.container = card.dataset.container;
      document.querySelectorAll('.container-card').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      recomputeTerminal();
    });
  });

  // Upgrade button when 20ft overflows
  document.getElementById('btn-upgrade-40hc')?.addEventListener('click', () => {
    vipState.container = 'FCL_40HC';
    document.querySelectorAll('.container-card').forEach((c) => {
      c.classList.toggle('active', c.dataset.container === 'FCL_40HC');
    });
    recomputeTerminal();
  });

  // Destination, Cargo Value & Add-on Toggles
  ['vip-dest', 'vip-cargo-value', 'toggle-customs', 'toggle-qc', 'toggle-insurance'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', recomputeTerminal);
    el.addEventListener('change', recomputeTerminal);
  });

  // Waybill Tracker Events
  document.getElementById('vip-track-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    renderVipTracker(document.getElementById('vip-track-input')?.value);
  });

  document.querySelectorAll('.vip-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const inp = document.getElementById('vip-track-input');
      if (inp) inp.value = chip.dataset.code;
      renderVipTracker(chip.dataset.code);
    });
  });

  // Manifest Modal Controls
  document.getElementById('btn-open-manifest')?.addEventListener('click', openManifestModal);
  document.getElementById('vip-header-manifest-btn')?.addEventListener('click', openManifestModal);
  document.getElementById('manifest-close-btn')?.addEventListener('click', closeManifestModal);
  document.getElementById('manifest-backdrop')?.addEventListener('click', closeManifestModal);

  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('vip-manifest-modal');
    if (e.key === 'Escape' && modal && !modal.hidden) {
      closeManifestModal();
    }
  });

  document.getElementById('manifest-print-btn')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('manifest-copy-btn')?.addEventListener('click', async () => {
    const m = buildManifestData();
    const text = formatManifestPlainText(m);
    const status = document.getElementById('manifest-action-status');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      if (status) status.textContent = 'تم نسخ نص المانيفست بالكامل إلى الحافظة بنجاح.';
    } catch {
      if (status) status.textContent = 'تعذر النسخ التلقائي — يمكنك طباعة الوثيقة أو إرسالها عبر واتساب مباشرة.';
    }
  });

  document.getElementById('manifest-wa-btn')?.addEventListener('click', () => {
    const m = buildManifestData();
    const text = formatManifestPlainText(m);
    const waNumber = typeof SHIP_CONFIG !== 'undefined' ? SHIP_CONFIG.whatsappNumber : '967782259937';
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    const status = document.getElementById('manifest-action-status');
    if (status) status.textContent = `تم فتح واتساب VIP (${waNumber}) مع إرفاق تفاصيل المانيفست.`;
  });
});
