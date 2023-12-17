import { IComponent, Vector2D, CanvasLayer } from "@/utils";
import { Actor } from "@/actor";
import { Team } from "@/team";
import { Settings } from "@/settings";

export class ActorDrawComponent implements IComponent {
  public Entity: Actor | null = null;

  private get Position(): Vector2D {
    return new Vector2D(
      CanvasLayer.Foreground.Size.x / 2,
      CanvasLayer.Foreground.Size.y / 2
    );
  }

  public Awake(): void {
    this.Clear();
  }

  public Update(_: number): void {
    this.Clear();
    this.Draw();
  }

  private Draw(): void {
    if (!this.Entity) {
      throw new Error("ActorDrawComponent: Entity is null");
    }
    const colors = Settings.actors.colors;
    const color = this.Entity.Factory.Team === Team.A ? colors.a : colors.b;

    CanvasLayer.Foreground.FillCircle(
      this.Position,
      Settings.actors.radius,
      color
    );
  }

  private Clear(): void {
    CanvasLayer.Foreground.ClearRect(
      new Vector2D(
        this.Position.x - Settings.grid.nodeSize / 2,
        this.Position.y - Settings.grid.nodeSize / 2
      ),
      new Vector2D(Settings.grid.nodeSize, Settings.grid.nodeSize)
    );
  }
}
