"use strict";

// main.js - الملف الرئيسي مع تحديثات السمة
document.addEventListener('DOMContentLoaded', function () {
  // ================= NAVIGATION =================
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  var navLinksList = document.querySelectorAll('.nav-link');
  var indicator = document.getElementById('indicator'); // فتح/إغلاق القائمة على الجوال

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  } // إغلاق القائمة عند النقر على رابط


  navLinksList.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navLinks.classList.contains('active')) {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }); // ================= HERO SLIDER =================

  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dot');
  var prevBtn = document.querySelector('.slider-prev');
  var nextBtn = document.querySelector('.slider-next');
  var progressBar = document.querySelector('.progress-bar');
  var currentSlide = 0;
  var slideInterval;
  var slideDuration = 5000; // 5 ثواني لكل شريحة
  // تهيئة السلايدر

  function initSlider() {
    if (slides.length === 0) return; // عرض الشريحة الأولى

    showSlide(currentSlide); // بدء التلقائي

    startSlideShow(); // أحداث الأزرار

    if (prevBtn) {
      prevBtn.addEventListener('click', showPrevSlide);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', showNextSlide);
    } // أحداث النقاط


    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        return showSlide(index);
      });
    }); // إيقاف التلقائي عند التمرير

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopSlideShow();
      } else {
        startSlideShow();
      }
    });
  } // عرض شريحة محددة


  function showSlide(index) {
    // إعادة تعيين التقدم
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0';
      void progressBar.offsetWidth; // إعادة تدفق

      progressBar.style.transition = "width ".concat(slideDuration, "ms linear");
      progressBar.style.width = '100%';
    } // تحديث الشريحة الحالية


    slides.forEach(function (slide) {
      return slide.classList.remove('active');
    });
    dots.forEach(function (dot) {
      return dot.classList.remove('active');
    }); // حساب الفهرس الصحيح مع التعامل مع النهايات

    currentSlide = (index + slides.length) % slides.length; // عرض الشريحة الجديدة

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active'); // إعادة تشغيل التلقائي

    stopSlideShow();
    startSlideShow();
  } // الشريحة التالية


  function showNextSlide() {
    showSlide(currentSlide + 1);
  } // الشريحة السابقة


  function showPrevSlide() {
    showSlide(currentSlide - 1);
  } // بدء العرض التلقائي


  function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(showNextSlide, slideDuration);
  } // إيقاف العرض التلقائي


  function stopSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
  } // تشغيل السلايدر


  initSlider(); // ================= SCROLL TO TOP =================

  var scrollToTopBtn = document.getElementById('scrollToTop');
  window.addEventListener('scroll', function () {
    if (scrollToTopBtn) {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } // ================= NAVIGATION INDICATOR =================


  function updateNavIndicator() {
    if (!indicator) return;
    var activeLink = document.querySelector('.nav-link.active');

    if (activeLink) {
      var linkRect = activeLink.getBoundingClientRect();
      var navRect = navLinks.getBoundingClientRect();
      indicator.style.width = linkRect.width + 'px';
      indicator.style.right = linkRect.right - navRect.right + 'px';
      indicator.style.opacity = '1';
    }
  } // تحديث المؤشر عند التحميل والتغيير


  window.addEventListener('load', updateNavIndicator);
  window.addEventListener('resize', updateNavIndicator); // تحديث المؤشر عند النقر على الروابط

  navLinksList.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinksList.forEach(function (l) {
        return l.classList.remove('active');
      });
      this.classList.add('active');
      updateNavIndicator();
    });
  }); // تحديث المؤشر عند التمرير

  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var current = '';
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    navLinksList.forEach(function (link) {
      link.classList.remove('active');

      if (link.getAttribute('href') === "#".concat(current)) {
        link.classList.add('active');
      }
    });
    updateNavIndicator();
  }); // ================= SMOOTH SCROLL =================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }); // ================= ANIMATIONS ON SCROLL =================

  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions); // مراقبة العناصر لإضافة الأنيميشن

  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(function (el) {
    observer.observe(el);
  }); // ================= INITIALIZE =================

  updateNavIndicator(); // إضافة فئة محملة للجسم

  setTimeout(function () {
    document.body.classList.add('loaded');
  }, 500);
});
//# sourceMappingURL=theme.dev.js.map
