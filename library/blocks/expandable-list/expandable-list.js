const expandableLists = document.querySelectorAll('.expandable-list');
const footerLists = document.querySelectorAll('.expandable-list.footer__title');
expandableLists.forEach(function (element, index) {
	element.addEventListener("click", function () {
		element.classList.toggle("open");
		expandableLists.forEach(function (el, i) {
			if ((i != index) && (el.classList.contains('float'))) {
				el.classList.remove('open');
			}
		})
	});
});
document.addEventListener('click', function (e) {
	expandableLists.forEach(function (el, i) {
		if ((el != e.target) && !(el.contains(e.target)) && (el.classList.contains('float'))) {
			el.classList.remove('open');
		}
	});
});
function relock() {
	let size = document.documentElement.clientWidth;
	if (size <= 550) {
		footerLists.forEach(function (el) {
			el.classList.remove('lock');
			el.classList.remove('open');
		})
	}
	else {
		footerLists.forEach(function (el) {
			el.classList.add('lock');
			el.classList.add('open');
		})
	}
}
window.onresize = function () {
	relock();
}
window.onload = function () {
	relock();
}

