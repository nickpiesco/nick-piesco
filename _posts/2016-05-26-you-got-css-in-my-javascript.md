---
layout: article-single-content
title: You Got CSS in My JavaScript!
date: 2016-05-26
excerpt: Solve new problems the old-fashioned way
---

*This is from a talk I gave at [ATXSass](http://atxsass.com/) in May 2016.*

Thanks to the popularity of [React](https://facebook.github.io/react/), mixing markup and behaviour – once thought unfathomable – is now almost commonplace. So why not invite styling along to the party? Adding inline styles to your markup is a breeze.

‘Inline styling?!’ I hear you say?

I know, I was skeptical too. But for all the progress CSS has made over the past almost 20 years, it’s still broken and annoying enough that we’ve invented whole ecosystems of tooling to... well, make it less broken and annoying.

As it turns out, putting your CSS in your JavaScript components makes a pretty big chunk of that badness just disappear. And the stuff we use our favourite pre- and postprocessors for, like variables, math, and loops? You get that for free.

Moving to a truly componentized front end not only saved our CSS sanity, it got our team shipping more features with fewer bugs faster – we just had to let go of some old habits and prejudices first.

<div class="speaker-deck">
  <script async class="speakerdeck-embed" data-id="a06acbfd8e3545daae0e9b8de086f2e2" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>
</div>

- [React: CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js)
- [Radium](http://stack.formidable.com/radium/)
- [color: JavaScript colour conversion and manipulation library](https://github.com/Qix-/color)
