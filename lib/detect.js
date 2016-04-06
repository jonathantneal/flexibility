flexibility.detect = function detect() {
	// detects IE9 and lower even in compatibility mode
	var msiePos
	if ((msiePos = navigator.userAgent.indexOf('MSIE')) > -1 &&
		parseInt(navigator.userAgent.slice(msiePos + 5)) <= 9) {
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
