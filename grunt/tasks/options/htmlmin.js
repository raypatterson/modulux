module.exports = {                     
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      expand: true,
      cwd: '<%= compile_dir %>',
      src: ['**/*.html'],
      dest: '<%= compile_dir %>'
    }
  };