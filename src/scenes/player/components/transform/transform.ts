import { TransformComponent } from "@/components";
import { Player } from "../..";
import { Vector2D } from "@/utils";

export class PlayerTransformComponent extends TransformComponent<Player> {
  /**
   * Position here can be a node, or a pixel.
   */
  private _position: Vector2D = new Vector2D(0, 0);
  private _rotation: number = 0;
  private _scale: Vector2D = new Vector2D(1, 1);

  public awake(): void {}
  public update(_: number): void {}

  public entity!: Player;

  public get position(): Vector2D {
    return this._position;
  }

  public get rotation(): number {
    return this._rotation;
  }

  public set rotation(value: number) {
    this._rotation = value;
  }

  public get scale(): Vector2D {
    return this._scale;
  }

  constructor(position: Vector2D = new Vector2D(0, 0)) {
    super();
    this._position = position;
  }
}
