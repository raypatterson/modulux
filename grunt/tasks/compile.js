module.exports = function(grunt) {

    grunt.registerTask('compile', [
        'clean',
        'copy:dist',
        'swig:dist',
        'htmlmin:dist',
        'webpackrequire',
        'webpack:dist',
        'jshint'
    ]);

};