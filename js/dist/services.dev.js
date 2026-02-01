"use strict";

// services.js - نظام طلبات الخدمات مع زرين منفصلين وتحسينات CSS
document.addEventListener('DOMContentLoaded', function () {
  // تعريف الأرقام
  var qatarNumber = '+97431691024';
  var tunisiaNumber = '+21656471550'; // إضافة أنماط CSS محسنة للقوائم المنسدلة

  addEnhancedSelectStyles(); // إضافة حقول بيانات العميل لكل بطاقة

  initializeCustomerFields(); // إدارة حالة الأزرار بناء على اختيار الخدمة

  setupButtonStates(); // إضافة تأثيرات للقوائم المنسدلة

  enhanceSelectElements(); // جميع أزرار إرسال واتساب

  var sendWhatsAppBtns = document.querySelectorAll('.send-whatsapp'); // إضافة حدث لكل زر

  sendWhatsAppBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var serviceCard = this.closest('.service-card');
      var serviceSelect = serviceCard.querySelector('.service-select');
      var customerName = serviceCard.querySelector('.customer-name');
      var customerPhone = serviceCard.querySelector('.customer-phone');
      var selectedService = serviceSelect.value;
      var mainService = this.getAttribute('data-service');
      var country = this.getAttribute('data-country');
      var name = customerName ? customerName.value.trim() : '';
      var phone = customerPhone ? customerPhone.value.trim() : ''; // التحقق من اختيار خدمة

      if (!selectedService) {
        showAlert('الرجاء اختيار خدمة من القائمة أولاً', 'error');
        animateSelect(serviceSelect);
        return;
      } // التحقق من اسم العميل


      if (!name) {
        showAlert('الرجاء إدخال اسمك الكامل', 'error');

        if (customerName) {
          customerName.focus();
          animateInput(customerName);
        }

        return;
      } // التحقق من رقم الهاتف


      if (!phone) {
        showAlert('الرجاء إدخال رقم هاتفك', 'error');

        if (customerPhone) {
          customerPhone.focus();
          animateInput(customerPhone);
        }

        return;
      } // التحقق من صحة رقم الهاتف


      var phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;

      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        showAlert('يرجى إدخال رقم هاتف صحيح', 'error');

        if (customerPhone) {
          customerPhone.focus();
          animateInput(customerPhone);
        }

        return;
      } // التحقق من توافق الخدمة مع البلد المختار


      if (!isServiceCountryCompatible(selectedService, country, serviceCard)) {
        showAlert('هذه الخدمة غير متاحة للبلد المحدد', 'error');
        return;
      } // إنشاء رسالة واتساب


      var whatsappMessage = createWhatsAppMessage(mainService, selectedService, country, name, phone); // تحديد الرقم المناسب

      var phoneNumber;

      if (country === 'قطر') {
        phoneNumber = qatarNumber;
      } else if (country === 'تونس') {
        phoneNumber = tunisiaNumber;
      } // إرسال الرسالة


      sendWhatsAppMessage(phoneNumber, whatsappMessage, country, name);
    });
  }); // دالة التحقق من توافق الخدمة مع البلد

  function isServiceCountryCompatible(service, country, serviceCard) {
    // إذا كانت البطاقة تحتوي على زرين (قطر وتونس)
    var hasDoubleButtons = serviceCard.querySelector('.service-contact-double'); // إذا كانت البطاقة تحتوي على زر واحد فقط

    var singleButton = serviceCard.querySelector('.service-btn:not(.qatar-btn):not(.tunisia-btn)'); // حالة 1: بطاقة بها زرين (توصيل دولي)

    if (hasDoubleButtons) {
      // حجز ميزان من تونس إلى قطر: فقط زر قطر يعمل
      if (service === 'حجز ميزان من تونس الي قطر') {
        return country === 'قطر';
      } // حجز ميزان من قطر إلى تونس: فقط زر تونس يعمل
      else if (service === 'حجز ميزان من قطر الي تونس') {
          return country === 'تونس';
        } // تريد بيع ميزان: كلا الزرين يعملان
        else if (service === 'تريد بيع ميزان') {
            return country === 'قطر' || country === 'تونس';
          }
    } // حالة 2: بطاقة بها زر واحد
    else if (singleButton) {
        var buttonCountry = singleButton.getAttribute('data-country'); // إذا كان الزر لقطر فقط

        if (buttonCountry === 'قطر') {
          return country === 'قطر';
        } // إذا كان الزر لتونس فقط
        else if (buttonCountry === 'تونس') {
            return country === 'تونس';
          } // إذا كان الزر مشترك (لتوثيق الأموال)
          else if (buttonCountry === 'مشترك') {
              return true;
            }
      }

    return false;
  } // دالة إدارة حالة الأزرار


  function setupButtonStates() {
    // مراقبة تغييرات القوائم المنسدلة
    document.querySelectorAll('.service-select').forEach(function (select) {
      select.addEventListener('change', function () {
        var serviceCard = this.closest('.service-card');
        updateButtonStates(serviceCard, this.value); // إضافة تأثير عند التغيير

        animateSelect(this); // تحديث لون البطاقة بناء على الاختيار

        updateCardAppearance(serviceCard, this.value);
      }); // تحديث الحالة الأولية

      var serviceCard = select.closest('.service-card');
      updateButtonStates(serviceCard, select.value);
      updateCardAppearance(serviceCard, select.value);
    });
  } // دالة تحديث حالة الأزرار


  function updateButtonStates(serviceCard, selectedService) {
    if (!serviceCard) return;
    var qatarBtn = serviceCard.querySelector('.qatar-btn');
    var tunisiaBtn = serviceCard.querySelector('.tunisia-btn'); // إذا لم يكن هناك زرين (قطر وتونس)، تخطي

    if (!qatarBtn || !tunisiaBtn) return;

    if (!selectedService) {
      // لا يوجد اختيار - تعطيل كلا الزرين
      qatarBtn.disabled = true;
      tunisiaBtn.disabled = true;
      qatarBtn.classList.add('inactive');
      tunisiaBtn.classList.add('inactive');
      qatarBtn.classList.remove('active');
      tunisiaBtn.classList.remove('active');
    } else {
      // التحقق من توافق الخدمة مع كل بلد
      var isQatarCompatible = isServiceCountryCompatible(selectedService, 'قطر', serviceCard);
      var isTunisiaCompatible = isServiceCountryCompatible(selectedService, 'تونس', serviceCard); // تحديث زر قطر

      qatarBtn.disabled = !isQatarCompatible;

      if (isQatarCompatible) {
        qatarBtn.classList.remove('inactive');
        qatarBtn.classList.add('active');
      } else {
        qatarBtn.classList.add('inactive');
        qatarBtn.classList.remove('active');
      } // تحديث زر تونس


      tunisiaBtn.disabled = !isTunisiaCompatible;

      if (isTunisiaCompatible) {
        tunisiaBtn.classList.remove('inactive');
        tunisiaBtn.classList.add('active');
      } else {
        tunisiaBtn.classList.add('inactive');
        tunisiaBtn.classList.remove('active');
      } // تحديث نص الأزرار بناء على الخدمة


      updateButtonText(serviceCard, selectedService); // إضافة تأثير للأزرار النشطة

      if (isQatarCompatible) {
        animateButton(qatarBtn);
      }

      if (isTunisiaCompatible) {
        animateButton(tunisiaBtn);
      }
    }
  } // دالة تحديث نص الأزرار


  function updateButtonText(serviceCard, selectedService) {
    var qatarBtn = serviceCard.querySelector('.qatar-btn');
    var tunisiaBtn = serviceCard.querySelector('.tunisia-btn');
    if (!qatarBtn || !tunisiaBtn) return; // نص افتراضي

    var qatarText = 'طلب من قطر';
    var tunisiaText = 'طلب من تونس'; // تحديد النص المناسب بناء على الخدمة

    if (selectedService === 'حجز ميزان من تونس الي قطر') {
      qatarText = 'حجز من تونس لقطر';
      tunisiaText = 'غير متاح';
    } else if (selectedService === 'حجز ميزان من قطر الي تونس') {
      qatarText = 'غير متاح';
      tunisiaText = 'حجز من قطر لتونس';
    } else if (selectedService === 'تريد بيع ميزان') {
      qatarText = 'طلب بيع ميزان';
      tunisiaText = 'طلب بيع ميزان';
    } // تحديث نص الأزرار مع الحفاظ على الأيقونة


    var whatsappIcon = '<i class="fab fa-whatsapp"></i> ';

    if (!qatarBtn.disabled) {
      qatarBtn.innerHTML = whatsappIcon + qatarText;
    } else {
      qatarBtn.innerHTML = whatsappIcon + 'غير متاح';
    }

    if (!tunisiaBtn.disabled) {
      tunisiaBtn.innerHTML = whatsappIcon + tunisiaText;
    } else {
      tunisiaBtn.innerHTML = whatsappIcon + 'غير متاح';
    }
  } // دالة تحديث مظهر البطاقة بناء على الخدمة المختارة


  function updateCardAppearance(card, selectedService) {
    if (!selectedService) {
      card.classList.remove('has-selection');
      card.classList.remove('international-selected');
      card.classList.remove('local-selected');
      card.classList.remove('money-selected');
    } else {
      card.classList.add('has-selection'); // إزالة جميع الفئات أولاً

      card.classList.remove('international-selected', 'local-selected', 'money-selected'); // إضافة فئة حسب نوع الخدمة

      if (selectedService.includes('ميزان')) {
        card.classList.add('international-selected');
      } else if (selectedService.includes('توصيل محلي') || selectedService.includes('توصيل داخل')) {
        card.classList.add('local-selected');
      } else if (selectedService.includes('أموال') || selectedService.includes('تحويل')) {
        card.classList.add('money-selected');
      }
    }
  } // دالة إضافة حقول بيانات العميل


  function initializeCustomerFields() {
    var serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function (card) {
      // لا نضيف حقول لبطاقة الإعلانات
      if (card.classList.contains('advertisement-placeholder')) return; // التحقق إذا كانت الحقول موجودة بالفعل

      if (card.querySelector('.customer-fields')) return; // إنشاء حقول بيانات العميل

      var customerFields = document.createElement('div');
      customerFields.className = 'customer-fields';
      customerFields.innerHTML = "\n                <div class=\"customer-field-group\">\n                    <div class=\"customer-input-wrapper\">\n                        <input type=\"text\" class=\"customer-name\" placeholder=\"\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644\" required>\n                        <i class=\"fas fa-user input-icon\"></i>\n                        <div class=\"input-underline\"></div>\n                    </div>\n                    <div class=\"customer-input-wrapper\">\n                        <input type=\"tel\" class=\"customer-phone\" placeholder=\"\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641\" required>\n                        <i class=\"fas fa-phone input-icon\"></i>\n                        <div class=\"input-underline\"></div>\n                    </div>\n                </div>\n            "; // إضافة الحقول بعد قائمة الاختيار

      var serviceSelection = card.querySelector('.service-selection');
      var serviceContact = card.querySelector('.service-contact') || card.querySelector('.service-contact-double');

      if (serviceSelection && serviceContact) {
        // إدخال الحقول بين قائمة الاختيار وأزرار التواصل
        serviceSelection.parentNode.insertBefore(customerFields, serviceContact);
      } else if (serviceSelection) {
        // إضافة الحقول بعد قائمة الاختيار
        serviceSelection.parentNode.insertBefore(customerFields, serviceSelection.nextSibling);
      } // إضافة أحداث للحقول


      var inputs = customerFields.querySelectorAll('input');
      inputs.forEach(function (input) {
        input.addEventListener('focus', function () {
          this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function () {
          if (!this.value) {
            this.parentElement.classList.remove('focused');
          }
        }); // التحقق عند الكتابة

        input.addEventListener('input', function () {
          if (this.value) {
            this.parentElement.classList.add('has-value');
          } else {
            this.parentElement.classList.remove('has-value');
          }
        });
      });
    });
  } // دالة تحسين عناصر الـ Select


  function enhanceSelectElements() {
    document.querySelectorAll('.service-select').forEach(function (select) {
      // إضافة حدث عند الفتح
      select.addEventListener('focus', function () {
        this.parentElement.classList.add('select-focused');
      });
      select.addEventListener('blur', function () {
        this.parentElement.classList.remove('select-focused');
      }); // تحديث المظهر عند التغيير

      select.addEventListener('change', function () {
        if (this.value) {
          this.parentElement.classList.add('has-selection');
        } else {
          this.parentElement.classList.remove('has-selection');
        }
      });
    });
  } // دالة إنشاء رسالة واتساب مع بيانات العميل


  function createWhatsAppMessage(mainService, selectedService, country, name, phone) {
    var message = "\uD83D\uDE80 \u0637\u0644\u0628 \u062E\u062F\u0645\u0629 \u062C\u062F\u064A\u062F\u0629 - Tn-QA Delivery\n\n";
    message += "\uD83D\uDC64 *\u0627\u0644\u0639\u0645\u064A\u0644:* ".concat(name, "\n");
    message += "\uD83D\uDCDE *\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641:* ".concat(phone, "\n");
    message += "\uD83D\uDCCB *\u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629:* ".concat(mainService, "\n");
    message += "\uD83D\uDD27 *\u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:* ".concat(selectedService, "\n");

    if (country !== 'مشترك') {
      message += "\uD83C\uDF0D *\u0627\u0644\u0628\u0644\u062F:* ".concat(country, "\n");
    }

    message += "\n\uD83D\uDCDE *\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u062A\u0648\u0627\u0635\u0644:*\n";
    message += "\uD83C\uDDF6\uD83C\uDDE6 \u0642\u0637\u0631: ".concat(qatarNumber, "\n");
    message += "\uD83C\uDDF9\uD83C\uDDF3 \u062A\u0648\u0646\u0633: ".concat(tunisiaNumber, "\n\n");
    message += "---\n";
    message += "\uD83D\uDCCD *\u0627\u0644\u0645\u0635\u062F\u0631:* \u0645\u0648\u0642\u0639 Tn-QA Delivery\n";
    message += "\u23F0 *\u0627\u0644\u0648\u0642\u062A:* ".concat(new Date().toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }));
    return encodeURIComponent(message);
  } // دالة إرسال رسالة واتساب


  function sendWhatsAppMessage(phoneNumber, message, country, customerName) {
    var whatsappUrl = "https://wa.me/".concat(phoneNumber, "?text=").concat(message); // فتح واتساب في نافذة جديدة

    window.open(whatsappUrl, '_blank'); // إظهار رسالة نجاح

    showAlert("\u0634\u0643\u0631\u0627\u064B ".concat(customerName, "! \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628\u0643 \u0625\u0644\u0649 ").concat(country), 'success'); // حفظ الطلب

    saveServiceRequest(customerName, phone, message, country); // إعادة تعيين الحقول

    resetForm(customerName);
  } // دالة حفظ طلب الخدمة


  function saveServiceRequest(name, phone, message, country) {
    try {
      var request = {
        name: name,
        phone: phone,
        country: country,
        timestamp: new Date().toISOString(),
        message: decodeURIComponent(message)
      }; // حفظ في localStorage

      var requests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
      requests.push(request);
      if (requests.length > 100) requests.shift();
      localStorage.setItem('serviceRequests', JSON.stringify(requests));
    } catch (error) {
      console.error('خطأ في حفظ طلب الخدمة:', error);
    }
  } // دالة إعادة تعيين النموذج


  function resetForm(customerName) {
    setTimeout(function () {
      var inputs = document.querySelectorAll('.customer-name, .customer-phone');
      inputs.forEach(function (input) {
        if (input.classList.contains('customer-name')) {
          input.value = '';
          input.parentElement.classList.remove('has-value');
        }
      });
    }, 1000);
  } // دالة إظهار رسالة تنبيه


  function showAlert(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';
    // إزالة أي رسالة سابقة
    var existingAlert = document.querySelector('.alert-message');

    if (existingAlert) {
      existingAlert.remove();
    }

    var icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    var alertHTML = "\n            <div class=\"alert-message ".concat(type, "\">\n                <i class=\"fas ").concat(icon, "\"></i>\n                <span>").concat(message, "</span>\n                <button class=\"alert-close\">\n                    <i class=\"fas fa-times\"></i>\n                </button>\n            </div>\n        ");
    document.body.insertAdjacentHTML('beforeend', alertHTML); // إضافة حدث للإغلاق

    var closeBtn = document.querySelector('.alert-close');

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        var alert = this.closest('.alert-message');

        if (alert) {
          alert.remove();
        }
      });
    } // إزالة الرسالة بعد 5 ثواني


    setTimeout(function () {
      var alert = document.querySelector('.alert-message');

      if (alert) {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(function () {
          if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
          }
        }, 300);
      }
    }, 5000);
  } // دالة إضافة تأثير للقائمة المنسدلة


  function animateSelect(select) {
    select.style.transform = 'scale(1.02)';
    select.style.boxShadow = '0 0 0 3px rgba(255, 215, 0, 0.3)';
    setTimeout(function () {
      select.style.transform = 'scale(1)';
      select.style.boxShadow = '';
    }, 300);
  } // دالة إضافة تأثير للحقل النصي


  function animateInput(input) {
    input.style.transform = 'translateX(-5px)';
    input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.3)';
    setTimeout(function () {
      input.style.transform = 'translateX(0)';
      input.style.boxShadow = '';
    }, 500);
  } // دالة إضافة تأثير للزر


  function animateButton(button) {
    button.style.transform = 'scale(1.05)';
    button.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
    setTimeout(function () {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '';
    }, 300);
  } // دالة إضافة أنماط CSS محسنة


  function addEnhancedSelectStyles() {
    var styles = document.createElement('style');
    styles.textContent = "\n            /* \u0623\u0646\u0645\u0627\u0637 \u0645\u062D\u0633\u0646\u0629 \u0644\u0644\u0642\u0648\u0627\u0626\u0645 \u0627\u0644\u0645\u0646\u0633\u062F\u0644\u0629 */\n            .service-selection {\n                position: relative;\n                margin: 15px 0;\n            }\n            \n            .service-select {\n                width: 100%;\n                padding: 15px 45px 15px 20px;\n                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);\n                border: 2px solid rgba(255, 215, 0, 0.3);\n                border-radius: 12px;\n                color: #000;\n                font-size: 15px;\n                font-family: 'Cairo', sans-serif;\n                cursor: pointer;\n                transition: all 0.3s ease;\n                appearance: none;\n                background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23ffd700' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\");\n                background-repeat: no-repeat;\n                background-position: left 15px center;\n                background-size: 16px;\n                text-align: right;\n                direction: rtl;\n                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n            }\n            \n            .service-select:hover {\n                border-color: #ffd700;\n                box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);\n            }\n            \n            .service-select:focus {\n                outline: none;\n                border-color: #ffd700;\n                box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3), 0 8px 25px rgba(0, 0, 0, 0.3);\n                transform: translateY(-2px);\n            }\n            \n            .service-select option {\n                background: #1a1a1a;\n                color: #fff;\n                padding: 15px;\n                font-size: 14px;\n            }\n            \n            .service-select option:checked {\n                background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);\n                color: #000;\n                font-weight: bold;\n            }\n            \n            .service-select option:hover {\n                background: #ffd700;\n                color: #000;\n            }\n            \n            /* \u0645\u0624\u0634\u0631 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0646\u0633\u062F\u0644\u0629 */\n            .service-selection::after {\n                content: '';\n                position: absolute;\n                left: 20px;\n                top: 50%;\n                transform: translateY(-50%);\n                width: 0;\n                height: 0;\n                pointer-events: none;\n                border-left: 5px solid transparent;\n                border-right: 5px solid transparent;\n                border-top: 5px solid #ffd700;\n            }\n            \n            .select-focused .service-select {\n                border-color: #ffd700;\n                box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);\n            }\n            \n            .has-selection .service-select {\n                border-color: #4CAF50;\n                background: linear-gradient(135deg, #1a3c1e 0%, #2d5f32 100%);\n                color:#fff;\n            }\n            \n            /* \u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0639\u0646\u062F \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631 */\n            .service-card.has-selection {\n                transform: translateY(-5px);\n                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);\n            }\n            \n            .service-card.international-selected {\n                border-left: 5px solid #8A1538;\n                border-right: 5px solid #E70013;\n                background: linear-gradient(135deg, rgba(138, 21, 56, 0.1) 0%, rgba(193, 0, 44, 0.1) 50%, rgba(231, 0, 19, 0.1) 100%);\n            }\n            \n            .service-card.local-selected {\n                border-left: 5px solid #4CAF50;\n                border-right: 5px solid #2196F3;\n                background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%);\n            }\n            \n            .service-card.money-selected {\n                border-left: 5px solid #FF9800;\n                border-right: 5px solid #9C27B0;\n                background: linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%);\n            }\n            \n            /* \u0623\u0646\u0645\u0627\u0637 \u062D\u0642\u0648\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0645\u064A\u0644 */\n            .customer-fields {\n                margin: 20px 0;\n                padding: 20px;\n                background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 215, 0, 0.05) 100%);\n                border-radius: 15px;\n                border: 1px solid rgba(255, 215, 0, 0.1);\n                backdrop-filter: blur(10px);\n            }\n            \n            .customer-field-group {\n                display: flex;\n                flex-direction: column;\n                gap: 20px;\n            }\n            \n            .customer-input-wrapper {\n                position: relative;\n                width: 100%;\n            }\n            \n            .customer-input-wrapper input {\n                width: 100%;\n                padding: 18px 50px 18px 20px;\n                background: rgba(255, 255, 255, 0.95);\n                border: 2px solid rgba(255, 215, 0, 0.3);\n                border-radius: 12px;\n                color: #000;\n                font-size: 15px;\n                font-family: 'Cairo', sans-serif;\n                transition: all 0.3s ease;\n                text-align: right;\n                direction: rtl;\n                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n            }\n            \n            .customer-input-wrapper input:focus {\n                outline: none;\n                border-color: #ffd700;\n                box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2);\n                background: rgba(255, 255, 255, 1);\n                transform: translateY(-2px);\n            }\n            \n            .customer-input-wrapper input::placeholder {\n                color: rgba(0, 0, 0, 0.6);\n                text-align: right;\n                direction: rtl;\n                transition: all 0.3s ease;\n            }\n            \n            .customer-input-wrapper input:focus::placeholder {\n                color: rgba(0, 0, 0, 0.3);\n                transform: translateY(-10px);\n                font-size: 12px;\n            }\n            \n            .customer-input-wrapper .input-icon {\n                position: absolute;\n                left: 20px;\n                top: 50%;\n                transform: translateY(-50%);\n                color: #ffd700;\n                font-size: 18px;\n                transition: all 0.3s ease;\n            }\n            \n            .customer-input-wrapper.focused .input-icon {\n                color: #8A1538;\n                transform: translateY(-50%) scale(1.2);\n            }\n            \n            .input-underline {\n                position: absolute;\n                bottom: 0;\n                left: 0;\n                width: 0;\n                height: 2px;\n                background: linear-gradient(90deg, #ffd700, #8A1538);\n                transition: width 0.3s ease;\n            }\n            \n            .customer-input-wrapper.focused .input-underline {\n                width: 100%;\n            }\n            \n            /* \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0645\u0632\u062F\u0648\u062C\u0629 */\n            .service-contact-double {\n                margin-top: 25px;\n            }\n            \n            .contact-buttons-wrapper {\n                display: flex;\n                gap: 15px;\n                margin-bottom: 20px;\n            }\n            \n            .contact-buttons-wrapper .service-btn {\n                flex: 1;\n                min-width: 130px;\n                padding: 16px 15px;\n                font-size: 15px;\n                border: none;\n                border-radius: 12px;\n                cursor: pointer;\n                transition: all 0.4s ease;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                gap: 10px;\n                font-weight: 700;\n                letter-spacing: 0.5px;\n                position: relative;\n                overflow: hidden;\n                z-index: 1;\n            }\n            \n            .contact-buttons-wrapper .service-btn::before {\n                content: '';\n                position: absolute;\n                top: 0;\n                left: -100%;\n                width: 100%;\n                height: 100%;\n                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);\n                transition: left 0.6s ease;\n                z-index: -1;\n            }\n            \n            .contact-buttons-wrapper .service-btn:hover::before {\n                left: 100%;\n            }\n            \n            /* \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0628\u0644\u062F\u064A\u0646 */\n            .qatar-btn {\n                background: linear-gradient(135deg, #8A1538 0%, #C1002C 100%);\n                color: white;\n                box-shadow: 0 6px 20px rgba(138, 21, 56, 0.4);\n            }\n            \n            .qatar-btn:hover:not(:disabled) {\n                background: linear-gradient(135deg, #C1002C 0%, #8A1538 100%);\n                transform: translateY(-3px) scale(1.05);\n                box-shadow: 0 12px 25px rgba(193, 0, 44, 0.5);\n            }\n            \n            .tunisia-btn {\n                background: linear-gradient(135deg, #E70013 0%, #FF1E2E 100%);\n                color: white;\n                box-shadow: 0 6px 20px rgba(231, 0, 19, 0.4);\n            }\n            \n            .tunisia-btn:hover:not(:disabled) {\n                background: linear-gradient(135deg, #FF1E2E 0%, #E70013 100%);\n                transform: translateY(-3px) scale(1.05);\n                box-shadow: 0 12px 25px rgba(255, 30, 46, 0.5);\n            }\n            \n            /* \u0632\u0631 \u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0639\u0627\u062F\u064A */\n            .service-btn.whatsapp {\n                background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);\n                color: white;\n                box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);\n            }\n            \n            .service-btn.whatsapp:hover:not(:disabled) {\n                background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);\n                transform: translateY(-3px) scale(1.05);\n                box-shadow: 0 12px 25px rgba(18, 140, 126, 0.5);\n            }\n            \n            /* \u0632\u0631 \u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0623\u0645\u0648\u0627\u0644 */\n            .important-card .service-btn {\n                background: linear-gradient(135deg, #FF9800 0%, #FF5722 100%);\n                color: white;\n                box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);\n            }\n            \n            .important-card .service-btn:hover:not(:disabled) {\n                background: linear-gradient(135deg, #FF5722 0%, #FF9800 100%);\n                transform: translateY(-3px) scale(1.05);\n                box-shadow: 0 12px 25px rgba(255, 87, 34, 0.5);\n            }\n            \n            /* \u062D\u0627\u0644\u0629 \u0627\u0644\u0623\u0632\u0631\u0627\u0631 */\n            .service-btn.inactive {\n                opacity: 0.4;\n                filter: grayscale(100%);\n                cursor: not-allowed;\n                transform: none !important;\n                box-shadow: none !important;\n            }\n            \n            .service-btn.active {\n                opacity: 1;\n                filter: none;\n                cursor: pointer;\n                animation: pulse 2s infinite;\n            }\n            \n            @keyframes pulse {\n                0% {\n                    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);\n                }\n                70% {\n                    box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);\n                }\n                100% {\n                    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);\n                }\n            }\n            \n            .service-btn:disabled {\n                opacity: 0.3;\n                cursor: not-allowed;\n                transform: none !important;\n                box-shadow: none !important;\n            }\n            \n            /* \u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 */\n            .alert-message {\n                position: fixed;\n                top: 25px;\n                right: 25px;\n                padding: 20px 25px;\n                border-radius: 15px;\n                z-index: 10000;\n                animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);\n                display: flex;\n                align-items: center;\n                gap: 15px;\n                max-width: 450px;\n                backdrop-filter: blur(20px);\n                border: 1px solid rgba(255, 255, 255, 0.1);\n            }\n            \n            .alert-message.error {\n                background: linear-gradient(135deg, rgba(220, 53, 69, 0.95) 0%, rgba(185, 28, 28, 0.95) 100%);\n                color: white;\n                border-right: 5px solid #dc3545;\n            }\n            \n            .alert-message.success {\n                background: linear-gradient(135deg, rgba(40, 167, 69, 0.95) 0%, rgba(21, 128, 61, 0.95) 100%);\n                color: white;\n                border-right: 5px solid #28a745;\n            }\n            \n            .alert-close {\n                background: transparent;\n                border: none;\n                color: white;\n                cursor: pointer;\n                margin-right: auto;\n                padding: 5px;\n                border-radius: 50%;\n                width: 30px;\n                height: 30px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                transition: all 0.3s ease;\n            }\n            \n            .alert-close:hover {\n                background: rgba(255, 255, 255, 0.2);\n                transform: rotate(90deg);\n            }\n            \n            @keyframes slideIn {\n                from {\n                    transform: translateX(100%) translateY(-20px);\n                    opacity: 0;\n                }\n                to {\n                    transform: translateX(0) translateY(0);\n                    opacity: 1;\n                }\n            }\n            \n            @keyframes slideOut {\n                from {\n                    transform: translateX(0) translateY(0);\n                    opacity: 1;\n                }\n                to {\n                    transform: translateX(100%) translateY(-20px);\n                    opacity: 0;\n                }\n            }\n            \n            /* \u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0644\u0644\u0647\u0648\u0627\u062A\u0641 */\n            @media (max-width: 768px) {\n                .service-select {\n                    padding: 14px 40px 14px 15px;\n                    font-size: 14px;\n                }\n                \n                .customer-field-group {\n                    gap: 15px;\n                }\n                \n                .customer-input-wrapper input {\n                    padding: 16px 45px 16px 15px;\n                    font-size: 14px;\n                }\n                \n                .contact-buttons-wrapper {\n                    flex-direction: column;\n                    gap: 12px;\n                }\n                \n                .contact-buttons-wrapper .service-btn {\n                    width: 100%;\n                    padding: 14px;\n                    font-size: 14px;\n                }\n                \n                .alert-message {\n                    top: 15px;\n                    right: 15px;\n                    left: 15px;\n                    max-width: none;\n                    padding: 15px 20px;\n                }\n            }\n            \n            /* \u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0627\u0644\u062A\u062D\u0645\u064A\u0644 */\n            .service-card {\n                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n            }\n            \n            /* \u062A\u0648\u0647\u062C \u0639\u0646\u062F \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631 */\n            .service-card.has-selection .service-icon {\n                animation: glow 2s ease-in-out infinite alternate;\n            }\n            \n            @keyframes glow {\n                from {\n                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);\n                }\n                to {\n                    box-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.3);\n                }\n            }\n        ";
    document.head.appendChild(styles);
  }
});
//# sourceMappingURL=services.dev.js.map
