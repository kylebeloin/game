import { Entity, IComponent } from "@/systems";
import { Vector2D } from "@/utils";

export abstract class OnClickComponent<T extends Entity> implements IComponent {
  public abstract entity: T;

  public abstract awake(): void;

  public abstract update(_: number): void;

  public abstract clickOn(point: Vector2D): void;
}
