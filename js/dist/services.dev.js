"use strict";

// services.js - Services page functionality
// Modal للصور
function openImageModal(src) {
  var modal = document.getElementById('imageModal');
  var modalImg = document.getElementById('modalImage');

  if (modal && modalImg) {
    modal.style.display = 'block';
    modalImg.src = src; // منع التمرير خلف المودال

    document.body.style.overflow = 'hidden';
  }
}

function closeImageModal() {
  var modal = document.getElementById('imageModal');

  if (modal) {
    modal.style.display = 'none'; // إعادة التمرير

    document.body.style.overflow = 'auto';
  }
} // إغلاق المودال عند النقر خارج الصورة


document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('imageModal');

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeImageModal();
      }
    });
  }
}); // إغلاق المودال بمفتاح ESC

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeImageModal();
  }
}); // FAQ functionality

document.addEventListener('DOMContentLoaded', function () {
  // Initialize FAQ functionality
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function () {
        // Close all other FAQ items
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            var otherAnswer = otherItem.querySelector('.faq-answer');

            if (otherAnswer) {
              otherAnswer.style.maxHeight = 0;
            }
          }
        }); // Toggle current FAQ item

        item.classList.toggle('active');
        var answer = item.querySelector('.faq-answer');

        if (answer) {
          if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = 0;
          }
        }
      });
    }
  }); // Initialize testimonial slider for mobile

  initTestimonialSlider(); // Add image scroll effects

  addImageScrollEffects(); // Initialize service request buttons

  initServiceRequestButtons();
}); // إضافة شريط تمرير للمراجعات على الهواتف

function initTestimonialSlider() {
  var testimonialsGrid = document.querySelector('.testimonials-grid');
  if (!testimonialsGrid) return;

  if (window.innerWidth <= 768) {
    testimonialsGrid.style.display = 'flex';
    testimonialsGrid.style.overflowX = 'auto';
    testimonialsGrid.style.scrollSnapType = 'x mandatory';
    testimonialsGrid.style.gap = '20px';
    testimonialsGrid.style.padding = '10px 0'; // إضافة نمط للبطاقات في وضع السلايدر

    document.querySelectorAll('.testimonial-card').forEach(function (card) {
      card.style.minWidth = 'calc(100% - 20px)';
      card.style.scrollSnapAlign = 'center';
    });
  } else {
    testimonialsGrid.style.display = 'grid';
    testimonialsGrid.style.overflowX = 'visible';
    testimonialsGrid.style.scrollSnapType = 'none'; // إزالة الأنماط للسلايدر

    document.querySelectorAll('.testimonial-card').forEach(function (card) {
      card.style.minWidth = '';
      card.style.scrollSnapAlign = '';
    });
  }
} // إضافة تأثيرات للصور عند التمرير


function addImageScrollEffects() {
  var images = document.querySelectorAll('.image-grid img');
  images.forEach(function (img) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }
      });
    }, {
      threshold: 0.1
    });
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'all 0.5s ease';
    observer.observe(img);
  });
} // Initialize service request buttons


function initServiceRequestButtons() {
  var serviceButtons = document.querySelectorAll('.send-service-request');
  serviceButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault(); // Get data from button attributes

      var country = this.getAttribute('data-country');
      var service = this.getAttribute('data-service');
      var phoneInputId = this.getAttribute('data-phone-input');
      var nameInputId = this.getAttribute('data-name-input');
      var serviceSelectId = this.getAttribute('data-service-select');
      var whatsappNumber = this.getAttribute('data-whatsapp-number'); // Get values from inputs

      var phoneInput = document.getElementById(phoneInputId);
      var nameInput = document.getElementById(nameInputId);
      var serviceSelect = document.getElementById(serviceSelectId); // Validate inputs

      if (!phoneInput || !nameInput || !serviceSelect) {
        alert('حدث خطأ في النظام. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
        return;
      }

      var phone = phoneInput.value.trim();
      var name = nameInput.value.trim();
      var selectedService = serviceSelect.value;

      if (!phone || !name || !selectedService) {
        alert('الرجاء ملء جميع الحقول المطلوبة.'); // Highlight empty fields

        if (!phone) phoneInput.focus();else if (!name) nameInput.focus();else if (!selectedService) serviceSelect.focus();
        return;
      } // Validate phone number


      if (!isValidPhoneNumber(phone)) {
        alert('الرجاء إدخال رقم هاتف صحيح.');
        phoneInput.focus();
        return;
      } // Create WhatsApp message


      var message = createWhatsAppMessage(country, service, selectedService, name, phone); // Open WhatsApp with the message

      var whatsappURL = "https://wa.me/".concat(whatsappNumber, "?text=").concat(encodeURIComponent(message));
      window.open(whatsappURL, '_blank'); // Reset form

      phoneInput.value = '';
      nameInput.value = '';
      serviceSelect.selectedIndex = 0;
    });
  });
} // Validate phone number


