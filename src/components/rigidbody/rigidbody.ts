import { IComponent, Entity } from "@/systems";

export abstract class RigidBody<T extends Entity> implements IComponent {
  public abstract entity: T;
  public abstract awake(): void;
  public abstract update(_: number): void;
}
