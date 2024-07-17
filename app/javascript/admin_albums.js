import { getRelativeTime } from "./utils/datetime";
import { compactFormatter } from "./utils/number";
import http from "./utils/request";

const albumItems = document.querySelectorAll("#albums .item");

const albumModal = document.querySelector("#albumModal")
const albumModalInstance = new bootstrap.Modal(albumModal, {keyboard: false});
albumItems.forEach(item => item.addEventListener("click", () => {

    const userName = item.querySelector(".user-name").textContent;
    const userAvatar = item.querySelector(".user-avatar img").src;
    const userPath = item.querySelector(".user-path").textContent;
    const images = item.querySelectorAll(".info > img");
    const title = item.querySelector(".title").textContent;
    const desc = item.querySelector(".desc").textContent;
    const mode = item.querySelector(".mode").textContent;
    const reactCount = item.querySelector(".react-count").textContent;
    const updatedAt = item.querySelector(".updated-at").textContent;

    // insert images to modal carousel
    const carousel = albumModal.querySelector(".carousel-inner");
    const indicators = albumModal.querySelector(".carousel-indicators");
    carousel.innerHTML = "";
    indicators.innerHTML = "";
    images.forEach((img, index) => {
        const active = index == 0 ? "active" : "";
        carousel.innerHTML += `
            <div class="carousel-item ${active}">
                <img src="${img.src}" class="d-block w-100">
            </div>
        `;

        if (index == 0) {
            indicators.innerHTML += `
                <button type="button" data-bs-target="#carouselAlbumIndicators" data-bs-slide-to="${index}" class="${active}" aria-current="true" aria-label="Slide ${index + 1}"></button>
            `;
        } else {
            indicators.innerHTML += `
                <button type="button" data-bs-target="#carouselAlbumIndicators" data-bs-slide-to="${index}" aria-label="Slide ${index + 1}"></button>
            `;
        }
    });

    albumModal.querySelector(".modal-title .name").textContent = userName;
    albumModal.querySelector(".modal-title img").src = userAvatar;
    albumModal.querySelector(".modal-title a").href = userPath;
    albumModal.querySelector(".card-title").textContent = title;
    albumModal.querySelector(".card-text").textContent = desc;
    if (mode == "private") {
        albumModal.querySelector(".badge").style.display = "inline";
    } else {
        albumModal.querySelector(".badge").style.display = "none";
    }
    albumModal.querySelector(".react span").textContent = compactFormatter.format(reactCount);
    albumModal.querySelector(".ago").textContent = getRelativeTime(new Date(updatedAt));

    // add edit link
    const editPath = item.querySelector(".edit-path").textContent;
    document.querySelector("#edit-album").href = editPath;

    // add delete event
    const detelePath = item.querySelector(".delete-path").textContent;
    document.querySelector("#delete-album").addEventListener("click", () => {
        http.delete(detelePath, {}, null).then((response) => {
            const url = new URL(window.location.href);
            http.get(url.pathname, { tab: "albums", notice: response.message }, null).then(() => {
                window.location.reload();
            });
        });
    });

    // add reaction info
    const albumId = item.querySelector(".id").textContent;
    const reacted = item.querySelector(".reacted").textContent;
    const reactButton = albumModal.querySelector(".react");
    if (reacted === "true") {
        toggleReact(reactButton.querySelector("i"));
    }
    reactButton.setAttribute("data-post-id", albumId);
    albumModalInstance.show();
}));

// pagination
const pagination = document.querySelector("main nav .pagination");

let count = 3;
let active = 1;

function changePage(index) {
    if (index > 0 && index <= count && index !== active) {
        pagination.children[active].classList.remove("active");
        pagination.children[index].classList.add("active");
        active = index;

        if (index === 1) {
            pagination.firstElementChild.classList.add("disabled");
        } else {
            pagination.firstElementChild.classList.remove("disabled");
        }

        if (index === count) {
            pagination.lastElementChild.classList.add("disabled");
        } else {
            pagination.lastElementChild.classList.remove("disabled");
        }

        // TODO: change data to display
    }
}

// TODO: long pagination
const pages = [...Array(count).keys()].map(index => {
    const page = document.createElement("li");
    page.className = index === 0 ? "page-item active" : "page-item";
    page.innerHTML = `<a class="page-link" href="#">${index + 1}</a>`
    
    page.addEventListener('click', () => changePage(index + 1));

    pagination.insertBefore(page, pagination.lastElementChild);
})

pagination.firstElementChild.classList.add("disabled");
pagination.firstElementChild.addEventListener('click', () => changePage(active - 1));
pagination.lastElementChild.addEventListener('click', () => changePage(active + 1));