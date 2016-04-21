module.exports = function write(target) {
	target.descendants.filter(function (descendant) {
		return target.children.indexOf(descendant) === -1;
	}).forEach(function (descendant) {
		module.exports(descendant);
	});

	if (!target.display) {
		return;
	}

	var style = target.node.style;

	if ('mainStart' in target) {
		style.position = 'absolute';

		if (target.mainAxis === 'inline') {
			style.left = target.mainStart  + 'px';
			style.top  = target.crossStart + 'px';

			style.marginTop    = target.crossBefore + 'px';
			style.marginRight  = target.mainAfter   + 'px';
			style.marginBottom = target.crossAfter  + 'px';
			style.marginLeft   = target.mainBefore  + 'px';
		} else {
			style.left = target.crossStart + 'px';
			style.top  = target.mainStart  + 'px';

			style.marginTop    = target.mainBefore  + 'px';
			style.marginRight  = target.crossAfter  + 'px';
			style.marginBottom = target.mainAfter   + 'px';
			style.marginLeft   = target.crossBefore + 'px';
		}

		if (target.mainAxis === 'inline') {
			style.width  = target.mainAround  - target.mainBefore - target.mainAfter + 'px';
			style.height = target.crossAround - target.crossBefore - target.crossAfter + 'px';
		} else {
			if (target.cross === 'auto') {
				style.width = target.crossClient - target.crossBefore - target.crossAfter + 'px';
			} else {
				style.width = target.crossAround - target.crossBefore - target.crossAfter + 'px';
			}

			if (target.main === 'auto') {
				style.height = target.mainClient - target.mainBefore - target.mainAfter + 'px';
			} else {
				style.height = target.mainAround - target.mainBefore - target.mainAfter + 'px';
			}
		}
	} else {
		if (!style.position) {
			style.position = 'relative';
		}

		if (target.mainAxis === 'inline') {
			style.width = target.mainAround - target.mainBefore - target.mainAfter + 'px';
			style.height = target.crossAround - target.crossBefore - target.crossAfter + 'px';
		} else {
			style.width = target.crossAround - target.crossBefore - target.crossAfter + 'px';
			style.height = target.mainAround - target.mainBefore - target.mainAfter + 'px';
		}
	}

	if (target.children) {
		target.children.forEach(function (child) {
			module.exports(child);
		});
	}
};
