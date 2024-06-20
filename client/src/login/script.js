import { validate, validator } from "../../scripts/validate.js";

// form validation
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const emailError = document.querySelector("#email + .error");
const passwordError = document.querySelector("#password + .error");
const login = document.querySelector("#login");

login.addEventListener('click', () => {
    if (validate(email, emailError, validator.email) &
        validate(password, passwordError, validator.required)) {
        // TODO
        window.location.href = "../user/feeds";
    }
})

