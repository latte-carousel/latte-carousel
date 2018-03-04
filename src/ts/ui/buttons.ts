module latte {
    export class Buttons {
        private carouselElement: HTMLElement;
        private contentElement: HTMLElement;

        private stage: Stage;
        private options: Options;
        private currentOptions: Options;

        private previousButton: HTMLElement;
        private nextButton: HTMLElement;

        constructor(carouselElement: HTMLElement, contentElement: HTMLElement, stage: Stage, options: Options) {
            this.carouselElement = carouselElement;
            this.contentElement = contentElement;

            this.stage = stage;
            this.options = new Options(options);

            this.previousButton = this.create(true);
            this.nextButton = this.create(false);

            this.carouselElement.insertBefore(this.previousButton, this.contentElement);
            this.carouselElement.appendChild(this.nextButton);

            // TODO: Clear events
            this.previousButton.addEventListener("click", this.onPreviousClicked.bind(this));
            this.nextButton.addEventListener("click", this.onNextClicked.bind(this));

            this.update();
        }

        public update() {
            this.currentOptions = this.options.getBreakpointOptions();

            if (this.currentOptions.buttons === true) {
                this.previousButton.style.display = "inline-block";
                this.nextButton.style.display = "inline-block";
            } else {
                this.previousButton.style.display = "none";
                this.nextButton.style.display = "none";
            }
        }

        private create(previous: boolean): HTMLElement {
            const element = document.createElement("div");

            if (previous) {
                element.className = "latte-previous";
            } else {
                element.className = "latte-next";
            }

            return element;
        }

        private onPreviousClicked(event: MouseEvent) {
            this.stage.movePrevious();
        }

        private onNextClicked(event: MouseEvent) {
            this.stage.moveNext();
        }
    }
}
