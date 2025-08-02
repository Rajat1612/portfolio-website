// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 25px rgba(139, 92, 246, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.1)';
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll animations for cards and timeline
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .education-card, .project-card, .certification-card, .skills-category');
    animateElements.forEach(function(el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Timeline animation on scroll
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach(function(item, index) {
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const timelineItems = timeline.querySelectorAll('.timeline-item');
        timelineItems.forEach(function(item) {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.6s ease';
        });
        timelineObserver.observe(timeline);
    }

    // Card hover effects
    document.querySelectorAll('.education-card, .project-card, .certification-card, .skills-category').forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skills list item hover effects
    document.querySelectorAll('.skills-list li').forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Typing effect for hero title
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

    // Initialize typing effect
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(function() {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }

    // Download resume functionality
    function downloadResume(event) {
        event.preventDefault();
        
        const resumeBtn = event.target;
        const originalText = resumeBtn.innerHTML;
        
        // Show loading state
        resumeBtn.innerHTML = '⬇ Opening...';
        resumeBtn.style.background = '#F59E0B';
        
        // Open resume in the same tab
        const resumePath = 'resume.pdf';
        
        // Navigate to the resume in the same tab
        window.location.href = resumePath;
        
        // Note: The button state won't reset since we're navigating away
        // But we'll keep the loading state for a moment before navigation
        setTimeout(function() {
            resumeBtn.innerHTML = '⬇ Opening Resume...';
            resumeBtn.style.background = '#3B82F6';
        }, 500);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .nav-link.active {
            color: #8B5CF6;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}); 