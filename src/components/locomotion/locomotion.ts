import { IComponent, Entity } from "@/systems";
import { Vector2D } from "@/utils";

export abstract class LocomotionComponent<T extends Entity>
  implements IComponent
{
  public abstract Entity: T;

  public abstract get Position(): Vector2D | null;

  public abstract Awake(): void;
  public abstract Update(_: number): void;
}
