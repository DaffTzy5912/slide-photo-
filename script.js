let slider = document.querySelector(".slider");
let slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const slideWidth = slides[0].offsetWidth + 20; // Termasuk margin
let isSwiping = false;
let startX = 0;
let currentX = -slideWidth;
let velocity = 0.5;
let autoSlideInterval;
let manualSlide = false;

slider.style.transform = `translateX(${currentX}px)`;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (!manualSlide) {
            currentX -= velocity;
            slider.style.transform = `translateX(${currentX}px)`;
        }

        if (Math.abs(currentX) >= (totalSlides - 1) * slideWidth) {
            slider.style.transition = "none";
            currentX = -slideWidth;
            slider.style.transform = `translateX(${currentX}px)`;
        }
    }, 16);
}

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    manualSlide = true;
    clearInterval(autoSlideInterval);
});

slider.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    let moveX = e.touches[0].clientX - startX;
    slider.style.transition = "none";
    slider.style.transform = `translateX(${currentX + moveX}px)`;
});

slider.addEventListener("touchend", (e) => {
    isSwiping = false;
    let endX = e.changedTouches[0].clientX;
    let difference = endX - startX;

    if (difference > 50) {
        currentX += slideWidth;
    } else if (difference < -50) {
        currentX -= slideWidth;
    }

    slider.style.transition = "transform 0.4s ease-out";
    slider.style.transform = `translateX(${currentX}px)`;

    setTimeout(() => {
        manualSlide = false;
        startAutoSlide();
    }, 2000);
});

startAutoSlide();

let overlay = document.getElementById("overlay");
let overlayImage = document.getElementById("overlayImage");

document.querySelectorAll(".slide img").forEach(img => {
    img.addEventListener("click", () => {
        let imgSrc = img.src;

        overlay.style.display = "flex";
        overlay.classList.add("active");
        overlayImage.src = imgSrc;
    });
});

overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    overlay.classList.remove("active");
});