const editActions = document.querySelectorAll("table tr :last-child a");
const deteleActions = document.querySelectorAll("table tr :last-child button")

editActions.forEach(action => action.setAttribute("href", "../editUser"));