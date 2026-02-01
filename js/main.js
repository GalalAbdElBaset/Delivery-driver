// =============================
// Tn-QA Delivery - Main Script (Optimized)
// =============================

document.addEventListener("DOMContentLoaded", () => {
    
    /* ================= SET CURRENT YEAR IN FOOTER ================= */
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    /* ================= HERO SLIDER IMPLEMENTATION ================= */
    class HeroSlider {
        constructor() {
            this.slides = document.querySelectorAll('.slide');
            this.dots = document.querySelectorAll('.dot');
            this.prevBtn = document.querySelector('.slider-prev');
            this.nextBtn = document.querySelector('.slider-next');
            this.progressBar = document.querySelector('.progress-bar');
            this.slider = document.querySelector('.hero-slider');
            
            this.currentSlide = 0;
            this.slideInterval = null;
            this.slideDuration = 5000;
            this.isAnimating = false;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.previousSlide = 0;
            
            this.init();
        }
        
        init() {
            if (this.slides.length === 0) return;
            
            this.setupEventListeners();
            this.startSlideShow();
            this.preloadSlides();
        }
        
        setupEventListeners() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.showPrevSlide());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.showNextSlide());
            }
            
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
            
            if (this.slider) {
                this.slider.addEventListener('mouseenter', () => this.pauseSlideShow());
                this.slider.addEventListener('mouseleave', () => this.startSlideShow());
            }
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.showPrevSlide();
                if (e.key === 'ArrowRight') this.showNextSlide();
                if (e.key === 'Escape') this.pauseSlideShow();
            });
            
            this.setupTouchEvents();
            
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.pauseSlideShow();
                } else {
                    this.startSlideShow();
                }
            });
        }
        
        setupTouchEvents() {
            if (!this.slider) return;
            
            this.slider.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
                this.pauseSlideShow();
            });
            
            this.slider.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
                this.startSlideShow();
            });
        }
        
        handleSwipe() {
            const swipeThreshold = 50;
            const diff = this.touchStartX - this.touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.showNextSlide();
                } else {
                    this.showPrevSlide();
                }
            }
        }
        
        goToSlide(n) {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            this.resetProgressBar();
            
            const currentSlideEl = this.slides[this.currentSlide];
            const currentDot = this.dots[this.currentSlide];
            
            if (currentSlideEl) {
                currentSlideEl.classList.remove('active');
                currentSlideEl.style.opacity = '0';
            }
            
            if (currentDot) {
                currentDot.classList.remove('active');
            }
            
            this.previousSlide = this.currentSlide;
            this.currentSlide = (n + this.slides.length) % this.slides.length;
            
            this.animateSlideTransition(() => {
                const newSlide = this.slides[this.currentSlide];
                const newDot = this.dots[this.currentSlide];
                
                if (newSlide) {
                    newSlide.classList.add('active');
                }
                
                if (newDot) {
                    newDot.classList.add('active');
                }
                
                this.startProgressBar();
                this.isAnimating = false;
            });
        }
        
        animateSlideTransition(callback) {
            const newSlide = this.slides[this.currentSlide];
            const oldSlide = this.slides[this.previousSlide];
            
            if (!newSlide) {
                if (callback) callback();
                return;
            }
            
            newSlide.style.transition = 'none';
            newSlide.style.opacity = '0';
            
            if (oldSlide) {
                oldSlide.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                oldSlide.style.opacity = '0';
            }
            
            setTimeout(() => {
                newSlide.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                newSlide.style.opacity = '1';
                
                setTimeout(() => {
                    if (oldSlide) {
                        oldSlide.style.transition = '';
                        oldSlide.style.opacity = '';
                    }
                    newSlide.style.transition = '';
                    if (callback) callback();
                }, 800);
            }, 50);
        }
        
        showNextSlide() {
            this.goToSlide(this.currentSlide + 1);
        }
        
        showPrevSlide() {
            this.goToSlide(this.currentSlide - 1);
        }
        
        startSlideShow() {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
            }
            
            this.slideInterval = setInterval(() => {
                this.showNextSlide();
            }, this.slideDuration);
            
            this.startProgressBar();
        }
        
        pauseSlideShow() {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
                this.slideInterval = null;
            }
            
            this.pauseProgressBar();
        }
        
        startProgressBar() {
            if (!this.progressBar) return;
            
            this.progressBar.style.width = '0%';
            this.progressBar.style.transition = `width ${this.slideDuration}ms linear`;
            
            void this.progressBar.offsetWidth;
            
            setTimeout(() => {
                this.progressBar.style.width = '100%';
            }, 10);
        }
        
        pauseProgressBar() {
            if (!this.progressBar) return;
            
            const computedStyle = window.getComputedStyle(this.progressBar);
            const width = computedStyle.getPropertyValue('width');
            this.progressBar.style.width = width;
            this.progressBar.style.transition = 'none';
        }
        
        resetProgressBar() {
            if (!this.progressBar) return;
            
            this.progressBar.style.width = '0%';
            this.progressBar.style.transition = 'none';
        }
        
        preloadSlides() {
            this.slides.forEach(slide => {
                const bgImage = slide.querySelector('.slide-bg');
                if (bgImage) {
                    const bgStyle = bgImage.style.backgroundImage;
                    if (bgStyle && bgStyle.includes('url')) {
                        const img = new Image();
                        img.src = bgStyle.replace('url("', '').replace('")', '');
                    }
                }
            });
        }
    }
    
    // Initialize slider
    const heroSlider = new HeroSlider();
    
    /* ================= FIXED SMOOTH NAVIGATION ================= */
    class SmoothNavigation {
        constructor() {
            this.header = document.getElementById("mainHeader");
            this.navLinks = document.querySelectorAll(".nav-link");
            this.indicator = document.getElementById("indicator");
            this.burger = document.getElementById("burger");
            this.navMenu = document.querySelector(".nav-links");
            this.scrollToTopBtn = document.getElementById("scrollToTop");
            
            this.navbarHeight = this.header?.offsetHeight || 80;
            this.lastScrollTop = 0;
            this.isMobileMenuOpen = false;
            
            this.init();
        }
        
        init() {
            this.setupScrollEffects();
            this.setupNavigation();
            this.setupMobileMenu();
            this.setupScrollToTopButton();
            this.setupSmoothScrolling();
        }
        
        setupScrollEffects() {
            let scrollTimeout;
            
            window.addEventListener('scroll', () => {
                if (!scrollTimeout) {
                    scrollTimeout = setTimeout(() => {
                        this.handleNavbarScroll();
                        this.updateScrollToTopButton();
                        this.updateActiveNavOnScroll();
                        scrollTimeout = null;
                    }, 80);
                }
            }, { passive: true });
        }
        
        handleNavbarScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (!this.header) return;
            
            if (scrollTop > this.navbarHeight) {
                if (scrollTop > this.lastScrollTop && scrollTop > 200) {
                    this.header.classList.add('hidden');
                } else {
                    this.header.classList.remove('hidden');
                    this.header.classList.add('scrolled');
                }
            } else {
                this.header.classList.remove('hidden');
                this.header.classList.remove('scrolled');
            }
            
            this.lastScrollTop = scrollTop;
        }
        
        setupNavigation() {
            const activeLink = document.querySelector(".nav-link.active");
            if (activeLink && this.indicator) {
                this.moveIndicator(activeLink);
            }
            
            this.navLinks.forEach(link => {
                link.addEventListener("click", (e) => this.handleNavClick(e, link));
            });
        }
        
        handleNavClick(e, link) {
            const href = link.getAttribute("href");
            
            // إذا كان الرابط ليس رابطًا داخليًا (ليس بـ #) فلا نمنع السلوك الافتراضي
            if (!href || !href.startsWith('#')) {
                // السماح للرابط بالعمل بشكل طبيعي
                return;
            }
            
            // فقط للروابط الداخلية نمنع السلوك الافتراضي
            e.preventDefault();
            
            this.navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            
            this.moveIndicator(link);
            
            if (this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
            
            this.scrollToSection(href);
        }
        
        moveIndicator(element) {
            if (!this.indicator || !element) return;
            
            const rect = element.getBoundingClientRect();
            const parent = element.parentElement.getBoundingClientRect();
            
            const left = rect.left - parent.left;
            const width = rect.width;
            
            this.indicator.style.left = left + "px";
            this.indicator.style.width = width + "px";
            this.indicator.style.opacity = "1";
        }
        
        scrollToSection(targetID) {
            const target = document.querySelector(targetID);
            if (!target) return;
            
            const headerOffset = this.navbarHeight + 10;
            const targetPosition = target.offsetTop - headerOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        updateActiveNavOnScroll() {
            const scrollPos = window.scrollY + this.navbarHeight + 100;
            
            this.navLinks.forEach(link => {
                const href = link.getAttribute("href");
                if (!href || !href.startsWith('#')) return;
                
                const section = document.querySelector(href);
                if (!section) return;
                
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    this.navLinks.forEach(l => l.classList.remove("active"));
                    link.classList.add("active");
                    this.moveIndicator(link);
                }
            });
        }
        
        setupMobileMenu() {
            if (!this.burger || !this.navMenu) return;
            
            this.burger.addEventListener("click", (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
            
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isMobileMenuOpen) {
                        this.closeMobileMenu();
                    }
                });
            });
            
            document.addEventListener("click", (e) => {
                if (this.isMobileMenuOpen && 
                    !this.navMenu.contains(e.target) && 
                    !this.burger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
            
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
            
            window.addEventListener("resize", () => {
                if (window.innerWidth > 1024 && this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }
        
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            
            if (this.isMobileMenuOpen) {
                this.openMobileMenu();
            } else {
                this.closeMobileMenu();
            }
        }
        
        openMobileMenu() {
            this.burger.classList.add("active");
            this.navMenu.classList.add("active");
            document.body.style.overflow = "hidden";
            this.isMobileMenuOpen = true;
        }
        
        closeMobileMenu() {
            this.burger.classList.remove("active");
            this.navMenu.classList.remove("active");
            document.body.style.overflow = "auto";
            this.isMobileMenuOpen = false;
        }
        
        setupScrollToTopButton() {
            if (!this.scrollToTopBtn) return;
            
            this.scrollToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToTop();
            });
        }
        
        updateScrollToTopButton() {
            if (!this.scrollToTopBtn) return;
            
            if (window.pageYOffset > 300) {
                this.scrollToTopBtn.classList.add('visible');
            } else {
                this.scrollToTopBtn.classList.remove('visible');
            }
        }
        
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        setupSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    
                    if (href === '#') return;
                    
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        this.scrollToSection(href);
                    }
                });
            });
        }
    }
    
    // Initialize smooth navigation
    const smoothNavigation = new SmoothNavigation();
    
    /* ================= ENHANCED CONTACT FORM ================= */
    class ContactForm {
        constructor() {
            this.form = document.getElementById("messageForm");
            if (!this.form) return;
            
            this.phoneInput = this.form.querySelector('input[type="tel"]');
            this.submitBtn = this.form.querySelector('.submit-btn');
            this.formMessage = document.getElementById('formMessage');
            
            this.init();
        }
        
        init() {
            if (!this.form) return;
            
            this.setupFormInputs();
            this.setupFormValidation();
            this.setupPhoneFormatting();
            this.setupFormSubmission();
        }
        
        setupFormInputs() {
            const inputs = this.form.querySelectorAll('input, textarea, select');
            inputs.forEach((input, index) => {
                if (!input.name) {
                    const type = input.type || input.tagName.toLowerCase();
                    input.name = `${type}_${index}`;
                }
            });
        }
        
        setupFormValidation() {
            const inputs = this.form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }
        
        validateField(field) {
            const value = field.value.trim();
            
            if (field.hasAttribute('required') && !value) {
                this.showError(field, 'هذا الحقل مطلوب');
                return false;
            }
            
            if (field.type === 'tel' && value) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    this.showError(field, 'يرجى إدخال رقم هاتف صحيح');
                    return false;
                }
            }
            
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showError(field, 'يرجى إدخال بريد إلكتروني صحيح');
                    return false;
                }
            }
            
            return true;
        }
        
        showError(field, message) {
            this.clearError(field);
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.cssText = 'color: #ff6b6b; font-size: 0.9rem; margin-top: 5px;';
            
            field.parentNode.appendChild(errorDiv);
            field.classList.add('error');
        }
        
        clearError(field) {
            const errorDiv = field.parentNode.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.remove();
            }
            field.classList.remove('error');
        }
        
        setupPhoneFormatting() {
            if (!this.phoneInput) return;
            
            this.phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    let formatted = '';
                    
                    if (value.startsWith('974')) {
                        if (value.length <= 3) {
                            formatted = value;
                        } else if (value.length <= 6) {
                            formatted = `${value.substring(0, 3)} ${value.substring(3)}`;
                        } else if (value.length <= 8) {
                            formatted = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
                        } else {
                            formatted = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 8)} ${value.substring(8)}`;
                        }
                    } else if (value.startsWith('216')) {
                        if (value.length <= 3) {
                            formatted = value;
                        } else if (value.length <= 6) {
                            formatted = `${value.substring(0, 3)} ${value.substring(3)}`;
                        } else if (value.length <= 8) {
                            formatted = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
                        } else {
                            formatted = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 8)} ${value.substring(8)}`;
                        }
                    } else {
                        if (value.length <= 4) {
                            formatted = value;
                        } else if (value.length <= 8) {
                            formatted = `${value.substring(0, 4)} ${value.substring(4)}`;
                        } else {
                            formatted = `${value.substring(0, 4)} ${value.substring(4, 8)} ${value.substring(8)}`;
                        }
                    }
                    
                    e.target.value = formatted;
                }
            });
        }
        
        setupFormSubmission() {
            this.form.addEventListener("submit", (e) => this.handleSubmit(e));
        }
        
        async handleSubmit(e) {
            e.preventDefault();
            
            const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) return;
            
            const formData = new FormData(this.form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value.trim();
            });
            
            const name = formObject.name || '';
            const phone = formObject.phone || formObject.tel_1 || '';
            const email = formObject.email || '';
            const service = formObject.service || '';
            const message = formObject.message || formObject.textarea_4 || '';
            
            const currentLang = localStorage.getItem('language') || 'ar';
            
            const whatsappMessage = this.createWhatsAppMessage(name, phone, email, service, message, currentLang);
            
            this.showLoading();
            
            setTimeout(() => {
                const whatsappNumber = "97431691024";
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
                
                window.open(whatsappUrl, '_blank');
                
                this.showSuccess();
                
                setTimeout(() => {
                    this.resetForm();
                }, 3000);
            }, 1000);
        }
        
        createWhatsAppMessage(name, phone, email, service, message, lang) {
            if (lang === 'en') {
                return `🚗 New Service Request from Tn-QA Delivery%0A%0A`
                    + `👤 *Name:* ${name}%0A`
                    + `📞 *Phone:* ${phone}%0A`
                    + (email ? `📧 *Email:* ${email}%0A` : '')
                    + (service ? `🛠️ *Service:* ${service}%0A` : '')
                    + `%0A📝 *Message:*%0A${message}%0A%0A`
                    + `📍 *Source:* Tn-QA Delivery Website`;
            } else {
                return `🚗 طلب خدمة جديدة من Tn-QA Delivery%0A%0A`
                    + `👤 *الاسم:* ${name}%0A`
                    + `📞 *رقم الهاتف:* ${phone}%0A`
                    + (email ? `📧 *البريد الإلكتروني:* ${email}%0A` : '')
                    + (service ? `🛠️ *الخدمة المطلوبة:* ${service}%0A` : '')
                    + `%0A📝 *الرسالة:*%0A${message}%0A%0A`
                    + `📍 *المصدر:* موقع Tn-QA Delivery`;
            }
        }
        
        showLoading() {
            if (!this.submitBtn) return;
            
            const originalHTML = this.submitBtn.innerHTML;
            this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            
            this.submitBtn.dataset.originalHtml = originalHTML;
        }
        
        showSuccess() {
            if (!this.submitBtn || !this.formMessage) return;
            
            const currentLang = localStorage.getItem('language') || 'ar';
            
            if (currentLang === 'en') {
                this.formMessage.textContent = 'Message sent successfully! Redirecting to WhatsApp...';
                this.submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent Successfully!';
            } else {
                this.formMessage.textContent = 'تم إرسال الرسالة بنجاح! يتم التوجيه إلى واتساب...';
                this.submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> تم إرسال الرسالة بنجاح!';
            }
            
            this.formMessage.className = 'form-message success';
            this.formMessage.style.display = 'block';
            this.submitBtn.style.background = "linear-gradient(135deg, #28a745, #20c997)";
        }
        
        resetForm() {
            if (!this.form || !this.submitBtn) return;
            
            this.form.reset();
            
            const originalHTML = this.submitBtn.dataset.originalHtml;
            if (originalHTML) {
                this.submitBtn.innerHTML = originalHTML;
            }
            
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.style.background = "";
            
            if (this.formMessage) {
                this.formMessage.style.display = 'none';
                this.formMessage.className = 'form-message';
            }
            
            const errors = this.form.querySelectorAll('.error-message');
            errors.forEach(error => error.remove());
            
            const errorFields = this.form.querySelectorAll('.error');
            errorFields.forEach(field => field.classList.remove('error'));
        }
    }
    
    // Initialize contact form
    const contactForm = new ContactForm();
    
    /* ================= ADDITIONAL ENHANCEMENTS ================= */
    class AdditionalEnhancements {
        constructor() {
            this.init();
        }
        
        init() {
            this.setupLazyLoading();
            this.setupHoverEffects();
            this.setupRippleEffects();
        }
        
        setupLazyLoading() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            images.forEach(img => {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            });
        }
        
        setupHoverEffects() {
            const serviceCards = document.querySelectorAll('.service-card');
            
            serviceCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    const icon = card.querySelector('.service-icon');
                    if (icon) {
                        icon.style.transform = 'rotate(360deg) scale(1.1)';
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    const icon = card.querySelector('.service-icon');
                    if (icon) {
                        icon.style.transform = 'rotate(0) scale(1)';
                    }
                });
            });
        }
        
        setupRippleEffects() {
            const buttons = document.querySelectorAll('.btn, .method-btn, .service-btn, .nav-cta, .service-phone-btn');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.createRippleEffect(e, btn);
                });
            });
        }
        
        createRippleEffect(event, button) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    }
    
    // Initialize additional enhancements
    const additionalEnhancements = new AdditionalEnhancements();
    
    /* ================= CSS ANIMATIONS ================= */
    class CSSAnimations {
        constructor() {
            this.init();
        }
        
        init() {
            this.addAnimationStyles();
            this.setupSocialIconAnimations();
        }
        
        addAnimationStyles() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `;
            
            document.head.appendChild(style);
        }
        
        setupSocialIconAnimations() {
            const socialIcons = document.querySelectorAll('.social-icon');
            
            socialIcons.forEach(icon => {
                icon.addEventListener('mouseenter', () => {
                    icon.style.animation = 'bounce 0.5s ease';
                });
                
                icon.addEventListener('animationend', () => {
                    icon.style.animation = '';
                });
            });
        }
    }
    
    // Initialize CSS animations
    const cssAnimations = new CSSAnimations();
    
    /* ================= INITIALIZATION COMPLETE ================= */
    console.log(' Tn-QA Delivery - Enhanced Script loaded successfully');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });
});