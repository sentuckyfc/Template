/* ============================================
   SIGNAL — SWISS INTERNATIONAL STYLE JS
   Loader, Scroll Reveals, Counters, Nav, FAQ, Form
   Smooth and precise — like the movement of a Swiss watch.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- LOADER ---
  const loader = document.getElementById('loader');
  const counter = document.getElementById('loaderCounter');
  let count = 0;
  const loaderInterval = setInterval(() => {
    count += Math.floor(Math.random() * 4) + 1;
    if (count >= 100) {
      count = 100;
      clearInterval(loaderInterval);
      counter.style.color = '#E63946';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        triggerHeroAnimations();
        initScrollAnimations();
        initCounters();
      }, 400);
    }
    counter.textContent = String(count).padStart(3, '0');
  }, 25);
  document.body.style.overflow = 'hidden';

  // --- CLOCK ---
  const navTime = document.getElementById('navTime');
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    navTime.textContent = `${h}:${m}:${s} CET`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // --- NAV HIDE/SHOW ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 120 && current > lastScroll) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScroll = current;
  }, { passive: true });

  // --- BURGER ---
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- HERO STAGGERED ANIMATIONS ---
  function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero [data-animate]');
    heroElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 150);
    });
  }

  // --- SCROLL REVEAL ---
  function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]:not(.hero [data-animate])');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  // --- COUNTER ANIMATION ---
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          animateNumber(el, 0, target, 2200);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateNumber(el, start, end, duration) {
    const startTime = performance.now();

    function update(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quint for that smooth Swiss precision feel
      const eased = 1 - Math.pow(1 - progress, 5);
      el.textContent = Math.floor(eased * (end - start) + start);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = end;
      }
    }

    requestAnimationFrame(update);
  }

  // --- SMOOTH ANCHOR SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- CAPABILITY ITEMS: subtle hover line color ---
  const capItems = document.querySelectorAll('.cap-item');
  capItems.forEach(item => {
    const colorDot = item.querySelector('.cap-color');
    if (colorDot) {
      const color = getComputedStyle(colorDot).backgroundColor;
      item.addEventListener('mouseenter', () => {
        item.style.borderLeftColor = color;
      });
      item.addEventListener('mouseleave', () => {
        item.style.borderLeftColor = '';
      });
    }
  });

  // --- FORM ---
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'PROCESSING...';
    btn.disabled = true;
    btn.style.opacity = '0.5';

    setTimeout(() => {
      btn.textContent = '✓ INQUIRY RECEIVED';
      btn.style.background = '#2A9D8F';
      btn.style.borderColor = '#2A9D8F';
      btn.style.opacity = '1';

      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }, 1500);
  });

  // --- MINI CHART BAR ANIMATION ---
  const bars = document.querySelectorAll('.mini-chart .bar');
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const barsInChart = entry.target.querySelectorAll('.bar');
        barsInChart.forEach((bar, i) => {
          bar.style.height = '0%';
          setTimeout(() => {
            bar.style.height = bar.style.getPropertyValue('--h');
          }, i * 80);
        });
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.mini-chart').forEach(chart => {
    chartObserver.observe(chart);
  });

  // --- GRID TOGGLE (Easter egg: press G to show grid) ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'g' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      document.body.classList.toggle('show-grid');
    }
  });

});
