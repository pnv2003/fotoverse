import { getRelativeTime } from "./utils/datetime";
import { debounce } from "./utils/exec";
import { compactFormatter } from "./utils/number";
import http from "./utils/request";

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

    // change URL
    history.pushState(null, null, `?tab=${
        tab === photoTab ? "photos" : 
        tab === albumTab ? "albums" : 
        tab === followerTab ? "followers" : "following"
    }`);
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

const photoModal = document.querySelector("#photoModal");
const albumModal = document.querySelector("#albumModal");

const photoModalInstance = new bootstrap.Modal(photoModal, {keyboard: false});
const albumModalInstance = new bootstrap.Modal(albumModal, {keyboard: false});

// modal
const populateModalContent = (item, type) => {
    if (type === 'photo') {
        item.addEventListener("click", () => {
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
            photoModal.querySelector(".react span").textContent = compactFormatter.format(reactCount);
            photoModal.querySelector(".ago").textContent = getRelativeTime(new Date(updatedAt), currentLocale);
        
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
        });
    } else if (type === 'album') {
        item.addEventListener("click", () => {

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
            albumModal.querySelector(".react span").textContent = compactFormatter.format(reactCount);
            albumModal.querySelector(".ago").textContent = getRelativeTime(new Date(updatedAt), currentLocale);
        
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
        });
    }
}

const photoItems = document.querySelectorAll("#photos .item");
const albumItems = document.querySelectorAll("#albums .item");

