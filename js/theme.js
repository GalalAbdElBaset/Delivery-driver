// theme.js - Theme switching functionality with colored FontAwesome icons

const themeToggle = document.getElementById('themeToggle');
const floatThemeToggle = document.getElementById('floatThemeToggle');

// Colors configuration
const themeColors = {
    light: {
        sun: '#d4af37', // ذهبي للشمس في الوضع الفاتح
        moon: '#666666'  // رمادي للقمر في الوضع الفاتح
    },
    dark: {
        sun: '#666666',  // رمادي للشمس في الوضع الداكن
        moon: '#f0f0f0'  // رمادي فاتح/أبيض للقمر في الوضع الداكن
    }
};

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved theme, or system preference, or default to light
    let currentTheme;
    
    if (savedTheme === 'system') {
        currentTheme = prefersDark ? 'dark' : 'light';
    } else {
        currentTheme = savedTheme;
    }
    
    // Apply theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcons(true);
        updateIconColors(true);
    } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcons(false);
        updateIconColors(false);
    }
    
    // Update theme button text based on current language
    updateThemeButtonText();
    
    return currentTheme;
}

// Update theme icons visibility - FIXED VERSION
function updateThemeIcons(isDark) {
    console.log('Updating theme icons. Is dark?', isDark);
    
    // FIRST: Always show both icons initially, then hide/show based on theme
    const sunIcons = document.querySelectorAll('.fa-sun');
    const moonIcons = document.querySelectorAll('.fa-moon');
    
    console.log(`Found ${sunIcons.length} sun icons and ${moonIcons.length} moon icons`);
    
    // SIMPLE APPROACH: Just toggle visibility
    sunIcons.forEach(icon => {
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
    
    moonIcons.forEach(icon => {
        if (isDark) {
            icon.style.display = 'inline-block';
            icon.style.visibility = 'visible';
            icon.style.opacity = '1';
        } else {
            icon.style.display = 'none';
            icon.style.visibility = 'hidden';
            icon.style.opacity = '0';
        }
    });
    
    // BETTER APPROACH: Use data attributes
    sunIcons.forEach(icon => {
        icon.setAttribute('data-theme', isDark ? 'hidden' : 'visible');
    });
    
    moonIcons.forEach(icon => {
        icon.setAttribute('data-theme', isDark ? 'visible' : 'hidden');
    });
}

// Update icon colors based on theme
function updateIconColors(isDark) {
    const colors = isDark ? themeColors.dark : themeColors.light;
    
    // Update sun icons color - always update even if hidden
    document.querySelectorAll('.fa-sun').forEach(icon => {
        icon.style.color = colors.sun;
        icon.style.transition = 'color 0.3s ease, opacity 0.3s ease';
    });
    
    // Update moon icons color - always update even if hidden
    document.querySelectorAll('.fa-moon').forEach(icon => {
        icon.style.color = colors.moon;
        icon.style.transition = 'color 0.3s ease, opacity 0.3s ease';
    });
    
    // Update theme toggle button colors
    const themeButtons = document.querySelectorAll('.theme-btn, .float-theme');
    themeButtons.forEach(btn => {
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
}

// Update theme button text
function updateThemeButtonText() {
    const themeTextElements = document.querySelectorAll('.theme-text');
    if (themeTextElements.length === 0) return;
    
    const isDark = document.body.classList.contains('dark-theme');
    const currentLang = localStorage.getItem('language') || 'ar';
    
    themeTextElements.forEach(themeText => {
        // Update text
        if (currentLang === 'ar') {
            themeText.textContent = isDark ? 'داكن' : 'فاتح';
        } else {
            themeText.textContent = isDark ? 'Dark' : 'Light';
        }
        
        // Update text color based on theme
        if (isDark) {
            themeText.style.color = themeColors.dark.moon;
        } else {
            themeText.style.color = themeColors.light.sun;
        }
    });
}

// Toggle theme
function toggleTheme() {
    const wasDark = document.body.classList.contains('dark-theme');
    const isNowDark = !wasDark;
    
    console.log(`Toggling theme from ${wasDark ? 'dark' : 'light'} to ${isNowDark ? 'dark' : 'light'}`);
    
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
    }
    
    // Update UI elements
    updateThemeIcons(isNowDark);
    updateIconColors(isNowDark);
    updateThemeButtonText();
    
    // Log icon status for debugging
    setTimeout(() => {
        const sunIcons = document.querySelectorAll('.fa-sun');
        const moonIcons = document.querySelectorAll('.fa-moon');
        console.log(`After toggle: Sun icons visible: ${Array.from(sunIcons).filter(i => i.style.display !== 'none').length}`);
        console.log(`After toggle: Moon icons visible: ${Array.from(moonIcons).filter(i => i.style.display !== 'none').length}`);
    }, 100);
    
    // Trigger custom event for theme change
    window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { 
            isDark: isNowDark,
            theme: isNowDark ? 'dark' : 'light'
        } 
    }));
}

