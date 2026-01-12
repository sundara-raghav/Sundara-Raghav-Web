import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- Utility Functions ---
const lerp = (start, end, factor) => start + (end - start) * factor;

// --- Typewriter Effect (Enhanced) ---
// Simulates blinking cursor and variable typing speed
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = ["Web Developer", "AWS Enthusiast", "Freelancer", "Prompt Engineer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex % words.length];

        if (isDeleting) {
            el.innerHTML = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deletion
        } else {
            el.innerHTML = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150 - Math.random() * 100; // Randomize typing speed for realism
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex++;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}


// --- Text Pressure Effect ---
// Uses Variable Fonts to adjust weight based on cursor proximity
function initTextPressure() {
    const containers = document.querySelectorAll('.text-pressure');

    containers.forEach(container => {
        const text = container.getAttribute('data-text-pressure');
        container.innerHTML = '';
        const chars = text.split('');

        // Create spans for each character
        chars.forEach(char => {
            const span = document.createElement('span');
            span.innerText = char;
            span.style.display = 'inline-block';
            span.style.transition = 'font-variation-settings 0.1s ease';
            // Default heavy
            span.style.fontVariationSettings = "'wght' 400";
            container.appendChild(span);
        });

        // Mouse listener
        const spans = container.querySelectorAll('span');

        // We track mouse relative to the container for better performance? 
        // Or global? Global allows "pressure" before hovering.
        // Let's use specific container hover/move for efficiency or global if requested "eyes style"
        // The Framer component usually reacts when hovering the component area.

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();

            spans.forEach(span => {
                const spanRect = span.getBoundingClientRect();
                const spanCenterX = spanRect.left + spanRect.width / 2;
                const spanCenterY = spanRect.top + spanRect.height / 2;

                const dist = Math.hypot(e.clientX - spanCenterX, e.clientY - spanCenterY);

                // Max distance to affect weight
                const maxDist = 200;

                // Map distance to weight (closer = heavier or lighter?)
                // Usually "pressure" means it gets fatter/wider.
                // Let's go from 100 (light) to 900 (heavy)
                // If dist is 0, weight is 900. If dist is maxDist, weight is 100.

                let weight = 800 - (dist / maxDist) * 700;
                weight = Math.max(100, Math.min(900, weight));

                span.style.fontVariationSettings = `'wght' ${weight}`;
            });
        });

        container.addEventListener('mouseleave', () => {
            spans.forEach(span => {
                span.style.fontVariationSettings = "'wght' 400";
            });
        });
    });
}


// --- Magnetic Buttons ---
function initMagnetButtons() {
    const bts = document.querySelectorAll('.magnet-button');

    bts.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            // Move button slightly
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });

            // Move interior svg/content slightly more for parallax
            gsap.to(btn.children, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
            gsap.to(btn.children, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}


// --- Eyes Follow Cursor (Refined) ---
function initEyes() {
    const eyesContainer = document.getElementById('eyes-container');
    if (!eyesContainer) return;

    const eyes = document.querySelectorAll('.eye');

    window.addEventListener('mousemove', (e) => {
        eyes.forEach(eye => {
            const pupil = eye.querySelector('.pupil');
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2; // Fixed typo

            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const dist = Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY);

            // Limit pupil movement radius
            const radius = Math.min(eyeRect.width / 4, dist / 10);

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            gsap.to(pupil, {
                x: x,
                y: y,
                duration: 0.1,
                overwrite: true
            });
        });
    });
}

// --- Theme Toggle ---
// --- Theme Toggle ---
function initTheme() {
    const btns = document.querySelectorAll('.theme-toggle-btn');
    const html = document.documentElement;

    // Default to LIGHT mode. Only add dark if explicitly requested (or temporarily disable dark default)
    if (localStorage.theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            html.classList.toggle('dark');
            // Animate the rotation
            gsap.fromTo(btn.querySelector('svg'), { rotation: 0 }, { rotation: 360, duration: 0.5 });

            if (html.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
            updateGradientTheme();
        });
    });
}

