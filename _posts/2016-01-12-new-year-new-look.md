---
layout: article-single-content
title: New Year, New Look
date: 2016-01-12
excerpt: ‘The cobbler’s children are always barefoot’
---

My old portfolio site was the first responsive one I built, way back in 2012. Looking at it now? Hoo boy, is that thing ugly under the hood. But that’s a good thing, right? If you can’t look back on your old work (or in this case, *very* old work) and have the same reaction, you’re not learning and growing.

As tends to happen, my Day Job&trade; and the occasional fun side project got in the way of taking care of my own house, Webbily speaking. The impetus to finally get this thing done was my desire to start writing and speaking more. I had [Gist blogged](http://nickpiesco.roughdraft.io/) some before, but I really wanted to keep all my work (both bloggy and portfolio-type) in one place that was quick and easy to publish to.

Pattern Library
---------------

I’m a firm believer in the philosophy of ‘patterns, not pages’. Instead of designing a site as a stack of individual pages, it’s a lot more flexible and maintainable to create the building blocks of those pages (header, footer, content sections, etc.) and then mix and match the pieces as you need them. Those pieces live in a [pattern library](http://alistapart.com/blog/post/getting-started-with-pattern-libraries) – a living document showing all of the components the site uses.

I started by creating an [interface inventory](http://bradfrost.com/blog/post/interface-inventory/). Typically, you do an interface inventory when you have an existing site you want to redesign; but when you design a new site, it’s valuable to think of which patterns will best serve your content. With the list done, I created a blank page and started building out components. That page became my [pattern library](/pattern-library.html). The pattern library references the same CSS as the site itself – any changes in one place will be reflected in the other, so the styling always stays in sync.

Since this site has a development team of one, I didn’t feel it necessary to extensively document the markup and use cases for each component, but I made the pattern library public in case anyone wants to have a peek under the hood. [Feel free to have a look yourself](/pattern-library.html)!

The Build
---------

I built my original site as I was finishing my courses at [TSTC](http://www.tstc.edu/), where they taught us the LAMP stack as part of the development curriculum; so I just used a bunch of PHP includes and called it a day. Nowadays, though, it seems there’s a [static site generator](https://www.staticgen.com/) for any stack you can imagine (and probably some you can’t). If you merely want to serve up a stack of static pages, why bother hitting the server every time when you can build it once locally?

I picked at a few different solutions before settling on [Jekyll](http://jekyllrb.com/). I had played with Jekyll a couple years ago and put it aside, since getting everything running smoothly on Windows was rather more involved than I would have liked.

Fast-forward to today, and Jekyll is much easier to use – I credit the move from [Pygments](http://pygments.org/) to [Rouge](http://rouge.jneen.net/) as the default syntax highlighter, which lets PC users avoid messing about with Python versions and package management on top of the somewhat delicate Ruby setup. [Julian Thilo](https://twitter.com/juthilo)’s excellent [guide to running Jekyll on Windows](http://jekyll-windows.juthilo.com/) got me going in no time, so now adding new content is as easy as adding a new Markdown file.

Sass
----

Jekyll not only builds the site for me, but also [compiles Sass automatically out of the box](http://jekyllrb.com/docs/assets/). The one drawback, though, is that it doesn’t handle complex Sass structures well – you can only `@import` files that live in the same directory as your `main.scss`.

But I wanted something less flat. I write my Sass in small, easily maintainable modules, which I then group into directories. This is how I [reorganized the CSS structure at Bloomfire](https://github.com/bloomfire/styleguides/tree/master/css#architecture), and it’s the same concept behind [Hugo Giraudel](http://hugogiraudel.com/)’s [7-1 Pattern](http://sass-guidelin.es/#the-7-1-pattern). This site uses a fairly simple version:

<pre>
thirdparty/
  +-[reset and syntax highlighting theme]
global/
  +-[layout, typography, etc.]
pages/
  +-[styles scoped to individual pages]
</pre>

Fortunately, Jekyll already has the `_includes` directory all set for us. I moved my well-structured Sass there and had [Liquid](http://liquidmarkup.org/) do the imports for me instead of Sass. Here’s how `main.scss` turned out – it’s a little more verbose, but it works:

<pre>
{% raw %}---
---

{% include scss/thirdparty/reset.css %}
{% include scss/thirdparty/rouge/github.css %}

{% include scss/global/_variables.scss %}
{% include scss/global/_media-queries.scss %}
{% include scss/global/_typography.scss %}
{% include scss/global/_layout.scss %}
{% include scss/global/_icons.scss %}
{% include scss/global/_header-footer.scss %}
{% include scss/global/_content.scss %}

{% include scss/pages/_home.scss %}
{% include scss/pages/_article.scss %}
{% include scss/pages/_pattern-library.scss %}{% endraw %}
</pre>

([This post](https://talk.jekyllrb.com/t/have-multiple-directories-for-my-sass-partials-possible/1261/) helped me immensely in getting everything set up the way I wanted.)

Keep It Fast
------------

My previous site was pretty minimalist, but I wanted to take this opportunity to make the new version even leaner and meaner. I started by dumping the [lightbox script](http://lokeshdhakar.com/projects/lightbox2/) I used to show off the screenshots in the portfolio, since I have yet to find a lightbox script that works nicely on mobile. That was the only piece of JS on the site (other than Google Analytics); so I got to dump jQuery too, for a total savings of about 100K.

I did re-add that, though, in custom fonts. I wanted to use [the new version of Roboto](http://googledevelopers.blogspot.com/2014/07/the-new-roboto.html), which is only available from [Google Fonts](https://www.google.com/fonts/). (There’s a *chance* a visitor may have it cached from visiting another site, saving that extra bandwidth, but it’s nothing worth relying on.)

It was a lot harder than I thought to find a decent coherent set of SVG social media icons, so I serve up an aggressively-subsetted version of [Stackicons](http://stackicons.com/) as an inline WOFF. The whole deal weighs in at less than 5K, which is pretty good to me.

So using a representative page ([‘Know Your Clouds’](/know-your-clouds)) as a benchmark, the numbers don’t show *quite* as much of an improvement as I would have liked – in fact, it got heavier!

**Before:** 18 requests, 155.9K<br>
**After:** 16 requests, 224.7K

Turns out that fonts are responsible for 149.2K of that 224.7K. Since the fonts only load the first time the user hits the site (assuming they weren’t cached already), the font-free weight of 75.5K is probably closer to the average case. Both those numbers are pretty small, though; and I think the better visual results from the custom fonts are worth the initial extra little bit of page weight.

Things I Could Have Done Better and/or Still Need to Do
-------------------------------------------------------

There’s still more performance work to be done – I’d like to experiment with [critical CSS](https://css-tricks.com/authoring-critical-fold-css/) and find a way to [optimize the Web font loading](https://www.filamentgroup.com/lab/font-loading.html). I feel like I can cut some fat out of the logo SVG as well. (I could probably stand to properly SVG-ify the social media icons, but I’m not sure what the savings, if any, would be.)

Something I really would have liked to have done, and something I’ll definitely do if (okay, *when*) I do something like this again, is [design in the open](http://bradfrost.com/blog/post/designing-in-the-open/). I had every intention of designing in the open this go-round; but in the fits and starts of getting Jekyll to work, I was like ‘oh, I’ll just go ahead and open it up when I get that sorted’, which became ‘well, let me just get this content stubbed out first’, which eventually turned into ‘okay, I’ll just do it when I’m ready to launch’.

So the Git history maybe isn’t as interesting as it otherwise could be, but the code for this site is on [GitHub](https://github.com/nickpiesco/nick-piesco). All the rest of the updates will be in the open, I promise.
