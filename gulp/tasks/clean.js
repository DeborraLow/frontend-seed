/*!
 * Clean Task
 * Task for cleaning a folder
 *
 * Author: Eric Clifford
 *
 */
var gulp          = require('gulp'),
    del           = require('del');

gulp.task('clean', function(cb) {
  del(['./build', './dist'], function(err, paths) {
    cb();
  });
});
