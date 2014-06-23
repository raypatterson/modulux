module.exports = function(grunt) {

  console.log('Loaded : read-file.js');

  grunt.util._.mixin({
    read: function(src) {
      var json = grunt.file.read(require('path').join('src/', src));
      console.log('Read:', src, json);
    }
  });

};