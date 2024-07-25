// import { validate, validator } from './utils/validate.js';

const pwd = document.querySelector("#user_password");
const pwdnew = document.querySelector("#user_new_password");
const pwdcon = document.querySelector("#user_confirm_password");

const pwdError = document.querySelector("#user_password + .error");
const pwdnewError = document.querySelector("#user_new_password + .error");
const pwdconError = document.querySelector("#user_confirm_password + .error");

const savePassword = document.querySelector("#save-pwd");
const passwordToast = bootstrap.Toast.getOrCreateInstance(document.querySelector("#pwdToast"));

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
        passwordToast.show();
    }
});