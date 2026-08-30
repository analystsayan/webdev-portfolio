const links = document.querySelectorAll('.link a');
const currentPage = location.pathname.split("/").pop(); // e.g., mobiles.html

links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});


const sliderContainer = document.querySelector('.slider-container');
const slides = sliderContainer.querySelectorAll('img');
let currentIndex = 0;
let interval;

function goToSlide(index) {
    sliderContainer.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
}

// Auto-slide every 2 seconds
interval = setInterval(nextSlide, 2000);

// Swipe Support
let startX = 0;

sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    clearInterval(interval); // pause auto sliding on touch
});

sliderContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = startX - endX;

    if (delta > 50) {
        // swipe left
        currentIndex = (currentIndex + 1) % slides.length;
    } else if (delta < -50) {
        // swipe right
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    goToSlide(currentIndex);
    interval = setInterval(nextSlide, 2000); // resume auto
});

// Initialize position
goToSlide(currentIndex);


