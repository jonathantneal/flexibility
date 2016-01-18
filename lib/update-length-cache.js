var CSS_RESET_TEXT = 'border:0 solid;clip:rect(0 0 0 0);display:inline-block;font:0/0 serif;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;overflow:hidden;padding:0;position:absolute;width:1em;';

var CSS_BORDER_WIDTHS = {
	medium: 4,
	none:   0,
	thick:  6,
	thin:   2
};

var CSS_LENGTHS = {
	borderBottomWidth: 0,
	borderLeftWidth: 0,
	borderRightWidth: 0,
	borderTopWidth: 0,
	height: 0,
	paddingBottom: 0,
	paddingLeft: 0,
	paddingRight: 0,
	paddingTop: 0,
	marginBottom: 0,
	marginLeft: 0,
	marginRight: 0,
	marginTop: 0,
	maxHeight: 0,
	maxWidth: 0,
	minHeight: 0,
	minWidth: 0,
	width: 0
};

var CSS_LENGTH_REGEX = /^([-+]?0|[-+]?[0-9]*\.?[0-9]+)/;

var CSS_FULL_LENGTH = 100;

flexibility.updateLengthCache = function updateLengthCache(details) {
	// get style details
	var node = details.node;
	var style = details.style;

	// get node parent
	var parentNode  = node.parentNode;
	var parentWidth;
	var parentHeight;
	var parentLength;

	// create clone element
	var clonex = document.createElement('_');

	var setCSS = clonex.runtimeStyle;

	var getCSS = node.currentStyle;

	setCSS.cssText = CSS_RESET_TEXT + 'font-size:' + getCSS.fontSize;

	// insert clone after node
	parentNode.insertBefore(clonex, node.nextSibling);

	style.fontSize = clonex.offsetWidth;

	setCSS.fontSize = style.fontSize + 'px';

	for (var key in CSS_LENGTHS) {
		var cssValue = getCSS[key];

		// if the value is a length or if it is "auto" not on width or height
		if (CSS_LENGTH_REGEX.test(cssValue) || cssValue === 'auto' && !/(width|height)/i.test(key)) {
			// if the value is a percentage length
			if (/%$/.test(cssValue)) {
				// cache the appropriate parent metric
				if (/^(bottom|height|top)$/.test(key)) {
					if (!parentHeight) {
						parentHeight = parentNode.offsetHeight;
					}

					parentLength = parentHeight;
				} else {
					if (!parentWidth) {
						parentWidth = parentNode.offsetWidth;
					}

					parentLength = parentWidth;
				}

				style[key] = parseFloat(cssValue) * parentLength / CSS_FULL_LENGTH;
			} else {
				setCSS.width = cssValue;

				style[key] = clonex.offsetWidth;
			}
		} else if (/^border/.test(key) && cssValue in CSS_BORDER_WIDTHS) {
			style[key] = CSS_BORDER_WIDTHS[cssValue];
		} else {
			delete style[key];
		}
	}

	// remove clone
	parentNode.removeChild(clonex);

	// redefine borders without style
	if (getCSS.borderTopStyle    === 'none') {
		style.borderTopWidth    = 0;
	}

	if (getCSS.borderRightStyle  === 'none') {
		style.borderRightWidth  = 0;
	}

	if (getCSS.borderBottomStyle === 'none') {
		style.borderBottomWidth = 0;
	}

	if (getCSS.borderLeftStyle   === 'none') {
		style.borderLeftWidth   = 0;
	}

	// save original width and height lengths
	style.originalWidth = style.width;
	style.originalHeight = style.height;

	// provide width and height fallbacks
	if (!style.width && !style.minWidth) {
		if (/flex/.test(style.display)) {
			style.width = node.offsetWidth;
		} else {
			style.minWidth = node.offsetWidth;
		}
	}

	// provide width and height fallbacks
	if (!style.height && !style.minHeight) {
		if (!/flex/.test(style.display)) {
			style.minHeight = node.offsetHeight;
		}
	}
};
