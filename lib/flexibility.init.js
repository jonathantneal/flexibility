/*! flexibility v0.2.2 | MIT Licensed | github.com/10up/flexibility */

flexibility = {};

if (/MSIE [8-9]\./i.test(navigator.userAgent)) {
	document.attachEvent('onreadystatechange', function () {
		if (document.readyState === 'complete') {
			flexibility.process(document.body);
		}
	});
}
