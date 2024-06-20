// modal
const photoItems = document.querySelectorAll("#photos .item");
const albumItems = document.querySelectorAll("#albums .item");

const photoModal = new bootstrap.Modal(document.querySelector("#photoModal"), {keyboard: false});
photoItems.forEach(item => item.addEventListener("click", () => {
    photoModal.show();
}));