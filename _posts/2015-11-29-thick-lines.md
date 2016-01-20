---
layout: article-single-content
title: Thick Lines
date: 2015-11-29
excerpt: Building bold shapes and colours with advanced Sass features
---

I’ve been a fan of [Aaron Draplin](http://www.draplin.com/)’s work for a long time – I really dig how he looks to the past to inform his use of bold shapes and colours with generous lashings of Futura Bold and Kabel Black. When he came out with his ‘[Thick Lines](http://www.draplin.com/1998/01/ddc114_thick_lines_poster_series.html)’ poster series, I saw some things I could have some fun recreating with HTML and CSS. As it turns out, it was also a cool opportunity to experiment with some advanced [Sass]() features I hadn’t had a chance to mess with before.

The demos are all on [CodePen](http://codepen.io/collection/XkNOaG/), if you’d like to have a poke around them yourself.

[Sunrays](http://codepen.io/nickpiesco/pen/rOXjdJ)
--------------------------------------------------

My object in putting these together was to use a few elements as possible, so just stacking up a bunch of `<div>`s for each colour wasn’t going to be the solution. (Besides, how much fun would that have been anyway?) Pseudoelements and borders *might* have worked, but they would get pretty unwieldy in a hurry; which left me with `box-shadow`. Elements can take multiple `box-shadow`s; and by increasing the spread of each shadow, I could get concentric rings around my sun.

The fun *really* began when I was sampling colours. I noticed that the saturation and lightness values of the rings were all pretty much the same, and that the hue value of each ring changed in even steps. Sounds like something automatable to me!

I knew I was going to loop over the colour values somehow, but the problem was how to get them into a comma-delimited list, which is what `box-shadow` takes. If I was just generating individual rules, I could `@each` it and call it a day; but if I used multiple rules, they would just overwrite each other, and we wouldn’t get the look we were going for. The secret did indeed involve a Sass list, but I had to stash it in a function that dropped them into a list of values, which I then sent to `box-shadow`.

<div class="codepen">
  <p data-height="268" data-theme-id="0" data-slug-hash="rOXjdJ" data-default-tab="result" data-user="nickpiesco" class='codepen'>See the Pen <a href='http://codepen.io/nickpiesco/pen/rOXjdJ/'>Thick Lines: Sunrays</a> by Nick Piesco (<a href='http://codepen.io/nickpiesco'>@nickpiesco</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

[Foliage](http://codepen.io/nickpiesco/pen/gaVgKb)
--------------------------------------------------

I thought I was going to be able to use the same `box-shadow` trick on this one that I did on ‘Sunrays’, but since I was going to use pseudoelements for the rounded pieces in the middle, that wasn’t a possibility – since they’re *pseudo* elements, they don’t get a shadow. There’s also a `drop-shadow` [SVG filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter). but that doesn’t allow for multiple shadows.

The colours weren’t *quite* chosen so I could manipulate a hue, saturation, or lightness value like I did for ‘Sunrays’; so I just created a list of colours and looped over them, using their position in the list to stack the layers with `z-index`. Since each ‘leaflet’ is a mirror image of its opposite, I looped over a little list to generate the positioning rules.

<div class="codepen">
  <p data-height="268" data-theme-id="0" data-slug-hash="gaVgKb" data-default-tab="result" data-user="nickpiesco" class='codepen'>See the Pen <a href='http://codepen.io/nickpiesco/pen/gaVgKb/'>Thick Lines: Foliage</a> by Nick Piesco (<a href='http://codepen.io/nickpiesco'>@nickpiesco</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

[Peaks](http://codepen.io/nickpiesco/pen/obvbpN) and [Clouds](http://codepen.io/nickpiesco/pen/yeBzqm)
------------------------------------------------------------------------------------------------------

I really like how the colours in these pieces cover the whole canvas. ‘Sunrays’ and ‘Foliage’ are both vertically oriented, so I used `vh` to size my elements. ‘Peaks’ and ‘Clouds’ are a little different – not only are the individual colour blocks arranged vertically, but the individual ‘peaks’ and ‘clouds’ are horizontally symmetrical. I used both `vw` and `vh` to size and position them, so you’ll see them change shape as you change the size of the viewport. (Go on, try it.) The effect is particularly cool with ‘Clouds’, as they pile up more the narrower the screen gets.

I made the ‘peaks’ with the good old-fashioned [CSS triangle hack](https://css-tricks.com/snippets/css/css-triangle/), and I overlapped some `border-radius` circles for the ‘clouds’. I used the list and `z-index` looping technique I figured out for ‘Foliage’ to make the colours happen.

<div class="codepen">
  <p data-height="268" data-theme-id="0" data-slug-hash="obvbpN" data-default-tab="result" data-user="nickpiesco" class='codepen'>See the Pen <a href='http://codepen.io/nickpiesco/pen/obvbpN/'>Thick Lines: Peaks</a> by Nick Piesco (<a href='http://codepen.io/nickpiesco'>@nickpiesco</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

<div class="codepen">
  <p data-height="268" data-theme-id="0" data-slug-hash="yeBzqm" data-default-tab="result" data-user="nickpiesco" class='codepen'>See the Pen <a href='http://codepen.io/nickpiesco/pen/yeBzqm/'>Thick Lines: Clouds</a> by Nick Piesco (<a href='http://codepen.io/nickpiesco'>@nickpiesco</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

[Sundown](http://codepen.io/nickpiesco/pen/KVKBLz)
--------------------------------------------------

‘Sundown’ used a combination of all these techniques. I used a similar function to the one in ‘Sunrays’ to generate the `box-shadow`s; but since there wasn’t an easy colour manipulation, I used the same colour-list technique I used in the other pieces. I needed to send the function the step width as well, which I thought would be kind of a pain. Turns out, Sass makes it easy – by using an ellipsis (like `$shadow-colors...`) when you declare the function, Sass takes your remaining arguments and makes them into a list, ready for you to run whatever functions you want over it.

<div class="codepen">
  <p data-height="268" data-theme-id="0" data-slug-hash="KVKBLz" data-default-tab="result" data-user="nickpiesco" class='codepen'>See the Pen <a href='http://codepen.io/nickpiesco/pen/KVKBLz/'>Thick Lines: Sundown</a> by Nick Piesco (<a href='http://codepen.io/nickpiesco'>@nickpiesco</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>
