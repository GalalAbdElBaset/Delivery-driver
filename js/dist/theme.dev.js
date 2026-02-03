"use strict";

// theme.js - Theme switching functionality with colored FontAwesome icons
var themeToggle = document.getElementById('themeToggle');
var floatThemeToggle = document.getElementById('floatThemeToggle'); // Colors configuration

var themeColors = {
  light: {
    sun: '#d4af37',
    // ذهبي للشمس في الوضع الفاتح
    moon: '#666666' // رمادي للقمر في الوضع الفاتح

  },
  dark: {
    sun: '#666666',
    // رمادي للشمس في الوضع الداكن
    moon: '#f0f0f0' // رمادي فاتح/أبيض للقمر في الوضع الداكن

  }
}; // Initialize theme

function initTheme() {
  var savedTheme = localStorage.getItem('theme') || 'light';
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Use saved theme, or system preference, or default to light

  var currentTheme;

  if (savedTheme === 'system') {
    currentTheme = prefersDark ? 'dark' : 'light';
  } else {
    currentTheme = savedTheme;
  } // Apply theme


  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcons(true);
    updateIconColors(true);
  } else {
    document.body.classList.remove('dark-theme');
    updateThemeIcons(false);
    updateIconColors(false);
  } // Update theme button text based on current language


  updateThemeButtonText();
  return currentTheme;
} // Update theme icons visibility - FIXED VERSION


function updateThemeIcons(isDark) {
  console.log('Updating theme icons. Is dark?', isDark); // FIRST: Always show both icons initially, then hide/show based on theme

  var sunIcons = document.querySelectorAll('.fa-sun');
  var moonIcons = document.querySelectorAll('.fa-moon');
  console.log("Found ".concat(sunIcons.length, " sun icons and ").concat(moonIcons.length, " moon icons")); // SIMPLE APPROACH: Just toggle visibility

  sunIcons.forEach(function (icon) {
    if (isDark) {
      icon.style.display = 'none';
      icon.style.visibility = 'hidden';
      icon.style.opacity = '0';
    } else {
      icon.style.display = 'inline-block';
      icon.style.visibility = 'visible';
      icon.style.opacity = '1';
    }
  });
  moonIcons.forEach(function (icon) {
    if (isDark) {
      icon.style.display = 'inline-block';
      icon.style.visibility = 'visible';
      icon.style.opacity = '1';
    } else {
      icon.style.display = 'none';
      icon.style.visibility = 'hidden';
      icon.style.opacity = '0';
    }
  }); // BETTER APPROACH: Use data attributes

  sunIcons.forEach(function (icon) {
    icon.setAttribute('data-theme', isDark ? 'hidden' : 'visible');
  });
  moonIcons.forEach(function (icon) {
    icon.setAttribute('data-theme', isDark ? 'visible' : 'hidden');
  });
} // Update icon colors based on theme


function updateIconColors(isDark) {
  var colors = isDark ? themeColors.dark : themeColors.light; // Update sun icons color - always update even if hidden

  document.querySelectorAll('.fa-sun').forEach(function (icon) {
    icon.style.color = colors.sun;
    icon.style.transition = 'color 0.3s ease, opacity 0.3s ease';
  }); // Update moon icons color - always update even if hidden

  document.querySelectorAll('.fa-moon').forEach(function (icon) {
    icon.style.color = colors.moon;
    icon.style.transition = 'color 0.3s ease, opacity 0.3s ease';
  }); // Update theme toggle button colors

  var themeButtons = document.querySelectorAll('.theme-btn, .float-theme');
  themeButtons.forEach(function (btn) {
    btn.style.transition = 'all 0.3s ease';

    if (isDark) {
      // Dark theme button styling
      btn.style.color = colors.moon;
      btn.style.borderColor = colors.moon;
    } else {
      // Light theme button styling
      btn.style.color = colors.sun;
      btn.style.borderColor = colors.sun;
    }
  });
} // Update theme button text


function updateThemeButtonText() {
  var themeTextElements = document.querySelectorAll('.theme-text');
  if (themeTextElements.length === 0) return;
  var isDark = document.body.classList.contains('dark-theme');
  var currentLang = localStorage.getItem('language') || 'ar';
  themeTextElements.forEach(function (themeText) {
    // Update text
    if (currentLang === 'ar') {
      themeText.textContent = isDark ? 'داكن' : 'فاتح';
    } else {
      themeText.textContent = isDark ? 'Dark' : 'Light';
    } // Update text color based on theme


    if (isDark) {
      themeText.style.color = themeColors.dark.moon;
    } else {
      themeText.style.color = themeColors.light.sun;
    }
  });
} // Toggle theme


