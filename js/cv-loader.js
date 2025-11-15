class CVLoader {
    constructor() {
        this.experienceData = {};
        this.certificationsData = {};
        this.loadData();
    }

    async loadData() {
        await this.loadExperience();
        await this.loadCertifications();
        this.renderExperience();
        this.renderCertifications();
    }

    async loadExperience() {
        // This would typically come from a JSON file
        this.experienceData = {
            "blue-soft-empower": {
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
            "hardis-group": {
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
            // Add other experiences...
        };
    }

    async loadCertifications() {
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
        container.innerHTML = '';

        Object.values(this.experienceData).forEach(exp => {
            const expElement = document.createElement('div');
            expElement.className = 'experience-item';
            
            expElement.innerHTML = `
                <div class="experience-header">
                    <h3>${exp.position} - ${exp.company}</h3>
                    <span class="period">${exp.period} (${exp.duration})</span>
                </div>
                <div class="technologies">
                    <strong>Technologies:</strong> ${exp.technologies.join(', ')}
                </div>
                <div class="context">
                    <strong>Context:</strong> ${exp.context}
                </div>
                <div class="achievements">
                    <strong>Achievements:</strong>
                    <ul>
                        ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                </div>
                <div class="company-projects">
                    <strong>Projects:</strong>
                    <div class="project-links">
                        ${this.renderProjectLinks(exp.projects)}
                    </div>
                </div>
            `;

            container.appendChild(expElement);
        });
    }

    renderProjectLinks(projectIds) {
        return projectIds.map(id => 
            `<a href="#project-${id}" class="project-link">${this.formatProjectId(id)}</a>`
        ).join('');
    }

    formatProjectId(id) {
        return id.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    renderCertifications() {
        const container = document.getElementById('certifications-list');
        
        container.innerHTML = `
            <div class="certifications">
                <h4>Certifications</h4>
                <ul>
                    ${this.certificationsData.certifications.map(cert => 
                        `<li>${cert}</li>`
                    ).join('')}
                </ul>
            </div>
            <div class="education">
                <h4>Education</h4>
                <ul>
                    ${this.certificationsData.education.map(edu => 
                        `<li>${edu}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }
}

// Initialize CV loader
document.addEventListener('DOMContentLoaded', () => {
    new CVLoader();
});
