module latte {
    export class Touch {
        private carouselElement: HTMLElement;

        private stage: Stage;
        private options: Options;
        private currentOptions: Options;

        private firstX = 0;
        private firstY = 0;
        private previousX = 0;
        private previousY = 0;

        private dragging: boolean;

        constructor(carouselElement: HTMLElement, stage: Stage, options: Options) {
            this.carouselElement = carouselElement;

            this.stage = stage;
            this.options = options;

            this.carouselElement.addEventListener("touchstart", this.onTouchStart.bind(this));
            this.carouselElement.addEventListener("touchmove", this.onTouchMove.bind(this));
            this.carouselElement.addEventListener("touchend", this.onTouchEnd.bind(this));

            this.update();
        }

        public update() {
            this.currentOptions = this.options.getBreakpointOptions();
        }

        private onTouchStart(event: TouchEvent) {
            const touch = event.touches[0];

            this.firstX = this.previousX = touch.pageX;
            this.firstY = this.previousY = touch.pageY;
        }

        private onTouchMove(event: TouchEvent) {
            const touch = event.touches[0];

            const deltaX = touch.pageX - this.previousX;
            const deltaY = touch.pageY - this.previousY;

            if (this.currentOptions.touch) {
                this.dragging = true;

                this.stage.dragTo(deltaX);
            }

            this.previousX = touch.pageX;
            this.previousY = touch.pageY;
        }

        private onTouchEnd(event: TouchEvent) {
            const movedLeft = this.firstX > this.previousX;

            if (this.currentOptions.touch || this.dragging) {
                this.dragging = false;

                this.stage.dragEnd(movedLeft);
            }
        }
    }
}
