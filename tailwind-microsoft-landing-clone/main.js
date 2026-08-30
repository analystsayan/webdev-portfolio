const moreButton = document.getElementById('moreButton');
const moreSublist = document.getElementById('moreSublist');

moreButton.addEventListener('click', () => {
  moreSublist.classList.toggle('hidden'); // Toggle the 'hidden' class
});

// play pause right lest landing

const swiperContainer = document.querySelector(".swiper-container");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const leftToggle = document.getElementById("leftToggle");
const rightToggle = document.getElementById("rightToggle");

let autoSlideInterval;
let isPaused = false;

// Helper function to slide left
const slideLeft = () => {
  swiperContainer.scrollBy({
    left: -swiperContainer.offsetWidth, // Move one slide left
    behavior: "smooth",
  });
};

// Helper function to slide right
const slideRight = () => {
  swiperContainer.scrollBy({
    left: swiperContainer.offsetWidth, // Move one slide right
    behavior: "smooth",
  });
};

// Function to start auto-sliding
const startAutoSlide = () => {
  if (autoSlideInterval) clearInterval(autoSlideInterval);

  autoSlideInterval = setInterval(() => {
    if (!isPaused) {
      if (swiperContainer.scrollLeft + swiperContainer.offsetWidth >= swiperContainer.scrollWidth) {
        // If at the end, go back to the start
        swiperContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slideRight();
      }
    }
  }, 3000); // 3 seconds
};

// Toggle visibility of play and pause buttons
const togglePlayPauseVisibility = () => {
  if (playButton.style.display === "none") {
    playButton.style.display = "block";
    pauseButton.style.display = "none";
  } else {
    playButton.style.display = "none";
    pauseButton.style.display = "block";
  }
};

// Event listener for play button
playButton.addEventListener("click", () => {
  isPaused = false;
  togglePlayPauseVisibility(); // Hide play and show pause
  startAutoSlide();
});

// Event listener for pause button
pauseButton.addEventListener("click", () => {
  isPaused = true;
  togglePlayPauseVisibility(); // Hide pause and show play
  clearInterval(autoSlideInterval);
});

// Event listener for left toggle
leftToggle.addEventListener("click", () => {
  isPaused = true; // Pause auto-sliding when manual control is used
  clearInterval(autoSlideInterval);
  slideLeft();
});

// Event listener for right toggle
rightToggle.addEventListener("click", () => {
  isPaused = true; // Pause auto-sliding when manual control is used
  clearInterval(autoSlideInterval);
  slideRight();
});

// Initialize auto-sliding
startAutoSlide();
playButton.style.display = "none"; // Ensure only play button is visible initially





// sidebar open close
const openButton = document.getElementById('openSidebar');
const closeButton = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');

// Open Sidebar
openButton.addEventListener('click', () => {
    sidebar.style.left = '0'; // Slide in from the left
    openButton.style.display = 'none'; // Hide Open button
    closeButton.style.display = 'inline-block'; // Show Close button
});

// Close Sidebar
closeButton.addEventListener('click', () => {
    sidebar.style.left = '-1000px'; // Slide out to the left
    closeButton.style.display = 'none'; // Hide Close button
    openButton.style.display = 'inline-block'; // Show Open button
});

