module.exports = function flexbox(target) {
	target.descendants.forEach(function (descendant) {
		module.exports(descendant);
	});

	if (target.display === 'flex') {
		target.children.forEach(function (child) {
			require('./flex-direction')(child, target.flexDirection, target.alignItems);
		});
	} else {
		return target;
	}

	require('./order')(target);
	require('./flex-direction')(target, target.flexDirection, target.alignItems);
	require('./flexbox-lines')(target);

	if (target.main === 'auto') {
		target.main = Math.max(target.mainAround, target.lines.reduce(function (main, line) {
			return Math.max(main, line.main);
		}, 0));

		if (target.flexDirection === 'row') {
			target.mainAround = target.mainClient + target.mainBefore + target.mainAfter;
		} else {
			target.mainAround = target.main + target.mainBefore + target.mainAfter;
		}
	}

	if (target.cross === 'auto') {
		target.cross = target.lines.reduce(function (cross, line) {
			return cross + line.cross;
		}, 0);

		if (target.flexDirection === 'column') {
			target.crossAround = target.crossClient + target.crossBefore + target.crossAfter;
		} else {
			target.crossAround = target.cross + target.crossBefore + target.crossAfter;
		}

		target.crossSpace = target.crossAround - target.cross;
	} else {
		target.crossSpace = target.cross - target.lines.reduce(function (cross, line) {
			return cross + line.cross;
		}, 0);
	}

	require('./align-content')(target);

	target.lines.forEach(function (line) {
		line.mainSpace = target.main - line.main;

		require('./flex-grow')(line);
		require('./flex-shrink')(line);
		require('./margin-main')(line);
		require('./margin-cross')(line);
		require('./justify-content')(line, target.justifyContent);
	});

	require('./align-items')(target);

	return target;
};
