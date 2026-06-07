const { src, dest } = require('gulp');
const eslint = require('gulp-eslint-new');
const uglify = require('gulp-uglify');
 
const jsPath = '_scripts/*.js';
 
function scriptsTask() {
  return src(jsPath)
    .pipe(eslint({ overrideConfigFile: true }))
    .pipe(eslint.format())
    .pipe(uglify())
    .pipe(dest('_site/js'))
    .pipe(dest('js'));
}
 
module.exports = { task: scriptsTask };