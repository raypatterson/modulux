/**
 * Build Swig templates
 * https://github.com/gustavohenke/grunt-swig2
 */

var grunt = require('grunt');

module.exports = {
  options: {
    basepath: '<%= app_files.swig.basepath %>',
    autoescape: true,
    cache: false,
    swigOptions: {
      autoescape: true,
      cache: false,
      locals: {
        rootDir: '<%= root_dir %>',
        getPartialPath: function(input) {
          var cfg = grunt.config.get('app_files.swig.partials');
          return cfg.src + input + cfg.filepath;
        },
        setDefaultsData: function(slug, item) {
          var cfg = require('grunt').config.get('app_files.swig.partials');
          var datapath = cfg.src + slug + cfg.datapath;
          item.defaults = grunt.file.exists(datapath) ? grunt.file.readJSON(datapath) : {};
          return item;
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