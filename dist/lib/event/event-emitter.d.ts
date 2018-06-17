/**
 * Basic event emitter implementation.
 *
 * @export
 * @class EventEmitter
 */
export declare class EventEmitter {
    private listeners;
    /**
     * Adds a new event listener.
     *
     * @param {string} event Event type.
     * @param {(data?: any) => void} listener Event listener.
     * @memberof EventEmitter
     */
    on(event: string, listener: (data?: any) => void): void;
    /**
     * Triggers all listeners by event type.
     *
     * @param {string} event Event type.
     * @param {*} [data] Event data.
     * @memberof EventEmitter
     */
    trigger(event: string, data?: any): void;
}
