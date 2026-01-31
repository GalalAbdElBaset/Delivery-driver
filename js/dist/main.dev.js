"use strict";

// =============================
// ASAP Qatar - Main Script (Fixed)
// =============================
(function () {
  'use strict'; // Wait for DOM to be fully loaded

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🚀 Initializing ASAP Qatar website...'); // Set current year

    setCurrentYear(); // Initialize all components

    initHeroSlider();
    initNavigation();
    initScrollToTop();
    initAnimations();
    initContactForm();
    initHoverEffects();
    console.log('✅ Website initialized successfully');
  }
  /* ================= SET CURRENT YEAR ================= */


  function setCurrentYear() {
    var yearElement = document.getElementById('currentYear');

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
  /* ================= HERO SLIDER ================= */


  function initHeroSlider() {
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.dot');
    var prevBtn = document.querySelector('.slider-prev');
    var nextBtn = document.querySelector('.slider-next');
    if (slides.length === 0) return;
    var currentSlide = 0;
    var slideInterval; // Function to show specific slide

    function goToSlide(n) {
      // Hide all slides
      slides.forEach(function (slide) {
        slide.classList.remove('active');
        slide.style.opacity = '0';
      }); // Remove active class from all dots

      dots.forEach(function (dot) {
        return dot.classList.remove('active');
      }); // Calculate new slide index

      currentSlide = (n + slides.length) % slides.length; // Show new slide

      slides[currentSlide].classList.add('active');
      slides[currentSlide].style.opacity = '1'; // Activate corresponding dot

      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    } // Next slide function


    function nextSlide() {
      goToSlide(currentSlide + 1);
    } // Previous slide function


    function prevSlide() {
      goToSlide(currentSlide - 1);
    } // Start auto slide


    function startAutoSlide() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    } // Stop auto slide


    function stopAutoSlide() {
      if (slideInterval) clearInterval(slideInterval);
    } // Event Listeners


    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        return goToSlide(index);
      });
    }); // Start slider

    startAutoSlide(); // Pause on hover

    var slider = document.querySelector('.hero-slider');

    if (slider) {
      slider.addEventListener('mouseenter', stopAutoSlide);
      slider.addEventListener('mouseleave', startAutoSlide);
    }

    console.log('✅ Slider initialized');
  }
  /* ================= SMOOTH NAVIGATION ================= */


  function initNavigation() {
    var navLinks = document.querySelectorAll('.nav-link');
    var indicator = document.getElementById('indicator');
    var burger = document.getElementById('burger');
    var navMenu = document.getElementById('navLinks');
    var header = document.getElementById('mainHeader');
    if (!navLinks.length) return; // Mobile menu toggle

    if (burger && navMenu) {
      burger.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
      }); // Close menu when clicking outside

      document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !burger.contains(e.target)) {
          burger.classList.remove('active');
          navMenu.classList.remove('open');
          document.body.style.overflow = 'auto';
        }
      });
    } // Update indicator position


    function updateIndicator(link) {
      if (!indicator || !link) return;
      var rect = link.getBoundingClientRect();
      var parent = link.parentElement.getBoundingClientRect();
      indicator.style.left = rect.left - parent.left + 'px';
      indicator.style.width = rect.width + 'px';
      indicator.style.opacity = '1';
    } // Smooth scroll to section with animation


    function scrollToSection(targetId) {
      var target = document.querySelector(targetId);
      if (!target) return;
      var headerHeight = header ? header.offsetHeight : 80;
      var targetPosition = target.offsetTop - headerHeight + 10; // Add animation class to target section

      target.classList.add('section-highlight');
      setTimeout(function () {
        return target.classList.remove('section-highlight');
      }, 1000); // Smooth scroll

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      }); // Close mobile menu if open

      if (navMenu && navMenu.classList.contains('open')) {
        burger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    } // Set initial active link


    var activeLink = document.querySelector('.nav-link.active');

    if (activeLink && indicator) {
      setTimeout(function () {
        return updateIndicator(activeLink);
      }, 100);
    } // Add click event to all nav links


    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Update active class

        navLinks.forEach(function (l) {
          return l.classList.remove('active');
        });
        this.classList.add('active'); // Update indicator

        updateIndicator(this); // Scroll to section

        var targetId = this.getAttribute('href');
        scrollToSection(targetId);
      });
    }); // Update active link on scroll

    window.addEventListener('scroll', function () {
      var scrollPosition = window.scrollY + 100;
      navLinks.forEach(function (link) {
        var targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;
        var target = document.querySelector(targetId);
        if (!target) return;
        var sectionTop = target.offsetTop;
        var sectionBottom = sectionTop + target.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          navLinks.forEach(function (l) {
            return l.classList.remove('active');
          });
          link.classList.add('active');
          updateIndicator(link);
        }
      });
    }); // Navbar scroll effect

    if (header) {
      var lastScroll = 0;
      window.addEventListener('scroll', function () {
        var currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
          if (currentScroll > lastScroll) {
            header.classList.add('hidden');
          } else {
            header.classList.remove('hidden');
            header.classList.add('scrolled');
          }
        } else {
          header.classList.remove('hidden', 'scrolled');
        }

        lastScroll = currentScroll;
      });
    }

    console.log('✅ Navigation initialized');
  }
  /* ================= SCROLL TO TOP BUTTON ================= */


  function initScrollToTop() {
    // Create button if it doesn't exist
    var scrollBtn = document.getElementById('scrollToTop');

    if (!scrollBtn) {
      scrollBtn = document.createElement('button');
      scrollBtn.id = 'scrollToTop';
      scrollBtn.className = 'scroll-to-top';
      scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
      scrollBtn.title = 'العودة للأعلى';
      scrollBtn.setAttribute('aria-label', 'العودة إلى الأعلى');
      document.body.appendChild(scrollBtn);
    } // Show/hide button on scroll


    function toggleScrollButton() {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
        scrollBtn.style.transform = 'translateY(0)';
      } else {
        scrollBtn.classList.remove('visible');
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
        scrollBtn.style.transform = 'translateY(20px)';
      }
    } // Scroll to top function


    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }); // Reset active nav to home

      var homeLink = document.querySelector('.nav-link[href="#home"]');
      var navLinks = document.querySelectorAll('.nav-link');

      if (homeLink) {
        navLinks.forEach(function (l) {
          return l.classList.remove('active');
        });
        homeLink.classList.add('active');
      }
    } // Event listeners


    scrollBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', toggleScrollButton); // Initial check

    toggleScrollButton();
    console.log('✅ Scroll to top button initialized');
  }
  /* ================= SECTION ANIMATIONS ================= */


  function initAnimations() {
    // Add CSS animations
    var style = document.createElement('style');
    style.textContent = "\n            /* Section highlight animation */\n            .section-highlight {\n                animation: highlightSection 1s ease;\n            }\n            \n            @keyframes highlightSection {\n                0% { background-color: rgba(212, 175, 55, 0.05); }\n                100% { background-color: transparent; }\n            }\n            \n            /* Fade in animation for elements */\n            .fade-in-element {\n                opacity: 0;\n                transform: translateY(30px);\n                transition: all 0.6s ease;\n            }\n            \n            .fade-in-element.visible {\n                opacity: 1;\n                transform: translateY(0);\n            }\n            \n            /* Service card animations */\n            .service-card {\n                transition: all 0.3s ease !important;\n            }\n            \n            .service-card:hover {\n                transform: translateY(-10px) !important;\n                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;\n            }\n            \n            .service-card:hover .service-icon {\n                transform: rotate(360deg) scale(1.1) !important;\n            }\n            \n            /* Button ripple effect */\n            .btn-ripple {\n                position: relative;\n                overflow: hidden;\n            }\n            \n            .ripple {\n                position: absolute;\n                border-radius: 50%;\n                background: rgba(255, 255, 255, 0.7);\n                transform: scale(0);\n                animation: ripple 0.6s linear;\n            }\n            \n            @keyframes ripple {\n                to {\n                    transform: scale(4);\n                    opacity: 0;\n                }\n            }\n            \n            /* Scroll to top button */\n            .scroll-to-top {\n                position: fixed;\n                bottom: 100px;\n                right: 30px;\n                width: 50px;\n                height: 50px;\n                background: #D4AF37;\n                color: white;\n                border-radius: 50%;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                font-size: 1.5rem;\n                cursor: pointer;\n                z-index: 999;\n                opacity: 0;\n                visibility: hidden;\n                transform: translateY(20px);\n                transition: all 0.3s ease;\n                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);\n                border: none;\n            }\n            \n            .scroll-to-top.visible {\n                opacity: 1 !important;\n                visibility: visible !important;\n                transform: translateY(0) !important;\n            }\n            \n            .scroll-to-top:hover {\n                background: #B8941F;\n                transform: translateY(-5px) !important;\n            }\n        ";
    document.head.appendChild(style); // Add animation to elements on scroll

    var animateElements = document.querySelectorAll('.service-card, .feature, .contact-method, .about-image');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      animateElements.forEach(function (el) {
        el.classList.add('fade-in-element');
        observer.observe(el);
      });
    } else {
      // Fallback for older browsers
      animateElements.forEach(function (el) {
        el.classList.add('fade-in-element', 'visible');
      });
    }

    console.log('✅ Animations initialized');
  }
  /* ================= CONTACT FORM ================= */


  function initContactForm() {
    var form = document.getElementById('messageForm');
    if (!form) return; // Add name attributes if missing

    var inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function (input, index) {
      if (!input.name) {
        var type = input.type || input.tagName.toLowerCase();
        input.name = "".concat(type, "_").concat(index);
      }
    }); // Phone formatting

    var phoneInput = form.querySelector('input[type="tel"]');

    if (phoneInput) {
      phoneInput.addEventListener('input', function (e) {
        var value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
          // Simple formatting
          var formatted = '';

          if (value.length <= 4) {
            formatted = value;
          } else if (value.length <= 8) {
            formatted = "".concat(value.substring(0, 4), " ").concat(value.substring(4));
          } else {
            formatted = "".concat(value.substring(0, 4), " ").concat(value.substring(4, 8), " ").concat(value.substring(8));
          }

          e.target.value = formatted;
        }
      });
    } // Form submission


    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Simple validation

      var isValid = true;
      var requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(function (input) {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ff6b6b';
        } else {
          input.style.borderColor = '';
        }
      });

      if (!isValid) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
      } // Get form data


      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value.trim();
      }); // Create WhatsApp message

      var message = "\uD83D\uDE97 \u0637\u0644\u0628 \u062E\u062F\u0645\u0629 \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 ASAP Qatar%0A%0A" + "\uD83D\uDC64 *\u0627\u0644\u0627\u0633\u0645:* ".concat(data.name || '', "%0A") + "\uD83D\uDCDE *\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641:* ".concat(data.phone || data.tel_0 || '', "%0A") + (data.email ? "\uD83D\uDCE7 *\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A:* ".concat(data.email, "%0A") : '') + "%0A\uD83D\uDCDD *\u0627\u0644\u0631\u0633\u0627\u0644\u0629:*%0A".concat(data.message || data.textarea_3 || '', "%0A%0A") + "\uD83D\uDCCD *\u0627\u0644\u0645\u0635\u062F\u0631:* \u0645\u0648\u0642\u0639 ASAP Qatar"; // Open WhatsApp

      window.open("https://wa.me/97471375390?text=".concat(encodeURIComponent(message)), '_blank'); // Reset form

      form.reset(); // Show success message

      var submitBtn = form.querySelector('.submit-btn');

      if (submitBtn) {
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> تم الإرسال بنجاح!';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        setTimeout(function () {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
        }, 3000);
      }
    });
    console.log('✅ Contact form initialized');
  }
  /* ================= HOVER EFFECTS ================= */


  function initHoverEffects() {
    // Service cards hover
    document.querySelectorAll('.service-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        var icon = this.querySelector('.service-icon');

        if (icon) {
          icon.style.transform = 'rotate(10deg) scale(1.1)';
        }
      });
      card.addEventListener('mouseleave', function () {
        var icon = this.querySelector('.service-icon');

        if (icon) {
          icon.style.transform = 'rotate(0) scale(1)';
        }
      });
    }); // Buttons ripple effect

    document.querySelectorAll('.btn, .service-btn, .nav-cta, .method-btn, .submit-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var _this = this;

        // Create ripple
        var ripple = document.createElement('span');
        var rect = this.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var x = e.clientX - rect.left - size / 2;
        var y = e.clientY - rect.top - size / 2;
        ripple.className = 'ripple';
        ripple.style.cssText = "\n                    width: ".concat(size, "px;\n                    height: ").concat(size, "px;\n                    top: ").concat(y, "px;\n                    left: ").concat(x, "px;\n                ");
        this.classList.add('btn-ripple');
        this.appendChild(ripple); // Remove ripple after animation

        setTimeout(function () {
          ripple.remove();

          _this.classList.remove('btn-ripple');
        }, 600);
      });
    });
    console.log('✅ Hover effects initialized');
  }
})();
//# sourceMappingURL=main.dev.js.map
