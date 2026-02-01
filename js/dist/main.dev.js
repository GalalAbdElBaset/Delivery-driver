"use strict";

/**
 * ملف JavaScript الرئيسي
 * لـ HELA Express Tn-QA
 */
document.addEventListener('DOMContentLoaded', function () {
  // تهيئة السنة الحالية
  document.getElementById('currentYear').textContent = new Date().getFullYear(); // السلايدر

  var slider = {
    slides: document.querySelectorAll('.slide'),
    dots: document.querySelectorAll('.dot'),
    prevBtn: document.querySelector('.slider-prev'),
    nextBtn: document.querySelector('.slider-next'),
    progressBar: document.querySelector('.progress-bar'),
    currentSlide: 0,
    interval: null,
    speed: 5000,
    // 5 ثواني لكل شريحة
    init: function init() {
      var _this = this;

      if (this.slides.length === 0) return; // بدء التشغيل التلقائي

      this.startAutoSlide(); // أحداث الأزرار

      this.prevBtn.addEventListener('click', function () {
        return _this.changeSlide(-1);
      });
      this.nextBtn.addEventListener('click', function () {
        return _this.changeSlide(1);
      }); // أحداث النقاط

      this.dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
          return _this.goToSlide(index);
        });
      }); // إيقاف التشغيل التلقائي عند التمرير

      document.querySelector('.hero-slider').addEventListener('mouseenter', function () {
        _this.stopAutoSlide();
      });
      document.querySelector('.hero-slider').addEventListener('mouseleave', function () {
        _this.startAutoSlide();
      }); // تحديث شريط التقدم

      this.updateProgressBar();
    },
    changeSlide: function changeSlide(direction) {
      this.currentSlide += direction;

      if (this.currentSlide < 0) {
        this.currentSlide = this.slides.length - 1;
      } else if (this.currentSlide >= this.slides.length) {
        this.currentSlide = 0;
      }

      this.updateSlides();
      this.updateDots();
      this.updateProgressBar();
      this.resetAutoSlide();
    },
    goToSlide: function goToSlide(index) {
      this.currentSlide = index;
      this.updateSlides();
      this.updateDots();
      this.updateProgressBar();
      this.resetAutoSlide();
    },
    updateSlides: function updateSlides() {
      this.slides.forEach(function (slide) {
        slide.classList.remove('active');
      });
      this.slides[this.currentSlide].classList.add('active');
    },
    updateDots: function updateDots() {
      this.dots.forEach(function (dot) {
        dot.classList.remove('active');
      });
      this.dots[this.currentSlide].classList.add('active');
    },
    updateProgressBar: function updateProgressBar() {
      var _this2 = this;

      if (this.progressBar) {
        this.progressBar.style.transition = 'none';
        this.progressBar.style.width = '0%';
        setTimeout(function () {
          _this2.progressBar.style.transition = "width ".concat(_this2.speed, "ms linear");
          _this2.progressBar.style.width = '100%';
        }, 50);
      }
    },
    startAutoSlide: function startAutoSlide() {
      var _this3 = this;

      this.stopAutoSlide();
      this.interval = setInterval(function () {
        return _this3.changeSlide(1);
      }, this.speed);
    },
    stopAutoSlide: function stopAutoSlide() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    resetAutoSlide: function resetAutoSlide() {
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  }; // تهيئة السلايدر

  slider.init(); // شريط التنقل

  var header = document.getElementById('mainHeader');
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks'); // التمرير

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    } // زر العودة للأعلى


    var scrollToTop = document.getElementById('scrollToTop');

    if (window.scrollY > 500) {
      scrollToTop.classList.add('show');
    } else {
      scrollToTop.classList.remove('show');
    }
  }); // قائمة الهاتف

  burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }); // إغلاق القائمة عند النقر على رابط

  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      burger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  }); // زر العودة للأعلى

  document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }); // مؤشر التنقل

  var indicator = document.getElementById('indicator');
  var navLinksAll = document.querySelectorAll('.nav-link');

  function updateIndicator() {
    var activeLink = document.querySelector('.nav-link.active');

    if (activeLink && indicator) {
      indicator.style.width = activeLink.offsetWidth + 'px';
      indicator.style.left = activeLink.offsetLeft + activeLink.offsetWidth + 'px';
      indicator.style.transform = 'translateX(-100%)';
    }
  }

  navLinksAll.forEach(function (link) {
    link.addEventListener('click', function (e) {
      navLinksAll.forEach(function (l) {
        return l.classList.remove('active');
      });
      this.classList.add('active');
      updateIndicator();
    });
  }); // تحديث المؤشر عند تحميل الصفحة وتغيير الحجم

  window.addEventListener('load', updateIndicator);
  window.addEventListener('resize', updateIndicator); // نموذج الاتصال

  var contactForm = document.getElementById('messageForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      var formMessage = document.getElementById('formMessage'); // محاكاة الإرسال

      formMessage.innerHTML = "\n                <div style=\"background: #4CAF50; color: white; padding: 15px; border-radius: 8px; margin: 15px 0;\">\n                    <i class=\"fas fa-check-circle\"></i> \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u062A\u0643 \u0628\u0646\u062C\u0627\u062D! \u0633\u0646\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0642\u0631\u064A\u0628\u0627\u064B.\n                </div>\n            "; // إعادة تعيين النموذج

      setTimeout(function () {
        contactForm.reset();
        formMessage.innerHTML = '';
      }, 5000);
    });
  } // التمرير السلس


  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  }); // تحديث المؤشر الأولي

  setTimeout(updateIndicator, 100); // إضافة تأثيرات للبطاقات

  var serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  }); // تحسين الأداء للصور

  var images = document.querySelectorAll('img');
  images.forEach(function (img) {
    img.setAttribute('loading', 'lazy');
  });
});
//# sourceMappingURL=main.dev.js.map
