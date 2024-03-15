import { Component, Entity } from "@/systems";

export abstract class InputComponent<T extends Entity> extends Component<T> {
  public awake(): void {}
  public update(_: number): void {}
}
