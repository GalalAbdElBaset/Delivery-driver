/**
 * language.js - Language switching functionality
 */

class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.setupLanguageSwitcher();
        this.applyLanguage();
        this.setupDirection();
    }

    /**
     * Load translation files
     */
    async loadTranslations() {
        try {
            const response = await fetch(`/translations/${this.currentLang}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to embedded translations
            this.translations = this.getFallbackTranslations();
        }
    }

    /**
     * Get fallback translations
     */
    getFallbackTranslations() {
        // Basic fallback translations
        return {
            ar: {
                // Navigation
                "nav.home": "الرئيسية",
                "nav.about": "من نحن",
                "nav.services": "الخدمات",
                "nav.contact": "التواصل",
                "nav.reviews": "المراجعات",
                "nav.whatsapp": "تواصل عبر واتساب",
                "nav.call": "اتصل الآن",
                "nav.menu": "قائمة التنقل",
                
                // Contact Page
                "contact.pageTitle": "تواصل معنا - Tn-QA Delivery",
                "contact.heroTitle": "تواصل معنا",
                "contact.heroSubtitle": "نحن هنا لمساعدتك على مدار الساعة، تواصل معنا بأي طريقة تفضلها",
                "contact.directMethods": "طرق التواصل المباشرة",
                "contact.methodsSubtitle": "اختر الطريقة المناسبة لك للتواصل معنا مباشرة",
                "contact.whatsappCard": "واتساب مباشر",
                "contact.whatsappDesc": "للتواصل الفوري والرد السريع خلال دقائق",
                "contact.phoneCard": "اتصال هاتفي",
                "contact.phoneDesc": "للأمور العاجلة والاستفسارات المباشرة",
                "contact.emailCard": "البريد الإلكتروني",
                "contact.emailDesc": "للرسائل الرسمية، الاستفسارات التفصيلية والمستندات",
                "contact.formTitle": "أرسل لنا رسالة مباشرة",
                "contact.formSubtitle": "املأ النموذج وسنقوم بالرد عليك في أسرع وقت ممكن",
                "contact.mapTitle": "موقعنا على الخريطة",
                "contact.mapSubtitle": "خدمة التوصيل متاحة في قطر وتونس مع تغطية شاملة لكافة المناطق",
                "contact.coverageAreas": "مناطق التغطية",
                "contact.faqTitle": "أسئلة متكررة",
                "contact.faqSubtitle": "إجابات عن الأسئلة الأكثر شيوعاً فيما يتعلق بالتواصل والخدمات",
                "contact.quickWidget": "تواصل الآن",
                
                // Form
                "form.personalInfo": "المعلومات الشخصية",
                "form.fullName": "الاسم الكامل",
                "form.phoneNumber": "رقم الهاتف",
                "form.email": "البريد الإلكتروني",
                "form.preferredContact": "طريقة التواصل المفضلة",
                "form.serviceInfo": "معلومات الخدمة",
                "form.serviceType": "نوع الخدمة المطلوبة",
                "form.urgency": "درجة الاستعجال",
                "form.messageSubject": "موضوع الرسالة",
                "form.messageContent": "محتوى الرسالة",
                "form.message": "تفاصيل الطلب أو الاستفسار",
                "form.attachments": "إرفاق ملفات (اختياري)",
                "form.privacyPolicy": "أوافق على سياسة الخصوصية وشروط الخدمة",
                "form.clear": "مسح النموذج",
                "form.submit": "إرسال عبر واتساب",
                "form.success": "تم إرسال رسالتك بنجاح!",
                "form.successMessage": "سنقوم بالرد عليك خلال 2-4 ساعات. يمكنك تتبع حالة طلبك عبر الرابط الذي تم إرساله إلى بريدك الإلكتروني.",
                "form.error": "حدث خطأ أثناء الإرسال",
                "form.errorMessage": "يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر الواتساب.",
                "form.selectService": "اختر الخدمة المطلوبة",
                "form.hintName": "الرجاء إدخال الاسم الثلاثي",
                "form.hintPhone": "سنتصل على هذا الرقم للرد على استفسارك",
                "form.hintEmail": "اختياري - للرد الرسمي والمستندات",
                "form.hintMessage": "كلما كانت التفاصيل أكثر، كان الرد أفضل وأسرع",
                "form.phonePlaceholder": "رقم الهاتف بدون مفتاح الدولة",
                "form.emailPlaceholder": "example@email.com",
                "form.messageSubjectPlaceholder": "عنوان مختصر لطلبك",
                "form.messagePlaceholder": "يرجى وصف طلبك أو استفسارك بالتفصيل...",
                "form.uploadDrag": "اسحب وأفلت الملفات هنا أو",
                "form.uploadBrowse": "تصفح",
                "form.uploadHint": "يمكنك رفع الصور، PDF، مستندات Word (حتى 10MB)",
                
                // Common
                "common.any": "أي طريقة",
                "common.general": "الاستفسارات العامة",
                "common.business": "الشؤون التجارية",
                "common.other": "استفسار عام / خدمة أخرى",
                "common.primary": "البريد الرئيسي",
                "common.customers": "تمت خدمة +500 عميل",
                "common.satisfaction": "رضا عملاء 98%",
                "common.characters": "حرف",
                "common.copy": "نسخ",
                "common.close": "إغلاق",
                "common.backToTop": "العودة إلى الأعلى",
                "common.verified": "ضمان الرد",
                "common.days": "الأحد - الخميس",
                
                // Status
                "status.available": "دعم فوري",
                "status.connected": "متصل الآن",
                "status.online": "أنت متصل بالإنترنت الآن",
                "status.offline": "أنت غير متصل بالإنترنت",
                
                // Time
                "time.minutes": "رد خلال دقائق",
                "time.hours": "24 ساعة",
                "time.normal": "عادي (الرد خلال 24 ساعة)",
                "time.urgent": "عاجل (الرد خلال 4 ساعات)",
                "time.emergency": "طارئ (الرد خلال ساعة)",
                
                // Countries
                "countries.qatar": "قطر",
                "countries.tunisia": "تونس",
                "countries.saudi": "السعودية",
                "countries.uae": "الإمارات",
                "countries.egypt": "مصر",
                "countries.morocco": "المغرب",
                
                // Services
                "servicesList.localDelivery": "التوصيل المحلي",
                "servicesList.scaleSales": "بيع موازين",
                "servicesList.scaleBooking": "حجز ميزان",
                "servicesList.moneyDelivery": "توثيق تسليم الأموال",
                
                // Coverage
                "coverage.doha": "الدوحة وجميع مناطقها",
                "coverage.rayyan": "الريان والوكرة",
                "coverage.khor": "الخور والذخيرة",
                "coverage.allQatar": "جميع مناطق قطر",
                "coverage.tunis": "تونس العاصمة",
                "coverage.sfax": "صفاقس وسوسة",
                "coverage.nabeul": "نابل والمنستير",
                "coverage.allTunisia": "جميع مناطق تونس",
                "coverage.qatar": "مناطق الخدمة في قطر",
                "coverage.tunisia": "مناطق الخدمة في تونس",
                "coverage.mainOffices": "المكاتب الرئيسية",
                
                // FAQ
                "faq.question1": "ما هي أسرع طريقة للتواصل معكم؟",
                "faq.answer1": "أسرع طريقة للتواصل هي عبر الواتساب حيث يتم الرد خلال دقائق خلال أوقات العمل. للاستفسارات العاجلة يمكنك الاتصال مباشرة على الأرقام المذكورة.",
                "faq.question2": "ما هي أوقات العمل الرسمية؟",
                "faq.answer2": "نحن نعمل 24 ساعة طوال أيام الأسبوع، بما في ذلك العطل الرسمية والإجازات. خدمة الطوارئ متاحة على مدار الساعة.",
                "faq.question3": "كيف يمكنني تتبع حالة طلبي؟",
                "faq.answer3": "بعد تقديم طلبك، سنقوم بإرسال رقم تتبع فريد عبر الواتساب والبريد الإلكتروني. يمكنك استخدام هذا الرقم لمتابعة حالة طلبك.",
                "faq.question4": "هل الخدمات متاحة في جميع مناطق قطر وتونس؟",
                "faq.answer4": "نعم، نقدم خدماتنا في جميع مناطق قطر وتونس. بعض المناطق النائية قد تحتاج إلى ترتيب مسبق. يمكنك التواصل معنا للتحقق من تغطية منطقتك.",
                "faq.question5": "ما هي مدة الرد على النموذج الإلكتروني؟",
                "faq.answer5": "متوسط وقت الرد على النماذج الإلكترونية هو 2-4 ساعات خلال أوقات العمل. للطلبات العاجلة يرجى استخدام الواتساب أو الهاتف.",
                
                // Footer
                "footer.quickContact": "تواصل سريع",
                "footer.emergencyCall": "اتصال عاجل",
                "footer.contactUs": "معلومات الاتصال",
                "footer.description": "خدمات توصيل ونقل موثوقة بين تونس وقطر",
                "footer.legalNotice": "الموقع منصة تعريفية وتنسيقية فقط، ولا يقوم بأي عمليات دفع إلكتروني أو تحصيل أموال.",
                "footer.backToHome": "العودة للرئيسية",
                "footer.copyright": "جميع الحقوق محفوظة",
                
                // Theme
                "theme.toggle": "تبديل وضع السطوع",
                
                // Accessibility
                "accessibility.skipToContent": "تخطي إلى المحتوى الرئيسي",
                
                // Company
                "companyName": "Tn-QA Delivery",
                "companySlogan": "خدمة توصيل سريعة وآمنة"
            },
            en: {
                // Navigation
                "nav.home": "Home",
                "nav.about": "About Us",
                "nav.services": "Services",
                "nav.contact": "Contact",
                "nav.reviews": "Reviews",
                "nav.whatsapp": "Contact via WhatsApp",
                "nav.call": "Call Now",
                "nav.menu": "Navigation Menu",
                
                // Contact Page
                "contact.pageTitle": "Contact Us - Tn-QA Delivery",
                "contact.heroTitle": "Contact Us",
                "contact.heroSubtitle": "We're here to help you 24/7, contact us using any method you prefer",
                "contact.directMethods": "Direct Contact Methods",
                "contact.methodsSubtitle": "Choose the most convenient method to contact us directly",
                "contact.whatsappCard": "Direct WhatsApp",
                "contact.whatsappDesc": "For instant communication and quick response within minutes",
                "contact.phoneCard": "Phone Call",
                "contact.phoneDesc": "For urgent matters and direct inquiries",
                "contact.emailCard": "Email",
                "contact.emailDesc": "For official correspondence, detailed inquiries and documents",
                "contact.formTitle": "Send Us a Direct Message",
                "contact.formSubtitle": "Fill out the form and we'll get back to you as soon as possible",
                "contact.mapTitle": "Our Location on Map",
                "contact.mapSubtitle": "Delivery service available in Qatar and Tunisia with comprehensive coverage of all areas",
                "contact.coverageAreas": "Coverage Areas",
                "contact.faqTitle": "Frequently Asked Questions",
                "contact.faqSubtitle": "Answers to the most common questions regarding communication and services",
                "contact.quickWidget": "Contact Now",
                
                // Form
                "form.personalInfo": "Personal Information",
                "form.fullName": "Full Name",
                "form.phoneNumber": "Phone Number",
                "form.email": "Email",
                "form.preferredContact": "Preferred Contact Method",
                "form.serviceInfo": "Service Information",
                "form.serviceType": "Required Service Type",
                "form.urgency": "Urgency Level",
                "form.messageSubject": "Message Subject",
                "form.messageContent": "Message Content",
                "form.message": "Order or Inquiry Details",
                "form.attachments": "Attach Files (Optional)",
                "form.privacyPolicy": "I agree to the privacy policy and terms of service",
                "form.clear": "Clear Form",
                "form.submit": "Send via WhatsApp",
                "form.success": "Your message has been sent successfully!",
                "form.successMessage": "We will respond within 2-4 hours. You can track your request status via the link sent to your email.",
                "form.error": "An error occurred while sending",
                "form.errorMessage": "Please try again or contact us directly via WhatsApp.",
                "form.selectService": "Select required service",
                "form.hintName": "Please enter your full three-part name",
                "form.hintPhone": "We will call this number to respond to your inquiry",
                "form.hintEmail": "Optional - for official response and documents",
                "form.hintMessage": "More details lead to better and faster response",
                "form.phonePlaceholder": "Phone number without country code",
                "form.emailPlaceholder": "example@email.com",
                "form.messageSubjectPlaceholder": "Brief title for your request",
                "form.messagePlaceholder": "Please describe your request or inquiry in detail...",
                "form.uploadDrag": "Drag and drop files here or",
                "form.uploadBrowse": "Browse",
                "form.uploadHint": "You can upload images, PDF, Word documents (up to 10MB)",
                
                // Common
                "common.any": "Any method",
                "common.general": "General inquiries",
                "common.business": "Business affairs",
                "common.other": "General inquiry / Other service",
                "common.primary": "Primary Email",
                "common.customers": "+500 customers served",
                "common.satisfaction": "98% customer satisfaction",
                "common.characters": "characters",
                "common.copy": "Copy",
                "common.close": "Close",
                "common.backToTop": "Back to top",
                "common.verified": "Response guarantee",
                "common.days": "Sunday - Thursday",
                
                // Status
                "status.available": "Instant support",
                "status.connected": "Connected now",
                "status.online": "You are now online",
                "status.offline": "You are offline",
                
                // Time
                "time.minutes": "Response within minutes",
                "time.hours": "24 hours",
                "time.normal": "Normal (response within 24 hours)",
                "time.urgent": "Urgent (response within 4 hours)",
                "time.emergency": "Emergency (response within 1 hour)",
                
                // Countries
                "countries.qatar": "Qatar",
                "countries.tunisia": "Tunisia",
                "countries.saudi": "Saudi Arabia",
                "countries.uae": "UAE",
                "countries.egypt": "Egypt",
                "countries.morocco": "Morocco",
                
                // Services
                "servicesList.localDelivery": "Local Delivery",
                "servicesList.scaleSales": "Scale Sales",
                "servicesList.scaleBooking": "Scale Booking",
                "servicesList.moneyDelivery": "Money Delivery Documentation",
                
                // Coverage
                "coverage.doha": "Doha and all its areas",
                "coverage.rayyan": "Al Rayyan and Al Wakra",
                "coverage.khor": "Al Khor and Al Dhakhira",
                "coverage.allQatar": "All Qatar areas",
                "coverage.tunis": "Tunis Capital",
                "coverage.sfax": "Sfax and Sousse",
                "coverage.nabeul": "Nabeul and Monastir",
                "coverage.allTunisia": "All Tunisia areas",
                "coverage.qatar": "Service areas in Qatar",
                "coverage.tunisia": "Service areas in Tunisia",
                "coverage.mainOffices": "Main Offices",
                
                // FAQ
                "faq.question1": "What's the fastest way to contact you?",
                "faq.answer1": "The fastest way to contact us is via WhatsApp where we respond within minutes during working hours. For urgent inquiries, you can call directly on the numbers mentioned.",
                "faq.question2": "What are the official working hours?",
                "faq.answer2": "We work 24 hours a day, 7 days a week, including official holidays and vacations. Emergency service is available 24/7.",
                "faq.question3": "How can I track my order status?",
                "faq.answer3": "After submitting your order, we will send a unique tracking number via WhatsApp and email. You can use this number to follow up on your order status.",
                "faq.question4": "Are services available in all areas of Qatar and Tunisia?",
                "faq.answer4": "Yes, we provide our services in all areas of Qatar and Tunisia. Some remote areas may require prior arrangement. You can contact us to verify coverage in your area.",
                "faq.question5": "What is the response time for the electronic form?",
                "faq.answer5": "The average response time for electronic forms is 2-4 hours during working hours. For urgent requests, please use WhatsApp or phone.",
                
                // Footer
                "footer.quickContact": "Quick Contact",
                "footer.emergencyCall": "Emergency Call",
                "footer.contactUs": "Contact Information",
                "footer.description": "Reliable delivery and transportation services between Tunisia and Qatar",
                "footer.legalNotice": "This website is only an informational and coordination platform, and does not perform any electronic payment or money collection operations.",
                "footer.backToHome": "Back to Home",
                "footer.copyright": "All rights reserved",
                
                // Theme
                "theme.toggle": "Toggle brightness mode",
                
                // Accessibility
                "accessibility.skipToContent": "Skip to main content",
                
                // Company
                "companyName": "Tn-QA Delivery",
                "companySlogan": "Fast and Secure Delivery Service"
            }
        }[this.currentLang];
    }

    /**
     * Setup language switcher
     */
    setupLanguageSwitcher() {
        // Desktop language switcher
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');
        const currentLangSpan = document.getElementById('currentLang');

        if (langBtn && langDropdown) {
            // Toggle dropdown
            langBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                langDropdown.classList.remove('active');
            });

            // Handle language selection
            langDropdown.querySelectorAll('.lang-option-nav').forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    const selectedLang = option.dataset.lang;
                    this.switchLanguage(selectedLang);
                    langDropdown.classList.remove('active');
                });
            });

            // Update current language display
            if (currentLangSpan) {
                currentLangSpan.textContent = this.currentLang === 'ar' ? 'العربية' : 'English';
            }
        }

        // Mobile language switcher (if exists)
        const mobileLangSwitcher = document.querySelector('.mobile-language-switcher');
        if (mobileLangSwitcher) {
            mobileLangSwitcher.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }
    }

    /**
     * Switch language
     */
    async switchLanguage(lang) {
        if (lang === this.currentLang) return;

        // Save language preference
        localStorage.setItem('language', lang);
        this.currentLang = lang;

        // Update UI immediately with fallback
        this.translations = this.getFallbackTranslations();
        this.applyLanguage();
        this.setupDirection();

        // Load full translations
        await this.loadTranslations();
        this.applyLanguage();

        // Dispatch event for other components
        this.dispatchLanguageChangeEvent();

        // Update current language display
        const currentLangSpan = document.getElementById('currentLang');
        if (currentLangSpan) {
            currentLangSpan.textContent = lang === 'ar' ? 'العربية' : 'English';
        }

        // Show confirmation
        this.showLanguageChangeToast(lang);
    }

    /**
     * Apply language to page elements
     */
    applyLanguage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[key];
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'IMG') {
                    element.alt = translation;
                } else if (element.hasAttribute('title')) {
                    element.title = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update page title
        const pageTitle = document.querySelector('title[data-i18n]');
        if (pageTitle) {
            const key = pageTitle.getAttribute('data-i18n');
            const translation = this.translations[key];
            if (translation) {
                document.title = translation;
            }
        }

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"][data-i18n]');
        if (metaDescription) {
            const key = metaDescription.getAttribute('data-i18n');
            const translation = this.translations[key];
            if (translation) {
                metaDescription.content = translation;
            }
        }
    }

    /**
     * Setup text direction based on language
     */
    setupDirection() {
        const html = document.documentElement;
        const body = document.body;
        
        if (this.currentLang === 'ar') {
            html.dir = 'rtl';
            html.lang = 'ar';
            body.classList.add('rtl');
            body.classList.remove('ltr');
        } else {
            html.dir = 'ltr';
            html.lang = 'en';
            body.classList.add('ltr');
            body.classList.remove('rtl');
        }

        // Update CSS variables for direction
        document.documentElement.style.setProperty('--direction', this.currentLang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.style.setProperty('--text-align', this.currentLang === 'ar' ? 'right' : 'left');
        document.documentElement.style.setProperty('--float-start', this.currentLang === 'ar' ? 'right' : 'left');
        document.documentElement.style.setProperty('--float-end', this.currentLang === 'ar' ? 'left' : 'right');
    }

    /**
     * Dispatch language change event
     */
    dispatchLanguageChangeEvent() {
        const event = new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        });
        document.dispatchEvent(event);
    }

    /**
     * Show language change toast
     */
    showLanguageChangeToast(lang) {
        const messages = {
            ar: {
                ar: 'تم التغيير إلى العربية',
                en: 'Changed to English'
            },
            en: {
                ar: 'تم التغيير إلى العربية',
                en: 'Changed to English'
            }
        };

        const message = messages[this.currentLang][lang] || `Language changed to ${lang}`;
        
        // Use existing toast function or create one
        if (typeof showToast === 'function') {
            showToast(message, 'success');
        } else {
            // Create simple toast
            const toast = document.createElement('div');
            toast.className = 'language-toast';
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--success);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 9999;
                animation: fadeInOut 3s ease;
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
    }

    /**
     * Get translation for a specific key
     */
    getTranslation(key, fallback = '') {
        return this.translations[key] || fallback || key;
    }

    /**
     * Format date based on language
     */
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        return new Intl.DateTimeFormat(this.currentLang === 'ar' ? 'ar-SA' : 'en-US', finalOptions)
            .format(new Date(date));
    }

    /**
     * Format number based on language
     */
    formatNumber(number, options = {}) {
        const defaultOptions = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        return new Intl.NumberFormat(this.currentLang === 'ar' ? 'ar-SA' : 'en-US', finalOptions)
            .format(number);
    }

    /**
     * Format currency based on language
     */
    formatCurrency(amount, currency = 'QAR') {
        return new Intl.NumberFormat(this.currentLang === 'ar' ? 'ar-SA' : 'en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Get localized phone number format
     */
    formatPhoneNumber(phone, country = 'qa') {
        const formats = {
            qa: {
                ar: '+٩٧٤ XX XXX XXX',
                en: '+974 XX XXX XXX'
            },
            tn: {
                ar: '+٢١٦ XX XXX XXX',
                en: '+216 XX XXX XXX'
            }
        };
        
        const format = formats[country]?.[this.currentLang] || '+XXX XX XXX XXX';
        
        // Remove non-digits and format
        const digits = phone.replace(/\D/g, '');
        let formatted = format;
        
        // Replace X's with digits
        let digitIndex = 0;
        formatted = formatted.replace(/X/g, () => {
            return digits[digitIndex++] || 'X';
        });
        
        return formatted;
    }
}

// Initialize language manager
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}