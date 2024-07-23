import { validate, validator } from "./utils/validate.js";
import http from "./utils/request.js";

const fname = document.querySelector("#user_fname");
const lname = document.querySelector("#user_lname");
const email = document.querySelector("#user_email");
const pwd = document.querySelector("#user_password");
const pwdcon = document.querySelector("#user_password_confirmation");
const signup = document.querySelector("#signup");

const fnameError = document.querySelector("#user_fname + .error");
const lnameError = document.querySelector("#user_lname + .error");
const emailError = document.querySelector("#user_email + .error");
const pwdError = document.querySelector("#user_password + .error");
const pwdconError = document.querySelector("#user_password_confirmation + .error");

signup.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("check");

    if (
        validate(fname, fnameError, validator.length(1, 25)) &
        validate(lname, lnameError, validator.length(1, 25)) &
        validate(email, emailError, validator.length(1, 255)) &
        validate(email, emailError, validator.email) &
        validate(pwd, pwdError, validator.length(1, 64)) &
        validate(pwdcon, pwdconError, {
            check: (field) => {
                return (field.value === pwd.value);
            },
            message: "Password does not match"
        })
    ) {
        console.log("signed!");
        document.querySelector("form").submit();
    }
});

// error messages
const deviseError = document.querySelector("#error_explanation");

if (deviseError) {
    console.log("GO");
    const errorMessages = deviseError.querySelectorAll("li");
    const msg = [...errorMessages].map((el) => el.innerText).join(", ");
    http.get(`/${currentLocale}/users/sign_up`, { error: msg }, false).then((res) => {
        window.location.href = `/${currentLocale}/users/sign_up`;
    });
}