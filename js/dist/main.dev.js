"use strict";

// تنفيذ القائمة المتحركة للموبايل
document.addEventListener('DOMContentLoaded', function () {
  // عناصر القائمة المتحركة
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-bars');
      menuToggle.querySelector('i').classList.toggle('fa-times');
    }); // إغلاق القائمة عند النقر على رابط

    var navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(function (item) {
      item.addEventListener('click', function () {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
      });
    });
  } // تنفيذ السلايدر


  var slider = {
    slides: document.querySelectorAll('.slide'),
    dots: document.querySelectorAll('.dot'),
    prevBtn: document.querySelector('.prev-slide'),
    nextBtn: document.querySelector('.next-slide'),
    currentSlide: 0,
    slideInterval: null,
    init: function init() {
      var _this = this;

      // عرض الشريحة الأولى
      this.showSlide(this.currentSlide); // إضافة الأحداث للأزرار

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', function () {
          _this.prevSlide();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', function () {
          _this.nextSlide();
        });
      } // إضافة الأحداث للنقاط


      this.dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
          _this.showSlide(index);
        });
      }); // بدء التشغيل التلقائي

      this.startAutoSlide(); // إيقاف التشغيل التلقائي عند التمرير

      document.querySelector('.slider-container').addEventListener('mouseenter', function () {
        _this.stopAutoSlide();
      });
      document.querySelector('.slider-container').addEventListener('mouseleave', function () {
        _this.startAutoSlide();
      });
    },
    showSlide: function showSlide(index) {
      // إخفاء جميع الشرائح
      this.slides.forEach(function (slide) {
        slide.classList.remove('active');
      }); // إزالة النشاط من جميع النقاط

      this.dots.forEach(function (dot) {
        dot.classList.remove('active');
      }); // عرض الشريحة المطلوبة

      this.slides[index].classList.add('active');
      this.dots[index].classList.add('active');
      this.currentSlide = index;
    },
    nextSlide: function nextSlide() {
      var nextIndex = (this.currentSlide + 1) % this.slides.length;
      this.showSlide(nextIndex);
    },
    prevSlide: function prevSlide() {
      var prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.showSlide(prevIndex);
    },
    startAutoSlide: function startAutoSlide() {
      var _this2 = this;

      this.slideInterval = setInterval(function () {
        _this2.nextSlide();
      }, 5000);
    },
    stopAutoSlide: function stopAutoSlide() {
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
      }
    }
  }; // تهيئة السلايدر إذا كان موجودًا

  if (document.querySelector('.slider')) {
    slider.init();
  } // تأثيرات التمرير للروابط


  var navLinksAll = document.querySelectorAll('.navbar a');
  navLinksAll.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');

      if (href.startsWith('#')) {
        e.preventDefault();
        var targetId = href.substring(1);
        var targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  }); // تأثيرات الظهور عند التمرير

  var animateOnScroll = function animateOnScroll() {
    var elements = document.querySelectorAll('.service-card, .value-item, .step, .info-item');
    elements.forEach(function (element) {
      var elementTop = element.getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }; // تعيين القيم الأولية للعناصر المتحركة


  var animatedElements = document.querySelectorAll('.service-card, .value-item, .step, .info-item');
  animatedElements.forEach(function (element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s, transform 0.6s';
  }); // تشغيل تأثيرات الظهور عند التمرير

  window.addEventListener('scroll', animateOnScroll); // تشغيلها مرة عند التحميل

  animateOnScroll(); // نموذج الاتصال

  var contactForm = document.getElementById('messageForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // جمع بيانات النموذج

      var name = this.querySelector('input[type="text"]').value;
      var phone = this.querySelector('input[type="tel"]').value;
      var service = this.querySelector('select').value;
      var message = this.querySelector('textarea').value; // نص رسالة واتساب

      var whatsappMessage = "\u0645\u0631\u062D\u0628\u0627\u064B\u060C \u0623\u0631\u064A\u062F \u0637\u0644\u0628 \u062E\u062F\u0645\u0629%0A%0A" + "\u0627\u0644\u0627\u0633\u0645: ".concat(name, "%0A") + "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641: ".concat(phone, "%0A") + "\u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629: ".concat(this.querySelector('select option:checked').textContent, "%0A") + "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0637\u0644\u0628: ".concat(message); // فتح واتساب مع الرسالة

      window.open("https://wa.me/21612345678?text=".concat(whatsappMessage), '_blank'); // إعادة تعيين النموذج

      this.reset(); // عرض رسالة نجاح

      alert('تم فتح تطبيق واتساب، يرجى إرسال الرسالة لإكمال الطلب');
    });
  } // تغيير لون شريط التنقل عند التمرير


  window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
      navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
      navbar.style.backgroundColor = 'var(--secondary-color)';
    }
  });
});
//# sourceMappingURL=main.dev.js.map
