const nav = document.getElementById('main');

let topOfNav = nav.offsetTop;
function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}
window.addEventListener('scroll', fixNav);

const logo = document.querySelector('.logo');
if (document.documentElement.clientWidth <= 740) {
  logo.addEventListener('click', showMenu);
}
function showMenu(e){
  if (window.matchMedia('only screen and (max-width: 740px)').matches){
    document.body.classList.toggle('show');
  }
  e.preventDefault();
} 



























