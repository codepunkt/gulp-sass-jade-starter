var del = require('del');
var es = require('event-stream');
var paths = require('vinyl-paths');

module.exports = function (gulp, config, $) {
	gulp.task('rev', [ 'sass', 'uglify', 'imagemin' ], function (callback) {
		var image = paths();
		var source = paths();
		var map = paths();
		var onlyMaps = $.filter([ '**/*.*', '!**/*.map' ]);

		var imageStream = gulp.src(config.path.dist + '/**/*.{jpg,png,svg}')
			.pipe(image)
			.pipe($.rev());

		var sourceStream = gulp.src(config.path.dist + '/**/*.{js,css}')
			.pipe($.sourcemaps.init({ loadMaps: true }))
			.pipe(source)
			.pipe($.rev())
			.pipe($.sourcemaps.write('.'));

		gulp.src(config.path.dist + '/**/*.map').pipe(map);

		es.merge(imageStream, sourceStream)
			.pipe(gulp.dest(config.path.dist))
			.pipe(onlyMaps)
			.pipe($.size({ showFiles: true, gzip: true }))
			.pipe(onlyMaps.restore())
			.pipe($.rev.manifest())
			.pipe(gulp.dest(config.path.dist))
			.on('end', function () {
				del([].concat(image.paths, source.paths, map.paths), callback);
			});
	});
};
