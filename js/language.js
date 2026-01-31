// ملف دعم اللغتين (العربية والإنجليزية)
document.addEventListener('DOMContentLoaded', () => {
    
    // بيانات اللغات (JSON Format) - محدثة ببيانات التواصل
    const translations = {
        ar: {
            // النصوص العامة
            companyName: "ASAP Qatar",
            companySlogan: "خدمة توصيل سريعة وآمنة",
            
            // شريط التنقل
            nav: {
                home: "الرئيسية",
                about: "من نحن",
                services: "الخدمات",
                contact: "التواصل",
                whatsapp: "تواصل عبر واتساب",
                call: "اتصل الآن"
            },
            
            // القسم الرئيسي
            hero: {
                title: "خدمة توصيل سريعة وآمنة داخل قطر وتونس وبين الدول",
                subtitle: "نقدم خدمات توصيل موثوقة للأفراد والمتاجر داخل المدن، إضافة إلى توصيل الأغراض بين تونس وقطر، مع إمكانية توثيق تسليم الأموال يدًا بيد بطريقة واضحة وآمنة، وبأسلوب بسيط وسريع.",
                whatsappBtn: "تواصل عبر واتساب",
                qatarPhone: "رقم هاتف قطري",
                tunisiaPhone: "رقم هاتف تونسي",
                callNow: "اتصل الآن"
            },
            
            // قسم من نحن
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
            
            // قسم الخدمات
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
            
            // قسم التواصل
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
            
            // الفوتر
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
            // General Texts
            companyName: "ASAP Qatar",
            companySlogan: "Fast & Secure Delivery Service",
            
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
                title: "Fast & Secure Delivery Services in Qatar, Tunisia & Between Countries",
                subtitle: "We provide reliable delivery services for individuals and stores within cities, in addition to delivering items between Tunisia and Qatar, with the possibility of documenting hand-to-hand cash delivery in a clear and secure manner, with a simple and fast approach.",
                whatsappBtn: "Contact via WhatsApp",
                qatarPhone: "Qatar Phone Number",
                tunisiaPhone: "Tunisia Phone Number",
                callNow: "Call Now"
            },
            
            // About Section
            about: {
                title: "About Us",
                subtitle: "Independent delivery service providing flexible transport solutions",
                heading: "We are an independent delivery service",
                desc1: "We provide flexible transport and delivery solutions suitable for individuals, stores, and companies, focusing on speed, safety, and ease of communication.",
                desc2: "We also provide documentation service only for hand-to-hand cash delivery operations between parties, without any direct financial dealings through the website.",
                feature1: {
                    title: "Fast Execution",
                    desc: "Fast delivery within specified time"
                },
                feature2: {
                    title: "Complete Safety",
                    desc: "Protection for items and information"
                },
                feature3: {
                    title: "Reliable Documentation",
                    desc: "Hand-to-hand certified delivery"
                },
                servicesBtn: "View All Services",
                imageTitle: "Reliable Services",
                imageSubtitle: "Between Qatar & Tunisia"
            },
            
            // Services Section
            services: {
                title: "Our Services",
                subtitle: "We provide a complete range of delivery and transport services",
                service1: {
                    title: "Local Delivery within Qatar",
                    desc: "Delivery of items and purchases within cities quickly and securely, with direct coordination as requested."
                },
                service2: {
                    title: "Local Delivery within Tunisia",
                    desc: "Flexible local delivery services suitable for individuals and stores."
                },
                service3: {
                    title: "Delivery of Items & Purchases",
                    desc: "Transport and delivery of various items and purchases in a secure and organized manner."
                },
                service4: {
                    title: "Employee & Student Transport",
                    desc: "On-demand delivery service for employees and students within the city."
                },
                service5: {
                    title: "Private Errands Transport",
                    desc: "Private transportation and errands as needed with complete flexibility."
                },
                service6: {
                    title: "Item Delivery Between Tunisia & Qatar (Hand-to-hand)",
                    desc: "Delivery of items between Tunisia and Qatar via trusted travelers, in a secure and coordinated manner."
                },
                service7: {
                    title: "Cash Delivery Documentation (Hand-to-hand)",
                    desc: "We provide documentation service only for cash delivery operations between sender and recipient, where delivery is made directly between the parties."
                },
                warning: {
                    title: "Important Notice:",
                    desc: "The website is an informational and coordination platform only, and does not perform any electronic payment or money collection operations."
                },
                contactBtn: "Contact Now"
            },
            
            // Contact Section
            contact: {
                title: "Contact Us",
                subtitle: "We are ready to serve you anytime",
                whatsapp: {
                    title: "Direct WhatsApp",
                    desc: "For immediate communication and quick response",
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
                    title: "Send us a Message",
                    subtitle: "We will respond as soon as possible",
                    namePlaceholder: "Full Name",
                    phonePlaceholder: "Phone Number",
                    emailPlaceholder: "Email Address",
                    messagePlaceholder: "Message",
                    submitBtn: "Send Message"
                }
            },
            
            // Footer
            footer: {
                desc: "Reliable delivery and transport services between Tunisia and Qatar",
                linksTitle: "Quick Links",
                servicesTitle: "Our Services",
                contactTitle: "Contact Us",
                whatsapp: "WhatsApp: +974 71 375 390",
                qatarPhone: "Qatar: +974 71 375 390",
                tunisiaPhone: "Tunisia: +216 56 471 550",
                legal: "The website is an informational and coordination platform only, and does not perform any electronic payment or money collection operations.",
                copyright: "All Rights Reserved"
            }
        }
    };

    // عناصر التحكم في اللغة
    const langBtn = document.getElementById('langBtn');
    const currentLangSpan = document.getElementById('currentLang');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // الحصول على اللغة المحفوظة أو الافتراضية
    let currentLang = localStorage.getItem('preferredLang') || 'ar';
    
    // تطبيق اللغة الحالية
    function applyLanguage(lang) {
        // تحديث اتجاه الصفحة
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // تحديث جميع العناصر مع data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translations[lang];
            
            // البحث عن القيمة في كائن الترجمة
            for (let k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    value = key; // العودة للنص الأصلي إذا لم يوجد ترجمة
                    break;
                }
            }
            
            if (value && typeof value === 'string') {
                element.textContent = value;
            }
        });
        
        // تحديث العناصر مع data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const keys = key.split('.');
            let value = translations[lang];
            
            // البحث عن القيمة في كائن الترجمة
            for (let k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    value = key; // العودة للنص الأصلي إذا لم يوجد ترجمة
                    break;
                }
            }
            
            if (value && typeof value === 'string') {
                element.placeholder = value;
            }
        });
        
        // تحديث نص زر اللغة
        currentLangSpan.textContent = lang === 'ar' ? 'العربية' : 'English';
        
        // تحديث الحالة النشطة في القائمة المنسدلة
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            }
        });
        
        // حفظ اللغة المفضلة
        localStorage.setItem('preferredLang', lang);
        currentLang = lang;
    }
    
    // تبديل اللغة
    function toggleLanguage(lang) {
        applyLanguage(lang);
        
        // إغلاق القائمة المنسدلة
        if (langDropdown) {
            langDropdown.style.opacity = '0';
            langDropdown.style.visibility = 'hidden';
            langDropdown.style.transform = 'translateY(-10px)';
        }
    }
    
    // أحداث النقر على خيارات اللغة
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            toggleLanguage(lang);
        });
    });
    
    // حدث النقر على زر اللغة
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (langDropdown) {
                const isVisible = langDropdown.style.visibility === 'visible';
                langDropdown.style.opacity = isVisible ? '0' : '1';
                langDropdown.style.visibility = isVisible ? 'hidden' : 'visible';
                langDropdown.style.transform = isVisible ? 'translateY(-10px)' : 'translateY(0)';
            }
        });
    }
    
    // إغلاق القائمة المنسدلة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            if (langDropdown) {
                langDropdown.style.opacity = '0';
                langDropdown.style.visibility = 'hidden';
                langDropdown.style.transform = 'translateY(-10px)';
            }
        }
    });
    
    // تطبيق اللغة الحالية عند تحميل الصفحة
    applyLanguage(currentLang);
    
    // الكشف التلقائي عن لغة المتصفح (اختياري)
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('ar')) {
            return 'ar';
        } else if (browserLang.startsWith('en')) {
            return 'en';
        }
        return 'ar'; // اللغة الافتراضية
    }
    
    // إذا لم تكن هناك لغة محفوظة، اكتشف لغة المتصفح
    if (!localStorage.getItem('preferredLang')) {
        const detectedLang = detectBrowserLanguage();
        if (detectedLang !== currentLang) {
            setTimeout(() => {
                toggleLanguage(detectedLang);
            }, 500);
        }
    }
});