function isValidPhoneNumber(phone) {
  // Basic phone number validation
  var phoneRegex = /^[\d\s\-\+\(\)]{8,20}$/;
  return phoneRegex.test(phone);
} // Create WhatsApp message


function createWhatsAppMessage(country, service, selectedService, name, phone) {
  var date = new Date().toLocaleDateString('ar-EG');
  var time = new Date().toLocaleTimeString('ar-EG');
  return "\uD83C\uDF0D *\u0637\u0644\u0628 \u062E\u062F\u0645\u0629 \u062C\u062F\u064A\u062F* \uD83C\uDF0D\n\n\uD83D\uDCCB *\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629:* ".concat(service, "\n\uD83C\uDFE2 *\u0627\u0644\u062F\u0648\u0644\u0629:* ").concat(country, "\n\uD83D\uDD27 *\u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629:* ").concat(selectedService, "\n\n\uD83D\uDC64 *\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0639\u0645\u064A\u0644:*\n   - \u0627\u0644\u0627\u0633\u0645: ").concat(name, "\n   - \u0627\u0644\u0647\u0627\u062A\u0641: ").concat(phone, "\n\n\uD83D\uDCC5 *\u0627\u0644\u062A\u0627\u0631\u064A\u062E:* ").concat(date, "\n\u23F0 *\u0627\u0644\u0648\u0642\u062A:* ").concat(time, "\n\n\uD83D\uDC8E *Tn-QA Delivery*\n\uD83D\uDE9A \u062E\u062F\u0645\u0629 \u062A\u0648\u0635\u064A\u0644 \u0645\u0648\u062B\u0648\u0642\u0629 \u0628\u064A\u0646 \u0642\u0637\u0631 \u0648\u062A\u0648\u0646\u0633\n\n\u0634\u0643\u0631\u0627\u064B \u0644\u0627\u062E\u062A\u064A\u0627\u0631\u0643\u0645 \u062E\u062F\u0645\u0627\u062A\u0646\u0627! \u0641\u0631\u064A\u0642\u0646\u0627 \u0633\u064A\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643\u0645 \u0642\u0631\u064A\u0628\u0627\u064B.");
} // Handle window resize


window.addEventListener('resize', function () {
  initTestimonialSlider();
}); // Page transition

document.addEventListener('DOMContentLoaded', function () {
  // Check if page transition element exists
  var pageTransition = document.querySelector('.page-transition');

  if (pageTransition) {
    setTimeout(function () {
      pageTransition.classList.add('hidden');
    }, 800);
    setTimeout(function () {
      pageTransition.style.display = 'none';
    }, 1400);
  }
}); // Progress bar functionality

var progressBarInitialized = false;

function initProgressBar() {
  if (progressBarInitialized) return;
  var progressBar = document.getElementById('progressBar');
  if (!progressBar) return;
  window.addEventListener('scroll', function () {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = winScroll / height * 100;
    progressBar.style.width = scrolled + '%';
  });
  progressBarInitialized = true;
} // Initialize when page loads


window.addEventListener('load', function () {
  initProgressBar();
  initTestimonialSlider();
  addImageScrollEffects();
  initServiceRequestButtons();
}); // Make functions available globally

window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.initTestimonialSlider = initTestimonialSlider; // Debug function

window.servicesDebug = {
  checkElements: function checkElements() {
    var elements = {
      serviceButtons: document.querySelectorAll('.send-service-request').length,
      faqItems: document.querySelectorAll('.faq-item').length,
      testimonials: document.querySelectorAll('.testimonial-card').length,
      imageModal: document.getElementById('imageModal') ? 'Found' : 'Not found',
      progressBar: document.getElementById('progressBar') ? 'Found' : 'Not found'
    };
    console.log('Services Debug - Elements found:', elements);
    return elements;
  },
  testServiceRequest: function testServiceRequest() {
    var testButton = document.querySelector('.send-service-request');

    if (testButton) {
      console.log('Test button found, simulating click...');
      testButton.click();
    } else {
      console.log('No service request buttons found');
    }
  }
};
//# sourceMappingURL=services.dev.js.map
