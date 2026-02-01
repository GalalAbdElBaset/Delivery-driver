"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * ملف language.js - إدارة اللغة للموقع
 * Tn-QA Delivery - خدمة التوصيل بين قطر وتونس
 */
var LanguageManager =
/*#__PURE__*/
function () {
  function LanguageManager() {
    _classCallCheck(this, LanguageManager);

    this.currentLang = this.getSavedLanguage();
    this.translations = {
      ar: this.getArabicTranslations(),
      en: this.getEnglishTranslations()
    };
    this.isInitialized = false;
    console.log('🌍 Language Manager: Initialized with', this.currentLang);
  } // ==================== INITIALIZATION ====================


  _createClass(LanguageManager, [{
    key: "init",
    value: function init() {
      if (this.isInitialized) return;
      this.setupLanguageSwitcher();
      this.loadLanguage();
      this.updatePageDirection();
      this.setupStorageListener();
      this.isInitialized = true;
      console.log('✅ Language Manager: Setup complete');
    } // ==================== LANGUAGE SWITCHER ====================

  }, {
    key: "setupLanguageSwitcher",
    value: function setupLanguageSwitcher() {
      var _this = this;

      var langButtons = document.querySelectorAll('.lang-option-nav, .lang-option');
      var langDropdowns = document.querySelectorAll('.lang-dropdown-nav, .lang-dropdown');
      var langBtns = document.querySelectorAll('#langBtn, .lang-btn-nav, .lang-btn'); // Handle language option clicks

      langButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var selectedLang = btn.getAttribute('data-lang');

          if (selectedLang && selectedLang !== _this.currentLang) {
            _this.switchLanguage(selectedLang);

            _this.closeAllDropdowns();
          }
        });
      }); // Toggle dropdown menus

      langBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation(); // Find the corresponding dropdown

          var dropdown;

          if (btn.classList.contains('lang-btn-nav')) {
            dropdown = btn.nextElementSibling;
          } else {
            dropdown = btn.parentElement.querySelector('.lang-dropdown');
          }

          if (dropdown) {
            dropdown.classList.toggle('show');
          } // Close other dropdowns


          langDropdowns.forEach(function (d) {
            if (d !== dropdown) {
              d.classList.remove('show');
            }
          });
        });
      }); // Close dropdowns when clicking outside

      document.addEventListener('click', function (e) {
        if (!e.target.closest('.language-switcher-nav') && !e.target.closest('.language-switcher')) {
          _this.closeAllDropdowns();
        }
      }); // Close dropdowns on escape key

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          _this.closeAllDropdowns();
        }
      });
    }
  }, {
    key: "closeAllDropdowns",
    value: function closeAllDropdowns() {
      document.querySelectorAll('.lang-dropdown-nav, .lang-dropdown').forEach(function (dropdown) {
        dropdown.classList.remove('show');
      });
    } // ==================== LANGUAGE MANAGEMENT ====================

  }, {
    key: "getSavedLanguage",
    value: function getSavedLanguage() {
      // Check localStorage first
      var savedLang = localStorage.getItem('hela_language');
      if (savedLang) return savedLang; // Check browser language

      var browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('ar')) return 'ar'; // Default to Arabic

      return 'ar';
    }
  }, {
    key: "saveLanguage",
    value: function saveLanguage(lang) {
      try {
        localStorage.setItem('hela_language', lang);
        console.log('💾 Language saved:', lang); // Update cookie for server-side if needed

        document.cookie = "hela_language=".concat(lang, "; path=/; max-age=31536000"); // Dispatch event for other components

        window.dispatchEvent(new CustomEvent('languageChanged', {
          detail: {
            language: lang
          }
        }));
      } catch (error) {
        console.error('Error saving language:', error);
      }
    }
  }, {
    key: "switchLanguage",
    value: function switchLanguage(lang) {
      if (lang === this.currentLang) return;
      console.log('🔄 Switching language to:', lang); // Update current language

      this.currentLang = lang; // Save to storage

      this.saveLanguage(lang); // Update UI

      this.updateLanguageSwitcherUI();
      this.updatePageDirection(); // Apply translations

      this.applyTranslations(); // Show notification

      this.showLanguageChangeNotification(lang);
    }
  }, {
    key: "loadLanguage",
    value: function loadLanguage() {
      var _this2 = this;

      console.log('📖 Loading language:', this.currentLang); // Update switcher UI

      this.updateLanguageSwitcherUI(); // Update page direction

      this.updatePageDirection(); // Apply translations

      this.applyTranslations(); // Trigger initial language event

      setTimeout(function () {
        window.dispatchEvent(new CustomEvent('languageLoaded', {
          detail: {
            language: _this2.currentLang
          }
        }));
      }, 100);
    }
  }, {
    key: "updateLanguageSwitcherUI",
    value: function updateLanguageSwitcherUI() {
      var _this3 = this;

      // Update current language text
      document.querySelectorAll('#currentLang, .current-lang').forEach(function (el) {
        el.textContent = _this3.currentLang === 'ar' ? 'العربية' : 'English';
      }); // Update active states

      document.querySelectorAll('[data-lang]').forEach(function (el) {
        var lang = el.getAttribute('data-lang');

        if (lang === _this3.currentLang) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }); // Update button icons/text

      var langBtn = document.querySelector('#langBtn, .lang-btn');

      if (langBtn) {
        var icon = langBtn.querySelector('i') || langBtn;
        var text = langBtn.querySelector('span');

        if (icon) {
          icon.className = this.currentLang === 'ar' ? 'fas fa-language' : 'fas fa-globe-americas';
        }

        if (text) {
          text.textContent = this.currentLang === 'ar' ? 'العربية' : 'English';
        }
      }
    }
  }, {
    key: "updatePageDirection",
    value: function updatePageDirection() {
      if (this.currentLang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        document.body.classList.add('rtl');
        document.body.classList.remove('ltr');
      } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        document.body.classList.add('ltr');
        document.body.classList.remove('rtl');
      }
    } // ==================== TRANSLATION SYSTEM ====================

  }, {
    key: "applyTranslations",
    value: function applyTranslations() {
      var _this4 = this;

      var elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(function (element) {
        var key = element.getAttribute('data-i18n');

        var translation = _this4.getTranslation(key);

        if (translation) {
          _this4.applyTranslationToElement(element, translation);
        }
      }); // Special handling for input placeholders

      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (input) {
        var key = input.getAttribute('data-i18n-placeholder');

        var translation = _this4.getTranslation(key);

        if (translation) input.placeholder = translation;
      }); // Special handling for image alt text

      document.querySelectorAll('[data-i18n-alt]').forEach(function (img) {
        var key = img.getAttribute('data-i18n-alt');

        var translation = _this4.getTranslation(key);

        if (translation) img.alt = translation;
      }); // Special handling for title attributes

      document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-title');

        var translation = _this4.getTranslation(key);

        if (translation) el.title = translation;
      });
      console.log("\u2705 Applied ".concat(elements.length, " translations"));
    }
  }, {
    key: "applyTranslationToElement",
    value: function applyTranslationToElement(element, translation) {
      var tagName = element.tagName.toLowerCase();

      switch (tagName) {
        case 'input':
          if (element.type === 'button' || element.type === 'submit') {
            element.value = translation;
          } else {
            element.placeholder = translation;
          }

          break;

        case 'textarea':
          element.placeholder = translation;
          break;

        case 'img':
          element.alt = translation;
          break;

        case 'option':
          element.textContent = translation;
          break;

        default:
          // Check if element has specific translation type
          var translationType = element.getAttribute('data-i18n-type');

          if (translationType === 'html') {
            element.innerHTML = translation;
          } else {
            element.textContent = translation;
          }

      }
    }
  }, {
    key: "getTranslation",
    value: function getTranslation(key) {
      var keys = key.split('.');
      var value = this.translations[this.currentLang];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var k = _step.value;

          if (value && _typeof(value) === 'object' && k in value) {
            value = value[k];
          } else {
            console.warn("Translation key not found: ".concat(key));
            return null;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return value;
    } // ==================== TRANSLATION DATA ====================

  }, {
    key: "getArabicTranslations",
    value: function getArabicTranslations() {
      var _common;

      return {
        // Company Info
        companyName: "Tn-QA Delivery",
        companySlogan: "خدمة توصيل سريعة وآمنة",
        // Navigation
        nav: {
          home: "الرئيسية",
          about: "من نحن",
          services: "الخدمات",
          contact: "التواصل",
          whatsapp: "تواصل عبر واتساب",
          call: "اتصل الآن"
        },
        // Hero Section
        hero: {
          title1: "خدمة توصيل سريعة وآمنة داخل قطر وتونس",
          subtitle1: "نوفر حلول نقل وتوصيل مرنة تناسب الأفراد والمتاجر والشركات، مع التركيز على السرعة، الأمان، وسهولة التواصل.",
          title2: "توصيل أغراض بين تونس وقطر",
          subtitle2: "توصيل الأغراض بين تونس وقطر عبر مسافرين موثوقين، بطريقة آمنة ومنسقة مع توثيق كامل.",
          title3: "توثيق تسليم الأموال يدًا بيد",
          subtitle3: "نقدم خدمة توثيق موثوقة لتسليم الأموال بين الأطراف، مع الحفاظ على الشفافية والأمان الكامل.",
          servicesBtn: "عرض الخدمات",
          whatsappBtn: "تواصل الآن",
          contactBtn: "اتصل بنا الآن",
          qatarPhone: "قطر: 31691024",
          tunisiaPhone: "تونس: 56471550",
          callNow: "طلب خدمة"
        },
        // About Section
        about: {
          title: "من نحن",
          subtitle: "خدمة توصيل مستقلة توفر حلول نقل وتوصيل مرنة",
          heading: "Tn-QA Delivery",
          desc1: "نحن خدمة توصيل مستقلة ومتخصصة في تقديم حلول النقل والتوصيل بين قطر وتونس. نهدف إلى توفير خدمات توصيل سريعة وآمنة ومهنية تلبي احتياجات الأفراد والشركات.",
          desc2: "نركز في عملنا على ثلاثة مبادئ أساسية: السرعة في التنفيذ، الأمان في التعامل، والموثوقية في الأداء.",
          feature1: {
            title: "سرعة في التنفيذ",
            desc: "توصيل سريع في الوقت المحدد"
          },
          feature2: {
            title: "أمان تام",
            desc: "حماية للأغراض والمعلومات"
          },
          feature3: {
            title: "توثيق موثوق",
            desc: "تسليم موثق يدًا بيد"
          }
        },
        // Services Section
        services: {
          title: "خدماتنا",
          subtitle: "نقدم مجموعة متكاملة من خدمات التوصيل والنقل"
        },
        // Contact Page
        contact: {
          heroTitle: "تواصل معنا",
          heroSubtitle: "نحن هنا لمساعدتك على مدار الساعة، تواصل معنا بأي طريقة تفضلها",
          directMethods: "طرق التواصل المباشرة",
          methodsSubtitle: "اختر الطريقة المناسبة لك للتواصل معنا مباشرة",
          whatsappCard: "واتساب مباشر",
          whatsappDesc: "للتواصل الفوري والرد السريع خلال دقائق",
          phoneCard: "اتصال هاتفي",
          phoneDesc: "للأمور العاجلة والاستفسارات المباشرة",
          emailCard: "البريد الإلكتروني",
          emailDesc: "للرسائل الرسمية، الاستفسارات التفصيلية والمستندات",
          formTitle: "أرسل لنا رسالة مباشرة",
          formSubtitle: "املأ النموذج وسنقوم بالرد عليك في أسرع وقت ممكن",
          mapTitle: "موقعنا على الخريطة",
          mapSubtitle: "خدمة التوصيل متاحة في قطر وتونس مع تغطية شاملة لكافة المناطق",
          faqTitle: "أسئلة متكررة",
          faqSubtitle: "إجابات عن الأسئلة الأكثر شيوعاً فيما يتعلق بالتواصل والخدمات",
          coverageAreas: "مناطق التغطية",
          quickWidget: "تواصل الآن"
        },
        // Reviews Page
        reviews: {
          heroTitle: "مراجعات وتقييمات العملاء",
          heroSubtitle: "ثقة أكثر من 500 عميل في خدماتنا هي شهادة نجاحنا",
          allReviews: "جميع المراجعات",
          allReviewsSub: "مراجعات حقيقية من عملائنا الكرام عن جميع خدماتنا",
          submitReview: "شاركنا تجربتك",
          submitReviewSub: "ساعد الآخرين في اتخاذ القرار من خلال مشاركة تجربتك مع خدماتنا",
          averageRating: "متوسط التقييم",
          customerSatisfaction: "رضا العملاء",
          satisfiedCustomers: "عميل راضٍ",
          deliveryTime: "متوسط وقت التسليم",
          reviewer1: "محمد أحمد",
          reviewer1Title: "مستثمر من قطر",
          reviewer2: "سارة القاسمي",
          reviewer2Title: "ربة منزل من الإمارات",
          reviewer3: "علي التونسي",
          reviewer3Title: "تاجر من تونس",
          reviewer4: "نورا السعدي",
          reviewer4Title: "موظفة من السعودية",
          daysAgo: "قبل 3 أيام",
          weekAgo: "قبل أسبوع",
          weeksAgo: "قبل أسبوعين",
          monthAgo: "قبل شهر",
          review1: "\"خدمة استثنائية! حجزت ميزان من قطر إلى تونس وكانت العملية سلسة جداً. الفريق متجاوب ومحترف. أوصي بشدة بخدماتهم.\"",
          review2: "\"استخدمت خدمة التوصيل المحلي في قطر وكانت رائعة. السائقون مؤدبون، والخدمة سريعة، والأسعار مناسبة. شكراً فريق HELA Express!\"",
          review3: "\"خدمة توثيق تسليم الأموال كانت آمنة ومضمونة 100%. الفريق محترف ويضمن وصول أموالك بأمان. أنصح الجميع بهذه الخدمة الموثوقة.\"",
          review4: "\"اشتريت ميزان من خلالهم وكانت الجودة ممتازة والسعر مناسب. ما يميزهم هو المتابعة بعد البيع والتأكد من رضا العميل. شكراً لكم!\"",
          writeReview: "اكتب مراجعة",
          whatsappReview: "مراجعة عبر واتساب",
          redirectMessage: "سيتم تحويلك إلى صفحة المراجعات الكاملة",
          reviewMessage: "أريد كتابة مراجعة عن خدماتكم المميزة"
        },
        // Form Labels
        form: {
          fullName: "الاسم الكامل",
          phoneNumber: "رقم الهاتف",
          email: "البريد الإلكتروني",
          preferredContact: "طريقة التواصل المفضلة",
          serviceType: "نوع الخدمة المطلوبة",
          urgency: "درجة الاستعجال",
          messageSubject: "عنوان الرسالة",
          message: "تفاصيل الطلب أو الاستفسار",
          attachments: "إرفاق ملفات",
          privacyPolicy: "أوافق على سياسة الخصوصية وشروط الخدمة",
          submit: "إرسال عبر واتساب",
          clear: "مسح النموذج",
          success: "تم إرسال رسالتك بنجاح!",
          error: "حدث خطأ أثناء الإرسال",
          successMessage: "سنقوم بالرد عليك خلال 2-4 ساعات. يمكنك تتبع حالة طلبك عبر الرابط الذي تم إرساله إلى بريدك الإلكتروني.",
          errorMessage: "يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر الواتساب.",
          hintName: "الرجاء إدخال الاسم الثلاثي",
          phonePlaceholder: "رقم الهاتف بدون مفتاح الدولة",
          hintPhone: "سنتصل على هذا الرقم للرد على استفسارك",
          emailPlaceholder: "example@email.com",
          hintEmail: "اختياري - للرد الرسمي والمستندات",
          selectService: "اختر الخدمة المطلوبة",
          messageSubjectPlaceholder: "عنوان مختصر لطلبك",
          messagePlaceholder: "يرجى وصف طلبك أو استفسارك بالتفصيل...",
          hintMessage: "كلما كانت التفاصيل أكثر، كان الرد أفضل وأسرع",
          uploadDrag: "اسحب وأفلت الملفات هنا أو",
          uploadBrowse: "تصفح",
          uploadHint: "يمكنك رفع الصور، PDF، مستندات Word (حتى 10MB)",
          personalInfo: "المعلومات الشخصية",
          serviceInfo: "معلومات الخدمة",
          messageContent: "محتوى الرسالة"
        },
        // Footer
        footer: {
          quickLinks: "روابط سريعة",
          ourServices: "خدماتنا",
          contactUs: "تواصل معنا",
          quickContact: "تواصل سريع",
          legalNotice: "الموقع منصة تعريفية وتنسيقية فقط، ولا يقوم بأي عمليات دفع إلكتروني أو تحصيل أموال",
          copyright: "جميع الحقوق محفوظة",
          backToHome: "العودة للرئيسية",
          description: "خدمات توصيل ونقل موثوقة بين تونس وقطر",
          emergencyCall: "اتصال عاجل"
        },
        // Common
        common: (_common = {
          loading: "جاري التحميل...",
          sending: "جاري الإرسال...",
          sent: "تم الإرسال",
          success: "تم بنجاح",
          error: "خطأ",
          close: "إغلاق",
          more: "المزيد",
          less: "أقل",
          readMore: "اقرأ المزيد",
          showLess: "عرض أقل",
          all: "الكل",
          filter: "تصفية",
          search: "بحث",
          submit: "إرسال",
          cancel: "إلغاء",
          confirm: "تأكيد",
          optional: "اختياري",
          required: "مطلوب",
          verified: "موثّق",
          active: "نشط",
          inactive: "غير نشط",
          customers: "تمت خدمة +500 عميل",
          satisfaction: "رضا عملاء 98%",
          characters: "حرف",
          days: "الأحد - الخميس",
          daysWeekend: "الجمعة - السبت",
          emergency: "خدمة الطوارئ",
          primary: "البريد الرئيسي",
          business: "للشؤون التجارية",
          general: "الاستفسارات العامة",
          alsoContact: "يمكنك أيضاً التواصل عبر البريد الإلكتروني:",
          copy: "نسخ",
          backToTop: "العودة إلى الأعلى"
        }, _defineProperty(_common, "all", "على مدار الساعة"), _defineProperty(_common, "any", "أي طريقة"), _defineProperty(_common, "other", "استفسار عام / خدمة أخرى"), _defineProperty(_common, "available", "دعم فوري"), _defineProperty(_common, "minutes", "رد خلال دقائق"), _defineProperty(_common, "hours", "متاح 24/7"), _defineProperty(_common, "verified", "ضمان الرد"), _common),
        // Services Names
        servicesList: {
          localDelivery: "التوصيل المحلي",
          localDeliveryQatar: "التوصيل المحلي في قطر",
          localDeliveryTunisia: "التوصيل المحلي في تونس",
          scaleSales: "بيع موازين",
          scaleBooking: "حجز ميزان",
          scaleBookingQaTn: "حجز ميزان من قطر إلى تونس",
          scaleBookingTnQa: "حجز ميزان من تونس إلى قطر",
          moneyDelivery: "توثيق تسليم الأموال"
        },
        // Countries
        countries: {
          qatar: "قطر",
          tunisia: "تونس",
          saudi: "السعودية",
          uae: "الإمارات",
          egypt: "مصر",
          morocco: "المغرب"
        },
        // Time
        time: {
          immediate: "فوري",
          urgent: "عاجل",
          emergency: "طارئ",
          normal: "عادي",
          minutes: "دقائق",
          hours: "ساعات",
          days: "أيام"
        },
        // Status
        status: {
          connected: "متصل الآن",
          offline: "غير متصل",
          available: "متاح",
          busy: "مشغول"
        },
        // Map
        map: {
          errorTitle: "عذراً، تعذر تحميل الخريطة",
          errorMessage: "هناك مشكلة فنية في تحميل خريطة المواقع. يمكنك التواصل معنا مباشرة عبر وسائل التواصل التالية:",
          qatarBranch: "فرع قطر 🇶🇦",
          tunisiaBranch: "فرع تونس 🇹🇳"
        },
        // Coverage
        coverage: {
          doha: "الدوحة وجميع مناطقها",
          rayyan: "الريان والوكرة",
          khor: "الخور والذخيرة",
          allQatar: "جميع مناطق قطر",
          tunis: "تونس العاصمة",
          sfax: "صفاقس وسوسة",
          nabeul: "نابل والمنستير",
          allTunisia: "جميع مناطق تونس",
          qatar: "مناطق الخدمة في قطر",
          tunisia: "مناطق الخدمة في تونس",
          mainOffices: "المكاتب الرئيسية"
        },
        // FAQ
        faq: {
          question1: "ما هي أسرع طريقة للتواصل معكم؟",
          answer1: "أسرع طريقة للتواصل هي عبر الواتساب حيث يتم الرد خلال دقائق خلال أوقات العمل. للاستفسارات العاجلة يمكنك الاتصال مباشرة على الأرقام المذكورة.",
          question2: "ما هي أوقات العمل الرسمية؟",
          answer2: "نحن نعمل 24 ساعة طوال أيام الأسبوع، بما في ذلك العطل الرسمية والإجازات. خدمة الطوارئ متاحة على مدار الساعة.",
          question3: "كيف يمكنني تتبع حالة طلبي؟",
          answer3: "بعد تقديم طلبك، سنقوم بإرسال رقم تتبع فريد عبر الواتساب والبريد الإلكتروني. يمكنك استخدام هذا الرقم لمتابعة حالة طلبك.",
          question4: "هل الخدمات متاحة في جميع مناطق قطر وتونس؟",
          answer4: "نعم، نقدم خدماتنا في جميع مناطق قطر وتونس. بعض المناطق النائية قد تحتاج إلى ترتيب مسبق. يمكنك التواصل معنا للتحقق من تغطية منطقتك.",
          question5: "ما هي مدة الرد على النموذج الإلكتروني؟",
          answer5: "متوسط وقت الرد على النماذج الإلكترونية هو 2-4 ساعات خلال أوقات العمل. للطلبات العاجلة يرجى استخدام الواتساب أو الهاتف."
        }
      };
    }
  }, {
    key: "getEnglishTranslations",
    value: function getEnglishTranslations() {
      var _common2;

      return {
        // Company Info
        companyName: "Tn-QA Delivery",
        companySlogan: "Fast and Secure Delivery Service",
        // Navigation
        nav: {
          home: "Home",
          about: "About Us",
          services: "Services",
          contact: "Contact",
          whatsapp: "Contact via WhatsApp",
          call: "Call Now"
        },
        // Hero Section
        hero: {
          title1: "Fast and Secure Delivery Service in Qatar and Tunisia",
          subtitle1: "We provide flexible transportation and delivery solutions suitable for individuals, shops, and companies, focusing on speed, safety, and ease of communication.",
          title2: "Package Delivery between Tunisia and Qatar",
          subtitle2: "Delivery of items between Tunisia and Qatar through trusted travelers, in a safe and coordinated manner with full documentation.",
          title3: "Hand-to-Hand Money Delivery Documentation",
          subtitle3: "We provide reliable documentation service for money delivery between parties, while maintaining full transparency and security.",
          servicesBtn: "View Services",
          whatsappBtn: "Contact Now",
          contactBtn: "Contact Us Now",
          qatarPhone: "Qatar: 31691024",
          tunisiaPhone: "Tunisia: 56471550",
          callNow: "Request Service"
        },
        // About Section
        about: {
          title: "About Us",
          subtitle: "Independent delivery service providing flexible transportation solutions",
          heading: "Tn-QA Delivery",
          desc1: "We are an independent delivery service specialized in providing transportation and delivery solutions between Qatar and Tunisia. We aim to provide fast, safe, and professional delivery services that meet the needs of individuals and companies.",
          desc2: "We focus on three main principles in our work: Speed in execution, Safety in handling, and Reliability in performance.",
          feature1: {
            title: "Fast Execution",
            desc: "Fast delivery on time"
          },
          feature2: {
            title: "Complete Safety",
            desc: "Protection of items and information"
          },
          feature3: {
            title: "Reliable Documentation",
            desc: "Hand-to-hand documented delivery"
          }
        },
        // Services Section
        services: {
          title: "Our Services",
          subtitle: "We provide a comprehensive range of delivery and transportation services"
        },
        // Contact Page
        contact: {
          heroTitle: "Contact Us",
          heroSubtitle: "We are here to help you 24/7, contact us using your preferred method",
          directMethods: "Direct Contact Methods",
          methodsSubtitle: "Choose the appropriate method to contact us directly",
          whatsappCard: "Direct WhatsApp",
          whatsappDesc: "For instant communication and quick response within minutes",
          phoneCard: "Phone Call",
          phoneDesc: "For urgent matters and direct inquiries",
          emailCard: "Email",
          emailDesc: "For official messages, detailed inquiries and documents",
          formTitle: "Send us a Direct Message",
          formSubtitle: "Fill out the form and we will respond to you as soon as possible",
          mapTitle: "Our Location on Map",
          mapSubtitle: "Delivery service is available in Qatar and Tunisia with comprehensive coverage of all areas",
          faqTitle: "Frequently Asked Questions",
          faqSubtitle: "Answers to the most common questions regarding communication and services",
          coverageAreas: "Coverage Areas",
          quickWidget: "Contact Now"
        },
        // Reviews Page
        reviews: {
          heroTitle: "Customer Reviews and Ratings",
          heroSubtitle: "Trust of more than 500 customers in our services is our success certificate",
          allReviews: "All Reviews",
          allReviewsSub: "Real reviews from our valued customers about all our services",
          submitReview: "Share Your Experience",
          submitReviewSub: "Help others make decisions by sharing your experience with our services",
          averageRating: "Average Rating",
          customerSatisfaction: "Customer Satisfaction",
          satisfiedCustomers: "Satisfied Customers",
          deliveryTime: "Average Delivery Time",
          reviewer1: "Mohammed Ahmed",
          reviewer1Title: "Investor from Qatar",
          reviewer2: "Sarah Al-Qasimi",
          reviewer2Title: "Housewife from UAE",
          reviewer3: "Ali Al-Tounsi",
          reviewer3Title: "Merchant from Tunisia",
          reviewer4: "Nora Al-Saadi",
          reviewer4Title: "Employee from Saudi Arabia",
          daysAgo: "3 days ago",
          weekAgo: "1 week ago",
          weeksAgo: "2 weeks ago",
          monthAgo: "1 month ago",
          review1: "\"Exceptional service! I booked a scale from Qatar to Tunisia and the process was very smooth. The team is responsive and professional. I highly recommend their services.\"",
          review2: "\"I used the local delivery service in Qatar and it was excellent. The drivers are polite, the service is fast, and the prices are reasonable. Thank you HELA Express team!\"",
          review3: "\"The money delivery documentation service was 100% safe and guaranteed. The team is professional and ensures your money arrives safely. I recommend this reliable service to everyone.\"",
          review4: "\"I bought a scale through them and the quality was excellent and the price was reasonable. What distinguishes them is the follow-up after the sale and ensuring customer satisfaction. Thank you!\"",
          writeReview: "Write a Review",
          whatsappReview: "Review via WhatsApp",
          redirectMessage: "You will be redirected to the full reviews page",
          reviewMessage: "I want to write a review about your excellent services"
        },
        // Form Labels
        form: {
          fullName: "Full Name",
          phoneNumber: "Phone Number",
          email: "Email Address",
          preferredContact: "Preferred Contact Method",
          serviceType: "Required Service Type",
          urgency: "Urgency Level",
          messageSubject: "Message Subject",
          message: "Order or Inquiry Details",
          attachments: "Attach Files",
          privacyPolicy: "I agree to the Privacy Policy and Terms of Service",
          submit: "Send via WhatsApp",
          clear: "Clear Form",
          success: "Your message has been sent successfully!",
          error: "An error occurred while sending",
          successMessage: "We will respond to you within 2-4 hours. You can track your order status via the link sent to your email.",
          errorMessage: "Please try again or contact us directly via WhatsApp.",
          hintName: "Please enter your full name",
          phonePlaceholder: "Phone number without country code",
          hintPhone: "We will call this number to respond to your inquiry",
          emailPlaceholder: "example@email.com",
          hintEmail: "Optional - for official response and documents",
          selectService: "Select required service",
          messageSubjectPlaceholder: "Brief title of your request",
          messagePlaceholder: "Please describe your request or inquiry in detail...",
          hintMessage: "The more details, the better and faster the response",
          uploadDrag: "Drag and drop files here or",
          uploadBrowse: "Browse",
          uploadHint: "You can upload images, PDF, Word documents (up to 10MB)",
          personalInfo: "Personal Information",
          serviceInfo: "Service Information",
          messageContent: "Message Content"
        },
        // Footer
        footer: {
          quickLinks: "Quick Links",
          ourServices: "Our Services",
          contactUs: "Contact Us",
          quickContact: "Quick Contact",
          legalNotice: "The site is only an introductory and coordination platform, and does not perform any electronic payment or money collection operations",
          copyright: "All Rights Reserved",
          backToHome: "Back to Home",
          description: "Reliable delivery and transportation services between Tunisia and Qatar",
          emergencyCall: "Emergency Call"
        },
        // Common
        common: (_common2 = {
          loading: "Loading...",
          sending: "Sending...",
          sent: "Sent",
          success: "Success",
          error: "Error",
          close: "Close",
          more: "More",
          less: "Less",
          readMore: "Read More",
          showLess: "Show Less",
          all: "All",
          filter: "Filter",
          search: "Search",
          submit: "Submit",
          cancel: "Cancel",
          confirm: "Confirm",
          optional: "Optional",
          required: "Required",
          verified: "Verified",
          active: "Active",
          inactive: "Inactive",
          customers: "Served +500 customers",
          satisfaction: "98% customer satisfaction",
          characters: "characters",
          days: "Sunday - Thursday",
          daysWeekend: "Friday - Saturday",
          emergency: "Emergency Service",
          primary: "Primary Email",
          business: "For Business Affairs",
          general: "General Inquiries",
          alsoContact: "You can also contact via email:",
          copy: "Copy",
          backToTop: "Back to top"
        }, _defineProperty(_common2, "all", "24/7"), _defineProperty(_common2, "any", "Any method"), _defineProperty(_common2, "other", "General inquiry / Other service"), _defineProperty(_common2, "available", "Immediate Support"), _defineProperty(_common2, "minutes", "Response within minutes"), _defineProperty(_common2, "hours", "Available 24/7"), _defineProperty(_common2, "verified", "Response Guarantee"), _common2),
        // Services Names
        servicesList: {
          localDelivery: "Local Delivery",
          localDeliveryQatar: "Local Delivery in Qatar",
          localDeliveryTunisia: "Local Delivery in Tunisia",
          scaleSales: "Scale Sales",
          scaleBooking: "Scale Booking",
          scaleBookingQaTn: "Scale booking from Qatar to Tunisia",
          scaleBookingTnQa: "Scale booking from Tunisia to Qatar",
          moneyDelivery: "Money Delivery Documentation"
        },
        // Countries
        countries: {
          qatar: "Qatar",
          tunisia: "Tunisia",
          saudi: "Saudi Arabia",
          uae: "United Arab Emirates",
          egypt: "Egypt",
          morocco: "Morocco"
        },
        // Time
        time: {
          immediate: "Immediate",
          urgent: "Urgent",
          emergency: "Emergency",
          normal: "Normal",
          minutes: "Minutes",
          hours: "Hours",
          days: "Days"
        },
        // Status
        status: {
          connected: "Connected Now",
          offline: "Offline",
          available: "Available",
          busy: "Busy"
        },
        // Map
        map: {
          errorTitle: "Sorry, unable to load the map",
          errorMessage: "There is a technical problem loading the map. You can contact us directly through the following means:",
          qatarBranch: "Qatar Branch 🇶🇦",
          tunisiaBranch: "Tunisia Branch 🇹🇳"
        },
        // Coverage
        coverage: {
          doha: "Doha and all its areas",
          rayyan: "Rayyan and Al Wakra",
          khor: "Al Khor and Al Dhakhira",
          allQatar: "All areas of Qatar",
          tunis: "Tunis Capital",
          sfax: "Sfax and Sousse",
          nabeul: "Nabeul and Monastir",
          allTunisia: "All areas of Tunisia",
          qatar: "Service areas in Qatar",
          tunisia: "Service areas in Tunisia",
          mainOffices: "Main offices"
        },
        // FAQ
        faq: {
          question1: "What is the fastest way to contact you?",
          answer1: "The fastest way to contact is via WhatsApp where you get a response within minutes during working hours. For urgent inquiries, you can call directly on the numbers mentioned.",
          question2: "What are the official working hours?",
          answer2: "We work 24 hours a day, seven days a week, including official holidays. Emergency service is available 24/7.",
          question3: "How can I track my order status?",
          answer3: "After submitting your order, we will send a unique tracking number via WhatsApp and email. You can use this number to track your order status.",
          question4: "Are services available in all areas of Qatar and Tunisia?",
          answer4: "Yes, we provide our services in all areas of Qatar and Tunisia. Some remote areas may require prior arrangement. You can contact us to check coverage in your area.",
          question5: "What is the response time for the electronic form?",
          answer5: "The average response time for electronic forms is 2-4 hours during working hours. For urgent requests, please use WhatsApp or phone."
        }
      };
    } // ==================== NOTIFICATION SYSTEM ====================

  }, {
    key: "showLanguageChangeNotification",
    value: function showLanguageChangeNotification(lang) {
      var message = lang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English';
      var notification = document.createElement('div');
      notification.className = 'language-notification';
      notification.innerHTML = "\n            <div class=\"notification-content\">\n                <i class=\"fas fa-language\"></i>\n                <span>".concat(message, "</span>\n            </div>\n        "); // Add styles

      var style = document.createElement('style');
      style.textContent = "\n            .language-notification {\n                position: fixed;\n                top: 20px;\n                right: 20px;\n                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n                color: white;\n                padding: 15px 25px;\n                border-radius: 10px;\n                box-shadow: 0 10px 30px rgba(0,0,0,0.2);\n                z-index: 10000;\n                animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;\n                animation-fill-mode: forwards;\n                font-family: 'Cairo', sans-serif;\n            }\n            \n            .notification-content {\n                display: flex;\n                align-items: center;\n                gap: 12px;\n            }\n            \n            .notification-content i {\n                font-size: 1.3rem;\n            }\n            \n            @keyframes slideInRight {\n                from { transform: translateX(100%); opacity: 0; }\n                to { transform: translateX(0); opacity: 1; }\n            }\n            \n            @keyframes fadeOut {\n                from { opacity: 1; }\n                to { opacity: 0; }\n            }\n        ";
      document.head.appendChild(style);
      document.body.appendChild(notification); // Remove after 3 seconds

      setTimeout(function () {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 3000);
    } // ==================== STORAGE LISTENER ====================

  }, {
    key: "setupStorageListener",
    value: function setupStorageListener() {
      var _this5 = this;

      window.addEventListener('storage', function (e) {
        if (e.key === 'hela_language' && e.newValue !== _this5.currentLang) {
          console.log('🔄 Language changed from another tab:', e.newValue);

          _this5.switchLanguage(e.newValue);
        }
      });
    } // ==================== PUBLIC METHODS ====================

  }, {
    key: "getCurrentLanguage",
    value: function getCurrentLanguage() {
      return this.currentLang;
    }
  }, {
    key: "setLanguage",
    value: function setLanguage(lang) {
      this.switchLanguage(lang);
    }
  }, {
    key: "refreshTranslations",
    value: function refreshTranslations() {
      this.applyTranslations();
    }
  }]);

  return LanguageManager;
}(); // ==================== GLOBAL INITIALIZATION ====================


var languageManager;

function initLanguageSystem() {
  if (!languageManager) {
    languageManager = new LanguageManager();
    languageManager.init();
  }

  return languageManager;
} // Initialize when DOM is ready


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageSystem);
} else {
  initLanguageSystem();
} // Make available globally


window.LanguageManager = LanguageManager;
window.languageManager = languageManager;
window.initLanguageSystem = initLanguageSystem; // Export for module systems

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LanguageManager: LanguageManager,
    languageManager: languageManager,
    initLanguageSystem: initLanguageSystem
  };
}
//# sourceMappingURL=language.dev.js.map
