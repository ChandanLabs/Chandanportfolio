const rolesByPage = {
    sde: ["SDE Fresher", "Backend API Builder", "B.Tech CSE 2027", "AI-aware Developer"],
    ai: ["AI Engineer Workspace", "RAG and Agents Builder", "LLM App Developer", "AI Fullstack Lab"]
};

const sdeProjects = [
    {
        name: "Event Booking System",
        type: "Backend API",
        problem: "A production-style event and attendance API where booking correctness matters under concurrent demand.",
        proof: "Uses Node.js, Express, MySQL, Sequelize, Joi validation, Swagger docs, Docker setup, and transaction-safe booking logic with SELECT FOR UPDATE.",
        stack: ["Node.js", "Express", "MySQL", "Sequelize", "Docker", "Swagger"],
        url: "https://github.com/ChandanLabs/Event_Booking_System"
    },
    {
        name: "AI-First Laundry Management",
        type: "Full-stack API",
        problem: "A practical order-management system with pricing, status transitions, filtering, and dashboard analytics.",
        proof: "Shows MVC structure, REST endpoints, validated state flow, responsive frontend, and deployment-ready static/server setup.",
        stack: ["Node.js", "Express", "JavaScript", "REST", "Dashboard"],
        url: "https://github.com/AIFullstack-web/ai-first-laundry-management-system"
    },
    {
        name: "BloodByte",
        type: "Realtime + AI",
        problem: "Emergency blood requests need verification, urgency detection, and nearby donor matching.",
        proof: "Combines React, Firebase Functions, Firestore realtime listeners, Gemini document analysis, and geolocation matching.",
        stack: ["React", "Firebase", "Gemini", "Firestore", "Cloud Functions"],
        url: "https://github.com/ChandanLabs/Bloodyte"
    },
    {
        name: "OpsGuardian",
        type: "Backend automation",
        problem: "Known backend incidents should move from alert to analysis to safe remediation faster.",
        proof: "Event-driven incident workflow using Motia, TypeScript, OpenAI analysis, state tracking, approval gates, and integration tests.",
        stack: ["TypeScript", "Motia", "OpenAI", "Jest", "Supertest"],
        url: "https://github.com/ChandanLabs/OpsGuardian"
    }
];

const aiProjects = [
    {
        name: "Autonomous Job Agent",
        type: "RAG + Agent Workflow",
        problem: "Discover jobs, score fit, tailor application material, and prepare semi-autonomous submissions from grounded profile data.",
        proof: "Experience Lake, local retrieval index, FastAPI ingestion, LangGraph pipeline, matching logic, tailoring agent, and browser execution module.",
        stack: ["Python", "FastAPI", "RAG", "LangGraph", "SeleniumBase"],
        url: "https://github.com/AIFullstack-web/Job-agent-"
    },
    {
        name: "BharatRank",
        type: "Candidate Ranking AI",
        problem: "Rank a 100,000-candidate pool against a detailed Senior AI Engineer JD without hosted LLM calls.",
        proof: "Single-command TF-IDF ranking pipeline, hard-screen penalties, behavioral multipliers, validator, and reproducible CSV output.",
        stack: ["Python", "TF-IDF", "Ranking", "Data Pipeline", "Validation"],
        url: "https://github.com/AIFullstack-web/BharatRank"
    },
    {
        name: "AI Cricket Bowling Analyzer",
        type: "Computer Vision + Coaching",
        problem: "Fast bowlers need real-time biomechanical feedback at ball release.",
        proof: "YOLO pose extraction, release detection heuristics, biomechanics engine, scoring, Gemini feedback, FastAPI/SSE, and React UI.",
        stack: ["Python", "YOLO", "Gemini", "FastAPI", "React", "SSE"],
        url: "https://github.com/ChandanLabs/ai-cricket-bowling-analyzer"
    },
    {
        name: "The Phoenix Agent",
        type: "Self-healing AI Agent",
        problem: "A crashing service should be diagnosed, patched, and restarted with minimal manual effort.",
        proof: "Guardian process monitors Node.js service health, sends stack traces to an LLM, applies fixes, and verifies recovery with tests.",
        stack: ["Node.js", "Express", "Together AI", "Docker", "Tests"],
        url: "https://github.com/ChandanLabs/ThePhoenix-Agent"
    },
    {
        name: "OpsGuardian",
        type: "AI SRE Agent",
        problem: "Incident response needs safe automation with human approval before risky actions.",
        proof: "Motia workflow steps, OpenAI log analysis, stateful approval, remediation events, observability, and Jest/Supertest coverage.",
        stack: ["TypeScript", "Motia", "OpenAI", "Workflow", "Testing"],
        url: "https://github.com/ChandanLabs/OpsGuardian"
    },
    {
        name: "CampusGPT Agent",
        type: "Learning Assistant",
        problem: "Students need notes, PDFs, images, quizzes, and study plans converted into usable study material.",
        proof: "Positioned as a multimodal Gemini-powered learning assistant in the AIFullstack-web lab.",
        stack: ["Gemini", "Multimodal AI", "Study Plans", "Quizzes"],
        url: "https://github.com/AIFullstack-web/CampusGPT-Agent"
    }
];

