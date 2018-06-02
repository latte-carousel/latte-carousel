module latte {

    /**
     * Touch support.
     *
     * @export
     * @class Touch
     */
    export class Touch {
        private currentOptions: Options;

        private firstX = 0;
        private firstY = 0;
        private previousX = 0;
        private previousY = 0;

        private dragging: boolean;

        /**
         * Creates an instance of Touch.
         * @param {HTMLElement} contentElement Content element.
         * @param {Stage} stage Carousel stage.
         * @param {Options} options Carousel options.
         * @memberof Touch
         */
        constructor(private contentElement: HTMLElement, private stage: Stage, private options: Options) {
            this.contentElement.addEventListener("touchstart", this.onTouchStart.bind(this));
            this.contentElement.addEventListener("touchmove", this.onTouchMove.bind(this));
            this.contentElement.addEventListener("touchend", this.onTouchEnd.bind(this));

            this.update();
        }

        /**
         * Updates touch support.
         *
         * @memberof Touch
         */
        public update() {
            this.currentOptions = this.options.getBreakpointOptions();
        }

        /**
         * Touch start listener.
         *
         * @private
         * @param {TouchEvent} event Touch event.
         * @memberof Touch
         */
        private onTouchStart(event: TouchEvent) {
            const touch = event.touches[0];

            this.firstX = this.previousX = touch.pageX;
            this.firstY = this.previousY = touch.pageY;
        }

        /**
         * Touch move listener.
         *
         * @private
         * @param {TouchEvent} event Touch event.
         * @memberof Touch
         */
        private onTouchMove(event: TouchEvent) {
            const touch = event.touches[0];

            const deltaX = touch.pageX - this.previousX;
            const deltaY = touch.pageY - this.previousY;

            // TODO: Lock vertical scroll while dragging carousel.
            if (this.currentOptions.touch) {
                this.dragging = true;

                this.stage.drag(deltaX);
            }

            this.previousX = touch.pageX;
            this.previousY = touch.pageY;
        }

        /**
         * Touch end listener.
         *
         * @private
         * @param {TouchEvent} event Touch event.
         * @memberof Touch
         */
        private onTouchEnd(event: TouchEvent) {
            const movedLeft = this.firstX > this.previousX;

            // Prevent disabling touch while dragging
            if (this.currentOptions.touch || this.dragging) {
                this.dragging = false;

                this.stage.dragEnd(movedLeft);
            }
        }
    }
}
