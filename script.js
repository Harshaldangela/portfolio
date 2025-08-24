// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Dynamic typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', function() {
    setTimeout(() => {
        const subtitle = document.querySelector('.hero .subtitle');
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 50);
    }, 1000);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px)';
    });
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            if (target % 1 === 0) {
                stat.textContent = Math.floor(current);
            } else {
                stat.textContent = current.toFixed(1);
            }
        }, 40);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            aboutObserver.unobserve(entry.target);
        }
    });
});
aboutObserver.observe(aboutSection);

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add some interactive particles to hero background
function createParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float-particle {
        0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.5; }
        100% { transform: translateY(-20px) translateX(10px) rotate(180deg); opacity: 1; }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles
window.addEventListener('load', createParticles);

// Add skill tag click effects
document.querySelectorAll('.skill-tag, .tech-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
});

// Add pulse animation
const pulseStyles = document.createElement('style');
pulseStyles.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyles);

// Progressive loading of sections
let sectionsLoaded = 0;
const totalSections = document.querySelectorAll('.section').length;

function loadSection(section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        section.style.transition = 'all 0.8s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, sectionsLoaded * 200);
    
    sectionsLoaded++;
}

// Initialize progressive loading
window.addEventListener('load', function() {
    document.querySelectorAll('.section').forEach(section => {
        loadSection(section);
    });
});