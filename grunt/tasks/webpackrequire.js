var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var globule = require('globule');

module.exports = function(grunt) {

  var temp_dir = grunt.config('temp_dir');
  var arr;
  var resources = [];
  var resource;
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
  var addPartials = function(json, resources, data, added) {

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

        requires = globule.find(data.partials.match, {
          cwd: data.partials.cwd + item.partial
        });

        _.each(requires, function(require) {

          resource = item.partial + '/' + require;

          if (added[resource] !== true) {

            added[resource] = true;

            resources.push(resource);
          }
        });
      }
    };

    if (json.items) {
      resolver(json.items[0], data);
    }
  }

  addResources = function(data) {

    filelist = globule.find(data.match);

    // console.log('addResources:', filelist);

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
      // NOTE: These are added in the swig2 task, addResources helper function
      // TODO: Clean this up
      var i = data.cwd.replace(/.\//, '');
      i = i.substring(0, i.length - 1);
      if (pathname) {
        i += '/' + pathname;
      }
      resources = resources.concat(data.resources[i].array);

      // Get an array of matched files in the page root directory (E.g. 'js', 'scss')

      requires = globule.find(data.pages.match, {
        cwd: data.pages.cwd + pathname
      });

      // Add page file paths to page resources array 
      _.each(requires, function(require) {
        resources.push(data.pages.rename(pathname, require));
      });

      // Recursively add file paths from JSON to page resources array
      addPartials(json, resources, data, data.resources[i].added);

      // TODO: Remove dependency. This file was created by 'grunt webpackconfig'
      // Temp page JS file path
      filename = temp_dir + key + '.js';

      template = fs.readFileSync(filename, {
        encoding: 'utf-8'
      });

      // Process template 
      contents = _.template(template, {
        items: resources
      });

      // Write file
      fs.outputFileSync(filename, contents);

      console.log('File ' + filename.cyan + ' created.');

    });
  };

  grunt.registerMultiTask('webpackrequire', 'Webpack Require', function() {

    addResources(this.data);

  });

};