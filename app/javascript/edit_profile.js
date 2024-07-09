import { validate, validator } from "./utils/validate.js";

// validation
const avatar = document.querySelector("#user_avatar");
const fname = document.querySelector("#user_fname");
const lname = document.querySelector("#user_lname");
const email = document.querySelector("#user_email");

const avatarError = document.querySelector("#user_avatar + .error");
const fnameError = document.querySelector("#user_fname + .error");
const lnameError = document.querySelector("#user_lname + .error");
const emailError = document.querySelector("#user_email + .error");

const saveInfo = document.querySelector("#save-info");

const preview = document.querySelector("#preview");
const previewImage = document.querySelector("#preview > img");
const cropperModal = new bootstrap.Modal('#cropperModal');
var cropper;

let doIt
window.addEventListener('resize', () => {
    clearTimeout(doIt);
    cropper.disable()
    doIt = setTimeout(() => {
         cropper.enable()
    }, 100);
})

avatar.onchange = (event) => {
	var result = document.querySelector('#input-image');
	var previewImage = document.querySelector('#preview img');

	const [file] = event.target.files;
	if (file && validate(avatar, avatarError, validator.fileExtension(['png', 'jpg', 'jpeg', 'gif']))) {
		var img = document.createElement('img');
		img.id = 'image';
		img.src = URL.createObjectURL(file);
		img.width = 544;
		img.height = 370;
		result.innerHTML = '';
		result.appendChild(img);
		cropper = new Cropper(img, {
			viewMode: 1,
			dragMode: 'move',
			aspectRatio: 1,
			autoCropArea: 0.68,
			minContainerWidth: 400,
			minContainerHeight: 370,
			center: false,
			zoomOnWheel: true,
			zoomOnTouch: false,
			cropBoxMovable: false,
			cropBoxResizable: false,
			guides: false,
			restore: false,
			ready: function(event) {
				this.cropper = cropper;
			},
			crop: function(event) {
				var imgSrc = this.cropper.getCroppedCanvas({
					width: 170,
					height: 170
				}).toDataURL("image/png");
				preview.style.display = "block";
				previewImage.src = imgSrc;
			}
		});
		cropperModal.show();
	}
}

document.querySelector("#cropperModal #save").addEventListener('click', () => {
    previewImage.src = cropper.getCroppedCanvas().toDataURL();
    preview.style.display = "block";
    cropperModal.hide();
});

document.querySelectorAll("#cropperModal button[data-bs-dismiss='modal']").forEach((button) => {
	button.addEventListener('click', () => {
		previewImage.src = '';
		preview.style.display = "none";
		cropper.destroy();
		window.location.reload();
	});
});

saveInfo.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (
        validate(fname, fnameError, validator.length(1, 25)) &
        validate(lname, lnameError, validator.length(1, 25)) &
        validate(email, emailError, validator.length(1, 255)) &
        validate(email, emailError, validator.email)
    ) {
		const form = document.querySelector("#info-form");
		const formData = new FormData(form);
		formData.devare('user[avatar]');

		if (avatar.files.length > 0) {
			if (	
				!validate(avatar, avatarError, validator.fileSize(1)) ||
				!validate(avatar, avatarError, validator.fileExtension(['png', 'jpg', 'jpeg', 'gif']))
			) {
				return;
			}

			fetch(previewImage.src)
				.then(response => response.blob())
				.then(blob => {
					formData.append('user[avatar]', blob);
					fetch(form.action, {
						method: form.method,
						body: formData
					}).catch(error => {
						console.error('Error:', error)
					});
				});
		} else {
			fetch(form.action, {
				method: form.method,
				body: formData
			}).catch(error => {
				console.error('Error:', error)
			});
		}
    }
});