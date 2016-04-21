module.exports = function justifyContent(line, targetJustifyContent) {
	var start;
	var factor;

	if (targetJustifyContent === 'flex-start') {
		start = 0;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround;
		});
	} else if (targetJustifyContent === 'flex-end') {
		start = line.mainSpace;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround;
		});
	} else if (targetJustifyContent === 'center') {
		start = line.mainSpace / 2;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround;
		});
	} else if (targetJustifyContent === 'space-between') {
		factor = line.mainSpace / (line.children.length - 1);

		start = 0;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround + factor;
		});
	} else if (targetJustifyContent === 'space-around') {
		factor = line.mainSpace * 2 / (line.children.length * 2);
		start = factor / 2;

		line.children.forEach(function (child) {
			child.mainStart = start;

			start += child.mainAround + factor;
		});
	}
};
