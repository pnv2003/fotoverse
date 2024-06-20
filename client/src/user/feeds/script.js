const params = new URLSearchParams(window.location.search);
const discover = params.get("discover");

// TODO: load all posts if discover = true

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
const photoItems = document.querySelectorAll("#photos .card img");
const albumItems = document.querySelectorAll("#albums .card img");

const photoModal = new bootstrap.Modal(document.querySelector("#photoModal"), {keyboard: false});
const albumModal = new bootstrap.Modal(document.querySelector("#albumModal"), {keyboard: false});

photoItems.forEach(item => item.addEventListener("click", (event) => {
    if (!event.target.classList.contains("react")) {
        photoModal.show();
    }
}));
albumItems.forEach(item => item.addEventListener("click", (event) => {
    if (!event.target.classList.contains("react")) {
        albumModal.show();
    }
}));

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