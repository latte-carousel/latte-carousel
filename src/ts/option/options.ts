import { ResponsiveMap } from "./responsive-map";

/**
 * Carousel options.
 *
 * @export
 * @class Options
 */
export class Options {
    public count?: number = 3;
    public move?: number = 1;
    public padding?: number = 0;
    public touch?: boolean | "free" = false;
    public buttons?: boolean = true;
    public dots?: boolean = false;
    public rewind?: boolean = true;
    public autoplay?: number = 0;
    public animation?: number = 500;

    public responsive?: ResponsiveMap;

    /**
     * Creates an instance of Options.
     * @param {Options} [options] Options to copy properties.
     * @memberof Options
     */
    constructor(options?: Options) {
        if (options == null) {
            return;
        }

        for (const prop in options) {
            if (options.hasOwnProperty(prop) && prop !== "responsive") {
                (this as any)[prop] = (options as any)[prop];
            }
        }

        // Copy responsive properties
        if (options.responsive != null) {
            this.responsive = new ResponsiveMap(options.responsive, this);
        }
    }

    /**
     * Finds options based on current breakpoint (screen width).
     *
     * @returns {Options} Carousel options.
     * @memberof Options
     */
    public getBreakpointOptions(): Options {
        if (this.responsive == null) {
            return this;
        }

        // Get current screen width
        const screenWidth = window.innerWidth || document.body.clientWidth;

        // Find matched breakpoint option
        let matchOption: Options = null;
        let matchBreakpoint = 0;

        for (const key in this.responsive) {
            if (this.responsive.hasOwnProperty(key)) {
                const option = this.responsive[key];
                const breakpoint = parseInt(key, 10);

                if (breakpoint >= matchBreakpoint && breakpoint <= screenWidth) {
                    matchOption = option;
                    matchBreakpoint = breakpoint;
                }
            }
        }

        return matchOption;
    }
}
