/* ============================================================
   CHROME PRO — Pro Tier ($120) Interactive Controller
   cars/pro/app.js
   ============================================================ */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '967782259937';

  const STUDIO_CASES = {
    ppf: {
      badge: 'درع حماية ذاتي المعالجة',
      title: 'حماية كاملة بالفيلم الشفاف PPF',
      desc: 'تغليف الهيكل كاملاً بفيلم حماية أمريكي فائق الشفافية ضد ضربات الحصى والترميل مع خاصية الالتئام الذاتي بالحرارة.',
      beforeImg: '../assets/images/ba-ppf-before.jpg',
      afterImg: '../assets/images/ba-ppf-after.jpg',
      beforeLabel: 'قبل: معرض للترميل والحصى',
      afterLabel: 'بعد: محمي بدرع التئام ذاتي',
      specs: [
        { label: 'مدة التنفيذ', val: '3 أيام عمل' },
        { label: 'الضمان الرسمي', val: '10 سنوات ضد الاصفرار' },
        { label: 'الخامة المعتمدة', val: 'XPEL Ultimate Plus' }
      ]
    },
    ceramic: {
      badge: 'تصحيح طلاء + سيراميك 9H/10H',
      title: 'معالجة وتلميع نانو سيراميك',
      desc: 'إزالة الخدوش الدائرية وبهتان الطلاء بنسبة 95% مع تطبيق طبقة زجاجية عاكسة طاردة للماء والأوساخ.',
      beforeImg: '../assets/images/ba-ceramic-before.jpg',
      afterImg: '../assets/images/ba-ceramic-after.jpg',
      beforeLabel: 'قبل: دوائر غسيل وبهتان',
      afterLabel: 'بعد: لمعان وتصحيح 100%',
      specs: [
        { label: 'مدة التنفيذ', val: 'يوم ونصف' },
        { label: 'الضمان الرسمي', val: '5 سنوات معتمدة' },
        { label: 'الخامة المعتمدة', val: 'Gtechniq Crystal Serum' }
      ]
    },
    tint: {
      badge: 'عزل حراري بنسبة 98% IR',
      title: 'عازل حراري كربوني نانو سيراميك',
      desc: 'تركيب عازل حراري نانو سيراميك معتمد يحجب الأشعة تحت الحمراء بنسبة 98% مع وضوح رؤية استثنائي ليلاً.',
      beforeImg: '../assets/images/ba-tint-before.jpg',
      afterImg: '../assets/images/ba-tint-after.jpg',
      beforeLabel: 'قبل: حرارة لافحة داخل المقصورة',
      afterLabel: 'بعد: عزل حراري 98% وبرودة',
      specs: [
        { label: 'مدة التنفيذ', val: '3 ساعات فقط' },
        { label: 'الضمان الرسمي', val: '10 سنوات استبدال فوري' },
        { label: 'الخامة المعتمدة', val: '3M Crystalline Series' }
      ]
    },
    interior: {
      badge: 'تعقيم وحماية الجلود والأنسجة',
      title: 'ديتيلنج وعناية داخلية للمقصورة',
      desc: 'تنظيف بالبخار الحراري لجميع الأجزاء وإزالة البقع المستعصية مع ترطيب وحماية الجلود بمواد ألمانية أصلية.',
      beforeImg: '../assets/images/ba-interior-before.jpg',
      afterImg: '../assets/images/ba-interior-after.jpg',
      beforeLabel: 'قبل: بهتان واتساخ الأنسجة',
      afterLabel: 'بعد: نظافة ورائحة وكالة',
      specs: [
        { label: 'مدة التنفيذ', val: '6 ساعات' },
        { label: 'الضمان الرسمي', val: 'حماية سنة ضد التشققات' },
        { label: 'الخامة المعتمدة', val: 'Koch-Chemie Leather Star' }
      ]
    }
  };

  const CAR_CLASSES = {
    sedan: { name: 'سيدان / هاتشباك', factor: 1.0 },
    suv: { name: 'جيب / عائلية SUV', factor: 1.25 },
    supercar: { name: 'سوبركار / كوبيه', factor: 1.45 }
  };

  const PACKAGES = [
    {
      id: 'front-ppf',
      name: 'حماية الواجهة الأمامية PPF',
      sub: 'الصدام + الكبوت كامل + الأنوار + المرايا',
      basePrice: 2400,
      duration: 'يوم عمل واحد',
      warranty: '5 سنوات'
    },
    {
      id: 'full-ppf',
      name: 'حماية الهيكل بالكامل PPF',
      sub: 'تغليف كامل الهيكل ذاتي الالتئام بالحرارة',
      basePrice: 8500,
      duration: '3 - 4 أيام عمل',
      warranty: '10 سنوات'
    },
    {
      id: 'ceramic',
      name: 'نانو سيراميك 9H/10H ثلاثي الطبقات',
      sub: 'تصحيح طلاء 3 مراحل + حماية كريستالية',
      basePrice: 1600,
      duration: 'يوم ونصف',
      warranty: '3 سنوات'
    },
    {
      id: 'tint-ppf',
      name: 'باكيج مقدمة PPF + عازل حراري',
      sub: 'حماية الواجهة + تظليل نانو سيراميك 98% IR',
      basePrice: 3200,
      duration: 'يوم ونصف',
      warranty: '5 سنوات'
    },
    {
      id: 'full-protection',
      name: 'باكيج الحماية الشاملة',
      sub: 'PPF كامل + نانو سيراميك + عازل حراري',
      basePrice: 11000,
      duration: '4 أيام عمل',
      warranty: '10 سنوات'
    }
  ];

  const GARAGE_ITEMS = [
    {
      id: 1,
      category: 'ceramic',
      catName: 'نانو سيراميك',
      img: '../assets/images/g-1.jpg',
      label: 'تلميع بورش 911 GT3 RS',
      sub: 'تصحيح طلاء 3 مراحل + سيراميك 10H',
      duration: 'يوم ونصف',
      warranty: '5 سنوات'
    },
    {
      id: 2,
      category: 'ppf',
      catName: 'حماية PPF',
      img: '../assets/images/g-2.jpg',
      label: 'حماية PPF مرسيدس G63',
      sub: 'تغليف مطفي كامل مع ثني الحواف بدون فواصل',
      duration: '4 أيام عمل',
      warranty: '10 سنوات'
    },
    {
      id: 3,
      category: 'ceramic',
      catName: 'نانو سيراميك',
      img: '../assets/images/g-3.jpg',
      label: 'نانو سيراميك لامبورغيني',
      sub: 'لمعان كريستالي فائق وطرد مائي هيدروفوبيك',
      duration: 'يومان',
      warranty: '5 سنوات'
    },
    {
      id: 4,
      category: 'tint',
      catName: 'عازل حراري',
      img: '../assets/images/g-4.jpg',
      label: 'عازل وتظليل بي إم دبليو M8',
      sub: 'عازل حراري كربوني بنسبة حجب IR 98%',
      duration: '3 ساعات',
      warranty: '10 سنوات'
    },
    {
      id: 5,
      category: 'interior',
      catName: 'تفصيل داخلي',
      img: '../assets/images/g-5.jpg',
      label: 'تفصيل داخلي رينج روفر',
      sub: 'تنظيف بالبخار الحراري وترطيب الجلود الفاخرة',
      duration: '6 ساعات',
      warranty: 'سنة واحدة'
    },
    {
      id: 6,
      category: 'ppf',
      catName: 'حماية PPF',
      img: '../assets/images/g-6.jpg',
      label: 'درع كامل فيراري F8',
      sub: 'فيلم حماية أمريكي شفاف ذاتي الالتئام',
      duration: '4 أيام عمل',
      warranty: '10 سنوات'
    },
    {
      id: 7,
      category: 'ppf',
      catName: 'حماية PPF',
      img: '../assets/images/g-7.jpg',
      label: 'حماية لكزس LX600',
      sub: 'باكيج حماية الواجهة والكبوت والمرايا والأنوار',
      duration: 'يوم واحد',
      warranty: '5 سنوات'
    },
    {
      id: 8,
      category: 'ceramic',
      catName: 'نانو سيراميك',
      img: '../assets/images/g-8.jpg',
      label: 'معالجة طلاء أودي RS7',
      sub: 'إزالة الخدوش الدائرية بنسبة 95% مع حماية نانو',
      duration: 'يوم ونصف',
      warranty: '3 سنوات'
    }
  ];

  const FAQS = [
    {
      q: 'هل فيلم الحماية PPF يبهت أو يصفر مع حرارة وشمس الرياض؟',
      a: 'إطلاقاً. نستخدم حصرياً أفلام حماية أمريكية معتمدة (XPEL وSunTek) معززة بطبقة حماية متقدمة من الأشعة فوق البنفسجية وتقنية الالتئام الذاتي بالحرارة، مع شهادة ضمان إلكترونية تصل إلى 10 سنوات ضد الاصفرار أو التقشر.'
    },
    {
      q: 'كيف يعمل نظام التقسيط عبر تابي وتمارا؟',
      a: 'يتم تقسيم إجمالي الفاتورة إلى 4 دفعات شهرية متساوية بدون أي فوائد أو رسوم إضافية (0%) بنفس سعر الكاش، مع موافقة فورية عبر رقم الجوال عند تأكيد الحجز.'
    },
    {
      q: 'هل إزالة فيلم الحماية بعد سنوات تضر دهان الوكالة الأصلي؟',
      a: 'لا تضر الطلاء إطلاقاً؛ فالأفلام مزودة بلاصق طبي آمن لا يتفاعل كيميائياً مع اللكر، ويُزال داخل الكبائن الحرارية بقطعة واحدة ليكشف عن طلاء الوكالة بحالته الأصلية.'
    },
    {
      q: 'متى يمكن غسيل السيارة بعد تطبيق النانو سيراميك أو الـ PPF؟',
      a: 'يُفضل الانتظار 5 إلى 7 أيام قبل الغسيل بالماء المضغوط أو الصابون لاكتمال التصلب الجزيئي والتصاق الفيلم، وبعدها يصبح التنظيف أسهل بنسبة 80% بفضل الخاصية الطاردة للأوساخ.'
    },
    {
      q: 'ما الفرق بين حماية PPF والنانو سيراميك؟',
      a: 'فيلم PPF هو درع مادي شفاف يحمي الهيكل من الحصى والترميل والخدوش السطحية، بينما النانو سيراميك طبقة زجاجية تمنح عمقاً لونياً ولمعاناً عالياً وسهولة غسيل. والنتيجة المثلى تكون بالجمع بينهما.'
    }
  ];

  let activeCarId = 'sedan';
  let activePackageId = 'front-ppf';
  let activeFilter = 'all';

  function buildWhatsAppUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function formatNumber(num) {
    return Math.round(num).toLocaleString('en-US');
  }

  /* ------------------------------------------------------------
     Mobile Navigation & General WhatsApp Links
     ------------------------------------------------------------ */
  function initHeader() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const headerWa = document.getElementById('headerWhatsappBtn');
    const footerWa = document.getElementById('footerWhatsappBtn');

    const defaultMsg = 'السلام عليكم، أرغب في حجز موعد معاينة وحماية لسيارتي — الفئة الفاخرة Pro (كروم برو).';
    if (headerWa) headerWa.href = buildWhatsAppUrl(defaultMsg);
    if (footerWa) footerWa.href = buildWhatsAppUrl(defaultMsg);

    if (mobileBtn && mainNav) {
      mobileBtn.addEventListener('click', function () {
        const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
        mobileBtn.setAttribute('aria-expanded', String(!expanded));
        mainNav.classList.toggle('open');
      });

      mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mainNav.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ------------------------------------------------------------
     Interactive Multi-Category Before/After Studio
     ------------------------------------------------------------ */
  function initStudio() {
    const tabs = document.querySelectorAll('.studio-tab');
    const beforeImg = document.getElementById('baBeforeImg');
    const afterImg = document.getElementById('baAfterImg');
    const beforeLabel = document.getElementById('baBeforeLabel');
    const afterLabel = document.getElementById('baAfterLabel');
    const caseBadge = document.getElementById('studioCaseBadge');
    const caseTitle = document.getElementById('studioCaseTitle');
    const caseDesc = document.getElementById('studioCaseDesc');
    const specsList = document.getElementById('studioSpecsList');
    const bookBtn = document.getElementById('studioBookBtn');

    const slider = document.getElementById('baRangeSlider');
    const beforeLayer = document.getElementById('baBeforeLayer');
    const divider = document.getElementById('baDivider');
    const readout = document.getElementById('baPercentReadout');

    function updateSliderPosition(val) {
      const pct = Math.min(95, Math.max(5, Number(val) || 50));
      if (beforeLayer) {
        beforeLayer.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      }
      if (divider) {
        divider.style.left = pct + '%';
      }
      if (readout) {
        readout.textContent = pct + '%';
      }
    }

    function selectCase(caseId) {
      const data = STUDIO_CASES[caseId] || STUDIO_CASES.ppf;
      tabs.forEach(function (tab) {
        const isCurrent = tab.dataset.case === caseId;
        tab.classList.toggle('active', isCurrent);
        tab.setAttribute('aria-selected', String(isCurrent));
      });

      if (beforeImg) beforeImg.src = data.beforeImg;
      if (afterImg) afterImg.src = data.afterImg;
      if (beforeLabel) beforeLabel.textContent = data.beforeLabel;
      if (afterLabel) afterLabel.textContent = data.afterLabel;
      if (caseBadge) caseBadge.textContent = data.badge;
      if (caseTitle) caseTitle.textContent = data.title;
      if (caseDesc) caseDesc.textContent = data.desc;

      if (specsList) {
        specsList.innerHTML = data.specs.map(function (item) {
          return '<div class="spec-row"><span>' + item.label + '</span><strong>' + item.val + '</strong></div>';
        }).join('');
      }

      if (bookBtn) {
        const msg = 'السلام عليكم، أود الاستفسار وحجز خدمة (' + data.title + ') — الفئة الفاخرة Pro.';
        bookBtn.href = buildWhatsAppUrl(msg);
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        selectCase(tab.dataset.case);
      });
    });

    if (slider) {
      slider.addEventListener('input', function (e) {
        updateSliderPosition(e.target.value);
      });
    }

    updateSliderPosition(50);
    selectCase('ppf');
  }

  /* ------------------------------------------------------------
     Live Car Class & Protection Package Configurator
     ------------------------------------------------------------ */
  function initConfigurator() {
    const carButtons = document.querySelectorAll('.car-class-btn');
    const packageList = document.getElementById('packageList');
    const addonChecks = document.querySelectorAll('.addon-check');

    const cfgCarName = document.getElementById('cfgCarName');
    const cfgPkgName = document.getElementById('cfgPkgName');
    const cfgDuration = document.getElementById('cfgDuration');
    const cfgWarranty = document.getElementById('cfgWarranty');
    const cfgWarrantyBadge = document.getElementById('cfgWarrantyBadge');
    const cfgAddonsText = document.getElementById('cfgAddonsText');
    const cfgTotalPrice = document.getElementById('cfgTotalPrice');
    const cfgInstallment = document.getElementById('cfgInstallment');
    const cfgWhatsappBtn = document.getElementById('cfgWhatsappBtn');

    function renderPackageList() {
      if (!packageList) return;
      const car = CAR_CLASSES[activeCarId] || CAR_CLASSES.sedan;
      packageList.innerHTML = PACKAGES.map(function (pkg) {
        const computed = Math.round(pkg.basePrice * car.factor);
        const isActive = pkg.id === activePackageId;
        return (
          '<button type="button" class="pkg-option' + (isActive ? ' active' : '') + '" data-pkg="' + pkg.id + '">' +
            '<span class="pkg-meta">' +
              '<span class="pkg-name">' + pkg.name + '</span>' +
              '<span class="pkg-sub">' + pkg.sub + ' — ضمان ' + pkg.warranty + '</span>' +
            '</span>' +
            '<span class="pkg-price">' + formatNumber(computed) + ' SAR</span>' +
          '</button>'
        );
      }).join('');

      packageList.querySelectorAll('.pkg-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activePackageId = btn.dataset.pkg;
          renderPackageList();
          updateSummary();
        });
      });
    }

    function updateSummary() {
      const car = CAR_CLASSES[activeCarId] || CAR_CLASSES.sedan;
      const pkg = PACKAGES.find(function (p) { return p.id === activePackageId; }) || PACKAGES[0];
      const baseAmount = Math.round(pkg.basePrice * car.factor);

      let addonsTotal = 0;
      const addonLabels = [];
      addonChecks.forEach(function (chk) {
        if (chk.checked) {
          addonsTotal += Number(chk.dataset.price || 0);
          addonLabels.push(chk.dataset.label || chk.value);
        }
      });

      const total = baseAmount + addonsTotal;
      const installment = Math.round(total / 4);

      if (cfgCarName) cfgCarName.textContent = car.name;
      if (cfgPkgName) cfgPkgName.textContent = pkg.name;
      if (cfgDuration) cfgDuration.textContent = pkg.duration;
      if (cfgWarranty) cfgWarranty.textContent = pkg.warranty + ' معتمدة';
      if (cfgWarrantyBadge) cfgWarrantyBadge.textContent = 'ضمان ' + pkg.warranty;
      if (cfgAddonsText) cfgAddonsText.textContent = addonLabels.length ? addonLabels.join(' + ') : 'بدون إضافات';
      if (cfgTotalPrice) cfgTotalPrice.textContent = formatNumber(total);
      if (cfgInstallment) cfgInstallment.textContent = formatNumber(installment);

      if (cfgWhatsappBtn) {
        const lines = [
          'السلام عليكم، أرغب في حجز باقة حماية (الفئة الفاخرة Pro):',
          '- فئة المركبة: ' + car.name,
          '- الباقة المختارة: ' + pkg.name,
          '- مدة التنفيذ المتوقعة: ' + pkg.duration,
          '- الضمان الرسمي: ' + pkg.warranty,
          '- الإضافات الاختيارية: ' + (addonLabels.length ? addonLabels.join('، ') : 'لا يوجد'),
          '- الإجمالي التقديري: ' + formatNumber(total) + ' ر.س',
          '- خيار تابي / تمارا: ' + formatNumber(installment) + ' ر.س × 4 دفعات بدون فوائد'
        ];
        cfgWhatsappBtn.href = buildWhatsAppUrl(lines.join('\n'));
      }
    }

    carButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCarId = btn.dataset.car;
        carButtons.forEach(function (b) {
          b.classList.toggle('active', b.dataset.car === activeCarId);
        });
        renderPackageList();
        updateSummary();
      });
    });

    addonChecks.forEach(function (chk) {
      chk.addEventListener('change', updateSummary);
    });

    renderPackageList();
    updateSummary();
  }

  /* ------------------------------------------------------------
     Filterable Garage Showcase (g-1..g-8) + Modal Lightbox
     ------------------------------------------------------------ */
  function initGarage() {
    const filterButtons = document.querySelectorAll('#garageFilters .filter-chip');
    const grid = document.getElementById('garageGrid');

    const modal = document.getElementById('garageModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalImg = document.getElementById('modalImg');
    const modalCat = document.getElementById('modalCat');
    const modalTitle = document.getElementById('modalTitle');
    const modalSub = document.getElementById('modalSub');
    const modalSpecs = document.getElementById('modalSpecs');
    const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

    function openModal(item) {
      if (!modal) return;
      if (modalImg) {
        modalImg.src = item.img;
        modalImg.alt = item.label;
      }
      if (modalCat) modalCat.textContent = item.catName;
      if (modalTitle) modalTitle.textContent = item.label;
      if (modalSub) modalSub.textContent = item.sub;
      if (modalSpecs) {
        modalSpecs.innerHTML =
          '<div class="spec-row"><span>مدة العمل</span><strong>' + item.duration + '</strong></div>' +
          '<div class="spec-row"><span>الضمان</span><strong>' + item.warranty + '</strong></div>' +
          '<div class="spec-row"><span>المستوى</span><strong>الفئة الفاخرة Pro</strong></div>';
      }
      if (modalWhatsappBtn) {
        const msg = 'السلام عليكم، أعجبني تنفيذ (' + item.label + ' — ' + item.sub + ') وأرغب في حجز باقة مماثلة ضمن الفئة الفاخرة Pro.';
        modalWhatsappBtn.href = buildWhatsAppUrl(msg);
      }
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.hidden = true;
      document.body.style.overflow = '';
    }

    function renderGrid() {
      if (!grid) return;
      const items = activeFilter === 'all'
        ? GARAGE_ITEMS
        : GARAGE_ITEMS.filter(function (g) { return g.category === activeFilter; });

      grid.innerHTML = items.map(function (item) {
        return (
          '<button type="button" class="garage-card" data-id="' + item.id + '">' +
            '<div class="garage-thumb">' +
              '<img src="' + item.img + '" alt="' + item.label + '" loading="lazy" />' +
              '<span class="garage-badge">' + item.catName + '</span>' +
            '</div>' +
            '<div class="garage-info">' +
              '<h3>' + item.label + '</h3>' +
              '<p>' + item.sub + '</p>' +
              '<div class="garage-open-row">' +
                '<span>استعراض التفاصيل</span>' +
                '<span class="font-tech">' + item.warranty + '</span>' +
              '</div>' +
            '</div>' +
          '</button>'
        );
      }).join('');

      grid.querySelectorAll('.garage-card').forEach(function (card) {
        card.addEventListener('click', function () {
          const itemId = Number(card.dataset.id);
          const found = GARAGE_ITEMS.find(function (g) { return g.id === itemId; });
          if (found) openModal(found);
        });
      });
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeFilter = btn.dataset.filter;
        filterButtons.forEach(function (b) {
          b.classList.toggle('active', b.dataset.filter === activeFilter);
        });
        renderGrid();
      });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
    });

    renderGrid();
  }

  /* ------------------------------------------------------------
     FAQ Accordion
     ------------------------------------------------------------ */
  function initFaq() {
    const faqList = document.getElementById('faqList');
    if (!faqList) return;

    faqList.innerHTML = FAQS.map(function (item, idx) {
      return (
        '<div class="faq-item' + (idx === 0 ? ' open' : '') + '">' +
          '<button type="button" class="faq-trigger" aria-expanded="' + (idx === 0 ? 'true' : 'false') + '">' +
            '<span>' + item.q + '</span>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
          '</button>' +
          '<div class="faq-answer">' + item.a + '</div>' +
        '</div>'
      );
    }).join('');

    faqList.querySelectorAll('.faq-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const parent = btn.closest('.faq-item');
        const isOpen = parent.classList.contains('open');
        faqList.querySelectorAll('.faq-item').forEach(function (el) {
          el.classList.remove('open');
          const tr = el.querySelector('.faq-trigger');
          if (tr) tr.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          parent.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initStudio();
    initConfigurator();
    initGarage();
    initFaq();
  });
})();
