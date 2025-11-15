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
                    "technologies": ["Azure Cloud", "AI", "Python", "Docker", "Kubernetes", "Terraform", "Azure DevOps", "YAML", "Bash", "PowerShell", "Entra ID", "Key Vault"],
                    "context": "Leading Azure infrastructure management, AI solutions deployment, and DevOps implementation for enterprise clients with focus on migration projects and Kubernetes deployments.",
                    "achievements": [
                        "Migrated JIRA to Azure DevOps using custom scripts and integration tools",
                        "Deployed AI solutions (Prisme, Azure AI, OpenAI) on Kubernetes via Terraform and Azure DevOps",
                        "Implemented Windows AVD infrastructure with multiple applications using Infrastructure as Code",
                        "Created standardized DevOps Forge for centralized automated deployments",
                        "Managed Entra ID (user accounts, groups, and SPN) and configured Key Vault integration"
                    ],
                    "projects": ["azure-devops-migration", "ai-kubernetes-deployment", "avd-implementation", "devops-forge"]
                },
                {
                    "id": "freelance",
                    "company": "Freelance Consultant",
                    "position": "Data Scientist & ML Engineer",
                    "period": "Jan 2025 - Aug 2025",
                    "duration": "8 months",
                    "technologies": ["Python", "Machine Learning", "FastAPI", "Streamlit", "Power BI", "SQL", "Revit API", "Data Analysis"],
                    "context": "Data science and machine learning consulting for construction and retail sectors, developing predictive models and data platforms.",
                    "achievements": [
                        "Developed inventory forecasting model improving accuracy by 18% for JSI Council",
                        "Created Streamlit platform for real-time interaction with predictive models",
                        "Improved material demand forecasting, increasing construction planning efficiency",
                        "Connected FastAPI with Revit for seamless data processing and retrieval"
                    ],
                    "projects": ["jsi-inventory-forecasting", "eiffage-dashboard", "construction-ml-pipeline"]
                },
                {
                    "id": "gl-events",
                    "company": "GL events",
                    "position": "Consultant Azure Cloud / DevOps",
                    "period": "Jun 2024 - Dec 2024",
                    "duration": "7 months",
                    "technologies": ["Azure DevOps", "Terraform", "Ansible", "Docker", "Kubernetes", "Harbor", "HashiCorp Vault", "CI/CD", "Linux", "Windows"],
                    "context": "DevOps implementation and cloud automation for event management infrastructure.",
                    "achievements": [
                        "Reduced deployment cycles by 30% through CI/CD pipeline implementation",
                        "Decreased environment setup time by 40% across 350+ servers using Terraform and Ansible",
                        "Achieved 98% deployment success rate with Azure DevOps integrated pipelines",
                        "Trained 3 operational team members on DevOps integration and pipeline management"
                    ],
                    "projects": ["cicd-automation", "terraform-ansible-scripts", "team-training"]
                },
                {
                    "id": "hardis-group",
                    "company": "Hardis Group",
                    "position": "Consultant Azure Cloud / DevOps",
                    "period": "Jan 2022 - Jun 2024",
                    "duration": "2.5 years",
                    "technologies": ["Azure Cloud", "Docker", "Kubernetes", "SQL", "Azure DevOps", "GitLab", "PowerShell", "Azure Lighthouse", "FinOps", "RBAC/IAM"],
                    "context": "Cloud consulting for multiple enterprise clients through Hardis Group (ESN), focusing on cost optimization, monitoring, and DevOps practices.",
                    "achievements": [
                        "Reduced cloud costs by 25% through budget alerts and resource tagging strategies",
                        "Improved data visibility by 30% with custom workbooks and dashboards",
                        "Reduced deployment errors by 20% for 30+ applications using Azure DevOps and GitLab",
                        "Implemented Azure Lighthouse and Policies for multi-tenant management",
                        "Trained 2 interns on Azure fundamentals leading to successful cost optimization initiative"
                    ],
                    "projects": ["cost-optimization", "dashboard-development", "cicd-improvement", "azure-governance"]
                },
                {
                    "id": "itsense",
                    "company": "ITsense SAS",
                    "position": "DevOps Engineer",
                    "period": "Jan 2019 - Dec 2021",
                    "duration": "3 years",
                    "technologies": ["Linux", "Windows", "Docker", "Proxmox", "SQL", "MariaDB", "Bash", "Ansible", "PowerShell", "OpenVPN", "Centreon"],
                    "context": "System administration and DevOps engineering for private, OVH, and hybrid cloud environments with focus on virtualization and automation.",
                    "achievements": [
                        "Achieved 99% availability for critical client applications through SQL/MariaDB optimization",
                        "Automated 40% of manual workload using Bash, Ansible and PowerShell",
                        "Migrated 50+ servers to Proxmox, improving resource efficiency by 30%",
                        "Secured remote access for 50+ employees with OpenVPN",
                        "Member of disaster recovery team during OVH Strasbourg datacenter fire"
                    ],
                    "projects": ["server-migration", "automation-scripts", "monitoring-dashboards", "disaster-recovery"]
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
                <h4>${this.currentLang === 'fr' ? 'Certifications' : 'Certifications'}</h4>
                <ul>
                    ${this.certificationsData.certifications?.map(cert => 
                        `<li>${cert}</li>`
                    ).join('') || ''}
                </ul>
            </div>
            <div class="cert-card">
                <h4>${this.currentLang === 'fr' ? 'Formation' : 'Education'}</h4>
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
            "Python", "Machine Learning", "CI/CD", "Azure DevOps", "GitLab",
            "PowerShell", "Bash", "Linux", "Windows Server", "SQL",
            "Data Analysis", "Cost Optimization", "Infrastructure as Code",
            "Entra ID", "PaaS", "SaaS", "IaaS", "Team Management", "Databases",
            "DevSecOps", "FinOps", "Ansible", "YAML", "ARM Templates", "Bicep",
            "Azure Lighthouse", "Azure Policies", "Monitoring", "Automation"
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

    // Method to reload data when language changes
    async reloadForLanguage(lang) {
        this.currentLang = lang;
        await this.loadData();
    }
}

// Initialize CV loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cvLoader = new CVLoader();
    
    // Load data after a short delay to ensure language manager is ready
    setTimeout(() => {
        window.cvLoader.loadData();
    }, 100);
});

// Listen for language changes
document.addEventListener('languageChanged', (event) => {
    if (window.cvLoader) {
        window.cvLoader.reloadForLanguage(event.detail.lang);
    }
});
