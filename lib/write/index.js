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
	return typeof value === 'string' ? value : Math.max(value, 0) + 'px';
}
