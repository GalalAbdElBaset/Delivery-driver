/**
 * ملف JavaScript لصفحة التواصل الاحترافية
 * Tn-QA Delivery
 */

// ================= INITIALIZE CONTACT PAGE =================
function initContactPage() {
    initCopyButtons();
    initFileUpload();
    initContactForm();
    initFAQAccordion();
    initQuickWidget();
    initPhoneValidation();
    initFormAutoSave();
    console.log('✅ Contact page initialized');
}

// ================= COPY BUTTONS =================
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-number') || this.getAttribute('data-text');
            
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // تغيير الأيقونة مؤقتاً
                    const originalIcon = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    
                    // إظهار رسالة تأكيد
                    showToast('تم نسخ النص: ' + textToCopy, 'success');
                    
                    // إعادة الأيقونة الأصلية بعد ثانيتين
                    setTimeout(() => {
                        this.innerHTML = originalIcon;
                    }, 2000);
                }).catch(err => {
                    console.error('فشل النسخ:', err);
                    showToast('فشل النسخ، يرجى المحاولة مرة أخرى', 'error');
                });
            }
        });
    });
}

// ================= FILE UPLOAD =================
function initFileUpload() {
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileUpload');
    const fileList = document.getElementById('fileList');
    
    if (!fileUploadArea || !fileInput) return;
    
    // فتح اختيار الملفات عند النقر
    fileUploadArea.addEventListener('click', () => fileInput.click());
    
    // سحب وإفلات الملفات
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = 'var(--gold)';
        fileUploadArea.style.background = 'rgba(212, 175, 55, 0.1)';
    });
    
    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.style.borderColor = '';
        fileUploadArea.style.background = '';
    });
    
    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = '';
        fileUploadArea.style.background = '';
        
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    });
    
    // تغيير الملفات المختارة
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFiles(e.target.files);
        }
    });
    
    function handleFiles(files) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        Array.from(files).forEach(file => {
            // التحقق من حجم الملف
            if (file.size > maxSize) {
                showToast('الملف ' + file.name + ' يتجاوز الحد المسموح (10MB)', 'error');
                return;
            }
            
            // التحقق من نوع الملف
            if (!allowedTypes.includes(file.type)) {
                showToast('نوع الملف ' + file.name + ' غير مسموح به', 'error');
                return;
            }
            
            // إضافة الملف إلى القائمة
            addFileToList(file);
        });
        
        // إعادة تعيين حقل الإدخال
        fileInput.value = '';
    }
    
    function addFileToList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileSize = formatFileSize(file.size);
        const fileIcon = getFileIcon(file.type);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <i class="${fileIcon} file-icon"></i>
                <div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${fileSize}</div>
                </div>
            </div>
            <button class="remove-file" type="button">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // إضافة حدث إزالة الملف
        fileItem.querySelector('.remove-file').addEventListener('click', () => {
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
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// ================= CONTACT FORM =================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formLoader = document.getElementById('formLoader');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const clearFormBtn = document.getElementById('clearForm');
    const submitFormBtn = document.getElementById('submitForm');
    const charCount = document.querySelector('.char-count');
    const messageTextarea = document.getElementById('message');
    
    // تحديث عدد الأحرف
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = `${count}/2000 حرف`;
            
            if (count > 2000) {
                charCount.style.color = 'var(--error)';
                this.style.borderColor = 'var(--error)';
            } else {
                charCount.style.color = 'var(--gray)';
                this.style.borderColor = '';
            }
        });
    }
    
    // مسح النموذج
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من مسح جميع البيانات المدخلة؟')) {
                contactForm.reset();
                document.getElementById('fileList').innerHTML = '';
                if (charCount) charCount.textContent = '0/2000 حرف';
                showToast('تم مسح النموذج بنجاح', 'info');
            }
        });
    }
    
    // إرسال النموذج
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // التحقق من صحة النموذج
        if (!validateForm()) {
            return;
        }
        
        // إظهار حالة التحميل
        submitFormBtn.disabled = true;
        if (formLoader) formLoader.style.display = 'block';
        if (submitFormBtn.querySelector('span')) {
            submitFormBtn.querySelector('span').textContent = 'جاري الإرسال...';
        }
        
        // إخفاء رسائل الخطأ القديمة
        hideMessages();
        
        try {
            // جمع بيانات النموذج
            const formData = getFormData();
            
            // إنشاء رسالة الواتساب
            const whatsappMessage = createWhatsAppMessage(formData);
            const whatsappNumber = "97471375390"; // الرقم الأساسي
            
            // الانتقال إلى واتساب
            setTimeout(() => {
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
                
                // إظهار رسالة النجاح
                showSuccessMessage();
                
                // حفظ النموذج في التخزين المحلي
                saveFormToLocalStorage(formData);
                
                // إعادة تعيين النموذج بعد 5 ثوانٍ
                setTimeout(() => {
                    contactForm.reset();
                    const fileList = document.getElementById('fileList');
                    if (fileList) fileList.innerHTML = '';
                    if (charCount) charCount.textContent = '0/2000 حرف';
                }, 5000);
                
            }, 1500);
            
        } catch (error) {
            console.error('Error:', error);
            showErrorMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
        } finally {
            // إعادة تعيين حالة الزر
            setTimeout(() => {
                submitFormBtn.disabled = false;
                if (formLoader) formLoader.style.display = 'none';
                if (submitFormBtn.querySelector('span')) {
                    submitFormBtn.querySelector('span').textContent = 'إرسال عبر واتساب';
                }
            }, 2000);
        }
    });
    
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--error)';
                isValid = false;
                
                // إضافة رسالة خطأ
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.textContent = 'هذا الحقل مطلوب';
                errorDiv.style.cssText = 'color: var(--error); font-size: 0.85rem; margin-top: 5px;';
                
                field.parentNode.appendChild(errorDiv);
                
                // إزالة رسالة الخطأ عند الإدخال
                field.addEventListener('input', function() {
                    this.style.borderColor = '';
                    const error = this.parentNode.querySelector('.field-error');
                    if (error) error.remove();
                });
            }
        });
        
        // التحقق من البريد الإلكتروني
        const emailField = document.getElementById('email');
        if (emailField && emailField.value && !isValidEmail(emailField.value)) {
            emailField.style.borderColor = 'var(--error)';
            showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
            isValid = false;
        }
        
        // التحقق من عدد أحرف الرسالة
        if (messageTextarea && messageTextarea.value.length > 2000) {
            showToast('الرسالة طويلة جداً (الحد الأقصى 2000 حرف)', 'error');
            isValid = false;
        }
        
        return isValid;
    }
    
    function getFormData() {
        const formData = {
            timestamp: new Date().toISOString(),
            fullName: document.getElementById('fullName')?.value || '',
            countryCode: document.getElementById('countryCode')?.value || '',
            phoneNumber: document.getElementById('phoneNumber')?.value || '',
            email: document.getElementById('email')?.value || '',
            preferredContact: document.getElementById('preferredContact')?.value || '',
            serviceType: document.getElementById('serviceType')?.value || '',
            urgency: document.getElementById('urgency')?.value || '',
            messageSubject: document.getElementById('messageSubject')?.value || '',
            message: document.getElementById('message')?.value || '',
            privacyPolicy: document.getElementById('privacyPolicy')?.checked || false
        };
        
        return formData;
    }
    
    function createWhatsAppMessage(formData) {
        const serviceNames = {
            'local-delivery-qatar': 'التوصيل المحلي في قطر',
            'local-delivery-tunisia': 'التوصيل المحلي في تونس',
            'scale-sales': 'بيع موازين',
            'scale-booking-qa-tn': 'حجز ميزان من قطر إلى تونس',
            'scale-booking-tn-qa': 'حجز ميزان من تونس إلى قطر',
            'money-delivery': 'توثيق تسليم الأموال',
            'other': 'استفسار عام / خدمة أخرى'
        };
        
        const urgencyNames = {
            'normal': 'عادي',
            'urgent': 'عاجل',
            'emergency': 'طارئ'
        };
        
        const contactPreference = {
            'whatsapp': 'واتساب',
            'phone': 'مكالمة هاتفية',
            'email': 'بريد إلكتروني',
            'any': 'أي طريقة'
        };
        
        return `🚀 *طلب خدمة جديد من موقع HELA Express*%0A%0A`
            + `📋 *معلومات العميل:*%0A`
            + `👤 الاسم: ${formData.fullName}%0A`
            + `📞 الهاتف: ${formData.countryCode} ${formData.phoneNumber}%0A`
            + (formData.email ? `📧 البريد: ${formData.email}%0A` : '')
            + `📱 التواصل المفضل: ${contactPreference[formData.preferredContact] || formData.preferredContact}%0A%0A`
            + `🛠️ *تفاصيل الخدمة:*%0A`
            + `⚙️ الخدمة: ${serviceNames[formData.serviceType] || formData.serviceType}%0A`
            + `🚨 درجة الاستعجال: ${urgencyNames[formData.urgency] || formData.urgency}%0A`
            + `📌 الموضوع: ${formData.messageSubject}%0A%0A`
            + `💬 *الرسالة:*%0A${formData.message}%0A%0A`
            + `📍 *المصدر:* نموذج التواصل - موقع HELA Express%0A`
            + `🕒 *التاريخ:* ${new Date().toLocaleString('ar-SA')}`;
    }
    
    function showSuccessMessage() {
        if (!successMessage || !errorMessage) return;
        
        successMessage.style.display = 'flex';
        errorMessage.style.display = 'none';
        
        // إخفاء الرسالة بعد 10 ثوانٍ
        setTimeout(() => {
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 10000);
    }
    
    function showErrorMessage(message) {
        if (!errorMessage || !errorText || !successMessage) return;
        
        errorText.textContent = message;
        errorMessage.style.display = 'flex';
        successMessage.style.display = 'none';
    }
    
    function hideMessages() {
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
    }
}

