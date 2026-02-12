/* ============================================
   STILLHET — Scandinavian Fashion
   Interactive JS — Gentle & Purposeful
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('done');
      document.body.style.overflow = '';
      initRevealAll();
    }, 2200);
  });

  /* ---------- NAVBAR: Hide/Show on Scroll ---------- */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > 80) {
      nav.classList.toggle('hidden', curr > lastScroll);
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = curr;
  }, { passive: true });

  /* ---------- MOBILE MENU ---------- */
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight + 20 : 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- SCROLL REVEAL (Intersection Observer) ---------- */
  function initRevealAll() {
    const reveals = document.querySelectorAll('[data-reveal]');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 2000;
          const start = performance.now();
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(target * eased);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }
  animateCounters();

  /* ---------- TESTIMONIAL SLIDER ---------- */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let autoTimer;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }

  function startAuto() {
    autoTimer = setInterval(nextSlide, 5000);
  }

  if (slides.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(autoTimer);
        goToSlide(i);
        startAuto();
      });
    });
    startAuto();
  }

  /* ---------- PARALLAX on Hero Image ---------- */
  const heroImgWrap = document.querySelector('.hero-img-wrap');
  if (heroImgWrap) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        heroImgWrap.style.transform = `translateY(${scroll * 0.05}px)`;
      }
    }, { passive: true });
  }

  /* ---------- NEWSLETTER FORM ---------- */
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = nlForm.querySelector('input');
      const btn = nlForm.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Tack så mycket ♡';
      btn.style.background = 'var(--accent-sage)';
      input.value = '';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
      }, 2800);
    });
  }

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Message sent ✓';
      btn.style.background = 'var(--accent-sage)';
      contactForm.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
      }, 3000);
    });
  }

  /* ---------- ACTIVE NAV HIGHLIGHTING ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        const id = section.getAttribute('id');
        navLinks.forEach(l => {
          l.style.color = '';
          if (l.getAttribute('href') === '#' + id) {
            l.style.color = 'var(--accent-warm)';
          }
        });
      }
    });
  }, { passive: true });

});
