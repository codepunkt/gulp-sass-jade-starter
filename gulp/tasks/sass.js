var assign = require('lodash.assign');
var reload = require('browser-sync').reload;

module.exports = function (gulp, config, $) {
	var prod = $.util.env.prod;

	var sass = function () {
		var source = config.path.src + '/sass/app.sass';

		return gulp.src(source)
			.pipe($.sourcemaps.init())
				.pipe($.sass(assign({}, config.sass, {
					errLogToConsole: !prod,
					outputStyle: prod ? 'compressed' : 'nested'
				})))
				.pipe($.autoprefixer(config.autoprefixer))
			.pipe($.sourcemaps.write.apply(null, prod ? [ '.' ] : []))
			.pipe(gulp.dest(config.path.dist + '/css'))
			.pipe(reload({ stream: true }));
	};

	gulp.task('sass', [ 'clean' ], sass);
	gulp.task('sass:watch', sass);
};
