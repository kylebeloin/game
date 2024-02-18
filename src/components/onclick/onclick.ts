import { Entity, IComponent } from "@/systems";
import { Vector2D } from "@/utils";

export abstract class OnClickComponent<T extends Entity> implements IComponent {
  public abstract Entity: T;

  public abstract Awake(): void;

  public abstract Update(_: number): void;

  public abstract ClickOn(point: Vector2D): void;
}
