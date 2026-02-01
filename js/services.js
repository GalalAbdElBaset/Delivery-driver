// services.js - نظام طلبات الخدمات مع زرين منفصلين
document.addEventListener('DOMContentLoaded', function() {
    // تعريف الأرقام
    const qatarNumber = '+97431691024';
    const tunisiaNumber = '+21656471550';
    
    // إضافة حقول بيانات العميل لكل بطاقة
    initializeCustomerFields();
    
    // إدارة حالة الأزرار بناء على اختيار الخدمة
    setupButtonStates();
    
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
            
            // التحقق من توافق الخدمة مع البلد المختار
            if (!isServiceCountryCompatible(selectedService, country)) {
                showAlert('هذه الخدمة غير متاحة للبلد المحدد', 'error');
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
            }
            
            // إرسال الرسالة
            sendWhatsAppMessage(phoneNumber, whatsappMessage, country, name);
        });
    });
    
    // دالة التحقق من توافق الخدمة مع البلد
    function isServiceCountryCompatible(service, country) {
        // قائمة الخدمات التي تتطلب تحقق خاص
        const qatarOnlyServices = [
            'حجز ميزان من تونس الي قطر',
            'توصيل محلي داخل قطر',
            'توصيل أغراض ومشتريات في قطر',
            'توصيل موظفين وتلاميذ في قطر',
            'توصيل مشاوير خاصة في قطر',
            'توصيل هدايا في قطر',
            'توصيل مواد استهلاكية في قطر',
            'اشتراك شهري في قطر'
        ];
        
        const tunisiaOnlyServices = [
            'حجز ميزان من قطر الي تونس',
            'توصيل محلي داخل تونس',
            'توصيل أغراض ومشتريات في تونس',
            'توصيل موظفين وتلاميذ في تونس',
            'توصيل مشاوير خاصة في تونس',
            'توصيل هدايا في تونس',
            'توصيل مواد استهلاكية في تونس',
            'اشتراك شهري في تونس'
        ];
        
        const bothCountriesServices = [
            'تريد بيع ميزان',
            'توثيق تسليم الأموال',
            'تحويل ريال قطري إلى دينار تونسي',
            'تحويل دينار تونسي إلى ريال قطري'
        ];
        
        // التحقق من توافق الخدمة مع البلد
        if (country === 'قطر') {
            return qatarOnlyServices.includes(service) || bothCountriesServices.includes(service);
        } else if (country === 'تونس') {
            return tunisiaOnlyServices.includes(service) || bothCountriesServices.includes(service);
        }
        
        return true;
    }
    
    // دالة إدارة حالة الأزرار
    function setupButtonStates() {
        // مراقبة تغييرات القوائم المنسدلة
        document.querySelectorAll('.service-select').forEach(select => {
            select.addEventListener('change', function() {
                const serviceCard = this.closest('.service-card');
                updateButtonStates(serviceCard, this.value);
            });
            
            // تحديث الحالة الأولية
            const serviceCard = select.closest('.service-card');
            updateButtonStates(serviceCard, select.value);
        });
    }
    
    // دالة تحديث حالة الأزرار
    function updateButtonStates(serviceCard, selectedService) {
        if (!serviceCard) return;
        
        const qatarBtn = serviceCard.querySelector('.qatar-btn');
        const tunisiaBtn = serviceCard.querySelector('.tunisia-btn');
        
        if (!qatarBtn || !tunisiaBtn) return;
        
        if (!selectedService) {
            // لا يوجد اختيار - تعطيل كلا الزرين
            qatarBtn.classList.add('inactive');
            qatarBtn.classList.remove('active');
            tunisiaBtn.classList.add('inactive');
            tunisiaBtn.classList.remove('active');
            
            qatarBtn.disabled = true;
            tunisiaBtn.disabled = true;
        } else {
            // التحقق من توافق الخدمة مع كل بلد
            const isQatarCompatible = isServiceCountryCompatible(selectedService, 'قطر');
            const isTunisiaCompatible = isServiceCountryCompatible(selectedService, 'تونس');
            
            // تحديث زر قطر
            if (isQatarCompatible) {
                qatarBtn.classList.remove('inactive');
                qatarBtn.classList.add('active');
                qatarBtn.disabled = false;
            } else {
                qatarBtn.classList.add('inactive');
                qatarBtn.classList.remove('active');
                qatarBtn.disabled = true;
            }
            
            // تحديث زر تونس
            if (isTunisiaCompatible) {
                tunisiaBtn.classList.remove('inactive');
                tunisiaBtn.classList.add('active');
                tunisiaBtn.disabled = false;
            } else {
                tunisiaBtn.classList.add('inactive');
                tunisiaBtn.classList.remove('active');
                tunisiaBtn.disabled = true;
            }
            
            // تحديث نص الأزرار بناء على الخدمة
            updateButtonText(serviceCard, selectedService);
        }
    }
    
    // دالة تحديث نص الأزرار
    function updateButtonText(serviceCard, selectedService) {
        const qatarBtn = serviceCard.querySelector('.qatar-btn');
        const tunisiaBtn = serviceCard.querySelector('.tunisia-btn');
        
        if (!qatarBtn || !tunisiaBtn) return;
        
        // نص افتراضي
        let qatarText = 'طلب من قطر';
        let tunisiaText = 'طلب من تونس';
        
        // تحديد النص المناسب بناء على الخدمة
        if (selectedService.includes('حجز ميزان من تونس الي قطر')) {
            qatarText = 'حجز من تونس لقطر';
            tunisiaText = 'غير متاح';
        } else if (selectedService.includes('حجز ميزان من قطر الي تونس')) {
            qatarText = 'غير متاح';
            tunisiaText = 'حجز من قطر لتونس';
        } else if (selectedService.includes('تريد بيع ميزان')) {
            qatarText = 'طلب بيع ميزان';
            tunisiaText = 'طلب بيع ميزان';
        } else if (selectedService.includes('توصيل محلي')) {
            qatarText = 'طلب توصيل محلي';
            tunisiaText = 'طلب توصيل محلي';
        } else if (selectedService.includes('توثيق تسليم الأموال')) {
            qatarText = 'طلب توثيق أموال';
            tunisiaText = 'طلب توثيق أموال';
        }
        
        // تحديث نص الأزرار مع الحفاظ على الأيقونة
        const whatsappIcon = '<i class="fab fa-whatsapp"></i> ';
        
        if (!qatarBtn.disabled) {
            qatarBtn.innerHTML = whatsappIcon + qatarText;
        }
        
        if (!tunisiaBtn.disabled) {
            tunisiaBtn.innerHTML = whatsappIcon + tunisiaText;
        }
    }
    
    // باقي الدوال تبقى كما هي...
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
        message += `🌍 *البلد المطلوب:* ${country}\n`;
        
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
        showAlert(`شكراً ${customerName}! تم إرسال طلبك إلى ${country}`, 'success');
        
        // حفظ الطلب (اختياري)
        saveServiceRequest(customerName, phoneNumber, message, country);
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
                color: #000;
                font-size: 14px;
                font-family: 'Cairo', sans-serif;
                transition: all 0.3s ease;
            }
            
            .customer-input-wrapper input:focus {
                outline: none;
                border-color: #ffd700;
                box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
                background: rgba(255, 255, 255, 0.15);
                text-align:right;
                padding: 12px 40px 12px 40px;
            }
            
            .customer-input-wrapper input::placeholder {
                color: rgba(0, 0, 0, 0.71);
                text-align:right
            }
            
            .customer-input-wrapper .input-icon {
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #ffd700;
                font-size: 14px;
            }
            
            /* أنماط الأزرار المزدوجة */
            .service-contact-double {
                margin-top: 20px;
            }
            
            .contact-buttons-wrapper {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .contact-buttons-wrapper .service-btn {
                flex: 1;
                min-width: 120px;
                padding: 12px 10px;
                font-size: 14px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-weight: 600;
            }
            
            /* أزرار البلدين */
            .qatar-btn {
                background: linear-gradient(135deg, #8A1538 0%, #C1002C 100%);
                color: white;
            }
            
            .qatar-btn:hover:not(:disabled) {
                background: linear-gradient(135deg, #C1002C 0%, #8A1538 100%);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(193, 0, 44, 0.4);
            }
            
            .tunisia-btn {
                background: linear-gradient(135deg, #E70013 0%, #FF1E2E 100%);
                color: white;
            }
            
            .tunisia-btn:hover:not(:disabled) {
                background: linear-gradient(135deg, #FF1E2E 0%, #E70013 100%);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(231, 0, 19, 0.4);
            }
            
            /* حالة الأزرار */
            .service-btn.inactive {
                opacity: 0.4;
                filter: grayscale(50%);
                cursor: not-allowed;
            }
            
            .service-btn.active {
                opacity: 1;
                filter: none;
                cursor: pointer;
            }
            
            .service-btn:disabled {
                opacity: 0.4;
                cursor: not-allowed;
                transform: none !important;
                box-shadow: none !important;
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
                
                .contact-buttons-wrapper {
                    flex-direction: column;
                }
                
                .contact-buttons-wrapper .service-btn {
                    width: 100%;
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
});