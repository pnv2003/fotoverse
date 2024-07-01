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

