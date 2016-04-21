module.exports = function flexGrow(line) {
	if (line.mainSpace > 0) {
		var growFactor = line.children.reduce(function (lastGrowFactor, child) {
			return lastGrowFactor + child.flexGrow;
		}, 0);

		if (growFactor > 0) {
			line.children.forEach(function (child) {
				child.mainAround += child.flexGrow / growFactor * line.mainSpace;
			});

			line.main = line.children.reduce(function (main, child) {
				return main + child.mainAround;
			}, 0);

			line.mainSpace = 0;
		}
	}
};
