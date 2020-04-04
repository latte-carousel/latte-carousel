import { Options } from "../option/options";
import { Stage } from "../stage";
/**
 * Carousel autoplay.
 *
 * @export
 * @class Autoplay
 */
export declare class Autoplay {
    private carouselElement;
    private stage;
    private options;
    private currentOptions;
    private intervalId;
    private mouseOver;
    /**
     * Creates an instance of Autoplay.
     * @param {HTMLElement} carouselElement Carousel element.
     * @param {Stage} stage Carousel stage.
     * @param {Options} options Carousel options.
     * @memberof Autoplay
     */
    constructor(carouselElement: HTMLElement, stage: Stage, options: Options);
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
     * Enables interval.
     *
     * @private
     * @memberof Autoplay
     */
    private enableInterval;
    /**
     * Disables interval.
     *
     * @private
     * @memberof Autoplay
     */
    private disableInterval;
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
