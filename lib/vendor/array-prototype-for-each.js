if (!Array.prototype.forEach) {
	Array.prototype.forEach = function forEach(callback) {
		if (this === undefined || this === null) {
			throw new TypeError(this + 'is not an object');
		}

		if (!(callback instanceof Function)) {
			throw new TypeError(callback + ' is not a function');
		}

		var object = Object(this);
		var scope = arguments[1];
		var arraylike = object instanceof String ? object.split('') : object;
		var length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0;
		var index = -1;

		while (++index < length) {
			if (index in arraylike) {
				callback.call(scope, arraylike[index], index, object);
			}
		}
	};
}
