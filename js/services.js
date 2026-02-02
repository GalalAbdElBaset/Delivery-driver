// services.js - نظام طلبات الخدمات المحدث مع الألوان الذهبية
document.addEventListener('DOMContentLoaded', function() {
    // تعريف الأرقام
    const qatarNumber = '+97431691024';
    const tunisiaNumber = '+21656471550';
    
    // إضافة أنماط CSS محسنة مع الألوان الذهبية
    addEnhancedSelectStyles();
    
    // إضافة حقول بيانات العميل لكل بطاقة
    initializeCustomerFields();
    
    // إدارة حالة الأزرار بناء على اختيار الخدمة
    setupButtonStates();
    
    // إضافة تأثيرات للقوائم المنسدلة
    enhanceSelectElements();
    
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
                animateSelect(serviceSelect);
                return;
            }
            
            // التحقق من اسم العميل
            if (!name) {
                showAlert('الرجاء إدخال اسمك الكامل', 'error');
                if (customerName) {
                    customerName.focus();
                    animateInput(customerName);
                }
                return;
            }
            
            // التحقق من رقم الهاتف
            if (!phone) {
                showAlert('الرجاء إدخال رقم هاتفك', 'error');
                if (customerPhone) {
                    customerPhone.focus();
                    animateInput(customerPhone);
                }
                return;
            }
            
            // التحقق من صحة رقم الهاتف
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showAlert('يرجى إدخال رقم هاتف صحيح', 'error');
                if (customerPhone) {
                    customerPhone.focus();
                    animateInput(customerPhone);
                }
                return;
            }
            
            // التحقق من توافق الخدمة مع البلد المختار
            if (!isServiceCountryCompatible(selectedService, country, serviceCard)) {
                showAlert('هذه الخدمة غير متاحة للبلد المحدد', 'error');
                return;
            }
            
            // إنشاء رسالة واتساب
            const whatsappMessage = createWhatsAppMessage(mainService, selectedService, country, name, phone);
            
            // تحديد الرقم المناسب بناء على البلد
            let phoneNumber;
            if (country === 'قطر') {
                phoneNumber = qatarNumber;
            } else if (country === 'تونس') {
                phoneNumber = tunisiaNumber;
            } else if (country === 'مشترك') {
                // اختيار الرقم بناء على الخدمة المختارة
                if (selectedService === 'تحويل ريال قطري إلى دينار تونسي') {
                    phoneNumber = tunisiaNumber; // التحويل من قطر لتونس
                } else if (selectedService === 'تحويل دينار تونسي إلى ريال قطري') {
                    phoneNumber = qatarNumber; // التحويل من تونس لقطر
                } else {
                    phoneNumber = tunisiaNumber; // افتراضي
                }
            }
            
            // إرسال الرسالة
            sendWhatsAppMessage(phoneNumber, whatsappMessage, country, name);
        });
    });
    
    // دالة التحقق من توافق الخدمة مع البلد
    function isServiceCountryCompatible(service, country, serviceCard) {
        // تحديد نوع البطاقة
        const cardService = serviceCard.getAttribute('data-service');
        const buttonCountry = serviceCard.querySelector('.send-whatsapp')?.getAttribute('data-country');
        
        // إذا كانت البطاقة هي توصيل دولي (الميزان)
        if (cardService === 'scale-sales') {
            // حجز ميزان من تونس إلى قطر: يحتاج للتواصل مع قطر
            if (service === 'حجز ميزان من تونس الي قطر') {
                return country === 'قطر';
            }
            // حجز ميزان من قطر إلى تونس: يحتاج للتواصل مع تونس
            else if (service === 'حجز ميزان من قطر الي تونس') {
                return country === 'تونس';
            }
            // تريد بيع ميزان: يمكن التواصل مع أي منهما
            else if (service === 'تريد بيع ميزان') {
                return true; // يمكن التواصل مع أي بلد
            }
        }
        // إذا كانت البطاقة لقطر فقط
        else if (buttonCountry === 'قطر') {
            return country === 'قطر';
        }
        // إذا كانت البطاقة لتونس فقط
        else if (buttonCountry === 'تونس') {
            return country === 'تونس';
        }
        // إذا كانت البطاقة مشتركة
        else if (buttonCountry === 'مشترك') {
            return true;
        }
        
        return false;
    }
    
    // دالة إدارة حالة الأزرار
    function setupButtonStates() {
        // مراقبة تغييرات القوائم المنسدلة
        document.querySelectorAll('.service-select').forEach(select => {
            select.addEventListener('change', function() {
                const serviceCard = this.closest('.service-card');
                updateButtonStates(serviceCard, this.value);
                
                // إضافة تأثير عند التغيير
                animateSelect(this);
                
                // تحديث لون البطاقة بناء على الاختيار
                updateCardAppearance(serviceCard, this.value);
                
                // تحديث نص الزر بناء على الخدمة
                updateButtonText(serviceCard, this.value);
            });
            
            // تحديث الحالة الأولية
            const serviceCard = select.closest('.service-card');
            updateButtonStates(serviceCard, select.value);
            updateCardAppearance(serviceCard, select.value);
            updateButtonText(serviceCard, select.value);
        });
    }
    
    // دالة تحديث حالة الأزرار
    function updateButtonStates(serviceCard, selectedService) {
        if (!serviceCard) return;
        
        const button = serviceCard.querySelector('.send-whatsapp');
        if (!button) return;
        
        if (!selectedService) {
            // لا يوجد اختيار - تعطيل الزر
            button.disabled = true;
            button.classList.add('inactive');
            button.classList.remove('active');
        } else {
            // تفعيل الزر
            button.disabled = false;
            button.classList.remove('inactive');
            button.classList.add('active');
            
            // إضافة تأثير للزر
            animateButton(button);
        }
    }
    
    // دالة تحديث نص الزر
    function updateButtonText(serviceCard, selectedService) {
        const button = serviceCard.querySelector('.send-whatsapp');
        if (!button) return;
        
        const cardService = serviceCard.getAttribute('data-service');
        let buttonText = 'طلب خدمة';
        
        // تحديد النص المناسب بناء على الخدمة
        if (cardService === 'scale-sales') {
            if (selectedService === 'حجز ميزان من تونس الي قطر') {
                buttonText = 'حجز من تونس لقطر';
            } else if (selectedService === 'حجز ميزان من قطر الي تونس') {
                buttonText = 'حجز من قطر لتونس';
            } else if (selectedService === 'تريد بيع ميزان') {
                buttonText = 'طلب بيع ميزان';
            }
        } else if (cardService === 'money-delivery') {
            if (selectedService === 'تحويل ريال قطري إلى دينار تونسي') {
                buttonText = 'تحويل من قطر لتونس';
            } else if (selectedService === 'تحويل دينار تونسي إلى ريال قطري') {
                buttonText = 'تحويل من تونس لقطر';
            }
        }
        
        // تحديث نص الزر مع الحفاظ على الأيقونة
        const whatsappIcon = '<i class="fab fa-whatsapp"></i> ';
        button.innerHTML = whatsappIcon + buttonText;
    }
    
    // دالة تحديث مظهر البطاقة بناء على الخدمة المختارة
    function updateCardAppearance(card, selectedService) {
        if (!selectedService) {
            card.classList.remove('has-selection');
            card.classList.remove('international-selected');
            card.classList.remove('local-selected');
            card.classList.remove('money-selected');
        } else {
            card.classList.add('has-selection');
            
            // إزالة جميع الفئات أولاً
            card.classList.remove('international-selected', 'local-selected', 'money-selected');
            
            // إضافة فئة حسب نوع الخدمة
            const cardService = card.getAttribute('data-service');
            
            if (cardService === 'scale-sales') {
                card.classList.add('international-selected');
            } else if (cardService === 'local-delivery-qatar' || cardService === 'local-delivery-tunisia') {
                card.classList.add('local-selected');
            } else if (cardService === 'money-delivery') {
                card.classList.add('money-selected');
            }
        }
    }
    
    // دالة إضافة حقول بيانات العميل
    function initializeCustomerFields() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // لا نضيف حقول لبطاقة الإعلانات
            if (card.classList.contains('advertisement-placeholder')) return;
            
            // التحقق إذا كانت الحقول موجودة بالفعل
            if (card.querySelector('.customer-fields')) return;
            
            // إنشاء حقول بيانات العميل
            const customerFields = document.createElement('div');
            customerFields.className = 'customer-fields';
            customerFields.innerHTML = `
                <div class="customer-field-group">
                    <div class="customer-input-wrapper">
                        <input type="text" class="customer-name" placeholder="الاسم الكامل" required>
                        <i class="fas fa-user input-icon"></i>
                        <div class="input-underline"></div>
                    </div>
                    <div class="customer-input-wrapper">
                        <input type="tel" class="customer-phone" placeholder="رقم الهاتف" required>
                        <i class="fas fa-phone input-icon"></i>
                        <div class="input-underline"></div>
                    </div>
                </div>
            `;
            
            // إضافة الحقول بعد قائمة الاختيار
            const serviceSelection = card.querySelector('.service-selection');
            const serviceContact = card.querySelector('.service-contact') || card.querySelector('.service-contact-double');
            
            if (serviceSelection && serviceContact) {
                // إدخال الحقول بين قائمة الاختيار وأزرار التواصل
                serviceSelection.parentNode.insertBefore(customerFields, serviceContact);
            } else if (serviceSelection) {
                // إضافة الحقول بعد قائمة الاختيار
                serviceSelection.parentNode.insertBefore(customerFields, serviceSelection.nextSibling);
            }
            
            // إضافة أحداث للحقول
            const inputs = customerFields.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                // التحقق عند الكتابة
                input.addEventListener('input', function() {
                    if (this.value) {
                        this.parentElement.classList.add('has-value');
                    } else {
                        this.parentElement.classList.remove('has-value');
                    }
                });
            });
        });
    }
    
    // دالة تحسين عناصر الـ Select
    function enhanceSelectElements() {
        document.querySelectorAll('.service-select').forEach(select => {
            // إضافة حدث عند الفتح
            select.addEventListener('focus', function() {
                this.parentElement.classList.add('select-focused');
            });
            
            select.addEventListener('blur', function() {
                this.parentElement.classList.remove('select-focused');
            });
            
            // تحديث المظهر عند التغيير
            select.addEventListener('change', function() {
                if (this.value) {
                    this.parentElement.classList.add('has-selection');
                } else {
                    this.parentElement.classList.remove('has-selection');
                }
            });
        });
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
        
        // إضافة تفاصيل إضافية حسب الخدمة
        if (selectedService.includes('ميزان')) {
            message += `⚖️ *نوع الخدمة:* توصيل ميزان دولي\n`;
        } else if (selectedService.includes('تحويل')) {
            message += `💸 *نوع الخدمة:* تحويل أموال\n`;
            if (selectedService === 'تحويل ريال قطري إلى دينار تونسي') {
                message += `🔄 *الاتجاه:* من قطر إلى تونس\n`;
            } else if (selectedService === 'تحويل دينار تونسي إلى ريال قطري') {
                message += `🔄 *الاتجاه:* من تونس إلى قطر\n`;
            }
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
            minute: '2-digit',
            hour12: true
        })}`;
        
        return encodeURIComponent(message);
    }
    
    // دالة إرسال رسالة واتساب
    function sendWhatsAppMessage(phoneNumber, message, country, customerName) {
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // فتح واتساب في نافذة جديدة
        window.open(whatsappUrl, '_blank');
        
        // إظهار رسالة نجاح
        showAlert(`شكراً ${customerName}! تم إرسال طلبك بنجاح`, 'success');
        
        // حفظ الطلب
        saveServiceRequest(customerName, phoneNumber, message, country);
        
        // إعادة تعيين الحقول
        resetForm(customerName);
    }
    
    // دالة حفظ طلب الخدمة
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
            if (requests.length > 100) requests.shift();
            localStorage.setItem('serviceRequests', JSON.stringify(requests));
        } catch (error) {
            console.error('خطأ في حفظ طلب الخدمة:', error);
        }
    }
    
    // دالة إعادة تعيين النموذج
    function resetForm(customerName) {
        setTimeout(() => {
            const inputs = document.querySelectorAll('.customer-name, .customer-phone');
            inputs.forEach(input => {
                if (input.classList.contains('customer-name')) {
                    input.value = '';
                    input.parentElement.classList.remove('has-value');
                }
            });
        }, 1000);
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
                <button class="alert-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', alertHTML);
        
        // إضافة حدث للإغلاق
        const closeBtn = document.querySelector('.alert-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                const alert = this.closest('.alert-message');
                if (alert) {
                    alert.remove();
                }
            });
        }
        
        // إزالة الرسالة بعد 5 ثواني
        setTimeout(() => {
            const alert = document.querySelector('.alert-message');
            if (alert) {
                alert.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.parentNode.removeChild(alert);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // دالة إضافة تأثير للقائمة المنسدلة
    function animateSelect(select) {
        select.style.transform = 'scale(1.02)';
        select.style.boxShadow = '0 0 0 3px rgba(255, 215, 0, 0.3)';
        
        setTimeout(() => {
            select.style.transform = 'scale(1)';
            select.style.boxShadow = '';
        }, 300);
    }
    
    // دالة إضافة تأثير للحقل النصي
    function animateInput(input) {
        input.style.transform = 'translateX(-5px)';
        input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.3)';
        
        setTimeout(() => {
            input.style.transform = 'translateX(0)';
            input.style.boxShadow = '';
        }, 500);
    }
    
    // دالة إضافة تأثير للزر
    function animateButton(button) {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '';
        }, 300);
    }
    
    // دالة إضافة أنماط CSS محسنة مع الألوان الذهبية
    function addEnhancedSelectStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            /* أنماط محسنة للقوائم المنسدلة مع الألوان الذهبية */
            .service-selection {
                position: relative;
                margin: 15px 0;
            }
            
            .service-select {
                width: 100%;
                padding: 15px 45px 15px 20px;
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                border: 2px solid rgba(255, 215, 0, 0.3);
                border-radius: 12px;
                color: #000;
                font-size: 15px;
                font-family: 'Cairo', sans-serif;
                cursor: pointer;
                transition: all 0.3s ease;
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23ffd700' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: left 15px center;
                background-size: 16px;
                text-align: right;
                direction: rtl;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .service-select:hover {
                border-color: #ffd700;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
            }
            
            .service-select:focus {
                outline: none;
                border-color: #ffd700;
                box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3), 0 8px 25px rgba(0, 0, 0, 0.3);
                transform: translateY(-2px);
                background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
            }
            
            .service-select option {
                background: #1a1a1a;
                color: #fff;
                padding: 15px;
                font-size: 14px;
            }
            
            .service-select option:checked {
                background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                color: #000;
                font-weight: bold;
            }
            
            .service-select option:hover {
                background: #ffd700;
                color: #000;
            }
            
            /* مؤشر القائمة المنسدلة */
            .service-selection::after {
                content: '';
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                pointer-events: none;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid #ffd700;
            }
            
            .select-focused .service-select {
                border-color: #ffd700;
                box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
            }
            
            .has-selection .service-select {
                border-color: #4CAF50;
                background: linear-gradient(135deg, #1a3c1e 0%, #2d5f32 100%);
                color: #fff;
            }
            
            /* تأثيرات البطاقات عند الاختيار */
            .service-card.has-selection {
                transform: translateY(-5px);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .service-card.international-selected {
                border-left: 5px solid #8A1538;
                border-right: 5px solid #E70013;
                background: linear-gradient(135deg, rgba(138, 21, 56, 0.1) 0%, rgba(193, 0, 44, 0.1) 50%, rgba(231, 0, 19, 0.1) 100%);
            }
            
            .service-card.local-selected {
                border-left: 5px solid #4CAF50;
                border-right: 5px solid #2196F3;
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%);
            }
            
            .service-card.money-selected {
                border-left: 5px solid #FF9800;
                border-right: 5px solid #9C27B0;
                background: linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%);
            }
            
            /* أنماط حقول بيانات العميل */
            .customer-fields {
                margin: 20px 0;
                padding: 20px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 215, 0, 0.05) 100%);
                border-radius: 15px;
                border: 1px solid rgba(255, 215, 0, 0.1);
                backdrop-filter: blur(10px);
            }
            
            .customer-field-group {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .customer-input-wrapper {
                position: relative;
                width: 100%;
            }
            
            .customer-input-wrapper input {
                width: 100%;
                padding: 18px 50px 18px 20px;
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid rgba(255, 215, 0, 0.3);
                border-radius: 12px;
                color: #000;
                font-size: 15px;
                font-family: 'Cairo', sans-serif;
                transition: all 0.3s ease;
                text-align: right;
                direction: rtl;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            
            .customer-input-wrapper input:focus {
                outline: none;
                border-color: #ffd700;
                box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2);
                background: rgba(255, 255, 255, 1);
                transform: translateY(-2px);
            }
            
            .customer-input-wrapper input::placeholder {
                color: rgba(0, 0, 0, 0.6);
                text-align: right;
                direction: rtl;
                transition: all 0.3s ease;
            }
            
            .customer-input-wrapper input:focus::placeholder {
                color: rgba(0, 0, 0, 0.3);
                transform: translateY(-10px);
                font-size: 12px;
            }
            
            .customer-input-wrapper .input-icon {
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                color: #ffd700;
                font-size: 18px;
                transition: all 0.3s ease;
            }
            
            .customer-input-wrapper.focused .input-icon {
                color: #8A1538;
                transform: translateY(-50%) scale(1.2);
            }
            
            .input-underline {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background: linear-gradient(90deg, #ffd700, #8A1538);
                transition: width 0.3s ease;
            }
            
            .customer-input-wrapper.focused .input-underline {
                width: 100%;
            }
            
            /* أنماط الأزرار */
            .service-contact, .service-contact-double {
                margin-top: 25px;
            }
            
            .contact-buttons-wrapper {
                display: flex;
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .contact-buttons-wrapper .service-btn,
            .service-contact .service-btn,
            .service-contact-double .service-btn {
                width: 100%;
                padding: 16px 20px;
                font-size: 15px;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.4s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-weight: 700;
                letter-spacing: 0.5px;
                position: relative;
                overflow: hidden;
                z-index: 1;
                text-decoration: none;
            }
            
            .service-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.6s ease;
                z-index: -1;
            }
            
            .service-btn:hover::before {
                left: 100%;
            }
            
            /* زر قطر */
            .service-btn[data-country="قطر"] {
                background: linear-gradient(135deg, #8A1538 0%, #C1002C 100%);
                color: white;
                box-shadow: 0 6px 20px rgba(138, 21, 56, 0.4);
            }
            
            .service-btn[data-country="قطر"]:hover:not(:disabled) {
                background: linear-gradient(135deg, #C1002C 0%, #8A1538 100%);
                transform: translateY(-3px) scale(1.03);
                box-shadow: 0 12px 25px rgba(193, 0, 44, 0.5);
            }
            
            /* زر تونس */
            .service-btn[data-country="تونس"] {
                background: linear-gradient(135deg, #E70013 0%, #FF1E2E 100%);
                color: white;
                box-shadow: 0 6px 20px rgba(231, 0, 19, 0.4);
            }
            
            .service-btn[data-country="تونس"]:hover:not(:disabled) {
                background: linear-gradient(135deg, #FF1E2E 0%, #E70013 100%);
                transform: translateY(-3px) scale(1.03);
                box-shadow: 0 12px 25px rgba(255, 30, 46, 0.5);
            }
            
            /* زر مشترك (لتوثيق الأموال) */
            .service-btn[data-country="مشترك"] {
                background: linear-gradient(135deg, #FF9800 0%, #FF5722 100%);
                color: white;
                box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
            }
            
            .service-btn[data-country="مشترك"]:hover:not(:disabled) {
                background: linear-gradient(135deg, #FF5722 0%, #FF9800 100%);
                transform: translateY(-3px) scale(1.03);
                box-shadow: 0 12px 25px rgba(255, 87, 34, 0.5);
            }
            
            /* زر واتساب عام */
            .service-btn.whatsapp {
                background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                color: white;
                box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
            }
            
            .service-btn.whatsapp:hover:not(:disabled) {
                background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
                transform: translateY(-3px) scale(1.03);
                box-shadow: 0 12px 25px rgba(18, 140, 126, 0.5);
            }
            
            /* حالة الأزرار */
            .service-btn.inactive {
                opacity: 0.4;
                filter: grayscale(100%);
                cursor: not-allowed;
                transform: none !important;
                box-shadow: none !important;
            }
            
            .service-btn.active {
                opacity: 1;
                filter: none;
                cursor: pointer;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
                }
            }
            
            .service-btn:disabled {
                opacity: 0.3;
                cursor: not-allowed;
                transform: none !important;
                box-shadow: none !important;
            }
            
            /* رسائل التنبيه */
            .alert-message {
                position: fixed;
                top: 25px;
                right: 25px;
                padding: 20px 25px;
                border-radius: 15px;
                z-index: 10000;
                animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                display: flex;
                align-items: center;
                gap: 15px;
                max-width: 450px;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .alert-message.error {
                background: linear-gradient(135deg, rgba(220, 53, 69, 0.95) 0%, rgba(185, 28, 28, 0.95) 100%);
                color: white;
                border-right: 5px solid #dc3545;
            }
            
            .alert-message.success {
                background: linear-gradient(135deg, rgba(40, 167, 69, 0.95) 0%, rgba(21, 128, 61, 0.95) 100%);
                color: white;
                border-right: 5px solid #28a745;
            }
            
            .alert-close {
                background: transparent;
                border: none;
                color: white;
                cursor: pointer;
                margin-right: auto;
                padding: 5px;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .alert-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%) translateY(-20px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0) translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0) translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%) translateY(-20px);
                    opacity: 0;
                }
            }
            
            /* تحسين التنسيق للهواتف */
            @media (max-width: 768px) {
                .service-select {
                    padding: 14px 40px 14px 15px;
                    font-size: 14px;
                }
                
                .customer-field-group {
                    gap: 15px;
                }
                
                .customer-input-wrapper input {
                    padding: 16px 45px 16px 15px;
                    font-size: 14px;
                }
                
                .contact-buttons-wrapper {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .service-btn {
                    padding: 14px;
                    font-size: 14px;
                }
                
                .alert-message {
                    top: 15px;
                    right: 15px;
                    left: 15px;
                    max-width: none;
                    padding: 15px 20px;
                }
            }
            
            /* تأثيرات التحميل */
            .service-card {
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* توهج عند الاختيار */
            .service-card.has-selection .service-icon {
                animation: glow 2s ease-in-out infinite alternate;
            }
            
            @keyframes glow {
                from {
                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                }
                to {
                    box-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.3);
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
});