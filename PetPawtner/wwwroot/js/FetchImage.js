function loadRandomDogImage() {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json())
        .then((data) => {
            const dogImages = document.getElementsByClassName("dog-image");
            Array.from(dogImages).forEach((dogImage) => {
                dogImage.src = data.message;
                dogImage.alt = "A random dog image";
            });
        })
        .catch((error) => console.error("Error fetching image:", error));
}

// Laddar en bild direkt när sidan öppnas
loadRandomDogImage();
