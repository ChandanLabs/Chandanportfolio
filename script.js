
    // Smooth typing effect for role
    const roles = ["Backend Developer", "AI_Cloud & DevOps Enthusiast", "Software Engineer"];
    let roleIndex = 0;
    let charIndex = 0;
    const roleElement = document.getElementById("role");

    function typeRole() {
        if (charIndex < roles[roleIndex].length) {
            roleElement.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeRole, 100);
        } else {
            setTimeout(eraseRole, 2000); // Wait longer before erasing
        }
    }

    function eraseRole() {
        if (charIndex > 0) {
            roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseRole, 50);
        } else {
            // FIX: This was the critical bug. It now correctly uses .length
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500); // Wait before typing the next role
        }
    }
    // Start the effect
    document.addEventListener("DOMContentLoaded", typeRole);

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


