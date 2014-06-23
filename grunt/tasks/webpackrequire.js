var _ = require('lodash');

module.exports = function(grunt) {

  console.log('Loaded : webpackrequire.js');

  grunt.registerMultiTask('webpackrequire', 'Webpack Require', function() {

    var data = this.data;
    var arr = grunt.file.expand(data.match);
    var temp_dir = grunt.config('temp_dir');
    var filenames = [];
    var filename;
    var added;
    var json;
    var resolver;
    var template;
    var contents;

    var addPartials = function(data, arr) {

      added = {};

      resolver = function(item) {

        if (item.partial) {
          if (item.items) {
            (function(items) {
              var i = 0;
              var l = items.length;
              for (i; i < l; i++) {
                resolver(items[i]);
              }
            }(item.items));
          }

          if (added[item.partial] !== true) {
            added[item.partial] = true;
            arr.push(item.partial + '/scripts.js');
            arr.push(item.partial + '/styles.scss');
          }
        }
      };

      if (data.items) {
        resolver(data.items[0]);
      }
    }

    _.map(arr, function(val, key) {

      json = rekuire(val);

      val = val.substring(val.lastIndexOf(data.cwd) + data.cwd.length);
      key = val.substring(0, val.lastIndexOf(data.ext) - 1).replace('data', 'scripts');

      console.log(key + ':' + val);

      filenames = json.includes;

      addPartials(json, filenames);

      filename = temp_dir + key + '.js';

      template = grunt.file.read(filename);

      contents = grunt.template.process(template, {
        data: {
          items: filenames
        }
      });

      grunt.file.write(filename, contents);

    });

    console.log('filenames', filenames);

  });

};