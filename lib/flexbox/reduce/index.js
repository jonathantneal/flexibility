module.exports = reduce;

function reduce(arraylike, callback, previousValue) {
	var length = arraylike.length;
	var index = -1;

	while (++index < length) {
		if (index in arraylike) {
			previousValue = callback(previousValue, arraylike[index], index);
		}
	}

	return previousValue;
}
