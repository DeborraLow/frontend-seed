/*!
 * Default Job
 * Default job for compiling assets and serving them up in a server
 *
 * Author: Eric Clifford
 *
 */
var gulp = require('gulp');

gulp.task('default', ['browserify:dev', 'sass', 'concat:css', 'assemble', 'svgSprite'], function() {
  gulp.start('watch');
  gulp.start('browserSync');
});
