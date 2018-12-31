const aboutIframe = document.querySelector('.about__video');
const container = document.querySelector('.videoCase');

aboutIframe.setAttribute('width', container.offsetWidth);
aboutIframe.setAttribute('height', container.offsetHeight);
aboutIframe.setAttribute('top', '0px');

const playerLayout = document.querySelector('.vp-player-layout');;
console.log(playerLayout);
