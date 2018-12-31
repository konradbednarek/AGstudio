let baseLink = window.location.pathname.length > 1 ? (window.location.pathname).slice(0, window.location.pathname.length - 1) : '/';
const activeLink = document.querySelector(`.nav-menu__list li a[href="${baseLink}"]`);
if (activeLink) activeLink.classList.add('nav-menu__link--active');

// script that supports responsive and accessible menu
const menu = document.querySelector('.nav-menu__list');
const showHideButton = document.createElement('button');
const menuParagraph = document.createElement('p');

const mql = window.matchMedia('(max-width: 900px)');

const screenTest = (e) => {
  if ((e && e.matches) || window.innerWidth <= 900) {
    showHideButton.setAttribute('type', 'button');
    showHideButton.setAttribute('aria-controls', 'main-nav');
    showHideButton.classList.add('nav-menu__button');
    showHideButton.innerHTML = 'Menu';
    menuParagraph.classList.add('nav-menu__p');
    showHideButton.appendChild(menuParagraph);
    menu.parentNode.insertBefore(showHideButton, menu);

    function showMenu() {
      menuParagraph.innerHTML = 'Zamknij menu';
      showHideButton.setAttribute('aria-expanded', 'true');
      menu.classList.remove('nav-menu__list--hidden');
    }

    function hideMenu() {
      showHideButton.setAttribute('aria-expanded', 'false');
      menuParagraph.innerHTML = 'Otwórz menu';
      menu.classList.add('nav-menu__list--hidden');
    }

    showHideButton.addEventListener('click', () => {
      (menu.classList.contains('nav-menu__list--hidden')) ? showMenu(): hideMenu();
    }, hideMenu());
  } else {
    if (document.querySelector('.nav-menu__list').classList.contains('nav-menu__list--hidden'))
      menu.classList.remove('.nav-menu__list--hidden');

  }
}

mql.addListener(screenTest);
screenTest();
// end