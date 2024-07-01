import { validate, validator } from "../../utils/validate.js";

const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const pwd = document.querySelector("#password");
const pwdcon = document.querySelector("#pwdcon");
const signup = document.querySelector("#signup");

const fnameError = document.querySelector("#fname + .error");
const lnameError = document.querySelector("#lname + .error");
const emailError = document.querySelector("#email + .error");
const pwdError = document.querySelector("#password + .error");
const pwdconError = document.querySelector("#pwdcon + .error");

signup.addEventListener('click', () => {
    if (
        validate(fname, fnameError, validator.length(1, 25)) &
        validate(lname, lnameError, validator.length(1, 25)) &
        validate(email, emailError, validator.length(1, 255)) &
        validate(email, emailError, validator.email) &
        validate(pwd, pwdError, lengthValidator(1, 64)) &
        validate(pwdcon, pwdconError, {
            check: (value) => value === pwd.value,
            message: "Password does not match"
        })
    ) {
        // TODO
    }
});