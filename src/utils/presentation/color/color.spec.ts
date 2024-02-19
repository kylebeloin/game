import { Color } from "./color";

describe(">>> Color", () => {
  it("should instantiate with provided values", () => {
    const rgba = new Color(1, 2, 3, 0.1);
    expect(rgba.R).toEqual(1);
    expect(rgba.G).toEqual(2);
    expect(rgba.B).toEqual(3);
    expect(rgba.A).toEqual(0.1);
  });

  it("should throw an error if provided values are incorrect", () => {
    expect(() => new Color(266, 2, 3, 0.1)).toThrow(/red/);
    expect(() => new Color(-1, 2, 3, 0.1)).toThrow(/red/);
    expect(() => new Color(1.3, 2, 3, 0.1)).toThrow(/red/);

    expect(() => new Color(255, 266, 3, 0.1)).toThrow(/green/);
    expect(() => new Color(255, -1, 3, 0.1)).toThrow(/green/);
    expect(() => new Color(255, 2.5, 3, 0.1)).toThrow(/green/);

    expect(() => new Color(255, 25, 266, 0.1)).toThrow(/blue/);
    expect(() => new Color(255, 25, -2, 0.1)).toThrow(/blue/);
    expect(() => new Color(255, 0, 2.5, 0.1)).toThrow(/blue/);

    expect(() => new Color(255, 255, 255, -1)).toThrow(/alpha/);
    expect(() => new Color(255, 255, 255, 1.2)).toThrow(/alpha/);
  });

  it("should throw an error if cannot instantiate from string", () => {
    expect(() => Color.fromString("")).toThrow();
    expect(() => Color.fromString("?")).toThrow();
    expect(() => Color.fromString("rgba()")).toThrow();
    expect(() => Color.fromString("rgba(1)")).toThrow();
    expect(() => Color.fromString("rgba(1,2)")).toThrow();
    expect(() => Color.fromString("rgba(1,2,3)")).toThrow();
  });

  it("should instantiate from hex string", () => {
    const hex = "#ffffff";
    const rgba = Color.fromHex(hex);
    expect(rgba.R).toEqual(255);
    expect(rgba.G).toEqual(255);
    expect(rgba.B).toEqual(255);
    expect(rgba.A).toEqual(1);
  });

  it("should instantiate from rgba string", () => {
    const rgba = Color.fromString("rgba(255,255,255,1)");
    expect(rgba.R).toEqual(255);
    expect(rgba.G).toEqual(255);
    expect(rgba.B).toEqual(255);
    expect(rgba.A).toEqual(1);
  });
});
