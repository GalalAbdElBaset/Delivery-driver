"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * ملف JavaScript لصفحة التواصل الاحترافية
 * HELA Express Tn-QA
 */
document.addEventListener('DOMContentLoaded', function () {
  // ================= INITIALIZE CONTACT PAGE =================
  function initContactPage() {
    initCopyButtons();
    initFileUpload();
    initContactForm();
    initFAQAccordion();
    initQuickWidget();
    initPhoneValidation();
    initFormAutoSave();
  } // ================= COPY BUTTONS =================


  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        var _this = this;

        var textToCopy = this.getAttribute('data-number') || this.getAttribute('data-text');

        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(function () {
            // تغيير الأيقونة مؤقتاً
            var originalIcon = _this.innerHTML;
            _this.innerHTML = '<i class="fas fa-check"></i>'; // إظهار رسالة تأكيد

            showToast('تم نسخ النص: ' + textToCopy, 'success'); // إعادة الأيقونة الأصلية بعد ثانيتين

            setTimeout(function () {
              _this.innerHTML = originalIcon;
            }, 2000);
          })["catch"](function (err) {
            console.error('فشل النسخ:', err);
            showToast('فشل النسخ، يرجى المحاولة مرة أخرى', 'error');
          });
        }
      });
    });
  } // ================= FILE UPLOAD =================


  function initFileUpload() {
    var fileUploadArea = document.getElementById('fileUploadArea');
    var fileInput = document.getElementById('fileUpload');
    var fileList = document.getElementById('fileList');
    if (!fileUploadArea || !fileInput) return; // فتح اختيار الملفات عند النقر

    fileUploadArea.addEventListener('click', function () {
      return fileInput.click();
    }); // سحب وإفلات الملفات

    fileUploadArea.addEventListener('dragover', function (e) {
      e.preventDefault();
      fileUploadArea.style.borderColor = 'var(--gold)';
      fileUploadArea.style.background = 'rgba(212, 175, 55, 0.1)';
    });
    fileUploadArea.addEventListener('dragleave', function () {
      fileUploadArea.style.borderColor = '';
      fileUploadArea.style.background = '';
    });
    fileUploadArea.addEventListener('drop', function (e) {
      e.preventDefault();
      fileUploadArea.style.borderColor = '';
      fileUploadArea.style.background = '';

      if (e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files);
      }
    }); // تغيير الملفات المختارة

    fileInput.addEventListener('change', function (e) {
      if (e.target.files.length) {
        handleFiles(e.target.files);
      }
    });

    function handleFiles(files) {
      var maxSize = 10 * 1024 * 1024; // 10MB

      var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      Array.from(files).forEach(function (file) {
        // التحقق من حجم الملف
        if (file.size > maxSize) {
          showToast('الملف ' + file.name + ' يتجاوز الحد المسموح (10MB)', 'error');
          return;
        } // التحقق من نوع الملف


        if (!allowedTypes.includes(file.type)) {
          showToast('نوع الملف ' + file.name + ' غير مسموح به', 'error');
          return;
        } // إضافة الملف إلى القائمة


        addFileToList(file);
      }); // إعادة تعيين حقل الإدخال

      fileInput.value = '';
    }

    function addFileToList(file) {
      var fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      var fileSize = formatFileSize(file.size);
      var fileIcon = getFileIcon(file.type);
      fileItem.innerHTML = "\n                <div class=\"file-info\">\n                    <i class=\"".concat(fileIcon, " file-icon\"></i>\n                    <div>\n                        <div class=\"file-name\">").concat(file.name, "</div>\n                        <div class=\"file-size\">").concat(fileSize, "</div>\n                    </div>\n                </div>\n                <button class=\"remove-file\" type=\"button\">\n                    <i class=\"fas fa-times\"></i>\n                </button>\n            "); // إضافة حدث إزالة الملف

      fileItem.querySelector('.remove-file').addEventListener('click', function () {
        fileItem.remove();
      });
      fileList.appendChild(fileItem);
    }

    function getFileIcon(fileType) {
      if (fileType.startsWith('image/')) return 'fas fa-image';
      if (fileType === 'application/pdf') return 'fas fa-file-pdf';
      if (fileType.includes('word')) return 'fas fa-file-word';
      return 'fas fa-file';
    }

    function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      var k = 1024;
      var sizes = ['Bytes', 'KB', 'MB', 'GB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  } // ================= CONTACT FORM =================


  function initContactForm() {
    var contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    var formLoader = document.getElementById('formLoader');
    var successMessage = document.getElementById('successMessage');
    var errorMessage = document.getElementById('errorMessage');
    var errorText = document.getElementById('errorText');
    var clearFormBtn = document.getElementById('clearForm');
    var submitFormBtn = document.getElementById('submitForm');
    var charCount = document.querySelector('.char-count');
    var messageTextarea = document.getElementById('message'); // تحديث عدد الأحرف

    if (messageTextarea && charCount) {
      messageTextarea.addEventListener('input', function () {
        var count = this.value.length;
        charCount.textContent = "".concat(count, "/2000 \u062D\u0631\u0641");

        if (count > 2000) {
          charCount.style.color = 'var(--error)';
          this.style.borderColor = 'var(--error)';
        } else {
          charCount.style.color = 'var(--gray)';
          this.style.borderColor = '';
        }
      });
    } // مسح النموذج


    if (clearFormBtn) {
      clearFormBtn.addEventListener('click', function () {
        if (confirm('هل أنت متأكد من مسح جميع البيانات المدخلة؟')) {
          contactForm.reset();
          document.getElementById('fileList').innerHTML = '';
          if (charCount) charCount.textContent = '0/2000 حرف';
          showToast('تم مسح النموذج بنجاح', 'info');
        }
      });
    } // إرسال النموذج


    contactForm.addEventListener('submit', function _callee(e) {
      var formData, whatsappMessage, whatsappNumber;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault(); // التحقق من صحة النموذج

              if (validateForm()) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              // إظهار حالة التحميل
              submitFormBtn.disabled = true;
              formLoader.style.display = 'block';
              submitFormBtn.querySelector('span').textContent = 'جاري الإرسال...'; // إخفاء رسائل الخطأ القديمة

              hideMessages();

              try {
                // جمع بيانات النموذج
                formData = getFormData(); // إنشاء رسالة الواتساب

                whatsappMessage = createWhatsAppMessage(formData);
                whatsappNumber = "97471375390"; // الرقم الأساسي
                // الانتقال إلى واتساب

                setTimeout(function () {
                  var whatsappUrl = "https://wa.me/".concat(whatsappNumber, "?text=").concat(encodeURIComponent(whatsappMessage));
                  window.open(whatsappUrl, '_blank'); // إظهار رسالة النجاح

                  showSuccessMessage(); // حفظ النموذج في التخزين المحلي

                  saveFormToLocalStorage(formData); // إعادة تعيين النموذج بعد 5 ثوانٍ

                  setTimeout(function () {
                    contactForm.reset();
                    document.getElementById('fileList').innerHTML = '';
                    if (charCount) charCount.textContent = '0/2000 حرف';
                  }, 5000);
                }, 1500);
              } catch (error) {
                console.error('Error:', error);
                showErrorMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
              } finally {
                // إعادة تعيين حالة الزر
                setTimeout(function () {
                  submitFormBtn.disabled = false;
                  formLoader.style.display = 'none';
                  submitFormBtn.querySelector('span').textContent = 'إرسال عبر واتساب';
                }, 2000);
              }

            case 8:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    function validateForm() {
      var requiredFields = contactForm.querySelectorAll('[required]');
      var isValid = true;
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--error)';
          isValid = false; // إضافة رسالة خطأ

          var errorDiv = document.createElement('div');
          errorDiv.className = 'field-error';
          errorDiv.textContent = 'هذا الحقل مطلوب';
          errorDiv.style.cssText = 'color: var(--error); font-size: 0.85rem; margin-top: 5px;';
          field.parentNode.appendChild(errorDiv); // إزالة رسالة الخطأ عند الإدخال

          field.addEventListener('input', function () {
            this.style.borderColor = '';
            var error = this.parentNode.querySelector('.field-error');
            if (error) error.remove();
          });
        }
      }); // التحقق من البريد الإلكتروني

      var emailField = document.getElementById('email');

      if (emailField.value && !isValidEmail(emailField.value)) {
        emailField.style.borderColor = 'var(--error)';
        showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
        isValid = false;
      } // التحقق من عدد أحرف الرسالة


      if (messageTextarea.value.length > 2000) {
        showToast('الرسالة طويلة جداً (الحد الأقصى 2000 حرف)', 'error');
        isValid = false;
      }

      return isValid;
    }

    function getFormData() {
      var formData = {
        timestamp: new Date().toISOString(),
        fullName: document.getElementById('fullName').value,
        countryCode: document.getElementById('countryCode').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        preferredContact: document.getElementById('preferredContact').value,
        serviceType: document.getElementById('serviceType').value,
        urgency: document.getElementById('urgency').value,
        messageSubject: document.getElementById('messageSubject').value,
        message: document.getElementById('message').value,
        privacyPolicy: document.getElementById('privacyPolicy').checked
      };
      return formData;
    }

    function createWhatsAppMessage(formData) {
      var serviceNames = {
        'local-delivery-qatar': 'التوصيل المحلي في قطر',
        'local-delivery-tunisia': 'التوصيل المحلي في تونس',
        'scale-sales': 'بيع موازين',
        'scale-booking-qa-tn': 'حجز ميزان من قطر إلى تونس',
        'scale-booking-tn-qa': 'حجز ميزان من تونس إلى قطر',
        'money-delivery': 'توثيق تسليم الأموال',
        'other': 'استفسار عام / خدمة أخرى'
      };
      var urgencyNames = {
        'normal': 'عادي',
        'urgent': 'عاجل',
        'emergency': 'طارئ'
      };
      var contactPreference = {
        'whatsapp': 'واتساب',
        'phone': 'مكالمة هاتفية',
        'email': 'بريد إلكتروني',
        'any': 'أي طريقة'
      };
      return "\uD83D\uDE80 *\u0637\u0644\u0628 \u062E\u062F\u0645\u0629 \u062C\u062F\u064A\u062F \u0645\u0646 \u0645\u0648\u0642\u0639 HELA Express*%0A%0A" + "\uD83D\uDCCB *\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0639\u0645\u064A\u0644:*%0A" + "\uD83D\uDC64 \u0627\u0644\u0627\u0633\u0645: ".concat(formData.fullName, "%0A") + "\uD83D\uDCDE \u0627\u0644\u0647\u0627\u062A\u0641: ".concat(formData.countryCode, " ").concat(formData.phoneNumber, "%0A") + (formData.email ? "\uD83D\uDCE7 \u0627\u0644\u0628\u0631\u064A\u062F: ".concat(formData.email, "%0A") : '') + "\uD83D\uDCF1 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0645\u0641\u0636\u0644: ".concat(contactPreference[formData.preferredContact], "%0A%0A") + "\uD83D\uDEE0\uFE0F *\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062E\u062F\u0645\u0629:*%0A" + "\u2699\uFE0F \u0627\u0644\u062E\u062F\u0645\u0629: ".concat(serviceNames[formData.serviceType] || formData.serviceType, "%0A") + "\uD83D\uDEA8 \u062F\u0631\u062C\u0629 \u0627\u0644\u0627\u0633\u062A\u0639\u062C\u0627\u0644: ".concat(urgencyNames[formData.urgency], "%0A") + "\uD83D\uDCCC \u0627\u0644\u0645\u0648\u0636\u0648\u0639: ".concat(formData.messageSubject, "%0A%0A") + "\uD83D\uDCAC *\u0627\u0644\u0631\u0633\u0627\u0644\u0629:*%0A".concat(formData.message, "%0A%0A") + "\uD83D\uDCCD *\u0627\u0644\u0645\u0635\u062F\u0631:* \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u0648\u0627\u0635\u0644 - \u0645\u0648\u0642\u0639 HELA Express%0A" + "\uD83D\uDD52 *\u0627\u0644\u062A\u0627\u0631\u064A\u062E:* ".concat(new Date().toLocaleString('ar-SA'));
    }

    function showSuccessMessage() {
      successMessage.style.display = 'flex';
      errorMessage.style.display = 'none'; // إخفاء الرسالة بعد 10 ثوانٍ

      setTimeout(function () {
        successMessage.style.display = 'none';
      }, 10000);
    }

    function showErrorMessage(message) {
      errorText.textContent = message;
      errorMessage.style.display = 'flex';
      successMessage.style.display = 'none';
    }

    function hideMessages() {
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';
    }
  } // ================= FORM AUTO SAVE =================


  function initFormAutoSave() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var saveKey = 'hela_contact_form_draft'; // تحميل البيانات المحفوظة

    var savedData = localStorage.getItem(saveKey);

    if (savedData) {
      try {
        var data = JSON.parse(savedData);
        Object.keys(data).forEach(function (key) {
          var field = form.querySelector("[name=\"".concat(key, "\"]"));

          if (field) {
            if (field.type === 'checkbox') {
              field.checked = data[key];
            } else {
              field.value = data[key];
            }
          }
        }); // تحديث عدد أحرف الرسالة

        var messageField = document.getElementById('message');
        var charCount = document.querySelector('.char-count');

        if (messageField && charCount) {
          charCount.textContent = "".concat(messageField.value.length, "/2000 \u062D\u0631\u0641");
        } // إظهار تنبيه


        setTimeout(function () {
          showToast('تم استعادة البيانات التي قمت بإدخالها سابقاً', 'info');
        }, 1000);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    } // حفظ البيانات تلقائياً


    form.addEventListener('input', debounce(function () {
      var formData = {};
      var formElements = form.elements;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = formElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          if (element.name) {
            if (element.type === 'checkbox') {
              formData[element.name] = element.checked;
            } else if (element.type !== 'button' && element.type !== 'submit') {
              formData[element.name] = element.value;
            }
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

      localStorage.setItem(saveKey, JSON.stringify(formData));
    }, 1000)); // مسح البيانات المحفوظة عند الإرسال الناجح

    form.addEventListener('submit', function () {
      localStorage.removeItem(saveKey);
    });
  }

  function saveFormToLocalStorage(formData) {
    var submissionsKey = 'hela_form_submissions';
    var submissions = JSON.parse(localStorage.getItem(submissionsKey)) || [];
    submissions.push(_objectSpread({}, formData, {
      submittedAt: new Date().toISOString()
    })); // الاحتفاظ بآخر 10 طلبات فقط

    if (submissions.length > 10) {
      submissions = submissions.slice(-10);
    }

    localStorage.setItem(submissionsKey, JSON.stringify(submissions));
  } // ================= PHONE VALIDATION =================


  function initPhoneValidation() {
    var phoneInput = document.getElementById('phoneNumber');
    if (!phoneInput) return;
    phoneInput.addEventListener('input', function (e) {
      var value = e.target.value.replace(/\D/g, '');

      if (value.length > 0) {
        // تنسيق الرقم بناءً على مفتاح الدولة
        var countryCode = document.getElementById('countryCode').value;
        var formatted = value;

        if (countryCode === '+974') {
          // قطر
          if (value.length <= 4) {
            formatted = value;
          } else if (value.length <= 7) {
            formatted = "".concat(value.substring(0, 4), " ").concat(value.substring(4));
          } else {
            formatted = "".concat(value.substring(0, 4), " ").concat(value.substring(4, 7), " ").concat(value.substring(7));
          }
        } else if (countryCode === '+216') {
          // تونس
          if (value.length <= 2) {
            formatted = value;
          } else if (value.length <= 5) {
            formatted = "".concat(value.substring(0, 2), " ").concat(value.substring(2));
          } else if (value.length <= 7) {
            formatted = "".concat(value.substring(0, 2), " ").concat(value.substring(2, 5), " ").concat(value.substring(5));
          } else {
            formatted = "".concat(value.substring(0, 2), " ").concat(value.substring(2, 5), " ").concat(value.substring(5, 7), " ").concat(value.substring(7));
          }
        } else {
          // تنسيق عام
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
  } // ================= FAQ ACCORDION =================


  function initFAQAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      question.addEventListener('click', function () {
        // إغلاق جميع العناصر الأخرى
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');

            var _answer = otherItem.querySelector('.faq-answer');

            _answer.style.maxHeight = null;
          }
        }); // تبديل العنصر الحالي

        item.classList.toggle('active');
        var answer = item.querySelector('.faq-answer');

        if (item.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = null;
        }
      });
    }); // فتح أول عنصر افتراضياً

    if (faqItems.length > 0) {
      var firstItem = faqItems[0];
      firstItem.classList.add('active');
      var firstAnswer = firstItem.querySelector('.faq-answer');
      firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }
  } // ================= QUICK WIDGET =================


  function initQuickWidget() {
    var widget = document.querySelector('.quick-contact-widget');
    var widgetClose = document.querySelector('.widget-close');
    if (!widget || !widgetClose) return; // إظهار الودجت بعد 5 ثوانٍ

    setTimeout(function () {
      widget.classList.add('active');
    }, 5000); // إغلاق الودجت

    widgetClose.addEventListener('click', function () {
      widget.classList.remove('active');
    }); // إخفاء الودجت عند التمرير

    var lastScrollTop = 0;
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // التمرير لأسفل - إخفاء الودجت
        widget.classList.remove('active');
      } else {
        // التمرير لأعلى - إظهار الودجت
        if (scrollTop > 500) {
          widget.classList.add('active');
        }
      }

      lastScrollTop = scrollTop;
    });
  } // ================= UTILITY FUNCTIONS =================


  function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function showToast(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
    // إنصراف عنصر التوست
    var toast = document.createElement('div');
    toast.className = "toast-message toast-".concat(type);
    toast.textContent = message; // تنسيق التوست

    toast.style.cssText = "\n            position: fixed;\n            top: 20px;\n            right: 20px;\n            padding: 15px 20px;\n            background: ".concat(type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : type === 'info' ? 'var(--gold)' : 'var(--gray-dark)', ";\n            color: white;\n            border-radius: var(--border-radius);\n            box-shadow: var(--shadow-hover);\n            z-index: 9999;\n            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;\n            max-width: 350px;\n            font-weight: 500;\n        "); // إضافة أنيميشن

    var style = document.createElement('style');
    style.textContent = "\n            @keyframes slideIn {\n                from { transform: translateX(100%); opacity: 0; }\n                to { transform: translateX(0); opacity: 1; }\n            }\n            @keyframes fadeOut {\n                from { opacity: 1; }\n                to { opacity: 0; }\n            }\n        ";
    document.head.appendChild(style);
    document.body.appendChild(toast); // إزالة التوست بعد 3 ثوانٍ

    setTimeout(function () {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 3000);
  }

  function debounce(func, wait) {
    var timeout;
    return function executedFunction() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var later = function later() {
        clearTimeout(timeout);
        func.apply(void 0, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  } // جعل الدوال متاحة عالمياً


  window.initContactPage = initContactPage;
  window.showToast = showToast; // تهيئة الصفحة

  initContactPage();
});
//# sourceMappingURL=contact.dev.js.map
