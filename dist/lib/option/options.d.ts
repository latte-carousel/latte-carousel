import { ResponsiveMap } from "./responsive-map";
/**
 * Carousel options.
 *
 * @export
 * @class Options
 */
export declare class Options {
    count?: number;
    move?: number;
    padding?: number;
    touch?: boolean;
    buttons?: boolean;
    dots?: boolean;
    rewind?: boolean;
    autoplay?: number;
    animation?: number;
    responsive?: ResponsiveMap;
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
