module.exports = function marginCross(line) {
	var count = 0;

	line.children.forEach(function (child) {
		if (child.mainBefore === 'auto') {
			++count;
		}

		if (child.mainAfter === 'auto') {
			++count;
		}
	});

	if (count > 0) {
		line.children.forEach(function (child) {
			if (child.mainBefore === 'auto') {
				child.mainBefore = line.mainSpace / count;

				child.mainAround += child.mainBefore;
			}

			if (child.mainAfter === 'auto') {
				child.mainAfter = line.mainSpace / count;

				child.mainAround += child.mainAfter;
			}
		});

		line.mainSpace = 0;
	}
};
