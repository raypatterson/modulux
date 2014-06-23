/**
 * Build Swig templates
 * https://github.com/gustavohenke/grunt-swig2
 */

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
          var cfg = require('grunt').config.get('app_files.swig.partials');
          return cfg.src + input + cfg.filepath;
        }
      }
    },
    data: {},
    filters: {
      pageTitle: function(input) {
        var title = 'Page Title';
        return input !== undefined ? title + ' | ' + input : title;
      }
    }
  },
  dev: {
    expand: true,
    cwd: '<%= app_files.swig.pages.cwd %>',
    src: '<%= app_files.swig.pages.src %>',
    ext: '<%= app_files.swig.pages.ext %>',
    dest: '<%= build_dir %>',
    rename: function(dest, src) {
      return dest += '/' + src;
    }
  }
};