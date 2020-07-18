(function ($) {
	const defaults = {
		maxItems: Infinity,
		minItems: 0,
		selectionText: 'item',
		textPlural: 'items',
		controls: {
			position: 'right',
			displayCls: 'iqdropdown-content',
			controlsCls: 'iqdropdown-item-controls',
			counterCls: 'counter',
		},
		isClearBtn: false,
		isApplyBtn: false,
		buttons: false,
		clearBtnContent: 'Clear',
		applyBtnContent: 'Apply',
		inline: false,
		items: {},
		onChange: () => { },
		beforeDecrement: () => true,
		beforeIncrement: () => true,
		setSelectionText(itemCount, totalItems) {
			const usePlural = totalItems !== 1 && this.textPlural.length > 0;
			const text = usePlural ? this.textPlural : this.selectionText;
			return `${totalItems} ${text}`;
		},
	};

	$.fn.iqDropdown = function (options) {
		this.each(function () {
			const $this = $(this);
			const $selection = $this.find('p.iqdropdown-selection').last();
			const $menu = $this.find('div.iqdropdown-menu');
			const $items = $menu.find('div.iqdropdown-menu-option');
			const dataAttrOptions = {
				selectionText: $selection.data('selection-text'),
				textPlural: $selection.data('text-plural'),
				inline: $selection.data('inline'),
				isClearBtn: $selection.data('is-clear-btn'),
				isApplyBtn: $selection.data('is-apply-btn'),
				clearBtnContent: $selection.data('clear-btn-content'),
				applyBtnContent: $selection.data('apply-btn-content'),
			};
			const settings = $.extend(true, {}, defaults, dataAttrOptions, options);
			var $isButtons = false;
			const itemCount = {};
			let totalItems = 0;

			function updateDisplay() {
				$selection.html(settings.setSelectionText(itemCount, totalItems));
			}

			function setItemSettings(id, $item) {
				const minCount = Number($item.data('mincount'));
				const maxCount = Number($item.data('maxcount'));

				settings.items[id] = {
					minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
					maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
				};
			}

			function addControls(id, $item) {
				const $controls = $('<div />').addClass(settings.controls.controlsCls);
				const $decrementButton = $(`<button class="button-decrement">
            <i class="icon-decrement"></i></button>
		`);
				const $incrementButton = $(`<button class="button-increment"><i class="icon-increment"></i></button>
        `);
				const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);

				$item.children('div').addClass(settings.controls.displayCls);
				$controls.append($decrementButton, $counter, $incrementButton);

				if (settings.controls.position === 'right') {
					$item.append($controls);
				} else {
					$item.prepend($controls);
				}

				$decrementButton.click((event) => {
					const { items, minItems, beforeDecrement, onChange } = settings;
					const allowClick = beforeDecrement(id, itemCount);

					if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
						itemCount[id] -= 1;
						totalItems -= 1;
						$counter.html(itemCount[id]);
						updateDisplay();
						onChange(id, itemCount[id], totalItems);
					}

					event.preventDefault();
				});

				$incrementButton.click((event) => {
					const { items, maxItems, beforeIncrement, onChange } = settings;
					const allowClick = beforeIncrement(id, itemCount);

					if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
						itemCount[id] += 1;
						totalItems += 1;
						$counter.html(itemCount[id]);
						updateDisplay();
						onChange(id, itemCount[id], totalItems);
					}

					event.preventDefault();
				});

				$item.click(event => event.stopPropagation());

				return $item;
			}
			function addButtons() {
				const $buttons = $('<div />').addClass('iqdropdown-control-buttons');
				const $clear = $(`<button class="iqdropdown-button-clear"><span class="iqdropdown-clear-content">${settings.clearBtnContent}</span></button>`);
				const $apply = $(`<button class="iqdropdown-button-apply"><span class="iqdropdown-apply-content">${settings.applyBtnContent}</span></button>`);
				if (settings.isApplyBtn) {
					$buttons.append($apply);
				}
				if (settings.isClearBtn) {
					$buttons.append($clear);
				}
				if (settings.isApplyBtn || settings.isClearBtn) {
					$menu.append($buttons);
				}
				$clear.click((event) => {
					$items.each(function () {
						const $item = $(this);
						const id = $item.data('id');
						const counter = $item.find('span.' + settings.controls.counterCls);;
						itemCount[id] = settings.items[id].minCount;
						counter.html(itemCount[id]);
					});
					totalItems = 0;
					updateDisplay();
					/*if (!inline) {
						$this.toggleClass('menu-open');
					}*/
				});
				$apply.click((event) => {
				});
			}
			function inline() {
				let h = $menu.css('height');
				$this.css('marginBottom', h);
				$this.addClass('menu-open');
			}

			if (!$isButtons) {
				addButtons();
				$isButtons = true;
			};

			if (settings.inline) {
				inline();
			}

			$this.click(() => {
				$this.toggleClass('menu-open');
			});

			$items.each(function () {
				const $item = $(this);
				const id = $item.data('id');
				const defaultCount = Number($item.data('defaultcount') || '0');

				itemCount[id] = defaultCount;
				totalItems += defaultCount;
				setItemSettings(id, $item);
				addControls(id, $item);
			});

			updateDisplay();
		});

		return this;
	};
}(jQuery));

$(document).ready(() => {
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