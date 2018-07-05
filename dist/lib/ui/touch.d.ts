import { Options } from "../option/options";
import { Stage } from "../stage";
/**
 * Touch support.
 *
 * @export
 * @class Touch
 */
export declare class Touch {
    private contentElement;
    private stage;
    private options;
    private currentOptions;
    private firstX;
    private previousX;
    private previousY;
    private distanceX;
    private distanceY;
    private minDistance;
    private state;
    /**
     * Creates an instance of Touch.
     * @param {HTMLElement} contentElement Content element.
     * @param {Stage} stage Carousel stage.
     * @param {Options} options Carousel options.
     * @memberof Touch
     */
    constructor(contentElement: HTMLElement, stage: Stage, options: Options);
    /**
     * Updates touch support.
     *
     * @memberof Touch
     */
    update(): void;
    /**
     * Touch start listener.
     *
     * @private
     * @param {TouchEvent} event Touch event.
     * @memberof Touch
     */
    private onTouchStart;
    /**
     * Touch move listener.
     *
     * @private
     * @param {TouchEvent} event Touch event.
     * @memberof Touch
     */
    private onTouchMove;
    /**
     * Touch end listener.
     *
     * @private
     * @param {TouchEvent} event Touch event.
     * @memberof Touch
     */
    private onTouchEnd;
}
