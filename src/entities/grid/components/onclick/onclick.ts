import { OnClickComponent } from "@/components";
import { Grid } from "@/entities";
import { Vector2D } from "@/utils";

export class GridOnClickComponent extends OnClickComponent<Grid> {
  public Awake(): void {}

  public Update(_: number): void {}

  public ClickOn(point: Vector2D): void {
    for (const node of this.Entity.Nodes) {
      node.IsActive = node.Occupies(point);
    }
  }
}
