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
    private itemElements: HTMLCollection;

    private options: Options;
    private stage: Stage;
    private touch: Touch;
    private buttons: Buttons;
    private dots: Dots;
    private autoplay: Autoplay;

    private originalHtml: string;

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

        if (this.carouselElement.querySelector(".latte-content") != null) {
            throw new Error("Cannot create multiple instances using the same latte-carousel element.");
        }

        this.originalHtml = this.carouselElement.innerHTML;

        this.createContainers();

        this.contentElement = this.carouselElement.children[0] as HTMLElement;
        this.stageElement = this.contentElement.children[0] as HTMLElement;
        this.itemElements = this.stageElement.children;

        this.options = new Options(options);
        this.stage = new Stage(this.contentElement, this.stageElement, this.itemElements, this.options);
        this.touch = new Touch(this.contentElement, this.stage, this.options);
        this.buttons = new Buttons(this.carouselElement, this.contentElement, this.stage, this.options);
        this.dots = new Dots(this.carouselElement, this.stage, this.options);
        this.autoplay = new Autoplay(this.contentElement, this.stage, this.options);

        this.onWindowResizeListener = this.onWindowResize.bind(this);

        window.addEventListener("resize", this.onWindowResizeListener);

        this.stage.on("drag", this.onStageDrag.bind(this));
        this.stage.on("move", this.onStageMove.bind(this));
        this.stage.on("moved", this.onStageMoved.bind(this));

        this.update();

        this.on("previous", this.onCarouselPrevious.bind(this));
        this.on("next", this.onCarouselNext.bind(this));
        this.on("goto", this.onCarouselGoto.bind(this));
        this.on("update", this.onCarouselUpdate.bind(this));
        this.on("remove", this.onCarouselRemove.bind(this));
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

        this.carouselElement.innerHTML = this.originalHtml;
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
     * Stage drag listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onStageDrag(data: any) {
        this.trigger("drag", data);
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

        this.trigger("move", data);
    }

    /**
     * Stage moved listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onStageMoved(data: any) {
        this.trigger("moved", data);
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

    /**
     * Carousel update listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselUpdate(data: any) {
        this.update();
    }

    /**
     * Carousel remove listener.
     *
     * @private
     * @param {*} data Event data.
     * @memberof Carousel
     */
    private onCarouselRemove(data: any) {
        this.remove();
    }
}
