'use strict';

const gulp     = require('gulp');

/** Helpers **/
const plumber  = require('gulp-plumber');

/** Style **/
const lesshint = require('gulp-lesshint');

/** Javascript **/
const jshint   = require('gulp-jshint');

/****************************************
 * [Hint + LESS and JS]
 ****************************************/
gulp.task('hint-css', function () {
    return gulp.src( sourceStyle )
        .pipe(plumber({errorHandler: onError}))
        .pipe( lesshint() )
        .pipe( lesshint.reporter() );
});

gulp.task('hint-js', function () {
    return gulp.src( sourceScript.internal )
        .pipe(plumber({errorHandler: onError}))
        .pipe( jshint({
            "esversion": 6,
            "globalstrict": false,
            "quotmark": true,
            "browser": true
        }) )
        .pipe( jshint.reporter('default') );
});
