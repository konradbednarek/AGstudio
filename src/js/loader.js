// website loader
const loader = document.querySelector('.loader');
// loader.classList.remove('loader__hide--hidden');

window.onload = () => {
  loader.classList.add('loader__hide')
  setTimeout(() => {
    loader.classList.add('loader__hide--hidden');
  }, 800);
}


const menuLinks = document.querySelectorAll('.animateLink');
menuLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    loader.classList = 'loader loader__showed';
    setTimeout(()  => {
      window.location = link.getAttribute('href');
    }, 800);
    
  })
});