import { validate, validator } from "./utils/validate";

const newPassword = document.querySelector("#user_password");
const confirmPassword = document.querySelector("#user_password_confirmation");

const newPasswordError = document.querySelector("#user_password + .error");
const confirmPasswordError = document.querySelector("#user_password_confirmation + .error");

const send = document.querySelector("#send");
send.addEventListener('click', (e) => {
    e.preventDefault();

    if (
        validate(newPassword, newPasswordError, validator.length(1, 64)) &
        validate(confirmPassword, confirmPasswordError, {
            check: () => confirmPassword.value == newPassword.value,
            message: "Password does not match"
        })
    ) {
        document.querySelector("main.forgot-password form#new_user").submit();
    }
});