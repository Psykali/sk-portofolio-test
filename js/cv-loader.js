// CV Loader - Loads experiences and certifications from JSON files
class CVLoader {
    constructor() {
        this.experiences = [];
        this.certifications = {};
        this.currentLanguage = 'en';
    }

    async loadData() {
        try {
            // Load experiences
            const experiencesResponse = await fetch('config/experiences.json');
            this.experiences = await experiencesResponse.json();
            
            // Load certifications
            const certificationsResponse = await fetch('config/certifications.json');
            this.certifications = await certificationsResponse.json();
            
            this.renderAll();
        } catch (error) {
            console.error('Error loading CV data:', error);
        }
    }

    setLanguage(language) {
        this.currentLanguage = language;
        this.renderAll();
    }

    renderAll() {
        this.renderExperiences();
        this.renderCertifications();
    }

    renderExperiences() {
        const container = document.getElementById('experience-list');
        if (!container) return;

        container.innerHTML = this.experiences.experiences.map(exp => `
            <div class="timeline-item">
                <div class="experience-content">
                    <div class="job-header">
                        <div>
                            <div class="job-title">${exp.title}</div>
                            <div class="company">${exp.company}</div>
                        </div>
                        <div class="job-period">
                            <span>${exp.period.start} → ${exp.period.end}</span>
                            <span class="duration-badge">${this.calculateDuration(exp.period.start, exp.period.end)}</span>
                        </div>
                    </div>
                    
                    <div class="responsibilities">
                        <p>${exp.description}</p>
                        
                        <ul>
                            ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="tech-highlights">
                        ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    
                    <a href="${exp.projectLink}" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                        View Related Projects
                    </a>
                </div>
            </div>
        `).join('');
    }

    renderCertifications() {
        const educationList = document.getElementById('education-list');
        const certList = document.getElementById('certifications-list');
        
        if (educationList) {
            educationList.innerHTML = this.certifications.education.map(edu => `
                <li>${edu.year} - ${edu.degree} - ${edu.institution}</li>
            `).join('');
        }
        
        if (certList) {
            certList.innerHTML = this.certifications.certifications.map(cert => `
                <li>${cert}</li>
            `).join('');
        }
    }

    calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = endDate === 'Present' ? new Date() : new Date(endDate);
        
        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth();
        
        let totalMonths = years * 12 + months;
        if (end.getDate() < start.getDate()) {
            totalMonths--;
        }
        
        const yearsDisplay = Math.floor(totalMonths / 12);
        const monthsDisplay = totalMonths % 12;
        
        if (yearsDisplay === 0) {
            return `${monthsDisplay} month${monthsDisplay !== 1 ? 's' : ''}`;
        } else if (monthsDisplay === 0) {
            return `${yearsDisplay} year${yearsDisplay !== 1 ? 's' : ''}`;
        } else {
            return `${yearsDisplay} year${yearsDisplay !== 1 ? 's' : ''} ${monthsDisplay} month${monthsDisplay !== 1 ? 's' : ''}`;
        }
    }
}

// Initialize CV Loader
const cvLoader = new CVLoader();
document.addEventListener('DOMContentLoaded', () => {
    cvLoader.loadData();
});
