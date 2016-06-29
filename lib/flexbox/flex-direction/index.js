module.exports = function flexDirection(target, flexDirection) {
	var isInline = flexDirection === 'row' || flexDirection === 'row-reverse';
	var existingAxis = target.mainAxis;

	if (existingAxis) {
		var isMatchingInline = isInline && existingAxis === 'inline' || !isInline && existingAxis === 'block';

		if (!isMatchingInline) {
			target.flexStyle = {
				main:  target.flexStyle.cross,
				cross: target.flexStyle.main,

				mainOffset:  target.flexStyle.crossOffset,
				crossOffset: target.flexStyle.mainOffset,

				mainBefore:  target.flexStyle.crossBefore,
				mainAfter:   target.flexStyle.crossAfter,
				crossBefore: target.flexStyle.mainBefore,
				crossAfter:  target.flexStyle.mainAfter,

				mainInnerBefore:  target.flexStyle.crossInnerBefore,
				mainInnerAfter:   target.flexStyle.crossInnerAfter,
				crossInnerBefore: target.flexStyle.mainInnerBefore,
				crossInnerAfter:  target.flexStyle.mainInnerAfter,

				mainBorderBefore:  target.flexStyle.crossBorderBefore,
				mainBorderAfter:   target.flexStyle.crossBorderAfter,
				crossBorderBefore: target.flexStyle.mainBorderBefore,
				crossBorderAfter:  target.flexStyle.mainBorderAfter
			};
		}
	} else {
		if (isInline) {
			target.flexStyle = {
				main:  target.style.width,
				cross: target.style.height,

				mainOffset:  target.style.offsetWidth,
				crossOffset: target.style.offsetHeight,

				mainBefore:  target.style.marginLeft,
				mainAfter:   target.style.marginRight,
				crossBefore: target.style.marginTop,
				crossAfter:  target.style.marginBottom,

				mainInnerBefore:  target.style.paddingLeft,
				mainInnerAfter:   target.style.paddingRight,
				crossInnerBefore: target.style.paddingTop,
				crossInnerAfter:  target.style.paddingBottom,

				mainBorderBefore:  target.style.borderLeftWidth,
				mainBorderAfter:   target.style.borderRightWidth,
				crossBorderBefore: target.style.borderTopWidth,
				crossBorderAfter:  target.style.borderBottomWidth
			};
		} else {
			target.flexStyle = {
				main:  target.style.height,
				cross: target.style.width,

				mainOffset:  target.style.offsetHeight,
				crossOffset: target.style.offsetWidth,

				mainBefore:  target.style.marginTop,
				mainAfter:   target.style.marginBottom,
				crossBefore: target.style.marginLeft,
				crossAfter:  target.style.marginRight,

				mainInnerBefore:  target.style.paddingTop,
				mainInnerAfter:   target.style.paddingBottom,
				crossInnerBefore: target.style.paddingLeft,
				crossInnerAfter:  target.style.paddingRight,

				mainBorderBefore:  target.style.borderTopWidth,
				mainBorderAfter:   target.style.borderBottomWidth,
				crossBorderBefore: target.style.borderLeftWidth,
				crossBorderAfter:  target.style.borderRightWidth
			};
		}

		if (target.style.boxSizing === 'content-box') {
			if (typeof target.flexStyle.main === 'number') {
				target.flexStyle.main += target.flexStyle.mainInnerBefore + target.flexStyle.mainInnerAfter + target.flexStyle.mainBorderBefore + target.flexStyle.mainBorderAfter;
			}

			if (typeof target.flexStyle.cross === 'number') {
				target.flexStyle.cross += target.flexStyle.crossInnerBefore + target.flexStyle.crossInnerAfter + target.flexStyle.crossBorderBefore + target.flexStyle.crossBorderAfter;
			}
		}
	}

	target.mainAxis  = isInline ? 'inline' : 'block';
	target.crossAxis = isInline ? 'block' : 'inline';

	if (typeof target.style.flexBasis === 'number') {
		target.flexStyle.main = target.style.flexBasis + target.flexStyle.mainInnerBefore + target.flexStyle.mainInnerAfter + target.flexStyle.mainBorderBefore + target.flexStyle.mainBorderAfter;
	}

	target.flexStyle.mainOuter  = target.flexStyle.main;
	target.flexStyle.crossOuter = target.flexStyle.cross;

	if (target.flexStyle.mainOuter === 'auto') {
		target.flexStyle.mainOuter = target.flexStyle.mainOffset;
	}

	if (target.flexStyle.crossOuter === 'auto') {
		target.flexStyle.crossOuter = target.flexStyle.crossOffset;
	}

	if (typeof target.flexStyle.mainBefore === 'number') {
		target.flexStyle.mainOuter += target.flexStyle.mainBefore;
	}

	if (typeof target.flexStyle.mainAfter === 'number') {
		target.flexStyle.mainOuter += target.flexStyle.mainAfter;
	}

	if (typeof target.flexStyle.crossBefore === 'number') {
		target.flexStyle.crossOuter += target.flexStyle.crossBefore;
	}

	if (typeof target.flexStyle.crossAfter === 'number') {
		target.flexStyle.crossOuter += target.flexStyle.crossAfter;
	}
};
