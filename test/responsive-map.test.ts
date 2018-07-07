import { Options } from "../src/ts/option/options";
import { ResponsiveMap } from "../src/ts/option/responsive-map";

test("simple copy", () => {
    const responsive = {
        640: { touch: true } as Options,
        1024: { touch: false } as Options,
    } as ResponsiveMap;

    const map = new ResponsiveMap(responsive);

    expect(map).not.toEqual({});
    expect(map["640"].touch).toEqual(true);
    expect(map["1024"].touch).toEqual(false);
});

test("empty copy", () => {
    const map = new ResponsiveMap(null);

    expect(map).toEqual({});
});

test("global copy", () => {
    const global = {
        count: 10,
        responsive: {} as ResponsiveMap,
    } as Options;

    const responsive = {
        640: { touch: true } as Options,
        1024: { touch: false } as Options,
    } as ResponsiveMap;

    const map = new ResponsiveMap(responsive, global);

    expect(map).not.toEqual({});
    expect(map["640"].touch).toEqual(true);
    expect(map["640"].count).toEqual(10);
    expect(map["1024"].touch).toEqual(false);
    expect(map["1024"].count).toEqual(10);
});
