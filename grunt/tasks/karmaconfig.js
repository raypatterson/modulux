module.exports = function(grunt) {

  console.log('Loaded : karmaconfig.js');

  /**
   * In order to avoid having to specify manually the files needed for karma to
   * run, we use grunt to manage the list for us. The `karma/*` files are
   * compiled as grunt templates for use by Karma. Yay!
   */
  grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function() {
    var jsFiles = grunt.filterForJS(this.filesSrc);

    grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
      process: function(contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles
          }
        });
      }
    });
  });

};