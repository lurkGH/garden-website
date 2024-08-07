let images = [
    "./images/slideshow-1.png",
    "./images/slideshow-2.png",
    "./images/slideshow-3.png"
];

let preloadedImages = [];
let currentIndex = 0;

function preloadImages(imageArray, callback) {
    let loadedImagesCount = 0;
    let totalImages = imageArray.length;

    for (let i = 0; i < totalImages; i++) {
        preloadedImages[i] = new Image();
        preloadedImages[i].src = imageArray[i];
        preloadedImages[i].onload = function() {
            loadedImagesCount++;
            if (loadedImagesCount === totalImages) {
                callback();
            }
        };
    }
}

function startSlideshow() {
    let elements = document.getElementsByClassName("slideshow");
    if (elements.length > 0) {
        let slideshowElement = elements[0];
        function showNextImage() {
            slideshowElement.style.backgroundImage = `url(${images[currentIndex]})`;
            currentIndex = (currentIndex + 1) % images.length;
            setTimeout(showNextImage, 2500); // 1000 = 1 sec
        }
        showNextImage();
    }
}

// Preloads images and starts slideshow once done
preloadImages(images, startSlideshow);
