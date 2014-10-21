#What is this?

Using [webpack](https://webpack.github.io/) & [Swig](https://paularmstrong.github.io/swig/), it provides a way to:

- Create a page using a simple data object and some snippets of HTML.
- Load page dependencies such as JavaScript, CSS and Images in one file.
- Split common page dependencies (for multiple pages or "entry points") into a common file.

See a working demo (here)[http://raypatterson.github.io/modulux/].

---

#How does it work?

It uses Swig and Webpack (and for now, [Grunt](http://gruntjs.com/)).

A long and detailed description of how this works isn't valuable since it will undergoing much change with the first major update. If you've used Swig or Webpack before you'll probably be able to understand what's going on. 

If you have any questions, [open an issue](https://github.com/RayPatterson/modulux/issues)!

---

#What do I do now?

Right now, the easiest way to check it out is to clone the repo, start making edits and see what happens.

`$ npm i; bower i; grunt server`

or to build the 'dist' folder:

`$ grunt compile`

If you have any problems, [open an issue](https://github.com/RayPatterson/modulux/issues)!

---

#What's next?

This project is barely "proof of concept" stage the 1st thing it needs is a name change... The name is pretty terrible.

Because it was the love-child of an experiment with Swig and Webpack using Grunt, there is an unnecessary dependency on Grunt which needs to be removed.

Once it's a slimmer NodeJS package, it'll need some tests.

It does everything I wanted it to do right now, so if you have any feature requests, [open an issue](https://github.com/RayPatterson/modulux/issues)!

---

#Is that it?

If you'd like to discuss the problems it's attempting to solve please feel free to [open an issue](https://github.com/RayPatterson/modulux/issues)!

---

#Thanks!

If you have any feedback, [open an issue](https://github.com/RayPatterson/modulux/issues)!

Here's a cool picture of some futuristic looking, modular living space:

![Eco-Pod: pre‐cycled modular bioreactor](http://www.archello.com/sites/default/files/imagecache/media_image/story/media/eco_pods_sky.jpg)
_Eco-Pod: pre‐cycled modular bioreactor - Photographer: Höweler + Yoon Architecture / Squared Design Lab_

---
License [MIT](https://raw.github.com/RayPatterson/breakpoint-bridge/master/LICENSE)
