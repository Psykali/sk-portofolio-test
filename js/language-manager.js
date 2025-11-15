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
    }

    updateContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[key]) {
                element.textContent = this.translations[key];
            }
        });

        // Update page title
        document.title = this.translations.site_title || 'S. Khalifa - Portfolio';

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && this.translations.site_description) {
            metaDescription.setAttribute('content', this.translations.site_description);
        }
    }

    t(key) {
        return this.translations[key] || key;
    }
}
