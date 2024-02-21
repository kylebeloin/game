import { Game, Grid } from "@/entities";
import { Player } from "@/scenes";
import { CanvasLayer, Vector2D } from "@/utils";
import { OnClickComponent, OnKeyPressComponent } from "@/components";

import {
  InputComponent,
  IClickInputComponent,
  IKeyInputComponent,
} from "@/components";

export class GameInputComponent
  extends InputComponent<Game>
  implements IClickInputComponent, IKeyInputComponent
{
  public entity!: Game;

  public awake(): void {
    document.body.addEventListener("click", this.handleClick.bind(this));
    document.body.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.body.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  public handleClick(e: MouseEvent): void {
    const point = CanvasLayer.Background.calcLocalPointFrom(
      new Vector2D(e.clientX, e.clientY)
    );
    if (!point) return;

    for (const entity of this.entity.entities) {
      if (!entity.hasComponent(OnClickComponent<Grid>)) continue;

      entity.getComponent(OnClickComponent<Grid>).clickOn(point);
    }
  }

  public handleKeyDown(e: KeyboardEvent): void {
    console.log(this.entity.entities);
    for (const entity of this.entity.entities) {
      if (!entity.hasComponent(OnKeyPressComponent<Player>)) continue;
      console.log(
        "keyDown",
        entity.getComponent(OnKeyPressComponent<Player>).keys
      );

      entity.getComponent(OnKeyPressComponent<Player>).keyDown(e);
    }
  }

  public handleKeyUp(e: KeyboardEvent): void {
    for (const entity of this.entity.entities) {
      if (!entity.hasComponent(OnKeyPressComponent)) continue;
      entity.getComponent(OnKeyPressComponent).keyUp(e);
    }
  }
}
