// main.js - الملف الرئيسي مع تحديثات السمة
document.addEventListener('DOMContentLoaded', function() {
    // ================= NAVIGATION =================
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    const navLinksList = document.querySelectorAll('.nav-link');
    const indicator = document.getElementById('indicator');
    
    // فتح/إغلاق القائمة على الجوال
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    navLinksList.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // ================= HERO SLIDER =================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const progressBar = document.querySelector('.progress-bar');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 ثواني لكل شريحة
    
    // تهيئة السلايدر
    function initSlider() {
        if (slides.length === 0) return;
        
        // عرض الشريحة الأولى
        showSlide(currentSlide);
        
        // بدء التلقائي
        startSlideShow();
        
        // أحداث الأزرار
        if (prevBtn) {
            prevBtn.addEventListener('click', showPrevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextSlide);
        }
        
        // أحداث النقاط
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // إيقاف التلقائي عند التمرير
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopSlideShow();
            } else {
                startSlideShow();
            }
        });
    }
    
    // عرض شريحة محددة
    function showSlide(index) {
        // إعادة تعيين التقدم
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0';
            void progressBar.offsetWidth; // إعادة تدفق
            progressBar.style.transition = `width ${slideDuration}ms linear`;
            progressBar.style.width = '100%';
        }
        
        // تحديث الشريحة الحالية
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // حساب الفهرس الصحيح مع التعامل مع النهايات
        currentSlide = (index + slides.length) % slides.length;
        
        // عرض الشريحة الجديدة
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // إعادة تشغيل التلقائي
        stopSlideShow();
        startSlideShow();
    }
    
    // الشريحة التالية
    function showNextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // الشريحة السابقة
    function showPrevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // بدء العرض التلقائي
    function startSlideShow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, slideDuration);
    }
    
    // إيقاف العرض التلقائي
    function stopSlideShow() {
        if (slideInterval) clearInterval(slideInterval);
    }
    
    // تشغيل السلايدر
    initSlider();
    
    // ================= SCROLL TO TOP =================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (scrollToTopBtn) {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    });
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ================= NAVIGATION INDICATOR =================
    function updateNavIndicator() {
        if (!indicator) return;
        
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = navLinks.getBoundingClientRect();
            
            indicator.style.width = linkRect.width + 'px';
            indicator.style.right = (linkRect.right - navRect.right) + 'px';
            indicator.style.opacity = '1';
        }
    }
    
    // تحديث المؤشر عند التحميل والتغيير
    window.addEventListener('load', updateNavIndicator);
    window.addEventListener('resize', updateNavIndicator);
    
    // تحديث المؤشر عند النقر على الروابط
    navLinksList.forEach(link => {
        link.addEventListener('click', function() {
            navLinksList.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateNavIndicator();
        });
    });
    
    // تحديث المؤشر عند التمرير
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        updateNavIndicator();
    });
    
    // ================= SMOOTH SCROLL =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ================= ANIMATIONS ON SCROLL =================
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
    
    // مراقبة العناصر لإضافة الأنيميشن
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
    
    // ================= INITIALIZE =================
    updateNavIndicator();
    
    // إضافة فئة محملة للجسم
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});