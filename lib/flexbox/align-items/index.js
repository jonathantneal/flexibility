module.exports = function alignItems(details) {
	var indexA = -1;
	var indexB;

	while (line = details.lines[++indexA]) {
		indexB = -1;

		while (child = line.children[++indexB]) {
			var alignSelf = child.style.alignSelf;

			if (alignSelf === 'auto') {
				alignSelf = details.style.alignItems;
			}

			if (alignSelf === 'flex-start') {
				child.flexStyle.crossStart = line.crossStart;
			} else if (alignSelf === 'flex-end') {
				child.flexStyle.crossStart = line.crossStart + line.cross - child.flexStyle.crossOuter;
			} else if (alignSelf === 'center') {
				child.flexStyle.crossStart = line.crossStart + (line.cross - child.flexStyle.crossOuter) / 2;
			} else {
				child.flexStyle.crossStart = line.crossStart;
				child.flexStyle.crossOuter = line.cross;

				child.flexStyle.cross = child.flexStyle.crossOuter - child.flexStyle.crossBefore - child.flexStyle.crossAfter;
			}
		}
	}
};
