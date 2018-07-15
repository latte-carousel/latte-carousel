import { EventEmitter } from "./event/event-emitter";
import { Options } from "./option/options";
import { Stage } from "./stage";
import { Autoplay } from "./ui/autoplay";
import { Buttons } from "./ui/buttons";
import { Dots } from "./ui/dots";
import { Touch } from "./ui/touch";

// tslint:disable-next-line
require("../scss/style.scss");

/**
 * Base carousel class.
 *
 * @export
 * @class Carousel
 * @extends {EventEmitter}
 */
export class Carousel extends EventEmitter {
    private carouselElement: HTMLElement;
    private contentElement: HTMLElement;
    private stageElement: HTMLElement;
    private itemElements: NodeListOf<HTMLElement>;

    private options: Options;
    private stage: Stage;
    private touch: Touch;
    private buttons: Buttons;
    private dots: Dots;
    private autoplay: Autoplay;

    private onWindowResizeListener: (event: UIEvent) => void;

    /**
     * Creates an instance of Carousel.
     * @param {(string | HTMLElement)} elementOrSelector Root carousel element or selector.
     * @param {Options} [options] Carousel options.
     * @memberof Carousel
     */
    constructor(elementOrSelector: string | HTMLElement, options?: Options) {
        super();

        if (typeof elementOrSelector === "string") {
            this.carouselElement = document.querySelector(elementOrSelector);
        } else {
            this.carouselElement = elementOrSelector;
        }

        if (this.carouselElement == null) {
            throw new Error("Missing root latte-carousel element.");
        }

        this.createContainers();

        this.contentElement = this.carouselElement.querySelector(".latte-content");
        this.stageElement = this.contentElement.querySelector(".latte-stage");
        this.itemElements = this.stageElement.querySelectorAll(".latte-item");

        this.options = new Options(options);
        this.stage = new Stage(this.contentElement, this.stageElement, this.itemElements, this.options);
        this.touch = new Touch(this.contentElement, this.stage, this.options);
        this.buttons = new Buttons(this.carouselElement, this.contentElement, this.stage, this.options);
        this.dots = new Dots(this.carouselElement, this.stage, this.options);
        this.autoplay = new Autoplay(this.contentElement, this.stage, this.options);

        this.onWindowResizeListener = this.onWindowResize.bind(this);

        window.addEventListener("resize", this.onWindowResizeListener);

        this.stage.on("move", this.onStageMove.bind(this));

        this.update();

        this.on("previous", this.onCarouselPrevious.bind(this));
        this.on("next", this.onCarouselNext.bind(this));
        this.on("goto", this.onCarouselGoto.bind(this));
    }

    /**
     * Removes carousel.
     *
     * @memberof Carousel
     */
    public remove() {
        this.autoplay.remove();

        window.removeEventListener("resize", this.onWindowResizeListener);

        this.off();

        this.carouselElement.remove();
    }

    /**
     * Creates content and stage containers.
     *
     * @private
     * @memberof Carousel
     */
    private createContainers() {
        this.carouselElement.innerHTML = `
            <div class="latte-content">
                <div class="latte-stage">
                    ${this.carouselElement.innerHTML}
                </div>
            </div>
        `;
    }

    /**
     * Updates carousel.
     *
     * @private
     * @memberof Carousel
     */
    private update() {
        this.stage.update();

        this.touch.update();

        this.buttons.update();

        this.dots.update();

        this.autoplay.update();
    }

    /**
     * Window resize listener.
     *
     * @private
     * @param {UIEvent} event UI Event.
     * @memberof Carousel
     */
    private onWindowResize(event: UIEvent) {
        this.update();
    }

    /**
     * Stage move listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onStageMove(data: any) {
        this.dots.update();
    }

    /**
     * Carousel previous listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselPrevious(data: any) {
        this.stage.move(-1);
    }

    /**
     * Carousel next listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselNext(data: any) {
        this.stage.move(1);
    }

    /**
     * Carousel goto listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselGoto(data: any) {
        this.stage.moveTo(data as number);
    }
}
