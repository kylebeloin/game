import { IComponent, Entity } from "@/systems";

export abstract class InputComponent<T extends Entity> implements IComponent {
  public abstract Entity: T;
  public Awake(): void {}
  public Update(_: number): void {}
}
