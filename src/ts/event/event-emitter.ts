module latte {

    /**
     * Basic event emitter implementation.
     *
     * @export
     * @class EventEmitter
     */
    export class EventEmitter {
        private listeners: ListenerMap = {};

        /**
         * Adds a new event listener.
         *
         * @param {string} event Event type.
         * @param {(data?: any) => void} listener Event listener.
         * @memberof EventEmitter
         */
        public on(event: string, listener: (data?: any) => void) {
            let bucket = this.listeners[event];

            if (bucket == null) {
                this.listeners[event] = bucket = [];
            }

            bucket.push(listener);
        }

        /**
         * Triggers all listeners by event type.
         *
         * @param {string} event Event type.
         * @param {*} [data] Event data.
         * @memberof EventEmitter
         */
        public trigger(event: string, data?: any) {
            const bucket = this.listeners[event];

            if (bucket != null) {
                for (const listener of bucket) {
                    listener(data);
                }
            }
        }
    }
}
