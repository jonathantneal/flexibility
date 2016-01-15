var fs = require('fs');
var uglify = require('uglify-js').minify;

fs.writeFileSync('dist/flexibility.js', uglify([
	'/*! Flexibility 1.0.2 | MIT Licensed | github.com/10up/flexibility */\n',
	'(function () {',
	[
		'lib/core.js',
		'lib/vendor/array-prototype-for-each.js',
		'lib/vendor/css-layout.js',
		'lib/vendor/event-listener.js',
		'lib/detect.js',
		'lib/init.js',
		'lib/on-resize.js',
		'lib/update-flex-container-cache.js',
		'lib/update-flex-item-cache.js',
		'lib/update-length-cache.js',
		'lib/walk.js'
	].map(function (file) {
		return fs.readFileSync(file, 'utf8');
	}).join(''),
	'})()'
].join(''), {
	fromString: true
}).code, 'utf8');
