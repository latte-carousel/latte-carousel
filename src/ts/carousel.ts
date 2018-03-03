module latte {
    export class Carousel {
        private carouselElement: HTMLElement;
        private contentElement: HTMLElement;
        private stageElement: HTMLElement;

        private options: Options;

        constructor(carouselElement: HTMLElement, options?: Options) {
            this.carouselElement = carouselElement;
            this.contentElement = carouselElement.querySelector(".latte-content");
            this.stageElement = carouselElement.querySelector(".latte-stage");

            this.options = new Options(options);

            this.updateCarousel();
        }

        private updateCarousel() {
            const options = this.options.getBreakpointOptions();
        }
    }
}
