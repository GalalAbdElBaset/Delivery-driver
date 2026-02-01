// services.js - نظام طلبات الخدمات مع بيانات العميل
document.addEventListener('DOMContentLoaded', function() {
    // تعريف الأرقام
    const qatarNumber = '+97431691024';
    const tunisiaNumber = '+21656471550';
    
    // إضافة حقول بيانات العميل لكل بطاقة
    initializeCustomerFields();
    
    // جميع أزرار إرسال واتساب
    const sendWhatsAppBtns = document.querySelectorAll('.send-whatsapp');
    
    // إضافة حدث لكل زر
    sendWhatsAppBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceSelect = serviceCard.querySelector('.service-select');
            const customerName = serviceCard.querySelector('.customer-name');
            const customerPhone = serviceCard.querySelector('.customer-phone');
            
            const selectedService = serviceSelect.value;
            const mainService = this.getAttribute('data-service');
            const country = this.getAttribute('data-country');
            const name = customerName ? customerName.value.trim() : '';
            const phone = customerPhone ? customerPhone.value.trim() : '';
            
            // التحقق من اختيار خدمة
            if (!selectedService) {
                showAlert('الرجاء اختيار خدمة من القائمة أولاً', 'error');
                serviceSelect.focus();
                return;
            }
            
            // التحقق من اسم العميل
            if (!name) {
                showAlert('الرجاء إدخال اسمك الكامل', 'error');
                if (customerName) customerName.focus();
                return;
            }
            
            // التحقق من رقم الهاتف
            if (!phone) {
                showAlert('الرجاء إدخال رقم هاتفك', 'error');
                if (customerPhone) customerPhone.focus();
                return;
            }
            
            // التحقق من صحة رقم الهاتف
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showAlert('يرجى إدخال رقم هاتف صحيح', 'error');
                if (customerPhone) customerPhone.focus();
                return;
            }
            
            // إنشاء رسالة واتساب
            const whatsappMessage = createWhatsAppMessage(mainService, selectedService, country, name, phone);
            
            // تحديد الرقم المناسب
            let phoneNumber;
            if (country === 'قطر') {
                phoneNumber = qatarNumber;
            } else if (country === 'تونس') {
                phoneNumber = tunisiaNumber;
            } else {
                // للخدمات المشتركة، نسأل المستخدم
                showCountrySelection(whatsappMessage, mainService, selectedService, name, phone);
                return;
            }
            
            // إرسال الرسالة
            sendWhatsAppMessage(phoneNumber, whatsappMessage, country, name);
        });
    });
    
    // دالة إضافة حقول بيانات العميل
    function initializeCustomerFields() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // لا نضيف حقول لبطاقة الإعلانات
            if (card.classList.contains('advertisement-placeholder')) return;
            
            // إنشاء حقول بيانات العميل
            const customerFields = document.createElement('div');
            customerFields.className = 'customer-fields';
            customerFields.innerHTML = `
                <div class="customer-field-group">
                    <div class="customer-input-wrapper">
                        <input type="text" class="customer-name" placeholder="الاسم الكامل" required>
                        <i class="fas fa-user input-icon"></i>
                    </div>
                    <div class="customer-input-wrapper">
                        <input type="tel" class="customer-phone" placeholder="رقم الهاتف" required>
                        <i class="fas fa-phone input-icon"></i>
                    </div>
                </div>
            `;
            
            // إضافة الحقول قبل قائمة الاختيار
            const serviceSelection = card.querySelector('.service-selection');
            if (serviceSelection) {
                serviceSelection.parentNode.insertBefore(customerFields, serviceSelection);
            }
        });
        
        // إضافة أنماط CSS لحقول العميل
        addCustomerFieldsStyles();
    }
    
    // دالة إنشاء رسالة واتساب مع بيانات العميل
    function createWhatsAppMessage(mainService, selectedService, country, name, phone) {
        let message = `🚀 طلب خدمة جديدة - Tn-QA Delivery\n\n`;
        message += `👤 *العميل:* ${name}\n`;
        message += `📞 *رقم الهاتف:* ${phone}\n`;
        message += `📋 *الخدمة الرئيسية:* ${mainService}\n`;
        message += `🔧 *الخدمة المطلوبة:* ${selectedService}\n`;
        
        if (country !== 'مشترك') {
            message += `🌍 *البلد:* ${country}\n`;
        }
        
        message += `\n📞 *أرقام التواصل:*\n`;
        message += `🇶🇦 قطر: ${qatarNumber}\n`;
        message += `🇹🇳 تونس: ${tunisiaNumber}\n\n`;
        
        message += `---\n`;
        message += `📍 *المصدر:* موقع Tn-QA Delivery\n`;
        message += `⏰ *الوقت:* ${new Date().toLocaleString('ar-EG', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}`;
        
        return encodeURIComponent(message);
    }
    
    // دالة إرسال رسالة واتساب
    function sendWhatsAppMessage(phoneNumber, message, country, customerName) {
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // فتح واتساب في نافذة جديدة
        window.open(whatsappUrl, '_blank');
        
        // إظهار رسالة نجاح
        showAlert(`شكراً ${customerName}! تم فتح واتساب لإرسال طلبك إلى رقم ${country}`, 'success');
        
        // حفظ الطلب (اختياري)
        saveServiceRequest(customerName, phoneNumber, message, country);
    }
    
    // دالة عرض اختيار البلد للخدمات المشتركة
    function showCountrySelection(message, mainService, selectedService, name, phone) {
        // إضافة أنماط الـ modal إذا لم تكن موجودة
        if (!document.querySelector('#modal-styles')) {
            addModalStyles();
        }
        
        const selectionHTML = `
            <div class="country-selection-modal">
                <div class="modal-content">
                    <h3><i class="fas fa-globe gold-text"></i> اختر رقم التواصل</h3>
                    <p><strong>${name}</strong> - ${phone}</p>
                    <p>خدمة: <strong>${mainService}</strong></p>
                    <p>الخدمة المطلوبة: <strong>${selectedService}</strong></p>
                    <p class="modal-subtitle">اختر البلد الذي تريد التواصل معه:</p>
                    <div class="country-buttons">
                        <button class="country-btn qatar" data-number="${qatarNumber}">
                            <i class="fas fa-flag"></i> قطر
                            <span>${qatarNumber}</span>
                        </button>
                        <button class="country-btn tunisia" data-number="${tunisiaNumber}">
                            <i class="fas fa-flag"></i> تونس
                            <span>${tunisiaNumber}</span>
                        </button>
                    </div>
                    <button class="close-modal">
                        <i class="fas fa-times"></i> إلغاء
                    </button>
                </div>
            </div>
        `;
        
        // إضافة الـ modal إلى body
        document.body.insertAdjacentHTML('beforeend', selectionHTML);
        
        // إضافة أحداث الإغلاق
        const modal = document.querySelector('.country-selection-modal');
        const closeBtn = modal.querySelector('.close-modal');
        const qatarBtn = modal.querySelector('.country-btn.qatar');
        const tunisiaBtn = modal.querySelector('.country-btn.tunisia');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        qatarBtn.addEventListener('click', () => {
            const whatsappUrl = `https://wa.me/${qatarNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
            showAlert(`شكراً ${name}! تم فتح واتساب لإرسال طلبك إلى رقم قطر`, 'success');
            modal.remove();
        });
        
        tunisiaBtn.addEventListener('click', () => {
            const whatsappUrl = `https://wa.me/${tunisiaNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
            showAlert(`شكراً ${name}! تم فتح واتساب لإرسال طلبك إلى رقم تونس`, 'success');
            modal.remove();
        });
        
        // إغلاق عند النقر خارج الـ modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // دالة حفظ طلب الخدمة (اختياري)
    function saveServiceRequest(name, phone, message, country) {
        try {
            const request = {
                name: name,
                phone: phone,
                country: country,
                timestamp: new Date().toISOString(),
                message: decodeURIComponent(message)
            };
            
            // حفظ في localStorage
            const requests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
            requests.push(request);
            if (requests.length > 100) requests.shift(); // حفظ آخر 100 طلب فقط
            localStorage.setItem('serviceRequests', JSON.stringify(requests));
            
            console.log('تم حفظ طلب الخدمة:', request);
        } catch (error) {
            console.error('خطأ في حفظ طلب الخدمة:', error);
        }
    }
    
    // دالة إظهار رسالة تنبيه
    function showAlert(message, type = 'error') {
        // إزالة أي رسالة سابقة
        const existingAlert = document.querySelector('.alert-message');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
        const alertHTML = `
            <div class="alert-message ${type}">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', alertHTML);
        
        // إزالة الرسالة بعد 5 ثواني
        setTimeout(() => {
            const alert = document.querySelector('.alert-message');
            if (alert) {
                alert.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => alert.remove(), 300);
            }
        }, 5000);
    }
    
    // دالة إضافة أنماط حقول العميل
    function addCustomerFieldsStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            /* أنماط حقول بيانات العميل */
            .customer-fields {
                margin: 15px 0;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                border: 1px solid rgba(255, 215, 0, 0.2);
                
            }
            
            .customer-field-group {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .customer-input-wrapper {
                position: relative;
                width: 100%;
            }
            
            .customer-input-wrapper input {
                width: 100%;
                padding: 12px 40px 12px 40px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 8px;
                color:#000
                font-size: 16px;
                font-family: 'Cairo', sans-serif;
                transition: all 0.3s ease;
            }
            
            .customer-input-wrapper input:focus {
                outline: none;
                padding:12px 40px 12px 40px;
                border-color: #ffd700;
                box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
                background: rgba(255, 255, 255, 0.15);
            }
            
            .customer-input-wrapper input::placeholder {
                color: rgba(0, 0, 0, 0.5);
                text-align:right;
                
            }
            
            .customer-input-wrapper .input-icon {
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #ffd700;
                font-size: 14px;
            }
            
            /* تحسين مظهر القائمة */
            .service-selection {
                margin-top: 15px;
            }
            
            .service-select {
                width: 100%;
                padding: 12px 15px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 8px;
                color: #000;
                font-size: 14px;
                font-family: 'Cairo', sans-serif;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .service-select:focus {
                outline: none;
                border-color: #ffd700;
                box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
                background: rgba(255, 255, 255, 0.15);
            }
            
            .service-select option {
                background: #1a1a1a;
                color: white;
                padding: 10px;
            }
            
            /* تحسين مظهر أزرار الاتصال */
            .service-contact {
                margin-top: 20px;
            }
            
            /* رسائل التنبيه */
            .alert-message {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                gap: 10px;
                max-width: 400px;
                backdrop-filter: blur(10px);
            }
            
            .alert-message.error {
                background: rgba(220, 53, 69, 0.9);
                color: white;
                border-right: 4px solid #dc3545;
            }
            
            .alert-message.success {
                background: rgba(40, 167, 69, 0.9);
                color: white;
                border-right: 4px solid #28a745;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            /* تحسين التنسيق للهواتف */
            @media (max-width: 768px) {
                .customer-field-group {
                    gap: 10px;
                }
                
                .customer-input-wrapper input {
                    padding: 10px 12px 10px 35px;
                    font-size: 13px;
                }
                
                .alert-message {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    // دالة إضافة أنماط الـ modal
    function addModalStyles() {
        const styles = `
            <style id="modal-styles">
                .country-selection-modal {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    backdrop-filter: blur(5px);
                }
                
                .country-selection-modal .modal-content {
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(26, 26, 26, 0.95) 100%);
                    border: 1px solid rgba(255, 215, 0, 0.3);
                    border-radius: 15px;
                    padding: 30px;
                    width: 90%;
                    max-width: 400px;
                    text-align: center;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
                }
                
                .country-selection-modal h3 {
                    color: #ffd700;
                    margin-bottom: 15px;
                    font-size: 22px;
                }
                
                .country-selection-modal p {
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 10px;
                    font-size: 14px;
                    line-height: 1.5;
                }
                
                .country-selection-modal .modal-subtitle {
                    margin-top: 20px;
                    margin-bottom: 20px;
                    font-size: 18px;
                    color: #ffd700;
                }
                
                .country-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin: 25px 0;
                }
                
                .country-btn {
                    padding: 15px;
                    border: none;
                    border-radius: 10px;
                    font-size: 18px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.3s ease;
                }
                
                .country-btn.qatar {
                    background: linear-gradient(135deg, #8A1538 0%, #C1002C 100%);
                    color: white;
                }
                
                .country-btn.tunisia {
                    background: linear-gradient(135deg, #E70013 0%, #FF1E2E 100%);
                    color: white;
                }
                
                .country-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
                }
                
                .country-btn span {
                    font-size: 14px;
                    opacity: 0.9;
                }
                
                .close-modal {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-top: 15px;
                    transition: all 0.3s ease;
                }
                
                .close-modal:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                @media (max-width: 480px) {
                    .country-selection-modal .modal-content {
                        padding: 20px;
                        width: 95%;
                    }
                    
                    .country-btn {
                        padding: 12px;
                        font-size: 16px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
});