module.exports = function justifyContent(line, targetJustifyContent, details) {
	var start;
	var factor;

	var inset = details.flexStyle.mainInnerBefore;

	var index = -1;
	var child;

	if (targetJustifyContent === 'flex-end') {
		start = line.mainSpace;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter;
		}
	} else if (targetJustifyContent === 'center') {
		start = line.mainSpace / 2;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter;
		}
	} else if (targetJustifyContent === 'space-between') {
		factor = line.mainSpace / (line.children.length - 1);

		start = 0;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter + factor;
		}
	} else if (targetJustifyContent === 'space-around') {
		factor = line.mainSpace * 2 / (line.children.length * 2);
		start = factor / 2;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter + factor;
		}
	} else {
		start = 0;

		start += inset;

		while (child = line.children[++index]) {
			child.flexStyle.mainStart = start;

			start += child.flexStyle.mainOuter;
		}
	}
};
