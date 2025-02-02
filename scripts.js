// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll Animation Trigger
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Close mobile menu on click
document.querySelectorAll('.nav-links a').forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    reveal();
    // Add reveal class to all animated elements
    document.querySelectorAll('.service-card, .mv-card, .testimonial-card').forEach(el => {
        el.classList.add('reveal');
    });
});
// Vertical-specific animations
function initVerticalAnimations() {
    // TechEdge glitch effect
    document.querySelectorAll('.cyber-text').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.textShadow = `
                0 0 10px ${getComputedStyle(document.documentElement)
                    .getPropertyValue('--secondary-color')},
                -2px -2px 0 #fff,
                2px 2px 0 #000
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.textShadow = 
                '0 0 15px rgba(0,194,209,0.5)';
        });
    });

    // BizCatalyst chart animations
    document.querySelectorAll('.metric-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const chart = card.querySelector('div[class$="-chart"], div[class$="-flow"]');
            if(chart) {
                chart.style.animation = 'chartGrow 1s ease';
            }
        });
    });
}

// Initialize vertical-specific features
document.addEventListener('DOMContentLoaded', () => {
    initVerticalAnimations();
});