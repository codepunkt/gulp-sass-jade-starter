module.exports = function (gulp, config, $) {
	var prod = $.util.env.prod;

	gulp.task('default', [ prod ? 'jade' : 'watch' ], function (callback) {
		if (prod) {
			gulp.src('/')
				.pipe($.notify({
					title: 'Task Builder',
					message: 'Successfully built application'
				}))
				.pipe(prod ? $.exit() : $.util.noop());
		}
		callback();
	});
};