// --- Scroll to Top Button ---
function initScrollToTop() {
    const btn = document.getElementById('scrollToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-10');
            btn.classList.add('opacity-100', 'translate-y-0');
        } else {
            btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-10');
            btn.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- GSAP Animations ---
function initGSAP() {
    // Hero Text Stagger


    // Sections Reveal
    document.querySelectorAll("section").forEach(section => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    });

    // Conic Gradient Rotation
    gsap.to("#conic-gradient-bg", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });

    // Gradient styling
    updateGradientTheme();
}

function updateGradientTheme() {
    const gradient = document.getElementById('conic-gradient-bg');
    if (!gradient) return;

    const isDark = document.documentElement.classList.contains('dark');

    if (isDark) {
        // Deep Blue & Neon Cyan for Dark Mode
        gradient.style.background = 'conic-gradient(from 0deg at 50% 50%, #3b82f6 0deg, #06b6d4 120deg, #020617 240deg, #3b82f6 360deg)';
        gradient.style.opacity = '1';
    } else {
        // Soft Blue & Pastel Cyan for Light Mode (Premium Air look)
        gradient.style.background = 'conic-gradient(from 0deg at 50% 50%, #eff6ff 0deg, #dbeafe 120deg, #bfdbfe 240deg, #eff6ff 360deg)';
        // Make it subtle
        gradient.style.opacity = '0.8';
    }

    gradient.style.filter = 'blur(80px)';
    gradient.style.transform = 'scale(1.5)';
}



// --- Form Handling ---
function initContactForm() {
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Sending...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Message sent successfully! 🚀";
                    result.className = "text-center text-sm font-medium mt-4 text-green-500";
                    form.reset();
                } else {
                    result.innerHTML = json.message;
                    result.className = "text-center text-sm font-medium mt-4 text-red-500";
                }
            })
            .catch(error => {
                result.innerHTML = "Something went wrong!";
                result.className = "text-center text-sm font-medium mt-4 text-red-500";
            })
            .then(function () {
                setTimeout(() => {
                    result.style.display = "none";
                }, 5000);
            });
    });
}

// --- Mobile Menu ---
function initMobileMenu() {
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (!openBtn || !mobileMenu || !closeBtn) return;

    function openMenu() {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden'; // Lock scroll
    }

    function closeMenu() {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = ''; // Unlock scroll
    }

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}


// --- FAQ Accordion ---
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.icon');

        toggle.addEventListener('click', () => {
            // Close other open items (optional, but good for UX)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.icon');
                    otherContent.style.maxHeight = null;
                    otherIcon.classList.remove('rotate-45');
                }
            });

            // Toggle current
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.remove('rotate-45');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.add('rotate-45');
            }
        });
    });
}


