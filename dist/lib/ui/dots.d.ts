import { Options } from "../option/options";
import { Stage } from "../stage";
/**
 * Carousel navigation dots.
 *
 * @export
 * @class Dots
 */
export declare class Dots {
    private carouselElement;
    private stage;
    private options;
    private currentOptions;
    private dotsContainer;
    private dots;
    /**
     * Creates an instance of Dots.
     * @param {HTMLElement} carouselElement Carousel element.
     * @param {Stage} stage Carousel stage.
     * @param {Options} options Carousel options.
     * @memberof Dots
     */
    constructor(carouselElement: HTMLElement, stage: Stage, options: Options);
    /**
     * Updates carousel dots.
     *
     * @memberof Dots
     */
    update(): void;
    /**
     * Creates the dots container.
     *
     * @private
     * @memberof Dots
     */
    private createContainer;
    /**
     * Creates the dots itself.
     *
     * @private
     * @memberof Dots
     */
    private createDots;
    /**
     * Sets the active navigation dot.
     *
     * @private
     * @memberof Dots
     */
    private updateActive;
    /**
     * Returns navigation dot count.
     *
     * @private
     * @returns {number} Dot count.
     * @memberof Dots
     */
    private dotCount;
    /**
     * Dot click listener.
     *
     * @private
     * @param {MouseEvent} event Mouse event.
     * @memberof Dots
     */
    private onDotClick;
}
