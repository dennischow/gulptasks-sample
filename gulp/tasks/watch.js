'use strict';

const gulp = require('gulp');

/****************************************
 * [Watch]
 ****************************************/
gulp.task('watch', function () {
    gulp.watch([
        './src/views/njk/**/*.+(html|nunjucks)'
    ], ['build-html:views']);
    gulp.watch([
        './src/assets/tmpl/**/*.+(html|nunjucks)'
    ], ['build-html:tmpl']);
    gulp.watch([
        './src/assets/less/**/*.less'
    ], ['build-css']);
    gulp.watch([
        './src/assets/js/**/*.js'
    ], ['build-js:internal']);
});
