'use strict';

const gulp         = require('gulp');

/** Helpers **/
const rename       = require('gulp-rename');
const gulpif       = require('gulp-if');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const argv         = require('yargs').argv;
const sourcemaps   = require('gulp-sourcemaps');

/** Style **/
const less         = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');

/****************************************
 * [Style] Build
 ****************************************/
gulp.task('build-css', function () {
    return gulp.src( sourceStyle )
        .pipe(plumber({errorHandler: onError}))
        .pipe( gulpif(!argv.prod, sourcemaps.init({largeFile: true})) )
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 Versions'],
            cascade: false,
            remove: false
        }))
        .pipe( gulpif(argv.prod, cleanCSS({level: {1: {all: true}, 2: {all: true}}})) )
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distDir+'assets/css/'))
        .pipe(notify({
            onLast: true,
            title: 'Success!',
            message: 'Styles Compiled'
        }))
        .pipe(browserSync.stream());
});
