import { Actor, Tile } from "@/entities";
import { LocomotionComponent } from "@/components";
import { Vector2D } from "@/utils";

/**
 * Handles movement of actor entity across tiles.
 */
export class ActorLocomotionComponent extends LocomotionComponent<Actor> {
  constructor(tile: Tile) {
    super();
    this._tile = tile;
  }

  public entity!: Actor;
  /**
   * It is possible for an actor to stand nowhere; in this case, it is null.
   */
  protected _tile: Tile | null = null;
  private _lastPosition: Vector2D | null = null;

  public get tile(): Tile | null {
    return this._tile;
  }

  public set tile(value: Tile) {
    this._lastPosition = value.center;
    this._tile = value;
    this._tile.actor = this.entity;
  }

  public get position(): Vector2D | null {
    return this.tile ? this.tile.center : null;
  }

  public get lastPosition(): Vector2D | null {
    return this._lastPosition;
  }

  public awake(): void {
    if (this._tile) this._tile.actor = this.entity;
  }

  public update(_: number): void {
    /* @todo */
  }
}
