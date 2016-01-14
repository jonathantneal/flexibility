flexibility.detect = function detect() {
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
