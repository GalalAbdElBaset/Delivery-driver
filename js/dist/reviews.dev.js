"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ================= DOM ELEMENTS =================
var pageTransition = document.querySelector('.page-transition');
var navLinks = document.querySelector('#navLinks');
var burger = document.querySelector('#burger');
var themeToggle = document.querySelector('#themeToggle');
var floatThemeToggle = document.querySelector('#floatThemeToggle');
var langBtn = document.querySelector('#langBtn');
var langDropdown = document.querySelector('#langDropdown');
var currentLang = document.querySelector('#currentLang');
var scrollToTop = document.querySelector('#scrollToTop');
var reviewForm = document.querySelector('#reviewForm');
var starsInput = document.querySelectorAll('.star-input');
var ratingValue = document.querySelector('#ratingValue');
var loadMoreBtn = document.querySelector('#loadMoreBtn');
var reviewsGrid = document.querySelector('#reviewsGrid');
var filterButtons = document.querySelectorAll('.filter-btn');
var searchBox = document.querySelector('.search-box input'); // ================= WHATSAPP CONFIGURATION =================

var WHATSAPP_CONFIG = {
  PHONE_NUMBER: '+21656471550',
  BUSINESS_NUMBER: '+21656471550',
  DEFAULT_MESSAGE: 'مرحباً، أود إرسال مراجعة جديدة:'
}; // ================= PAGE TRANSITION =================

document.addEventListener('DOMContentLoaded', function () {
  // إخفاء انتقال الصفحة بعد التحميل
  setTimeout(function () {
    if (pageTransition) {
      pageTransition.classList.add('hidden');
    }
  }, 800);
  setTimeout(function () {
    if (pageTransition) {
      pageTransition.style.display = 'none';
    }
  }, 1400); // تهيئة السنة الحالية في الفوتر

  document.getElementById('currentYear').textContent = new Date().getFullYear(); // تهيئة جميع الوظائف

  initNavigation();
  initThemeSwitcher();
  initLanguageSwitcher();
  initReviewForm();
  initReviewsFilter();
  initScrollToTop();
  initAnimations(); // عرض المراجعات المحفوظة محلياً

  displayLocalReviews();
}); // ================= NAVIGATION MENU =================

