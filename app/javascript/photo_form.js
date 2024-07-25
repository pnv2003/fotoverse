// import { validate, validator } from "./utils/validate.js";

const title = document.querySelector("#photo_title");
const description = document.querySelector("#photo_description");
const photo = document.querySelector(".media-input");

const titleError = document.querySelector("#photo_title + .error");
const descError = document.querySelector("#photo_description + .error");
const photoError = document.querySelector(".media-input + .error");

const save = document.querySelector("#save");

photo.addEventListener('change', () => {
    const [file] = photo.files;
    if (file) {
        if (!validate(photo, photoError, validator.file)) return;
        if (!validate(photo, photoError, validator.fileExtension(['png', 'jpg', 'jpeg', 'gif']))) return;
        if (!validate(photo, photoError, validator.fileSize(8))) return;

        // create image preview
        const wrapper = document.createElement('label');
        wrapper.className = "media-item";
        wrapper.htmlFor = "photo_medium_attributes_url"
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.width = "100%";
        img.style.height = "100%";

        // create edit button
        const editButton = document.createElement('div');
        const pencil = document.createElement('i');
        pencil.className = "fa-solid fa-pen-to-square fa-2xl";
        pencil.ariaHidden = false;
        editButton.className = "media-edit";
        editButton.appendChild(pencil);
        wrapper.appendChild(editButton);
        wrapper.appendChild(img);
        wrapper.style.height = "100%";

        // replace add button with image
        const add = document.querySelector(".media-item");
        document.querySelector(".field.photo").replaceChild(wrapper, add);
    }
})

save.addEventListener('click', (e) => {
    e.preventDefault();

    if (
        validate(title, titleError, validator.length(1, 140)) &
        validate(description, descError, validator.length(1, 300)) &
        validate(null, photoError, {
            check: () => document.querySelector(".media-item img"),
            message: "Please upload a photo"
        })
    ) {
        document.querySelector('main.photo-form form').submit();
    }
});