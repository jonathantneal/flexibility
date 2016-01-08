flexibility.properties = function (target) {
	var style  = target.onlayoutcomplete = target.onlayoutcomplete || {};
	var getCSS = target.currentStyle || {};

	// var cssFlex     = (getCSS.flex || '0 1 auto').split(/\s+/);
	// var cssFlexFlow = (getCSS['flex-flow'] || 'row nowrap').split(/\s+/);

	style.boxSizing = getCSS.boxSizing || 'content-box';
	style.display   = getCSS['-js-display'] || getCSS.display;

	var settings = {
		alignContent: {
			initial: 'stretch',
			valid:   /^(flex-start|flex-end|center|space-between|space-around|stretch)/
		},
		alignItems: {
			initial: 'stretch',
			valid:   /^(flex-start|flex-end|center|baseline|stretch)$/
		},
		alignSelf: {
			initial: 'auto',
			valid:   /^(auto|flex-start|flex-end|center|baseline|stretch)$/
		},
		flexBasis: {
			initial: 'auto',
			valid:   /^((?:[-+]?0|[-+]?[0-9]*\.?[0-9]+(?:%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))|auto|fill|max-content|min-content|fit-content|content)$/
		},
		flexDirection: {
			initial: 'row',
			valid:   /^(row|row-reverse|column|column-reverse)$/
		},
		flexGrow: {
			initial: '0',
			valid:   /^\+?(0|[1-9][0-9]*)$/
		},
		flexShrink: {
			initial: '0',
			valid:   /^\+?(0|[1-9][0-9]*)$/
		},
		flexWrap: {
			initial: 'nowrap',
			valid:   /^(nowrap|wrap|wrap-reverse)$/
		},
		justifyContent: {
			initial: 'flex-start',
			valid:   /^(flex-start|flex-end|center|space-between|space-around)$/
		},
		order: {
			initial: '0',
			valid:   /^([-+]?[0-9]+)$/
		}
	};

	for (var key in settings) {
		var value = (getCSS[key.replace(/[A-Z]/g, '-$&').toLowerCase()] || '').toLowerCase();

		style[key] = settings[key].valid.test(value) ? value : settings[key].initial;
	}
};
