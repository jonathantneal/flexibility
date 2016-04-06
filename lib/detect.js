flexibility.detect = function detect() {
	var node = document.createElement('p');
	try {
		node.style.display = 'flex';
		return node.style.display === 'flex';
	} catch (error) {
		return false;
	}
};

if (!flexibility.detect() || ieVersion() <= 9) {
	document.attachEvent('onreadystatechange', function () {
		flexibility.onresize({
			target: document.documentElement
		});
	});
}

function ieVersion() {
	var msiePos
	return (msiePos = navigator.userAgent.indexOf('MSIE')) > -1 ?
		parseInt(navigator.userAgent.slice(msiePos + 5)) : false;
}
