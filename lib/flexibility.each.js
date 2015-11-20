flexibility.each = function (node, callback) {
	var child = node.firstChild;

	while (child) {
		if (child.nodeType === 1) {
			callback(child);
		}

		child = child.nextSibling;
	}
};
