var reduce = require('../reduce');

module.exports = function flexShrink(line) {
	if (line.mainSpace < 0) {
		var shrinkFactor = reduce(line.children, function (lastShrinkFactor, child) {
			return lastShrinkFactor + parseFloat(child.style.flexShrink);
		}, 0);

		if (shrinkFactor > 0) {
			line.main = reduce(line.children, function (main, child) {
				child.flexStyle.main += parseFloat(child.style.flexShrink) / shrinkFactor * line.mainSpace;

				child.flexStyle.mainOuter = child.flexStyle.main + child.flexStyle.mainBefore + child.flexStyle.mainAfter;

				return main + child.flexStyle.mainOuter;
			}, 0);

			line.mainSpace = 0;
		}
	}
};
