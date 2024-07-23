document.addEventListener('DOMContentLoaded', function() {
    const statusToast = document.querySelector('#toast-status');
    const errorToast = document.querySelector('#toast-error');
    const successToast = document.querySelector('#toast-success');
    if (statusToast) {
        console.log("statusToast");
        const status = new bootstrap.Toast(statusToast);
        status.show();
    }
    if (errorToast) {
        console.log("errorToast");
        const error = new bootstrap.Toast(errorToast);
        error.show();
    }
    if (successToast) {
        console.log("successToast");
        const success = new bootstrap.Toast(successToast);
        success.show();
    }
});