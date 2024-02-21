import { Vector2D, CanvasLayer } from "@/utils";
import { Actor } from "@/entities/actor";
import { Team } from "@/team";
import { Settings } from "@/settings";
import { DrawComponent } from "@/components";

export class ActorDrawComponent extends DrawComponent<Actor> {
  private get position(): Vector2D {
    return this.entity.position!;
  }

  public update(_: number): void {
    if (!this.position) return;
    this.clear();
    this.draw();
  }

  public awake(): void {
    if (this.position) this.clear();
  }

  protected draw(): void {
    const colors = Settings.actors.colors;
    const color = this.entity.factory?.team === Team.A ? colors.a : colors.b;

    CanvasLayer.Foreground.fillCircle(
      this.position,
      Settings.actors.radius,
      color
    );
  }

  protected clear(): void {
    CanvasLayer.Foreground.clearRect(
      new Vector2D(
        this.position.x - Settings.grid.tileSize / 2,
        this.position.y - Settings.grid.tileSize / 2
      ),
      new Vector2D(Settings.grid.tileSize, Settings.grid.tileSize)
    );
  }
}
