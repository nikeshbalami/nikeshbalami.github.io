const { src, dest } = require('gulp');
 
const imgPath = 'img/**/*.+(png|jpg|gif|svg)';
 
// gulp-imagemin v9+ is ESM-only; we use a dynamic import wrapper so the
// rest of the build can stay CommonJS.
async function imagesTask() {
  const { default: imagemin } = await import('gulp-imagemin');
  return new Promise((resolve, reject) => {
    src(imgPath)
      .pipe(imagemin())
      .pipe(dest('_site/img'))
      .on('end', resolve)
      .on('error', reject);
  });
}
 
module.exports = { task: imagesTask };
