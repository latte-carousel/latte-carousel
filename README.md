[![Build Status](https://travis-ci.com/latte-carousel/latte-carousel.svg?branch=master)](https://travis-ci.com/latte-carousel/latte-carousel)
[![npm](https://img.shields.io/npm/v/latte-carousel.svg)](https://npmjs.com/package/latte-carousel)
[![npm](https://img.shields.io/npm/l/latte-carousel.svg)](https://github.com/latte-carousel/latte-carousel/blob/master/LICENSE)

<p align="center">
    <img src="https://lattecarousel.dev/img/colored_small.png" alt="LatteCarousel"/>
</p>

# About

LatteCarousel is a lightweight and responsive carousel without any dependencies.

## Usage

```html
<!-- Package -->
<link rel="stylesheet" href="latte-carousel.min.css" />
<script src="latte-carousel.min.js"></script>

<!-- CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/latte-carousel@1.6.0/dist/latte-carousel.min.css" />
<script src="https://cdn.jsdelivr.net/npm/latte-carousel@1.6.0/dist/latte-carousel.min.js"></script>
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
    move: 1,
    touch: true,
    mode: "align",
    buttons: true,
    dots: true,
    rewind: true,
    autoplay: 0,
    animation: 500,
    responsive: {
        "0": { count: 1.5, mode: "free", buttons: false },
        "480": { count: 2.5, mode: "free", buttons: false },
        "768": { count: 3, move: 3, touch: false, dots: false },
        "1440": { count: 4, move: 2, touch: false, dots: false },
    },
};

var carousel = new latte.Carousel("#carousel", options);

// Trigger events
carousel.trigger("next");
carousel.trigger("previous");

carousel.trigger("goto", 0);

carousel.trigger("update");

carousel.trigger("remove");

// Listen events
carousel.on("move", () => {});
carousel.on("moved", () => {});

carousel.off();
```

You can also include latte-carousel using ES6 import and Babel or Webpack.

This package already includes .d.ts files.

## Options

| Name       | Type                 | Default   | Description                            |
| ---------- | -------------------- | --------- | -------------------------------------- |
| count      | Number               | 3         | Number of visible items                |
| move       | Number               | 1         | Number of items to scroll              |
| touch      | Boolean              | false     | Enable touch support                   |
| mode       | String [align, free] | "align"   | Align animation to grid (touch only)   |
| buttons    | Boolean              | true      | Enable carousel buttons                |
| dots       | Boolean              | false     | Enable carousel dots                   |
| rewind     | Boolean              | true      | Enable rewind at the end (or start)    |
| autoplay   | Number               | 0         | Autoplay time in millis (0 to disable) |
| animation  | Number               | 500       | Animation time in millis               |
| responsive | Map<String, Object>  | undefined | Map of options for each breakpoint     |

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
