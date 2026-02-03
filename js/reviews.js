// ================= DOM ELEMENTS =================
const pageTransition = document.querySelector('.page-transition');
const navLinks = document.querySelector('#navLinks');
const burger = document.querySelector('#burger');
const themeToggle = document.querySelector('#themeToggle');
const floatThemeToggle = document.querySelector('#floatThemeToggle');
const langBtn = document.querySelector('#langBtn');
const langDropdown = document.querySelector('#langDropdown');
const currentLang = document.querySelector('#currentLang');
const scrollToTop = document.querySelector('#scrollToTop');
const reviewForm = document.querySelector('#reviewForm');
const starsInput = document.querySelectorAll('.star-input');
const ratingValue = document.querySelector('#ratingValue');
const loadMoreBtn = document.querySelector('#loadMoreBtn');
const reviewsGrid = document.querySelector('#reviewsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchBox = document.querySelector('.search-box input');

// ================= WHATSAPP CONFIGURATION =================
const WHATSAPP_CONFIG = {
    PHONE_NUMBER: '+21656471550',
    BUSINESS_NUMBER: '+21656471550',
    DEFAULT_MESSAGE: 'مرحباً، أود إرسال مراجعة جديدة:'
};

// ================= PAGE TRANSITION =================
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء انتقال الصفحة بعد التحميل
    setTimeout(function() {
        if (pageTransition) {
            pageTransition.classList.add('hidden');
        }
    }, 800);
    
    setTimeout(function() {
        if (pageTransition) {
            pageTransition.style.display = 'none';
        }
    }, 1400);
    
    // تهيئة السنة الحالية في الفوتر
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // تهيئة جميع الوظائف
    initNavigation();
    initThemeSwitcher();
    initLanguageSwitcher();
    initReviewForm();
    initReviewsFilter();
    initScrollToTop();
    initAnimations();
    
    // عرض المراجعات المحفوظة محلياً
    displayLocalReviews();
});

// ================= NAVIGATION MENU =================
function initNavigation() {
    if (burger) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    const navLinkItems = document.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.burger')) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ================= THEME SWITCHER =================
function initThemeSwitcher() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    
    if (floatThemeToggle) {
        floatThemeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelectorAll('.theme-btn i').forEach(icon => {
            icon.className = 'fas fa-moon';
        });
        document.querySelectorAll('.theme-text').forEach(text => {
            text.textContent = 'داكن';
        });
        if (floatThemeToggle) {
            floatThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        document.querySelectorAll('.theme-btn i').forEach(icon => {
            icon.className = 'fas fa-sun';
        });
        document.querySelectorAll('.theme-text').forEach(text => {
            text.textContent = 'فاتح';
        });
        if (floatThemeToggle) {
            floatThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', 'light');
    }
}

// ================= LANGUAGE SWITCHER =================
function initLanguageSwitcher() {
    const savedLang = localStorage.getItem('language') || 'ar';
    setLanguage(savedLang);
    
    if (langBtn) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });
    }
    
    const langOptions = document.querySelectorAll('.lang-option-nav');
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            langDropdown.classList.remove('show');
        });
    });
    
    document.addEventListener('click', function() {
        if (langDropdown.classList.contains('show')) {
            langDropdown.classList.remove('show');
        }
    });
    
    if (langDropdown) {
        langDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

function setLanguage(lang) {
    if (lang === 'en') {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        
        if (currentLang) {
            currentLang.textContent = 'English';
        }
        
        updateTextsForEnglish();
        
        document.querySelectorAll('.lang-option-nav').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === 'en') {
                option.classList.add('active');
            }
        });
    } else {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        
        if (currentLang) {
            currentLang.textContent = 'العربية';
        }
        
        updateTextsForArabic();
        
        document.querySelectorAll('.lang-option-nav').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === 'ar') {
                option.classList.add('active');
            }
        });
    }
    
    localStorage.setItem('language', lang);
}

