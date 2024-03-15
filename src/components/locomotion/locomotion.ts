import { Component, Entity } from "@/systems";
import { Vector2D } from "@/utils";

export abstract class LocomotionComponent<
  T extends Entity
> extends Component<T> {
  public abstract get position(): Vector2D | null;

  public abstract awake(): void;
  public abstract update(_: number): void;
}
