var browserSync = require('browser-sync');

module.exports = function (gulp, config, $) {
	gulp.task('localhost', [
		'jade',
		'sass',
		'imagemin',
		$.util.env.prod ? 'uglify' : 'browserify'
	], function () {
		browserSync(config.localhost);
	});
};
