[![Build Status](https://travis-ci.com/latte-carousel/latte-carousel.svg?branch=master)](https://travis-ci.com/latte-carousel/latte-carousel)

![LatteCarousel](https://latte-carousel.github.io/img/colored_small.png "LatteCarousel")

# About

LatteCarousel is a lightweight and responsive carousel without any dependencies.

## Usage

```html
<link rel="stylesheet" href="latte-carousel.min.css">
<script src="latte-carousel.min.js"></script>

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

carousel.remove();
```

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
```

Result files:

-   dist/latte-carousel.min.css
-   dist/latte-carousel.min.js
