/// <reference path="./event/event-emitter.ts" />

module latte {

    /**
     * Base carousel class.
     *
     * @export
     * @class Carousel
     * @extends {EventEmitter}
     */
    export class Carousel extends EventEmitter {
        private contentElement: HTMLElement;
        private stageElement: HTMLElement;
        private itemElements: NodeListOf<HTMLElement>;

        private options: Options;
        private stage: Stage;
        private touch: Touch;
        private buttons: Buttons;
        private dots: Dots;

        /**
         * Creates an instance of Carousel.
         * @param {HTMLElement} carouselElement Root carousel element.
         * @param {Options} [options] Carousel options.
         * @memberof Carousel
         */
        constructor(private carouselElement: HTMLElement, options?: Options) {
            super();

            this.contentElement = this.carouselElement.querySelector(".latte-content");
            this.stageElement = this.contentElement.querySelector(".latte-stage");
            this.itemElements = this.stageElement.querySelectorAll(".latte-item");

            this.options = new Options(options);
            this.stage = new Stage(this.contentElement, this.stageElement, this.itemElements, this.options);
            this.touch = new Touch(this.contentElement, this.stage, this.options);
            this.buttons = new Buttons(this.carouselElement, this.contentElement, this.stage, this.options);
            this.dots = new Dots(this.carouselElement, this.stage, this.options);

            // TODO: Clear event.
            window.addEventListener("resize", this.onWindowResize.bind(this));

            this.stage.on("move", this.onStageMove.bind(this));

            this.update();

            this.on("previous", this.onCarouselPrevious.bind(this));
            this.on("next", this.onCarouselNext.bind(this));
        }

        /**
         * Updates carousel.
         *
         * @private
         * @memberof Carousel
         */
        private update() {
            this.stage.update();

            this.touch.update();

            this.buttons.update();

            this.dots.update();
        }

        /**
         * Window resize listener.
         *
         * @private
         * @param {UIEvent} event UI Event.
         * @memberof Carousel
         */
        private onWindowResize(event: UIEvent) {
            this.update();
        }

        /**
         * Stage move listener.
         *
         * @private
         * @param {*} data Event data.
         * @memberof Carousel
         */
        private onStageMove(data: any) {
            this.dots.update();
        }

        /**
         * Carousel previous listener.
         *
         * @private
         * @param {*} data Event data.
         * @memberof Carousel
         */
        private onCarouselPrevious(data: any) {
            this.stage.move(-1);
        }

        /**
         * Carousel next listener.
         *
         * @private
         * @param {*} data Event data.
         * @memberof Carousel
         */
        private onCarouselNext(data: any) {
            this.stage.move(1);
        }
    }
}
