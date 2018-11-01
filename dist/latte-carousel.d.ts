declare module 'latte/event/listener-map' {
	/**
	 * Listener map used by event emitter.
	 *
	 * @export
	 * @interface ListenerMap
	 */
	export interface IListenerMap {
	    [event: string]: Array<(data?: any) => void>;
	}

}
declare module 'latte/event/event-emitter' {
	/**
	 * Basic event emitter implementation.
	 *
	 * @export
	 * @class EventEmitter
	 */
	export class EventEmitter {
	    private listeners;
	    /**
	     * Adds a new event listener.
	     *
	     * @param {string} event Event type.
	     * @param {(data?: any) => void} listener Event listener.
	     * @memberof EventEmitter
	     */
	    on(event: string, listener: (data?: any) => void): void;
	    /**
	     * Triggers all listeners by event type.
	     *
	     * @param {string} event Event type.
	     * @param {*} [data] Event data.
	     * @memberof EventEmitter
	     */
	    trigger(event: string, data?: any): void;
	    /**
	     * Clears all listeners.
	     *
	     * @memberof EventEmitter
	     */
	    off(): void;
	}

}
declare module 'latte/option/responsive-map' {
	import { Options } from 'latte/option/options';
	/**
	 * Responsive options map.
	 *
	 * @export
	 * @class ResponsiveMap
	 */
	export class ResponsiveMap {
	    [breakpoint: string]: Options;
	    /**
	     * Creates an instance of ResponsiveMap.
	     * @param {ResponsiveMap} [map] Map to copy properties.
	     * @param {Options} [globalOptions] Options to use as default.
	     * @memberof ResponsiveMap
	     */
	    constructor(map?: ResponsiveMap, globalOptions?: Options);
	}

}
declare module 'latte/option/options' {
	import { ResponsiveMap } from 'latte/option/responsive-map';
	/**
	 * Carousel options.
	 *
	 * @export
	 * @class Options
	 */
	export class Options {
	    count: number;
	    padding: number;
	    touch: boolean;
	    buttons: boolean;
	    dots: boolean;
	    rewind: boolean;
	    autoplay: number;
	    animation: number;
	    responsive: ResponsiveMap;
	    /**
	     * Creates an instance of Options.
	     * @param {Options} [options] Options to copy properties.
	     * @memberof Options
	     */
	    constructor(options?: Options);
	    /**
	     * Finds options based on current breakpoint (screen width).
	     *
	     * @returns {Options} Carousel options.
	     * @memberof Options
	     */
	    getBreakpointOptions(): Options;
	}

}
declare module 'latte/tween' {
	export interface ITweenElement extends HTMLElement {
	    tweenId: number;
	}
	/**
	 * Basic tweening implementation.
	 *
	 * @export
	 * @class Tween
	 */
	export class Tween {
	    /**
	     * Translates the element to position.
	     *
	     * @static
	     * @param {HTMLElement} element Element to translate.
	     * @param {number} x X position.
	     * @param {number} y Y position.
	     * @param {number} duration Duration in millis.
	     * @memberof Tween
	     */
	    static translate(element: HTMLElement, x: number, y: number, duration: number): void;
	    /**
	     * Unique animation ID.
	     *
	     * @private
	     * @static
	     * @type {number}
	     * @memberof Tween
	     */
	    private static animationId;
	    /**
	     * Animates using callback loop.
	     *
	     * @private
	     * @static
	     * @param {number} duration Duration in millis.
	     * @param {(progress: number) => boolean} callback Animation callback. Must return true for animation to continue.
	     * @memberof Tween
	     */
	    private static animate;
	    /**
	     * Gets current translate value.
	     *
	     * @private
	     * @static
	     * @param {HTMLElement} element Element to get value.
	     * @returns {{ x: number, y: number }} Translate value.
	     * @memberof Tween
	     */
	    private static getTranslate;
	    /**
	     * Sets translate value.
	     *
	     * @private
	     * @static
	     * @param {HTMLElement} element Element to set value.
	     * @param {{ x: number, y: number }} value Translate value.
	     * @memberof Tween
	     */
	    private static setTranslate;
	    /**
	     * Request animation frame helper.
	     *
	     * @private
	     * @static
	     * @param {() => void} callback Animation frame callback.
	     * @memberof Tween
	     */
	    private static requestFrame;
	    /**
	     * Interpolates two numbers.
	     *
	     * @private
	     * @static
	     * @param {number} source Source value.
	     * @param {number} dest Destination value.
	     * @param {number} amount Percentage.
	     * @returns {number} Interpolated value.
	     * @memberof Tween
	     */
	    private static interpolate;
	    /**
	     * Cubic easing out function.
	     * Inspired from: http://robertpenner.com/easing/penner_easing_as1.txt
	     *
	     * @private
	     * @static
	     * @param {number} t Time.
	     * @param {number} b Base value.
	     * @param {number} c Change in value.
	     * @param {number} d Duration.
	     * @returns {number} Interpolated value.
	     * @memberof Tween
	     */
	    private static easeOutCubic;
	}

}
declare module 'latte/stage' {
	import { EventEmitter } from 'latte/event/event-emitter';
	import { Options } from 'latte/option/options';
	/**
	 * Base carousel stage.
	 *
	 * @export
	 * @class Stage
	 * @extends {EventEmitter}
	 */
	export class Stage extends EventEmitter {
	    private contentElement;
	    private stageElement;
	    private itemElements;
	    private options;
	    private currentOptions;
	    private currentIndex;
	    private currentPosition;
	    private contentSize;
	    private stageSize;
	    private itemSize;
	    /**
	     * Creates an instance of Stage.
	     * @param {HTMLElement} contentElement Content element.
	     * @param {HTMLElement} stageElement Stage element.
	     * @param {HTMLCollection} itemElements Items elements.
	     * @param {Options} options Carousel options.
	     * @memberof Stage
	     */
	    constructor(contentElement: HTMLElement, stageElement: HTMLElement, itemElements: HTMLCollection, options: Options);
	    /**
	     * Updates stage computing options and position.
	     *
	     * @memberof Stage
	     */
	    update(): void;
	    /**
	     * Moves stage to relative index.
	     *
	     * @param {number} delta Index delta.
	     * @param {boolean} [tween=true] Use tweening
	     * @memberof Stage
	     */
	    move(delta: number, tween?: boolean): void;
	    /**
	     * Moves stage to absolute index.
	     *
	     * @param {number} index Index.
	     * @param {boolean} [tween=true] Use tweening
	     * @memberof Stage
	     */
	    moveTo(index: number, tween?: boolean): void;
	    /**
	     * Drags stage to relative position.
	     *
	     * @param {number} delta Position delta.
	     * @memberof Stage
	     */
	    drag(delta: number): void;
	    /**
	     * Finishes carousel drag.
	     *
	     * @param {boolean} movedLeft If carousel moved to the left.
	     * @memberof Stage
	     */
	    dragEnd(movedLeft: boolean): void;
	    /**
	     * Returns carousel item count.
	     *
	     * @returns {number} Item count.
	     * @memberof Stage
	     */
	    count(): number;
	    /**
	     * Returns current index.
	     *
	     * @returns {number} Current index.
	     * @memberof Stage
	     */
	    current(): number;
	    /**
	     * Returns last index.
	     *
	     * @returns {number} Last index.
	     * @memberof Stage
	     */
	    last(): number;
	}

}
declare module 'latte/ui/autoplay' {
	import { Options } from 'latte/option/options';
	import { Stage } from 'latte/stage';
	/**
	 * Carousel autoplay.
	 *
	 * @export
	 * @class Autoplay
	 */
	export class Autoplay {
	    private contentElement;
	    private stage;
	    private options;
	    private currentOptions;
	    private intervalId;
	    private mouseOver;
	    /**
	     * Creates an instance of Autoplay.
	     * @param {HTMLElement} contentElement Content element.
	     * @param {Stage} stage Carousel stage.
	     * @param {Options} options Carousel options.
	     * @memberof Autoplay
	     */
	    constructor(contentElement: HTMLElement, stage: Stage, options: Options);
	    /**
	     * Updates carousel autoplay.
	     *
	     * @memberof Autoplay
	     */
	    update(): void;
	    /**
	     * Removes autoplay.
	     *
	     * @memberof Autoplay
	     */
	    remove(): void;
	    /**
	     * Interval listener.
	     *
	     * @private
	     * @memberof Autoplay
	     */
	    private onInterval;
	    /**
	     * Mouse enter listener.
	     *
	     * @private
	     * @memberof Autoplay
	     */
	    private onMouseEnter;
	    /**
	     * Mouse leave listener.
	     *
	     * @private
	     * @memberof Autoplay
	     */
	    private onMouseLeave;
	}

}
declare module 'latte/ui/buttons' {
	import { Options } from 'latte/option/options';
	import { Stage } from 'latte/stage';
	/**
	 * Carousel buttons.
	 *
	 * @export
	 * @class Buttons
	 */
	export class Buttons {
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

}
declare module 'latte/ui/dots' {
	import { Options } from 'latte/option/options';
	import { Stage } from 'latte/stage';
	/**
	 * Carousel navigation dots.
	 *
	 * @export
	 * @class Dots
	 */
	export class Dots {
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

}
declare module 'latte/ui/touch' {
	import { Options } from 'latte/option/options';
	import { Stage } from 'latte/stage';
	/**
	 * Touch support.
	 *
	 * @export
	 * @class Touch
	 */
	export class Touch {
	    private contentElement;
	    private stage;
	    private options;
	    private currentOptions;
	    private firstX;
	    private previousX;
	    private previousY;
	    private distanceX;
	    private distanceY;
	    private minDistance;
	    private state;
	    /**
	     * Creates an instance of Touch.
	     * @param {HTMLElement} contentElement Content element.
	     * @param {Stage} stage Carousel stage.
	     * @param {Options} options Carousel options.
	     * @memberof Touch
	     */
	    constructor(contentElement: HTMLElement, stage: Stage, options: Options);
	    /**
	     * Updates touch support.
	     *
	     * @memberof Touch
	     */
	    update(): void;
	    /**
	     * Touch start listener.
	     *
	     * @private
	     * @param {TouchEvent} event Touch event.
	     * @memberof Touch
	     */
	    private onTouchStart;
	    /**
	     * Touch move listener.
	     *
	     * @private
	     * @param {TouchEvent} event Touch event.
	     * @memberof Touch
	     */
	    private onTouchMove;
	    /**
	     * Touch end listener.
	     *
	     * @private
	     * @param {TouchEvent} event Touch event.
	     * @memberof Touch
	     */
	    private onTouchEnd;
	}

}
declare module 'latte/carousel' {
	import { EventEmitter } from 'latte/event/event-emitter';
	import { Options } from 'latte/option/options';
	/**
	 * Base carousel class.
	 *
	 * @export
	 * @class Carousel
	 * @extends {EventEmitter}
	 */
	export class Carousel extends EventEmitter {
	    private carouselElement;
	    private contentElement;
	    private stageElement;
	    private itemElements;
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
	     * @param {Options} [options] Carousel options.
	     * @memberof Carousel
	     */
	    constructor(elementOrSelector: string | HTMLElement, options?: Options);
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

}
declare module 'latte/index' {
	export { Carousel } from 'latte/carousel';
	export { Options } from 'latte/option/options';
	export { ResponsiveMap } from 'latte/option/responsive-map';

}
