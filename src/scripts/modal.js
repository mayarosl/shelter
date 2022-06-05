const btns = document.querySelectorAll('.slider-card__button');
const crds = document.querySelectorAll('.slider-card');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');

btns.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
	});
});

crds.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		body.classList.toggle('stop-scroll');
		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
	});
});

modalOverlay.addEventListener('click', (e) => {

	if (e.target == modalOverlay) {
		body.classList.remove('stop-scroll');
		modalOverlay.classList.remove('modal-overlay--visible');
		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});
	}
});