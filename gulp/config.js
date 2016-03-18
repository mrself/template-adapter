var src = './src/';
var build = './server/';
var bourbon = require('node-bourbon');

module.exports = {
	browserify: {
		bundleConfigs: [{
			entries: src + 'js/app.js',
			dest: build + 'js',
			outputName: 'app.min.js'
		}]
	},
	css: {
		settings: {
			style: 'compressed',
			errLogToConsole: true,
			includePaths: [
				bourbon.includePaths
			]
		},
		dest: build + 'css/',
		src: src + 'scss/**/*.scss'
	},

	browserSync: {
		name: 'server',
		dir: './server'
	}
};