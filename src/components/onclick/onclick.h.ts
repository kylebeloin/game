import { IComponent, Vector2D } from "@/utils";

export interface IOnClickComponent extends IComponent {
  ClickOn(point: Vector2D): void;
}
