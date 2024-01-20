import { Vector2D, CanvasLayer } from "@/utils";
import { Actor } from "@/entities/actor";
import { Team } from "@/team";
import { Settings } from "@/settings";
import { DrawComponent } from "@/components";

export class ActorDrawComponent extends DrawComponent<Actor> {
  private get Position(): Vector2D {
    return this.Entity.Position!;
  }

  public Update(_: number): void {
    if (!this.Position) return;
    this.Clear();
    this.Draw();
  }

  public Awake(): void {
    if (this.Position) this.Clear();
  }

  protected Draw(): void {
    const colors = Settings.actors.colors;
    const color = this.Entity.Factory.Team === Team.A ? colors.a : colors.b;

    CanvasLayer.Foreground.FillCircle(
      this.Position,
      Settings.actors.radius,
      color
    );
  }

  protected Clear(): void {
    CanvasLayer.Foreground.ClearRect(
      new Vector2D(
        this.Position.x - Settings.grid.nodeSize / 2,
        this.Position.y - Settings.grid.nodeSize / 2
      ),
      new Vector2D(Settings.grid.nodeSize, Settings.grid.nodeSize)
    );
  }
}
