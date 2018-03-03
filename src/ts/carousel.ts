module latte {
    export class Carousel {
        private carouselElement: HTMLElement;
        private contentElement: HTMLElement;

        private options: Options;
        private stage: Stage;

        constructor(carouselElement: HTMLElement, options?: Options) {
            this.carouselElement = carouselElement;
            this.contentElement = carouselElement.querySelector(".latte-content");

            this.options = new Options(options);
            this.stage = new Stage(this.contentElement, this.options);

            this.update();
        }

        public update() {
            this.stage.update();
        }
    }
}
