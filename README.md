[![Build Status](https://travis-ci.com/latte-carousel/latte-carousel.svg?branch=master)](https://travis-ci.com/latte-carousel/latte-carousel)
[![npm](https://img.shields.io/npm/v/latte-carousel.svg)](https://npmjs.com/package/latte-carousel)
[![npm](https://img.shields.io/npm/l/latte-carousel.svg)](https://github.com/latte-carousel/latte-carousel/blob/master/LICENSE)

<p align="center">
    <img src="https://latte-carousel.github.io/img/colored_small.png" alt="LatteCarousel"/>
</p>

# About

LatteCarousel is a lightweight and responsive carousel without any dependencies.

## Usage

```html
<!-- Package -->
<link rel="stylesheet" href="latte-carousel.min.css">
<script src="latte-carousel.min.js"></script>

<!-- CDN -->
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/latte-carousel@1.4.1/dist/latte-carousel.min.css">
<script src="https://cdn.jsdelivr.net/npm/latte-carousel@1.4.1/dist/latte-carousel.min.js"></script>
```

```html
<div class="latte-carousel" id="carousel">
    <div class="latte-item"></div>
    <div class="latte-item"></div>
    <div class="latte-item"></div>
    <div class="latte-item"></div>
</div>
```

```js
var options = {
    count: 3,
    touch: true,
    buttons: true,
    dots: true,
    rewind: true,
    autoplay: 0,
    animation: 500,
    responsive: {
        "0": { count: 1.5, buttons: false },
        "480": { count: 2.5, buttons: false },
        "768": { count: 3, touch: false },
        "1440": { count: 4, touch: false },
    },
};

var carousel = new latte.Carousel("#carousel", options);

carousel.trigger("next");
carousel.trigger("previous");

carousel.trigger("goto", 0);

carousel.trigger("update");

carousel.trigger("remove");
```

You can also include latte-carousel using ES6 import and Babel or Webpack.

This package already includes .d.ts files.

## Features

-   [x] Responsive options
-   [x] Touch support
-   [x] Stage padding
-   [x] Navigation dots
-   [x] Rewind carousel
-   [x] Autoplay carousel
-   [x] Carousel events

## Browser Support

This library is tested on Google Chrome, but it should work on all major browsers with CSS3 and ES5 support (including IE9+).

## Build

Install dependencies:

```sh
yarn install
```

Build project:

```sh
yarn run build
```

Run example:

```sh
yarn run serve

open http://localhost:8080/example
```

Result files:

-   dist/latte-carousel.min.css
-   dist/latte-carousel.min.js
