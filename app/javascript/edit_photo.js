import { validate, validator } from "./utils/validate.js";

const title = document.querySelector('#photo_title');
const desc = document.querySelector('#photo_desc');
const titleError = document.querySelector('#photo_title + .error');
const descError = document.querySelector('#photo_desc + .error');
const save = document.querySelector('#save');

save.addEventListener('click', (e) => {
    e.preventDefault();

    if (
        validate(title, titleError, validator.length(1, 255)) &
        validate(desc, descError, validator.length(1, 255))
    ) {
        document.querySelector('form').submit();
    }
});