// --- Circle Cursor Effect ---
function initCircleCursor() {
    // Settings
    const dotSize = 8;
    const ringSize = 32;
    const hoverScale = 1.5;
    const clickScale = 0.8;
    const animationDuration = 150; // ms

    // Check for mobile or tablet (based on UA or width)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 1024;
    if (isMobile) return;

    // Hide default cursor
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    // Create Elements
    const dot = document.createElement('div');
    const ring = document.createElement('div');

    // Common Styles
    [dot, ring].forEach(el => {
        el.style.position = 'fixed';
        el.style.top = '0';
        el.style.left = '0';
        el.style.borderRadius = '50%';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '10000';
    });

    // Dot Styles
    dot.style.width = `${dotSize}px`;
    dot.style.height = `${dotSize}px`;
    dot.style.backgroundColor = document.documentElement.classList.contains('dark') ? 'white' : 'black';
    dot.style.transition = `opacity 0.2s ease`; // Fade only

    // Ring Styles
    ring.style.width = `${ringSize}px`;
    ring.style.height = `${ringSize}px`;
    ring.style.border = `1.5px solid ${document.documentElement.classList.contains('dark') ? 'white' : 'black'}`;
    ring.style.backgroundColor = 'transparent';
    ring.style.transition = `transform ${animationDuration}ms ease-out, opacity 0.2s ease, border-color 0.2s ease`;

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    // State props
    let cursor = { x: -100, y: -100 };
    let isHovering = false;
    let isClicking = false;
    let isHidden = true;

    // Event Listeners
    window.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        isHidden = false;

        // Dot moves instantly
        dot.style.transform = `translate(${cursor.x - dotSize / 2}px, ${cursor.y - dotSize / 2}px)`;
        dot.style.opacity = 1;

        // Ring moves instantly too but relies on CSS transition for smoothing? 
        // The framer code updates react state and lets the style transition handle it.
        // For vanilla JS, updating style.transform on every mousemove with separate transition works well for delay.
        updateRing();
    });

    window.addEventListener('mousedown', () => { isClicking = true; updateRing(); });
    window.addEventListener('mouseup', () => { isClicking = false; updateRing(); });

    window.addEventListener('mouseenter', () => { isHidden = false; dot.style.opacity = 1; ring.style.opacity = 1; });
    window.addEventListener('mouseleave', () => { isHidden = true; dot.style.opacity = 0; ring.style.opacity = 0; });

    // Hover Detection
    const interactiveElements = 'a, button, input, textarea, .hover-trigger';
    const handleHover = () => { isHovering = true; updateRing(); };
    const handleLeave = () => { isHovering = false; updateRing(); };

    document.querySelectorAll(interactiveElements).forEach(el => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleLeave);
    });

    // Observer for new elements (like mobile menu open or dynamically added)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    if (node.matches(interactiveElements)) {
                        node.addEventListener('mouseenter', handleHover);
                        node.addEventListener('mouseleave', handleLeave);
                    }
                    node.querySelectorAll(interactiveElements).forEach(el => {
                        el.addEventListener('mouseenter', handleHover);
                        el.addEventListener('mouseleave', handleLeave);
                    });
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });


    // Theme Change Observer
    const themeObserver = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains('dark');
        const color = isDark ? 'white' : 'black';
        dot.style.backgroundColor = color;
        ring.style.borderColor = color;
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });


    function updateRing() {
        if (isHidden) {
            ring.style.opacity = 0;
            return;
        }
        ring.style.opacity = 1;

        let scale = 1;
        if (isHovering) scale = hoverScale;
        if (isClicking) scale = clickScale; // Click overrides hover in scale logic usually, or multiplies? Framer code uses ternary precedence.

        // Ring position calculation
        // To make it smooth via CSS transition, we just update the transform target
        ring.style.transform = `translate(${cursor.x - ringSize / 2}px, ${cursor.y - ringSize / 2}px) scale(${scale})`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    try { initTypewriter(); } catch (e) { console.error("Typewriter failed", e); }
    // try { initEyes(); } catch (e) { console.error("Eyes failed", e); }
    try { initTheme(); } catch (e) { console.error("Theme failed", e); }
    try { initGSAP(); } catch (e) { console.error("GSAP failed", e); }
    try { initTextPressure(); } catch (e) { console.error("Text Pressure failed", e); }
    try { initMagnetButtons(); } catch (e) { console.error("Magnet Buttons failed", e); }
    try { initContactForm(); } catch (e) { console.error("Contact Form failed", e); }
    try { initMobileMenu(); } catch (e) { console.error("Mobile Menu failed", e); }
    try { initScrollToTop(); } catch (e) { console.error("ScrollToTop failed", e); }
    try { initFAQ(); } catch (e) { console.error("FAQ failed", e); }
    try { initCircleCursor(); } catch (e) { console.error("Circle Cursor failed", e); }
});
