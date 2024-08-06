let images = [
    "url(./images/slideshow-1.png)",
    "url(./images/slideshow-2.png)",
    "url(./images/slideshow-3.png)"
];

let currentIndex = 0;

function slideshow() {
    let elements = document.getElementsByClassName("slideshow");
    if (elements.length > 0) {
        let slideshowElement = elements[0];
        slideshowElement.style.backgroundImage = images[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
    }
    setTimeout(slideshow, 2500); // 1000 = 1 sec
}

slideshow();
