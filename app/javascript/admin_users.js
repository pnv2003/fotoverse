const deleteButtons = document.querySelectorAll('.admin-users td button.delete');
const modal = new bootstrap.Modal('#deleteModal');
let confirm = document.querySelector("#deleteModal .confirm");
let real;

deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modalTitle = document.querySelector("#deleteModal .modal-title");
        modalTitle.textContent += ' ' + button.getAttribute('data-user-email');
        modal.show();

        const newConfirm = confirm.cloneNode(true);
        confirm.parentNode.replaceChild(newConfirm, confirm);
        confirm = newConfirm;

        confirm.addEventListener('click', () => {
            button.nextElementSibling.submit();
        });
    });
});