var getFlexStyles = require('../getFlexStyles');

module.exports = function walk(target, ancestorData, isFlexChild) {
	var flexContainerRE = /(^|;)\s*display\s*:\s*(inline-)?flex\s*(;|$)/i;
	var isFlexContainer = flexContainerRE.test(target.getAttribute('data-flex'));
	var data = {
		node: target,
		children: [],
		descendants: []
	};

	if (isFlexContainer) {
		if (ancestorData !== undefined) {
			ancestorData.descendants.push(data);
		}
	}

	if (isFlexContainer || !ancestorData) {
		ancestorData = data;
	}

	Array.prototype.forEach.call(target.childNodes, function (childNode) {
		if (isFlexContainer && childNode.nodeType === 3 && childNode.nodeValue.trim()) {
			var oldNode = childNode;

			childNode = target.insertBefore(document.createElement('flex-item'), oldNode);

			childNode.appendChild(oldNode);
		}

		if (childNode.nodeType === 1) {
			var childData = module.exports(childNode, ancestorData, isFlexContainer);

			if (isFlexContainer) {
				data.children.push(childData);
			}
		}
	});

	if (isFlexContainer || isFlexChild) {
		getFlexStyles(target, data, isFlexChild);
	}

	return data;
};
