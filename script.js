// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===== HERO CAROUSEL =====
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
let carouselInterval;

function showSlide(index) {
    carouselSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            indicators[i].classList.add('active');
        }
    });
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % carouselSlides.length;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(prev);
}

function startCarousel() {
    carouselInterval = setInterval(nextSlide, 6000);
}

function resetCarousel() {
    clearInterval(carouselInterval);
    startCarousel();
}

if (carouselPrev && carouselNext) {
    carouselPrev.addEventListener('click', () => {
        prevSlide();
        resetCarousel();
    });
    
    carouselNext.addEventListener('click', () => {
        nextSlide();
        resetCarousel();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetCarousel();
        });
    });
    
    startCarousel();
}

// ===== TESTIMONIALS CAROUSEL =====
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    currentTestimonial = index;
}

if (testimonialPrev && testimonialNext) {
    testimonialNext.addEventListener('click', () => {
        const next = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(next);
    });
    
    testimonialPrev.addEventListener('click', () => {
        const prev = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(prev);
    });
}

// ===== ANIMATED COUNTERS =====
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

function animateCounters() {
    if (counted) return;
    
    const section = document.querySelector('.stats-section');
    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight;
    
    if (sectionPos < screenPos) {
        counted = true;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 30);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FORM VALIDATION (for booking pages) =====
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Show success message
            alert('Thank you! Your booking request has been submitted successfully. We will contact you shortly.');
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Initialize form validation on booking page
document.addEventListener('DOMContentLoaded', () => {
    validateForm('bookingForm');
    validateForm('contactForm');
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.practice-card, .feature-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
