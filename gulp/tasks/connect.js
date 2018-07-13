'use strict';

const gulp        = require('gulp');

/** Server and Browser **/
const browserSync = require('browser-sync').create();

global.browserSync = browserSync;

/****************************************
 * [Local dev server + Open browser]
 ****************************************/
gulp.task('connect', function () {
    return browserSync.init({
        port: server.port,
        server: {
            baseDir: './',
            directory: false
        },
        startPath: 'dist/',
        browser: [
            'google chrome'
        ],
        ui: false,
        open: false,
        notify: false,
        ghostMode: false,
        injectChanges: true,
        reloadOnRestart: true,
        scrollProportionally: false,
        logConnections: false,
        reloadDelay: 40
    });
});
