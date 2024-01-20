import { Game } from "@/entities/game";
import { CanvasLayer, Vector2D } from "@/utils";

import {
  InputComponent,
  InputComponents,
  IClickInputComponent,
} from "@/components";

export class GameInputComponent
  extends InputComponent<Game>
  implements InputComponents<IClickInputComponent>
{
  public Entity!: Game;

  public Awake(): void {
    document.body.addEventListener("click", this.HandleClick.bind(this));
  }

  public HandleClick(e: MouseEvent): void {
    const point = CanvasLayer.Background.CalcLocalPointFrom(
      new Vector2D(e.clientX, e.clientY)
    );
    if (!point) return;

    console.log(point.x, point.y);
  }
}
