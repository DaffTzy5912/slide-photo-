let slider = document.querySelector(".slider");
let slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const slideWidth = slides[0].offsetWidth + 20; // Termasuk margin
let isSwiping = false;
let startX = 0;
let currentX = -slideWidth;
let autoSlide;
let manualSlide = false; // Cek jika user menggeser manual

slider.style.transform = `translateX(${currentX}px)`;

// === AUTO SLIDE DENGAN SMOOTH LOOP ===
function startAutoSlide() {
    autoSlide = requestAnimationFrame(() => {
        if (!manualSlide) {
            currentX -= 0.5; // Smooth scrolling lebih lambat
            slider.style.transform = `translateX(${currentX}px)`;
        }

        // Jika sudah sampai akhir, reset dengan transisi smooth
        if (Math.abs(currentX) >= (totalSlides - 1) * slideWidth) {
            setTimeout(() => {
                slider.style.transition = "none";
                currentX = -slideWidth;
                slider.style.transform = `translateX(${currentX}px)`;
            }, 300); // Tunggu sebelum reset biar tidak patah
        }

        startAutoSlide(); // Looping terus menerus
    });
}

// === SWIPE GESTURE (TOUCH) ===
slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    manualSlide = true;
    cancelAnimationFrame(autoSlide);
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

// === ZOOM-IN & BLUR EFFECT ===
let overlay = document.querySelector(".overlay");
let overlayImage = document.querySelector(".overlay img");

// Saat slide diklik, tampilkan overlay
document.querySelectorAll(".slide").forEach(slide => {
    slide.addEventListener("click", () => {
        let img = slide.querySelector("img");
        let bgColor = getComputedStyle(slide).backgroundColor || "rgba(0, 0, 0, 0.5)";

        if (img) {
            overlayImage.src = img.src;
        }

        overlay.style.background = bgColor;
        overlay.classList.add("active");
    });
});

// Saat overlay diklik, sembunyikan kembali
overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
});

// === JALANKAN AUTO SLIDE ===
startAutoSlide();