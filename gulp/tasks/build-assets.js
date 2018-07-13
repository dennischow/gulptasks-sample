'use strict';

const gulp        = require('gulp');

/** Helpers **/
const plumber     = require('gulp-plumber');
const mergeStream = require('merge-stream');

/****************************************
 * [Assets - Fonts and etc.]
 ****************************************/
gulp.task('build-assets', function (callback) {
    let copyFonts = gulp.src(sourceAssets.fonts)
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest(distDir+'assets/fonts/'));
    return mergeStream(copyFonts);
});
