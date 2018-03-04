module latte {
    export class Touch {
        private carouselElement: HTMLElement;

        private stage: Stage;
        private options: Options;
        private currentOptions: Options;

        private first = { x: 0, y: 0 };
        private previous = { x: 0, y: 0 };

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

            this.first.x = this.previous.x = touch.pageX;
            this.first.y = this.previous.y = touch.pageY;
        }

        private onTouchMove(event: TouchEvent) {
            const touch = event.touches[0];

            const deltaX = touch.pageX - this.previous.x;
            const deltaY = touch.pageY - this.previous.y;

            if (this.currentOptions.touch) {
                this.stage.dragTo(deltaX);
            }

            this.previous.x = touch.pageX;
            this.previous.y = touch.pageY;
        }

        private onTouchEnd(event: TouchEvent) {
            const movedLeft = this.first.x > this.previous.x;

            if (this.currentOptions.touch) {
                this.stage.dragEnd(movedLeft);
            }
        }
    }
}
