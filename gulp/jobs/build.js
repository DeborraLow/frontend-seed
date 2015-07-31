/*!
 * Build Job
 * Task for building production artifacts
 *
 * Author: Eric Clifford
 *
 */
var gulp = require('gulp');

gulp.task('build', ['browserify', 'sass', 'concat:css', 'assemble', 'svgSprite', 'copy:vendor', 'copy:assets'], function() {
});

