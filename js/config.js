// Configuration and Data for ASAP Qatar Website

const CONFIG = {
    // Company Information
    company: {
        name: "ASAP Qatar",
        slogan: "Fast and Secure Delivery Service",
        email: "helamishwar@gmail.com",
        phone: {
            qatar: "+97471375390",
            tunisia: "+21656471550"
        },
        social: {
            whatsapp: "https://wa.me/97471375390",
            facebook: "https://www.facebook.com/share/184wbaTK5t/",
            tiktok: "https://www.tiktok.com/@twensafiqatar0",
            facebookGroup: "https://www.facebook.com/share/g/1G6ZUHH3zU/"
        }
    },

    // Hero Slides Data
    slides: [
        {
            id: 1,
            titleKey: "hero.title1",
            subtitleKey: "hero.subtitle1",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
            buttonTextKey: "hero.whatsappBtn",
            buttonLink: "https://wa.me/97471375390",
            buttonIcon: "whatsapp"
        },
        {
            id: 2,
            titleKey: "hero.title2",
            subtitleKey: "hero.subtitle2",
            image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
            buttonTextKey: "hero.servicesBtn",
            buttonLink: "#services",
            buttonIcon: "list"
        },
        {
            id: 3,
            titleKey: "hero.title3",
            subtitleKey: "hero.subtitle3",
            image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
            buttonTextKey: "hero.contactBtn",
            buttonLink: "#contact",
            buttonIcon: "phone"
        }
    ],

    // Services Data
    services: [
        {
            id: 1,
            titleKey: "services.service1.title",
            descriptionKey: "services.service1.desc",
            icon: "truck",
            whatsapp: "https://wa.me/97471375390",
            type: "normal"
        },
        {
            id: 2,
            titleKey: "services.service2.title",
            descriptionKey: "services.service2.desc",
            icon: "shipping-fast",
            whatsapp: "https://wa.me/21656471550",
            type: "normal"
        },
        {
            id: 3,
            titleKey: "services.service3.title",
            descriptionKey: "services.service3.desc",
            icon: "shopping-bag",
            whatsapp: "https://wa.me/97471375390",
            type: "normal"
        },
        {
            id: 4,
            titleKey: "services.service4.title",
            descriptionKey: "services.service4.desc",
            icon: "users",
            whatsapp: "https://wa.me/97471375390",
            type: "normal"
        },
        {
            id: 5,
            titleKey: "services.service5.title",
            descriptionKey: "services.service5.desc",
            icon: "car-side",
            whatsapp: "https://wa.me/97471375390",
            type: "normal"
        },
        {
            id: 6,
            titleKey: "services.service6.title",
            descriptionKey: "services.service6.desc",
            icon: "plane",
            whatsapp: "https://wa.me/97471375390",
            type: "normal"
        },
        {
            id: 7,
            titleKey: "services.service7.title",
            descriptionKey: "services.service7.desc",
            icon: "hand-holding-usd",
            whatsapp: "https://wa.me/97471375390",
            type: "important",
            warning: {
                titleKey: "services.warning.title",
                descriptionKey: "services.warning.desc"
            }
        }
    ],

    // Contact Methods Data
    contactMethods: [
        {
            id: 1,
            titleKey: "contact.whatsapp.title",
            descriptionKey: "contact.whatsapp.desc",
            icon: "whatsapp",
            type: "whatsapp",
            link: "https://wa.me/97471375390",
            buttonTextKey: "contact.whatsapp.btn"
        },
        {
            id: 2,
            titleKey: "contact.phone.title",
            descriptionKey: "contact.phone.desc",
            icon: "phone",
            type: "phone",
            buttons: [
                {
                    textKey: "contact.phone.qatar",
                    link: "tel:+97471375390"
                },
                {
                    textKey: "contact.phone.tunisia",
                    link: "tel:+21656471550"
                }
            ]
        },
        {
            id: 3,
            titleKey: "contact.email.title",
            descriptionKey: "contact.email.desc",
            icon: "envelope",
            type: "email",
            link: "mailto:helamishwar@gmail.com",
            buttonTextKey: "contact.email.btn"
        }
    ],

    // Google Maps Configuration
    map: {
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7222814.755649372!2d45.35587975!3d27.9230385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d9319f78c1f9e5!2sDoha%2C%20Qatar!5e0!3m2!1sen!2s!4v1646753869652!5m2!1sen!2s",
        locations: [
            {
                key: "contact.location.qatar",
                icon: "map-pin"
            },
            {
                key: "contact.location.tunisia",
                icon: "map-pin"
            }
        ]
    },

    // Animation Delays
    animations: {
        slideDuration: 5000, // 5 seconds
        transitionDuration: 300,
        staggerDelay: 100
    },

    // Form Configuration
    form: {
        whatsappNumber: "97471375390",
        whatsappTemplate: {
            ar: `🚗 طلب خدمة جديدة من ASAP Qatar%0A%0A👤 *الاسم:* {name}%0A📞 *رقم الهاتف:* {phone}%0A{email}📝 *الرسالة:*%0A{message}%0A%0A📍 *المصدر:* موقع ASAP Qatar`,
            en: `🚗 New Service Request from ASAP Qatar%0A%0A👤 *Name:* {name}%0A📞 *Phone:* {phone}%0A{email}📝 *Message:*%0A{message}%0A%0A📍 *Source:* ASAP Qatar Website`
        }
    }
};

export default CONFIG;