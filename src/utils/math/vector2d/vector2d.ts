export class Vector2D {
  constructor(public x: number, public y: number) {}

  clear(): void {
    this.x = 0;
    this.y = 0;
  }

  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  add(vector: Vector2D): void {
    this.x += vector.x;
    this.y += vector.y;
  }

  multiply(vector: Vector2D): void {
    this.x *= vector.x;
    this.y *= vector.y;
  }
}
