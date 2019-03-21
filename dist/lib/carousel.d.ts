import { EventEmitter } from "./event/event-emitter";
import { IOptions } from "./option/options";
/**
 * Base carousel class.
 *
 * @export
 * @class Carousel
 * @extends {EventEmitter}
 */
export declare class Carousel extends EventEmitter {
    private carouselElement;
    private contentElement;
    private stageElement;
    private itemElements;
    private currentOptions;
    private options;
    private stage;
    private touch;
    private buttons;
    private dots;
    private autoplay;
    private originalHtml;
    private onWindowResizeListener;
    /**
     * Creates an instance of Carousel.
     * @param {(string | HTMLElement)} elementOrSelector Root carousel element or selector.
     * @param {IOptions} [options] Carousel options.
     * @memberof Carousel
     */
    constructor(elementOrSelector: string | HTMLElement, options?: IOptions);
    /**
     * Removes carousel.
     *
     * @memberof Carousel
     */
    remove(): void;
    /**
     * Creates content and stage containers.
     *
     * @private
     * @memberof Carousel
     */
    private createContainers;
    /**
     * Updates carousel.
     *
     * @private
     * @memberof Carousel
     */
    private update;
    /**
     * Window resize listener.
     *
     * @private
     * @param {UIEvent} event UI Event.
     * @memberof Carousel
     */
    private onWindowResize;
    /**
     * Stage move listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onStageMove;
    /**
     * Stage moved listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onStageMoved;
    /**
     * Carousel previous listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselPrevious;
    /**
     * Carousel next listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselNext;
    /**
     * Carousel goto listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselGoto;
    /**
     * Carousel update listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselUpdate;
    /**
     * Carousel remove listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselRemove;
}
