const GalleryClassName = 'gallery';
const GalleryDraggableClassName = `${GalleryClassName}-draggable`;
const GalleryLineClassName = `${GalleryClassName}-line`;
const GalleryLineContainerClassName = `${GalleryClassName}-line-container`;
const GallerySlideClassName = `${GalleryClassName}-slide`;

// Navigation
const GalleryNavClassName = `${GalleryClassName}-nav`;
const GalleryNavLeftClassName = `${GalleryClassName}-nav-left`;
const GalleryNavRightClassName = `${GalleryClassName}-nav-right`;
const GalleryNavDisabledClassName = `${GalleryClassName}-nav-disabled`;

class Gallery {
  constructor(element, options = {}) {
    this.navLeft = document.querySelector('.button-prev');
    this.navRight = document.querySelector('.button-next');
    // Root node
    this.containerNode = element;
    this.size = element.childElementCount;
    this.currentSlide = 0;
    this.currentSlideWasChanged = false;
    this.settings = {
      margin: options.margin || 0
    };

    this.manageHTML = this.manageHTML.bind(this);
    this.setParameters = this.setParameters.bind(this);
    this.setEvents = this.setEvents.bind(this);
    this.resizeGallery = this.resizeGallery.bind(this);
    // Drag
    this.startDrag = this.startDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.dragging = this.dragging.bind(this);
    // Styles
    this.setStylePosition = this.setStylePosition.bind(this);
    this.setStyleTransition = this.setStyleTransition.bind(this);
    this.resetStyleTransition = this.resetStyleTransition.bind(this);

    // Nav
    this.moveToLeft = this.moveToLeft.bind(this);
    this.moveToRight = this.moveToRight.bind(this);

    this.changeCurrentSlide = this.changeCurrentSlide.bind(this);
    this.changeDisabledNav = this.changeDisabledNav.bind(this);

    this.manageHTML();
    this.setParameters();
    this.setEvents();
  }

  manageHTML() {
    this.containerNode.classList.add(GalleryClassName);
    this.containerNode.innerHTML = `
    <div class="${GalleryLineContainerClassName}">
        <div class="${GalleryLineClassName}">
            ${this.containerNode.innerHTML}
        </div>
    </div>`;

    this.lineContainerNode = this.containerNode.querySelector(`.${GalleryLineContainerClassName}`);
    this.lineNode = this.containerNode.querySelector(`.${GalleryLineClassName}`);
    
    this.slideNodes = Array.from(this.lineNode.children).map((childNode) =>
      wrapElementByDiv({
        element: childNode,
        className: GallerySlideClassName,
      })
    );
  }

  setParameters() {
    const coordsLineContainer = this.lineContainerNode.getBoundingClientRect();
    this.width = coordsLineContainer.width;
    // this.width = 270;
    this.maximumX = -(this.size - 1) * (this.width + this.settings.margin);
    this.x = -this.currentSlide * (this.width + this.settings.margin);

    this.resetStyleTransition();
    this.lineNode.style.width = `${this.size * (this.width + this.settings.margin)}px`;
    this.setStylePosition();
    this.changeDisabledNav();

    Array.from(this.slideNodes).forEach((slideNode) => {
      slideNode.style.width = `${this.width}px`;
      slideNode.style.marginRight = `${this.settings.margin}px`;
    });
  }

  setEvents() {
    this.debouncedResizeGallery = debounce(this.resizeGallery);
    window.addEventListener('resize', this.debouncedResizeGallery);
    this.lineNode.addEventListener('pointerdown', this.startDrag);
    window.addEventListener('pointerup', this.stopDrag);
    window.addEventListener('pointercancel', this.stopDrag);

    this.navLeft.addEventListener('click', this.moveToLeft);
    this.navRight.addEventListener('click', this.moveToRight);
  }

  destroyEvents() {
    window.removeEventListener('resize', this.debouncedResizeGallery);
    this.lineNode.removeEventListener('pointerdown', this.startDrag);
    window.removeEventListener('pointerup', this.stopDrag);
    window.removeEventListener('pointercancel', this.stopDrag);

    this.navLeft.removeEventListener('click', this.moveToLeft);
    this.navRight.removeEventListener('click', this.moveToRight);
  }

  resizeGallery() {
    this.setParameters();
  }

  startDrag(evt) {
    this.currentSlideWasChanged = false;
    this.clickX = evt.pageX;
    this.startX = this.x;

    this.resetStyleTransition();

    this.containerNode.classList.add(GalleryDraggableClassName);
    window.addEventListener('pointermove', this.dragging);
  }

  stopDrag() {
    window.removeEventListener('pointermove', this.dragging);

    this.containerNode.classList.remove(GalleryDraggableClassName);
    this.changeCurrentSlide();
  }

  dragging(evt) {
    this.dragX = evt.pageX;
    const dragShift = this.dragX - this.clickX;
    const easing = dragShift / 5;
    this.x = Math.max(Math.min(this.startX + dragShift, easing), this.maximumX + easing);
    this.setStylePosition();

    if (
      dragShift > 20 &&
      dragShift > 0 &&
      !this.currentSlideWasChanged &&
      this.currentSlide > 0
    ) {
      this.currentSlideWasChanged = true;
      this.currentSlide = this.currentSlide - 1;
    }

    if (
      dragShift < -20 &&
      dragShift < 0 &&
      !this.currentSlideWasChanged &&
      this.currentSlide < this.size - 1
    ) {
      this.currentSlideWasChanged = true;
      this.currentSlide = this.currentSlide + 1;
    }
  }

  moveToLeft() {
    if (this.currentSlide <= 0) {
      return;
    }

    this.currentSlide = this.currentSlide - 1;
    this.changeCurrentSlide();
  }

  moveToRight() {
    if (this.currentSlide >= this.size - 1) {
      return;
    }

    this.currentSlide = this.currentSlide + 1;
    this.changeCurrentSlide();
  }

  changeCurrentSlide(countSwipes) {
    this.x = -this.currentSlide * (this.width + this.settings.margin);
    this.setStylePosition();
    this.setStyleTransition(countSwipes);
    this.changeDisabledNav();
  }

  changeDisabledNav() {
    if (this.currentSlide <= 0) {
      this.navLeft.classList.add(GalleryNavDisabledClassName);
    } else {
      this.navLeft.classList.remove(GalleryNavDisabledClassName);
    }

    if (this.currentSlide >= this.size - 1) {
      this.navRight.classList.add(GalleryNavDisabledClassName);
    } else {
      this.navRight.classList.remove(GalleryNavDisabledClassName);
    }
  }

  setStylePosition() {
    this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`;
  }

  setStyleTransition(countSwipes = 1) {
    this.lineNode.style.transition = `all ${0.25 * countSwipes} ease 0s`;
  }

  resetStyleTransition() {
    this.lineNode.style.transition = `all 0s ease 0s`;
  }
}

// Helpers
function wrapElementByDiv({ element, className }) {
  const wrapperNode = document.createElement('div');
  wrapperNode.classList.add(className);

  element.parentNode.insertBefore(wrapperNode, element);
  wrapperNode.appendChild(element);

  return wrapperNode;
}

function debounce(func, time = 100) {
  let timer;
  return function (event) {
    clearTimeout(timer);
    timer = setTimeout(func, time, event);
  };
}