import { getRelativeTime } from "./utils/datetime";

// tab
const photos = document.querySelector("#photos");
const albums = document.querySelector("#albums");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");

const photoTab = document.querySelector("#tab-photos a");
const albumTab = document.querySelector("#tab-albums a");
const followerTab = document.querySelector("#tab-followers a");
const followingTab = document.querySelector("#tab-following a");

photos.style.display = "grid";
albums.style.display = "none";
followers.style.display = "none";
following.style.display = "none";

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
followerTab.addEventListener('click', () => changeTab(followerTab, followers));
followingTab.addEventListener('click', () => changeTab(followingTab, following));

// modal
const photoItems = document.querySelectorAll("#photos .item");
const albumItems = document.querySelectorAll("#albums .item");

const photoModal = document.querySelector("#photoModal");
const albumModal = document.querySelector("#albumModal");

const photoModalInstance = new bootstrap.Modal(photoModal, {keyboard: false});
const albumModalInstance = new bootstrap.Modal(albumModal, {keyboard: false});

photoItems.forEach(item => item.addEventListener("click", () => {
    const imgSrc = item.querySelector("img").src;
    const title = item.querySelector(".title").textContent;
    const desc = item.querySelector(".desc").textContent;
    const mode = item.querySelector(".mode").textContent;
    const reactCount = item.querySelector(".react-count").textContent;
    const updatedAt = item.querySelector(".updated-at").textContent;
    
    photoModal.querySelector("img").src = imgSrc;
    photoModal.querySelector(".card-title").textContent = title;
    photoModal.querySelector(".card-text").textContent = desc;
    if (mode == "private") {
        photoModal.querySelector(".badge").style.display = "inline";
    } else {
        photoModal.querySelector(".badge").style.display = "none";
    }
    photoModal.querySelector(".react span").textContent = reactCount;

    photoModal.querySelector(".ago").textContent = getRelativeTime(new Date(updatedAt));
    photoModalInstance.show();
}));
albumItems.forEach(item => item.addEventListener("click", () => {
    albumModalInstance.show();
}));

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

followButtons.forEach(button => button.addEventListener('click', () => toggleFollow(button)));

// react
const reactIcons = document.querySelectorAll(".react");

function toggleReact(icon) {
    if (icon.classList.contains("fa-solid")) { // reacted
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.removeAttribute("style");
    } else {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.setAttribute("style", "color: #ed333b;");
    }
}

reactIcons.forEach(icon => icon.addEventListener('click', () => {
    toggleReact(icon.firstElementChild);
}))
document.querySelector("#photoModal img").addEventListener('dblclick', () => toggleReact(document.querySelector("#photoModal .react i")));
document.querySelector("#albumModal img").addEventListener('dblclick', () => toggleReact(document.querySelector("#albumModal .react i")));