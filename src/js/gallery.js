import { showDatas } from './player';

const create = () => {
  let galleryElements = document.querySelectorAll('.presentation__item');
	for (let i=0; i<galleryElements.length; i++) {
		galleryElements[i].style.order = i+1;
	}
}

const reset = () => {
  let galleryElements = document.querySelectorAll('.presentation__item');
	galleryElements.forEach((el) => {
		el.classList.remove('transition');
		el.classList.remove('left');
	});
}

const next = () => {
  let galleryElements = document.querySelectorAll('.presentation__item');
	galleryElements.forEach((el) => {
    let currentPosition = el.style.order;
    if (currentPosition > galleryElements.length) {
      el.style.order = 1;
    }
    else if (currentPosition == 1) el.style.order = galleryElements.length; 
    else el.style.order = --currentPosition;
	})
}

// const next = () => {
// 	galleryElements.forEach((el) => {
// 		let currentPosition = el.style.order;
// 		currentPosition++;
// 		if (currentPosition > galleryLength)
// 			currentPosition = 0;
// 		el.style.order = currentPosition;
// 	})
// }

const clickNext = () => {
  let galleryElements = document.querySelectorAll('.presentation__item');
	galleryElements.forEach((el) => {
		el.classList.add('transition');
		el.classList.add('left');
  })
  setTimeout(() => {
    next();
    reset();
  }, 500);
}

const showImage = (container, target) => {
  const parent = target.parentNode;
  const elementsForSlider = parent.querySelectorAll('.slide');
  let imageCase = document.createElement('div');
  let imageList = document.createElement('ul');
  imageList.classList.add('presentation__list');
  let nextButton = document.createElement('button');
  nextButton.classList.add('presentation__nextButton');
  nextButton.textContent = 'Następne zdjęcie';

  elementsForSlider.forEach((image) => {
    let listElement = document.createElement('li');
    listElement.classList.add('presentation__item');
    let newImage = document.createElement ('img');
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
}



// event listeners
const galleryImages = document.querySelectorAll('a[href*="#image"]');
const projectContainer = document.querySelector('.presentation');
galleryImages.forEach((image) => {
  image.addEventListener('click', (e) => {
    e.preventDefault();
    projectContainer.classList.remove('presentation--hidden');
    document.querySelector('body').scrollIntoView({
      behavior: 'smooth'
    });
    image.blur();
    projectContainer.innerHTML = '';
    showDatas(projectContainer, image);
    showImage(projectContainer, image.querySelector('img'));
  })
});







