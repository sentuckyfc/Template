/* ===================================
   DRPSTREET — Scripts
   =================================== */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// --- Hamburger mobile menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// --- Scroll Reveal ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// --- Smooth scroll for nav links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- Product card hover (touch devices) ---
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// --- Quick Add button feedback ---
document.querySelectorAll('.product-overlay .btn-small').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const original = btn.textContent;
        btn.textContent = 'Added ✓';
        btn.style.background = '#fff';
        btn.style.color = '#000';
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
            btn.style.color = '';
        }, 1500);
    });
});

// --- Newsletter form ---
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = 'Subscribed ✓';
        btn.style.background = '#fff';
        btn.style.color = '#000';
        input.value = '';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2500);
    });
}

// --- Parallax on hero image ---
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroImg.style.transform = `scale(1) translateY(${scrolled * 0.08}px)`;
        }
    });
}

// --- Search button (placeholder) ---
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        // Placeholder — could open a search overlay
        console.log('Search clicked');
    });
}
