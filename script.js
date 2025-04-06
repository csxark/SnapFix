// Add at the beginning of script.js
class ErrorBoundary {
    static handleError(error, errorInfo) {
        console.error('Error occurred:', error);
        // Send to error reporting service
        this.logError(error, errorInfo);
    }

    static logError(error, errorInfo) {
        // Implement error logging logic
    }
}

// Constants
const TIMING = {
    LOADER_FADE: 1000,
    LOADER_REMOVE: 2000
};

// Modal Handler
class ModalHandler {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.triggers = {
            login: document.querySelector('.login-btn'),
            signup: document.querySelector('.signup-btn'),
            bookNow: document.querySelector('.cta-button')
        };
        this.init();
    }

    init() {
        // Setup triggers
        this.triggers.login?.addEventListener('click', () => this.openModal('loginModal'));
        this.triggers.signup?.addEventListener('click', () => this.openModal('registerModal'));
        this.triggers.bookNow?.addEventListener('click', () => this.openModal('loginModal'));

        // Setup close buttons
        document.querySelectorAll('.close-modal').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Setup switch form links
        document.querySelectorAll('.switch-form').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const currentModal = e.target.closest('.modal');
                const targetModalId = e.target.dataset.target;
                this.switchModal(currentModal, targetModalId);
            });
        });

        // Setup form submissions
        document.getElementById('loginForm')?.addEventListener('submit', this.handleLogin.bind(this));
        document.getElementById('registerForm')?.addEventListener('submit', this.handleRegister.bind(this));

        // Close modal when clicking outside
        this.modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.style.display = 'flex';
        // Trigger reflow
        modal.offsetHeight;
        modal.classList.add('show');
    }

    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    switchModal(currentModal, targetModalId) {
        this.closeModal(currentModal);
        setTimeout(() => {
            this.openModal(targetModalId);
        }, 300);
    }

    handleLogin(e) {
        e.preventDefault();
        // Add your login logic here
        console.log('Login submitted');
        
        // Simulate successful login
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Here you would typically validate credentials with your backend
        if (email && password) {
            // Store user info in session/local storage if needed
            localStorage.setItem('userEmail', email);
            
            // Redirect to service confirmation page
            window.location.href = 'serviceconfirm.html';
        }
    }

    handleRegister(e) {
        e.preventDefault();
        // Add your registration logic here
        console.log('Registration submitted');

        // Simulate successful registration
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Here you would typically send registration data to your backend
        if (password === confirmPassword && email && name && phone) {
            // Store user info in session/local storage if needed
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('userPhone', phone);

            // Redirect to service confirmation page
            window.location.href = 'serviceconfirm.html';
        }
    }
}

// Smooth Scroll Handler
class SmoothScrollHandler {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Hamburger Menu Handler
class HamburgerMenuHandler {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navbarContent = document.querySelector('.navbar-content');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navbarContent) return;
        
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navbarContent.classList.toggle('active');
            
            // Add animation to hamburger
            const spans = this.hamburger.querySelectorAll('span');
            if (this.hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && 
                !this.navbarContent.contains(e.target) && 
                this.navbarContent.classList.contains('active')) {
                this.hamburger.click();
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modals
    new ModalHandler();

    // Initialize smooth scroll
    new SmoothScrollHandler();

    // Initialize hamburger menu
    new HamburgerMenuHandler();
});

// Error handling
window.addEventListener('error', (error) => {
    console.error('An error occurred:', error.message);
    // You could add error reporting service here
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Function to generate a random booking ID
function generateBookingId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `BK-${timestamp}-${randomStr}`.toUpperCase();
}

// Function to format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to handle form submission and show confirmation
function handleServiceFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const bookingData = {
        bookingId: generateBookingId(),
        timestamp: new Date().toLocaleString(),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        altPhone: formData.get('altPhone') || 'Not provided',
        service: formData.get('service'),
        date: formatDate(formData.get('date')),
        time: formData.get('time'),
        address: formData.get('address'),
        landmark: formData.get('landmark'),
        description: formData.get('description'),
        urgency: formData.get('urgency')
    };

    // Update confirmation screen with booking details
    document.querySelector('.booking-id').textContent = bookingData.bookingId;
    document.querySelector('.booking-timestamp').textContent = bookingData.timestamp;
    
    const detailsContainer = document.querySelector('.booking-details');
    detailsContainer.innerHTML = `
        <div class="detail-item"><strong>Name:</strong> ${bookingData.fullName}</div>
        <div class="detail-item"><strong>Email:</strong> ${bookingData.email}</div>
        <div class="detail-item"><strong>Phone:</strong> ${bookingData.phone}</div>
        <div class="detail-item"><strong>Alternate Phone:</strong> ${bookingData.altPhone}</div>
        <div class="detail-item"><strong>Service:</strong> ${bookingData.service}</div>
        <div class="detail-item"><strong>Date:</strong> ${bookingData.date}</div>
        <div class="detail-item"><strong>Time:</strong> ${bookingData.time}</div>
        <div class="detail-item"><strong>Address:</strong> ${bookingData.address}</div>
        <div class="detail-item"><strong>Landmark:</strong> ${bookingData.landmark}</div>
        <div class="detail-item"><strong>Description:</strong> ${bookingData.description}</div>
        <div class="detail-item"><strong>Urgency:</strong> ${bookingData.urgency}</div>
    `;

    // Show confirmation screen
    const confirmationOverlay = document.querySelector('.confirmation-overlay');
    confirmationOverlay.style.display = 'flex';

    // Store booking data in localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Function to handle print button click
function handlePrint() {
    window.print();
}

// Function to handle return to home
function returnToHome() {
    window.location.href = 'index.html';
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const serviceForm = document.getElementById('serviceBookingForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', handleServiceFormSubmit);
    }

    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', handlePrint);
    }

    const homeBtn = document.querySelector('.home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', returnToHome);
    }
});
