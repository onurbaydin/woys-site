// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer for Interactivity
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove to replay animation when scrolling past
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Active Link Highlighter in Header Navigation
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }

    // GSAP Horizontal Scroll for Features Section
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const scrollContainer = document.querySelector(".horizontal-scroll-container");
        const scrollSection = document.querySelector(".horizontal-scroll-section");

        if (scrollContainer && scrollSection) {
            function getScrollAmount() {
                let scrollWidth = scrollContainer.scrollWidth;
                return -(scrollWidth - window.innerWidth);
            }

            gsap.to(scrollContainer, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: scrollSection,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`
                }
            });
        }
    }
});

