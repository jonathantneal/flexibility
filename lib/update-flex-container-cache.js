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

	// store each flex container property value
	for (var key in CSS_FLEX_CONTAINER_PROPERTIES) {
		var kabobKey = key.replace(/[A-Z]/g, '-$&').toLowerCase();
		var keyValue = CSS_FLEX_CONTAINER_PROPERTIES[key];
		var cssValue = getCSS[kabobKey];

		style[key] = keyValue.valid.test(cssValue) ? cssValue : keyValue.initial;
	}
};
