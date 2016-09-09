(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.flexibility = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function alignContent(details) {
	var start;
	var factor;

	var index = -1;
	var line;

	if (details.lines.length > 1 && details.style.alignContent === 'flex-start') {
		start = 0;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross;
		}
	} else if (details.lines.length > 1 && details.style.alignContent === 'flex-end') {
		start = details.flexStyle.crossSpace;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross;
		}
	} else if (details.lines.length > 1 && details.style.alignContent === 'center') {
		start = details.flexStyle.crossSpace / 2;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross;
		}
	} else if (details.lines.length > 1 && details.style.alignContent === 'space-between') {
		factor = details.flexStyle.crossSpace / (details.lines.length - 1);
		start = 0;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross + factor;
		}
	} else if (details.lines.length > 1 && details.style.alignContent === 'space-around') {
		factor = details.flexStyle.crossSpace * 2 / (details.lines.length * 2);
		start = factor / 2;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross + factor;
		}
	} else {
		factor = details.flexStyle.crossSpace / details.lines.length;
		start = details.flexStyle.crossInnerBefore;

		while (line = details.lines[++index]) {
			line.crossStart = start;
			line.cross += factor;

			start += line.cross;
		}
	}
};

},{}],2:[function(require,module,exports){
module.exports = function alignItems(details) {
	var indexA = -1;
	var indexB;

	while (line = details.lines[++indexA]) {
		indexB = -1;

		while (child = line.children[++indexB]) {
			var alignSelf = child.style.alignSelf;

			if (alignSelf === 'auto') {
				alignSelf = details.style.alignItems;
			}

			if (alignSelf === 'flex-start') {
				child.flexStyle.crossStart = line.crossStart;
			} else if (alignSelf === 'flex-end') {
				child.flexStyle.crossStart = line.crossStart + line.cross - child.flexStyle.crossOuter;
			} else if (alignSelf === 'center') {
				child.flexStyle.crossStart = line.crossStart + (line.cross - child.flexStyle.crossOuter) / 2;
			} else {
				child.flexStyle.crossStart = line.crossStart;
				child.flexStyle.crossOuter = line.cross;

				child.flexStyle.cross = child.flexStyle.crossOuter - child.flexStyle.crossBefore - child.flexStyle.crossAfter;
			}
		}
	}
};

},{}],3:[function(require,module,exports){
module.exports = function flexDirection(target, flexDirection) {
	var isInline = flexDirection === 'row' || flexDirection === 'row-reverse';
	var existingAxis = target.mainAxis;

	if (existingAxis) {
		var isMatchingInline = isInline && existingAxis === 'inline' || !isInline && existingAxis === 'block';

		if (!isMatchingInline) {
			target.flexStyle = {
				main:  target.flexStyle.cross,
				cross: target.flexStyle.main,

				mainOffset:  target.flexStyle.crossOffset,
				crossOffset: target.flexStyle.mainOffset,

				mainBefore:  target.flexStyle.crossBefore,
				mainAfter:   target.flexStyle.crossAfter,
				crossBefore: target.flexStyle.mainBefore,
				crossAfter:  target.flexStyle.mainAfter,

				mainInnerBefore:  target.flexStyle.crossInnerBefore,
				mainInnerAfter:   target.flexStyle.crossInnerAfter,
				crossInnerBefore: target.flexStyle.mainInnerBefore,
				crossInnerAfter:  target.flexStyle.mainInnerAfter,

				mainBorderBefore:  target.flexStyle.crossBorderBefore,
				mainBorderAfter:   target.flexStyle.crossBorderAfter,
				crossBorderBefore: target.flexStyle.mainBorderBefore,
				crossBorderAfter:  target.flexStyle.mainBorderAfter
			};
		}
	} else {
		if (isInline) {
			target.flexStyle = {
				main:  target.style.width,
				cross: target.style.height,

				mainOffset:  target.style.offsetWidth,
				crossOffset: target.style.offsetHeight,

				mainBefore:  target.style.marginLeft,
				mainAfter:   target.style.marginRight,
				crossBefore: target.style.marginTop,
				crossAfter:  target.style.marginBottom,

				mainInnerBefore:  target.style.paddingLeft,
				mainInnerAfter:   target.style.paddingRight,
				crossInnerBefore: target.style.paddingTop,
				crossInnerAfter:  target.style.paddingBottom,

				mainBorderBefore:  target.style.borderLeftWidth,
				mainBorderAfter:   target.style.borderRightWidth,
				crossBorderBefore: target.style.borderTopWidth,
				crossBorderAfter:  target.style.borderBottomWidth
			};
		} else {
			target.flexStyle = {
				main:  target.style.height,
				cross: target.style.width,

				mainOffset:  target.style.offsetHeight,
				crossOffset: target.style.offsetWidth,

				mainBefore:  target.style.marginTop,
				mainAfter:   target.style.marginBottom,
				crossBefore: target.style.marginLeft,
				crossAfter:  target.style.marginRight,

				mainInnerBefore:  target.style.paddingTop,
				mainInnerAfter:   target.style.paddingBottom,
				crossInnerBefore: target.style.paddingLeft,
				crossInnerAfter:  target.style.paddingRight,

				mainBorderBefore:  target.style.borderTopWidth,
				mainBorderAfter:   target.style.borderBottomWidth,
				crossBorderBefore: target.style.borderLeftWidth,
				crossBorderAfter:  target.style.borderRightWidth
			};
		}

		if (target.style.boxSizing === 'content-box') {
			if (typeof target.flexStyle.main === 'number') {
				target.flexStyle.main += target.flexStyle.mainInnerBefore + target.flexStyle.mainInnerAfter + target.flexStyle.mainBorderBefore + target.flexStyle.mainBorderAfter;
			}

			if (typeof target.flexStyle.cross === 'number') {
				target.flexStyle.cross += target.flexStyle.crossInnerBefore + target.flexStyle.crossInnerAfter + target.flexStyle.crossBorderBefore + target.flexStyle.crossBorderAfter;
			}
		}
	}

	target.mainAxis  = isInline ? 'inline' : 'block';
	target.crossAxis = isInline ? 'block' : 'inline';

	if (typeof target.style.flexBasis === 'number') {
		target.flexStyle.main = target.style.flexBasis + target.flexStyle.mainInnerBefore + target.flexStyle.mainInnerAfter + target.flexStyle.mainBorderBefore + target.flexStyle.mainBorderAfter;
	}

	target.flexStyle.mainOuter  = target.flexStyle.main;
	target.flexStyle.crossOuter = target.flexStyle.cross;

	if (target.flexStyle.mainOuter === 'auto') {
		target.flexStyle.mainOuter = target.flexStyle.mainOffset;
	}

	if (target.flexStyle.crossOuter === 'auto') {
		target.flexStyle.crossOuter = target.flexStyle.crossOffset;
	}

	if (typeof target.flexStyle.mainBefore === 'number') {
		target.flexStyle.mainOuter += target.flexStyle.mainBefore;
	}

	if (typeof target.flexStyle.mainAfter === 'number') {
		target.flexStyle.mainOuter += target.flexStyle.mainAfter;
	}

	if (typeof target.flexStyle.crossBefore === 'number') {
		target.flexStyle.crossOuter += target.flexStyle.crossBefore;
	}

	if (typeof target.flexStyle.crossAfter === 'number') {
		target.flexStyle.crossOuter += target.flexStyle.crossAfter;
	}
};

},{}],4:[function(require,module,exports){
var reduce = require('../reduce');

module.exports = function flexGrow(line) {
	if (line.mainSpace > 0) {
		var growFactor = reduce(line.children, function (lastGrowFactor, child) {
			return lastGrowFactor + parseFloat(child.style.flexGrow);
		}, 0);

		if (growFactor > 0) {
			line.main = reduce(line.children, function (main, child) {
				if (child.flexStyle.main === 'auto') {
					child.flexStyle.main = child.flexStyle.mainOffset + parseFloat(child.style.flexGrow) / growFactor * line.mainSpace;
				} else {
					child.flexStyle.main += parseFloat(child.style.flexGrow) / growFactor * line.mainSpace;
				}

				child.flexStyle.mainOuter = child.flexStyle.main + child.flexStyle.mainBefore + child.flexStyle.mainAfter;

				return main + child.flexStyle.mainOuter;
			}, 0);

			line.mainSpace = 0;
		}
	}
};

},{"../reduce":12}],5:[function(require,module,exports){
var reduce = require('../reduce');

module.exports = function flexShrink(line) {
	if (line.mainSpace < 0) {
		var shrinkFactor = reduce(line.children, function (lastShrinkFactor, child) {
			return lastShrinkFactor + parseFloat(child.style.flexShrink);
		}, 0);

		if (shrinkFactor > 0) {
			line.main = reduce(line.children, function (main, child) {
				child.flexStyle.main += parseFloat(child.style.flexShrink) / shrinkFactor * line.mainSpace;

				child.flexStyle.mainOuter = child.flexStyle.main + child.flexStyle.mainBefore + child.flexStyle.mainAfter;

				return main + child.flexStyle.mainOuter;
			}, 0);

			line.mainSpace = 0;
		}
	}
};

},{"../reduce":12}],6:[function(require,module,exports){
var reduce = require('../reduce');

module.exports = function flexboxLines(details) {
	var line;

	details.lines = [line = {
		main:  0,
		cross: 0,
		children: []
	}];

	var index = -1;
	var child;

	while (child = details.children[++index]) {
		if (
			details.style.flexWrap === 'nowrap' ||
			line.children.length === 0 ||
			details.flexStyle.main === 'auto' ||
			details.flexStyle.main - details.flexStyle.mainInnerBefore - details.flexStyle.mainInnerAfter - details.flexStyle.mainBorderBefore - details.flexStyle.mainBorderAfter >= line.main + child.flexStyle.mainOuter
		) {
			line.main += child.flexStyle.mainOuter;
			line.cross = Math.max(line.cross, child.flexStyle.crossOuter);
		} else {
			details.lines.push(line = {
				main:  child.flexStyle.mainOuter,
				cross: child.flexStyle.crossOuter,
				children: []
			});
		}

		line.children.push(child);
	}

	details.flexStyle.mainLines = reduce(details.lines, function (mainLines, item) {
		return Math.max(mainLines, item.main);
	}, 0);

	details.flexStyle.crossLines = reduce(details.lines, function (crossLines, item) {
		return crossLines + item.cross;
	}, 0);

	if (details.flexStyle.main === 'auto') {
		details.flexStyle.main = Math.max(details.flexStyle.mainOffset, details.flexStyle.mainLines + details.flexStyle.mainInnerBefore + details.flexStyle.mainInnerAfter + details.flexStyle.mainBorderBefore + details.flexStyle.mainBorderAfter);
	}

	if (details.flexStyle.cross === 'auto') {
		details.flexStyle.cross = Math.max(details.flexStyle.crossOffset, details.flexStyle.crossLines + details.flexStyle.crossInnerBefore + details.flexStyle.crossInnerAfter + details.flexStyle.crossBorderBefore + details.flexStyle.crossBorderAfter);
	}

	details.flexStyle.crossSpace = details.flexStyle.cross - details.flexStyle.crossInnerBefore - details.flexStyle.crossInnerAfter - details.flexStyle.crossBorderBefore - details.flexStyle.crossBorderAfter - details.flexStyle.crossLines;

	details.flexStyle.mainOuter  = details.flexStyle.main  + details.flexStyle.mainBefore  + details.flexStyle.mainAfter;
	details.flexStyle.crossOuter = details.flexStyle.cross + details.flexStyle.crossBefore + details.flexStyle.crossAfter;
};

},{"../reduce":12}],7:[function(require,module,exports){
module.exports = flexbox;

function flexbox(details) {
	var index = -1;
	var child;

	// for each flex child
	while (child = details.children[++index]) {
		// process child styles as metrics
		require('./flex-direction')(child, details.style.flexDirection);
	}

	// process target styles as metrics
	require('./flex-direction')(details, details.style.flexDirection);

	// process ordering of items
	require('./order')(details);

	// process flexbox items into lines
	require('./flexbox-lines')(details);

	// process align-content item metrics
	require('./align-content')(details);

	index = -1;
	var line;

	// for each line of items in the target
	while (line = details.lines[++index]) {
		line.mainSpace = details.flexStyle.main - details.flexStyle.mainInnerBefore - details.flexStyle.mainInnerAfter - details.flexStyle.mainBorderBefore - details.flexStyle.mainBorderAfter - line.main;

		// process flex-grow item metrics
		require('./flex-grow')(line);

		// process flex-shrink item metrics
		require('./flex-shrink')(line);

		// process margin item metrics
		require('./margin-main')(line);
		require('./margin-cross')(line);

		// process justify-content item metrics
		require('./justify-content')(line, details.style.justifyContent, details);
	}

	// process align-items metrics
	require('./align-items')(details);
}

},{"./align-content":1,"./align-items":2,"./flex-direction":3,"./flex-grow":4,"./flex-shrink":5,"./flexbox-lines":6,"./justify-content":8,"./margin-cross":9,"./margin-main":10,"./order":11}],8:[function(require,module,exports){
module.exports = function justifyContent(line, targetJustifyContent, details) {
	var start;
	var factor;

	var inset = details.flexStyle.mainInnerBefore;

	var index = -1;
	var child;

	if (targetJustifyContent === 'flex-end') {
		start = line.mainSpace;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter;
		}
	} else if (targetJustifyContent === 'center') {
		start = line.mainSpace / 2;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter;
		}
	} else if (targetJustifyContent === 'space-between') {
		factor = line.mainSpace / (line.children.length - 1);

		start = 0;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter + factor;
		}
	} else if (targetJustifyContent === 'space-around') {
		factor = line.mainSpace * 2 / (line.children.length * 2);
		start = factor / 2;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter + factor;
		}
	} else {
		start = 0;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter;
		}
	}
};

},{}],9:[function(require,module,exports){
module.exports = function marginCross(line) {
	var index = -1;
	var child;

	while (child = line.children[++index]) {
		var count = 0;

		if (child.flexStyle.crossBefore === 'auto') {
			++count;
		}

		if (child.flexStyle.crossAfter === 'auto') {
			++count;
		}

		var childSpace = line.cross - child.flexStyle.crossOuter;

		if (child.flexStyle.crossBefore === 'auto') {
			child.flexStyle.crossBefore = childSpace / count;
		}

		if (child.flexStyle.crossAfter === 'auto') {
			child.flexStyle.crossAfter = childSpace / count;
		}

		if (child.flexStyle.cross === 'auto') {
			child.flexStyle.crossOuter = child.flexStyle.crossOffset + child.flexStyle.crossBefore + child.flexStyle.crossAfter;
		} else {
			child.flexStyle.crossOuter = child.flexStyle.cross + child.flexStyle.crossBefore + child.flexStyle.crossAfter;
		}
	}
};

},{}],10:[function(require,module,exports){
module.exports = function marginMain(line) {
	var count = 0;

	var index = -1;
	var child;

	while (child = line.children[++index]) {
		if (child.flexStyle.mainBefore === 'auto') {
			++count;
		}

		if (child.flexStyle.mainAfter === 'auto') {
			++count;
		}
	}

	if (count > 0) {
		index = -1;

		while (child = line.children[++index]) {
			if (child.flexStyle.mainBefore === 'auto') {
				child.flexStyle.mainBefore = line.mainSpace / count;
			}

			if (child.flexStyle.mainAfter === 'auto') {
				child.flexStyle.mainAfter = line.mainSpace / count;
			}

			if (child.flexStyle.main === 'auto') {
				child.flexStyle.mainOuter = child.flexStyle.mainOffset + child.flexStyle.mainBefore + child.flexStyle.mainAfter;
			} else {
				child.flexStyle.mainOuter = child.flexStyle.main + child.flexStyle.mainBefore + child.flexStyle.mainAfter;
			}
		}

		line.mainSpace = 0;
	}
};

},{}],11:[function(require,module,exports){
var flexDirectionReverseMatch = /^(column|row)-reverse$/;

module.exports = function order(target) {
	target.children.sort(function (childA, childB) {
		return childA.style.order - childB.style.order || childA.index - childB.index;
	});

	if (flexDirectionReverseMatch.test(target.style.flexDirection)) {
		target.children.reverse();
	}
};

},{}],12:[function(require,module,exports){
module.exports = reduce;

function reduce(arraylike, callback, previousValue) {
	var length = arraylike.length;
	var index = -1;

	while (++index < length) {
		if (index in arraylike) {
			previousValue = callback(previousValue, arraylike[index], index);
		}
	}

	return previousValue;
}

},{}],13:[function(require,module,exports){
/*! Flexibility 2.0.0 | MIT Licensed | github.com/jonathantneal/flexibility */

var read  = require('./read');
var write = require('./write');

var readAll  = require('./readAll');
var writeAll = require('./writeAll');

module.exports = flexibility;

module.exports.read  = read;
module.exports.write = write;

module.exports.readAll  = readAll;
module.exports.writeAll = writeAll;

function flexibility(target) {
	writeAll(readAll(target));
}

},{"./read":15,"./readAll":16,"./write":17,"./writeAll":18}],14:[function(require,module,exports){
module.exports = getComputedLength;

var lengthMatch = /^([-+]?\d*\.?\d+)(%|[a-z]+)$/;

var testElement = document.createElement('div');

var borderWidths = {
	medium: 4,
	none:   0,
	thick:  6,
	thin:   2
};

var borderWidthPropMatch = /^border(Bottom|Left|Right|Top)Width$/;

function getComputedLength(style, prop, element) {
	var value = style[prop];
	var match = String(value).match(lengthMatch);

	if (!match) {
		var borderWidthProp = prop.match(borderWidthPropMatch);

		if (borderWidthProp) {
			var borderStyleProp = style['border' + borderWidthProp[1] + 'Style'];

			if (borderStyleProp === 'none') {
				return 0;
			} else {
				return borderWidths[value] || 0;
			}
		}

		return value;
	}

	var size = match[1];
	var unit = match[2];

	return unit === 'px'  ? size * 1 :
	unit === 'cm'  ? size * 0.3937 * 96 :
	unit === 'in'  ? size * 96 :
	unit === 'mm'  ? size * 0.3937 * 96 / 10 :
	unit === 'pc'  ? size * 12 * 96 / 72 :
	unit === 'pt'  ? size * 96 / 72 :
	unit === 'rem' ? size * 16 :
	getComputedValue(value, element);
}

function getComputedValue(value, element) {
	testElement.style.cssText = 'border:none!important;clip:rect(0 0 0 0)!important;display:block!important;font-size:1em!important;height:0!important;margin:0!important;padding:0!important;position:relative!important;width:' + value + '!important';

	element.parentNode.insertBefore(testElement, element.nextSibling);

	var fontSize = testElement.offsetWidth;

	element.parentNode.removeChild(testElement);

	return fontSize;
}

},{}],15:[function(require,module,exports){
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

},{"./getComputedLength":14}],16:[function(require,module,exports){
module.exports = readAll;

var read = require('../read');
var displayFlexMatch = /(^|;)\s*display\s*:\s*(inline-)?flex\s*(;|$)/i;
var flexMatch = /^(inline-)?flex$/i;

// Return a list of flexbox details from a matching element or its descendants
function readAll(element) {
	// create details list
	var detailsList = [];

	// process display flex details
	readElementAndTree(element, detailsList);

	return detailsList;
}

function readElementAndTree(element, detailsList) {
	// whether the element has a display flex style
	var isDisplayFlex = isElementDisplayFlexCheck(element);

	// children of the element
	var children = [];

	var index = -1;
	var childNode;

	// for each child node of the element
	while (childNode = element.childNodes[++index]) {
		// whether the child is non-empty text
		var isNonEmptyText = childNode.nodeType === 3 && !/^\s*$/.test(childNode.nodeValue);

		if (isDisplayFlex && isNonEmptyText) {
			// replace the text with an element containing the text
			var oldNode = childNode;

			childNode = element.insertBefore(document.createElement('flex-item'), oldNode);

			childNode.appendChild(oldNode);
		}

		// whether the child is an element
		var isElement = childNode instanceof Element;

		if (isElement) {
			// get the flex details of the child
			var childDetails = readElementAndTree(childNode, detailsList);

			if (isDisplayFlex) {
				var runtimeStyle = childNode.style;

				// remove from layout
				runtimeStyle.display = 'inline-block';
				runtimeStyle.position = 'absolute';

				// get the current flex related styles
				childDetails.style = read(childNode).style;

				// push the child details to children
				children.push(childDetails);
			}
		}
	}

	// combined flex details of the element
	var details = {
		element: element,
		children: children
	};

	if (isDisplayFlex) {
		// get the current flex related styles
		details.style = read(element).style;

		// push the flex details of the element to detailsList
		detailsList.push(details);
	}

	return details;
}

function isElementDisplayFlexCheck(element) {
	// whether the element is an element
	var isElement = element instanceof Element;

	// whether the element has a data flex attribute
	var dataFlexStyle = isElement && element.getAttribute('data-style');

	// whether the element has a current style and -js-display declaration
	var currentStyleJsDisplay = isElement && element.currentStyle && element.currentStyle['-js-display'];

	// whether flex is detected by the data flex attribute or the current style
	var isElementDisplayFlex = displayFlexMatch.test(dataFlexStyle) || flexMatch.test(currentStyleJsDisplay);

	return isElementDisplayFlex;
}

},{"../read":15}],17:[function(require,module,exports){
module.exports = write;

var translate = require('../flexbox');

// write( details ): Writes flexbox details back to their respective elements.
function write(details) {
	translate(details);

	var runtimeStyle = details.element.style;

	var angle = details.mainAxis === 'inline' ? ['main', 'cross'] : ['cross', 'main'];

	runtimeStyle.boxSizing = 'content-box';
	runtimeStyle.display   = 'block';
	runtimeStyle.position  = 'relative';

	runtimeStyle.width  = normalize(details.flexStyle[angle[0]] - details.flexStyle[angle[0] + 'InnerBefore'] - details.flexStyle[angle[0] + 'InnerAfter'] - details.flexStyle[angle[0] + 'BorderBefore'] - details.flexStyle[angle[0] + 'BorderAfter']);
	runtimeStyle.height = normalize(details.flexStyle[angle[1]] - details.flexStyle[angle[1] + 'InnerBefore'] - details.flexStyle[angle[1] + 'InnerAfter'] - details.flexStyle[angle[1] + 'BorderBefore'] - details.flexStyle[angle[1] + 'BorderAfter']);

	var index = -1;
	var child;

	while (child = details.children[++index]) {
		var childRuntimeStyle = child.element.style;

		var childAngle = child.mainAxis === 'inline' ? ['main', 'cross'] : ['cross', 'main'];

		childRuntimeStyle.boxSizing = 'content-box';
		childRuntimeStyle.display   = 'block';
		childRuntimeStyle.position  = 'absolute';

		if (child.flexStyle[childAngle[0]] !== 'auto') {
			childRuntimeStyle.width  = normalize(child.flexStyle[childAngle[0]] - child.flexStyle[childAngle[0] + 'InnerBefore'] - child.flexStyle[childAngle[0] + 'InnerAfter'] - child.flexStyle[childAngle[0] + 'BorderBefore'] - child.flexStyle[childAngle[0] + 'BorderAfter']);
		}

		if (child.flexStyle[childAngle[1]] !== 'auto') {
			childRuntimeStyle.height = normalize(child.flexStyle[childAngle[1]] - child.flexStyle[childAngle[1] + 'InnerBefore'] - child.flexStyle[childAngle[1] + 'InnerAfter'] - child.flexStyle[childAngle[1] + 'BorderBefore'] - child.flexStyle[childAngle[1] + 'BorderAfter']);
		}

		childRuntimeStyle.top  = normalize(child.flexStyle[childAngle[1] + 'Start']);
		childRuntimeStyle.left = normalize(child.flexStyle[childAngle[0] + 'Start']);

		childRuntimeStyle.marginTop    = normalize(child.flexStyle[childAngle[1] + 'Before']);
		childRuntimeStyle.marginRight  = normalize(child.flexStyle[childAngle[0] + 'After']);
		childRuntimeStyle.marginBottom = normalize(child.flexStyle[childAngle[1] + 'After']);
		childRuntimeStyle.marginLeft   = normalize(child.flexStyle[childAngle[0] + 'Before']);
	}
}

function normalize(value) {
	if (isNaN(value) || !parseInt(value)) {
		return '0px';
	}
	return typeof value === 'string' ? value : Math.max(value, 0) + 'px';
}

},{"../flexbox":7}],18:[function(require,module,exports){
module.exports = writeAll;

var write = require('../write');

// writeAll( detailsList ): Writes a list of flexbox details back to their respective elements.
function writeAll(detailsList) {
	var index = -1;
	var details;

	while (details = detailsList[++index]) {
		write(details);
	}
}

},{"../write":17}]},{},[13])(13)
});