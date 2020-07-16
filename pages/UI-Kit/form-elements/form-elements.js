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

var $datepickers = $('.date');
$.each($datepickers, function ($index, element) {
	let $element = $datepickers.eq($index);
	let $calendar = $element.find('.date__input').datepicker({
		onHide: function (inst, animationCompleted) {
			if (!animationCompleted) {
				$('body').toggleClass('lock');
			}
			if (animationCompleted) {
				$element.removeClass('date_open');
				$('body').removeClass('lock');
			}
		},
		onShow: function (inst, animationCompleted) {
			if (!animationCompleted) {
				$('body').toggleClass('lock');
			}
			if (animationCompleted) {
				$element.addClass('date_open');
			}
		},
	}).data('datepicker');

	let $arrow = $element.find('.date__arrow');
	$arrow.on('click', function () {
		if ($element.hasClass('date_open')) {
			$element.removeClass('date_open');
			$calendar.hide();
		} else if (!$element.hasClass('date_open')) {
			$element.addClass('date_open');
			$calendar.show();
		}
	});
});