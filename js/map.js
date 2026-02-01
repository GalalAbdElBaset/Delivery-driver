/**
 * ملف تهيئة خريطة Leaflet
 * لـ Tn-QA Delivery
 */

// دالة تهيئة الخريطة
function initContactMap() {
    console.log('🔍 جارٍ تهيئة خريطة Leaflet...');
    
    const mapElement = document.getElementById('contactMap');
    if (!mapElement) {
        console.error('❌ عنصر الخريطة غير موجود!');
        return false;
    }
    
    // تنظيف العنصر أولاً
    mapElement.innerHTML = '';
    
    try {
        // إنشاء الخريطة بمركز بين قطر وتونس
        const map = L.map('contactMap', {
            zoomControl: true,
            attributionControl: true
        }).setView([28.0339, 1.6596], 4);
        
        // إضافة طبقة الخريطة الأساسية مع خيارات متعددة للتحميل
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            minZoom: 2
        }).addTo(map);
        
        // طبقة بديلة في حالة فشل OSM
        const esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri',
            maxZoom: 18,
            minZoom: 2
        });
        
        // التحقق من اتصال OSM
        const checkOSMConnection = () => {
            fetch('https://tile.openstreetmap.org/0/0/0.png')
                .then(response => {
                    if (!response.ok) throw new Error('OSM not accessible');
                    console.log('✅ اتصال OSM يعمل بشكل صحيح');
                })
                .catch(error => {
                    console.warn('⚠️ استخدام طبقة Esri بديلة');
                    map.removeLayer(osmLayer);
                    esriLayer.addTo(map);
                });
        };
        
        checkOSMConnection();
        
        // تنسيقات الخريطة
        mapElement.style.borderRadius = '12px';
        mapElement.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        mapElement.style.overflow = 'hidden';
        
        // مواقع الفروع
        const locations = [
            {
                name: "قطر: الدوحة",
                position: [25.2854, 51.5310],
                country: "🇶🇦 قطر",
                phone: "+974 71 375 390",
                whatsapp: "97471375390",
                color: "#8A1538",
                flag: "https://flagcdn.com/w40/qa.png",
                areas: ["الدوحة", "الريان", "الوكرة", "الخور", "الذخيرة", "جميع مناطق قطر"]
            },
            {
                name: "تونس: تونس العاصمة",
                position: [36.8065, 10.1815],
                country: "🇹🇳 تونس",
                phone: "+216 56 471 550",
                whatsapp: "21656471550",
                color: "#E70013",
                flag: "https://flagcdn.com/w40/tn.png",
                areas: ["تونس العاصمة", "صفاقس", "سوسة", "نابل", "المنستير", "جميع مناطق تونس"]
            }
        ];
        
        // إضافة العلامات للخريطة
        locations.forEach(location => {
            // إنشاء أيقونة مخصصة
            const iconHtml = `
                <div style="
                    width: 45px;
                    height: 45px;
                    background: ${location.color};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.2rem;
                    border: 3px solid white;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    animation: pulse 2s infinite;
                ">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
            `;
            
            const customIcon = L.divIcon({
                html: iconHtml,
                className: 'custom-marker',
                iconSize: [45, 45],
                iconAnchor: [22, 45]
            });
            
            // إنشاء محتوى النافذة المنبثقة
            const popupContent = `
                <div style="padding: 15px; font-family: 'Cairo', sans-serif; direction: rtl; min-width: 250px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                        <img src="${location.flag}" alt="${location.country}" 
                             style="width: 35px; height: 23px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        <div>
                            <h3 style="color: ${location.color}; margin: 0; font-size: 1.1rem; font-weight: 700;">
                                ${location.country}
                            </h3>
                            <p style="margin: 5px 0 0; color: #666; font-size: 0.9rem;">${location.name}</p>
                        </div>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                        <p style="margin: 0 0 8px; color: #333;">
                            <i class="fas fa-phone" style="color: ${location.color}; margin-left: 5px;"></i>
                            <strong>الهاتف:</strong> ${location.phone}
                        </p>
                        <div style="display: flex; gap: 8px; margin-top: 10px;">
                            <a href="https://wa.me/${location.whatsapp}" 
                               target="_blank"
                               style="flex: 1; background: #25D366; color: white; padding: 8px 12px; border-radius: 6px; 
                                      text-decoration: none; text-align: center; font-size: 0.9rem; transition: all 0.3s;">
                                <i class="fab fa-whatsapp"></i> واتساب
                            </a>
                            <a href="tel:${location.phone.replace(/\s+/g, '')}" 
                               style="flex: 1; background: ${location.color}; color: white; padding: 8px 12px; border-radius: 6px; 
                                      text-decoration: none; text-align: center; font-size: 0.9rem; transition: all 0.3s;">
                                <i class="fas fa-phone"></i> اتصل
                            </a>
                        </div>
                    </div>
                    
                    <div style="margin-top: 15px;">
                        <p style="margin: 0 0 8px; color: #333; font-size: 0.9rem;">
                            <i class="fas fa-check-circle" style="color: #28a745; margin-left: 5px;"></i>
                            <strong>مناطق التغطية:</strong>
                        </p>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
                            ${location.areas.slice(0, 4).map(area => `
                                <span style="background: rgba(212, 175, 55, 0.1); color: #D4AF37; padding: 4px 8px; 
                                             border-radius: 4px; font-size: 0.8rem; text-align: center;">
                                    ${area}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // إضافة العلامة
            const marker = L.marker(location.position, {
                icon: customIcon,
                title: location.name
            }).addTo(map);
            
            // إضافة النافذة المنبثقة
            marker.bindPopup(popupContent);
            
            // إضافة تأثير عند النقر
            marker.on('click', function() {
                this.openPopup();
            });
            
            // إضافة تأثير hover
            marker.on('mouseover', function() {
                this._icon.style.transform = 'scale(1.1)';
                this._icon.style.transition = 'transform 0.3s';
            });
            
            marker.on('mouseout', function() {
                this._icon.style.transform = 'scale(1)';
            });
        });
        
        // رسم خط بين المواقع
        const linePoints = locations.map(loc => loc.position);
        L.polyline(linePoints, {
            color: '#D4AF37',
            weight: 2,
            opacity: 0.6,
            dashArray: '10, 10'
        }).addTo(map);
        
        // ضبط مدى الخريطة ليشمل جميع المواقع
        const bounds = L.latLngBounds(locations.map(loc => loc.position));
        map.fitBounds(bounds, { padding: [50, 50] });
        
        // إضافة عناصر التحكم
        L.control.zoom({
            position: 'topright'
        }).addTo(map);
        
        // إضافة شعار الشركة
        const logoControl = L.control({ position: 'bottomright' });
        logoControl.onAdd = function() {
            const div = L.DomUtil.create('div', 'map-logo');
            div.innerHTML = `
                <div style="background: rgba(255, 255, 255, 0.95); padding: 8px 15px; border-radius: 8px; 
                            box-shadow: 0 3px 15px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 10px;">
                    <span style="color: #D4AF37; font-weight: 700; font-size: 1rem;">HELA Express</span>
                    <span style="color: #666; font-size: 0.8rem;">قطر - تونس</span>
                </div>
            `;
            return div;
        };
        logoControl.addTo(map);
        
        // إضافة CSS للرسوم المتحركة
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 3px 10px rgba(0,0,0,0.3); }
                50% { transform: scale(1.05); box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
                100% { transform: scale(1); box-shadow: 0 3px 10px rgba(0,0,0,0.3); }
            }
            
            .leaflet-popup-content-wrapper {
                border-radius: 12px !important;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
            }
            
            .leaflet-popup-content a:hover {
                opacity: 0.9;
                transform: translateY(-2px);
            }
            
            .leaflet-control-zoom {
                border: none !important;
                border-radius: 8px !important;
                overflow: hidden;
                box-shadow: 0 3px 15px rgba(0,0,0,0.1) !important;
            }
            
            .leaflet-control-zoom a {
                background: white !important;
                color: #D4AF37 !important;
                border-bottom: 1px solid #f0f0f0 !important;
                transition: all 0.3s !important;
            }
            
            .leaflet-control-zoom a:hover {
                background: #D4AF37 !important;
                color: white !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ تم تهيئة الخريطة بنجاح!');
        return true;
        
    } catch (error) {
        console.error('❌ خطأ في تهيئة الخريطة:', error);
        throw error;
    }
}

// جعل الدالة متاحة عالمياً
window.initContactMap = initContactMap;

// لا نبدأ التهيئة تلقائياً، سنترك ذلك للصفحة الرئيسية