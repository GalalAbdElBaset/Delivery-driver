"use strict";

/**
 * ملف تهيئة خريطة Leaflet
 * لـ Tn-QA Delivery
 */
// دالة تهيئة الخريطة
function initContactMap() {
  console.log('🔍 جارٍ تهيئة خريطة Leaflet...');
  var mapElement = document.getElementById('contactMap');

  if (!mapElement) {
    console.error('❌ عنصر الخريطة غير موجود!');
    return false;
  } // تنظيف العنصر أولاً


  mapElement.innerHTML = '';

  try {
    // إنشاء الخريطة بمركز بين قطر وتونس
    var map = L.map('contactMap', {
      zoomControl: true,
      attributionControl: true
    }).setView([28.0339, 1.6596], 4); // إضافة طبقة الخريطة الأساسية مع خيارات متعددة للتحميل

    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      minZoom: 2
    }).addTo(map); // طبقة بديلة في حالة فشل OSM

    var esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 18,
      minZoom: 2
    }); // التحقق من اتصال OSM

    var checkOSMConnection = function checkOSMConnection() {
      fetch('https://tile.openstreetmap.org/0/0/0.png').then(function (response) {
        if (!response.ok) throw new Error('OSM not accessible');
        console.log('✅ اتصال OSM يعمل بشكل صحيح');
      })["catch"](function (error) {
        console.warn('⚠️ استخدام طبقة Esri بديلة');
        map.removeLayer(osmLayer);
        esriLayer.addTo(map);
      });
    };

    checkOSMConnection(); // تنسيقات الخريطة

    mapElement.style.borderRadius = '12px';
    mapElement.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    mapElement.style.overflow = 'hidden'; // مواقع الفروع

    var locations = [{
      name: "قطر: الدوحة",
      position: [25.2854, 51.5310],
      country: "🇶🇦 قطر",
      phone: "+974 71 375 390",
      whatsapp: "97471375390",
      color: "#8A1538",
      flag: "https://flagcdn.com/w40/qa.png",
      areas: ["الدوحة", "الريان", "الوكرة", "الخور", "الذخيرة", "جميع مناطق قطر"]
    }, {
      name: "تونس: تونس العاصمة",
      position: [36.8065, 10.1815],
      country: "🇹🇳 تونس",
      phone: "+216 56 471 550",
      whatsapp: "21656471550",
      color: "#E70013",
      flag: "https://flagcdn.com/w40/tn.png",
      areas: ["تونس العاصمة", "صفاقس", "سوسة", "نابل", "المنستير", "جميع مناطق تونس"]
    }]; // إضافة العلامات للخريطة

    locations.forEach(function (location) {
      // إنشاء أيقونة مخصصة
      var iconHtml = "\n                <div style=\"\n                    width: 45px;\n                    height: 45px;\n                    background: ".concat(location.color, ";\n                    border-radius: 50%;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    color: white;\n                    font-size: 1.2rem;\n                    border: 3px solid white;\n                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);\n                    animation: pulse 2s infinite;\n                \">\n                    <i class=\"fas fa-map-marker-alt\"></i>\n                </div>\n            ");
      var customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [45, 45],
        iconAnchor: [22, 45]
      }); // إنشاء محتوى النافذة المنبثقة

      var popupContent = "\n                <div style=\"padding: 15px; font-family: 'Cairo', sans-serif; direction: rtl; min-width: 250px;\">\n                    <div style=\"display: flex; align-items: center; gap: 12px; margin-bottom: 15px;\">\n                        <img src=\"".concat(location.flag, "\" alt=\"").concat(location.country, "\" \n                             style=\"width: 35px; height: 23px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);\">\n                        <div>\n                            <h3 style=\"color: ").concat(location.color, "; margin: 0; font-size: 1.1rem; font-weight: 700;\">\n                                ").concat(location.country, "\n                            </h3>\n                            <p style=\"margin: 5px 0 0; color: #666; font-size: 0.9rem;\">").concat(location.name, "</p>\n                        </div>\n                    </div>\n                    \n                    <div style=\"background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 15px;\">\n                        <p style=\"margin: 0 0 8px; color: #333;\">\n                            <i class=\"fas fa-phone\" style=\"color: ").concat(location.color, "; margin-left: 5px;\"></i>\n                            <strong>\u0627\u0644\u0647\u0627\u062A\u0641:</strong> ").concat(location.phone, "\n                        </p>\n                        <div style=\"display: flex; gap: 8px; margin-top: 10px;\">\n                            <a href=\"https://wa.me/").concat(location.whatsapp, "\" \n                               target=\"_blank\"\n                               style=\"flex: 1; background: #25D366; color: white; padding: 8px 12px; border-radius: 6px; \n                                      text-decoration: none; text-align: center; font-size: 0.9rem; transition: all 0.3s;\">\n                                <i class=\"fab fa-whatsapp\"></i> \u0648\u0627\u062A\u0633\u0627\u0628\n                            </a>\n                            <a href=\"tel:").concat(location.phone.replace(/\s+/g, ''), "\" \n                               style=\"flex: 1; background: ").concat(location.color, "; color: white; padding: 8px 12px; border-radius: 6px; \n                                      text-decoration: none; text-align: center; font-size: 0.9rem; transition: all 0.3s;\">\n                                <i class=\"fas fa-phone\"></i> \u0627\u062A\u0635\u0644\n                            </a>\n                        </div>\n                    </div>\n                    \n                    <div style=\"margin-top: 15px;\">\n                        <p style=\"margin: 0 0 8px; color: #333; font-size: 0.9rem;\">\n                            <i class=\"fas fa-check-circle\" style=\"color: #28a745; margin-left: 5px;\"></i>\n                            <strong>\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u062A\u063A\u0637\u064A\u0629:</strong>\n                        </p>\n                        <div style=\"display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;\">\n                            ").concat(location.areas.slice(0, 4).map(function (area) {
        return "\n                                <span style=\"background: rgba(212, 175, 55, 0.1); color: #D4AF37; padding: 4px 8px; \n                                             border-radius: 4px; font-size: 0.8rem; text-align: center;\">\n                                    ".concat(area, "\n                                </span>\n                            ");
      }).join(''), "\n                        </div>\n                    </div>\n                </div>\n            "); // إضافة العلامة

      var marker = L.marker(location.position, {
        icon: customIcon,
        title: location.name
      }).addTo(map); // إضافة النافذة المنبثقة

      marker.bindPopup(popupContent); // إضافة تأثير عند النقر

      marker.on('click', function () {
        this.openPopup();
      }); // إضافة تأثير hover

      marker.on('mouseover', function () {
        this._icon.style.transform = 'scale(1.1)';
        this._icon.style.transition = 'transform 0.3s';
      });
      marker.on('mouseout', function () {
        this._icon.style.transform = 'scale(1)';
      });
    }); // رسم خط بين المواقع

    var linePoints = locations.map(function (loc) {
      return loc.position;
    });
    L.polyline(linePoints, {
      color: '#D4AF37',
      weight: 2,
      opacity: 0.6,
      dashArray: '10, 10'
    }).addTo(map); // ضبط مدى الخريطة ليشمل جميع المواقع

    var bounds = L.latLngBounds(locations.map(function (loc) {
      return loc.position;
    }));
    map.fitBounds(bounds, {
      padding: [50, 50]
    }); // إضافة عناصر التحكم

    L.control.zoom({
      position: 'topright'
    }).addTo(map); // إضافة شعار الشركة

    var logoControl = L.control({
      position: 'bottomright'
    });

    logoControl.onAdd = function () {
      var div = L.DomUtil.create('div', 'map-logo');
      div.innerHTML = "\n                <div style=\"background: rgba(255, 255, 255, 0.95); padding: 8px 15px; border-radius: 8px; \n                            box-shadow: 0 3px 15px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 10px;\">\n                    <span style=\"color: #D4AF37; font-weight: 700; font-size: 1rem;\">HELA Express</span>\n                    <span style=\"color: #666; font-size: 0.8rem;\">\u0642\u0637\u0631 - \u062A\u0648\u0646\u0633</span>\n                </div>\n            ";
      return div;
    };

    logoControl.addTo(map); // إضافة CSS للرسوم المتحركة

    var style = document.createElement('style');
    style.textContent = "\n            @keyframes pulse {\n                0% { transform: scale(1); box-shadow: 0 3px 10px rgba(0,0,0,0.3); }\n                50% { transform: scale(1.05); box-shadow: 0 5px 15px rgba(0,0,0,0.4); }\n                100% { transform: scale(1); box-shadow: 0 3px 10px rgba(0,0,0,0.3); }\n            }\n            \n            .leaflet-popup-content-wrapper {\n                border-radius: 12px !important;\n                box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;\n            }\n            \n            .leaflet-popup-content a:hover {\n                opacity: 0.9;\n                transform: translateY(-2px);\n            }\n            \n            .leaflet-control-zoom {\n                border: none !important;\n                border-radius: 8px !important;\n                overflow: hidden;\n                box-shadow: 0 3px 15px rgba(0,0,0,0.1) !important;\n            }\n            \n            .leaflet-control-zoom a {\n                background: white !important;\n                color: #D4AF37 !important;\n                border-bottom: 1px solid #f0f0f0 !important;\n                transition: all 0.3s !important;\n            }\n            \n            .leaflet-control-zoom a:hover {\n                background: #D4AF37 !important;\n                color: white !important;\n            }\n        ";
    document.head.appendChild(style);
    console.log('✅ تم تهيئة الخريطة بنجاح!');
    return true;
  } catch (error) {
    console.error('❌ خطأ في تهيئة الخريطة:', error);
    throw error;
  }
} // جعل الدالة متاحة عالمياً


window.initContactMap = initContactMap; // لا نبدأ التهيئة تلقائياً، سنترك ذلك للصفحة الرئيسية
//# sourceMappingURL=map.dev.js.map
