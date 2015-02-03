var path = require('path');
var notifier = require('node-notifier');

module.exports = function (file) {
	if (file.jshint.success) {
		return;
	}

	var first = file.jshint.results[0];

	notifier.notify({
		title: path.relative(process.cwd(), file.path) + ':' + first.error.line,
		message: first.error.reason
	});
};
