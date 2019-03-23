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
     * @param {() => void} [end] Animation end callback.
     * @memberof Tween
     */
    public static translate(element: HTMLElement, x: number, y: number, duration: number, end?: () => void) {
        const source = this.getTranslate(element);
        const id = this.animationId++;

        (element as ITweenElement).tweenId = id;

        const update = (progress: number) => {
            if ((element as ITweenElement).tweenId !== id) {
                return false;
            }

            const value = {
                x: this.interpolate(source.x, x, progress),
                y: this.interpolate(source.y, y, progress),
            };

            this.setTranslate(element, value);

            return true;
        };

        this.animate(duration, update, end);
    }

    /**
     * Unique animation ID.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Tween
     */
    private static animationId: number = 1;

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
    private static animate(duration: number, update: (progress: number) => boolean, end?: () => void) {
        if (duration === 0) {
            update(1);

            if (end != null) {
                end();
            }

            return;
        }

        const start = new Date().getTime();

        const loop = () => {
            const now = new Date().getTime();
            const relative = (now - start) / duration;
            const progress = Math.min(relative, 1);

            const shouldContinue = update(progress);

            if (shouldContinue) {
                if (progress < 1) {
                    this.requestFrame(loop);
                } else if (end != null) {
                    end();
                }
            }
        };

        this.requestFrame(loop);
    }

    /**
     * Gets current translate value.
     *
     * @private
     * @static
     * @param {HTMLElement} element Element to get value.
     * @returns {{ x: number, y: number }} Translate value.
     * @memberof Tween
     */
    private static getTranslate(element: HTMLElement): { x: number; y: number } {
        const source = { x: 0, y: 0 };

        const regex = /translate\(([0-9.-]+)px,\s?([0-9.-]+)px\)/;
        const value =
            (element.style as any)["-ms-transform"] ||
            (element.style as any)["-webkit-transform"] ||
            (element.style as any)["-moz-transform"] ||
            (element.style as any)["-o-transform"] ||
            element.style.transform;

        if (value != null) {
            const match = regex.exec(value);

            if (match != null) {
                source.x = parseFloat(match[1]);
                source.y = parseFloat(match[2]);
            }
        }

        return source;
    }

    /**
     * Sets translate value.
     *
     * @private
     * @static
     * @param {HTMLElement} element Element to set value.
     * @param {{ x: number, y: number }} value Translate value.
     * @memberof Tween
     */
    private static setTranslate(element: HTMLElement, value: { x: number; y: number }) {
        const transform = `translate(${Math.ceil(value.x)}px, ${Math.ceil(value.y)}px)`;

        (element.style as any)["-ms-transform"] = transform;
        (element.style as any)["-webkit-transform"] = transform;
        (element.style as any)["-moz-transform"] = transform;
        (element.style as any)["-o-transform"] = transform;
        element.style.transform = transform;
    }

    /**
     * Request animation frame helper.
     *
     * @private
     * @static
     * @param {() => void} callback Animation frame callback.
     * @memberof Tween
     */
    private static requestFrame(callback: () => void) {
        if (requestAnimationFrame != null) {
            requestAnimationFrame(callback);
        } else {
            window.setTimeout(callback, 1000 / 60);
        }
    }

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
    private static interpolate(source: number, dest: number, amount: number): number {
        return this.easeOutCubic(amount, source, dest - source, 1);
    }

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
    private static easeOutCubic(t: number, b: number, c: number, d: number): number {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
}
