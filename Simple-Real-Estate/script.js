// Toggles the mobile dropdown menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Switches between the pages
function showPage(pageId) {
    // 1. Hide all elements with the 'page' class
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // 2. Show the target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 3. Close mobile menu if it is open
    const navLinks = document.getElementById('navLinks');
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }

    // 4. Scroll gracefully back to the top of the window
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}