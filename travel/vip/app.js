/* ==========================================================================
   app.js — Royal Concierge Aviation & Umrah VIP ($250)
   الصفوة للسفريات والسياحة والعمرة
   ========================================================================== */
'use strict';

(function () {
  if (typeof TRAVEL_CONFIG === 'undefined' || typeof TRAVEL_DATA === 'undefined') {
    return;
  }

  const RATES = {
    usd: { code: 'USD', mult: 1, label: 'دولار' },
    sar: { code: 'SAR', mult: 3.75, label: 'ر.س' },
    yer: { code: 'YER', mult: 530, label: 'ر.ي' },
  };

  const FLIGHT_CLASSES = {
    first: {
      label: 'الدرجة الأولى والأجنحة',
      adultFareUsd: 1950,
      childFareUsd: 1380,
    },
    business: {
      label: 'درجة رجال الأعمال',
      adultFareUsd: 1180,
      childFareUsd: 860,
    },
    economy: {
      label: 'الدرجة السياحية المميزة',
      adultFareUsd: 490,
      childFareUsd: 360,
    },
  };

  const TRACK_CONFIG = {
    umrah: {
      title: 'مكة المكرمة والمدينة المنورة',
      nightlyRoomUsd: 340,
      defaultDays: 7,
      baseDays: [
        {
          city: 'مكة المكرمة',
          options: [
            'استقبال VIP بمطار جدة والانتقال بسيارة خاصة + تسكين جناح الحرم وأداء العمرة مع مرافق',
            'تسكين هادئ ومباشر بالجناح المطل على الساحة + أداء العمرة بعد منتصف الليل',
          ],
        },
        {
          city: 'مكة المكرمة',
          options: [
            'يوم عبادة وخشوع بالمسجد الحرام مع بوفيه إفطار فاخر مطل على الكعبة',
            'زيارة معرض الوحي ومتحف عمارة الحرمين بسيارة خاصة',
          ],
        },
        {
          city: 'مكة المكرمة',
          options: [
            'جولة المزارات التاريخية (منى وعرفات ومزدلفة وجبل ثور) مع مرشد متفرغ',
            'يوم راحة وعبادة في الحرم مع جلسة ضيافة عائلية خاصة بالجناح',
          ],
        },
        {
          city: 'مكة إلى المدينة',
          options: [
            'الانتقال بقطار الحرمين السريع (درجة رجال الأعمال) + استقبال سيارة خاصة بالمدينة',
            'السفر المباشر بسيارة GMC Yukon XL خاصة من باب الفندق إلى المنطقة المركزية',
          ],
        },
        {
          city: 'المدينة المنورة',
          options: [
            'تنسيق زيارة الروضة الشريفة والصلاة بالمسجد النبوي بإشراف إداري خاص',
            'جولة المساجد والمآثر النبوية (قباء وأحد والشهداء ومزارع التمور)',
          ],
        },
        {
          city: 'المدينة المنورة',
          options: [
            'صلاة الفجر والجمعة/الجماعة بالحرم النبوي + سيارة تحت الطلب للتسوق وشراء التمور',
            'يوم خلوة روحانية وإفطار تنفيذي بالجناح مع تجهيز الأمتعة',
          ],
        },
        {
          city: 'المغادرة',
          options: [
            'توصيل خاص إلى مطار الأمير محمد بن عبدالعزيز + إنهاء الإجراءات بصالة كبار الشخصيات',
            'مغادرة مرنة في الفترة المسائية بعد الوداع والصلاة بالمسجد النبوي',
          ],
        },
      ],
      extraDayTemplates: [
        {
          city: 'مكة المكرمة',
          options: [
            'يوم إضافي للعبادة والطواف بالمسجد الحرام وإقامة ممتدة بالجناح',
            'زيارة خاصة إلى الطائف والهدا عبر الجبل بسيارة العائلة الخاصة',
          ],
        },
        {
          city: 'المدينة المنورة',
          options: [
            'يوم إضافي في جوار المسجد النبوي الشريف مع سيارة سائق طوال اليوم',
            'رحلة قصيرة إلى مزارع العقيق والقرى التاريخية بالمدينة',
          ],
        },
      ],
    },
    tourism: {
      dubai: {
        title: 'دبي الفاخرة (سياحة تنفيذية)',
        nightlyRoomUsd: 420,
        defaultDays: 6,
        baseDays: [
          {
            city: 'دبي — وسط المدينة',
            options: [
              'استقبال الصالة التنفيذية بمطار دبي + نقل GMC وتسكين جناح فندقي 5 نجوم مطل على برج خليفة',
              'وصول مريح + جولة مسائية في بوليفارد محمد بن راشد وعشاء بإطلالة النافورة الراقصة',
            ],
          },
          {
            city: 'نخلة جميرا والمرسى',
            options: [
              'رحلة يخت خاص لمدة 3 ساعات حول برج العرب ونخلة جميرا مع ضيافة بحرية',
              'يوم ترفيهي خاص في منتجع أتلانتس والمدينة المائية مع تذاكر المسار السريع',
            ],
          },
          {
            city: 'صحراء دبي الملكية',
            options: [
              'تجربة سفاري صحراوي خاص بسيارة دفع رباعي فاخرة وعشاء مجلس عربي خاص',
              'زيارة متحف المستقبل ودبي مول مع منسق تسوق شخصي (Personal Shopper)',
            ],
          },
          {
            city: 'دبي التاريخية والخور',
            options: [
              'جولة حي الفهيدي ومتحف دبي وبرواز دبي ثم عشاء فاخر على الخور',
              'يوم حر بالمنتجع الخاص والشاطئ الذهبي مع سيارة سائق متفرغة',
            ],
          },
          {
            city: 'جميرا ومدينة جميرا',
            options: [
              'جولة سوق مدينة جميرا وممشى JBR + تذكرة القمة ببرج خليفة (VIP Lounge)',
              'رحلة يوم كامل إلى أبوظبي (جامع الشيخ زايد وقصر الوطن) بسيارة خاصة',
            ],
          },
          {
            city: 'المغادرة',
            options: [
              'تسجيل خروج متأخر + توصيل خاص إلى صالة كبار الشخصيات بمطار دبي الدولي',
              'جولة تسوق أخيرة قبل التوجه للمطار برفقة السائق الخاص',
            ],
          },
        ],
        extraDayTemplates: [
          {
            city: 'دبي — برنامج مخصص',
            options: [
              'يوم مفتوح للاستجمام في السبا والمنتجع الخاص مع سيارة سائق 12 ساعة',
              'زيارة القرية العالمية وعروض لابيرل من مقاعد VIP',
            ],
          },
        ],
      },
      istanbul: {
        title: 'إسطنبول والبوسفور (برنامج عائلي VIP)',
        nightlyRoomUsd: 370,
        defaultDays: 6,
        baseDays: [
          {
            city: 'إسطنبول — البوسفور',
            options: [
              'استقبال مطار إسطنبول VIP + نقل مرسيدس فيتو/GMC إلى قصر وفندق مطل على البوسفور',
              'تسكين هادئ واستجمام ثم عشاء تركي فاخر في منطقة أورتاكوي أو ببك',
            ],
          },
          {
            city: 'السلطان أحمد التاريخية',
            options: [
              'جولة خاصة بقصر توبكابي والمسجد الأزرق والسوق المسقوف مع مرشد عربي خاص',
              'جولة في شارع الاستقلال وبرج غلطة وتناول الغداء بإطلالة بانورامية',
            ],
          },
          {
            city: 'مضيق البوسفور',
            options: [
              'رحلة بحرية بيخت خاص بين قارتي آسيا وأوروبا مع غداء بحري على المتن',
              'جولة الجانب الآسيوي وتلة العرائس وقصر بيليربي بسيارة خاصة',
            ],
          },
          {
            city: 'صبنجة والمعشوقية',
            options: [
              'رحلة خاصة طوال اليوم إلى بحيرة صبنجة وشلالات المعشوقية وغداء على النهر',
              'يوم تسوق هادئ في زورلو سنتر وإستينيا بارك بسيارة العائلة',
            ],
          },
          {
            city: 'جزر الأميرات / شيلا',
            options: [
              'رحلة خاصة إلى جزيرة بيوك أدا مع غداء خاص على الواجهة البحرية',
              'استكشاف ساحل شيلا وأغوا والطبيعة الهادئة بسيارة سائق خاصة',
            ],
          },
          {
            city: 'المغادرة',
            options: [
              'إنهاء الإجراءات مبكراً وتوصيل إلى صالة رجال الأعمال بمطار إسطنبول الدولي',
              'صباح هادئ بإفطار تركي على البوسفور ثم الانطلاق للمطار',
            ],
          },
        ],
        extraDayTemplates: [
          {
            city: 'بورصة الخضراء',
            options: [
              'رحلة يوم كامل إلى جبل أولوداغ في بورصة وتلفريك الغابات بسيارة خاصة',
              'يوم استجمام خاص بالحمام التركي والمنتجع الفندقي بإسطنبول',
            ],
          },
        ],
      },
      salalah: {
        title: 'صلالة والمنتجعات الخضراء (عُمان)',
        nightlyRoomUsd: 330,
        defaultDays: 6,
        baseDays: [
          {
            city: 'صلالة — الشاطئ',
            options: [
              'استقبال VIP بمطار صلالة + انتقال خاص إلى منتجع البليد أو منتجع شاطئي 5 نجوم',
              'استلام فيلا شاطئية خاصة مع عشاء عُماني بحري هادئ على البحر',
            ],
          },
          {
            city: 'وادي دربات والعيون',
            options: [
              'جولة خاصة بسيارة دفع رباعي في وادي دربات وشلالاتها وعين رزات والجبال الخضراء',
              'رحلة إلى جبل سمحان ونقطة الجاذبية مع غداء في الطبيعة المفتوحة',
            ],
          },
          {
            city: 'المغسيل والكهوف',
            options: [
              'زيارة شاطئ المغسيل وكهف المرنيف والنوافير الطبيعية ثم شاطئ الفزايح الساحر',
              'يوم استرخاء عائلي في الفيلا الخاصة ومسابح المنتجع',
            ],
          },
          {
            city: 'سمهرم واللبان',
            options: [
              'جولة مدينة سمهرم الأثرية ومتحف أرض اللبان وسوق الحافة التراثي مع مرشد خاص',
              'تخصيص جولة لمنتزهات ظفار الشرقية (طاقة ومرباط) بسيارة خاصة',
            ],
          },
          {
            city: 'أتين والمرتفعات',
            options: [
              'أمسية في سهل أتين ومطلات الجبال مع ضيافة الشاي واللبان العُماني',
              'رحلة بحرية خاصة لمشاهدة الدلافين قبالة سواحل مرباط',
            ],
          },
          {
            city: 'المغادرة',
            options: [
              'تسجيل خروج مرن + توصيل خاص إلى مطار صلالة الدولي',
              'تسوق اللبان والهدايا ثم التوجه المباشر للمطار',
            ],
          },
        ],
        extraDayTemplates: [
          {
            city: 'ظفار — استجمام خاص',
            options: [
              'يوم مفتوح للاستجمام بالمنتجع الشاطئي أو رحلة صحراء الربع الخالي',
              'جولة خاصة إضافية في العيون المائية والمطلات الساحلية',
            ],
          },
        ],
      },
    },
  };

  const PACKAGE_PRESETS = {
    'umrah-vip': { track: 'umrah', subDest: 'dubai', flightClass: 'business', days: 10 },
    'umrah-land': { track: 'umrah', subDest: 'dubai', flightClass: 'economy', days: 7 },
    'flights-visas': { track: 'tourism', subDest: 'dubai', flightClass: 'business', days: 5 },
    'family-tour': { track: 'tourism', subDest: 'istanbul', flightClass: 'business', days: 7 },
  };

  const SVG = {
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    moon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    plane: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    doc: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    hotel: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>',
  };

  const state = {
    currency: 'usd',
    track: 'umrah',
    subDest: 'dubai',
    flightClass: 'business',
    meetAssist: true,
    privateGmc: true,
    royalSuite: false,
    personalGuide: false,
    adults: 2,
    children: 0,
    rooms: 1,
    itineraryDays: [],
    refCode: 'ALS-VIP-2026-' + Math.floor(100 + Math.random() * 899),
    lastQuote: null,
  };

  const els = {
    agencyName: document.getElementById('vip-agency-name'),
    agencyTagline: document.getElementById('vip-agency-tagline'),
    currencySwitch: document.getElementById('vip-currency-switch'),
    currMini: document.getElementById('vip-curr-mini'),
    openModalTop: document.getElementById('vip-open-modal-top'),
    mobileBtn: document.getElementById('vip-mobile-btn'),
    mobileDrawer: document.getElementById('vip-mobile-drawer'),
    statsStrip: document.getElementById('vip-stats-strip'),
    spotlightImg: document.getElementById('vip-spotlight-img'),
    spotlightCode: document.getElementById('vip-spotlight-code'),
    spotlightTitle: document.getElementById('vip-spotlight-title'),
    spotlightThumbs: document.getElementById('vip-spotlight-thumbs'),
    trackPills: document.getElementById('vip-track-pills'),
    subdestWrap: document.getElementById('vip-subdest-wrap'),
    subdestPills: document.getElementById('vip-subdest-pills'),
    flightClasses: document.getElementById('vip-flight-classes'),
    toggleMeet: document.getElementById('vip-toggle-meet'),
    toggleGmc: document.getElementById('vip-toggle-gmc'),
    toggleSuite: document.getElementById('vip-toggle-suite'),
    toggleGuide: document.getElementById('vip-toggle-guide'),
    adultsMinus: document.getElementById('vip-adults-minus'),
    adultsVal: document.getElementById('vip-adults-val'),
    adultsPlus: document.getElementById('vip-adults-plus'),
    childrenMinus: document.getElementById('vip-children-minus'),
    childrenVal: document.getElementById('vip-children-val'),
    childrenPlus: document.getElementById('vip-children-plus'),
    roomsMinus: document.getElementById('vip-rooms-minus'),
    roomsVal: document.getElementById('vip-rooms-val'),
    roomsPlus: document.getElementById('vip-rooms-plus'),
    daysMinus: document.getElementById('vip-days-minus'),
    daysVal: document.getElementById('vip-days-val'),
    daysPlus: document.getElementById('vip-days-plus'),
    departureCity: document.getElementById('vip-departure-city'),
    travelDate: document.getElementById('vip-travel-date'),
    daysTimeline: document.getElementById('vip-days-timeline'),
    addDayBtn: document.getElementById('vip-add-day-btn'),
    resetItineraryBtn: document.getElementById('vip-reset-itinerary-btn'),
    valTrack: document.getElementById('vip-val-track'),
    valClass: document.getElementById('vip-val-class'),
    valGroup: document.getElementById('vip-val-group'),
    valAddons: document.getElementById('vip-val-addons'),
    valFlightCost: document.getElementById('vip-val-flight-cost'),
    valHotelCost: document.getElementById('vip-val-hotel-cost'),
    valVipCost: document.getElementById('vip-val-vip-cost'),
    valPerPerson: document.getElementById('vip-val-per-person'),
    valTotal: document.getElementById('vip-val-total'),
    previewProposalBtn: document.getElementById('vip-preview-proposal-btn'),
    directWaBtn: document.getElementById('vip-direct-wa-btn'),
    packagesGrid: document.getElementById('vip-packages-grid'),
    servicesGrid: document.getElementById('vip-services-grid'),
    briefRefCode: document.getElementById('brief-ref-code'),
    briefTrackTitle: document.getElementById('brief-track-title'),
    briefFlightBadge: document.getElementById('brief-flight-badge'),
    briefDaysCount: document.getElementById('brief-days-count'),
    briefPaxSummary: document.getElementById('brief-pax-summary'),
    briefConciergeTags: document.getElementById('brief-concierge-tags'),
    briefItineraryPreview: document.getElementById('brief-itinerary-preview'),
    briefTotalDisplay: document.getElementById('brief-total-display'),
    clientName: document.getElementById('vip-client-name'),
    clientPhone: document.getElementById('vip-client-phone'),
    clientNotes: document.getElementById('vip-client-notes'),
    briefOpenModal: document.getElementById('vip-brief-open-modal'),
    briefSendWa: document.getElementById('vip-brief-send-wa'),
    briefFeedback: document.getElementById('vip-brief-feedback'),
    proposalModal: document.getElementById('proposal-modal'),
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalRefId: document.getElementById('modal-ref-id'),
    modalDateIssued: document.getElementById('modal-date-issued'),
    modalClientName: document.getElementById('modal-client-name'),
    modalClientPhone: document.getElementById('modal-client-phone'),
    modalDepartureCity: document.getElementById('modal-departure-city'),
    modalTrackName: document.getElementById('modal-track-name'),
    modalFlightClass: document.getElementById('modal-flight-class'),
    modalGroupSummary: document.getElementById('modal-group-summary'),
    modalVipServices: document.getElementById('modal-vip-services'),
    modalItineraryRows: document.getElementById('modal-itinerary-rows'),
    modalCostFlight: document.getElementById('modal-cost-flight'),
    modalCostHotel: document.getElementById('modal-cost-hotel'),
    modalCostConcierge: document.getElementById('modal-cost-concierge'),
    modalCostPerPerson: document.getElementById('modal-cost-per-person'),
    modalCostTotal: document.getElementById('modal-cost-total'),
    modalPrintBtn: document.getElementById('modal-print-btn'),
    modalCopyBtn: document.getElementById('modal-copy-btn'),
    modalWaBtn: document.getElementById('modal-wa-btn'),
    modalFeedback: document.getElementById('modal-feedback'),
  };

  function resolveImagePath(imgPath) {
    if (!imgPath) return '../assets/images/makkah.jpg';
    return imgPath.startsWith('../') ? imgPath : '../' + imgPath;
  }

  function formatMoney(usdAmount) {
    const rate = RATES[state.currency] || RATES.usd;
    const raw = Math.round(usdAmount * rate.mult);
    const formatted = raw.toLocaleString('en-US');
    return rate.code === 'USD' ? '$' + formatted : formatted + ' ' + rate.label;
  }

  function getActiveTrackSpec() {
    if (state.track === 'umrah') return TRACK_CONFIG.umrah;
    return TRACK_CONFIG.tourism[state.subDest] || TRACK_CONFIG.tourism.dubai;
  }

  function buildDefaultDays(targetLength) {
    const spec = getActiveTrackSpec();
    const days = spec.baseDays.map((d) => ({
      city: d.city,
      options: d.options.slice(),
      selectedOpt: 0,
      note: '',
    }));

    const wanted = targetLength || spec.defaultDays;
    while (days.length < wanted) {
      const tplList = spec.extraDayTemplates;
      const tpl = tplList[(days.length - spec.baseDays.length) % tplList.length];
      const insertAt = Math.max(1, days.length - 1);
      days.splice(insertAt, 0, {
        city: tpl.city,
        options: tpl.options.slice(),
        selectedOpt: 0,
        note: '',
      });
    }
    if (days.length > wanted) {
      days.splice(wanted - 1, days.length - wanted);
    }
    return days;
  }

  function setDayCount(newCount) {
    const clamped = Math.max(3, Math.min(14, newCount));
    const spec = getActiveTrackSpec();
    while (state.itineraryDays.length < clamped) {
      const tpl = spec.extraDayTemplates[state.itineraryDays.length % spec.extraDayTemplates.length];
      const insertIdx = Math.max(1, state.itineraryDays.length - 1);
      state.itineraryDays.splice(insertIdx, 0, {
        city: tpl.city,
        options: tpl.options.slice(),
        selectedOpt: 0,
        note: '',
      });
    }
    while (state.itineraryDays.length > clamped) {
      const removeIdx = Math.max(1, state.itineraryDays.length - 2);
      state.itineraryDays.splice(removeIdx, 1);
    }
    renderTimeline();
    updateAllSummaries();
  }

  function syncCurrencyUI() {
    document.querySelectorAll('#vip-currency-switch .v-curr-btn').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.curr === state.currency);
    });
    document.querySelectorAll('#vip-curr-mini .m-curr-btn').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.curr === state.currency);
    });
  }

  function renderAgencyHeaderAndStats() {
    if (els.agencyName) els.agencyName.textContent = TRAVEL_CONFIG.agencyName;
    if (els.agencyTagline) els.agencyTagline.textContent = TRAVEL_CONFIG.tagline;

    if (els.statsStrip) {
      els.statsStrip.innerHTML = TRAVEL_DATA.stats
        .map(
          (stat) => `
            <div class="vip-stat-cell">
              <dd>${stat.value}</dd>
              <dt>${stat.label}</dt>
            </div>
          `
        )
        .join('');
    }
  }

  function renderTrackControls() {
    document.querySelectorAll('#vip-track-pills .track-card').forEach((card) => {
      card.classList.toggle('is-active', card.dataset.track === state.track);
    });

    if (els.subdestWrap) {
      if (state.track === 'tourism') {
        els.subdestWrap.removeAttribute('hidden');
      } else {
        els.subdestWrap.setAttribute('hidden', '');
      }
    }

    document.querySelectorAll('#vip-subdest-pills .subdest-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.dest === state.subDest);
    });

    document.querySelectorAll('#vip-flight-classes .class-card').forEach((card) => {
      card.classList.toggle('is-active', card.dataset.class === state.flightClass);
    });
  }

  function renderTimeline() {
    if (!els.daysTimeline) return;

    els.daysTimeline.innerHTML = state.itineraryDays
      .map((day, idx) => {
        const dayNum = String(idx + 1).padStart(2, '0');
        const optionsHtml = day.options
          .map((opt, oIdx) => `<option value="${oIdx}" ${oIdx === day.selectedOpt ? 'selected' : ''}>${opt}</option>`)
          .join('');
        const activeText = day.options[day.selectedOpt] || day.options[0];
        const canRemove = state.itineraryDays.length > 3;

        return `
          <article class="day-card" data-day-index="${idx}">
            <div class="day-card-top">
              <div class="day-badge-row">
                <span class="day-num-pill">اليوم ${dayNum}</span>
                <span class="day-city-pill">${day.city}</span>
              </div>
              ${canRemove ? `<button type="button" class="day-remove-btn" data-remove-idx="${idx}">حذف اليوم</button>` : ''}
            </div>
            <div class="day-controls-row">
              <select class="day-preset-select" data-day-idx="${idx}" aria-label="اختيار برنامج اليوم ${dayNum}">
                ${optionsHtml}
              </select>
              <input type="text" class="day-note-input" data-day-idx="${idx}" value="${day.note.replace(/"/g, '&quot;')}" placeholder="إضافة ملاحظة خاصة لليوم ${dayNum} (اختياري)">
            </div>
            <p class="day-desc-line">${activeText}${day.note ? ' — ملاحظة: ' + day.note : ''}</p>
          </article>
        `;
      })
      .join('');
  }

  function computeQuote() {
    const spec = getActiveTrackSpec();
    const flightObj = FLIGHT_CLASSES[state.flightClass] || FLIGHT_CLASSES.business;
    const daysCount = state.itineraryDays.length;
    const nightsCount = Math.max(1, daysCount - 1);

    const flightUsd =
      state.adults * flightObj.adultFareUsd +
      state.children * flightObj.childFareUsd;

    const hotelUsd =
      nightsCount *
      state.rooms *
      (spec.nightlyRoomUsd + (state.royalSuite ? 290 : 0));

    const meetUsd = state.meetAssist ? (state.adults + state.children) * 95 : 0;
    const gmcUsd = state.privateGmc ? daysCount * 165 : 0;
    const guideUsd = state.personalGuide ? daysCount * 120 : 0;
    const conciergeUsd = meetUsd + gmcUsd + guideUsd;

    const totalUsd = flightUsd + hotelUsd + conciergeUsd;
    const perAdultUsd = Math.round(totalUsd / Math.max(1, state.adults));

    const vipActiveList = [];
    if (state.meetAssist) vipActiveList.push('استقبال المطار VIP');
    if (state.privateGmc) vipActiveList.push('نقل GMC خاص');
    if (state.royalSuite) vipActiveList.push('جناح ملكي مطل');
    if (state.personalGuide) vipActiveList.push('مستشار ومرافق خاص');

    return {
      specTitle: spec.title,
      flightLabel: flightObj.label,
      daysCount,
      nightsCount,
      flightUsd,
      hotelUsd,
      conciergeUsd,
      totalUsd,
      perAdultUsd,
      vipServicesLabel: vipActiveList.length ? vipActiveList.join(' + ') : 'برنامج قياسي مرن',
    };
  }

  function updateAllSummaries() {
    const q = computeQuote();
    state.lastQuote = q;

    const paxText = `${state.adults} بالغ${state.children > 0 ? ` + ${state.children} طفل` : ''}`;
    const roomsText = `${state.rooms} ${state.rooms === 1 ? 'جناح' : state.rooms === 2 ? 'جناحان' : 'أجنحة'}`;
    const daysText = `${q.daysCount} أيام / ${q.nightsCount} ليالٍ`;
    const groupFull = `${paxText} · ${roomsText} · ${q.daysCount} أيام`;

    if (els.adultsVal) els.adultsVal.textContent = String(state.adults);
    if (els.childrenVal) els.childrenVal.textContent = String(state.children);
    if (els.roomsVal) els.roomsVal.textContent = String(state.rooms);
    if (els.daysVal) els.daysVal.textContent = String(q.daysCount);

    if (els.valTrack) els.valTrack.textContent = q.specTitle;
    if (els.valClass) els.valClass.textContent = q.flightLabel;
    if (els.valGroup) els.valGroup.textContent = groupFull;
    if (els.valAddons) els.valAddons.textContent = q.vipServicesLabel;
    if (els.valFlightCost) els.valFlightCost.textContent = formatMoney(q.flightUsd);
    if (els.valHotelCost) els.valHotelCost.textContent = formatMoney(q.hotelUsd);
    if (els.valVipCost) els.valVipCost.textContent = formatMoney(q.conciergeUsd);
    if (els.valPerPerson) els.valPerPerson.textContent = formatMoney(q.perAdultUsd);
    if (els.valTotal) els.valTotal.textContent = formatMoney(q.totalUsd);

    // Update On-Page Ivory Executive Brief
    if (els.briefRefCode) els.briefRefCode.textContent = state.refCode;
    if (els.briefTrackTitle) els.briefTrackTitle.textContent = q.specTitle;
    if (els.briefFlightBadge) els.briefFlightBadge.textContent = q.flightLabel;
    if (els.briefDaysCount) els.briefDaysCount.textContent = daysText;
    if (els.briefPaxSummary) els.briefPaxSummary.textContent = `${paxText} · ${roomsText}`;
    if (els.briefConciergeTags) els.briefConciergeTags.textContent = q.vipServicesLabel;
    if (els.briefTotalDisplay) els.briefTotalDisplay.textContent = formatMoney(q.totalUsd);

    if (els.briefItineraryPreview) {
      els.briefItineraryPreview.innerHTML = state.itineraryDays
        .map((day, i) => {
          const text = day.options[day.selectedOpt] || day.options[0];
          return `<li><strong>اليوم ${String(i + 1).padStart(2, '0')} (${day.city}):</strong><span>${text}${day.note ? ' — ' + day.note : ''}</span></li>`;
        })
        .join('');
    }

    syncModalDocument(q, groupFull);
  }

  function syncModalDocument(q, groupFull) {
    const clientNameVal = els.clientName?.value.trim() || 'ضيف الصفوة الملكية';
    const clientPhoneVal = els.clientPhone?.value.trim() || 'حسب الطلب';
    const depCityVal = els.departureCity?.value || 'صنعاء';
    const todayIso = new Date().toISOString().slice(0, 10);

    if (els.modalRefId) els.modalRefId.textContent = state.refCode;
    if (els.modalDateIssued) els.modalDateIssued.textContent = todayIso;
    if (els.modalClientName) els.modalClientName.textContent = clientNameVal;
    if (els.modalClientPhone) els.modalClientPhone.textContent = clientPhoneVal;
    if (els.modalDepartureCity) els.modalDepartureCity.textContent = depCityVal;
    if (els.modalTrackName) els.modalTrackName.textContent = q.specTitle;
    if (els.modalFlightClass) els.modalFlightClass.textContent = q.flightLabel;
    if (els.modalGroupSummary) els.modalGroupSummary.textContent = groupFull;
    if (els.modalVipServices) els.modalVipServices.textContent = q.vipServicesLabel;

    if (els.modalItineraryRows) {
      els.modalItineraryRows.innerHTML = state.itineraryDays
        .map((day, idx) => {
          const text = day.options[day.selectedOpt] || day.options[0];
          const extraNote = day.note ? ` (${day.note})` : '';
          return `
            <tr>
              <td class="num-font">اليوم ${String(idx + 1).padStart(2, '0')}</td>
              <td>${day.city}</td>
              <td>${text}${extraNote}</td>
            </tr>
          `;
        })
        .join('');
    }

    if (els.modalCostFlight) els.modalCostFlight.textContent = formatMoney(q.flightUsd);
    if (els.modalCostHotel) els.modalCostHotel.textContent = formatMoney(q.hotelUsd);
    if (els.modalCostConcierge) els.modalCostConcierge.textContent = formatMoney(q.conciergeUsd);
    if (els.modalCostPerPerson) els.modalCostPerPerson.textContent = formatMoney(q.perAdultUsd);
    if (els.modalCostTotal) els.modalCostTotal.textContent = formatMoney(q.totalUsd);
  }

  function renderPackagesAndServices() {
    if (els.packagesGrid) {
      els.packagesGrid.innerHTML = TRAVEL_DATA.packages
        .map((pkg) => {
          const imgSrc = resolveImagePath(pkg.image);
          const listHtml = pkg.highlights.map((h) => `<li>${SVG.check}<span>${h}</span></li>`).join('');
          return `
            <article class="vip-pkg-card">
              <div class="vip-pkg-img">
                <img src="${imgSrc}" alt="${pkg.title}" loading="lazy">
                <span class="vip-pkg-badge">${pkg.badge}</span>
              </div>
              <div class="vip-pkg-body">
                <div class="vip-pkg-meta">${pkg.meta}</div>
                <h3>${pkg.title}</h3>
                <p>${pkg.desc}</p>
                <ul class="vip-pkg-list">${listHtml}</ul>
                <div class="vip-pkg-foot">
                  <button type="button" class="btn-load-builder" data-pkg-id="${pkg.id}">تحميل في مصمم الرحلات VIP</button>
                  <a href="https://wa.me/${TRAVEL_CONFIG.whatsappNumber}?text=${encodeURIComponent('استفسار الفئة الملكية VIP عن: ' + pkg.title)}" class="btn-vault-ghost-sm" target="_blank" rel="noopener">طلب مباشر</a>
                </div>
              </div>
            </article>
          `;
        })
        .join('');
    }

    if (els.servicesGrid) {
      els.servicesGrid.innerHTML = TRAVEL_DATA.services
        .map(
          (svc) => `
            <article class="vip-svc-card">
              <div class="vip-svc-icon">${SVG[svc.icon] || SVG.doc}</div>
              <h3>${svc.title}</h3>
              <p>${svc.desc}</p>
            </article>
          `
        )
        .join('');
    }
  }

  function buildProposalText() {
    const q = state.lastQuote || computeQuote();
    const clientNameVal = els.clientName?.value.trim() || 'ضيف الصفوة الملكية';
    const clientPhoneVal = els.clientPhone?.value.trim() || 'غير محدد';
    const depCityVal = els.departureCity?.value || 'صنعاء';
    const dateVal = els.travelDate?.value || 'مرن حسب التنسيق';
    const notesVal = els.clientNotes?.value.trim() || 'لا توجد ملاحظات إضافية';

    const dayLines = state.itineraryDays
      .map((day, idx) => {
        const text = day.options[day.selectedOpt] || day.options[0];
        return `اليوم ${idx + 1} (${day.city}): ${text}${day.note ? ' [' + day.note + ']' : ''}`;
      })
      .join('\n');

    return [
      `*مقترح رحلة تنفيذي — ${TRAVEL_CONFIG.agencyName} (الفئة الملكية VIP)*`,
      `المرجع: ${state.refCode}`,
      `العميل: ${clientNameVal} | الهاتف: ${clientPhoneVal}`,
      `المسار: ${q.specTitle}`,
      `الانطلاق من: ${depCityVal} | الموعد: ${dateVal}`,
      `درجة الطيران: ${q.flightLabel}`,
      `المجموعة: ${state.adults} بالغ${state.children > 0 ? ' + ' + state.children + ' طفل' : ''} (${state.rooms} أجنحة / ${q.daysCount} أيام)`,
      `خدمات الكونسيرج: ${q.vipServicesLabel}`,
      `--- الجدول اليومي المخصص ---`,
      dayLines,
      `--- الملخص المالي (${state.currency.toUpperCase()}) ---`,
      `إجمالي الاستثمار: ${formatMoney(q.totalUsd)} (متوسط البالغ: ${formatMoney(q.perAdultUsd)})`,
      `ملاحظات العميل: ${notesVal}`,
    ].join('\n');
  }

  function openModal() {
    updateAllSummaries();
    if (!els.proposalModal) return;
    els.proposalModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!els.proposalModal) return;
    els.proposalModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function sendProposalWhatsApp() {
    const msg = buildProposalText();
    const url = `https://wa.me/${TRAVEL_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener');
    const feedbackText = 'تم تجهيز وفتح المقترح الملكي الكامل عبر واتساب (الفئة الملكية VIP).';
    if (els.briefFeedback) els.briefFeedback.textContent = feedbackText;
    if (els.modalFeedback) els.modalFeedback.textContent = feedbackText;
  }

  function handleCurrencySwitch(curr) {
    if (!RATES[curr]) return;
    state.currency = curr;
    syncCurrencyUI();
    updateAllSummaries();
  }

  function bindEvents() {
    els.currencySwitch?.addEventListener('click', (e) => {
      const btn = e.target.closest('.v-curr-btn');
      if (btn) handleCurrencySwitch(btn.dataset.curr);
    });

    els.currMini?.addEventListener('click', (e) => {
      const btn = e.target.closest('.m-curr-btn');
      if (btn) handleCurrencySwitch(btn.dataset.curr);
    });

    els.mobileBtn?.addEventListener('click', () => {
      const hidden = els.mobileDrawer.hasAttribute('hidden');
      if (hidden) {
        els.mobileDrawer.removeAttribute('hidden');
        els.mobileBtn.setAttribute('aria-expanded', 'true');
      } else {
        els.mobileDrawer.setAttribute('hidden', '');
        els.mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });

    els.mobileDrawer?.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        els.mobileDrawer.setAttribute('hidden', '');
        els.mobileBtn?.setAttribute('aria-expanded', 'false');
      }
    });

    els.spotlightThumbs?.addEventListener('click', (e) => {
      const btn = e.target.closest('.v-thumb');
      if (!btn) return;
      document.querySelectorAll('#vip-spotlight-thumbs .v-thumb').forEach((t) => t.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (els.spotlightImg && btn.dataset.img) els.spotlightImg.src = btn.dataset.img;
      if (els.spotlightCode && btn.dataset.code) els.spotlightCode.textContent = btn.dataset.code;
      if (els.spotlightTitle && btn.dataset.title) els.spotlightTitle.textContent = btn.dataset.title;
    });

    els.trackPills?.addEventListener('click', (e) => {
      const card = e.target.closest('.track-card');
      if (!card) return;
      state.track = card.dataset.track || 'umrah';
      state.itineraryDays = buildDefaultDays();
      renderTrackControls();
      renderTimeline();
      updateAllSummaries();
    });

    els.subdestPills?.addEventListener('click', (e) => {
      const btn = e.target.closest('.subdest-btn');
      if (!btn) return;
      state.subDest = btn.dataset.dest || 'dubai';
      state.itineraryDays = buildDefaultDays();
      renderTrackControls();
      renderTimeline();
      updateAllSummaries();
    });

    els.flightClasses?.addEventListener('click', (e) => {
      const card = e.target.closest('.class-card');
      if (!card) return;
      state.flightClass = card.dataset.class || 'business';
      renderTrackControls();
      updateAllSummaries();
    });

    els.toggleMeet?.addEventListener('change', (e) => {
      state.meetAssist = e.target.checked;
      updateAllSummaries();
    });

    els.toggleGmc?.addEventListener('change', (e) => {
      state.privateGmc = e.target.checked;
      updateAllSummaries();
    });

    els.toggleSuite?.addEventListener('change', (e) => {
      state.royalSuite = e.target.checked;
      updateAllSummaries();
    });

    els.toggleGuide?.addEventListener('change', (e) => {
      state.personalGuide = e.target.checked;
      updateAllSummaries();
    });

    els.adultsMinus?.addEventListener('click', () => {
      if (state.adults > 1) {
        state.adults -= 1;
        updateAllSummaries();
      }
    });

    els.adultsPlus?.addEventListener('click', () => {
      if (state.adults < 20) {
        state.adults += 1;
        updateAllSummaries();
      }
    });

    els.childrenMinus?.addEventListener('click', () => {
      if (state.children > 0) {
        state.children -= 1;
        updateAllSummaries();
      }
    });

    els.childrenPlus?.addEventListener('click', () => {
      if (state.children < 10) {
        state.children += 1;
        updateAllSummaries();
      }
    });

    els.roomsMinus?.addEventListener('click', () => {
      if (state.rooms > 1) {
        state.rooms -= 1;
        updateAllSummaries();
      }
    });

    els.roomsPlus?.addEventListener('click', () => {
      if (state.rooms < 10) {
        state.rooms += 1;
        updateAllSummaries();
      }
    });

    els.daysMinus?.addEventListener('click', () => setDayCount(state.itineraryDays.length - 1));
    els.daysPlus?.addEventListener('click', () => setDayCount(state.itineraryDays.length + 1));
    els.addDayBtn?.addEventListener('click', () => setDayCount(state.itineraryDays.length + 1));

    els.resetItineraryBtn?.addEventListener('click', () => {
      state.itineraryDays = buildDefaultDays();
      renderTimeline();
      updateAllSummaries();
    });

    els.daysTimeline?.addEventListener('change', (e) => {
      const sel = e.target.closest('.day-preset-select');
      if (!sel) return;
      const idx = Number(sel.dataset.dayIdx);
      if (state.itineraryDays[idx]) {
        state.itineraryDays[idx].selectedOpt = Number(sel.value) || 0;
        renderTimeline();
        updateAllSummaries();
      }
    });

    els.daysTimeline?.addEventListener('input', (e) => {
      const inp = e.target.closest('.day-note-input');
      if (!inp) return;
      const idx = Number(inp.dataset.dayIdx);
      if (state.itineraryDays[idx]) {
        state.itineraryDays[idx].note = inp.value;
        const card = inp.closest('.day-card');
        const desc = card?.querySelector('.day-desc-line');
        const baseText = state.itineraryDays[idx].options[state.itineraryDays[idx].selectedOpt] || '';
        if (desc) desc.textContent = baseText + (inp.value ? ' — ملاحظة: ' + inp.value : '');
        updateAllSummaries();
      }
    });

    els.daysTimeline?.addEventListener('click', (e) => {
      const rmBtn = e.target.closest('.day-remove-btn');
      if (!rmBtn || state.itineraryDays.length <= 3) return;
      const idx = Number(rmBtn.dataset.removeIdx);
      state.itineraryDays.splice(idx, 1);
      renderTimeline();
      updateAllSummaries();
    });

    els.departureCity?.addEventListener('change', updateAllSummaries);
    els.travelDate?.addEventListener('change', updateAllSummaries);
    els.clientName?.addEventListener('input', updateAllSummaries);
    els.clientPhone?.addEventListener('input', updateAllSummaries);

    els.packagesGrid?.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-load-builder');
      if (!btn) return;
      const preset = PACKAGE_PRESETS[btn.dataset.pkgId];
      if (preset) {
        state.track = preset.track;
        state.subDest = preset.subDest;
        state.flightClass = preset.flightClass;
        state.itineraryDays = buildDefaultDays(preset.days);
        renderTrackControls();
        renderTimeline();
        updateAllSummaries();
      }
      document.getElementById('journey-builder')?.scrollIntoView({ behavior: 'smooth' });
    });

    els.openModalTop?.addEventListener('click', openModal);
    els.previewProposalBtn?.addEventListener('click', openModal);
    els.briefOpenModal?.addEventListener('click', openModal);
    els.modalCloseBtn?.addEventListener('click', closeModal);
    els.modalBackdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && els.proposalModal && !els.proposalModal.hasAttribute('hidden')) {
        closeModal();
      }
    });

    els.directWaBtn?.addEventListener('click', sendProposalWhatsApp);
    els.briefSendWa?.addEventListener('click', sendProposalWhatsApp);
    els.modalWaBtn?.addEventListener('click', sendProposalWhatsApp);

    els.modalPrintBtn?.addEventListener('click', () => {
      window.print();
    });

    els.modalCopyBtn?.addEventListener('click', async () => {
      const txt = buildProposalText();
      try {
        await navigator.clipboard.writeText(txt);
        if (els.modalFeedback) {
          els.modalFeedback.textContent = 'تم نسخ جدول الرحلة وعرض السعر التنفيذي إلى الحافظة.';
        }
      } catch (_err) {
        if (els.modalFeedback) {
          els.modalFeedback.textContent = 'تعذر النسخ التلقائي — يمكنك استخدام الطباعة أو الإرسال عبر واتساب.';
        }
      }
    });
  }

  state.itineraryDays = buildDefaultDays();
  renderAgencyHeaderAndStats();
  renderTrackControls();
  renderTimeline();
  renderPackagesAndServices();
  updateAllSummaries();
  bindEvents();
})();
