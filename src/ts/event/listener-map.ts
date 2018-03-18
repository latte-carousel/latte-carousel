module latte {

    /**
     * Listener map used by event emitter.
     *
     * @export
     * @class ListenerMap
     */
    export class ListenerMap {
        [event: string]: Array<(data?: any) => void>;
    }
}
