var expandableLists = document.querySelectorAll('.expandable-list');
expandableLists.forEach(function toogle(element, index) {
	element.onclick = function () {
		element.classList.toggle("open");
	}
	element.addEventListener(blur, function () {
		console.log('blur');
		element.classList.remove("open");
	})
})
var footerLists = document.querySelectorAll('.expandable-list.footer__title');

window.onload = function lock() {
	console.log('load');
	let size = document.documentElement.clientWidth;
	console.log(size);
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
};
window.onresize = function lock() {
	console.log('resize');
	let size = document.documentElement.clientWidth;
	console.log(size);
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
};
