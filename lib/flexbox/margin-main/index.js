module.exports = function marginMain(line) {
	var count = 0;

	var index = -1;
	var child;

	while (child = line.children[++index]) {
		if (child.flexStyle.mainBefore === 'auto') {
			++count;
		}

		if (child.flexStyle.mainAfter === 'auto') {
			++count;
		}
	}

	if (count > 0) {
		index = -1;

		while (child = line.children[++index]) {
			if (child.flexStyle.mainBefore === 'auto') {
				child.flexStyle.mainBefore = line.mainSpace / count;
			}

			if (child.flexStyle.mainAfter === 'auto') {
				child.flexStyle.mainAfter = line.mainSpace / count;
			}

			if (child.flexStyle.main === 'auto') {
				child.flexStyle.mainOuter = child.flexStyle.mainOffset + child.flexStyle.mainBefore + child.flexStyle.mainAfter;
			} else {
				child.flexStyle.mainOuter = child.flexStyle.main + child.flexStyle.mainBefore + child.flexStyle.mainAfter;
			}
		}

		line.mainSpace = 0;
	}
};
