document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const circles = document.querySelectorAll('.circle');
    const introContent = document.querySelector('.intro-content');

    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';

    // Configure GSAP for performance
    gsap.config({
        force3D: true,
        nullTargetWarn: false
    });

    // Create continuous zoom-out animation for circles
    circles.forEach((circle, index) => {
        gsap.set(circle, {
            scale: 0.3,
            opacity: 0
        });

        gsap.to(circle, {
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'power2.out'
        });

        gsap.to(circle, {
            scale: 2.5,
            duration: 5 + (index * 0.5),
            repeat: -1,
            ease: 'linear',
            delay: index * 0.2,
            modifiers: {
                scale: function(scale) {
                    return parseFloat(scale) > 2.5 ? 0.3 : scale;
                }
            }
        });

        gsap.to(circle, {
            rotation: 360,
            duration: 20 + (index * 2),
            repeat: -1,
            ease: 'linear'
        });
    });

    gsap.to(introContent, {
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Click/Tap to transition WITH MUSIC
    function handleTransition(e) {
        e.preventDefault();
        
        console.log('🎵 Transition started!');
        
        // Remove event listeners to prevent multiple clicks
        introScreen.removeEventListener('click', handleTransition);
        introScreen.removeEventListener('touchstart', handleTransition);

// PLAY BACKGROUND MUSIC WITH FADE IN
const backgroundMusic = document.getElementById('backgroundMusic');
console.log('Music element found:', backgroundMusic);

if (backgroundMusic) {
    // Start at volume 0
    backgroundMusic.volume = 0;
    
    // Try to play music
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('✅ Music is playing!');
                
                // Fade in music over 3 seconds using GSAP
                gsap.to(backgroundMusic, {
                    volume: 0.2,  // Final volume (25% - gentle and calming)
                    duration: 3,    // 3 seconds fade in
                    ease: 'power2.inOut'
                });
            })
            .catch(err => {
                console.error('❌ Music failed:', err);
            });
    }
} else {
    console.error('❌ Audio element not found!');
}

        // Animation timeline
        const tl = gsap.timeline({
            onComplete: () => {
                introScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        tl.to(circles, {
            scale: 5,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power2.in'
        })
        .to(introContent, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'power2.in'
        }, '-=1')
        .to(introScreen, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut'
        }, '-=0.4')
        .fromTo(mainContent,
            {
                opacity: 0,
                display: 'block'
            },
            {
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            },
            '-=0.3'
        )
        .fromTo('.navbar',
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.6'
        )
        .fromTo('.hero-title',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            '-=0.5'
        )
        .fromTo('.hero-subtitle',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.7'
        );
    }

    // Add event listeners
    introScreen.addEventListener('click', handleTransition);
    introScreen.addEventListener('touchstart', handleTransition);
});
