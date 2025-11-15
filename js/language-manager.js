class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.setupLanguageSwitcher();
        this.updateContent();
    }

    async loadTranslations() {
        try {
            const response = await fetch(`config/${this.currentLang}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to English if French fails
            if (this.currentLang === 'fr') {
                this.currentLang = 'en';
                await this.loadTranslations();
            }
        }
    }

    setupLanguageSwitcher() {
        document.getElementById('lang-en').addEventListener('click', () => {
            this.switchLanguage('en');
        });
        document.getElementById('lang-fr').addEventListener('click', () => {
            this.switchLanguage('fr');
        });
    }

    async switchLanguage(lang) {
        this.currentLang = lang;
        await this.loadTranslations();
        this.updateContent();
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`lang-${lang}`).classList.add('active');

        // Reload CV data with new language
        if (window.cvLoader) {
            await window.cvLoader.loadData();
        }
    }

    updateContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.getTranslation(key)) {
                element.textContent = this.getTranslation(key);
            }
        });

        // Update page title
        document.title = this.getTranslation('site_title') || 'S. Khalifa - Portfolio';

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', this.getTranslation('site_description') || 'Azure Cloud Consultant Portfolio');
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            value = value[k];
            if (value === undefined) return undefined;
        }
        return value;
    }

    t(key) {
        return this.getTranslation(key) || key;
    }
}
