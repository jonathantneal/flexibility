var CSS_FLEX_ITEM_PROPERTIES = {
	alignSelf: {
		initial: 'auto',
		valid:   /^(auto|flex-start|flex-end|center|baseline|stretch)$/
	},
	boxSizing: {
		initial: 'content-box',
		valid: /^(border-box|content-box)$/
	},
	flexBasis: {
		initial: 'auto',
		valid:   /^((?:[-+]?0|[-+]?[0-9]*\.?[0-9]+(?:%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))|auto|fill|max-content|min-content|fit-content|content)$/
	},
	flexGrow: {
		initial: 0,
		valid:   /^\+?(0|[1-9][0-9]*)$/
	},
	flexShrink: {
		initial: 0,
		valid:   /^\+?(0|[1-9][0-9]*)$/
	},
	order: {
		initial: 0,
		valid:   /^([-+]?[0-9]+)$/
	}
};

flexibility.updateFlexItemCache = function updateFlexItemCache(details) {
	// get style details
	var style  = details.style;
	var getCSS = details.node.currentStyle;
	var ie9CSS = details.node.style;
	var ffbCSS = {};

	// flex
	(getCSS.flex || ie9CSS.flex || '').replace(/^\+?(0|[1-9][0-9]*)/, function ($0) {
		ffbCSS.flexGrow = $0;
	});

	// store each flex item property value
	for (var key in CSS_FLEX_ITEM_PROPERTIES) {
		var kabobKey = key.replace(/[A-Z]/g, '-$&').toLowerCase();
		var keyValue = CSS_FLEX_ITEM_PROPERTIES[key];
		var cssValue = getCSS[kabobKey] || ie9CSS[kabobKey];

		style[key] = keyValue.valid.test(cssValue) ? cssValue : ffbCSS[key] || keyValue.initial;

		if (typeof keyValue.initial === 'number') {
			style[key] = parseFloat(style[key]);
		}
	}
};
