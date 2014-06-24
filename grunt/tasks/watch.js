module.exports = function(grunt) {

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['build', 'delta']);

};