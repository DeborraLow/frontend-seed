/*!
 * Copy Task
 *
 * Author: Eric Clifford
 *
 */

gulp.task('copy:vendor', function() {
  return gulp.src('app/vendor/**/*').pipe(gulp.dest('build/vendor'));
});

gulp.task('copy:assets', function() {
  return gulp.src('app/assets/**/*').pipe(gulp.dest("build/assets"));
});
