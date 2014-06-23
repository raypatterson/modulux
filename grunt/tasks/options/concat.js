/**
 * `grunt concat` concatenates multiple source files into a single file.
 */
module.exports = {
  /**
   * The `build_css` target concatenates compiled CSS and vendor CSS
   * together.
   */
  build_css: {
    src: [
          '<%= compass.output %>'
        ],
    dest: '<%= compass.dest %>'
  },
  /**
   * The `compile_js` target is the concatenation of our application source
   * code and all specified vendor source code into a single file.
   */
  compile_js: {
    options: {
      banner: '<%= meta.banner %>'
    },
    src: ['<%= build_dir %>/{,*/}*.js'],
    dest: '<%= compile_dir %>/main.js'
  }
};