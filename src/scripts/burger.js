const burger = document?.querySelector('[data-burger]');
const nav = document?.querySelector('[data-nav]');
// const container = document?.querySelector('[data-nav]');
const navItems = nav?.querySelectorAll('a');
const body = document.body;
const header = document?.querySelector('.header');
const petsLogoHeading = document?.querySelector('.pets-logo-heading');
const petsLogoSubheading = document?.querySelector('.pets-logo-subheading');

const headerHeight = header.offsetHeight;

burger?.addEventListener('click', () => {
  body.classList.toggle('stop-scroll');
  burger?.classList.toggle('header__burger--active');
  petsLogoHeading?.classList.toggle('pets-logo-heading--active');
  petsLogoSubheading?.classList.toggle('pets-logo-subheading--active');
  nav?.classList.toggle('mobile-nav--visible');
});

navItems.forEach(el => {
  el.addEventListener('click', () => {
    body.classList.remove('stop-scroll');
  burger?.classList.remove('header__burger--active');
  petsLogoHeading?.classList.remove('pets-logo-heading--active');
  petsLogoSubheading?.classList.remove('pets-logo-subheading--active');
  nav?.classList.remove('mobile-nav--visible');
  });
});