module.exports = writeAll;

var write = require('../write');

// writeAll( detailsList ): Writes a list of flexbox details back to their respective elements.
function writeAll(detailsList) {
	var index = -1;
	var details;

	while (details = detailsList[++index]) {
		write(details);
	}
}
