/* ============================================
   WRECK STUDIO — NEOBRUTALIST JS
   Loader, Reveals, Counters, FAQ, Nav, Form
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- LOADER ---
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initReveal();
    initCounters();
  }, 2200);
  document.body.style.overflow = 'hidden';

  // --- NAVBAR HIDE/SHOW ON SCROLL ---
  const nav = document.getElementById('navbar');
  let lastScroll = 0;
  let navHidden = false;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 100 && current > lastScroll && !navHidden) {
      nav.classList.add('hidden');
      navHidden = true;
    } else if (current < lastScroll && navHidden) {
      nav.classList.remove('hidden');
      navHidden = false;
    }
    lastScroll = current;
  }, { passive: true });

  // --- BURGER MENU ---
  const burger = document.getElementById('burger');
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

  // --- SCROLL REVEAL ---
  function initReveal() {
    const elements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
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
          animateCount(el, 0, target, 2000);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCount(el, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * (end - start) + start);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = end;
      }
    }

    requestAnimationFrame(update);
  }

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Open clicked if it wasn't open
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // --- SMOOTH SCROLL for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- FORM HANDLING ---
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'SENDING...';
    btn.disabled = true;
    btn.style.opacity = '0.6';

    // Simulate submission
    setTimeout(() => {
      btn.textContent = '✓ MESSAGE RECEIVED — WE\'LL BE IN TOUCH';
      btn.style.background = '#00C9A7';
      btn.style.opacity = '1';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }, 1500);
  });

  // --- TILT EFFECT ON SERVICE CARDS ---
  const cards = document.querySelectorAll('.service-card, .price-card, .work-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(-2px, -2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- MAGNETIC CTA BUTTONS ---
  const ctas = document.querySelectorAll('.btn-primary');

  ctas.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.setProperty('--mx', `${x * 0.15}px`);
      btn.style.setProperty('--my', `${y * 0.15}px`);
      btn.style.transform = `translate(calc(-4px + var(--mx)), calc(-4px + var(--my)))`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

});
