var reduce = require('../reduce');

module.exports = function flexboxLines(details) {
	var line;

	details.lines = [line = {
		main:  0,
		cross: 0,
		children: []
	}];

	var index = -1;
	var child;

	while (child = details.children[++index]) {
		if (
			details.style.flexWrap === 'nowrap' ||
			line.children.length === 0 ||
			details.flexStyle.main === 'auto' ||
			details.flexStyle.main - details.flexStyle.mainInnerBefore - details.flexStyle.mainInnerAfter - details.flexStyle.mainBorderBefore - details.flexStyle.mainBorderAfter >= line.main + child.flexStyle.mainOuter
		) {
			line.main += child.flexStyle.mainOuter;
			line.cross = Math.max(line.cross, child.flexStyle.crossOuter);
		} else {
			details.lines.push(line = {
				main:  child.flexStyle.mainOuter,
				cross: child.flexStyle.crossOuter,
				children: []
			});
		}

		line.children.push(child);
	}

	details.flexStyle.mainLines = reduce(details.lines, function (mainLines, item) {
		return Math.max(mainLines, item.main);
	}, 0);

	details.flexStyle.crossLines = reduce(details.lines, function (crossLines, item) {
		return crossLines + item.cross;
	}, 0);

	if (details.flexStyle.main === 'auto') {
		details.flexStyle.main = Math.max(details.flexStyle.mainOffset, details.flexStyle.mainLines + details.flexStyle.mainInnerBefore + details.flexStyle.mainInnerAfter + details.flexStyle.mainBorderBefore + details.flexStyle.mainBorderAfter);
	}

	if (details.flexStyle.cross === 'auto') {
		details.flexStyle.cross = Math.max(details.flexStyle.crossOffset, details.flexStyle.crossLines + details.flexStyle.crossInnerBefore + details.flexStyle.crossInnerAfter + details.flexStyle.crossBorderBefore + details.flexStyle.crossBorderAfter);
	}

	details.flexStyle.crossSpace = details.flexStyle.cross - details.flexStyle.crossInnerBefore - details.flexStyle.crossInnerAfter - details.flexStyle.crossBorderBefore - details.flexStyle.crossBorderAfter - details.flexStyle.crossLines;

	details.flexStyle.mainOuter  = details.flexStyle.main  + details.flexStyle.mainBefore  + details.flexStyle.mainAfter;
	details.flexStyle.crossOuter = details.flexStyle.cross + details.flexStyle.crossBefore + details.flexStyle.crossAfter;
};
