/// <reference path="event/event-emitter.ts" />

module latte {
    export class Carousel extends EventEmitter {
        private carouselElement: HTMLElement;
        private contentElement: HTMLElement;

        private options: Options;
        private stage: Stage;
        private touch: Touch;
        private buttons: Buttons;

        constructor(carouselElement: HTMLElement, options?: Options) {
            super();

            this.carouselElement = carouselElement;
            this.contentElement = carouselElement.querySelector(".latte-content");

            this.options = new Options(options);
            this.stage = new Stage(this.contentElement, this.options);
            this.touch = new Touch(this.carouselElement, this.stage, this.options);
            this.buttons = new Buttons(this.carouselElement, this.contentElement, this.stage, this.options);

            // TODO: Clear events - debounce event
            window.addEventListener("resize", this.onResize.bind(this));

            this.update();
        }

        public update() {
            this.stage.update();

            this.touch.update();

            this.buttons.update();
        }

        private onResize(event: UIEvent) {
            this.update();
        }
    }
}
