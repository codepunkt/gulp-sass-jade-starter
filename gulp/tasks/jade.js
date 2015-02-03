var fs = require('fs');
var reload = require('browser-sync').reload;

module.exports = function (gulp, config, $) {
	var jade = function (maps) {
		try {
			maps = JSON.parse(fs.readFileSync(config.path.dist + '/rev-manifest.json', 'utf8'));
		} catch (e) {
			maps = {};
		}

		var locals = {
			maps: JSON.stringify(maps),
			url: function (url) {
				return maps[url] || url;
			}
		};

		return gulp.src(config.path.src + '/*.jade')
			.pipe($.jade({ locals: locals }))
			.pipe(gulp.dest(config.path.dist))
			.pipe(reload({ stream: true }));
	};

	gulp.task('jade', [ $.util.env.prod ? 'rev' : 'clean' ], jade);
	gulp.task('jade:watch', jade);
};
