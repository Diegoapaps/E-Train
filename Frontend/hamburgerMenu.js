// Hamburger menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const sideMenu = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay');
let displayed = false;

function addHamburgerListener() {
    hamburgerMenu.addEventListener('click', showMenu);
}

function showMenu() {
    if (displayed === false) {
        sideMenu.style.left = '65%';
        sideMenu.style.width = '35%';
        overlay.style.display = 'block';
        displayed = true;
    } else {
        sideMenu.style.left = '100%';
        sideMenu.style.width = '0%';
        overlay.style.display = 'none';
        displayed = false;
    }
}

export { showMenu, addHamburgerListener };