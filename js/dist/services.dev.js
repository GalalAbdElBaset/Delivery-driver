"use strict";

// services.js - نظام طلبات الخدمات مع بيانات العميل
document.addEventListener('DOMContentLoaded', function () {
  // تعريف الأرقام
  var qatarNumber = '+97431691024';
  var tunisiaNumber = '+21656471550'; // إضافة حقول بيانات العميل لكل بطاقة

  initializeCustomerFields(); // جميع أزرار إرسال واتساب

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
        serviceSelect.focus();
        return;
      } // التحقق من اسم العميل


      if (!name) {
        showAlert('الرجاء إدخال اسمك الكامل', 'error');
        if (customerName) customerName.focus();
        return;
      } // التحقق من رقم الهاتف


      if (!phone) {
        showAlert('الرجاء إدخال رقم هاتفك', 'error');
        if (customerPhone) customerPhone.focus();
        return;
      } // التحقق من صحة رقم الهاتف


      var phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;

      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        showAlert('يرجى إدخال رقم هاتف صحيح', 'error');
        if (customerPhone) customerPhone.focus();
        return;
      } // إنشاء رسالة واتساب


      var whatsappMessage = createWhatsAppMessage(mainService, selectedService, country, name, phone); // تحديد الرقم المناسب

      var phoneNumber;

      if (country === 'قطر') {
        phoneNumber = qatarNumber;
      } else if (country === 'تونس') {
        phoneNumber = tunisiaNumber;
      } else {
        // للخدمات المشتركة، نسأل المستخدم
        showCountrySelection(whatsappMessage, mainService, selectedService, name, phone);
        return;
      } // إرسال الرسالة


      sendWhatsAppMessage(phoneNumber, whatsappMessage, country, name);
    });
  }); // دالة إضافة حقول بيانات العميل

  function initializeCustomerFields() {
    var serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function (card) {
      // لا نضيف حقول لبطاقة الإعلانات
      if (card.classList.contains('advertisement-placeholder')) return; // إنشاء حقول بيانات العميل

      var customerFields = document.createElement('div');
      customerFields.className = 'customer-fields';
      customerFields.innerHTML = "\n                <div class=\"customer-field-group\">\n                    <div class=\"customer-input-wrapper\">\n                        <input type=\"text\" class=\"customer-name\" placeholder=\"\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644\" required>\n                        <i class=\"fas fa-user input-icon\"></i>\n                    </div>\n                    <div class=\"customer-input-wrapper\">\n                        <input type=\"tel\" class=\"customer-phone\" placeholder=\"\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641\" required>\n                        <i class=\"fas fa-phone input-icon\"></i>\n                    </div>\n                </div>\n            "; // إضافة الحقول قبل قائمة الاختيار

      var serviceSelection = card.querySelector('.service-selection');

      if (serviceSelection) {
        serviceSelection.parentNode.insertBefore(customerFields, serviceSelection);
      }
    }); // إضافة أنماط CSS لحقول العميل

    addCustomerFieldsStyles();
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
      minute: '2-digit'
    }));
    return encodeURIComponent(message);
  } // دالة إرسال رسالة واتساب


  function sendWhatsAppMessage(phoneNumber, message, country, customerName) {
    var whatsappUrl = "https://wa.me/".concat(phoneNumber, "?text=").concat(message); // فتح واتساب في نافذة جديدة

    window.open(whatsappUrl, '_blank'); // إظهار رسالة نجاح

    showAlert("\u0634\u0643\u0631\u0627\u064B ".concat(customerName, "! \u062A\u0645 \u0641\u062A\u062D \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628\u0643 \u0625\u0644\u0649 \u0631\u0642\u0645 ").concat(country), 'success'); // حفظ الطلب (اختياري)

    saveServiceRequest(customerName, phoneNumber, message, country);
  } // دالة عرض اختيار البلد للخدمات المشتركة


  function showCountrySelection(message, mainService, selectedService, name, phone) {
    // إضافة أنماط الـ modal إذا لم تكن موجودة
    if (!document.querySelector('#modal-styles')) {
      addModalStyles();
    }

    var selectionHTML = "\n            <div class=\"country-selection-modal\">\n                <div class=\"modal-content\">\n                    <h3><i class=\"fas fa-globe gold-text\"></i> \u0627\u062E\u062A\u0631 \u0631\u0642\u0645 \u0627\u0644\u062A\u0648\u0627\u0635\u0644</h3>\n                    <p><strong>".concat(name, "</strong> - ").concat(phone, "</p>\n                    <p>\u062E\u062F\u0645\u0629: <strong>").concat(mainService, "</strong></p>\n                    <p>\u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629: <strong>").concat(selectedService, "</strong></p>\n                    <p class=\"modal-subtitle\">\u0627\u062E\u062A\u0631 \u0627\u0644\u0628\u0644\u062F \u0627\u0644\u0630\u064A \u062A\u0631\u064A\u062F \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0647:</p>\n                    <div class=\"country-buttons\">\n                        <button class=\"country-btn qatar\" data-number=\"").concat(qatarNumber, "\">\n                            <i class=\"fas fa-flag\"></i> \u0642\u0637\u0631\n                            <span>").concat(qatarNumber, "</span>\n                        </button>\n                        <button class=\"country-btn tunisia\" data-number=\"").concat(tunisiaNumber, "\">\n                            <i class=\"fas fa-flag\"></i> \u062A\u0648\u0646\u0633\n                            <span>").concat(tunisiaNumber, "</span>\n                        </button>\n                    </div>\n                    <button class=\"close-modal\">\n                        <i class=\"fas fa-times\"></i> \u0625\u0644\u063A\u0627\u0621\n                    </button>\n                </div>\n            </div>\n        "); // إضافة الـ modal إلى body

    document.body.insertAdjacentHTML('beforeend', selectionHTML); // إضافة أحداث الإغلاق

    var modal = document.querySelector('.country-selection-modal');
    var closeBtn = modal.querySelector('.close-modal');
    var qatarBtn = modal.querySelector('.country-btn.qatar');
    var tunisiaBtn = modal.querySelector('.country-btn.tunisia');
    closeBtn.addEventListener('click', function () {
      modal.remove();
    });
    qatarBtn.addEventListener('click', function () {
      var whatsappUrl = "https://wa.me/".concat(qatarNumber, "?text=").concat(message);
      window.open(whatsappUrl, '_blank');
      showAlert("\u0634\u0643\u0631\u0627\u064B ".concat(name, "! \u062A\u0645 \u0641\u062A\u062D \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628\u0643 \u0625\u0644\u0649 \u0631\u0642\u0645 \u0642\u0637\u0631"), 'success');
      modal.remove();
    });
    tunisiaBtn.addEventListener('click', function () {
      var whatsappUrl = "https://wa.me/".concat(tunisiaNumber, "?text=").concat(message);
      window.open(whatsappUrl, '_blank');
      showAlert("\u0634\u0643\u0631\u0627\u064B ".concat(name, "! \u062A\u0645 \u0641\u062A\u062D \u0648\u0627\u062A\u0633\u0627\u0628 \u0644\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628\u0643 \u0625\u0644\u0649 \u0631\u0642\u0645 \u062A\u0648\u0646\u0633"), 'success');
      modal.remove();
    }); // إغلاق عند النقر خارج الـ modal

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
  } // دالة حفظ طلب الخدمة (اختياري)


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
      if (requests.length > 100) requests.shift(); // حفظ آخر 100 طلب فقط

      localStorage.setItem('serviceRequests', JSON.stringify(requests));
      console.log('تم حفظ طلب الخدمة:', request);
    } catch (error) {
      console.error('خطأ في حفظ طلب الخدمة:', error);
    }
  } // دالة إظهار رسالة تنبيه


  function showAlert(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';
    // إزالة أي رسالة سابقة
    var existingAlert = document.querySelector('.alert-message');

    if (existingAlert) {
      existingAlert.remove();
    }

    var icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    var alertHTML = "\n            <div class=\"alert-message ".concat(type, "\">\n                <i class=\"fas ").concat(icon, "\"></i>\n                <span>").concat(message, "</span>\n            </div>\n        ");
    document.body.insertAdjacentHTML('beforeend', alertHTML); // إزالة الرسالة بعد 5 ثواني

    setTimeout(function () {
      var alert = document.querySelector('.alert-message');

      if (alert) {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(function () {
          return alert.remove();
        }, 300);
      }
    }, 5000);
  } // دالة إضافة أنماط حقول العميل


  function addCustomerFieldsStyles() {
    var styles = document.createElement('style');
    styles.textContent = "\n            /* \u0623\u0646\u0645\u0627\u0637 \u062D\u0642\u0648\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0645\u064A\u0644 */\n            .customer-fields {\n                margin: 15px 0;\n                padding: 15px;\n                background: rgba(255, 255, 255, 0.05);\n                border-radius: 10px;\n                border: 1px solid rgba(255, 215, 0, 0.2);\n                \n            }\n            \n            .customer-field-group {\n                display: flex;\n                flex-direction: column;\n                gap: 12px;\n            }\n            \n            .customer-input-wrapper {\n                position: relative;\n                width: 100%;\n            }\n            \n            .customer-input-wrapper input {\n                width: 100%;\n                padding: 12px 40px 12px 40px;\n                background: rgba(255, 255, 255, 0.1);\n                border: 1px solid rgba(255, 215, 0, 0.3);\n                border-radius: 8px;\n                color:#000\n                font-size: 16px;\n                font-family: 'Cairo', sans-serif;\n                transition: all 0.3s ease;\n            }\n            \n            .customer-input-wrapper input:focus {\n                outline: none;\n                padding:12px 40px 12px 40px;\n                border-color: #ffd700;\n                box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);\n                background: rgba(255, 255, 255, 0.15);\n            }\n            \n            .customer-input-wrapper input::placeholder {\n                color: rgba(0, 0, 0, 0.5);\n                text-align:right;\n                \n            }\n            \n            .customer-input-wrapper .input-icon {\n                position: absolute;\n                right: 15px;\n                top: 50%;\n                transform: translateY(-50%);\n                color: #ffd700;\n                font-size: 14px;\n            }\n            \n            /* \u062A\u062D\u0633\u064A\u0646 \u0645\u0638\u0647\u0631 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 */\n            .service-selection {\n                margin-top: 15px;\n            }\n            \n            .service-select {\n                width: 100%;\n                padding: 12px 15px;\n                background: rgba(255, 255, 255, 0.1);\n                border: 1px solid rgba(255, 215, 0, 0.3);\n                border-radius: 8px;\n                color: #000;\n                font-size: 14px;\n                font-family: 'Cairo', sans-serif;\n                cursor: pointer;\n                transition: all 0.3s ease;\n            }\n            \n            .service-select:focus {\n                outline: none;\n                border-color: #ffd700;\n                box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);\n                background: rgba(255, 255, 255, 0.15);\n            }\n            \n            .service-select option {\n                background: #1a1a1a;\n                color: white;\n                padding: 10px;\n            }\n            \n            /* \u062A\u062D\u0633\u064A\u0646 \u0645\u0638\u0647\u0631 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 */\n            .service-contact {\n                margin-top: 20px;\n            }\n            \n            /* \u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 */\n            .alert-message {\n                position: fixed;\n                top: 20px;\n                right: 20px;\n                padding: 15px 20px;\n                border-radius: 10px;\n                z-index: 10000;\n                animation: slideIn 0.3s ease;\n                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);\n                display: flex;\n                align-items: center;\n                gap: 10px;\n                max-width: 400px;\n                backdrop-filter: blur(10px);\n            }\n            \n            .alert-message.error {\n                background: rgba(220, 53, 69, 0.9);\n                color: white;\n                border-right: 4px solid #dc3545;\n            }\n            \n            .alert-message.success {\n                background: rgba(40, 167, 69, 0.9);\n                color: white;\n                border-right: 4px solid #28a745;\n            }\n            \n            @keyframes slideIn {\n                from {\n                    transform: translateX(100%);\n                    opacity: 0;\n                }\n                to {\n                    transform: translateX(0);\n                    opacity: 1;\n                }\n            }\n            \n            @keyframes slideOut {\n                from {\n                    transform: translateX(0);\n                    opacity: 1;\n                }\n                to {\n                    transform: translateX(100%);\n                    opacity: 0;\n                }\n            }\n            \n            /* \u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0644\u0644\u0647\u0648\u0627\u062A\u0641 */\n            @media (max-width: 768px) {\n                .customer-field-group {\n                    gap: 10px;\n                }\n                \n                .customer-input-wrapper input {\n                    padding: 10px 12px 10px 35px;\n                    font-size: 13px;\n                }\n                \n                .alert-message {\n                    top: 10px;\n                    right: 10px;\n                    left: 10px;\n                    max-width: none;\n                }\n            }\n        ";
    document.head.appendChild(styles);
  } // دالة إضافة أنماط الـ modal


  function addModalStyles() {
    var styles = "\n            <style id=\"modal-styles\">\n                .country-selection-modal {\n                    position: fixed;\n                    top: 0;\n                    right: 0;\n                    width: 100%;\n                    height: 100%;\n                    background: rgba(0, 0, 0, 0.8);\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    z-index: 10000;\n                    backdrop-filter: blur(5px);\n                }\n                \n                .country-selection-modal .modal-content {\n                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(26, 26, 26, 0.95) 100%);\n                    border: 1px solid rgba(255, 215, 0, 0.3);\n                    border-radius: 15px;\n                    padding: 30px;\n                    width: 90%;\n                    max-width: 400px;\n                    text-align: center;\n                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);\n                }\n                \n                .country-selection-modal h3 {\n                    color: #ffd700;\n                    margin-bottom: 15px;\n                    font-size: 22px;\n                }\n                \n                .country-selection-modal p {\n                    color: rgba(255, 255, 255, 0.8);\n                    margin-bottom: 10px;\n                    font-size: 14px;\n                    line-height: 1.5;\n                }\n                \n                .country-selection-modal .modal-subtitle {\n                    margin-top: 20px;\n                    margin-bottom: 20px;\n                    font-size: 18px;\n                    color: #ffd700;\n                }\n                \n                .country-buttons {\n                    display: flex;\n                    flex-direction: column;\n                    gap: 15px;\n                    margin: 25px 0;\n                }\n                \n                .country-btn {\n                    padding: 15px;\n                    border: none;\n                    border-radius: 10px;\n                    font-size: 18px;\n                    font-weight: 600;\n                    cursor: pointer;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    gap: 10px;\n                    transition: all 0.3s ease;\n                }\n                \n                .country-btn.qatar {\n                    background: linear-gradient(135deg, #8A1538 0%, #C1002C 100%);\n                    color: white;\n                }\n                \n                .country-btn.tunisia {\n                    background: linear-gradient(135deg, #E70013 0%, #FF1E2E 100%);\n                    color: white;\n                }\n                \n                .country-btn:hover {\n                    transform: translateY(-3px);\n                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);\n                }\n                \n                .country-btn span {\n                    font-size: 14px;\n                    opacity: 0.9;\n                }\n                \n                .close-modal {\n                    background: rgba(255, 255, 255, 0.1);\n                    border: 1px solid rgba(255, 255, 255, 0.2);\n                    color: white;\n                    padding: 10px 20px;\n                    border-radius: 8px;\n                    cursor: pointer;\n                    font-size: 16px;\n                    margin-top: 15px;\n                    transition: all 0.3s ease;\n                }\n                \n                .close-modal:hover {\n                    background: rgba(255, 255, 255, 0.2);\n                }\n                \n                @media (max-width: 480px) {\n                    .country-selection-modal .modal-content {\n                        padding: 20px;\n                        width: 95%;\n                    }\n                    \n                    .country-btn {\n                        padding: 12px;\n                        font-size: 16px;\n                    }\n                }\n            </style>\n        ";
    document.head.insertAdjacentHTML('beforeend', styles);
  }
});
//# sourceMappingURL=services.dev.js.map
