// main.js - All-in-one JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // ================= LANGUAGE MANAGEMENT =================
    function initLanguage() {
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');
        const currentLang = document.getElementById('currentLang');
        const langOptions = document.querySelectorAll('.lang-option-nav');
        const elementsToTranslate = document.querySelectorAll('[data-i18n]');
        
        // Load saved language or default to Arabic
        const savedLang = localStorage.getItem('language') || 'ar';
        setLanguage(savedLang);
        
        // Toggle dropdown
        if (langBtn && langDropdown) {
            langBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                langDropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                langDropdown.classList.remove('active');
            });
            
            // Language selection
            langOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    const lang = this.getAttribute('data-lang');
                    setLanguage(lang);
                    langDropdown.classList.remove('active');
                });
            });
        }
        
        function setLanguage(lang) {
            // Update UI
            if (currentLang) {
                currentLang.textContent = lang === 'ar' ? 'العربية' : 'English';
            }
            
            // Update active class
            langOptions.forEach(option => {
                option.classList.remove('active');
                if (option.getAttribute('data-lang') === lang) {
                    option.classList.add('active');
                }
            });
            
            // Load translation data
            fetch(`translations/${lang}.json`)
                .then(response => response.json())
                .then(translations => {
                    // Apply translations
                    elementsToTranslate.forEach(element => {
                        const key = element.getAttribute('data-i18n');
                        const text = getNestedTranslation(translations, key);
                        
                        if (text) {
                            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                                element.placeholder = text;
                            } else if (element.hasAttribute('title')) {
                                element.setAttribute('title', text);
                            } else if (element.hasAttribute('alt')) {
                                element.setAttribute('alt', text);
                            } else {
                                element.textContent = text;
                            }
                        }
                    });
                    
                    // Update direction
                    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                    
                    // Update theme button text
                    updateThemeButtonText();
                    
                    // Save language preference
                    localStorage.setItem('language', lang);
                    
                    // Trigger custom event
                    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
                })
                .catch(error => {
                    console.error('Error loading translations:', error);
                });
        }
        
        function getNestedTranslation(obj, key) {
            return key.split('.').reduce((o, k) => (o || {})[k], obj);
        }
    }
    
    
    // ================= MOBILE MENU =================
    function initMobileMenu() {
        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('navLinks');
        const header = document.getElementById('mainHeader');
        
        if (burger && navLinks) {
            burger.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                burger.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
                
                if (header) {
                    if (navLinks.classList.contains('active')) {
                        header.classList.add('menu-open');
                    } else {
                        header.classList.remove('menu-open');
                    }
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInside = navLinks.contains(event.target) || burger.contains(event.target);
                
                if (!isClickInside && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    if (header) {
                        header.classList.remove('menu-open');
                    }
                }
            });
            
            // Close menu when clicking on a link
            const mobileLinks = navLinks.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    burger.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    if (header) {
                        header.classList.remove('menu-open');
                    }
                });
            });
        }
    }
    
    // ================= HERO SLIDER =================
    function initHeroSlider() {
        const heroSlider = document.querySelector('.hero-slider');
        if (!heroSlider) return;
        
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        const progressBar = document.querySelector('.progress-bar');
        
        // Check if there are any slides
        if (slides.length === 0) {
            console.warn('No slides found in hero slider');
            return;
        }
        
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 2000;
        
        function nextSlide() {
            // Calculate next slide index
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }
        
        function prevSlide() {
            // Calculate previous slide index
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        }
        
        function goToSlide(n) {
            // Validate the slide index
            if (n < 0 || n >= slides.length || isNaN(n)) {
                console.error('Invalid slide index:', n);
                return;
            }
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
            }
            
            // Add active class to current slide and dot
            currentSlide = n;
            slides[currentSlide].classList.add('active');
            if (dots.length > 0 && dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
            
            resetProgressBar();
        }
        
        function resetProgressBar() {
            if (progressBar) {
                progressBar.style.animation = 'none';
                void progressBar.offsetWidth; // Force reflow
                progressBar.style.animation = `progress ${slideDuration}ms linear`;
            }
        }
        
        function startAutoplay() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, slideDuration);
            resetProgressBar();
        }
        
        function stopAutoplay() {
            clearInterval(slideInterval);
            if (progressBar) {
                progressBar.style.animationPlayState = 'paused';
            }
        }
        
        // Event listeners
        heroSlider.addEventListener('mouseenter', stopAutoplay);
        
        heroSlider.addEventListener('mouseleave', () => {
            startAutoplay();
            if (progressBar) progressBar.style.animationPlayState = 'running';
        });
        
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    startAutoplay();
                });
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoplay();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Touch support
        let touchStartX = 0;
        let touchStartY = 0;
        heroSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            stopAutoplay();
        });
        
        heroSlider.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling while swiping
        });
        
        heroSlider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Only trigger slide change if horizontal swipe is dominant
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            startAutoplay();
        });
        
        // Initialize first slide
        goToSlide(0);
        startAutoplay();
    }
    
    // ================= SCROLL TO TOP =================
    function initScrollToTop() {
        const scrollButton = document.getElementById('scrollToTop');
        
        if (scrollButton) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollButton.classList.add('visible');
                } else {
                    scrollButton.classList.remove('visible');
                }
            });
            
            scrollButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    }
    
    // ================= FLOATING BUTTONS =================
    function initFloatingButtons() {
        const floatWhatsApp = document.querySelector('.float-whatsapp');
        
        if (floatWhatsApp) {
            let lastScrollTop = 0;
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    floatWhatsApp.style.opacity = '0';
                    floatWhatsApp.style.transform = 'translateY(20px)';
                } else {
                    floatWhatsApp.style.opacity = '1';
                    floatWhatsApp.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            });
            
            // Click animation
            floatWhatsApp.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.9) translateY(0)';
            });
            
            floatWhatsApp.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
            
            floatWhatsApp.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
        }
    }
    
    // ================= SCROLL ANIMATIONS =================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        function checkScroll() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('aos-animate');
                } else {
                    element.classList.remove('aos-animate');
                }
            });
        }
        
        // Add initial classes
        animatedElements.forEach(element => {
            element.classList.add('aos-init');
        });
        
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll();
    }
    
    // ================= TESTIMONIALS SLIDER =================
    function initTestimonialsSlider() {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        
        if (testimonialSlides.length === 0) return;
        
        let currentTestimonial = 0;
        let testimonialInterval;
        
        function showTestimonial(n) {
            // Validate index
            if (n < 0 || n >= testimonialSlides.length) return;
            
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            currentTestimonial = n;
            testimonialSlides[currentTestimonial].classList.add('active');
            testimonialDots[currentTestimonial].classList.add('active');
        }
        
        function nextTestimonial() {
            const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(nextIndex);
        }
        
        function startTestimonialAutoplay() {
            clearInterval(testimonialInterval);
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }
        
        if (testimonialDots.length > 0) {
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                    startTestimonialAutoplay();
                });
            });
        }
        
        const testimonialContainer = document.querySelector('.testimonials-slider');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            testimonialContainer.addEventListener('mouseleave', () => {
                startTestimonialAutoplay();
            });
        }
        
        // Initialize first testimonial
        showTestimonial(0);
        startTestimonialAutoplay();
    }
    
    // ================= ACTIVE NAV LINK SCROLL =================
    function initActiveNavScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ================= COUNTER ANIMATIONS =================
    function initCounters() {
        const counters = document.querySelectorAll('.about-stats .stat h3');
        
        if (counters.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target.querySelector('h3');
                    if (counter && !counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.about-stats .stat').forEach(stat => {
            observer.observe(stat);
        });
        
        function animateCounter(counter) {
            const target = parseInt(counter.textContent.replace('+', ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = target >= 100 ? 
                    `${Math.floor(current)}+` : 
                    Math.floor(current);
            }, 16);
        }
    }
    
    // ================= RIPPLE EFFECT =================
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.ripple');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // ================= FORM VALIDATION =================
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const requiredFields = this.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        field.addEventListener('input', function() {
                            this.classList.remove('error');
                        });
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    this.classList.add('shake');
                    setTimeout(() => {
                        this.classList.remove('shake');
                    }, 500);
                }
            });
        });
    }
    
    // ================= SMOOTH SCROLL =================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
    
    // ================= LAZY LOADING =================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    }
    
    // ================= INITIALIZE EVERYTHING =================
    function initAll() {
        initLanguage();
        initTheme();
        initMobileMenu();
        initHeroSlider();
        initScrollToTop();
        initFloatingButtons();
        initScrollAnimations();
        initTestimonialsSlider();
        initActiveNavScroll();
        initCounters();
        initRippleEffect();
        initFormValidation();
        initSmoothScroll();
        initLazyLoading();
        
        // Add current year to footer
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
        
        // Add custom styles
        addCustomStyles();
    }
    
    function addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: relative;
                overflow: hidden;
            }
            
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .error {
                border-color: var(--error) !important;
                animation: shake 0.5s ease;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .shake {
                animation: shake 0.5s ease;
            }
            
            .menu-open {
                background: rgba(255, 255, 255, 0.98) !important;
            }
            
            .dark-theme .menu-open {
                background: rgba(26, 26, 26, 0.98) !important;
            }
            
            .img-zoom {
                transition: transform 0.5s ease;
            }
            
            .img-zoom:hover {
                transform: scale(1.05);
            }
            
            .step-number.bounce {
                animation: bounce 0.5s ease;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                40% {transform: translateY(-10px);}
                60% {transform: translateY(-5px);}
            }
            
            .progress-bar {
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                animation: progress 2000ms linear infinite;
                position: absolute;
                bottom: 0;
                left: 0;
            }
            
            @keyframes progress {
                0% { width: 0%; }
                100% { width: 100%; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize everything
    initAll();
    
    // Handle page transition
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        setTimeout(function() {
            pageTransition.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 800);
    }
    
    window.addEventListener('load', function() {
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
            setTimeout(function() {
                pageTransition.style.display = 'none';
            }, 1000);
        }
    });
});