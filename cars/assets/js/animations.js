/* ============================================================
   كروم برو — Interactive & Animation Logic
   assets/js/animations.js
   Upgraded with Clamped Labels & Rock-solid Resilience
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterModule();
  init3DCardTilt();
  initNumberCounters();
});

/* ── 1. Before / After Auto-Tour with Resume & Attached Labels ─ */
let autoTourAnimation = null;
let isUserPaused = false;
let userResumeTimer = null;
let currentPos = 0.5;
let autoTourDirection = 1;

function initBeforeAfterModule() {
  const frame = document.getElementById('ba-stage') || document.getElementById('ba-frame') || document.querySelector('.ba-frame');
  const beforeSide = document.getElementById('ba-before-layer') || document.querySelector('.ba-before');
  const handle = document.getElementById('ba-handle') || document.querySelector('.ba-handle');
  const btnToggleAuto = document.getElementById('ba-toggle-tour-btn') || document.getElementById('btn-toggle-auto');
  const statusMsg = document.getElementById('ba-status-msg');

  if (!frame || !beforeSide || !handle) return;

  let isDragging = false;

  function setSliderPos(pos) {
    pos = Math.max(0.10, Math.min(0.90, pos));
    currentPos = pos;
    const pct = pos * 100;

    handle.style.left = `${pct}%`;
    beforeSide.style.clipPath = `inset(0 0 0 ${pct}%)`;

    // تحريك النصوص لتكون ملتصقة ومحمية بحسابات الهامش الآمن (Clamped)
    const labelAfter = document.getElementById('ba-label-after');
    const labelBefore = document.getElementById('ba-label-before');
    
    if (labelAfter) {
      // إزاحة النص الأيمن ليكون بجانب الخط مباشرة دون أن يختفي عند الحافة اليسرى
      const clampedAfter = Math.max(pct - 16, 4);
      labelAfter.style.left = `${clampedAfter}%`;
    }
    if (labelBefore) {
      // إزاحة النص الأيسر ليكون بجانب الخط مباشرة دون أن يختفي عند الحافة اليمنى
      const clampedBefore = Math.min(pct + 16, 96);
      labelBefore.style.left = `${clampedBefore}%`;
    }
  }

  function handlePointer(clientX) {
    pauseAutoTourTemporarily();
    const rect = frame.getBoundingClientRect();
    const pos = (clientX - rect.left) / rect.width;
    setSliderPos(pos);
  }

  // Pointer & Mouse Events
  frame.addEventListener('mousedown', (e) => {
    isDragging = true;
    handlePointer(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    handlePointer(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      scheduleAutoResume(setSliderPos);
    }
  });

  // Touch Support for Mobile / iPad
  frame.addEventListener('touchstart', (e) => {
    if (!e.touches || !e.touches[0]) return;
    isDragging = true;
    handlePointer(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches || !e.touches[0]) return;
    handlePointer(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      scheduleAutoResume(setSliderPos);
    }
  });

  window.addEventListener('touchcancel', () => {
    if (isDragging) {
      isDragging = false;
      scheduleAutoResume(setSliderPos);
    }
  });

  // زر الإيقاف والتشغيل اليدوي الصريح
  if (btnToggleAuto) {
    btnToggleAuto.addEventListener('click', () => {
      if (isUserPaused) {
        isUserPaused = false;
        btnToggleAuto.classList.remove('is-paused');
        btnToggleAuto.innerHTML = `<span>إيقاف الحركة مؤقتاً ⏸</span>`;
        if (statusMsg) statusMsg.textContent = 'الشريط يتحرك تلقائياً — اسحب يدويًا في أي وقت أو اضغط لإيقافه مؤقتاً';
        startAutoTour(setSliderPos);
      } else {
        isUserPaused = true;
        btnToggleAuto.classList.add('is-paused');
        if (userResumeTimer) clearTimeout(userResumeTimer);
        stopAutoTourLoop();
        btnToggleAuto.innerHTML = `<span>تشغيل الحركة التلقائية ▶</span>`;
        if (statusMsg) statusMsg.textContent = 'الحركة متوقفة مؤقتاً — يمكنك السحب بالماوس أو اللمس للاستكشاف';
      }
    });
  }

  setSliderPos(0.5);

  // Pause tour when element is offscreen to preserve 60/120fps buttery smooth scroll performance
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!isUserPaused) startAutoTour(setSliderPos);
      } else {
        stopAutoTourLoop();
      }
    });
  }, { threshold: 0.1 });
  visibilityObserver.observe(frame);
}

function startAutoTour(setPosFn) {
  if (isUserPaused) return;
  stopAutoTourLoop();

  const speed = 0.003;

  function loop() {
    if (isUserPaused) return;

    currentPos += speed * autoTourDirection;
    if (currentPos >= 0.86) {
      autoTourDirection = -1;
    } else if (currentPos <= 0.14) {
      autoTourDirection = 1;
    }

    setPosFn(currentPos);
    autoTourAnimation = requestAnimationFrame(loop);
  }

  autoTourAnimation = requestAnimationFrame(loop);
}

function stopAutoTourLoop() {
  if (autoTourAnimation) {
    cancelAnimationFrame(autoTourAnimation);
    autoTourAnimation = null;
  }
}

function pauseAutoTourTemporarily() {
  if (userResumeTimer) {
    clearTimeout(userResumeTimer);
    userResumeTimer = null;
  }
  stopAutoTourLoop();
}

function scheduleAutoResume(setPosFn) {
  if (isUserPaused) return;
  if (userResumeTimer) clearTimeout(userResumeTimer);

  userResumeTimer = setTimeout(() => {
    if (!isUserPaused) {
      startAutoTour(setPosFn);
    }
  }, 2200);
}

/* ── 2. 3D Card Tilt Effect ────────────────────────────────── */
function init3DCardTilt() {
  const cards = document.querySelectorAll('.srv-card, .pkg-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ── 3. Animated Number Counters on Scroll ─────────────────── */
function initNumberCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters || counters.length === 0) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateAllCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.15 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  } else {
    animateAllCounters();
  }

  function animateAllCounters() {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target')) || 0;
      const decimals = parseInt(counter.getAttribute('data-decimals'), 10) || 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = (target * easeProgress).toFixed(decimals);

        counter.textContent = currentVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(update);
    });
  }
}
