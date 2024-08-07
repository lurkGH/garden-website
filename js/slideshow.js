const slides = [
    "url(./images/slideshow-1.png)",
    "url(./images/slideshow-2.png)",
    "url(./images/slideshow-3.png)"
];

function startSlideshow() {
    let slideshow = document.getElementsByClassName("slideshow")[0];
    let currIndex = 0;
    function showNextSlide() {
        if (currIndex == slides.length - 1) {
            currIndex = 0;
        }
        else {
            currIndex++;
        }
        slideshow.style.backgroundImage = slides[currIndex];
        setTimeout(showNextSlide, 2500);
    }
    showNextSlide();
}

window.onload = function() {
    startSlideshow();
}