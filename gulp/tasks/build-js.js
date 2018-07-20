'use strict';

const gulp        = require('gulp');

/** Helpers **/
const runSequence = require('run-sequence');
const rename      = require('gulp-rename');
const gulpif      = require('gulp-if');
const plumber     = require('gulp-plumber');
const notify      = require('gulp-notify');
const argv        = require('yargs').argv;
const sourcemaps  = require('gulp-sourcemaps');

/** Javascript **/
const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify');
const jsValidate  = require('gulp-jsvalidate');
const babel       = require('gulp-babel');

/** Gulp Config */
const gulpConfig = require('./../gulp.config');

/****************************************
 * [Javascript] Build
 ****************************************/
gulp.task('build-js', function (callback) {
    return runSequence (
        'build-js:vendor',
        'build-js:internal',
        callback
    );
});

gulp.task('build-js:vendor', function () {
    return gulp.src( gulpConfig.sourceScript.vendor )
        .pipe(plumber({errorHandler: onError}))
        .pipe( gulpif(!argv.prod, sourcemaps.init({largeFile: true})) )
        .pipe(jsValidate())
        .pipe(concat('vendor.js'))
        .pipe( gulpif(argv.prod, uglify()) )
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(gulpConfig.projectDir+'assets/js/'))
        .pipe(notify({
            onLast: true,
            title: 'Success!',
            message: 'JavaScript Vendor Compiled'
        }))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('build-js:internal', function () {
    return gulp.src( gulpConfig.sourceScript.internal )
        .pipe(plumber({errorHandler: onError}))
        .pipe( gulpif(!argv.prod, sourcemaps.init({largeFile: true})) )
        .pipe(babel({
            presets: ['env']
        }))
        // .pipe( gulpif(argv.prod, stripDebug()) )
        .pipe(jsValidate())
        .pipe(concat('app.js'))
        .pipe( gulpif(argv.prod, uglify()) )
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(gulpConfig.projectDir+'assets/js/'))
        .pipe(notify({
            onLast: true,
            title: 'Success!',
            message: 'JavaScript Internal Compiled'
        }))
        .pipe(browserSync.stream({once: true}));
});
