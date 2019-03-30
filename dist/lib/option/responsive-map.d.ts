import { IOptions } from "./options";
/**
 * Responsive options map.
 *
 * @export
 * @class ResponsiveMap
 */
export declare class ResponsiveMap {
    [breakpoint: string]: IOptions;
    /**
     * Creates an instance of ResponsiveMap.
     * @param {ResponsiveMap} [map] Map to copy properties.
     * @param {IOptions} [globalOptions] Options to use as default.
     * @memberof ResponsiveMap
     */
    constructor(map?: ResponsiveMap, globalOptions?: IOptions);
}
