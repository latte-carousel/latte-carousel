import { Options } from "../option/options";
import { Stage } from "../stage";
/**
 * Carousel autoplay.
 *
 * @export
 * @class Autoplay
 */
export declare class Autoplay {
    private contentElement;
    private stage;
    private options;
    private currentOptions;
    private intervalId;
    private mouseOver;
    /**
     * Creates an instance of Autoplay.
     * @param {HTMLElement} contentElement Content element.
     * @param {Stage} stage Carousel stage.
     * @param {Options} options Carousel options.
     * @memberof Autoplay
     */
    constructor(contentElement: HTMLElement, stage: Stage, options: Options);
    /**
     * Updates carousel autoplay.
     *
     * @memberof Autoplay
     */
    update(): void;
    /**
     * Removes autoplay.
     *
     * @memberof Autoplay
     */
    remove(): void;
    /**
     * Interval listener.
     *
     * @private
     * @memberof Autoplay
     */
    private onInterval;
    /**
     * Mouse enter listener.
     *
     * @private
     * @memberof Autoplay
     */
    private onMouseEnter;
    /**
     * Mouse leave listener.
     *
     * @private
     * @memberof Autoplay
     */
    private onMouseLeave;
}
