'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var assign = require('object-assign');
var nunjucks = require('nunjucks');
var fs = require('fs');
var path = require('path');
var PLUGIN_NAME = 'avalarin-nunjucks-l10n';

module.exports = function (opts) {
	return through.obj(function (file, enc, cb) {
  var that = this;

		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return;
		}

  var options = assign({
    autoescape: false,
    locals: {},
    searchPaths: []
  }, opts);

  var locales = options.locales || [ 'en' ];
  delete options.locales;

  var defaultLocale = options.defaultLocale || 'en';
  delete options.defaultLocale;

  var dataProvider = options.dataProvider || function (locale) {
    return { locale: locale };
  };
  delete options.dataProvider;

  var redirectPageTemplate = options.redirectPageTemplate || 'redirect.html';
  delete options.redirectPageTemplate;

  var str = file.contents.toString('utf8');

  var loader = new nunjucks.FileSystemLoader(options.searchPaths, {
    watch: false,
    noCache: false
  });
  var env = new nunjucks.Environment(loader);

  // generate redirect page
  var redirectLink = gutil.replaceExtension(file.relative, '.' + defaultLocale + '.html');
  env.render(redirectPageTemplate, { link: redirectLink }, function(err, res) {
    if (err) return cb(new gutil.PluginError(PLUGIN_NAME, err));
    var outFileContents = new Buffer(res);
    that.push(new gutil.File({ cwd: "", base: "", path: file.relative, contents: outFileContents }));
  });

  var counter = locales.length;
  locales.forEach(function(locale) {
    var context = dataProvider(locale);
    env.renderString(str, context, function(err, res) {
    if (err) return cb(new gutil.PluginError(PLUGIN_NAME, err));
    var outFileContents = new Buffer(res);
    var outFilePath = gutil.replaceExtension(file.relative, '.' + locale + '.html');
    that.push(new gutil.File({ cwd: "", base: "", path: outFilePath, contents: outFileContents }));
    if (--counter == 0) cb();
    });
  });
	});
};
