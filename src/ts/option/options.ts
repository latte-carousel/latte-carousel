import { ResponsiveMap } from "./responsive-map";

/**
 * Carousel options interface.
 *
 * @export
 * @interface IOptions
 */
export interface IOptions {
    count?: number;
    move?: number;
    touch?: boolean;
    mode?: "align" | "free";
    buttons?: boolean;
    dots?: boolean;
    rewind?: boolean;
    autoplay?: number;
    animation?: number;
    responsive?: ResponsiveMap;
}

/**
 * Carousel options.
 *
 * @export
 * @class Options
 * @implements {IOptions}
 */
export class Options implements IOptions {
    public count?: number = 3;
    public move?: number = 1;
    public touch?: boolean = false;
    public mode?: "align" | "free" = "align";
    public buttons?: boolean = true;
    public dots?: boolean = false;
    public rewind?: boolean = true;
    public autoplay?: number = 0;
    public animation?: number = 500;

    public responsive?: ResponsiveMap;

    /**
     * Creates an instance of Options.
     * @param {IOptions} [options] Options to copy properties.
     * @memberof Options
     */
    constructor(options?: IOptions) {
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
