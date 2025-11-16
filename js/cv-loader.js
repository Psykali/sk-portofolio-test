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
            const experiencesData = await experiencesResponse.json();
            this.experiences = experiencesData.experiences;
            
            // Load certifications
            const certificationsResponse = await fetch('config/certifications.json');
            this.certifications = await certificationsResponse.json();
            
            this.renderAll();
            this.animateSkills();
        } catch (error) {
            console.error('Error loading CV data:', error);
            // Fallback to hardcoded data
            this.loadFallbackData();
        }
    }

    loadFallbackData() {
        this.experiences = [
            {
                id: 1,
                title: "Azure Cloud / DevOps Consultant",
                company: "Blue Soft • Empower",
                period: {
                    start: "Jan-2023",
                    end: "Present"
                },
                description: "Leading Azure infrastructure management, AI solutions deployment, and DevOps implementation for enterprise clients with focus on migration projects and Kubernetes deployments.",
                responsibilities: [
                    "Migrated JIRA to Azure DevOps using custom scripts and integration tools",
                    "Deployed AI solutions (Prisms, Azure AI, OpenAI) on Kubernetes via Terraform and Azure DevOps",
                    "Implemented Windows AVD infrastructure with multiple applications using Infrastructure as Code",
                    "Created standardized DevOps Forge",
                    "Optimized cloud costs through resource management and right-sizing",
                    "Managed containerized applications using Docker and Kubernetes"
                ],
                technologies: [
                    "Azure Cloud", "AI", "Python", "Docker", "Kubernetes", 
                    "Terraform", "Azure DevOps", "YAML", "Bash", "PowerShell", 
                    "Entra ID", "Infrastructure as Code", "CI/CD"
                ],
                projectLink: "#projects"
            },
            {
                id: 2,
                title: "Freelancer & Personal Projects",
                company: "Various Clients",
                period: {
                    start: "Jun-2020",
                    end: "Dec-2022"
                },
                description: "Worked on various cloud migration and DevOps automation projects for small to medium enterprises.",
                responsibilities: [
                    "Developed automated CI/CD pipelines for web applications",
                    "Implemented cloud security best practices and compliance",
                    "Created monitoring and alerting systems",
                    "Optimized application performance in cloud environments",
                    "Provided technical consultation and architecture design"
                ],
                technologies: [
                    "Azure", "AWS", "Docker", "Kubernetes", "CI/CD",
                    "Security", "Monitoring", "Automation", "Python"
                ],
                projectLink: "#projects"
            }
        ];

        this.certifications = {
            education: [
                {
                    year: "2025",
                    degree: "Master in Data Science & AI",
                    institution: "Le Wagon, Lyon"
                },
                {
                    year: "2022",
                    degree: "Master in Computer Science & Cloud",
                    institution: "SimplonCo, Lyon"
                }
            ],
            certifications: [
                "AZ-900: Azure Fundamentals",
                "AZ-104: Azure Administrator",
                "AZ-500: Azure Security Engineer",
                "AI-900: Azure AI Fundamentals",
                "DP-900: Azure Data Fundamentals"
            ]
        };

        this.renderAll();
        this.animateSkills();
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

        container.innerHTML = this.experiences.map((exp, index) => `
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
        
        if (educationList && this.certifications.education) {
            educationList.innerHTML = this.certifications.education.map(edu => `
                <li>${edu.year} - ${edu.degree} - ${edu.institution}</li>
            `).join('');
        }
        
        if (certList && this.certifications.certifications) {
            certList.innerHTML = this.certifications.certifications.map(cert => `
                <li>${cert}</li>
            `).join('');
        }
    }

    animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(skill => {
            const level = skill.getAttribute('data-level');
            skill.style.setProperty('--skill-level', level + '%');
            
            // Add loaded class after a delay for animation
            setTimeout(() => {
                skill.classList.add('loaded');
            }, 500);
        });
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

// Make globally available
window.cvLoader = cvLoader;
