let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;

const container = document.querySelector('.pets__slider-container');
const track = document.querySelector('.pets__slider-track');
const btnPrev = document.querySelector('.button-prev');
const btnNext = document.querySelector('.button-next');
const items = document.querySelectorAll('.pets__slider-item');

const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
});


btnNext.addEventListener('click', () => {
  const itemsLeft = itemsCount - ((Math.abs(position) + slidesToShow * itemWidth) / itemWidth);

  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPosition();
  checkBtns();
});
  

btnPrev.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / itemWidth;
  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPosition();
  checkBtns();
});

const setPosition = () => {
  track.style.transform = `translateX(${position}px)`
};

const checkBtns = () => {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};

checkBtns();




