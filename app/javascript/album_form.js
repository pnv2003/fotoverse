// import { validate, validator } from "./utils/validate.js";

const title = document.querySelector("#album_title");
const description = document.querySelector("#album_description");
const grid = document.querySelector("#grid");

const titleError = document.querySelector("#album_title + .error");
const descError = document.querySelector("#album_description + .error");
const mediaError = document.querySelector("#grid + .error");

const save = document.querySelector("#save");

let getIndex = () => {
    return document.querySelectorAll("#grid .media-item").length;
}

// load existing images
const images = document.querySelectorAll("#grid .media-urls img");
if (images) {
    // remove all inputs
    document.querySelectorAll('.media-item').forEach((item) => {
        grid.removeChild(item);
    });

    document.querySelectorAll('.media-input').forEach((item) => {
        grid.removeChild(item); 
    });

    images.forEach((image, index) => {
        const input = document.createElement('input');
        input.type = "file";
        input.id = `album_media_attributes_${getIndex()}_url`;
        input.name = `album[media_attributes][${getIndex()}][url]`;
        input.className = "media-input";
        input.accept = "image/*";
        input.style.display = "none";

        // add _destroy hidden input
        const destroyInput = document.createElement('input');
        destroyInput.type = "hidden";
        destroyInput.id = `album_media_attributes_${getIndex()}__destroy`;
        destroyInput.name = `album[media_attributes][${getIndex()}][_destroy]`;
        destroyInput.value = "false";
        
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.className = "media-item form-label";
        const img = document.createElement('img');
        img.src = image.src;
        const removeButton = document.createElement('div');
        const xmark = document.createElement('i');
        xmark.className = "fa-solid fa-circle-xmark fa-2xl";
        xmark.ariaHidden = false;
        removeButton.className = "media-remove";
        removeButton.appendChild(xmark);
        removeButton.addEventListener('click', (e) => {
            e.preventDefault();

            // set _destroy to true
            destroyInput.value = "true";

            // hide label and input
            label.style.display = "none";
            input.style.display = "none";
        });
        label.appendChild(removeButton);
        label.appendChild(img);

        grid.prepend(destroyInput);
        grid.prepend(input);
        grid.prepend(label);
    });

    // create new input and label
    const newInput = document.createElement('input');
    newInput.type = "file";
    newInput.id = `album_media_attributes_${getIndex()}_url`;
    newInput.name = `album[media_attributes][${getIndex()}][url]`;
    newInput.className = "media-input active";
    newInput.accept = "image/*";
    const newLabel = document.createElement('label');
    newLabel.htmlFor = newInput.id;
    newLabel.className = "active-label media-item form-label btn btn-outline-primary";
    newLabel.innerHTML = "Add Photo";
    grid.prepend(newInput);
    grid.prepend(newLabel);
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

    // create image preview as label
    const label = document.createElement('div');
    label.className = "media-item form-label";
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
        grid.removeChild(label);
        grid.removeChild(input);
    });
    label.appendChild(removeButton);
    label.appendChild(img);

    // replace add button with image
    const add = document.querySelector("#grid .media-item.active-label");
    grid.replaceChild(label, add);

    // remove active class from input
    input.classList.remove("active");
    input.style.display = "none";

    // create new input and label
    const newInput = document.createElement('input');
    newInput.type = "file";
    newInput.id = `album_media_attributes_${getIndex()}_url`;
    newInput.name = `album[media_attributes][${getIndex()}][url]`;
    newInput.className = "media-input active";
    newInput.accept = "image/*";
    const newLabel = document.createElement('label');
    newLabel.htmlFor = newInput.id;
    newLabel.className = "active-label media-item form-label btn btn-outline-primary";
    newLabel.innerHTML = "Add Photo";
    grid.prepend(newInput);
    grid.prepend(newLabel);
});

save.addEventListener('click', (e) => {
    e.preventDefault();

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
        grid.removeChild(document.querySelector("#grid .media-item.active-label"));
        document.querySelector("main.album-form form").submit();
    }
});