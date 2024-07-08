import { validate, validator } from "./utils/validate.js";

const title = document.querySelector("#photo_title");
const publicMode = document.querySelector("#photo_mode_public");
const privateMode = document.querySelector("#photo_mode_private");
const description = document.querySelector("#photo_desc");
const photo = document.querySelector("#photo_photo");
const preview = document.querySelector("#preview");
preview.style.display = "none";

const titleError = document.querySelector("#photo_title + .error");
const descError = document.querySelector("#photo_desc + .error");
const photoError = document.querySelector("#preview + .error");

const save = document.querySelector("#save");

photo.onchange = () => {
    const [file] = photo.files;
    if (file) {
        console.log(file);
        preview.style.display = "block";
        preview.src = URL.createObjectURL(file);
    } else {
        preview.style.display = "none";
    }
}

save.addEventListener('click', (e) => {
    e.preventDefault();

    if (
        validate(title, titleError, validator.length(1, 140)) &
        validate(description, descError, validator.length(1, 300)) &
        validate(photo, photoError, validator.photo)
    ) {
        // TODO
    }
});