// Add CSS styles for theme icons - SIMPLIFIED VERSION
function addThemeStyles() {
    if (!document.getElementById('theme-icon-styles')) {
        const style = document.createElement('style');
        style.id = 'theme-icon-styles';
        style.textContent = `
            /* Theme icon base styles */
            .theme-btn i, .float-theme i {
                transition: all 0.3s ease !important;
                font-size: 1.2rem !important;
                display: inline-block !important;
            }
            
            /* Ensure proper icon display */
            .fa-sun, .fa-moon {
                display: inline-block !important;
                transition: opacity 0.3s ease, visibility 0.3s ease !important;
            }
            
            /* Light theme - show sun, hide moon */
            body:not(.dark-theme) .fa-sun {
                display: inline-block !important;
                visibility: visible !important;
                opacity: 1 !important;
                color: ${themeColors.light.sun} !important;
            }
            
            body:not(.dark-theme) .fa-moon {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                color: ${themeColors.light.moon} !important;
            }
            
            /* Dark theme - show moon, hide sun */
            body.dark-theme .fa-sun {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                color: ${themeColors.dark.sun} !important;
            }
            
            body.dark-theme .fa-moon {
                display: inline-block !important;
                visibility: visible !important;
                opacity: 1 !important;
                color: ${themeColors.dark.moon} !important;
            }
            
            /* Theme text styling */
            .theme-text {
                transition: color 0.3s ease;
                font-weight: 500;
                margin-right: 8px;
            }
            
            /* Theme button hover effects */
            .theme-btn:hover i, .float-theme:hover i {
                transform: scale(1.1);
            }
            
            /* Floating theme button */
            .float-theme {
                background: var(--card-bg) !important;
                border: 2px solid !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
                transition: all 0.3s ease !important;
            }
            
            body:not(.dark-theme) .float-theme {
                border-color: ${themeColors.light.sun} !important;
                color: ${themeColors.light.sun} !important;
            }
            
            body.dark-theme .float-theme {
                border-color: ${themeColors.dark.moon} !important;
                color: ${themeColors.dark.moon} !important;
            }
        `;
        document.head.appendChild(style);
        console.log('Added theme icon styles');
    }
}

// Emergency fix for icon visibility
function forceIconVisibility() {
    const isDark = document.body.classList.contains('dark-theme');
    console.log('Force fixing icon visibility. Current theme:', isDark ? 'dark' : 'light');
    
    // Remove all inline styles that might be hiding icons
    document.querySelectorAll('.fa-sun, .fa-moon').forEach(icon => {
        icon.style.cssText = ''; // Clear all inline styles
    });
    
    // Re-apply theme
    updateThemeIcons(isDark);
    updateIconColors(isDark);
}

// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing theme system...');
    
    // Add theme styles
    addThemeStyles();
    
    // Initialize theme
    initTheme();
    
    // Emergency fix after a short delay
    setTimeout(forceIconVisibility, 500);
    
    // Add event listeners to theme toggles
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Main theme button clicked');
            toggleTheme();
            // Force fix after toggle
            setTimeout(forceIconVisibility, 100);
        });
        console.log('Main theme toggle button initialized');
    } else {
        console.warn('Main theme toggle button not found');
    }
    
    if (floatThemeToggle) {
        floatThemeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Floating theme button clicked');
            toggleTheme();
            // Force fix after toggle
            setTimeout(forceIconVisibility, 100);
        });
        console.log('Floating theme toggle button initialized');
    } else {
        console.warn('Floating theme toggle button not found');
    }
    
    // Listen for system theme changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', function(e) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'system') {
            console.log('System theme changed to:', e.matches ? 'dark' : 'light');
            initTheme();
            forceIconVisibility();
        }
    });
    
    // Listen for language changes to update button text
    window.addEventListener('languageChanged', function() {
        console.log('Language changed, updating theme button...');
        updateThemeButtonText();
    });
});

// Make functions available globally
window.initTheme = initTheme;
window.toggleTheme = toggleTheme;
window.updateThemeButtonText = updateThemeButtonText;
window.updateIconColors = updateIconColors;
window.forceIconVisibility = forceIconVisibility;

// Debug function
window.themeDebug = {
    getCurrentTheme: function() {
        const isDark = document.body.classList.contains('dark-theme');
        return {
            theme: isDark ? 'dark' : 'light',
            colors: isDark ? themeColors.dark : themeColors.light,
            saved: localStorage.getItem('theme') || 'light'
        };
    },
    forceTheme: function(theme) {
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
    checkIcons: function() {
        const sunIcons = document.querySelectorAll('.fa-sun');
        const moonIcons = document.querySelectorAll('.fa-moon');
        
        const visibleSun = Array.from(sunIcons).filter(i => 
            i.style.display !== 'none' && 
            i.style.visibility !== 'hidden' && 
            i.style.opacity !== '0'
        ).length;
        
        const visibleMoon = Array.from(moonIcons).filter(i => 
            i.style.display !== 'none' && 
            i.style.visibility !== 'hidden' && 
            i.style.opacity !== '0'
        ).length;
        
        console.log(`Sun icons: ${sunIcons.length} total, ${visibleSun} visible`);
        console.log(`Moon icons: ${moonIcons.length} total, ${visibleMoon} visible`);
        
        sunIcons.forEach((icon, i) => {
            console.log(`Sun ${i+1}: display=${icon.style.display}, visibility=${icon.style.visibility}, opacity=${icon.style.opacity}`);
        });
        
        moonIcons.forEach((icon, i) => {
            console.log(`Moon ${i+1}: display=${icon.style.display}, visibility=${icon.style.visibility}, opacity=${icon.style.opacity}`);
        });
        
        return { sun: { total: sunIcons.length, visible: visibleSun }, 
                moon: { total: moonIcons.length, visible: visibleMoon } };
    },
    resetIcons: function() {
        console.log('Debug: Resetting all icon styles');
        document.querySelectorAll('.fa-sun, .fa-moon').forEach(icon => {
            icon.style.cssText = '';
        });
        forceIconVisibility();
    }
};