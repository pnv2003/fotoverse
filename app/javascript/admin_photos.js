import { getRelativeTime } from "./utils/datetime";
import { compactFormatter } from "./utils/number";
import http from "./utils/request";

// modal
const photoItems = document.querySelectorAll("#photos .item");
const albumItems = document.querySelectorAll("#albums .item");

const photoModal = document.querySelector("#photoModal");
const photoModalInstance = new bootstrap.Modal(photoModal, {keyboard: false});
photoItems.forEach(item => item.addEventListener("click", () => {

    const userName = item.querySelector(".user-name").textContent;
    const userAvatar = item.querySelector(".user-avatar img").src;
    const userPath = item.querySelector(".user-path").textContent;
    const imgSrc = item.querySelector("img").src;
    const title = item.querySelector(".title").textContent;
    const desc = item.querySelector(".desc").textContent;
    const mode = item.querySelector(".mode").textContent;
    const reactCount = item.querySelector(".react-count").textContent;
    const updatedAt = item.querySelector(".updated-at").textContent;
    
    photoModal.querySelector(".modal-title .name").textContent = userName;
    photoModal.querySelector(".modal-title img").src = userAvatar;
    photoModal.querySelector(".modal-title a").href = userPath;
    photoModal.querySelector(".modal-body img").src = imgSrc;
    photoModal.querySelector(".card-title").textContent = title;
    photoModal.querySelector(".card-text").textContent = desc;
    if (mode == "private") {
        photoModal.querySelector(".badge").style.display = "inline";
    } else {
        photoModal.querySelector(".badge").style.display = "none";
    }
    photoModal.querySelector(".react span").textContent = compactFormatter.format(reactCount);
    photoModal.querySelector(".ago").textContent = getRelativeTime(new Date(updatedAt));

    // add edit link
    const editPath = item.querySelector(".edit-path").textContent;
    document.querySelector("#edit-photo").href = editPath;

    // add delete event
    const detelePath = item.querySelector(".delete-path").textContent;
    document.querySelector("#delete-photo").addEventListener("click", () => {
        http.delete(detelePath, {}, null).then((response) => {
            const url = new URL(window.location.href);
            http.get(url.pathname, { tab: "photo", notice: response.message }, null).then(() => {
                window.location.reload();
            });
        });
    });

    // add reaction info    
    const photoId = item.querySelector(".id").textContent;
    const reacted = item.querySelector(".reacted").textContent;
    const reactButton = photoModal.querySelector(".react");
    if (reacted === "true") {
        toggleReact(reactButton.querySelector("i"));
    }
    reactButton.setAttribute("data-post-id", photoId);
    photoModalInstance.show();
}));