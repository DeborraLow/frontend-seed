/*!
 * SVG Sprite
 * Creates SVG sprites with svg-sprite
 * https://github.com/jkphl/gulp-svg-sprite
 *
 * Author: Eric Clifford
 *
 */
var gulp      = require('gulp'),
    svgSprite = require('gulp-svg-sprite');

config = {
  mode: {
    css: { // Activate the «css» mode
      dest: "assets",
      render: {
        css: true  // Activate CSS output (with default options)
      }
    }
  }
};

gulp.task('svgSprite', function() {
  return gulp.src('./app/assets/images/sprites/**/*.svg')
            .pipe(svgSprite(config))
            .pipe(gulp.dest('./build'));
});