function updateTextsForEnglish() {
    const pageTitle = document.querySelector('title[data-i18n="reviews.pageTitle"]');
    if (pageTitle) pageTitle.textContent = 'Customer Reviews - Tn-QA Delivery';
    
    const companyName = document.querySelectorAll('[data-i18n="companyName"]');
    companyName.forEach(el => {
        if (el.textContent.includes('Tn-QA Delivery')) return;
        el.textContent = 'Tn-QA Delivery';
    });
    
    const companySlogan = document.querySelectorAll('[data-i18n="companySlogan"]');
    companySlogan.forEach(el => {
        el.textContent = 'Fast and Secure Delivery Service';
    });
    
    // Add other translations as needed
}

function updateTextsForArabic() {
    const pageTitle = document.querySelector('title[data-i18n="reviews.pageTitle"]');
    if (pageTitle) pageTitle.textContent = 'مراجعات العملاء - Tn-QA Delivery';
    
    const companyName = document.querySelectorAll('[data-i18n="companyName"]');
    companyName.forEach(el => {
        el.textContent = 'Tn-QA Delivery';
    });
    
    const companySlogan = document.querySelectorAll('[data-i18n="companySlogan"]');
    companySlogan.forEach(el => {
        el.textContent = 'خدمة توصيل سريعة وآمنة';
    });
    
    // Add other translations as needed
}

// ================= REVIEW FORM WITH WHATSAPP =================
function initReviewForm() {
    // إعداد نجوم التقييم مع تحسينات
    initStarRating();
    
    // معالجة إرسال النموذج إلى واتساب
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // جمع البيانات
            const formData = {
                name: document.getElementById('reviewerName').value.trim(),
                email: document.getElementById('reviewerEmail').value.trim(),
                service: document.getElementById('reviewService').value,
                rating: ratingValue ? parseInt(ratingValue.value) : 0,
                content: document.getElementById('reviewContent').value.trim(),
                date: new Date().toLocaleDateString('ar-SA'),
                time: new Date().toLocaleTimeString('ar-SA'),
                timestamp: Date.now()
            };
            
            // التحقق من البيانات
            if (!validateReviewForm(formData)) {
                return;
            }
            
            // إظهار نافذة تأكيد قبل الإرسال
            showReviewConfirmation(formData, () => {
                // إذا وافق المستخدم، نرسل إلى واتساب
                sendReviewToWhatsApp(formData);
            });
        });
    }
}

function initStarRating() {
    if (!starsInput || starsInput.length === 0) return;
    
    // تهيئة النجوم
    starsInput.forEach(star => {
        // النقر على نجمة
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            updateStarsDisplay(value);
            if (ratingValue) {
                ratingValue.value = value;
            }
        });
        
        // التحويم فوق نجمة
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.getAttribute('data-value'));
            previewStarsDisplay(value);
        });
        
        // مغادرة النجوم
        star.addEventListener('mouseout', function() {
            const currentValue = ratingValue ? parseInt(ratingValue.value) : 0;
            updateStarsDisplay(currentValue);
        });
    });
}

function updateStarsDisplay(rating) {
    starsInput.forEach((star, index) => {
        const starElement = star.querySelector('i') || star;
        if (index < rating) {
            starElement.className = 'fas fa-star';
            star.classList.add('active');
        } else {
            starElement.className = 'far fa-star';
            star.classList.remove('active');
        }
    });
}

function previewStarsDisplay(rating) {
    starsInput.forEach((star, index) => {
        const starElement = star.querySelector('i') || star;
        starElement.className = index < rating ? 'fas fa-star' : 'far fa-star';
    });
}

