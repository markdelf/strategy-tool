// Prepare gulp dependencies
var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var watch = require('gulp-watch');


// Build files
gulp.task('default', [
    'build',
]);

// Clean & build files
gulp.task('build', [
    'clean',
    'sass'
]);

// Clean up the webroot compiled item directories
gulp.task('clean', [
    'clean:css'
]);

gulp.task('clean:css', function () {
    return del([
        './css/*.css',
        './css/*.css.map'
    ]);
});

// Generate CSS from SASS files
gulp.task('sass', ['clean:css'], function () {
    var options = {
        outputStyle: 'compressed'
    };

    return gulp.src(['./css/sass/**/*.scss'])
        .pipe(sass(options).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch('./css/sass/**/*.scss', ['sass']);
});