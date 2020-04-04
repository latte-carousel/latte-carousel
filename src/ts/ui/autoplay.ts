import { IOptions, Options } from "../option/options";
import { Stage } from "../stage";

/**
 * Carousel autoplay.
 *
 * @export
 * @class Autoplay
 */
export class Autoplay {
    private currentOptions: IOptions;

    private intervalId: number = 0;
    private mouseOver: boolean = false;

    /**
     * Creates an instance of Autoplay.
     * @param {HTMLElement} carouselElement Carousel element.
     * @param {Stage} stage Carousel stage.
     * @param {Options} options Carousel options.
     * @memberof Autoplay
     */
    constructor(private carouselElement: HTMLElement, private stage: Stage, private options: Options) {
        this.carouselElement.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.carouselElement.addEventListener("mouseleave", this.onMouseLeave.bind(this));

        this.update();
    }

    /**
     * Updates carousel autoplay.
     *
     * @memberof Autoplay
     */
    public update() {
        this.currentOptions = this.options.getBreakpointOptions();

        this.disableInterval();

        this.enableInterval();
    }

    /**
     * Removes autoplay.
     *
     * @memberof Autoplay
     */
    public remove() {
        this.disableInterval();
    }

    /**
     * Enables interval.
     *
     * @private
     * @memberof Autoplay
     */
    private enableInterval() {
        if (this.currentOptions.autoplay > 0 && this.intervalId === 0) {
            this.intervalId = window.setInterval(this.onInterval.bind(this), this.currentOptions.autoplay);
        }
    }

    /**
     * Disables interval.
     *
     * @private
     * @memberof Autoplay
     */
    private disableInterval() {
        if (this.intervalId > 0) {
            window.clearInterval(this.intervalId);

            this.intervalId = 0;
        }
    }

    /**
     * Interval listener.
     *
     * @private
     * @memberof Autoplay
     */
    private onInterval() {
        if (!this.mouseOver) {
            this.stage.move(this.currentOptions.move);
        }
    }

    /**
     * Mouse enter listener.
     *
     * @private
     * @memberof Autoplay
     */
    private onMouseEnter() {
        this.mouseOver = true;

        this.disableInterval();
    }

    /**
     * Mouse leave listener.
     *
     * @private
     * @memberof Autoplay
     */
    private onMouseLeave() {
        this.mouseOver = false;

        this.enableInterval();
    }
}
