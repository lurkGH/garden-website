function changeImage() {
    let galleryImages = document.getElementsByClassName("gallery-thumbnails");
    let highlightImage = document.getElementById("gallery-highlight");
    // Loops through each element, adding click event listener
    Array.from(galleryImages).forEach((item, index) => {
        item.addEventListener("click", function() {
            highlightImage.src = galleryImages[index].src;
        });
    });
}

document.addEventListener("DOMContentLoaded", changeImage);