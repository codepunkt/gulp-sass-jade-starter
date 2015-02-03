module.exports = function (gulp, config, $) {
	gulp.task('imagemin', [ 'clean' ], function () {
		return gulp.src(config.path.src + '/images/*')
			.pipe($.util.env.prod ? $.imagemin() : $.util.noop())
			.pipe(gulp.dest(config.path.dist + '/images'));
	});
};
