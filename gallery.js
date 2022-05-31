const galleryImages = Array.from(document.querySelectorAll('.screenshots-container > img'));

let currentImage = null;

const galleryContainer = document.getElementById("galleryContainer");
const galleryContent = document.getElementById("galleryContent");
const mainImage = document.getElementById("mainImage");


const galleryCloseButton = document.getElementById("galleryCloseButton");

const galleryCurrentTotalSummaryLabel = document.getElementById("currentTotalSummaryLabel");

const galleryLeftButton = document.getElementById("leftButton");
const galleryRightButton = document.getElementById("rightButton");

let touchStartX = 0;
let touchEndX = 0;

mainImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
})

mainImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleTouchGesture();
})

function handleTouchGesture() {
    if (touchStartX === 0 || touchEndX === 0) {
        return;
    }

    let travelDelta = Math.abs(touchEndX - touchStartX);

    if (travelDelta < 50) {
        return;
    }

    if (touchStartX > touchEndX) {
        showNextImage();
    } else {
        showPreviousImage();
    }
}

galleryCloseButton.addEventListener('click', () => {
    closeGallery();
})

galleryContent.addEventListener('click', (e) => {
    if (e.target.nodeName === "DIV") {
        closeGallery();
    }
})

function openGallery(imageElement) {
    showImage(imageElement);

    galleryContainer.style.display = "block";

    window.addEventListener('keydown', handleGalleryKeyPress);

    document.body.style.overflow = 'hidden';
    document.body.style.setProperty("-webkit-overflow-scrolling", "touch");
}

function showImage(imageElement) {
    if ("fullUrl" in imageElement.dataset) {
        mainImage.src = imageElement.dataset.fullUrl;
    } else {
        mainImage.src = imageElement.src;
    }

    currentImage = imageElement;

    updateSummaryLabel()
}

function closeGallery() {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("-webkit-overflow-scrolling");

    mainImage.src = "";
    galleryContainer.style.display = "none";

    window.removeEventListener('keydown', handleGalleryKeyPress);
}

function showPreviousImage() {
    let currentIndex = galleryImages.indexOf(currentImage);

    if (currentIndex !== -1 && currentIndex > 0) {
        let newImage = galleryImages[currentIndex - 1];
        showImage(newImage);

        // Means last image
        if (currentIndex === 1) {
            //galleryLeftButton.style.display = "none";
        }

        galleryRightButton.style.display = "block";
    }
}

function showNextImage() {
    let currentIndex = galleryImages.indexOf(currentImage);

    if (currentIndex !== -1 && currentIndex < galleryImages.length - 1) {
        let newImage = galleryImages[currentIndex + 1];
        showImage(newImage);

        //galleryLeftButton.style.display = "block";
    }
}

galleryLeftButton.addEventListener('click', showPreviousImage);
galleryRightButton.addEventListener('click', showNextImage);

function updateSummaryLabel() {
    let currentIndex = galleryImages.indexOf(currentImage);
    galleryCurrentTotalSummaryLabel.textContent = `${currentIndex + 1}/${galleryImages.length}`;
}

function handleGalleryKeyPress(e) {
    if (e.code === "Escape") {
        closeGallery();
        return;
    }

    console.log(e.code);

    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        showPreviousImage();
    } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        showNextImage();
    }
}

galleryImages.forEach((image) => {
    image.addEventListener('click', (e) => {
        let clickedImage = e.currentTarget;

        openGallery(clickedImage);

        updateSummaryLabel()
    })
})
