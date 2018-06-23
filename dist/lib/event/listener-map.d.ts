/**
 * Listener map used by event emitter.
 *
 * @export
 * @class ListenerMap
 */
export declare class ListenerMap {
    [event: string]: Array<(data?: any) => void>;
}
