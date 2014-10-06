var path = require('path');

var DefinePlugin = rekuire('node_modules/webpack/lib/DefinePlugin');
var ProvidePlugin = rekuire('node_modules/webpack/lib/ProvidePlugin');
var CommonsChunkPlugin = rekuire('node_modules/webpack/lib/optimize/CommonsChunkPlugin');
var DedupePlugin = rekuire('node_modules/webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = rekuire('node_modules/webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  options: {
    entry: '<%= app_files.webpack.entry %>',
    resolve: {
      modulesDirectories: '<%= app_files.webpack.module_dirs %>',
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[chunkhash].[id].chunk.js'
    },
    plugins: [
      new CommonsChunkPlugin('commons.js'),
      new ProvidePlugin({
        $: 'jquery/dist/jquery.js',
        jQuery: 'jquery/dist/jquery.js'
      })
    ],
    module: {
      loaders: [{
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass?outputStyle=expanded&imagePath=<%= app_files.sass.image_path %>&includePaths[]=<%= app_files.sass.include_paths %>'
      }, {
        test: /\.(eot|woff|ttf|svg)$/,
        loader: 'url'
      }, {
        test: /.*\.(gif|png|jpg)$/,
        loaders: ['image?optimizationLevel=7&interlaced=false']
      }]
    },
  },
  dev: {
    output: {
      path: '<%= build_dir %>'
    },
    devtool: 'sourcemap',
    debug: true
  },
  dist: {
    output: {
      path: '<%= compile_dir %>'
    },
    plugins: [
      new DefinePlugin({
        "process.env": {
          // This has effect on the react lib size
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      new DedupePlugin(),
      new UglifyJsPlugin()
    ]
  }
};