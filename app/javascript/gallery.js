// import { debounce } from "./utils/exec";
// import http from "./utils/request";
// import { getRelativeTime } from "./utils/datetime";

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

    // change URL
    history.pushState({}, "", `?tab=${tab === photoTab ? "photos" : "albums"}`);
}

// initial tab based on query param
const activeTabName = document.querySelector("#activeTab").textContent;
if (activeTabName === "albums") {
    changeTab(albumTab, albums);
} else {
    changeTab(photoTab, photos);
}

photoTab.addEventListener('click', () => changeTab(photoTab, photos));
albumTab.addEventListener('click', () => changeTab(albumTab, albums));

// modal
const photoModal = document.querySelector("#photoModal");
const albumModal = document.querySelector("#albumModal");

const photoModalInstance = new bootstrap.Modal(photoModal, {keyboard: false});
const albumModalInstance = new bootstrap.Modal(albumModal, {keyboard: false});

const populateModalContent = (item, type) => {
    if (type === "photo") {
        item.querySelector(".card-img-top").addEventListener("click", () => {
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
        });
    } else if (type === "album") {
        item.querySelector(".card-img-top").addEventListener("click", () => {

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
                if (isFollowed(followInfo)) {
                    toggleFollow(followButton);
                }
            } else {
                followButton.style.display = "none";
            }
        
            albumModalInstance.show();
        });
    }
}

const photoItems = document.querySelectorAll("#photos .card");
const albumItems = document.querySelectorAll("#albums .card");

photoItems.forEach(item => populateModalContent(item, "photo"));
albumItems.forEach(item => populateModalContent(item, "album"));

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
    if (isFollowed(button)) {
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline-primary");
        button.textContent = I18n.following;
    } else {
        button.classList.remove("btn-outline-primary");
        button.classList.add("btn-primary");
        button.textContent = I18n.follow;
    }
}

function isFollowed(button) {
    return button.classList.contains("btn-outline-primary");
}

