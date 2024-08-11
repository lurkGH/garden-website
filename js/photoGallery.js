class Photo {
    constructor(source, caption) {
        this.source = source;
        this.caption = caption;
    }
}

function loadPhotos() {
    fetch("data/photos.json")
        .then(response => response.json())
        .then(data => {
            const photos = data.map(item => new Photo(item.source, item.caption));
            generateThumbnails(photos);
            changeImage(photos);
        })
        .catch(error => console.error("Error loading photos: ", error));
}

function generateThumbnails(photos) {
    const container = document.querySelector(".thumbnails-container");
    photos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.source;
        img.className = "gallery-thumbnails";
        container.appendChild(img);
    });
}

function changeImage(photos) {
    const galleryImages = document.getElementsByClassName("gallery-thumbnails");
    const highlightImage = document.getElementById("gallery-highlight");
    let caption = document.getElementsByClassName("gallery-caption")[0];
    let previousImage = galleryImages[0];
    
    // Sets first thumbnail to appear "selected"
    galleryImages[0].style.filter = "brightness(50%)";
    // Sets caption to first thumbnail's caption
    caption.textContent = photos[0].caption;

    // Loops through each element, adding click event listener
    Array.from(galleryImages).forEach((item, index) => {
        item.addEventListener("click", function() {
            // Sets highlightImage source
            highlightImage.src = photos[index].source;
            // Sets caption
            caption.textContent = photos[index].caption;
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
    // Identical lines but for different browsers
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", loadPhotos);