window.onload = function () {
	let $calendar = $('.date').eq(0).find('.date__input').datepicker({}).data('datepicker');
	$calendar.show();
};