// ================= FORM AUTO SAVE =================
function initFormAutoSave() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const saveKey = 'hela_contact_form_draft';
    
    // تحميل البيانات المحفوظة
    const savedData = localStorage.getItem(saveKey);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = data[key];
                    } else {
                        field.value = data[key];
                    }
                }
            });
            
            // تحديث عدد أحرف الرسالة
            const messageField = document.getElementById('message');
            const charCount = document.querySelector('.char-count');
            if (messageField && charCount) {
                charCount.textContent = `${messageField.value.length}/2000 حرف`;
            }
            
            // إظهار تنبيه
            setTimeout(() => {
                showToast('تم استعادة البيانات التي قمت بإدخالها سابقاً', 'info');
            }, 1000);
            
        } catch (error) {
            console.error('Error loading saved form data:', error);
        }
    }
    
    // حفظ البيانات تلقائياً
    form.addEventListener('input', debounce(function() {
        const formData = {};
        const formElements = form.elements;
        
        for (let element of formElements) {
            if (element.name) {
                if (element.type === 'checkbox') {
                    formData[element.name] = element.checked;
                } else if (element.type !== 'button' && element.type !== 'submit') {
                    formData[element.name] = element.value;
                }
            }
        }
        
        localStorage.setItem(saveKey, JSON.stringify(formData));
    }, 1000));
    
    // مسح البيانات المحفوظة عند الإرسال الناجح
    form.addEventListener('submit', function() {
        localStorage.removeItem(saveKey);
    });
}

