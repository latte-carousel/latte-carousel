window.addEventListener("DOMContentLoaded", function() {
    var root = document.querySelector(".latte-carousel");

    var options = {
        count: 3,
        touch: true,
        buttons: true,
        dots: true,
        rewind: true,
        autoplay: 0,
        responsive: {
            "0": { count: 1.5, touch: true, buttons: false },
            "480": { count: 2.5, touch: true, buttons: false },
            "768": { count: 3, touch: false, dots: false, autoplay: 1000 },
            "1440": { count: 4, touch: false, dots: false, autoplay: 1000 },
        },
    };

    var carousel = new latte.Carousel(root, options);

    carousel.trigger("next");
    carousel.trigger("previous");
});
