import { Vector2D } from "@/utils";
import { IComponent } from "@/systems";

export interface IOnClickComponent extends IComponent {
  ClickOn(point: Vector2D): void;
}
