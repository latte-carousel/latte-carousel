import { Options } from "../option/options";
import { Stage } from "../stage";

/**
 * Touch support.
 *
 * @export
 * @class Touch
 */
export class Touch {
    private currentOptions: Options;

    private firstX = 0;
    private previousX = 0;
    private previousY = 0;

    private distanceX = 0;
    private distanceY = 0;
    private minDistance = 15;

    private state: "free" | "drag" | "lock" = "free";

    /**
     * Creates an instance of Touch.
     * @param {HTMLElement} contentElement Content element.
     * @param {Stage} stage Carousel stage.
     * @param {Options} options Carousel options.
     * @memberof Touch
     */
    constructor(private contentElement: HTMLElement, private stage: Stage, private options: Options) {
        this.contentElement.addEventListener("touchstart", this.onTouchStart.bind(this), { passive: true });
        this.contentElement.addEventListener("touchmove", this.onTouchMove.bind(this));
        this.contentElement.addEventListener("touchend", this.onTouchEnd.bind(this), { passive: true });

        this.update();
    }

    /**
     * Updates touch support.
     *
     * @memberof Touch
     */
    public update() {
        this.currentOptions = this.options.getBreakpointOptions();
    }

    /**
     * Touch start listener.
     *
     * @private
     * @param {TouchEvent} event Touch event.
     * @memberof Touch
     */
    private onTouchStart(event: TouchEvent) {
        const touch = event.touches[0];

        this.firstX = this.previousX = touch.pageX;

        this.distanceX = this.distanceY = 0;
    }

    /**
     * Touch move listener.
     *
     * @private
     * @param {TouchEvent} event Touch event.
     * @memberof Touch
     */
    private onTouchMove(event: TouchEvent) {
        const touch = event.touches[0];

        const deltaX = touch.pageX - this.previousX;
        const deltaY = touch.pageY - this.previousY;

        this.distanceX += Math.abs(deltaX);
        this.distanceY += Math.abs(deltaY);

        const dragDistance = this.distanceX > this.minDistance || this.distanceY > this.minDistance;
        const horizontalDrag = this.distanceX > this.distanceY;

        if (this.currentOptions.touch) {
            // Check for minimum distance and horizontal drag
            if (this.state === "free" && dragDistance) {
                if (horizontalDrag) {
                    this.state = "drag";
                } else {
                    this.state = "lock";
                }
            }

            // Lock scroll on touch move
            if (this.state === "drag") {
                event.preventDefault();

                this.stage.drag(deltaX);
            }
        }

        this.previousX = touch.pageX;
        this.previousY = touch.pageY;
    }

    /**
     * Touch end listener.
     *
     * @private
     * @param {TouchEvent} event Touch event.
     * @memberof Touch
     */
    private onTouchEnd(event: TouchEvent) {
        const movedLeft = this.firstX > this.previousX;

        // Prevent disabling touch while dragging
        if (this.currentOptions.touch || this.state === "drag") {
            this.state = "free";

            this.stage.dragEnd(movedLeft);
        }
    }
}
