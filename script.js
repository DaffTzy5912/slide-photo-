let slider = document.querySelector(".slider");
let slides = document.querySelectorAll(".slide");
const slideWidth = slides[0].offsetWidth + 20; // Termasuk margin
let moveX = 0;
let autoSlideInterval;
let speed = 1;

// **Duplicate slides untuk efek infinite**
slider.innerHTML += slider.innerHTML;
let totalSlides = document.querySelectorAll(".slide").length;

// **Set posisi awal**
slider.style.transform = `translateX(${-slideWidth}px)`;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveX -= speed;
        slider.style.transform = `translateX(${moveX}px)`;

        if (Math.abs(moveX) >= (totalSlides / 2) * slideWidth) {
            moveX = 0;
            slider.style.transition = "none";
            slider.style.transform = `translateX(${moveX}px)`;
        } else {
            slider.style.transition = "transform 0.1s linear";
        }
    }, 16);
}

// **Tombol navigasi manual**
document.getElementById("prevBtn").addEventListener("click", () => {
    moveX += slideWidth;
    slider.style.transition = "transform 0.4s ease-out";
    slider.style.transform = `translateX(${moveX}px)`;
});

document.getElementById("nextBtn").addEventListener("click", () => {
    moveX -= slideWidth;
    slider.style.transition = "transform 0.4s ease-out";
    slider.style.transform = `translateX(${moveX}px)`;
});

// **Interaksi overlay**
const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");

document.querySelectorAll(".slide img").forEach((img) => {
    img.addEventListener("click", function () {
        overlayImage.src = this.src;
        overlay.classList.add("active");
        overlay.style.display = "flex";
    });
});

overlay.addEventListener("click", function () {
    overlay.classList.remove("active");
    setTimeout(() => {
        overlay.style.display = "none";
    }, 300);
});

// **Mulai auto-slide**
startAutoSlide();