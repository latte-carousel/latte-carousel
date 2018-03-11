module latte {

    /**
     * Carousel buttons.
     *
     * @export
     * @class Buttons
     */
    export class Buttons {
        private currentOptions: Options;

        private previousButton: HTMLElement;
        private nextButton: HTMLElement;

        /**
         * Creates an instance of Buttons.
         * @param {HTMLElement} carouselElement Carousel element.
         * @param {HTMLElement} contentElement Content element.
         * @param {Stage} stage Carousel stage.
         * @param {Options} options Carousel options.
         * @memberof Buttons
         */
        constructor(
            private carouselElement: HTMLElement,
            private contentElement: HTMLElement,
            private stage: Stage,
            private options: Options) {
            this.previousButton = this.createButton("latte-previous");
            this.nextButton = this.createButton("latte-next");

            this.carouselElement.insertBefore(this.previousButton, this.contentElement);
            this.carouselElement.appendChild(this.nextButton);

            this.previousButton.addEventListener("click", this.onPreviousClick.bind(this));
            this.nextButton.addEventListener("click", this.onNextClick.bind(this));

            this.update();
        }

        /**
         * Updates carousel buttons.
         *
         * @memberof Buttons
         */
        public update() {
            this.currentOptions = this.options.getBreakpointOptions();

            if (this.currentOptions.buttons === true) {
                this.previousButton.className = "latte-previous";
                this.nextButton.className = "latte-next";
            } else {
                this.previousButton.className = "latte-previous invisible";
                this.nextButton.className = "latte-next invisible";
            }
        }

        /**
         * Creates a new button.
         *
         * @private
         * @param {string} clazz Element class.
         * @returns {HTMLElement} Element created.
         * @memberof Buttons
         */
        private createButton(clazz: string): HTMLElement {
            const element = document.createElement("div");
            element.className = clazz;

            return element;
        }

        /**
         * Previous click listener.
         *
         * @private
         * @param {MouseEvent} event Mouse event.
         * @memberof Buttons
         */
        private onPreviousClick(event: MouseEvent) {
            this.stage.move(-1);
        }

        /**
         * Next click listener.
         *
         * @private
         * @param {MouseEvent} event Mouse event.
         * @memberof Buttons
         */
        private onNextClick(event: MouseEvent) {
            this.stage.move(1);
        }
    }
}
