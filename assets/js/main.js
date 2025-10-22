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

// Music Controls
// document.addEventListener('DOMContentLoaded', () => {
//     const musicControls = document.getElementById('musicControls');
//     const musicPlayPause = document.getElementById('musicPlayPause');
//     const volumeSlider = document.getElementById('volumeSlider');
//     const backgroundMusic = document.getElementById('backgroundMusic');
    
//     // Show controls after music starts
//     setTimeout(() => {
//         if (musicControls && !backgroundMusic.paused) {
//             musicControls.style.display = 'flex';
//         }
//     }, 4000); // Show after 4 seconds
    
//     // Play/Pause toggle
//     if (musicPlayPause && backgroundMusic) {
//         musicPlayPause.addEventListener('click', () => {
//             if (backgroundMusic.paused) {
//                 backgroundMusic.play();
//                 musicPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
//             } else {
//                 backgroundMusic.pause();
//                 musicPlayPause.innerHTML = '<i class="fas fa-play"></i>';
//             }
//         });
//     }
    
//     // Volume control
//     if (volumeSlider && backgroundMusic) {
//         volumeSlider.addEventListener('input', (e) => {
//             backgroundMusic.volume = e.target.value / 100;
//         });
//     }
// });
