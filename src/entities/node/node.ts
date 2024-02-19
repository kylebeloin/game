import { Vector2D } from "@/utils";
import { Entity } from "@/systems";
import { NodeDrawComponent } from "./components";

export class Node extends Entity {
  constructor(
    public readonly start: Vector2D,
    public readonly end: Vector2D,
    public readonly index: Vector2D
  ) {
    super();
  }

  public isActive = false;

  public get size(): Vector2D {
    return new Vector2D(this.end.x - this.start.x, this.end.y - this.start.y);
  }

  public get center(): Vector2D {
    return new Vector2D(
      this.start.x + this.size.x / 2,
      this.start.y + this.size.y / 2
    );
  }

  public occupies(point: Vector2D): boolean {
    if (point.x < this.start.x) {
      return false;
    }

    if (point.x > this.end.x) {
      return false;
    }

    if (point.y < this.start.y) {
      return false;
    }

    if (point.y > this.end.y) {
      return false;
    }

    return true;
  }

  public awake(): void {
    this.addComponent(new NodeDrawComponent());

    super.awake();
  }
}
