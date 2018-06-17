import { Options } from "../option/options";
import { Stage } from "../stage";

/**
 * Carousel navigation dots.
 *
 * @export
 * @class Dots
 */
export class Dots {
    private currentOptions: Options;

    private dotsContainer: HTMLElement;
    private dots: NodeListOf<HTMLElement>;

    /**
     * Creates an instance of Dots.
     * @param {HTMLElement} carouselElement Carousel element.
     * @param {Stage} stage Carousel stage.
     * @param {Options} options Carousel options.
     * @memberof Dots
     */
    constructor(private carouselElement: HTMLElement, private stage: Stage, private options: Options) {
        this.createContainer();

        this.update();
    }

    /**
     * Updates carousel dots.
     *
     * @memberof Dots
     */
    public update() {
        this.currentOptions = this.options.getBreakpointOptions();

        if (this.currentOptions.dots === true) {
            this.dotsContainer.className = "latte-dots";

            this.createDots();

            this.updateActive();
        } else {
            this.dotsContainer.className = "latte-dots invisible";
        }
    }

    /**
     * Creates the dots container.
     *
     * @private
     * @memberof Dots
     */
    private createContainer() {
        this.dotsContainer = document.createElement("div");
        this.dotsContainer.className = "latte-dots";

        this.carouselElement.appendChild(this.dotsContainer);
    }

    /**
     * Creates the dots itself.
     *
     * @private
     * @memberof Dots
     */
    private createDots() {
        const count = this.dotCount();

        // Avoid recreation
        if (this.dots != null && this.dots.length === count) {
            return;
        }

        // Build elements
        let html = "";

        for (let i = 0; i < count; i++) {
            let index = i * Math.ceil(this.currentOptions.count);
            index = Math.min(index, this.stage.last());

            html += `<div class="latte-dot" data-index=${index}></div>`;
        }

        this.dotsContainer.innerHTML = html;

        this.dots = this.dotsContainer.querySelectorAll(".latte-dot");

        // Add events
        for (let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i];

            dot.addEventListener("click", this.onDotClick.bind(this));
        }
    }

    /**
     * Sets the active navigation dot.
     *
     * @private
     * @memberof Dots
     */
    private updateActive() {
        for (let i = 0; i < this.dots.length; i++) {
            // Index bounds
            const dot = this.dots[i];
            const index = parseFloat(dot.getAttribute("data-index"));

            let nextIndex;
            if (i + 1 < this.dots.length) {
                const nextDot = this.dots[i + 1];
                nextIndex = parseFloat(nextDot.getAttribute("data-index"));
            }

            // Active class
            const active = this.stage.current() >= index && (nextIndex == null || this.stage.current() < nextIndex);

            const clazz = "latte-dot" + (active ? " active" : "");

            dot.setAttribute("class", clazz);
        }
    }

    /**
     * Returns navigation dot count.
     *
     * @private
     * @returns {number} Dot count.
     * @memberof Dots
     */
    private dotCount(): number {
        return Math.ceil(this.stage.count() / Math.ceil(this.currentOptions.count));
    }

    /**
     * Dot click listener.
     *
     * @private
     * @param {MouseEvent} event Mouse event.
     * @memberof Dots
     */
    private onDotClick(event: MouseEvent) {
        const dot = event.target as HTMLElement;
        const index = parseFloat(dot.getAttribute("data-index"));

        this.stage.moveTo(index);

        this.updateActive();
    }
}
