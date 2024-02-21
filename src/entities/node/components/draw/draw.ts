import type { IComponent } from "@/systems";
import { CanvasLayer, Color, Vector2D } from "@/utils";
import { Node } from "@/entities/node";
import { Settings } from "@/settings";

export class NodeDrawComponent implements IComponent {
  public entity!: Node;

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
      entity.index.asString(),
      Vector2D.sub(entity.end, new Vector2D(entity.size.x, 0)),
      new Color(0, 0, 0, 1)
    );
  }

  private clear(): void {
    CanvasLayer.Background.clearRect(this.entity.start, this.entity.size);
  }
}
