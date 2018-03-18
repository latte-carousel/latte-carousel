module latte {

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
         * @memberof ResponsiveMap
         */
        constructor(map?: ResponsiveMap) {
            if (map == null) {
                return;
            }

            // Copy properties
            for (const key in map) {
                if (map.hasOwnProperty(key)) {
                    (this as any)[key] = new Options((map as any)[key]);
                }
            }
        }
    }
}
