/*!
 * SASS Task
 * Task building SASS with node-sass + autoprefixing + source maps
 *
 * https://github.com/dlmanning/gulp-sass
 * https://github.com/postcss/autoprefixer
 * https://github.com/floridoo/gulp-sourcemaps
 *
 * Author: Eric Clifford
 *
 */
var browserSync   = require('browser-sync'),
    handleErrors  = require('../util/handleErrors'),
    config        = nconf.get('project:tasks:sass');

gulp.task('sass', function () {
  // retrieve command line argument --production
  var prod = nconf.get('production');

  gulp.src(config.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .on('error', handleErrors)
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.autoprefixer({ browsers: ['> 1%','last 2 version'] }))
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.if(prod, plugins.minifyCss()))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});
