import { validate, validator } from "./utils/validate.js";
import http from "./utils/request.js";

// validation
const avatar = document.querySelector("#user_avatar");
const fname = document.querySelector("#user_fname");
const lname = document.querySelector("#user_lname");
const email = document.querySelector("#user_email");
const pwd = document.querySelector("#user_password");
const conpwd = document.querySelector("#user_password_confirmation");
const curpwd = document.querySelector("#user_current_password");

const avatarError = document.querySelector("#user_avatar + .error");
const fnameError = document.querySelector("#user_fname + .error");
const lnameError = document.querySelector("#user_lname + .error");
const emailError = document.querySelector("#user_email + .error");
const pwdError = document.querySelector("#user_password + .error");
const conpwdError = document.querySelector("#user_password_confirmation + .error");
const curpwdError = document.querySelector("#user_current_password + .error");

const preview = document.querySelector("#preview-avatar");
const previewImage = document.querySelector("#preview-avatar > img");
const cropperModal = new bootstrap.Modal('#cropperModal');
let cropper;

// let doIt;
// window.addEventListener('resize', () => {
// 	if (cropper) {
// 		clearTimeout(doIt);
// 		cropper.disable();
// 		doIt = setTimeout(() => {
// 			cropper.enable();
// 		}, 100);
// 	}	
// })

avatar.onchange = (event) => {
	let result = document.querySelector('#input-image');
	let previewImage = document.querySelector('#preview-avatar > img');

	const [file] = event.target.files;
	if (file && validate(avatar, avatarError, validator.fileExtension(['png', 'jpg', 'jpeg', 'gif']))) {
		let img = document.createElement('img');
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
				// console.log("change?");
				// let imgSrc = this.cropper.getCroppedCanvas({
				// 	width: 170,
				// 	height: 170
				// }).toDataURL("image/png");
				// preview.style.display = "block";
				// previewImage.src = imgSrc;
			}
		});
		cropperModal.show();
	}
}

document.querySelector("#cropperModal #save").addEventListener('click', () => {
	console.log("change");
    previewImage.src = cropper.getCroppedCanvas().toDataURL();
    preview.style.display = "block";
    cropperModal.hide();
});

document.querySelectorAll("#cropperModal button[data-bs-dismiss='modal']").forEach((button) => {
	button.addEventListener('click', () => {
		console.log("change");
		previewImage.src = '';
		preview.style.display = "none";
		cropper.destroy();
		window.location.reload();
	});
});

document.querySelector("#update").addEventListener('click', (e) => {
    e.preventDefault();
    
    if (
        validate(fname, fnameError, validator.length(1, 25)) &
        validate(lname, lnameError, validator.length(1, 25)) &
        validate(email, emailError, validator.length(1, 255)) &
        validate(email, emailError, validator.email) &
		validate(pwd, pwdError, validator.length(0, 64)) &
		validate(null, conpwdError, {
			check: () => {
				return conpwd.value === pwd.value;
			},
			message: "Password does not match"
		}) &
		validate(curpwd, curpwdError, validator.required)
    ) {
		// submit avatar
		const form = document.querySelector("#avatar-form");
		const formData = new FormData(form);
		const url = new URL(form.action);
		formData.delete('user[avatar]');

		if (avatar.files.length > 0) {
			if (	
				!validate(avatar, avatarError, validator.fileSize(6)) ||
				!validate(avatar, avatarError, validator.fileExtension(['png', 'jpg', 'jpeg', 'gif']))
			) {
				return;
			}

			fetch(previewImage.src)
				.then(response => response.blob())
				.then(blob => {
					formData.append('user[avatar]', blob);
					http.upload('PUT', url.pathname, formData).then(response => {
						window.location.reload();
						document.querySelector("#edit_user").submit();
					})
				});
		} else {
			// submit info
			document.querySelector("#edit_user").submit();
		}
    }
});

// cancel account
document.querySelector(".cancel-account").addEventListener('click', () => {
	const modal = new bootstrap.Modal('#deleteModal');
	modal.show();
});

document.querySelector("#deleteModal .confirm").addEventListener('click', () => {
	document.querySelector(".cancel-account").nextElementSibling.submit();
});