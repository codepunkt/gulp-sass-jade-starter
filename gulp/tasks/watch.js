module.exports = function (gulp, config, $) {
	// Watch files to rebuild on changes.
	// watching js files for recompilation with browserify is done by watchify
	gulp.task('watch', [ 'localhost' ], function () {
		gulp.watch([
			config.path.src + '/*.jade'
		], [ 'jade:watch' ]);

		gulp.watch([
			config.path.src + '/sass/**/*.sass'
		], [ 'sass:watch' ]);

		gulp.watch([
			config.path.src + '/**/*.js',
			config.path.gulp + '/**/*.js'
		], [ 'lint' ]);
	});
};
