// Requires the gulp
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
// Requires the Browser Sync
var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss') // Get source files with gulp.src // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css')) // Outputs the file in the destination folder
    .pipe(browserSync.reload({ // Browser Sync
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      watch: true,
      baseDir: 'app'
    },
  })
})

gulp.task('watch', gulp.parallel('browserSync', 'sass'), function (){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  // Other watchers
});
