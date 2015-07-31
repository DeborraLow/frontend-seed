/*!
 * Release Job
 *
 * Author: Eric Clifford
 *
 */
var gulp = require('gulp'),
    runSeq = require('run-sequence');

gulp.task('release', function(cb) {
  runSeq('clean', 'build', 'zip', cb);
});

