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
  public Entity!: Game;

  public Awake(): void {
    document.body.addEventListener("click", this.HandleClick.bind(this));
  }

  public HandleClick(e: MouseEvent): void {
    const point = CanvasLayer.Background.CalcLocalPointFrom(
      new Vector2D(e.clientX, e.clientY)
    );
    if (!point) return;

    for (const entity of this.Entity.Entities) {
      if (!entity.HasComponent(OnClickComponent<Grid>)) continue;

      entity.GetComponent(OnClickComponent<Grid>).ClickOn(point);
    }
  }
}
