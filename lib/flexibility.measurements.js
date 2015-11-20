flexibility.measure = function (target) {
	var style = target.onlayoutcomplete = target.onlayoutcomplete || {};

	var measurer = flexibility.measurer || flexibility.measure.init() || flexibility.measurer;
	var getCSS   = target.currentStyle;

	document.body.appendChild(measurer.wrap);

	var fontMeasure = target.appendChild(document.createElement('x'));

	fontMeasure.runtimeStyle.display = 'block';
	fontMeasure.runtimeStyle.fontSize = '1em';
	fontMeasure.runtimeStyle.lineHeight = '1';
	fontMeasure.runtimeStyle.height = '1em';

	style.fontSize = fontMeasure.offsetHeight;

	measurer.beforeCSS.fontSize = style.fontSize + 'px';

	target.removeChild(fontMeasure);

	var noNBorder = getCSS.borderTopStyle === 'none';
	var noEBorder = getCSS.borderRightStyle === 'none';
	var noSBorder = getCSS.borderBottomStyle === 'none';
	var noWBorder = getCSS.borderLeftStyle === 'none';
	var offset  = measurer.after.offsetTop;
	var defaults = {
		marginTop:     0,
		marginRight:   0,
		marginBottom:  0,
		marginLeft:    0,
		paddingTop:    0,
		paddingRight:  0,
		paddingBottom: 0,
		paddingLeft:   0
	};

	if (!noNBorder) {
		defaults.borderTopWidth = 0;
	}

	if (!noEBorder) {
		defaults.borderRightWidth = 0;
	}

	if (!noSBorder) {
		defaults.borderBottomWidth = 0;
	}

	if (!noWBorder) {
		defaults.borderLeftWidth = 0;
	}

	for (var key in defaults) {
		measurer.beforeCSS.marginTop = getCSS[key];

		style[key] = measurer.after.offsetTop - offset;
	}

	if (noNBorder) {
		style.borderTopWidth = 0;
	}

	if (noEBorder) {
		style.borderRightWidth = 0;
	}

	if (noSBorder) {
		style.borderBottomWidth = 0;
	}

	if (noWBorder) {
		style.borderLeftWidth = 0;
	}

	document.body.removeChild(measurer.wrap);

	measurer.beforeCSS.marginTop = 0;

	style.width  = target.offsetWidth;
	style.height = target.offsetHeight;

	style.contentHeight = style.height - style.borderTopWidth - style.borderBottomWidth - style.paddingTop - style.paddingBottom;
	style.contentWidth  = style.width - style.borderLeftWidth - style.borderRightWidth - style.paddingLeft - style.paddingRight;
};

flexibility.measure.init = function () {
	var wrap   = document.createElement('x');
	var before = wrap.appendChild(document.createElement('x'));
	var after  = wrap.appendChild(document.createElement('x'));

	var wrapCSS   = wrap.runtimeStyle;
	var beforeCSS = before.runtimeStyle;
	var afterCSS  = after.runtimeStyle;

	wrapCSS.clip     = 'rect(0 0 0 0)';
	wrapCSS.display  = 'block';
	wrapCSS.overflow = 'hidden';
	wrapCSS.position = 'absolute';

	beforeCSS.display = 'block';
	afterCSS.display  = 'block';

	flexibility.measurer = {
		before:    before,
		beforeCSS: beforeCSS,
		after:     after,
		afterCSS:  afterCSS,
		wrap:      wrap,
		wrapCSS:   wrapCSS
	};
};
