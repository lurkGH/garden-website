function changeImage() {
    let galleryImages = document.getElementsByClassName("gallery-thumbnails");
    let highlightImage = document.getElementById("gallery-highlight");
    let previousImage = galleryImages[0];
    let caption = document.getElementsByClassName("gallery-caption")[0];
    
    // Sets first thumbnail to appear "selected"
    previousImage.style.filter = "brightness(50%)";
    // Sets caption to first thumbnail's caption
    caption.innerHTML = galleryImages[0].alt;

    // Loops through each element, adding click event listener
    Array.from(galleryImages).forEach((item, index) => {
        item.addEventListener("click", function() {
            // Sets highlightImage source
            highlightImage.src = galleryImages[index].src;
            // Sets caption
            caption.innerHTML = galleryImages[index].alt;
            // Prevents the change being applied to the same image clicked twice
            if (previousImage != galleryImages[index]) {
                previousImage.style.filter = "brightness(100%)"
            }
            // Adds filter over matching thumbnail image
            galleryImages[index].style.filter = "brightness(50%)"
            // Sets previousImage for resetting brightness when next image is clicked
            previousImage = galleryImages[index];
            topOfPage();
        });
    });
}

function topOfPage() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", changeImage);