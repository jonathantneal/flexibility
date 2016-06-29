module.exports = read;

var declMatch         = /([^\s:;]+)\s*:\s*([^;]+?)\s*(;|$)/g;
var ignoredPropsMatch = /^(alignSelf|height|width)$/;
var pxValueMatch      = /^(0|\d*\.?\d+px)$/;

var getComputedLength = require('./getComputedLength');

// Return flexbox related details of an element
function read(element) {
	// normalized style
	var style = {
		alignContent: 'stretch',
		alignItems: 'stretch',
		alignSelf: 'auto',
		borderBottomStyle: 'none',
		borderBottomWidth: 0,
		borderLeftStyle: 'none',
		borderLeftWidth: 0,
		borderRightStyle: 'none',
		borderRightWidth: 0,
		borderTopStyle: 'none',
		borderTopWidth: 0,
		boxSizing: 'content-box',
		display: 'inline',
		flexBasis: 'auto',
		flexDirection: 'row',
		flexGrow: 0,
		flexShrink: 1,
		flexWrap: 'nowrap',
		justifyContent: 'flex-start',
		height: 'auto',
		marginTop: 0,
		marginRight: 0,
		marginLeft: 0,
		marginBottom: 0,
		paddingTop: 0,
		paddingRight: 0,
		paddingLeft: 0,
		paddingBottom: 0,
		maxHeight: 'none',
		maxWidth: 'none',
		minHeight: 0,
		minWidth: 0,
		order: 0,
		position: 'static',
		width: 'auto'
	};

	// whether element is an element
	var isElement = element instanceof Element;

	if (isElement) {
		// whether element has data-style attribute
		var hasDataStyleAttr = element.hasAttribute('data-style');

		// inline style from data-style or style
		var inlineStyle = hasDataStyleAttr ? element.getAttribute('data-style') : element.getAttribute('style') || '';

		if (!hasDataStyleAttr) {
			// copy style to data-style
			element.setAttribute('data-style', inlineStyle);
		}

		// append computed style to style
		var computedStyle = window.getComputedStyle && getComputedStyle(element) || {};

		appendComputedStyle(style, computedStyle);

		// append current style to style
		var currentStyle = element.currentStyle || {};

		appendCurrentStyle(style, currentStyle);

		// append inline style to style
		appendInlineStyle(style, inlineStyle);

		// for each camel-case property
		for (var prop in style) {
			style[prop] = getComputedLength(style, prop, element);
		}

		// offset measurements
		var boundingClientRect = element.getBoundingClientRect();

		style.offsetHeight = boundingClientRect.height || element.offsetHeight;
		style.offsetWidth  = boundingClientRect.width  || element.offsetWidth;
	}

	var details = {
		element: element,
		style: style
	};

	return details;
}

function appendCurrentStyle(style, currentStyle) {
	// for each camel-case property
	for (var prop in style) {
		// whether property is in current style
		var hasProp = prop in currentStyle;

		if (hasProp) {
			style[prop] = currentStyle[prop];
		} else {
			// kebab property
			var kebabName = prop.replace(/[A-Z]/g, '-$&').toLowerCase();

			// whether kebab property is in current style
			var hasKebabName = kebabName in currentStyle;

			if (hasKebabName) {
				style[prop] = currentStyle[kebabName];
			}
		}
	}

	// whether -js-display property exists
	var hasJsDisplay = '-js-display' in currentStyle;

	if (hasJsDisplay) {
		style.display = currentStyle['-js-display'];
	}
}

function appendInlineStyle(style, inlineStyle) {
	var decl;

	// for each declaration
	while (decl = declMatch.exec(inlineStyle)) {
		// camel-case property
		var prop = decl[1].toLowerCase().replace(/-[a-z]/g, function (match) {
			return match.slice(1).toUpperCase();
		});

		style[prop] = decl[2];
	}
}

function appendComputedStyle(style, computedStyle) {
	// for each camel-case property
	for (var prop in style) {
		// whether kebab property is in current style
		var hasProp = prop in computedStyle;

		if (hasProp && !ignoredPropsMatch.test(prop)) {
			style[prop] = computedStyle[prop];
		}
	}
}
