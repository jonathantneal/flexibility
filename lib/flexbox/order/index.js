module.exports = function order(target) {
	target.children.sort(function (childA, childB) {
		return childA.order - childB.order || childA.index - childB.index;
	});
};
