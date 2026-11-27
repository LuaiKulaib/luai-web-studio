/* ============================================================
   CHROME PRO — VIP Tier ($250): Monaco Supercar Vault
   cars/vip/app.js
   ============================================================ */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '967782259937';

  const VEHICLE_TIERS = {
    sedan: { name: 'Sedan / Executive', ar: 'سيدان فاخرة وكوبيه', factor: 1.0 },
    suv: { name: 'Luxury SUV', ar: 'دفع رباعي فارهة', factor: 1.28 },
    supercar: { name: 'Supercar / Hypercar', ar: 'سوبركار / هايبركار', factor: 1.55 }
  };

  const PPF_FINISHES = {
    'ultra-gloss': { name: 'Ultra-Gloss', ar: 'لمعان مرآتي فائق الشفافية', surcharge: 0 },
    'stealth-matte': { name: 'Stealth Matte', ar: 'مطفي حريري خفي (Stealth)', surcharge: 1400 }
  };

  const BASE_ZONES = {
    front: { label: 'Front Impact Kit (واجهة + كبوت + مرايا + أنوار)', price: 2900, warranty: 5, days: 1.5 },
    fullbody: { label: 'Full Body Wrap (تغليف كامل بدون فواصل)', price: 9200, warranty: 10, days: 4 },
    ceramic: { label: 'Ceramic Coat 9H Double Layer (طبقتان)', price: 2100, warranty: 5, days: 1 },
    leather: { label: 'Leather & Alcantara Shield (درع المقصورة)', price: 1250, warranty: 2, days: 0.5 }
  };

  const LAB_CASES = {
    ppf: {
      title: 'حماية كاملة بالفيلم الشفاف PPF',
      desc: 'تغليف الهيكل كاملاً بفيلم حماية فائق الشفافية مع ثني الحواف للداخل وخاصية الالتئام الذاتي بالحرارة.',
      beforeImg: '../assets/images/ba-ppf-before.jpg',
      afterImg: '../assets/images/ba-ppf-after.jpg',
      beforeLabel: 'قبل: معرض للترميل والحصى',
      afterLabel: 'بعد: درع التئام ذاتي',
      pills: ['XPEL Ultimate Plus', 'ضمان 10 سنوات', 'ثني حواف مخفي']
    },
    ceramic: {
      title: 'نانو سيراميك 9H/10H مزدوج الطبقات',
      desc: 'تصحيح طلاء متكامل مع تطبيق طبقتين كريستال سيراميك تمنحان لمعاناً زجاجياً عميقاً وطرداً مائياً.',
      beforeImg: '../assets/images/ba-ceramic-before.jpg',
      afterImg: '../assets/images/ba-ceramic-after.jpg',
      beforeLabel: 'قبل: دوائر غسيل وبهتان',
      afterLabel: 'بعد: عمق لوني 100%',
      pills: ['Gtechniq Crystal Serum', 'ضمان 5 سنوات', 'طرد مائي فائق']
    },
    tint: {
      title: 'عازل حراري نانو سيراميك IR 98%',
      desc: 'تظليل نانو سيراميك بدرجة VLT مخصصة يحجب الأشعة تحت الحمراء بنسبة 98% مع رؤية ليلية صافية.',
      beforeImg: '../assets/images/ba-tint-before.jpg',
      afterImg: '../assets/images/ba-tint-after.jpg',
      beforeLabel: 'قبل: حرارة لافحة داخل المقصورة',
      afterLabel: 'بعد: عزل 98% IR',
      pills: ['3M Crystalline Series', 'حجب 99.9% UV', 'ضمان 10 سنوات']
    },
    interior: {
      title: 'حماية الجلود والألكانتارا والمقصورة',
      desc: 'تعقيم بالبخار الحراري وتطبيق درع نانو يحمي المقاعد الجلدية والألكانتارا من التصبغ والتشقق.',
      beforeImg: '../assets/images/ba-interior-before.jpg',
      afterImg: '../assets/images/ba-interior-after.jpg',
      beforeLabel: 'قبل: بهتان واتساخ الأنسجة',
      afterLabel: 'بعد: نظافة ودرع حماية',
      pills: ['Koch-Chemie German', 'حماية ضد التصبغات', 'تعقيم نانو']
    }
  };

  const VAULT_GALLERY = [
    { id: 1, category: 'ceramic', catName: 'نانو سيراميك', img: '../assets/images/g-1.jpg', label: 'بورش 911 GT3 RS', sub: 'تصحيح طلاء 3 مراحل + سيراميك مزدوج 10H', warranty: '5 سنوات' },
    { id: 2, category: 'ppf', catName: 'تغليف PPF', img: '../assets/images/g-2.jpg', label: 'مرسيدس G63 AMG', sub: 'تغليف Stealth Matte كامل مع ثني الحواف', warranty: '10 سنوات' },
    { id: 3, category: 'ceramic', catName: 'نانو سيراميك', img: '../assets/images/g-3.jpg', label: 'لامبورغيني هوراكان', sub: 'طلاء كريستال سيراميك + حماية الجنوط', warranty: '5 سنوات' },
    { id: 4, category: 'tint', catName: 'عازل حراري', img: '../assets/images/g-4.jpg', label: 'بي إم دبليو M8 كومبيتيشن', sub: 'عازل حراري IR 98% بدرجة 30% VLT', warranty: '10 سنوات' },
    { id: 5, category: 'interior', catName: 'مقصورة وتجليد', img: '../assets/images/g-5.jpg', label: 'رينج روفر أوتوبيوغرافي', sub: 'درع الجلود والألكانتارا + تعقيم بالبخار', warranty: 'سنتان' },
    { id: 6, category: 'ppf', catName: 'تغليف PPF', img: '../assets/images/g-6.jpg', label: 'فيراري F8 تريبوتو', sub: 'تغليف كامل Ultra-Gloss ذاتي الالتئام', warranty: '10 سنوات' },
    { id: 7, category: 'ppf', catName: 'تغليف PPF', img: '../assets/images/g-7.jpg', label: 'لكزس LX600 VIP', sub: 'حماية الواجهة الأمامية والبانوراما', warranty: '5 سنوات' },
    { id: 8, category: 'ceramic', catName: 'نانو سيراميك', img: '../assets/images/g-8.jpg', label: 'أودي RS7 سبورتباك', sub: 'إزالة الدوائر بنسبة 95% + سيراميك 9H', warranty: '5 سنوات' },
    { id: 9, category: 'ceramic', catName: 'نانو سيراميك', img: '../assets/images/g-9.jpg', label: 'لاندكروزر 300 GR', sub: 'نانو سيراميك للهيكل والجنوط والزجاج', warranty: '5 سنوات' },
    { id: 10, category: 'interior', catName: 'مقصورة وتجليد', img: '../assets/images/g-10.jpg', label: 'ماكلارين 720S', sub: 'حماية الكاربون فايبر وتجليد السقف', warranty: '3 سنوات' },
    { id: 11, category: 'ceramic', catName: 'نانو سيراميك', img: '../assets/images/g-11.jpg', label: 'مكابح وجنوط سيراميك', sub: 'طلاء حراري مقاوم لغبار المكابح والحرارة', warranty: '3 سنوات' },
    { id: 12, category: 'ppf', catName: 'تغليف PPF', img: '../assets/images/g-12.jpg', label: 'فحص تشطيب الوكالة النهائي', sub: 'مراجعة شاملة تحت إضاءة الديتيلنج الطيفية', warranty: '10 سنوات' }
  ];

  let activeTier = 'sedan';
  let activeFinish = 'ultra-gloss';
  let activeVaultFilter = 'all';

  function waUrl(msg) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  function formatSar(val) {
    return Math.round(val).toLocaleString('en-US');
  }

  function initHeader() {
    const toggleBtn = document.getElementById('mobileToggleBtn');
    const nav = document.getElementById('vaultNav');
    const headerBtn = document.getElementById('headerConciergeBtn');
    const footerBtn = document.getElementById('footerConciergeBtn');

    const baseMsg = 'السلام عليكم، أود التواصل مع كونسيرج كروم برو — الفئة الملكية VIP لجدولة استلام سيارتي.';
    if (headerBtn) headerBtn.href = waUrl(baseMsg);
    if (footerBtn) footerBtn.href = waUrl(baseMsg);

    if (toggleBtn && nav) {
      toggleBtn.addEventListener('click', function () {
        const open = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', String(!open));
        nav.classList.toggle('open');
      });

      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ------------------------------------------------------------
     Bespoke Spec Builder + Live Work-Order & Warranty Certificate
     ------------------------------------------------------------ */
  function initSpecBuilder() {
    const tierBtns = document.querySelectorAll('#vehicleTierGroup .tier-card');
    const finishBtns = document.querySelectorAll('#ppfFinishGroup .finish-card');

    const zoneFront = document.getElementById('zoneFront');
    const zoneFullBody = document.getElementById('zoneFullBody');
    const zoneCeramic = document.getElementById('zoneCeramic');
    const zoneLeather = document.getElementById('zoneLeather');

    const priceZoneFront = document.getElementById('priceZoneFront');
    const priceZoneFull = document.getElementById('priceZoneFull');
    const priceZoneCeramic = document.getElementById('priceZoneCeramic');
    const priceZoneLeather = document.getElementById('priceZoneLeather');

    const vltSlider = document.getElementById('vltSlider');
    const tintVltBadge = document.getElementById('tintVltBadge');
    const tintModeDesc = document.getElementById('tintModeDesc');
    const tintIrSpec = document.getElementById('tintIrSpec');
    const tintPriceSpec = document.getElementById('tintPriceSpec');

    const flatbedToggle = document.getElementById('flatbedToggle');
    const flatbedSubText = document.getElementById('flatbedSubText');
    const flatbedPriceBadge = document.getElementById('flatbedPriceBadge');

    const certSerial = document.getElementById('certSerial');
    const woVehicleTier = document.getElementById('woVehicleTier');
    const woPpfFinish = document.getElementById('woPpfFinish');
    const woWarrantyYears = document.getElementById('woWarrantyYears');
    const woDuration = document.getElementById('woDuration');
    const woItemsList = document.getElementById('woItemsList');
    const woTotalSar = document.getElementById('woTotalSar');
    const woInstallmentSar = document.getElementById('woInstallmentSar');
    const vipCarModelInput = document.getElementById('vipCarModelInput');
    const conciergeDispatchBtn = document.getElementById('conciergeDispatchBtn');

    function computeSerial(total) {
      const tierCode = activeTier === 'supercar' ? 'SC' : activeTier === 'suv' ? 'SV' : 'SD';
      const finCode = activeFinish === 'stealth-matte' ? 'SM' : 'UG';
      const num = 7000 + (Math.round(total) % 2899);
      return 'CP-VIP-' + tierCode + finCode + '-' + num;
    }

    function updateBuilder() {
      const tier = VEHICLE_TIERS[activeTier] || VEHICLE_TIERS.sedan;
      const finish = PPF_FINISHES[activeFinish] || PPF_FINISHES['ultra-gloss'];

      // Dynamic zone prices scaled by vehicle tier
      const frontPrice = Math.round(BASE_ZONES.front.price * tier.factor);
      const fullPrice = Math.round(BASE_ZONES.fullbody.price * tier.factor);
      const ceramicPrice = Math.round(BASE_ZONES.ceramic.price * tier.factor);
      const leatherPrice = Math.round(BASE_ZONES.leather.price * tier.factor);

      if (priceZoneFront) priceZoneFront.textContent = formatSar(frontPrice) + ' SAR';
      if (priceZoneFull) priceZoneFull.textContent = formatSar(fullPrice) + ' SAR';
      if (priceZoneCeramic) priceZoneCeramic.textContent = formatSar(ceramicPrice) + ' SAR';
      if (priceZoneLeather) priceZoneLeather.textContent = formatSar(leatherPrice) + ' SAR';

      const lineItems = [];
      let subtotal = 0;
      let maxWarranty = 1;
      let totalDays = 0;

      // Mutual exclusivity: Full Body Wrap supersedes Front Impact Kit
      if (zoneFullBody && zoneFullBody.checked) {
        lineItems.push({ name: BASE_ZONES.fullbody.label, price: fullPrice });
        subtotal += fullPrice;
        maxWarranty = Math.max(maxWarranty, BASE_ZONES.fullbody.warranty);
        totalDays += BASE_ZONES.fullbody.days;
      } else if (zoneFront && zoneFront.checked) {
        lineItems.push({ name: BASE_ZONES.front.label, price: frontPrice });
        subtotal += frontPrice;
        maxWarranty = Math.max(maxWarranty, BASE_ZONES.front.warranty);
        totalDays += BASE_ZONES.front.days;
      }

      // PPF Finish surcharge applies only if a PPF zone is active
      const hasPpf = (zoneFullBody && zoneFullBody.checked) || (zoneFront && zoneFront.checked);
      if (hasPpf && finish.surcharge > 0) {
        const finishCost = zoneFullBody && zoneFullBody.checked
          ? Math.round(finish.surcharge * tier.factor)
          : Math.round((finish.surcharge * 0.45) * tier.factor);
        lineItems.push({ name: 'تشطيب ' + finish.name + ' (' + finish.ar + ')', price: finishCost });
        subtotal += finishCost;
      }

      if (zoneCeramic && zoneCeramic.checked) {
        lineItems.push({ name: BASE_ZONES.ceramic.label, price: ceramicPrice });
        subtotal += ceramicPrice;
        maxWarranty = Math.max(maxWarranty, BASE_ZONES.ceramic.warranty);
        totalDays += BASE_ZONES.ceramic.days;
      }

      if (zoneLeather && zoneLeather.checked) {
        lineItems.push({ name: BASE_ZONES.leather.label, price: leatherPrice });
        subtotal += leatherPrice;
        maxWarranty = Math.max(maxWarranty, BASE_ZONES.leather.warranty);
        totalDays += BASE_ZONES.leather.days;
      }

      // IR Nano-Tint VLT% slider
      const vltVal = vltSlider ? Number(vltSlider.value) : 0;
      let tintPrice = 0;
      if (vltVal > 0) {
        tintPrice = Math.round(1650 * (activeTier === 'suv' ? 1.18 : activeTier === 'supercar' ? 1.1 : 1.0));
        const irReject = vltVal <= 20 ? '98% IR' : vltVal <= 40 ? '96% IR' : '93% IR';
        if (tintVltBadge) tintVltBadge.textContent = vltVal + '% VLT';
        if (tintModeDesc) tintModeDesc.textContent = 'تظليل نانو سيراميك IR بدرجة نفاذية ضوء ' + vltVal + '% وعزل للأشعة فوق البنفسجية 99.9%';
        if (tintIrSpec) tintIrSpec.textContent = irReject;
        if (tintPriceSpec) tintPriceSpec.textContent = formatSar(tintPrice) + ' SAR';
        lineItems.push({ name: 'IR Nano-Tint (' + vltVal + '% VLT — ' + irReject + ')', price: tintPrice });
        subtotal += tintPrice;
        maxWarranty = Math.max(maxWarranty, 10);
        totalDays += 0.5;
      } else {
        if (tintVltBadge) tintVltBadge.textContent = '0% (إيقاف)';
        if (tintModeDesc) tintModeDesc.textContent = 'بدون تظليل حراري — حرّك المؤشر لاختيار نسبة الـ VLT المطلوبة';
        if (tintIrSpec) tintIrSpec.textContent = 'غير مفعّل';
        if (tintPriceSpec) tintPriceSpec.textContent = '0 SAR';
      }

      // Flatbed Tow Service (Complimentary >= 9,000 SAR)
      const isComplimentaryTow = subtotal >= 9000;
      const towCost = flatbedToggle && flatbedToggle.checked ? (isComplimentaryTow ? 0 : 350) : 0;
      if (flatbedSubText) {
        flatbedSubText.textContent = isComplimentaryTow
          ? 'سطحة VIP مغلقة مجانية بالكامل (مشمولة لباقات فوق 9,000 ر.س)'
          : 'استلام وتسليم السيارة عبر سطحة مغلقة مؤمنة بالكامل في الرياض';
      }
      if (flatbedPriceBadge) {
        flatbedPriceBadge.textContent = isComplimentaryTow ? 'مجاناً (VIP)' : '+350 SAR';
      }

      if (flatbedToggle && flatbedToggle.checked) {
        lineItems.push({
          name: 'سطحة VIP مغلقة (استلام وتسليم)',
          price: towCost,
          freeLabel: isComplimentaryTow ? 'مجاناً' : null
        });
        subtotal += towCost;
      }

      if (lineItems.length === 0) {
        lineItems.push({ name: 'يرجى اختيار منطقة حماية واحدة على الأقل', price: 0 });
      }

      const warrantyText = maxWarranty + (maxWarranty === 2 ? ' سنتان' : ' سنوات') + ' معتمدة';
      const roundedDays = Math.max(1, Math.ceil(totalDays));
      const durationText = roundedDays === 1 ? 'يوم عمل واحد' : roundedDays === 2 ? 'يومان عمل' : roundedDays + ' أيام عمل';
      const installment = Math.round(subtotal / 4);
      const serial = computeSerial(subtotal);

      if (certSerial) certSerial.textContent = serial;
      if (woVehicleTier) woVehicleTier.textContent = tier.name;
      if (woPpfFinish) woPpfFinish.textContent = hasPpf ? finish.name : 'بدون PPF';
      if (woWarrantyYears) woWarrantyYears.textContent = lineItems[0].price === 0 && subtotal === 0 ? '—' : warrantyText;
      if (woDuration) woDuration.textContent = subtotal === 0 ? '—' : durationText;

      if (woItemsList) {
        woItemsList.innerHTML = lineItems.map(function (item) {
          const rightVal = item.freeLabel ? item.freeLabel : formatSar(item.price) + ' SAR';
          return '<li><span>' + item.name + '</span><strong>' + rightVal + '</strong></li>';
        }).join('');
      }

      if (woTotalSar) woTotalSar.textContent = formatSar(subtotal);
      if (woInstallmentSar) woInstallmentSar.textContent = formatSar(installment) + ' SAR / mo';

      if (conciergeDispatchBtn) {
        const carModel = vipCarModelInput && vipCarModelInput.value.trim()
          ? vipCarModelInput.value.trim()
          : 'غير محدد';

        const specLines = [
          'طلب أمر عمل رسمي — كروم برو (الفئة الملكية VIP)',
          'رقم الشهادة المبدئي: ' + serial,
          'فئة المركبة: ' + tier.name + ' (' + tier.ar + ')',
          'نوع وموديل السيارة: ' + carModel,
          'تشطيب PPF: ' + (hasPpf ? finish.name + ' (' + finish.ar + ')' : 'غير مختار'),
          'البنود المختارة:',
        ];

        lineItems.forEach(function (it) {
          specLines.push('  - ' + it.name + ': ' + (it.freeLabel || formatSar(it.price) + ' ر.س'));
        });

        specLines.push('مدة الضمان: ' + warrantyText + ' (تشمل فحص وصيانة سنوية مجانية)');
        specLines.push('فترة التنفيذ المقدرة: ' + durationText);
        specLines.push('الإجمالي النهائي: ' + formatSar(subtotal) + ' ر.س');
        specLines.push('تقسيط تابي / تمارا: ' + formatSar(installment) + ' ر.س × 4 دفعات بدون فوائد');

        conciergeDispatchBtn.href = waUrl(specLines.join('\n'));
      }
    }

    tierBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeTier = btn.dataset.tier;
        tierBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.tier === activeTier); });
        updateBuilder();
      });
    });

    finishBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeFinish = btn.dataset.finish;
        finishBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.finish === activeFinish); });
        updateBuilder();
      });
    });

    // If user checks Full Body, uncheck Front Impact so selection stays intuitive
    if (zoneFullBody && zoneFront) {
      zoneFullBody.addEventListener('change', function () {
        if (zoneFullBody.checked) zoneFront.checked = false;
        updateBuilder();
      });
      zoneFront.addEventListener('change', function () {
        if (zoneFront.checked) zoneFullBody.checked = false;
        updateBuilder();
      });
    }

    if (zoneCeramic) zoneCeramic.addEventListener('change', updateBuilder);
    if (zoneLeather) zoneLeather.addEventListener('change', updateBuilder);
    if (vltSlider) vltSlider.addEventListener('input', updateBuilder);
    if (flatbedToggle) flatbedToggle.addEventListener('change', updateBuilder);
    if (vipCarModelInput) vipCarModelInput.addEventListener('input', updateBuilder);

    updateBuilder();
  }

  /* ------------------------------------------------------------
     Optical Inspection Lab (Before/After Slider)
     ------------------------------------------------------------ */
  function initLab() {
    const tabs = document.querySelectorAll('#labTabs .lab-tab');
    const beforeImg = document.getElementById('labBeforeImg');
    const afterImg = document.getElementById('labAfterImg');
    const beforeLabel = document.getElementById('labBeforeLabel');
    const afterLabel = document.getElementById('labAfterLabel');
    const titleEl = document.getElementById('labTitle');
    const descEl = document.getElementById('labDesc');
    const specsEl = document.getElementById('labSpecs');

    const slider = document.getElementById('labSlider');
    const beforeWrap = document.getElementById('labBeforeWrap');
    const divider = document.getElementById('labDivider');

    function setPos(val) {
      const pct = Math.min(95, Math.max(5, Number(val) || 50));
      if (beforeWrap) beforeWrap.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      if (divider) divider.style.left = pct + '%';
    }

    function selectLab(id) {
      const item = LAB_CASES[id] || LAB_CASES.ppf;
      tabs.forEach(function (t) { t.classList.toggle('active', t.dataset.lab === id); });
      if (beforeImg) beforeImg.src = item.beforeImg;
      if (afterImg) afterImg.src = item.afterImg;
      if (beforeLabel) beforeLabel.textContent = item.beforeLabel;
      if (afterLabel) afterLabel.textContent = item.afterLabel;
      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.desc;
      if (specsEl) {
        specsEl.innerHTML = item.pills.map(function (p) {
          return '<span class="lab-pill">' + p + '</span>';
        }).join('');
      }
    }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        selectLab(t.dataset.lab);
      });
    });

    if (slider) {
      slider.addEventListener('input', function (e) {
        setPos(e.target.value);
      });
    }

    setPos(50);
    selectLab('ppf');
  }

  /* ------------------------------------------------------------
     Curated Supercar Vault Gallery (g-1..g-12) + Lightbox
     ------------------------------------------------------------ */
  function initVaultGallery() {
    const filterBtns = document.querySelectorAll('#vaultFilters .v-filter');
    const grid = document.getElementById('vaultGalleryGrid');

    const modal = document.getElementById('vaultModal');
    const closeBtn = document.getElementById('vModalClose');
    const mImg = document.getElementById('vModalImg');
    const mCat = document.getElementById('vModalCat');
    const mTitle = document.getElementById('vModalTitle');
    const mSub = document.getElementById('vModalSub');
    const mSpecs = document.getElementById('vModalSpecs');
    const mWaBtn = document.getElementById('vModalWaBtn');

    function openModal(item) {
      if (!modal) return;
      if (mImg) { mImg.src = item.img; mImg.alt = item.label; }
      if (mCat) mCat.textContent = item.catName;
      if (mTitle) mTitle.textContent = item.label;
      if (mSub) mSub.textContent = item.sub;
      if (mSpecs) {
        mSpecs.innerHTML =
          '<div class="v-spec-line"><span>الضمان المعتمد</span><strong>' + item.warranty + '</strong></div>' +
          '<div class="v-spec-line"><span>الصيانة السنوية</span><strong>مشمولة مجاناً</strong></div>' +
          '<div class="v-spec-line"><span>المستوى</span><strong>الفئة الملكية VIP</strong></div>';
      }
      if (mWaBtn) {
        mWaBtn.href = waUrl('السلام عليكم، أود حجز باقة مماثلة لسيارة (' + item.label + ' — ' + item.sub + ') ضمن الفئة الملكية VIP.');
      }
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.hidden = true;
      document.body.style.overflow = '';
    }

    function render() {
      if (!grid) return;
      const items = activeVaultFilter === 'all'
        ? VAULT_GALLERY
        : VAULT_GALLERY.filter(function (g) { return g.category === activeVaultFilter; });

      grid.innerHTML = items.map(function (item) {
        return (
          '<button type="button" class="v-card" data-vid="' + item.id + '">' +
            '<div class="v-card-img">' +
              '<img src="' + item.img + '" alt="' + item.label + '" loading="lazy" />' +
              '<span class="v-card-tag">' + item.catName + '</span>' +
            '</div>' +
            '<div class="v-card-body">' +
              '<h3>' + item.label + '</h3>' +
              '<p>' + item.sub + '</p>' +
            '</div>' +
          '</button>'
        );
      }).join('');

      grid.querySelectorAll('.v-card').forEach(function (card) {
        card.addEventListener('click', function () {
          const id = Number(card.dataset.vid);
          const found = VAULT_GALLERY.find(function (g) { return g.id === id; });
          if (found) openModal(found);
        });
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeVaultFilter = btn.dataset.vfilter;
        filterBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.vfilter === activeVaultFilter); });
        render();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
    });

    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initSpecBuilder();
    initLab();
    initVaultGallery();
  });
})();
