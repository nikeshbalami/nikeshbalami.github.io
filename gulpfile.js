const { series, parallel } = require('gulp');
const sass = require('./build/sass');
const scripts = require('./build/scripts');
const images = require('./build/images');
const sync = require('./build/browsersync');
 
// Export named tasks
exports.sass = sass.task;
exports.scripts = scripts.task;
exports.images = images.task;
exports['jekyll-build'] = sync.jekyllBuild;
exports['jekyll-dev'] = sync.jekyllDev;
 
// Build: compile assets then build Jekyll
exports.build = series(
  parallel(sass.task, scripts.task, images.task),
  sync.jekyllBuild
);
 
// Serve: dev build then watch
exports.serve = series(sync.jekyllDev, sync.serve);
exports.default = exports.serve;