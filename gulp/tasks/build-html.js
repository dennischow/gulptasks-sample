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

/** Gulp Config */
const gulpConfig = require('./../gulp.config');

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
    return gulp.src(gulpConfig.sourceHtml.views)
        .pipe(plumber({errorHandler: onError}))
        .pipe( gulpif(!argv.prod, changed(gulpConfig.projectDir, {extension: '.html'})) )
        .pipe(nunjucks.compile())
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest(gulpConfig.projectDir))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('build-html:tmpl', function () {
    return gulp.src(gulpConfig.sourceHtml.tmpl)
        .pipe(plumber({errorHandler: onError}))
        .pipe( gulpif(!argv.prod, changed(gulpConfig.projectDir+'assets/tmpl/', {extension: '.html'})) )
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
        .pipe(gulp.dest(gulpConfig.projectDir+'assets/tmpl/'))
        .pipe(browserSync.stream({once: true}));
});
