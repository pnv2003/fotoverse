var statusToast = document.querySelector('#toast-status');
var errorToast = document.querySelector('#toast-error');

if (statusToast) {
    bootstrap.Toast.getOrCreateInstance(statusToast).show();
}
if (errorToast) {
    bootstrap.Toast.getOrCreateInstance(errorToast).show();
}