import { validate, validator } from "./utils/validate.js";

const saveInfo = document.querySelector("#save-info");
const savePassword = document.querySelector("#save-pwd");
const infoToast = bootstrap.Toast.getOrCreateInstance(document.querySelector("#infoToast"));
const passwordToast = bootstrap.Toast.getOrCreateInstance(document.querySelector("#pwdToast"));

saveInfo.addEventListener("click", () => {
    infoToast.show();
});
savePassword.addEventListener("click", () => {
    passwordToast.show();
});

// validation
const fname = document.querySelector("#user_fname");
const lname = document.querySelector("#user_lname");
const email = document.querySelector("#user_email");

const pwd = document.querySelector("#user_password");
const pwdnew = document.querySelector("user_new_password");
const pwdcon = document.querySelector("#user_confirm_password");

const fnameError = document.querySelector("#user_fname + .error");
const lnameError = document.querySelector("#user_lname + .error");
const emailError = document.querySelector("#user_email + .error");

const pwdError = document.querySelector("#user_password + .error");
const pwdnewError = document.querySelector("#user_new_password + .error");
const pwdconError = document.querySelector("#user_confirm_password + .error");

saveInfo.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (
        validate(fname, fnameError, validator.length(1, 25)) &
        validate(lname, lnameError, validator.length(1, 25)) &
        validate(email, emailError, validator.length(1, 255)) &
        validate(email, emailError, validator.email)
    ) {
        document.querySelector("#info-form").submit();
    }
});

savePassword.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (
        validate(pwd, pwdError, validator.length(1, 64)) &
        validate(pwdnew, pwdnewError, validator.length(1, 64)) &
        validate(pwdcon, pwdconError, {
            check: (field) => {
                return (field.value === pwdnew.value);
            },
            message: "Password does not match"
        })
    ) {
        document.querySelector("#pwd-form").submit();
    }
});