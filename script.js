let slider = document.querySelector(".slider");
let slides = document.querySelectorAll(".slide");
const slideWidth = slides[0].offsetWidth + 20; // Lebar termasuk margin
let isSwiping = false;
let startX = 0;
let moveX = 0;
let manualSlide = false;
let autoSlideInterval;
let speed = 0.5; // Kecepatan auto-slide

// **Duplicate slides untuk efek infinite**
slider.innerHTML += slider.innerHTML;
let totalSlides = document.querySelectorAll(".slide").length;

// **Set posisi awal**
slider.style.transform = `translateX(${-slideWidth}px)`;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (!manualSlide) {
            moveX -= speed;
            slider.style.transform = `translateX(${moveX}px)`;

            // **Reset posisi jika sudah sampai akhir**
            if (Math.abs(moveX) >= (totalSlides / 2) * slideWidth) {
                moveX = 0;
                slider.style.transition = "none"; // Hilangkan animasi saat reset
                slider.style.transform = `translateX(${moveX}px)`;
            } else {
                slider.style.transition = "transform 0.05s linear"; // Animasi smooth
            }
        }
    }, 16);
}

// **Geser manual saat swipe**
slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    manualSlide = true;
    clearInterval(autoSlideInterval);
});

slider.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    let deltaX = e.touches[0].clientX - startX;
    slider.style.transition = "none";
    slider.style.transform = `translateX(${moveX + deltaX}px)`;
});

slider.addEventListener("touchend", (e) => {
    isSwiping = false;
    let deltaX = e.changedTouches[0].clientX - startX;

    // **Deteksi swipe**
    if (deltaX > 50) {
        moveX += slideWidth;
    } else if (deltaX < -50) {
        moveX -= slideWidth;
    }

    slider.style.transition = "transform 0.4s ease-out";
    slider.style.transform = `translateX(${moveX}px)`;

    // **Mulai auto-slide kembali setelah jeda**
    setTimeout(() => {
        manualSlide = false;
        startAutoSlide();
    }, 2000);
});

function updateActiveSlide() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.classList.remove("active-slide"));

    // Ambil slide yang ada di tengah
    let middleIndex = Math.round(Math.abs(currentX) / slideWidth);
    slides[middleIndex]?.classList.add("active-slide");
}

// Panggil ini setelah setiap perpindahan slide
updateActiveSlide();

// **Mulai auto-slide**
startAutoSlide();