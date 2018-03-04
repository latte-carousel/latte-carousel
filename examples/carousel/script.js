window.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('.latte-carousel');

    var options = {
        count: 3,
        padding: 50,
        touch: true,
        buttons: true,
        dots: true,
        rewind: true,
        autoplay: 1000,
        responsive: {
            "0": { count: 1, touch: true, buttons: false },
            "480": { count: 2, touch: true, buttons: false },
            "768": { count: 3, touch: false, buttons: true },
            "1440": { count: 4, touch: false, buttons: true }
        }
    };

    new latte.Carousel(root, options);
});
