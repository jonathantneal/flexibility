flexibility.process = function (target) {
	if (target.nodeType !== 1) return;

	var setCSS  = target.runtimeStyle;

	flexibility.properties(target);
	flexibility.properties(target.parentElement);

	var tfCSS = target.onlayoutcomplete;
	var pfCSS = target.parentElement.onlayoutcomplete;
	var tFlex = /flex$/.test(tfCSS.display) && tfCSS.display;
	var pFlex = /flex$/.test(pfCSS.display) && pfCSS.display;

	if (tFlex && !pFlex) {
		setCSS.display = 'inline-block';
		setCSS.verticalAlign = 'top';

		if (tFlex === 'flex') {
			setCSS.display = 'block';
		}

		setCSS.width = target.offsetWidth + 'px';
	}

	var index = -1;
	var children = target.childNodes;
	var child;

	while (child = children[++index]) {
		if (child.nodeType !== 1) {
			if (child.nodeType === 3) {
				child.nodeValue = child.nodeValue.replace(/^\s+|\s+$/g, '');
			}

			continue;
		}

		if (tFlex) {
			var old = child;

			target.replaceChild(child = flexibility.process.clone(child), old);

			var childSetCSS = child.runtimeStyle;

			childSetCSS.display = 'inline-block';
			childSetCSS.verticalAlign = 'top';
			childSetCSS.width = child.offsetWidth + 'px';
		}

		flexibility.process(child);
	}

	if (tFlex) {
		flexibility.measure(target);
		flexibility.transform(target);
	}
};

flexibility.process.clone = function (target) {
	var clone = document.createElement(target.nodeName);
	var attrs = target.attributes;
	var index = -1;
	var attr;

	while (attr = attrs[++index]) {
		var attrc = document.createAttribute(attr.name);

		attrc.value = attr.value;

		clone.setAttributeNode(attrc);
	}

	while (target.lastChild) {
		clone.appendChild(target.firstChild);
	}

	return clone;
};
