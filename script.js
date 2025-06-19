document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // --- Smooth Scrolling ---
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - (header ? header.offsetHeight : 0);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

     // --- Active link highlighting on scroll ---
     const sections = document.querySelectorAll('section[id]');
     const allNavLinks = document.querySelectorAll('.nav-menu a.nav-link');

     function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - (header ? header.offsetHeight + 50 : 50);
            const sectionId = current.getAttribute('id');
            
            const navLinkForSection = document.querySelector('.nav-menu a.nav-link[href*="#' + sectionId + '"]');

            if (navLinkForSection) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    allNavLinks.forEach(link => link.classList.remove('active'));
                    navLinkForSection.classList.add('active');
                }
            }
        });
        // Special case for top of page / hero
        if (sections.length > 0 && scrollY < sections[0].offsetTop - (header ? header.offsetHeight + 50 : 50)) {
            allNavLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-menu a.nav-link[href*="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
     }
     window.addEventListener('scroll', navHighlighter);
     navHighlighter(); // Initial call

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { 
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    }

    // --- Scroll Animations with IntersectionObserver ---
    const scrollAnimatedElements = document.querySelectorAll('.animate-on-scroll');

    if ("IntersectionObserver" in window) {
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // observer.unobserve(entry.target); // Uncomment to animate only once
                } else {
                    // entry.target.classList.remove('visible'); // Uncomment to re-animate
                }
            });
        };
        const scrollObserver = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.15,
        });
        scrollAnimatedElements.forEach(el => scrollObserver.observe(el));
    } else {
        // Fallback for older browsers
        scrollAnimatedElements.forEach(el => el.classList.add('visible'));
    }

    // Animate elements that are for immediate display on load
    const animateOnLoadElements = document.querySelectorAll('.animate-on-load');
    animateOnLoadElements.forEach(el => {
        setTimeout(() => el.classList.add('visible'), 50);
    });

    // --- Footer Current Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});