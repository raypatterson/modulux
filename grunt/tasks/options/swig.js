/**
 * Build Swig templates
 * https://github.com/RayPatterson/grunt-swig2
 */

var grunt = require('grunt');

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
          return item;
        },
        addResources: function(slug, item) {
          // console.log('with', item);
          // console.log('add resource', slug);
          // console.log('to page', item.page);
          // console.log('---');
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