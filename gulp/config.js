var url = require('url');
var util = require('gulp-util');
var base = '.';
var dist = base + '/dist';

module.exports = {
	path: {
		dist: dist,
		gulp: base + '/gulp',
		src: base + '/src'
	},

	autoprefixer: {
		browsers: '> 5% in DE'
	},

	browserify: {
		// Enable source maps
		debug: true,
		// Require files without specifying extensions
		extensions: [ '.jade' ]
	},

	localhost: {
		server: {
			baseDir: dist,
			middleware: function (req, res, next) {
				if (url.parse(req.url).pathname.indexOf('.') === -1) {
					req.url = '/index.html';
				}
				next();
			}
		},
		https: false,
		open: false
	},

	sass: {
		indentedSyntax: true
	},

	lint: {
		cacheKey: 'lint',
		errorConverter: require('./util/error-converter'),
		errorNotifier: require('./util/error-notifier'),
		jscs: {
			configPath: base + '/.jscsrc'
		}
	},

	base: {
		logError: function (err) {
			util.log(err.message);
			this.emit('end');
		},
		throwError: function (err) {
			throw err;
		}
	}
};
