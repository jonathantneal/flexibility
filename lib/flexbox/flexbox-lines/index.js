module.exports = function flexboxLines(target) {
	var line;

	target.lines = [line = {
		main:  0,
		cross: 0,
		children: []
	}];

	target.children.forEach(function (child) {
		if (
			target.flexWrap === 'nowrap' ||
			line.children.length === 0 ||
			target.mainAround >= line.main + child.mainAround
		) {
			line.main += child.mainAround;
			line.cross = Math.max(line.cross, child.crossAround);
		} else {
			target.lines.push(line = {
				main:  child.mainAround,
				cross: child.crossAround,
				children: []
			});
		}

		line.children.push(child);
	});
};
