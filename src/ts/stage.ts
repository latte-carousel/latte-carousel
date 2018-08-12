import { EventEmitter } from "./event/event-emitter";
import { Options } from "./option/options";
import { Tween } from "./tween";

/**
 * Base carousel stage.
 *
 * @export
 * @class Stage
 * @extends {EventEmitter}
 */
export class Stage extends EventEmitter {
    private currentOptions: Options;

    private currentIndex: number = 0;
    private currentPosition: number = 0;

    private contentSize: number;
    private stageSize: number;
    private itemSize: number;

    /**
     * Creates an instance of Stage.
     * @param {HTMLElement} contentElement Content element.
     * @param {HTMLElement} stageElement Stage element.
     * @param {HTMLCollection} itemElements Items elements.
     * @param {Options} options Carousel options.
     * @memberof Stage
     */
    constructor(
        private contentElement: HTMLElement,
        private stageElement: HTMLElement,
        private itemElements: HTMLCollection,
        private options: Options,
    ) {
        super();

        this.update();
    }

    /**
     * Updates stage computing options and position.
     *
     * @memberof Stage
     */
    public update() {
        this.currentOptions = this.options.getBreakpointOptions();

        // Compute size
        this.contentSize = this.contentElement.getBoundingClientRect().width;
        this.itemSize = this.contentSize / this.currentOptions.count;
        this.stageSize = this.itemSize * this.itemElements.length;

        // Apply size
        for (let i = 0; i < this.itemElements.length; i++) {
            const itemElement = this.itemElements[i] as HTMLElement;

            itemElement.style.width = this.itemSize + "px";
        }

        this.stageElement.style.width = this.stageSize + "px";

        // Adjust position
        this.move(0, false);
    }

    /**
     * Moves stage to relative index.
     *
     * @param {number} delta Index delta.
     * @param {boolean} [tween=true] Use tweening
     * @memberof Stage
     */
    public move(delta: number, tween: boolean = true) {
        this.moveTo(this.currentIndex + delta, tween);
    }

    /**
     * Moves stage to absolute index.
     *
     * @param {number} index Index.
     * @param {boolean} [tween=true] Use tweening
     * @memberof Stage
     */
    public moveTo(index: number, tween: boolean = true) {
        const firstIndex = 0;
        const lastIndex = this.last();

        // Rewind index
        if (this.currentOptions.rewind) {
            index = index % (lastIndex + 1);

            if (index < 0) {
                index = lastIndex + 1 + index;
            }
        }

        // Compute position by index
        this.currentIndex = index;
        this.currentIndex = Math.min(Math.max(firstIndex, this.currentIndex), lastIndex);
        this.currentPosition = this.currentIndex * this.itemSize * -1;

        const duration = tween ? this.currentOptions.animation : 0;
        Tween.translate(this.stageElement, this.currentPosition, 0, duration);

        this.trigger("move");
    }

    /**
     * Drags stage to relative position.
     *
     * @param {number} delta Position delta.
     * @memberof Stage
     */
    public drag(delta: number) {
        const lastIndex = this.last();

        const firstPosition = 0;
        const lastPosition = lastIndex * this.itemSize * -1;

        // Change position only
        this.currentPosition += delta;
        this.currentPosition = Math.min(Math.max(lastPosition, this.currentPosition), firstPosition);

        Tween.translate(this.stageElement, this.currentPosition, 0, 0);
    }

    /**
     * Finishes carousel drag.
     *
     * @param {boolean} movedLeft If carousel moved to the left.
     * @memberof Stage
     */
    public dragEnd(movedLeft: boolean) {
        // Compute index by position
        if (movedLeft) {
            this.currentIndex = Math.ceil(Math.abs(this.currentPosition) / this.itemSize);
        } else {
            this.currentIndex = Math.floor(Math.abs(this.currentPosition) / this.itemSize);
        }

        this.move(0);
    }

    /**
     * Returns carousel item count.
     *
     * @returns {number} Item count.
     * @memberof Stage
     */
    public count(): number {
        return this.itemElements.length;
    }

    /**
     * Returns current index.
     *
     * @returns {number} Current index.
     * @memberof Stage
     */
    public current(): number {
        return this.currentIndex;
    }

    /**
     * Returns last index.
     *
     * @returns {number} Last index.
     * @memberof Stage
     */
    public last(): number {
        return this.itemElements.length - this.currentOptions.count;
    }
}
