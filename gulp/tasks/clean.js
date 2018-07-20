'use strict';

const gulp    = require('gulp');

/** Helpers **/
const clean   = require('gulp-clean');
const plumber = require('gulp-plumber');

/** Gulp Config */
const gulpConfig = require('./../gulp.config');

/****************************************
 * [Clean dist folder]
 ****************************************/
gulp.task('clean', function () {
    return gulp.src(gulpConfig.distDir, {read: false})
        .pipe(plumber({errorHandler: onError}))
        .pipe(clean());
});