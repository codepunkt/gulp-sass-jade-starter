var reload = require('browser-sync').reload;

module.exports = function (gulp, config, $) {
	var sass = function () {
		var args = $.util.env.prod ? [ '.', { includeContent: true } ] : [];

		return $.rubySass(config.path.src + '/sass/app.sass', config.sass)
			.on('error', config.base.throwError)
			.pipe($.autoprefixer(config.autoprefixer))
			.pipe($.sourcemaps.write.apply(null, args))
			.pipe(gulp.dest(config.path.dist + '/css'))
			.pipe(reload({ stream: true }))
			.pipe($.util.env.prod ? $.filter('**/*.css') : $.util.noop());
	};

	gulp.task('sass', [ 'clean' ], sass);
	gulp.task('sass:watch', sass);
};
