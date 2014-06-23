module.exports = function(grunt) {

  console.log('Loaded : index.js');

  /**
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask('index', 'Process index.html template', function() {
    var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
    var jsFiles = grunt.filterForJS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });
    var cssFiles = grunt.filterForCSS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy(grunt.config('source_dir') + '/index.html', this.data.dir + '/index.html', {
      process: function(contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });

};