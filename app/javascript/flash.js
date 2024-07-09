let statusToast = document.querySelector('#toast-status');
let errorToast = document.querySelector('#toast-error');

if (statusToast) {
    bootstrap.Toast.getOrCreateInstance(statusToast).show();
}
if (errorToast) {
    bootstrap.Toast.getOrCreateInstance(errorToast).show();
}