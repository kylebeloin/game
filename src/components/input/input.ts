import { IComponent, Entity } from "@/systems";

export abstract class InputComponent<T extends Entity> implements IComponent {
  public abstract entity: T;
  public awake(): void {}
  public update(_: number): void {}
}
