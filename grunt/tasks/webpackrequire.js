var _ = require('lodash');
var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('webpackrequire', 'Webpack Require', function() {

    grunt.xxx = "foo";

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
    var requires;
    var pathname;

    var addPartials = function(json, arr) {

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

            requires = grunt.file.expand({
              cwd: data.partials.cwd + item.partial
            }, data.partials.match);

            _.each(requires, function(require) {
              arr.push(item.partial + '/' + require);
            });
          }
        }
      };

      if (json.items) {
        resolver(json.items[0]);
      }
    }

    _.map(arr, function(val, key) {

      json = rekuire(val);

      filenames = json.includes;

      val = val.substring(data.cwd.length);
      key = val.substring(0, val.lastIndexOf('.'));

      pathname = key.substring(0, key.lastIndexOf('/'));

      requires = grunt.file.expand({
        cwd: data.pages.cwd + pathname
      }, data.pages.match);

      _.each(requires, function(require) {
        filenames.push(data.pages.rename(pathname, require));
      });

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

  });

};