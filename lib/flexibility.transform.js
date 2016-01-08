flexibility.transform = function (target) {
	var flexStyle = target.onlayoutcomplete;
	var direction = flexStyle.flexDirection;
	var align     = flexStyle.alignItems;
	var justify   = flexStyle.justifyContent;

	if (flexibility.transform.align[direction][align]) {
		flexibility.transform.align[direction][align](target);
	}

	if (flexibility.transform.justify[direction][justify]) {
		flexibility.transform.justify[direction][justify](target);
	}
};

flexibility.transform.align = {
	row: {
		'flex-start': function (target) {
			var targetCSS = target.onlayoutcomplete;

			flexibility.each(target, function (child) {
				flexibility.measure(child);

				var childCSS = child.onlayoutcomplete;

				child.runtimeStyle.marginBottom = targetCSS.contentHeight - childCSS.height - childCSS.marginBottom;
			});
		},
		center: function (target) {
			var targetCSS = target.onlayoutcomplete;

			flexibility.each(target, function (child) {
				flexibility.measure(child);

				var childCSS = child.onlayoutcomplete;

				child.runtimeStyle.marginTop = (targetCSS.contentHeight - childCSS.height) / 2 + 'px';
			});
		},
		'flex-end': function (target) {
			var targetCSS = target.onlayoutcomplete;

			flexibility.each(target, function (child) {
				flexibility.measure(child);

				var childCSS = child.onlayoutcomplete;

				child.runtimeStyle.marginTop = targetCSS.contentHeight - childCSS.height - childCSS.marginTop;
			});
		},
		stretch: function (target) {
			var targetCSS = target.onlayoutcomplete;

			flexibility.each(target, function (child) {
				flexibility.measure(child);

				var childCSS = child.onlayoutcomplete;

				child.runtimeStyle.height = targetCSS.contentHeight - childCSS.marginTop - childCSS.marginBottom + 'px';
			});
		}
	},
	column: {
		'flex-start': function (target) {
			var targetCSS = target.onlayoutcomplete;

			flexibility.each(target, function (child) {
				flexibility.measure(child);

				var childCSS = child.onlayoutcomplete;

				child.runtimeStyle.marginRight = targetCSS.contentWidth - childCSS.width - childCSS.marginRight;
			});
		},
		'flex-end': function (target) {
			var targetCSS = target.onlayoutcomplete;

			flexibility.each(target, function (child) {
				flexibility.measure(child);

				var childCSS = child.onlayoutcomplete;

				child.runtimeStyle.marginLeft = targetCSS.contentWidth - childCSS.width - childCSS.marginLeft;
			});
		},
		center: function (target) {
			var targetCSS = target.onlayoutcomplete;

			flexibility.each(target, function (child) {
				flexibility.measure(child);

				var childCSS = child.onlayoutcomplete;

				var marginX = (targetCSS.contentWidth - childCSS.width) / 2 + 'px';

				child.runtimeStyle.marginLeft = child.runtimeStyle.marginRight = marginX;
			});
		},
		stretch: function (target) {
			var targetCSS = target.onlayoutcomplete;

			flexibility.each(target, function (child) {
				flexibility.measure(child);

				var childCSS = child.onlayoutcomplete;

				child.runtimeStyle.width = targetCSS.contentWidth - childCSS.marginLeft - childCSS.marginRight + 'px';
			});
		}
	}
};

flexibility.transform.contentMeasurements = function (target) {
	var childNodes = target.childNodes;
	var index = -1;
	var children = [];
	var child;
	var startOffsetX;
	var startOffsetY;
	var startStyle;
	var endOffsetX;
	var endOffsetY;
	var endStyle;

	while (child = childNodes[++index]) {
		if (child.nodeType === 1) {
			children.push(child);

			if (!startStyle) {
				startStyle = child.runtimeStyle;
				startOffsetX = child.offsetLeft;
				startOffsetY = child.offsetTop;
			}

			endStyle = child.runtimeStyle;
			endOffsetX = child.offsetLeft + child.offsetWidth;
			endOffsetY = child.offsetTop + child.offsetHeight;
		}
	}

	return {
		children:   children,
		startStyle: startStyle,
		endStyle:   endStyle,
		width:      endOffsetX - startOffsetX,
		height:     endOffsetY - startOffsetY
	};
};

flexibility.transform.justify = {
	row: {
		'flex-end': function (target) {
			var targetCSS = target.onlayoutcomplete;
			var contents  = flexibility.transform.contentMeasurements(target);
			var lastChild = contents.children[contents.children.length - 1];

			flexibility.measure(lastChild);

			var childCSS = lastChild.onlayoutcomplete;

			var marginX = targetCSS.contentWidth - contents.width - childCSS.marginRight;

			contents.startStyle.marginLeft = marginX + 'px';
		},
		center: function (target) {
			var targetCSS = target.onlayoutcomplete;
			var contents = flexibility.transform.contentMeasurements(target);

			var marginX = (targetCSS.contentWidth - contents.width) / 2;

			contents.startStyle.marginLeft = marginX;
			contents.endStyle.marginRight = marginX;
		}
	},
	column: {
		'space-around': function (target) {
			var targetCSS = target.onlayoutcomplete;
			var contents  = flexibility.transform.contentMeasurements(target);

			var diff = targetCSS.contentHeight - contents.height;
			var length = contents.children.length;
			var margin = diff / (length * 2);

			var index = -1;
			var child;

			while (child = contents.children[++index]) {
				child.runtimeStyle.marginTop = margin + 'px';
				child.runtimeStyle.marginBottom = margin + 'px';
			}
		}
	}
};
