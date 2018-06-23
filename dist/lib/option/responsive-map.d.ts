import { Options } from "./options";
/**
 * Responsive options map.
 *
 * @export
 * @class ResponsiveMap
 */
export declare class ResponsiveMap {
    [breakpoint: string]: Options;
    /**
     * Creates an instance of ResponsiveMap.
     * @param {ResponsiveMap} [map] Map to copy properties.
     * @param {Options} [globalOptions] Options to use as default.
     * @memberof ResponsiveMap
     */
    constructor(map?: ResponsiveMap, globalOptions?: Options);
}
