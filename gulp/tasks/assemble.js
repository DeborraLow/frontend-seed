/*!
 * Assemble Task
 * Task for building assemble
 * http://assemble.io/
 *
 * Author: Eric Clifford
 *
 */
var gulp           = require('gulp'),
    assemble       = require('assemble'),
    extname        = require('gulp-extname'),
    gulpAssemble   = require('gulp-assemble'),
    browserSync    = require('browser-sync'),
    nconf          = require('nconf');

gulp.task('assemble', function() {
  // retrieve task specific configuration 
  var config = nconf.get('project:tasks:assemble');

  // supply assemble with locations of layouts, partials, data
  assemble.layouts(config.layouts);
  assemble.partials(config.partials);
  assemble.data(config.data);
  assemble.option('layout', config.layout);

  gulp.src(config.src)
    .pipe(gulpAssemble(assemble))               // build
    .pipe(extname())                            // .hbs -> .html
    .pipe(gulp.dest('./build'))                 // export
    .pipe(browserSync.reload({stream: true}));  // reload
});
