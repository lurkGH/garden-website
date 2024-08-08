const slides = [
    "url(./images/slideshow-1.png)",
    "url(./images/slideshow-2.png)",
    "url(./images/slideshow-3.png)"
];
let currIndex = 0;
let slideshowTimeout;
let transitionDelay = 3000; // 1000 = 1 sec
let resumeDelay = 5000;

function preload(_slides, callback) {
    let loadedImagesCount = 0;
    for (let i = 0; i < _slides.length; i++) {
        // Creates new image and sets source to filepath
        let imageLink = _slides[i];
        let img = new Image();
        img.src = imageLink.slice(4, -1);
        // Adds to running total when image loads
        img.onload = function() {
            loadedImagesCount++;
            // Runs callback function once all images have loaded
            if (loadedImagesCount === _slides.length) {
                callback();
            }
        };
    }
}

function toggleTransition(applyTransition) {
    let slideshow = document.getElementsByClassName("slideshow")[0];
    let circles = document.getElementsByClassName("circle");
    // Resets all circles to default white
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = "white";
    }

    // Set the current circle to gray
    if (circles[currIndex]) {
        circles[currIndex].style.backgroundColor = "gray";
    }
    // Toggles the transition effect based on the parameter
    slideshow.style.transition = applyTransition ? "background-image 1s linear" : "none";
    slideshow.style.backgroundImage = slides[currIndex];
}

function showNextSlide() {
    currIndex = (currIndex === slides.length - 1) ? 0 : currIndex + 1;
    toggleTransition(true);
    slideshowTimeout = setTimeout(showNextSlide, transitionDelay);
}

function showSlide(index) {
    currIndex = index;
    toggleTransition(false);
}

function changeSlide(direction) {
    if (direction === "left") {
        currIndex = (currIndex === 0) ? slides.length - 1 : currIndex - 1;
    } else if (direction === "right") {
        currIndex = (currIndex === slides.length - 1) ? 0 : currIndex + 1;
    } else if (typeof direction === "number") {
        currIndex = direction;
    }
    toggleTransition(false);
}

function pauseSlideshow() {
    clearTimeout(slideshowTimeout);
    slideshowTimeout = setTimeout(function() {
        toggleTransition(true);
        showNextSlide();
    }, resumeDelay);
}

function startSlideshow() {
    slideshowTimeout = setTimeout(showNextSlide, transitionDelay);

    // Adds event listeners to pause on click and change slide
    document.getElementsByClassName("left-arrow")[0].addEventListener("click", function() {
        pauseSlideshow();
        changeSlide("left");
    });

    document.getElementsByClassName("right-arrow")[0].addEventListener("click", function() {
        pauseSlideshow();
        changeSlide("right");
    });

    document.querySelectorAll(".circle").forEach(function(element, index) {
        element.addEventListener("click", function() {
            pauseSlideshow();
            changeSlide(index);
        });
    });
}

window.onload = function() {
    preload(slides, startSlideshow);
    document.getElementsByClassName("circle")[0].style.backgroundColor = "gray";
}
