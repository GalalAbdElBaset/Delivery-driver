// main.js - Clean All-in-One (Hero Slider Removed)

document.addEventListener('DOMContentLoaded', function () {

    /* ================= LANGUAGE MANAGEMENT ================= */
    function initLanguage() {
        const langBtn = document.getElementById('langBtn');
        const langDropdown = document.getElementById('langDropdown');
        const currentLang = document.getElementById('currentLang');
        const langOptions = document.querySelectorAll('.lang-option-nav');
        const elementsToTranslate = document.querySelectorAll('[data-i18n]');

        const savedLang = localStorage.getItem('language') || 'ar';
        setLanguage(savedLang);

        if (langBtn && langDropdown) {
            langBtn.addEventListener('click', e => {
                e.stopPropagation();
                langDropdown.classList.toggle('active');
            });

            document.addEventListener('click', () => {
                langDropdown.classList.remove('active');
            });

            langOptions.forEach(option => {
                option.addEventListener('click', e => {
                    e.preventDefault();
                    setLanguage(option.dataset.lang);
                    langDropdown.classList.remove('active');
                });
            });
        }

        function setLanguage(lang) {
            if (currentLang) {
                currentLang.textContent = lang === 'ar' ? 'العربية' : 'English';
            }

            langOptions.forEach(option => {
                option.classList.toggle('active', option.dataset.lang === lang);
            });

            fetch(`translations/${lang}.json`)
                .then(res => res.json())
                .then(translations => {
                    elementsToTranslate.forEach(el => {
                        const key = el.dataset.i18n;
                        const text = key.split('.').reduce((o, k) => o?.[k], translations);
                        if (!text) return;

                        if (['INPUT', 'TEXTAREA'].includes(el.tagName)) {
                            el.placeholder = text;
                        } else {
                            el.textContent = text;
                        }
                    });

                    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                    localStorage.setItem('language', lang);

                    window.dispatchEvent(
                        new CustomEvent('languageChanged', { detail: { lang } })
                    );
                })
                .catch(err => console.error('Translation error:', err));
        }
    }

    /* ================= MOBILE MENU ================= */
    function initMobileMenu() {
        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('navLinks');
        const header = document.getElementById('mainHeader');

        if (!burger || !navLinks) return;

        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            document.body.style.overflow =
                navLinks.classList.contains('active') ? 'hidden' : 'auto';

            header?.classList.toggle('menu-open', navLinks.classList.contains('active'));
        });

        document.addEventListener('click', e => {
            if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = 'auto';
                header?.classList.remove('menu-open');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = 'auto';
                header?.classList.remove('menu-open');
            });
        });
    }

    /* ================= SCROLL TO TOP ================= */
    function initScrollToTop() {
        const btn = document.getElementById('scrollToTop');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 300);
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            btn.classList.add('clicked');
            setTimeout(() => btn.classList.remove('clicked'), 150);
        });
    }

    /* ================= FLOATING BUTTON ================= */
    function initFloatingButtons() {
        const btn = document.querySelector('.float-whatsapp');
        if (!btn) return;

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            btn.style.opacity = current > lastScroll && current > 200 ? '0' : '1';
            lastScroll = current;
        });
    }

    /* ================= SCROLL ANIMATIONS ================= */
    function initScrollAnimations() {
        const items = document.querySelectorAll('[data-aos]');
        items.forEach(el => el.classList.add('aos-init'));

        function onScroll() {
            items.forEach(el => {
                const top = el.getBoundingClientRect().top;
                el.classList.toggle('aos-animate', top < window.innerHeight - 150);
            });
        }

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onScroll);
        onScroll();
    }

    /* ================= TESTIMONIALS ================= */
    function initTestimonialsSlider() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        if (!slides.length) return;

        let current = 0;
        let timer;

        function show(i) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[i].classList.add('active');
            dots[i]?.classList.add('active');
            current = i;
        }

        function autoPlay() {
            timer = setInterval(() => {
                show((current + 1) % slides.length);
            }, 5000);
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                clearInterval(timer);
                show(i);
                autoPlay();
            });
        });

        show(0);
        autoPlay();
    }

    /* ================= COUNTERS ================= */
    function initCounters() {
        const stats = document.querySelectorAll('.about-stats .stat');
        if (!stats.length) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target.querySelector('h3');
                if (!el || el.classList.contains('done')) return;

                el.classList.add('done');
                const target = +el.textContent.replace('+', '');
                let current = 0;
                const step = target / 120;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = `${target}+`;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    /* ================= INIT ALL ================= */
    function initAll() {
        initLanguage();
        initMobileMenu();
        initScrollToTop();
        initFloatingButtons();
        initScrollAnimations();
        initTestimonialsSlider();
        initCounters();

        const year = document.getElementById('currentYear');
        if (year) year.textContent = new Date().getFullYear();
    }

    initAll();
});
