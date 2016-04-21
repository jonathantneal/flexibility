module.exports = function getFlexStyles(target, data, isFlexChild) {
	var style = Object.assign(data, {
		alignContent: 'stretch',
		alignItems: 'stretch',
		alignSelf: 'auto',
		display: 'inline',
		flexBasis: 'auto',
		flexDirection: 'row',
		flexGrow:   0,
		flexShrink: 1,
		flexWrap: 'nowrap',
		justifyContent: 'flex-start',
		height: 'auto',
		marginTop:    0,
		marginRight:  0,
		marginLeft:   0,
		marginBottom: 0,
		maxHeight: 'none',
		maxWidth: 'none',
		minHeight: 0,
		minWidth: 0,
		order: 0,
		position: 'static',
		width: 'auto'
	});

	if (target.hasAttribute('data-style')) {
		target.setAttribute('style', target.getAttribute('data-style'));
	} else {
		target.setAttribute('data-style', target.getAttribute('style') || '');
	}

	var attr = (target.getAttribute('data-style') || '') + ';' + (target.getAttribute('data-flex') || '');
	var re = /([^\s:;]+)\s*:\s*([^;]+?)\s*(;|$)/g;
	var decl;

	while (decl = re.exec(attr)) {
		var name = decl[1].toLowerCase().replace(/-[a-z]/g, function (match) {
			return match.slice(1).toUpperCase();
		});

		style[name] = parseFloat(decl[2]);

		if (isNaN(style[name])) {
			style[name] = decl[2];
		}
	}

	if (isFlexChild) {
		target.style.display  = 'inline-block';
		target.style.position = 'absolute';
	}

	var rect = target.getBoundingClientRect();

	style.clientWidth  = rect.width || target.offsetWidth;
	style.clientHeight = rect.height || target.offsetHeight;

	return style;
};
