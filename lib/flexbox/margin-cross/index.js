module.exports = function marginCross(line) {
	var index = -1;
	var child;

	while (child = line.children[++index]) {
		var count = 0;

		if (child.flexStyle.crossBefore === 'auto') {
			++count;
		}

		if (child.flexStyle.crossAfter === 'auto') {
			++count;
		}

		var childSpace = line.cross - child.flexStyle.crossOuter;

		if (child.flexStyle.crossBefore === 'auto') {
			child.flexStyle.crossBefore = childSpace / count;
		}

		if (child.flexStyle.crossAfter === 'auto') {
			child.flexStyle.crossAfter = childSpace / count;
		}

		if (child.flexStyle.cross === 'auto') {
			child.flexStyle.crossOuter = child.flexStyle.crossOffset + child.flexStyle.crossBefore + child.flexStyle.crossAfter;
		} else {
			child.flexStyle.crossOuter = child.flexStyle.cross + child.flexStyle.crossBefore + child.flexStyle.crossAfter;
		}
	}
};
