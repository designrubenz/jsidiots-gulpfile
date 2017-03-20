var src = './src'
var dest = './build'
var notjssrc  = '!' + src + '/js/main.js';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync').create();
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// SASS to CSS
gulp.task('sass', function () {
  return gulp.src(src + '/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(src))
    .pipe(browserSync.stream());
});

// SASS to minified and prefixed CSS (prefixing according to browser statistics)
gulp.task('sass-prod', function () {
  return gulp.src(src + '/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 5%'],
      cascade: false
    }))
    .pipe(gulp.dest(dest));
});

// concat js, lib folder files come first
gulp.task('js', ['jslint'], function() {
  return gulp.src([src + '/js/lib/*.js', src + '/js/*.js', notjssrc])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(src + '/js/'))
    .pipe(browserSync.stream());
});

// minify js
gulp.task('js-prod', ['jslint'], function() {
  // uglify JS 
  return gulp.src(src + '/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest(dest + '/js/'));
});

// lint your js
gulp.task('jslint', function() {
  return gulp.src([src + '/js/*.js', notjssrc])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// start a server for static content + watch scss/html files
// make sure you have the chrome livereload plugin installed (s. http://livereload.com/)
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: src
  });
  gulp.watch(src + "/sass/**/*.scss", ['sass']);
  gulp.watch([src + "/js/**/*.js", notjssrc], ['js']);
  gulp.watch(src + "/*.html").on('change', browserSync.reload);
});

// preparing files for production
gulp.task('prod', ['js-prod', 'sass-prod', 'copy-files-root', 'copy-files'], function() {
  console.log("\nTo minify and copy images, run the 'compress'-task.\n\n");
});

gulp.task('copy-files-root', function() {
  // but do not copy the dev's style.css and the sass folder
  return gulp.src([src + '/*', src + '/.*', "!" + src + "/style.css", "!" + src + "/sass"])
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

gulp.task('copy-files', function() {
  // copy touch-icon-images
  return gulp.src(src + '/images/icons-touch/*')
    .pipe(changed(dest + '/images/icons-touch'))
    .pipe(gulp.dest(dest + '/images/icons-touch'));
});

// compress images
gulp.task('compress', function() {
  return gulp.src(src + '/images/**')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dest + '/images/'));
});

gulp.task('default', ['serve']);
