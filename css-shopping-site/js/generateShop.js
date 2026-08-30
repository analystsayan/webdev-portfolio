function generateShop(products, containerId) {
    const shopContainer = document.getElementById(containerId);
    if (!shopContainer) {
        console.error(`Container with id '${containerId}' not found.`);
        return;
    }

    let categories = {};

    products.forEach(product => {
        if (!categories[product.category]) categories[product.category] = [];
        categories[product.category].push(product);
    });

    Object.keys(categories).forEach(categoryName => {
        const categorySection = document.createElement("section");
        categorySection.classList.add("category");
        categorySection.innerHTML = `<h2>${categoryName}</h2><div class="products"></div>`;
        shopContainer.appendChild(categorySection);

        const productsContainer = categorySection.querySelector(".products");

        categories[categoryName].forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            const imagesHtml = product.images.map(img => `<img src="${img}" alt="${product.name}">`).join("");

            productCard.innerHTML = `
                <div class="image-slider">
                    <div class="slider-container">${imagesHtml}</div>
                    <button class="prev">&#10094;</button>
                    <button class="next">&#10095;</button>
                    <div class="dots"></div>
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>
                    <div class="btns">
                        <a href="${product.buyLink}" class="buy-now">Buy Now</a>
                    </div>
                </div>
            `;

            productsContainer.appendChild(productCard);
        });
    });
    setupSliders(); // Call after DOM is ready
}


// Function to setup image sliders
function setupSliders() {
    document.querySelectorAll('.image-slider').forEach(slider => {
        let currentIndex = 0;
        const images = slider.querySelectorAll('.slider-container img');
        const sliderContainer = slider.querySelector('.slider-container');
        const dotsContainer = slider.querySelector('.dots');

        // Set CSS dynamically for proper sliding effect
        sliderContainer.style.display = "flex";
        sliderContainer.style.transition = "transform 0.3s ease-in-out";
        sliderContainer.style.width = `${images.length * 100}%`;
        
        images.forEach(img => img.style.width = `${100 / images.length}%`);

        // Create dots dynamically
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('span');

        function updateSlider() {
            sliderContainer.style.transform = `translateX(-${currentIndex * (100 / images.length)}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        // Next and Previous Button Functions
        slider.querySelector('.next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        });

        slider.querySelector('.prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        });

        // Click on dots to navigate
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // --- Add Swipe Functionality for Mobile ---
        let touchStartX = 0;
        let touchEndX = 0;

        sliderContainer.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
        });

        sliderContainer.addEventListener('touchmove', (event) => {
            touchEndX = event.touches[0].clientX;
        });

        sliderContainer.addEventListener('touchend', () => {
            let swipeDistance = touchStartX - touchEndX;

            if (swipeDistance > 50) { 
                // Swipe Left (Next)
                currentIndex = (currentIndex + 1) % images.length;
            } else if (swipeDistance < -50) { 
                // Swipe Right (Previous)
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }

            updateSlider();
        });

        updateSlider(); // Initialize slider position
    });
}