modulux
=======

Modulux - A modular approach to web development

![Eco-Pod: pre‐cycled modular bioreactor](http://www.archello.com/sites/default/files/imagecache/media_image/story/media/eco_pods_sky.jpg)
_Eco-Pod: pre‐cycled modular bioreactor - Photographer: Höweler + Yoon Architecture / Squared Design Lab_

What is this?

Modulux provides a way to:

* Create a page using a simple data object and some snippets of HTML.
* Load page dependencies such as JavaScript, CSS and Images in one file.
* Split common page dependencies (for multiple pages or "entry points") into a common file.

How does it work?

Modulux uses Grunt, Swig and Webpack.

What do I need to do to get it working?

Right now, the easiest way is to clone the repo, start makign edits and see what happens.

`$ npm i; bower i; grunt server`

What's next?

This project is barely "proof of concept" stage. 

Because it was the love-child of an experiment with Swig and Webpack using Grunt, there is an unnecessary dependency on Grunt which needs to be removed.

Once it's a slimmer NodeJS package, it'll need some tests.

It does everything I wanted it to do right now, so if you have feature requests, open an issue.

Is that it?

A long and detailed description of how this works isn't valuable since it will undergoing much change with the first major update. If you've used Swig or Webpack before you'll probably be able to understand what's going on. If you'd like to discuss the problems it's attempting to solve please feel free to open an issues to discuss. 

Thanks!
