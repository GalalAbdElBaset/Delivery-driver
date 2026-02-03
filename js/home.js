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
    
    // ================= THEME MANAGEMENT =================
    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const floatThemeToggle = document.getElementById('floatThemeToggle');
        const themeText = document.querySelector('.theme-text');
        
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        
        // Main theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                toggleTheme();
            });
        }
        
        // Floating theme toggle
        if (floatThemeToggle) {
            floatThemeToggle.addEventListener('click', function() {
                toggleTheme();
                // Add bounce effect
                this.classList.add('bounce');
                setTimeout(() => this.classList.remove('bounce'), 600);
            });
        }
        
        function toggleTheme() {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        }
        
        function setTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark-theme');
                if (themeText) themeText.textContent = 'داكن';
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                if (themeText) themeText.textContent = 'فاتح';
                localStorage.setItem('theme', 'light');
            }
            
            // Update theme toggle icon
            updateThemeIcons();
        }
        
        function updateThemeIcons() {
            const isDark = document.body.classList.contains('dark-theme');
            const sunIcons = document.querySelectorAll('.fa-sun');
            const moonIcons = document.querySelectorAll('.fa-moon');
            
            sunIcons.forEach(icon => {
                icon.style.opacity = isDark ? '0.5' : '1';
                icon.style.transform = isDark ? 'scale(0.8)' : 'scale(1)';
            });
            
            moonIcons.forEach(icon => {
                icon.style.opacity = isDark ? '1' : '0.5';
                icon.style.transform = isDark ? 'scale(1)' : 'scale(0.8)';
            });
        }
        
        function updateThemeButtonText() {
            const currentLang = localStorage.getItem('language') || 'ar';
            const isDark = document.body.classList.contains('dark-theme');
            
            if (themeText) {
                if (currentLang === 'ar') {
                    themeText.textContent = isDark ? 'داكن' : 'فاتح';
                } else {
                    themeText.textContent = isDark ? 'Dark' : 'Light';
                }
            }
        }
        
        // Initialize theme icons
        updateThemeIcons();
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
        const slideDuration = 5000; // 5 seconds per slide
        
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }
        
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        }
        
        function goToSlide(n) {
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
            
            // Update dot text with country flag
            updateDotText();
        }
        
        function updateDotText() {
            dots.forEach((dot, index) => {
                let text = '';
                switch(index) {
                    case 0: text = 'قطر 🇶🇦'; break;
                    case 1: text = 'تونس 🇹🇳'; break;
                    case 2: text = 'دولي 🌍'; break;
                }
                dot.textContent = text;
            });
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
                
                // Hover effect for dots
                dot.addEventListener('mouseenter', function() {
                    const slideNum = this.getAttribute('data-slide');
                    const slide = document.querySelector(`.slide[data-slide="${slideNum}"]`);
                    if (slide) {
                        const flag = slide.querySelector('.country-flag, .country-flags');
                        if (flag) {
                            const flagText = flag.textContent || flag.innerHTML;
                            this.innerHTML = this.textContent.split(' ')[0] + ' ' + flagText;
                        }
                    }
                });
                
                dot.addEventListener('mouseleave', function() {
                    updateDotText();
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
    
    // ================= COUNTRY SERVICES =================
    function initCountryServices() {
        const countryCards = document.querySelectorAll('.country-service-card');
        const countryButtons = document.querySelectorAll('.country-btn');
        
        // Hover effects for country cards
        countryCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow)';
            });
            
            // Click effect
            card.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-5px) scale(0.98)';
            });
            
            card.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            // Service items animation
            const serviceItems = card.querySelectorAll('.service-item');
            serviceItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 100}ms`;
                
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(10px)';
                    const icon = this.querySelector('.service-icon');
                    if (icon) {
                        icon.style.transform = 'rotate(15deg) scale(1.1)';
                    }
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                    const icon = this.querySelector('.service-icon');
                    if (icon) {
                        icon.style.transform = 'rotate(0) scale(1)';
                    }
                });
            });
        });
        
        // Country buttons animation
        countryButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
            
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(0) scale(0.95)';
            });
            
            btn.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-3px) scale(1)';
            });
        });
        
        // Phone number formatting
        const phoneNumbers = document.querySelectorAll('[href^="tel:"]');
        phoneNumbers.forEach(phone => {
            phone.addEventListener('click', function(e) {
                const number = this.getAttribute('href').replace('tel:', '');
                const country = this.classList.contains('qatar-btn') ? 'قطر' : 
                               this.classList.contains('tunisia-btn') ? 'تـونس' : '';
                
                if (country) {
                    if (confirm(`هل تريد الاتصال برقم ${country}: ${number}؟`)) {
                        // Allow navigation
                    } else {
                        e.preventDefault();
                    }
                }
            });
        });
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
                
                // Add bounce effect
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
        const floatTheme = document.querySelector('.float-theme');
        
        // WhatsApp button scroll effect
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
            
            // Click animation for WhatsApp
            floatWhatsApp.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.9) translateY(0)';
            });
            
            floatWhatsApp.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
            
            floatWhatsApp.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
            
            // Badge animation
            const badge = floatWhatsApp.querySelector('.float-badge');
            if (badge) {
                setInterval(() => {
                    badge.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        badge.style.transform = 'scale(1)';
                    }, 300);
                }, 3000);
            }
        }
        
        // Theme button animation
        if (floatTheme) {
            floatTheme.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(15deg) scale(1.1)';
            });
            
            floatTheme.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0) scale(1)';
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
        window.addEventListener('load', checkScroll);
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
            if (n < 0 || n >= testimonialSlides.length) return;
            
            // Fade out current
            testimonialSlides[currentTestimonial].style.opacity = '0';
            testimonialSlides[currentTestimonial].style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                testimonialSlides.forEach(slide => slide.classList.remove('active'));
                testimonialDots.forEach(dot => dot.classList.remove('active'));
                
                currentTestimonial = n;
                testimonialSlides[currentTestimonial].classList.add('active');
                testimonialDots[currentTestimonial].classList.add('active');
                
                // Fade in new
                setTimeout(() => {
                    testimonialSlides[currentTestimonial].style.opacity = '1';
                    testimonialSlides[currentTestimonial].style.transform = 'translateY(0)';
                }, 50);
            }, 300);
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
                
                // Hover effect
                dot.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.2)';
                });
                
                dot.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('active')) {
                        this.style.transform = 'scale(1)';
                    }
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
            
            // Swipe support for testimonials
            let touchStartX = 0;
            testimonialContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            testimonialContainer.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                const diffX = touchStartX - touchEndX;
                
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        nextTestimonial();
                    } else {
                        const prevIndex = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
                        showTestimonial(prevIndex);
                    }
                }
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
        
        // Highlight active section
        function highlightActiveSection() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}` || (current === '' && href === '#home')) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', highlightActiveSection);
        highlightActiveSection(); // Initial call
    }
    
    // ================= COUNTER ANIMATIONS =================
    function initCounters() {
        const counters = document.querySelectorAll('.stat h3');
        
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
        
        document.querySelectorAll('.stat').forEach(stat => {
            observer.observe(stat);
        });
        
        function animateCounter(counter) {
            const originalText = counter.textContent;
            const isPercentage = originalText.includes('%');
            const isPlus = originalText.includes('+');
            const target = parseInt(originalText.replace(/[^0-9]/g, ''));
            
            if (isNaN(target)) return;
            
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayText = Math.floor(current).toString();
                if (isPercentage) displayText += '%';
                if (isPlus) displayText += '+';
                
                counter.textContent = displayText;
            }, 16);
        }
    }
    
    // ================= RIPPLE EFFECT =================
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.ripple');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Remove existing ripples
                const existingRipples = this.querySelectorAll('.ripple-effect');
                existingRipples.forEach(ripple => ripple.remove());
                
                // Create new ripple
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    if (ripple.parentNode === this) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
    }
    
    // ================= FORM VALIDATION =================
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (this.classList.contains('no-validate')) return;
                
                const requiredFields = this.querySelectorAll('[required]');
                let isValid = true;
                let firstErrorField = null;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        if (!firstErrorField) {
                            firstErrorField = field;
                        }
                        
                        // Remove error on input
                        field.addEventListener('input', function() {
                            this.classList.remove('error');
                        }, { once: true });
                    }
                });
                
                // Validate email fields
                const emailFields = this.querySelectorAll('input[type="email"]');
                emailFields.forEach(field => {
                    if (field.value.trim() && !isValidEmail(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                        field.setAttribute('title', 'البريد الإلكتروني غير صالح');
                        
                        if (!firstErrorField) {
                            firstErrorField = field;
                        }
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    
                    // Shake effect
                    this.classList.add('shake');
                    setTimeout(() => {
                        this.classList.remove('shake');
                    }, 500);
                    
                    // Scroll to first error
                    if (firstErrorField) {
                        firstErrorField.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        firstErrorField.focus();
                    }
                }
            });
        });
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }
    
    // ================= SMOOTH SCROLL =================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate offset (considering fixed header)
                    const headerHeight = document.querySelector('#mainHeader')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    if (this.classList.contains('nav-link')) {
                        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });
    }
    
    // ================= LAZY LOADING =================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        
                        // Handle loading error
                        img.onerror = function() {
                            this.style.display = 'none';
                            const fallback = this.parentElement.querySelector('.img-fallback');
                            if (fallback) fallback.style.display = 'block';
                        };
                        
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
            });
        }
    }
    
    // ================= SERVICE FEATURES ANIMATION =================
    function initServiceFeatures() {
        const featureItems = document.querySelectorAll('.feature-item');
        
        featureItems.forEach((item, index) => {
            // Staggered animation
            item.style.animationDelay = `${index * 200}ms`;
            
            // Hover animation
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(15deg) scale(1.2)';
                    icon.style.color = 'var(--gold-light)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0) scale(1)';
                    icon.style.color = 'var(--gold)';
                }
            });
        });
    }
    
    // ================= TIMELINE ANIMATIONS =================
    function initTimelineAnimations() {
        const timelineSteps = document.querySelectorAll('.timeline-step');
        
        timelineSteps.forEach((step, index) => {
            step.style.animationDelay = `${index * 300}ms`;
            
            const stepNumber = step.querySelector('.step-number');
            if (stepNumber) {
                step.addEventListener('mouseenter', function() {
                    stepNumber.classList.add('bounce');
                    setTimeout(() => {
                        stepNumber.classList.remove('bounce');
                    }, 500);
                });
            }
            
            // Click to expand step content
            step.addEventListener('click', function() {
                const content = this.querySelector('.step-content');
                if (content) {
                    content.classList.toggle('expanded');
                }
            });
        });
    }
    
    // ================= CTA ANIMATIONS =================
    function initCTAAnimations() {
        const ctaButtons = document.querySelectorAll('.cta-btn');
        
        ctaButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                }
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
        
        // CTA features animation
        const ctaFeatures = document.querySelectorAll('.cta-feature');
        ctaFeatures.forEach((feature, index) => {
            feature.style.animationDelay = `${index * 200}ms`;
            
            feature.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateY(-5px) scale(1.1)';
                }
            });
            
            feature.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }
    
    // ================= FOOTER ANIMATIONS =================
    function initFooterAnimations() {
        const socialIcons = document.querySelectorAll('.social-icon');
        
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Click effect
            icon.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(0) scale(0.9)';
            });
            
            icon.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            });
        });
        
        // Footer links animation
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.paddingRight = '10px';
                this.style.color = 'var(--gold)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.paddingRight = '0';
                this.style.color = '';
            });
        });
    }
    
    // ================= INITIALIZE EVERYTHING =================
    function initAll() {
        console.log('Initializing Tn-QA Delivery website...');
        
        // Initialize core functionality
        initLanguage();
        initTheme();
        initMobileMenu();
        initHeroSlider();
        initCountryServices();
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
        
        // Initialize additional animations
        initServiceFeatures();
        initTimelineAnimations();
        initCTAAnimations();
        initFooterAnimations();
        
        // Set current year in footer
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
        
        // Add performance monitoring
        if ('performance' in window) {
            const perfEntries = performance.getEntriesByType('navigation');
            if (perfEntries.length > 0) {
                const navTiming = perfEntries[0];
                console.log(`Page loaded in: ${navTiming.loadEventEnd - navTiming.startTime}ms`);
            }
        }
        
        // Add custom styles for animations
        addCustomStyles();
        
        console.log('Website initialization complete!');
    }
    
    // ================= ADD CUSTOM STYLES =================
    function addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ripple Effect */
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
            
            /* Error States */
            .error {
                border-color: var(--error) !important;
                animation: shake 0.5s ease;
                box-shadow: 0 0 10px rgba(255, 0, 0, 0.2) !important;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .shake {
                animation: shake 0.5s ease;
            }
            
            /* Menu States */
            .menu-open {
                background: rgba(255, 255, 255, 0.98) !important;
                backdrop-filter: blur(10px);
            }
            
            .dark-theme .menu-open {
                background: rgba(26, 26, 26, 0.98) !important;
            }
            
            /* Image Effects */
            .img-zoom {
                transition: transform 0.5s ease;
            }
            
            .img-zoom:hover {
                transform: scale(1.05);
            }
            
            /* Animation Effects */
            .bounce {
                animation: bounce 0.5s ease;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                40% {transform: translateY(-10px);}
                60% {transform: translateY(-5px);}
            }
            
            /* Progress Bar */
            .progress-bar {
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
                animation: progress 5s linear infinite;
                position: absolute;
                bottom: 0;
                left: 0;
                transform-origin: left;
            }
            
            @keyframes progress {
                0% { transform: scaleX(0); }
                100% { transform: scaleX(1); }
            }
            
            /* Country Flags Animation */
            .country-flag-large {
                animation: flagWave 3s ease-in-out infinite alternate;
            }
            
            @keyframes flagWave {
                0% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(-10px) rotate(5deg); }
            }
            
            /* Loading Animation */
            .loaded {
                animation: fadeInUp 0.5s ease;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Scrollbar Styling */
            ::-webkit-scrollbar {
                width: 10px;
            }
            
            ::-webkit-scrollbar-track {
                background: var(--light-bg);
            }
            
            .dark-theme ::-webkit-scrollbar-track {
                background: var(--dark-bg);
            }
            
            ::-webkit-scrollbar-thumb {
                background: var(--gold);
                border-radius: 5px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: var(--gold-dark);
            }
            
            /* Selection Color */
            ::selection {
                background: rgba(212, 175, 55, 0.3);
                color: var(--primary);
            }
            
            .dark-theme ::selection {
                background: rgba(212, 175, 55, 0.5);
                color: var(--white);
            }
        `;
        document.head.appendChild(style);
    }
    
    // ================= ERROR HANDLING =================
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        
        // Try to recover from errors
        try {
            // Re-initialize critical components
            initScrollToTop();
            initMobileMenu();
        } catch (err) {
            console.error('Recovery failed:', err);
        }
    });
    
    // ================= PERFORMANCE OPTIMIZATION =================
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate animations on resize
            initScrollAnimations();
        }, 250);
    });
    
    // ================= INITIALIZE ON LOAD =================
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
    
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
        
        // Final check for animations
        setTimeout(initScrollAnimations, 100);
    });
});