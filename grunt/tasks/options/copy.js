module.exports = {
  dev: {
    files: [{
      expand: true,
      cwd: '<%= app_files.copy.cwd %>',
      src: ['<%= app_files.copy.src %>'],
      dest: '<%= build_dir %>'
    }]
  },
  dist: {
    files: [{
      expand: true,
      cwd: '<%= app_files.copy.cwd %>',
      src: ['<%= app_files.copy.src %>'],
      dest: '<%= compile_dir %>'
    }]
  }
}