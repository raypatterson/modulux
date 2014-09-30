module.exports = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: [{
      expand: true,
      cwd: '<%= compile_dir %>',
      src: ['**/*.html'],
      dest: '<%= compile_dir %>'
    }]
  }
};