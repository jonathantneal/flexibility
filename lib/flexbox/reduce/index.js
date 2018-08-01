module.exports = reduce;

function reduce(arraylike, fn, previousValue) {
	var length = arraylike.length;
	var index = -1;
	var returnValue = previousValue

	while (++index < length) {
		if (index in arraylike) {
			returnValue = fn(returnValue, arraylike[index], index);
		}
	}

	return returnValue;
}
