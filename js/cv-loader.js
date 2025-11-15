class CVLoader {
    constructor() {
        this.experienceData = {};
        this.certificationsData = {};
        this.currentLang = 'en';
    }

    async loadData() {
        this.currentLang = window.languageManager?.currentLang || 'en';
        await this.loadExperience();
        await this.loadCertifications();
        this.renderExperience();
        this.renderCertifications();
        this.renderSkills();
    }

    async loadExperience() {
        try {
            const response = await fetch(`data/experience-${this.currentLang}.json`);
            this.experienceData = await response.json();
        } catch (error) {
            console.error('Error loading experience data:', error);
            // Fallback to static data
            this.loadStaticExperience();
        }
    }

    async loadCertifications() {
        try {
            const response = await fetch(`data/certifications-${this.currentLang}.json`);
            this.certificationsData = await response.json();
        } catch (error) {
            console.error('Error loading certifications data:', error);
            // Fallback to static data
            this.loadStaticCertifications();
        }
    }

    loadStaticExperience() {
        this.experienceData = {
            "experiences": [
                {
                    "id": "blue-soft-empower",
                    "company": "Blue Soft Empower",
                    "position": "Azure Cloud / DevOps Consultant",
                    "period": "Aug 2025 - Present",
                    "duration": "Current",
                    "technologies": ["Azure Cloud", "AI", "Python", "Docker", "Kubernetes", "Terraform", "Azure DevOps"],
                    "context": "Azure infrastructure management, AI solutions deployment, and DevOps implementation for various clients.",
                    "achievements": [
                        "Migration from JIRA to Azure DevOps",
                        "Implementation of AI solutions on Kubernetes", 
                        "Development of standardized deployment processes"
                    ],
                    "projects": ["azure-devops-migration", "ai-kubernetes-deployment"]
                },
                {
                    "id": "hardis-group", 
                    "company": "Hardis Group",
                    "position": "Consultant Azure Cloud / DevOps",
                    "period": "Nov 2022 - Jun 2024", 
                    "duration": "1.5 years",
                    "technologies": ["Azure Cloud", "Docker", "Kubernetes", "SQL", "Azure DevOps", "GitLab"],
                    "context": "Cloud consulting for multiple clients through Hardis Group (ESN).",
                    "achievements": [
                        "Reduced cloud costs by 25% through budget alerts and tagging",
                        "Improved data visibility by 30% through dashboards and workbooks",
                        "Reduced deployment errors by 20% for 30+ applications"
                    ],
                    "projects": ["cost-optimization", "dashboard-development", "cicd-improvement"]
                }
            ]
        };
    }

    loadStaticCertifications() {
        this.certificationsData = {
            "certifications": [
                "AZ-900: Azure Fundamentals",
                "AZ-104: Azure Administrator", 
                "AZ-500: Azure Security Engineer",
                "AI-900: Azure AI Fundamentals",
                "DP-900: Azure Data Fundamentals"
            ],
            "education": [
                "2025 - Master in Data Science & AI - Le Wagon, Lyon",
                "2022 - Master in Computer Science & Cloud - Simplon.Co, Lyon" 
            ]
        };
    }

    renderExperience() {
        const container = document.getElementById('experience-list');
        if (!container) return;

        container.innerHTML = '';

        this.experienceData.experiences?.forEach((exp, index) => {
            const expElement = document.createElement('div');
            expElement.className = `experience-item ${index % 2 === 0 ? 'left' : 'right'}`;
            
            expElement.innerHTML = `
                <div class="experience-header">
                    <div>
                        <h3>${exp.position}</h3>
                        <p class="company-name">${exp.company}</p>
                    </div>
                    <span class="company-period">${exp.period} • ${exp.duration}</span>
                </div>
                <div class="tech-tags">
                    ${exp.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                <div class="context">
                    <p>${exp.context}</p>
                </div>
                <div class="achievements">
                    <ul>
                        ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                </div>
                ${this.renderProjectLinks(exp.projects, exp.company)}
            `;

            container.appendChild(expElement);
        });
    }

    renderProjectLinks(projectIds, company) {
        if (!projectIds || projectIds.length === 0) return '';
        
        return `
            <div class="company-projects">
                <h4>Related Projects</h4>
                <div class="project-links">
                    ${projectIds.map(id => 
                        `<a href="#project-${id}" class="project-link" data-project="${id}">
                            ${this.formatProjectId(id)}
                        </a>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    renderCertifications() {
        const container = document.getElementById('certifications-list');
        if (!container) return;

        container.innerHTML = `
            <div class="cert-card">
                <h4>Certifications</h4>
                <ul>
                    ${this.certificationsData.certifications?.map(cert => 
                        `<li>${cert}</li>`
                    ).join('') || ''}
                </ul>
            </div>
            <div class="cert-card">
                <h4>Education</h4>
                <ul>
                    ${this.certificationsData.education?.map(edu => 
                        `<li>${edu}</li>`
                    ).join('') || ''}
                </ul>
            </div>
        `;
    }

    renderSkills() {
        const container = document.getElementById('skills-cloud');
        if (!container) return;

        const skills = [
            "Azure Cloud", "DevOps", "Kubernetes", "Docker", "Terraform",
            "Python", "AI/ML", "CI/CD", "Azure DevOps", "GitLab",
            "PowerShell", "Bash", "Linux", "Windows Server", "SQL",
            "Data Analysis", "Cost Optimization", "Infrastructure as Code"
        ];

        container.innerHTML = skills.map(skill => 
            `<div class="skill-item">${skill}</div>`
        ).join('');
    }

    formatProjectId(id) {
        return id.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
}

// Initialize CV loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cvLoader = new CVLoader();
    // Load data after language manager is ready
    setTimeout(() => {
        window.cvLoader.loadData();
    }, 100);
});
