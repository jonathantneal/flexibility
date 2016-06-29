module.exports = getComputedLength;

var lengthMatch = /^([-+]?\d*\.?\d+)(%|[a-z]+)$/;

var testElement = document.createElement('div');

function getComputedLength(value, targetElement) {
	var match = String(value).match(lengthMatch);

	if (!match) {
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
	getComputedValue(value, targetElement);
}

function getComputedValue(value, targetElement) {
	testElement.style.cssText = 'border:none!important;clip:rect(0 0 0 0)!important;display:block!important;font-size:1em!important;height:0!important;margin:0!important;padding:0!important;position:relative!important;width:' + value + '!important';

	targetElement.parentNode.insertBefore(testElement, targetElement.nextSibling);

	var fontSize = testElement.offsetWidth;

	targetElement.parentNode.removeChild(testElement);

	return fontSize;
}
