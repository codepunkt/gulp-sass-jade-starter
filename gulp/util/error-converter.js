module.exports = function (file) {
	// return if there are no jscs errors
	if (file.jscs.success) {
		return;
	}

	// otherwise, set jshint success to `false` and add jscs errors
	// to jshint results as warnings
	file.jshint.success = false;
	file.jshint.results = file.jshint.results || [];
	file.jscs.errors.forEach(function (error) {
		file.jshint.results.push({
			file: file.path,
			error: {
				character: error.column,
				code: 'W ' + error.rule,
				line: error.line,
				reason: error.message
			}
		});
	});

	// sort errors by line number
	file.jshint.results.sort(function (a, b) {
		return a.error.line - b.error.line;
	});
};
