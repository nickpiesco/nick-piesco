---
layout: article-single-content
title: Weather Ladder
date: 2016-08-25
excerpt: Building a simple visualization can be quite not-simple
sidebar:
  - image:
    thumbnail: /assets/images/weatherladder_1_thumb.png
    alt: Weather Ladder
    link: /assets/images/weatherladder_1.png
  - image:
    thumbnail: /assets/images/weatherladder_2_thumb.png
    alt: Weather Ladder
    link: /assets/images/weatherladder_2.png
---

I was a meteorologist for 14 years before going into Web-slinging full time, so it makes sense that I’d eventually want to try my hand at something weather-related. I’m not really a designer, though; and since it seems that [everybody has an idea about what a weather app should look like](https://dribbble.com/search?q=weather+app), I never really felt like I had anything original to add. (There’s a related rant where I put on my meteorologist hat and complain that we should focus way *less* on the visual design of these apps and way *more* on the quality and reliability of the data and forecasts, but [that too has already been done](http://www.alabamawx.com/?p=63830).)

I came across [Oak Studios](http://oak.is/)’ [Blue](http://partlyblue.com/), which is a nice, clean visualization of a short-term forecast that I thought would make a fun technical challenge to implement. As frequently happens, though, you start off wanting to do something small and simple, and then this series of decisions happens:

- I want to figure out how to build this neat UI.
- I need to get data from somewhere, so let me grab it from an API.
- This data is location-dependent. I could hard-code it for one location, *or* I can use the [geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation). Sure, why not?
- No sense in polling for the location every time the page loads. How about a cookie?
- Correction: no sense in polling for the location... until the location changes. Got to handle that situation too, I guess.

Layout
------

The layout isn’t particularly complicated, but I still wanted it to work well at as many screen sizes as possible. How do you make sure everything’s the right size when you have no idea how big the viewport is going to be? Base everything on the size of the viewport! (Seriously, I feel like [viewport units](http://www.quirksmode.org/css/units-values/viewport.html) don’t get enough love – using them almost feels like cheating. I mean, look at [this sweet browser support](http://caniuse.com/#feat=viewport-units)!)

Since it’s a vertically-oriented layout, most elements are sized with `vh`, with a small dollop of `vw` to help out with some sizing and positioning. The only thing that’s absolutely sized is the `border-radius` on the ‘Reset location’ button; and now that I mention it, I should probably convert that as well.

Colours
-------

Blue’s UI features ‘unique hourly colors generated from the temperature, humidity, and sunrise/sunset times for your current location’. Munging all that data was a little more number-crunching than I really wanted to do, but I felt that generating colours based on the current and forecast temperatures would be a fun little project.

The temperature colours we’re used to seeing in maps and apps usually aren’t a straight journey around the colour wheel – it’s a big gradient with a stop every ten degrees (*temperature* degrees, that is; not degrees on the colour wheel). To find the colour we want to associate with a given temperature, we need to figure out two things: which gradient stops it falls between, and where exactly between the stops it lies.

I wrote a series of functions to do this in [Sass](http://sass-lang.com/) before I came to the belated realization that if I were to grab the data from an API, I had to do that calculation on the *client* side and not the server side. Off to re-write it in JavaScript!

I was afraid I’d have to do some gnarly math, but it turns out some arithmetic and a little string manipulation (with help from [a colour manipulation library](https://github.com/brehaut/color-js)) got me where I needed to be. It wasn’t particularly tricky, but it *was* a bit fiddly – have a look at [the code](https://github.com/nickpiesco/weather-ladder/blob/master/js/main.js#L71) to see how the magic happens.

Data
----

Now that I can assign colours based on data, it would be extra helpful to have some data to manipulate. The [Dark Sky Forecast API](https://developer.forecast.io/) is super convenient and easy to use, so that was my first stop.

There’s [a bunch of stuff in the response](https://developer.forecast.io/docs/v2#forecast_call), most of which I don’t really need. Since you can’t request individual parameters, I created a small [data model](https://github.com/nickpiesco/weather-ladder/blob/master/js/main.js#L283) which I populate with just the data I need before I start passing it around the application.

(The request is made from the client, which necessarily exposes my API key. I didn’t check the key into GitHub, but it’s not hard for a sufficiently smart and motivated person to figure it out. If that’s you, please don’t be That Guy™ and use my key for your own nefarious purposes – [get your own](https://developer.forecast.io/). It’s free.)

Location
--------

The API request requires a location’s latitude and longitude to get the appropriate information. It would be pretty easy to just hardcode one location into the application, but how useful (or fun) would that be?

The geolocation API is [well-supported](http://caniuse.com/#feat=geolocation) and pretty straightforward to implement. [This excellent guide from MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) set me off in the right direction.

Polling for the user’s location every time they fire up the app is a little overkill, in my opinion; so once I get the user’s location, I stash it in a cookie. On load or refresh, the app checks the cookie before firing the geolocation event, saving some battery and load time.

This works quite nicely until the user goes somewhere else and wants to get the weather for their new location. I added a button that resets the location by blowing out the cookie and firing the application logic again to grab the new location and current conditions.

UI Spit and Polish
------------------

Aside from our carefully algorithmically chosen colours, we only have a few dynamic elements in the UI:

- Current time
- Current location
- Current weather icon
- Current weather description
- Current temperature

The current temperature and weather description come directly from the API. The API response includes a field for `icon`, which we map to one of [Adam Whitcroft](http://adamwhitcroft.com/)’s excellent [Climacons](http://adamwhitcroft.com/climacons/), which I’ve kept stashed away for quite a while to use for just this sort of thing.

Thanks to the geolocation API, we know the user’s latitude and longitude; but those numbers don’t mean much to most people. To get a human-readable location, I send the location to [Nominatim](http://nominatim.openstreetmap.org/), [OpenStreetMap](http://www.openstreetmap.org/)’s lookup service. The response is actually super-granular – when I ran it during testing, it gave me the name of the restaurant downstairs! We only really need the city, though.

The last thing to add is the time. The API response includes the time, but it’s simpler to grab the system time and run it through [Moment](http://momentjs.com/) to make it readable.

Related Links
-------------

- [Weather Ladder](https://weatherladder.nickpiesco.com/)
- [Source on GitHub](https://github.com/nickpiesco/weather-ladder)
- [Blue](http://partlyblue.com/)
- [QuirksMode: The `vw` and `vh` Units](http://www.quirksmode.org/css/units-values/viewport.html)
- [MDN: Using Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
- [color-js](https://github.com/brehaut/color-js)
- [Dark Sky Forecast API](https://developer.forecast.io/)
- [Climacons](http://adamwhitcroft.com/climacons/)
- [Nominatim](http://nominatim.openstreetmap.org/)
- [Moment](http://momentjs.com/)
