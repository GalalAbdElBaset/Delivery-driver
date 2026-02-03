// contact.js - Contact Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ================= تهيئة أولية =================
    console.log('جاري تحميل صفحة الاتصال...');
    
    // ================= متغيرات عامة =================
    const toastDuration = 3000;
    let mapInitialized = false;
    let uploadedFiles = [];
    let isSubmitting = false;
    
    // ================= دالة عرض الرسائل =================
    function showToast(message, type = 'success') {
        // إزالة أي رسائل سابقة
        const existingToasts = document.querySelectorAll('.toast-message');
        existingToasts.forEach(toast => toast.remove());
        
        // إنشاء الرسالة الجديدة
        const toast = document.createElement('div');
        toast.className = `toast-message ${type}`;
        toast.textContent = message;
        
        // إضافة الرسالة إلى الصفحة
        document.body.appendChild(toast);
        
        // إزالة الرسالة بعد فترة
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.remove();
                    }
                }, 300);
            }
        }, toastDuration);
    }
    
    // ================= نسخ النصوص =================
    function initCopyButtons() {
        console.log('جاري تهيئة أزرار النسخ...');
        
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-text') || this.getAttribute('data-number');
                
                if (!textToCopy) {
                    console.warn('لا يوجد نص للنسخ');
                    return;
                }
                
                // استخدام Clipboard API
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // تغيير الأيقونة مؤقتاً للإشارة للنجاح
                    const originalIcon = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    
                    showToast('تم نسخ النص: ' + textToCopy, 'success');
                    
                    // إعادة الأيقونة الأصلية بعد ثانيتين
                    setTimeout(() => {
                        this.innerHTML = originalIcon;
                    }, 2000);
                    
                }).catch(err => {
                    console.error('فشل نسخ النص:', err);
                    showToast('فشل نسخ النص، يرجى المحاولة يدوياً', 'error');
                });
            });
        });
    }
    
    // ================= إدارة الملفات =================
    function initFileUpload() {
        console.log('جاري تهيئة رفع الملفات...');
        
        const fileUploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('fileUpload');
        const fileList = document.getElementById('fileList');
        const browseLink = fileUploadArea?.querySelector('.browse-link');
        
        if (!fileUploadArea || !fileInput || !fileList) {
            console.warn('عناصر رفع الملفات غير موجودة');
            return;
        }
        
        // الحد الأقصى لحجم الملف (10MB)
        const MAX_FILE_SIZE = 10 * 1024 * 1024;
        
        // تنسيق حجم الملف
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        
        // إضافة ملف إلى القائمة
        function addFileToList(file) {
            const fileId = Date.now() + Math.random();
            
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.dataset.fileId = fileId;
            
            const fileExtension = file.name.split('.').pop().toLowerCase();
            let fileIcon = 'fa-file';
            
            if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension)) {
                fileIcon = 'fa-file-image';
            } else if (fileExtension === 'pdf') {
                fileIcon = 'fa-file-pdf';
            } else if (['doc', 'docx'].includes(fileExtension)) {
                fileIcon = 'fa-file-word';
            }
            
            fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fas ${fileIcon}"></i>
                    <div>
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${formatFileSize(file.size)}</span>
                    </div>
                </div>
                <button type="button" class="remove-file-btn" title="إزالة الملف">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            fileList.appendChild(fileItem);
            
            // حفظ الملف في المصفوفة
            uploadedFiles.push({
                id: fileId,
                file: file,
                element: fileItem
            });
            
            // إضافة حدث إزالة الملف
            const removeBtn = fileItem.querySelector('.remove-file-btn');
            removeBtn.addEventListener('click', () => removeFile(fileId));
        }
        
        // إزالة ملف من القائمة
        function removeFile(fileId) {
            const fileIndex = uploadedFiles.findIndex(f => f.id === fileId);
            if (fileIndex !== -1) {
                uploadedFiles[fileIndex].element.remove();
                uploadedFiles.splice(fileIndex, 1);
            }
            
            // تحديث حالة منطقة السحب والإفلات
            updateFileUploadArea();
        }
        
        // تحديث حالة منطقة السحب والإفلات
        function updateFileUploadArea() {
            if (uploadedFiles.length > 0) {
                fileUploadArea.style.borderColor = '#25D366';
                fileUploadArea.style.background = 'rgba(37, 211, 102, 0.05)';
            } else {
                fileUploadArea.style.borderColor = '';
                fileUploadArea.style.background = '';
            }
        }
        
        // التحقق من صحة الملف
        function validateFile(file) {
            // التحقق من نوع الملف
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (!allowedTypes.includes(file.type)) {
                showToast('نوع الملف غير مدعوم. يرجى رفع صورة أو PDF أو مستند Word', 'error');
                return false;
            }
            
            // التحقق من حجم الملف
            if (file.size > MAX_FILE_SIZE) {
                showToast('حجم الملف كبير جداً. الحد الأقصى 10MB', 'error');
                return false;
            }
            
            return true;
        }
        
        // معالجة الملفات
        function handleFiles(files) {
            let validFilesAdded = 0;
            
            for (let file of files) {
                if (validateFile(file)) {
                    addFileToList(file);
                    validFilesAdded++;
                }
            }
            
            if (validFilesAdded > 0) {
                showToast(`تم إضافة ${validFilesAdded} ملف(ات)`, 'success');
            }
            
            updateFileUploadArea();
        }
        
        // أحداث منطقة السحب والإفلات
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            fileUploadArea.classList.add('highlight');
        }
        
        function unhighlight() {
            fileUploadArea.classList.remove('highlight');
        }
        
        // معالجة السحب والإفلات
        fileUploadArea.addEventListener('drop', function(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        });
        
        // فتح نافذة اختيار الملفات عند النقر
        if (browseLink) {
            browseLink.addEventListener('click', function(e) {
                e.preventDefault();
                fileInput.click();
            });
        }
        
        fileUploadArea.addEventListener('click', function(e) {
            if (e.target === fileUploadArea || e.target.closest('.browse-link')) {
                fileInput.click();
            }
        });
        
        // معالجة اختيار الملفات
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
            this.value = ''; // إعادة تعيين المدخل
        });
        
        // مسح جميع الملفات
        const clearFilesBtn = document.querySelector('.clear-files-btn');
        if (clearFilesBtn) {
            clearFilesBtn.addEventListener('click', function() {
                uploadedFiles.forEach(file => file.element.remove());
                uploadedFiles = [];
                updateFileUploadArea();
                showToast('تم مسح جميع الملفات', 'info');
            });
        }
    }
    
    // ================= تحسينات الحقول =================
    function initFormEnhancements() {
        console.log('جاري تحسين الحقول...');
        
        const fields = document.querySelectorAll('.service-input, .form-select, textarea, input[type="text"], input[type="tel"], input[type="email"]');
        
        fields.forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = '#D4AF37';
                this.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
            });
            
            field.addEventListener('blur', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        });
        
        // التحقق من رقم الهاتف أثناء الكتابة
        const phoneInput = document.getElementById('phoneNumber');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^\d]/g, '');
                
                if (this.value.length > 3) {
                    const formatted = this.value.replace(/(\d{3})(?=\d)/g, '$1 ');
                    this.value = formatted;
                }
            });
        }
    }
    
    // ================= التحقق من النموذج =================
    function validateForm() {
        const requiredFields = [
            { id: 'fullName', name: 'الاسم الكامل', minLength: 3 },
            { id: 'phoneNumber', name: 'رقم الهاتف', type: 'phone' },
            { id: 'serviceType', name: 'نوع الخدمة' },
            { id: 'messageSubject', name: 'موضوع الرسالة', minLength: 5 },
            { id: 'message', name: 'محتوى الرسالة', minLength: 10 }
        ];
        
        // إزالة أخطاء سابقة
        document.querySelectorAll('.field-error').forEach(error => error.remove());
        document.querySelectorAll('.input-error').forEach(input => {
            input.classList.remove('input-error');
            input.style.borderColor = '';
        });
        
        let isValid = true;
        
        for (const field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element) continue;
            
            let value = element.value ? element.value.trim() : '';
            
            if (element.tagName === 'SELECT' && value === '') {
                value = '';
            }
            
            if (!value) {
                showFieldError(element, `يرجى إدخال ${field.name}`);
                isValid = false;
                continue;
            }
            
            if (field.minLength && value.length < field.minLength) {
                showFieldError(element, `${field.name} يجب أن يكون على الأقل ${field.minLength} أحرف`);
                isValid = false;
                continue;
            }
            
            if (field.type === 'phone') {
                const phoneDigits = value.replace(/\s/g, '');
                const phoneRegex = /^[0-9]{8,15}$/;
                if (!phoneRegex.test(phoneDigits)) {
                    showFieldError(element, 'رقم الهاتف يجب أن يكون من 8 إلى 15 رقماً');
                    isValid = false;
                }
            }
        }
        
        const privacyPolicy = document.getElementById('privacyPolicy');
        if (privacyPolicy && !privacyPolicy.checked) {
            showToast('يرجى الموافقة على سياسة الخصوصية', 'error');
            privacyPolicy.focus();
            isValid = false;
        }
        
        return isValid;
    }
    
    function showFieldError(element, message) {
        element.classList.add('input-error');
        element.style.borderColor = '#dc3545';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.display = 'flex';
        errorDiv.style.alignItems = 'center';
        errorDiv.style.gap = '5px';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        element.parentNode.appendChild(errorDiv);
        
        element.addEventListener('input', function clearError() {
            element.classList.remove('input-error');
            element.style.borderColor = '';
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
            element.removeEventListener('input', clearError);
        });
    }
    
    // ================= الحصول على بيانات النموذج =================
    function getFormData() {
        const countryCode = document.getElementById('countryCode').value;
        const phoneNumber = document.getElementById('phoneNumber').value.trim().replace(/\s/g, '');
        const fullPhone = countryCode + phoneNumber;
        
        return {
            fullName: document.getElementById('fullName').value.trim(),
            phone: fullPhone,
            phoneNumber: phoneNumber,
            countryCode: countryCode,
            email: document.getElementById('email').value.trim(),
            preferredContact: document.getElementById('preferredContact').value,
            serviceType: document.getElementById('serviceType').value,
            urgency: document.getElementById('urgency').value,
            messageSubject: document.getElementById('messageSubject').value.trim(),
            message: document.getElementById('message').value.trim(),
            files: uploadedFiles.map(f => f.file)
        };
    }
    
    function getServiceName(serviceType) {
        const services = {
            'local-delivery-qatar': 'التوصيل المحلي في قطر',
            'local-delivery-tunisia': 'التوصيل المحلي في تونس',
            'scale-sales': 'بيع موازين',
            'scale-booking-qa-tn': 'حجز ميزان من قطر إلى تونس',
            'scale-booking-tn-qa': 'حجز ميزان من تونس إلى قطر',
            'money-delivery': 'توثيق تسليم الأموال',
            'other': 'استفسار عام / خدمة أخرى'
        };
        return services[serviceType] || serviceType;
    }
    
    function getUrgencyName(urgency) {
        const urgencies = {
            'normal': 'عادي (الرد خلال 24 ساعة)',
            'urgent': 'عاجل (الرد خلال 4 ساعات)',
            'emergency': 'طارئ (الرد خلال ساعة)'
        };
        return urgencies[urgency] || urgency;
    }
    
    function getContactMethodName(method) {
        const methods = {
            'whatsapp': 'واتساب',
            'phone': 'مكالمة هاتفية',
            'email': 'بريد إلكتروني',
            'any': 'أي طريقة'
        };
        return methods[method] || method;
    }
    
    // ================= إرسال عبر واتساب =================
    function submitViaWhatsApp() {
        if (isSubmitting) return;
        
        if (!validateForm()) {
            return;
        }
        
        const formData = getFormData();
        
        let whatsappNumber = '97471375390';
        
        if (formData.countryCode === '+216') {
            whatsappNumber = '21656471550';
        }
        
        let whatsappMessage = `*🚀 طلب خدمة جديدة - Tn-QA Delivery*%0A%0A`;
        whatsappMessage += `*👤 العميل:* ${formData.fullName}%0A`;
        whatsappMessage += `*📞 رقم الهاتف:* ${formData.phoneNumber}%0A`;
        whatsappMessage += `*📋 الخدمة الرئيسية:* ${getServiceName(formData.serviceType)}%0A`;
        whatsappMessage += `*🔧 الخدمة المطلوبة:* ${formData.messageSubject}%0A`;
        whatsappMessage += `*⚡ درجة الاستعجال:* ${getUrgencyName(formData.urgency)}%0A%0A`;
        whatsappMessage += `*📝 تفاصيل الطلب:*%0A${formData.message}%0A%0A`;
        
        if (formData.email) {
            whatsappMessage += `*📧 البريد الإلكتروني:* ${formData.email}%0A`;
        }
        
        whatsappMessage += `*💬 التواصل المفضل:* ${getContactMethodName(formData.preferredContact)}%0A`;
        whatsappMessage += `*📍 المصدر:* موقع Tn-QA Delivery%0A`;
        whatsappMessage += `*⏰ الوقت:* ${new Date().toLocaleString('ar-SA')}`;
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        isSubmitting = true;
        const submitBtn = document.getElementById('submitForm');
        if (submitBtn) {
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جار الإعداد...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                showToast('جار تحويلك إلى واتساب...', 'success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    isSubmitting = false;
                }, 2000);
            }, 1000);
        }
    }
    
    // ================= إرسال عبر البريد الإلكتروني (الحل الجديد) =================
    function submitViaEmail() {
        if (isSubmitting) return;
        
        if (!validateForm()) {
            return;
        }
        
        isSubmitting = true;
        
        const formData = getFormData();
        const emailSubmitBtn = document.getElementById('emailSubmit');
        
        // عرض مؤشر التحميل
        if (emailSubmitBtn) {
            const originalHTML = emailSubmitBtn.innerHTML;
            emailSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جار الإعداد...';
            emailSubmitBtn.disabled = true;
        }
        
        // بناء محتوى بسيط للبريد (لتجنب طول الـ URL)
        const subject = `طلب خدمة: ${formData.messageSubject.substring(0, 50)}...`;
        
        let body = `طلب خدمة جديد من موقع Tn-QA Delivery\n\n`;
        body += `الاسم: ${formData.fullName}\n`;
        body += `الهاتف: ${formData.phone}\n`;
        body += `البريد الإلكتروني: ${formData.email || 'غير محدد'}\n`;
        body += `نوع الخدمة: ${getServiceName(formData.serviceType)}\n`;
        body += `الموضوع: ${formData.messageSubject}\n\n`;
        body += `تفاصيل الطلب:\n${formData.message.substring(0, 500)}${formData.message.length > 500 ? '...' : ''}\n\n`;
        body += `التاريخ: ${new Date().toLocaleDateString('ar-SA')}`;
        
        // ترميز النص بشكل بسيط
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        
        // الحل 1: استخدام طريقة مباشرة مع فتح نافذة جديدة
        try {
            const mailtoLink = `mailto:helamishwar@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
            
            console.log('رابط البريد:', mailtoLink.length, 'حرف');
            console.log('الرابط مختصر:', mailtoLink.substring(0, 100) + '...');
            
            // محاولة فتح البريد بعدة طرق
            let emailOpened = false;
            
            // الطريقة 1: window.open مع timeout
            const emailWindow = window.open(mailtoLink, '_email');
            if (emailWindow) {
                emailOpened = true;
                // إغلاق النافذة بعد ثانية إذا كانت about:blank
                setTimeout(() => {
                    if (emailWindow.location.href === 'about:blank') {
                        emailWindow.close();
                        // تجربة طريقة أخرى
                        openEmailWithFormData(formData);
                    }
                }, 1000);
            }
            
            // الطريقة 2: إذا لم تفتح، جرب window.location
            setTimeout(() => {
                if (!emailOpened) {
                    try {
                        window.location.href = mailtoLink;
                        emailOpened = true;
                    } catch (e) {
                        console.error('فشلت الطريقة الثانية:', e);
                    }
                }
            }, 500);
            
            // الطريقة 3: إذا فشلت كل الطرق، عرض الخيارات
            setTimeout(() => {
                if (!emailOpened) {
                    showEmailOptions(formData, body, subject);
                }
            }, 1500);
            
            showToast('جار فتح بريدك الإلكتروني...', 'success');
            
        } catch (error) {
            console.error('خطأ في فتح البريد:', error);
            showEmailOptions(formData, body, subject);
        }
        
        // إعادة تعيين الزر بعد 3 ثوان
        setTimeout(() => {
            if (emailSubmitBtn) {
                emailSubmitBtn.disabled = false;
                emailSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>إرسال عبر البريد الإلكتروني</span>';
            }
            isSubmitting = false;
        }, 3000);
    }
    
    // طريقة بديلة لعرض البريد باستخدام form
    function openEmailWithFormData(formData) {
        // إنشاء form مخفي
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://formsubmit.co/helamishwar@gmail.com';
        form.style.display = 'none';
        form.target = '_blank';
        
        // إضافة حقول النموذج
        const fields = {
            '_subject': `طلب خدمة: ${formData.messageSubject}`,
            'الاسم الكامل': formData.fullName,
            'رقم الهاتف': formData.phone,
            'البريد الإلكتروني': formData.email || 'غير محدد',
            'نوع الخدمة': getServiceName(formData.serviceType),
            'درجة الاستعجال': getUrgencyName(formData.urgency),
            'طريقة التواصل المفضلة': getContactMethodName(formData.preferredContact),
            'موضوع الرسالة': formData.messageSubject,
            'تفاصيل الطلب': formData.message,
            '_next': window.location.href,
            '_captcha': 'false'
        };
        
        Object.entries(fields).forEach(([name, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            form.appendChild(input);
        });
        
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        
        showToast('تم فتح نموذج إرسال البريد', 'success');
    }
    
    // عرض خيارات البريد
    function showEmailOptions(formData, simpleBody, subject) {
        // إنشاء نافذة الخيارات
        const modal = document.createElement('div');
        modal.id = 'emailOptionsModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
        `;
        
        const fullBody = buildFullEmailBody(formData);
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                direction: rtl;
                font-family: 'Cairo', sans-serif;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="color: #D4AF37; margin: 0;">
                        <i class="fas fa-envelope"></i> إرسال البريد الإلكتروني
                    </h3>
                    <button id="closeEmailModal" style="
                        background: none;
                        border: none;
                        font-size: 20px;
                        color: #666;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <p style="color: #666; margin-bottom: 25px;">
                    اختر إحدى الطرق التالية لإرسال البريد:
                </p>
                
                <div style="display: grid; gap: 15px; margin-bottom: 30px;">
                    <button class="email-option-btn" data-method="copy" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        text-align: right;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 16px;
                    ">
                        <i class="fas fa-copy"></i>
                        <span>نسخ البيانات وإرسالها يدوياً</span>
                    </button>
                    
                    <button class="email-option-btn" data-method="gmail" style="
                        background: #EA4335;
                        color: white;
                        border: none;
                        padding: 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        text-align: right;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 16px;
                    ">
                        <i class="fab fa-google"></i>
                        <span>فتح Gmail مباشرة</span>
                    </button>
                    
                    <button class="email-option-btn" data-method="outlook" style="
                        background: #0078D4;
                        color: white;
                        border: none;
                        padding: 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        text-align: right;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 16px;
                    ">
                        <i class="fas fa-envelope"></i>
                        <span>فتح Outlook مباشرة</span>
                    </button>
                    
                    <button class="email-option-btn" data-method="formsubmit" style="
                        background: #D4AF37;
                        color: white;
                        border: none;
                        padding: 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        text-align: right;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 16px;
                    ">
                        <i class="fas fa-paper-plane"></i>
                        <span>استخدام نموذج إرسال مباشر</span>
                    </button>
                </div>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="color: #333; margin-bottom: 10px;">
                        <i class="fas fa-info-circle"></i> معلومات البريد
                    </h4>
                    <p style="margin: 5px 0; color: #666;">
                        <strong>إلى:</strong> helamishwar@gmail.com
                    </p>
                    <p style="margin: 5px 0; color: #666;">
                        <strong>الموضوع:</strong> ${subject}
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // إضافة الأحداث
        document.getElementById('closeEmailModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.querySelectorAll('.email-option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const method = this.getAttribute('data-method');
                
                switch(method) {
                    case 'copy':
                        copyEmailData(fullBody, subject);
                        modal.remove();
                        break;
                        
                    case 'gmail':
                        openGmail(fullBody, subject);
                        modal.remove();
                        break;
                        
                    case 'outlook':
                        openOutlook(fullBody, subject);
                        modal.remove();
                        break;
                        
                    case 'formsubmit':
                        openEmailWithFormData(formData);
                        modal.remove();
                        break;
                }
            });
        });
    }
    
    // بناء محتوى البريد الكامل
    function buildFullEmailBody(formData) {
        let body = `🚀 طلب خدمة جديدة - Tn-QA Delivery\n\n`;
        body += `═══════════════════════════════════════════════════════════\n\n`;
        body += `👤 معلومات العميل:\n`;
        body += `───────────────────────────────────────────────────────────\n`;
        body += `• الاسم الكامل: ${formData.fullName}\n`;
        body += `• رقم الهاتف: ${formData.phone}\n`;
        body += `• البريد الإلكتروني: ${formData.email || 'غير محدد'}\n`;
        body += `• طريقة التواصل المفضلة: ${getContactMethodName(formData.preferredContact)}\n\n`;
        body += `🔧 تفاصيل الخدمة:\n`;
        body += `───────────────────────────────────────────────────────────\n`;
        body += `• نوع الخدمة: ${getServiceName(formData.serviceType)}\n`;
        body += `• درجة الاستعجال: ${getUrgencyName(formData.urgency)}\n`;
        body += `• موضوع الطلب: ${formData.messageSubject}\n\n`;
        body += `📝 تفاصيل الطلب:\n`;
        body += `───────────────────────────────────────────────────────────\n`;
        body += `${formData.message}\n\n`;
        
        if (uploadedFiles.length > 0) {
            body += `📎 الملفات المرفقة: ${uploadedFiles.length} ملف(ات)\n\n`;
        }
        
        body += `═══════════════════════════════════════════════════════════\n`;
        body += `📅 التاريخ: ${new Date().toLocaleDateString('ar-SA')}\n`;
        body += `🕒 الوقت: ${new Date().toLocaleTimeString('ar-SA')}\n`;
        body += `🌐 المصدر: موقع Tn-QA Delivery\n`;
        body += `🔗 الرابط: ${window.location.href}\n`;
        
        return body;
    }
    
    // نسخ بيانات البريد
    function copyEmailData(body, subject) {
        const emailContent = `إلى: helamishwar@gmail.com\nالموضوع: ${subject}\n\n${body}`;
        
        navigator.clipboard.writeText(emailContent).then(() => {
            showToast('تم نسخ بيانات البريد إلى الحافظة', 'success');
            
            // عرض تعليمات
            setTimeout(() => {
                alert(`تم نسخ بيانات البريد بنجاح!\n\nالخطوات التالية:\n1. افتح بريدك الإلكتروني\n2. أنشئ رسالة جديدة\n3. الصق المحتوى\n4. أرسلها إلى: helamishwar@gmail.com\n\nسيتم لصق البيانات تلقائياً في الحافظة.`);
            }, 500);
            
        }).catch(() => {
            // طريقة بديلة للنسخ
            const textarea = document.createElement('textarea');
            textarea.value = emailContent;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                showToast('تم نسخ بيانات البريد إلى الحافظة', 'success');
                
                setTimeout(() => {
                    alert(`تم نسخ بيانات البريد!\n\nالخطوات:\n1. افتح بريدك الإلكتروني\n2. أنشئ رسالة جديدة\n3. الصق المحتوى (Ctrl+V)\n4. أرسلها إلى: helamishwar@gmail.com`);
                }, 500);
                
            } catch (err) {
                // إذا فشل النسخ، عرض البيانات للمستخدم
                alert(`بيانات البريد:\n\n${emailContent}\n\nيرجى نسخ البيانات يدوياً وإرسالها إلى: helamishwar@gmail.com`);
            }
            
            document.body.removeChild(textarea);
        });
    }
    
    // فتح Gmail
    function openGmail(body, subject) {
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=helamishwar@gmail.com&su=${encodedSubject}&body=${encodedBody}`;
        
        window.open(gmailUrl, '_blank');
        showToast('جار فتح Gmail...', 'success');
    }
    
    // فتح Outlook
    function openOutlook(body, subject) {
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=helamishwar@gmail.com&subject=${encodedSubject}&body=${encodedBody}`;
        
        window.open(outlookUrl, '_blank');
        showToast('جار فتح Outlook...', 'success');
    }
    
    // ================= إدارة النموذج =================
    function initContactForm() {
        console.log('جاري تهيئة نموذج الاتصال...');
        
        const contactForm = document.getElementById('contactForm');
        const clearFormBtn = document.getElementById('clearForm');
        const submitFormBtn = document.getElementById('submitForm');
        const emailSubmitBtn = document.getElementById('emailSubmit');
        const openEmailFormBtn = document.getElementById('openEmailForm');
        const messageTextarea = document.getElementById('message');
        const charCount = document.querySelector('.char-count');
        
        if (!contactForm) {
            console.error('نموذج الاتصال غير موجود');
            return;
        }
        
        // تحديث عداد الأحرف
        function updateCharCount() {
            if (messageTextarea && charCount) {
                const length = messageTextarea.value.length;
                charCount.textContent = `${length}/2000 حرف`;
                
                if (length > 1800) {
                    charCount.style.color = '#dc3545';
                    charCount.style.fontWeight = 'bold';
                } else if (length > 1500) {
                    charCount.style.color = '#ffc107';
                    charCount.style.fontWeight = 'bold';
                } else {
                    charCount.style.color = '';
                    charCount.style.fontWeight = '';
                }
            }
        }
        
        if (messageTextarea) {
            messageTextarea.addEventListener('input', updateCharCount);
            updateCharCount();
        }
        
        // مسح النموذج
        if (clearFormBtn) {
            clearFormBtn.addEventListener('click', function() {
                if (confirm('هل أنت متأكد من رغبتك في مسح جميع بيانات النموذج؟')) {
                    contactForm.reset();
                    uploadedFiles.forEach(file => file.element.remove());
                    uploadedFiles = [];
                    updateCharCount();
                    
                    document.querySelectorAll('.field-error').forEach(error => error.remove());
                    document.querySelectorAll('.input-error').forEach(input => {
                        input.classList.remove('input-error');
                        input.style.borderColor = '';
                    });
                    
                    showToast('تم مسح النموذج بنجاح', 'info');
                    
                    const fileUploadArea = document.getElementById('fileUploadArea');
                    if (fileUploadArea) {
                        fileUploadArea.style.borderColor = '';
                        fileUploadArea.style.background = '';
                    }
                }
            });
        }
        
        // إرسال عبر واتساب
        if (submitFormBtn) {
            submitFormBtn.addEventListener('click', function(e) {
                e.preventDefault();
                submitViaWhatsApp();
            });
        }
        
        // إرسال عبر البريد الإلكتروني
        if (emailSubmitBtn) {
            emailSubmitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                submitViaEmail();
            });
        }
        
        // فتح نموذج البريد
        if (openEmailFormBtn) {
            openEmailFormBtn.addEventListener('click', function(e) {
                e.preventDefault();
                submitViaEmail();
            });
        }
    }
    
    // ================= الخريطة =================
    function initMap() {
        console.log('جاري تهيئة الخريطة...');
        
        const mapContainer = document.getElementById('contactMap');
        if (!mapContainer) {
            console.warn('حاوية الخريطة غير موجودة');
            return;
        }
        
        if (typeof L === 'undefined') {
            console.error('مكتبة Leaflet غير مثبتة');
            showMapError('تعذر تحميل الخريطة، يرجى تحديث الصفحة');
            return;
        }
        
        try {
            const qatarCoords = [25.3548, 51.1839];
            const tunisiaCoords = [33.8869, 9.5375];
            
            const map = L.map('contactMap', {
                center: [28, 30],
                zoom: 5,
                zoomControl: true,
                attributionControl: true,
                scrollWheelZoom: true
            });
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
                minZoom: 3
            }).addTo(map);
            
            const qatarIcon = L.divIcon({
                className: 'custom-marker',
                html: '<div style="background: #8A1538; color: white; padding: 8px 12px; border-radius: 20px; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">🇶🇦 قطر</div>',
                iconSize: [100, 40],
                iconAnchor: [50, 20]
            });
            
            const tunisiaIcon = L.divIcon({
                className: 'custom-marker',
                html: '<div style="background: #E70013; color: white; padding: 8px 12px; border-radius: 20px; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">🇹🇳 تونس</div>',
                iconSize: [100, 40],
                iconAnchor: [50, 20]
            });
            
            const qatarMarker = L.marker(qatarCoords, { icon: qatarIcon }).addTo(map);
            const tunisiaMarker = L.marker(tunisiaCoords, { icon: tunisiaIcon }).addTo(map);
            
            qatarMarker.bindPopup(`
                <div class="map-popup">
                    <h3>🇶🇦 مكتب قطر</h3>
                    <p><i class="fas fa-map-marker-alt"></i> الدوحة، قطر</p>
                    <p><i class="fas fa-phone"></i> الهاتف: +974 71 375 390</p>
                    <p><i class="fab fa-whatsapp"></i> الواتساب: +974 71 375 390</p>
                    <p><i class="fas fa-clock"></i> متاح 24/7</p>
                    <a href="https://wa.me/97471375390" target="_blank" style="display: inline-block; margin-top: 10px; padding: 8px 15px; background: #25D366; color: white; border-radius: 5px; text-decoration: none;">
                        <i class="fab fa-whatsapp"></i> تواصل عبر واتساب
                    </a>
                </div>
            `);
            
            tunisiaMarker.bindPopup(`
                <div class="map-popup">
                    <h3>🇹🇳 مكتب تونس</h3>
                    <p><i class="fas fa-map-marker-alt"></i> تونس العاصمة</p>
                    <p><i class="fas fa-phone"></i> الهاتف: +216 56 471 550</p>
                    <p><i class="fab fa-whatsapp"></i> الواتساب: +216 56 471 550</p>
                    <p><i class="fas fa-clock"></i> متاح 24/7</p>
                    <a href="https://wa.me/21656471550" target="_blank" style="display: inline-block; margin-top: 10px; padding: 8px 15px; background: #25D366; color: white; border-radius: 5px; text-decoration: none;">
                        <i class="fab fa-whatsapp"></i> تواصل عبر واتساب
                    </a>
                </div>
            `);
            
            L.circle(qatarCoords, {
                color: '#8A1538',
                fillColor: '#8A1538',
                fillOpacity: 0.1,
                radius: 50000,
                weight: 2
            }).addTo(map);
            
            L.circle(tunisiaCoords, {
                color: '#E70013',
                fillColor: '#E70013',
                fillOpacity: 0.1,
                radius: 200000,
                weight: 2
            }).addTo(map);
            
            const bounds = L.latLngBounds([qatarCoords, tunisiaCoords]);
            map.fitBounds(bounds.pad(0.2));
            
            mapInitialized = true;
            console.log('تم تهيئة الخريطة بنجاح');
            
        } catch (error) {
            console.error('خطأ في تهيئة الخريطة:', error);
        }
    }
    
    // ================= تهيئة صفحة الاتصال =================
    function initContactPage() {
        console.log('========== بدء تهيئة صفحة الاتصال ==========');
        
        initCopyButtons();
        initFileUpload();
        initFormEnhancements();
        initContactForm();
        initMap();
        initFAQAccordion();
        initQuickContactWidget();
        initConnectionStatus();
        
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        addDynamicStyles();
        
        console.log('========== اكتملت تهيئة صفحة الاتصال بنجاح ==========');
    }
    
    // ================= إضافة أنماط ديناميكية =================
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.id = 'contact-dynamic-styles';
        style.textContent = `
            .toast-message {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                background: #333;
                color: white;
                border-radius: 8px;
                z-index: 9999;
                animation: slideIn 0.3s ease;
                max-width: 400px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            
            .toast-message.success {
                background: #25D366;
            }
            
            .toast-message.error {
                background: #dc3545;
            }
            
            .toast-message.info {
                background: #17a2b8;
            }
            
            .toast-message.warning {
                background: #ffc107;
                color: #333;
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
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            .field-error {
                animation: fadeIn 0.3s ease;
            }
            
            .input-error {
                border-color: #dc3545 !important;
                animation: shake 0.5s ease;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        
        if (!document.getElementById('contact-dynamic-styles')) {
            document.head.appendChild(style);
        }
    }
    
    // ================= أدوات التصحيح =================
    window.contactDebug = {
        showToast: showToast,
        testFormValidation: function() {
            document.getElementById('fullName').value = 'محمد أحمد';
            document.getElementById('phoneNumber').value = '12345678';
            document.getElementById('email').value = 'test@example.com';
            document.getElementById('serviceType').value = 'local-delivery-qatar';
            document.getElementById('messageSubject').value = 'طلب خدمة';
            document.getElementById('message').value = 'هذا اختبار للنظام';
            document.getElementById('privacyPolicy').checked = true;
            
            showToast('تم تعبئة النموذج ببيانات تجريبية', 'success');
        }
    };
    
    // بدء التشغيل
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactPage);
    } else {
        setTimeout(initContactPage, 100);
    }
});

// ================= دوال مساعدة إضافية =================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question?.querySelector('i');
        
        if (!question || !answer || !icon) return;
        
        if (!item.classList.contains('active')) {
            answer.style.maxHeight = '0px';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
            answer.style.padding = '0px';
        }
        
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = item.classList.contains('active');
            
            // إغلاق الآخرين
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0px';
                        otherAnswer.style.padding = '0px';
                    }
                    
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-chevron-up');
                        otherIcon.classList.add('fa-chevron-down');
                    }
                }
            });
            
            // تبديل الحالة
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
                answer.style.padding = '0px';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '20px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
}

function initQuickContactWidget() {
    const widget = document.querySelector('.quick-contact-widget');
    if (!widget) return;
    
    setTimeout(() => {
        widget.classList.add('active');
    }, 3000);
    
    const widgetClose = document.querySelector('.widget-close');
    if (widgetClose) {
        widgetClose.addEventListener('click', function() {
            widget.classList.remove('active');
        });
    }
}

function initConnectionStatus() {
    function updateStatus() {
        const statusBadges = document.querySelectorAll('.status-badge');
        const isOnline = navigator.onLine;
        
        statusBadges.forEach(badge => {
            if (isOnline) {
                badge.textContent = 'متصل الآن';
                badge.className = 'status-badge active';
                badge.style.background = '#25D366';
            } else {
                badge.textContent = 'غير متصل';
                badge.className = 'status-badge inactive';
                badge.style.background = '#dc3545';
            }
        });
        
        setTimeout(updateStatus, 30000);
    }
    
    updateStatus();
    
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
}

console.log('تم تحميل contact.js بنجاح - الإصدار المحسن');




document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('scrollToTop');
    if (!btn) return;

    const SHOW_AFTER = 300;

    function toggleVisibility() {
        btn.classList.toggle(
            'visible',
            window.scrollY > SHOW_AFTER
        );
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    btn.addEventListener('click', scrollToTop);

    toggleVisibility();
});
