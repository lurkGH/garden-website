const slides = [
    "url(./images/slideshow-1.png)",
    "url(./images/slideshow-2.png)",
    "url(./images/slideshow-3.png)"
];

function preload(_slides, callback) {
    let loadedImagesCount = 0;
    let imageObjects = [];
    for (let i = 0; i < _slides.length; i++) {
        let imageLink = _slides[i];
        let img = new Image();
        // Extracts the pathname, excluding url()
        img.src = imageLink.slice(4, -1);
        // Adds to count when image has loaded
        img.onload = function() {
            loadedImagesCount++;
            if (loadedImagesCount === _slides.length) {
                callback();
            }
        };
        // Error check to callback if image fails to load
        img.onerror = function() {
            console.error("Failed to load image");
            loadedImagesCount++;
            if (loadedImagesCount === _slides.length) {
                callback();
            }
        };
        imageObjects.push(img);
    }
}

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
        setTimeout(showNextSlide, 2500); // 1000 = 1 second
    }
    showNextSlide();
}

window.onload = function() {
    preload(slides, startSlideshow);
}