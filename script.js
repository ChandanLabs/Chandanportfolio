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
                { name: "BloodByte", description: "Emergency Blood Donation Platform with AI-driven urgency detection.", html_url: "#", language: "JavaScript", stargazers_count: 5 },
                { name: "OpsGuardian", description: "AI-driven DevOps monitoring agent for real-time system health.", html_url: "#", language: "Python", stargazers_count: 3 },
                { name: "ThePhoenix-Agent", description: "Self-healing Node.js service with GenAI error resolution.", html_url: "#", language: "Node.js", stargazers_count: 10 }
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

// Back to top button logic
// Create button dynamically since it was missing in HTML
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'back-to-top';
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '↑';
backToTopBtn.ariaLabel = "Scroll to top";
document.body.appendChild(backToTopBtn);

const innerScroll = document.querySelector('.content-scroll');

function toggleBackToTop(scrollTop) {
    if (scrollTop > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Listener for Desktop (Inner Scroll)
if (innerScroll) {
    innerScroll.addEventListener('scroll', (e) => {
        toggleBackToTop(e.target.scrollTop);
    });
}

// Listener for Mobile (Window Scroll)
window.addEventListener('scroll', () => {
    toggleBackToTop(window.scrollY);
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (innerScroll) {
        innerScroll.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Role Typing Animation
const roles = [
    "Junior Backend Engineer",
    "API Developer",
    "Cloud Learner"
];
const typingRoleElement = document.getElementById('typing-role');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeRoleEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deleting
    } else {
        typingRoleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing word
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeRoleEffect, typeSpeed);
}

// Start typing effect if element exists
if (typingRoleElement) {
    typeRoleEffect();
}

// --- NEW INTERACTIVE FEATURES ---

// 1. Navigation Fix & Logic
function navigateToSection(targetId) {
    // Remove active class from all nav items
    navItems.forEach(nav => {
        nav.classList.remove('active');
        if (nav.getAttribute('href') === `#${targetId}`) {
            nav.classList.add('active');
        }
    });

    // Hide all sections, show target
    sections.forEach(sec => sec.classList.remove('active-section'));
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }
}

// Global click listener for internal links to fix the "View Projects" bug
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        navigateToSection(targetId);
    }
});

// 2. Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('i');

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    icon.classList.replace('fa-sun', 'fa-moon');
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});

// 3. API Console Logic
const apiEndpointInput = document.getElementById('api-endpoint');
const jsonResponseElement = document.getElementById('json-response');
const sendRequestBtn = document.getElementById('send-request');

if (sendRequestBtn) {
    window.setEndpoint = (path) => {
        apiEndpointInput.value = path;
    };

    sendRequestBtn.addEventListener('click', () => {
        const endpoint = apiEndpointInput.value;
        const method = document.getElementById('http-method').value;

        jsonResponseElement.textContent = '// Processing...';

        // Mock Responses
        let responseData = {};

        setTimeout(() => {
            if (endpoint === '/api/active-projects') {
                responseData = {
                    status: 200,
                    data: [
                        { id: 101, name: "BloodByte", active: true, reqs_per_sec: 45 },
                        { id: 102, name: "OpsGuardian", active: true, uptime: "99.9%" }
                    ]
                };
            } else if (endpoint === '/api/system-health') {
                responseData = {
                    status: 200,
                    system: {
                        cpu_load: "12%",
                        memory_free: "4096MB",
                        tasks: "Idle"
                    }
                };
            } else if (endpoint === '/api/hire-me') {
                responseData = {
                    status: 201,
                    message: "Application accepted! Please email sah288012@gmail.com to schedule an interview."
                };
            } else {
                responseData = {
                    status: 404,
                    error: "Endpoint not found"
                };
            }

            jsonResponseElement.textContent = JSON.stringify(responseData, null, 2);
        }, 600); // Simulate network latency
    });
}


