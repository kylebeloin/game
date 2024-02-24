import { Vector2D } from "@/utils";
import { Entity } from "@/systems";
import { Settings } from "@/settings";
import { TileDrawComponent } from "./components";
import { Actor } from "..";

export class Tile extends Entity {
  public actor: Actor | null = null;

  /**
   * The
   */
  public get index() {
    return this.location.y * Settings.grid.dimension + this.location.x;
  }

  constructor(
    /**
     * The pixel value for where a tile begins.
     */
    public readonly start: Vector2D,
    /**
     * The pixel value for where a tile ends.
     */
    public readonly end: Vector2D,
    /**
     * The two dimensional location for a tile on a grid.
     */
    public readonly location: Vector2D,
    /**
     * Neighbors of the current tile.
     */
    public readonly neighbors: Array<Tile> = new Array(4)
  ) {
    super();
  }

  public isActive = false;

  /**
   * Returns Vector2D where x: width, y: height in pixels.
   */
  public get size(): Vector2D {
    return Vector2D.sub(this.end, this.start);
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
    this.addComponent(new TileDrawComponent());

    super.awake();
  }
}
