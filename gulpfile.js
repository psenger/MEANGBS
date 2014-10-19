var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    coffee    = require('gulp-coffee-script'),
    uglify    = require('gulp-uglify');


gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('./public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('coffee', function() {
    gulp.src('./client-coffee/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./client-js-dist/'))
});

gulp.task('compress', function() {
    gulp.src('./client-js-dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/main.js'))
});

gulp.task('default', function() {
    // place code for your default task here
});