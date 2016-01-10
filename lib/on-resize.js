// define delay
var SECOND = 1000;
var FRAMES_PER_SECOND = 15;

flexibility.onresize = function resize(event) {
	// remove resize listener
	window.removeEventListener('resize', flexibility.onresize);

	// get resize target
	var target = event.target && event.target.nodeType === 1 ? event.target : document.documentElement;

	// walk resize target
	flexibility.walk(target);

	// force layout
	if (target.offsetWidth || true) {
		// restore resize listener after a delay
		setTimeout(function () {
			window.addEventListener('resize', flexibility.onresize);
		}, SECOND / FRAMES_PER_SECOND);
	}
};
