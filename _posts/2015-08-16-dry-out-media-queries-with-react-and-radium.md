---
layout: article-single-content
title: DRY out Media Queries with React and Radium
date: 2015-08-16
excerpt: Using modern technology with one of the oldest techniques in the book
---

At [Bloomfire](https://bloomfire.com/), we’re loving building new components with [React](https://facebook.github.io/react/). We’re even going all in with using ES6 modules and inline styles. (‘Inline styles?!’ I hear you say? [Don’t knock it ’til you’ve tried it.](https://speakerdeck.com/vjeux/react-css-in-js))

There’s a lot of cool stuff we can do with CSS that we can’t do with inline styles, though; and that’s where [Radium](http://projects.formidablelabs.com/radium/) comes in. Radium not only provides a handy way to style `:hover`, `:focus`, and `:active` states, but it also deftly handles media queries. If you’re using inline styles in React and not using Radium, you should. I’ll give you a minute to go look it over &ndash; [here’s the link again.](http://projects.formidablelabs.com/radium/)

Back? Okay.

We create a style object in each of our React components, which we then reference in the JSX below. Here’s a super-stripped-down example:

{% highlight js %}
// [myAwesomeButton.js]

const styles = {
  button: {
    backgroundColor: '#005496'
  },
  buttonText: {
    color: 'white'
  }
};

export default class MyAwesomeButton {
  render () {
    return (
      <button style={styles.button}>
        <span style={styles.buttonText}>
          {this.props.buttonText}
        </span>
      </button>
    );
  }
}
{% endhighlight %}

Variables
---------

In our existing application, we keep all our colour variables in a single [Sass](http://sass-lang.com/) partial so we can share values across components and not have to chase them down every time we want to change something. This should look pretty familiar:

{% highlight scss %}
// [_colors.scss]

$brand-blue: #005496;
$brand-orange: #f37021;

$brand-color: $brand-blue;
$accent-color: $brand-orange;
{% endhighlight %}

We can do that with React too &ndash; we create a component that contains the colours we need and then import it wherever we need it:

{% highlight js %}
// [colors.js]

const baseColors = {
  brandBlue: '#005496',
  brandOrange: '#f37021'
};

export default {
  brandColor: baseColors.brandBlue,
  accentColor: baseColors.brandOrange
};
{% endhighlight %}
{% highlight js %}
// [myAwesomeButton.js]

import colors from 'path/to/colors';

const styles = {
  button: {
    backgroundColor: colors.brandColor
  },
  buttonText: {
    color: 'white'
  }
};
{% endhighlight %}

Media Queries
-------------

Radium nestles media queries snugly in your style object:

{% highlight js %}
const styles = {
  hideThisOnBigScreens: {
    display: 'block',
    '@media screen and (min-width: 64em)': {
      display: 'none'
    }
  }
};
{% endhighlight %}

In the Sass world, we do the same thing with media queries that we do with colours &ndash; put them in a separate partial for easy cross-component sharing and to keep all the maintenance in one place.

{% highlight scss %}
// [_media-queries.scss]

$breakpoint-large: '@media screen and (min-width: 64em)';
$breakpoint-small: '@media screen and (max-width: 20em)';
{% endhighlight %}

So we can set up a media queries component just like we did for colours:

{% highlight js %}
// [mediaQueries.js]

export default {
  breakpointLarge: '@media screen and (min-width: 64em)',
  breakpointSmall: '@media screen and (max-width: 20em)'
};
{% endhighlight %}

However, this bombs out:

{% highlight js %}
// [somethingForBigScreens.js]

import mediaQueries from 'path/to/mediaQueries';

// This doesn’t work
const styles = {
  hideThisOnBigScreens: {
    display: 'block',
    mediaQueries.breakpointLarge: {
      display: 'none'
    }
  }
};
{% endhighlight %}

That’s because a naked variable can be the *value* of an object’s property, but not the *key*.

ES6 to the rescue! ES6 brings us [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names), which allow us to use an expression like our variable here &ndash; as long as we wrap it in square brackets.

{% highlight js %}
// [somethingForBigScreens.js]

import mediaQueries from 'path/to/mediaQueries';

// This works!
const styles = {
  hideThisOnBigScreens: {
    display: 'block',
    [mediaQueries.breakpointLarge]: {
      display: 'none'
    }
  }
};
{% endhighlight %}

Now that we can use variables for both keys and values, we can set them up in one central location to keep our code nice, DRY, and easy to maintain.
