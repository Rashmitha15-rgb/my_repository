// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Add glow effect tracking mouse for cards (Glassmorphism glow sync)
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Intersection Observer for scroll animations (fade-in)
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Dynamic role text changing
const roles = ["Software Engineer", "Web Developer", "UI/UX Enthusiast", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleElement = document.querySelector(".role-text");

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed /= 2;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }
    
    setTimeout(type, typeSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    if(roleElement) {
        setTimeout(type, 1000);
    }
});

// Navbar background change on scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(11, 15, 25, 0.95)";
        navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
    } else {
        navbar.style.background = "rgba(11, 15, 25, 0.8)";
        navbar.style.boxShadow = "none";
    }
});
