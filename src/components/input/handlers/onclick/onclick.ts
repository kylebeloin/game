import { Entity, Component } from "@/systems";
import { Vector2D } from "@/utils";

export abstract class OnClickComponent<T extends Entity> extends Component<T> {
  public abstract clickOn(point: Vector2D): void;
}
