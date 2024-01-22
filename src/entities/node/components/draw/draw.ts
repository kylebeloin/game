import type { IComponent } from "@/utils";
import { CanvasLayer, Color } from "@/utils";
import { Node } from "@/entities/node";
import { Settings } from "@/settings";

export class NodeDrawComponent implements IComponent {
  public Entity!: Node;

  public Awake(): void {
    // to implement
    this.Clear();
  }

  public Update(_: number): void {
    // to implement
    this.Clear();
    this.Draw();
    this.DrawDebugInfo();
  }

  private Draw(): void {
    CanvasLayer.Background.FillRect(
      this.Entity.Start,
      this.Entity.Size,
      this.Entity.IsActive
        ? Settings.grid.color.active
        : Settings.grid.color.default
    );
  }

  private DrawDebugInfo(): void {
    const entity = this.Entity;
    CanvasLayer.Background.DrawText(
      `${entity.Index.x}, ${entity.Index.y}`,
      entity.Start,
      new Color(255, 255, 255, 1)
    );
  }

  private Clear(): void {
    CanvasLayer.Background.ClearRect(this.Entity.Start, this.Entity.Size);
  }
}
