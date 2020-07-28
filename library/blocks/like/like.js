$('.like').click(function () {
	$(this).toggleClass('like_liked');
	let $count = $(this).find('.like__count');
	if ($(this).hasClass('like_liked')) {
		$count.text(function (index, text) {
			text++;
			return text;
		});;
	} else {
		$count.text(function (index, text) {
			text--;
			return text;
		});
	}
});