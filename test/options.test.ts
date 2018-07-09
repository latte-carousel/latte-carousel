import { Options } from "../src/ts/option/options";
import { ResponsiveMap } from "../src/ts/option/responsive-map";

test("simple copy", () => {
    const global = {
        count: 10,
        responsive: {
            640: { touch: true } as Options,
            1024: { touch: false } as Options,
        } as ResponsiveMap,
    } as Options;

    const options = new Options(global);

    expect(options).not.toEqual({});
    expect(options.responsive["640"].touch).toEqual(true);
    expect(options.responsive["640"].count).toEqual(10);
    expect(options.responsive["1024"].touch).toEqual(false);
    expect(options.responsive["1024"].count).toEqual(10);
});

test("empty copy", () => {
    const options = new Options(null);

    expect(options).not.toEqual({});
    expect(options.count).toEqual(3);
});

test("no responsive", () => {
    const global = {
        count: 10,
    } as Options;

    const options = new Options(global);

    expect(options).not.toEqual({});
    expect(options.count).toEqual(10);
    expect(options.responsive).toBeUndefined();

    const responsive = options.getBreakpointOptions();

    expect(responsive).toBe(options);
});

test("responsive breakpoint", () => {
    const global = {
        responsive: {
            640: { count: 3 } as Options,
            1024: { count: 6 } as Options,
        } as ResponsiveMap,
    } as Options;

    const options = new Options(global);

    Object.defineProperty(window, "innerWidth", { value: 1024 });

    const responsive1024 = options.getBreakpointOptions();

    expect(responsive1024).not.toBeUndefined();
    expect(responsive1024.count).toEqual(6);

    Object.defineProperty(window, "innerWidth", { value: undefined });
    Object.defineProperty(document.body, "clientWidth", { value: 640 });

    const responsive640 = options.getBreakpointOptions();

    expect(responsive640).not.toBeUndefined();
    expect(responsive640.count).toEqual(3);
});
