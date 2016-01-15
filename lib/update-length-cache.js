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

var CSS_FULL_WIDTH = 100;

flexibility.updateLengthCache = function updateLengthCache(details) {
	// get style details
	var node = details.node;
	var style = details.style;

	// get node parent
	var parentNode  = node.parentNode;

	// create clone element
	var clonex = document.createElement('_');

	var setCSS = clonex.runtimeStyle;

	var getCSS = node.currentStyle;

	var parentWidth;

	setCSS.cssText = CSS_RESET_TEXT + 'font-size:' + getCSS.fontSize;

	// insert clone after node
	parentNode.insertBefore(clonex, node.nextSibling);

	style.fontSize = clonex.offsetWidth;

	setCSS.fontSize = style.fontSize + 'px';

	for (var key in CSS_LENGTHS) {
		var cssValue = getCSS[key];

		if (/^\d/.test(cssValue) || cssValue === 'auto' && !/(width|height)/i.test(key)) {
			if (/^([-+]?0|[-+]?[0-9]*\.?[0-9]+)%$/.test(cssValue)) {
				parentWidth = parentWidth || parentNode.offsetWidth / CSS_FULL_WIDTH;

				style[key] = parseFloat(cssValue) * parentWidth;
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
	style.width  = /^\d/.test(style.width)  ? style.width  : node.offsetWidth;
	style.height = /^\d/.test(style.height) ? style.height : node.offsetHeight;

	// conditionally remove flex height
	if (style.originalHeight === undefined && (style.height === 0 || /^(inline-)?flex$/.test(style.display))) {
		delete style.height;
	}

	// console.log(JSON.stringify(style));
};
