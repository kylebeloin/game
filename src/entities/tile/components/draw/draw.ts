import type { IComponent } from "@/systems";
import { CanvasLayer, Color, Vector2D } from "@/utils";
import { Tile } from "@/entities/tile";
import { Settings } from "@/settings";

export class TileDrawComponent implements IComponent {
  public entity!: Tile;

  public awake(): void {
    // to implement
    this.clear();
  }

  public update(_: number): void {
    // to implement
    this.clear();
    this.draw();
    this.drawDebugInfo();
  }

  private draw(): void {
    CanvasLayer.Background.fillRect(
      this.entity.start,
      this.entity.size,
      this.entity.isActive
        ? Settings.grid.color.active
        : Settings.grid.color.default
    );
  }

  private drawDebugInfo(): void {
    const entity = this.entity;
    CanvasLayer.Background.drawText(
      entity.location.asString(),
      Vector2D.sub(entity.end, new Vector2D(entity.size.x, 0)),
      new Color(0, 0, 0, 1)
    );

    CanvasLayer.Background.drawText(
      entity.index.toString(),
      Vector2D.add(
        entity.start,
        new Vector2D(entity.size.x - entity.index.toString().length * 7, 8)
      ),
      new Color(0, 0, 0, 1)
    );
  }

  private clear(): void {
    CanvasLayer.Background.clearRect(this.entity.start, this.entity.size);
  }
}
