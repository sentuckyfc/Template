/* ==========================================
   HAVEN — Modern Property Landing Page JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // === Preloader ===
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.querySelector('.hero').classList.add('loaded');
        }, 800);
    });

    // Fallback: hide preloader after 3s
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.querySelector('.hero')?.classList.add('loaded');
    }, 3000);

    // === Custom Cursor ===
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effect
        const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .property-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    // === Navbar Scroll ===
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Back to top
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === Mobile Menu ===
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // === Scroll Reveal ===
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // === Animated Counter ===
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const step = duration / 60;

        function update() {
            current += increment;
            if (current >= target) {
                element.textContent = target;
            } else {
                element.textContent = Math.floor(current);
                setTimeout(update, step);
            }
        }
        update();
    }

    // === Testimonial Slider ===
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testiPrev');
    const nextBtn = document.getElementById('testiNext');
    const dotsContainer = document.getElementById('testiDots');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    let currentSlide = 0;
    const totalSlides = cards.length;

    // Create dots
    if (dotsContainer && totalSlides > 0) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('testi-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        if (track) {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        const dots = dotsContainer?.querySelectorAll('.testi-dot');
        dots?.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    prevBtn?.addEventListener('click', () => {
        goToSlide(currentSlide <= 0 ? totalSlides - 1 : currentSlide - 1);
    });

    nextBtn?.addEventListener('click', () => {
        goToSlide(currentSlide >= totalSlides - 1 ? 0 : currentSlide + 1);
    });

    // Auto slide
    let autoSlide = setInterval(() => {
        if (totalSlides > 0) {
            goToSlide(currentSlide >= totalSlides - 1 ? 0 : currentSlide + 1);
        }
    }, 5000);

    // Pause on hover
    const slider = document.getElementById('testimonialSlider');
    slider?.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider?.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            if (totalSlides > 0) {
                goToSlide(currentSlide >= totalSlides - 1 ? 0 : currentSlide + 1);
            }
        }, 5000);
    });

    // === Smooth anchor scrolling ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // === Contact Form ===
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Sent Successfully!</span> <i class="fa-solid fa-check"></i>';
        btn.style.background = '#2ecc71';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            form.reset();
        }, 2500);
    });

    // === Parallax on hero image ===
    const heroImg = document.querySelector('.hero-img');
    if (heroImg && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroImg.style.transform = `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.3}px)`;
            }
        }, { passive: true });
    }

});
