window.addEventListener("DOMContentLoaded", function() {
    var options = {
        count: 3,
        move: 1,
        touch: true,
        buttons: true,
        dots: true,
        rewind: true,
        autoplay: 0,
        animation: 500,
        responsive: {
            "0": { count: 1.5, touch: "free", buttons: false },
            "480": { count: 2.5, touch: "free", buttons: false },
            "768": { count: 3, move: 3, touch: false, dots: false },
            "1440": { count: 4, move: 2, touch: false, dots: false },
        },
    };

    var carousel = new latte.Carousel(".latte-carousel", options);

    carousel.trigger("next");
    carousel.trigger("previous");
    carousel.trigger("goto", 0);

    carousel.on("move", function() {
        console.log("move");
    });

    carousel.on("moved", function() {
        console.log("moved");
    });

    // carousel.remove();
});
