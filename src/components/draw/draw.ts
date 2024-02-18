import { Entity, IComponent } from "@/systems";

export abstract class DrawComponent<T extends Entity> implements IComponent {
  public Entity!: T;
  public Awake(): void {}
  public Update(_: number): void {}
  protected Draw(): void {}
  protected Clear(): void {}
}
