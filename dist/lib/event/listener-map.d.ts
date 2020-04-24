/**
 * Listener map used by event emitter.
 *
 * @export
 * @interface ListenerMap
 */
export interface IListenerMap {
    [event: string]: ((data?: any) => void)[];
}
