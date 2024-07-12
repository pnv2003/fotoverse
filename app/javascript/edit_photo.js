import { validate, validator } from "./utils/validate.js";

const title = document.querySelector('#photo_title');
const desc = document.querySelector('#photo_description');
const photo = document.querySelector('.media-input');

const preview = document.querySelector('main.edit-photo #preview');
const previewImage = preview.querySelector('img');
preview.style.display = 'none';

const titleError = document.querySelector('#photo_title + .error');
const descError = document.querySelector('#photo_description + .error');
const photoError = document.querySelector('.media-input + .error');

const save = document.querySelector('#save');

photo.addEventListener('change', () => {
    const [file] = photo.files;
    if (file) {
        if (!validate(photo, photoError, validator.file)) return;
        if (!validate(photo, photoError, validator.fileExtension(['png', 'jpg', 'jpeg', 'gif']))) return;
        if (!validate(photo, photoError, validator.fileSize(8))) return;

        preview.style.display = 'block';
        previewImage.src = URL.createObjectURL(file);
    } else {
        preview.style.display = 'none';
    }
});

save.addEventListener('click', (e) => {
    e.preventDefault();

    if (
        validate(title, titleError, validator.length(1, 255)) &
        validate(desc, descError, validator.length(1, 255))
    ) {
        document.querySelector('form').submit();
    }
});