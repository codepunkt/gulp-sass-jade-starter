var del = require('del');

module.exports = function (gulp, config) {
	gulp.task('clean', function (callback) {
		del([ config.path.dist + '/**' ], callback);
	});
};
