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
