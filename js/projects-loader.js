class ProjectsLoader {
    constructor() {
        this.projects = {};
        this.loadProjects();
    }

    async loadProjects() {
        // Simulate loading projects from folder structure
        this.projects = {
            "cost-optimization": {
                "title": "Cloud Cost Optimization",
                "company": "Hardis Group",
                "period": "2023",
                "technologies": ["Azure Cost Management", "PowerShell", "Azure Policies"],
                "description": "Implemented cost optimization strategies reducing cloud spending by 25%",
                "achievements": [
                    "Reduced cloud waste by 25%",
                    "Implemented budget alerts and tagging",
                    "Optimized resource allocation"
                ]
            },
            "dashboard-development": {
                "title": "Azure Monitoring Dashboards",
                "company": "Hardis Group", 
                "period": "2023",
                "technologies": ["Azure Workbooks", "Power BI", "KQL"],
                "description": "Developed comprehensive monitoring dashboards improving data visibility by 30%",
                "achievements": [
                    "Improved data visibility by 30%",
                    "Created real-time performance monitoring",
                    "Implemented cost tracking dashboards"
                ]
            }
            // Add other projects...
        };

        this.renderProjects();
    }

    renderProjects() {
        const container = document.getElementById('projects-grid');
        container.innerHTML = '';

        Object.entries(this.projects).forEach(([id, project]) => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card';
            projectElement.id = `project-${id}`;

            projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <div class="project-meta">
                    <span class="company">${project.company}</span>
                    <span class="period">${project.period}</span>
                </div>
                <div class="technologies">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                <p class="description">${project.description}</p>
                <div class="achievements">
                    <h4>Achievements:</h4>
                    <ul>
                        ${project.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                </div>
            `;

            container.appendChild(projectElement);
        });
    }
}

// Initialize projects loader
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsLoader();
});
