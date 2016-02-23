var babelify = require('babelify');
var browserify = require('browserify');
var connect = require('gulp-connect');
var notify = require('gulp-notify');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var watchify = require('watchify');

var files = {
  dependencies: [
    // 'react-addons-transition-group',
    'react',
    'react-dom'
  ],

  browserify: [
    './src/main.js'
  ]
};

var browserifyTask = function (options) {

  var bundler = browserify({
    entries: [options.src],
    "transform": [
      ['babelify', {presets: ['react']}]
    ],
    debug: options.development,
    cache: {}, // Requirement of watchify
    packageCache: {}, // Requirement of watchify
    fullPaths: options.development,
  });

  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    bundler
      .bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, connect.reload()))
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  if (options.development) {
    bundler.external(files.dependencies);
    bundler = watchify(bundler);
    bundler.on('update', rebundle);

    var vendorsBundler = browserify({
     debug: true,
     require: files.dependencies
    });

    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));
  }

  rebundle();

};

gulp.task('default', function() {

  var browserifyOpt = {
    development: true,
    src: files.browserify,
    dest: './build/scripts'
  };

  var serverOpt = {
    root: './build',
    port: 8889,
    livereload: true
  };

  browserifyTask(browserifyOpt);
  connect.server(serverOpt);

});