import { OnClickComponent } from "@/components";
import { Grid } from "@/entities";
import { logger } from "@/utils";
import { Vector2D } from "@/utils";

export class GridOnClickComponent extends OnClickComponent<Grid> {
  public entity!: Grid;
  public awake(): void {}

  public update(_: number): void {}

  @logger
  public clickOn(point: Vector2D): void {
    for (const tile of this.entity.tiles) {
      tile.isActive = tile.occupies(point);
    }
  }
}
