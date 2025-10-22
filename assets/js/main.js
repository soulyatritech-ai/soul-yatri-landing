document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const hamburger = menuToggle.querySelector('.hamburger');
    
    menuToggle.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        
        // Add your menu open logic here
        console.log('Menu toggled');
    });
});
// Add at the end of main.js

// Show navbar only on hero section
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    // Hide after scrolling 800px (adjust as needed)
    if (scrollPosition > 800) {
        navbar.style.display = 'none';
    } else {
        navbar.style.display = 'flex';
    }
});
