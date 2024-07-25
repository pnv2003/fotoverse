// import { validate, validator } from "./utils/validate";

const email = document.querySelector("#user_email");
const emailError = document.querySelector("#user_email + .error");
const send = document.querySelector("#send");

send.addEventListener('click', (e) => {
    e.preventDefault();

    if (validate(email, emailError, validator.email)) {
        document.querySelector("main.forgot-password form").submit();
    }
});