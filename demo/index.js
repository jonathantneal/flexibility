var SELECTS = [];
var DETECT = flexibility.detect();
var DEMO_ELEMENT;

document.addEventListener('readystatechange', onreadystatechange);

function onreadystatechange() {
	DEMO_ELEMENT = document.getElementById('demo');

	Array.prototype.forEach.call(document.querySelectorAll('select'), function (select) {
		SELECTS.push(select);

		select.addEventListener('change', onchange);
	});
}

function onchange() {
	SELECTS.forEach(function (options) {
		var key = options.name;
		var value = options.options[options.selectedIndex].value;

		DEMO_ELEMENT.style[key] = value;
	});

	if (!DETECT) {
		flexibility.onresize({
			target: DEMO_ELEMENT
		});
	}
}
