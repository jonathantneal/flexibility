// setup
// =============================================================================

function getElementMetrics(target) {
	body = body || document.body;

	body.appendChild(box);

	var style   = target.currentStyle;
	var offset  = after.offsetTop;
	var spacing = {
		marginTop:     0,
		marginRight:   0,
		marginBottom:  0,
		marginLeft:    0,
		paddingTop:    0,
		paddingRight:  0,
		paddingBottom: 0,
		paddingLeft:   0
	};

	if (target.parentNode) {
		box[css].width = Math.max(target.parentNode.offsetWidth, target.parentNode.clientWidth);
		box[css].height = Math.max(target.parentNode.offsetHeight, target.parentNode.clientHeight);
	}

	for (var key in spacing) {
		trycss.marginTop = style[key];

		spacing[key] = after.offsetTop - offset;
	}

	if (target.parentNode) {
		box[css].width = '';
		box[css].height = '';
	}

	body.removeChild(box);

	trycss.marginTop = 0;

	spacing.boxSizing = style.boxSizing || 'content-box';
	spacing.width  = target.offsetWidth;
	spacing.height = target.offsetHeight;

	spacing.target = target;

	return spacing;
}

// Run a method over each child element
// =============================================================================

function each(node, callback) {
	var child = node.firstChild;

	while (child) {
		if (child.nodeType === 1) {
			callback(child);
		}

		child = child.nextSibling;
	}
}

// flex list
// =============================================================================

var flexList = [];

function getFlexListItem(target) {
	if (target._flexID === undefined) {
		target._flexID = flexList.length;

		flexList.push(getElementMetrics(target));
	}

	return flexList[target._flexID];
}

// Calculate the flex display of elements
// =============================================================================

var displayMatch        = /^(flex|inline-flex)$/;
var alignItemsMatch     = /^(flex-start|flex-end|center|baseline|stretch)$/;
var flexDirectionMatch  = /^(row|row-reverse|column|column-reverse)$/;
var flexWrapMatch       = /^(nowrap|wrap|wrap-reverse)$/;
var justifyContentMatch = /^(flex-start|flex-end|center|space-between|space-around)$/;

function walkTarget(target) {
	// if target is an element
	if (target.nodeType === 1) {
		// get current style
		var style = target.currentStyle;

		// get flex display by data attributes
		var display = style['-js-display'];

		// if flex display is present
		if (displayMatch.test(display)) {
			var parentCSS = getFlexListItem(target.parentNode);
			var flexCSS   = getFlexListItem(target);

			if (parentCSS.flexDirection !== 'row' && display === 'flex') {
				target[css].display = 'block';
			} else {
				target[css].display = inlineBlock;
				target[css].zoom = 1;
			}

			// display property
			flexCSS.display = display;

			// get all flex properties
			// {
			// 	alignContent:   currentStyle['align-content'],
			// 	alignItems:     currentStyle['align-items'],
			// 	alignSelf:      currentStyle['align-self'],
			// 	display:        currentStyle['-js-display'],
			// 	flex:           currentStyle['flex'],
			// 	flexBasis:      currentStyle['flex-basis'],
			// 	flexDirection:  currentStyle['flex-direction'],
			// 	flexFlow:       currentStyle['flex-flow'],
			// 	flexGrow:       currentStyle['flex-grow'],
			// 	flexShrink:     currentStyle['flex-shrink'],
			// 	flexWrap:       currentStyle['flex-wrap'],
			// 	justifyContent: currentStyle['justify-content'],
			// 	order:          currentStyle['order']
			// }

			// flex-direction property
			flexCSS.flexDirection = style['flex-direction'];

			if (!flexDirectionMatch.test(flexCSS.flexDirection)) {
				flexCSS.flexDirection = 'row';
			}

			// align-items property
			flexCSS.alignItems = style['align-items'];

			if (!alignItemsMatch.test(flexCSS.alignItems)) {
				flexCSS.alignItems = 'stretch';
			}

			// justify-content property
			flexCSS.justifyContent = style['justify-content'];

			if (!justifyContentMatch.test(flexCSS.justifyContent)) {
				flexCSS.justifyContent = 'flex-start';
			}

			// flex-wrap property
			flexCSS.flexWrap = style['flex-wrap'];

			if (!flexWrapMatch.test(flexCSS.flexWrap)) {
				flexCSS.flexWrap = 'nowrap';
			}

			// combined child metrics
			flexCSS.childFlexGrow = 0;
			flexCSS.childWidth    = 0;
			flexCSS.childHeight   = 0;

			// use block and inline-block fallbacks
			each(target, function (child) {
				if (flexCSS.flexDirection === 'row') {
					child[css].display = inlineBlock;
					child[css].zoom    = 1;
				} else {
					child[css].display = 'block';
				}

				child[css].fontSize      = child.currentStyle.fontSize;
				child[css].verticalAlign = 'top';
				child[css].zoom          = 1;

				var childFlexCSS = getFlexListItem(child);

				childFlexCSS.flexGrow = parseInt(child.currentStyle['flex-grow'], 10) || 0;

				flexCSS.childFlexGrow += childFlexCSS.flexGrow;
				flexCSS.childWidth    += childFlexCSS.width + childFlexCSS.marginLeft + childFlexCSS.marginRight;
				flexCSS.childHeight   += childFlexCSS.height;
			});

			target[css].fontSize = 0;
		}

		// iterate children
		var child = target.firstChild;

		while (child) {
			walkTarget(child);

			child = child.nextSibling;
		}
	}
}

