module latte {
    export class ResponsiveOptions {
        [breakpoint: string]: Options;

        constructor(responsive?: ResponsiveOptions) {
            if (responsive == null) {
                return;
            }

            // Copy properties
            for (const key in responsive) {
                if (responsive.hasOwnProperty(key)) {
                    (this as any)[key] = new Options((responsive as any)[key]);
                }
            }
        }
    }
}
