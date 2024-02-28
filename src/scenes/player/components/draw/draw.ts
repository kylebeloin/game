import { ActorDrawComponent } from "@/entities";
import { CanvasLayer, Vector2D } from "@/utils";
import { Player } from "../..";
import { Settings } from "@/settings";

export class PlayerDrawComponent extends ActorDrawComponent<Player> {
  private _modifier = new Vector2D(
    Settings.grid.tileSize / 2,
    Settings.grid.tileSize / 2
  );

  public draw(): void {
    const position = Vector2D.sub(this.entity.position, this._modifier);
    if (this.entity.animation.loaded) {
      const frame = this.entity.animation.currentFrame;
      if (frame) {
        CanvasLayer.Foreground.drawImage(frame, position);
      }
    }
  }
}
