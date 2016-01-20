---
layout: article-single-content
title: Smarter Breakpoints with Sass
date: 2013-08-30
excerpt: Nest breakpoints while keeping your values all in one place
---

After reading about the awesomeness of [Sass](http://sass-lang.com) for a while, two things finally got me to take the plunge: [variables](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#variables_) and [nested rules](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#nested_rules). Sass also provides an extra layer of awesomeness by [allowing you to nest media queries](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#media) – combine that with some well-crafted variables, and we’re on our way to smoother responsive sailing.

There are advantages and disadvantages of nesting media queries. If you [kick it old school](http://www.youtube.com/watch?v=qBiA_po8TYM) and have one big media query with all your rules inside it, it’s kind of a pain to go back and forth between where a style is initially declared and where it’s changed in the query. However, if you need to change the breakpoint, you only need to change it once and you’re golden. Now if you *nest* your media queries, tweaking your individual rules is easier; but if you need to change a breakpoint, you’re all over the place.

‘But why would you want to change a breakpoint in the first place?’ I hear you ask. Because things change! When a layout first begins to take shape, I set some initial generic breakpoints because, well, you have to start somewhere. As things come into better focus or change down the line, though, they’ll need some tweaking here and there; and I can either have the numbers in one place and scroll back and forth to change my rules, or I can have all my rules in one place and have 8675309 numbers to change.

There is a better way! We can use the power of Sass to set variables for our breakpoints and tuck as many media queries into our stylesheet as our heart desires. As a really simple example, let’s look at a navigation menu where we list items horizontally in wide viewports and vertically in narrow viewports:

{% highlight scss %}
nav li {
  display: inline-block;
  @media (screen and max-width: 768px) {
    display: block;
  }
}
{% endhighlight %}

That’s perfectly lovely in a small stylesheet, but when you’ve got a couple thousand lines’ worth of selectors with nested media queries and need to tweak a breakpoint by a pixel ([or em](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw)) or two, you’re going to run into a bad time in a pretty big hurry. So why not let Sass do the work for you?

{% highlight scss %}
$media-narrow: 'screen and (max-width: 768px)';

nav li {
  display: inline-block;
  @media #{$media-narrow} {
    display: block;
  }
}
{% endhighlight %}

*(Note the [interpolation syntax](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#interpolation_) – it’ll break without it.)*

Now you can set up some media query variables at the top of your stylesheet with the rest of your variables and push pixels to your heart’s content!

*(Internet fist-bump to [Mason Wendell](http://twitter.com/canarymason) for the tip on interpolated variables from [this post with a lot more Sass media query goodness](http://thesassway.com/intermediate/responsive-web-design-in-sass-using-media-queries-in-sass-32).)*
