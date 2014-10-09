var _ = require("lodash");
var path = require("path");
var swig = require("swig");
var traverse = require("traverse");

var log = function(msg, ob) {
    console.log(msg, JSON.stringify(ob, null, 4));
}

module.exports = function(grunt) {
    "use strict";

    grunt.registerMultiTask("swig", "Render Swig templates to HTML", function() {
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
                var hasDefaults = grunt.file.exists(src);
                var defaults = hasDefaults ? grunt.file.readJSON(src) : {};
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
            },

            addResources: function(pathname, item, page) {

                var webpack = grunt.config(options.webpack);

                webpack.resources = webpack.resources || {};
                webpack.resources[page] = webpack.resources[page] || {};
                webpack.resources[page].added = webpack.resources[page].added || {};
                webpack.resources[page].array = webpack.resources[page].array || [];

                var requires = grunt.file.expand({
                    cwd: webpack.partials.cwd + pathname
                }, webpack.partials.match);

                var resource;

                _.each(requires, function(require) {
                    resource = pathname + '/' + require
                    if (webpack.resources[page].added[resource] !== true) {
                        webpack.resources[page].added[resource] = true;
                        webpack.resources[page].array.push(resource);
                    }
                });

                grunt.config(options.webpack, webpack);
            }
        }

        _.extend(options.swigOptions.locals, locals);

        // Add defaults
        options.swigOptions.loader = swig.loaders.fs(options.config.basepath);

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

        var data = options.data;

        // If we have dynamic locals, let's do this
        if (typeof data === "function") {
            data = data();
            data = grunt.config.process(data);
        }

        var renderData;
        var contents
        var jsonPath;

        var addPage = function(items, page) {
            if (items) {
                _.each(items, function(item) {
                    item.page = page;
                    addPage(item.items, page);
                });
            }
        };

        // Iterate thru sources and create them
        this.files.forEach(function(file) {

            contents = "";

            file.src.forEach(function(src) {

                jsonPath = path.resolve(src).replace("swig", "json");

                if (grunt.file.exists(jsonPath)) {

                    renderData = _.clone(data);

                    _.extend(renderData, grunt.file.readJSON(jsonPath));

                    addPage(renderData.items, src.substring(0, src.lastIndexOf("/")));
                }

                contents += swigInstance.renderFile(src, renderData);
            });

            grunt.file.write(file.dest, contents, {
                // swig only reads in utf8.
                // if this ever change in swig, we'll need to do it here as well
                encoding: "utf8"
            });
            grunt.log.writeln("File " + file.dest.cyan + " created.");
        });
    });
};