module.exports = function (gulp, config, $) {
	gulp.task('uglify', [ 'browserify' ], function () {
		return gulp.src(config.path.dist + '/js/*.js')
			// load existing source maps
			.pipe($.sourcemaps.init({ loadMaps: true }))
			// minify them
			.pipe($.uglify())
			// write minified file and sourcemap to disk
			.pipe($.sourcemaps.write())
			.pipe(gulp.dest(config.path.dist + '/js'));
	});
};