photoItems.forEach(item => populateModalContent(item, 'photo'));
albumItems.forEach(item => populateModalContent(item, 'album'));

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
            http.post('/follows', {}, {
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
            })
            .catch((error) => {
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
            })
            .catch((error) => {
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
            http.post('/reactions', {}, {
                reaction: {
                    post_id: button.getAttribute("data-post-id"),
                    user_id: button.getAttribute("data-user-id")
                }
            }).then((response) => {
                if (response.status_code === 201) {
                    console.log(response.message);
                    button.setAttribute("data-reacted", "true");
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
            })
            .catch((error) => {
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
// document.querySelector("#photoModal img").addEventListener('dblclick', () => toggleReact(document.querySelector("#photoModal .react i")));
// document.querySelector("#albumModal img").addEventListener('dblclick', () => toggleReact(document.querySelector("#albumModal .react i")));

// lazy loading
const element = document.querySelector("main")
element.style.overflow = 'scroll';
let lastScrollTop = 0;

let photoPage = 1;
let albumPage = 1;
let followerPage = 1;
let followingPage = 1;

element.addEventListener('scroll', (e) => {

    if (element.scrollTop < lastScrollTop) {
      // upscroll 
      return;
    }

    lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
    if (element.scrollTop + element.offsetHeight>= element.scrollHeight ){

        console.log("load more");
       
        if (activeTabName === 'photos') {
            if (photoPage == 0) return;
            photoPage++;
            http.get(window.location.pathname, { content: "photos", page: photoPage }, null)
            .then(response => response.json())
            .then(content => {
                console.log("load more photos");
                if (content.length == 0) {
                    photoPage = 0;
                    return;
                }
                content.forEach((photo) => {
                    const item = document.createElement("div");
                    item.className = "item";

                    const img = document.createElement("img");
                    img.src = photo.medium.url.url;
                    img.alt = "My Photo";

                    const info = document.createElement("div");
                    info.className = "info";
                    info.style.display = "none";

                    const userId = currentUser.id;
                    info.innerHTML = `
                        <span class="id">${photo.id}</span>
                        <span class="title">${photo.title}</span>
                        <span class="desc">${photo.description}</span>
                        <span class="mode">${photo.mode}</span>
                        <span class="reacted">${photo.reactors.includes(userId)}</span>
                        <span class="react-count">${photo.reactors.length}</span>
                        <span class="updated-at">${photo.updated_at}</span>
                        <span class="edit-path">/photos/${photo.id}/edit</span>
                        <span class="delete-path">/posts/${photo.id}</span>
                    `;

                    item.appendChild(img);
                    item.appendChild(info);
                    if (photo.mode === "private") {
                        item.innerHTML += `
                            <div class="mode">
                                <i class="fa-solid fa-lock"></i>
                            </div>
                        `;
                    }
                    populateModalContent(item, 'photo');
                    photos.appendChild(item);
                });
            });
        } else if (activeTabName === "albums") {
            if (albumPage == 0) return;
            albumPage++;
            http.get(window.location.pathname, { content: "albums", page: albumPage }, null)
            .then(response => response.json())
            .then(content => {
                console.log("load more albums");
                if (content.length == 0) {
                    albumPage = 0;
                    return;
                }
                content.forEach((album) => {
                    const item = document.createElement("div");
                    item.className = "item";

                    const img = document.createElement("img");
                    img.src = album.media[0].url.url;
                    img.alt = "My Album";

                    const info = document.createElement("div");
                    info.className = "info";
                    info.style.display = "none";

                    // kinda hardcode
                    const userId = document.querySelector("#current_user_id").textContent;
                    info.innerHTML = `
                        <span class="id">${album.id}</span>
                        <span class="title">${album.title}</span>
                        <span class="desc">${album.description}</span>
                        <span class="mode">${album.mode}</span>
                        <span class="reacted">${album.reactors.includes(userId)}</span>
                        <span class="react-count">${album.reactors.length}</span>
                        <span class="updated-at">${album.updated_at}</span>
                        <span class="edit-path">/albums/${album.id}/edit</span>
                        <span class="delete-path">/posts/${album.id}</span>
                    `;

                    album.media.forEach(medium => {
                        const img = document.createElement("img");
                        img.src = medium.url.url;
                        img.alt = "My Album Photo";
                        info.appendChild(img);
                    })

                    item.appendChild(img);
                    item.appendChild(info);
                    if (album.mode === "private") {
                        item.innerHTML += `
                            <div class="mode">
                                <i class="fa-solid fa-lock"></i>
                            </div>
                        `;
                    }

                    const count = document.createElement("p");
                    count.className = "count";
                    count.textContent = `${album.media.length}`;
                    item.appendChild(count);

                    populateModalContent(item, 'album');
                    albums.appendChild(item);
                });
            });
        } else if (activeTabName === "followers") {
            if (followerPage == 0) return;
            followerPage++;
            http.get(window.location.pathname, { content: "followers", page: followerPage }, null)
            .then(response => response.json())
            .then(content => {
                if (content.length == 0) {
                    followerPage = 0;
                    return;
                }
                content.forEach((follower) => {
                    const item = document.createElement("div");
                    item.className = "item";

                    const avatar = document.createElement("div");
                    avatar.className = "avatar";
                    const img = document.createElement("img");
                    img.src = follower.avatar.url;
                    img.alt = "avatar";
                    avatar.appendChild(img);

                    const info = document.createElement("div");
                    info.className = "info";

                    const name = document.createElement("p");
                    name.className = "name";
                    name.textContent = follower.fname + ' ' + follower.lname;
                    info.appendChild(name);

                    const metrics = document.createElement("div");
                    metrics.className = "metrics";
                    const photoCount = document.createElement("p");
                    photoCount.textContent = `${follower.posts.filter(post => post.type === "Photo").length} photos`;
                    const albumCount = document.createElement("p");
                    albumCount.textContent = `${follower.posts.filter(post => post.type === "Album").length} albums`;
                    metrics.appendChild(photoCount);
                    metrics.appendChild(albumCount);
                    info.appendChild(metrics);

                    item.appendChild(avatar);
                    item.appendChild(info);

                    const userId = currentUser.id;
                    if (follower.followers.map(user => user.id).includes(userId)) {
                        item.innerHTML += `
                            <button class="follow btn btn-outline-primary" data-follower-id="${userId}" data-followed-id="${follower.id}">Following</button>
                        `;
                    } else {
                        item.innerHTML += `
                            <button class="follow btn btn-primary" data-follower-id="${userId}" data-followed-id="${follower.id}">Follow</button>
                        `;
                    }
                    followers.appendChild(item);
                });
            });
        } else if (activeTabName === "following") {
            if (followingPage == 0) return;
            followingPage++;
            http.get(window.location.pathname, { content: "following", page: followingPage }, null)
            .then(response => response.json())
            .then(content => {
                if (content.length == 0) {
                    followingPage = 0;
                    return;
                }
                content.forEach((followed) => {
                    const item = document.createElement("div");
                    item.className = "item";

                    const avatar = document.createElement("div");
                    avatar.className = "avatar";
                    const img = document.createElement("img");
                    img.src = followed.avatar.url;
                    img.alt = "avatar";
                    avatar.appendChild(img);

                    const info = document.createElement("div");
                    info.className = "info";

                    const name = document.createElement("p");
                    name.className = "name";
                    name.textContent = followed.fname + ' ' + followed.lname;
                    info.appendChild(name);

                    const metrics = document.createElement("div");
                    metrics.className = "metrics";
                    const photoCount = document.createElement("p");
                    photoCount.textContent = `${followed.posts.filter(post => post.type === "Photo").length} photos`;
                    const albumCount = document.createElement("p");
                    albumCount.textContent = `${followed.posts.filter(post => post.type === "Album").length} albums`;
                    metrics.appendChild(photoCount);
                    metrics.appendChild(albumCount);
                    info.appendChild(metrics);

                    item.appendChild(avatar);
                    item.appendChild(info);

                    const userId = document.querySelector("#current_user_id");
                    if (followed.followers.map(user => user.id).includes(userId)) {
                        item.innerHTML += `
                            <button class="follow btn btn-outline-primary" data-follower-id="${userId}" data-followed-id="${followed.id}">Following</button>
                        `;
                    } else {
                        item.innerHTML += `
                            <button class="follow btn btn-primary" data-follower-id="${userId}" data-followed-id="${followed.id}">Follow</button>
                        `;
                    }
                    following.appendChild(item);
                });
            });
        }

    }
});