const apiResponses = {
    "/api/profile-readiness": {
        status: 200,
        candidate: "Chandan Kumar Sah Teli",
        target_roles: ["SDE Internship", "Associate SDE", "AI-aware Backend Developer"],
        strongest_signals: ["transaction-safe backend APIs", "AI integration projects", "DSA and CS fundamentals"],
        graduation: "B.Tech CSE, graduating 2027"
    },
    "/api/strongest-projects": {
        status: 200,
        backend: ["Event Booking System", "AI-First Laundry Management", "BloodByte"],
        ai: ["Autonomous Job Agent", "AI Cricket Bowling Analyzer", "OpsGuardian", "BharatRank"]
    },
    "/api/hire-signal": {
        status: 201,
        message: "Proof-first fresher profile ready for internship and associate SDE conversations.",
        contact: "chandan.kumar.sah.teli2005@gmail.com"
    }
};

const page = document.body.dataset.page || "sde";
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");
const innerScroll = document.querySelector(".content-scroll");
const clock = document.getElementById("clock");
const themeToggleBtn = document.getElementById("theme-toggle");
const backToTopBtn = document.getElementById("back-to-top");

function updateClock() {
    if (!clock) return;
    clock.textContent = new Date().toLocaleTimeString("en-US", { hour12: false });
}

function navigateToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${targetId}`);
    });

    sections.forEach((section) => section.classList.remove("active-section"));
    target.classList.add("active-section");

    if (innerScroll) {
        innerScroll.scrollTo({ top: 0, behavior: "smooth" });
    }
}

function renderProjects(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = projects.map((project) => `
        <article class="project-card">
            <span class="project-kicker">${project.type}</span>
            <h3 class="project-title">${project.name}</h3>
            <p class="project-desc">${project.problem}</p>
            <div class="project-proof">${project.proof}</div>
            <div class="project-tags">${project.stack.map((item) => `<span>${item}</span>`).join("")}</div>
            <div class="project-links">
                <a class="btn small" href="${project.url}" target="_blank" rel="noreferrer"><i class="fa-brands fa-github"></i> Source</a>
            </div>
        </article>
    `).join("");
}

function startTyping() {
    const element = document.getElementById("typing-role");
    if (!element) return;

    const roles = rolesByPage[page] || rolesByPage.sde;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
        const role = roles[roleIndex];
        element.textContent = role.slice(0, charIndex);

        if (isDeleting) {
            charIndex -= 1;
        } else {
            charIndex += 1;
        }

        if (!isDeleting && charIndex > role.length) {
            isDeleting = true;
            setTimeout(tick, 1200);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(tick, isDeleting ? 45 : 85);
    }

    tick();
}

function setupTheme() {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector("i");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        icon?.classList.replace("fa-sun", "fa-moon");
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const light = document.body.classList.contains("light-mode");
        localStorage.setItem("theme", light ? "light" : "dark");
        if (icon) {
            icon.classList.toggle("fa-sun", !light);
            icon.classList.toggle("fa-moon", light);
        }
    });
}

function setupBackToTop() {
    if (!backToTopBtn) return;
    const update = (scrollTop) => backToTopBtn.classList.toggle("show", scrollTop > 240);
    innerScroll?.addEventListener("scroll", (event) => update(event.target.scrollTop));
    window.addEventListener("scroll", () => update(window.scrollY));
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        innerScroll?.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function setupApiConsole() {
    const endpointInput = document.getElementById("api-endpoint");
    const responseElement = document.getElementById("json-response");
    const sendButton = document.getElementById("send-request");
    if (!endpointInput || !responseElement || !sendButton) return;

    document.querySelectorAll("[data-endpoint]").forEach((button) => {
        button.addEventListener("click", () => {
            endpointInput.value = button.dataset.endpoint;
        });
    });

    sendButton.addEventListener("click", () => {
        const endpoint = endpointInput.value.trim();
        responseElement.textContent = "// Processing...";
        setTimeout(() => {
            const response = apiResponses[endpoint] || { status: 404, error: "Endpoint not found", available: Object.keys(apiResponses) };
            responseElement.textContent = JSON.stringify(response, null, 2);
        }, 350);
    });
}

function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("visitor-email")?.value.trim();
        const message = document.getElementById("visitor-message")?.value.trim();
        const body = [
            message || "Hi Chandan, I saw your portfolio and would like to connect.",
            "",
            email ? `From: ${email}` : ""
        ].join("\n");

        const mailto = new URL("mailto:chandan.kumar.sah.teli2005@gmail.com");
        mailto.searchParams.set("subject", "Portfolio opportunity");
        mailto.searchParams.set("body", body);
        window.location.href = mailto.toString();
    });
}

document.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    event.preventDefault();
    navigateToSection(anchor.getAttribute("href").slice(1));
});

setInterval(updateClock, 1000);
updateClock();
setupTheme();
setupBackToTop();
setupApiConsole();
setupContactForm();
startTyping();
renderProjects("sde-projects", sdeProjects);
renderProjects("ai-projects", aiProjects);
