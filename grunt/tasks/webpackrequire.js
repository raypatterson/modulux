var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var globule = require('globule');
var traverse = require('traverse');

module.exports = function(grunt) {

  var temp_dir = grunt.config('temp_dir');
  var arr;
  var resources = [];
  var resource;
  var added;
  var json;
  var resolver;
  var template;
  var contents;
  var requires;
  var includes;
  var pageName;
  var pageRoot;
  var fileName;

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

  var rename = function(require, pageRoot, prefix) {
    if (pageRoot) {
      require = pageRoot + '/' + require;
    }
    if (prefix) {
      require = prefix + require;
    }
    return require;
  }

  var addResources = function(data) {

    filelist = globule.find(data.match);

    // console.log('addResources:', filelist);

    // Iterate though JSON file paths
    _.map(filelist, function(val, key) {

      // Get JSON file
      json = rekuire(val);

      // Assign includes array to page resources array
      resources = json.includes;

      // Assign page name
      pageName = val.substring(0, val.lastIndexOf('/'));

      // Assign page root
      val = val.substring(data.cwd.length, val.lastIndexOf('.'));
      pageRoot = val.substring(0, val.lastIndexOf('/'));

      // See if there are some includes in the config data
      // NOTE: These are added in the swig task, loader callback
      resources = resources.concat(data.resources[pageName].array);

      // Get an array of matched files in the page root directory (E.g. 'js', 'scss')
      requires = globule.find(data.pages.match, {
        cwd: data.pages.cwd + pageRoot
      });

      // Add page file paths to page resources array 
      _.each(requires, function(require) {
        resources.push(rename(require, pageRoot, data.pages.prefix));
      });

      // Recursively add file paths from JSON to page resources array
      addPartials(json, resources, data, data.resources[pageName].added);

      // TODO: Remove dependency. This file was created by 'grunt webpackconfig'
      // Temp page JS file path
      fileName = temp_dir + val + '.js';

      template = fs.readFileSync(fileName, {
        encoding: 'utf-8'
      });

      // Process template 
      contents = _.template(template, {
        items: resources
      });

      // Write file
      fs.outputFileSync(fileName, contents);

      console.log('File ' + fileName.cyan + ' created.');

    });
  };

  grunt.registerMultiTask('webpackrequire', 'Webpack Require', function() {

    addResources(this.data);

  });

};