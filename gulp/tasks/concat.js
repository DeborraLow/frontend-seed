/*!
 * Concat Task
 *
 * Author: Eric Clifford
 *
 */

gulp.task('concat:css', ['sass', 'svgSprite'], function () {
  gulp.src([
    "./build/main.css",
    "./build/assets/sprite.css"
  ])
  .pipe(plugins.concat("main.css"))
  .pipe(gulp.dest("./build/"));
});
