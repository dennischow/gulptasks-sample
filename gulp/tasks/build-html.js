'use strict';

const gulp        = require('gulp');

/** Helpers **/
const runSequence = require('run-sequence');
const rename      = require('gulp-rename');
const gulpif      = require('gulp-if');
const plumber     = require('gulp-plumber');
const argv        = require('yargs').argv;
const changed     = require('gulp-changed');

/** Views **/
const nunjucks    = require('gulp-nunjucks');
const htmlmin     = require('gulp-htmlmin');

/****************************************
 * [HTML] Build
 ****************************************/
gulp.task('build-html', function (callback) {
    return runSequence (
        'build-html:views',
        'build-html:tmpl',
        callback
    );
});

gulp.task('build-html:views', function () {
    return gulp.src(sourceHtml.views)
        .pipe(plumber({errorHandler: onError}))
        .pipe( gulpif(!argv.prod, changed(distDir, {extension: '.html'})) )
        .pipe(nunjucks.compile())
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest(distDir))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('build-html:tmpl', function () {
    return gulp.src(sourceHtml.tmpl)
        .pipe(plumber({errorHandler: onError}))
        .pipe( gulpif(!argv.prod, changed(distDir+'assets/tmpl/', {extension: '.html'})) )
        .pipe(nunjucks.compile())
        .pipe( gulpif(argv.prod, htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseInlineTagWhitespace: false,
            preserveLineBreaks: false,
            keepClosingSlash: true,
            removeOptionalTags: false,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        })) )
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest(distDir+'assets/tmpl/'))
        .pipe(browserSync.stream({once: true}));
});
