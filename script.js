// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark/Light Mode Toggle ---
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        // Ensure dark is there by default if no pref
        body.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // --- Typing Animation ---
    const textElement = document.querySelector('.typing');
    if (textElement) {
        const content = "Data Analyst & Front-End Developer"; // Hardcoded for animation
        textElement.textContent = '';
        let i = 0;
        
        function type() {
            if (i < content.length) {
                textElement.textContent += content.charAt(i);
                i++;
                setTimeout(type, 80);
            }
        }
        
        // Start animation after a short delay
        setTimeout(type, 500);
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- Scroll Reveal Animation ---
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    fadeElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Dynamic Year for Footer ---
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- Carousel Logic ---
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        
        // Card width (340) + gap (30) = 370
        const scrollAmount = 370; 

        if (prevBtn && nextBtn && track) {
            
            // Hide buttons if there's no overflow
            const updateButtonVisibility = () => {
                if (track.scrollWidth <= track.clientWidth) {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                } else {
                    prevBtn.style.display = 'flex';
                    nextBtn.style.display = 'flex';
                }
            };
            
            // Wait for initial render to calculate widths
            setTimeout(updateButtonVisibility, 100);
            window.addEventListener('resize', updateButtonVisibility);

            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            // Auto scroll feature
            let isHovered = false;
            carousel.addEventListener('mouseenter', () => isHovered = true);
            carousel.addEventListener('mouseleave', () => isHovered = false);

            setInterval(() => {
                // Only auto-scroll if there are overflowing items and user isn't hovering
                if (!isHovered && track.scrollWidth > track.clientWidth) {
                    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                        track.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                }
            }, 4000);
        }
    });

});

// Global functions for Modal (to be accessible outside DOMContentLoaded)
window.openModal = function(imgSrc) {
    document.getElementById("modal-img").src = imgSrc;
    document.getElementById("modal").classList.add("show");
}

window.closeModal = function() {
    document.getElementById("modal").classList.remove("show");
}

// Close modal when clicking outside the image
document.getElementById('modal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
