module.exports = function process(target) {
	Array.prototype.filter.call(target.querySelectorAll('[data-flex]'), function (node) {
		// keep only display: flex | inline-flex nodes
		return /(^|;)\s*display\s*:\s*(inline-)?flex\s*(;|$)/i.test(node.getAttribute('data-flex'));
	}).map(function (node, index, nodes) {
		// return node with sorting data
		return {
			node: node,
			index: index,
			contains: nodes.filter(function (other) {
				return node !== other && node.contains(other);
			}).length
		};
	}).sort(function (node1, node2) {
		// sort nodes
		return node1.contains - node2.contains || node1.index - node2.index;
	}).forEach(function (item) {
		// process each node
		require('../write')(require('../flexbox')(require('../read')(item.node)));
	});
};
