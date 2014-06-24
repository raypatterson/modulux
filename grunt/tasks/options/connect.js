module.exports = {
  options: {
    port: 9000,
    hostname: 'localhost',
    livereload: 35729
  },
  livereload: {
    options: {
      open: true,
      base: [
        '<%= build_dir %>'
      ]
    }
  }
};