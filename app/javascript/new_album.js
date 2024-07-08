import { validate, validator } from "./utils/validate.js";

const title = document.querySelector("#album_title");
const publicMode = document.querySelector("#album_mode_public");
const privateMode = document.querySelector("#album_mode_private");
const description = document.querySelector("#album_desc");
const photos = document.querySelector("#album_photos");
const preview = document.querySelector("#preview");
preview.style.display = "none";

const titleError = document.querySelector("#album_title + .error");
const descError = document.querySelector("#album_desc + .error");
const photoError = document.querySelector("#preview + .error");

const save = document.querySelector("#save");

photos.onchange = () => {
    // const [file] = photos.files;
    // if (file) {
    //     console.log(file);
    //     preview.style.display = "block";
    //     preview.src = URL.createObjectURL(file);
    // } else {
    //     preview.style.display = "none";
    // }
}

save.addEventListener('click', (e) => {
    e.preventDefault();

    if (
        validate(title, titleError, validator.length(1, 140)) &
        validate(description, descError, validator.length(1, 300))
    ) {
        // TODO
    }
});