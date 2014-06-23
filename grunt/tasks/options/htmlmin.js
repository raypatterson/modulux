/**
 * Minifies HTML
 */
module.exports = {
  dist: {
    options: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeCommentsFromCDATA: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      useShortDoctype: true
    },
    files: [{
      expand: true,
      cwd: '<%= compile_dir %>',
      src: '{,*/}*.html',
      dest: '<%= compile_dir %>'
    }]
  }
};