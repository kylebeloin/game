import { OnClickComponent } from "@/components";
import { Grid } from "@/entities";
import { logger } from "@/utils";
import { Vector2D } from "@/utils";

export class GridOnClickComponent extends OnClickComponent<Grid> {
  @logger
  public clickOn(point: Vector2D): void {
    for (const tile of this.entity.tiles) {
      tile.isActive = tile.occupies(point);
    }
  }
}
