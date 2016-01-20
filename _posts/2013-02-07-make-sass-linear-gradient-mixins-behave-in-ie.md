---
layout: article-single-content
title: Make Sass Linear Gradient Mixins Behave in IE
date: 2013-02-07
excerpt: Don’t end up black and blue
---

I wrote this fairly straightforward cross-browser linear gradient mixin:

{% highlight scss %}
@mixin gradient($from-color, $to-color) {
  background-color: mix($from-color, $to-color); /* Fallback */
  background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from($from-color), to($to-color));
  background-image: -webkit-linear-gradient(top, $from-color, $to-color);
  background-image:    -moz-linear-gradient(top, $from-color, $to-color);
  background-image:     -ms-linear-gradient(top, $from-color, $to-color);
  background-image:      -o-linear-gradient(top, $from-color, $to-color);
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='$from-color', EndColorStr='$to-color')";
}
{% endhighlight %}

At first blush, this should work, right? However, and in retrospect I shouldn’t have been surprised by this at all, it was doing some seriously weird stuff in IE. I checked the compiled CSS; and Sass skipped parsing the variables in the `-ms-filter` attribute, passing the variable names through like nothing ever happened. (Apparently if `-ms-filter` doesn’t get starting and ending colour values it understands, it picks `blue` and `black`. [And now you know.](http://www.youtube.com/watch?v=pele5vptVgc))

I poked around some and came across [this blog post from Josh Rubinstein](http://hungrysquirrel.posterous.com/sass-mixin-for-ie-linear-gradient-filter), who was having the same problem. It turns out that `-ms-filter`, being a proprietary extension, doesn’t get recognised by Sass &ndash; when it comes along, Sass just throws its virtual hands up and passes the name of the variable.

So what to do about it then? [Sass’s interpolation syntax](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#interpolation_) to the rescue! What you need to do is wrap your variables like so: `#{$from-color}`. That way, Sass will parse your colour values, and all our browsers will live happily ever after. Here’s the fully-functional mixin:

{% highlight scss %}
@mixin gradient($from-color, $to-color) {
  background-color: mix($from-color, $to-color); /* Fallback */
  background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from($from-color), to($to-color));
  background-image: -webkit-linear-gradient(top, $from-color, $to-color);
  background-image:    -moz-linear-gradient(top, $from-color, $to-color);
  background-image:     -ms-linear-gradient(top, $from-color, $to-color);
  background-image:      -o-linear-gradient(top, $from-color, $to-color);
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#{$from-color}', EndColorStr='#{$to-color}')";
}
{% endhighlight %}

*[Gist and helpful comments on GitHub](https://gist.github.com/nickpiesco/4731166)*