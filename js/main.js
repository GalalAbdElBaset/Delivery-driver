/* =============================
   DRIVER AVAILABLE - MAIN SCRIPT
   Enhanced & Optimized Version
   ============================= */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ================= SLIDER WITH CONTROLS ================= */
    const slides = document.querySelectorAll(".slide");
    const sliderDots = document.querySelectorAll(".slider-dot");
    const prevBtn = document.querySelector(".prev-slide");
    const nextBtn = document.querySelector(".next-slide");
    
    if (slides.length > 1) {
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 5000;
        
        function showSlide(index) {
            // Validate index
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            // Remove active from all
            slides.forEach(slide => slide.classList.remove("active"));
            sliderDots.forEach(dot => dot.classList.remove("active"));
            
            // Add active to current
            slides[index].classList.add("active");
            sliderDots[index].classList.add("active");
            
            currentSlide = index;
        }
        
        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        function prevSlide() {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }
        
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, slideDuration);
        }
        
        function stopAutoSlide() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }
        
        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }
        
        // Initialize slider
        showSlide(0);
        startAutoSlide();
        
        // Event listeners for controls
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                resetAutoSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevSlide();
                resetAutoSlide();
            });
        }
        
        // Event listeners for dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showSlide(index);
                resetAutoSlide();
            });
        });
        
        // Pause on hover/touch
        const sliderContainer = document.querySelector(".slider-container");
        if (sliderContainer) {
            sliderContainer.addEventListener("mouseenter", stopAutoSlide);
            sliderContainer.addEventListener("mouseleave", startAutoSlide);
            
            // Touch support for mobile
            sliderContainer.addEventListener("touchstart", stopAutoSlide);
            sliderContainer.addEventListener("touchend", () => {
                setTimeout(startAutoSlide, 3000);
            });
        }
        
        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") {
                nextSlide();
                resetAutoSlide();
            } else if (e.key === "ArrowLeft") {
                prevSlide();
                resetAutoSlide();
            }
        });
    }
    
    
    /* ================= NAVBAR ELEMENTS ================= */
    const header = document.getElementById("mainHeader");
    const navLinks = document.querySelectorAll(".nav-link");
    const indicator = document.getElementById("indicator");
    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("navLinks");
    
    const headerHeight = header?.offsetHeight || 75;
    
    
    /* ================= NAV INDICATOR ================= */
    if (navLinks.length && indicator) {
        
        function moveIndicator(el) {
            if (!el) return;
            
            const rect = el.getBoundingClientRect();
            const parent = el.parentElement.getBoundingClientRect();
            
            const left = rect.left - parent.left;
            const width = rect.width;
            
            indicator.style.left = left + "px";
            indicator.style.width = width + "px";
            indicator.style.opacity = "1";
        }
        
        /* Set Initial Indicator Position */
        const activeLink = document.querySelector(".nav-link.active");
        if (activeLink) {
            moveIndicator(activeLink);
        }
        
        
        /* Handle Nav Link Clicks */
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
                
                // Smooth scroll to section
                const targetID = this.getAttribute("href");
                const target = document.querySelector(targetID);
                
                if (target) {
                    const offset = target.offsetTop - headerHeight + 10;
                    
                    window.scrollTo({
                        top: offset,
                        behavior: "smooth"
                    });
                }
            });
        });
        
        
        /* ================= SCROLL SPY ================= */
        let scrollTimeout;
        
        function updateActiveNavOnScroll() {
            const scrollPos = window.scrollY + headerHeight + 100;
            
            let currentActive = null;
            
            navLinks.forEach(link => {
                const section = document.querySelector(link.getAttribute("href"));
                if (!section) return;
                
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    currentActive = link;
                }
            });
            
            if (currentActive) {
                navLinks.forEach(l => l.classList.remove("active"));
                currentActive.classList.add("active");
                moveIndicator(currentActive);
            }
        }
        
        // Throttle scroll events for performance
        window.addEventListener("scroll", () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    updateActiveNavOnScroll();
                    scrollTimeout = null;
                }, 50);
            }
        });
    }
    
    
    /* ================= BURGER MENU TOGGLE ================= */
    if (burger && navMenu) {
        
        function toggleMenu() {
            navMenu.classList.toggle("open");
            burger.classList.toggle("active");
            
            // Toggle body scroll
            if (navMenu.classList.contains("open")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
            
            // Animate burger icon
            const spans = burger.querySelectorAll("span");
            if (navMenu.classList.contains("open")) {
                spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
            } else {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        }
        
        burger.addEventListener("click", toggleMenu);
        
        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("open") &&
                !navMenu.contains(e.target) &&
                !burger.contains(e.target)) {
                toggleMenu();
            }
        });
        
        // Close menu on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navMenu.classList.contains("open")) {
                toggleMenu();
            }
        });
        
        // Close menu on window resize (for mobile landscape/portrait changes)
        window.addEventListener("resize", () => {
            if (window.innerWidth > 767 && navMenu.classList.contains("open")) {
                toggleMenu();
            }
        });
    }
    
    
    /* ================= NAVBAR SMART SCROLL EFFECTS ================= */
    if (header) {
        let lastScroll = 0;
        let scrollTimeout;
        
        function handleHeaderScroll() {
            const currentScroll = window.pageYOffset;
            
            /* Add/Remove Scrolled Class */
            if (currentScroll > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
            
            /* Hide/Show On Scroll Direction */
            if (currentScroll <= 0) {
                header.classList.remove("hide");
            } else if (currentScroll > lastScroll && currentScroll > headerHeight + 80) {
                // Scrolling down - hide header
                header.classList.add("hide");
            } else {
                // Scrolling up - show header
                header.classList.remove("hide");
            }
            
            lastScroll = currentScroll;
        }
        
        // Throttle scroll for performance
        window.addEventListener("scroll", () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    handleHeaderScroll();
                    scrollTimeout = null;
                }, 25);
            }
        });
    }
    
    
    /* ================= ANIMATE ON SCROLL ================= */
    function initScrollAnimations() {
        const elements = document.querySelectorAll(".card, .value-item, .step, .info-item");
        
        // Set initial styles
        elements.forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(30px)";
            element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });
        
        function checkScroll() {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }
            });
        }
        
        // Check on load and scroll
        window.addEventListener("load", checkScroll);
        window.addEventListener("scroll", checkScroll);
        
        // Initial check
        checkScroll();
    }
    
    initScrollAnimations();
    
    
    /* ================= CONTACT FORM ENHANCED ================= */
    const contactForm = document.getElementById("messageForm");
    
    if (contactForm) {
        // Form validation
        function validateForm() {
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const phone = contactForm.querySelector('input[type="tel"]').value.trim();
            const service = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value.trim();
            
            if (!name) {
                alert("يرجى إدخال الاسم الكامل");
                return false;
            }
            
            if (!phone) {
                alert("يرجى إدخال رقم الهاتف");
                return false;
            }
            
            // Simple phone validation (Tunisian numbers)
            const phoneRegex = /^(\+216|216)?\s?[2-9][0-9]{7}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                alert("يرجى إدخال رقم هاتف تونسي صحيح");
                return false;
            }
            
            if (!service) {
                alert("يرجى اختيار الخدمة المطلوبة");
                return false;
            }
            
            if (!message || message.length < 10) {
                alert("يرجى إدخال تفاصيل الطلب (10 أحرف على الأقل)");
                return false;
            }
            
            return true;
        }
        
        // Format phone number
        function formatPhoneNumber(phone) {
            // Remove all non-digit characters
            let cleaned = phone.replace(/\D/g, '');
            
            // If it starts with 216, keep it
            if (cleaned.startsWith('216')) {
                cleaned = cleaned.substring(3);
            }
            
            // Format as Tunisian number
            if (cleaned.length === 8) {
                return `+216${cleaned}`;
            }
            
            return `+216${cleaned}`;
        }
        
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            // Collect form data
            const name = this.querySelector('input[type="text"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            const serviceText = this.querySelector('select option:checked').textContent;
            const message = this.querySelector('textarea').value.trim();
            
            // Format phone number
            const formattedPhone = formatPhoneNumber(phone);
            
            // Create WhatsApp message
            const whatsappMessage = `🚗 طلب خدمة جديدة من Driver Available%0A%0A`
                + `👤 *الاسم:* ${name}%0A`
                + `📞 *رقم الهاتف:* ${formattedPhone}%0A`
                + `📦 *الخدمة المطلوبة:* ${serviceText}%0A%0A`
                + `📝 *تفاصيل الطلب:*%0A${message}%0A%0A`
                + `📍 *المصدر:* موقع Driver Available`;
            
            // WhatsApp number (replace with your actual number)
            const whatsappNumber = "21612345678";
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Show success feedback
            const submitBtn = this.querySelector('.submit-btn');
            const originalHTML = submitBtn.innerHTML;
            const originalBg = submitBtn.style.backgroundColor;
            
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> تم إرسال الطلب بنجاح';
            submitBtn.style.backgroundColor = "#28a745";
            submitBtn.disabled = true;
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.backgroundColor = originalBg;
                submitBtn.disabled = false;
            }, 3000);
        });
        
        // Auto-format phone number as user types
        const phoneInput = contactForm.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    // Format as Tunisian number: XX XXX XXX
                    let formatted = '';
                    
                    if (value.length <= 2) {
                        formatted = value;
                    } else if (value.length <= 5) {
                        formatted = `${value.substring(0, 2)} ${value.substring(2)}`;
                    } else if (value.length <= 8) {
                        formatted = `${value.substring(0, 2)} ${value.substring(2, 5)} ${value.substring(5)}`;
                    } else {
                        formatted = `${value.substring(0, 2)} ${value.substring(2, 5)} ${value.substring(5, 8)}`;
                    }
                    
                    this.value = formatted;
                }
            });
        }
    }
    
    
    /* ================= SET CURRENT YEAR IN FOOTER ================= */
    const currentYearElement = document.querySelector('#currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    
    /* ================= ENHANCE FORM INPUTS ================= */
    // Add focus effects to all form inputs
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    
    /* ================= LOADING STATE FOR BUTTONS ================= */
    // Handle loading states for all buttons with async actions
    const actionButtons = document.querySelectorAll('.btn, .service-btn, .submit-btn, .nav-cta');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add loading if it's a form submission or external link
            if (this.type === 'submit' || this.href.includes('wa.me')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
                this.disabled = true;
                
                // Reset after 5 seconds if something goes wrong
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 5000);
            }
        });
    });
    
    
    /* ================= TOUCH SWIPE FOR SLIDER (MOBILE) ================= */
    let touchStartX = 0;
    let touchEndX = 0;
    const sliderContainer = document.querySelector('.slider-container');
    
    if (sliderContainer && slides.length > 1) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        });
        
        function handleSwipeGesture() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                nextSlide();
                resetAutoSlide && resetAutoSlide();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                prevSlide();
                resetAutoSlide && resetAutoSlide();
            }
        }
    }
    
    
    /* ================= RESPONSIVE ADJUSTMENTS ================= */
    function handleResponsiveAdjustments() {
        const width = window.innerWidth;
        
        // Hide/show CTA text based on screen size
        const ctaText = document.querySelector('.cta-text');
        if (ctaText) {
            if (width <= 767) {
                ctaText.style.display = 'none';
            } else {
                ctaText.style.display = 'inline';
            }
        }
        
        // Adjust hero height for mobile
        const hero = document.querySelector('.hero');
        if (hero) {
            if (width <= 767) {
                hero.style.minHeight = '400px';
            } else {
                hero.style.minHeight = '600px';
            }
        }
    }
    
    // Run on load and resize
    window.addEventListener('load', handleResponsiveAdjustments);
    window.addEventListener('resize', handleResponsiveAdjustments);
    
    
    /* ================= SMOOTH SCROLL FOR ANCHOR LINKS ================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offset = target.offsetTop - headerHeight + 10;
                
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    /* ================= PERFORMANCE OPTIMIZATIONS ================= */
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResponsiveAdjustments, 250);
    });
    
    // Preload important images
    function preloadCriticalImages() {
        const images = [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Start preloading after page load
    window.addEventListener('load', () => {
        setTimeout(preloadCriticalImages, 1000);
    });
    
    
    /* ================= ACCESSIBILITY IMPROVEMENTS ================= */
    // Add aria-labels to icons without text
    document.querySelectorAll('.fas, .fab').forEach(icon => {
        if (!icon.parentElement.textContent.trim() && !icon.getAttribute('aria-label')) {
            const iconClass = Array.from(icon.classList).find(cls => cls.startsWith('fa-'));
            if (iconClass) {
                const label = iconClass.replace('fa-', '').replace('-', ' ');
                icon.setAttribute('aria-label', label);
            }
        }
    });
    
    // Focus trap for mobile menu
    if (navMenu) {
        const focusableElements = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = navMenu.querySelectorAll(focusableElements)[0];
        const focusableContent = navMenu.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    
    /* ================= ERROR HANDLING ================= */
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('خطأ في التطبيق:', e.error);
        // You can add error reporting here
    });
    
    // Handle offline/online status
    window.addEventListener('offline', () => {
        console.log('أنت غير متصل بالإنترنت');
        // Could show a notification to user
    });
    
    window.addEventListener('online', () => {
        console.log('أنت متصل بالإنترنت مرة أخرى');
    });
    
    
    /* ================= INITIALIZATION COMPLETE ================= */
    console.log('✅ Driver Available - Script loaded successfully');
    
    // Dispatch custom event for any other scripts
    document.dispatchEvent(new CustomEvent('driverAvailable:loaded'));
    
});