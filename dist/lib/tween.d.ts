export interface ITweenElement extends HTMLElement {
    tweenId: number;
}
/**
 * Basic tweening implementation.
 *
 * @export
 * @class Tween
 */
export declare class Tween {
    /**
     * Translates the element to position.
     *
     * @static
     * @param {HTMLElement} element Element to translate.
     * @param {number} x X position.
     * @param {number} y Y position.
     * @param {number} duration Duration in millis.
     * @param {() => void} [end] Animation end callback.
     * @memberof Tween
     */
    static translate(element: HTMLElement, x: number, y: number, duration: number, end?: () => void): void;
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
     * @param {(progress: number) => boolean} update Animation callback. Must return true for animation to continue.
     * @param {() => void} [end] Animation end callback.
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
