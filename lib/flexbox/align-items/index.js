module.exports = function alignItems(target) {
	target.lines.forEach(function (line) {
		line.children.forEach(function (child) {
			if (child.alignSelf === 'flex-start') {
				child.crossStart = line.crossStart;
			} else if (child.alignSelf === 'flex-end') {
				child.crossStart = line.crossStart + line.cross - child.crossAround;
			} else if (child.alignSelf === 'center') {
				child.crossStart = line.crossStart + (line.cross - child.crossAround) / 2;
			} else if (child.alignSelf === 'stretch') {
				child.crossStart = line.crossStart;
				child.crossAround = line.cross;
			}
		});
	});
};
