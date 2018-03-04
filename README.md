# latte-carousel

LatteCarousel is a lightweight and responsive carousel.

## Usage

Create a HTML structure like this:

```html
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

Run this code:

```js
let root = document.querySelector('.latte-carousel');

let options = {
    count: 3,           // number of visible items
    padding: 50,        // stage padding size in pixels
    touch: true,        // enable touch support
    buttons: true,      // show previous and next buttons
    dots: true,         // show navigation dots
    rewind: true,       // return to first page after last page
    autoplay: 1000,     // autoplay time in millis (0 to disable)
    responsive: {       // responsive options by screen width
        "0":   { count: 1, touch: true },
        "480": { count: 2, touch: true },
        "768": { count: 3, touch: false }
    }
};

let carousel = new latte.Carousel(root, options);

carousel.trigger('next');
carousel.trigger('previous');

carousel.on('update', (event) => {
    console.log(event);
});
```
