const { src, dest, watch, series } = require('gulp');
const browserSync = require('browser-sync').create();
const cp = require('child_process');
 
const sass = require('./sass');
const scripts = require('./scripts');
 
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
 
const scssPath = '_scss/**/*.scss';
const jsPath = '_scripts/*.js';
const templatePath = [
  '*.html',
  '_includes/**/*.html',
  '_layouts/**/*.html',
  '*.yml',
  '_data/*.yml',
  '_posts/*',
];
 
function jekyllBuild(done) {
  return cp.spawn(jekyll, ['build'], { stdio: 'inherit' }).on('close', done);
}
 
function jekyllDev(done) {
  return cp
    .spawn(jekyll, ['build', '--config', '_config.yml,_config_dev.yml'], {
      stdio: 'inherit',
    })
    .on('close', done);
}
 
function reload(done) {
  browserSync.reload();
  done();
}
 
function serve(done) {
  browserSync.init({
    server: { baseDir: '_site' },
    notify: false,
  });
 
  watch(scssPath, series(sass.task, reload));
  watch(jsPath, series(scripts.task, reload));
  watch(templatePath, series(jekyllDev, reload));
 
  done();
}
 
module.exports = { jekyllBuild, jekyllDev, serve };