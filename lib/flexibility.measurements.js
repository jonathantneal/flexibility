flexibility.measure = function (target) {
	// cache runtime CSS
	var style  = target.onlayoutcomplete = target.onlayoutcomplete || {};

	var runCSS = target.runtimeStyle;
	var oldCSS = runCSS.cssText;

	// get minimum scroll size
	runCSS.cssText = 'border:0;display:inline-block;height:0;overflow:hidden;padding:0;width:0';

	var scrollWidth  = target.scrollWidth;
	var scrollHeight = target.scrollHeight;

	// get font size
	runCSS.width = '1em';

	var fontSize = target.offsetWidth;

	// restore runtime CSS
	runCSS.cssText = oldCSS;

	// set predefined border widths
	var borderWidths = {
		medium: 4,
		none:   0,
		thick:  6,
		thin:   2
	};

	// set metrics we wish to capture
	var metrics = {
		borderTopWidth:    0,
		borderRightWidth:  0,
		borderBottomWidth: 0,
		borderLeftWidth:   0,
		marginTop:         0,
		marginRight:       0,
		marginBottom:      0,
		marginLeft:        0,
		paddingTop:        0,
		paddingRight:      0,
		paddingBottom:     0,
		paddingLeft:       0,
		minWidth:          0,
		maxWidth:          0,
		minHeight:         0,
		maxHeight:         0
	};

	// get metrics using a dummy element
	var dummy  = document.createElement('x');
	var parent = target.parentNode;
	var getCSS = target.currentStyle || {};
	var setCSS = dummy.runtimeStyle;

	setCSS.cssText = 'border:0;clip:rect(0 0 0 0);display:block;font-size:' + fontSize + 'px;line-height:0;margin:0;padding:0;position:absolute';

	parent.insertBefore(dummy, target);

	for (var key in metrics) {
		var value = getCSS[key];

		setCSS.width = value in borderWidths ? borderWidths[value] : value;

		style[key] = dummy.offsetWidth;
	}

	parent.removeChild(dummy);

	// set font size
	style.fontSize = fontSize;

	// unset border widths without style
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

	// set additional metrics
	style.scrollWidth  = scrollWidth;
	style.scrollHeight = scrollHeight;
	style.width  = target.offsetWidth;
	style.height = target.offsetHeight;

	style.contentHeight = style.height - style.borderTopWidth  - style.borderBottomWidth - style.paddingTop  - style.paddingBottom;
	style.contentWidth  = style.width  - style.borderLeftWidth - style.borderRightWidth  - style.paddingLeft - style.paddingRight;

	return style;
};
