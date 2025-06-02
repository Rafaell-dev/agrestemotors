// Vehicle images data
const vehicleImages = [
    './assets/vehicles/main_photos/ford_0.jpeg',
    './assets/vehicles/main_photos/ford_1.jpeg',
    './assets/vehicles/main_photos/ford_2.jpeg',
    './assets/vehicles/main_photos/ford_3.jpeg',
    './assets/vehicles/main_photos/ford_4.jpeg',
    './assets/vehicles/main_photos/ford_5.jpeg',
    './assets/vehicles/main_photos/ford_6.jpeg',
    './assets/vehicles/main_photos/ford_7.jpeg',
];

let currentImageIndex = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeContactForm();
    updateImageCounter();
});

// Initialize image gallery
function initializeGallery() {
    const thumbnailsContainer = document.getElementById('thumbnails');
    const totalImagesElement = document.getElementById('totalImages');
    
    // Set total images count
    totalImagesElement.textContent = vehicleImages.length;
    
    // Generate thumbnails
    vehicleImages.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="Imagem ${index + 1}">`;
        thumbnail.addEventListener('click', () => selectImage(index));
        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Change main image
function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= vehicleImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = vehicleImages.length - 1;
    }
    
    updateMainImage();
    updateThumbnails();
    updateImageCounter();
}

// Select specific image
function selectImage(index) {
    currentImageIndex = index;
    updateMainImage();
    updateThumbnails();
    updateImageCounter();
}

// Update main image
function updateMainImage() {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = vehicleImages[currentImageIndex];
    
    // Add fade effect
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.style.opacity = '1';
    }, 100);
}

// Update thumbnail selection
function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === currentImageIndex);
    });
}

// Update image counter
function updateImageCounter() {
    const currentImageElement = document.getElementById('currentImage');
    currentImageElement.textContent = currentImageIndex + 1;
}

// Tab functionality
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    const tabButtons = document.getElementsByClassName('tab-btn');
    
    // Hide all tab contents
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Remove active class from all buttons
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Show selected tab and mark button as active
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin: 1rem 0; border: 1px solid #c3e6cb;">
            <i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
    `;
    
    const contactSection = document.querySelector('.contact-section');
    contactSection.insertBefore(successMessage, contactSection.querySelector('.contact-form'));
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// WhatsApp button functionality
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    const phoneBtn = document.querySelector('.btn-phone');
    
    whatsappBtn.addEventListener('click', function() {
        const message = encodeURIComponent('Olá! Tenho interesse no Toyota Etios 2020 anunciado no site.');
        const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
    
    phoneBtn.addEventListener('click', function() {
        window.location.href = 'tel:+5511333344444';
    });
});

// Smooth scrolling for internal links
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

// Add loading animation for images
function addImageLoadingEffect() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = '/placeholder.svg?height=400&width=600&text=Imagem+não+encontrada';
        });
    });
}

// Initialize image loading effects
document.addEventListener('DOMContentLoaded', addImageLoadingEffect);

// Add keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    }
});

// Add touch/swipe support for mobile gallery
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.main-image').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.main-image').addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            changeImage(1);
        } else {
            // Swipe right - previous image
            changeImage(-1);
        }
    }
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.vehicle-info, .details-tabs, .footer');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);