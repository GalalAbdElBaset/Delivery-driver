"use strict";

// main.js - All-in-one JavaScript file
document.addEventListener('DOMContentLoaded', function () {
  // ================= LANGUAGE MANAGEMENT =================
  function initLanguage() {
    var langBtn = document.getElementById('langBtn');
    var langDropdown = document.getElementById('langDropdown');
    var currentLang = document.getElementById('currentLang');
    var langOptions = document.querySelectorAll('.lang-option-nav');
    var elementsToTranslate = document.querySelectorAll('[data-i18n]'); // Load saved language or default to Arabic

    var savedLang = localStorage.getItem('language') || 'ar';
    setLanguage(savedLang); // Toggle dropdown

    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
      }); // Close dropdown when clicking outside

      document.addEventListener('click', function () {
        langDropdown.classList.remove('active');
      }); // Language selection

      langOptions.forEach(function (option) {
        option.addEventListener('click', function (e) {
          e.preventDefault();
          var lang = this.getAttribute('data-lang');
          setLanguage(lang);
          langDropdown.classList.remove('active');
        });
      });
    }

    function setLanguage(lang) {
      // Update UI
      if (currentLang) {
        currentLang.textContent = lang === 'ar' ? 'العربية' : 'English';
      } // Update active class


      langOptions.forEach(function (option) {
        option.classList.remove('active');

        if (option.getAttribute('data-lang') === lang) {
          option.classList.add('active');
        }
      }); // Load translation data

      fetch("translations/".concat(lang, ".json")).then(function (response) {
        return response.json();
      }).then(function (translations) {
        // Apply translations
        elementsToTranslate.forEach(function (element) {
          var key = element.getAttribute('data-i18n');
          var text = getNestedTranslation(translations, key);

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
        }); // Update direction

        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; // Update theme button text

        updateThemeButtonText(); // Save language preference

        localStorage.setItem('language', lang); // Trigger custom event

        window.dispatchEvent(new CustomEvent('languageChanged', {
          detail: {
            lang: lang
          }
        }));
      })["catch"](function (error) {
        console.error('Error loading translations:', error);
      });
    }

    function getNestedTranslation(obj, key) {
      return key.split('.').reduce(function (o, k) {
        return (o || {})[k];
      }, obj);
    }
  } // ================= MOBILE MENU =================


  function initMobileMenu() {
    var burger = document.getElementById('burger');
    var navLinks = document.getElementById('navLinks');
    var header = document.getElementById('mainHeader');

    if (burger && navLinks) {
      burger.addEventListener('click', function () {
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
      }); // Close menu when clicking outside

      document.addEventListener('click', function (event) {
        var isClickInside = navLinks.contains(event.target) || burger.contains(event.target);

        if (!isClickInside && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          burger.classList.remove('active');
          document.body.style.overflow = 'auto';

          if (header) {
            header.classList.remove('menu-open');
          }
        }
      }); // Close menu when clicking on a link

      var mobileLinks = navLinks.querySelectorAll('a');
      mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('active');
          burger.classList.remove('active');
          document.body.style.overflow = 'auto';

          if (header) {
            header.classList.remove('menu-open');
          }
        });
      });
    }
  } // ================= HERO SLIDER =================


  function initHeroSlider() {
    var heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.slider-dot');
    var prevBtn = document.querySelector('.slider-prev');
    var nextBtn = document.querySelector('.slider-next');
    var progressBar = document.querySelector('.progress-bar'); // Check if there are any slides

    if (slides.length === 0) {
      console.warn('No slides found in hero slider');
      return;
    }

    var currentSlide = 0;
    var slideInterval;
    var slideDuration = 2000;

    function nextSlide() {
      // Calculate next slide index
      var nextIndex = (currentSlide + 1) % slides.length;
      goToSlide(nextIndex);
    }

    function prevSlide() {
      // Calculate previous slide index
      var prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(prevIndex);
    }

    function goToSlide(n) {
      // Validate the slide index
      if (n < 0 || n >= slides.length || isNaN(n)) {
        console.error('Invalid slide index:', n);
        return;
      } // Remove active class from all slides and dots


      slides.forEach(function (slide) {
        return slide.classList.remove('active');
      });

      if (dots.length > 0) {
        dots.forEach(function (dot) {
          return dot.classList.remove('active');
        });
      } // Add active class to current slide and dot


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

        progressBar.style.animation = "progress ".concat(slideDuration, "ms linear");
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
    } // Event listeners


    heroSlider.addEventListener('mouseenter', stopAutoplay);
    heroSlider.addEventListener('mouseleave', function () {
      startAutoplay();
      if (progressBar) progressBar.style.animationPlayState = 'running';
    });

    if (dots.length > 0) {
      dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
          goToSlide(index);
          startAutoplay();
        });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        startAutoplay();
      });
    } // Keyboard navigation


    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    }); // Touch support

    var touchStartX = 0;
    var touchStartY = 0;
    heroSlider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      stopAutoplay();
    });
    heroSlider.addEventListener('touchmove', function (e) {
      e.preventDefault(); // Prevent scrolling while swiping
    });
    heroSlider.addEventListener('touchend', function (e) {
      var touchEndX = e.changedTouches[0].screenX;
      var touchEndY = e.changedTouches[0].screenY;
      var diffX = touchStartX - touchEndX;
      var diffY = touchStartY - touchEndY; // Only trigger slide change if horizontal swipe is dominant

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      startAutoplay();
    }); // Initialize first slide

    goToSlide(0);
    startAutoplay();
  } // ================= SCROLL TO TOP =================


  function initScrollToTop() {
    var scrollButton = document.getElementById('scrollToTop');

    if (scrollButton) {
      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
          scrollButton.classList.add('visible');
        } else {
          scrollButton.classList.remove('visible');
        }
      });
      scrollButton.addEventListener('click', function () {
        var _this = this;

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        this.style.transform = 'scale(0.9)';
        setTimeout(function () {
          _this.style.transform = 'scale(1)';
        }, 150);
      });
    }
  } // ================= FLOATING BUTTONS =================


  function initFloatingButtons() {
    var floatWhatsApp = document.querySelector('.float-whatsapp');

    if (floatWhatsApp) {
      var lastScrollTop = 0;
      window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 200) {
          floatWhatsApp.style.opacity = '0';
          floatWhatsApp.style.transform = 'translateY(20px)';
        } else {
          floatWhatsApp.style.opacity = '1';
          floatWhatsApp.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
      }); // Click animation

      floatWhatsApp.addEventListener('mousedown', function () {
        this.style.transform = 'scale(0.9) translateY(0)';
      });
      floatWhatsApp.addEventListener('mouseup', function () {
        this.style.transform = 'scale(1) translateY(0)';
      });
      floatWhatsApp.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
      });
    }
  } // ================= SCROLL ANIMATIONS =================


  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('[data-aos]');

    function checkScroll() {
      animatedElements.forEach(function (element) {
        var elementTop = element.getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('aos-animate');
        } else {
          element.classList.remove('aos-animate');
        }
      });
    } // Add initial classes


    animatedElements.forEach(function (element) {
      element.classList.add('aos-init');
    });
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();
  } // ================= TESTIMONIALS SLIDER =================


  function initTestimonialsSlider() {
    var testimonialSlides = document.querySelectorAll('.testimonial-slide');
    var testimonialDots = document.querySelectorAll('.testimonial-dot');
    if (testimonialSlides.length === 0) return;
    var currentTestimonial = 0;
    var testimonialInterval;

    function showTestimonial(n) {
      // Validate index
      if (n < 0 || n >= testimonialSlides.length) return;
      testimonialSlides.forEach(function (slide) {
        return slide.classList.remove('active');
      });
      testimonialDots.forEach(function (dot) {
        return dot.classList.remove('active');
      });
      currentTestimonial = n;
      testimonialSlides[currentTestimonial].classList.add('active');
      testimonialDots[currentTestimonial].classList.add('active');
    }

    function nextTestimonial() {
      var nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
      showTestimonial(nextIndex);
    }

    function startTestimonialAutoplay() {
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    if (testimonialDots.length > 0) {
      testimonialDots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
          showTestimonial(index);
          startTestimonialAutoplay();
        });
      });
    }

    var testimonialContainer = document.querySelector('.testimonials-slider');

    if (testimonialContainer) {
      testimonialContainer.addEventListener('mouseenter', function () {
        clearInterval(testimonialInterval);
      });
      testimonialContainer.addEventListener('mouseleave', function () {
        startTestimonialAutoplay();
      });
    } // Initialize first testimonial


    showTestimonial(0);
    startTestimonialAutoplay();
  } // ================= ACTIVE NAV LINK SCROLL =================


  function initActiveNavScroll() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (sections.length === 0 || navLinks.length === 0) return;
    window.addEventListener('scroll', function () {
      var current = '';
      sections.forEach(function (section) {
        var sectionTop = section.offsetTop;

        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(function (link) {
        link.classList.remove('active');

        if (link.getAttribute('href') === "#".concat(current)) {
          link.classList.add('active');
        }
      });
    });
  } // ================= COUNTER ANIMATIONS =================


  function initCounters() {
    var counters = document.querySelectorAll('.about-stats .stat h3');
    if (counters.length === 0) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var counter = entry.target.querySelector('h3');

          if (counter && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
          }
        }
      });
    }, {
      threshold: 0.5
    });
    document.querySelectorAll('.about-stats .stat').forEach(function (stat) {
      observer.observe(stat);
    });

    function animateCounter(counter) {
      var target = parseInt(counter.textContent.replace('+', ''));
      var duration = 2000;
      var increment = target / (duration / 16);
      var current = 0;
      var timer = setInterval(function () {
        current += increment;

        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        counter.textContent = target >= 100 ? "".concat(Math.floor(current), "+") : Math.floor(current);
      }, 16);
    }
  } // ================= RIPPLE EFFECT =================


  function initRippleEffect() {
    var buttons = document.querySelectorAll('.ripple');
    buttons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.left = "".concat(x, "px");
        ripple.style.top = "".concat(y, "px");
        this.appendChild(ripple);
        setTimeout(function () {
          ripple.remove();
        }, 600);
      });
    });
  } // ================= FORM VALIDATION =================


  function initFormValidation() {
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var _this2 = this;

        var requiredFields = this.querySelectorAll('[required]');
        var isValid = true;
        requiredFields.forEach(function (field) {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            field.addEventListener('input', function () {
              this.classList.remove('error');
            });
          }
        });

        if (!isValid) {
          e.preventDefault();
          this.classList.add('shake');
          setTimeout(function () {
            _this2.classList.remove('shake');
          }, 500);
        }
      });
    });
  } // ================= SMOOTH SCROLL =================


  function initSmoothScroll() {
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          navLinks.forEach(function (l) {
            return l.classList.remove('active');
          });
          this.classList.add('active');
        }
      });
    });
  } // ================= LAZY LOADING =================


  function initLazyLoading() {
    var images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function (img) {
      img.addEventListener('load', function () {
        this.classList.add('loaded');
      });
    });
  } // ================= INITIALIZE EVERYTHING =================


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
    initLazyLoading(); // Add current year to footer

    var currentYearElement = document.getElementById('currentYear');

    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    } // Add custom styles


    addCustomStyles();
  }

  function addCustomStyles() {
    var style = document.createElement('style');
    style.textContent = "\n            .ripple {\n                position: relative;\n                overflow: hidden;\n            }\n            \n            .ripple-effect {\n                position: absolute;\n                border-radius: 50%;\n                background: rgba(255, 255, 255, 0.6);\n                transform: scale(0);\n                animation: ripple-animation 0.6s linear;\n                pointer-events: none;\n            }\n            \n            @keyframes ripple-animation {\n                to {\n                    transform: scale(4);\n                    opacity: 0;\n                }\n            }\n            \n            .error {\n                border-color: var(--error) !important;\n                animation: shake 0.5s ease;\n            }\n            \n            @keyframes shake {\n                0%, 100% { transform: translateX(0); }\n                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }\n                20%, 40%, 60%, 80% { transform: translateX(5px); }\n            }\n            \n            .shake {\n                animation: shake 0.5s ease;\n            }\n            \n            .menu-open {\n                background: rgba(255, 255, 255, 0.98) !important;\n            }\n            \n            .dark-theme .menu-open {\n                background: rgba(26, 26, 26, 0.98) !important;\n            }\n            \n            .img-zoom {\n                transition: transform 0.5s ease;\n            }\n            \n            .img-zoom:hover {\n                transform: scale(1.05);\n            }\n            \n            .step-number.bounce {\n                animation: bounce 0.5s ease;\n            }\n            \n            @keyframes bounce {\n                0%, 20%, 50%, 80%, 100% {transform: translateY(0);}\n                40% {transform: translateY(-10px);}\n                60% {transform: translateY(-5px);}\n            }\n            \n            .progress-bar {\n                width: 100%;\n                height: 3px;\n                background: linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%);\n                animation: progress 2000ms linear infinite;\n                position: absolute;\n                bottom: 0;\n                left: 0;\n            }\n            \n            @keyframes progress {\n                0% { width: 0%; }\n                100% { width: 100%; }\n            }\n        ";
    document.head.appendChild(style);
  } // Initialize everything


  initAll(); // Handle page transition

  var pageTransition = document.querySelector('.page-transition');

  if (pageTransition) {
    setTimeout(function () {
      pageTransition.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 800);
  }

  window.addEventListener('load', function () {
    var pageTransition = document.querySelector('.page-transition');

    if (pageTransition) {
      setTimeout(function () {
        pageTransition.style.display = 'none';
      }, 1000);
    }
  });
});
//# sourceMappingURL=home.dev.js.map
