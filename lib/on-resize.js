// define delay
var SECOND = 1000;
var FRAMES_PER_SECOND = 15;
var VIEWPORT_ELEMENT = document.documentElement;
var VIEWPORT_WIDTH = 0;
var TIMEOUT;

flexibility.onresize = function resize(event) {
	// if the screen width has changed
	if (VIEWPORT_ELEMENT.clientWidth !== VIEWPORT_WIDTH) {
		// update the cached screen width
		VIEWPORT_WIDTH = VIEWPORT_ELEMENT.clientWidth;

		// clear existing timeouts
		clearTimeout(TIMEOUT);

		// remove resize listener
		window.removeEventListener('resize', flexibility.onresize);

		// get resize target
		var target = event.target && event.target.nodeType === 1 ? event.target : document.documentElement;

		// walk resize target
		flexibility.walk(target);

		// restore resize listener
		TIMEOUT = setTimeout(function () {
			window.addEventListener('resize', flexibility.onresize);
		}, SECOND / FRAMES_PER_SECOND);
	}
};
