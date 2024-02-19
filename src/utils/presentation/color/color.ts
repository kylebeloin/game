export class Color {
  public readonly R: number = 0;
  public readonly G: number = 0;
  public readonly B: number = 0;
  public readonly A: number = 1;

  constructor(r: number, g: number, b: number, a: number = 1) {
    if (!Color.isValidChannel(r, false)) {
      throw new Error(`Color: Invalid red channel ${r}`);
    }
    if (!Color.isValidChannel(g, false)) {
      throw new Error(`Color: Invalid green channel ${g}`);
    }
    if (!Color.isValidChannel(b, false)) {
      throw new Error(`Color: Invalid blue channel ${b}`);
    }
    if (!Color.isValidChannel(a, true)) {
      throw new Error(`Color: Invalid alpha channel ${a}`);
    }
    this.R = r;
    this.G = g;
    this.B = b;
    this.A = a;
  }

  public static isValidChannel(channel: number, isAlpha: boolean): boolean {
    const max = isAlpha ? 1 : 255;
    if (channel < 0 || channel > max) {
      return false;
    }

    if (!isAlpha && channel % 1 !== 0) {
      return false;
    }

    return true;
  }

  public asString(): string {
    return `rgba(${this.R}, ${this.G}, ${this.B}, ${this.A})`;
  }

  public static fromHex(hex: string): Color {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
      throw new Error(`Color: Invalid hex string ${hex}`);
    }

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    const a = 1;

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error(`Color: Invalid hex string ${hex}`);
    }

    return new Color(r, g, b, a);
  }

  public static fromString(str: string): Color {
    const arr = str.replace(new RegExp(/\(|\)|[A-Za-z]/g), "").split(",");

    const r = Number(arr[0]),
      g = Number(arr[1]),
      b = Number(arr[2]),
      a = Number(arr[3]);

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      throw new Error("Invalid string");
    }

    return new Color(r, g, b, a);
  }
}
