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
