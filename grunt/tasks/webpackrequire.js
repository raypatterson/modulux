var _ = require('lodash');
var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('webpackrequire', 'Webpack Require', function() {

    var data = this.data;
    var arr = grunt.file.expand(data.match);
    var temp_dir = grunt.config('temp_dir');
    var resources = [];
    var filename;
    var added;
    var json;
    var resolver;
    var template;
    var contents;
    var requires;
    var pathname;

    // Recursive function
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

    // Iterate though JSON file paths
    _.map(arr, function(val, key) {

      // Get JSON file
      json = rekuire(val);

      // Assign includes array to page resources array
      resources = json.includes;

      // String wranglin'...
      val = val.substring(data.cwd.length);
      key = val.substring(0, val.lastIndexOf('.'));

      // ... to get page root directory
      pathname = key.substring(0, key.lastIndexOf('/'));

      // console.log(pathname);

      // Get an array of matched files in the page root directory (E.g. 'js', 'scss')
      requires = grunt.file.expand({
        cwd: data.pages.cwd + pathname
      }, data.pages.match);

      // Add page file paths to page resources array 
      _.each(requires, function(require) {
        resources.push(data.pages.rename(pathname, require));
      });

      // Recursively add file paths from JSON to page resources array
      addPartials(json, resources);

      // Temp page JS file path
      filename = temp_dir + key + '.js';

      // TODO: Remove dependency. This file was created by 'grunt webpackconfig'
      template = grunt.file.read(filename);

      // Process template 
      contents = grunt.template.process(template, {
        data: {
          items: resources
        }
      });

      // Write file
      grunt.file.write(filename, contents);

    });

  });

};