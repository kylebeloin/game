export class Vector2D {
  constructor(public x: number, public y: number) {}

  Clear(): void {
    this.x = 0;
    this.y = 0;
  }

  Clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  Add(vector: Vector2D): void {
    this.x += vector.x;
    this.y += vector.y;
  }

  Multiply(vector: Vector2D): void {
    this.x *= vector.x;
    this.y *= vector.y;
  }
}
