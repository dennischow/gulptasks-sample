'use strict';

const gulp    = require('gulp');

/** Helpers **/
const clean   = require('gulp-clean');
const plumber = require('gulp-plumber');

/****************************************
 * [Clean + Dist folder]
 ****************************************/
gulp.task('clean', function () {
    return gulp.src(distDir, {read: false})
        .pipe(plumber({errorHandler: onError}))
        .pipe(clean());
});