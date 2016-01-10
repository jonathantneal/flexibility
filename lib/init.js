flexibility.init = function init(node) {
	// get details from node
	var details = node.onlayoutcomplete;

	// conditionally generate details
	if (!details) {
		details = node.onlayoutcomplete = {
			node:     node,
			style:    {},
			children: []
		};
	}

	// store display style in details
	details.style.display = node.currentStyle['-js-display'] || node.currentStyle.display;

	// return details
	return details;
};
