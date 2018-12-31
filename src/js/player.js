// function returns paragraph with content from element's data-attribute
const createParagraph = (name, data = '') => {
  let paragraph = document.createElement('p');
  let strongParagraph = document.createElement('span');
  paragraph.classList.add('presentation__p');
  strongParagraph.classList.add('presentation__title')
  strongParagraph.innerHTML = name;
  paragraph.appendChild(strongParagraph);
  let newData = data.replace(/^"(.*)"$/, '$1');
  paragraph.innerHTML += newData;
  return paragraph;
}

// function adds text elements to container
export const showDatas = (container, target) => {
  const datasList = [{
      name: 'Data: ',
      data: 'data-date'
    },
    {
      name: 'Projekt: ',
      data: 'data-project'
    },
    {
      name: 'Klient: ',
      data: 'data-client'
    },
    {
      name: 'Reżyser: ',
      data: 'data-director'
    },
    {
      name: 'DOP: ',
      data: 'data-DOP'
    }
  ];
  const infoCase = document.createElement('div');
  let newTitle = document.createElement('h2');
  newTitle.classList.add('presentation__name');
  infoCase.classList.add('presentation__case')
  newTitle.innerHTML = target.getAttribute('data-title');

  infoCase.appendChild(newTitle);
  datasList.forEach((obj) => infoCase.appendChild(createParagraph(obj.name, target.getAttribute(obj.data))));
  container.appendChild(infoCase);
}

// function adds video element to container
const showVideo = (container, target, src) => {
  let calculatedWidth = (window.innerWidth <= 900) ? container.offsetWidth : container.offsetWidth / 2.5;
  calculatedWidth = Math.round(calculatedWidth);
  // let calculatedHeight = calculatedWidth / 1.28;
  let overlay = document.createElement('div');
  overlay.classList.add('videoOverlay');
  overlay.style.backgroundImage = `url(${target.getAttribute('src')}`;
  let overlayIcon = document.createElement('span');
  overlayIcon.classList = 'overlayIcon fas fa-play';
  overlay.appendChild(overlayIcon);
  let newPlayer = document.createElement('div');
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
  const player = new Vimeo.Player('vimeoPlayer', options);
  player.setVolume(0);

  overlay.addEventListener('click', () => {
    overlay.classList.add('videoOverlay--hidden');
    setTimeout(() => {
      overlay.style.display = 'none';
      player.play();
    }, 400);
  })
}

const showImages = (container, images) => {
  const listOfImages = document.createElement('ul');
  listOfImages.classList.add('presentation__list');
  images.forEach((image) => {
    let newItem = document.createElement('li');
    newItem.classList.add('presentation__item');
    let newLink = document.createElement('a');
    newLink.classList.add('presentation__link');
    newLink.setAttribute('href', image);
    let newImage = document.createElement('img');
    newImage.classList.add('presentation__photo');
    newImage.setAttribute('src', image);
    newLink.appendChild(newImage);
    newItem.appendChild(newLink);
    listOfImages.appendChild(newItem);
  });
  container.appendChild(listOfImages);
}

// event listeners
const projects = document.querySelectorAll('a[href*="#project"]');
const projectContainer = document.querySelector('.presentation');
projects.forEach((project) => {
  project.addEventListener('click', (e) => {
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
  })
});