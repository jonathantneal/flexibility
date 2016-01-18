var CSS_FLEX_CONTAINER_PROPERTIES = {
	alignContent: {
		initial: 'stretch',
		valid:   /^(flex-start|flex-end|center|space-between|space-around|stretch)/
	},
	alignItems: {
		initial: 'stretch',
		valid:   /^(flex-start|flex-end|center|baseline|stretch)$/
	},
	boxSizing: {
		initial: 'content-box',
		valid: /^(border-box|content-box)$/
	},
	flexDirection: {
		initial: 'row',
		valid:   /^(row|row-reverse|column|column-reverse)$/
	},
	flexWrap: {
		initial: 'nowrap',
		valid:   /^(nowrap|wrap|wrap-reverse)$/
	},
	justifyContent: {
		initial: 'flex-start',
		valid:   /^(flex-start|flex-end|center|space-between|space-around)$/
	}
};

flexibility.updateFlexContainerCache = function updateFlexContainerCache(details) {
	// get style details
	var style  = details.style;
	var getCSS = details.node.currentStyle;
	var ie9CSS = details.node.style;
	var ffbCSS = {};

	// flex-flow
	(getCSS['flex-flow'] || ie9CSS['flex-flow'] || '').replace(/^(row|row-reverse|column|column-reverse)\s+(nowrap|wrap|wrap-reverse)$/i, function ($0, flexDirection, flexWrap) {
		ffbCSS.flexDirection = flexDirection;
		ffbCSS.flexWrap = flexWrap;
	});

	// store each flex container property value
	for (var key in CSS_FLEX_CONTAINER_PROPERTIES) {
		var kabobKey = key.replace(/[A-Z]/g, '-$&').toLowerCase();
		var keyValue = CSS_FLEX_CONTAINER_PROPERTIES[key];
		var cssValue = getCSS[kabobKey] || ie9CSS[kabobKey];

		style[key] = keyValue.valid.test(cssValue) ? cssValue : ffbCSS[key] || keyValue.initial;
	}
};