function initNavigation() {
  if (burger) {
    burger.addEventListener('click', function () {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');

      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  var navLinkItems = document.querySelectorAll('.nav-link');
  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  document.addEventListener('click', function (event) {
    if (navLinks.classList.contains('active') && !event.target.closest('.nav-links') && !event.target.closest('.burger')) {
      navLinks.classList.remove('active');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
} // ================= THEME SWITCHER =================


function initThemeSwitcher() {
  var savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  if (floatThemeToggle) {
    floatThemeToggle.addEventListener('click', function () {
      var currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    document.querySelectorAll('.theme-btn i').forEach(function (icon) {
      icon.className = 'fas fa-moon';
    });
    document.querySelectorAll('.theme-text').forEach(function (text) {
      text.textContent = 'داكن';
    });

    if (floatThemeToggle) {
      floatThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-theme');
    document.querySelectorAll('.theme-btn i').forEach(function (icon) {
      icon.className = 'fas fa-sun';
    });
    document.querySelectorAll('.theme-text').forEach(function (text) {
      text.textContent = 'فاتح';
    });

    if (floatThemeToggle) {
      floatThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    localStorage.setItem('theme', 'light');
  }
} // ================= LANGUAGE SWITCHER =================


function initLanguageSwitcher() {
  var savedLang = localStorage.getItem('language') || 'ar';
  setLanguage(savedLang);

  if (langBtn) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });
  }

  var langOptions = document.querySelectorAll('.lang-option-nav');
  langOptions.forEach(function (option) {
    option.addEventListener('click', function (e) {
      e.preventDefault();
      var lang = this.getAttribute('data-lang');
      setLanguage(lang);
      langDropdown.classList.remove('show');
    });
  });
  document.addEventListener('click', function () {
    if (langDropdown.classList.contains('show')) {
      langDropdown.classList.remove('show');
    }
  });

  if (langDropdown) {
    langDropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
}

function setLanguage(lang) {
  if (lang === 'en') {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';

    if (currentLang) {
      currentLang.textContent = 'English';
    }

    updateTextsForEnglish();
    document.querySelectorAll('.lang-option-nav').forEach(function (option) {
      option.classList.remove('active');

      if (option.getAttribute('data-lang') === 'en') {
        option.classList.add('active');
      }
    });
  } else {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';

    if (currentLang) {
      currentLang.textContent = 'العربية';
    }

    updateTextsForArabic();
    document.querySelectorAll('.lang-option-nav').forEach(function (option) {
      option.classList.remove('active');

      if (option.getAttribute('data-lang') === 'ar') {
        option.classList.add('active');
      }
    });
  }

  localStorage.setItem('language', lang);
}

function updateTextsForEnglish() {
  var pageTitle = document.querySelector('title[data-i18n="reviews.pageTitle"]');
  if (pageTitle) pageTitle.textContent = 'Customer Reviews - Tn-QA Delivery';
  var companyName = document.querySelectorAll('[data-i18n="companyName"]');
  companyName.forEach(function (el) {
    if (el.textContent.includes('Tn-QA Delivery')) return;
    el.textContent = 'Tn-QA Delivery';
  });
  var companySlogan = document.querySelectorAll('[data-i18n="companySlogan"]');
  companySlogan.forEach(function (el) {
    el.textContent = 'Fast and Secure Delivery Service';
  }); // Add other translations as needed
}

function updateTextsForArabic() {
  var pageTitle = document.querySelector('title[data-i18n="reviews.pageTitle"]');
  if (pageTitle) pageTitle.textContent = 'مراجعات العملاء - Tn-QA Delivery';
  var companyName = document.querySelectorAll('[data-i18n="companyName"]');
  companyName.forEach(function (el) {
    el.textContent = 'Tn-QA Delivery';
  });
  var companySlogan = document.querySelectorAll('[data-i18n="companySlogan"]');
  companySlogan.forEach(function (el) {
    el.textContent = 'خدمة توصيل سريعة وآمنة';
  }); // Add other translations as needed
} // ================= REVIEW FORM WITH WHATSAPP =================


function initReviewForm() {
  // إعداد نجوم التقييم مع تحسينات
  initStarRating(); // معالجة إرسال النموذج إلى واتساب

  if (reviewForm) {
    reviewForm.addEventListener('submit', function _callee(e) {
      var formData;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault(); // جمع البيانات

              formData = {
                name: document.getElementById('reviewerName').value.trim(),
                email: document.getElementById('reviewerEmail').value.trim(),
                service: document.getElementById('reviewService').value,
                rating: ratingValue ? parseInt(ratingValue.value) : 0,
                content: document.getElementById('reviewContent').value.trim(),
                date: new Date().toLocaleDateString('ar-SA'),
                time: new Date().toLocaleTimeString('ar-SA'),
                timestamp: Date.now()
              }; // التحقق من البيانات

              if (validateReviewForm(formData)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              // إظهار نافذة تأكيد قبل الإرسال
              showReviewConfirmation(formData, function () {
                // إذا وافق المستخدم، نرسل إلى واتساب
                sendReviewToWhatsApp(formData);
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  }
}

function initStarRating() {
  if (!starsInput || starsInput.length === 0) return; // تهيئة النجوم

  starsInput.forEach(function (star) {
    // النقر على نجمة
    star.addEventListener('click', function () {
      var value = parseInt(this.getAttribute('data-value'));
      updateStarsDisplay(value);

      if (ratingValue) {
        ratingValue.value = value;
      }
    }); // التحويم فوق نجمة

    star.addEventListener('mouseover', function () {
      var value = parseInt(this.getAttribute('data-value'));
      previewStarsDisplay(value);
    }); // مغادرة النجوم

    star.addEventListener('mouseout', function () {
      var currentValue = ratingValue ? parseInt(ratingValue.value) : 0;
      updateStarsDisplay(currentValue);
    });
  });
}

function updateStarsDisplay(rating) {
  starsInput.forEach(function (star, index) {
    var starElement = star.querySelector('i') || star;

    if (index < rating) {
      starElement.className = 'fas fa-star';
      star.classList.add('active');
    } else {
      starElement.className = 'far fa-star';
      star.classList.remove('active');
    }
  });
}

function previewStarsDisplay(rating) {
  starsInput.forEach(function (star, index) {
    var starElement = star.querySelector('i') || star;
    starElement.className = index < rating ? 'fas fa-star' : 'far fa-star';
  });
}

function validateReviewForm(formData) {
  // التحقق من التقييم
  if (formData.rating < 1 || formData.rating > 5) {
    showAlert('الرجاء اختيار تقييم من 1 إلى 5 نجوم', 'error');
    return false;
  } // التحقق من الحقول المطلوبة


  if (!formData.name || !formData.content || !formData.service) {
    showAlert('الرجاء ملء جميع الحقول المطلوبة', 'error');
    return false;
  } // التحقق من البريد الإلكتروني (إذا تم إدخاله)


  if (formData.email && !isValidEmail(formData.email)) {
    showAlert('البريد الإلكتروني غير صحيح', 'error');
    return false;
  }

  return true;
}

function isValidEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showReviewConfirmation(formData, onConfirm) {
  // إنشاء نافذة تأكيد مخصصة
  var confirmationModal = createConfirmationModal(formData, onConfirm);
  document.body.appendChild(confirmationModal); // منع التمرير

  document.body.style.overflow = 'hidden';
}

function createConfirmationModal(formData, onConfirm) {
  var modal = document.createElement('div');
  modal.className = 'whatsapp-confirmation-modal';
  var serviceName = getServiceName(formData.service);
  var stars = '★'.repeat(formData.rating) + '☆'.repeat(5 - formData.rating);
  modal.innerHTML = "\n        <div class=\"modal-overlay\"></div>\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h3><i class=\"fab fa-whatsapp\"></i> \u062A\u0623\u0643\u064A\u062F \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</h3>\n                <button class=\"modal-close\">&times;</button>\n            </div>\n            \n            <div class=\"modal-body\">\n                <div class=\"confirmation-message\">\n                    <p>\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0645\u0631\u0627\u062C\u0639\u062A\u0643 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628 \u0625\u0644\u0649 \u0627\u0644\u0631\u0642\u0645:</p>\n                    <p class=\"phone-number\">".concat(WHATSAPP_CONFIG.PHONE_NUMBER, "</p>\n                    \n                    <div class=\"review-preview\">\n                        <div class=\"preview-item\">\n                            <span class=\"preview-label\">\u0627\u0644\u0627\u0633\u0645:</span>\n                            <span class=\"preview-value\">").concat(formData.name, "</span>\n                        </div>\n                        ").concat(formData.email ? "\n                        <div class=\"preview-item\">\n                            <span class=\"preview-label\">\u0627\u0644\u0628\u0631\u064A\u062F:</span>\n                            <span class=\"preview-value\">".concat(formData.email, "</span>\n                        </div>\n                        ") : '', "\n                        <div class=\"preview-item\">\n                            <span class=\"preview-label\">\u0627\u0644\u062E\u062F\u0645\u0629:</span>\n                            <span class=\"preview-value\">").concat(serviceName, "</span>\n                        </div>\n                        <div class=\"preview-item\">\n                            <span class=\"preview-label\">\u0627\u0644\u062A\u0642\u064A\u064A\u0645:</span>\n                            <span class=\"preview-value gold-text\">").concat(stars, "</span>\n                        </div>\n                        <div class=\"preview-item full-width\">\n                            <span class=\"preview-label\">\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:</span>\n                            <div class=\"preview-content\">").concat(formData.content, "</div>\n                        </div>\n                    </div>\n                    \n                    <div class=\"whatsapp-notice\">\n                        <i class=\"fas fa-info-circle\"></i>\n                        <p>\u0633\u064A\u062A\u0645 \u0641\u062A\u062D \u0648\u0627\u062A\u0633\u0627\u0628 \u0648\u064A\u062A\u0645 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B. \u062A\u062D\u062A\u0627\u062C \u0641\u0642\u0637 \u0625\u0644\u0649 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0625\u0631\u0633\u0627\u0644.</p>\n                    </div>\n                </div>\n            </div>\n            \n            <div class=\"modal-footer\">\n                <button class=\"btn secondary-btn cancel-btn\">\u0625\u0644\u063A\u0627\u0621</button>\n                <button class=\"btn primary-btn confirm-btn\">\n                    <i class=\"fab fa-whatsapp\"></i> \u0625\u0631\u0633\u0627\u0644 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628\n                </button>\n            </div>\n        </div>\n    "); // إضافة CSS للمودال

  addModalStyles(); // إضافة أحداث

  modal.querySelector('.modal-close').addEventListener('click', function () {
    removeModal(modal);
  });
  modal.querySelector('.modal-overlay').addEventListener('click', function () {
    removeModal(modal);
  });
  modal.querySelector('.cancel-btn').addEventListener('click', function () {
    removeModal(modal);
  });
  modal.querySelector('.confirm-btn').addEventListener('click', function () {
    removeModal(modal);
    onConfirm();
  });
  return modal;
}

function removeModal(modal) {
  modal.style.opacity = '0';
  setTimeout(function () {
    modal.remove();
    document.body.style.overflow = '';
  }, 300);
}

function addModalStyles() {
  if (document.querySelector('#whatsapp-modal-styles')) return;
  var styles = document.createElement('style');
  styles.id = 'whatsapp-modal-styles';
  styles.textContent = "\n        .whatsapp-confirmation-modal {\n            position: fixed;\n            top: 0;\n            right: 0;\n            width: 100%;\n            height: 100%;\n            z-index: 9999;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            animation: fadeIn 0.3s ease;\n        }\n        \n        @keyframes fadeIn {\n            from { opacity: 0; }\n            to { opacity: 1; }\n        }\n        \n        .whatsapp-confirmation-modal .modal-overlay {\n            position: absolute;\n            top: 0;\n            right: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(0, 0, 0, 0.7);\n            backdrop-filter: blur(5px);\n        }\n        \n        .whatsapp-confirmation-modal .modal-content {\n            position: relative;\n            background: var(--white);\n            border-radius: var(--radius-xl);\n            width: 90%;\n            max-width: 500px;\n            max-height: 90vh;\n            overflow-y: auto;\n            box-shadow: var(--shadow-lg);\n            animation: slideUp 0.3s ease;\n            border: 2px solid var(--gold);\n        }\n        \n        body.dark-theme .whatsapp-confirmation-modal .modal-content {\n            background: #1e1e1e;\n        }\n        \n        @keyframes slideUp {\n            from {\n                opacity: 0;\n                transform: translateY(50px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n        \n        .whatsapp-confirmation-modal .modal-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            padding: 20px;\n            border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);\n            color: white;\n            border-radius: var(--radius-xl) var(--radius-xl) 0 0;\n        }\n        \n        .whatsapp-confirmation-modal .modal-header h3 {\n            margin: 0;\n            display: flex;\n            align-items: center;\n            gap: 10px;\n            color: white;\n        }\n        \n        .whatsapp-confirmation-modal .modal-close {\n            background: rgba(255, 255, 255, 0.2);\n            border: none;\n            color: white;\n            font-size: 1.5rem;\n            width: 40px;\n            height: 40px;\n            border-radius: 50%;\n            cursor: pointer;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            transition: all 0.2s;\n        }\n        \n        .whatsapp-confirmation-modal .modal-close:hover {\n            background: rgba(255, 255, 255, 0.3);\n        }\n        \n        .whatsapp-confirmation-modal .modal-body {\n            padding: 20px;\n        }\n        \n        .whatsapp-confirmation-modal .confirmation-message {\n            text-align: center;\n        }\n        \n        .whatsapp-confirmation-modal .phone-number {\n            font-size: 1.3rem;\n            font-weight: bold;\n            color: var(--gold);\n            margin: 10px 0 20px;\n            direction: ltr;\n            display: inline-block;\n            background: rgba(212, 175, 55, 0.1);\n            padding: 8px 15px;\n            border-radius: var(--radius-md);\n        }\n        \n        .whatsapp-confirmation-modal .review-preview {\n            background: var(--gray-light);\n            border-radius: var(--radius-md);\n            padding: 15px;\n            margin: 20px 0;\n            text-align: right;\n        }\n        \n        body.dark-theme .whatsapp-confirmation-modal .review-preview {\n            background: #2d2d2d;\n        }\n        \n        .whatsapp-confirmation-modal .preview-item {\n            display: flex;\n            justify-content: space-between;\n            margin-bottom: 10px;\n            padding-bottom: 10px;\n            border-bottom: 1px dashed rgba(0, 0, 0, 0.1);\n        }\n        \n        .whatsapp-confirmation-modal .preview-item:last-child {\n            border-bottom: none;\n            margin-bottom: 0;\n            padding-bottom: 0;\n        }\n        \n        .whatsapp-confirmation-modal .preview-item.full-width {\n            flex-direction: column;\n            align-items: flex-start;\n        }\n        \n        .whatsapp-confirmation-modal .preview-label {\n            font-weight: bold;\n            color: var(--black);\n            min-width: 80px;\n        }\n        \n        body.dark-theme .whatsapp-confirmation-modal .preview-label {\n            color: #fff;\n        }\n        \n        .whatsapp-confirmation-modal .preview-value {\n            color: var(--gray-dark);\n            text-align: left;\n            flex: 1;\n        }\n        \n        .whatsapp-confirmation-modal .preview-content {\n            background: var(--white);\n            padding: 10px;\n            border-radius: var(--radius-sm);\n            margin-top: 5px;\n            border: 1px solid rgba(0, 0, 0, 0.1);\n            max-height: 150px;\n            overflow-y: auto;\n            text-align: right;\n            line-height: 1.6;\n        }\n        \n        body.dark-theme .whatsapp-confirmation-modal .preview-content {\n            background: #1a1a1a;\n            color: #e0e0e0;\n        }\n        \n        .whatsapp-confirmation-modal .whatsapp-notice {\n            background: rgba(37, 211, 102, 0.1);\n            border: 1px solid rgba(37, 211, 102, 0.2);\n            border-radius: var(--radius-md);\n            padding: 15px;\n            margin-top: 20px;\n            display: flex;\n            align-items: flex-start;\n            gap: 10px;\n        }\n        \n        .whatsapp-confirmation-modal .whatsapp-notice i {\n            color: #25D366;\n            font-size: 1.2rem;\n            margin-top: 2px;\n        }\n        \n        .whatsapp-confirmation-modal .whatsapp-notice p {\n            margin: 0;\n            color: #155724;\n            font-size: 0.9rem;\n            text-align: right;\n        }\n        \n        body.dark-theme .whatsapp-confirmation-modal .whatsapp-notice p {\n            color: #d4edda;\n        }\n        \n        .whatsapp-confirmation-modal .modal-footer {\n            display: flex;\n            justify-content: space-between;\n            padding: 20px;\n            border-top: 1px solid rgba(0, 0, 0, 0.1);\n            gap: 10px;\n        }\n        \n        .whatsapp-confirmation-modal .modal-footer .btn {\n            flex: 1;\n            padding: 12px;\n            font-size: 0.95rem;\n        }\n        \n        .whatsapp-confirmation-modal .confirm-btn {\n            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);\n            color: white;\n            border: none;\n        }\n        \n        .whatsapp-confirmation-modal .confirm-btn:hover {\n            background: linear-gradient(135deg, #128C7E 0%, #25D366 100%);\n            transform: translateY(-2px);\n        }\n        \n        @media (max-width: 576px) {\n            .whatsapp-confirmation-modal .modal-content {\n                width: 95%;\n                margin: 10px;\n            }\n            \n            .whatsapp-confirmation-modal .modal-footer {\n                flex-direction: column;\n            }\n            \n            .whatsapp-confirmation-modal .preview-item {\n                flex-direction: column;\n                align-items: flex-start;\n            }\n            \n            .whatsapp-confirmation-modal .preview-label {\n                margin-bottom: 5px;\n            }\n        }\n    ";
  document.head.appendChild(styles);
}

function getServiceName(serviceId) {
  var services = {
    'local-delivery-qatar': 'التوصيل المحلي في قطر',
    'local-delivery-tunisia': 'التوصيل المحلي في تونس',
    'scale-sales': 'بيع الموازين',
    'scale-booking': 'حجز الموازين',
    'money-delivery': 'توثيق تسليم الأموال'
  };
  return services[serviceId] || serviceId;
}

function sendReviewToWhatsApp(formData) {
  // إنشاء رسالة واتساب مخصصة
  var whatsappMessage = createWhatsAppMessage(formData); // ترميز الرسالة

  var encodedMessage = encodeURIComponent(whatsappMessage); // إنشاء رابط واتساب

  var whatsappUrl = "https://wa.me/".concat(WHATSAPP_CONFIG.PHONE_NUMBER.replace(/\D/g, ''), "?text=").concat(encodedMessage); // عرض حالة التحميل

  showAlert('جاري فتح واتساب...', 'info'); // حفظ المراجعة محلياً أولاً

  saveReviewLocally(formData); // فتح واتساب في نافذة جديدة بعد تأخير قصير

  setTimeout(function () {
    window.open(whatsappUrl, '_blank'); // إعادة تعيين النموذج

    resetReviewForm(); // عرض رسالة النجاح بعد التأخير

    setTimeout(function () {
      showAlert('تم فتح واتساب! الرجاء إرسال الرسالة.', 'success');
    }, 1000);
  }, 500);
}

function createWhatsAppMessage(formData) {
  var serviceName = getServiceName(formData.service);
  var stars = '⭐'.repeat(formData.rating) + '☆'.repeat(5 - formData.rating);
  var dateTime = "".concat(formData.date, " - ").concat(formData.time);
  return "\uD83C\uDFAF *\u0645\u0631\u0627\u062C\u0639\u0629 \u062C\u062F\u064A\u062F\u0629 - Tn-QA Delivery*\n    \n\uD83D\uDC64 *\u0627\u0644\u0645\u0631\u0627\u062C\u0639:* ".concat(formData.name, "\n\uD83D\uDCE7 *\u0627\u0644\u0628\u0631\u064A\u062F:* ").concat(formData.email || 'لم يتم الإدخال', "\n\uD83D\uDCCB *\u0627\u0644\u062E\u062F\u0645\u0629:* ").concat(serviceName, "\n\u2B50 *\u0627\u0644\u062A\u0642\u064A\u064A\u0645:* ").concat(formData.rating, "/5\n").concat(stars, "\n\n\uD83D\uDCDD *\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:*\n\"").concat(formData.content, "\"\n\n\uD83D\uDCC5 *\u0627\u0644\u062A\u0627\u0631\u064A\u062E:* ").concat(dateTime, "\n\n\uD83D\uDD17 *\u0627\u0644\u0645\u0635\u062F\u0631:* ").concat(window.location.href, "\n---\n*\u0647\u0630\u0647 \u0631\u0633\u0627\u0644\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u0645\u0646 \u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A*\n");
}

function saveReviewLocally(review) {
  try {
    var savedReviews = JSON.parse(localStorage.getItem('tnqa_whatsapp_reviews') || '[]');

    var reviewWithId = _objectSpread({}, review, {
      id: Date.now(),
      status: 'sent',
      sent_via: 'whatsapp',
      sent_at: new Date().toISOString()
    });

    savedReviews.push(reviewWithId);
    localStorage.setItem('tnqa_whatsapp_reviews', JSON.stringify(savedReviews));
    console.log('✅ Review saved locally:', reviewWithId);
    return reviewWithId;
  } catch (error) {
    console.error('❌ Error saving review:', error);
    return null;
  }
}

function displayLocalReviews() {
  try {
    var savedReviews = JSON.parse(localStorage.getItem('tnqa_whatsapp_reviews') || '[]');
    console.log('📊 Saved reviews:', savedReviews.length); // يمكنك عرض المراجعات المحفوظة في قسم خاص إذا أردت

    if (savedReviews.length > 0) {
      // إضافة مؤشر في الفوتر
      addReviewsCounter(savedReviews.length);
    }
  } catch (error) {
    console.error('Error loading local reviews:', error);
  }
}

function addReviewsCounter(count) {
  var footer = document.querySelector('.footer-bottom');
  if (!footer) return;
  var counter = document.createElement('div');
  counter.className = 'local-reviews-counter';
  counter.innerHTML = "\n        <i class=\"fas fa-history\"></i>\n        <span>".concat(count, " \u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u062D\u0644\u064A\u0627\u064B</span>\n    "); // إضافة CSS

  var style = document.createElement('style');
  style.textContent = "\n        .local-reviews-counter {\n            background: rgba(212, 175, 55, 0.1);\n            border: 1px solid var(--gold-light);\n            border-radius: var(--radius-md);\n            padding: 10px 15px;\n            margin: 10px auto;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            gap: 10px;\n            max-width: 300px;\n            font-size: 0.9rem;\n            color: var(--gold-dark);\n        }\n        \n        .local-reviews-counter i {\n            color: var(--gold);\n        }\n        \n        @media (max-width: 768px) {\n            .local-reviews-counter {\n                margin: 10px;\n                font-size: 0.8rem;\n            }\n        }\n    ";
  document.head.appendChild(style);
  footer.parentNode.insertBefore(counter, footer);
}

function resetReviewForm() {
  if (reviewForm) {
    reviewForm.reset();
    updateStarsDisplay(0);

    if (ratingValue) {
      ratingValue.value = 0;
    }
  }
}

function showAlert(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  var existingAlert = document.querySelector('.custom-alert');

  if (existingAlert) {
    existingAlert.remove();
  }

  var alert = document.createElement('div');
  alert.className = "custom-alert alert-".concat(type);
  alert.innerHTML = "\n        <div class=\"alert-content\">\n            <i class=\"fas ".concat(getAlertIcon(type), "\"></i>\n            <span>").concat(message, "</span>\n        </div>\n        <button class=\"alert-close\">&times;</button>\n    "); // إضافة CSS إذا لم يكن موجوداً

  if (!document.querySelector('#alert-styles')) {
    var style = document.createElement('style');
    style.id = 'alert-styles';
    style.textContent = "\n            .custom-alert {\n                position: fixed;\n                top: 20px;\n                right: 20px;\n                left: 20px;\n                max-width: 500px;\n                margin: 0 auto;\n                padding: 15px 20px;\n                border-radius: var(--radius-md);\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                z-index: 9999;\n                box-shadow: var(--shadow-lg);\n                animation: slideDown 0.3s ease;\n                transform-origin: top center;\n            }\n            \n            .alert-success {\n                background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);\n                border: 2px solid #28a745;\n                color: #155724;\n            }\n            \n            .alert-error {\n                background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);\n                border: 2px solid #dc3545;\n                color: #721c24;\n            }\n            \n            .alert-info {\n                background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);\n                border: 2px solid #17a2b8;\n                color: #0c5460;\n            }\n            \n            .alert-content {\n                display: flex;\n                align-items: center;\n                gap: 10px;\n                flex: 1;\n            }\n            \n            .alert-content i {\n                font-size: 1.2rem;\n            }\n            \n            .alert-close {\n                background: none;\n                border: none;\n                font-size: 1.5rem;\n                cursor: pointer;\n                color: inherit;\n                padding: 0;\n                width: 30px;\n                height: 30px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                border-radius: 50%;\n                transition: background-color 0.2s;\n            }\n            \n            .alert-close:hover {\n                background-color: rgba(0,0,0,0.1);\n            }\n            \n            @keyframes slideDown {\n                from {\n                    opacity: 0;\n                    transform: translateY(-20px);\n                }\n                to {\n                    opacity: 1;\n                    transform: translateY(0);\n                }\n            }\n            \n            @media (max-width: 768px) {\n                .custom-alert {\n                    top: 10px;\n                    right: 10px;\n                    left: 10px;\n                    padding: 12px 15px;\n                }\n            }\n        ";
    document.head.appendChild(style);
  }

  document.body.appendChild(alert);
  alert.querySelector('.alert-close').addEventListener('click', function () {
    alert.style.animation = 'slideDown 0.3s ease reverse';
    setTimeout(function () {
      return alert.remove();
    }, 300);
  });
  setTimeout(function () {
    if (alert.parentNode) {
      alert.style.animation = 'slideDown 0.3s ease reverse';
      setTimeout(function () {
        return alert.remove();
      }, 300);
    }
  }, 5000);
}

function getAlertIcon(type) {
  switch (type) {
    case 'success':
      return 'fa-check-circle';

    case 'error':
      return 'fa-exclamation-circle';

    case 'info':
      return 'fa-info-circle';

    default:
      return 'fa-info-circle';
  }
} // ================= باقي الدوال (Reviews Filter, Scroll, etc.) =================
// [ابق على نفس كود الدوال السابقة لـ initReviewsFilter, filterReviews, searchReviews, loadMoreReviews, initScrollToTop, initAnimations]
// ================= REVIEWS FILTER =================


function initReviewsFilter() {
  if (filterButtons) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        filterButtons.forEach(function (btn) {
          return btn.classList.remove('active');
        });
        this.classList.add('active');
        var filterValue = this.getAttribute('data-filter');
        filterReviews(filterValue);
      });
    });
  }

  if (searchBox) {
    searchBox.addEventListener('input', function () {
      var searchTerm = this.value.toLowerCase();
      searchReviews(searchTerm);
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      loadMoreReviews();
    });
  }
}

function filterReviews(filter) {
  var reviewCards = document.querySelectorAll('.review-card');
  reviewCards.forEach(function (card) {
    if (filter === 'all') {
      card.style.display = 'block';
      setTimeout(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else if (filter === 'service') {
      card.style.display = 'block';
      setTimeout(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      var rating = card.getAttribute('data-rating');

      if (rating === filter) {
        card.style.display = 'block';
        setTimeout(function () {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function () {
          card.style.display = 'none';
        }, 300);
      }
    }
  });
}

function searchReviews(term) {
  var reviewCards = document.querySelectorAll('.review-card');
  reviewCards.forEach(function (card) {
    var name = card.querySelector('h3').textContent.toLowerCase();
    var content = card.querySelector('.review-content p').textContent.toLowerCase();
    var service = card.querySelector('.review-service').textContent.toLowerCase();

    if (name.includes(term) || content.includes(term) || service.includes(term)) {
      card.style.display = 'block';
      setTimeout(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(function () {
        card.style.display = 'none';
      }, 300);
    }
  });
}

function loadMoreReviews() {
  var loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!loadMoreBtn) return;
  loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
  loadMoreBtn.disabled = true;
  setTimeout(function () {
    var newReviews = [{
      id: 7,
      name: 'ياسر النجار',
      location: 'مهندس من الأردن',
      rating: 5,
      date: 'قبل يومين',
      service: 'توصيل معدات',
      content: '"خدمة ممتازة لنقل المعدات الهندسية. الدقة والأمان كانا في أعلى مستوى. أوصي بهم بشدة."',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }, {
      id: 8,
      name: 'لمياء السعيد',
      location: 'طبيبة من مصر',
      rating: 4,
      date: 'قبل 6 أيام',
      service: 'توصيل طبي',
      content: '"خدمة توصيل المستلزمات الطبية كانت سريعة وآمنة. الفريق محترف ومتعاون. شكراً لكم."',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    }];
    newReviews.forEach(function (review) {
      var reviewCard = createReviewCard(review);
      reviewsGrid.appendChild(reviewCard);
    });
    loadMoreBtn.innerHTML = '<i class="fas fa-sync-alt"></i> تحميل المزيد';
    loadMoreBtn.disabled = false;

    if (document.querySelectorAll('.review-card').length >= 10) {
      loadMoreBtn.style.display = 'none';
    }

    initReviewsFilter();
  }, 1500);
}

function createReviewCard(review) {
  var card = document.createElement('div');
  card.className = 'review-card';
  card.setAttribute('data-rating', review.rating);
  card.setAttribute('data-service', review.service.toLowerCase().replace(' ', '-'));
  var starsHtml = '';

  for (var i = 1; i <= 5; i++) {
    if (i <= review.rating) {
      starsHtml += '<i class="fas fa-star"></i>';
    } else if (i === Math.ceil(review.rating) && review.rating % 1 !== 0) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    } else {
      starsHtml += '<i class="far fa-star"></i>';
    }
  }

  card.innerHTML = "\n        <div class=\"review-header\">\n            <div class=\"reviewer-avatar\">\n                <img src=\"".concat(review.avatar, "\" alt=\"").concat(review.name, "\" loading=\"lazy\">\n            </div>\n            <div class=\"reviewer-info\">\n                <h3>").concat(review.name, "</h3>\n                <p>").concat(review.location, "</p>\n                <div class=\"review-rating\">\n                    ").concat(starsHtml, "\n                    <span class=\"review-date\">").concat(review.date, "</span>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"review-content\">\n            <span class=\"review-verified\">\n                <i class=\"fas fa-check-circle\"></i> <span>\u0645\u0631\u0627\u062C\u0639\u0629 \u0645\u0648\u062B\u0642\u0629</span>\n            </span>\n            <span class=\"review-service\">").concat(review.service, "</span>\n            \n            <p>\"").concat(review.content, "\"</p>\n        </div>\n    ");
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  setTimeout(function () {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 100);
  return card;
} // ================= SCROLL TO TOP =================


function initScrollToTop() {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollToTop.classList.add('visible');
    } else {
      scrollToTop.classList.remove('visible');
    }
  });

  if (scrollToTop) {
    scrollToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
} // ================= ANIMATIONS =================


function initAnimations() {
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  var animatedElements = document.querySelectorAll('.review-card, .stat-card, .section-header');
  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
  var style = document.createElement('style');
  style.textContent = "\n        .review-card, .stat-card, .section-header {\n            opacity: 0;\n            transform: translateY(30px);\n            transition: opacity 0.6s ease, transform 0.6s ease;\n        }\n        \n        .review-card.animated, .stat-card.animated, .section-header.animated {\n            opacity: 1;\n            transform: translateY(0);\n        }\n        \n        .review-card:nth-child(1) { transition-delay: 0.1s; }\n        .review-card:nth-child(2) { transition-delay: 0.2s; }\n        .review-card:nth-child(3) { transition-delay: 0.3s; }\n        .review-card:nth-child(4) { transition-delay: 0.4s; }\n        .review-card:nth-child(5) { transition-delay: 0.5s; }\n        .review-card:nth-child(6) { transition-delay: 0.6s; }\n        \n        .stat-card:nth-child(1) { transition-delay: 0.1s; }\n        .stat-card:nth-child(2) { transition-delay: 0.2s; }\n        .stat-card:nth-child(3) { transition-delay: 0.3s; }\n        .stat-card:nth-child(4) { transition-delay: 0.4s; }\n    ";
  document.head.appendChild(style);
} // ================= WINDOW RESIZE HANDLER =================


var resizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    if (window.innerWidth >= 992 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    }
  }, 250);
}); // ================= KEYBOARD NAVIGATION =================

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp' && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  }
}); // ================= WHATSAPP BUTTONS =================

document.querySelectorAll('.whatsapp-btn, .float-whatsapp').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var phone = this.href.includes('whatsapp') ? WHATSAPP_CONFIG.PHONE_NUMBER : '+97431691024';
    var message = encodeURIComponent('مرحباً، أود الاستفسار عن خدمات التوصيل');
    var whatsappUrl = "https://wa.me/".concat(phone.replace(/\D/g, ''), "?text=").concat(message);
    window.open(whatsappUrl, '_blank');
  });
});
//# sourceMappingURL=reviews.dev.js.map
