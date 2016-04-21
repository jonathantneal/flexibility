module.exports = function alignContent(target) {
	var start;
	var factor;

	if (target.lines.length < 2 || target.alignContent === 'stretch') {
		factor = target.crossSpace / target.lines.length;
		start = 0;

		target.lines.forEach(function (line) {
			line.crossStart = start;
			line.cross += factor;

			start += line.cross;
		});
	} else if (target.alignContent === 'flex-start') {
		start = 0;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross;
		});
	} else if (target.alignContent === 'flex-end') {
		start = target.crossSpace;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross;
		});
	} else if (target.alignContent === 'center') {
		start = target.crossSpace / 2;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross;
		});
	} else if (target.alignContent === 'space-between') {
		factor = target.crossSpace / (target.lines.length - 1);
		start = 0;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross + factor;
		});
	} else if (target.alignContent === 'space-around') {
		factor = target.crossSpace * 2 / (target.lines.length * 2);
		start = factor / 2;

		target.lines.forEach(function (line) {
			line.crossStart = start;

			start += line.cross + factor;
		});
	} else if (target.alignContent === 'stretch') {
		factor = target.crossSpace / target.lines.length;
		start = 0;

		target.lines.forEach(function (line) {
			line.crossStart = start;
			line.cross += factor;

			start += line.cross;
		});
	}
};
