// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Your Project Name] - Initializing...');
    
    // Initialize all components
    initCurrentYear();
    initBackToTop();
    initSmoothScrolling();
    initLazyLoading();
    initInteractiveElements();
    initAnimations();
    
    // Initialize video background for index.html
    initVideoBackground();
    
    // Performance optimization
    optimizePerformance();
    
    console.log('[Your Project Name] - Initialization complete');
});


// Set current year in footer
function initCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize lazy loading
function initLazyLoading() {
    // Use native lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Add intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize interactive elements
function initInteractiveElements() {
    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                    observer.unobserve(bar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(bar);
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        if (!stat.textContent.includes('+') && !stat.textContent.includes('/')) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(stat);
                        observer.unobserve(stat);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            observer.observe(stat);
        }
    });
}

// Video background control
function initVideoBackground() {
    const video = document.getElementById('backgroundVideo');
    if (video) {
        // Play video after user interaction (autoplay may be blocked)
        document.addEventListener('click', function initVideo() {
            if (video.paused) {
                video.play().catch(e => console.log('Video play failed:', e));
            }
            document.removeEventListener('click', initVideo);
        });
        
        // Handle video source switching based on orientation
        function updateVideoSource() {
            const isMobile = window.innerWidth <= 768;
            const sources = video.querySelectorAll('source');
            
            sources.forEach(source => {
                const isPortrait = source.getAttribute('media') === '(max-width: 767px)';
                if ((isMobile && isPortrait) || (!isMobile && !isPortrait)) {
                    if (video.currentSrc !== source.src) {
                        video.src = source.src;
                        video.load();
                        video.play().catch(e => console.log('Video play failed:', e));
                    }
                }
            });
        }
        
        // Update on resize
        window.addEventListener('resize', updateVideoSource);
        updateVideoSource(); // Initial check
    }
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 1500; // ms
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

// Initialize animations
function initAnimations() {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-cta');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = (index * 0.1) + 's';
    });
    
    // Trigger animations after page load
    setTimeout(triggerAnimations, 500);
}

// Trigger animations
function triggerAnimations() {
    const animateElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-cta');
    
    animateElements.forEach(el => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card, .objective-card, .arch-layer, .future-item-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll actions
        }, 100);
    });
    
    // Optimize images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading attribute if not present
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add decoding async
        if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
            });
        });
    }
});

// Download project report function
function downloadProjectReport() {
    // In a real scenario, this would link to an actual PDF file
    alert('Project report download link will be provided here. In a real implementation, this would download the PDF file.');
    
    // If you have a real PDF file, use this:
    // window.open('path/to/your/project-report.pdf', '_blank');
}