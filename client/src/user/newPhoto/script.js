import { validate, validator } from "../../../utils/validate.js";

const title = document.querySelector("#title");
const publicMode = document.querySelector("#public");
const privateMode = document.querySelector("#private");
const description = document.querySelector("#desc");
const photo = document.querySelector("#photo");
const preview = document.querySelector("#preview");
preview.style.display = "none";

const titleError = document.querySelector("#title + .error");
const descError = document.querySelector("#desc + .error");
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

save.addEventListener('click', () => {
    if (
        validate(title, titleError, validator.length(1, 140)) &
        validate(description, descError, validator.length(1, 300)) &
        validate(photo, photoError, validator.photo)
    ) {
        // TODO
    }
});