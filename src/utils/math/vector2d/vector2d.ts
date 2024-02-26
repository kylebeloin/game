import { lerp } from "../lerp";
import { toRounded } from "..";

type Vector2DStr = `(${number},${number})`;

export class Vector2D {
  constructor(public x: number, public y: number) {}

  public static lerp(start: Vector2D, end: Vector2D, t: number): Vector2D {
    return new Vector2D(lerp(start.x, end.x, t), lerp(start.y, end.y, t));
  }

  public static add = (v1: Vector2D, v2: Vector2D) =>
    new Vector2D(v1.x + v2.x, v1.y + v2.y);

  public static sub = (v1: Vector2D, v2: Vector2D) =>
    new Vector2D(v1.x - v2.x, v1.y - v2.y);

  public static direction = (start: Vector2D, end: Vector2D) => {
    const deg = Math.atan((end.y - start.y) / (end.x - start.x));
    return toRounded(deg, 2);
  };

  public static multiply = (v1: Vector2D, v2: Vector2D) =>
    new Vector2D(v1.x * v2.x, v1.y * v2.y);

  add(vector: Vector2D): void {
    this.x += vector.x;
    this.y += vector.y;
  }

  sub(vector: Vector2D): void {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  clear(): void {
    this.x = 0;
    this.y = 0;
  }

  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  equals(vector: Vector2D): boolean {
    return this.x === vector.x && this.y === vector.y;
  }

  lerp(end: Vector2D, t: number): void {
    const { x, y } = Vector2D.lerp(this, end, t);
    (this.x = x), (this.y = y);
  }

  multiply(vector: Vector2D): void {
    this.x *= vector.x;
    this.y *= vector.y;
  }

  asString(): Vector2DStr {
    return `(${this.x},${this.y})`;
  }

  fromString(str: Vector2DStr): Vector2D {
    const parsed = str.replace(new RegExp(/\(|\)/, "g"), "").split(",");
    const x = Number(parsed[0]);
    const y = Number(parsed[1]);

    if (isNaN(x) || isNaN(y)) {
      throw new Error(`Cannot instantiate Vector2D from string ${str}`);
    }

    return new Vector2D(x, y);
  }
}
