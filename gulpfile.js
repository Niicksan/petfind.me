// Requires the gulp
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
// Requires the Gulp Useref
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
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

gulp.task("watch", function() {

  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })

	gulp.watch('app/scss/**/*.scss', gulp.series('sass'));

  // Reloads the browser whenever HTML or JS files change
	gulp.watch( 'app/*.html' ).on('change', browserSync.reload );
	gulp.watch( 'app/js/**/*.js' ).on('change', browserSync.reload );
  // Other watchers
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});
