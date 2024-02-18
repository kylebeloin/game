import { TransformComponent } from "@/components";
import { Player } from "../..";
import { Vector2D } from "@/utils";

export class PlayerTransformComponent extends TransformComponent<Player> {
  private _position: Vector2D = new Vector2D(0, 0);
  private _rotation: number = 0;
  private _scale: Vector2D = new Vector2D(1, 1);

  public Awake(): void {}
  public Update(_: number): void {}

  public Entity!: Player;

  public get Position(): Vector2D {
    return this._position;
  }

  public get Rotation(): number {
    return this._rotation;
  }

  public set Rotation(value: number) {
    this._rotation = value;
  }

  public get Scale(): Vector2D {
    return this._scale;
  }

  public Translate(vector: Vector2D): void {
    super.Translate(vector);
  }

  public Rotate(angle: number): void {
    super.Rotate(angle);
  }

  public ScaleBy(vector: Vector2D): void {
    super.ScaleBy(vector);
  }

  constructor(entity: Player) {
    super();
    this.Entity = entity;
  }
}
