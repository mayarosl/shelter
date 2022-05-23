const burger = document?.querySelector('[data-burger]');
const nav = document?.querySelector('[data-nav]');
const container = document?.querySelector('[data-nav]');
const navItems = nav?.querySelectorAll('a');
const body = document.body;
const header = document?.querySelector('.header');
const headerHeight = header.offsetHeight;

burger?.addEventListener('click', () => {
  body.classList.toggle('stop-scroll');
  burger?.classList.toggle('header__burger--active');
  nav?.classList.toggle('mobile-nav--visible');
});

navItems.forEach(el => {
  el.addEventListener('click', () => {
    body.classList.remove('stop-scroll');
  burger?.classList.remove('header__burger--active');
  nav?.classList.remove('mobile-nav--visible');
  });
});