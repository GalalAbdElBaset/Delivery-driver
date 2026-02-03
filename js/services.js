// services.js - Services Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ================= تهيئة أولية =================
    console.log('جاري تحميل صفحة الخدمات...');
    
    // التحقق من وجود عناصر أساسية
    const checkRequiredElements = () => {
        const requiredElements = [
            '.services-hero',
            '.service-card',
            '.faq-item',
            '.testimonials-grid',
            '#imageModal'
        ];
        
        requiredElements.forEach(selector => {
            const element = document.querySelector(selector);
            if (!element) {
                console.warn(`العنصر ${selector} غير موجود في الصفحة`);
            }
        });
    };
    
    checkRequiredElements();
    
    // ================= خدمة الرسائل الجاهزة =================
    const whatsappMessages = {
        // رسائل خدمات تونس
        'التوصيل المحلي في تونس': {
            'توصيل موظفين وتلاميذ': `السلام عليكم،
أريد الاستفسار عن خدمة توصيل التلاميذ داخل تونس.
المنطقة:
عدد التلاميذ:
الأيام:
التوقيت:`,
            
            'توصيل مشاوير خاصة': `السلام عليكم،
أريد طلب خدمة مشاوير داخل تونس.
نقطة الانطلاق:
نقطة الوصول:
التوقيت:`,
            
            'توصيل أغراض ومشتريات': `السلام عليكم،
أريد طلب خدمة توصيل أغراض داخل تونس.
نوع الغرض:
مكان الاستلام:
مكان التسليم:`,
            
            'توصيل هدايا': `السلام عليكم،
أريد طلب خدمة توصيل هدايا داخل تونس.
نوع الهدية:
مكان الاستلام:
مكان التسليم:`,
            
            'توصيل مواد استهلاكية': `السلام عليكم،
أريد طلب خدمة توصيل مواد استهلاكية داخل تونس.
نوع المواد:
مكان الاستلام:
مكان التسليم:`,
            
            'خدمات التجارة الإلكترونية': `السلام عليكم،
أريد الاشتراك أو الشراكة في خدمات التوصيل داخل تونس.
اسم المتجر:
نوع النشاط:`
        },
        
        // رسائل خدمات قطر
        'التوصيل المحلي في قطر': {
            'توصيل موظفين وتلاميذ': `السلام عليكم،
أريد الاستفسار عن خدمة توصيل التلاميذ داخل قطر.
المنطقة:
عدد التلاميذ:
الأيام:
التوقيت:`,
            
            'توصيل مشاوير خاصة': `السلام عليكم،
أريد طلب خدمة مشاوير داخل قطر.
نقطة الانطلاق:
نقطة الوصول:
التوقيت:`,
            
            'توصيل أغراض ومشتريات': `السلام عليكم،
أريد طلب خدمة توصيل أغراض داخل قطر.
نوع الغرض:
مكان الاستلام:
مكان التسليم:`,
            
            'توصيل هدايا': `السلام عليكم،
أريد طلب خدمة توصيل هدايا داخل قطر.
نوع الهدية:
مكان الاستلام:
مكان التسليم:`,
            
            'توصيل مواد استهلاكية': `السلام عليكم،
أريد طلب خدمة توصيل مواد استهلاكية داخل قطر.
نوع المواد:
مكان الاستلام:
مكان التسليم:`,
            
            'خدمات التجارة الإلكترونية': `السلام عليكم،
أريد الاشتراك أو الشراكة في خدمات التوصيل داخل قطر.
اسم المتجر:
نوع النشاط:`
        },
        
        // رسائل خدمات دولية
        'توصيل دولي': {
            'تريد بيع ميزان': `السلام عليكم،
أريد بيع ميزان من قطر إلى تونس.
نوع الميزان:
الوزن:
السعر المطلوب:`,
            
            'حجز ميزان من قطر الي تونس': `السلام عليكم،
أريد حجز ميزان من قطر إلى تونس.
نوع الميزان:
الوزن:
التفاصيل:`,
            
            'حجز ميزان من تونس الي قطر': `السلام عليكم،
أريد حجز ميزان من تونس إلى قطر.
نوع الميزان:
الوزن:
التفاصيل:`
        },
        
        // رسائل خدمات الأموال
        'توثيق تسليم الأموال': {
            'تحويل ريال قطري إلى دينار تونسي': `السلام عليكم،
أريد تحويل ريال قطري إلى دينار تونسي.
المبلغ:
مكان التحويل:`,
            
            'تحويل دينار تونسي إلى ريال قطري': `السلام عليكم،
أريد تحويل دينار تونسي إلى ريال قطري.
المبلغ:
مكان التحويل:`
        }
    };

    // ================= تهيئة خدمة الطلبات =================
    function initServiceRequests() {
        console.log('جاري تهيئة خدمة الطلبات...');
        
        const serviceButtons = document.querySelectorAll('.send-service-request');
        console.log(`تم العثور على ${serviceButtons.length} زر طلب خدمة`);
        
        if (serviceButtons.length === 0) {
            console.warn('لم يتم العثور على أزرار طلب خدمة');
            return;
        }
        
        serviceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('تم النقر على زر طلب خدمة');
                
                // الحصول على البيانات من الزر
                const serviceType = this.getAttribute('data-service');
                const country = this.getAttribute('data-country');
                const phoneInputId = this.getAttribute('data-phone-input');
                const nameInputId = this.getAttribute('data-name-input');
                const serviceSelectId = this.getAttribute('data-service-select');
                const whatsappNumber = this.getAttribute('data-whatsapp-number');
                
                console.log(`نوع الخدمة: ${serviceType}, البلد: ${country}`);
                
                // الحصول على القيم من المدخلات
                const nameInput = document.getElementById(nameInputId);
                const phoneInput = document.getElementById(phoneInputId);
                const serviceSelect = document.getElementById(serviceSelectId);
                
                // التحقق من وجود العناصر
                if (!nameInput || !phoneInput || !serviceSelect) {
                    console.error('عناصر الإدخال غير موجودة');
                    showError('حدث خطأ في النظام، يرجى المحاولة لاحقاً');
                    return;
                }
                
                // التحقق من البيانات
                if (!nameInput.value.trim()) {
                    showError('يرجى إدخال اسمك الكريم');
                    nameInput.focus();
                    return;
                }
                
                if (!phoneInput.value.trim()) {
                    showError('يرجى إدخال رقم هاتفك');
                    phoneInput.focus();
                    return;
                }
                
                if (!serviceSelect.value) {
                    showError('يرجى اختيار خدمة من القائمة');
                    serviceSelect.focus();
                    return;
                }
                
                const clientName = nameInput.value.trim();
                const clientPhone = phoneInput.value.trim();
                const selectedService = serviceSelect.options[serviceSelect.selectedIndex].text;
                
                console.log(`الاسم: ${clientName}, الهاتف: ${clientPhone}, الخدمة: ${selectedService}`);
                
                // إنشاء رسالة WhatsApp
                let message = whatsappMessages[serviceType]?.[selectedService] || 
                             `السلام عليكم،
أريد الاستفسار عن خدمة ${selectedService} - ${serviceType}
الاسم: ${clientName}
الهاتف: ${clientPhone}
البلد: ${country}`;
                
                // إضافة معلومات إضافية إذا كانت موجودة
                if (clientName) {
                    message = `الاسم: ${clientName}\n` + message;
                }
                
                if (clientPhone) {
                    message = `رقم الهاتف: ${clientPhone}\n` + message;
                }
                
                // ترميز الرسالة وفتح WhatsApp
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                
                // تأثير النبض على الكارد
                const card = this.closest('.service-card');
                if (card) {
                    card.classList.add('card-pulse');
                    setTimeout(() => {
                        card.classList.remove('card-pulse');
                    }, 2000);
                }
                
                // تغيير نص الزر مؤقتاً
                const btnText = this.querySelector('.btn-text');
                if (btnText) {
                    const originalText = btnText.textContent;
                    btnText.textContent = 'جار التوجيه إلى WhatsApp...';
                    
                    setTimeout(() => {
                        btnText.textContent = originalText;
                    }, 2000);
                }
                
                // فتح WhatsApp بعد تأخير قصير
                console.log('فتح رابط WhatsApp:', whatsappUrl);
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 500);
            });
        });
    }

    // ================= تأثيرات البطاقات =================
    function initCardAnimations() {
        console.log('جاري تهيئة تأثيرات البطاقات...');
        
        const serviceCards = document.querySelectorAll('.service-card');
        console.log(`تم العثور على ${serviceCards.length} بطاقة خدمة`);
        
        serviceCards.forEach((card, index) => {
            // تأثيرات التمرير
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
                
                // تأثير النبض على الأيقونة
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.5s ease';
                }
                
                // تغيير لون الحدود
                this.style.borderColor = '#d4af37';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
                this.style.borderColor = '';
                
                // إعادة تعيين الأيقونة
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
            
            // تحديث نص الزر عند اختيار خدمة
            const select = card.querySelector('.service-select');
            const button = card.querySelector('.send-service-request');
            
            if (select && button) {
                select.addEventListener('change', function() {
                    const selectedOption = this.options[this.selectedIndex];
                    const btnText = button.querySelector('.btn-text');
                    
                    if (btnText && selectedOption.value) {
                        // تأثير على الزر
                        button.style.background = 'linear-gradient(135deg, #f4d03f 0%, #d4af37 100%)';
                        button.style.transform = 'scale(1.05)';
                        
                        setTimeout(() => {
                            button.style.transform = 'scale(1)';
                        }, 200);
                    }
                });
            }
        });
    }

    // ================= FAQ Accordion =================
    function initFAQAccordion() {
        console.log('جاري تهيئة الأسئلة الشائعة...');
        
        const faqItems = document.querySelectorAll('.faq-item');
        console.log(`تم العثور على ${faqItems.length} سؤال شائع`);
        
        if (faqItems.length === 0) {
            console.warn('لم يتم العثور على أسئلة شائعة!');
            return;
        }
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question?.querySelector('i');
            
            if (!question || !answer || !icon) {
                console.warn(`سؤال ${index + 1} به عناصر ناقصة`);
                return;
            }
            
            // إعداد الحالة الأولية - كل الإجابات مغلقة
            answer.style.maxHeight = '0px';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
            answer.style.padding = '0px';
            
            // إضافة حدث النقر
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`تم النقر على سؤال ${index + 1}`);
                
                // التحقق إذا كان العنصر نشطاً
                const isCurrentlyActive = item.classList.contains('active');
                
                // إغلاق جميع العناصر الأخرى أولاً
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
                
                // تبديل الحالة الحالية
                if (isCurrentlyActive) {
                    // إذا كان نشطاً، أغلقه
                    item.classList.remove('active');
                    answer.style.maxHeight = '0px';
                    answer.style.padding = '0px';
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    // إذا لم يكن نشطاً، افتحه
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.padding = '0px 20px 20px 20px';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
            
            // إضافة تأثيرات الـ hover
            question.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
                this.style.transition = 'background-color 0.2s ease';
            });
            
            question.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
            
            // إضافة مؤشر المؤشر
            question.style.cursor = 'pointer';
        });
        
        console.log('اكتملت تهيئة الأسئلة الشائعة بنجاح');
    }

    // ================= تهيئة AOS للإنميشنات =================
    function initAOSAnimations() {
        console.log('جاري تهيئة AOS للإنميشنات...');
        
        // التحقق من وجود مكتبة AOS
        if (typeof AOS === 'undefined') {
            console.warn('مكتبة AOS غير مثبتة، جاري تحميلها...');
            loadAOSLibrary();
            return;
        }
        
        // تهيئة AOS
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out',
            delay: 100,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
        
        // تطبيق إنميشنات على العناصر الرئيسية
        const heroSection = document.querySelector('.services-hero');
        if (heroSection) {
            heroSection.classList.add('aos-init', 'aos-animate');
        }
        
        // تطبيق AOS على جميع البطاقات
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', index * 100);
            card.classList.add('aos-init');
        });
        
        // تطبيق على الأسئلة الشائعة
        document.querySelectorAll('.faq-item').forEach((item, index) => {
            item.setAttribute('data-aos', 'fade-right');
            item.setAttribute('data-aos-delay', index * 50);
            item.classList.add('aos-init');
        });
        
        // تطبيق على المراجعات
        document.querySelectorAll('.testimonial-card').forEach((card, index) => {
            card.setAttribute('data-aos', 'flip-left');
            card.setAttribute('data-aos-delay', index * 150);
            card.classList.add('aos-init');
        });
        
        console.log('اكتملت تهيئة AOS بنجاح');
    }
    
    // ================= تحميل مكتبة AOS إذا لم تكن موجودة =================
    function loadAOSLibrary() {
        console.log('جاري تحميل مكتبة AOS...');
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/aos@2.3.4/dist/aos.css';
        document.head.appendChild(link);
        
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js';
        script.onload = function() {
            console.log('تم تحميل مكتبة AOS بنجاح');
            initAOSAnimations();
        };
        script.onerror = function() {
            console.error('فشل تحميل مكتبة AOS');
        };
        document.body.appendChild(script);
    }

    // ================= إعدادات إضافية =================
    function initAdditionalFeatures() {
        console.log('جاري تهيئة الميزات الإضافية...');
        
        // تتبع اختيارات الخدمات
        document.querySelectorAll('.service-select').forEach(select => {
            select.addEventListener('change', function() {
                const card = this.closest('.service-card');
                const button = card?.querySelector('.send-service-request');
                const selectedOption = this.options[this.selectedIndex];
                
                if (selectedOption.value && button) {
                    // تحديث نص الزر بناءً على الخدمة المختارة
                    const btnText = button.querySelector('.btn-text');
                    if (btnText) {
                        const serviceText = selectedOption.text.length > 30 
                            ? selectedOption.text.substring(0, 30) + '...' 
                            : selectedOption.text;
                        
                        btnText.textContent = `طلب خدمة: ${serviceText}`;
                        
                        // تأثير النبض على الزر
                        button.classList.add('card-pulse');
                        setTimeout(() => {
                            button.classList.remove('card-pulse');
                        }, 1000);
                    }
                }
            });
        });
        
        // التحقق من صحة رقم الهاتف
        document.querySelectorAll('input[type="tel"]').forEach(input => {
            input.addEventListener('input', function() {
                const value = this.value.replace(/\D/g, '');
                this.value = value;
                
                // إضافة علامة + للهواتف الدولية
                if (value.length > 0 && !value.startsWith('+')) {
                    this.value = '+' + value;
                }
            });
        });
        
        // إضافة تأثيرات للمدخلات
        document.querySelectorAll('.service-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
                this.parentElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
                this.parentElement.style.boxShadow = 'none';
            });
        });
        
        console.log('اكتملت تهيئة الميزات الإضافية');
    }

    // ================= دالة عرض الرسائل =================
    function showError(message) {
        console.log(`عرض خطأ: ${message}`);
        
        // التحقق من وجود تنبيهات سابقة وإزالتها
        const existingAlerts = document.querySelectorAll('.service-alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // إنشاء عنصر التنبيه
        const alertDiv = document.createElement('div');
        alertDiv.className = 'service-alert';
        alertDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                right: 50%;
                transform: translateX(50%);
                background: #dc3545;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 10001;
                animation: slideIn 0.3s ease;
                max-width: 90%;
                text-align: center;
                direction: rtl;
                font-family: 'Cairo', sans-serif;
            ">
                <i class="fas fa-exclamation-circle" style="margin-right: 10px;"></i>
                ${message}
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        // إضافة أنيميشن إذا لم تكن موجودة
        if (!document.getElementById('alert-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'alert-animation-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(50%) translateY(-20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(50%) translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(50%) translateY(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(50%) translateY(-20px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // إزالة التنبيه بعد 3 ثوانٍ
        setTimeout(() => {
            if (alertDiv.parentNode && alertDiv.firstChild) {
                alertDiv.firstChild.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    // ================= Modal للصور =================
    function initImageModal() {
        console.log('جاري تهيئة Modal الصور...');
        
        const imageModal = document.getElementById('imageModal');
        if (!imageModal) {
            console.warn('Modal الصور غير موجود');
            return;
        }
        
        // دالة فتح Modal
        window.openImageModal = function(src) {
            console.log('فتح Modal للصورة:', src);
            
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            
            if (!modal || !modalImg) {
                console.error('عناصر Modal غير موجودة');
                return;
            }
            
            modal.style.display = 'block';
            modalImg.src = src;
            
            // منع التمرير خلف المودال
            document.body.style.overflow = 'hidden';
        };
        
        // دالة إغلاق Modal
        window.closeImageModal = function() {
            console.log('إغلاق Modal');
            
            const modal = document.getElementById('imageModal');
            if (modal) {
                modal.style.display = 'none';
                // إعادة التمرير
                document.body.style.overflow = 'auto';
            }
        };
        
        // إغلاق المودال عند النقر خارج الصورة
        imageModal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('close-modal')) {
                closeImageModal();
            }
        });
        
        // إغلاق المودال بمفتاح ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.style.display === 'block') {
                closeImageModal();
            }
        });
        
        console.log('اكتملت تهيئة Modal الصور');
    }

    // ================= شريط تمرير المراجعات =================
    function initTestimonialSlider() {
        console.log('جاري تهيئة شريط تمرير المراجعات...');
        
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        if (!testimonialsGrid) {
            console.warn('شبكة المراجعات غير موجودة');
            return;
        }
        
        function updateSlider() {
            if (window.innerWidth <= 768) {
                testimonialsGrid.style.display = 'flex';
                testimonialsGrid.style.overflowX = 'auto';
                testimonialsGrid.style.scrollSnapType = 'x mandatory';
                testimonialsGrid.style.gap = '20px';
                testimonialsGrid.style.padding = '10px 0';
                testimonialsGrid.style.scrollbarWidth = 'thin';
                
                // إضافة نمط للبطاقات في وضع السلايدر
                document.querySelectorAll('.testimonial-card').forEach(card => {
                    card.style.minWidth = 'calc(100% - 20px)';
                    card.style.scrollSnapAlign = 'center';
                    card.style.flexShrink = '0';
                });
            } else {
                testimonialsGrid.style.display = 'grid';
                testimonialsGrid.style.overflowX = 'visible';
                testimonialsGrid.style.scrollSnapType = 'none';
                
                // إعادة تعيين الأنماط
                document.querySelectorAll('.testimonial-card').forEach(card => {
                    card.style.minWidth = '';
                    card.style.scrollSnapAlign = '';
                    card.style.flexShrink = '';
                });
            }
        }
        
        // تنفيذ عند التحميل وتغيير الحجم
        updateSlider();
        window.addEventListener('resize', updateSlider);
        
        console.log('اكتملت تهيئة شريط تمرير المراجعات');
    }

    // ================= تأثيرات الصور =================
    function initImageEffects() {
        console.log('جاري تهيئة تأثيرات الصور...');
        
        const images = document.querySelectorAll('.image-grid img');
        if (images.length === 0) {
            console.warn('لم يتم العثور على صور');
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.1 });
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.9)';
            img.style.transition = 'all 0.5s ease';
            observer.observe(img);
        });
        
        console.log('اكتملت تهيئة تأثيرات الصور');
    }

    // ================= إضافة الأنماط المخصصة =================
    function addCustomStyles() {
        console.log('جاري إضافة الأنماط المخصصة...');
        
        if (!document.getElementById('services-dynamic-styles')) {
            const style = document.createElement('style');
            style.id = 'services-dynamic-styles';
            style.textContent = `
                /* تأثيرات إضافية */
                .service-alert {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    z-index: 10001;
                    animation: slideInRight 0.3s ease;
                    direction: rtl;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .service-btn.loading {
                    position: relative;
                    color: transparent;
                }
                
                .service-btn.loading:after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    top: 50%;
                    right: 50%;
                    margin: -10px -10px 0 0;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                /* تأثيرات الإدخال */
                .input-group:focus-within .input-icon {
                    color: #d4af37;
                    transform: translateY(-50%) scale(1.1);
                }
                
                /* تأثير النبض للبطاقات */
                @keyframes cardPulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
                    }
                }
                
                .card-pulse {
                    animation: cardPulse 2s infinite;
                }
                
                /* أنميشن لـ Services Hero */
                .services-hero {
                    position: relative;
                    overflow: hidden;
                }
                
                .services-hero::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(0, 64, 128, 0.9) 0%, rgba(212, 175, 55, 0.8) 100%);
                    animation: heroGradient 10s ease infinite;
                    background-size: 200% 200%;
                    z-index: 0;
                }
                
                .services-hero .hero-content {
                    position: relative;
                    z-index: 1;
                }
                
                @keyframes heroGradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                
                /* تأثيرات AOS إضافية */
                [data-aos] {
                    opacity: 0;
                    transition-property: opacity, transform;
                }
                
                [data-aos].aos-animate {
                    opacity: 1;
                }
                
                /* تحسينات للشاشات الصغيرة */
                @media (max-width: 768px) {
                    .service-btn .btn-text {
                        font-size: 14px;
                    }
                    
                    .service-select option {
                        font-size: 13px;
                    }
                    
                    .faq-question h3 {
                        font-size: 16px;
                    }
                    
                    .testimonials-grid {
                        scrollbar-width: thin;
                        -webkit-overflow-scrolling: touch;
                    }
                    
                    .testimonials-grid::-webkit-scrollbar {
                        height: 6px;
                    }
                    
                    .testimonials-grid::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 3px;
                    }
                    
                    .testimonials-grid::-webkit-scrollbar-thumb {
                        background: #d4af37;
                        border-radius: 3px;
                    }
                    
                    /* إيقاف AOS على الشاشات الصغيرة */
                    [data-aos] {
                        opacity: 1 !important;
                        transform: none !important;
                        transition: none !important;
                    }
                }
                
                /* تحسينات عامة */
                .service-card {
                    transition: all 0.3s ease;
                }
                
                .service-card:hover {
                    transform: translateY(-5px);
                }
                
                .service-btn {
                    transition: all 0.3s ease;
                }
                
                .service-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
            `;
            document.head.appendChild(style);
            console.log('تم إضافة الأنماط المخصصة');
        } else {
            console.log('الأنماط المخصصة موجودة مسبقاً');
        }
    }

    // ================= تهيئة صفحة الخدمات =================
    function initServicesPage() {
        console.log('========== بدء تهيئة صفحة الخدمات ==========');
        
        // تهيئة الطلبات
        initServiceRequests();
        
        // تهيئة تأثيرات البطاقات
        initCardAnimations();
        
        // تهيئة الـ FAQ
        initFAQAccordion();
        
        // تهيئة AOS للإنميشنات
        initAOSAnimations();
        
        // تهيئة الميزات الإضافية
        initAdditionalFeatures();
        
        // تهيئة Modal الصور
        initImageModal();
        
        // تهيئة شريط تمرير المراجعات
        initTestimonialSlider();
        
        // تهيئة تأثيرات الصور
        initImageEffects();
        
        // إضافة أنماط إضافية
        addCustomStyles();
        
        // التأكد من أن جميع إجابات الـ FAQ مغلقة عند البدء
        document.querySelectorAll('.faq-answer').forEach(answer => {
            if (!answer.style.maxHeight || answer.style.maxHeight === '0px') {
                answer.style.maxHeight = '0px';
                answer.style.padding = '0px';
            }
        });
        
        console.log('========== اكتملت تهيئة صفحة الخدمات بنجاح ==========');
    }

    // ================= بدء التشغيل =================
    // انتظر حتى يكتمل تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServicesPage);
    } else {
        setTimeout(initServicesPage, 100); // تأخير بسيط للتأكد من تحميل كل شيء
    }

    // ================= إعادة التحميل عند تغيير اللغة =================
    window.addEventListener('languageChanged', function() {
        console.log('تم تغيير اللغة، إعادة تهيئة الصفحة...');
        setTimeout(() => {
            initServicesPage();
        }, 100);
    });
    
    // ================= أدوات التصحيح =================
    window.servicesDebug = {
        reloadServices: function() {
            console.log('إعادة تحميل خدمات الصفحة يدوياً...');
            initServicesPage();
        },
        showFAQStatus: function() {
            const faqItems = document.querySelectorAll('.faq-item');
            console.log(`عدد الأسئلة: ${faqItems.length}`);
            faqItems.forEach((item, index) => {
                const question = item.querySelector('.faq-question h3')?.textContent?.substring(0, 30);
                const isActive = item.classList.contains('active');
                console.log(`سؤال ${index + 1}: "${question}" - ${isActive ? 'مفتوح' : 'مغلق'}`);
            });
        },
        testError: function(message = 'هذا رسالة تجريبية') {
            showError(message);
        },
        checkElements: function() {
            checkRequiredElements();
        },
        checkAOS: function() {
            if (typeof AOS !== 'undefined') {
                console.log('مكتبة AOS مثبتة وجاهزة');
                console.log('AOS version:', AOS.version);
            } else {
                console.log('مكتبة AOS غير مثبتة');
            }
        }
    };
    
    console.log('تم تحميل services.js بنجاح - جاهز للتشغيل');
});