import { validate, validator } from "./utils/validate.js";

const title = document.querySelector("#album_title");
const description = document.querySelector("#album_desc");
const grid = document.querySelector("#grid");

const titleError = document.querySelector("#album_title + .error");
const descError = document.querySelector("#album_desc + .error");
const mediaError = document.querySelector("#grid + .error");

const save = document.querySelector("#save");

let getIndex = () => {
    return document.querySelectorAll("#grid .media-item").length;
}

grid.addEventListener('change', (e) => {
    // check if file is selected
    if (!e.target.files) return;

    
    const input = e.target;
    const file = input.files[0];
    if (!file) return;
    if (!validate(input, mediaError, validator.file)) return;
    if (!validate(input, mediaError, validator.fileExtension(['png', 'jpg', 'jpeg', 'gif']))) return;
    if (!validate(input, mediaError, validator.fileSize(8))) return;

    // create image preview
    const wrapper = document.createElement('div');
    wrapper.className = "media-item";
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.width = 160;
    img.height = 160;
    const removeButton = document.createElement('div');
    const xmark = document.createElement('i');
    xmark.className = "fa-solid fa-circle-xmark fa-2xl";
    xmark.ariaHidden = false;
    removeButton.className = "media-remove";
    removeButton.appendChild(xmark);
    removeButton.addEventListener('click', () => {
        grid.removeChild(wrapper);
    });
    wrapper.appendChild(removeButton);
    wrapper.appendChild(img);


    // replace add button with image
    const add = document.querySelector("#grid label.media-item");
    grid.replaceChild(wrapper, add);

    // remove active class from input
    input.classList.remove("active");

    // create new input and label
    const newInput = document.createElement('input');
    newInput.type = "file";
    newInput.id = `album_media_attributes_${getIndex()}_url`;
    newInput.name = `album[media_attributes][${getIndex()}][url]`;
    newInput.className = "media-input active";
    newInput.accept = "image/*";
    const newLabel = document.createElement('label');
    newLabel.htmlFor = newInput.id;
    newLabel.className = "media-item form-label btn btn-outline-primary";
    newLabel.innerHTML = "Add Photo";
    grid.prepend(newInput);
    grid.prepend(newLabel);
});

save.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("bruh");

    if (
        validate(null, mediaError, {
            check: () => document.querySelectorAll("#grid .media-item").length > 1 && document.querySelectorAll("#grid .media-item").length <= 25,
            message: "Please upload between 1 and 25 photos"
        }) &
        validate(title, titleError, validator.length(1, 140)) &
        validate(description, descError, validator.length(1, 300))
    ) {
        // don't send input with no file
        grid.removeChild(document.querySelector("#grid .media-input.active"));
        grid.removeChild(document.querySelector("#grid label.media-item"));
        document.querySelector("form").submit();
    }
});