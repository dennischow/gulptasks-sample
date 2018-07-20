'use strict';

const gulp        = require('gulp');
const argv        = require('yargs').argv;

module.exports = {
    distDir: './dist/' + (argv.projectName || ''),
    server: {
        host: 'localhost',
        port: '8000'
    },
    sourceStyle: [
        './src/assets/less/app.less'
    ],
    sourceScript: {
        vendor: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/angular/angular.js',
        ],
        internal: [
            './src/assets/js/**/*.js'
        ]
    },
    sourceAssets: {
        fonts: ['./src/assets/fonts/**/*']
    },
    sourceHtml: {
        views: ['./src/views/njk/*.+(html|nunjucks)'],
        tmpl: ['./src/assets/tmpl/*.+(html|nunjucks)']
    },
    watch: {
        sourceStyle: [
            './src/assets/less/**/*.less'
        ],
        sourceScript: {
            internal: [
                './src/assets/js/**/*.js'
            ]
        },
        sourceHtml: {
            views: ['./src/views/njk/**/*.+(html|nunjucks)'],
            tmpl: ['./src/assets/tmpl/**/*.+(html|nunjucks)']
        }
    }
};