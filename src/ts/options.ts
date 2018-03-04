module latte {
    export class Options {
        public count: number = 3;
        public padding: number = 0;
        public touch: boolean = false;
        public buttons: boolean = true;
        public dots: boolean = false;
        public rewind: boolean = true;
        public autoplay: number = 0;

        public responsive: ResponsiveOptions;

        constructor(options?: Options) {
            if (options == null) {
                return;
            }

            // Copy properties
            for (const key in options) {
                if (options.hasOwnProperty(key) && key !== "responsive") {
                    (this as any)[key] = (options as any)[key];
                }
            }

            // Copy responsive properties
            if (options.responsive != null) {
                this.responsive = new ResponsiveOptions(options.responsive);
            }
        }

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
}
