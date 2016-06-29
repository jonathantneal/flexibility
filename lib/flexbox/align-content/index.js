module.exports = function alignContent(details) {
	var start;
	var factor;

	var index = -1;
	var line;

	if (details.lines.length > 1 && details.style.alignContent === 'flex-start') {
		start = 0;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross;
		}
	} else if (details.lines.length > 1 && details.style.alignContent === 'flex-end') {
		start = details.flexStyle.crossSpace;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross;
		}
	} else if (details.lines.length > 1 && details.style.alignContent === 'center') {
		start = details.flexStyle.crossSpace / 2;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross;
		}
	} else if (details.lines.length > 1 && details.style.alignContent === 'space-between') {
		factor = details.flexStyle.crossSpace / (details.lines.length - 1);
		start = 0;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross + factor;
		}
	} else if (details.lines.length > 1 && details.style.alignContent === 'space-around') {
		factor = details.flexStyle.crossSpace * 2 / (details.lines.length * 2);
		start = factor / 2;

		while (line = details.lines[++index]) {
			line.crossStart = start;

			start += line.cross + factor;
		}
	} else {
		factor = details.flexStyle.crossSpace / details.lines.length;
		start = details.flexStyle.crossInnerBefore;

		while (line = details.lines[++index]) {
			line.crossStart = start;
			line.cross += factor;

			start += line.cross;
		}
	}
};
