// Hamburger menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const sideMenu = document.querySelector('.hamburger');
let displayed = false;

hamburgerMenu.addEventListener('click', showMenu);

function showMenu() {
    if (displayed === false) {
        sideMenu.style.left = '65%';
        sideMenu.style.width = '35%';
        displayed = true;
    } else {
        sideMenu.style.left = '100%';
        sideMenu.style.width = '0%';
        displayed = false;
    }
}