module.exports = function(grunt) {

  console.log('Loaded : server.js');

  /**
   * Run a server with livereload
   */
  grunt.registerTask('server', ['build', 'connect:livereload', 'delta']);
  // grunt.registerTask('server', ['build', 'karma:unit', 'connect:livereload', 'delta']);

};