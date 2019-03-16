import { Options } from "../option/options";
import { Stage } from "../stage";

/**
 * Carousel autoplay.
 *
 * @export
 * @class Autoplay
 */
export class Autoplay {
    private currentOptions: Options;

    private intervalId: number = 0;
    private mouseOver: boolean = false;

    /**
     * Creates an instance of Autoplay.
     * @param {HTMLElement} contentElement Content element.
     * @param {Stage} stage Carousel stage.
     * @param {Options} options Carousel options.
     * @memberof Autoplay
     */
    constructor(private contentElement: HTMLElement, private stage: Stage, private options: Options) {
        this.contentElement.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.contentElement.addEventListener("mouseleave", this.onMouseLeave.bind(this));

        this.update();
    }

    /**
     * Updates carousel autoplay.
     *
     * @memberof Autoplay
     */
    public update() {
        this.currentOptions = this.options.getBreakpointOptions();

        // Clear current interval
        if (this.intervalId > 0) {
            window.clearInterval(this.intervalId);
        }

        if (this.currentOptions.autoplay > 0) {
            this.intervalId = window.setInterval(this.onInterval.bind(this), this.currentOptions.autoplay);
        }
    }

    /**
     * Removes autoplay.
     *
     * @memberof Autoplay
     */
    public remove() {
        if (this.intervalId > 0) {
            window.clearInterval(this.intervalId);
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
    }

    /**
     * Mouse leave listener.
     *
     * @private
     * @memberof Autoplay
     */
    private onMouseLeave() {
        this.mouseOver = false;
    }
}
