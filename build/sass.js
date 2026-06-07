const { src, dest } = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
 
const scssPath = '_scss/*.scss';
 
function sassTask() {
  return src(scssPath)
    .pipe(
      gulpSass({
        includePaths: ['scss'],
        outputStyle: 'expanded',
      }).on('error', gulpSass.logError)
    )
    .pipe(
      prefix({
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('_site/css'))
    .pipe(dest('css'));
}
 
module.exports = { task: sassTask };