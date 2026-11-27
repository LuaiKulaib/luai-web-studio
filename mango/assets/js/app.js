/* =========================================================
   app.js — تهامة جولدن تروبيكس (Tihama Golden Tropics®)
   Interactive Cultivar Filter, Harvest Calendar, Reefer Configurator & B2B RFQ
   ========================================================= */
'use strict';

(function initMangoExportPortal() {
  const waBase = `https://wa.me/${MANGO_CONFIG.whatsappNumber}?text=`;

  /* ---- 1. KPI Strip --------------------------------------- */
  const kpiEl = document.getElementById('kpi-strip');
  if (kpiEl) {
    kpiEl.innerHTML = MANGO_DATA.kpis
      .map(
        (k) => `
        <div class="kpi-box">
          <strong>${k.value}</strong>
          <small>${k.unit}</small>
          <span>${k.label}</span>
        </div>`
      )
      .join('');
  }

  /* ---- 2. Cultivars Grid & Mode Filter -------------------- */
  const gridEl = document.getElementById('cultivar-grid');
  const filterWrap = document.getElementById('cultivar-filters');
  const rfqCultivarSelect = document.getElementById('rfq-cultivar');

  function renderCultivars(mode = 'all') {
    if (!gridEl) return;
    const list =
      mode === 'all'
        ? MANGO_DATA.cultivars
        : MANGO_DATA.cultivars.filter((c) => c.mode === mode);

    gridEl.innerHTML = list
      .map((c) => {
        const waMsg = encodeURIComponent(
          `السلام عليكم، نرغب في طلب عينة وتسعيرة تصديرية لصنف (${c.nameAr} / ${c.nameEn}) بمعايير UNECE FFV-45.`
        );
        return `
        <article class="cult-card">
          <div class="cult-img">
            <img src="${c.image}" alt="${c.nameAr}" loading="lazy" />
            <span class="cult-badge">${c.badge}</span>
          </div>
          <div class="cult-body">
            <div class="cult-en">${c.nameEn}</div>
            <h3>${c.nameAr}</h3>
            <p>${c.desc}</p>
            <div class="spec-matrix">
              <div class="spec-cell">
                <span>درجة الحلاوة (Brix)</span>
                <strong>${c.brix}</strong>
              </div>
              <div class="spec-cell">
                <span>المادة الجافة (Dry Matter)</span>
                <strong>${c.dryMatter}</strong>
              </div>
              <div class="spec-cell">
                <span>الأوزان والتدريج (Caliber)</span>
                <strong>${c.weightRange} (${c.caliber})</strong>
              </div>
              <div class="spec-cell">
                <span>العمر التسويقي والتخزين</span>
                <strong>${c.shelfLife}</strong>
              </div>
            </div>
            <div class="cult-actions">
              <button type="button" class="btn-spec-rfq" data-cultivar="${c.nameAr}">تحديد في طلب التسعيرة</button>
              <a href="${waBase}${waMsg}" target="_blank" rel="noopener noreferrer" class="btn-wa-sm">استفسار فوري</a>
            </div>
          </div>
        </article>`;
      })
      .join('');
  }

  renderCultivars('all');

  if (filterWrap) {
    filterWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.f-pill');
      if (!btn) return;
      filterWrap.querySelectorAll('.f-pill').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderCultivars(btn.dataset.filter || 'all');
    });
  }

  if (gridEl) {
    gridEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-spec-rfq');
      if (!btn || !rfqCultivarSelect) return;
      const targetName = btn.dataset.cultivar;
      for (const opt of rfqCultivarSelect.options) {
        if (opt.value === targetName) {
          rfqCultivarSelect.value = targetName;
          break;
        }
      }
      document.getElementById('rfq')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---- 3. Harvest Availability Calendar ------------------- */
  const calHead = document.getElementById('calendar-head');
  const calBody = document.getElementById('calendar-body');

  if (calHead && calBody) {
    calHead.innerHTML =
      `<th>الصنف التصديري</th>` + MANGO_DATA.months.map((m) => `<th>${m}</th>`).join('');

    calBody.innerHTML = MANGO_DATA.calendar
      .map(
        (row) => `
        <tr>
          <td>${row.cultivar}</td>
          ${row.levels
            .map((lvl) => {
              const title =
                lvl === 2 ? 'ذروة التصدير' : lvl === 1 ? 'موسم محدود' : 'خارج الموسم';
              return `<td><span class="cal-dot lvl-${lvl}" title="${row.cultivar} — ${title}"></span></td>`;
            })
            .join('')}
        </tr>`
      )
      .join('');
  }

  /* ---- 4. Packaging & Container Configurator -------------- */
  const cfgCultivar = document.getElementById('cfg-cultivar');
  const cfgPkg = document.getElementById('cfg-packaging');
  const cfgAlloc = document.getElementById('cfg-allocation');
  const cfgQty = document.getElementById('cfg-qty');
  const sumCartons = document.getElementById('sum-cartons');
  const sumNet = document.getElementById('sum-net-kg');
  const sumGross = document.getElementById('sum-gross-kg');
  const cfgNote = document.getElementById('cfg-pack-note');
  const cfgWaBtn = document.getElementById('cfg-wa-btn');

  if (cfgCultivar && rfqCultivarSelect) {
    const optionsHtml = MANGO_DATA.cultivars
      .map((c) => `<option value="${c.nameAr}">${c.nameAr} (${c.caliber})</option>`)
      .join('');
    cfgCultivar.innerHTML = optionsHtml;
    rfqCultivarSelect.innerHTML =
      optionsHtml + `<option value="تشكيلة أصناف متعددة">تشكيلة أصناف متعددة (Mixed Container)</option>`;
  }

  if (cfgPkg) {
    cfgPkg.innerHTML = MANGO_DATA.packagingOptions
      .map((p) => `<option value="${p.id}">${p.label}</option>`)
      .join('');
  }

  if (cfgAlloc) {
    cfgAlloc.innerHTML = MANGO_DATA.allocations
      .map((a) => `<option value="${a.id}">${a.label}</option>`)
      .join('');
    cfgAlloc.value = 'reefer40';
  }

  function updatePackagingSummary() {
    if (!cfgPkg || !cfgAlloc || !cfgQty || !cfgCultivar) return;
    const pkg = MANGO_DATA.packagingOptions.find((p) => p.id === cfgPkg.value) || MANGO_DATA.packagingOptions[0];
    const alloc = MANGO_DATA.allocations.find((a) => a.id === cfgAlloc.value) || MANGO_DATA.allocations[2];
    const qty = Math.max(1, parseInt(cfgQty.value, 10) || 1);

    let cartonsPerUnit = pkg.perEuroPallet;
    if (alloc.mult === 'reefer40') {
      cartonsPerUnit = pkg.perReefer40;
    } else if (typeof alloc.mult === 'number') {
      cartonsPerUnit = pkg.perEuroPallet * alloc.mult;
    }

    const totalCartons = cartonsPerUnit * qty;
    const totalNetKg = totalCartons * pkg.netKg;
    const totalGrossKg = totalCartons * pkg.grossKg;

    if (sumCartons) sumCartons.textContent = `${totalCartons.toLocaleString('en-US')} كرتون`;
    if (sumNet) sumNet.textContent = `${(totalNetKg / 1000).toFixed(2)} طن (${totalNetKg.toLocaleString('en-US')} كجم)`;
    if (sumGross) sumGross.textContent = `${(totalGrossKg / 1000).toFixed(2)} طن`;
    if (cfgNote) cfgNote.textContent = `مواصفة التعبئة: ${pkg.note} — منشأ الحديدة (${MANGO_CONFIG.standardRef}).`;

    if (cfgWaBtn) {
      const msg = encodeURIComponent(
        `طلب تسعير حمولة تصدير مانجو (${MANGO_CONFIG.brandAr}):\n` +
          `- الصنف: ${cfgCultivar.value}\n` +
          `- نوع الكرتون: ${pkg.label}\n` +
          `- وحدة الشحن: ${alloc.label} × ${qty}\n` +
          `- إجمالي الكراتين: ${totalCartons.toLocaleString('en-US')} كرتون\n` +
          `- الوزن الصافي: ${(totalNetKg / 1000).toFixed(2)} طن متري`
      );
      cfgWaBtn.href = `${waBase}${msg}`;
    }
  }

  [cfgCultivar, cfgPkg, cfgAlloc, cfgQty].forEach((el) => {
    el?.addEventListener('change', updatePackagingSummary);
  });
  updatePackagingSummary();

  /* ---- 5. Cold Chain & Certifications --------------------- */
  const coldEl = document.getElementById('cold-grid');
  if (coldEl) {
    coldEl.innerHTML = MANGO_DATA.coldChainSteps
      .map(
        (s) => `
        <article class="cold-card">
          <div class="cold-num">${s.num}</div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </article>`
      )
      .join('');
  }

  const certEl = document.getElementById('cert-grid');
  if (certEl) {
    certEl.innerHTML = MANGO_DATA.certifications
      .map(
        (c) => `
        <article class="cert-card">
          <span class="cert-code">${c.code}</span>
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
        </article>`
      )
      .join('');
  }

  /* ---- 6. B2B Export RFQ Form -> WhatsApp ----------------- */
  const rfqForm = document.getElementById('rfq-form');
  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = document.getElementById('rfq-company')?.value.trim() || '';
      const country = document.getElementById('rfq-country')?.value.trim() || '';
      const cultivar = rfqCultivarSelect?.value || '';
      const mode = document.getElementById('rfq-mode')?.value || '';
      const volume = document.getElementById('rfq-volume')?.value.trim() || '';
      const notes = document.getElementById('rfq-notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

      const msg = encodeURIComponent(
        `طلب عرض سعر تصدير رسمي (B2B RFQ) — ${MANGO_CONFIG.brandAr}:\n` +
          `• الشركة المستوردة: ${company}\n` +
          `• الوجهة / الميناء: ${country}\n` +
          `• الصنف المطلوب: ${cultivar}\n` +
          `• شروط التسليم: ${mode}\n` +
          `• الكمية المطلوبة: ${volume}\n` +
          `• متطلبات إضافية: ${notes}`
      );
      window.open(`${waBase}${msg}`, '_blank', 'noopener,noreferrer');
    });
  }
})();
