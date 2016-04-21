module.exports = function flexDirection(target, targetFlexDirection, targetAlignItems) {
	var clientRect = target.node.getBoundingClientRect();

	if (targetFlexDirection === 'row' || targetFlexDirection === 'row-reverse') {
		target.mainAxis  = 'inline';
		target.crossAxis = 'block';

		if (typeof target.main === 'number' || typeof target.cross === 'number') {
			if (target.flexDirection === 'row' || targetFlexDirection === 'row-reverse') {
				target.width  = target.main;
				target.height = target.cross;
			} else {
				target.width  = target.cross;
				target.height = target.main;
			}
		}

		target.main  = target.width;
		target.cross = target.height;

		target.mainClient  = clientRect.width  || target.node.offsetWidth;
		target.crossClient = clientRect.height || target.node.offsetHeight;

		target.mainBefore  = target.marginLeft;
		target.mainAfter   = target.marginRight;
		target.crossBefore = target.marginTop;
		target.crossAfter  = target.marginBottom;
	} else {
		target.mainAxis  = 'block';
		target.crossAxis = 'inline';

		target.main  = target.height;
		target.cross = target.width;

		if (typeof target.main === 'number' || typeof target.cross === 'number') {
			if (target.flexDirection === 'column' || targetFlexDirection === 'column-reverse') {
				target.width  = target.cross;
				target.height = target.main;
			} else {
				target.width  = target.main;
				target.height = target.cross;
			}
		}

		target.mainClient  = clientRect.height || target.node.offsetHeight;
		target.crossClient = clientRect.width  || target.node.offsetWidth;

		target.mainBefore  = target.marginTop;
		target.mainAfter   = target.marginBottom;
		target.crossBefore = target.marginLeft;
		target.crossAfter  = target.marginRight;
	}

	if (typeof target.flexBasis === 'number') {
		target.main = target.flexBasis;
	}

	if (target.main === 'auto') {
		target.mainAround = target.mainClient;
	} else {
		target.mainAround = target.main;
	}

	if (target.cross === 'auto') {
		target.crossAround = target.crossClient;
	} else {
		target.crossAround = target.cross;
	}

	if (typeof target.mainBefore === 'number') {
		target.mainAround += target.mainBefore;
	}

	if (typeof target.mainAfter === 'number') {
		target.mainAround += target.mainAfter;
	}

	if (typeof target.crossBefore === 'number') {
		target.crossAround += target.crossBefore;
	}

	if (typeof target.crossBefore === 'number') {
		target.crossAround += target.crossBefore;
	}

	if (target.alignSelf === 'auto') {
		target.alignSelf = targetAlignItems;
	}
};
