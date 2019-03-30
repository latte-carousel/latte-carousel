import { IOptions, Options } from "../option/options";
import { Stage } from "../stage";

/**
 * Touch support.
 *
 * @export
 * @class Touch
 */
export class Touch {
    private currentOptions: IOptions;

    // Positions
    private firstX: number = 0;
    private firstY: number = 0;
    private previousX: number = 0;
    private previousY: number = 0;

    // Speed
    private deltaX: number = 0;
    private deltaY: number = 0;

    // Distance
    private distanceX: number = 0;
    private distanceY: number = 0;
    private dragMinDistance: number = 20;

    // Free mode
    private dragFreeMinDelta: number = 3;
    private dragFreeMaxDelta: number = 40;
    private dragFreeBaseDelta: number = 600;

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

        this.firstX = this.previousX = touch.clientX;
        this.firstY = this.previousY = touch.clientY;

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

        this.deltaX = touch.clientX - this.previousX;
        this.deltaY = touch.clientY - this.previousY;

        this.distanceX += Math.abs(this.deltaX);
        this.distanceY += Math.abs(this.deltaY);

        if (this.currentOptions.touch) {
            const minimumDrag = this.distanceX >= this.dragMinDistance || this.distanceY >= this.dragMinDistance;
            const horizontalDrag = this.distanceX >= this.distanceY;

            // Check for minimum distance and horizontal drag
            if (this.state === "free" && minimumDrag) {
                if (horizontalDrag) {
                    this.state = "drag";
                } else {
                    this.state = "lock";
                }
            }

            // Lock scroll on touch move
            if (this.state === "drag") {
                if (event.cancelable) {
                    event.preventDefault();
                }

                this.stage.drag(this.deltaX);
            }
        }

        this.previousX = touch.clientX;
        this.previousY = touch.clientY;
    }

    /**
     * Touch end listener.
     *
     * @private
     * @param {TouchEvent} event Touch event.
     * @memberof Touch
     */
    private onTouchEnd(event: TouchEvent) {
        // Prevent disabling touch while dragging
        if (this.currentOptions.touch || this.state === "drag") {
            this.state = "free";

            const movedLeft = this.firstX > this.previousX;

            if (this.currentOptions.mode === "align") {
                this.stage.dragEndAlign(movedLeft);
            } else if (this.currentOptions.mode === "free") {
                const clamp = Math.min(Math.max(Math.abs(this.deltaX), this.dragFreeMinDelta), this.dragFreeMaxDelta);
                const relative = (clamp - this.dragFreeMinDelta) / (this.dragFreeMaxDelta - this.dragFreeMinDelta);

                const shouldAnimate = relative > 0;

                if (shouldAnimate) {
                    const delta = relative * this.dragFreeBaseDelta * Math.sign(this.deltaX);

                    this.stage.dragEndFree(delta, movedLeft);
                } else {
                    this.stage.dragEndFree(0, movedLeft);
                }
            }
        }
    }
}
