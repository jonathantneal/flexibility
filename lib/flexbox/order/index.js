var flexDirectionReverseMatch = /^(column|row)-reverse$/;

module.exports = function order(target) {
	target.children.sort(function (childA, childB) {
		return childA.style.order - childB.style.order || childA.index - childB.index;
	});

	if (flexDirectionReverseMatch.test(target.style.flexDirection)) {
		target.children.reverse();
	}
};
