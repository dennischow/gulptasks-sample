'use strict';

const gulp = require('gulp');

/** Gulp Config */
const gulpConfig = require('./../gulp.config');

/****************************************
 * [Watch]
 ****************************************/
gulp.task('watch', function () {
    gulp.watch([
        gulpConfig.watch.sourceHtml.views
    ], ['build-html:views']);
    gulp.watch([
        gulpConfig.watch.sourceHtml.tmpl
    ], ['build-html:tmpl']);
    gulp.watch([
        gulpConfig.watch.sourceStyle
    ], ['build-css']);
    gulp.watch([
        gulpConfig.watch.sourceScript.internal
    ], ['build-js:internal']);
});
