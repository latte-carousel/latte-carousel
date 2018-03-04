module latte {
    export class Stage {
        public currentIndex: number = 0;
        public currentPosition: number = 0;

        private contentElement: HTMLElement;
        private stageElement: HTMLElement;
        private itemElements: NodeListOf<HTMLElement>;

        private options: Options;
        private currentOptions: Options;

        private contentSize: number;
        private stageSize: number;
        private itemSize: number;

        constructor(contentElement: HTMLElement, options: Options) {
            this.contentElement = contentElement;
            this.stageElement = contentElement.querySelector(".latte-stage");
            this.itemElements = this.stageElement.querySelectorAll(".latte-item");

            this.options = options;

            this.update();
        }

        public update() {
            this.currentOptions = this.options.getBreakpointOptions();

            // Compute size
            this.contentSize = this.contentElement.getBoundingClientRect().width;
            this.itemSize = this.contentSize / this.currentOptions.count;
            this.stageSize = this.itemSize * this.itemElements.length;

            // Apply size
            for (let i = 0; i < this.itemElements.length; i++) {
                const item = this.itemElements[i];

                item.style.width = this.itemSize + "px";
            }

            this.stageElement.style.width = this.stageSize + "px";

            // Adjust position
            this.moveTo(this.currentIndex);
        }

        public moveTo(index: number) {
            const firstIndex = 0;
            const lastIndex = this.itemElements.length - this.currentOptions.count;

            // Compute position by index
            this.currentIndex = index;
            this.currentIndex = Math.min(Math.max(firstIndex, this.currentIndex), lastIndex);
            this.currentPosition = this.currentIndex * this.itemSize * -1;

            // TODO: Tween using translate (integers only - ceil?)
            this.stageElement.style.left = this.currentPosition + "px";
        }

        public movePrevious() {
            this.moveTo(this.currentIndex - 1);
        }

        public moveNext() {
            this.moveTo(this.currentIndex + 1);
        }

        public dragTo(delta: number) {
            const lastIndex = this.itemElements.length - this.currentOptions.count;

            const firstPosition = 0;
            const lastPosition = lastIndex * this.itemSize * -1;

            // Only change position
            this.currentPosition += delta;
            this.currentPosition = Math.min(Math.max(lastPosition, this.currentPosition), firstPosition);

            // TODO: Move using translate
            this.stageElement.style.left = this.currentPosition + "px";
        }

        public dragEnd(movedLeft: boolean) {
            // Compute index by position
            if (movedLeft) {
                this.currentIndex = Math.ceil(Math.abs(this.currentPosition) / this.itemSize);
            } else {
                this.currentIndex = Math.floor(Math.abs(this.currentPosition) / this.itemSize);
            }

            this.moveTo(this.currentIndex);
        }
    }
}
