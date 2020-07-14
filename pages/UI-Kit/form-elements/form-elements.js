function changeRangeValue(data) {
	let rangeFrom = data.from_pretty;
	let rangeTo = data.to_pretty;
	let rangeValue = $(".range__value");
	rangeValue.text(rangeFrom + '₽ - ' + rangeTo + '₽');
}

$(".js-range-slider").ionRangeSlider({
	type: "double",
	min: 400,
	max: 15500,
	from: 5000,
	to: 10000,
	step: 100,
	postfix: "₽",
	grid: false,
	hide_from_to: true,
	hide_min_max: true,
	skin: "round",
	onStart: function (data) {
		let rangeFrom = data.from_pretty;
		let rangeTo = data.to_pretty;
		let rangeValue = $(".range__value");
		rangeValue.text(rangeFrom + '₽ - ' + rangeTo + '₽');
	},
	onChange: function (data) {
		let rangeFrom = data.from_pretty;
		let rangeTo = data.to_pretty;
		let rangeValue = $(".range__value");
		rangeValue.text(rangeFrom + '₽ - ' + rangeTo + '₽');
	},
});

$(document).ready(() => {
	$(".textfield_masked").inputmask();
	$('.iqdropdown.beds').iqDropdown({
		setSelectionText: function (itemCount, totalItems) {
			const items = Object.keys(itemCount)
				.map(key => itemCount[key])
			let bedrooms = "";
			switch (items[0]) {
				case 0:
					bedrooms = '';
					break;
				case 1:
					bedrooms = '1 спальня, ';
					break;
				case 2:
				case 3:
				case 4:
					bedrooms = items[0] + ' спальни, ';
					break;
				default:
					bedrooms = items[0] + ' спален, ';
					break;
			}
			let beds = "";
			switch (items[1]) {
				case 0:
					beds = '';
					break;
				case 1:
					beds = '1 кровать, ';
					break;
				case 2:
				case 3:
				case 4:
					beds = items[1] + ' кровати, ';
					break;
				default:
					beds = items[1] + ' кроватей, ';
					break;
			}
			let baths = "";
			switch (items[2]) {
				case 0:
					baths = '';
					break;
				case 1:
					baths = '1 ванная комната';
					break;
				case 2:
				case 3:
				case 4:
					baths = items[2] + ' ванных комнаты';
					break;
				default:
					baths = items[2] + ' ванных комнат';
					break;
			}
			if (totalItems == 0) {
				return "Выберите удобства";
			} else {
				return bedrooms + beds + baths;
			}
		}
	});
	$('.iqdropdown.people').iqDropdown({
		setSelectionText: function (itemCount, totalItems) {
			let text = '';
			switch (totalItems) {
				case 0:
					text = 'Сколько гостей';
					break;
				case 1:
					text = '1 гость';
					break;
				case 2:
				case 3:
				case 4:
					text = totalItems + ' гостя';
					break;
				default:
					text = totalItems + ' гостей';
					break;
			}
			return text;
		}
	});
});

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