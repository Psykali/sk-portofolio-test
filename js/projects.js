// Load projects from JSON files
document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('projects-container');
    
    const projectFolders = [
        '01-azure-cloudops',
        '02-taxi-fare-analysis', 
        '03-eiffage-bim-revit',
        '04-cloudops-automation',
        '05-jsi-council-forecast',
        '06-monitoring-workbooks',
        '10-training-tutoring'
    ];

    let loadedProjects = 0;
    const totalProjects = projectFolders.length;

    projectsContainer.innerHTML = '<div class="loading">Loading projects...</div>';

    projectFolders.forEach(folder => {
        fetch(`projects/${folder}/info.json`)
            .then(response => {
                if (!response.ok) throw new Error('Project not found');
                return response.json();
            })
            .then(projectData => {
                const imagePath = `projects/${folder}/${projectData.image || 'preview.png'}`;
                
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <div class="project-image">
                        <img src="${imagePath}" alt="${projectData.title}" 
                             onerror="this.src='../../assets/placeholder.png'">
                    </div>
                    <div class="project-content">
                        <h3>${projectData.title}</h3>
                        <p class="project-summary">${projectData.summary}</p>
                        <a href="projects/${folder}/" class="project-link">
                            🔍 View Full Project
                        </a>
                    </div>
                `;
                
                projectsContainer.appendChild(projectCard);
                loadedProjects++;
                
                if (loadedProjects === totalProjects) {
                    const loadingElement = projectsContainer.querySelector('.loading');
                    if (loadingElement) loadingElement.remove();
                }
            })
            .catch(error => {
                console.error(`Error loading project ${folder}:`, error);
                loadedProjects++;
                
                if (loadedProjects === totalProjects && projectsContainer.children.length === 1) {
                    projectsContainer.innerHTML = '<div class="loading">No projects found.</div>';
                }
            });
    });
});
