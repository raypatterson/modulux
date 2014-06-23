/**
 * The `copy` task just copies files from A to B. We use it here to copy
 * our project assets (images, fonts, etc.) and javascripts into
 * `build_dir`, and then to copy the assets to `compile_dir`.
 */
module.exports = {
  build_app_assets: {
    files: [
      {
        src: '<%= app_files.assets_src %>',
        cwd: '<%= source_dir %>',
        dest: '<%= build_dir %>',
        expand: true
          }
       ]
  },
  compile_assets: {
    files: [
      {
        src: ['**'],
        dest: '<%= compile_dir %>',
        cwd: '<%= build_dir %>',
        expand: true
          }
        ]
  }
};