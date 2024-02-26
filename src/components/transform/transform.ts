import { IComponent, Entity } from "@/systems";
import { Vector2D } from "@/utils";

export abstract class TransformComponent<T extends Entity>
  implements IComponent
{
  public abstract entity: T;
  public abstract get position(): Vector2D | null;
  public abstract set position(value: Vector2D | null);
  public abstract get rotation(): number | null;
  public abstract set rotation(value: number | null);
  public abstract get scale(): Vector2D | null;
  public abstract direction: number | null;

  public abstract awake(): void;
  public abstract update(_: number): void;

  public translate(vector: Vector2D): void {
    this.direction = Vector2D.direction(this.position!, vector);

    this.position!.add(vector);
  }

  public rotate(angle: number): void {
    this.rotation! += angle;
  }

  public scaleBy(vector: Vector2D): void {
    this.scale!.multiply(vector);
  }
}
