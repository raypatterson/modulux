/**
 * Build Swig templates
 * https://github.com/RayPatterson/grunt-swig2
 */

module.exports = {
  options: {
    config: '<%= app_files.swig %>',
    webpack: 'app_files.webpackrequire',
    swigOptions: {
      autoescape: true,
      cache: false,
      locals: {
        rootDir: '<%= root_dir %>'
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