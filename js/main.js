// home.js - Home Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏠 Home page scripts initializing...');
    
    // ================= ADVANCED SLIDER EFFECTS =================
    function initSliderEffects() {
        const heroSlider = document.querySelector('.hero-slider');
        if (!heroSlider) return;
        
        // Create particle effect
        function createParticles() {
            const particleContainer = document.createElement('div');
            particleContainer.className = 'slider-particles';
            particleContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 2;
                overflow: hidden;
            `;
            heroSlider.appendChild(particleContainer);
            
            // Create multiple particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 3 + 1}px;
                    height: ${Math.random() * 3 + 1}px;
                    background: rgba(212, 175, 55, ${Math.random() * 0.3 + 0.3});
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: floatParticle ${Math.random() * 15 + 10}s linear infinite;
                    animation-delay: ${Math.random() * 5}s;
                `;
                particleContainer.appendChild(particle);
            }
        }
        
        // Add parallax effect to slide content
        function initParallaxEffect() {
            const slideContents = document.querySelectorAll('.slide-content');
            
            heroSlider.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                
                slideContents.forEach(content => {
                    if (content.parentElement.parentElement.classList.contains('active')) {
                        content.style.transform = `
                            translateX(${(x - 50) * 0.02}px) 
                            translateY(${(y - 50) * 0.02}px)
                        `;
                    }
                });
            });
            
            heroSlider.addEventListener('mouseleave', () => {
                slideContents.forEach(content => {
                    content.style.transform = '';
                });
            });
        }
        
        // Add typing effect to slide titles
        function initTypingEffect() {
            const slides = document.querySelectorAll('.slide');
            
            slides.forEach(slide => {
                const title = slide.querySelector('h1');
                if (title) {
                    const originalText = title.textContent;
                    title.dataset.originalText = originalText;
                    title.textContent = '';
                    
                    // Start typing when slide becomes active
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                typeText(title, originalText);
                            } else {
                                title.textContent = originalText;
                            }
                        });
                    }, { threshold: 0.5 });
                    
                    observer.observe(slide);
                }
            });
            
            function typeText(element, text) {
                element.textContent = '';
                let i = 0;
                
                function typeChar() {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeChar, 50);
                    }
                }
                
                // Start typing after slide transition
                setTimeout(typeChar, 500);
            }
        }
        
        // Add glow effect to active slide
        function initGlowEffect() {
            const slides = document.querySelectorAll('.slide');
            
            setInterval(() => {
                slides.forEach(slide => {
                    if (slide.classList.contains('active')) {
                        const overlay = slide.querySelector('.slide-overlay');
                        if (overlay) {
                            overlay.style.boxShadow = `
                                inset 0 0 60px rgba(212, 175, 55, 0.1),
                                inset 0 0 100px rgba(212, 175, 55, 0.05)
                            `;
                            
                            // Pulsing effect
                            setTimeout(() => {
                                overlay.style.boxShadow = '';
                            }, 1000);
                        }
                    }
                });
            }, 3000);
        }
        
        // Initialize all effects
        createParticles();
        initParallaxEffect();
        // initTypingEffect(); // Uncomment for typing effect
        initGlowEffect();
        
        console.log('✨ Slider effects initialized');
    }
    
    // ================= ENHANCED FEATURE CARDS =================
    function initEnhancedFeatures() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            // Add staggered animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = 'float 6s ease-in-out infinite';
            
            // Add hover glow effect
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = `
                    0 25px 50px rgba(212, 175, 55, 0.2),
                    0 0 100px rgba(212, 175, 55, 0.1)
                `;
                this.style.transform = 'translateY(-15px) scale(1.03)';
                
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.boxShadow = '0 15px 30px rgba(212, 175, 55, 0.4)';
                    icon.style.background = 'linear-gradient(135deg, var(--gold), var(--gold-light))';
                    icon.style.color = 'var(--white)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
                this.style.transform = '';
                
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = '';
                    icon.style.boxShadow = '';
                    icon.style.background = '';
                    icon.style.color = '';
                }
            });
            
            // Add click effect
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        console.log('✨ Enhanced features initialized');
    }
    
    // ================= ENHANCED TIMELINE =================
    function initEnhancedTimeline() {
        const timelineSteps = document.querySelectorAll('.timeline-step');
        
        timelineSteps.forEach((step, index) => {
            // Add connection lines between steps
            if (index < timelineSteps.length - 1) {
                const line = document.createElement('div');
                line.className = 'timeline-connector';
                line.style.cssText = `
                    position: absolute;
                    right: 50%;
                    top: 60px;
                    width: 2px;
                    height: 60px;
                    background: linear-gradient(to bottom, 
                        rgba(212, 175, 55, 0.3) 0%,
                        rgba(212, 175, 55, 0.6) 50%,
                        rgba(212, 175, 55, 0.3) 100%);
                    transform: translateX(50%);
                    z-index: 1;
                    opacity: 0;
                    transition: opacity 0.6s ease;
                `;
                step.appendChild(line);
            }
            
            // Add hover effects
            step.addEventListener('mouseenter', function() {
                const stepNumber = this.querySelector('.step-number');
                const stepContent = this.querySelector('.step-content');
                const connector = this.querySelector('.timeline-connector');
                
                if (stepNumber) {
                    stepNumber.style.transform = 'scale(1.2) rotate(15deg)';
                    stepNumber.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.6)';
                }
                
                if (stepContent) {
                    stepContent.style.transform = 'translateY(-8px)';
                    stepContent.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
                }
                
                if (connector) {
                    connector.style.opacity = '1';
                    connector.style.height = '80px';
                }
            });
            
            step.addEventListener('mouseleave', function() {
                const stepNumber = this.querySelector('.step-number');
                const stepContent = this.querySelector('.step-content');
                const connector = this.querySelector('.timeline-connector');
                
                if (stepNumber) {
                    stepNumber.style.transform = '';
                    stepNumber.style.boxShadow = '';
                }
                
                if (stepContent) {
                    stepContent.style.transform = '';
                    stepContent.style.boxShadow = '';
                }
                
                if (connector) {
                    connector.style.opacity = '0.5';
                    connector.style.height = '60px';
                }
            });
            
            // Add click animation
            step.addEventListener('click', function() {
                const stepNumber = this.querySelector('.step-number');
                if (stepNumber) {
                    stepNumber.style.animation = 'bounce 0.5s ease';
                    setTimeout(() => {
                        stepNumber.style.animation = '';
                    }, 500);
                }
            });
        });
        
        console.log('✨ Enhanced timeline initialized');
    }
    
    // ================= ENHANCED TESTIMONIALS =================
    function initEnhancedTestimonials() {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        
        testimonialSlides.forEach(slide => {
            // Add avatar animation
            const avatar = slide.querySelector('.client-avatar');
            if (avatar) {
                avatar.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Add subtle border animation
                setInterval(() => {
                    if (slide.classList.contains('active')) {
                        avatar.style.borderColor = 'var(--gold)';
                        setTimeout(() => {
                            avatar.style.borderColor = '';
                        }, 1000);
                    }
                }, 3000);
            }
            
            // Add quote mark animation
            const content = slide.querySelector('.testimonial-content');
            if (content) {
                const quoteMark = document.createElement('div');
                quoteMark.innerHTML = '<i class="fas fa-quote-right"></i>';
                quoteMark.style.cssText = `
                    position: absolute;
                    top: -20px;
                    right: 20px;
                    font-size: 3rem;
                    color: rgba(212, 175, 55, 0.1);
                    z-index: 0;
                `;
                content.style.position = 'relative';
                content.appendChild(quoteMark);
            }
            
            // Add hover effect
            slide.addEventListener('mouseenter', function() {
                if (this.classList.contains('active')) {
                    this.style.transform = 'translateY(-5px) scale(1.02)';
                    this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.25)';
                    
                    const avatar = this.querySelector('.client-avatar');
                    if (avatar) {
                        avatar.style.transform = 'scale(1.1) rotate(5deg)';
                    }
                }
            });
            
            slide.addEventListener('mouseleave', function() {
                if (this.classList.contains('active')) {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                    
                    const avatar = this.querySelector('.client-avatar');
                    if (avatar) {
                        avatar.style.transform = '';
                    }
                }
            });
        });
        
        console.log('✨ Enhanced testimonials initialized');
    }
    
    // ================= ENHANCED CTA SECTION =================
    function initEnhancedCTA() {
        const ctaSection = document.querySelector('.cta-section');
        if (!ctaSection) return;
        
        // Add floating animation to features
        const features = ctaSection.querySelectorAll('.cta-feature');
        features.forEach((feature, index) => {
            feature.style.animationDelay = `${index * 0.2}s`;
            feature.style.animation = 'float 4s ease-in-out infinite';
            
            // Add hover effect
            feature.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.05)';
                this.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.2)';
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.3)';
                    icon.style.color = 'var(--gold-light)';
                }
            });
            
            feature.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                    icon.style.color = '';
                }
            });
        });
        
        // Add ripple effect to CTA buttons
        const ctaButtons = ctaSection.querySelectorAll('.cta-btn');
        ctaButtons.forEach(btn => {
            // Add shine effect on hover
            btn.addEventListener('mouseenter', function() {
                const shine = document.createElement('div');
                shine.className = 'btn-shine';
                shine.style.cssText = `
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        to right,
                        transparent 0%,
                        rgba(255, 255, 255, 0.3) 50%,
                        transparent 100%
                    );
                    transform: rotate(30deg);
                    transition: left 0.6s;
                `;
                this.appendChild(shine);
                
                setTimeout(() => {
                    shine.style.left = '150%';
                }, 10);
                
                setTimeout(() => {
                    if (shine.parentNode) {
                        shine.remove();
                    }
                }, 600);
            });
        });
        
        // Add pulse animation to CTA section
        setInterval(() => {
            ctaSection.style.boxShadow = 'inset 0 0 100px rgba(212, 175, 55, 0.1)';
            setTimeout(() => {
                ctaSection.style.boxShadow = '';
            }, 1000);
        }, 5000);
        
        console.log('✨ Enhanced CTA initialized');
    }
    
    // ================= BACKGROUND ANIMATIONS =================
    function initBackgroundAnimations() {
        // Add animated gradient to why-choose section
        const whyChooseSection = document.querySelector('.why-choose');
        if (whyChooseSection) {
            const gradient = document.createElement('div');
            gradient.className = 'animated-gradient';
            gradient.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    45deg,
                    rgba(212, 175, 55, 0.05) 0%,
                    rgba(212, 175, 55, 0.02) 25%,
                    rgba(212, 175, 55, 0.05) 50%,
                    rgba(212, 175, 55, 0.02) 75%,
                    rgba(212, 175, 55, 0.05) 100%
                );
                background-size: 400% 400%;
                animation: gradientShift 20s ease infinite;
                z-index: 0;
                pointer-events: none;
            `;
            whyChooseSection.style.position = 'relative';
            whyChooseSection.insertBefore(gradient, whyChooseSection.firstChild);
        }
        
        // Add CSS for gradient animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
            
            @keyframes gradientShift {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }
            
            .btn-shine {
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
        
        console.log('✨ Background animations initialized');
    }
    
    // ================= INTERACTIVE ELEMENTS =================
    function initInteractiveElements() {
        // Add click animation to all buttons
        const buttons = document.querySelectorAll('.btn, .cta-btn, .nav-cta');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Create click effect
                const clickEffect = document.createElement('div');
                clickEffect.style.cssText = `
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: clickRipple 0.6s linear;
                    pointer-events: none;
                    left: ${e.offsetX - 50}px;
                    top: ${e.offsetY - 50}px;
                `;
                this.appendChild(clickEffect);
                
                setTimeout(() => {
                    clickEffect.remove();
                }, 600);
            });
        });
        
        // Add CSS for click ripple
        const style = document.createElement('style');
        style.textContent = `
            @keyframes clickRipple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add hover sound effect (optional)
        const interactiveElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-slide');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                // Optional: Add subtle sound effect here
                // const hoverSound = new Audio('hover.mp3');
                // hoverSound.volume = 0.1;
                // hoverSound.play();
            });
        });
        
        console.log('✨ Interactive elements initialized');
    }
    
    // ================= INITIALIZE HOME PAGE =================
    function initHomePage() {
        console.log('🚀 Initializing home page enhancements...');
        
        // Initialize all home page features
        initSliderEffects();
        initEnhancedFeatures();
        initEnhancedTimeline();
        initEnhancedTestimonials();
        initEnhancedCTA();
        initBackgroundAnimations();
        initInteractiveElements();
        
        // Add special class to body for home page
        document.body.classList.add('home-page');
        
        // Add welcome message in console
        console.log('%c✨ Welcome to Tn-QA Delivery! ✨', 
            'color: #D4AF37; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
        console.log('%c🚀 Premium delivery services between Qatar and Tunisia', 
            'color: #ffffff; font-size: 14px;');
        
        console.log('🎉 Home page fully enhanced!');
    }
    
    // Start initialization
    initHomePage();
    
    // Listen for language changes to re-initialize effects
    window.addEventListener('languageChanged', function() {
        setTimeout(initHomePage, 100);
    });
    
    // Listen for theme changes to adjust effects
    window.addEventListener('themeChanged', function() {
        setTimeout(initHomePage, 100);
    });
});

