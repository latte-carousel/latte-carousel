import { EventEmitter } from "./event/event-emitter";
import { Options } from "./option/options";
/**
 * Base carousel stage.
 *
 * @export
 * @class Stage
 * @extends {EventEmitter}
 */
export declare class Stage extends EventEmitter {
    private contentElement;
    private stageElement;
    private itemElements;
    private options;
    private currentOptions;
    private currentIndex;
    private currentPosition;
    private contentSize;
    private stageSize;
    private itemSize;
    /**
     * Creates an instance of Stage.
     * @param {HTMLElement} contentElement Content element.
     * @param {HTMLElement} stageElement Stage element.
     * @param {NodeListOf<HTMLElement>} itemElements Items elements.
     * @param {Options} options Carousel options.
     * @memberof Stage
     */
    constructor(contentElement: HTMLElement, stageElement: HTMLElement, itemElements: NodeListOf<HTMLElement>, options: Options);
    /**
     * Updates stage computing options and position.
     *
     * @memberof Stage
     */
    update(): void;
    /**
     * Moves stage to relative index.
     *
     * @param {number} delta Index delta.
     * @param {boolean} [tween=true] Use tweening
     * @memberof Stage
     */
    move(delta: number, tween?: boolean): void;
    /**
     * Moves stage to absolute index.
     *
     * @param {number} index Index.
     * @param {boolean} [tween=true] Use tweening
     * @memberof Stage
     */
    moveTo(index: number, tween?: boolean): void;
    /**
     * Drags stage to relative position.
     *
     * @param {number} delta Position delta.
     * @memberof Stage
     */
    drag(delta: number): void;
    /**
     * Finishes carousel drag.
     *
     * @param {boolean} movedLeft If carousel moved to the left.
     * @memberof Stage
     */
    dragEnd(movedLeft: boolean): void;
    /**
     * Returns carousel item count.
     *
     * @returns {number} Item count.
     * @memberof Stage
     */
    count(): number;
    /**
     * Returns current index.
     *
     * @returns {number} Current index.
     * @memberof Stage
     */
    current(): number;
    /**
     * Returns last index.
     *
     * @returns {number} Last index.
     * @memberof Stage
     */
    last(): number;
}
