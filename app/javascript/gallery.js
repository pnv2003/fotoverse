import { debounce } from "./utils/exec";
import http from "./utils/request";

// tab
const photos = document.querySelector("#photos");
const albums = document.querySelector("#albums");

const photoTab = document.querySelector("#tab-photos");
const albumTab = document.querySelector("#tab-albums");

photos.style.display = "grid";
albums.style.display = "none";

let activeTab = photoTab;
let activeContent = photos;

function changeTab(tab, content) {
    activeTab.classList.remove("active");
    activeTab.removeAttribute("aria-current");
    activeContent.style.display = "none";

    tab.classList.add("active");
    tab.setAttribute("aria-current", "page");
    content.style.display = "grid";

    activeTab = tab;
    activeContent = content;
}

photoTab.addEventListener('click', () => changeTab(photoTab, photos));
albumTab.addEventListener('click', () => changeTab(albumTab, albums));

// modal
const photoItems = document.querySelectorAll("#photos .card");
const albumItems = document.querySelectorAll("#albums .card");

const photoModal = document.querySelector("#photoModal");
const albumModal = document.querySelector("#albumModal");

const photoModalInstance = new bootstrap.Modal(photoModal, {keyboard: false});
const albumModalInstance = new bootstrap.Modal(albumModal, {keyboard: false});

photoItems.forEach(item => item.querySelector(".card-img-top").addEventListener("click", () => {
    const avatarSrc = item.querySelector(".card-header img").src;
    const username = item.querySelector(".card-header .name").textContent;
    const profileLink = item.querySelector(".card-header a").href;
    const photoSrc = item.querySelector(".card-img-top").src;
    const title = item.querySelector(".card-title").textContent;
    const description = item.querySelector(".card-text").textContent;
    const reacted = item.querySelector(".react i").classList.contains("fa-solid");
    const reactCount = item.querySelector(".react span").textContent;
    const timeAgo = item.querySelector(".ago").textContent;

    photoModal.querySelector(".modal-header img").src = avatarSrc;
    photoModal.querySelector(".modal-header .name").textContent = username;
    photoModal.querySelector(".modal-header a").href = profileLink;
    photoModal.querySelector(".card-img-top").src = photoSrc;
    photoModal.querySelector(".card-title").textContent = title;
    photoModal.querySelector(".card-text").textContent = description;
    photoModal.querySelector(".ago").textContent = timeAgo;

    // add reaction info
    const photoId = item.getAttribute("data-post-id");
    const reactButton = photoModal.querySelector(".react");
    if (reacted) {
        toggleReact(reactButton.querySelector("i"));
    }
    reactButton.querySelector("span").textContent = reactCount;
    reactButton.setAttribute("data-post-id", photoId);

    // add follow info
    const followInfo = item.querySelector(".follow");
    const followButton = photoModal.querySelector(".follow");
    if (followInfo) {
        followButton.setAttribute("data-follower-id", followInfo.getAttribute("data-follower-id"));
        followButton.setAttribute("data-followed-id", followInfo.getAttribute("data-followed-id"));
        if (followInfo.textContent === "Following") {
            toggleFollow(followButton);
        }
    } else {
        followButton.style.display = "none";
    }

    photoModalInstance.show();
}));
albumItems.forEach(item => item.querySelector(".card-img-top").addEventListener("click", () => {

    const images = item.querySelectorAll(".images img");
    const avatarSrc = item.querySelector(".card-header img").src;
    const username = item.querySelector(".card-header .name").textContent;
    const profileLink = item.querySelector(".card-header a").href;
    const albumSrc = item.querySelector(".card-img-top").src;
    const title = item.querySelector(".card-title").textContent;
    const description = item.querySelector(".card-text").textContent;
    const reacted = item.querySelector(".react i").classList.contains("fa-solid");
    const reactCount = item.querySelector(".react span").textContent;
    const photoCount = item.querySelector(".count").textContent;
    const timeAgo = item.querySelector(".ago").textContent;

    albumModal.querySelector(".modal-header img").src = avatarSrc;
    albumModal.querySelector(".modal-header .name").textContent = username;
    albumModal.querySelector(".modal-header a").href = profileLink;
    albumModal.querySelector(".card-title").textContent = title;
    albumModal.querySelector(".card-text").textContent = description;
    albumModal.querySelector(".ago").textContent = timeAgo;

    // insert images to album carousel
    const carousel = albumModal.querySelector(".carousel-inner");
    const indicators = albumModal.querySelector(".carousel-indicators");
    carousel.innerHTML = "";
    indicators.innerHTML = "";
    images.forEach((image, index) => {
        const active = index === 0 ? "active" : "";
        carousel.innerHTML += `
            <div class="carousel-item ${active}">
                <img src="${image.src}" class="d-block w-100" alt="...">
            </div>
        `;

        if (index == 0) {
            indicators.innerHTML += `
                <button type="button" data-bs-target="#carouselAlbumIndicators" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide 1"></button>
            `;
        } else {
            indicators.innerHTML += `
                <button type="button" data-bs-target="#carouselAlbumIndicators" data-bs-slide-to="${index}" aria-label="Slide ${index + 1}"></button>
            `;
        }
    });

    // add reaction info
    const albumId = item.getAttribute("data-post-id");
    const reactButton = albumModal.querySelector(".react");
    if (reacted) {
        toggleReact(reactButton.querySelector("i"));
    }
    reactButton.querySelector("span").textContent = reactCount;
    reactButton.setAttribute("data-post-id", albumId);

    // add follow info
    const followInfo = item.querySelector(".follow");
    const followButton = albumModal.querySelector(".follow");
    if (followInfo) {
        followButton.setAttribute("data-follower-id", followInfo.getAttribute("data-follower-id"));
        followButton.setAttribute("data-followed-id", followInfo.getAttribute("data-followed-id"));
        if (followInfo.textContent === "Following") {
            toggleFollow(followButton);
        }
    } else {
        followButton.style.display = "none";
    }

    albumModalInstance.show();
}));

