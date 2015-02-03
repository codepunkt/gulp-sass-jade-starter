var glob = require('glob');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./gulp/config');

glob.sync('./gulp/tasks/**/*.js').forEach(function (fileName) {
	require(fileName)(gulp, config, $);
});