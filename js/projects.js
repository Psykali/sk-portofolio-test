// ========================================
// Projects Page JavaScript - Dynamic Project Loading
// ========================================

document.addEventListener('DOMContentLoaded', async function() {
    const projectsList = document.getElementById('projects-list');
    
    if (!projectsList) return;

    try {
        // Define projects manually (since we can't do filesystem reads in static site)
        const projects = [
            '01-Azure_CloudOps',
            '02-taxi_fare_analysis',
            '03-eiffage_bmi_revit',
            '04-CloudOps_Automation',
            '05-jsi_council_forecast',
            '06-Monitoring_Workbooks',
            '10-Training_Tutoring'
        ];

        // Load each project
        const projectsData = [];
        
        for (const projectFolder of projects) {
            try {
                const response = await fetch(`projects/${projectFolder}/info.json`);
                if (response.ok) {
                    const data = await response.json();
                    data.folder = projectFolder;
                    projectsData.push(data);
                }
            } catch (error) {
                console.warn(`Could not load project: ${projectFolder}`, error);
            }
        }

        // Clear loading message
        projectsList.innerHTML = '';

        if (projectsData.length === 0) {
            projectsList.innerHTML = '<p class="loading">No projects found.</p>';
            return;
        }

        // Render projects
        projectsData.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            projectsList.appendChild(projectCard);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        projectsList.innerHTML = '<p class="loading">Error loading projects. Please try again later.</p>';
    }
});

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const imageUrl = project.image 
        ? `projects/${project.folder}/${project.image}`
        : 'assets/project_imgs/default-project.svg';

    const projectUrl = `projects/${project.folder}/index.html`;

    card.innerHTML = `
        <img src="${imageUrl}" alt="${project.title}" class="project-image" 
             onerror="this.src='assets/project_imgs/default-project.svg'">
        <div class="project-content">
            <h2 class="project-title">${project.title}</h2>
            <p class="project-summary">${project.summary || 'No summary available'}</p>
            <a href="${projectUrl}" class="project-link">🔍 View Full Project</a>
        </div>
    `;

    return card;
}

// Filter functionality (optional enhancement)
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'grid';
        } else {
            card.style.display = 'none';
        }
    });
}
