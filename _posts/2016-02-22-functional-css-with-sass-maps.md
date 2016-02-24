---
layout: article-single-content
title: Functional CSS with Sass Maps
date: 2016-02-22
excerpt: Generate atomic, composable, reusable rules
---

Functional CSS is quite a bit different than the traditional [object-oriented approach](https://github.com/stubbornella/oocss/wiki). Instead of breaking your interface into components and styling them one by one, functional CSS focuses on using single-purpose classes to compose your elements’ styles. More classes that do fewer things results in fewer style conflicts, fewer hacky overrides to fix those style conflicts, and ultimately a smaller and more maintainable codebase. [Jon Gold](http://www.jon.gold/) has [a great introduction](http://www.jon.gold/2015/07/functional-css/), and [Cole Peters](https://colepeters.com/)’s [Building and Shipping Functional CSS](https://blog.colepeters.com/building-and-shipping-functional-css/) is an excellent deep dive into the philosophy and its real-world implementation.

My initial misgiving was that it looks a *whole* lot like presentational classes, something that as a big fan of semantic markup, I strenuously try to avoid. On the other hand, I appreciate how it takes the [Unix Philosophy](http://www.faqs.org/docs/artu/ch01s06.html) and extends it to CSS – small, composable units that do one thing and do it well. It just so happened that I had a [small wedding website](https://reneauand.nickpiesco.com) to build that would be a nice place to play around with something new, so I figured I’d have a bash at it.

I set up variables to handle small, medium, and large spacing for margin and padding, namespaced with an `s`: `$s-s` (`0.5em`), `$s-m` (`1em`), and `$s-l` (`2em`). If I wanted margin and padding to be the same size on every side of an element, it was easy enough (classes are namespaced with `l` for ‘layout’):

{% highlight scss %}
.l-ms {
  margin: $s-s;
}

.l-mm {
  margin: $s-m;
}

.l-ml {
  margin: $s-l;
}

.l-ps {
  padding: $s-s;
}

.l-pm {
  padding: $s-m;
}

.l-pl {
  padding: $s-l;
}
{% endhighlight %}

Things got significantly more verbose, though, when I wanted to pick and choose which sides of an element I wanted to add spacing to:

{% highlight scss %}
.l-mts {
  margin-top: $s-s;
}

.l-mtm {
  margin-top: $s-m;
}

.l-mtl {
  margin-top: $s-l;
}

.l-mbs {
  margin-bottom: $s-s;
}

.l-mbm {
  margin-bottom: $s-m;
}

.l-mbl {
  margin-bottom: $s-l;
}

// [...etc.]
{% endhighlight %}

It seems like there’s a pretty good amount of repetition here; and where there’s repetition, there’s an opportunity to put Sass to work! Let’s see if we can break this down, using ‘small `margin-top`’ as an example:

{% highlight scss %}
.l-mts {
  margin-top: $s-s;
}
{% endhighlight %}

We’re dealing with three things here:

* The property (`margin` and `padding`)
* The side of the element we’re applying the spacing to
* How much spacing we’re applying

We abbreviate all these properties in the class name, but use their actual values in the rule. To keep the abbreviated and non-abbreviated versions in sync, we can use a small map.

{% highlight scss %}
@each $prop, $prop-abbrev in (
  margin: m
) {

  @each $side, $side-abbrev in (
    top: t
  ) {

    @each $spacing, $spacing-var in (
      s: $s-s
    ) {

      // Yikes!
      .l-#{$prop-abbrev}#{$side-abbrev}#{$spacing} {
        #{$prop}-#{$side}: $spacing-var;
      }

    }

  }

}
{% endhighlight %}

That thing may look a mess, but what it’s doing is pretty straightforward: for the class name, it takes our property, side, and spacing abbreviations and mushes them all together. For the rule, it uses the expanded values. (It would probably look a lot less complicated if I didn’t have to use [interpolation syntax](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#interpolation_), but sometimes you gotta do it.)

Now that we have a working loop, if we want to generate all of our margin and padding rules, all we have to do is flesh out our maps:

{% highlight scss %}
@each $prop, $prop-abbrev in (
  margin: m,
  padding: p
) {

  @each $side, $side-abbrev in (
    top: t,
    right: r,
    bottom: b,
    left: l
  ) {

    @each $spacing, $spacing-var in (
      s: $s-s,
      m: $s-m,
      l: $s-l
    ) {

      .l-#{$prop-abbrev}#{$side-abbrev}#{$spacing} {
        #{$prop}-#{$side}: $spacing-var;
      }

    }

  }

}
{% endhighlight %}

But wait! Remember the initial shorthand properties we wrote earlier? We can have the loop generate those too. Since we don’t need to specify what side we’re applying the spacing to, we can dump out before we loop over the sides – we just have to change up the order we run the loops in.

{% highlight scss %}
@each $prop, $prop-abbrev in (
  margin: m,
  padding: p
) {

  @each $spacing, $spacing-var in (
    s: $s-s,
    m: $s-m,
    l: $s-l
  ) {

    // Hook up our shorthand rules
    .l-#{$prop-abbrev}#{$spacing} {
      #{$prop}: $spacing-var;
    }

    @each $side, $side-abbrev in (
      top: t,
      right: r,
      bottom: b,
      left: l
    ) {

      // Our existing ‘rule-per-side’ deal
      .l-#{$prop-abbrev}#{$side-abbrev}#{$spacing} {
        #{$prop}-#{$side}: $spacing-var;
      }

    }

  }

}
{% endhighlight %}

I make no claim that my functional CSS implementation is an expert one, but it was fun taking something new for a test drive. Check out [the project on GitHub](https://github.com/nickpiesco/reneau-and-nick) if you’d like to see the whole thing in action.
