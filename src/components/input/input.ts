import { IComponent, Entity } from "@/utils";

export abstract class InputComponent<T extends Entity> implements IComponent {
  public abstract Entity: T;
  constructor() {}
  public Awake(): void {}
  public Update(_: number): void {}
}
