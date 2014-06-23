/**
 * This task compiles the karma template so that changes to its file array
 * don't have to be managed manually.
 */
module.exports = {
  unit: {
    dir: '<%= build_dir %>',
    src: [
      '<%= vendor_files.js %>',
      '<%= test_files.js %>'
    ]
  }
};