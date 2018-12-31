(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// website loader
var loader = document.querySelector('.loader');
// loader.classList.remove('loader__hide--hidden');

window.onload = function () {
  loader.classList.add('loader__hide');
  setTimeout(function () {
    loader.classList.add('loader__hide--hidden');
  }, 800);
};

var menuLinks = document.querySelectorAll('.animateLink');
menuLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    loader.classList = 'loader loader__showed';
    setTimeout(function () {
      window.location = link.getAttribute('href');
    }, 800);
  });
});

},{}],2:[function(require,module,exports){
'use strict';

var baseLink = window.location.pathname.length > 1 ? window.location.pathname.slice(0, window.location.pathname.length - 1) : '/';
var activeLink = document.querySelector('.nav-menu__list li a[href="' + baseLink + '"]');
if (activeLink) activeLink.classList.add('nav-menu__link--active');

// script that supports responsive and accessible menu
var menu = document.querySelector('.nav-menu__list');
var showHideButton = document.createElement('button');
var menuParagraph = document.createElement('p');

var mql = window.matchMedia('(max-width: 900px)');

var screenTest = function screenTest(e) {
  if (e && e.matches || window.innerWidth <= 900) {
    var showMenu = function showMenu() {
      menuParagraph.innerHTML = 'Zamknij menu';
      showHideButton.setAttribute('aria-expanded', 'true');
      menu.classList.remove('nav-menu__list--hidden');
    };

    var hideMenu = function hideMenu() {
      showHideButton.setAttribute('aria-expanded', 'false');
      menuParagraph.innerHTML = 'Otwórz menu';
      menu.classList.add('nav-menu__list--hidden');
    };

    showHideButton.setAttribute('type', 'button');
    showHideButton.setAttribute('aria-controls', 'main-nav');
    showHideButton.classList.add('nav-menu__button');
    showHideButton.innerHTML = 'Menu';
    menuParagraph.classList.add('nav-menu__p');
    showHideButton.appendChild(menuParagraph);
    menu.parentNode.insertBefore(showHideButton, menu);

    showHideButton.addEventListener('click', function () {
      menu.classList.contains('nav-menu__list--hidden') ? showMenu() : hideMenu();
    }, hideMenu());
  } else {
    if (document.querySelector('.nav-menu__list').classList.contains('nav-menu__list--hidden')) menu.classList.remove('.nav-menu__list--hidden');
  }
};

mql.addListener(screenTest);
screenTest();
// end

},{}],3:[function(require,module,exports){
'use strict';

require('./loader');

require('./menu');

},{"./loader":1,"./menu":2}]},{},[3]);
