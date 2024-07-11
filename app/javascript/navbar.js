import http from "./utils/request";

const logout = document.querySelector("#nav-logout");

if (logout) {
    const confirm = document.querySelector("#logoutModal .confirm");
    const modal = new bootstrap.Modal('#logoutModal');

    logout.addEventListener('click', () => {
        modal.show();
    });

    confirm.addEventListener('click', () => {
        http.delete('/logout', {}, null).then(response => {
            if (response.status_code === 200) {
                console.log(response.message);
                http.get('/', { flash: response.message }).then(() => {
                    window.location.href = "/";
                })
            } else {
                console.error(response.message);
            }
        });
    });
}