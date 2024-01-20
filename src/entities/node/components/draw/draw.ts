import type { IComponent } from "@/utils";
import { CanvasLayer } from "@/utils";
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

  private Clear(): void {
    CanvasLayer.Background.ClearRect(this.Entity.Start, this.Entity.Size);
  }
}
