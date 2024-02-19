import { Entity, IComponent } from "@/systems";

export abstract class DrawComponent<T extends Entity> implements IComponent {
  public entity!: T;
  public awake(): void {}
  public update(_: number): void {}
  protected draw(): void {}
  protected clear(): void {}
}
