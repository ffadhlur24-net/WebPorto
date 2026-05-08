/* ===================================
   TYPING EFFECT
   ==================================== */

const roles = [
    'Web Developer yang Sedang Berkembang',
    'Mahasiswa UIN Walisongo',
    'Digital Designer',
    'Problem Solver'
];

let currentRole = 0;
let currentChar = 0;
let isDeleting = false;
let typingSpeed = 60;

function typeEffect() {
    const typingElement = document.querySelector('.typing-text');
    const currentText = roles[currentRole];

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, currentChar + 1);
        currentChar++;

        if (currentChar === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause before deleting
        } else {
            typingSpeed = 60;
        }
    } else {
        typingElement.textContent = currentText.substring(0, currentChar - 1);
        currentChar--;

        if (currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next role
        } else {
            typingSpeed = 30;
        }
    }

    setTimeout(typeEffect, typingSpeed);
}

// ===================================
// NAVBAR ACTIVE LINK & SMOOTH SCROLL
// ===================================

const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-card, .project-card, .contact-info, .contact-form').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// ===================================
// PROJECT MODAL
// ===================================

const projectData = {
    '1': {
        title: 'Web Portofolio',
        desc: 'Website portfolio pertama saya yang dibuat dengan HTML, CSS, dan JavaScript murni. Menampilkan keahlian dalam responsive design dan animasi moden.',
        image: 'projeck1.png',
        badges: ['HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/ffadhlur24-net/my-website.git',
        live: 'https://ffadhlur24-net.github.io/my-website/'
    },
    '2': {
        title: 'Halaman Profil',
        desc: 'Website halaman profil sederhana yang interaktif dan responsif dengan gaya dan animasi yang modern.',
        image: 'projeck3.png',
        badges: ['HTML', 'CSS', 'JavaScript'],
        github:'https://github.com/ffadhlur24-net/halaman-profil.git',
        live:'https://ffadhlur24-net.github.io/halaman-profil/'
    },
    '3': {
        title: 'Weather App',
        desc: 'Sebuah website yang menampilkan kondisi cuaca pada suatu daerah, yang datanya diambil melalui API. Dan ini website pertaam saya yang menggunakan API.',
        image: 'projeck4.png',
        badges: ['HTML', 'CSS', 'JavaScript', 'API'],
        github:'https://github.com/ffadhlur24-net/weather.git',
        live:'https://ffadhlur24-net.github.io/weather/'
    }
};

const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

// Open modal
projectCards.forEach(card => {
    const detailBtn = card.querySelector('.detail-btn');
    detailBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];

        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDesc').textContent = project.desc;
        document.getElementById('modalPrimary').onclick = function () { window.open(project.github, '_blank')}
        document.getElementById('modalSecond').onclick = function () {window.open(project.live, '_blank')}

        const badgesContainer = document.getElementById('modalBadges');
        badgesContainer.innerHTML = '';
        project.badges.forEach(badge => {
            const badgeEl = document.createElement('span');
            badgeEl.className = 'badge';
            badgeEl.textContent = badge;
            badgesContainer.appendChild(badgeEl);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Simple validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Mohon isi semua field');
        return;
    }

    // Simulate sending
    const originalText = e.target.querySelector('button').textContent;
    const button = e.target.querySelector('button');
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';

    // Reset after 3 seconds
    setTimeout(() => {
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        button.disabled = false;
        button.innerHTML = originalText;
    }, 3000);
});

// ===================================
// SMOOTH SCROLL TO TOP
// ===================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #00d9ff, #0099ff);
    color: #0f0f1e;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0)';
});

// ===================================
// CURSOR GLOW EFFECT
// ===================================

const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #00d9ff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    opacity: 0.5;
    box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
    display: none;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = (e.clientX - 10) + 'px';
    cursor.style.top = (e.clientY - 10) + 'px';
    cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

// ===================================
// DOWNLOAD CV BUTTON
// ===================================

const downloadBtn = document.querySelector('.btn-primary');
downloadBtn.addEventListener('click', () => {
    // Create a dummy link to trigger download
    const link = document.createElement('a');
    link.href = 'fadhlurrohman-cv.pdf';
    link.download = 'fadhlurrohman-cv.pdf';
    link.click();
});

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    typeEffect();

    // Add stagger to skill cards animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
    });

    // Add stagger to project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
    });

    console.log('[v0] Portfolio initialized successfully');
});
