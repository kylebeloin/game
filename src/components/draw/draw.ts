import { Entity, Component } from "@/systems";

export abstract class DrawComponent<T extends Entity> extends Component<T> {
  protected draw(): void {}
  protected clear(): void {}
}