function saveFormToLocalStorage(formData) {
    const submissionsKey = 'hela_form_submissions';
    let submissions = JSON.parse(localStorage.getItem(submissionsKey)) || [];
    
    submissions.push({
        ...formData,
        submittedAt: new Date().toISOString()
    });
    
    // الاحتفاظ بآخر 10 طلبات فقط
    if (submissions.length > 10) {
        submissions = submissions.slice(-10);
    }
    
    localStorage.setItem(submissionsKey, JSON.stringify(submissions));
}

// ================= PHONE VALIDATION =================
function initPhoneValidation() {
    const phoneInput = document.getElementById('phoneNumber');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            // تنسيق الرقم بناءً على مفتاح الدولة
            const countryCode = document.getElementById('countryCode').value;
            let formatted = value;
            
            if (countryCode === '+974') { // قطر
                if (value.length <= 4) {
                    formatted = value;
                } else if (value.length <= 7) {
                    formatted = `${value.substring(0, 4)} ${value.substring(4)}`;
                } else {
                    formatted = `${value.substring(0, 4)} ${value.substring(4, 7)} ${value.substring(7)}`;
                }
            } else if (countryCode === '+216') { // تونس
                if (value.length <= 2) {
                    formatted = value;
                } else if (value.length <= 5) {
                    formatted = `${value.substring(0, 2)} ${value.substring(2)}`;
                } else if (value.length <= 7) {
                    formatted = `${value.substring(0, 2)} ${value.substring(2, 5)} ${value.substring(5)}`;
                } else {
                    formatted = `${value.substring(0, 2)} ${value.substring(2, 5)} ${value.substring(5, 7)} ${value.substring(7)}`;
                }
            } else {
                // تنسيق عام
                if (value.length <= 4) {
                    formatted = value;
                } else if (value.length <= 8) {
                    formatted = `${value.substring(0, 4)} ${value.substring(4)}`;
                } else {
                    formatted = `${value.substring(0, 4)} ${value.substring(4, 8)} ${value.substring(8)}`;
                }
            }
            
            e.target.value = formatted;
        }
    });
}

