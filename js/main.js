class Portfolio {
    constructor() {
        this.currentLang = 'en';
        this.config = {};
        this.init();
    }

    async init() {
        await this.loadConfig();
        this.setupLanguageSwitcher();
        this.updateContent();
    }

    async loadConfig() {
        try {
            const response = await fetch(`config/${this.currentLang}.json`);
            this.config = await response.json();
        } catch (error) {
            console.error('Error loading config:', error);
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
        await this.loadConfig();
        this.updateContent();
    }

    updateContent() {
        // Update page title
        document.title = this.config.site.title;

        // Update hero section
        document.getElementById('hero-name').textContent = this.config.personal.name;
        document.getElementById('hero-title').textContent = this.config.personal.title;
        
        // Update contact info
        const contact = this.config.personal.contact;
        document.getElementById('hero-contact').innerHTML = `
            <p>${contact.email} | ${contact.phone} | ${contact.location}</p>
            <div class="social-links">
                <a href="${contact.linkedin}" target="_blank">LinkedIn</a>
                <a href="${contact.github}" target="_blank">GitHub</a>
            </div>
        `;

        // Update section titles
        document.getElementById('about-title').textContent = this.config.sections.about;
        document.getElementById('experience-title').textContent = this.config.sections.experience;
        document.getElementById('projects-title').textContent = this.config.sections.projects;
        document.getElementById('certifications-title').textContent = this.config.sections.certifications;

        // Update bio
        document.getElementById('about-bio').textContent = this.config.personal.bio;
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
