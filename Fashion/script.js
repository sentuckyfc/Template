// ===== VOGUE STUDIO - Main Script =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const announcementBar = document.querySelector('.announcement-bar');
    const backToTop = document.getElementById('backToTop');

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background & announcement bar hide
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
            announcementBar.style.transform = 'translateY(-100%)';
            announcementBar.style.transition = 'transform 0.3s ease';
        } else {
            navbar.classList.remove('scrolled');
            announcementBar.style.transform = 'translateY(0)';
        }

        // Back to top button
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = scrollY;
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== SEARCH TOGGLE =====
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');

    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== HERO SLIDESHOW =====
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(i);
            startSlideshow();
        });
    });

    startSlideshow();

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== FILTER TABS =====
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card[data-category]');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;

            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== WISHLIST TOGGLE =====
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('liked');

            if (btn.classList.contains('liked')) {
                showToast('Added to wishlist');
                // Pulse animation
                btn.style.transform = 'scale(1.3)';
                setTimeout(() => btn.style.transform = '', 200);
            } else {
                showToast('Removed from wishlist');
            }
        });
    });

    // ===== ADD TO CART =====
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 3;

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            cartItems++;
            cartCount.textContent = cartItems;

            // Animate cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => cartIcon.style.transform = '', 300);

            showToast('Added to bag!');

            // Button feedback
            const originalText = btn.textContent;
            btn.textContent = 'Added ✓';
            btn.style.background = '#16a34a';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 1500);
        });
    });

    // ===== QUICK VIEW MODAL =====
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');

    document.querySelectorAll('.quickview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const img = card.querySelector('.product-img-wrap img');
            const name = card.querySelector('.product-name').textContent;
            const price = card.querySelector('.price').textContent;

            modalImg.src = img.src;
            modalImg.alt = name;
            modalName.textContent = name;
            modalPrice.textContent = price;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Escape key closes modal/search
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            searchOverlay.classList.remove('active');
        }
    });

    // ===== SIZE SELECTOR =====
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ===== QUANTITY CONTROL =====
    const qtyValue = document.getElementById('qtyValue');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    let qty = 1;

    qtyMinus.addEventListener('click', () => {
        if (qty > 1) {
            qty--;
            qtyValue.textContent = qty;
        }
    });

    qtyPlus.addEventListener('click', () => {
        if (qty < 10) {
            qty++;
            qtyValue.textContent = qty;
        }
    });

    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const btn = newsletterForm.querySelector('button');

        btn.textContent = 'Subscribed!';
        btn.style.background = '#16a34a';
        btn.style.borderColor = '#16a34a';
        input.value = '';

        showToast('Welcome! Check your inbox for 10% off.');

        setTimeout(() => {
            btn.textContent = 'Subscribe';
            btn.style.background = '';
            btn.style.borderColor = '';
        }, 3000);
    });

    // ===== TOAST NOTIFICATION =====
    function showToast(message) {
        // Remove existing toast
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${message}
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 2500);
    }

    // ===== SMOOTH NAV LINK SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 100;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===== COLOR DOT INTERACTION =====
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const siblings = dot.parentElement.querySelectorAll('.color-dot');
            siblings.forEach(s => s.style.outline = 'none');
            dot.style.outline = '2px solid #0a0a0a';
            dot.style.outlineOffset = '2px';
        });
    });

    // ===== PARALLAX EFFECT ON PROMO =====
    const promoBg = document.querySelector('.promo-bg');
    if (promoBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const section = promoBg.closest('.promo-banner');
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.3;
                const yPos = -(rect.top * speed);
                promoBg.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

});
