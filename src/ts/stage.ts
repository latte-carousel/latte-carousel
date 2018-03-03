module latte {
    export class Stage {
        private contentElement: HTMLElement;
        private stageElement: HTMLElement;
        private itemElements: NodeListOf<HTMLElement>;

        private options: Options;

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
            const options = this.options.getBreakpointOptions();

            // Compute size
            this.contentSize = this.contentElement.getBoundingClientRect().width;
            this.itemSize = this.contentSize / options.count;
            this.stageSize = this.itemSize * this.itemElements.length;

            // Apply size
            for (let i = 0; i < this.itemElements.length; i++) {
                const item = this.itemElements[i];

                item.style.width = this.itemSize + "px";
            }

            this.stageElement.style.width = this.stageSize + "px";
        }
    }
}
