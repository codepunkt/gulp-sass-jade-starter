module.exports = function (gulp, config, $) {
	gulp.task('lint', function () {
		var sources = [
			config.path.src + '/**/*.js',
			config.path.gulp + '/**/*.js'
		];

		return gulp.src(sources)
			// run on changed files only
			.pipe($.cached(config.lint.cacheKey))
			// run jshint
			.pipe($.jshint())
			// run jscs, break on errors in production
			.pipe($.jscs(config.lint.jscs))
			.on('error', $.util.env.prod ? config.base.throwError : $.util.noop)
			// add jscs errors to jshint errors
			.pipe($.jscsStylish())
			// show errors on console and as notification
			.pipe($.jshint.reporter('jshint-stylish'))
			.pipe($.tap(config.lint.errorNotifier))
			// break on jshint errors in production
			.pipe($.util.env.prod ? $.jshint.reporter('fail') : $.util.noop());
	});
};
