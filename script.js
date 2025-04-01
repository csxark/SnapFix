// Modal functionality
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeBtns = document.querySelectorAll('.close');

// Sample data for service providers
const serviceProviders = [
    { id: 1, name: "Dummy2", service: "Electrician", rating: 4.8, reviews: 156 },
    { id: 2, name: "Dummy3", service: "Plumber", rating: 4.7, reviews: 123 },
    { id: 3, name: "Dummy1", service: "Carpenter", rating: 4.9, reviews: 89 },
    { id: 4, name: "Dummy4", service: "Electrician", rating: 4.6, reviews: 94 },
    { id: 5, name: "Dummy5", service: "Plumber", rating: 4.5, reviews: 76 }
];

// Show modals
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

// Close modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === registerModal) {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    }
});

// Handle form submissions
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Add login logic here
    alert('Login functionality to be implemented');
    loginModal.style.display = 'none';
});

document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Add registration logic here
    alert('Registration functionality to be implemented');
    registerModal.style.display = 'none';
});

// Populate leaderboard
function populateLeaderboard() {
    const leaderboardContainer = document.querySelector('.leaderboard-container');
    if (!leaderboardContainer) return;
    
    // Sort service providers by rating
    const sortedProviders = [...serviceProviders].sort((a, b) => b.rating - a.rating);
    
    leaderboardContainer.innerHTML = sortedProviders.map((provider, index) => `
        <div class="provider-card" style="background-color: #fff; padding: 1rem; margin: 1rem 0; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h3>#${index + 1} ${provider.name}</h3>
            <p>Service: ${provider.service}</p>
            <p>Rating: ${provider.rating} ⭐ (${provider.reviews} reviews)</p>
        </div>
    `).join('');
}

// Initialize leaderboard
populateLeaderboard();

// Add booking functionality to service cards
document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const isLoggedIn = false; // Replace with actual login check
        if (!isLoggedIn) {
            e.preventDefault();
            loginModal.style.display = 'block';
        }
    });
});

// Handle booking form
document.addEventListener('DOMContentLoaded', function() {
    // Handle service selection
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const serviceName = this.querySelector('h3').textContent;
            localStorage.setItem('selectedService', serviceName);
        });
    });

    // Pre-select service in booking form if coming from service card
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        const selectedService = localStorage.getItem('selectedService');
        if (selectedService) {
            const options = serviceSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].text.toLowerCase() === selectedService.toLowerCase()) {
                    serviceSelect.selectedIndex = i;
                    break;
                }
            }
            localStorage.removeItem('selectedService'); // Clear after use
        }
    }

    // Handle form submission
    const bookingForm = document.querySelector('.booking-form');
    const confirmationMessage = document.querySelector('.booking-confirmation');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = ['service', 'date', 'time', 'name', 'email', 'phone', 'address'];
            const missingFields = requiredFields.filter(field => !this[field].value);
            
            if (missingFields.length > 0) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email.value)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Validate phone number (basic format)
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(this.phone.value)) {
                alert('Please enter a valid phone number');
                return;
            }
            
            // Validate date is not in the past
            const selectedDate = new Date(this.date.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date');
                return;
            }
            
            // Hide the form
            bookingForm.style.display = 'none';
            
            // Show initial confirmation message
            confirmationMessage.innerHTML = `
                <h3>Booking confirmed!</h3>
                <p>Scanning for nearest service provider<span class="scanning-animation"></span></p>
            `;
            confirmationMessage.style.display = 'block';

            // Simulate finding a service provider
            setTimeout(() => {
                confirmationMessage.innerHTML = `
                    <h3>Service Provider Found!</h3>
                    <p>A professional will contact you shortly.</p>
                `;
                
                // Reset and show form after 3 seconds
                setTimeout(() => {
                    confirmationMessage.style.display = 'none';
                    bookingForm.style.display = 'block';
                    bookingForm.reset();
                }, 3000);
            }, 3000);
        });
    }
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks?.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.menu-toggle')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
}); 