// Language Manager - Handles multilingual support
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.observers = [];
    }

    async loadTranslations() {
        try {
            const response = await fetch(`config/translations/${this.currentLanguage}.json`);
            this.translations = await response.json();
            this.notifyObservers();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    async switchLanguage(language) {
        this.currentLanguage = language;
        await this.loadTranslations();
        this.updateUI();
        
        // Notify other components about language change
        if (window.cvLoader) {
            window.cvLoader.setLanguage(language);
        }
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => {
            if (observer.onLanguageChange) {
                observer.onLanguageChange(this.currentLanguage, this.translations);
            }
        });
    }

    updateUI() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[key]) {
                element.textContent = this.translations[key];
            }
        });

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`#lang-${this.currentLanguage}`).classList.add('active');
    }

    getTranslation(key) {
        return this.translations[key] || key;
    }
}

// Initialize Language Manager
const languageManager = new LanguageManager();

document.addEventListener('DOMContentLoaded', async () => {
    // Load initial translations
    await languageManager.loadTranslations();
    
    // Set up language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.id.replace('lang-', '');
            languageManager.switchLanguage(lang);
        });
    });
    
    // Make language manager globally available
    window.languageManager = languageManager;
});