followButtons.forEach(button => {
    button.setAttribute("data-status", isFollowed(button) ? "Following" : "Follow");
    const debouncedFollow = debounce(() => {
        if (button.getAttribute("data-status") === "Follow" && isFollowed(button)) {
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
        } else if (button.getAttribute("data-status") === "Following" && !isFollowed(button)) {
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

// lazy load
const element = document.querySelector("main")
element.style.overflow = 'scroll';
let lastScrollTop = 0;

let photoPage = 1;
let albumPage = 1;

element.addEventListener('scroll', (e) => {

    if (element.scrollTop < lastScrollTop) {
      // upscroll 
      return;
    }

    lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
    if (element.scrollTop + element.offsetHeight>= element.scrollHeight ){

        const userId = currentUser.id;
        if (activeTabName === 'photos') {
            if (photoPage == 0) return;
            photoPage++;
            http.get(window.location.pathname, { content: "photos", page: photoPage }, null)
            .then(response => response.json())
            .then(content => {
                if (content.length == 0) {
                    photoPage = 0;
                    return;
                }
                content.forEach((photo) => {
                    const card = document.createElement("div");
                    card.className = "card text-body-secondary";
                    card.setAttribute("data-post-id", photo.id);
                    
                    const cardHeader = document.createElement("div");
                    cardHeader.className = "card-header";
                    const userLink = document.createElement("a");
                    userLink.href = `/users/${photo.user_id}`;
                    userLink.innerHTML = `
                        <div class="user">
                            <img src="${photo.user.avatar.url}" alt="avatar">
                            <p class="name">${photo.user.fname + ' ' + photo.user.lname}</p>
                        </div>
                    `;
                    cardHeader.appendChild(userLink);

                    const followButton = document.createElement("button");
                    if (photo.user_id != userId) {
                        if (photo.user.followers.map(user => user.id).includes(userId)) {
                            followButton.textContent = I18n.following;
                            followButton.className = "btn btn-sm btn-outline-primary follow";
                            followButton.setAttribute("data-follower-id", userId);
                            followButton.setAttribute("data-followed-id", photo.user_id);
                        } else {
                            followButton.textContent = I18n.follow;
                            followButton.className = "btn btn-sm btn-primary follow";
                            followButton.setAttribute("data-follower-id", userId);
                            followButton.setAttribute("data-followed-id", photo.user_id);
                        }
                    }
                    cardHeader.appendChild(followButton);

                    const image = document.createElement("div");
                    image.className = "image";
                    image.innerHTML = `
                        <img src="${photo.medium.url.url}" class="card-img-top" alt="photo">
                    `;

                    const cardBody = document.createElement("div");
                    cardBody.className = "card-body";
                    cardBody.innerHTML = `
                        <h5 class="card-title">${photo.title}</h5>
                        <p class="card-text">${photo.description}</p>
                    `;

                    const cardFooter = document.createElement("div");
                    cardFooter.className = "card-footer text-body-secondary";
                    const react = document.createElement("p");
                    react.className = "react";
                    react.setAttribute("data-post-id", photo.id);
                    react.setAttribute("data-user-id", userId);
                    if (photo.reactors.map(user => user.id).includes(userId)) {
                        react.innerHTML = `
                            <i class="fa-solid fa-heart fa-xl" style="color: #ed333b;"></i>
                        `;
                    } else {
                        react.innerHTML = `
                            <i class="fa-regular fa-heart fa-xl"></i>
                        `;
                    }
                    react.innerHTML += `
                        <span>${photo.reactors.length}</span>
                    `;

                    const ago = document.createElement("p");
                    ago.className = "ago";
                    ago.textContent = getRelativeTime(new Date(photo.updated_at), currentLocale);

                    cardFooter.appendChild(react);
                    cardFooter.appendChild(ago);


                    card.appendChild(cardHeader);
                    card.appendChild(image);
                    card.appendChild(cardBody);
                    card.appendChild(cardFooter);

                    populateModalContent(card, "photo");
                    photos.appendChild(card);
                });
            });
        } else if (activeTabName === 'albums') {
            if (albumPage == 0) return;
            albumPage++;
            http.get(window.location.pathname, { content: "albums", page: albumPage }, null)
            .then(response => response.json())
            .then(content => {
                if (content.length == 0) {
                    albumPage = 0;
                    return;
                }
                content.forEach((album) => {
                    const card = document.createElement("div");
                    card.className = "card text-body-secondary";
                    card.setAttribute("data-post-id", album.id);
                    
                    const cardHeader = document.createElement("div");
                    cardHeader.className = "card-header";
                    const userLink = document.createElement("a");
                    userLink.href = `/users/${album.user_id}`;
                    userLink.innerHTML = `
                        <div class="user">
                            <img src="${album.user.avatar.url}" alt="avatar">
                            <p class="name">${album.user.fname + ' ' + album.user.lname}</p>
                        </div>
                    `;
                    cardHeader.appendChild(userLink);

                    const followButton = document.createElement("button");
                    if (album.user_id != userId) {
                        if (album.user.followers.map(user => user.id).includes(userId)) {
                            followButton.textContent = I18n.following;
                            followButton.className = "btn btn-sm btn-outline-primary follow";
                            followButton.setAttribute("data-follower-id", userId);
                            followButton.setAttribute("data-followed-id", album.user_id);
                        } else {
                            followButton.textContent = I18n.follow;
                            followButton.className = "btn btn-sm btn-primary follow";
                            followButton.setAttribute("data-follower-id", userId);
                            followButton.setAttribute("data-followed-id", album.user_id);
                        }
                    }
                    cardHeader.appendChild(followButton);

                    const image = document.createElement("div");
                    image.className = "image";
                    image.innerHTML = `
                        <img src="${album.media[0].url}" class="card-img-top" alt="album">
                    `;

                    const images = document.createElement("div");
                    images.className = "images";
                    images.style.display = "none";
                    album.media.forEach((medium) => {
                        images.innerHTML += `
                            <img src="${medium.url.url}" alt="photo">
                        `;
                    });

                    const cardBody = document.createElement("div");
                    cardBody.className = "card-body";
                    cardBody.innerHTML = `
                        <h5 class="card-title">${album.title}</h5>
                        <p class="card-text">${album.description}</p>
                    `;

                    const cardFooter = document.createElement("div");
                    cardFooter.className = "card-footer text-body-secondary";
                    const react = document.createElement("p");
                    react.className = "react";
                    react.setAttribute("data-post-id", album.id);
                    react.setAttribute("data-user-id", userId);
                    if (album.reactors.map(user => user.id).includes(userId)) {
                        react.innerHTML = `
                            <i class="fa-solid fa-heart fa-xl" style="color: #ed333b;"></i>
                        `;
                    } else {
                        react.innerHTML = `
                            <i class="fa-regular fa-heart fa-xl"></i>
                        `;
                    }
                    react.innerHTML += `
                        <span>${album.reactors.length}</span>
                    `;
                    
                    const ago = document.createElement("p");
                    ago.className = "ago";
                    ago.textContent = getRelativeTime(new Date(album.updated_at), currentLocale);

                    cardFooter.appendChild(react);
                    cardFooter.appendChild(ago);

                    const count = document.createElement("p");
                    count.className = "count";
                    count.textContent = album.media.length;
                    
                    card.appendChild(cardHeader);
                    card.appendChild(image);
                    card.appendChild(images);
                    card.appendChild(cardBody);
                    card.appendChild(cardFooter);
                    card.appendChild(count);

                    populateModalContent(card, "album");
                    albums.appendChild(card);
                });
            })
        }
    }
});