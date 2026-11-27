/* =========================================================
   mango/vip/app.js — Sovereign Global Trade Console ($250 VIP)
   Tihama Golden Tropics® — Mixed-Container & Pallet Manifest Builder,
   Incoterms Engine, Compliance Checklist & Pro-Forma Export
   ========================================================= */
'use strict';

(function initMangoVipConsole() {
  if (typeof MANGO_DATA === 'undefined' || typeof MANGO_CONFIG === 'undefined') return;

  const waBase = `https://wa.me/${MANGO_CONFIG.whatsappNumber}?text=`;

  /* ---- Indicative Base FOB USD/kg per Cultivar ---- */
  const VIP_FOB_USD = {
    'qalb-althawr': 2.85,
    'taimour': 2.35,
    'zubda': 1.75,
    'hindi-special': 2.15,
    'samaka': 2.95,
  };

  /* ---- Incoterms 2020 Options & Logistics Delta ---- */
  const INCOTERMS = [
    {
      id: 'fob',
      code: 'FOB Hodeidah',
      desc: 'تسليم ظهر السفينة / ميناء الحديدة',
      deltaUsdPerKg: 0.0,
      note: 'شامل التعبئة والتبريد المسبق وفحص UNECE FFV-45',
    },
    {
      id: 'cif',
      code: 'CIF Sea',
      desc: 'شامل الشحن البحري المبرّد والتأمين للميناء',
      deltaUsdPerKg: 0.42,
      note: 'شامل أجور الحاوية المبرّدة 40ft/20ft والتأمين البحري',
    },
    {
      id: 'ddp',
      code: 'DDP Gulf',
      desc: 'تسليم خالص الرسوم (جدة / الرياض / دبي)',
      deltaUsdPerKg: 0.68,
      note: 'شامل النقل المبرّد والتخليص الجمركي حتى مستودع العميل',
    },
    {
      id: 'air',
      code: 'Air Cargo',
      desc: 'شحن جوي سريع (24–48 ساعة للخليج وأوروبا)',
      deltaUsdPerKg: 1.45,
      note: 'أولوية طيران مبردة لباليتات الفئة الملكية',
    },
  ];

  /* ---- Compliance Document Checklist ---- */
  const COMPLIANCE_DOCS = [
    {
      id: 'phyto',
      title: 'Phytosanitary Certificate',
      subtitle: 'شهادة الصحة النباتية الرسمية',
      checked: true,
    },
    {
      id: 'globalgap',
      title: 'GlobalG.A.P. Traceability',
      subtitle: 'تتبع الحوض الزراعي المعتمد',
      checked: true,
    },
    {
      id: 'mrl',
      title: 'MRL Lab Report',
      subtitle: 'تقرير خلو متبقيات المبيدات (EU/GCC)',
      checked: true,
    },
    {
      id: 'euro1',
      title: 'Euro-1 / Certificate of Origin',
      subtitle: 'شهادة المنشأ اليمني / يورو-1',
      checked: true,
    },
  ];

  let activeFilter = 'all';
  let activeIncotermId = 'fob';

  // Manifest line items state
  const manifestItems = [];

  /* ---- 1. Hero Telemetry KPI Grid ---- */
  const vipKpiGrid = document.getElementById('vip-kpi-grid');
  if (vipKpiGrid) {
    vipKpiGrid.innerHTML = MANGO_DATA.kpis
      .map(
        (k) => `
        <div class="tcc-kpi-box">
          <strong>${k.value}</strong>
          <small>${k.unit}</small>
          <span>${k.label}</span>
        </div>`
      )
      .join('');
  }

  /* ---- 2. Cultivar Intelligence Matrix ---- */
  const cultivarGrid = document.getElementById('vip-cultivar-grid');
  const cultivarFilters = document.getElementById('vip-cultivar-filters');

  function renderVipCultivars() {
    if (!cultivarGrid) return;
    const list =
      activeFilter === 'all'
        ? MANGO_DATA.cultivars
        : MANGO_DATA.cultivars.filter((c) => c.mode === activeFilter);

    cultivarGrid.innerHTML = list
      .map((c) => {
        const fob = (VIP_FOB_USD[c.id] || 2.2).toFixed(2);
        const imgPath = c.image.startsWith('../') ? c.image : `../${c.image}`;
        return `
        <article class="vc-card">
          <div class="vc-media">
            <img src="${imgPath}" alt="${c.nameAr}" loading="lazy" />
            <span class="vc-badge">${c.badge}</span>
          </div>
          <div class="vc-body">
            <div class="vc-en">${c.nameEn}</div>
            <h3>${c.nameAr}</h3>
            <p class="vc-desc">${c.desc}</p>
            <div class="vc-telemetry-grid">
              <div class="vc-cell">
                <span>الحلاوة (Brix)</span>
                <strong>${c.brix}</strong>
              </div>
              <div class="vc-cell">
                <span>المادة الجافة</span>
                <strong>${c.dryMatter}</strong>
              </div>
              <div class="vc-cell">
                <span>الأوزان والتدريج</span>
                <strong>${c.weightRange} (${c.caliber})</strong>
              </div>
              <div class="vc-cell">
                <span>العمر التسويقي</span>
                <strong>${c.shelfLife.split('(')[0].trim()}</strong>
              </div>
            </div>
            <div class="vc-footer">
              <div class="vc-fob">
                <span>INDICATIVE FOB</span>
                <strong>$${fob} / kg</strong>
              </div>
              <button type="button" class="btn-vc-allocate" data-alloc-cultivar="${c.id}">
                إدراج في البيان
              </button>
            </div>
          </div>
        </article>`;
      })
      .join('');
  }

  renderVipCultivars();

  if (cultivarFilters) {
    cultivarFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.vf-pill');
      if (!btn) return;
      activeFilter = btn.dataset.filter || 'all';
      cultivarFilters.querySelectorAll('.vf-pill').forEach((b) => {
        b.classList.toggle('active', b === btn);
      });
      renderVipCultivars();
    });
  }

  /* ---- 3. Manifest Builder Controls Setup ---- */
  const mbCultivar = document.getElementById('mb-cultivar');
  const mbUnit = document.getElementById('mb-unit');
  const mbPackaging = document.getElementById('mb-packaging');
  const mbCount = document.getElementById('mb-count');
  const mbAddBtn = document.getElementById('mb-add-btn');

  if (mbCultivar) {
    mbCultivar.innerHTML = MANGO_DATA.cultivars
      .map((c) => `<option value="${c.id}">${c.nameAr} (${c.caliber})</option>`)
      .join('');
  }

  if (mbUnit) {
    mbUnit.innerHTML = MANGO_DATA.allocations
      .map((a) => `<option value="${a.id}">${a.label}</option>`)
      .join('');
  }

  if (mbPackaging) {
    mbPackaging.innerHTML = MANGO_DATA.packagingOptions
      .map((p) => `<option value="${p.id}">${p.label}</option>`)
      .join('');
  }

  if (cultivarGrid) {
    cultivarGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-alloc-cultivar]');
      if (!btn || !mbCultivar) return;
      mbCultivar.value = btn.dataset.allocCultivar;
      document.getElementById('manifest-builder')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---- 4. Incoterms & Compliance Checklist Rendering ---- */
  const incotermSelector = document.getElementById('incoterm-selector');
  const complianceChecklist = document.getElementById('compliance-checklist');

  function renderIncoterms() {
    if (!incotermSelector) return;
    incotermSelector.innerHTML = INCOTERMS.map((term) => {
      const active = term.id === activeIncotermId;
      const deltaText = term.deltaUsdPerKg === 0 ? 'السعر الأساسي' : `+$${term.deltaUsdPerKg.toFixed(2)}/كجم`;
      return `
        <button type="button" class="incoterm-btn ${active ? 'active' : ''}" data-incoterm="${term.id}" role="radio" aria-checked="${active}">
          <strong>${term.code} (${deltaText})</strong>
          <span>${term.desc}</span>
        </button>`;
    }).join('');
  }

  function renderComplianceDocs() {
    if (!complianceChecklist) return;
    complianceChecklist.innerHTML = COMPLIANCE_DOCS.map(
      (doc) => `
      <label class="doc-check-item ${doc.checked ? 'checked' : ''}">
        <input type="checkbox" data-doc-id="${doc.id}" ${doc.checked ? 'checked' : ''} />
        <div>
          <strong>${doc.title}</strong>
          <span>${doc.subtitle}</span>
        </div>
      </label>`
    ).join('');
  }

  renderIncoterms();
  renderComplianceDocs();

  if (incotermSelector) {
    incotermSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-incoterm]');
      if (!btn) return;
      activeIncotermId = btn.dataset.incoterm || 'fob';
      renderIncoterms();
      renderManifest();
    });
  }

  if (complianceChecklist) {
    complianceChecklist.addEventListener('change', (e) => {
      const cb = e.target.closest('input[data-doc-id]');
      if (!cb) return;
      const target = COMPLIANCE_DOCS.find((d) => d.id === cb.dataset.docId);
      if (target) {
        target.checked = cb.checked;
        renderComplianceDocs();
        renderManifest();
      }
    });
  }

  /* ---- 5. Manifest Allocation Engine & Calculation ---- */
  function calculateLineMetrics(item) {
    const cultivar = MANGO_DATA.cultivars.find((c) => c.id === item.cultivarId);
    const pkg = MANGO_DATA.packagingOptions.find((p) => p.id === item.packagingId);
    const alloc = MANGO_DATA.allocations.find((a) => a.id === item.allocId);
    const incoterm = INCOTERMS.find((t) => t.id === activeIncotermId) || INCOTERMS[0];

    if (!cultivar || !pkg || !alloc) return null;

    let cartonsPerUnit = pkg.perEuroPallet;
    let palletsPerUnit = 1;
    if (alloc.mult === 'reefer40') {
      cartonsPerUnit = pkg.perReefer40;
      palletsPerUnit = 26;
    } else if (typeof alloc.mult === 'number') {
      cartonsPerUnit = pkg.perEuroPallet * alloc.mult;
      palletsPerUnit = alloc.mult;
    }

    const totalCartons = cartonsPerUnit * item.units;
    const totalPallets = palletsPerUnit * item.units;
    const netKg = totalCartons * pkg.netKg;
    const grossKg = totalCartons * pkg.grossKg;
    const unitRateUsd = (VIP_FOB_USD[cultivar.id] || 2.2) + incoterm.deltaUsdPerKg;
    const lineValueUsd = netKg * unitRateUsd;

    return {
      ...item,
      cultivar,
      pkg,
      alloc,
      totalCartons,
      totalPallets,
      netKg,
      grossKg,
      unitRateUsd,
      lineValueUsd,
    };
  }

  function addAllocation(cultivarId, allocId, packagingId, units) {
    const cleanUnits = Math.max(1, Math.min(50, parseInt(units, 10) || 1));
    manifestItems.push({
      uid: `alloc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      cultivarId,
      allocId,
      packagingId,
      units: cleanUnits,
    });
    renderManifest();
  }

  // Pre-seed a realistic mixed shipment (1x 40ft Zubda + 2x Air Pallets Qalb Al-Thawr)
  addAllocation('zubda', 'reefer40', 'box-45', 1);
  addAllocation('qalb-althawr', 'pallet', 'box-30', 2);

  if (mbAddBtn) {
    mbAddBtn.addEventListener('click', () => {
      if (!mbCultivar || !mbUnit || !mbPackaging || !mbCount) return;
      addAllocation(mbCultivar.value, mbUnit.value, mbPackaging.value, mbCount.value);
    });
  }

  const mpItemsList = document.getElementById('mp-items-list');
  const mpTotalCartons = document.getElementById('mp-total-cartons');
  const mpTotalPallets = document.getElementById('mp-total-pallets');
  const mpNetMt = document.getElementById('mp-net-mt');
  const mpGrossMt = document.getElementById('mp-gross-mt');
  const mpTotalUsd = document.getElementById('mp-total-usd');
  const mpIncotermBadge = document.getElementById('mp-incoterm-badge');
  const mpValTerm = document.getElementById('mp-val-term');
  const mpValNote = document.getElementById('mp-val-note');
  const mpDocsTags = document.getElementById('mp-docs-tags');
  const drawerCountBadge = document.getElementById('drawer-count-badge');
  const drawerBody = document.getElementById('drawer-manifest-body');

  function getManifestSummary() {
    const computed = manifestItems.map(calculateLineMetrics).filter(Boolean);
    const totals = computed.reduce(
      (acc, line) => {
        acc.cartons += line.totalCartons;
        acc.pallets += line.totalPallets;
        acc.netKg += line.netKg;
        acc.grossKg += line.grossKg;
        acc.valueUsd += line.lineValueUsd;
        return acc;
      },
      { cartons: 0, pallets: 0, netKg: 0, grossKg: 0, valueUsd: 0 }
    );
    const incoterm = INCOTERMS.find((t) => t.id === activeIncotermId) || INCOTERMS[0];
    const selectedDocs = COMPLIANCE_DOCS.filter((d) => d.checked);
    return { computed, totals, incoterm, selectedDocs };
  }

  function renderManifest() {
    const { computed, totals, incoterm, selectedDocs } = getManifestSummary();

    if (drawerCountBadge) {
      drawerCountBadge.textContent = String(computed.length);
    }

    if (mpIncotermBadge) mpIncotermBadge.textContent = incoterm.code;
    if (mpValTerm) mpValTerm.textContent = incoterm.code;
    if (mpValNote) mpValNote.textContent = incoterm.note;

    if (mpItemsList) {
      if (computed.length === 0) {
        mpItemsList.innerHTML = `<div class="mp-empty">لا توجد بنود مضافة حالياً. استخدم لوحة التخصيص لإضافة صنف ووحدة شحن.</div>`;
      } else {
        mpItemsList.innerHTML = computed
          .map(
            (line) => `
            <div class="mp-line-item">
              <div class="mp-line-info">
                <strong>${line.cultivar.nameAr} × ${line.units}</strong>
                <span>${line.alloc.label} · كرتون ${line.pkg.netKg} كجم (${line.totalCartons.toLocaleString('en-US')} كرتون)</span>
              </div>
              <div class="mp-line-meta">
                <div class="mp-line-val">
                  <strong>$${Math.round(line.lineValueUsd).toLocaleString('en-US')}</strong>
                  <small>${(line.netKg / 1000).toFixed(2)} MT صافي</small>
                </div>
                <button type="button" class="btn-remove-line" data-remove-uid="${line.uid}" aria-label="حذف البند">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>`
          )
          .join('');
      }
    }

    if (mpTotalCartons) mpTotalCartons.textContent = totals.cartons.toLocaleString('en-US');
    if (mpTotalPallets) mpTotalPallets.textContent = totals.pallets.toLocaleString('en-US');
    if (mpNetMt) mpNetMt.textContent = `${(totals.netKg / 1000).toFixed(2)} طن`;
    if (mpGrossMt) mpGrossMt.textContent = `${(totals.grossKg / 1000).toFixed(2)} طن`;
    if (mpTotalUsd) mpTotalUsd.textContent = `$${Math.round(totals.valueUsd).toLocaleString('en-US')}`;

    if (mpDocsTags) {
      mpDocsTags.innerHTML =
        selectedDocs.length > 0
          ? selectedDocs.map((d) => `<span class="doc-pill">${d.title}</span>`).join('')
          : `<span class="doc-pill">بدون مستندات محددة</span>`;
    }

    if (drawerBody) {
      drawerBody.innerHTML = `
        <div class="mp-totals-grid" style="margin-bottom: 1rem;">
          <div class="mp-total-cell"><span>شرط التسليم</span><strong>${incoterm.code}</strong></div>
          <div class="mp-total-cell"><span>القيمة التقديرية</span><strong>$${Math.round(totals.valueUsd).toLocaleString('en-US')}</strong></div>
          <div class="mp-total-cell"><span>إجمالي الكراتين</span><strong>${totals.cartons.toLocaleString('en-US')}</strong></div>
          <div class="mp-total-cell"><span>الوزن الصافي / الإجمالي</span><strong>${(totals.netKg / 1000).toFixed(2)} / ${(totals.grossKg / 1000).toFixed(2)} MT</strong></div>
        </div>
        <div class="mp-items-list" style="max-height: none;">
          ${
            computed.length === 0
              ? '<div class="mp-empty">البيان فارغ حالياً.</div>'
              : computed
                  .map(
                    (line) => `
                  <div class="mp-line-item">
                    <div class="mp-line-info">
                      <strong>${line.cultivar.nameAr} × ${line.units}</strong>
                      <span>${line.alloc.label} · ${line.totalCartons.toLocaleString('en-US')} كرتون (${line.pkg.netKg} كجم)</span>
                    </div>
                    <div class="mp-line-val">
                      <strong>$${Math.round(line.lineValueUsd).toLocaleString('en-US')}</strong>
                      <small>${(line.netKg / 1000).toFixed(2)} MT</small>
                    </div>
                  </div>`
                  )
                  .join('')
          }
        </div>
        <div class="mp-docs-summary" style="margin-top: 1rem; border-bottom: none;">
          <span>شهادات الامتثال المحددة:</span>
          <div class="mp-docs-tags">${selectedDocs.map((d) => `<span class="doc-pill">${d.title}</span>`).join('')}</div>
        </div>
      `;
    }
  }

  renderManifest();

  if (mpItemsList) {
    mpItemsList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove-uid]');
      if (!btn) return;
      const idx = manifestItems.findIndex((i) => i.uid === btn.dataset.removeUid);
      if (idx !== -1) {
        manifestItems.splice(idx, 1);
        renderManifest();
      }
    });
  }

  const clearBtn = document.getElementById('mp-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      manifestItems.length = 0;
      renderManifest();
    });
  }

  /* ---- 6. Slide-Over Manifest Drawer ---- */
  const drawerBackdrop = document.getElementById('manifest-drawer-backdrop');
  const openDrawerBtn = document.getElementById('open-manifest-drawer');
  const closeDrawerBtn = document.getElementById('close-manifest-drawer');
  const jumpBuilderBtn = document.getElementById('drawer-jump-builder');

  function openDrawer() {
    if (!drawerBackdrop) return;
    drawerBackdrop.hidden = false;
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawerBackdrop) return;
    drawerBackdrop.hidden = true;
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (jumpBuilderBtn) jumpBuilderBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeDrawer();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerBackdrop && !drawerBackdrop.hidden) {
      closeDrawer();
    }
  });

  /* ---- 7. Export Pro-Forma Manifest to WhatsApp ---- */
  const manifestForm = document.getElementById('vip-manifest-form');
  if (manifestForm) {
    manifestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const { computed, totals, incoterm, selectedDocs } = getManifestSummary();

      if (computed.length === 0) {
        alert('يرجى إضافة صنف واحد على الأقل إلى بيان الشحنة قبل الإرسال.');
        return;
      }

      const company = document.getElementById('vip-company')?.value.trim() || '';
      const destination = document.getElementById('vip-destination')?.value.trim() || '';
      const windowNotes = document.getElementById('vip-window')?.value.trim() || 'لا توجد ملاحظات إضافية';

      const lineDescriptions = computed.map(
        (line, idx) =>
          `${idx + 1}. ${line.cultivar.nameAr} | ${line.units}x (${line.alloc.label}) | كرتون ${line.pkg.netKg} كجم | ${line.totalCartons.toLocaleString('en-US')} كرتون | ${(line.netKg / 1000).toFixed(2)} MT صافي | $${Math.round(line.lineValueUsd).toLocaleString('en-US')}`
      );

      const docsList =
        selectedDocs.length > 0
          ? selectedDocs.map((d) => d.title).join(' + ')
          : 'حسب المتطلبات القياسية';

      const message = [
        'بيان تصدير مبدئي (Pro-Forma Manifest) — الفئة الملكية VIP (Tihama Golden Tropics®)',
        '==================================================',
        `الجهة المستوردة: ${company}`,
        `ميناء / مطار الوجهة: ${destination}`,
        `شروط التسليم (Incoterm): ${incoterm.code} (${incoterm.desc})`,
        '--------------------------------------------------',
        'تفاصيل التخصيصات المختلطة:',
        ...lineDescriptions,
        '--------------------------------------------------',
        `إجمالي الكراتين: ${totals.cartons.toLocaleString('en-US')} كرتون`,
        `إجمالي الباليتات: ${totals.pallets.toLocaleString('en-US')} Euro-Pallet`,
        `إجمالي الوزن الصافي: ${(totals.netKg / 1000).toFixed(2)} طن متري (MT)`,
        `إجمالي الوزن الإجمالي: ${(totals.grossKg / 1000).toFixed(2)} طن متري (MT)`,
        `القيمة التقديرية (${incoterm.code}): $${Math.round(totals.valueUsd).toLocaleString('en-US')} USD`,
        `مستندات الامتثال المطلوبة: ${docsList}`,
        `نافذة الشحن والملاحظات: ${windowNotes}`,
      ].join('\n');

      window.open(`${waBase}${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
  }

  /* ---- 8. Cold Chain Steps & Harvest Calendar ---- */
  const vipColdSteps = document.getElementById('vip-cold-steps');
  if (vipColdSteps) {
    vipColdSteps.innerHTML = MANGO_DATA.coldChainSteps
      .map(
        (s) => `
        <div class="vip-cold-step">
          <div class="vip-step-num">${s.num}</div>
          <div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
          </div>
        </div>`
      )
      .join('');
  }

  const vipCalHead = document.getElementById('vip-cal-head');
  const vipCalBody = document.getElementById('vip-cal-body');
  if (vipCalHead && vipCalBody) {
    vipCalHead.innerHTML =
      `<th>الصنف التصديري</th>` + MANGO_DATA.months.map((m) => `<th>${m}</th>`).join('');
    vipCalBody.innerHTML = MANGO_DATA.calendar
      .map(
        (row) => `
        <tr>
          <td>${row.cultivar}</td>
          ${row.levels
            .map((lvl) => {
              const title =
                lvl === 2 ? 'ذروة التصدير' : lvl === 1 ? 'موسم محدود' : 'خارج الموسم';
              return `<td><span class="v-dot lvl-${lvl}" title="${row.cultivar} — ${title}"></span></td>`;
            })
            .join('')}
        </tr>`
      )
      .join('');
  }
})();
