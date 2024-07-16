const logout = document.querySelector("#nav-logout");

if (logout) {
    const confirm = document.querySelector("#logoutModal .confirm");
    const modal = new bootstrap.Modal('#logoutModal');

    logout.addEventListener('click', () => {
        modal.show();
    });

    confirm.addEventListener('click', () => {
        document.querySelector("#real-logout").click();
    });
}