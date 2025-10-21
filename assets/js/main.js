document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const hamburger = menuToggle.querySelector('.hamburger');
    
    menuToggle.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        
        // Add your menu open logic here
        console.log('Menu toggled');
    });
});
