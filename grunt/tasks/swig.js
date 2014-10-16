var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var globule = require('globule');
var traverse = require('traverse');
var swig = require('swig');
var loader = rekuire('grunt/lib/loaders/filesystem');

var log = function(msg, ob) {
    console.log(msg, JSON.stringify(ob, null, 4));
}

module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('swig', 'Render Swig templates to HTML', function() {
        var options = this.options({
            data: {},
            tags: {},
            swigOptions: {}
        });

        // Add helper methods
        var locals = {

            getPartialPath: function(slug, item) {

                var cfg = options.config.partials;
                var src = cfg.src + slug + cfg.filepath;

                return src;
            },

            setDefaultsData: function(slug, item) {

                var cfg = options.config.partials;
                var src = cfg.src + slug + cfg.datapath;
                var hasDefaults = fs.existsSync(src);
                var defaults = fs.existsSync(src) ? fs.readJSONSync(src) : {};
                var traverseDefaults = traverse(defaults);
                var itemDefaults = traverse(item);

                itemDefaults.forEach(function(node) {
                    if (this.isLeaf) {
                        if (_.isObject(this.node) && _.isEmpty(this.node)) {
                            // Allows for placeholders to
                            // be ignored within Arrays 
                        } else {
                            traverseDefaults.set(this.path, this.node);
                        }
                    } else if (node.override) {
                        traverseDefaults.set(this.path, this.node);
                    }
                });

                return defaults;
            }
        }

        _.extend(options.swigOptions.locals, locals);

        var page = null;

        var addResources = function(file) {

            if (file.indexOf('.swig') !== -1) {

                // Loading new page

                page = file.substring(options.config.basepath.length + 1, file.lastIndexOf('/'));

            } else if (file.indexOf(options.config.partials.src) !== -1) {

                // Loading page partials

                file = file.substring(options.config.partials.src.length, file.lastIndexOf('/'));

                var webpack = grunt.config(options.webpack);

                webpack.resources = webpack.resources || {};
                webpack.resources[page] = webpack.resources[page] || {};
                webpack.resources[page].added = webpack.resources[page].added || {};
                webpack.resources[page].array = webpack.resources[page].array || [];

                var requires = globule.find(webpack.partials.match, {
                    cwd: webpack.partials.cwd + file
                });

                var resource;

                _.each(requires, function(require) {
                    resource = file + '/' + require
                    if (webpack.resources[page].added[resource] !== true) {
                        webpack.resources[page].added[resource] = true;
                        webpack.resources[page].array.unshift(resource);
                    }
                });

                grunt.config(options.webpack, webpack);
            }
            // } else { Loading a layout or macro }
        }

        // Add defaults
        options.swigOptions.loader = loader(options.config.basepath, 'utf8', addResources);

        // Create Swig instance
        var swigInstance = new swig.Swig(options.swigOptions);

        // Add custom filters
        _.forEach(options.filters, function(callback, name) {
            swigInstance.setFilter(name, callback);
        });

        // Add custom tags
        _.forEach(options.tags, function(tag, name) {
            swigInstance.setTag(name, tag.parse, tag.compile, tag.ends, tag.blockLevel);

            if (tag.ext) {
                swigInstance.setExtension(name, tag.ext);
            }
        });

        var data;
        var contents
        var jsonPath;

        // Iterate thru sources and create them
        this.files.forEach(function(file) {

            contents = '';

            file.src.forEach(function(src) {

                jsonPath = path.resolve(src).replace('swig', 'json');

                if (fs.existsSync(jsonPath)) {

                    data = _.clone(options.data);

                    _.extend(data, fs.readJSONSync(jsonPath));
                }

                contents += swigInstance.renderFile(src, data);
            });


            fs.outputFileSync(file.dest, contents);

            console.log('File ' + file.dest.cyan + ' created.');
        });
    });
};