import { Game, Grid } from "@/entities";
import { CanvasLayer, Vector2D } from "@/utils";
import { OnClickComponent } from "@/components";

import {
  InputComponent,
  InputComponents,
  IClickInputComponent,
} from "@/components";

export class GameInputComponent
  extends InputComponent<Game>
  implements InputComponents<IClickInputComponent>
{
  public entity!: Game;

  public awake(): void {
    document.body.addEventListener("click", this.HandleClick.bind(this));
  }

  public HandleClick(e: MouseEvent): void {
    const point = CanvasLayer.Background.calcLocalPointFrom(
      new Vector2D(e.clientX, e.clientY)
    );
    if (!point) return;

    for (const entity of this.entity.entities) {
      if (!entity.hasComponent(OnClickComponent<Grid>)) continue;

      entity.getComponent(OnClickComponent<Grid>).clickOn(point);
    }
  }
}
