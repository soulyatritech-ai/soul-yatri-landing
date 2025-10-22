document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const circles = document.querySelectorAll('.circle');
    const introContent = document.querySelector('.intro-content');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';

    // Mobile audio unlock - create audio context on first touch
    let audioContext;
    let audioSource;
    let gainNode;
    let audioUnlocked = false;

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

    // Unlock audio on first touch (iOS fix)
    function unlockAudio() {
        if (audioUnlocked) return;
        
        const silentAudio = document.createElement('audio');
        silentAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        silentAudio.play().then(() => {
            audioUnlocked = true;
            console.log('✅ Audio unlocked for mobile');
        }).catch(() => {
            console.log('⚠️ Audio unlock failed');
        });
    }

    // iOS-specific audio initialization
    function initMobileAudio() {
        unlockAudio();
        
        if (backgroundMusic) {
            // Load audio immediately
            backgroundMusic.load();
            
            // Try playing muted first (required by iOS)
            backgroundMusic.muted = true;
            backgroundMusic.play().then(() => {
                backgroundMusic.pause();
                backgroundMusic.muted = false;
                backgroundMusic.currentTime = 0;
                console.log('✅ Audio prepared for mobile');
            }).catch(err => {
                console.log('⚠️ Audio prep failed:', err);
            });
        }
    }

    // Call on page load
    initMobileAudio();

    // Mobile-friendly music playback with multiple fallbacks
    function playMusicWithFadeIn() {
        if (!backgroundMusic) {
            console.error('❌ Audio element not found');
            return;
        }

        console.log('🎵 Attempting to play music...');

        // Method 1: Direct play (works on most devices)
        backgroundMusic.volume = 0;
        backgroundMusic.muted = false;
        
        const playAttempt = backgroundMusic.play();
        
        if (playAttempt !== undefined) {
            playAttempt.then(() => {
                console.log('✅ Music playing successfully');
                
                // Fade in volume
                gsap.to(backgroundMusic, {
                    volume: 0.25,
                    duration: 3,
                    ease: 'power2.inOut'
                });
            }).catch(err => {
                console.error('❌ Playback failed:', err);
                
                // Method 2: Retry with user gesture
                setTimeout(() => {
                    backgroundMusic.play().then(() => {
                        gsap.to(backgroundMusic, {
                            volume: 0.25,
                            duration: 3,
                            ease: 'power2.inOut'
                        });
                    });
                }, 100);
            });
        } else {
            // Fallback for older browsers
            backgroundMusic.play();
            gsap.to(backgroundMusic, {
                volume: 0.25,
                duration: 3,
                ease: 'power2.inOut'
            });
        }
    }

    // Click/Tap to transition WITH MUSIC
    function handleTransition(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🎵 Transition started!');
        
        // Remove event listeners to prevent multiple clicks
        introScreen.removeEventListener('click', handleTransition);
        introScreen.removeEventListener('touchstart', handleTransition);
        introScreen.removeEventListener('touchend', handleTransition);

        // PLAY MUSIC IMMEDIATELY (must be synchronous for iOS)
        playMusicWithFadeIn();

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

    // Add MULTIPLE event listeners for better mobile support
    introScreen.addEventListener('click', handleTransition, { passive: false });
    introScreen.addEventListener('touchstart', handleTransition, { passive: false });
    introScreen.addEventListener('touchend', handleTransition, { passive: false });
    
    // Also unlock audio on any touch
    document.body.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
});
