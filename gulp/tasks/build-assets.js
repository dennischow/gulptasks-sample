'use strict';

const gulp        = require('gulp');

/** Helpers **/
const plumber     = require('gulp-plumber');
const mergeStream = require('merge-stream');

/** Gulp Config */
const gulpConfig = require('./../gulp.config');

/****************************************
 * [Assets - Fonts and etc.]
 ****************************************/
gulp.task('build-assets', function (callback) {
    let copyFonts = gulp.src(gulpConfig.sourceAssets.fonts)
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest(gulpConfig.distDir+'assets/fonts/'));
    return mergeStream(copyFonts);
});
