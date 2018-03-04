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
            "0": { count: 1, touch: true },
            "480": { count: 2, touch: true },
            "768": { count: 3, touch: false }
        }
    };

    new latte.Carousel(root, options);
});
