/**
 * Replace configuration.
 */

module.exports = {
  dev: {
    options: {
    },
    files: [
      {
        expand: true, 
        flatten: true, 
        src: '<%= app_files.replace.src %>', 
        dest: '<%= app_files.replace.dest %>',
        rename: '<%= app_files.replace.rename %>'
      }
    ]
  }
}