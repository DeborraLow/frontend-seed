/*!
 * Browserify Task
 * Bundle JavaScript with Browserify
 * - Bundles are read in from modules in config
 *
 * Author: Eric Clifford
 *
 */
var gulp          = require('gulp'),
    nconf         = require('nconf'),
    browserify    = require('browserify'),
    browserSync   = require('browser-sync'),
    watchify      = require('watchify'),
    mergeStream   = require('merge-stream'),
    bundleLogger  = require('../util/bundleLogger'),
    handleErrors  = require('../util/handleErrors'),
    source        = require('vinyl-source-stream'),
    buffer        = require('vinyl-buffer'),
    _             = require('lodash'),
    sourcemaps    = require('gulp-sourcemaps');

gulp.task('browserify', function() {
  return browserifyTask();
});

gulp.task('browserify:dev', function() {
  return browserifyTask(true);
});

function browserifyTask(devMode) {
  var taskConfig = nconf.get('project:tasks:browserify');

  // Start bundling with Browserify for each bundleConfig specified
  return mergeStream.apply(gulp, _.map(taskConfig.modules, processBundle));
  
  function processBundle(bundleConfig) {
    if(devMode) {
      // Add watchify args and debug (sourcemaps) option
      _.extend(bundleConfig, watchify.args, { debug: true });
      // A watchify require/external bug that prevents proper recompiling,
      // so (for now) we'll ignore these options during development. Running
      // `gulp browserify` directly will properly require and externalize.
      bundleConfig = _.omit(bundleConfig, ['external', 'require']);
    }

    var b = browserify(bundleConfig);

    if(devMode) {
      // Wrap with watchify and rebundle on changes
      b = watchify(b);
      // Rebundle on update
      b.on('update', buildBundle);
      bundleLogger.watch(bundleConfig.outputName);
    } else {
      // Sort out shared dependencies.
      // b.require exposes modules externally
      if(bundleConfig.require) b.require(bundleConfig.require);
      // b.external excludes modules from the bundle, and expects
      // they'll be available externally
      if(bundleConfig.external) b.external(bundleConfig.external);
    }

    function buildBundle() {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName);

      return b
        .bundle()
        // Report compile errors
        .on('error', handleErrors)
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        // sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(sourcemaps.write('./')) // writes .map file
        // Specify the output destination
        .pipe(gulp.dest(bundleConfig.dest))
        .pipe(browserSync.reload({
          stream: true
        }));
    };

    return buildBundle();
  };
};