function validateReviewForm(formData) {
    // التحقق من التقييم
    if (formData.rating < 1 || formData.rating > 5) {
        showAlert('الرجاء اختيار تقييم من 1 إلى 5 نجوم', 'error');
        return false;
    }
    
    // التحقق من الحقول المطلوبة
    if (!formData.name || !formData.content || !formData.service) {
        showAlert('الرجاء ملء جميع الحقول المطلوبة', 'error');
        return false;
    }
    
    // التحقق من البريد الإلكتروني (إذا تم إدخاله)
    if (formData.email && !isValidEmail(formData.email)) {
        showAlert('البريد الإلكتروني غير صحيح', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showReviewConfirmation(formData, onConfirm) {
    // إنشاء نافذة تأكيد مخصصة
    const confirmationModal = createConfirmationModal(formData, onConfirm);
    document.body.appendChild(confirmationModal);
    
    // منع التمرير
    document.body.style.overflow = 'hidden';
}

function createConfirmationModal(formData, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'whatsapp-confirmation-modal';
    
    const serviceName = getServiceName(formData.service);
    const stars = '★'.repeat(formData.rating) + '☆'.repeat(5 - formData.rating);
    
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fab fa-whatsapp"></i> تأكيد إرسال المراجعة</h3>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="confirmation-message">
                    <p>سيتم إرسال مراجعتك عبر واتساب إلى الرقم:</p>
                    <p class="phone-number">${WHATSAPP_CONFIG.PHONE_NUMBER}</p>
                    
                    <div class="review-preview">
                        <div class="preview-item">
                            <span class="preview-label">الاسم:</span>
                            <span class="preview-value">${formData.name}</span>
                        </div>
                        ${formData.email ? `
                        <div class="preview-item">
                            <span class="preview-label">البريد:</span>
                            <span class="preview-value">${formData.email}</span>
                        </div>
                        ` : ''}
                        <div class="preview-item">
                            <span class="preview-label">الخدمة:</span>
                            <span class="preview-value">${serviceName}</span>
                        </div>
                        <div class="preview-item">
                            <span class="preview-label">التقييم:</span>
                            <span class="preview-value gold-text">${stars}</span>
                        </div>
                        <div class="preview-item full-width">
                            <span class="preview-label">المراجعة:</span>
                            <div class="preview-content">${formData.content}</div>
                        </div>
                    </div>
                    
                    <div class="whatsapp-notice">
                        <i class="fas fa-info-circle"></i>
                        <p>سيتم فتح واتساب ويتم إعداد الرسالة تلقائياً. تحتاج فقط إلى النقر على إرسال.</p>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn secondary-btn cancel-btn">إلغاء</button>
                <button class="btn primary-btn confirm-btn">
                    <i class="fab fa-whatsapp"></i> إرسال عبر واتساب
                </button>
            </div>
        </div>
    `;
    
    // إضافة CSS للمودال
    addModalStyles();
    
    // إضافة أحداث
    modal.querySelector('.modal-close').addEventListener('click', () => {
        removeModal(modal);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        removeModal(modal);
    });
    
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        removeModal(modal);
    });
    
    modal.querySelector('.confirm-btn').addEventListener('click', () => {
        removeModal(modal);
        onConfirm();
    });
    
    return modal;
}

function removeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
    }, 300);
}

function addModalStyles() {
    if (document.querySelector('#whatsapp-modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'whatsapp-modal-styles';
    styles.textContent = `
        .whatsapp-confirmation-modal {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .whatsapp-confirmation-modal .modal-overlay {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .whatsapp-confirmation-modal .modal-content {
            position: relative;
            background: var(--white);
            border-radius: var(--radius-xl);
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: var(--shadow-lg);
            animation: slideUp 0.3s ease;
            border: 2px solid var(--gold);
        }
        
        body.dark-theme .whatsapp-confirmation-modal .modal-content {
            background: #1e1e1e;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .whatsapp-confirmation-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            color: white;
            border-radius: var(--radius-xl) var(--radius-xl) 0 0;
        }
        
        .whatsapp-confirmation-modal .modal-header h3 {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
        }
        
        .whatsapp-confirmation-modal .modal-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 1.5rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        
        .whatsapp-confirmation-modal .modal-close:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .whatsapp-confirmation-modal .modal-body {
            padding: 20px;
        }
        
        .whatsapp-confirmation-modal .confirmation-message {
            text-align: center;
        }
        
        .whatsapp-confirmation-modal .phone-number {
            font-size: 1.3rem;
            font-weight: bold;
            color: var(--gold);
            margin: 10px 0 20px;
            direction: ltr;
            display: inline-block;
            background: rgba(212, 175, 55, 0.1);
            padding: 8px 15px;
            border-radius: var(--radius-md);
        }
        
        .whatsapp-confirmation-modal .review-preview {
            background: var(--gray-light);
            border-radius: var(--radius-md);
            padding: 15px;
            margin: 20px 0;
            text-align: right;
        }
        
        body.dark-theme .whatsapp-confirmation-modal .review-preview {
            background: #2d2d2d;
        }
        
        .whatsapp-confirmation-modal .preview-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
        }
        
        .whatsapp-confirmation-modal .preview-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .whatsapp-confirmation-modal .preview-item.full-width {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .whatsapp-confirmation-modal .preview-label {
            font-weight: bold;
            color: var(--black);
            min-width: 80px;
        }
        
        body.dark-theme .whatsapp-confirmation-modal .preview-label {
            color: #fff;
        }
        
        .whatsapp-confirmation-modal .preview-value {
            color: var(--gray-dark);
            text-align: left;
            flex: 1;
        }
        
        .whatsapp-confirmation-modal .preview-content {
            background: var(--white);
            padding: 10px;
            border-radius: var(--radius-sm);
            margin-top: 5px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            max-height: 150px;
            overflow-y: auto;
            text-align: right;
            line-height: 1.6;
        }
        
        body.dark-theme .whatsapp-confirmation-modal .preview-content {
            background: #1a1a1a;
            color: #e0e0e0;
        }
        
        .whatsapp-confirmation-modal .whatsapp-notice {
            background: rgba(37, 211, 102, 0.1);
            border: 1px solid rgba(37, 211, 102, 0.2);
            border-radius: var(--radius-md);
            padding: 15px;
            margin-top: 20px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
        
        .whatsapp-confirmation-modal .whatsapp-notice i {
            color: #25D366;
            font-size: 1.2rem;
            margin-top: 2px;
        }
        
        .whatsapp-confirmation-modal .whatsapp-notice p {
            margin: 0;
            color: #155724;
            font-size: 0.9rem;
            text-align: right;
        }
        
        body.dark-theme .whatsapp-confirmation-modal .whatsapp-notice p {
            color: #d4edda;
        }
        
        .whatsapp-confirmation-modal .modal-footer {
            display: flex;
            justify-content: space-between;
            padding: 20px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            gap: 10px;
        }
        
        .whatsapp-confirmation-modal .modal-footer .btn {
            flex: 1;
            padding: 12px;
            font-size: 0.95rem;
        }
        
        .whatsapp-confirmation-modal .confirm-btn {
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            color: white;
            border: none;
        }
        
        .whatsapp-confirmation-modal .confirm-btn:hover {
            background: linear-gradient(135deg, #128C7E 0%, #25D366 100%);
            transform: translateY(-2px);
        }
        
        @media (max-width: 576px) {
            .whatsapp-confirmation-modal .modal-content {
                width: 95%;
                margin: 10px;
            }
            
            .whatsapp-confirmation-modal .modal-footer {
                flex-direction: column;
            }
            
            .whatsapp-confirmation-modal .preview-item {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .whatsapp-confirmation-modal .preview-label {
                margin-bottom: 5px;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

function getServiceName(serviceId) {
    const services = {
        'local-delivery-qatar': 'التوصيل المحلي في قطر',
        'local-delivery-tunisia': 'التوصيل المحلي في تونس',
        'scale-sales': 'بيع الموازين',
        'scale-booking': 'حجز الموازين',
        'money-delivery': 'توثيق تسليم الأموال'
    };
    return services[serviceId] || serviceId;
}

function sendReviewToWhatsApp(formData) {
    // إنشاء رسالة واتساب مخصصة
    const whatsappMessage = createWhatsAppMessage(formData);
    
    // ترميز الرسالة
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // إنشاء رابط واتساب
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.PHONE_NUMBER.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    // عرض حالة التحميل
    showAlert('جاري فتح واتساب...', 'info');
    
    // حفظ المراجعة محلياً أولاً
    saveReviewLocally(formData);
    
    // فتح واتساب في نافذة جديدة بعد تأخير قصير
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // إعادة تعيين النموذج
        resetReviewForm();
        
        // عرض رسالة النجاح بعد التأخير
        setTimeout(() => {
            showAlert('تم فتح واتساب! الرجاء إرسال الرسالة.', 'success');
        }, 1000);
        
    }, 500);
}

function createWhatsAppMessage(formData) {
    const serviceName = getServiceName(formData.service);
    const stars = '⭐'.repeat(formData.rating) + '☆'.repeat(5 - formData.rating);
    const dateTime = `${formData.date} - ${formData.time}`;
    
    return `🎯 *مراجعة جديدة - Tn-QA Delivery*
    
👤 *المراجع:* ${formData.name}
📧 *البريد:* ${formData.email || 'لم يتم الإدخال'}
📋 *الخدمة:* ${serviceName}
⭐ *التقييم:* ${formData.rating}/5
${stars}

📝 *المراجعة:*
"${formData.content}"

📅 *التاريخ:* ${dateTime}

🔗 *المصدر:* ${window.location.href}
---
*هذه رسالة تلقائية من موقع المراجعات*
`;
}

function saveReviewLocally(review) {
    try {
        const savedReviews = JSON.parse(localStorage.getItem('tnqa_whatsapp_reviews') || '[]');
        
        const reviewWithId = {
            ...review,
            id: Date.now(),
            status: 'sent',
            sent_via: 'whatsapp',
            sent_at: new Date().toISOString()
        };
        
        savedReviews.push(reviewWithId);
        localStorage.setItem('tnqa_whatsapp_reviews', JSON.stringify(savedReviews));
        
        console.log('✅ Review saved locally:', reviewWithId);
        return reviewWithId;
    } catch (error) {
        console.error('❌ Error saving review:', error);
        return null;
    }
}

function displayLocalReviews() {
    try {
        const savedReviews = JSON.parse(localStorage.getItem('tnqa_whatsapp_reviews') || '[]');
        console.log('📊 Saved reviews:', savedReviews.length);
        
        // يمكنك عرض المراجعات المحفوظة في قسم خاص إذا أردت
        if (savedReviews.length > 0) {
            // إضافة مؤشر في الفوتر
            addReviewsCounter(savedReviews.length);
        }
    } catch (error) {
        console.error('Error loading local reviews:', error);
    }
}

function addReviewsCounter(count) {
    const footer = document.querySelector('.footer-bottom');
    if (!footer) return;
    
    const counter = document.createElement('div');
    counter.className = 'local-reviews-counter';
    counter.innerHTML = `
        <i class="fas fa-history"></i>
        <span>${count} مراجعة محفوظة محلياً</span>
    `;
    
    // إضافة CSS
    const style = document.createElement('style');
    style.textContent = `
        .local-reviews-counter {
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid var(--gold-light);
            border-radius: var(--radius-md);
            padding: 10px 15px;
            margin: 10px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            max-width: 300px;
            font-size: 0.9rem;
            color: var(--gold-dark);
        }
        
        .local-reviews-counter i {
            color: var(--gold);
        }
        
        @media (max-width: 768px) {
            .local-reviews-counter {
                margin: 10px;
                font-size: 0.8rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    footer.parentNode.insertBefore(counter, footer);
}

function resetReviewForm() {
    if (reviewForm) {
        reviewForm.reset();
        updateStarsDisplay(0);
        if (ratingValue) {
            ratingValue.value = 0;
        }
    }
}

function showAlert(message, type = 'info') {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas ${getAlertIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="alert-close">&times;</button>
    `;
    
    // إضافة CSS إذا لم يكن موجوداً
    if (!document.querySelector('#alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                left: 20px;
                max-width: 500px;
                margin: 0 auto;
                padding: 15px 20px;
                border-radius: var(--radius-md);
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 9999;
                box-shadow: var(--shadow-lg);
                animation: slideDown 0.3s ease;
                transform-origin: top center;
            }
            
            .alert-success {
                background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
                border: 2px solid #28a745;
                color: #155724;
            }
            
            .alert-error {
                background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
                border: 2px solid #dc3545;
                color: #721c24;
            }
            
            .alert-info {
                background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
                border: 2px solid #17a2b8;
                color: #0c5460;
            }
            
            .alert-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            
            .alert-content i {
                font-size: 1.2rem;
            }
            
            .alert-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: inherit;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            
            .alert-close:hover {
                background-color: rgba(0,0,0,0.1);
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .custom-alert {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    padding: 12px 15px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(alert);
    
    alert.querySelector('.alert-close').addEventListener('click', function() {
        alert.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => alert.remove(), 300);
    });
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideDown 0.3s ease reverse';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
}

function getAlertIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

// ================= باقي الدوال (Reviews Filter, Scroll, etc.) =================
// [ابق على نفس كود الدوال السابقة لـ initReviewsFilter, filterReviews, searchReviews, loadMoreReviews, initScrollToTop, initAnimations]

// ================= REVIEWS FILTER =================
function initReviewsFilter() {
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filterValue = this.getAttribute('data-filter');
                filterReviews(filterValue);
            });
        });
    }
    
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchReviews(searchTerm);
        });
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreReviews();
        });
    }
}

function filterReviews(filter) {
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else if (filter === 'service') {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            const rating = card.getAttribute('data-rating');
            if (rating === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
}

function searchReviews(term) {
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('.review-content p').textContent.toLowerCase();
        const service = card.querySelector('.review-service').textContent.toLowerCase();
        
        if (name.includes(term) || content.includes(term) || service.includes(term)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function loadMoreReviews() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        const newReviews = [
            {
                id: 7,
                name: 'ياسر النجار',
                location: 'مهندس من الأردن',
                rating: 5,
                date: 'قبل يومين',
                service: 'توصيل معدات',
                content: '"خدمة ممتازة لنقل المعدات الهندسية. الدقة والأمان كانا في أعلى مستوى. أوصي بهم بشدة."',
                avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
            },
            {
                id: 8,
                name: 'لمياء السعيد',
                location: 'طبيبة من مصر',
                rating: 4,
                date: 'قبل 6 أيام',
                service: 'توصيل طبي',
                content: '"خدمة توصيل المستلزمات الطبية كانت سريعة وآمنة. الفريق محترف ومتعاون. شكراً لكم."',
                avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
            }
        ];
        
        newReviews.forEach(review => {
            const reviewCard = createReviewCard(review);
            reviewsGrid.appendChild(reviewCard);
        });
        
        loadMoreBtn.innerHTML = '<i class="fas fa-sync-alt"></i> تحميل المزيد';
        loadMoreBtn.disabled = false;
        
        if (document.querySelectorAll('.review-card').length >= 10) {
            loadMoreBtn.style.display = 'none';
        }
        
        initReviewsFilter();
        
    }, 1500);
}

function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.setAttribute('data-rating', review.rating);
    card.setAttribute('data-service', review.service.toLowerCase().replace(' ', '-'));
    
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= review.rating) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(review.rating) && review.rating % 1 !== 0) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    card.innerHTML = `
        <div class="review-header">
            <div class="reviewer-avatar">
                <img src="${review.avatar}" alt="${review.name}" loading="lazy">
            </div>
            <div class="reviewer-info">
                <h3>${review.name}</h3>
                <p>${review.location}</p>
                <div class="review-rating">
                    ${starsHtml}
                    <span class="review-date">${review.date}</span>
                </div>
            </div>
        </div>
        
        <div class="review-content">
            <span class="review-verified">
                <i class="fas fa-check-circle"></i> <span>مراجعة موثقة</span>
            </span>
            <span class="review-service">${review.service}</span>
            
            <p>"${review.content}"</p>
        </div>
    `;
    
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    return card;
}

