// Contoh Logik Penapisan Mudah
const filterLoc = document.getElementById('filter-location');
const cards = document.querySelectorAll('.property-card');

filterLoc.addEventListener('change', (e) => {
    const selection = e.target.value;
    
    cards.forEach(card => {
        if (selection === 'all' || card.dataset.location === selection) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

