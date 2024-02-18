export class Vector2D {
  constructor(public x: number, public y: number) {}
  clear(): void {
    this.x = 0;
    this.y = 0;
  }
  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }
}
