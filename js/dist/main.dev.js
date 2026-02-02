"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// =============================
// Tn-QA Delivery - Main Script (Optimized)
// =============================
document.addEventListener("DOMContentLoaded", function () {
  /* ================= SET CURRENT YEAR IN FOOTER ================= */
  var currentYearElement = document.getElementById('currentYear');

  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  /* ================= HERO SLIDER IMPLEMENTATION ================= */


  var HeroSlider =
  /*#__PURE__*/
  function () {
    function HeroSlider() {
      _classCallCheck(this, HeroSlider);

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

    _createClass(HeroSlider, [{
      key: "init",
      value: function init() {
        if (this.slides.length === 0) return;
        this.setupEventListeners();
        this.startSlideShow();
        this.preloadSlides();
      }
    }, {
      key: "setupEventListeners",
      value: function setupEventListeners() {
        var _this = this;

        if (this.prevBtn) {
          this.prevBtn.addEventListener('click', function () {
            return _this.showPrevSlide();
          });
        }

        if (this.nextBtn) {
          this.nextBtn.addEventListener('click', function () {
            return _this.showNextSlide();
          });
        }

        this.dots.forEach(function (dot, index) {
          dot.addEventListener('click', function () {
            return _this.goToSlide(index);
          });
        });

        if (this.slider) {
          this.slider.addEventListener('mouseenter', function () {
            return _this.pauseSlideShow();
          });
          this.slider.addEventListener('mouseleave', function () {
            return _this.startSlideShow();
          });
        }

        document.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowLeft') _this.showPrevSlide();
          if (e.key === 'ArrowRight') _this.showNextSlide();
          if (e.key === 'Escape') _this.pauseSlideShow();
        });
        this.setupTouchEvents();
        document.addEventListener('visibilitychange', function () {
          if (document.hidden) {
            _this.pauseSlideShow();
          } else {
            _this.startSlideShow();
          }
        });
      }
    }, {
      key: "setupTouchEvents",
      value: function setupTouchEvents() {
        var _this2 = this;

        if (!this.slider) return;
        this.slider.addEventListener('touchstart', function (e) {
          _this2.touchStartX = e.changedTouches[0].screenX;

          _this2.pauseSlideShow();
        });
        this.slider.addEventListener('touchend', function (e) {
          _this2.touchEndX = e.changedTouches[0].screenX;

          _this2.handleSwipe();

          _this2.startSlideShow();
        });
      }
    }, {
      key: "handleSwipe",
      value: function handleSwipe() {
        var swipeThreshold = 50;
        var diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            this.showNextSlide();
          } else {
            this.showPrevSlide();
          }
        }
      }
    }, {
      key: "goToSlide",
      value: function goToSlide(n) {
        var _this3 = this;

        if (this.isAnimating) return;
        this.isAnimating = true;
        this.resetProgressBar();
        var currentSlideEl = this.slides[this.currentSlide];
        var currentDot = this.dots[this.currentSlide];

        if (currentSlideEl) {
          currentSlideEl.classList.remove('active');
          currentSlideEl.style.opacity = '0';
        }

        if (currentDot) {
          currentDot.classList.remove('active');
        }

        this.previousSlide = this.currentSlide;
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        this.animateSlideTransition(function () {
          var newSlide = _this3.slides[_this3.currentSlide];
          var newDot = _this3.dots[_this3.currentSlide];

          if (newSlide) {
            newSlide.classList.add('active');
          }

          if (newDot) {
            newDot.classList.add('active');
          }

          _this3.startProgressBar();

          _this3.isAnimating = false;
        });
      }
    }, {
      key: "animateSlideTransition",
      value: function animateSlideTransition(callback) {
        var newSlide = this.slides[this.currentSlide];
        var oldSlide = this.slides[this.previousSlide];

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

        setTimeout(function () {
          newSlide.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          newSlide.style.opacity = '1';
          setTimeout(function () {
            if (oldSlide) {
              oldSlide.style.transition = '';
              oldSlide.style.opacity = '';
            }

            newSlide.style.transition = '';
            if (callback) callback();
          }, 800);
        }, 50);
      }
    }, {
      key: "showNextSlide",
      value: function showNextSlide() {
        this.goToSlide(this.currentSlide + 1);
      }
    }, {
      key: "showPrevSlide",
      value: function showPrevSlide() {
        this.goToSlide(this.currentSlide - 1);
      }
    }, {
      key: "startSlideShow",
      value: function startSlideShow() {
        var _this4 = this;

        if (this.slideInterval) {
          clearInterval(this.slideInterval);
        }

        this.slideInterval = setInterval(function () {
          _this4.showNextSlide();
        }, this.slideDuration);
        this.startProgressBar();
      }
    }, {
      key: "pauseSlideShow",
      value: function pauseSlideShow() {
        if (this.slideInterval) {
          clearInterval(this.slideInterval);
          this.slideInterval = null;
        }

        this.pauseProgressBar();
      }
    }, {
      key: "startProgressBar",
      value: function startProgressBar() {
        var _this5 = this;

        if (!this.progressBar) return;
        this.progressBar.style.width = '0%';
        this.progressBar.style.transition = "width ".concat(this.slideDuration, "ms linear");
        void this.progressBar.offsetWidth;
        setTimeout(function () {
          _this5.progressBar.style.width = '100%';
        }, 10);
      }
    }, {
      key: "pauseProgressBar",
      value: function pauseProgressBar() {
        if (!this.progressBar) return;
        var computedStyle = window.getComputedStyle(this.progressBar);
        var width = computedStyle.getPropertyValue('width');
        this.progressBar.style.width = width;
        this.progressBar.style.transition = 'none';
      }
    }, {
      key: "resetProgressBar",
      value: function resetProgressBar() {
        if (!this.progressBar) return;
        this.progressBar.style.width = '0%';
        this.progressBar.style.transition = 'none';
      }
    }, {
      key: "preloadSlides",
      value: function preloadSlides() {
        this.slides.forEach(function (slide) {
          var bgImage = slide.querySelector('.slide-bg');

          if (bgImage) {
            var bgStyle = bgImage.style.backgroundImage;

            if (bgStyle && bgStyle.includes('url')) {
              var img = new Image();
              img.src = bgStyle.replace('url("', '').replace('")', '');
            }
          }
        });
      }
    }]);

    return HeroSlider;
  }(); // Initialize slider


  var heroSlider = new HeroSlider();
  /* ================= FIXED SMOOTH NAVIGATION ================= */

  var SmoothNavigation =
  /*#__PURE__*/
  function () {
    function SmoothNavigation() {
      _classCallCheck(this, SmoothNavigation);

      this.header = document.getElementById("mainHeader");
      this.navLinks = document.querySelectorAll(".nav-link");
      this.indicator = document.getElementById("indicator");
      this.burger = document.getElementById("burger");
      this.navMenu = document.querySelector(".nav-links");
      this.scrollToTopBtn = document.getElementById("scrollToTop"); // this.navbarHeight = this.header?.offsetHeight || 80;

      this.lastScrollTop = 0;
      this.isMobileMenuOpen = false;
      this.init();
    }

    _createClass(SmoothNavigation, [{
      key: "init",
      value: function init() {
        this.setupScrollEffects();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollToTopButton();
        this.setupSmoothScrolling();
      }
    }, {
      key: "setupScrollEffects",
      value: function setupScrollEffects() {
        var _this6 = this;

        var scrollTimeout;
        window.addEventListener('scroll', function () {
          if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {
              _this6.handleNavbarScroll();

              _this6.updateScrollToTopButton();

              _this6.updateActiveNavOnScroll();

              scrollTimeout = null;
            }, 80);
          }
        }, {
          passive: true
        });
      }
    }, {
      key: "handleNavbarScroll",
      value: function handleNavbarScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
    }, {
      key: "setupNavigation",
      value: function setupNavigation() {
        var _this7 = this;

        var activeLink = document.querySelector(".nav-link.active");

        if (activeLink && this.indicator) {
          this.moveIndicator(activeLink);
        }

        this.navLinks.forEach(function (link) {
          link.addEventListener("click", function (e) {
            return _this7.handleNavClick(e, link);
          });
        });
      }
    }, {
      key: "handleNavClick",
      value: function handleNavClick(e, link) {
        var href = link.getAttribute("href"); // إذا كان الرابط ليس رابطًا داخليًا (ليس بـ #) فلا نمنع السلوك الافتراضي

        if (!href || !href.startsWith('#')) {
          // السماح للرابط بالعمل بشكل طبيعي
          return;
        } // فقط للروابط الداخلية نمنع السلوك الافتراضي


        e.preventDefault();
        this.navLinks.forEach(function (l) {
          return l.classList.remove("active");
        });
        link.classList.add("active");
        this.moveIndicator(link);

        if (this.isMobileMenuOpen) {
          this.closeMobileMenu();
        }

        this.scrollToSection(href);
      }
    }, {
      key: "moveIndicator",
      value: function moveIndicator(element) {
        if (!this.indicator || !element) return;
        var rect = element.getBoundingClientRect();
        var parent = element.parentElement.getBoundingClientRect();
        var left = rect.left - parent.left;
        var width = rect.width;
        this.indicator.style.left = left + "px";
        this.indicator.style.width = width + "px";
        this.indicator.style.opacity = "1";
      }
    }, {
      key: "scrollToSection",
      value: function scrollToSection(targetID) {
        var target = document.querySelector(targetID);
        if (!target) return;
        var headerOffset = this.navbarHeight + 10;
        var targetPosition = target.offsetTop - headerOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, {
      key: "updateActiveNavOnScroll",
      value: function updateActiveNavOnScroll() {
        var _this8 = this;

        var scrollPos = window.scrollY + this.navbarHeight + 100;
        this.navLinks.forEach(function (link) {
          var href = link.getAttribute("href");
          if (!href || !href.startsWith('#')) return;
          var section = document.querySelector(href);
          if (!section) return;
          var sectionTop = section.offsetTop;
          var sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            _this8.navLinks.forEach(function (l) {
              return l.classList.remove("active");
            });

            link.classList.add("active");

            _this8.moveIndicator(link);
          }
        });
      }
    }, {
      key: "setupMobileMenu",
      value: function setupMobileMenu() {
        var _this9 = this;

        if (!this.burger || !this.navMenu) return;
        this.burger.addEventListener("click", function (e) {
          e.stopPropagation();

          _this9.toggleMobileMenu();
        });
        this.navLinks.forEach(function (link) {
          link.addEventListener('click', function () {
            if (_this9.isMobileMenuOpen) {
              _this9.closeMobileMenu();
            }
          });
        });
        document.addEventListener("click", function (e) {
          if (_this9.isMobileMenuOpen && !_this9.navMenu.contains(e.target) && !_this9.burger.contains(e.target)) {
            _this9.closeMobileMenu();
          }
        });
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && _this9.isMobileMenuOpen) {
            _this9.closeMobileMenu();
          }
        });
        window.addEventListener("resize", function () {
          if (window.innerWidth > 1024 && _this9.isMobileMenuOpen) {
            _this9.closeMobileMenu();
          }
        });
      }
    }, {
      key: "toggleMobileMenu",
      value: function toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;

        if (this.isMobileMenuOpen) {
          this.openMobileMenu();
        } else {
          this.closeMobileMenu();
        }
      }
    }, {
      key: "openMobileMenu",
      value: function openMobileMenu() {
        this.burger.classList.add("active");
        this.navMenu.classList.add("active");
        document.body.style.overflow = "hidden";
        this.isMobileMenuOpen = true;
      }
    }, {
      key: "closeMobileMenu",
      value: function closeMobileMenu() {
        this.burger.classList.remove("active");
        this.navMenu.classList.remove("active");
        document.body.style.overflow = "auto";
        this.isMobileMenuOpen = false;
      }
    }, {
      key: "setupScrollToTopButton",
      value: function setupScrollToTopButton() {
        var _this10 = this;

        if (!this.scrollToTopBtn) return;
        this.scrollToTopBtn.addEventListener('click', function (e) {
          e.preventDefault();

          _this10.scrollToTop();
        });
      }
    }, {
      key: "updateScrollToTopButton",
      value: function updateScrollToTopButton() {
        if (!this.scrollToTopBtn) return;

        if (window.pageYOffset > 300) {
          this.scrollToTopBtn.classList.add('visible');
        } else {
          this.scrollToTopBtn.classList.remove('visible');
        }
      }
    }, {
      key: "scrollToTop",
      value: function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, {
      key: "setupSmoothScrolling",
      value: function setupSmoothScrolling() {
        var _this11 = this;

        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
          anchor.addEventListener('click', function (e) {
            var href = anchor.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);

            if (target) {
              e.preventDefault();

              _this11.scrollToSection(href);
            }
          });
        });
      }
    }]);

    return SmoothNavigation;
  }(); // Initialize smooth navigation


  var smoothNavigation = new SmoothNavigation();
  /* ================= ENHANCED CONTACT FORM ================= */

  var ContactForm =
  /*#__PURE__*/
  function () {
    function ContactForm() {
      _classCallCheck(this, ContactForm);

      this.form = document.getElementById("messageForm");
      if (!this.form) return;
      this.phoneInput = this.form.querySelector('input[type="tel"]');
      this.submitBtn = this.form.querySelector('.submit-btn');
      this.formMessage = document.getElementById('formMessage');
      this.init();
    }

    _createClass(ContactForm, [{
      key: "init",
      value: function init() {
        if (!this.form) return;
        this.setupFormInputs();
        this.setupFormValidation();
        this.setupPhoneFormatting();
        this.setupFormSubmission();
      }
    }, {
      key: "setupFormInputs",
      value: function setupFormInputs() {
        var inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(function (input, index) {
          if (!input.name) {
            var type = input.type || input.tagName.toLowerCase();
            input.name = "".concat(type, "_").concat(index);
          }
        });
      }
    }, {
      key: "setupFormValidation",
      value: function setupFormValidation() {
        var _this12 = this;

        var inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(function (input) {
          input.addEventListener('blur', function () {
            return _this12.validateField(input);
          });
          input.addEventListener('input', function () {
            return _this12.clearError(input);
          });
        });
      }
    }, {
      key: "validateField",
      value: function validateField(field) {
        var value = field.value.trim();

        if (field.hasAttribute('required') && !value) {
          this.showError(field, 'هذا الحقل مطلوب');
          return false;
        }

        if (field.type === 'tel' && value) {
          var phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;

          if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            this.showError(field, 'يرجى إدخال رقم هاتف صحيح');
            return false;
          }
        }

        if (field.type === 'email' && value) {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailRegex.test(value)) {
            this.showError(field, 'يرجى إدخال بريد إلكتروني صحيح');
            return false;
          }
        }

        return true;
      }
    }, {
      key: "showError",
      value: function showError(field, message) {
        this.clearError(field);
        var errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #ff6b6b; font-size: 0.9rem; margin-top: 5px;';
        field.parentNode.appendChild(errorDiv);
        field.classList.add('error');
      }
    }, {
      key: "clearError",
      value: function clearError(field) {
        var errorDiv = field.parentNode.querySelector('.error-message');

        if (errorDiv) {
          errorDiv.remove();
        }

        field.classList.remove('error');
      }
    }, {
      key: "setupPhoneFormatting",
      value: function setupPhoneFormatting() {
        if (!this.phoneInput) return;
        this.phoneInput.addEventListener('input', function (e) {
          var value = e.target.value.replace(/\D/g, '');

          if (value.length > 0) {
            var formatted = '';

            if (value.startsWith('974')) {
              if (value.length <= 3) {
                formatted = value;
              } else if (value.length <= 6) {
                formatted = "".concat(value.substring(0, 3), " ").concat(value.substring(3));
              } else if (value.length <= 8) {
                formatted = "".concat(value.substring(0, 3), " ").concat(value.substring(3, 6), " ").concat(value.substring(6));
              } else {
                formatted = "".concat(value.substring(0, 3), " ").concat(value.substring(3, 6), " ").concat(value.substring(6, 8), " ").concat(value.substring(8));
              }
            } else if (value.startsWith('216')) {
              if (value.length <= 3) {
                formatted = value;
              } else if (value.length <= 6) {
                formatted = "".concat(value.substring(0, 3), " ").concat(value.substring(3));
              } else if (value.length <= 8) {
                formatted = "".concat(value.substring(0, 3), " ").concat(value.substring(3, 6), " ").concat(value.substring(6));
              } else {
                formatted = "".concat(value.substring(0, 3), " ").concat(value.substring(3, 6), " ").concat(value.substring(6, 8), " ").concat(value.substring(8));
              }
            } else {
              if (value.length <= 4) {
                formatted = value;
              } else if (value.length <= 8) {
                formatted = "".concat(value.substring(0, 4), " ").concat(value.substring(4));
              } else {
                formatted = "".concat(value.substring(0, 4), " ").concat(value.substring(4, 8), " ").concat(value.substring(8));
              }
            }

            e.target.value = formatted;
          }
        });
      }
    }, {
      key: "setupFormSubmission",
      value: function setupFormSubmission() {
        var _this13 = this;

        this.form.addEventListener("submit", function (e) {
          return _this13.handleSubmit(e);
        });
      }
    }, {
      key: "handleSubmit",
      value: function handleSubmit(e) {
        var _this14 = this;

        var inputs, isValid, formData, formObject, name, phone, email, service, message, currentLang, whatsappMessage;
        return regeneratorRuntime.async(function handleSubmit$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
                isValid = true;
                inputs.forEach(function (input) {
                  if (!_this14.validateField(input)) {
                    isValid = false;
                  }
                });

                if (isValid) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return");

              case 6:
                formData = new FormData(this.form);
                formObject = {};
                formData.forEach(function (value, key) {
                  formObject[key] = value.trim();
                });
                name = formObject.name || '';
                phone = formObject.phone || formObject.tel_1 || '';
                email = formObject.email || '';
                service = formObject.service || '';
                message = formObject.message || formObject.textarea_4 || '';
                currentLang = localStorage.getItem('language') || 'ar';
                whatsappMessage = this.createWhatsAppMessage(name, phone, email, service, message, currentLang);
                this.showLoading();
                setTimeout(function () {
                  var whatsappNumber = "97431691024";
                  var whatsappUrl = "https://wa.me/".concat(whatsappNumber, "?text=").concat(encodeURIComponent(whatsappMessage));
                  window.open(whatsappUrl, '_blank');

                  _this14.showSuccess();

                  setTimeout(function () {
                    _this14.resetForm();
                  }, 3000);
                }, 1000);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "createWhatsAppMessage",
      value: function createWhatsAppMessage(name, phone, email, service, message, lang) {
        if (lang === 'en') {
          return "\uD83D\uDE97 New Service Request from Tn-QA Delivery%0A%0A" + "\uD83D\uDC64 *Name:* ".concat(name, "%0A") + "\uD83D\uDCDE *Phone:* ".concat(phone, "%0A") + (email ? "\uD83D\uDCE7 *Email:* ".concat(email, "%0A") : '') + (service ? "\uD83D\uDEE0\uFE0F *Service:* ".concat(service, "%0A") : '') + "%0A\uD83D\uDCDD *Message:*%0A".concat(message, "%0A%0A") + "\uD83D\uDCCD *Source:* Tn-QA Delivery Website";
        } else {
          return "\uD83D\uDE97 \u0637\u0644\u0628 \u062E\u062F\u0645\u0629 \u062C\u062F\u064A\u062F\u0629 \u0645\u0646 Tn-QA Delivery%0A%0A" + "\uD83D\uDC64 *\u0627\u0644\u0627\u0633\u0645:* ".concat(name, "%0A") + "\uD83D\uDCDE *\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641:* ".concat(phone, "%0A") + (email ? "\uD83D\uDCE7 *\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A:* ".concat(email, "%0A") : '') + (service ? "\uD83D\uDEE0\uFE0F *\u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:* ".concat(service, "%0A") : '') + "%0A\uD83D\uDCDD *\u0627\u0644\u0631\u0633\u0627\u0644\u0629:*%0A".concat(message, "%0A%0A") + "\uD83D\uDCCD *\u0627\u0644\u0645\u0635\u062F\u0631:* \u0645\u0648\u0642\u0639 Tn-QA Delivery";
        }
      }
    }, {
      key: "showLoading",
      value: function showLoading() {
        if (!this.submitBtn) return;
        var originalHTML = this.submitBtn.innerHTML;
        this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        this.submitBtn.disabled = true;
        this.submitBtn.classList.add('loading');
        this.submitBtn.dataset.originalHtml = originalHTML;
      }
    }, {
      key: "showSuccess",
      value: function showSuccess() {
        if (!this.submitBtn || !this.formMessage) return;
        var currentLang = localStorage.getItem('language') || 'ar';

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
    }, {
      key: "resetForm",
      value: function resetForm() {
        if (!this.form || !this.submitBtn) return;
        this.form.reset();
        var originalHTML = this.submitBtn.dataset.originalHtml;

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

        var errors = this.form.querySelectorAll('.error-message');
        errors.forEach(function (error) {
          return error.remove();
        });
        var errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(function (field) {
          return field.classList.remove('error');
        });
      }
    }]);

    return ContactForm;
  }(); // Initialize contact form


  var contactForm = new ContactForm();
  /* ================= ADDITIONAL ENHANCEMENTS ================= */

  var AdditionalEnhancements =
  /*#__PURE__*/
  function () {
    function AdditionalEnhancements() {
      _classCallCheck(this, AdditionalEnhancements);

      this.init();
    }

    _createClass(AdditionalEnhancements, [{
      key: "init",
      value: function init() {
        this.setupLazyLoading();
        this.setupHoverEffects();
        this.setupRippleEffects();
      }
    }, {
      key: "setupLazyLoading",
      value: function setupLazyLoading() {
        var images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(function (img) {
          img.addEventListener('load', function () {
            img.classList.add('loaded');
          });
        });
      }
    }, {
      key: "setupHoverEffects",
      value: function setupHoverEffects() {
        var serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(function (card) {
          card.addEventListener('mouseenter', function () {
            var icon = card.querySelector('.service-icon');

            if (icon) {
              icon.style.transform = 'rotate(360deg) scale(1.1)';
            }
          });
          card.addEventListener('mouseleave', function () {
            var icon = card.querySelector('.service-icon');

            if (icon) {
              icon.style.transform = 'rotate(0) scale(1)';
            }
          });
        });
      }
    }, {
      key: "setupRippleEffects",
      value: function setupRippleEffects() {
        var _this15 = this;

        var buttons = document.querySelectorAll('.btn, .method-btn, .service-btn, .nav-cta, .service-phone-btn');
        buttons.forEach(function (btn) {
          btn.addEventListener('click', function (e) {
            _this15.createRippleEffect(e, btn);
          });
        });
      }
    }, {
      key: "createRippleEffect",
      value: function createRippleEffect(event, button) {
        var ripple = document.createElement('span');
        var rect = button.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var x = event.clientX - rect.left - size / 2;
        var y = event.clientY - rect.top - size / 2;
        ripple.style.cssText = "\n                position: absolute;\n                border-radius: 50%;\n                background: rgba(255, 255, 255, 0.7);\n                transform: scale(0);\n                animation: ripple 0.6s linear;\n                width: ".concat(size, "px;\n                height: ").concat(size, "px;\n                top: ").concat(y, "px;\n                left: ").concat(x, "px;\n                pointer-events: none;\n            ");
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        setTimeout(function () {
          ripple.remove();
        }, 600);
      }
    }]);

    return AdditionalEnhancements;
  }(); // Initialize additional enhancements


  var additionalEnhancements = new AdditionalEnhancements();
  /* ================= CSS ANIMATIONS ================= */

  var CSSAnimations =
  /*#__PURE__*/
  function () {
    function CSSAnimations() {
      _classCallCheck(this, CSSAnimations);

      this.init();
    }

    _createClass(CSSAnimations, [{
      key: "init",
      value: function init() {
        this.addAnimationStyles();
        this.setupSocialIconAnimations();
      }
    }, {
      key: "addAnimationStyles",
      value: function addAnimationStyles() {
        var style = document.createElement('style');
        style.textContent = "\n                @keyframes ripple {\n                    to {\n                        transform: scale(4);\n                        opacity: 0;\n                    }\n                }\n                \n                @keyframes bounce {\n                    0%, 100% {\n                        transform: translateY(0);\n                    }\n                    50% {\n                        transform: translateY(-10px);\n                    }\n                }\n            ";
        document.head.appendChild(style);
      }
    }, {
      key: "setupSocialIconAnimations",
      value: function setupSocialIconAnimations() {
        var socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(function (icon) {
          icon.addEventListener('mouseenter', function () {
            icon.style.animation = 'bounce 0.5s ease';
          });
          icon.addEventListener('animationend', function () {
            icon.style.animation = '';
          });
        });
      }
    }]);

    return CSSAnimations;
  }(); // Initialize CSS animations


  var cssAnimations = new CSSAnimations();
  /* ================= INITIALIZATION COMPLETE ================= */

  console.log(' Tn-QA Delivery - Enhanced Script loaded successfully');
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.body.classList.add('loaded');
    }, 100);
  });
});
//# sourceMappingURL=main.dev.js.map
