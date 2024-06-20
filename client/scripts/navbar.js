const navbar = document.querySelector("nav");

navbar.setAttribute(
    "style",
    "background: linear-gradient(90deg, rgba(9,38,121,1) 0%, rgba(0,212,255,1) 100%);"
);
navbar.setAttribute("data-bs-theme", "dark");

// TODO
profileNav = document.querySelector("#nav-profile");
if (profileNav) {
    profileNav.setAttribute("href", "../profile/index.html?id=" + 1) 
}   

logoutNav = document.querySelector("#nav-logout");
logoutNav.setAttribute("href", "../../login");