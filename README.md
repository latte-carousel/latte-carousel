[![Build Status](https://travis-ci.com/latte-carousel/latte-carousel.svg?branch=master)](https://travis-ci.com/latte-carousel/latte-carousel)

# About

![LatteCarousel](docs/colored_small.png "LatteCarousel") LatteCarousel is a lightweight and responsive carousel without any dependencies.

## Usage

```html
<link rel="stylesheet" href="latte-carousel.min.css">
<script src="latte-carousel.min.js"></script>

<div class="latte-carousel">
    <div class="latte-content">
        <div class="latte-stage">
            <div class="latte-item"></div>
            <div class="latte-item"></div>
            <div class="latte-item"></div>
            <div class="latte-item"></div>
        </div>
    </div>
</div>
```

```js
let root = document.querySelector('.latte-carousel');

let options = {
    count: 3,           // number of visible items
    touch: true,        // enable touch support
    buttons: true,      // show previous and next buttons
    dots: true,         // show navigation dots
    rewind: true,       // return to first page after last page
    autoplay: 0,        // autoplay time in millis (0 to disable)
    responsive: {       // responsive options by screen width (default value for unespecified fields)
        "0":    { count: 1.5, touch: true, buttons: false },
        "480":  { count: 2.5, touch: true, buttons: false },
        "768":  { count: 3, touch: false },
        "1440": { count: 4, touch: false }
    }
};

let carousel = new latte.Carousel(root, options);

carousel.trigger('next');
carousel.trigger('previous');
```

## Features

- [x] Responsive options
- [x] Touch support
- [x] Stage padding
- [x] Navigation dots
- [x] Rewind carousel
- [x] Autoplay carousel
- [x] Carousel events

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

Run examples:

```sh
yarn run serve
```

Result files:

- dist/latte-carousel.css
- dist/latte-carousel.d.ts
- dist/latte-carousel.js

Minified files:

- dist/latte-carousel.min.css
- dist/latte-carousel.min.js
