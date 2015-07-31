/*!
 * BrowserSync Task
 * Task for configuring browserSync
 *
 * Author: Eric Clifford
 *
 */
var gulp           = require('gulp'),
    browserSync    = require('browser-sync'),
    nconf          = require('nconf');

gulp.task('browserSync', [], function() {
  var config = nconf.get('project:tasks:browserSync');

  browserSync(config);
});
