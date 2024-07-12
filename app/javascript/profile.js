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

const activeTabName = document.querySelector("#activeTab").textContent;

photos.style.display = "none";
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

// initial tab based on query param
if (activeTabName === "albums") {
    changeTab(albumTab, albums);
} else if (activeTabName === "followers") {
    changeTab(followerTab, followers);
} else if (activeTabName === "following") {
    changeTab(followingTab, following);
} else { // default to photos
    changeTab(photoTab, photos);
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

    const images = item.querySelectorAll(".info img");
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

    


    albumModal.querySelector(".card-title").textContent = title;
    albumModal.querySelector(".card-text").textContent = desc;
    if (mode == "private") {
        albumModal.querySelector(".badge").style.display = "inline";
    } else {
        albumModal.querySelector(".badge").style.display = "none";
    }
    albumModal.querySelector(".react span").textContent = reactCount;
    albumModal.querySelector(".ago").textContent = getRelativeTime(new Date(updatedAt));
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