// ================= FAQ ACCORDION =================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // إغلاق جميع العناصر الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const answer = otherItem.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = null;
                }
            });
            
            // تبديل العنصر الحالي
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    
    // فتح أول عنصر افتراضياً
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        firstItem.classList.add('active');
        const firstAnswer = firstItem.querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }
    }
}

// ================= QUICK WIDGET =================
function initQuickWidget() {
    const widget = document.querySelector('.quick-contact-widget');
    const widgetClose = document.querySelector('.widget-close');
    
    if (!widget || !widgetClose) return;
    
    // إظهار الودجت بعد 5 ثوانٍ
    setTimeout(() => {
        widget.classList.add('active');
    }, 5000);
    
    // إغلاق الودجت
    widgetClose.addEventListener('click', function() {
        widget.classList.remove('active');
    });
    
    // إخفاء الودجت عند التمرير
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
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
}

// ================= UTILITY FUNCTIONS =================
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showToast(message, type = 'info') {
    // إنصراف عنصر التوست
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.textContent = message;
    
    // تنسيق التوست
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'var(--success)' : 
                    type === 'error' ? 'var(--error)' : 
                    type === 'info' ? 'var(--gold)' : 'var(--gray-dark)'};
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        z-index: 9999;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        max-width: 350px;
        font-weight: 500;
    `;
    
    // إضافة أنيميشن
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // إزالة التوست بعد 3 ثوانٍ
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// جعل الدوال متاحة عالمياً
window.initContactPage = initContactPage;
window.showToast = showToast;

// تهيئة الصفحة عندما يكون DOM جاهزاً
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // التحقق من أننا في صفحة التواصل
        if (document.getElementById('contactForm')) {
            initContactPage();
        }
    });
} else {
    // إذا كان DOM محملاً بالفعل
    if (document.getElementById('contactForm')) {
        initContactPage();
    }
}