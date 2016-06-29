document.createElement('section');

function test(name) {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'shared/' + name + '.html?' + new Date().getTime());

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			var frag = document.createDocumentFragment();
			var html = frag.appendChild(document.createElement('x'));

			if (frag.createElement) {
				frag.createElement('section');
			}

			html.innerHTML = xhr.responseText;

			while (html.childNodes.length) {
				frag.appendChild(html.firstChild);
			}

			frag.removeChild(html);

			document.body.appendChild(frag);

			flexibility(document.body);
		}
	}

	xhr.send();
}

function control(name) {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'shared/' + name + '.html?' + new Date().getTime());

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			var frag = document.createDocumentFragment();
			var html = frag.appendChild(document.createElement('x'));

			if (frag.createElement) {
				frag.createElement('section');
			}

			html.innerHTML = xhr.responseText.replace(/data-style/g, 'data-style style');

			while (html.childNodes.length) {
				frag.appendChild(html.firstChild);
			}

			frag.removeChild(html);

			document.body.appendChild(frag);
		}
	}

	xhr.send();
}

function editableTest(name) {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'shared/' + name + '.html?' + new Date().getTime());

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			var frag = document.createDocumentFragment();
			var html = frag.appendChild(document.createElement('x'));

			if (frag.createElement) {
				frag.createElement('section');
			}

			html.innerHTML = xhr.responseText;

			while (html.childNodes.length) {
				frag.appendChild(html.firstChild);
			}

			frag.removeChild(html);

			document.body.appendChild(frag);

			var container = document.getElementById('container');

			var textarea  = document.createElement('textarea');

			textarea.setAttribute('style', 'font-family:monospace,monospace;font-size:100%');
			textarea.setAttribute('cols', 40);
			textarea.setAttribute('rows', 8);
			textarea.value = container.getAttribute('data-style').replace(/;\s*/g, ';\n');

			document.body.appendChild(textarea);

			var onresizeTimeout;

			function onresize() {
				window.onresize = null;
				textarea.onkeyup = null;

				if (!onresizeTimeout) {
					onresizeTimeout = setTimeout(function () {
						onresizeTimeout = null;

						var index = -1;
						var elements = container.querySelectorAll('[style]');
						var element;

						while (element = elements[++index]) {
							element.removeAttribute('style');
						}

						var style = textarea.value.replace(/\s+/, ' ');

						container.setAttribute('style', style);
						container.setAttribute('data-style', style);

						try {
							flexibility(container);
						} catch (error) {}

						window.onresize = onresize;
						textarea.onkeyup = onresize;
					}, 67);
				}
			}

			onresize();
		}
	}

	xhr.send();
}
