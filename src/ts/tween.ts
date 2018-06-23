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
    public static translate(element: HTMLElement, x: number, y: number, duration: number) {
        const source = this.getTranslate(element);

        this.animate(duration, (progress) => {
            const value = {
                x: this.interpolate(source.x, x, progress),
                y: this.interpolate(source.y, y, progress),
            };

            this.setTranslate(element, value);
        });
    }

    /**
     * Animates using callback loop.
     *
     * @private
     * @static
     * @param {number} duration Duration in millis.
     * @param {(progress: number) => void} callback Animation callback.
     * @memberof Tween
     */
    private static animate(duration: number, callback: (progress: number) => void) {
        if (duration === 0) {
            callback(1);
            return;
        }

        const start = new Date().getTime();

        const loop = () => {
            const now = new Date().getTime();
            const relative = (now - start) / duration;
            const progress = Math.min(relative, 1);

            callback(progress);

            if (progress < 1) {
                this.requestFrame(loop);
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
        const value = (element.style as any)["-ms-transform"] || element.style.transform;

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
        return this.easeInOutQuad(amount, source, dest - source, 1);
    }

    /**
     * Quadratic easing in/out function.
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
    private static easeInOutQuad(t: number, b: number, c: number, d: number): number {
        t /= d / 2;
        if (t < 1) {
            return (c / 2) * t * t + b;
        }
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }
}
