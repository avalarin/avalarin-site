const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const copy = require('gulp-copy');
const data = require('gulp-data')
const rename = require('gulp-rename');
const nunjucks = require('gulp-nunjucks-html');
const nunjucks_l10n = require('./tasks/nunjucks-l10n');

gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(copy('public'));
});

gulp.task('styles', function() {
  gulp.src('styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/styles'));
});

gulp.task('scripts', function() {
  gulp.src('scripts/**/*.js')
    .pipe(gulp.dest('public/scripts'))
});

gulp.task('views', function() {
  gulp.src('views/*.html')
    .pipe(nunjucks_l10n({
      locales: [ 'en', 'ru' ],
      defaultLocale: 'ru',
      searchPaths: ['views'],
      redirectPageTemplate: 'layouts/redirect.html',
      dataProvider: function(locale) {
          var l10n = require('./l10n/' + locale + '.json');
          return {
              l10n: l10n,
              skills: require('./data/skills.js')(l10n),
              employment: require('./data/employment.js')(l10n),
              education: require('./data/education.js')(l10n)
          };
      }
    }))
    .pipe(gulp.dest('public/'))
});

gulp.task('watch', function() {
  gulp.watch('styles/**/*.scss', function(event) {
    gulp.run('styles');
  });

  gulp.watch('scripts/**/*.js', function(event) {
    gulp.run('scripts');
  });

  gulp.watch(['views/**/*.html', 'l8n/*', 'data/*'], function(event) {
    gulp.run('views');
  });

  gulp.watch('images/**/*', function(event) {
    gulp.run('images');
  });
});

gulp.task('default', ['styles', 'scripts', 'views', 'images']);