// ================= SCROLL TO TOP =================
function initScrollToTop() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });
    
    if (scrollToTop) {
        scrollToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ================= ANIMATIONS =================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.review-card, .stat-card, .section-header');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .review-card, .stat-card, .section-header {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .review-card.animated, .stat-card.animated, .section-header.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .review-card:nth-child(1) { transition-delay: 0.1s; }
        .review-card:nth-child(2) { transition-delay: 0.2s; }
        .review-card:nth-child(3) { transition-delay: 0.3s; }
        .review-card:nth-child(4) { transition-delay: 0.4s; }
        .review-card:nth-child(5) { transition-delay: 0.5s; }
        .review-card:nth-child(6) { transition-delay: 0.6s; }
        
        .stat-card:nth-child(1) { transition-delay: 0.1s; }
        .stat-card:nth-child(2) { transition-delay: 0.2s; }
        .stat-card:nth-child(3) { transition-delay: 0.3s; }
        .stat-card:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
}

// ================= WINDOW RESIZE HANDLER =================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth >= 992 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// ================= KEYBOARD NAVIGATION =================
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ================= WHATSAPP BUTTONS =================
document.querySelectorAll('.whatsapp-btn, .float-whatsapp').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const phone = this.href.includes('whatsapp') ? WHATSAPP_CONFIG.PHONE_NUMBER : '+97431691024';
        const message = encodeURIComponent('مرحباً، أود الاستفسار عن خدمات التوصيل');
        const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
    });
});