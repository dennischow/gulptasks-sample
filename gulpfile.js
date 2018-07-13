/**
 * My Sexy Gulp Front-end Workflow Task Runner
 * HELLO, HOW ARE Ü?
 * @author Dennis C.
 */
'use strict';

const gulp        = require('gulp');

/** Helpers **/
const runSequence = require('run-sequence');
const notify      = require('gulp-notify');
const beep        = require('beepbeep');
const requireDir  = require('require-dir');

requireDir('./gulp/tasks');

/****************************************
 * [Global Config]
 ****************************************/
global.distDir = './dist/';

global.server = {
    host: 'localhost',
    port: '8000'
};

global.sourceStyle = [
    './src/assets/less/app.less'
];

global.sourceScript = {
    vendor: [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/angular/angular.js',
    ],
    internal: [
        './src/assets/js/**/*.js'
    ]
};

global.sourceAssets = {
    fonts: ['./src/assets/fonts/**/*']
};

global.sourceHtml = {
    views: ['./src/views/njk/*.+(html|nunjucks)'],
    tmpl: ['./src/assets/tmpl/*.+(html|nunjucks)']
};

/****************************************
 * [Global Callback Function]
 ****************************************/
global.onError = function (err) {
    notify({
        title: 'FAIL! in Gulp Task',
        message: 'Please check the console.'
    })
    .write(err);
    console.log(err.toString());
    beep(3);
    this.emit('end');
}

/****************************************
 * [Terminal Gulp Commands]
 ****************************************/
gulp.task('build', function (callback) {
    return runSequence (
        'clean',
        'build-css',
        'build-js',
        'build-html',
        'build-assets',
        callback
    );
});

gulp.task('dev', function (callback) {
    return runSequence (
        'build',
        'connect',
        'watch',
        callback
    );
});
