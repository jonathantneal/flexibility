module.exports = function marginCross(line) {
	line.children.forEach(function (child) {
		var count = 0;

		if (child.crossBefore === 'auto') {
			++count;
		}

		if (child.crossAfter === 'auto') {
			++count;
		}

		var childSpace = line.cross - child.crossAround;

		if (child.crossBefore === 'auto') {
			child.crossBefore = childSpace / count;

			child.crossAround += child.crossBefore;
		}

		if (child.crossAfter === 'auto') {
			child.crossAfter = childSpace / count;

			child.crossAround += child.crossAfter;
		}
	});
};
