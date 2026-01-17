// Basic terminal clock
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// Navigation Logic
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all
        navItems.forEach(nav => nav.classList.remove('active'));
        sections.forEach(sec => sec.classList.remove('active-section'));

        // Add to current
        item.classList.add('active');
        const targetId = item.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active-section');
    });
});

// GitHub Projects Fetcher
const GITHUB_USERNAME = 'ChandanLabs';
const PROJECTS_CONTAINER = document.getElementById('projects-container');

async function fetchProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!response.ok) throw new Error('Failed to fetch/API Rate Limit');
        const repos = await response.json();

        displayProjects(repos);
    } catch (error) {
        console.error(error);
        PROJECTS_CONTAINER.innerHTML = `<p style="color:red">Error: Connection Refused (GitHub API Rate Limit). <br> Please visit <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" style="color:var(--accent)">GitHub Direct</a></p>`;

        // Fallback static data if API fails (simulating robustness)
        setTimeout(() => {
            const fallbackRepos = [
                { name: "BloodByte", description: "Emergency Blood Donation System with AI integration.", html_url: "#", language: "JavaScript", stargazers_count: 5 },
                { name: "OpsGuardian", description: "AI-driven DevOps monitoring tool.", html_url: "#", language: "Python", stargazers_count: 3 },
                { name: "ThePhoenix-Agent", description: "Self-healing Node.js agent.", html_url: "#", language: "Node.js", stargazers_count: 10 }
            ];
            displayProjects(fallbackRepos);
        }, 1000);
    }
}

function displayProjects(repos) {
    PROJECTS_CONTAINER.innerHTML = ''; // Clear loading

    // Filter for "important" or general backend projects. 
    // Since "backend" isn't always in topic, we show all but prioritize those with descriptions.
    const validRepos = repos.filter(repo => !repo.fork && repo.description); // Filter forks if desired, or keep them

    validRepos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
            <div>
                <div class="project-header">
                    <a href="${repo.html_url}" target="_blank" class="project-title">${repo.name}</a>
                    <i class="fas fa-code-branch" style="color:#555"></i>
                </div>
                <p class="project-desc">${repo.description || 'No description available.'}</p>
            </div>
            <div>
                 <div class="project-meta">
                    <span><i class="fas fa-circle" style="font-size:0.6rem; color: ${getLanguageColor(repo.language)}"></i> ${repo.language || 'Code'}</span>
                    <span><i class="far fa-star"></i> ${repo.stargazers_count}</span>
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="p-btn">> View Source</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="p-btn">> Live</a>` : ''}
                </div>
            </div>
        `;
        PROJECTS_CONTAINER.appendChild(card);
    });
}

function getLanguageColor(lang) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'TypeScript': '#2b7489'
    };
    return colors[lang] || '#ccc';
}

// Init
fetchProjects();

// Button Interactions (smooth scroll is handled by CSS, but "Download Resume" needs log)
document.querySelectorAll('.terminal-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        console.log(`Executing: ${this.textContent}`);
    });
});