// flexjs
// =============================================================================

var alignments = {
	'column': {
		'flex-start': function () {
			// ... NOT IMPLEMENTED
		},
		'center': function (flexCSS) {
			each(flexCSS.target, function (child) {
				var childCSS = getFlexListItem(child);

				var offset = (flexCSS.width - flexCSS.paddingLeft - flexCSS.paddingRight - childCSS.width) / 2;

				child[css].marginLeft = offset + 'px';
				child[css].marginRight = offset + 'px';
			});
		},
		'flex-end': function (flexCSS) {
			each(flexCSS.target, function (child) {
				var childCSS = getFlexListItem(child);

				var offset = flexCSS.width - flexCSS.paddingLeft - flexCSS.paddingRight - childCSS.width;

				child[css].marginLeft = offset + 'px';
				child[css].marginRight = 0;
			});
		},
		'stretch': function (flexCSS) {
			each(flexCSS.target, function (child) {
				var childCSS = getFlexListItem(child);

				childCSS.width = flexCSS.width - flexCSS.paddingLeft - flexCSS.paddingRight - childCSS.marginLeft - childCSS.marginRight;

				child[css].width = childCSS.width + 'px';
				child[css].height = childCSS.height + 'px';
			});
		}
	},
	'row': {
		'center': function (flexCSS) {
			each(flexCSS.target, function (child) {
				var childCSS = getFlexListItem(child);

				var offset = (flexCSS.height - flexCSS.paddingTop - flexCSS.paddingBottom - childCSS.height + childCSS.marginTop) / 2;

				child[css].marginTop = offset + 'px';
				child[css].marginBottom = 0;
			});
			// ... NOT IMPLEMENTED
		},
		'flex-start': function (flexCSS) {
			if (flexCSS.width < flexCSS.childWidth) {
				each(flexCSS.target, function (child) {
					var childCSS = getFlexListItem(child);
					var flexGrow = childCSS.flexGrow ? childCSS.flexGrow / flexCSS.childFlexGrow : childCSS.width / (flexCSS.childWidth + flexCSS.marginLeft + flexCSS.marginRight);

					childCSS.target[css].width = flexGrow * 100 + '%';
				});
			}
		},
		'flex-end': function (flexCSS) {
			each(flexCSS.target, function (child) {
				var childCSS = getFlexListItem(child);

				var offset = flexCSS.height - childCSS.height - flexCSS.paddingTop - flexCSS.paddingBottom;

				child[css].marginTop = offset + 'px';
				child[css].marginBottom = 0;
			});
		},
		'stretch': function (flexCSS) {
			each(flexCSS.target, function (child) {
				var childCSS = getFlexListItem(child);

				childCSS.height = flexCSS.height - flexCSS.paddingTop - flexCSS.paddingBottom - childCSS.marginTop - childCSS.marginBottom;

				child[css].width  = (childCSS.boxSizing === 'border-box' ? childCSS.width : childCSS.width - childCSS.paddingLeft - childCSS.paddingRight) + 'px';
				child[css].height = (childCSS.boxSizing === 'border-box' ? childCSS.height : childCSS.height - childCSS.paddingTop - childCSS.paddingBottom) + 'px';
			});
		}
	}
};

function walkSizing() {
	var index = -1;
	var flexItem;

	while (flexItem = flexList[++index]) {
		if (flexItem.display) {
			alignments[flexItem.flexDirection][flexItem.alignItems](flexItem);
		}
	}
}

// flexjs
// =============================================================================

window.flexjs = function flexjs(target) {
	walkTarget(target || document.body);

	walkSizing();
};

var css    = 'runtimeStyle';
var body   = document.body;
var box    = document.createElement('x');
var trycss = before[css];
var before, after, inlineBlock;

if (/MSIE [6-9]\.0;/.test(navigator.userAgent)) {
	before = box.appendChild(document.createElement('x'));
	after  = box.appendChild(document.createElement('x'));

	inlineBlock = /MSIE 7/.test(navigator.userAgent) ? 'inline' : 'inline-block';

	box[css].clip     = 'rect(0 0 0 0)';
	box[css].display  = 'block';
	box[css].overflow = 'hidden';
	box[css].position = 'absolute';

	before[css].display  = 'block';
	after[css].display   = 'block';

	var onreadystatechange = function () {
		if (/t/.test(document.readyState)) {
			document.detachEvent('onreadystatechange', onreadystatechange);

			window.flexjs(document.body);
		}
	};

	document.attachEvent('onreadystatechange', onreadystatechange);
}
