// Language Switcher JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Language data
    const translations = {
        ar: {
            companyName: "HELA Express Tn-QA",
            companySlogan: "خدمة توصيل سريعة وآمنة",
            
            // Navigation
            nav: {
                home: "الرئيسية",
                about: "من نحن",
                services: "الخدمات",
                contact: "التواصل",
                whatsapp: "تواصل عبر واتساب",
                call: "اتصل الآن"
            },
            
            // Hero Section
            hero: {
                title1: "خدمة توصيل سريعة وآمنة داخل قطر وتونس",
                subtitle1: "نوفر حلول نقل وتوصيل مرنة تناسب الأفراد والمتاجر والشركات، مع التركيز على السرعة، الأمان، وسهولة التواصل.",
                title2: "توصيل أغراض بين تونس وقطر",
                subtitle2: "توصيل الأغراض بين تونس وقطر عبر مسافرين موثوقين، بطريقة آمنة ومنسقة مع توثيق كامل.",
                title3: "توثيق تسليم الأموال يدًا بيد",
                subtitle3: "نقدم خدمة توثيق موثوقة لتسليم الأموال بين الأطراف، مع الحفاظ على الشفافية والأمان الكامل.",
                whatsappBtn: "تواصل عبر واتساب",
                qatarPhone: "رقم هاتف قطري",
                tunisiaPhone: "رقم هاتف تونسي",
                callNow: "اتصل الآن",
                servicesBtn: "عرض الخدمات",
                contactBtn: "اتصل بنا الآن"
            },
            
            // About Section
            about: {
                title: "من نحن",
                subtitle: "خدمة توصيل مستقلة توفر حلول نقل وتوصيل مرنة",
                heading: "نحن خدمة توصيل مستقلة",
                desc1: "نوفر حلول نقل وتوصيل مرنة تناسب الأفراد والمتاجر والشركات، مع التركيز على السرعة، الأمان، وسهولة التواصل.",
                desc2: "كما نوفر خدمة توثيق فقط لعمليات تسليم الأموال يدًا بيد بين الأطراف، دون أي تعامل مالي مباشر عبر الموقع.",
                feature1: {
                    title: "سرعة في التنفيذ",
                    desc: "توصيل سريع في الوقت المحدد"
                },
                feature2: {
                    title: "أمان تام",
                    desc: "حماية للأغراض والمعلومات"
                },
                feature3: {
                    title: "توثيق موثوق",
                    desc: "تسليم موثق يدًا بيد"
                },
                servicesBtn: "عرض جميع الخدمات",
                imageTitle: "خدمات موثوقة",
                imageSubtitle: "بين قطر وتونس"
            },
            
            // Services Section
            services: {
                title: "خدماتنا",
                subtitle: "نقدم مجموعة متكاملة من خدمات التوصيل والنقل",
                service1: {
                    title: "التوصيل المحلي داخل قطر",
                    desc: "توصيل أغراض ومشتريات داخل المدن بسرعة وأمان، مع تنسيق مباشر حسب الطلب."
                },
                service2: {
                    title: "التوصيل المحلي داخل تونس",
                    desc: "خدمات توصيل محلية مرنة تناسب الأفراد والمتاجر."
                },
                service3: {
                    title: "توصيل الأغراض والمشتريات",
                    desc: "نقل وتوصيل مختلف الأغراض والمشتريات بطريقة آمنة ومنظمة."
                },
                service4: {
                    title: "توصيل موظفين وتلاميذ",
                    desc: "خدمة توصيل عند الطلب للموظفين والتلاميذ داخل المدينة."
                },
                service5: {
                    title: "توصيل مشاوير خاصة",
                    desc: "تنقلات ومشاوير خاصة حسب الحاجة وبمرونة كاملة."
                },
                service6: {
                    title: "توصيل أغراض بين تونس وقطر (يدًا بيد)",
                    desc: "توصيل الأغراض بين تونس وقطر عبر مسافرين موثوقين، بطريقة آمنة ومنسقة."
                },
                service7: {
                    title: "توثيق تسليم الأموال (يدًا بيد)",
                    desc: "نوفر خدمة توثيق فقط لعمليات تسليم الأموال بين المرسل والمستلم، حيث يتم التسليم مباشرة بين الطرفين."
                },
                warning: {
                    title: "تنويه مهم:",
                    desc: "الموقع منصة تعريفية وتنسيقية فقط، ولا يقوم بأي عمليات دفع إلكتروني أو تحصيل أموال."
                },
                contactBtn: "تواصل الآن"
            },
            
            // Contact Section
            contact: {
                title: "تواصل معنا",
                subtitle: "نحن جاهزون لخدمتك في أي وقت",
                whatsapp: {
                    title: "واتساب مباشر",
                    desc: "للتواصل الفوري والرد السريع",
                    btn: "ابدأ محادثة"
                },
                phone: {
                    title: "اتصال هاتفي",
                    desc: "للأمور العاجلة والاستفسارات المباشرة",
                    qatar: "قطر",
                    tunisia: "تونس"
                },
                email: {
                    title: "البريد الإلكتروني",
                    desc: "للرسائل الرسمية والمستندات",
                    btn: "إرسال بريد"
                },
                map: {
                    title: "موقعنا على الخريطة"
                },
                location: {
                    qatar: "قطر: الدوحة",
                    tunisia: "تونس: تونس العاصمة"
                },
                form: {
                    title: "أرسل لنا رسالة",
                    subtitle: "سنرد عليك في أسرع وقت ممكن",
                    namePlaceholder: "الاسم الكامل",
                    phonePlaceholder: "رقم الهاتف",
                    emailPlaceholder: "البريد الإلكتروني",
                    messagePlaceholder: "الرسالة",
                    submitBtn: "إرسال الرسالة"
                }
            },
            
            // Footer
            footer: {
                desc: "خدمات توصيل ونقل موثوقة بين تونس وقطر",
                linksTitle: "روابط سريعة",
                servicesTitle: "خدماتنا",
                contactTitle: "تواصل معنا",
                whatsapp: "واتساب: +974 71 375 390",
                qatarPhone: "قطر: +974 71 375 390",
                tunisiaPhone: "تونس: +216 56 471 550",
                legal: "الموقع منصة تعريفية وتنسيقية فقط، ولا يقوم بأي عمليات دفع إلكتروني أو تحصيل أموال.",
                copyright: "جميع الحقوق محفوظة"
            }
        },
        
        en: {
            companyName: "HELA Express Tn-QA",
            companySlogan: "Fast and Secure Delivery Service",
            
            // Navigation
            nav: {
                home: "Home",
                about: "About Us",
                services: "Services",
                contact: "Contact",
                whatsapp: "Contact via WhatsApp",
                call: "Call Now"
            },
            
            // Hero Section
            hero: {
                title1: "Fast and Secure Delivery Service in Qatar and Tunisia",
                subtitle1: "We provide flexible transportation and delivery solutions for individuals, stores, and companies, focusing on speed, security, and ease of communication.",
                title2: "Delivery of Goods Between Tunisia and Qatar",
                subtitle2: "Delivery of goods between Tunisia and Qatar through trusted travelers, in a safe and coordinated manner with full documentation.",
                title3: "Hand-to-Hand Money Delivery Documentation",
                subtitle3: "We provide reliable documentation services for money delivery between parties, maintaining full transparency and security.",
                whatsappBtn: "Contact via WhatsApp",
                qatarPhone: "Qatar Phone Number",
                tunisiaPhone: "Tunisia Phone Number",
                callNow: "Call Now",
                servicesBtn: "View Services",
                contactBtn: "Contact Us Now"
            },
            
            // About Section
            about: {
                title: "About Us",
                subtitle: "Independent delivery service providing flexible transportation solutions",
                heading: "We are an Independent Delivery Service",
                desc1: "We provide flexible transportation and delivery solutions for individuals, stores, and companies, focusing on speed, security, and ease of communication.",
                desc2: "We also provide documentation services only for hand-to-hand money delivery between parties, without any direct financial transactions through the website.",
                feature1: {
                    title: "Fast Execution",
                    desc: "Fast delivery on time"
                },
                feature2: {
                    title: "Complete Security",
                    desc: "Protection for goods and information"
                },
                feature3: {
                    title: "Reliable Documentation",
                    desc: "Hand-to-hand documented delivery"
                },
                servicesBtn: "View All Services",
                imageTitle: "Reliable Services",
                imageSubtitle: "Between Qatar and Tunisia"
            },
            
            // Services Section
            services: {
                title: "Our Services",
                subtitle: "We provide a comprehensive range of delivery and transportation services",
                service1: {
                    title: "Local Delivery in Qatar",
                    desc: "Delivery of goods and purchases within cities quickly and safely, with direct coordination on demand."
                },
                service2: {
                    title: "Local Delivery in Tunisia",
                    desc: "Flexible local delivery services suitable for individuals and stores."
                },
                service3: {
                    title: "Delivery of Goods and Purchases",
                    desc: "Transport and delivery of various goods and purchases in a safe and organized manner."
                },
                service4: {
                    title: "Employee and Student Delivery",
                    desc: "On-demand delivery service for employees and students within the city."
                },
                service5: {
                    title: "Special Errands Delivery",
                    desc: "Special transportation and errands as needed with full flexibility."
                },
                service6: {
                    title: "Delivery of Goods Between Tunisia and Qatar (Hand-to-Hand)",
                    desc: "Delivery of goods between Tunisia and Qatar through trusted travelers, in a safe and coordinated manner."
                },
                service7: {
                    title: "Money Delivery Documentation (Hand-to-Hand)",
                    desc: "We provide documentation services only for money delivery between sender and recipient, where delivery is made directly between the parties."
                },
                warning: {
                    title: "Important Notice:",
                    desc: "The website is only an informational and coordination platform and does not conduct any electronic payment or money collection operations."
                },
                contactBtn: "Contact Now"
            },
            
            // Contact Section
            contact: {
                title: "Contact Us",
                subtitle: "We are ready to serve you anytime",
                whatsapp: {
                    title: "Direct WhatsApp",
                    desc: "For instant communication and quick response",
                    btn: "Start Chat"
                },
                phone: {
                    title: "Phone Call",
                    desc: "For urgent matters and direct inquiries",
                    qatar: "Qatar",
                    tunisia: "Tunisia"
                },
                email: {
                    title: "Email",
                    desc: "For official messages and documents",
                    btn: "Send Email"
                },
                map: {
                    title: "Our Location on Map"
                },
                location: {
                    qatar: "Qatar: Doha",
                    tunisia: "Tunisia: Tunis"
                },
                form: {
                    title: "Send Us a Message",
                    subtitle: "We will respond to you as soon as possible",
                    namePlaceholder: "Full Name",
                    phonePlaceholder: "Phone Number",
                    emailPlaceholder: "Email Address",
                    messagePlaceholder: "Message",
                    submitBtn: "Send Message"
                }
            },
            
            // Footer
            footer: {
                desc: "Reliable delivery and transportation services between Tunisia and Qatar",
                linksTitle: "Quick Links",
                servicesTitle: "Our Services",
                contactTitle: "Contact Us",
                whatsapp: "WhatsApp: +974 71 375 390",
                qatarPhone: "Qatar: +974 71 375 390",
                tunisiaPhone: "Tunisia: +216 56 471 550",
                legal: "The website is only an informational and coordination platform and does not conduct any electronic payment or money collection operations.",
                copyright: "All Rights Reserved"
            }
        }
    };
    
    // Add CSS for language switching
    function addLanguageStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Language-specific styles */
            [dir="ltr"] .logo {
                flex-direction: row;
            }
            
           
            
            [dir="ltr"] .about-content {
                flex-direction: row;
            }
            
            [dir="ltr"] .contact-content {
                grid-template-columns: 1fr 1fr;
            }
            
            [dir="ltr"] .footer-content {
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            }
            
            [dir="ltr"] .nav-link::after {
                right: auto;
                left: 0;
            }
            
            [dir="ltr"] .nav-link:hover::after,
            [dir="ltr"] .nav-link.active::after {
                right: auto;
                left: 0;
            }
            
            [dir="ltr"] .section-title::after {
                right: auto;
                left: 50%;
                transform: translateX(-50%);
            }
            
            [dir="ltr"] .footer-title::after {
                right: auto;
                left: 0;
            }
            
            [dir="ltr"] .footer-link:hover {
                padding-right: 0;
                padding-left: 10px;
                transform: translateX(5px);
            }
            
            [dir="ltr"] .slider-prev {
                right: auto;
                left: 30px;
            }
            
            [dir="ltr"] .slider-next {
                left: auto;
                right: 30px;
            }
            
            /* Smooth transition for language change */
            .language-transition {
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Language switcher elements
    const langBtn = document.getElementById('langBtn');
    const currentLangSpan = document.getElementById('currentLang');
    const langOptions = document.querySelectorAll('.lang-option-nav');
    let currentLang = localStorage.getItem('language') || 'ar';
    
    // Initialize language
    function initLanguage() {
        // Add transition class
        document.body.classList.add('language-transition');
        
        // Set HTML direction
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        
        // Update button text
        if (currentLangSpan) {
            currentLangSpan.textContent = currentLang === 'ar' ? 'العربية' : 'English';
        }
        
        // Update active option
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === currentLang) {
                option.classList.add('active');
            }
        });
        
        // Apply translations
        applyTranslations(currentLang);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('language-transition');
        }, 300);
    }
    
    // Apply translations
    function applyTranslations(lang) {
        const langData = translations[lang];
        if (!langData) return;
        
        // Translate elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = langData;
            
            // Navigate through nested object
            for (let key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (typeof value === 'string') {
                element.textContent = value;
            }
        });
        
        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const keys = element.getAttribute('data-i18n-placeholder').split('.');
            let value = langData;
            
            // Navigate through nested object
            for (let key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (typeof value === 'string') {
                element.placeholder = value;
            }
        });
    }
    
    // Change language
    function changeLanguage(lang) {
        if (lang === currentLang) return;
        
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Add smooth transition
        document.body.style.opacity = '0.8';
        document.body.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            initLanguage();
            document.body.style.opacity = '1';
            document.body.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Event listeners for language options
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang) {
                changeLanguage(lang);
            }
        });
    });
    
    // Event listener for language button
    if (langBtn) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Close language dropdown when clicking outside
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.lang-dropdown-nav');
        if (dropdown && dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    });
    
    // Initialize on page load
    addLanguageStyles();
    initLanguage();
    
    // Make language switcher accessible
    document.addEventListener('keydown', function(e) {
        const dropdown = document.querySelector('.lang-dropdown-nav');
        if (e.key === 'Escape' && dropdown && dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    });
    
    console.log('✅ Language switcher initialized successfully');
});