"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * contact.js - Logic for Contact Page
 * Handles form submission, map initialization, and contact functionality
 */
document.addEventListener('DOMContentLoaded', function () {
  // Set current year
  var currentYearElement = document.getElementById('currentYear');

  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  } // Hide page transition


  setTimeout(function () {
    document.querySelector('.page-transition').classList.add('hidden');
  }, 800);
  setTimeout(function () {
    document.querySelector('.page-transition').style.display = 'none';
  }, 1400); // Initialize map

  var initMap = function initMap() {
    var mapElement = document.getElementById('contactMap');
    if (!mapElement) return;

    try {
      if (typeof L === 'undefined') {
        throw new Error('Leaflet library not loaded');
      } // Create the map centered between Qatar and Tunisia


      var map = L.map('contactMap').setView([28.0, 30.0], 5); // Add OpenStreetMap tile layer

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map); // Get current language

      var currentLang = localStorage.getItem('language') || 'ar'; // Qatar location marker (Doha)

      var qatarMarker = L.marker([25.2854, 51.5310]).addTo(map).bindPopup("\n                            <div class=\"map-popup\">\n                                <h3>".concat(currentLang === 'en' ? 'Qatar Operations Center' : 'مركز العمليات في قطر', "</h3>\n                                <p><i class=\"fas fa-phone\"></i> +974 71 375 390</p>\n                                <p><i class=\"fab fa-whatsapp\"></i> WhatsApp Available</p>\n                                <p><i class=\"fas fa-map-marker-alt\"></i> ").concat(currentLang === 'en' ? 'Covering all Qatar areas' : 'تغطية جميع مناطق قطر', "</p>\n                                <a href=\"https://wa.me/97471375390\" target=\"_blank\" \n                                   style=\"display: inline-block; margin-top: 10px; padding: 8px 15px; background: #25D366; color: white; border-radius: 5px; text-decoration: none;\">\n                                    <i class=\"fab fa-whatsapp\"></i> ").concat(currentLang === 'en' ? 'Contact on WhatsApp' : 'تواصل عبر واتساب', "\n                                </a>\n                            </div>\n                        ")).openPopup(); // Tunisia location marker (Tunis)

      var tunisiaMarker = L.marker([36.8065, 10.1815]).addTo(map).bindPopup("\n                            <div class=\"map-popup\">\n                                <h3>".concat(currentLang === 'en' ? 'Tunisia Operations Center' : 'مركز العمليات في تونس', "</h3>\n                                <p><i class=\"fas fa-phone\"></i> +216 56 471 550</p>\n                                <p><i class=\"fab fa-whatsapp\"></i> WhatsApp Available</p>\n                                <p><i class=\"fas fa-map-marker-alt\"></i> ").concat(currentLang === 'en' ? 'Covering all Tunisia areas' : 'تغطية جميع مناطق تونس', "</p>\n                                <a href=\"https://wa.me/21656471550\" target=\"_blank\" \n                                   style=\"display: inline-block; margin-top: 10px; padding: 8px 15px; background: #25D366; color: white; border-radius: 5px; text-decoration: none;\">\n                                    <i class=\"fab fa-whatsapp\"></i> ").concat(currentLang === 'en' ? 'Contact on WhatsApp' : 'تواصل عبر واتساب', "\n                                </a>\n                            </div>\n                        ")); // Add coverage circles

      var qatarCircle = L.circle([25.2854, 51.5310], {
        color: '#8A1538',
        fillColor: '#8A1538',
        fillOpacity: 0.1,
        radius: 50000
      }).addTo(map).bindPopup(currentLang === 'en' ? 'Qatar Coverage Area' : 'منطقة التغطية في قطر');
      var tunisiaCircle = L.circle([36.8065, 10.1815], {
        color: '#E70013',
        fillColor: '#E70013',
        fillOpacity: 0.1,
        radius: 150000
      }).addTo(map).bindPopup(currentLang === 'en' ? 'Tunisia Coverage Area' : 'منطقة التغطية في تونس'); // Add legend control

      var Legend = L.Control.extend({
        onAdd: function onAdd(map) {
          var div = L.DomUtil.create('div', 'map-legend');
          div.innerHTML = "\n                                <h4>".concat(currentLang === 'en' ? 'Coverage Areas' : 'مناطق التغطية', "</h4>\n                                <div class=\"legend-item\">\n                                    <span class=\"legend-color\" style=\"background: #8A1538;\"></span>\n                                    <span>").concat(currentLang === 'en' ? 'Qatar Coverage' : 'تغطية قطر', "</span>\n                                </div>\n                                <div class=\"legend-item\">\n                                    <span class=\"legend-color\" style=\"background: #E70013;\"></span>\n                                    <span>").concat(currentLang === 'en' ? 'Tunisia Coverage' : 'تغطية تونس', "</span>\n                                </div>\n                                <div class=\"legend-item\">\n                                    <span class=\"legend-color\" style=\"background: #D4AF37;\"></span>\n                                    <span>").concat(currentLang === 'en' ? 'Main Offices' : 'المكاتب الرئيسية', "</span>\n                                </div>\n                            ");
          return div;
        }
      });
      new Legend({
        position: 'bottomright'
      }).addTo(map);
      console.log('Map initialized successfully');
    } catch (error) {
      console.error('Error initializing map:', error);
      showMapError();
    }
  }; // Show map error message


  function showMapError() {
    var mapElement = document.getElementById('contactMap');

    if (mapElement) {
      var currentLang = localStorage.getItem('language') || 'ar';
      var translations = {
        ar: {
          errorTitle: 'تعذر تحميل الخريطة',
          errorMessage: 'حدث خطأ في تحميل الخريطة. يمكنك التواصل معنا مباشرة عبر الأرقام التالية:',
          qatarBranch: 'فرع قطر',
          tunisiaBranch: 'فرع تونس',
          alsoContact: 'يمكنك أيضاً التواصل عبر البريد الإلكتروني:'
        },
        en: {
          errorTitle: 'Map Failed to Load',
          errorMessage: 'There was an error loading the map. You can contact us directly via the following numbers:',
          qatarBranch: 'Qatar Branch',
          tunisiaBranch: 'Tunisia Branch',
          alsoContact: 'You can also contact via email:'
        }
      };
      var t = translations[currentLang] || translations.ar;
      mapElement.innerHTML = "\n                        <div class=\"map-error-container\">\n                            <div class=\"map-error-icon\">\n                                <i class=\"fas fa-map-marked-alt\"></i>\n                            </div>\n                            <h3>".concat(t.errorTitle, "</h3>\n                            <p>").concat(t.errorMessage, "</p>\n                            \n                            <div class=\"map-error-contacts\">\n                                <div class=\"error-contact-card\">\n                                    <div class=\"country-header\">\n                                        <img src=\"https://flagcdn.com/w40/qa.png\" alt=\"Qatar\">\n                                        <div>\n                                            <h4>").concat(t.qatarBranch, "</h4>\n                                            <p style=\"color: #888; margin: 5px 0 0; font-size: 0.9rem;\">").concat(currentLang === 'en' ? 'All Qatar areas' : 'جميع مناطق قطر', "</p>\n                                        </div>\n                                    </div>\n                                    <div class=\"contact-actions\">\n                                        <a href=\"https://wa.me/97471375390\" class=\"whatsapp-btn\">\n                                            <i class=\"fab fa-whatsapp\"></i>\n                                            <span>WhatsApp: +974 71 375 390</span>\n                                        </a>\n                                        <a href=\"tel:+97471375390\" class=\"call-btn\">\n                                            <i class=\"fas fa-phone\"></i>\n                                            <span>").concat(currentLang === 'en' ? 'Call Now' : 'اتصل الآن', "</span>\n                                        </a>\n                                    </div>\n                                </div>\n                                \n                                <div class=\"error-contact-card\">\n                                    <div class=\"country-header\">\n                                        <img src=\"https://flagcdn.com/w40/tn.png\" alt=\"Tunisia\">\n                                        <div>\n                                            <h4>").concat(t.tunisiaBranch, "</h4>\n                                            <p style=\"color: #888; margin: 5px 0 0; font-size: 0.9rem;\">").concat(currentLang === 'en' ? 'All Tunisia areas' : 'جميع مناطق تونس', "</p>\n                                        </div>\n                                    </div>\n                                    <div class=\"contact-actions\">\n                                        <a href=\"https://wa.me/21656471550\" class=\"whatsapp-btn\">\n                                            <i class=\"fab fa-whatsapp\"></i>\n                                            <span>WhatsApp: +216 56 471 550</span>\n                                        </a>\n                                        <a href=\"tel:+21656471550\" class=\"call-btn\">\n                                            <i class=\"fas fa-phone\"></i>\n                                            <span>").concat(currentLang === 'en' ? 'Call Now' : 'اتصل الآن', "</span>\n                                        </a>\n                                    </div>\n                                </div>\n                            </div>\n                            \n                            <div style=\"margin-top: 20px; padding: 20px; background: rgba(212, 175, 55, 0.1); border-radius: 8px;\">\n                                <p><strong>").concat(t.alsoContact, "</strong></p>\n                                <p><i class=\"fas fa-envelope\" style=\"color: #D4AF37; margin-left: 5px;\"></i> \n                                <a href=\"mailto:helamishwar@gmail.com\" style=\"color: #8A1538;\">helamishwar@gmail.com</a></p>\n                            </div>\n                        </div>\n                    ");
    }
  } // Start map initialization


  setTimeout(function () {
    initMap();
  }, 500); // Quick contact widget

  var widget = document.querySelector('.quick-contact-widget');
  var widgetClose = document.querySelector('.widget-close');

  if (widget && widgetClose) {
    // Show widget after 5 seconds
    setTimeout(function () {
      widget.classList.add('active');
    }, 5000); // Close widget

    widgetClose.addEventListener('click', function () {
      widget.classList.remove('active');
    }); // Hide widget on scroll down

    var lastScrollTop = 0;
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling down - hide widget
        widget.classList.remove('active');
      } else {
        // Scrolling up - show widget if scrolled enough
        if (scrollTop > 500) {
          widget.classList.add('active');
        }
      }

      lastScrollTop = scrollTop;
    });
  } // Copy button functionality


  document.querySelectorAll('.copy-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var textToCopy = this.getAttribute('data-text') || this.getAttribute('data-number');

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          var currentLang = localStorage.getItem('language') || 'ar';
          var message = currentLang === 'en' ? 'Copied to clipboard!' : 'تم النسخ إلى الحافظة!';
          showToast(message, 'success');
        })["catch"](function (err) {
          console.error('Failed to copy: ', err);
        });
      }
    });
  }); // Character counter for message textarea

  var messageTextarea = document.getElementById('message');
  var charCount = document.querySelector('.char-count');

  if (messageTextarea && charCount) {
    messageTextarea.addEventListener('input', function () {
      var length = this.value.length;
      charCount.textContent = length + '/2000 ' + (localStorage.getItem('language') === 'en' ? 'characters' : 'حرف');

      if (length > 1900) {
        charCount.style.color = '#ff6b6b';
      } else if (length > 1500) {
        charCount.style.color = '#ffa726';
      } else {
        charCount.style.color = '#666';
      }
    });
  } // Form submission


  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Get form data

      var formData = {
        fullName: document.getElementById('fullName').value,
        countryCode: document.getElementById('countryCode').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        preferredContact: document.getElementById('preferredContact').value,
        serviceType: document.getElementById('serviceType').value,
        urgency: document.getElementById('urgency').value,
        messageSubject: document.getElementById('messageSubject').value,
        message: document.getElementById('message').value,
        privacyPolicy: document.getElementById('privacyPolicy').checked
      }; // Validate form

      if (!formData.privacyPolicy) {
        var _currentLang = localStorage.getItem('language') || 'ar';

        var _message = _currentLang === 'en' ? 'Please accept the privacy policy' : 'يرجى الموافقة على سياسة الخصوصية';

        showToast(_message, 'error');
        return;
      } // Format message for WhatsApp


      var whatsappMessage = "\n*New Contact Form Submission - Tn-QA Delivery*\n\n*\uD83D\uDC64 Personal Information:*\n\u2022 Name: ".concat(formData.fullName, "\n\u2022 Phone: ").concat(formData.countryCode, " ").concat(formData.phoneNumber, "\n\u2022 Email: ").concat(formData.email || 'Not provided', "\n\u2022 Preferred Contact: ").concat(formData.preferredContact, "\n\n*\uD83D\uDCE6 Service Information:*\n\u2022 Service Type: ").concat(formData.serviceType, "\n\u2022 Urgency: ").concat(formData.urgency, "\n\u2022 Subject: ").concat(formData.messageSubject, "\n\n*\uD83D\uDCAC Message:*\n").concat(formData.message, "\n\n*\uD83D\uDCC5 Submitted on:* ").concat(new Date().toLocaleString(), "\n                    ").trim(); // Encode for WhatsApp URL

      var encodedMessage = encodeURIComponent(whatsappMessage);
      var whatsappNumber = formData.countryCode === '+216' ? '21656471550' : '97471375390';
      var whatsappURL = "https://wa.me/".concat(whatsappNumber, "?text=").concat(encodedMessage); // Open WhatsApp in new tab

      window.open(whatsappURL, '_blank'); // Show success message

      var currentLang = localStorage.getItem('language') || 'ar';
      var message = currentLang === 'en' ? 'Form submitted successfully! Opening WhatsApp...' : 'تم إرسال النموذج بنجاح! جارٍ فتح الواتساب...';
      showToast(message, 'success'); // Reset form after 2 seconds

      setTimeout(function () {
        contactForm.reset();

        if (charCount) {
          charCount.textContent = '0/2000 ' + (currentLang === 'en' ? 'characters' : 'حرف');
          charCount.style.color = '#666';
        }
      }, 2000);
    });
  } // Clear form button


  var clearFormBtn = document.getElementById('clearForm');

  if (clearFormBtn) {
    clearFormBtn.addEventListener('click', function () {
      if (confirm(localStorage.getItem('language') === 'en' ? 'Are you sure you want to clear the form?' : 'هل أنت متأكد من مسح النموذج؟')) {
        contactForm.reset();
        var currentLang = localStorage.getItem('language') || 'ar';

        if (charCount) {
          charCount.textContent = '0/2000 ' + (currentLang === 'en' ? 'characters' : 'حرف');
          charCount.style.color = '#666';
        }

        showToast(currentLang === 'en' ? 'Form cleared' : 'تم مسح النموذج', 'info');
      }
    });
  } // File upload functionality


  var fileUpload = document.getElementById('fileUpload');
  var fileUploadArea = document.getElementById('fileUploadArea');
  var fileList = document.getElementById('fileList');

  if (fileUpload && fileUploadArea) {
    var preventDefaults = function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    };

    var highlight = function highlight() {
      fileUploadArea.classList.add('highlight');
    };

    var unhighlight = function unhighlight() {
      fileUploadArea.classList.remove('highlight');
    };

    var handleDrop = function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;
      fileUpload.files = files;
      updateFileList();
    };

    var updateFileList = function updateFileList() {
      if (!fileList) return;
      fileList.innerHTML = '';
      var files = fileUpload.files;

      if (files.length === 0) {
        return;
      }

      var currentLang = localStorage.getItem('language') || 'ar';
      var fileCountText = currentLang === 'en' ? "".concat(files.length, " file(s) selected") : "\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 ".concat(files.length, " \u0645\u0644\u0641(\u0627\u062A)");
      var header = document.createElement('div');
      header.className = 'file-list-header';
      header.innerHTML = "\n                        <span>".concat(fileCountText, "</span>\n                        <button type=\"button\" class=\"clear-files-btn\">\n                            ").concat(currentLang === 'en' ? 'Clear All' : 'مسح الكل', "\n                        </button>\n                    ");
      fileList.appendChild(header); // Add clear files button functionality

      var clearFilesBtn = header.querySelector('.clear-files-btn');
      clearFilesBtn.addEventListener('click', function () {
        fileUpload.value = '';
        updateFileList();
      }); // List files

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileItem = document.createElement('div');
        fileItem.className = 'file-item'; // Get file icon based on type

        var fileIcon = 'fa-file';

        if (file.type.startsWith('image/')) {
          fileIcon = 'fa-file-image';
        } else if (file.type === 'application/pdf') {
          fileIcon = 'fa-file-pdf';
        } else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
          fileIcon = 'fa-file-word';
        } // Format file size


        var fileSize = formatFileSize(file.size);
        fileItem.innerHTML = "\n                            <div class=\"file-info\">\n                                <i class=\"fas ".concat(fileIcon, "\"></i>\n                                <div>\n                                    <span class=\"file-name\">").concat(file.name, "</span>\n                                    <span class=\"file-size\">").concat(fileSize, "</span>\n                                </div>\n                            </div>\n                            <button type=\"button\" class=\"remove-file-btn\" data-index=\"").concat(i, "\">\n                                <i class=\"fas fa-times\"></i>\n                            </button>\n                        ");
        fileList.appendChild(fileItem);
      } // Add remove file functionality


      fileList.querySelectorAll('.remove-file-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var index = parseInt(this.getAttribute('data-index'));
          removeFile(index);
        });
      });
    };

    var removeFile = function removeFile(index) {
      var dt = new DataTransfer();
      var files = fileUpload.files;

      for (var i = 0; i < files.length; i++) {
        if (i !== index) {
          dt.items.add(files[i]);
        }
      }

      fileUpload.files = dt.files;
      updateFileList();
    };

    var formatFileSize = function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      var k = 1024;
      var sizes = ['Bytes', 'KB', 'MB', 'GB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Click on area to trigger file input
    fileUploadArea.addEventListener('click', function () {
      fileUpload.click();
    }); // Handle file selection

    fileUpload.addEventListener('change', function () {
      updateFileList();
    }); // Drag and drop functionality

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
      fileUploadArea.addEventListener(eventName, preventDefaults, false);
    });
    ['dragenter', 'dragover'].forEach(function (eventName) {
      fileUploadArea.addEventListener(eventName, highlight, false);
    });
    ['dragleave', 'drop'].forEach(function (eventName) {
      fileUploadArea.addEventListener(eventName, unhighlight, false);
    });
    fileUploadArea.addEventListener('drop', handleDrop, false);
  } // Toast notification function


  function showToast(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
    // Remove existing toasts
    document.querySelectorAll('.toast-message').forEach(function (toast) {
      return toast.remove();
    });
    var toast = document.createElement('div');
    toast.className = "toast-message ".concat(type);
    toast.textContent = message;
    document.body.appendChild(toast); // Remove toast after animation

    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  } // Initialize AOS animations if available


  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
});

