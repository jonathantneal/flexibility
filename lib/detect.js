flexibility.detect = function detect() {
	// detects IE9 and lower even in compatibility mode
	/*eslint no-magic-numbers: ["error", { "ignore": [-1, 5, 9] }]*/
	var msiePos = navigator.userAgent.indexOf('MSIE')
	if (msiePos > -1) {
		var msieVersion = parseInt(navigator.userAgent.slice(msiePos + 5))
		if (msieVersion <= 9)
			return false
	}

	var node = document.createElement('p');

	try {
		node.style.display = 'flex';

		return node.style.display === 'flex';
	} catch (error) {
		return false;
	}
};

if (!flexibility.detect() && document.attachEvent && document.documentElement.currentStyle) {
	document.attachEvent('onreadystatechange', function () {
		flexibility.onresize({
			target: document.documentElement
		});
	});
}
