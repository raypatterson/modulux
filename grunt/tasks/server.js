module.exports = function(grunt) {

  grunt.registerTask('server', ['build', 'connect:livereload', 'delta']);

};