var CSS_OVERFLOW_BUFFER = 0;

flexibility.walk = function walk(node) {
	// initialize node
	var details = flexibility.init(node);

	// get display
	var style   = details.style;
	var display = style.display;

	// skip display:none elements
	if (display === 'none') {
		return {};
	}

	// detect flex
	var isFlex  = display.match(/^(inline)?flex$/);

	// conditionally style flex container
	if (isFlex) {
		flexibility.updateFlexContainerCache(details);

		node.runtimeStyle.cssText = 'display:' + (isFlex[1] ? 'inline-block' : 'block');

		details.children = [];
	}

	// walk children of the current node
	Array.prototype.forEach.call(node.childNodes, function (childNode, childNodeIndex) {
		// if the child is an element
		if (childNode.nodeType === 1) {
			// walk the child element
			var childDetails = flexibility.walk(childNode);
			var childStyle   = childDetails.style;

			childDetails.index = childNodeIndex;

			// if the parent is a flex container
			if (isFlex) {
				// get the flex item styles
				flexibility.updateFlexItemCache(childDetails);

				// inherit self alignment from container item alignment
				if (childStyle.alignSelf === 'auto') {
					childStyle.alignSelf = style.alignItems;
				}

				// overwrite child runtime style
				childNode.runtimeStyle.cssText = 'display:' + (childStyle.alignSelf === 'stretch' && /^column/.test(style.flexDirection) ? 'block' : 'inline-block');

				// add item to parent flex
				details.children.push(childDetails);
			}
		}
	});

	// if the element is a flex container
	if (isFlex) {
		// calculate each flex item length
		details.children.forEach(function (child) {
			flexibility.updateLengthCache(child);
		});

		// sort flex items by order or original position
		details.children.sort(function (childA, childB) {
			return childA.style.order - childB.style.order || childA.index - childB.index;
		});

		// if the flex container direction is reversed
		if (/-reverse$/.test(style.flexDirection)) {
			// reverse the flex item order
			details.children.reverse();

			// remove the flex container reversal
			style.flexDirection = style.flexDirection.replace(/-reverse$/, '');

			// conditionally flip flex container content justification
			if (style.justifyContent === 'flex-start') {
				style.justifyContent = 'flex-end';
			} else if (style.justifyContent === 'flex-end') {
				style.justifyContent = 'flex-start';
			}
		}

		// update flex container lengths
		flexibility.updateLengthCache(details);

		// remove old layout results
		delete details.lastLayout;
		delete details.layout;

		// CSS-LAYOUT PATCH: adjust border widths
		var borderTopWidth = style.borderTopWidth;
		var borderBottomWidth = style.borderBottomWidth;

		style.borderTopWidth = 0;
		style.borderBottomWidth = 0;
		style.borderLeftWidth = 0;

		if (style.flexDirection === 'column') {
			style.width -= style.borderRightWidth;
		}

		// calculate the layout
		flexibility.computeLayout(details);

		// style the flex container
		node.runtimeStyle.cssText = 'box-sizing:border-box;display:block;position:relative;width:' + (details.layout.width + style.borderRightWidth + CSS_OVERFLOW_BUFFER) + 'px;height:' + (details.layout.height + borderTopWidth + borderBottomWidth) + 'px';

		// CSS-LAYOUT PATCH: calculate stretched column width and height
		var maxLength = [];
		var maxIndex = 1;

		var angle = style.flexDirection === 'column' ? 'width' : 'height';

		details.children.forEach(function (child) {
			maxLength[child.lineIndex] = Math.max(maxLength[child.lineIndex] || 0, child.layout[angle]);

			maxIndex = Math.max(maxIndex, child.lineIndex + 1);
		});

		// style each flex item
		details.children.forEach(function (child) {
			var layout = child.layout;

			if (child.style.alignSelf === 'stretch') {
				layout[angle] = maxLength[child.lineIndex];
			}

			child.node.runtimeStyle.cssText = 'box-sizing:border-box;display:block;position:absolute;margin:0;width:' + (layout.width + CSS_OVERFLOW_BUFFER) + 'px;height:' + layout.height + 'px;top:' + layout.top + 'px;left:' + layout.left + 'px';
		});
	}

	return details;
};