function toggleTheme() {
  var wasDark = document.body.classList.contains('dark-theme');
  var isNowDark = !wasDark;
  console.log("Toggling theme from ".concat(wasDark ? 'dark' : 'light', " to ").concat(isNowDark ? 'dark' : 'light'));

  if (isNowDark) {
    // Switch to dark theme
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    console.log('Switched to dark theme - should show moon, hide sun');
  } else {
    // Switch to light theme
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    console.log('Switched to light theme - should show sun, hide moon');
  } // Update UI elements


  updateThemeIcons(isNowDark);
  updateIconColors(isNowDark);
  updateThemeButtonText(); // Log icon status for debugging

  setTimeout(function () {
    var sunIcons = document.querySelectorAll('.fa-sun');
    var moonIcons = document.querySelectorAll('.fa-moon');
    console.log("After toggle: Sun icons visible: ".concat(Array.from(sunIcons).filter(function (i) {
      return i.style.display !== 'none';
    }).length));
    console.log("After toggle: Moon icons visible: ".concat(Array.from(moonIcons).filter(function (i) {
      return i.style.display !== 'none';
    }).length));
  }, 100); // Trigger custom event for theme change

  window.dispatchEvent(new CustomEvent('themeChanged', {
    detail: {
      isDark: isNowDark,
      theme: isNowDark ? 'dark' : 'light'
    }
  }));
} // Add CSS styles for theme icons - SIMPLIFIED VERSION


function addThemeStyles() {
  if (!document.getElementById('theme-icon-styles')) {
    var style = document.createElement('style');
    style.id = 'theme-icon-styles';
    style.textContent = "\n            /* Theme icon base styles */\n            .theme-btn i, .float-theme i {\n                transition: all 0.3s ease !important;\n                font-size: 1.2rem !important;\n                display: inline-block !important;\n            }\n            \n            /* Ensure proper icon display */\n            .fa-sun, .fa-moon {\n                display: inline-block !important;\n                transition: opacity 0.3s ease, visibility 0.3s ease !important;\n            }\n            \n            /* Light theme - show sun, hide moon */\n            body:not(.dark-theme) .fa-sun {\n                display: inline-block !important;\n                visibility: visible !important;\n                opacity: 1 !important;\n                color: ".concat(themeColors.light.sun, " !important;\n            }\n            \n            body:not(.dark-theme) .fa-moon {\n                display: none !important;\n                visibility: hidden !important;\n                opacity: 0 !important;\n                color: ").concat(themeColors.light.moon, " !important;\n            }\n            \n            /* Dark theme - show moon, hide sun */\n            body.dark-theme .fa-sun {\n                display: none !important;\n                visibility: hidden !important;\n                opacity: 0 !important;\n                color: ").concat(themeColors.dark.sun, " !important;\n            }\n            \n            body.dark-theme .fa-moon {\n                display: inline-block !important;\n                visibility: visible !important;\n                opacity: 1 !important;\n                color: ").concat(themeColors.dark.moon, " !important;\n            }\n            \n            /* Theme text styling */\n            .theme-text {\n                transition: color 0.3s ease;\n                font-weight: 500;\n                margin-right: 8px;\n            }\n            \n            /* Theme button hover effects */\n            .theme-btn:hover i, .float-theme:hover i {\n                transform: scale(1.1);\n            }\n            \n            /* Floating theme button */\n            .float-theme {\n                background: var(--card-bg) !important;\n                border: 2px solid !important;\n                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;\n                transition: all 0.3s ease !important;\n            }\n            \n            body:not(.dark-theme) .float-theme {\n                border-color: ").concat(themeColors.light.sun, " !important;\n                color: ").concat(themeColors.light.sun, " !important;\n            }\n            \n            body.dark-theme .float-theme {\n                border-color: ").concat(themeColors.dark.moon, " !important;\n                color: ").concat(themeColors.dark.moon, " !important;\n            }\n        ");
    document.head.appendChild(style);
    console.log('Added theme icon styles');
  }
} // Emergency fix for icon visibility


