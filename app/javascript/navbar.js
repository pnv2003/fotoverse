import http from "./utils/request";

const logout = document.querySelector("#nav-logout");

if (logout) {
    logout.addEventListener('click', () => {
        http.delete('/logout', {}, null).then(response => {
            if (response.status_code === 200) {
                console.log(response.message);
                window.location.href = '/';
            } else {
                console.error(response.message);
            }
        });
    });
}