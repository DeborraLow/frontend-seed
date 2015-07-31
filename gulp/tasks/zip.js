/*!
 * Zip Task
 *
 * Author: Eric Clifford
 *
 */

gulp.task('zip', function() {
    gulp.src(["**/*", "!node_modules/**/*", "!app/vendor/bower_components/**/*", "!dist/**/*"])
         .pipe(plugins.zip('release.zip'))
         .pipe(gulp.dest('dist'))
});
