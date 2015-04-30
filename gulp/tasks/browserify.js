var browserify = require('browserify');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var exorcist = require('exorcist');
var source = require('vinyl-source-stream');
var _ = require('lodash');

module.exports = function (gulp, config, $) {
	var prod = $.util.env.prod;

	gulp.task('browserify', [ 'clean', 'lint' ], function () {
		var bundle = function () {
			return app.bundle()
				.on('error', config.base[ prod ? 'throwError' : 'logError' ])
				.pipe(prod ? exorcist(config.path.dist + '/js/app.js.map') : $.util.noop())
				.pipe(source('app.js'))
				.pipe(gulp.dest(config.path.dist + '/js'))
				.pipe(browserSync.reload({ stream: true }));
		};

		var app = browserify(
			config.path.src + '/js/app.js',
			_.defaults(config.browserify, watchify.args)
		);

		app = watchify(app);
		app.on('update', bundle);

		return bundle();
	});
};
