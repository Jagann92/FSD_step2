var datepickers = document.querySelectorAll('.date');
datepickers.forEach(function clickListener(element, index) {
	let calendar = $('#date-' + (index + 1)).datepicker({
		onHide: function (inst, animationCompleted) {
			if (animationCompleted) {
				element.classList.remove('date_open');
			}
		},
		onShow: function (inst, animationCompleted) {
			if (animationCompleted) {
				element.classList.add('date_open');
			}
		},
	}).data('datepicker');

	let arrow = element.querySelector('.date__arrow');
	arrow.onclick = function showHide() {
		if (element.classList.contains('date_open')) {
			element.classList.remove('date_open');
			calendar.hide();
		} else if (!element.classList.contains('date_open')) {
			element.classList.add('date_open');
			calendar.show();
		}
	}
});