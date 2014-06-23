/**
 * Reads HTML for usemin blocks to enable smart builds that automatically
 * concat, minify and revision files. Creates configurations in memory so
 * additional tasks can operate on them
 */
module.exports = {
  options: {
    assetsDirs: ['<%= compile_dir %>']
  },
  html: ['<%= compile_dir %>/{,*/}*.html'],
  css: ['<%= compile_dir %>/{,*/}*.css']
};