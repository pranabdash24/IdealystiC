document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loader = document.querySelector('.loader');
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navWrapper = document.querySelector('.nav-wrapper');
    const backToTop = document.getElementById('back-to-top');
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const contactForm = document.querySelector('.tech-contact-form form');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Preloader
    window.addEventListener('load', () => {
        loader?.classList.add('fade-out');
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
        }, 500);
    });

    // Smooth reveal animations on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('hero-card') || entry.target.classList.contains('service-card')) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}s`;
                }
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add delay to cards for staggered animation
    document.querySelectorAll('.hero-card, .service-card, .tech-card, .innovation-card').forEach((card, index) => {
        card.dataset.delay = index * 0.2;
        revealOnScroll.observe(card);
    });

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        revealOnScroll.observe(el);
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            if (currentScroll > lastScroll) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }

        // Back to top button visibility
        if (currentScroll > 500) {
            backToTop?.classList.add('show');
        } else {
            backToTop?.classList.remove('show');
        }
        
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    let scrollPosition = 0;
    menuToggle?.addEventListener('click', () => {
        // Handle different page structures
        if (navLinks) {
            navLinks.classList.toggle('active');
        } else if (navWrapper) {
            navWrapper.classList.toggle('active');
        }
        
        menuToggle.classList.toggle('active');
        
        if (!document.body.classList.contains('menu-open')) {
            scrollPosition = window.pageYOffset;
            document.body.classList.add('menu-open');
            document.body.style.top = `-${scrollPosition}px`;
        } else {
            document.body.classList.remove('menu-open');
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        }
    });

    // Mobile Dropdown Toggle
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        if (window.innerWidth <= 768) {
            link?.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileMenuActive = navLinks?.classList.contains('active') || navWrapper?.classList.contains('active');
        
        if (mobileMenuActive && !e.target.closest('.nav-links') && !e.target.closest('.nav-wrapper') && !menuToggle.contains(e.target)) {
            if (navLinks) navLinks.classList.remove('active');
            if (navWrapper) navWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        }
    });

    // Close mobile menu when clicking a link
    const allNavLinks = document.querySelectorAll('.nav-links a, .nav-wrapper a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (navWrapper) navWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks) navLinks.classList.remove('active');
                if (navWrapper) navWrapper.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Back to Top Button Click Handler
    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Testimonial Slider
    if (testimonialTrack && testimonials.length > 0) {
        let currentSlide = 0;
        const slideWidth = 100; // percentage

        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            testimonialTrack.style.transform = `translateX(-${slideWidth * currentSlide}%)`;
            updateDots();
        }

        prevButton?.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            goToSlide(currentSlide);
        });

        nextButton?.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            goToSlide(currentSlide);
        });

        // Auto-advance testimonials
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            goToSlide(currentSlide);
        }, 5000);
    }

    // Form Submission Handler
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.classList.add('success');
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('success');
                }, 2000);
            } catch (error) {
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                submitBtn.classList.add('error');
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('error');
                }, 2000);
            }
        });
    }

    // Particle.js Configuration
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00F5FF'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00F5FF',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
});