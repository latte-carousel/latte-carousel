import { EventEmitter } from "../src/ts/event/event-emitter";

test("simple event", () => {
    const event = "click";
    const callback = jest.fn();

    const emitter = new EventEmitter();

    emitter.on(event, callback);
    emitter.trigger(event);

    expect(callback).toHaveBeenCalled();
});

test("empty event", () => {
    const event = "click";

    const emitter = new EventEmitter();

    emitter.trigger(event);
});

test("repeated callback", () => {
    const event = "click";
    const callback = jest.fn();

    const emitter = new EventEmitter();

    emitter.on(event, callback);
    emitter.on(event, callback);
    emitter.on(event, callback);
    emitter.trigger(event);

    expect(callback).toHaveBeenCalledTimes(3);
});

test("multiple events", () => {
    const event1 = "click";
    const event2 = "tap";
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const emitter = new EventEmitter();

    emitter.on(event1, callback1);
    emitter.on(event2, callback2);
    emitter.trigger(event1);

    expect(callback1).toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
});
