/**
 * Compass configuration.
 */
module.exports = {
  dest: '<%= build_dir %>/<%= app_files.sass.specify_dist %>.css',
  output: '<%= build_dir %>/<%= app_files.sass.specify_dist %>.css',

  compile: {
    options: {
      sassDir: '<%= source_dir %>',
      cssDir: '<%= build_dir %>',
      specify: '<%= source_dir %>/<%= app_files.sass.specify_src %>.scss',
      fontsDir: '<%= app_files.sass.fonts_dir %>',
      imagesDir: '<%= app_files.sass.images_dir %>',
      importPath: '<%= app_files.sass.import_path %>',
      environment: 'production',
      raw: "preferred_syntax = :scss\n"
    }
  },

  build: {
    options: {
      outputStyle: 'compact',
      sassDir: '<%= source_dir %>',
      cssDir: '<%= build_dir %>',
      specify: '<%= source_dir %>/<%= app_files.sass.specify_src %>.scss',
      fontsDir: '<%= app_files.sass.fonts_dir %>',
      imagesDir: '<%= app_files.sass.images_dir %>',
      importPath: '<%= app_files.sass.import_path %>',
      environment: 'development',
      raw: "preferred_syntax = :scss\n"
    },
    dist: {},
    server: {
      options: {
        debugInfo: true
      }
    }
  }
};