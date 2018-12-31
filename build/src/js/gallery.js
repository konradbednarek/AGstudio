(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _player = require('./player');

var create = function create() {
  var galleryElements = document.querySelectorAll('.presentation__item');
  for (var i = 0; i < galleryElements.length; i++) {
    galleryElements[i].style.order = i + 1;
  }
};

var reset = function reset() {
  var galleryElements = document.querySelectorAll('.presentation__item');
  galleryElements.forEach(function (el) {
    el.classList.remove('transition');
    el.classList.remove('left');
  });
};

var next = function next() {
  var galleryElements = document.querySelectorAll('.presentation__item');
  galleryElements.forEach(function (el) {
    var currentPosition = el.style.order;
    if (currentPosition > galleryElements.length) {
      el.style.order = 1;
    } else if (currentPosition == 1) el.style.order = galleryElements.length;else el.style.order = --currentPosition;
  });
};

// const next = () => {
// 	galleryElements.forEach((el) => {
// 		let currentPosition = el.style.order;
// 		currentPosition++;
// 		if (currentPosition > galleryLength)
// 			currentPosition = 0;
// 		el.style.order = currentPosition;
// 	})
// }

var clickNext = function clickNext() {
  var galleryElements = document.querySelectorAll('.presentation__item');
  galleryElements.forEach(function (el) {
    el.classList.add('transition');
    el.classList.add('left');
  });
  setTimeout(function () {
    next();
    reset();
  }, 500);
};

var showImage = function showImage(container, target) {
  var parent = target.parentNode;
  var elementsForSlider = parent.querySelectorAll('.slide');
  var imageCase = document.createElement('div');
  var imageList = document.createElement('ul');
  imageList.classList.add('presentation__list');
  var nextButton = document.createElement('button');
  nextButton.classList.add('presentation__nextButton');
  nextButton.textContent = 'Następne zdjęcie';

  elementsForSlider.forEach(function (image) {
    var listElement = document.createElement('li');
    listElement.classList.add('presentation__item');
    var newImage = document.createElement('img');
    newImage.classList.add('presentation__sliderImg');
    newImage.setAttribute('src', image.getAttribute('src'));
    listElement.appendChild(newImage);
    imageList.appendChild(listElement);
  });

  imageCase.classList.add('presentation__sliderCase');
  imageCase.appendChild(imageList);
  imageCase.appendChild(nextButton);
  container.appendChild(imageCase);

  create();
  nextButton.addEventListener('click', clickNext);
};

// event listeners
var galleryImages = document.querySelectorAll('a[href*="#image"]');
var projectContainer = document.querySelector('.presentation');
galleryImages.forEach(function (image) {
  image.addEventListener('click', function (e) {
    e.preventDefault();
    projectContainer.classList.remove('presentation--hidden');
    document.querySelector('body').scrollIntoView({
      behavior: 'smooth'
    });
    image.blur();
    projectContainer.innerHTML = '';
    (0, _player.showDatas)(projectContainer, image);
    showImage(projectContainer, image.querySelector('img'));
  });
});

},{"./player":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// function returns paragraph with content from element's data-attribute
var createParagraph = function createParagraph(name) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var paragraph = document.createElement('p');
  var strongParagraph = document.createElement('span');
  paragraph.classList.add('presentation__p');
  strongParagraph.classList.add('presentation__title');
  strongParagraph.innerHTML = name;
  paragraph.appendChild(strongParagraph);
  var newData = data.replace(/^"(.*)"$/, '$1');
  paragraph.innerHTML += newData;
  return paragraph;
};

// function adds text elements to container
var showDatas = exports.showDatas = function showDatas(container, target) {
  var datasList = [{
    name: 'Data: ',
    data: 'data-date'
  }, {
    name: 'Projekt: ',
    data: 'data-project'
  }, {
    name: 'Klient: ',
    data: 'data-client'
  }, {
    name: 'Reżyser: ',
    data: 'data-director'
  }, {
    name: 'DOP: ',
    data: 'data-DOP'
  }];
  var infoCase = document.createElement('div');
  var newTitle = document.createElement('h2');
  newTitle.classList.add('presentation__name');
  infoCase.classList.add('presentation__case');
  newTitle.innerHTML = target.getAttribute('data-title');

  infoCase.appendChild(newTitle);
  datasList.forEach(function (obj) {
    return infoCase.appendChild(createParagraph(obj.name, target.getAttribute(obj.data)));
  });
  container.appendChild(infoCase);
};

// function adds video element to container
var showVideo = function showVideo(container, target, src) {
  var calculatedWidth = window.innerWidth <= 900 ? container.offsetWidth : container.offsetWidth / 2.5;
  calculatedWidth = Math.round(calculatedWidth);
  // let calculatedHeight = calculatedWidth / 1.28;
  var overlay = document.createElement('div');
  overlay.classList.add('videoOverlay');
  overlay.style.backgroundImage = 'url(' + target.getAttribute('src');
  var overlayIcon = document.createElement('span');
  overlayIcon.classList = 'overlayIcon fas fa-play';
  overlay.appendChild(overlayIcon);
  var newPlayer = document.createElement('div');
  newPlayer.classList.add('vimeoPlayer');
  newPlayer.setAttribute('data-vimeo-id', src);
  newPlayer.setAttribute('data-vimeo-width', calculatedWidth);
  var options = {
    id: 59777392,
    width: calculatedWidth,
    loop: true
  };
  newPlayer.appendChild(overlay);
  newPlayer.setAttribute("id", "vimeoPlayer");
  container.appendChild(newPlayer);
  var player = new Vimeo.Player('vimeoPlayer', options);
  player.setVolume(0);

  overlay.addEventListener('click', function () {
    overlay.classList.add('videoOverlay--hidden');
    setTimeout(function () {
      overlay.style.display = 'none';
      player.play();
    }, 400);
  });
};

var showImages = function showImages(container, images) {
  var listOfImages = document.createElement('ul');
  listOfImages.classList.add('presentation__list');
  images.forEach(function (image) {
    var newItem = document.createElement('li');
    newItem.classList.add('presentation__item');
    var newLink = document.createElement('a');
    newLink.classList.add('presentation__link');
    newLink.setAttribute('href', image);
    var newImage = document.createElement('img');
    newImage.classList.add('presentation__photo');
    newImage.setAttribute('src', image);
    newLink.appendChild(newImage);
    newItem.appendChild(newLink);
    listOfImages.appendChild(newItem);
  });
  container.appendChild(listOfImages);
};

// event listeners
var projects = document.querySelectorAll('a[href*="#project"]');
var projectContainer = document.querySelector('.presentation');
projects.forEach(function (project) {
  project.addEventListener('click', function (e) {
    projectContainer.classList.remove('presentation--hidden');
    e.preventDefault();
    document.querySelector('body').scrollIntoView({
      behavior: 'smooth'
    });
    project.blur();
    projectContainer.innerHTML = '';
    showDatas(projectContainer, project);
    showVideo(projectContainer, project.querySelector('img'), project.getAttribute('data-source'));
    showImages(projectContainer, currentImages);
  });
});

},{}]},{},[1]);
