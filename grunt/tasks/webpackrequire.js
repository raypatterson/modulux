var _ = require('lodash');
var path = require('path');

module.exports = function(grunt) {

  var temp_dir = grunt.config('temp_dir');
  var arr;
  var resources = [];
  var filename;
  var added;
  var json;
  var resolver;
  var template;
  var contents;
  var requires;
  var includes;
  var pathname;

  // Recursive function
  var addPartials = function(json, resources, data) {

    added = {};

    resolver = function(item, data) {

      if (item.partial) {
        if (item.items) {
          (function(items) {
            var i = 0;
            var l = items.length;
            for (i; i < l; i++) {
              resolver(items[i], data);
            }
          }(item.items));
        }

        if (added[item.partial] !== true) {

          added[item.partial] = true;

          requires = grunt.file.expand({
            cwd: data.partials.cwd + item.partial
          }, data.partials.match);

          _.each(requires, function(require) {
            resources.push(item.partial + '/' + require);
          });
        }
      }
    };

    if (json.items) {
      resolver(json.items[0], data);
    }
  }

  addResources = function(data) {

    filelist = grunt.file.expand(data.match);

    console.log('addResources:', filelist);

    // Iterate though JSON file paths
    _.map(filelist, function(val, key) {

      // Get JSON file
      json = rekuire(val);

      // Assign includes array to page resources array
      resources = json.includes;

      // String wranglin' ...
      val = val.substring(data.cwd.length);
      key = val.substring(0, val.lastIndexOf('.'));

      // ... to get page root directory
      pathname = key.substring(0, key.lastIndexOf('/'));

      // See if there are some includes in the config data
      // NOTE: These are added by swig:dev in the addResources helper function
      // TODO: Clean this up
      var i = data.cwd.replace(/.\//, '');
      i = i.substring(0, i.length - 1);
      if (pathname) {
        i += '/' + pathname;
      }
      resources = resources.concat(data.resources[i]);

      // Get an array of matched files in the page root directory (E.g. 'js', 'scss')
      requires = grunt.file.expand({
        cwd: data.pages.cwd + pathname
      }, data.pages.match);

      // Add page file paths to page resources array 
      _.each(requires, function(require) {
        resources.push(data.pages.rename(pathname, require));
      });

      // Recursively add file paths from JSON to page resources array
      addPartials(json, resources, data);

      // TODO: Remove dependency. This file was created by 'grunt webpackconfig'
      // Temp page JS file path
      filename = temp_dir + key + '.js';

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
  };

  grunt.registerMultiTask('webpackrequire', 'Webpack Require', function() {

    addResources(this.data);

  });

};