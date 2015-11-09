/*! flexibility v1.0.0 | GPL2 Licensed | github.com/10up/flexibility */

flexibility = {};

if (/MSIE [8-9]\./i.test(navigator.userAgent)) {
	document.attachEvent('onreadystatechange', function () {
		if (document.readyState === 'complete') {
			flexibility.process(document.body);
		}
	});
}
