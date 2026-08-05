/**
 * Nihith Portfolio - Main Script
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.textContent = '☰';
                }
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    
    // Initialize the navbar state on page load
    handleScroll();

    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade In Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Active Navigation Link Highlight
    const sections = document.querySelectorAll('.section, .hero');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                activeNavLinks = document.querySelectorAll('.nav-link');
                
                activeNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Typing Animation for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.borderRight = '3px solid var(--highlight-color)';
            heroTitle.style.animation = 'blink 1s infinite';
            
            // Add blinking cursor animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes blink {
                    0%, 50% { border-color: transparent; }
                    51%, 100% { border-color: var(--highlight-color); }
                }
            `;
            document.head.appendChild(style);
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                heroTitle.style.border = 'none';
                heroTitle.style.animation = 'none';
            }, 3000);
        }
    }, 1500);

    // Form Submit Handling with Formspree via AJAX
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value;
            
            // Change button text and disable it
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            
            // Send form data to Formspree using fetch API
            fetch('https://formspree.io/f/mnnblqgd', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    formStatus.className = 'success';
                    formStatus.innerHTML = `Thank you ${name}! Your message has been sent successfully. I'll get back to you soon.`;
                    contactForm.reset();
                    
                    // Fade out the success message after 2 seconds
                    setTimeout(() => {
                        formStatus.style.opacity = '0';
                        setTimeout(() => {
                            formStatus.style.display = 'none';
                            formStatus.className = '';
                        }, 300); // Wait for fade out transition to complete
                    }, 2000);
                } else {
                    // Show error message
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                formStatus.className = 'error';
                formStatus.innerHTML = 'Oops! There was a problem submitting your form. Please try again later.';
                console.error(error);
                
                // Fade out the error message after 2 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.className = '';
                    }, 300); // Wait for fade out transition to complete
                }, 2000);
            })
            .finally(() => {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerText = 'Send Message';
                
                // Scroll to the status message
                formStatus.scrollIntoView({behavior: 'smooth', block: 'center'});
            });
        });
    }
});
