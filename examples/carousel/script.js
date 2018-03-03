window.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('.latte-carousel');

    var options = {
        count: 3,
        padding: 50,
        buttons: true,
        dots: true,
        rewind: true,
        autoplay: 1000,
        responsive: {
            "0": { count: 1 },
            "480": { count: 2 },
            "768": { count: 3 }
        }
    };

    new latte.Carousel(root, options);
});
