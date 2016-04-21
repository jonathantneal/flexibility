/*! Flexibility 2.0.0 | MIT Licensed | github.com/10up/flexibility */

module.exports = function flexibility(target) {
	var data1 = module.exports.walk(target);

	var data2 = module.exports.flexbox(data1);

	var data3 = module.exports.write(data2);

	return data3;
};

module.exports.flexbox = require('./flexbox');
module.exports.getFlexStyles = require('./getFlexStyles');
module.exports.walk = require('./walk');
module.exports.write = require('./write');

// module.exports.process = require('./process');
// module.exports.support = require('./support');
