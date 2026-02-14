const body = document.body;
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

function toggleMenu() {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.classList.toggle('is-active', isOpen);
  body.classList.toggle('menu-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', toggleMenu);

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealElements = document.querySelectorAll('.hero__copy, .hero__media, .collection-card, .experience__copy li, .experience__stat, .experience__timeline, .services__grid article, .insights__list article, .contact__card');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  revealElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.08}s`;
    observer.observe(el);
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 860 && navMenu.classList.contains('is-open')) {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    body.classList.remove('menu-open');
  }
});
