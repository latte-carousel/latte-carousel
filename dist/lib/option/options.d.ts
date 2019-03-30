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
export declare class Options implements IOptions {
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
    /**
     * Creates an instance of Options.
     * @param {IOptions} [options] Options to copy properties.
     * @memberof Options
     */
    constructor(options?: IOptions);
    /**
     * Finds options based on current breakpoint (screen width).
     *
     * @returns {Options} Carousel options.
     * @memberof Options
     */
    getBreakpointOptions(): IOptions;
}
