"use strict";

// home.js - Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
  console.log('🏠 Home page scripts initializing...'); // ================= ADVANCED SLIDER EFFECTS =================

  function initSliderEffects() {
    var heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return; // Create particle effect

    function createParticles() {
      var particleContainer = document.createElement('div');
      particleContainer.className = 'slider-particles';
      particleContainer.style.cssText = "\n                position: absolute;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                pointer-events: none;\n                z-index: 2;\n                overflow: hidden;\n            ";
      heroSlider.appendChild(particleContainer); // Create multiple particles

      for (var i = 0; i < 20; i++) {
        var particle = document.createElement('div');
        particle.style.cssText = "\n                    position: absolute;\n                    width: ".concat(Math.random() * 3 + 1, "px;\n                    height: ").concat(Math.random() * 3 + 1, "px;\n                    background: rgba(212, 175, 55, ").concat(Math.random() * 0.3 + 0.3, ");\n                    border-radius: 50%;\n                    top: ").concat(Math.random() * 100, "%;\n                    left: ").concat(Math.random() * 100, "%;\n                    animation: floatParticle ").concat(Math.random() * 15 + 10, "s linear infinite;\n                    animation-delay: ").concat(Math.random() * 5, "s;\n                ");
        particleContainer.appendChild(particle);
      }
    } // Add parallax effect to slide content


    function initParallaxEffect() {
      var slideContents = document.querySelectorAll('.slide-content');
      heroSlider.addEventListener('mousemove', function (e) {
        var x = e.clientX / window.innerWidth * 100;
        var y = e.clientY / window.innerHeight * 100;
        slideContents.forEach(function (content) {
          if (content.parentElement.parentElement.classList.contains('active')) {
            content.style.transform = "\n                            translateX(".concat((x - 50) * 0.02, "px) \n                            translateY(").concat((y - 50) * 0.02, "px)\n                        ");
          }
        });
      });
      heroSlider.addEventListener('mouseleave', function () {
        slideContents.forEach(function (content) {
          content.style.transform = '';
        });
      });
    } // Add typing effect to slide titles


    function initTypingEffect() {
      var slides = document.querySelectorAll('.slide');
      slides.forEach(function (slide) {
        var title = slide.querySelector('h1');

        if (title) {
          var originalText = title.textContent;
          title.dataset.originalText = originalText;
          title.textContent = ''; // Start typing when slide becomes active

          var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                typeText(title, originalText);
              } else {
                title.textContent = originalText;
              }
            });
          }, {
            threshold: 0.5
          });
          observer.observe(slide);
        }
      });

      function typeText(element, text) {
        element.textContent = '';
        var i = 0;

        function typeChar() {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 50);
          }
        } // Start typing after slide transition


        setTimeout(typeChar, 500);
      }
    } // Add glow effect to active slide


    function initGlowEffect() {
      var slides = document.querySelectorAll('.slide');
      setInterval(function () {
        slides.forEach(function (slide) {
          if (slide.classList.contains('active')) {
            var overlay = slide.querySelector('.slide-overlay');

            if (overlay) {
              overlay.style.boxShadow = "\n                                inset 0 0 60px rgba(212, 175, 55, 0.1),\n                                inset 0 0 100px rgba(212, 175, 55, 0.05)\n                            "; // Pulsing effect

              setTimeout(function () {
                overlay.style.boxShadow = '';
              }, 1000);
            }
          }
        });
      }, 3000);
    } // Initialize all effects


    createParticles();
    initParallaxEffect(); // initTypingEffect(); // Uncomment for typing effect

    initGlowEffect();
    console.log('✨ Slider effects initialized');
  } // ================= ENHANCED FEATURE CARDS =================


  function initEnhancedFeatures() {
    var featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(function (card, index) {
      // Add staggered animation delay
      card.style.animationDelay = "".concat(index * 0.1, "s");
      card.style.animation = 'float 6s ease-in-out infinite'; // Add hover glow effect

      card.addEventListener('mouseenter', function () {
        this.style.boxShadow = "\n                    0 25px 50px rgba(212, 175, 55, 0.2),\n                    0 0 100px rgba(212, 175, 55, 0.1)\n                ";
        this.style.transform = 'translateY(-15px) scale(1.03)';
        var icon = this.querySelector('.feature-icon');

        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(10deg)';
          icon.style.boxShadow = '0 15px 30px rgba(212, 175, 55, 0.4)';
          icon.style.background = 'linear-gradient(135deg, var(--gold), var(--gold-light))';
          icon.style.color = 'var(--white)';
        }
      });
      card.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
        this.style.transform = '';
        var icon = this.querySelector('.feature-icon');

        if (icon) {
          icon.style.transform = '';
          icon.style.boxShadow = '';
          icon.style.background = '';
          icon.style.color = '';
        }
      }); // Add click effect

      card.addEventListener('click', function () {
        var _this = this;

        this.style.transform = 'scale(0.98)';
        setTimeout(function () {
          _this.style.transform = '';
        }, 150);
      });
    });
    console.log('✨ Enhanced features initialized');
  } // ================= ENHANCED TIMELINE =================


  function initEnhancedTimeline() {
    var timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach(function (step, index) {
      // Add connection lines between steps
      if (index < timelineSteps.length - 1) {
        var line = document.createElement('div');
        line.className = 'timeline-connector';
        line.style.cssText = "\n                    position: absolute;\n                    right: 50%;\n                    top: 60px;\n                    width: 2px;\n                    height: 60px;\n                    background: linear-gradient(to bottom, \n                        rgba(212, 175, 55, 0.3) 0%,\n                        rgba(212, 175, 55, 0.6) 50%,\n                        rgba(212, 175, 55, 0.3) 100%);\n                    transform: translateX(50%);\n                    z-index: 1;\n                    opacity: 0;\n                    transition: opacity 0.6s ease;\n                ";
        step.appendChild(line);
      } // Add hover effects


      step.addEventListener('mouseenter', function () {
        var stepNumber = this.querySelector('.step-number');
        var stepContent = this.querySelector('.step-content');
        var connector = this.querySelector('.timeline-connector');

        if (stepNumber) {
          stepNumber.style.transform = 'scale(1.2) rotate(15deg)';
          stepNumber.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.6)';
        }

        if (stepContent) {
          stepContent.style.transform = 'translateY(-8px)';
          stepContent.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        }

        if (connector) {
          connector.style.opacity = '1';
          connector.style.height = '80px';
        }
      });
      step.addEventListener('mouseleave', function () {
        var stepNumber = this.querySelector('.step-number');
        var stepContent = this.querySelector('.step-content');
        var connector = this.querySelector('.timeline-connector');

        if (stepNumber) {
          stepNumber.style.transform = '';
          stepNumber.style.boxShadow = '';
        }

        if (stepContent) {
          stepContent.style.transform = '';
          stepContent.style.boxShadow = '';
        }

        if (connector) {
          connector.style.opacity = '0.5';
          connector.style.height = '60px';
        }
      }); // Add click animation

      step.addEventListener('click', function () {
        var stepNumber = this.querySelector('.step-number');

        if (stepNumber) {
          stepNumber.style.animation = 'bounce 0.5s ease';
          setTimeout(function () {
            stepNumber.style.animation = '';
          }, 500);
        }
      });
    });
    console.log('✨ Enhanced timeline initialized');
  } // ================= ENHANCED TESTIMONIALS =================


  function initEnhancedTestimonials() {
    var testimonialSlides = document.querySelectorAll('.testimonial-slide');
    testimonialSlides.forEach(function (slide) {
      // Add avatar animation
      var avatar = slide.querySelector('.client-avatar');

      if (avatar) {
        avatar.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'; // Add subtle border animation

        setInterval(function () {
          if (slide.classList.contains('active')) {
            avatar.style.borderColor = 'var(--gold)';
            setTimeout(function () {
              avatar.style.borderColor = '';
            }, 1000);
          }
        }, 3000);
      } // Add quote mark animation


      var content = slide.querySelector('.testimonial-content');

      if (content) {
        var quoteMark = document.createElement('div');
        quoteMark.innerHTML = '<i class="fas fa-quote-right"></i>';
        quoteMark.style.cssText = "\n                    position: absolute;\n                    top: -20px;\n                    right: 20px;\n                    font-size: 3rem;\n                    color: rgba(212, 175, 55, 0.1);\n                    z-index: 0;\n                ";
        content.style.position = 'relative';
        content.appendChild(quoteMark);
      } // Add hover effect


      slide.addEventListener('mouseenter', function () {
        if (this.classList.contains('active')) {
          this.style.transform = 'translateY(-5px) scale(1.02)';
          this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.25)';

          var _avatar = this.querySelector('.client-avatar');

          if (_avatar) {
            _avatar.style.transform = 'scale(1.1) rotate(5deg)';
          }
        }
      });
      slide.addEventListener('mouseleave', function () {
        if (this.classList.contains('active')) {
          this.style.transform = '';
          this.style.boxShadow = '';

          var _avatar2 = this.querySelector('.client-avatar');

          if (_avatar2) {
            _avatar2.style.transform = '';
          }
        }
      });
    });
    console.log('✨ Enhanced testimonials initialized');
  } // ================= ENHANCED CTA SECTION =================


  function initEnhancedCTA() {
    var ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return; // Add floating animation to features

    var features = ctaSection.querySelectorAll('.cta-feature');
    features.forEach(function (feature, index) {
      feature.style.animationDelay = "".concat(index * 0.2, "s");
      feature.style.animation = 'float 4s ease-in-out infinite'; // Add hover effect

      feature.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.2)';
        var icon = this.querySelector('i');

        if (icon) {
          icon.style.transform = 'scale(1.3)';
          icon.style.color = 'var(--gold-light)';
        }
      });
      feature.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
        var icon = this.querySelector('i');

        if (icon) {
          icon.style.transform = '';
          icon.style.color = '';
        }
      });
    }); // Add ripple effect to CTA buttons

    var ctaButtons = ctaSection.querySelectorAll('.cta-btn');
    ctaButtons.forEach(function (btn) {
      // Add shine effect on hover
      btn.addEventListener('mouseenter', function () {
        var shine = document.createElement('div');
        shine.className = 'btn-shine';
        shine.style.cssText = "\n                    position: absolute;\n                    top: -50%;\n                    left: -50%;\n                    width: 200%;\n                    height: 200%;\n                    background: linear-gradient(\n                        to right,\n                        transparent 0%,\n                        rgba(255, 255, 255, 0.3) 50%,\n                        transparent 100%\n                    );\n                    transform: rotate(30deg);\n                    transition: left 0.6s;\n                ";
        this.appendChild(shine);
        setTimeout(function () {
          shine.style.left = '150%';
        }, 10);
        setTimeout(function () {
          if (shine.parentNode) {
            shine.remove();
          }
        }, 600);
      });
    }); // Add pulse animation to CTA section

    setInterval(function () {
      ctaSection.style.boxShadow = 'inset 0 0 100px rgba(212, 175, 55, 0.1)';
      setTimeout(function () {
        ctaSection.style.boxShadow = '';
      }, 1000);
    }, 5000);
    console.log('✨ Enhanced CTA initialized');
  } // ================= BACKGROUND ANIMATIONS =================


  function initBackgroundAnimations() {
    // Add animated gradient to why-choose section
    var whyChooseSection = document.querySelector('.why-choose');

    if (whyChooseSection) {
      var gradient = document.createElement('div');
      gradient.className = 'animated-gradient';
      gradient.style.cssText = "\n                position: absolute;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                background: linear-gradient(\n                    45deg,\n                    rgba(212, 175, 55, 0.05) 0%,\n                    rgba(212, 175, 55, 0.02) 25%,\n                    rgba(212, 175, 55, 0.05) 50%,\n                    rgba(212, 175, 55, 0.02) 75%,\n                    rgba(212, 175, 55, 0.05) 100%\n                );\n                background-size: 400% 400%;\n                animation: gradientShift 20s ease infinite;\n                z-index: 0;\n                pointer-events: none;\n            ";
      whyChooseSection.style.position = 'relative';
      whyChooseSection.insertBefore(gradient, whyChooseSection.firstChild);
    } // Add CSS for gradient animation


    var style = document.createElement('style');
    style.textContent = "\n            @keyframes floatParticle {\n                0% {\n                    transform: translateY(0) translateX(0);\n                    opacity: 0;\n                }\n                10% {\n                    opacity: 1;\n                }\n                90% {\n                    opacity: 1;\n                }\n                100% {\n                    transform: translateY(-100vh) translateX(".concat(Math.random() * 100 - 50, "px);\n                    opacity: 0;\n                }\n            }\n            \n            @keyframes gradientShift {\n                0% {\n                    background-position: 0% 50%;\n                }\n                50% {\n                    background-position: 100% 50%;\n                }\n                100% {\n                    background-position: 0% 50%;\n                }\n            }\n            \n            .btn-shine {\n                pointer-events: none;\n            }\n        ");
    document.head.appendChild(style);
    console.log('✨ Background animations initialized');
  } // ================= INTERACTIVE ELEMENTS =================


  function initInteractiveElements() {
    // Add click animation to all buttons
    var buttons = document.querySelectorAll('.btn, .cta-btn, .nav-cta');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        // Create click effect
        var clickEffect = document.createElement('div');
        clickEffect.style.cssText = "\n                    position: absolute;\n                    width: 100px;\n                    height: 100px;\n                    background: rgba(255, 255, 255, 0.3);\n                    border-radius: 50%;\n                    transform: scale(0);\n                    animation: clickRipple 0.6s linear;\n                    pointer-events: none;\n                    left: ".concat(e.offsetX - 50, "px;\n                    top: ").concat(e.offsetY - 50, "px;\n                ");
        this.appendChild(clickEffect);
        setTimeout(function () {
          clickEffect.remove();
        }, 600);
      });
    }); // Add CSS for click ripple

    var style = document.createElement('style');
    style.textContent = "\n            @keyframes clickRipple {\n                to {\n                    transform: scale(4);\n                    opacity: 0;\n                }\n            }\n        ";
    document.head.appendChild(style); // Add hover sound effect (optional)

    var interactiveElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-slide');
    interactiveElements.forEach(function (element) {
      element.addEventListener('mouseenter', function () {// Optional: Add subtle sound effect here
        // const hoverSound = new Audio('hover.mp3');
        // hoverSound.volume = 0.1;
        // hoverSound.play();
      });
    });
    console.log('✨ Interactive elements initialized');
  } // ================= INITIALIZE HOME PAGE =================


  function initHomePage() {
    console.log('🚀 Initializing home page enhancements...'); // Initialize all home page features

    initSliderEffects();
    initEnhancedFeatures();
    initEnhancedTimeline();
    initEnhancedTestimonials();
    initEnhancedCTA();
    initBackgroundAnimations();
    initInteractiveElements(); // Add special class to body for home page

    document.body.classList.add('home-page'); // Add welcome message in console

    console.log('%c✨ Welcome to Tn-QA Delivery! ✨', 'color: #D4AF37; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c🚀 Premium delivery services between Qatar and Tunisia', 'color: #ffffff; font-size: 14px;');
    console.log('🎉 Home page fully enhanced!');
  } // Start initialization


  initHomePage(); // Listen for language changes to re-initialize effects

  window.addEventListener('languageChanged', function () {
    setTimeout(initHomePage, 100);
  }); // Listen for theme changes to adjust effects

  window.addEventListener('themeChanged', function () {
    setTimeout(initHomePage, 100);
  });
});
//# sourceMappingURL=main.dev.js.map
