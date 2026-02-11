/* ============================================
   LUXORA — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ----- Preloader -----
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('loaded');
        }, 2000);
    });
    // Fallback in case load event already fired
    setTimeout(() => {
        document.getElementById('preloader')?.classList.add('loaded');
    }, 3000);

    // ----- Navbar Scroll -----
    const navbar = document.getElementById('navbar');
    const announcementBar = document.querySelector('.announcement-bar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ----- Search Toggle -----
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');

    searchToggle?.addEventListener('click', () => {
        searchOverlay.classList.toggle('active');
        if (searchOverlay.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 300);
        }
    });

    document.querySelector('.search-close')?.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // ----- Mobile Menu -----
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    menuToggle?.addEventListener('click', () => mobileMenu.classList.add('active'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('active'));

    // ----- Cart Sidebar -----
    const cartToggle = document.getElementById('cartToggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');

    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    cartToggle?.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
    cartClose?.addEventListener('click', closeCart);
    cartOverlay?.addEventListener('click', closeCart);

    // ----- Quick View Modal -----
    const quickViewOverlay = document.getElementById('quickViewOverlay');
    const quickViewModal = document.getElementById('quickViewModal');
    const modalClose = document.getElementById('modalClose');

    function openQuickView(card) {
        const img = card.querySelector('.product-img')?.src;
        const title = card.querySelector('.product-name')?.textContent;
        const price = card.querySelector('.price-current')?.textContent;
        const brand = card.querySelector('.product-brand')?.textContent;

        document.getElementById('modalImage').src = img || '';
        document.getElementById('modalTitle').textContent = title || '';
        document.getElementById('modalPrice').textContent = price || '';

        quickViewModal.classList.add('active');
        quickViewOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeQuickView() {
        quickViewModal.classList.remove('active');
        quickViewOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    modalClose?.addEventListener('click', closeQuickView);
    quickViewOverlay?.addEventListener('click', closeQuickView);

    document.querySelectorAll('.quickview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            openQuickView(card);
        });
    });

    // ----- Wishlist Toggle -----
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });

    // ----- Add to Cart Animation -----
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.textContent = '✓ Added!';
            btn.style.background = '#3a7d44';
            setTimeout(() => {
                btn.textContent = 'Add to Bag';
                btn.style.background = '';
            }, 2000);

            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = parseInt(cartCount.textContent) + 1;
                cartCount.style.transform = 'scale(1.4)';
                setTimeout(() => cartCount.style.transform = 'scale(1)', 300);
            }
        });
    });

    // ----- Product Tabs/Filter -----
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tab = btn.dataset.tab;
            productCards.forEach(card => {
                if (tab === 'all' || card.dataset.category === tab) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----- Stat Counter Animation -----
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.target);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased);
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        });
    }

    // Trigger counter when hero in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);

    // ----- Scroll Animations (AOS-like) -----
    const scrollElements = document.querySelectorAll('[data-aos]');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, index * 80);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    scrollElements.forEach(el => scrollObserver.observe(el));

    // ----- Back to Top -----
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----- Newsletter Form -----
    document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const btn = e.target.querySelector('button');
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#3a7d44';
        btn.style.borderColor = '#3a7d44';
        input.value = '';
        setTimeout(() => {
            btn.textContent = 'Subscribe';
            btn.style.background = '';
            btn.style.borderColor = '';
        }, 3000);
    });

    // ----- Lazy Image Loading -----
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });

    // ----- Reviews Dots -----
    const reviewDots = document.getElementById('reviewDots');
    if (reviewDots) {
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.classList.add('review-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                document.querySelectorAll('.review-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
            reviewDots.appendChild(dot);
        }
    }

    // ----- Close modals on Escape -----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            closeQuickView();
            searchOverlay?.classList.remove('active');
            mobileMenu?.classList.remove('active');
        }
    });

    // ----- Smooth parallax on hero -----
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-bg img, .hero-bg video');
        if (hero && window.scrollY < window.innerHeight) {
            hero.style.transform = `scale(${1 + window.scrollY * 0.0003}) translateY(${window.scrollY * 0.25}px)`;
        }
    });

    // ----- Size button toggle in modal -----
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ----- Qty buttons in cart -----
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const span = btn.parentElement.querySelector('span');
            let val = parseInt(span.textContent);
            if (btn.textContent === '+') val++;
            else if (val > 1) val--;
            span.textContent = val;
        });
    });

    console.log('%c✨ LUXORA Beauty — Crafted with love', 'color: #6b3a5c; font-size: 14px; font-weight: bold;');
});
