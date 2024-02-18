import { IComponent, Entity } from "@/systems";

export abstract class RigidBody<T extends Entity> implements IComponent {
  public abstract Entity: T;
  public abstract Awake(): void;
  public abstract Update(_: number): void;
}
