let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll(".image");
    const totalSlides = slides.length;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Gå till sista bilden
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; // Gå till första bilden
    }

    // Uppdatera bildens position
    const bilderContainer = document.querySelector(".images");
    bilderContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
}
