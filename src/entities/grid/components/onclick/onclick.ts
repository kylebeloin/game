import { OnClickComponent } from "@/components";
import { Grid } from "@/entities";
import { Vector2D } from "@/utils";

export class GridOnClickComponent extends OnClickComponent<Grid> {
  public entity!: Grid;
  public awake(): void {}

  public update(_: number): void {}

  public clickOn(point: Vector2D): void {
    console.log(this.entity);
    for (const node of this.entity.nodes) {
      node.isActive = node.occupies(point);
    }
  }
}
