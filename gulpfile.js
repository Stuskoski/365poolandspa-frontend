'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    del = require('del'),
    reload = browserSync.stream,
    runSequence = require('run-sequence'),
    proxy = require('http-proxy-middleware'),
    $ = require('gulp-load-plugins')();

var environments = {
    LOCAL: 'local'
};

var environment = environments.LOCAL,
    paths = {};

/**
 * Task sequences for each environment.
 *
 * 'local'      will build the project, start the test-runner, and watch files for changes using BrowserSynce.
 **/
gulp.task('local', ['build:local', 'watch']);

/**
 * Build tasks for each environment.
 *
 * 'build'      cleans the build folder, sets the environment paths, and runs all of the build tasks
 **/
gulp.task('build', function (done) {
    runSequence(['clean:env', 'set-paths'],
        ['fonts', 'js', 'defaultjs'],
        ['sass', 'images', 'html'],
        done);
});

gulp.task('build:' + environments.LOCAL, function (done) {
    runSequence('set-env:' + environments.LOCAL, 'build', done);
});

gulp.task('set-env:' + environments.LOCAL, function () {
    environment = environments.LOCAL;
});

/**
 * Sets destination paths relative to the selected environment. Default environment is 'local'.
 */
gulp.task('set-paths', function () {
    var baseDestPath = 'build/' + environment + '/public/';
    paths = {
        index: 'public/index.html',
        src: {
            fonts: ['public/fonts/**'],
            images: ['public/**/*.png', 'public/**/*.jpg'],
            html: ['public/**/*.html'],
            js: ['public/**/*.js', '!public/js/default/**'],
            sass: ['public/**/*.scss', 'public/**/*.css', '!public/js/default/**'],
            defaultjs: ['node_modules/angular/angular.js', 'node_modules/angular-ui-router/release/angular-ui-router.js',
                'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js', 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js']
        },
        dest: {
            css: baseDestPath + 'css/',
            images: baseDestPath + 'images/',
            fonts: baseDestPath + 'fonts',
            html: baseDestPath,
            index: baseDestPath + 'index.html',
            js: baseDestPath,
            defaultjs: baseDestPath + 'js/default'
        }
    };
});

/**
 * Cleans the build/ folders in preparation for a build.
 *
 * 'clean'      deletes everything in build/
 * 'clean:env'  deletes everything within a certain environment folder
 */
gulp.task('clean', function () {
    return del(['build/**/*']);
});

gulp.task('clean:env', function () {
    return del(['build/' + environment]);
});

/**
 * Build tasks for each file type.
 *
 * 'fonts'      moves all fonts
 * 'html'       moves all html
 * 'js'         moves all js
 * 'sass'       runs the sass compiler, autoprefixes css attributes, and outputs a single main.css
 *              DEV ONLY: includes inline source maps
 *              PROD ONLY: minifies and optimizes css
 * 'defaultjs'  moves all js from default (these should already be the minified versions)
 */
gulp.task('fonts', function () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dest.fonts))
        .pipe(reload());
});

/**
 * Plugins used:
 *
 * gulp-plumber - handles errors
 * gulp-useref - concatenates resource files (js, css, etc.) by looking for certain comments in html
 * gulp-util - noop == no operation, basically tells gulp to do nothing and keep going
 */
gulp.task('html', function () {
    return gulp.src(paths.src.html)
        .pipe($.plumber())
        .pipe(gulp.dest(paths.dest.html))
        .pipe(reload());
});

/**
 * Plugins used:
 *
 * gulp-plumber - handles errors
 * gulp-strip-code - removes code between start_comment and end_comment, used for removing test code
 * gulp-util - noop == no operation, basically tells gulp to do nothing and keep going
 * gulp-uglify - minifies js
 */
gulp.task('js', function () {
    return gulp.src(paths.src.js)
        .pipe($.plumber())
        .pipe(gulp.dest(paths.dest.js))
        .pipe(reload());
});

/**
 * Plugins used:
 *
 * gulp-plumber - handles errors
 * gulp-sourcemaps - creates sourcemaps and embeds them in the build files
 * gulp-sass - runs the sass precompiler
 * gulp-autoprefixer - prefixes CSS rules with -webkit, -moz, etc.
 * gulp-cssnano - minifies and optimizes CSS
 */
gulp.task('sass', function () {
    return gulp.src(paths.src.sass)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        // Run the Sass preprocessor, include paths to vendor folders, and log any errors
        .pipe($.sass({
            includePaths: ['./public/js/default', './node_modules'],
            errLogToConsole: true
        }))
        // Prefix CSS attributes automatically to support the last 3 versions of each browser
        .pipe($.autoprefixer({browsers: ['last 3 version']}))
        // DEV ONLY: Write sourcemaps directly to CSS
        .pipe(gulp.dest(paths.dest.css))
        .pipe(reload());
});

gulp.task('defaultjs', function () {
    return gulp.src(paths.src.defaultjs)
        .pipe(gulp.dest(paths.dest.defaultjs))
        .pipe(reload());
});

// Images
gulp.task('images', function() {
    return gulp.src('public/images/*')
        .pipe(gulp.dest(paths.dest.images))
        .pipe(reload());
});


/**
 * Watches src files and runs the appropriate task whenever a change is made.
 *
 * 'watch'      starts BrowserSync and watches files for any changes
 */

gulp.task('watch', ['build'], function () {

    var proxyOptions = proxy('/', {target: 'http://localhost:8080/'});

    browserSync({
        open: true,
        port: 3000,
        minify: true,
        browser: "Google Chrome",
        server: {
            baseDir: 'build/' + environment + '/public'/*,
            middleware: [proxyOptions]*/
        }
    });
    gulp.watch(paths.src.html, ['html']);
    gulp.watch(paths.src.fonts, ['fonts']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch(paths.src.defaultjs, ['defaultjs']);
    gulp.watch(paths.src.sass, ['sass']);
    gulp.watch(paths.src.images, ['images']);
});