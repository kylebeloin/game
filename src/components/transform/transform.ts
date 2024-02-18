import { IComponent, Entity } from "@/systems";
import { Vector2D } from "@/utils";

export abstract class TransformComponent<T extends Entity>
  implements IComponent
{
  public abstract Entity: T;
  public abstract get Position(): Vector2D | null;
  public abstract get Rotation(): number | null;
  public abstract set Rotation(value: number | null);
  public abstract get Scale(): Vector2D | null;

  public abstract Awake(): void;
  public abstract Update(_: number): void;

  public Translate(vector: Vector2D): void {
    this.Position!.Add(vector);
  }

  public Rotate(angle: number): void {
    this.Rotation! += angle;
  }

  public ScaleBy(vector: Vector2D): void {
    this.Scale!.Multiply(vector);
  }
}
