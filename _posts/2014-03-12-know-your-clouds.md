---
layout: article-single-content
title: Know Your Clouds
date: 2014-03-12
excerpt: A nice little educational resource about clouds (for users) and automated build processes (for me)
sidebar:
  - image:
    thumbnail: /assets/images/knowyourclouds_1_thumb.jpg
    alt: Know Your Clouds
    link: /assets/images/knowyourclouds_1.jpg
  - image:
    thumbnail: /assets/images/knowyourclouds_2_thumb.jpg
    alt: Know Your Clouds
    link: /assets/images/knowyourclouds_2.jpg
  - image:
    thumbnail: /assets/images/knowyourclouds_3_thumb.jpg
    alt: Know Your Clouds
    link: /assets/images/knowyourclouds_3.jpg
---

This started as a school project in 2011, and the task was to bring it up to date and responsivize it. It was also an experiment in using [Grunt](http://gruntjs.com/) to automate tasks for me, following [this awesome 24 Ways post by Chris Coyier](http://24ways.org/2013/grunt-is-not-weird-and-hard/). I initially dipped my toe in by getting Grunt set up to watch and compile my Sass; but then I went whole hog, using it to concatenate and minify my JavaScript and squash my images as well.

I used `low.html`, a typical page, as an example. Minifying the JS saved almost 103K. (I typically output Sass with the `compressed` option, so that was a wash.) A lot of the images were already optimized, but those went on a diet too. The [lightbox library I used back then](http://lokeshdhakar.com/projects/lightbox2/) lazily loaded the full-size images – something I may or may not have appreciated at the time – but between all the images on the page, I got a total slim-down of about 28K.

It's not news that minifying JS and compressing images saves space, of course; but thanks to my new friend Grunt, I was able to do it quickly, painlessly, and automatically.

- [Project site](http://nickpiesco.com/knowyourclouds/)
- [Code on GitHub](https://github.com/nickpiesco/know-your-clouds)
