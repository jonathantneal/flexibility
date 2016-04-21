var browserify = require('browserify');
var fs = require('fs');

browserify('./lib/index.js', {
	standalone: 'flexibility'
}).pipe(
	fs.createWriteStream('flexibility.js')
);
