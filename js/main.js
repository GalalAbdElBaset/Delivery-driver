// =============================
// ASAP Qatar - Main Script (Enhanced)
// =============================

document.addEventListener("DOMContentLoaded", () => {
    
    /* ================= SET CURRENT YEAR IN FOOTER ================= */
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    /* ================= SMOOTH NAVBAR HIDE/SHOW ================= */
    let lastScrollTop = 0;
    const header = document.getElementById("mainHeader");
    const navbarHeight = header?.offsetHeight || 80;
    
    function handleNavbarScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > navbarHeight) {
            if (scrollTop > lastScrollTop) {
                // Scroll down - hide navbar
                header.classList.add('hidden');
            } else {
                // Scroll up - show navbar
                header.classList.remove('hidden');
                header.classList.add('scrolled');
            }
        } else {
            // At top - show navbar without scrolled class
            header.classList.remove('hidden');
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleNavbarScroll();
                scrollTimeout = null;
            }, 80);
        }
    });
    
    /* ================= CREATE SCROLL TO TOP BUTTON ================= */
    function createScrollToTopButton() {
        const scrollToTopBtn = document.createElement('div');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTopBtn.title = 'العودة للأعلى';
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    createScrollToTopButton();
    
    /* ================= SMOOTH ANIMATIONS FOR SECTIONS ================= */
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.service-card, .feature, .contact-method, .form-group');
        
        // Set animation delays for service cards
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
        });
        
        // Set animation delays for form groups
        document.querySelectorAll('.form-group').forEach((group, index) => {
            group.style.setProperty('--form-order', index);
        });
        
        // Intersection Observer for smooth scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered animation for children elements
                    if (entry.target.classList.contains('services-grid')) {
                        const cards = entry.target.querySelectorAll('.service-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.animationDelay = `${index * 0.1}s`;
                            }, 100);
                        });
                    }
                    
                    if (entry.target.classList.contains('about-features')) {
                        const features = entry.target.querySelectorAll('.feature');
                        features.forEach((feature, index) => {
                            setTimeout(() => {
                                feature.style.animationDelay = `${index * 0.1}s`;
                            }, 100);
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animate-on-scroll elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
        
        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
    
    // Initialize animations
    setTimeout(initScrollAnimations, 500);
    
    /* ================= NAVBAR FUNCTIONALITY ================= */
    const navLinks = document.querySelectorAll(".nav-link");
    const indicator = document.getElementById("indicator");
    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("navLinks");
    
    // Function to move indicator
    function moveIndicator(element) {
        if (!indicator || !element) return;
        
        const rect = element.getBoundingClientRect();
        const parent = element.parentElement.getBoundingClientRect();
        
        const left = rect.left - parent.left;
        const width = rect.width;
        
        indicator.style.left = left + "px";
        indicator.style.width = width + "px";
        indicator.style.opacity = "1";
    }
    
    // Set initial indicator position
    const activeLink = document.querySelector(".nav-link.active");
    if (activeLink && indicator) {
        moveIndicator(activeLink);
    }
    
    // Handle nav link clicks with smooth animation
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Update active class
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
            
            // Move indicator
            moveIndicator(this);
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
                burger.classList.remove("active");
                document.body.style.overflow = "auto";
            }
            
            // Get target section
            const targetID = this.getAttribute("href");
            const target = document.querySelector(targetID);
            
            if (target) {
                const targetPosition = target.offsetTop - navbarHeight + 10;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800; // milliseconds
                let start = null;
                
                // Smooth scroll animation
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeInOutCubic = t => {
                        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    };
                    
                    const easePercentage = easeInOutCubic(percentage);
                    
                    window.scrollTo(0, startPosition + (distance * easePercentage));
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });
    
    // Scroll spy for navbar
    let scrollSpyTimeout;
    
    function updateActiveNavOnScroll() {
        const scrollPos = window.scrollY + navbarHeight + 100;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute("href"));
            if (!section) return;
            
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
                moveIndicator(link);
            }
        });
    }
    
    // Throttle scroll events for scroll spy
    window.addEventListener("scroll", () => {
        if (!scrollSpyTimeout) {
            scrollSpyTimeout = setTimeout(() => {
                updateActiveNavOnScroll();
                scrollSpyTimeout = null;
            }, 50);
        }
    });
    
    // Burger menu toggle
    if (burger && navMenu) {
        burger.addEventListener("click", function() {
            this.classList.toggle("active");
            navMenu.classList.toggle("open");
            
            // Toggle body scroll
            if (navMenu.classList.contains("open")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("open") &&
                !navMenu.contains(e.target) &&
                !burger.contains(e.target)) {
                burger.classList.remove("active");
                navMenu.classList.remove("open");
                document.body.style.overflow = "auto";
            }
        });
        
        // Close menu on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navMenu.classList.contains("open")) {
                burger.classList.remove("active");
                navMenu.classList.remove("open");
                document.body.style.overflow = "auto";
            }
        });
        
        // Close menu on window resize
        window.addEventListener("resize", () => {
            if (window.innerWidth > 767 && navMenu.classList.contains("open")) {
                burger.classList.remove("active");
                navMenu.classList.remove("open");
                document.body.style.overflow = "auto";
            }
        });
    }
    
    /* ================= CONTACT FORM ================= */
    const contactForm = document.getElementById("messageForm");
    
    if (contactForm) {
        // Form validation
        function validateForm() {
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const phone = contactForm.querySelector('input[type="tel"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();
            
            if (!name) {
                alert(localStorage.getItem('preferredLang') === 'en' ? "Please enter your full name" : "يرجى إدخال الاسم الكامل");
                return false;
            }
            
            if (!phone) {
                alert(localStorage.getItem('preferredLang') === 'en' ? "Please enter your phone number" : "يرجى إدخال رقم الهاتف");
                return false;
            }
            
            // Phone validation
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(phone)) {
                alert(localStorage.getItem('preferredLang') === 'en' ? "Please enter a valid phone number" : "يرجى إدخال رقم هاتف صحيح");
                return false;
            }
            
            // Email validation (optional)
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert(localStorage.getItem('preferredLang') === 'en' ? "Please enter a valid email address" : "يرجى إدخال بريد إلكتروني صحيح");
                    return false;
                }
            }
            
            if (!message || message.length < 5) {
                alert(localStorage.getItem('preferredLang') === 'en' ? "Please enter your message (at least 5 characters)" : "يرجى إدخال الرسالة (5 أحرف على الأقل)");
                return false;
            }
            
            return true;
        }
        
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            // Collect form data
            const name = this.querySelector('input[type="text"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Detect current language
            const currentLang = localStorage.getItem('preferredLang') || 'ar';
            
            // Create WhatsApp message based on language
            let whatsappMessage;
            
            if (currentLang === 'en') {
                whatsappMessage = `🚗 New Service Request from ASAP Qatar%0A%0A`
                    + `👤 *Name:* ${name}%0A`
                    + `📞 *Phone:* ${phone}%0A`
                    + (email ? `📧 *Email:* ${email}%0A` : '')
                    + `%0A📝 *Message:*%0A${message}%0A%0A`
                    + `📍 *Source:* ASAP Qatar Website`;
            } else {
                whatsappMessage = `🚗 طلب خدمة جديدة من ASAP Qatar%0A%0A`
                    + `👤 *الاسم:* ${name}%0A`
                    + `📞 *رقم الهاتف:* ${phone}%0A`
                    + (email ? `📧 *البريد الإلكتروني:* ${email}%0A` : '')
                    + `%0A📝 *الرسالة:*%0A${message}%0A%0A`
                    + `📍 *المصدر:* موقع ASAP Qatar`;
            }
            
            // WhatsApp number
            const whatsappNumber = "97471375390";
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Show success feedback with animation
            const submitBtn = this.querySelector('.submit-btn');
            const originalHTML = submitBtn.innerHTML;
            
            if (currentLang === 'en') {
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent Successfully';
            } else {
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> تم إرسال الرسالة بنجاح';
            }
            
            submitBtn.style.background = "linear-gradient(135deg, #28a745, #20c997)";
            submitBtn.disabled = true;
            
            // Add success animation
            submitBtn.style.animation = 'none';
            setTimeout(() => {
                submitBtn.style.animation = 'pulse 0.6s ease';
            }, 10);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = "";
                submitBtn.disabled = false;
                submitBtn.style.animation = '';
            }, 3000);
        });
        
        // Auto-format phone number
        const phoneInput = contactForm.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    let formatted = '';
                    
                    // Detect Qatar or Tunisia number
                    if (value.startsWith('974')) {
                        // Qatar number formatting
                        if (value.length <= 3) {
                            formatted = value;
                        } else if (value.length <= 6) {
                            formatted = `${value.substring(0, 3)} ${value.substring(3)}`;
                        } else if (value.length <= 8) {
                            formatted = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
                        } else {
                            formatted = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 8)}`;
                        }
                    } else if (value.startsWith('216')) {
                        // Tunisia number formatting
                        if (value.length <= 3) {
                            formatted = value;
                        } else if (value.length <= 6) {
                            formatted = `${value.substring(0, 3)} ${value.substring(3)}`;
                        } else if (value.length <= 8) {
                            formatted = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6)}`;
                        } else {
                            formatted = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 8)}`;
                        }
                    } else {
                        // Default formatting
                        if (value.length <= 3) {
                            formatted = value;
                        } else if (value.length <= 6) {
                            formatted = `${value.substring(0, 3)} ${value.substring(3)}`;
                        } else {
                            formatted = `${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 8)}`;
                        }
                    }
                    
                    this.value = formatted;
                }
            });
        }
    }
    
    /* ================= IMAGE LAZY LOADING ================= */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    /* ================= RESPONSIVE ADJUSTMENTS ================= */
    function handleResponsiveAdjustments() {
        const width = window.innerWidth;
        
        // Adjust hero height for mobile
        const hero = document.querySelector('.hero');
        if (hero) {
            if (width <= 767) {
                hero.style.minHeight = '500px';
            } else {
                hero.style.minHeight = '700px';
            }
        }
        
        // Adjust language switcher position for RTL/LTR
        const langSwitcher = document.querySelector('.language-switcher');
        if (langSwitcher) {
            const isRTL = document.documentElement.dir === 'rtl';
            if (isRTL) {
                langSwitcher.style.left = '30px';
                langSwitcher.style.right = 'auto';
            } else {
                langSwitcher.style.right = '30px';
                langSwitcher.style.left = 'auto';
            }
        }
    }
    
    // Run on load and resize
    window.addEventListener('load', handleResponsiveAdjustments);
    window.addEventListener('resize', handleResponsiveAdjustments);
    
    /* ================= PERFORMANCE OPTIMIZATIONS ================= */
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResponsiveAdjustments, 250);
    });
    
    // Preload important images
    function preloadImages() {
        const images = [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=600'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Start preloading after page load
    window.addEventListener('load', () => {
        setTimeout(preloadImages, 1000);
    });
    
    /* ================= HOVER EFFECTS ENHANCEMENT ================= */
    function enhanceHoverEffects() {
        // Add hover effects to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.btn, .method-btn, .service-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add hover effects to features
        const features = document.querySelectorAll('.feature');
        features.forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                feature.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            feature.addEventListener('mouseleave', () => {
                feature.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Initialize hover effects
    enhanceHoverEffects();
    
    /* ================= ENHANCED SMOOTH SCROLL ================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const targetPosition = target.offsetTop - navbarHeight + 10;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeInOutCubic = t => {
                        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    };
                    
                    const easePercentage = easeInOutCubic(percentage);
                    
                    window.scrollTo(0, startPosition + (distance * easePercentage));
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });
    
    /* ================= GOOGLE MAPS ENHANCEMENT ================= */
    function enhanceGoogleMaps() {
        const mapIframe = document.querySelector('.map-wrapper iframe');
        if (mapIframe) {
            // Add loading animation to map
            mapIframe.addEventListener('load', () => {
                const mapContainer = document.querySelector('.map-container');
                mapContainer.classList.add('loaded');
            });
            
            // Prevent map from stealing focus on scroll
            mapIframe.addEventListener('mouseenter', () => {
                document.body.style.overflow = 'hidden';
            });
            
            mapIframe.addEventListener('mouseleave', () => {
                document.body.style.overflow = 'auto';
            });
        }
    }
    
    enhanceGoogleMaps();
    
    /* ================= INITIALIZATION COMPLETE ================= */
    console.log('✅ ASAP Qatar - Enhanced Script loaded successfully');
});