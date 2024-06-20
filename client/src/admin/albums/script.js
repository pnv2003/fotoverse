const albumItems = document.querySelectorAll("#albums .item");
const albumModal = new bootstrap.Modal(document.querySelector("#albumModal"), {keyboard: false});
albumItems.forEach(item => item.addEventListener("click", () => {
    albumModal.show();
}));