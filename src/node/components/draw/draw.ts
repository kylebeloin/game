import type { IComponent } from "@/utils";
import { CanvasLayer } from "@/utils";
import { Node } from "@/node";
import { Settings } from "@/settings";

export class NodeDrawComponent implements IComponent {
  public Entity: Node | null = null;

  public Awake(): void {
    // to implement
    if (!this.Entity) {
      throw new Error("NodeDrawComponent: Entity is null");
    }
    this.Clear();
  }

  public Update(_: number): void {
    // to implement
    if (!this.Entity) {
      throw new Error("NodeDrawComponent: Entity is null");
    }
    this.Clear();
    this.Draw();
  }

  private Draw(): void {
    if (!this.Entity) {
      throw new Error("NodeDrawComponent: Entity is null");
    }
    CanvasLayer.Background.FillRect(
      this.Entity.Start,
      this.Entity.Size,
      Settings.grid.color
    );
  }

  private Clear(): void {
    if (!this.Entity) {
      throw new Error("NodeDrawComponent: Entity is null");
    }
    CanvasLayer.Background.ClearRect(this.Entity.Start, this.Entity.Size);
  }
}