// react
const reactButtons = document.querySelectorAll(".react");

function toggleReact(icon, count = null) {
    if (icon.classList.contains("fa-solid")) { // reacted
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.removeAttribute("style");
        if (count) {
            count.textContent = parseInt(count.textContent) - 1;
        }
    } else {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.setAttribute("style", "color: #ed333b;");
        if (count) {
            count.textContent = parseInt(count.textContent) + 1;
        }
    }
}

reactButtons.forEach(button => {
    const icon = button.querySelector("i");
    const count = button.querySelector("span");
    console.log("react");
    button.setAttribute("data-reacted", icon.classList.contains("fa-solid"));
    const debouncedReact = debounce(() => {
        if (button.getAttribute("data-reacted") === "false" && icon.classList.contains("fa-solid")) {
            http.post("/reactions", {}, {
                reaction: {
                    post_id: button.getAttribute("data-post-id"),
                    user_id: button.getAttribute("data-user-id")
                }
            }).then((response) => {
                if (response.status_code === 201) {
                    console.log(response.message);
                    button.setAttribute("data-reacted", true);
                } else {
                    console.error(response.message);
                    toggleReact(icon, count);
                }
            }).catch((error) => {
                console.error(error);
                toggleReact(icon, count);
            });
        } else if (button.getAttribute("data-reacted") === "true" && !icon.classList.contains("fa-solid")) {
            http.delete('/reactions/1', {}, {
                reaction: {
                    post_id: button.getAttribute("data-post-id"),
                    user_id: button.getAttribute("data-user-id")
                }
            }).then((response) => {
                if (response.status_code === 200) {
                    console.log(response.message);
                    button.setAttribute("data-reacted", "false");
                } else {
                    console.error(response.message);
                    toggleReact(icon, count);
                }
            }).catch((error) => {
                console.error(error);
                toggleReact(icon, count);
            });
        }
    }, 1000);

    button.addEventListener('click', () => {
        toggleReact(icon, count);
        debouncedReact();
    });
});
document.querySelector("#photoModal img").addEventListener('dblclick', () => toggleReact(document.querySelector("#photoModal .react i")));
document.querySelector("#albumModal img").addEventListener('dblclick', () => toggleReact(document.querySelector("#albumModal .react i")));

// follow
const followButtons = document.querySelectorAll(".follow");

function toggleFollow(button) {
    if (button.textContent === "Follow") {
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline-primary");
        button.textContent = "Following";
    } else {
        button.classList.remove("btn-outline-primary");
        button.classList.add("btn-primary");
        button.textContent = "Follow";
    }
}

followButtons.forEach(button => {
    button.setAttribute("data-status", button.textContent);
    const debouncedFollow = debounce(() => {
        if (button.getAttribute("data-status") === "Follow" && button.textContent === "Following") {
            http.post("/follows", {}, {
                follow: {
                    follower_id: button.getAttribute("data-follower-id"),
                    followed_id: button.getAttribute("data-followed-id")
                }
            }).then((response) => {
                if (response.status_code === 201) {
                    console.log(response.message);
                    button.setAttribute("data-status", "Following");
                } else {
                    console.error(response.message);
                    toggleFollow(button);
                }
            }).catch((error) => {
                console.error(error);
                toggleFollow(button);
            });
        } else if (button.getAttribute("data-status") === "Following" && button.textContent === "Follow") {
            http.delete('/follows/1', {}, {
                follow: {
                    follower_id: button.getAttribute("data-follower-id"),
                    followed_id: button.getAttribute("data-followed-id")
                }
            }).then((response) => {
                if (response.status_code === 200) {
                    console.log(response.message);
                    button.setAttribute("data-status", "Follow");
                } else {
                    console.error(response.message);
                    toggleFollow(button);
                }
            }).catch((error) => {
                console.error(error);
                toggleFollow(button);
            });
        }
    }, 1000);

    button.addEventListener('click', () => {
        toggleFollow(button);
        debouncedFollow();
    });
});