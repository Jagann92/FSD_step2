var burgers = document.querySelectorAll(".header__burger");
burgers.forEach(function toogle(element, index) {
	element.onclick = function () {
		element.classList.toggle("active");
	}
})
