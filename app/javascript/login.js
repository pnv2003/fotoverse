// import { validate, validator } from "./utils/validate.js";

// form validation
const email = document.querySelector("#user_email");
const password = document.querySelector("#user_password");
const emailError = document.querySelector("#user_email + .error");
const passwordError = document.querySelector("#user_password + .error");
const login = document.querySelector("#login");

login.addEventListener('click', (e) => {
    e.preventDefault();

    if (validate(email, emailError, validator.email) &
        validate(password, passwordError, validator.required)) {
        document.querySelector("form").submit();
    }
})

