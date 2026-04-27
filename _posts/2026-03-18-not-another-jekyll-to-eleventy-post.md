---
layout: article-single-content
title: Not another Jekyll to Eleventy post
date: 2018-09-13
excerpt: I’m still calling it ‘Eleventy’
---

Just ten short years ago, I launched a new personal website based on Jekyll. I wanted to move to static site generation, I worked at a Ruby shop, and it was 2016 – made perfect sense! The idea was to make creating content and publishing easier; and judging by my post frequency, we can all see how that went.

I very briefly considered pointing some LLM tool at it and calling it a day, but I wasn’t going to pay for the privilege of calling a project ‘done’ without learning anything.

It was pretty much a lift-and-shift operation. Migrating my templates to Liquid Just Worked™, and duplicating the behaviour of the existing Jekyll setup was fairly straightforward. Here’s the kit I ended up using:

- [`@11ty/eleventy-plugin-syntaxhighlight`](https://github.com/11ty/eleventy-plugin-syntaxhighlight)
- [`@gotfeedback/markdown-it-media`](https://github.com/OneSpot-Learning/markdown-it-media) to shoehorn in the one native video I wanted to add
- [`eleventy-sass`](https://github.com/kentaroi/eleventy-sass): Using the beta here, so I need to send the `--experimental-require-module` flag. Nothing an npm script can’t fix.
- [`markdown-it-anchor`](https://github.com/valeriangalliat/markdown-it-anchor)

There were a couple little knobs I had to twiddle to maintain post collation behaviour and file structure; but all in all, it went pretty smoothly. Have a squiz at the source on GitHub if you want the full look behind the curtain.
