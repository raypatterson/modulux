/**
 * Build Swig templates
 * https://github.com/RayPatterson/grunt-swig2
 */

var grunt = require('grunt');
var fs = require('fs-extra');
var _ = require('lodash');

var resources = {};

module.exports = {
  options: {
    basepath: '<%= app_files.swig.basepath %>',
    pagepath: '<%= app_files.swig.pages.cwd %>',
    swigOptions: {
      autoescape: true,
      cache: false,
      locals: {
        rootDir: '<%= root_dir %>',
        getPartialPath: function(slug, item) {
          var cfg = grunt.config.get('app_files.swig.partials');
          var src = cfg.src + slug + cfg.filepath;
          return src;
        },
        setDefaultsData: function(slug, item) {
          var cfg = require('grunt').config.get('app_files.swig.partials');
          var src = cfg.src + slug + cfg.datapath;
          item.defaults = grunt.file.exists(src) ? grunt.file.readJSON(src) : {};

          // console.log('item', item);
          return item;
        },
        addResources: function(pathname, item, page) {

          // TODO: Here is where the Webpack resources need to be required, REMEMBER WHERE YOU WERE!
          // NOTE: page comes from the Swig Grunt task you modified

          var cfg = grunt.config('app_files.webpackrequire');

          var resources = cfg.resources || {};

          if (!resources[page]) {
            resources[page] = [];
          }

          var requires = grunt.file.expand({
            cwd: cfg.partials.cwd + pathname
          }, cfg.partials.match);

          _.each(requires, function(require) {
            resources[page].push(pathname + '/' + require);
          });

          grunt.config('app_files.webpackrequire.resources', resources);
        }
      }
    },
    data: {},
    filters: {
      pageTitle: function(input) {
        var title = 'Page Title';
        return input !== undefined ? title + ' | ' + input : title;
      }
    },
  },
  dev: {
    dest: '<%= build_dir %>',
    cwd: '<%= app_files.swig.pages.cwd %>',
    src: '<%= app_files.swig.pages.src %>',
    ext: '<%= app_files.swig.pages.ext %>',
    rename: function(dest, src) {
      return dest += '/' + src;
    },
    expand: true
  },
  dist: {
    dest: '<%= compile_dir %>',
    cwd: '<%= app_files.swig.pages.cwd %>',
    src: '<%= app_files.swig.pages.src %>',
    ext: '<%= app_files.swig.pages.ext %>',
    rename: function(dest, src) {
      return dest += '/' + src;
    },
    expand: true
  }
};