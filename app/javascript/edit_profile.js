import { validate, validator } from "./utils/validate.js";

// validation
const fname = document.querySelector("#user_fname");
const lname = document.querySelector("#user_lname");
const email = document.querySelector("#user_email");

const fnameError = document.querySelector("#user_fname + .error");
const lnameError = document.querySelector("#user_lname + .error");
const emailError = document.querySelector("#user_email + .error");

const saveInfo = document.querySelector("#save-info");
const infoToast = bootstrap.Toast.getOrCreateInstance(document.querySelector("#infoToast"));

saveInfo.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (
        validate(fname, fnameError, validator.length(1, 25)) &
        validate(lname, lnameError, validator.length(1, 25)) &
        validate(email, emailError, validator.length(1, 255)) &
        validate(email, emailError, validator.email)
    ) {
        document.querySelector("#info-form").submit();
        infoToast.show();
    }
});