import { Options } from "../option/options";
import { Stage } from "../stage";
/**
 * Carousel buttons.
 *
 * @export
 * @class Buttons
 */
export declare class Buttons {
    private carouselElement;
    private contentElement;
    private stage;
    private options;
    private currentOptions;
    private previousButton;
    private nextButton;
    /**
     * Creates an instance of Buttons.
     * @param {HTMLElement} carouselElement Carousel element.
     * @param {HTMLElement} contentElement Content element.
     * @param {Stage} stage Carousel stage.
     * @param {Options} options Carousel options.
     * @memberof Buttons
     */
    constructor(carouselElement: HTMLElement, contentElement: HTMLElement, stage: Stage, options: Options);
    /**
     * Updates carousel buttons.
     *
     * @memberof Buttons
     */
    update(): void;
    /**
     * Creates a new button.
     *
     * @private
     * @param {string} clazz Element class.
     * @returns {HTMLElement} Element created.
     * @memberof Buttons
     */
    private createButton;
    /**
     * Previous click listener.
     *
     * @private
     * @param {MouseEvent} event Mouse event.
     * @memberof Buttons
     */
    private onPreviousClick;
    /**
     * Next click listener.
     *
     * @private
     * @param {MouseEvent} event Mouse event.
     * @memberof Buttons
     */
    private onNextClick;
}