var ContactPage =
/*#__PURE__*/
function () {
  function ContactPage() {
    _classCallCheck(this, ContactPage);

    this.map = null;
    this.formSubmitted = false;
    this.files = [];
    this.currentLang = localStorage.getItem('language') || 'ar';
    this.init();
  }

  _createClass(ContactPage, [{
    key: "init",
    value: function init() {
      this.initializeMap();
      this.setupFormValidation();
      this.setupCopyButtons();
      this.setupFileUpload();
      this.setupQuickWidget();
      this.setupCharacterCounter();
      this.setupFAQAccordion();
      this.setupScrollToTop();
      this.setupLanguageListener();
    }
    /**
     * Initialize Leaflet Map
     */

  }, {
    key: "initializeMap",
    value: function initializeMap() {
      var mapElement = document.getElementById('contactMap');
      if (!mapElement) return;

      try {
        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
          throw new Error('Leaflet library not loaded');
        } // Create map centered between Qatar and Tunisia


        this.map = L.map('contactMap').setView([28.0, 30.0], 5); // Add OpenStreetMap tile layer

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18
        }).addTo(this.map); // Qatar location marker (Doha)

        var qatarMarker = L.marker([25.2854, 51.5310]).addTo(this.map).bindPopup(this.createPopupContent('qatar')).openPopup(); // Tunisia location marker (Tunis)

        var tunisiaMarker = L.marker([36.8065, 10.1815]).addTo(this.map).bindPopup(this.createPopupContent('tunisia')); // Add coverage circles

        this.addCoverageAreas(); // Add legend

        this.addMapLegend();
        console.log('Map initialized successfully');
      } catch (error) {
        console.error('Error initializing map:', error);
        this.showMapError();
      }
    }
    /**
     * Create popup content for map markers
     */

  }, {
    key: "createPopupContent",
    value: function createPopupContent(country) {
      var isQatar = country === 'qatar';
      var translations = {
        ar: {
          qatarTitle: 'مركز العمليات في قطر',
          tunisiaTitle: 'مركز العمليات في تونس',
          phone: 'الهاتف',
          whatsapp: 'واتساب متوفر',
          coverage: 'تغطية جميع المناطق',
          contactBtn: 'تواصل عبر واتساب'
        },
        en: {
          qatarTitle: 'Qatar Operations Center',
          tunisiaTitle: 'Tunisia Operations Center',
          phone: 'Phone',
          whatsapp: 'WhatsApp Available',
          coverage: 'Covering all areas',
          contactBtn: 'Contact on WhatsApp'
        }
      };
      var t = translations[this.currentLang] || translations.ar;
      var phone = isQatar ? '+974 71 375 390' : '+216 56 471 550';
      var whatsapp = isQatar ? '97471375390' : '21656471550';
      return "\n            <div class=\"map-popup\">\n                <h3>".concat(isQatar ? t.qatarTitle : t.tunisiaTitle, "</h3>\n                <p><i class=\"fas fa-phone\"></i> ").concat(phone, "</p>\n                <p><i class=\"fab fa-whatsapp\"></i> ").concat(t.whatsapp, "</p>\n                <p><i class=\"fas fa-map-marker-alt\"></i> ").concat(t.coverage, "</p>\n                <a href=\"https://wa.me/").concat(whatsapp, "\" target=\"_blank\" \n                   class=\"map-popup-btn\">\n                    <i class=\"fab fa-whatsapp\"></i> ").concat(t.contactBtn, "\n                </a>\n            </div>\n        ");
    }
    /**
     * Add coverage areas to map
     */

  }, {
    key: "addCoverageAreas",
    value: function addCoverageAreas() {
      // Qatar coverage circle
      L.circle([25.2854, 51.5310], {
        color: '#8A1538',
        fillColor: '#8A1538',
        fillOpacity: 0.1,
        radius: 50000
      }).addTo(this.map).bindPopup(this.currentLang === 'en' ? 'Qatar Coverage Area' : 'منطقة التغطية في قطر'); // Tunisia coverage circle

      L.circle([36.8065, 10.1815], {
        color: '#E70013',
        fillColor: '#E70013',
        fillOpacity: 0.1,
        radius: 150000
      }).addTo(this.map).bindPopup(this.currentLang === 'en' ? 'Tunisia Coverage Area' : 'منطقة التغطية في تونس');
    }
    /**
     * Add legend to map
     */

  }, {
    key: "addMapLegend",
    value: function addMapLegend() {
      var Legend = L.Control.extend({
        onAdd: function onAdd(map) {
          var div = L.DomUtil.create('div', 'map-legend');
          var translations = {
            ar: {
              coverage: 'مناطق التغطية',
              qatar: 'تغطية قطر',
              tunisia: 'تغطية تونس',
              offices: 'المكاتب الرئيسية'
            },
            en: {
              coverage: 'Coverage Areas',
              qatar: 'Qatar Coverage',
              tunisia: 'Tunisia Coverage',
              offices: 'Main Offices'
            }
          };
          var t = translations[localStorage.getItem('language') || 'ar'] || translations.ar;
          div.innerHTML = "\n                    <h4>".concat(t.coverage, "</h4>\n                    <div class=\"legend-item\">\n                        <span class=\"legend-color\" style=\"background: #8A1538;\"></span>\n                        <span>").concat(t.qatar, "</span>\n                    </div>\n                    <div class=\"legend-item\">\n                        <span class=\"legend-color\" style=\"background: #E70013;\"></span>\n                        <span>").concat(t.tunisia, "</span>\n                    </div>\n                    <div class=\"legend-item\">\n                        <span class=\"legend-color\" style=\"background: #D4AF37;\"></span>\n                        <span>").concat(t.offices, "</span>\n                    </div>\n                ");
          return div;
        }
      });
      new Legend({
        position: 'bottomright'
      }).addTo(this.map);
    }
    /**
     * Show map error message
     */

  }, {
    key: "showMapError",
    value: function showMapError() {
      var mapElement = document.getElementById('contactMap');
      if (!mapElement) return;
      var translations = {
        ar: {
          errorTitle: 'تعذر تحميل الخريطة',
          errorMessage: 'حدث خطأ في تحميل الخريطة. يمكنك التواصل معنا مباشرة عبر الأرقام التالية:',
          qatarBranch: 'فرع قطر',
          tunisiaBranch: 'فرع تونس',
          alsoContact: 'يمكنك أيضاً التواصل عبر البريد الإلكتروني:',
          allQatar: 'جميع مناطق قطر',
          allTunisia: 'جميع مناطق تونس',
          callNow: 'اتصل الآن'
        },
        en: {
          errorTitle: 'Map Failed to Load',
          errorMessage: 'There was an error loading the map. You can contact us directly via the following numbers:',
          qatarBranch: 'Qatar Branch',
          tunisiaBranch: 'Tunisia Branch',
          alsoContact: 'You can also contact via email:',
          allQatar: 'All Qatar areas',
          allTunisia: 'All Tunisia areas',
          callNow: 'Call Now'
        }
      };
      var t = translations[this.currentLang] || translations.ar;
      mapElement.innerHTML = "\n            <div class=\"map-error-container\">\n                <div class=\"map-error-icon\">\n                    <i class=\"fas fa-map-marked-alt\"></i>\n                </div>\n                <h3>".concat(t.errorTitle, "</h3>\n                <p>").concat(t.errorMessage, "</p>\n                \n                <div class=\"map-error-contacts\">\n                    <div class=\"error-contact-card\">\n                        <div class=\"country-header\">\n                            <img src=\"https://flagcdn.com/w40/qa.png\" alt=\"Qatar\">\n                            <div>\n                                <h4>").concat(t.qatarBranch, "</h4>\n                                <p style=\"color: #888; margin: 5px 0 0; font-size: 0.9rem;\">").concat(t.allQatar, "</p>\n                            </div>\n                        </div>\n                        <div class=\"contact-actions\">\n                            <a href=\"https://wa.me/97471375390\" class=\"whatsapp-btn\">\n                                <i class=\"fab fa-whatsapp\"></i>\n                                <span>WhatsApp: +974 71 375 390</span>\n                            </a>\n                            <a href=\"tel:+97471375390\" class=\"call-btn\">\n                                <i class=\"fas fa-phone\"></i>\n                                <span>").concat(t.callNow, "</span>\n                            </a>\n                        </div>\n                    </div>\n                    \n                    <div class=\"error-contact-card\">\n                        <div class=\"country-header\">\n                            <img src=\"https://flagcdn.com/w40/tn.png\" alt=\"Tunisia\">\n                            <div>\n                                <h4>").concat(t.tunisiaBranch, "</h4>\n                                <p style=\"color: #888; margin: 5px 0 0; font-size: 0.9rem;\">").concat(t.allTunisia, "</p>\n                            </div>\n                        </div>\n                        <div class=\"contact-actions\">\n                            <a href=\"https://wa.me/21656471550\" class=\"whatsapp-btn\">\n                                <i class=\"fab fa-whatsapp\"></i>\n                                <span>WhatsApp: +216 56 471 550</span>\n                            </a>\n                            <a href=\"tel:+21656471550\" class=\"call-btn\">\n                                <i class=\"fas fa-phone\"></i>\n                                <span>").concat(t.callNow, "</span>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n                \n                <div style=\"margin-top: 20px; padding: 20px; background: rgba(212, 175, 55, 0.1); border-radius: 8px;\">\n                    <p><strong>").concat(t.alsoContact, "</strong></p>\n                    <p><i class=\"fas fa-envelope\" style=\"color: #D4AF37; margin-left: 5px;\"></i> \n                    <a href=\"mailto:helamishwar@gmail.com\" style=\"color: #8A1538;\">helamishwar@gmail.com</a></p>\n                </div>\n            </div>\n        ");
    }
    /**
     * Setup form validation and submission
     */

  }, {
    key: "setupFormValidation",
    value: function setupFormValidation() {
      var _this = this;

      var contactForm = document.getElementById('contactForm');
      if (!contactForm) return;
      contactForm.addEventListener('submit', function (e) {
        return _this.handleFormSubmit(e);
      }); // Clear form button

      var clearFormBtn = document.getElementById('clearForm');

      if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function () {
          return _this.clearForm();
        });
      } // Real-time validation


      this.setupRealTimeValidation();
    }
    /**
     * Handle form submission
     */

  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(e) {
      e.preventDefault();

      if (this.formSubmitted) {
        this.showToast(this.currentLang === 'en' ? 'Please wait while we process your previous request' : 'يرجى الانتظار أثناء معالجة طلبك السابق', 'warning');
        return;
      } // Validate form


      if (!this.validateForm()) {
        return;
      } // Show loading state


      this.setFormLoading(true); // Get form data

      var formData = this.getFormData(); // Prepare WhatsApp message

      var whatsappMessage = this.formatWhatsAppMessage(formData);
      var whatsappURL = this.createWhatsAppURL(formData, whatsappMessage); // Open WhatsApp

      this.openWhatsApp(whatsappURL, formData);
    }
    /**
     * Validate form data
     */

  }, {
    key: "validateForm",
    value: function validateForm() {
      var fullName = document.getElementById('fullName').value.trim();
      var phoneNumber = document.getElementById('phoneNumber').value.trim();
      var messageSubject = document.getElementById('messageSubject').value.trim();
      var message = document.getElementById('message').value.trim();
      var privacyPolicy = document.getElementById('privacyPolicy').checked;
      var serviceType = document.getElementById('serviceType').value; // Check required fields

      if (!fullName) {
        this.showToast(this.currentLang === 'en' ? 'Please enter your full name' : 'يرجى إدخال الاسم الكامل', 'error');
        return false;
      }

      if (!phoneNumber) {
        this.showToast(this.currentLang === 'en' ? 'Please enter your phone number' : 'يرجى إدخال رقم الهاتف', 'error');
        return false;
      }

      if (!serviceType || serviceType === '') {
        this.showToast(this.currentLang === 'en' ? 'Please select a service type' : 'يرجى اختيار نوع الخدمة', 'error');
        return false;
      }

      if (!messageSubject) {
        this.showToast(this.currentLang === 'en' ? 'Please enter a message subject' : 'يرجى إدخال موضوع الرسالة', 'error');
        return false;
      }

      if (!message) {
        this.showToast(this.currentLang === 'en' ? 'Please enter your message' : 'يرجى إدخال الرسالة', 'error');
        return false;
      }

      if (message.length < 10) {
        this.showToast(this.currentLang === 'en' ? 'Message is too short (minimum 10 characters)' : 'الرسالة قصيرة جداً (الحد الأدنى 10 أحرف)', 'error');
        return false;
      }

      if (!privacyPolicy) {
        this.showToast(this.currentLang === 'en' ? 'Please accept the privacy policy' : 'يرجى الموافقة على سياسة الخصوصية', 'error');
        return false;
      }

      return true;
    }
    /**
     * Get form data
     */

  }, {
    key: "getFormData",
    value: function getFormData() {
      return {
        fullName: document.getElementById('fullName').value.trim(),
        countryCode: document.getElementById('countryCode').value,
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
        email: document.getElementById('email').value.trim(),
        preferredContact: document.getElementById('preferredContact').value,
        serviceType: document.getElementById('serviceType').value,
        serviceTypeText: document.getElementById('serviceType').selectedOptions[0].text,
        urgency: document.getElementById('urgency').value,
        messageSubject: document.getElementById('messageSubject').value.trim(),
        message: document.getElementById('message').value.trim(),
        privacyPolicy: document.getElementById('privacyPolicy').checked,
        files: this.files,
        timestamp: new Date().toLocaleString()
      };
    }
    /**
     * Format WhatsApp message
     */

  }, {
    key: "formatWhatsAppMessage",
    value: function formatWhatsAppMessage(formData) {
      var translations = {
        ar: {
          title: '📋 طلب جديد - Tn-QA Delivery',
          personalInfo: '👤 المعلومات الشخصية:',
          name: 'الاسم',
          phone: 'الهاتف',
          email: 'البريد الإلكتروني',
          preferredContact: 'طريقة التواصل المفضلة',
          serviceInfo: '📦 معلومات الخدمة:',
          serviceType: 'نوع الخدمة',
          urgency: 'درجة الاستعجال',
          subject: 'الموضوع',
          message: '💬 الرسالة:',
          submitted: '📅 وقت الإرسال:',
          notProvided: 'غير مقدم',
          any: 'أي طريقة',
          normal: 'عادي',
          urgent: 'عاجل',
          emergency: 'طارئ'
        },
        en: {
          title: '📋 New Contact Form Submission - Tn-QA Delivery',
          personalInfo: '👤 Personal Information:',
          name: 'Name',
          phone: 'Phone',
          email: 'Email',
          preferredContact: 'Preferred Contact',
          serviceInfo: '📦 Service Information:',
          serviceType: 'Service Type',
          urgency: 'Urgency Level',
          subject: 'Subject',
          message: '💬 Message:',
          submitted: '📅 Submitted on:',
          notProvided: 'Not provided',
          any: 'Any method',
          normal: 'Normal',
          urgent: 'Urgent',
          emergency: 'Emergency'
        }
      };
      var t = translations[this.currentLang] || translations.ar;
      var urgencyMap = {
        normal: t.normal,
        urgent: t.urgent,
        emergency: t.emergency
      };
      var contactMethodMap = {
        whatsapp: this.currentLang === 'en' ? 'WhatsApp' : 'واتساب',
        phone: this.currentLang === 'en' ? 'Phone Call' : 'مكالمة هاتفية',
        email: this.currentLang === 'en' ? 'Email' : 'بريد إلكتروني',
        any: t.any
      };
      return "\n".concat(t.title, "\n\n*").concat(t.personalInfo, "*\n\u2022 ").concat(t.name, ": ").concat(formData.fullName, "\n\u2022 ").concat(t.phone, ": ").concat(formData.countryCode, " ").concat(formData.phoneNumber, "\n\u2022 ").concat(t.email, ": ").concat(formData.email || t.notProvided, "\n\u2022 ").concat(t.preferredContact, ": ").concat(contactMethodMap[formData.preferredContact] || formData.preferredContact, "\n\n*").concat(t.serviceInfo, "*\n\u2022 ").concat(t.serviceType, ": ").concat(formData.serviceTypeText, "\n\u2022 ").concat(t.urgency, ": ").concat(urgencyMap[formData.urgency] || formData.urgency, "\n\u2022 ").concat(t.subject, ": ").concat(formData.messageSubject, "\n\n*").concat(t.message, "*\n").concat(formData.message, "\n\n").concat(formData.files.length > 0 ? "\n\uD83D\uDCCE ".concat(formData.files.length, " file(s) attached") : '', "\n\n*").concat(t.submitted, "* ").concat(formData.timestamp, "\n        ").trim();
    }
    /**
     * Create WhatsApp URL
     */

  }, {
    key: "createWhatsAppURL",
    value: function createWhatsAppURL(formData, message) {
      var whatsappNumber = formData.countryCode === '+216' ? '21656471550' : '97471375390';
      var encodedMessage = encodeURIComponent(message);
      return "https://wa.me/".concat(whatsappNumber, "?text=").concat(encodedMessage);
    }
    /**
     * Open WhatsApp with form data
     */

  }, {
    key: "openWhatsApp",
    value: function openWhatsApp(url, formData) {
      var _this2 = this;

      // Open WhatsApp in new tab
      var newWindow = window.open(url, '_blank');

      if (newWindow) {
        this.showSuccessMessage();
        this.formSubmitted = true; // Reset form after delay

        setTimeout(function () {
          _this2.clearForm();

          _this2.formSubmitted = false;
        }, 3000); // Track submission

        this.trackFormSubmission(formData);
      } else {
        this.showToast(this.currentLang === 'en' ? 'Please allow pop-ups to open WhatsApp' : 'يرجى السماح بالنوافذ المنبثقة لفتح الواتساب', 'error');
        this.setFormLoading(false);
      }
    }
    /**
     * Show success message
     */

  }, {
    key: "showSuccessMessage",
    value: function showSuccessMessage() {
      var successMessage = document.getElementById('successMessage');
      var errorMessage = document.getElementById('errorMessage');
      if (successMessage) successMessage.style.display = 'flex';
      if (errorMessage) errorMessage.style.display = 'none';
      this.showToast(this.currentLang === 'en' ? 'Form submitted successfully! Opening WhatsApp...' : 'تم إرسال النموذج بنجاح! جارٍ فتح الواتساب...', 'success');
    }
    /**
     * Show error message
     */

  }, {
    key: "showErrorMessage",
    value: function showErrorMessage(message) {
      var successMessage = document.getElementById('successMessage');
      var errorMessage = document.getElementById('errorMessage');
      var errorText = document.getElementById('errorText');
      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'flex';
      if (errorText) errorText.textContent = message;
      this.showToast(message, 'error');
    }
    /**
     * Set form loading state
     */

  }, {
    key: "setFormLoading",
    value: function setFormLoading(isLoading) {
      var submitBtn = document.getElementById('submitForm');
      var loader = document.getElementById('formLoader');

      if (submitBtn) {
        submitBtn.disabled = isLoading;
      }

      if (loader) {
        loader.style.display = isLoading ? 'block' : 'none';
      }
    }
    /**
     * Clear form data
     */

  }, {
    key: "clearForm",
    value: function clearForm() {
      if (confirm(this.currentLang === 'en' ? 'Are you sure you want to clear the form?' : 'هل أنت متأكد من مسح النموذج؟')) {
        var contactForm = document.getElementById('contactForm');

        if (contactForm) {
          contactForm.reset();
          this.files = [];
          this.updateFileList(); // Reset character counter

          var charCount = document.querySelector('.char-count');

          if (charCount) {
            charCount.textContent = "0/2000 ".concat(this.currentLang === 'en' ? 'characters' : 'حرف');
            charCount.style.color = '#666';
          } // Hide status messages


          var successMessage = document.getElementById('successMessage');
          var errorMessage = document.getElementById('errorMessage');
          if (successMessage) successMessage.style.display = 'none';
          if (errorMessage) errorMessage.style.display = 'none';
          this.showToast(this.currentLang === 'en' ? 'Form cleared' : 'تم مسح النموذج', 'info');
        }
      }
    }
    /**
     * Setup real-time form validation
     */

  }, {
    key: "setupRealTimeValidation",
    value: function setupRealTimeValidation() {
      var _this3 = this;

      var inputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
      inputs.forEach(function (input) {
        input.addEventListener('blur', function () {
          return _this3.validateField(input);
        });
        input.addEventListener('input', function () {
          return _this3.clearFieldError(input);
        });
      });
    }
    /**
     * Validate individual field
     */

  }, {
    key: "validateField",
    value: function validateField(field) {
      var value = field.value.trim();
      var fieldName = field.id || field.name;

      switch (fieldName) {
        case 'fullName':
          if (value.length < 2) {
            this.showFieldError(field, this.currentLang === 'en' ? 'Name must be at least 2 characters' : 'الاسم يجب أن يكون على الأقل حرفين');
            return false;
          }

          break;

        case 'phoneNumber':
          var phoneRegex = /^[0-9]{8,15}$/;

          if (!phoneRegex.test(value)) {
            this.showFieldError(field, this.currentLang === 'en' ? 'Please enter a valid phone number' : 'يرجى إدخال رقم هاتف صحيح');
            return false;
          }

          break;

        case 'email':
          if (value && !this.isValidEmail(value)) {
            this.showFieldError(field, this.currentLang === 'en' ? 'Please enter a valid email address' : 'يرجى إدخال بريد إلكتروني صحيح');
            return false;
          }

          break;

        case 'message':
          if (value.length < 10) {
            this.showFieldError(field, this.currentLang === 'en' ? 'Message is too short (minimum 10 characters)' : 'الرسالة قصيرة جداً (الحد الأدنى 10 أحرف)');
            return false;
          }

          break;
      }

      return true;
    }
    /**
     * Show field error
     */

  }, {
    key: "showFieldError",
    value: function showFieldError(field, message) {
      this.clearFieldError(field);
      var errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      errorDiv.style.color = 'var(--error)';
      errorDiv.style.fontSize = '0.85rem';
      errorDiv.style.marginTop = '5px';
      field.parentNode.appendChild(errorDiv);
      field.style.borderColor = 'var(--error)';
    }
    /**
     * Clear field error
     */

  }, {
    key: "clearFieldError",
    value: function clearFieldError(field) {
      var errorDiv = field.parentNode.querySelector('.field-error');

      if (errorDiv) {
        errorDiv.remove();
      }

      field.style.borderColor = '';
    }
    /**
     * Validate email format
     */

  }, {
    key: "isValidEmail",
    value: function isValidEmail(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    /**
     * Setup copy buttons
     */

  }, {
    key: "setupCopyButtons",
    value: function setupCopyButtons() {
      var _this4 = this;

      document.querySelectorAll('.copy-btn').forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();
          var textToCopy = button.getAttribute('data-text') || button.getAttribute('data-number');

          if (textToCopy) {
            _this4.copyToClipboard(textToCopy);
          }
        });
      });
    }
    /**
     * Copy text to clipboard
     */

  }, {
    key: "copyToClipboard",
    value: function copyToClipboard(text) {
      var _this5 = this;

      navigator.clipboard.writeText(text).then(function () {
        _this5.showToast(_this5.currentLang === 'en' ? 'Copied to clipboard!' : 'تم النسخ إلى الحافظة!', 'success');
      })["catch"](function (err) {
        console.error('Failed to copy: ', err);

        _this5.showToast(_this5.currentLang === 'en' ? 'Failed to copy text' : 'فشل في نسخ النص', 'error');
      });
    }
    /**
     * Setup file upload functionality
     */

  }, {
    key: "setupFileUpload",
    value: function setupFileUpload() {
      var _this6 = this;

      var fileUpload = document.getElementById('fileUpload');
      var fileUploadArea = document.getElementById('fileUploadArea');
      var fileList = document.getElementById('fileList');
      if (!fileUpload || !fileUploadArea) return; // Click on area to trigger file input

      fileUploadArea.addEventListener('click', function () {
        return fileUpload.click();
      }); // Handle file selection

      fileUpload.addEventListener('change', function () {
        return _this6.handleFileSelect(fileUpload.files);
      }); // Drag and drop functionality

      this.setupDragAndDrop(fileUploadArea, fileUpload);
    }
    /**
     * Handle file selection
     */

  }, {
    key: "handleFileSelect",
    value: function handleFileSelect(files) {
      var maxSize = 10 * 1024 * 1024; // 10MB

      var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var file = _step.value;

          // Check file size
          if (file.size > maxSize) {
            this.showToast(this.currentLang === 'en' ? "File \"".concat(file.name, "\" is too large (max 10MB)") : "\u0627\u0644\u0645\u0644\u0641 \"".concat(file.name, "\" \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B (\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 10 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A)"), 'error');
            continue;
          } // Check file type


          if (!allowedTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|pdf|doc|docx)$/i)) {
            this.showToast(this.currentLang === 'en' ? "File type not supported for \"".concat(file.name, "\"") : "\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0641 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645 \u0644\u0640 \"".concat(file.name, "\""), 'error');
            continue;
          } // Add file to list


          this.files.push(file);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.updateFileList();
    }
    /**
     * Setup drag and drop
     */

  }, {
    key: "setupDragAndDrop",
    value: function setupDragAndDrop(dropArea, fileInput) {
      var _this7 = this;

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
        dropArea.addEventListener(eventName, _this7.preventDefaults, false);
      });
      ['dragenter', 'dragover'].forEach(function (eventName) {
        dropArea.addEventListener(eventName, function () {
          return _this7.highlight(dropArea);
        }, false);
      });
      ['dragleave', 'drop'].forEach(function (eventName) {
        dropArea.addEventListener(eventName, function () {
          return _this7.unhighlight(dropArea);
        }, false);
      });
      dropArea.addEventListener('drop', function (e) {
        return _this7.handleDrop(e, fileInput);
      }, false);
    }
    /**
     * Prevent default drag behaviors
     */

  }, {
    key: "preventDefaults",
    value: function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    /**
     * Highlight drop area
     */

  }, {
    key: "highlight",
    value: function highlight(element) {
      element.classList.add('highlight');
    }
    /**
     * Unhighlight drop area
     */

  }, {
    key: "unhighlight",
    value: function unhighlight(element) {
      element.classList.remove('highlight');
    }
    /**
     * Handle file drop
     */

  }, {
    key: "handleDrop",
    value: function handleDrop(e, fileInput) {
      var dt = e.dataTransfer;
      var files = dt.files; // Create a new DataTransfer object to set files

      var dataTransfer = new DataTransfer();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var file = _step2.value;
          dataTransfer.items.add(file);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      fileInput.files = dataTransfer.files; // Trigger change event

      var event = new Event('change', {
        bubbles: true
      });
      fileInput.dispatchEvent(event);
    }
    /**
     * Update file list display
     */

  }, {
    key: "updateFileList",
    value: function updateFileList() {
      var _this8 = this;

      var fileList = document.getElementById('fileList');
      if (!fileList) return;
      fileList.innerHTML = '';

      if (this.files.length === 0) {
        return;
      } // Create header


      var header = document.createElement('div');
      header.className = 'file-list-header';
      header.innerHTML = "\n            <span>".concat(this.currentLang === 'en' ? "".concat(this.files.length, " file(s) selected") : "\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 ".concat(this.files.length, " \u0645\u0644\u0641(\u0627\u062A)"), "</span>\n            <button type=\"button\" class=\"clear-files-btn\">\n                ").concat(this.currentLang === 'en' ? 'Clear All' : 'مسح الكل', "\n            </button>\n        ");
      fileList.appendChild(header); // Add clear all functionality

      header.querySelector('.clear-files-btn').addEventListener('click', function () {
        _this8.files = [];
        document.getElementById('fileUpload').value = '';

        _this8.updateFileList();
      }); // List files

      this.files.forEach(function (file, index) {
        var fileItem = _this8.createFileItem(file, index);

        fileList.appendChild(fileItem);
      });
    }
    /**
     * Create file list item
     */

  }, {
    key: "createFileItem",
    value: function createFileItem(file, index) {
      var _this9 = this;

      var fileItem = document.createElement('div');
      fileItem.className = 'file-item'; // Get file icon

      var fileIcon = this.getFileIcon(file); // Format file size

      var fileSize = this.formatFileSize(file.size);
      fileItem.innerHTML = "\n            <div class=\"file-info\">\n                <i class=\"fas ".concat(fileIcon, "\"></i>\n                <div>\n                    <span class=\"file-name\">").concat(file.name, "</span>\n                    <span class=\"file-size\">").concat(fileSize, "</span>\n                </div>\n            </div>\n            <button type=\"button\" class=\"remove-file-btn\" data-index=\"").concat(index, "\">\n                <i class=\"fas fa-times\"></i>\n            </button>\n        "); // Add remove functionality

      fileItem.querySelector('.remove-file-btn').addEventListener('click', function () {
        _this9.files.splice(index, 1);

        _this9.updateFileList();
      });
      return fileItem;
    }
    /**
     * Get file icon based on type
     */

  }, {
    key: "getFileIcon",
    value: function getFileIcon(file) {
      if (file.type.startsWith('image/')) return 'fa-file-image';
      if (file.type === 'application/pdf') return 'fa-file-pdf';
      if (file.type.includes('word') || file.name.match(/\.(doc|docx)$/i)) return 'fa-file-word';
      return 'fa-file';
    }
    /**
     * Format file size
     */

  }, {
    key: "formatFileSize",
    value: function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      var k = 1024;
      var sizes = this.currentLang === 'en' ? ['Bytes', 'KB', 'MB', 'GB'] : ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    /**
     * Setup quick contact widget
     */

  }, {
    key: "setupQuickWidget",
    value: function setupQuickWidget() {
      var widget = document.querySelector('.quick-contact-widget');
      var widgetClose = document.querySelector('.widget-close');
      if (!widget || !widgetClose) return; // Show widget after delay

      setTimeout(function () {
        widget.classList.add('active');
      }, 5000); // Close widget

      widgetClose.addEventListener('click', function () {
        widget.classList.remove('active');
      }); // Hide on scroll down, show on scroll up

      this.setupWidgetScrollBehavior(widget);
    }
    /**
     * Setup widget scroll behavior
     */

  }, {
    key: "setupWidgetScrollBehavior",
    value: function setupWidgetScrollBehavior(widget) {
      var lastScrollTop = 0;
      window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
          // Scrolling down - hide widget
          widget.classList.remove('active');
        } else if (scrollTop < lastScrollTop && scrollTop > 500) {
          // Scrolling up and not at top - show widget
          widget.classList.add('active');
        }

        lastScrollTop = scrollTop;
      });
    }
    /**
     * Setup character counter for textarea
     */

  }, {
    key: "setupCharacterCounter",
    value: function setupCharacterCounter() {
      var _this10 = this;

      var messageTextarea = document.getElementById('message');
      var charCount = document.querySelector('.char-count');
      if (!messageTextarea || !charCount) return;
      messageTextarea.addEventListener('input', function () {
        var length = messageTextarea.value.length;
        var maxLength = 2000;
        charCount.textContent = "".concat(length, "/").concat(maxLength, " ").concat(_this10.currentLang === 'en' ? 'characters' : 'حرف'); // Update color based on length

        if (length > maxLength * 0.95) {
          charCount.style.color = 'var(--error)';
        } else if (length > maxLength * 0.8) {
          charCount.style.color = 'var(--warning)';
        } else {
          charCount.style.color = 'var(--gray)';
        } // Trim if exceeds max length


        if (length > maxLength) {
          messageTextarea.value = messageTextarea.value.substring(0, maxLength);
          charCount.textContent = "".concat(maxLength, "/").concat(maxLength, " ").concat(_this10.currentLang === 'en' ? 'characters' : 'حرف');
        }
      });
    }
    /**
     * Setup FAQ accordion
     */

  }, {
    key: "setupFAQAccordion",
    value: function setupFAQAccordion() {
      var faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-question');
        question.addEventListener('click', function () {
          // Close all other items
          faqItems.forEach(function (otherItem) {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          }); // Toggle current item

          item.classList.toggle('active');
        });
      });
    }
    /**
     * Setup scroll to top button
     */

  }, {
    key: "setupScrollToTop",
    value: function setupScrollToTop() {
      var scrollBtn = document.getElementById('scrollToTop');
      if (!scrollBtn) return; // Show/hide button based on scroll position

      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      }); // Scroll to top on click

      scrollBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    /**
     * Setup language change listener
     */

  }, {
    key: "setupLanguageListener",
    value: function setupLanguageListener() {
      var _this11 = this;

      // Listen for language changes
      document.addEventListener('languageChanged', function (e) {
        _this11.currentLang = e.detail.language;

        _this11.updateContentLanguage();
      });
    }
    /**
     * Update content based on language
     */

  }, {
    key: "updateContentLanguage",
    value: function updateContentLanguage() {
      // Update map popups
      if (this.map) {
        this.map.eachLayer(function (layer) {
          if (layer.bindPopup) {
            var popup = layer.getPopup();

            if (popup) {// You would need to store which marker is which
              // and update the popup content accordingly
            }
          }
        });
      }
    }
    /**
     * Show toast notification
     */

  }, {
    key: "showToast",
    value: function showToast(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      // Remove existing toasts
      document.querySelectorAll('.toast-message').forEach(function (toast) {
        return toast.remove();
      });
      var toast = document.createElement('div');
      toast.className = "toast-message ".concat(type);
      toast.textContent = message;
      document.body.appendChild(toast); // Remove after animation

      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 3000);
    }
    /**
     * Track form submission (for analytics)
     */

  }, {
    key: "trackFormSubmission",
    value: function trackFormSubmission(formData) {
      // You can implement analytics tracking here
      console.log('Form submitted:', {
        serviceType: formData.serviceType,
        urgency: formData.urgency,
        timestamp: formData.timestamp
      }); // Example: Send to Google Analytics

      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
          'event_category': 'contact',
          'event_label': formData.serviceType
        });
      }
    }
  }]);

  return ContactPage;
}(); // Initialize when DOM is loaded


document.addEventListener('DOMContentLoaded', function () {
  new ContactPage();
});
//# sourceMappingURL=contact.dev.js.map
