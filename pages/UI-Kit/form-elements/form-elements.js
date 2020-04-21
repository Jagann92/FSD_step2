$(".js-range-slider").ionRangeSlider({
	type: "double",
	min: 1000,
	max: 15000,
	from: 5000,
	to: 10000,
	step: 1000,
	grid: false,
	hide_from_to: true,
	hide_min_max: true,
	skin: "round"
});
$(document).ready(() => {
	$('.iqdropdown').iqDropdown({});
});