module.exports = function flexShrink(line) {
	if (line.mainSpace < 0) {
		var shrinkFactor = line.children.reduce(function (lastShrinkFactor, child) {
			return lastShrinkFactor + child.flexShrink;
		}, 0);

		if (shrinkFactor > 0) {
			line.children.forEach(function (child) {
				child.mainAround += child.flexShrink / shrinkFactor * line.mainSpace;
			});

			line.main = line.children.reduce(function (main, child) {
				return main + child.mainAround;
			}, 0);

			line.mainSpace = 0;
		}
	}
};
