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
        // Initial setup - start from small scale
        gsap.set(circle, {
            scale: 0.3,
            opacity: 0
        });

        // Fade in first
        gsap.to(circle, {
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'power2.out'
        });

        // Continuous zoom out animation (infinite loop)
        gsap.to(circle, {
            scale: 2.5,
            duration: 5 + (index * 0.5), // Different speeds for each circle
            repeat: -1,
            ease: 'linear',
            delay: index * 0.2,
            modifiers: {
                scale: function(scale) {
                    // When scale reaches 2.5, reset to 0.3 seamlessly
                    return parseFloat(scale) > 2.5 ? 0.3 : scale;
                }
            }
        });

        // Add rotation for more dynamic effect
        gsap.to(circle, {
            rotation: 360,
            duration: 20 + (index * 2),
            repeat: -1,
            ease: 'linear'
        });
    });

    // Pulse animation for text
    gsap.to(introContent, {
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Click/Tap to transition
    function handleTransition(e) {
        e.preventDefault();
        
        // Remove event listeners to prevent multiple clicks
        introScreen.removeEventListener('click', handleTransition);
        introScreen.removeEventListener('touchstart', handleTransition);

        const tl = gsap.timeline({
            onComplete: () => {
                introScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Animate circles zooming out rapidly
        tl.to(circles, {
            scale: 5,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power2.in'
        })
        // Fade out text
        .to(introContent, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'power2.in'
        }, '-=1')
        // Fade out entire intro screen
        .to(introScreen, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut'
        }, '-=0.4')
        // Fade in main content
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
        // Animate navbar
        .fromTo('.navbar',
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.6'
        )
        // Animate hero content
        .fromTo('.hero h1',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            '-=0.5'
        )
        .fromTo('.hero p',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.7'
        );
    }

    // Add both click and touch support
    introScreen.addEventListener('click', handleTransition);
    introScreen.addEventListener('touchstart', handleTransition);
});