function forceIconVisibility() {
  var isDark = document.body.classList.contains('dark-theme');
  console.log('Force fixing icon visibility. Current theme:', isDark ? 'dark' : 'light'); // Remove all inline styles that might be hiding icons

  document.querySelectorAll('.fa-sun, .fa-moon').forEach(function (icon) {
    icon.style.cssText = ''; // Clear all inline styles
  }); // Re-apply theme

  updateThemeIcons(isDark);
  updateIconColors(isDark);
} // Initialize on DOM loaded


document.addEventListener('DOMContentLoaded', function () {
  console.log('Initializing theme system...'); // Add theme styles

  addThemeStyles(); // Initialize theme

  initTheme(); // Emergency fix after a short delay

  setTimeout(forceIconVisibility, 500); // Add event listeners to theme toggles

  if (themeToggle) {
    themeToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Main theme button clicked');
      toggleTheme(); // Force fix after toggle

      setTimeout(forceIconVisibility, 100);
    });
    console.log('Main theme toggle button initialized');
  } else {
    console.warn('Main theme toggle button not found');
  }

  if (floatThemeToggle) {
    floatThemeToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Floating theme button clicked');
      toggleTheme(); // Force fix after toggle

      setTimeout(forceIconVisibility, 100);
    });
    console.log('Floating theme toggle button initialized');
  } else {
    console.warn('Floating theme toggle button not found');
  } // Listen for system theme changes


  var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addEventListener('change', function (e) {
    var savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'system') {
      console.log('System theme changed to:', e.matches ? 'dark' : 'light');
      initTheme();
      forceIconVisibility();
    }
  }); // Listen for language changes to update button text

  window.addEventListener('languageChanged', function () {
    console.log('Language changed, updating theme button...');
    updateThemeButtonText();
  });
}); // Make functions available globally

window.initTheme = initTheme;
window.toggleTheme = toggleTheme;
window.updateThemeButtonText = updateThemeButtonText;
window.updateIconColors = updateIconColors;
window.forceIconVisibility = forceIconVisibility; // Debug function

window.themeDebug = {
  getCurrentTheme: function getCurrentTheme() {
    var isDark = document.body.classList.contains('dark-theme');
    return {
      theme: isDark ? 'dark' : 'light',
      colors: isDark ? themeColors.dark : themeColors.light,
      saved: localStorage.getItem('theme') || 'light'
    };
  },
  forceTheme: function forceTheme(theme) {
    console.log('Debug: Forcing theme to', theme);

    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }

    forceIconVisibility();
    updateThemeButtonText();
  },
  checkIcons: function checkIcons() {
    var sunIcons = document.querySelectorAll('.fa-sun');
    var moonIcons = document.querySelectorAll('.fa-moon');
    var visibleSun = Array.from(sunIcons).filter(function (i) {
      return i.style.display !== 'none' && i.style.visibility !== 'hidden' && i.style.opacity !== '0';
    }).length;
    var visibleMoon = Array.from(moonIcons).filter(function (i) {
      return i.style.display !== 'none' && i.style.visibility !== 'hidden' && i.style.opacity !== '0';
    }).length;
    console.log("Sun icons: ".concat(sunIcons.length, " total, ").concat(visibleSun, " visible"));
    console.log("Moon icons: ".concat(moonIcons.length, " total, ").concat(visibleMoon, " visible"));
    sunIcons.forEach(function (icon, i) {
      console.log("Sun ".concat(i + 1, ": display=").concat(icon.style.display, ", visibility=").concat(icon.style.visibility, ", opacity=").concat(icon.style.opacity));
    });
    moonIcons.forEach(function (icon, i) {
      console.log("Moon ".concat(i + 1, ": display=").concat(icon.style.display, ", visibility=").concat(icon.style.visibility, ", opacity=").concat(icon.style.opacity));
    });
    return {
      sun: {
        total: sunIcons.length,
        visible: visibleSun
      },
      moon: {
        total: moonIcons.length,
        visible: visibleMoon
      }
    };
  },
  resetIcons: function resetIcons() {
    console.log('Debug: Resetting all icon styles');
    document.querySelectorAll('.fa-sun, .fa-moon').forEach(function (icon) {
      icon.style.cssText = '';
    });
    forceIconVisibility();
  }
};
//# sourceMappingURL=theme.dev.js.map
