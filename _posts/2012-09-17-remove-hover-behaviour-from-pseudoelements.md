---
layout: article-single-content
title: Remove Hover Behaviour from Pseudoelements
date: 2012-09-17
excerpt: Sometimes you want an underline, sometimes you don’t
---

We all love the cool stuff we can do with pseudoelements in CSS... almost as much as we love being able to specify hover behaviour without having to mess about with JavaScript. When we try to use the two together, though, sometimes we can run into problems.

One frequently-used way is to use `:after` to append an arrow after some link text. Unfortunately, if we also have some sort of hover behaviour applied to that link, it will also apply to the pseudoelement as well. Most of the time, it’s not a huge deal; but sometimes, it just looks wonky.

I had a fairly standard menu of list items with `background-color` applied to each item and `:hover` applied to the anchor tags. The last item was a sign-out link, to which I wanted to append an arrow for more call-to-action goodness. Since I wanted only that last link to have the pseudoelement applied, I had to assign a class to only that link and then apply the pseudoelement. That worked nicely... until I hovered over the link. The stupid arrow was underlined! I can’t say I was surprised by this -- the arrow *was* appended to the anchor, of course, courtesy of the class I had applied; so it stands to reason that it also got an underline on hover.

But that’s not what I wanted! A little quick Googling didn’t turn up satisfactory results; so I started flailing about wildly, trying all sorts of combinations of `:hover:after` and `:after:hover` on all sorts of different elements. I even got so desperate as to try a filthy hack involving `background-color`, `z-index`, and enough padding to cover up the underline without breaking the layout, which I admit I’m actually kind of disappointed didn’t work.

The secret sauce, as I find it often to be, is `display: inline-block`. Add it to your pseudoelement, and you are good to go! Check it:

<div class="codepen">
  <p data-height="268" data-theme-id="0" data-slug-hash="gPPXKR" data-default-tab="result" data-user="nickpiesco" class='codepen'>See the Pen <a href='http://codepen.io/nickpiesco/pen/gPPXKR/'>Remove Hover Behaviour from Pseudoelements</a> by Nick Piesco (<a href='http://codepen.io/nickpiesco'>@nickpiesco</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>
