/*! Flexibility 2.0.0 | MIT Licensed | github.com/jonathantneal/flexibility */

var read  = require('./read');
var write = require('./write');

var readAll  = require('./readAll');
var writeAll = require('./writeAll');

module.exports = flexibility;

module.exports.read  = read;
module.exports.write = write;

module.exports.readAll  = readAll;
module.exports.writeAll = writeAll;

function flexibility(target) {
	writeAll(readAll(target));
}
