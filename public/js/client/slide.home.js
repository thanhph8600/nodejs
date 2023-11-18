document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("slider");
    let currentIndex = 0;

    function updateSlider() {
        const translateXValue = -currentIndex * 100 + "%";
        slider.querySelector(".flex").style.transform = `translateX(${translateXValue})`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % 3;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + 3) % 3;
        updateSlider();
    }

    // Automatic slide change
    setInterval(nextSlide, 3000);

    // Optional: Pause on hover
    slider.addEventListener("mouseenter", function() {
        clearInterval(autoSlide);
    });

    slider.addEventListener("mouseleave", function() {
        autoSlide = setInterval(nextSlide, 3000);
    });
});