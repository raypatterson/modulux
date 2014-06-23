/**
 * Favicons configuration.
 */
module.exports = {
  options: {
    trueColor: true,
    precomposed: true,
    appleTouchBackgroundColor: '#00ff00',
    coast: true,
    windowsTile: true,
    tileBlackWhite: true,
    tileColor: 'auto',
    firefox: true,
    html: '<%= app_files.favicons.html %>',
    HTMLPrefix: '<%= app_files.favicons.path %>'
  },
  icons: {
    src: '<%= app_files.favicons.src %>',
    dest: '<%= app_files.favicons.dest %>'
  }
};