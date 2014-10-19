var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    minifycss    = require('gulp-minify-css'),
    coffee       = require('gulp-coffee-script'),
    uglify       = require('gulp-uglify'),
    livereload   = require('gulp-livereload'),
    lr           = require('tiny-lr'); // tiny live reload server

var tiny_lr_server = lr();
var coffee_Sources = [ './client-js/coffee/main.coffee' ];
var js_Sources = [ './client-js/main.js' ];
var scss_Sources = [];

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
    gulp.src(coffee_Sources)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./client-js/'))
});

gulp.task('compress', function() {
    gulp.src(js_Sources)
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/main.js'))
});

gulp.task('watch',function(){
    gulp.watch(coffee_Sources,[ 'coffee', 'compress' ]);
});

gulp.task('default', function() {
    // place code for your default task here
});